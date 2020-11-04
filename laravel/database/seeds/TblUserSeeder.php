<?php

use Illuminate\Database\Seeder;
use App\TblSite;
use App\TblUser;
use App\User;

class TblUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tblUser')->delete();
        if (App::environment(['local', 'dev'])) {
          TblUser::insert([
            ['userId' => User::where('email', 'admin@local')->firstOrFail()->id, 'tblSite_idtblSite' => TblSite::where('SiteName', 'WA PIC')->firstOrFail()->idtblSite, 'UserPhone' => '(08) 9999 9999'],
            ['userId' => User::where('email', 'site_admin@local')->firstOrFail()->id, 'tblSite_idtblSite' => TblSite::where('SiteName', 'WA PIC')->firstOrFail()->idtblSite, 'UserPhone' => '(08) 9999 8888'],
            ['userId' => User::where('email', 'user@local')->firstOrFail()->id, 'tblSite_idtblSite' => TblSite::where('SiteName', 'WA PIC')->firstOrFail()->idtblSite, 'UserPhone' => '(08) 9999 7777']
          ]);
        }
    }
}
