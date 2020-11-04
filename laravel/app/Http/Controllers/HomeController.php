<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
      // This controller does not require auth middleware because it handles the SPA endpoint which handles auth within the app.
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    public function spa(){
        return \File::get(public_path() . '/app/index.html');
    }

    public function getSiteFile($siteId, $filename) {
      $path = storage_path("uploads/sites/{$siteId}/{$filename}");

      if (!\File::exists($path)) {
        abort(404);
      }

      $file = \File::get($path);
      $type = \File::mimeType($path);

      $response = \Response::make($file, 200);
      $response->header("Content-Type", $type);

      return $response;
    }
}
