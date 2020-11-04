<?php
/**
 * routes/web.php
 *
 * @package default
 */


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@spa');

// Authentication Routes...
$this->get('login', 'Auth\LoginController@showLoginForm')->name('auth.login');
$this->post('login', 'Auth\LoginController@login')->name('auth.login');
$this->post('logout', 'Auth\LoginController@logout')->name('auth.logout');

// Change Password Routes...
$this->get('password/change', 'Auth\ChangePasswordController@showChangePasswordForm')->name('auth.password.change');
$this->patch('password/change', 'Auth\ChangePasswordController@changePassword')->name('auth.password.change');

// Password Reset Routes...
$this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('auth.password.reset');
$this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('auth.password.reset');
$this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
$this->post('password/reset', 'Auth\ResetPasswordController@reset')->name('auth.password.reset');

Route::group(['middleware' => ['auth'], ], function () {

  Route::group(['prefix' => 'settings', 'as' => 'admin.'], function () {
    Route::get('/', 'HomeController@index');
    Route::resource('abilities', 'Admin\AbilitiesController');
    Route::post('abilities_mass_destroy', ['uses' => 'Admin\AbilitiesController@massDestroy', 'as' => 'abilities.mass_destroy']);
    Route::resource('roles', 'Admin\RolesController');
    Route::post('roles_mass_destroy', ['uses' => 'Admin\RolesController@massDestroy', 'as' => 'roles.mass_destroy']);
    Route::resource('users', 'Admin\UsersController');
    Route::post('users_mass_destroy', ['uses' => 'Admin\UsersController@massDestroy', 'as' => 'users.mass_destroy']);
    Route::resource('sites', 'Admin\SitesController');
  });

  Route::group(['prefix' => 'analytics', 'as' => 'analytics.'], function () {
    Route::get('/', 'Analytics\EasyQueryController@index')->name('home');
    Route::get('/data/{method}/{param?}', 'Analytics\QueryBuilderController@data');
    Route::get('/reports', 'Analytics\QueryBuilderController@reports')->name('reports');
    Route::post('/query', 'Analytics\QueryBuilderController@couchQuery');
    Route::get('/getSpecialists', 'Analytics\QueryBuilderController@getSpecialists')->name('getSpecialists');
    Route::get('/extdata/{method}/{param?}', 'Analytics\QueryBuilderController@extdata')->name('extdata');
  });
  Route::get('storage/sites/{siteId}/{filename}', 'HomeController@getSiteFile');
  
  Route::group(['prefix' => 'dashboard', 'as' => 'dashboard.'], function () {
    Route::get('/', 'Dashboard\DashboardController@index')->name('home');
    Route::get('/getDashboard', 'Dashboard\DashboardController@getDashboard')->name('getDashboard');
    Route::get('/data/{method}/{param?}', 'Dashboard\DashboardController@data');
  });
  
  Route::get('docs', 'DocController@getDocAsset');
  Route::any('docs/{asset}', 'DocController@getDocAsset')->where('asset', '.*');

  
});
