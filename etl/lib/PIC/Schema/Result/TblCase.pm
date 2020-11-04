use utf8;
package PIC::Schema::Result::TblCase;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblCase

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblCase>

=cut

__PACKAGE__->table("tblCase");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_nullable: 0
  size: 40

=head2 case_naturalid

  data_type: 'varchar'
  is_nullable: 0
  size: 24

=head2 case_status

  data_type: 'varchar'
  is_nullable: 1
  size: 7

=head2 case_topic

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 case_type

  data_type: 'varchar'
  is_nullable: 1
  size: 7

=head2 case_incidentid

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 revid

  data_type: 'varchar'
  is_nullable: 0
  size: 35

=head2 case_incidentname

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_nullable => 0, size => 40 },
  "case_naturalid",
  { data_type => "varchar", is_nullable => 0, size => 24 },
  "case_status",
  { data_type => "varchar", is_nullable => 1, size => 7 },
  "case_topic",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "case_type",
  { data_type => "varchar", is_nullable => 1, size => 7 },
  "case_incidentid",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "revid",
  { data_type => "varchar", is_nullable => 0, size => 35 },
  "case_incidentname",
  { data_type => "varchar", is_nullable => 1, size => 45 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=back

=cut

__PACKAGE__->set_primary_key("id_case");

=head1 RELATIONS

=head2 tbl_care_teams

Type: has_many

Related object: L<PIC::Schema::Result::TblCareTeam>

=cut

__PACKAGE__->has_many(
  "tbl_care_teams",
  "PIC::Schema::Result::TblCareTeam",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_centre_substances

Type: has_many

Related object: L<PIC::Schema::Result::TblCentreSubstance>

=cut

__PACKAGE__->has_many(
  "tbl_centre_substances",
  "PIC::Schema::Result::TblCentreSubstance",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_clinical_features

Type: has_many

Related object: L<PIC::Schema::Result::TblClinicalFeature>

=cut

__PACKAGE__->has_many(
  "tbl_clinical_features",
  "PIC::Schema::Result::TblClinicalFeature",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_communications

Type: has_many

Related object: L<PIC::Schema::Result::TblCommunication>

=cut

__PACKAGE__->has_many(
  "tbl_communications",
  "PIC::Schema::Result::TblCommunication",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_exposure_routes

Type: has_many

Related object: L<PIC::Schema::Result::TblExposureRoute>

=cut

__PACKAGE__->has_many(
  "tbl_exposure_routes",
  "PIC::Schema::Result::TblExposureRoute",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_investigations

Type: has_many

Related object: L<PIC::Schema::Result::TblInvestigation>

=cut

__PACKAGE__->has_many(
  "tbl_investigations",
  "PIC::Schema::Result::TblInvestigation",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_location

Type: might_have

Related object: L<PIC::Schema::Result::TblLocation>

=cut

__PACKAGE__->might_have(
  "tbl_location",
  "PIC::Schema::Result::TblLocation",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_notes

Type: has_many

Related object: L<PIC::Schema::Result::TblNote>

=cut

__PACKAGE__->has_many(
  "tbl_notes",
  "PIC::Schema::Result::TblNote",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_patient

Type: might_have

Related object: L<PIC::Schema::Result::TblPatient>

=cut

__PACKAGE__->might_have(
  "tbl_patient",
  "PIC::Schema::Result::TblPatient",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_referrals

Type: has_many

Related object: L<PIC::Schema::Result::TblReferral>

=cut

__PACKAGE__->has_many(
  "tbl_referrals",
  "PIC::Schema::Result::TblReferral",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_substances

Type: has_many

Related object: L<PIC::Schema::Result::TblSubstance>

=cut

__PACKAGE__->has_many(
  "tbl_substances",
  "PIC::Schema::Result::TblSubstance",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_treatments

Type: has_many

Related object: L<PIC::Schema::Result::TblTreatment>

=cut

__PACKAGE__->has_many(
  "tbl_treatments",
  "PIC::Schema::Result::TblTreatment",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);


# Created by DBIx::Class::Schema::Loader v0.07049 @ 2019-07-13 16:54:28
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:Ooiky77VWxco4Zf9RYD1mg
# These lines were loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblCase.pm' found in @INC.
# They are now part of the custom portion of this file
# for you to hand-edit.  If you do not either delete
# this section or remove that file from @INC, this section
# will be repeated redundantly when you re-create this
# file again via Loader!  See skip_load_external to disable
# this feature.

use utf8;
package PIC::Schema::Result::TblCase;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblCase

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblCase>

=cut

__PACKAGE__->table("tblCase");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_nullable: 0
  size: 40

=head2 case_naturalid

  data_type: 'varchar'
  is_nullable: 0
  size: 24

=head2 case_status

  data_type: 'varchar'
  is_nullable: 1
  size: 7

=head2 case_topic

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 case_type

  data_type: 'varchar'
  is_nullable: 1
  size: 7

=head2 case_incidentid

  data_type: 'varchar'
  is_nullable: 1
  size: 40

=head2 revid

  data_type: 'varchar'
  is_nullable: 0
  size: 35

=head2 case_incidentname

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_nullable => 0, size => 40 },
  "case_naturalid",
  { data_type => "varchar", is_nullable => 0, size => 24 },
  "case_status",
  { data_type => "varchar", is_nullable => 1, size => 7 },
  "case_topic",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "case_type",
  { data_type => "varchar", is_nullable => 1, size => 7 },
  "case_incidentid",
  { data_type => "varchar", is_nullable => 1, size => 40 },
  "revid",
  { data_type => "varchar", is_nullable => 0, size => 35 },
  "case_incidentname",
  { data_type => "varchar", is_nullable => 1, size => 45 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=back

=cut

__PACKAGE__->set_primary_key("id_case");

=head1 RELATIONS

=head2 tbl_care_teams

Type: has_many

Related object: L<PIC::Schema::Result::TblCareTeam>

=cut

__PACKAGE__->has_many(
  "tbl_care_teams",
  "PIC::Schema::Result::TblCareTeam",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_centre_substances

Type: has_many

Related object: L<PIC::Schema::Result::TblCentreSubstance>

=cut

__PACKAGE__->has_many(
  "tbl_centre_substances",
  "PIC::Schema::Result::TblCentreSubstance",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_clinical_features

Type: has_many

Related object: L<PIC::Schema::Result::TblClinicalFeature>

=cut

__PACKAGE__->has_many(
  "tbl_clinical_features",
  "PIC::Schema::Result::TblClinicalFeature",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_communications

Type: has_many

Related object: L<PIC::Schema::Result::TblCommunication>

=cut

__PACKAGE__->has_many(
  "tbl_communications",
  "PIC::Schema::Result::TblCommunication",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_exposure_routes

Type: has_many

Related object: L<PIC::Schema::Result::TblExposureRoute>

=cut

__PACKAGE__->has_many(
  "tbl_exposure_routes",
  "PIC::Schema::Result::TblExposureRoute",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_investigations

Type: has_many

Related object: L<PIC::Schema::Result::TblInvestigation>

=cut

__PACKAGE__->has_many(
  "tbl_investigations",
  "PIC::Schema::Result::TblInvestigation",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_location

Type: might_have

Related object: L<PIC::Schema::Result::TblLocation>

=cut

__PACKAGE__->might_have(
  "tbl_location",
  "PIC::Schema::Result::TblLocation",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_notes

Type: has_many

Related object: L<PIC::Schema::Result::TblNote>

=cut

__PACKAGE__->has_many(
  "tbl_notes",
  "PIC::Schema::Result::TblNote",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_patient

Type: might_have

Related object: L<PIC::Schema::Result::TblPatient>

=cut

__PACKAGE__->might_have(
  "tbl_patient",
  "PIC::Schema::Result::TblPatient",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_referrals

Type: has_many

Related object: L<PIC::Schema::Result::TblReferral>

=cut

__PACKAGE__->has_many(
  "tbl_referrals",
  "PIC::Schema::Result::TblReferral",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_substances

Type: has_many

Related object: L<PIC::Schema::Result::TblSubstance>

=cut

__PACKAGE__->has_many(
  "tbl_substances",
  "PIC::Schema::Result::TblSubstance",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_treatments

Type: has_many

Related object: L<PIC::Schema::Result::TblTreatment>

=cut

__PACKAGE__->has_many(
  "tbl_treatments",
  "PIC::Schema::Result::TblTreatment",
  { "foreign.id_case" => "self.id_case" },
  { cascade_copy => 0, cascade_delete => 0 },
);


# Created by DBIx::Class::Schema::Loader v0.07046 @ 2019-01-28 11:20:09
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:1gjnamGm5wqnFtzy32ubEQ


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
# End of lines loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblCase.pm'


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
