<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class DocController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function getDocAsset($asset = 'index.html')
    {
        
        
        /*
        If the extension is javascript, css, svg or does NOT
        contain .html redirect to the page they requested and the
        index.html file within that directory.
        */
        /*if (pathinfo($asset, PATHINFO_EXTENSION) != 'js' 
            && pathinfo($asset, PATHINFO_EXTENSION) != 'css' 
            && pathinfo($asset, PATHINFO_EXTENSION) != 'svg' 
            && strpos($asset, '.html') == null) {
                return redirect('/docs/' . $asset . '/index.html'); return File::get(resource_path() . '/docs/index.html');
        }*/
        
        /*
        Get the contents of the asset. This can be CSS, JS, images or HTML.
        */
        $path = resource_path() . '/docs/' . $asset;
        if(!File::exists($path)) {
			return response()->json(['message' => 'Asset not found.'], 404);
		}
        
        $contents = File::get($path);
        
        /*
        Build a response with the asset being requested.
        */
        $response = Response::make($contents);
        
        /*
        If the asset is CSS, ensure the Content-Type text/css header is passed
        along with the file.
        */
        
        switch (pathinfo($asset, PATHINFO_EXTENSION)) {
            case 'css':
                $response->header('Content-Type', 'text/css');
                break;
            case 'js':
				$response->header('Content-Type', 'application/javascript');
                break;
            case 'png':
				$response->header('Content-Type', 'image/png');
                break;
            case 'svg':
				$response->header('Content-Type', 'image/svg+xml');
                break;
        }
        
        /*
        Return the response
        */
        return $response;
    }
}
