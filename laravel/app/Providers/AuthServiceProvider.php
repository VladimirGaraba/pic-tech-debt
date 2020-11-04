<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Events\Dispatcher;
use JeroenNoten\LaravelAdminLte\Events\BuildingMenu;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @param Dispatcher $events
     * @return void
     */
    public function boot(Dispatcher $events) {
      $this->registerPolicies();

      $events->listen( BuildingMenu::class, function ( BuildingMenu $event ) {
        $event->menu->add( [
            'header' => 'SITE SETTINGS'
        ]);
        $event->menu->add( [
            'text'    => 'global.user-management.title',
            'icon'    => 'users',
            'submenu' => [
                [
                    'text'  => 'global.abilities.title',
                    'route' => 'admin.abilities.index',
                    'icon'  => 'briefcase',
                    'role'  => [ 'administrator' ],
                    'active' => ['settings/abilities']
                ],
                [
                    'text'  => 'global.roles.title',
                    'route' => 'admin.roles.index',
                    'icon'  => 'briefcase',
                    'role'  => [ 'administrator' ],
                    'active' => ['settings/roles']
                ],
                [
                    'text'  => 'global.users.title',
                    'route' => 'admin.users.index',
                    'icon'  => 'user',
                    'active' => ['settings/users']
                ]
            ],
            'can'     => 'manage users',
        ] );
        $event->menu->add( [
            'text'    => 'global.sites.settings.tree_title',
            'icon'    => 'sitemap',
            'submenu' => [
                [
                    'text'  => 'global.sites.actions.index.title',
                    'route' => 'admin.sites.index',
                    'icon'  => 'briefcase',
                    'can'   => 'administrate sites',
                    'active' => ['settings/sites', 'settings/sites/*']
                ],
                [
                    'text'  => 'global.app_edit_site',
                    'url' => route( 'admin.sites.edit', [ \Auth::user()->tblUser->tblSite->idtblSite ] ),
                    'icon'  => 'sitemap',
                    'can'   => 'manage site',
                ]
            ],
            'can_any' => [ 'manage site', 'administrate sites' ]
        ] );

        $event->menu->add( [
            'header' => 'ACCOUNT SETTINGS'
        ]);

        $event->menu->add([
            'text' => 'global.app_edit_profile',
            'url'  => route('admin.users.edit',[\Auth::user()->id]),
            'icon' => 'user',
        ]);
        $event->menu->add([
            'text' => 'Change password',
            'route'  => 'auth.password.change',
            'icon' => 'key',
        ]);

      } );
    }
}
