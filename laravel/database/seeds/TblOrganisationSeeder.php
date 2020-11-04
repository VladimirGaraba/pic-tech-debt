<?php

use Illuminate\Database\Seeder;
use App\TblISOtoCountry;
use App\TblOrganisation;

class TblOrganisationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tblOrganisation')->delete();
        TblOrganisation::insert([
          ['OrganisationName' => 'WA Poisons Information Centre', 'OrganisationState' => 'WA', 'OrganisiationStreet' => 'Hospital Ave', 'OrganisationSuburb' => 'Nedlands', 'OrganisationPostcode' => '6009', 'tblISOtoCountry_ISOAlpha2' => TblISOtoCountry::where('CountryName', 'Australia')->ISOAlpha2]
        ]);
    }
}
