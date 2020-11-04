#!/usr/bin/env perl

BEGIN {
    $ENV{HTTPS_CA_DIR} = '/etc/ssl/certs';
}

use Modern::Perl '2015';
use feature qw(postderef switch);
use Const::Fast qw(const);
use Config::Any qw();
use JSON qw();
use Exception::Class ( 'PIC::Exception::MissingLookup',
    'PIC::Exception::UnknownUser' );
use Try::Tiny;
use Scalar::Util qw(blessed);
use Store::CouchDB qw();
use Data::Dumper qw(Dumper);
use PIC::Schema qw();
use DateTime::Format::ISO8601 qw();
use Log::Log4perl qw(:easy);
use File::Basename;

const my %CLINICAL_FEATURES_STATUS_MAP => (
    'before' => 'Before Call',
    'at'     => 'At Time of Call',
    'end'    => 'End of Case',
);

main();

sub main {
    my $log = get_logger();
    my ( $filename, $dirs, $suffix ) = fileparse($0);

    my $configuration_file = $dirs . '/' . 'config.json';

    if ( -f $dirs . '/' . 'log4perl.conf' ) {
        Log::Log4perl::init( $dirs . '/' . 'log4perl.conf' );
    }
    else {
        Log::Log4perl->easy_init($ERROR);
    }

    my $configs =
      Config::Any->load_files(
        { 'files' => [$configuration_file], use_ext => 1 } );
    my ($config_data) = @$configs;
    $log->logdie('Missing config.json') unless ($config_data);
    my ( $config_file, $config ) = %$config_data;

    my $couchDB = Store::CouchDB->new( $config->{'couchdb'} );
    $log->debug( Dumper $couchDB);

    my $mysql_schema = PIC::Schema->connect(
        $config->{'mariadb'}{'dsn'}, $config->{'mariadb'}{'user'},
        $config->{'mariadb'}{'password'}, { 'AutoCommit' => 1 }
    );

    $log->debug( Dumper $mysql_schema);

    my $changes = $couchDB->changes( { 'include_docs' => 'false' } );

    $log->debug( Dumper $changes);

    if ( !$couchDB->has_error ) {
        my $j = 0;
        my @incidents;
        my @messages;
        foreach ( @{ $changes->{results} } ) {
            my $doc;
            $doc = $couchDB->get_doc( $_->{id} );
            if ( !$couchDB->has_error ) {
                if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
                    $log->info( "Incident with _id "
                          . $doc->{'_id'}
                          . " , was set aside for being processed at the end" );
                    push( @incidents, $doc );
                }
                else {
                    sync_changes( $doc, $mysql_schema );
                }
            }
            else {
                push( @messages, $couchDB->error );
                $j++;
            }
        }

        $log->info(
"If the document is incident, then updates are done into the database, no new records"
        );
        foreach (@incidents) {
            $log->info( "Processing incident with " . $_->{'_id'} );
            sync_changes( $_, $mysql_schema );
        }

        $log->warn( $j . " documents were skipped " );

        my %seen = ();
        foreach ( grep { not $seen{$_}++ } @messages ) {
            chomp;
            $log->warn( "error message " . join( ', ', $_ ) );
        }
    }
    else {
        $log->error(
            "The following exception was raised : " . $couchDB->error );
    }
}

sub sync_changes {
    my $log = get_logger();
    my ( $doc, $schema ) = @_;
    try {
        $schema->txn_do(
            sub {
                handle_case( $schema, $doc );
            }
        );
    }
    catch {
        my $msg = sprintf( '%s',
              ( blessed $_ && $_->can('rethrow') )
            ? ( $_->isa('DBIx::Class::Exception') )
                  ? $_
                  : ( $_->isa('Exception::Class') ) ? $_->error
                : $_
            : $_ );
        $log->error(
                pack( "A41", ( defined $doc->{'_id'}  ? $doc->{'_id'}  : "" ) )
              . pack( "A37", ( defined $doc->{'_rev'} ? $doc->{'_rev'} : "" ) )
              . $msg );

    };
}

sub handle_case {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    if (   !is_internal( $schema, $doc )
        && !is_there( $schema, $doc )
        && is_valid( $schema, $doc ) )
    {

        # cleaning up
        clean_up( $schema, $doc );

        # other tables are pointing the them
        p_users( $schema, $doc );
        p_tblCase( $schema, $doc );

        # no table is pointing to them
        p_tblCareTeam( $schema, $doc );
        p_tblCentreSubstance( $schema, $doc );
        p_tblClinicalFeature( $schema, $doc );
        p_tblCommunication( $schema, $doc );
        p_tblExposure_Route( $schema, $doc );
        p_tblInvestigation( $schema, $doc );
        p_tblLocation( $schema, $doc );
        p_tblNotes( $schema, $doc );
        p_tblPatient( $schema, $doc );
        p_tblReferral( $schema, $doc );
        p_tblSubstance( $schema, $doc );
        p_tblTreatment( $schema, $doc );

        # pending

        $log->info(
                pack( "A41", $doc->{'_id'} )
              . pack( "A37", $doc->{'_rev'} )
              . 'Processed as '
              . $doc->{'type'} );

    }
    else {
        if ( is_valid( $schema, $doc ) ) {
            $log->info(
                    pack( "A41", $doc->{'_id'} )
                  . pack( "A37", $doc->{'_rev'} )
                  . 'Already processed' );
        }
        else {
            $log->info(
                    pack( "A41", $doc->{'_id'} )
                  . pack( "A37", $doc->{'_rev'} )
                  . 'Deleted skipping processing' );
        }
    }
    return;
}

sub is_internal {
    my ( $schema, $doc ) = @_;
    my $id_case = $doc->{'_id'};

    if ( $id_case =~ m/_design/ ) {
        return 1;
    }

    return 0;
}

sub is_there {
    my ( $schema, $doc ) = @_;
    my $id_case  = $doc->{'_id'};
    my $revision = $doc->{'_rev'};
    my $case     = $schema->resultset('TblCase')
      ->single( { 'id_case' => $id_case, 'revid' => $revision } );
    return $case->{'_in_storage'};
}

sub is_valid {
    my ( $schema, $doc ) = @_;
    my $case_status = $doc->{'status'};

    if ( !defined $case_status ) {
        return 1;
    }

    if ( $case_status eq "deleted" ) {
        return 0;
    }
    else {
        return 1;
    }
}

sub is_user_there {
    my ( $schema, $id ) = @_;

    my $case = $schema->resultset('User')->single( { 'id' => $id } );
    return $case->{'_in_storage'};
}

sub clean_up {
    my ( $schema, $doc ) = @_;
    my $de_rs;
    $de_rs =
      $schema->resultset('TblCareTeam')->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs =
      $schema->resultset('TblLocation')->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs = $schema->resultset('TblCentreSubstance')
      ->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs = $schema->resultset('TblClinicalFeature')
      ->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs = $schema->resultset('TblCommunication')
      ->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs = $schema->resultset('TblExposureRoute')
      ->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs = $schema->resultset('TblInvestigation')
      ->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs =
      $schema->resultset('TblNote')->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs =
      $schema->resultset('TblPatient')->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs =
      $schema->resultset('TblReferral')->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs = $schema->resultset('TblSubstance')
      ->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs = $schema->resultset('TblTreatment')
      ->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }

    $de_rs =
      $schema->resultset('TblCase')->search( { id_case => $doc->{'_id'} } );
    if ( defined $de_rs ) {
        $de_rs->delete;
    }
}

sub p_users {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;
    my $c1 = 0;
    foreach my $c ( @{ $doc->{'communications'} } ) {
        my $id      = convert_empty( $c->{'spi'}{'id'} );
        my $name    = convert_empty( $c->{'spi'}{'name'} );
        my $email   = convert_empty( $c->{'spi'}{'email'} );
        my $phone   = convert_empty( $c->{'spi'}{'phone'} );
        my $job     = convert_empty( $c->{'spi'}{'job'} );
        my $id_site = convert_empty( $c->{'spi'}{'siteId'} );

        no warnings;
        $log->debug("[$c0.communications.$c1.spi.id] $id");
        $log->debug("[$c0.communications.$c1.spi.name] $name");
        $log->debug("[$c0.communications.$c1.spi.email] $email");
        $log->debug("[$c0.communications.$c1.spi.phone] $phone");
        $log->debug("[$c0.communications.$c1.spi.job] $job");
        $log->debug("[$id_site]");
        use warnings;

        if ( !is_user_there( $schema, $id ) ) {
            my $ne_rs = $schema->resultset('User')->create(
                {
                    id      => $id,
                    name    => $name,
                    email   => $email,
                    phone   => $phone,
                    job     => $job,
                    id_site => $id_site
                }

            );
            $ne_rs->insert();
        }
        $c1++;
    }

    foreach my $c ( @{ $doc->{'features'} } ) {

        my $id      = convert_empty( $c->{'spi'}{'id'} );
        my $name    = convert_empty( $c->{'spi'}{'name'} );
        my $email   = convert_empty( $c->{'spi'}{'email'} );
        my $phone   = convert_empty( $c->{'spi'}{'phone'} );
        my $job     = convert_empty( $c->{'spi'}{'job'} );
        my $id_site = convert_empty( $c->{'spi'}{'siteId'} );

        no warnings;
        $log->debug("[$c0.features.$c1.spi.id] $id");
        $log->debug("[$c0.features.$c1.spi.name] $name");
        $log->debug("[$c0.features.$c1.spi.email] $email");
        $log->debug("[$c0.features.$c1.spi.phone] $phone");
        $log->debug("[$c0.features.$c1.spi.job] $job");
        $log->debug("[$id_site]");
        use warnings;

        if ( !is_user_there( $schema, $id ) ) {

            my $ne_rs = $schema->resultset('User')->create(
                {
                    id      => $id,
                    name    => $name,
                    email   => $email,
                    phone   => $phone,
                    job     => $job,
                    id_site => $id_site
                }

            );
            $ne_rs->insert();
        }
        $c1++;
    }

    foreach my $c ( @{ $doc->{'treatments'} } ) {
        my $id      = convert_empty( $c->{'spi'}{'id'} );
        my $name    = convert_empty( $c->{'spi'}{'name'} );
        my $email   = convert_empty( $c->{'spi'}{'email'} );
        my $phone   = convert_empty( $c->{'spi'}{'phone'} );
        my $job     = convert_empty( $c->{'spi'}{'job'} );
        my $id_site = convert_empty( $c->{'spi'}{'siteId'} );

        no warnings;
        $log->debug("[$c0.treatments.$c1.spi.id] $id");
        $log->debug("[$c0.treatments.$c1.spi.name] $name");
        $log->debug("[$c0.treatments.$c1.spi.email] $email");
        $log->debug("[$c0.treatments.$c1.spi.phone] $phone");
        $log->debug("[$c0.treatments.$c1.spi.job] $job");
        $log->debug("[$id_site]");
        use warnings;

        if ( !is_user_there( $schema, $id ) ) {

            my $ne_rs = $schema->resultset('User')->create(
                {
                    id      => $id,
                    name    => $name,
                    email   => $email,
                    phone   => $phone,
                    job     => $job,
                    id_site => $id_site
                }

            );
            $ne_rs->insert();
        }
        $c1++;
    }

    if ( defined $doc->{'notes'} ) {
        my %notes = %{ $doc->{'notes'} };
        foreach my $k ( sort keys %notes ) {

            my $id      = convert_empty( $notes{$k}{'spi'}{'id'} );
            my $name    = convert_empty( $notes{$k}{'spi'}{'name'} );
            my $email   = convert_empty( $notes{$k}{'spi'}{'email'} );
            my $phone   = convert_empty( $notes{$k}{'spi'}{'phone'} );
            my $job     = convert_empty( $notes{$k}{'spi'}{'job'} );
            my $id_site = convert_empty( $notes{$k}{'spi'}{'siteId'} );

            no warnings;
            $log->debug("[$c0.notes.$c1.spi.id] $id");
            $log->debug("[$c0.notes.$c1.spi.name] $name");
            $log->debug("[$c0.notes.$c1.spi.email] $email");
            $log->debug("[$c0.notes.$c1.spi.phone] $phone");
            $log->debug("[$c0.notes.$c1.spi.job] $job");
            $log->debug("[$id_site]");
            use warnings;

            if ( !is_user_there( $schema, $id ) ) {

                my $ne_rs = $schema->resultset('User')->create(
                    {
                        id      => $id,
                        name    => $name,
                        email   => $email,
                        phone   => $phone,
                        job     => $job,
                        id_site => $id_site
                    }

                );
                $ne_rs->insert();
            }
            $c1++;
        }
    }
}

sub p_tblTreatment {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;
    my $c1 = 0;

    foreach my $c ( @{ $doc->{'treatments'} } ) {

        my $treat_disposition = $c->{'disposition'};
        my $treat_timestamp   = convert_timestamp( $c->{'timestamp'} );
        my $id_case           = $doc->{'_id'};
        my $users_id          = $c->{'spi'}->{'id'};
        my %treatments        = %{ $c->{'treatments'} };
        my $treatment;

        foreach my $k ( sort keys %treatments ) {
            foreach my $v ( @{ $treatments{$k} } ) {
                $treatment = $k . ' : ' . $v;
                foreach my $id_note ( @{ $c->{'notes'} } ) {
                    my $id_treatment = $c1;
                    my $id_notes     = $id_note;
                    no warnings;
                    $log->debug("[$id_treatment]");
                    $log->debug(
                        "[$c0.treatments.$c1.disposition] $treat_disposition");
                    $log->debug(
                        "[$c0.treatments.$c1.timestamp] $treat_timestamp");
                    $log->debug("[$id_case]");
                    $log->debug("[$users_id]");
                    $log->debug("[$c0.treatments.$c1.treatments] $treatment");
                    $log->debug("[$c0.treatments.$c1.notes] $id_notes");
                    use warnings;

                    if ( defined $doc->{'type'}
                        && $doc->{'type'} eq 'incident' )
                    {
                        undef;
                    }
                    else {

                        my $ne_rs = $schema->resultset('TblTreatment')->create(
                            {
                                id_treatment      => $id_treatment,
                                treat_disposition => $treat_disposition,
                                treat_timestamp   => $treat_timestamp,
                                id_case           => $id_case,
                                users_id          => $users_id,
                                treatment         => $treatment,
                                id_notes          => $id_notes
                            }
                        );
                        $ne_rs->insert();
                        $c1++;
                    }
                }
            }
        }
    }
}

sub p_tblSubstance {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;
    my $c1 = 0;

    foreach my $c ( @{ $doc->{'agents'} } ) {

        my $id_substance              = $c->{'id'};
        my $substance_name            = convert_empty( $c->{'name'} );
        my $substance_category        = convert_empty( $c->{'category'} );
        my $substance_dosage_quantity = convert_empty(
            (
                $c->{'dosage'}{'quantity'} eq ""
                ? undef
                : $c->{'dosage'}{'quantity'}
            )
        );
        my $substance_dosage_units = $c->{'dosage'}{'units'};
        my $substance_dosage_unknown =
          convert_empty( $c->{'dosage'}{'unknown'} );
        my $substance_duration = convert_empty(
            $c->{'exposure'}{'duration'} eq ""
            ? undef
            : $c->{'exposure'}{'duration'}
        );
        my $substance_duration_units = $c->{'exposure'}{'durationUnits'};
        my $substance_exposure_timestamp_utc = convert_timestamp(
            (
                $c->{'exposure'}{'timestamp'} eq ""
                ? undef
                : $c->{'exposure'}{'timestamp'}
            )
        );
        my $substance_exposure_type = convert_empty( $c->{'exposure'}{'type'} );
        my $substance_eupcs         = convert_empty( $c->{'eupcs'} );
        my $substance_intended_use_given =
          convert_empty( $c->{'intendedUseGiven'} );
        my $substance_patientsownmedication = convert_empty(
            (
                defined $c->{'isPatientsOwnMedication'}
                  && $c->{'isPatientsOwnMedication'} eq ""
                ? undef
                : $c->{'isPatientsOwnMedication'}

            )
        );
        my $substance_type = $c->{'type'};
        my $id_case        = $doc->{'_id'};
        my $exposure_circumstance =
          convert_empty( $doc->{'patient'}{'circumstance'} );

        no warnings;
        $log->debug("[$c0.agents.$c1.id] $id_substance");
        $log->debug("[$c0.agents.$c1.name] $substance_name");
        $log->debug("[$c0.agents.$c1.category] $substance_category");
        $log->debug(
            "[$c0.agents.$c1.dosage.quantity] $substance_dosage_quantity");
        $log->debug("[$c0.agents.$c1.dosage.units] $substance_dosage_units");
        $log->debug(
            "[$c0.agents.$c1.dosage.unknown] $substance_dosage_unknown");
        $log->debug("[$c0.agents.$c1.exposure.duration] $substance_duration");
        $log->debug(
            "[$c0.agents.$c1.exposure.durationUnits] $substance_duration_units"
        );
        $log->debug(
"[$c0.agents.$c1.exposure.timestamp] $substance_exposure_timestamp_utc"
        );
        $log->debug("[$c0.agents.$c1.exposure.type] $substance_exposure_type");
        $log->debug("[$c0.agents.$c1.eupcs] $substance_eupcs");
        $log->debug(
            "[$c0.agents.$c1.intendedUseGiven] $substance_intended_use_given");
        $log->debug(
"[$c0.agents.$c1.isPatientsOwnMedication] $substance_patientsownmedication"
        );
        $log->debug("[$c0.agents.$c1.type] $substance_type");
        $log->debug("[$id_case]");
        $log->debug("[$c0.patient.circumstance] $exposure_circumstance");
        use warnings;

        if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
            undef;
        }
        else {

            if ( ref $substance_type eq 'ARRAY' ) {
                foreach my $stype ( @{$substance_type} ) {
                    my $ne_rs = $schema->resultset('TblSubstance')->create(
                        {
                            id_substance       => $id_substance,
                            substance_name     => $substance_name,
                            substance_category => $substance_category,
                            substance_dosage_quantity =>
                              $substance_dosage_quantity,
                            substance_dosage_units => $substance_dosage_units,
                            substance_dosage_unknown =>
                              $substance_dosage_unknown,
                            substance_duration => $substance_duration,
                            substance_duration_units =>
                              $substance_duration_units,
                            substance_exposure_timestamp_utc =>
                              $substance_exposure_timestamp_utc,
                            substance_exposure_type => $substance_exposure_type,
                            substance_eupcs         => $substance_eupcs,
                            substance_intended_use_given =>
                              $substance_intended_use_given,
                            substance_patientsownmedication =>
                              $substance_patientsownmedication,
                            substance_type        => convert_empty($stype),
                            id_case               => $id_case,
                            exposure_circumstance => $exposure_circumstance

                        }
                    );

                    $ne_rs->insert();
                    $c1++;
                }

            }
            else {
                my $ne_rs = $schema->resultset('TblSubstance')->create(
                    {
                        id_substance              => $id_substance,
                        substance_name            => $substance_name,
                        substance_category        => $substance_category,
                        substance_dosage_quantity => $substance_dosage_quantity,
                        substance_dosage_units    => $substance_dosage_units,
                        substance_dosage_unknown  => $substance_dosage_unknown,
                        substance_duration        => $substance_duration,
                        substance_duration_units  => $substance_duration_units,
                        substance_exposure_timestamp_utc =>
                          $substance_exposure_timestamp_utc,
                        substance_exposure_type => $substance_exposure_type,
                        substance_eupcs         => $substance_eupcs,
                        substance_intended_use_given =>
                          $substance_intended_use_given,
                        substance_patientsownmedication =>
                          $substance_patientsownmedication,
                        substance_type        => convert_empty($substance_type),
                        id_case               => $id_case,
                        exposure_circumstance => $exposure_circumstance

                    }
                );

                $ne_rs->insert();
                $c1++;

            }
        }
    }
}

sub p_tblReferral {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;
    my $c1 = 0;

    foreach my $c ( @{ $doc->{'referrals'} } ) {

        my $id_referral        = $c1;
        my $referee            = convert_empty( $c->{'referee'} );
        my $speciality         = convert_empty( $c->{'specialty'} );
        my $referral_timestamp = convert_timestamp( $c->{'timestamp'} );
        my $id_case            = $doc->{'_id'};
        my $id_notes           = $c->{'noteId'};

        no warnings;
        $log->debug("[$id_referral]");
        $log->debug("[$c0.referrals.$c1.referee] $referee");
        $log->debug("[$c0.referrals.$c1.specialty] $speciality");
        $log->debug("[$c0.referrals.$c1.timestamp] $referral_timestamp");
        $log->debug("[$id_case]");
        $log->debug("[$c0.referrals.$c1.noteId] $id_notes");
        use warnings;

        if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
            undef;
        }
        else {
            my $ne_rs = $schema->resultset('TblReferral')->create(
                {
                    id_referral        => $id_referral,
                    referee            => $referee,
                    speciality         => $speciality,
                    referral_timestamp => $referral_timestamp,
                    id_case            => $id_case,
                    id_notes           => $id_notes
                }
            );

            $ne_rs->insert();
            $c1++;
        }
    }
}

sub p_tblPatient {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0          = 0;
    my $id_case     = $doc->{'_id'};
    my $patient_age = convert_empty(
        (
            defined $doc->{'patient'}{'age'}
              and $doc->{'patient'}{'age'} eq ""
            ? undef
            : $doc->{'patient'}{'age'}
        )
    );
    my $patient_age_units   = convert_empty( $doc->{'patient'}{'ageUnits'} );
    my $patient_age_group   = convert_empty( $doc->{'patient'}{'ageGroup'} );
    my $patient_category    = convert_empty( $doc->{'patient'}{'category'} );
    my $patient_animal_type = convert_empty( $doc->{'patient'}{'animalType'} );
    my $patient_gender      = convert_empty( $doc->{'patient'}{'gender'} );
    my $patient_mrn = convert_empty( $doc->{'patient'}{'medicalRecordNumber'} );
    my $patient_occupation = convert_empty( $doc->{'patient'}{'occupation'} );
    my $patient_weight     = convert_empty( $doc->{'patient'}{'weight'} );
    my $patient_weight_units =
      convert_empty( $doc->{'patient'}{'weightUnits'} );
    my $patient_pregnant_status =
      convert_empty( $doc->{'patient'}{'pregnant'}{'status'} );
    my $patient_pregnant_lactating =
      convert_empty( $doc->{'patient'}{'pregnant'}{'lactating'} );
    my $patient_pregnant_trimester =
      convert_empty( $doc->{'patient'}{'pregnant'}{'trimester'} );
    my $patient_pregnant_trimester_unknown =
      convert_empty( $doc->{'patient'}{'pregnant'}{'trimesterUnknown'} );
    my $patient_poison_risk_assessment =
      convert_empty( $doc->{'patient'}{'riskAssessment'} );

    no warnings;
    $log->debug("[$id_case]");
    $log->debug("[$c0.patient.age] $patient_age");
    $log->debug("[$c0.patient.ageUnits] $patient_age_units");
    $log->debug("[$c0.patient.ageGroup] $patient_age_group");
    $log->debug("[$c0.patient.category] $patient_category");
    $log->debug("[$c0.patient.animalType] $patient_animal_type");
    $log->debug("[$c0.patient.gender] $patient_gender");
    $log->debug("[$c0.patient.medicalRecordNumber] $patient_mrn");
    $log->debug("[$c0.patient.occupation] $patient_occupation");
    $log->debug("[$c0.patient.weight] $patient_weight");
    $log->debug("[$c0.patient.weightUnits] $patient_weight_units");
    $log->debug("[$c0.patient.pregnant.status] $patient_pregnant_status");
    $log->debug("[$c0.patient.pregnant.lactating] $patient_pregnant_lactating");
    $log->debug("[$c0.patient.pregnant.trimester] $patient_pregnant_trimester");
    $log->debug(
"[$c0.patient.pregnant.trimesterUnknown] $patient_pregnant_trimester_unknown"
    );
    $log->debug(
        "[$c0.patient.pregnant.riskAssessment] $patient_poison_risk_assessment"
    );

    use warnings;

    if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
        undef;
    }
    else {

        my $ne_rs = $schema->resultset('TblPatient')->create(
            {
                id_case                    => $id_case,
                patient_age                => $patient_age,
                patient_age_units          => $patient_age_units,
                patient_age_group          => $patient_age_group,
                patient_category           => $patient_category,
                patient_animal_type        => $patient_animal_type,
                patient_gender             => $patient_gender,
                patient_mrn                => $patient_mrn,
                patient_occupation         => $patient_occupation,
                patient_weight             => $patient_weight,
                patient_weight_units       => $patient_weight_units,
                patient_pregnant_status    => $patient_pregnant_status,
                patient_pregnant_lactating => $patient_pregnant_lactating,
                patient_pregnant_trimester => $patient_pregnant_trimester,
                patient_pregnant_trimester_unknown =>
                  $patient_pregnant_trimester_unknown,
                patient_poison_risk_assessment =>
                  $patient_poison_risk_assessment

            }
        );
        $ne_rs->insert();
    }
}

sub p_tblNotes {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;
    my $c1 = 0;
    if ( defined $doc->{'notes'} ) {
        my %notes = %{ $doc->{'notes'} };
        foreach my $k ( sort keys %notes ) {
            my $id_notes        = $notes{$k}{'id'};
            my $notes_context   = convert_empty( $notes{$k}{'context'} );
            my $notes_title     = convert_empty( $notes{$k}{'title'} );
            my $notes_content   = convert_empty( $notes{$k}{'content'} );
            my $notes_timestamp = convert_timestamp( $notes{$k}{'timestamp'} );
            my $spi_users_id    = convert_empty( $notes{$k}{'spi'}{'id'} );
            my $id_case         = $doc->{'_id'};

            no warnings;
            $log->debug(
"[$c0.notes.9aaf4cd3fb70b159c19a978029214cdc332d1efa.id] $id_notes"
            );
            $log->debug(
"[$c0.notes.9aaf4cd3fb70b159c19a978029214cdc332d1efa.context] $notes_context"
            );
            $log->debug(
"[$c0.notes.9aaf4cd3fb70b159c19a978029214cdc332d1efa.title] $notes_title"
            );
            $log->debug(
"[$c0.notes.9aaf4cd3fb70b159c19a978029214cdc332d1efa.content] $notes_content"
            );
            $log->debug(
"[$c0.notes.9aaf4cd3fb70b159c19a978029214cdc332d1efa.timestamp] $notes_timestamp"
            );
            $log->debug("[$spi_users_id]");
            $log->debug("[$id_case]");
            use warnings;

            if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
                undef;
            }
            else {
                if ( defined $notes_content ) {
                    my $ne_rs = $schema->resultset('TblNote')->create(
                        {
                            id_notes        => $id_notes,
                            notes_context   => $notes_context,
                            notes_title     => $notes_title,
                            notes_content   => $notes_content,
                            notes_timestamp => $notes_timestamp,
                            spi_users_id    => $spi_users_id,
                            id_case         => $id_case
                        }

                    );

                    $ne_rs->insert();
                    $c1++;
                }
            }
        }
    }
}

sub p_tblInvestigation {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;
    my $c1 = 0;

    foreach my $c ( @{ $doc->{'investigations'} } ) {

        if ( ref $c->{'results'} eq "ARRAY" ) {
            foreach ( @{ $c->{'results'} } ) {
                my $id_investigation      = $c1;
                my $id_case               = $doc->{'_id'};
                my $investigation_request = $c->{'request'};
                my $investigation_result  = ( $_ eq "" ? undef : $_ );

                no warnings;
                $log->debug("[$id_investigation]");
                $log->debug("[$id_case]");
                $log->debug(
                    "[$c0.investigations.$c1.request] $investigation_request");
                $log->debug(
                    "[$c0.investigations.$c1.results] $investigation_result");
                use warnings;

                if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
                    undef;
                }
                else {
                    my $ne_rs = $schema->resultset('TblInvestigation')->create(
                        {
                            id_investigation      => $id_investigation,
                            id_case               => $id_case,
                            investigation_request => $investigation_request,
                            investigation_result  => $investigation_result
                        }

                    );

                    $ne_rs->insert();
                    $c1++;
                }
            }
        }
        else {
            my $id_investigation      = $c1;
            my $id_case               = $doc->{'_id'};
            my $investigation_request = $c->{'request'};
            my $investigation_result =
              ( $c->{'results'} eq "" ? undef : $c->{'results'} );

            no warnings;
            $log->debug("[$id_investigation]");
            $log->debug("[$id_case]");
            $log->debug(
                "[$c0.investigations.$c1.request] $investigation_request");
            $log->debug(
                "[$c0.investigations.$c1.results] $investigation_result");
            use warnings;

            if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
                undef;
            }
            else {

                my $ne_rs = $schema->resultset('TblInvestigation')->create(
                    {
                        id_investigation      => $id_investigation,
                        id_case               => $id_case,
                        investigation_request => $investigation_request,
                        investigation_result  => $investigation_result
                    }

                );

                $ne_rs->insert();
                $c1++;
            }
        }
    }
}

sub p_tblExposure_Route {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;
    my $c1 = 0;

    foreach my $c ( @{ $doc->{'agents'} } ) {

        if ( ref $c->{'exposure'}{'route'} eq "ARRAY" ) {
            foreach ( @{ $c->{'exposure'}{'route'} } ) {
                my $id_exposure_route = $c1;
                my $route             = convert_empty($_);
                my $id_substance      = $c->{'id'};
                my $id_case           = $doc->{'_id'};

                no warnings;
                $log->debug("[$id_exposure_route]");
                $log->debug("[$c0.agents.$c1.exposure.route] $route");
                $log->debug("[$id_substance]");
                $log->debug("[$id_case]");
                use warnings;

                if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
                    undef;
                }
                else {
                    my $ne_rs = $schema->resultset('TblExposureRoute')->create(
                        {
                            id_exposure_route => $id_exposure_route,
                            route             => $route,
                            id_substance      => $id_substance,
                            id_case           => $id_case
                        }

                    );

                    $ne_rs->insert();
                    $c1++;
                }
            }
        }
        else {
            my $id_exposure_route = $c1;
            my $route             = convert_empty( $c->{'exposure'}{'route'} );
            my $id_substance      = $c->{'id'};
            my $id_case           = $doc->{'_id'};

            no warnings;
            $log->debug("[$id_exposure_route]");
            $log->debug("[$c0.agents.$c1.exposure.route] $route");
            $log->debug("[$id_substance]");
            $log->debug("[$id_case]");
            use warnings;

            if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
                undef;
            }
            else {
                my $ne_rs = $schema->resultset('TblExposureRoute')->create(
                    {
                        id_exposure_route => $id_exposure_route,
                        route             => $route,
                        id_substance      => $id_substance,
                        id_case           => $id_case
                    }

                );

                $ne_rs->insert();
                $c1++;
            }
        }
    }
}

sub p_tblCommunication {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;
    my $c1 = 1;
    my $patient_poison_severity_score =
      $doc->{'patient'}{'poisonSeverityScore'};

    foreach my $c ( @{ $doc->{'communications'} } ) {
        my $id_communication    = $c1;
        my $comms_direction     = convert_empty( $c->{'direction'} );
        my $comms_deleted       = convert_empty( $c->{'deleted'} );
        my $comms_medium_detail = convert_empty( $c->{'medium'}{'detail'} );
        my $comms_medium_type   = convert_empty( $c->{'medium'}{'type'} );

        my $comms_sequenceid;
        if ( defined convert_empty( $c->{'sequenceId'} ) ) {
            $comms_sequenceid = convert_empty( $c->{'sequenceId'} );
        }
        else {
            $comms_sequenceid = $c1;
        }

        my $comms_type      = convert_empty( $c->{'type'} );
        my $comms_timestamp = convert_timestamp( $c->{'timestamp'} );
        my $id_case         = $doc->{'_id'};
        my $users_id        = $c->{'spi'}->{'id'};
        my $caller_category = convert_empty( $c->{'interlocutor'}{'category'} );
        my $name =
          convert_empty( $c->{'interlocutor'}{'organisation'}{'name'} );
        my $address1 =
          convert_empty( $c->{'interlocutor'}{'organisation'}{'address1'} );
        my $address2 =
          convert_empty( $c->{'interlocutor'}{'organisation'}{'address2'} );
        my $city =
          convert_empty( $c->{'interlocutor'}{'organisation'}{'city'} );
        my $state =
          convert_empty( $c->{'interlocutor'}{'organisation'}{'state'} );
        my $country =
          convert_empty( $c->{'interlocutor'}{'organisation'}{'country'} );
        my $telephone =
          convert_empty( $c->{'interlocutor'}{'organisation'}{'telephone'} );
        my $latitude = convert_empty(
            $c->{'interlocutor'}{'organisation'}{'geometry'}{'lat'} );
        my $longitude = convert_empty(
            $c->{'interlocutor'}{'organisation'}{'geometry'}{'lng'} );

        # 2019.06.27
        #my $place_id = convert_empty(
        #    $c->{'interlocutor'}{'organisation'}{'geometry'}{'location'} );
        #my $place_id =
        #  convert_empty( $c->{'interlocutor'}{'organisation'}{'placeId'} );
        my $location_type = convert_empty( $c->{'type'} );
        my $iso_country =
          convert_empty( $c->{'interlocutor'}{'organisation'}{'isoCountry'} );

        # 2019.06.27
        #my $postcode      = convert_empty(
        #    $c->{'interlocutor'}{'organisation'}{'geometry'}{'postcode'} );
        my $postcode =
          convert_empty( $c->{'interlocutor'}{'organisation'}{'postcode'} );

        no warnings;
        $log->debug("[$id_communication]");
        $log->debug("[$c0.communications.$c1.direction] $comms_direction");
        $log->debug("[$c0.communications.$c1.deleted] $comms_deleted");
        $log->debug(
            "[$c0.communications.$c1.medium.detail] $comms_medium_detail");
        $log->debug("[$c0.communications.$c1.medium.type] $comms_medium_type");
        $log->debug("[$c0.communications.$c1.sequenceId] $comms_sequenceid");
        $log->debug("[$c0.communications.$c1.type] $comms_type");
        $log->debug("[$c0.communications.$c1.timestamp] $comms_timestamp");
        $log->debug("[$id_case]");
        $log->debug("[$users_id]");
        $log->debug(
            "[$c0.communications.$c1.interlocutor.category] $caller_category");
        $log->debug(
            "[$c0.patient.poisonSeverityScore]] $patient_poison_severity_score"
        );
        $log->debug(
            "[$c0.communications.$c1.interlocutor.organisation.name $name");
        $log->debug(
"[$c0.communications.$c1.interlocutor.organisation.address1] $address1"
        );
        $log->debug(
"[$c0.communications.$c1.interlocutor.organisation.address2] $address2"
        );
        $log->debug(
            "[$c0.communications.$c1.interlocutor.organisation.city]  $city");
        $log->debug(
            "[$c0.communications.$c1.interlocutor.organisation.state] $state");
        $log->debug(
"[$c0.communications.$c1.interlocutor.organisation.country] $country"
        );
        $log->debug(
"[$c0.communications.$c1.interlocutor.organisation.telephone] $telephone"
        );
        $log->debug(
"[$c0.communications.$c1.interlocutor.organisation.geometry.lat] $latitude"
        );
        $log->debug(
"[$c0.communications.$c1.interlocutor.organisation.geometry.lng] $longitude"
        );

        #say
        #"[$c0.communications.$c1.interlocutor.organisation.location] $place_id"
        #  if ($DEBUG);

        $log->debug("[$location_type]");
        $log->debug("[$iso_country]");
        $log->debug(
"[$c0.communications.$c1.interlocutor.organisation.postcode] $postcode"
        );
        use warnings;

        if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
            undef;
        }
        else {

            my $ne_rs = $schema->resultset('TblCommunication')->create(
                {
                    id_communication    => $id_communication,
                    comms_direction     => $comms_direction,
                    comms_deleted       => $comms_deleted,
                    comms_medium_detail => $comms_medium_detail,
                    comms_medium_type   => $comms_medium_type,
                    comms_sequenceid    => $comms_sequenceid,
                    comms_type          => $comms_type,
                    comms_timestamp     => convert_timestamp($comms_timestamp),
                    id_case             => $id_case,
                    users_id            => $users_id,
                    caller_category     => $caller_category,
                    patient_poison_severity_score =>
                      $patient_poison_severity_score,
                    name      => $name,
                    address1  => $address1,
                    address2  => $address2,
                    city      => $city,
                    state     => $state,
                    country   => $country,
                    telephone => $telephone,
                    latitude  => $latitude,
                    longitude => $longitude,

                    #place_id      => defined $place_id ? $place_id : undef,
                    location_type => defined $location_type ? $location_type
                    : undef,
                    iso_country => defined $iso_country ? uc($iso_country)
                    : undef,
                    postcode => $postcode
                }

            );
            $ne_rs->insert();
            $c1++;
        }
    }
}

sub p_tblClinicalFeature {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;
    my $c1 = 0;

    foreach my $c ( @{ $doc->{'features'} } ) {
        my $id_case            = $doc->{'_id'};
        my $id_clinicalfeature = $c1;
        my $cf_when            = convert_empty( $c->{'when'} );
        my $cf_timestamp       = convert_timestamp( $c->{'timestamp'} );
        my $cf_spi_users_id    = $c->{'spi'}->{'id'};
        my $cf_category  = undef;                      # see below
        my $cf_detail    = undef;                      # see below
        my %descriptions = %{ $c->{'descriptors'} };

        foreach my $k ( sort keys %descriptions ) {
            $cf_category = convert_empty($k);
            foreach my $g ( @{ $descriptions{$k} } ) {
                $cf_detail          = convert_empty($g);
                $id_clinicalfeature = $c1;
                no warnings;
                $log->debug("[$id_clinicalfeature]");
                $log->debug("[$c0.features.$c1.when $cf_when");
                $log->debug("[$c0.features.$c1.timestamp $cf_timestamp");
                $log->debug("[$id_case]");
                $log->debug("[$cf_spi_users_id]");
                $log->debug("[$c0.features.$c1.descriptors $cf_category");
                $log->debug("[$c0.features.$c1.descriptors $cf_detail");
                use warnings;

                if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
                    undef;
                }
                else {
                    my $ne_rs =
                      $schema->resultset('TblClinicalFeature')->create(
                        {
                            id_clinicalfeature => $id_clinicalfeature,
                            cf_when            => $cf_when,
                            cf_timestamp       => $cf_timestamp,
                            id_case            => $id_case,
                            cf_spi_users_id    => $cf_spi_users_id,
                            cf_category        => $cf_category,
                            cf_detail          => $cf_detail
                        }
                      );

                    $ne_rs->insert();
                    $c1++;
                }
            }
        }
    }
}

sub p_tblCentreSubstance {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;
    my $c1 = 0;

    foreach my $c ( @{ $doc->{'agents'} } ) {
        my $c2 = 0;
        foreach my $i ( @{ $c->{'centreAgents'} } ) {
            my $id_case = $doc->{'_id'};
            my $name    = convert_empty( $i->{'name'} );
            my $URL     = ( $i->{'url'} eq "" ? undef : $i->{'url'} );
            my $quantity =
              ( $i->{'quantity'} eq "" ? undef : $i->{'quantity'} );
            my $units        = ( $i->{'units'} eq "" ? undef : $i->{'units'} );
            my $id_substance = $c->{'id'};
            my $id_substance_counter = $c2;

            no warnings;
            $log->debug("[$c0.agents.$c1.centreAgents.$c2.id_case $id_case");
            $log->debug("[$c0.agents.$c1.centreAgents.$c2.name $name");
            $log->debug("[$c0.agents.$c1.centreAgents.$c2.url $URL");
            $log->debug("[$c0.agents.$c1.centreAgents.$c2.quantity $quantity");
            $log->debug("[$c0.agents.$c1.centreAgents.$c2.units $units");
            $log->debug("[$id_substance]");
            $log->debug("[$id_substance_counter]");
            use warnings;

            if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
                undef;
            }
            else {

                my $ne_rs = $schema->resultset('TblCentreSubstance')->create(
                    {
                        id_case              => $id_case,
                        name                 => $name,
                        url                  => $URL,
                        quantity             => $quantity,
                        units                => $units,
                        id_substance         => $id_substance,
                        id_substance_counter => $id_substance_counter
                    }
                );

                $ne_rs->insert();
                $c2++;
            }
        }
        $c1++;
    }
}

sub p_tblLocation {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;
    my $c0 = 0;

    my $c1      = 0;
    my $id_case = $doc->{'_id'};

    # 2019.06.27
    #my $city      = convert_empty( $doc->{'patient'}{'suburb'} );
    #my $latitude  = convert_empty( $doc->{'patient'}{'geometry'}{'lat'} );
    #my $longitude = convert_empty( $doc->{'patient'}{'geometry'}{'lng'} );
    #my $place_id  = convert_empty( $doc->{'patient'}{'location'} );
    #my $postcode  = convert_empty( $doc->{'patient'}{'postcode'} );
    #
    #no warnings;
    #say "[$id_case]"                            if ($DEBUG);
    #say "[$c0.patient.city]  $city"             if ($DEBUG);
    #say "[$c0.patient.geometry.lat] $latitude"  if ($DEBUG);
    #say "[$c0.patient.geometry.lng] $longitude" if ($DEBUG);
    #say "[$c0.patient.location] $place_id"      if ($DEBUG);
    #say "[$c0.patient.postcode] $postcode"      if ($DEBUG);
    #use warnings;
    #a.	picsi.tblLocation.Name
    #b.	picsi.tblLocation.address1
    #c.	picsi.tblLocation.address2
    #d.	picsi.tblLocation.city
    #e.	picsi.tblLocation.state
    #f.	picsi.tblLocation.country
    #g.	picsi.tblLocation.telephone
    #h.	picsi.tblLocation.latitude
    #i.	picsi.tblLocation.longitude
    #j.	picsi.tblLocation.place_id
    #k.	picsi.tblLocation.location_type
    #l.	picsi.tblLocation.ISO_Country
    #m.	picsi.tblLocation.postcode

    my $name      = convert_empty( $doc->{'patient'}{'locality'}{'name'} );
    my $address1  = convert_empty( $doc->{'patient'}{'locality'}{'address1'} );
    my $address2  = convert_empty( $doc->{'patient'}{'locality'}{'address2'} );
    my $city      = convert_empty( $doc->{'patient'}{'locality'}{'city'} );
    my $state     = convert_empty( $doc->{'patient'}{'locality'}{'state'} );
    my $country   = convert_empty( $doc->{'patient'}{'locality'}{'country'} );
    my $telephone = convert_empty( $doc->{'patient'}{'locality'}{'telephone'} );
    my $latitude =
      convert_empty( $doc->{'patient'}{'locality'}{'geometry'}{'lat'} );
    my $longitude =
      convert_empty( $doc->{'patient'}{'locality'}{'geometry'}{'lng'} );

    #my $place_id = convert_empty( $doc->{'patient'}{'locality'}{'placeId'} );
    my $location_type =
      convert_empty( $doc->{'patient'}{'locality'}{'location'} );
    my $iso_country =
      convert_empty( $doc->{'patient'}{'locality'}{'isoCountry'} );
    my $postcode = convert_empty( $doc->{'patient'}{'locality'}{'postcode'} );

    if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
        undef;
    }
    else {
        my $ne_rs = $schema->resultset('TblLocation')->create(
            {
                id_case   => $id_case,
                name      => $name,
                address1  => $address1,
                address2  => $address2,
                city      => $city,
                state     => $state,
                country   => $country,
                telephone => $telephone,
                latitude  => $latitude,
                longitude => $longitude,

                #place_id      => $place_id,
                location_type => $location_type,
                iso_country   => defined $iso_country ? uc $iso_country : undef,
                postcode      => $postcode

            }
        );
        $ne_rs->insert();
        $c1++;
    }
}

sub p_tblCareTeam {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0 = 0;

    #`tblCareTeam`	`tblCase_id_Case`	[0.siteCreated]
    #`tblCareTeam`	`tblSite_id_Site`	[0._id]

    my $tblcase_id_case = $doc->{'_id'};
    my $tblsite_id_site = $doc->{'siteCreated'};

    no warnings;
    $log->debug("[$c0._id] $tblcase_id_case");
    $log->debug("[$c0.siteCreated] $tblsite_id_site");
    use warnings;

    if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {
        undef;
    }
    else {
        my $ne_rs = $schema->resultset('TblCareTeam')->create(
            {
                id_case => $tblcase_id_case,
                id_site => $tblsite_id_site
            }
        );
        $ne_rs->insert();
    }
}

sub p_tblCase {
    my $log = get_logger();
    my ( $schema, $doc ) = @_;

    my $c0                = 0;
    my $id_case           = $doc->{'_id'};
    my $case_naturalid    = $doc->{'naturalId'};
    my $case_status       = convert_empty( $doc->{'status'} );
    my $case_topic        = convert_empty( $doc->{'topic'} );
    my $case_type         = $doc->{'type'};
    my $case_incidentid   = convert_empty( $doc->{'incidentId'} );
    my $revid             = lc $doc->{'_rev'};
    my $case_incidentname = undef;

    no warnings;
    $log->debug("[$c0._id] $id_case");
    $log->debug("[$c0._rev] $revid");
    $log->debug("[$c0.naturalId] $case_naturalid");
    $log->debug("[$c0.status] $case_status");
    $log->debug("[$c0.topic] $case_topic");
    $log->debug("[$c0.type] $case_type");
    $log->debug("[$c0.incidentId] $case_incidentid");
    $log->debug("[$c0.incidentname] $case_incidentname");
    use warnings;

    my $c1 = 0;

    #foreach my $f ( @{ $doc->{'features'} } ) {
    #    my $id_case_outcome = $c1;
    #    my $case_outcome    = $f->{'outcome'};
    #    no warnings;
    #    say "[$c0.features.$c1.$id_case_outcome] $id_case_outcome" if ($DEBUG);
    #    say "[$c0.features.$c1.outcome] $case_outcome"             if ($DEBUG);
    #    use warnings;

    if ( defined $doc->{'type'} && $doc->{'type'} eq 'incident' ) {

        my $case_incidentid   = $doc->{'_id'};
        my $case_incidentname = convert_empty( $doc->{'name'} );

        foreach my $id_case_ref ( @{ $doc->{'caseRefs'} } ) {
            $log->debug("[$c0.caseRefs.caseRefs._id] $case_incidentid");
            $log->debug("[$c0.caseRefs.caseRefs._name] $case_incidentname");
            $log->debug("[$c0.caseRefs.caseRefs._caseRefs] $id_case_ref");
            my $up_rs =
              $schema->resultset('TblCase')
              ->search( { id_case => $id_case_ref } );

            $up_rs->update(
                {
                    case_incidentname => $case_incidentname,
                    case_incidentid   => $case_incidentid
                }
            );
        }
    }
    else {
        my $ne_rs = $schema->resultset('TblCase')->create(
            {
                id_case => $id_case,

                #id_case_outcome => $id_case_outcome,
                case_naturalid  => $case_naturalid,
                case_status     => $case_status,
                case_topic      => $case_topic,
                case_type       => $case_type,
                case_incidentid => $case_incidentid,

                #case_outcome    => $case_outcome,
                revid => $revid
            }
        );

        $ne_rs->insert();
        $c1++;
    }
    $c0++;
}

sub convert_timestamp {
    my $timestamp = $_[0];

    #2018-11-13T01:35:41.385Z
    if ( defined $timestamp && $timestamp ne "" ) {
        my $year  = substr( $timestamp, 0,  4 );
        my $month = substr( $timestamp, 5,  2 );
        my $day   = substr( $timestamp, 8,  2 );
        my $hour  = substr( $timestamp, 11, 2 );
        my $min   = substr( $timestamp, 14, 2 );
        my $sec   = substr( $timestamp, 17, 2 );
        return
            $year . "-"
          . $month . "-"
          . $day . " "
          . $hour . ":"
          . $min . ":"
          . $sec;
    }
    else {
        return undef;
    }
}

sub convert_empty {
    no warnings;
    my $param = $_[0];
    use warnings;

    if ( !defined $param ) {
        return undef;
    }

    if ( defined $param && $param =~ m/^\s*$/g ) {
        return undef;
    }
    else {
        return join '', map { ucfirst lc $_ } split /(\s+)/, $param;
    }
}

