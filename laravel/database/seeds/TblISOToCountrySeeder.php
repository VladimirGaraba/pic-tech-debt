<?php

use Illuminate\Database\Seeder;

use App\TblISOtoCountry;

class TblISOToCountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tblISOtoCountry')->delete();
        TblISOtoCountry::insert([
          ['CountryName' => 'Australia', 'ISOAlpha2' => 'AU', 'ISOAlpha3' => 'AUS', 'ISO-UN-M49' => 53]
        ]);
    }
}
