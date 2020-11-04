<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
			   $this->call(RoleSeed::class);
			   $this->call(UserSeed::class);
         $this->call(TblUserSeeder::class);
         $this->call(TblISOToCountrySeeder::class);
         $this->call(TblOrganisationSeeder::class);
         $this->call(TblSiteSeeder::class);
    }
}
