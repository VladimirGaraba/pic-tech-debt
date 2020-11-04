use utf8;
package PIC::Schema::Result::User;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::User

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<users>

=cut

__PACKAGE__->table("users");

=head1 ACCESSORS

=head2 id

  data_type: 'integer'
  is_nullable: 0

=head2 name

  data_type: 'varchar'
  is_nullable: 1
  size: 191

=head2 email

  data_type: 'varchar'
  is_nullable: 1
  size: 191

=head2 phone

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 job

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 id_site

  data_type: 'integer'
  is_nullable: 1

=cut

__PACKAGE__->add_columns(
  "id",
  { data_type => "integer", is_nullable => 0 },
  "name",
  { data_type => "varchar", is_nullable => 1, size => 191 },
  "email",
  { data_type => "varchar", is_nullable => 1, size => 191 },
  "phone",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "job",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "id_site",
  { data_type => "integer", is_nullable => 1 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id>

=back

=cut

__PACKAGE__->set_primary_key("id");

=head1 RELATIONS

=head2 tbl_clinical_features

Type: has_many

Related object: L<PIC::Schema::Result::TblClinicalFeature>

=cut

__PACKAGE__->has_many(
  "tbl_clinical_features",
  "PIC::Schema::Result::TblClinicalFeature",
  { "foreign.cf_spi_users_id" => "self.id" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_communications

Type: has_many

Related object: L<PIC::Schema::Result::TblCommunication>

=cut

__PACKAGE__->has_many(
  "tbl_communications",
  "PIC::Schema::Result::TblCommunication",
  { "foreign.users_id" => "self.id" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_notes

Type: has_many

Related object: L<PIC::Schema::Result::TblNote>

=cut

__PACKAGE__->has_many(
  "tbl_notes",
  "PIC::Schema::Result::TblNote",
  { "foreign.spi_users_id" => "self.id" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_treatments

Type: has_many

Related object: L<PIC::Schema::Result::TblTreatment>

=cut

__PACKAGE__->has_many(
  "tbl_treatments",
  "PIC::Schema::Result::TblTreatment",
  { "foreign.users_id" => "self.id" },
  { cascade_copy => 0, cascade_delete => 0 },
);


# Created by DBIx::Class::Schema::Loader v0.07049 @ 2019-07-13 16:54:28
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:r4OCiVGVIWmLc+emC4j+0g
# These lines were loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/User.pm' found in @INC.
# They are now part of the custom portion of this file
# for you to hand-edit.  If you do not either delete
# this section or remove that file from @INC, this section
# will be repeated redundantly when you re-create this
# file again via Loader!  See skip_load_external to disable
# this feature.

use utf8;
package PIC::Schema::Result::User;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::User

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<users>

=cut

__PACKAGE__->table("users");

=head1 ACCESSORS

=head2 id

  data_type: 'integer'
  is_nullable: 0

=head2 name

  data_type: 'varchar'
  is_nullable: 1
  size: 191

=head2 email

  data_type: 'varchar'
  is_nullable: 1
  size: 191

=head2 phone

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 job

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 id_site

  data_type: 'integer'
  is_nullable: 1

=cut

__PACKAGE__->add_columns(
  "id",
  { data_type => "integer", is_nullable => 0 },
  "name",
  { data_type => "varchar", is_nullable => 1, size => 191 },
  "email",
  { data_type => "varchar", is_nullable => 1, size => 191 },
  "phone",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "job",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "id_site",
  { data_type => "integer", is_nullable => 1 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id>

=back

=cut

__PACKAGE__->set_primary_key("id");

=head1 RELATIONS

=head2 tbl_clinical_features

Type: has_many

Related object: L<PIC::Schema::Result::TblClinicalFeature>

=cut

__PACKAGE__->has_many(
  "tbl_clinical_features",
  "PIC::Schema::Result::TblClinicalFeature",
  { "foreign.cf_spi_users_id" => "self.id" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_communications

Type: has_many

Related object: L<PIC::Schema::Result::TblCommunication>

=cut

__PACKAGE__->has_many(
  "tbl_communications",
  "PIC::Schema::Result::TblCommunication",
  { "foreign.users_id" => "self.id" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_notes

Type: has_many

Related object: L<PIC::Schema::Result::TblNote>

=cut

__PACKAGE__->has_many(
  "tbl_notes",
  "PIC::Schema::Result::TblNote",
  { "foreign.spi_users_id" => "self.id" },
  { cascade_copy => 0, cascade_delete => 0 },
);

=head2 tbl_treatments

Type: has_many

Related object: L<PIC::Schema::Result::TblTreatment>

=cut

__PACKAGE__->has_many(
  "tbl_treatments",
  "PIC::Schema::Result::TblTreatment",
  { "foreign.users_id" => "self.id" },
  { cascade_copy => 0, cascade_delete => 0 },
);


# Created by DBIx::Class::Schema::Loader v0.07046 @ 2018-12-29 02:15:27
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:/SjW+d+Z64T4pSC1yJHpbQ


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
# End of lines loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/User.pm'


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
