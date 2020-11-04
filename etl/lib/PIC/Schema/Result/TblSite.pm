use utf8;
package PIC::Schema::Result::TblSite;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblSite

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblSite>

=cut

__PACKAGE__->table("tblSite");

=head1 ACCESSORS

=head2 id_site

  data_type: 'integer'
  is_nullable: 1

=head2 sitename

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 sitedefaulttimezone

  data_type: 'integer'
  is_nullable: 1

=head2 shortcode

  data_type: 'varchar'
  is_nullable: 1
  size: 32

=head2 country_alpha2

  data_type: 'varchar'
  is_nullable: 1
  size: 2

=head2 id_location

  data_type: 'varchar'
  is_nullable: 1
  size: 36

=cut

__PACKAGE__->add_columns(
  "id_site",
  { data_type => "integer", is_nullable => 1 },
  "sitename",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "sitedefaulttimezone",
  { data_type => "integer", is_nullable => 1 },
  "shortcode",
  { data_type => "varchar", is_nullable => 1, size => 32 },
  "country_alpha2",
  { data_type => "varchar", is_nullable => 1, size => 2 },
  "id_location",
  { data_type => "varchar", is_nullable => 1, size => 36 },
);


# Created by DBIx::Class::Schema::Loader v0.07049 @ 2019-07-13 16:54:28
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:qSmNq5odr97cnVdqfAb6vw
# These lines were loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblSite.pm' found in @INC.
# They are now part of the custom portion of this file
# for you to hand-edit.  If you do not either delete
# this section or remove that file from @INC, this section
# will be repeated redundantly when you re-create this
# file again via Loader!  See skip_load_external to disable
# this feature.

use utf8;
package PIC::Schema::Result::TblSite;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

PIC::Schema::Result::TblSite

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<tblSite>

=cut

__PACKAGE__->table("tblSite");

=head1 ACCESSORS

=head2 id_site

  data_type: 'integer'
  is_nullable: 1

=head2 sitename

  data_type: 'varchar'
  is_nullable: 1
  size: 45

=head2 sitedefaulttimezone

  data_type: 'integer'
  is_nullable: 1

=head2 shortcode

  data_type: 'varchar'
  is_nullable: 1
  size: 32

=head2 country_alpha2

  data_type: 'varchar'
  is_nullable: 1
  size: 2

=head2 id_location

  data_type: 'varchar'
  is_nullable: 1
  size: 36

=cut

__PACKAGE__->add_columns(
  "id_site",
  { data_type => "integer", is_nullable => 1 },
  "sitename",
  { data_type => "varchar", is_nullable => 1, size => 45 },
  "sitedefaulttimezone",
  { data_type => "integer", is_nullable => 1 },
  "shortcode",
  { data_type => "varchar", is_nullable => 1, size => 32 },
  "country_alpha2",
  { data_type => "varchar", is_nullable => 1, size => 2 },
  "id_location",
  { data_type => "varchar", is_nullable => 1, size => 36 },
);


# Created by DBIx::Class::Schema::Loader v0.07046 @ 2018-12-10 12:18:24
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:+/IMm9jnYE+is5PDKdiMcA


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
# End of lines loaded from '/home/nalexand/perl5/perlbrew/perls/perl-5.28.2/lib/site_perl/5.28.2/PIC/Schema/Result/TblSite.pm'


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
