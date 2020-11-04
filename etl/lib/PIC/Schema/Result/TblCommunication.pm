use utf8;
package PIC::Schema::Result::TblCommunication;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblCommunication

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblCommunication>

=cut

__PACKAGE__->table("tblCommunication");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_foreign_key: 1
  is_nullable: 0
  size: 40

=head2 id_communication

  data_type: 'integer'
  is_nullable: 0

=head2 comms_direction

  data_type: 'varchar'
  is_nullable: 1
  size: 12

=head2 comms_deleted

  data_type: 'varchar'
  is_nullable: 1
  size: 6

=head2 comms_medium_detail

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 comms_medium_type

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 comms_sequenceid

  data_type: 'integer'
  is_nullable: 1

=head2 comms_type

  data_type: 'varchar'
  is_nullable: 0
  size: 12

=head2 comms_timestamp

  data_type: 'timestamp'
  datetime_undef_if_invalid: 1
  default_value: current_timestamp
  is_nullable: 0

=head2 caller_category

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_poison_severity_score

  data_type: 'varchar'
  is_nullable: 0
  size: 36

=head2 users_id

  data_type: 'integer'
  is_foreign_key: 1
  is_nullable: 1

=head2 name

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 address1

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 address2

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 city

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 state

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 country

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 telephone

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 latitude

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 longitude

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 location_type

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 iso_country

  data_type: 'varchar'
  is_nullable: 1
  size: 3

=head2 postcode

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "id_communication",
  { data_type => "integer", is_nullable => 0 },
  "comms_direction",
  { data_type => "varchar", is_nullable => 1, size => 12 },
  "comms_deleted",
  { data_type => "varchar", is_nullable => 1, size => 6 },
  "comms_medium_detail",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "comms_medium_type",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "comms_sequenceid",
  { data_type => "integer", is_nullable => 1 },
  "comms_type",
  { data_type => "varchar", is_nullable => 0, size => 12 },
  "comms_timestamp",
  {
    data_type => "timestamp",
    datetime_undef_if_invalid => 1,
    default_value => \"current_timestamp",
    is_nullable => 0,
  },
  "caller_category",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_poison_severity_score",
  { data_type => "varchar", is_nullable => 0, size => 36 },
  "users_id",
  { data_type => "integer", is_foreign_key => 1, is_nullable => 1 },
  "name",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "address1",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "address2",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "city",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "state",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "country",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "telephone",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "latitude",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "longitude",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "location_type",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "iso_country",
  { data_type => "varchar", is_nullable => 1, size => 3 },
  "postcode",
  { data_type => "varchar", is_nullable => 1, size => 45 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=item * L</id_communication>

=back

=cut

__PACKAGE__->set_primary_key("id_case", "id_communication");

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

=head2 user

Type: belongs_to

Related object: L<PIC::Schema::Result::User>

=cut

__PACKAGE__->belongs_to(
  "user",
  "PIC::Schema::Result::User",
  { id => "users_id" },
  {
    is_deferrable => 1,
    join_type     => "LEFT",
    on_delete     => "NO ACTION",
    on_update     => "NO ACTION",
  },
);


# Created by DBIx::Class::Schema::Loader v0.07049 @ 2019-07-13 17:20:46
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:9CjvEMcPnG0EbfvuYJ6gzQ
# These lines were loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblCommunication.pm' found in @INC.
# They are now part of the custom portion of this file
# for you to hand-edit.  If you do not either delete
# this section or remove that file from @INC, this section
# will be repeated redundantly when you re-create this
# file again via Loader!  See skip_load_external to disable
# this feature.

use utf8;
package PIC::Schema::Result::TblCommunication;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblCommunication

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblCommunication>

=cut

__PACKAGE__->table("tblCommunication");

=head1 ACCESSORS

=head2 id_case

  data_type: 'varchar'
  is_foreign_key: 1
  is_nullable: 0
  size: 40

=head2 id_communication

  data_type: 'integer'
  is_nullable: 0

=head2 comms_direction

  data_type: 'varchar'
  is_nullable: 1
  size: 12

=head2 comms_deleted

  data_type: 'varchar'
  is_nullable: 1
  size: 6

=head2 comms_medium_detail

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 comms_medium_type

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 comms_sequenceid

  data_type: 'integer'
  is_nullable: 1

=head2 comms_type

  data_type: 'varchar'
  is_nullable: 0
  size: 12

=head2 comms_timestamp

  data_type: 'timestamp'
  datetime_undef_if_invalid: 1
  default_value: current_timestamp
  is_nullable: 0

=head2 caller_category

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 patient_poison_severity_score

  data_type: 'varchar'
  is_nullable: 0
  size: 36

=head2 users_id

  data_type: 'integer'
  is_foreign_key: 1
  is_nullable: 1

=head2 name

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 address1

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 address2

  data_type: 'varchar'
  is_nullable: 1
  size: 255

=head2 city

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 state

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 country

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 telephone

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 latitude

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 longitude

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 place_id

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 location_type

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 iso_country

  data_type: 'varchar'
  is_nullable: 1
  size: 3

=head2 postcode

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=cut

__PACKAGE__->add_columns(
  "id_case",
  { data_type => "varchar", is_foreign_key => 1, is_nullable => 0, size => 40 },
  "id_communication",
  { data_type => "integer", is_nullable => 0 },
  "comms_direction",
  { data_type => "varchar", is_nullable => 1, size => 12 },
  "comms_deleted",
  { data_type => "varchar", is_nullable => 1, size => 6 },
  "comms_medium_detail",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "comms_medium_type",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "comms_sequenceid",
  { data_type => "integer", is_nullable => 1 },
  "comms_type",
  { data_type => "varchar", is_nullable => 0, size => 12 },
  "comms_timestamp",
  {
    data_type => "timestamp",
    datetime_undef_if_invalid => 1,
    default_value => \"current_timestamp",
    is_nullable => 0,
  },
  "caller_category",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "patient_poison_severity_score",
  { data_type => "varchar", is_nullable => 0, size => 36 },
  "users_id",
  { data_type => "integer", is_foreign_key => 1, is_nullable => 1 },
  "name",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "address1",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "address2",
  { data_type => "varchar", is_nullable => 1, size => 255 },
  "city",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "state",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "country",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "telephone",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "latitude",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "longitude",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "place_id",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "location_type",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "iso_country",
  { data_type => "varchar", is_nullable => 1, size => 3 },
  "postcode",
  { data_type => "varchar", is_nullable => 1, size => 45 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id_case>

=item * L</id_communication>

=back

=cut

__PACKAGE__->set_primary_key("id_case", "id_communication");

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

=head2 user

Type: belongs_to

Related object: L<PIC::Schema::Result::User>

=cut

__PACKAGE__->belongs_to(
  "user",
  "PIC::Schema::Result::User",
  { id => "users_id" },
  {
    is_deferrable => 1,
    join_type     => "LEFT",
    on_delete     => "NO ACTION",
    on_update     => "NO ACTION",
  },
);


# Created by DBIx::Class::Schema::Loader v0.07046 @ 2018-12-29 02:15:27
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:hJHpFtLsBoK14NSL7l1AHw


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
# End of lines loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblCommunication.pm'


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
