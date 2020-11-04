<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@local',
            'password' => bcrypt('password')
        ]);
        $admin->assign('administrator');

	    $site_admin = User::create([
		    'name' => 'Site Admin',
		    'email' => 'site_admin@local',
		    'password' => bcrypt('password')
	    ]);
	    $site_admin->assign('site_administrator');

	    $user = User::create([
		    'name' => 'User',
		    'email' => 'user@local',
		    'password' => bcrypt('password')
	    ]);
	    $user->assign('user');
    }
}
