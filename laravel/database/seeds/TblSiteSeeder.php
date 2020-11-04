<?php

use Illuminate\Database\Seeder;
use App\TblISOtoCountry;
use App\TblOrganisation;
use App\TblSite;

class TblSiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tblSite')->delete();
        TblSite::insert([
          [
            'SiteName' => 'WA PIC',
            'tblOrganisation_idtblOrganisation' => TblOrganisation::where('OrganisationName', 'WA Poisons Information Centre')->firstOrFail()->idtblOrganisation,
            'tblISOtoCountry_ISOAlpha2' => TblISOtoCountry::where('CountryName', 'Australia')->firstOrFail()->ISOAlpha2,
            'SiteDefaultTimeZone' => '8'
          ]
        ]);
    }
}
