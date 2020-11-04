use utf8;
package PIC::Schema::Result::TblPatient;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblPatient

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblPatient>

=cut

__PACKAGE__->table("tblPatient");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_foreign_key: 1
  is_nullable: 0
  size: 40

=head2 patient_age

  data_type: 'integer'
  is_nullable: 1

=head2 patient_age_units

  data_type: 'varchar'
  is_nullable: 0
  size: 12

=head2 patient_age_group

  data_type: 'varchar'
  is_nullable: 0
  size: 12

=head2 patient_category

  data_type: 'varchar'
  is_nullable: 0
  size: 12

=head2 patient_animal_type

  data_type: 'varchar'
  is_nullable: 1
  size: 12

=head2 patient_gender

  data_type: 'varchar'
  is_nullable: 1
  size: 12

=head2 patient_mrn

  data_type: 'varchar'
  is_nullable: 1
  size: 12

=head2 patient_occupation

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_weight

  data_type: 'decimal'
  is_nullable: 1
  size: [5,2]

=head2 patient_weight_units

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_pregnant_status

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_pregnant_lactating

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_pregnant_trimester

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_pregnant_trimester_unknown

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_poison_risk_assessment

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "patient_age",
  { data_type => "integer", is_nullable => 1 },
  "patient_age_units",
  { data_type => "varchar", is_nullable => 0, size => 12 },
  "patient_age_group",
  { data_type => "varchar", is_nullable => 0, size => 12 },
  "patient_category",
  { data_type => "varchar", is_nullable => 0, size => 12 },
  "patient_animal_type",
  { data_type => "varchar", is_nullable => 1, size => 12 },
  "patient_gender",
  { data_type => "varchar", is_nullable => 1, size => 12 },
  "patient_mrn",
  { data_type => "varchar", is_nullable => 1, size => 12 },
  "patient_occupation",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_weight",
  { data_type => "decimal", is_nullable => 1, size => [5, 2] },
  "patient_weight_units",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_pregnant_status",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_pregnant_lactating",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_pregnant_trimester",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_pregnant_trimester_unknown",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_poison_risk_assessment",
  { data_type => "varchar", is_nullable => 1, size => 45 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=back

=cut

__PACKAGE__->set_primary_key("id_case");

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
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:nqxJPX+OWBqfL3FbogsFHw
# These lines were loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblPatient.pm' found in @INC.
# They are now part of the custom portion of this file
# for you to hand-edit.  If you do not either delete
# this section or remove that file from @INC, this section
# will be repeated redundantly when you re-create this
# file again via Loader!  See skip_load_external to disable
# this feature.

use utf8;
package PIC::Schema::Result::TblPatient;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblPatient

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblPatient>

=cut

__PACKAGE__->table("tblPatient");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_foreign_key: 1
  is_nullable: 0
  size: 40

=head2 patient_age

  data_type: 'integer'
  is_nullable: 1

=head2 patient_age_units

  data_type: 'varchar'
  is_nullable: 0
  size: 12

=head2 patient_age_group

  data_type: 'varchar'
  is_nullable: 0
  size: 12

=head2 patient_category

  data_type: 'varchar'
  is_nullable: 0
  size: 12

=head2 patient_animal_type

  data_type: 'varchar'
  is_nullable: 1
  size: 12

=head2 patient_gender

  data_type: 'varchar'
  is_nullable: 1
  size: 12

=head2 patient_mrn

  data_type: 'varchar'
  is_nullable: 1
  size: 12

=head2 patient_occupation

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_weight

  data_type: 'decimal'
  is_nullable: 1
  size: [5,2]

=head2 patient_weight_units

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_pregnant_status

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_pregnant_lactating

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_pregnant_trimester

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_pregnant_trimester_unknown

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_poison_risk_assessment

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "patient_age",
  { data_type => "integer", is_nullable => 1 },
  "patient_age_units",
  { data_type => "varchar", is_nullable => 0, size => 12 },
  "patient_age_group",
  { data_type => "varchar", is_nullable => 0, size => 12 },
  "patient_category",
  { data_type => "varchar", is_nullable => 0, size => 12 },
  "patient_animal_type",
  { data_type => "varchar", is_nullable => 1, size => 12 },
  "patient_gender",
  { data_type => "varchar", is_nullable => 1, size => 12 },
  "patient_mrn",
  { data_type => "varchar", is_nullable => 1, size => 12 },
  "patient_occupation",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_weight",
  { data_type => "decimal", is_nullable => 1, size => [5, 2] },
  "patient_weight_units",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_pregnant_status",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_pregnant_lactating",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_pregnant_trimester",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_pregnant_trimester_unknown",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_poison_risk_assessment",
  { data_type => "varchar", is_nullable => 1, size => 45 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=back

=cut

__PACKAGE__->set_primary_key("id_case");

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
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:hw/faG8ResL7YamgElOgtQ


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
# End of lines loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblPatient.pm'


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
