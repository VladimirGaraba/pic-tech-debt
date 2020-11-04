use utf8;
package PIC::Schema::Result::TblClinicalFeature;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblClinicalFeature

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblClinicalFeature>

=cut

__PACKAGE__->table("tblClinicalFeature");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_foreign_key: 1
  is_nullable: 0
  size: 40

=head2 id_clinicalfeature

  data_type: 'integer'
  is_nullable: 0

=head2 cf_when

  data_type: 'varchar'
  is_nullable: 0
  size: 6

=head2 cf_timestamp

  data_type: 'timestamp'
  datetime_undef_if_invalid: 1
  default_value: current_timestamp
  is_nullable: 0

=head2 cf_spi_users_id

  data_type: 'integer'
  is_foreign_key: 1
  is_nullable: 0

=head2 cf_category

  data_type: 'varchar'
  is_nullable: 0
  size: 36

=head2 cf_detail

  data_type: 'varchar'
  is_nullable: 0
  size: 36

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "id_clinicalfeature",
  { data_type => "integer", is_nullable => 0 },
  "cf_when",
  { data_type => "varchar", is_nullable => 0, size => 6 },
  "cf_timestamp",
  {
    data_type => "timestamp",
    datetime_undef_if_invalid => 1,
    default_value => \"current_timestamp",
    is_nullable => 0,
  },
  "cf_spi_users_id",
  { data_type => "integer", is_foreign_key => 1, is_nullable => 0 },
  "cf_category",
  { data_type => "varchar", is_nullable => 0, size => 36 },
  "cf_detail",
  { data_type => "varchar", is_nullable => 0, size => 36 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=item * L</id_clinicalfeature>

=back

=cut

__PACKAGE__->set_primary_key("id_case", "id_clinicalfeature");

=head1 RELATIONS

=head2 cf_spi_user

Type: belongs_to

Related object: L<PIC::Schema::Result::User>

=cut

__PACKAGE__->belongs_to(
  "cf_spi_user",
  "PIC::Schema::Result::User",
  { id => "cf_spi_users_id" },
  { is_deferrable => 1, on_delete => "NO ACTION", on_update => "NO ACTION" },
);

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
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:0tWq43UC31FcTd4Hq2futw
# These lines were loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblClinicalFeature.pm' found in @INC.
# They are now part of the custom portion of this file
# for you to hand-edit.  If you do not either delete
# this section or remove that file from @INC, this section
# will be repeated redundantly when you re-create this
# file again via Loader!  See skip_load_external to disable
# this feature.

use utf8;
package PIC::Schema::Result::TblClinicalFeature;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblClinicalFeature

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblClinicalFeature>

=cut

__PACKAGE__->table("tblClinicalFeature");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_foreign_key: 1
  is_nullable: 0
  size: 40

=head2 id_clinicalfeature

  data_type: 'integer'
  is_nullable: 0

=head2 cf_when

  data_type: 'varchar'
  is_nullable: 0
  size: 6

=head2 cf_timestamp

  data_type: 'timestamp'
  datetime_undef_if_invalid: 1
  default_value: current_timestamp
  is_nullable: 0

=head2 cf_spi_users_id

  data_type: 'integer'
  is_foreign_key: 1
  is_nullable: 0

=head2 cf_category

  data_type: 'varchar'
  is_nullable: 0
  size: 36

=head2 cf_detail

  data_type: 'varchar'
  is_nullable: 0
  size: 36

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "id_clinicalfeature",
  { data_type => "integer", is_nullable => 0 },
  "cf_when",
  { data_type => "varchar", is_nullable => 0, size => 6 },
  "cf_timestamp",
  {
    data_type => "timestamp",
    datetime_undef_if_invalid => 1,
    default_value => \"current_timestamp",
    is_nullable => 0,
  },
  "cf_spi_users_id",
  { data_type => "integer", is_foreign_key => 1, is_nullable => 0 },
  "cf_category",
  { data_type => "varchar", is_nullable => 0, size => 36 },
  "cf_detail",
  { data_type => "varchar", is_nullable => 0, size => 36 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=item * L</id_clinicalfeature>

=back

=cut

__PACKAGE__->set_primary_key("id_case", "id_clinicalfeature");

=head1 RELATIONS

=head2 cf_spi_user

Type: belongs_to

Related object: L<PIC::Schema::Result::User>

=cut

__PACKAGE__->belongs_to(
  "cf_spi_user",
  "PIC::Schema::Result::User",
  { id => "cf_spi_users_id" },
  { is_deferrable => 1, on_delete => "NO ACTION", on_update => "NO ACTION" },
);

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
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:6DJ7Su5W1A0p8XoaevJAFg


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
# End of lines loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblClinicalFeature.pm'


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
