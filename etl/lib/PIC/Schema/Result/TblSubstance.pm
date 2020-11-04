use utf8;
package PIC::Schema::Result::TblSubstance;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblSubstance

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblSubstance>

=cut

__PACKAGE__->table("tblSubstance");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_foreign_key: 1
  is_nullable: 0
  size: 40

=head2 id_substance

  data_type: 'varchar'
  is_nullable: 0
  size: 40

=head2 substance_name

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 substance_category

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 substance_dosage_quantity

  data_type: 'integer'
  is_nullable: 1

=head2 substance_dosage_units

  data_type: 'varchar'
  is_nullable: 1
  size: 32

=head2 substance_dosage_unknown

  data_type: 'varchar'
  is_nullable: 1
  size: 32

=head2 substance_duration

  data_type: 'integer'
  is_nullable: 1

=head2 substance_duration_units

  data_type: 'varchar'
  is_nullable: 1
  size: 8

=head2 substance_exposure_timestamp_utc

  data_type: 'timestamp'
  datetime_undef_if_invalid: 1
  is_nullable: 1

=head2 substance_exposure_type

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 substance_eupcs

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 substance_intended_use_given

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 substance_patientsownmedication

  data_type: 'varchar'
  is_nullable: 1
  size: 24

=head2 substance_type

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 exposure_circumstance

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "id_substance",
  { data_type => "varchar", is_nullable => 0, size => 40 },
  "substance_name",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "substance_category",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "substance_dosage_quantity",
  { data_type => "integer", is_nullable => 1 },
  "substance_dosage_units",
  { data_type => "varchar", is_nullable => 1, size => 32 },
  "substance_dosage_unknown",
  { data_type => "varchar", is_nullable => 1, size => 32 },
  "substance_duration",
  { data_type => "integer", is_nullable => 1 },
  "substance_duration_units",
  { data_type => "varchar", is_nullable => 1, size => 8 },
  "substance_exposure_timestamp_utc",
  {
    data_type => "timestamp",
    datetime_undef_if_invalid => 1,
    is_nullable => 1,
  },
  "substance_exposure_type",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "substance_eupcs",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "substance_intended_use_given",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "substance_patientsownmedication",
  { data_type => "varchar", is_nullable => 1, size => 24 },
  "substance_type",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "exposure_circumstance",
  { data_type => "varchar", is_nullable => 1, size => 45 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=item * L</id_substance>

=back

=cut

__PACKAGE__->set_primary_key("id_case", "id_substance");

=head1 RELATIONS

=head2 id_case

Type: belongs_to

Related object: L<PIC::Schema::Result::TblCase>

=cut

__PACKAGE__->belongs_to(
  "id_case",
  "PIC::Schema::Result::TblCase",
  { id_case => "id_case" },
  { is_deferrable => 1, on_delete => "NO ACTION", on_update => "NO ACTION" },
);


# Created by DBIx::Class::Schema::Loader v0.07049 @ 2019-07-13 16:54:28
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:QSR2NHePgmbs2Cr+PBqsdw
# These lines were loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblSubstance.pm' found in @INC.
# They are now part of the custom portion of this file
# for you to hand-edit.  If you do not either delete
# this section or remove that file from @INC, this section
# will be repeated redundantly when you re-create this
# file again via Loader!  See skip_load_external to disable
# this feature.

use utf8;
package PIC::Schema::Result::TblSubstance;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblSubstance

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblSubstance>

=cut

__PACKAGE__->table("tblSubstance");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_foreign_key: 1
  is_nullable: 0
  size: 40

=head2 id_substance

  data_type: 'varchar'
  is_nullable: 0
  size: 40

=head2 substance_name

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 substance_category

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 substance_dosage_quantity

  data_type: 'integer'
  is_nullable: 1

=head2 substance_dosage_units

  data_type: 'varchar'
  is_nullable: 1
  size: 32

=head2 substance_dosage_unknown

  data_type: 'varchar'
  is_nullable: 1
  size: 32

=head2 substance_duration

  data_type: 'integer'
  is_nullable: 1

=head2 substance_duration_units

  data_type: 'varchar'
  is_nullable: 1
  size: 8

=head2 substance_exposure_timestamp_utc

  data_type: 'timestamp'
  datetime_undef_if_invalid: 1
  is_nullable: 1

=head2 substance_exposure_type

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 substance_eupcs

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 substance_intended_use_given

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 substance_patientsownmedication

  data_type: 'varchar'
  is_nullable: 1
  size: 24

=head2 substance_type

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 exposure_circumstance

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "id_substance",
  { data_type => "varchar", is_nullable => 0, size => 40 },
  "substance_name",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "substance_category",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "substance_dosage_quantity",
  { data_type => "integer", is_nullable => 1 },
  "substance_dosage_units",
  { data_type => "varchar", is_nullable => 1, size => 32 },
  "substance_dosage_unknown",
  { data_type => "varchar", is_nullable => 1, size => 32 },
  "substance_duration",
  { data_type => "integer", is_nullable => 1 },
  "substance_duration_units",
  { data_type => "varchar", is_nullable => 1, size => 8 },
  "substance_exposure_timestamp_utc",
  {
    data_type => "timestamp",
    datetime_undef_if_invalid => 1,
    is_nullable => 1,
  },
  "substance_exposure_type",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "substance_eupcs",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "substance_intended_use_given",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "substance_patientsownmedication",
  { data_type => "varchar", is_nullable => 1, size => 24 },
  "substance_type",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "exposure_circumstance",
  { data_type => "varchar", is_nullable => 1, size => 45 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=item * L</id_substance>

=back

=cut

__PACKAGE__->set_primary_key("id_case", "id_substance");

=head1 RELATIONS

=head2 id_case

Type: belongs_to

Related object: L<PIC::Schema::Result::TblCase>

=cut

__PACKAGE__->belongs_to(
  "id_case",
  "PIC::Schema::Result::TblCase",
  { id_case => "id_case" },
  { is_deferrable => 1, on_delete => "NO ACTION", on_update => "NO ACTION" },
);


# Created by DBIx::Class::Schema::Loader v0.07046 @ 2018-12-29 02:15:27
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:IqqQ/NCb5Izyu8KkUMclqQ


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
# End of lines loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblSubstance.pm'


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
