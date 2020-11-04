use utf8;
package PIC::Schema::Result::TblCentreSubstance;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblCentreSubstance

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblCentreSubstance>

=cut

__PACKAGE__->table("tblCentreSubstance");

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

=head2 id_substance_counter

  data_type: 'integer'
  is_nullable: 0

=head2 name

  data_type: 'varchar'
  is_nullable: 0
  size: 64

=head2 url

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 quantity

  data_type: 'integer'
  is_nullable: 1

=head2 units

  data_type: 'varchar'
  is_nullable: 1
  size: 24

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "id_substance",
  { data_type => "varchar", is_nullable => 0, size => 40 },
  "id_substance_counter",
  { data_type => "integer", is_nullable => 0 },
  "name",
  { data_type => "varchar", is_nullable => 0, size => 64 },
  "url",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "quantity",
  { data_type => "integer", is_nullable => 1 },
  "units",
  { data_type => "varchar", is_nullable => 1, size => 24 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=item * L</id_substance>

=item * L</id_substance_counter>

=back

=cut

__PACKAGE__->set_primary_key("id_case", "id_substance", "id_substance_counter");

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
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:jhaQ/YKxWz7DXG6DPAd32Q
# These lines were loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblCentreSubstance.pm' found in @INC.
# They are now part of the custom portion of this file
# for you to hand-edit.  If you do not either delete
# this section or remove that file from @INC, this section
# will be repeated redundantly when you re-create this
# file again via Loader!  See skip_load_external to disable
# this feature.

use utf8;
package PIC::Schema::Result::TblCentreSubstance;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblCentreSubstance

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblCentreSubstance>

=cut

__PACKAGE__->table("tblCentreSubstance");

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

=head2 id_substance_counter

  data_type: 'integer'
  is_nullable: 0

=head2 name

  data_type: 'varchar'
  is_nullable: 0
  size: 64

=head2 url

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 quantity

  data_type: 'integer'
  is_nullable: 1

=head2 units

  data_type: 'varchar'
  is_nullable: 1
  size: 24

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "id_substance",
  { data_type => "varchar", is_nullable => 0, size => 40 },
  "id_substance_counter",
  { data_type => "integer", is_nullable => 0 },
  "name",
  { data_type => "varchar", is_nullable => 0, size => 64 },
  "url",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "quantity",
  { data_type => "integer", is_nullable => 1 },
  "units",
  { data_type => "varchar", is_nullable => 1, size => 24 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=item * L</id_substance>

=item * L</id_substance_counter>

=back

=cut

__PACKAGE__->set_primary_key("id_case", "id_substance", "id_substance_counter");

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


# Created by DBIx::Class::Schema::Loader v0.07046 @ 2019-01-28 11:20:09
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:chxbwu6kzawjf9Da5raaQw


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
# End of lines loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblCentreSubstance.pm'


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
