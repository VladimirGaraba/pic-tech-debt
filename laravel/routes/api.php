<?php

use Illuminate\Http\Request;
use Illuminate\Routing\Router;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */


Route::middleware('auth:api')->get('/user', 'Auth\LoginController@getUser');

Route::group([
	'middleware' => 'api',
	'prefix' => '/v1',
	'namespace' => 'Api\V1',
	'as' => 'api.'
], function () {

	Route::group([
		'namespace' => 'Auth',
		'prefix' => 'auth',
		'as' => 'auth.'
	], function () {
		Route::post('login', 'APIController@login')->name('login');
		Route::post('logout', 'APIController@logout')->name('logout');
		Route::post('refresh', 'APIController@refresh')->name('refresh');
    Route::post('requestKey', 'APIController@requestKey')->name('requestKey');
		Route::post('me', 'APIController@me')->name('me');

	});

	Route::group([
		'namespace' => 'File',
		'prefix' => 'file',
		'as' => 'file.'
	], function () {
		Route::post('render', 'APIController@render')->name('render');
	});

	Route::group([
		'namespace' => 'EasyQuery',
		'prefix' => 'easyquery',
		'as' => 'easyquery.'
	], function (Router $router) {
		$router->post('model', ['uses' => 'EasyQueryController@postModel', 'as' => 'model']);
		$router->post('sync', ['uses' => 'EasyQueryController@postSync', 'as' => 'sync']);
		$router->post('execute', ['uses' => 'EasyQueryController@postExecute', 'as' => 'execute']);
		$router->post('save', ['uses' => 'EasyQueryController@postSave', 'as' => 'save']);
		$router->post('load', ['uses' => 'EasyQueryController@postLoad', 'as' => 'load']);
	});
});
