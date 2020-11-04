#!/usr/bin/env perl

use DBIx::Class::Schema::Loader qw( make_schema_at );
use Config::Any qw();

my $configs =
  Config::Any->load_files( { 'files' => ['config.json'], use_ext => 1 } );
my ($config_data) = @$configs;
die 'Missing config.json' unless ($config_data);
my ( $config_file, $config ) = %$config_data;

make_schema_at(
    'PIC::Schema',
    {
        debug          => 1,
        dump_directory => $ENV{'HOME'} . '/' . 'mysql_schema',
    },
    [
        $config->{'mariadb'}{'dsn'}, $config->{'mariadb'}{'user'},
        $config->{'mariadb'}{'password'}
    ],

);
