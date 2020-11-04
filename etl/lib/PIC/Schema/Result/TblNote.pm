use utf8;
package PIC::Schema::Result::TblNote;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblNote

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblNotes>

=cut

__PACKAGE__->table("tblNotes");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_foreign_key: 1
  is_nullable: 0
  size: 40

=head2 id_notes

  data_type: 'varchar'
  is_nullable: 0
  size: 40

=head2 notes_context

  data_type: 'varchar'
  is_nullable: 0
  size: 24

=head2 notes_title

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 notes_content

  data_type: 'text'
  is_nullable: 1

=head2 notes_timestamp

  data_type: 'timestamp'
  datetime_undef_if_invalid: 1
  is_nullable: 1

=head2 spi_users_id

  data_type: 'integer'
  is_foreign_key: 1
  is_nullable: 1

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "id_notes",
  { data_type => "varchar", is_nullable => 0, size => 40 },
  "notes_context",
  { data_type => "varchar", is_nullable => 0, size => 24 },
  "notes_title",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "notes_content",
  { data_type => "text", is_nullable => 1 },
  "notes_timestamp",
  {
    data_type => "timestamp",
    datetime_undef_if_invalid => 1,
    is_nullable => 1,
  },
  "spi_users_id",
  { data_type => "integer", is_foreign_key => 1, is_nullable => 1 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=item * L</id_notes>

=back

=cut

__PACKAGE__->set_primary_key("id_case", "id_notes");

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

=head2 spi_user

Type: belongs_to

Related object: L<PIC::Schema::Result::User>

=cut

__PACKAGE__->belongs_to(
  "spi_user",
  "PIC::Schema::Result::User",
  { id => "spi_users_id" },
  {
    is_deferrable => 1,
    join_type     => "LEFT",
    on_delete     => "NO ACTION",
    on_update     => "NO ACTION",
  },
);


# Created by DBIx::Class::Schema::Loader v0.07049 @ 2019-07-13 16:54:28
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:1rXIKDOM1zwhjh9z78ffKg
# These lines were loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblNote.pm' found in @INC.
# They are now part of the custom portion of this file
# for you to hand-edit.  If you do not either delete
# this section or remove that file from @INC, this section
# will be repeated redundantly when you re-create this
# file again via Loader!  See skip_load_external to disable
# this feature.

use utf8;
package PIC::Schema::Result::TblNote;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblNote

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblNotes>

=cut

__PACKAGE__->table("tblNotes");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_foreign_key: 1
  is_nullable: 0
  size: 40

=head2 id_notes

  data_type: 'varchar'
  is_nullable: 0
  size: 40

=head2 notes_context

  data_type: 'varchar'
  is_nullable: 0
  size: 24

=head2 notes_title

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 notes_content

  data_type: 'text'
  is_nullable: 1

=head2 notes_timestamp

  data_type: 'timestamp'
  datetime_undef_if_invalid: 1
  is_nullable: 1

=head2 spi_users_id

  data_type: 'integer'
  is_foreign_key: 1
  is_nullable: 1

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "id_notes",
  { data_type => "varchar", is_nullable => 0, size => 40 },
  "notes_context",
  { data_type => "varchar", is_nullable => 0, size => 24 },
  "notes_title",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "notes_content",
  { data_type => "text", is_nullable => 1 },
  "notes_timestamp",
  {
    data_type => "timestamp",
    datetime_undef_if_invalid => 1,
    is_nullable => 1,
  },
  "spi_users_id",
  { data_type => "integer", is_foreign_key => 1, is_nullable => 1 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=item * L</id_notes>

=back

=cut

__PACKAGE__->set_primary_key("id_case", "id_notes");

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

=head2 spi_user

Type: belongs_to

Related object: L<PIC::Schema::Result::User>

=cut

__PACKAGE__->belongs_to(
  "spi_user",
  "PIC::Schema::Result::User",
  { id => "spi_users_id" },
  {
    is_deferrable => 1,
    join_type     => "LEFT",
    on_delete     => "NO ACTION",
    on_update     => "NO ACTION",
  },
);


# Created by DBIx::Class::Schema::Loader v0.07046 @ 2018-12-29 02:15:27
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:EpKhy0kN/rLiXeJk6MmBMw


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
# End of lines loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblNote.pm'


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
