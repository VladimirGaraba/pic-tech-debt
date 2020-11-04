<?php

namespace App\Http\Controllers\Analytics;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class QueryBuilderController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->middleware( 'auth' );
	}

	/**
	 * Show the analytics query builder.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index() {
		return view( 'analytics.query_builder' );
	}

	public function reports() {
		return view( 'analytics.reports' );
	}
	
	public function extdata(Request $request, $method, $param = '') {
		//check if blanks
		//call example - /analytics/extdata/Afritox?Search=Methanol
		if($method=='') {
			return json_encode( array(
				"error" => "invalid request"
			) );
		}
		
		$SearchString = $request->query( 'Search' );
		
		if($SearchString=='') {
			return json_encode( array(
				"error" => "invalid request"
			) );
		}
		
		//logging
		Log::info('User searched '.$method.' for: '.$SearchString);
		
		// do the search
		$SourceString = $method;
		
		//replace '+' with ' ' in param
        $fsearch = str_replace("+", " ", $SearchString);

        try {
                $results = DB::table( 'tblExternalToxData' )
                ->select( 'URL','name','source')
                ->where( 'name', 'like', sprintf( '%s%%', $fsearch ) )
			    ->where( 'source', 'like', sprintf( '%s%%', $SourceString ) )
			    ->limit( 1 )
			    ->get();			
			
			
			foreach ( $results as $res ) {
				$url = $res->URL;
			}
			
			//what to do when no results
			if (isset($url) === false) {
				switch ($method) {
					case "Toxinology":
						$url="http://toxinology.com/";
						break;

					case "Afritox":
						$url="http://www.afritox.co.za/hp/default.aspx";
						break;
					default: //nothing set - I come from Barcelona!
						return json_encode( array(
							"error" => "invalid request"
						) );
						break;	
				}
			}

			//do the redirect
			return Redirect::to($url);
			
		} catch ( \Exception $e ) {
			//probably shouldn't do this
			return array(
				"error" => $e->getMessage() 
			);
		}
		
	}
	
	public function getSpecialists(Request $request) {
		
		
		// Get the currently authenticated user's ID...
		$id = Auth::id();
		$results = DB::table( 'tblUser' )
					->select( 'tblSite_idtblSite as id_site')
					->where( 'userId', '=', $id)
					->get();
					
		$site = $results[0]->id_site;
				
		try {
				$results = DB::table( 'tblSpecialistsAvail' )
						 ->join('tblUser', 'tblSpecialistsAvail.users_id', '=', 'tblUser.userID')
						 ->join('users', 'tblSpecialistsAvail.users_id', '=', 'users.id')
						 ->join('tblSite', 'tblSpecialistsAvail.id_Site', '=', 'tblSite.idtblSite')
			             ->select( 'tblSpecialistsAvail.users_id as id', 'users.name as name', 'tblUser.UserPhone as phone', 'tblSpecialistsAvail.Specialty as specialty','tblUser.tblSite_idtblSite as id_site','tblSite.Shortcode as site_shortcode' )
			             ->where( 'tblSpecialistsAvail.id_Site', '=', $site)
			             ->orderby('users.name', 'asc')
			             ->get();

			$output = array();
			foreach ( $results as $res ) {
				$output[] = array(
					"id" => $res->id,
					"name" => $res->name,
                    "phone" => $res->phone,
                    "specialty" => $res->specialty,
					"id_site" => $res->id_site,
					"site_shortcode" => $res->site_shortcode
				);
			}

			return $output;
		} catch ( \Exception $e ) {
			return array(
				"error" => $e->getMessage() //somehow things don't seem to get here - when we stuff the query up, it doesn't spit a message
			);
		}
	}
	

	public function data( Request $request, $method, $param = '' ) {
		switch ( $method ) {
				
			case 'getCentreAgentName':
			case 'agentName':
				return $this->getCentreAgentName($param,0);
				break;
				
			case 'getEUPCS':
				return $this->getEUPCS($param);
				break;
				
			default: //nothing set - I come from Barcelona!
				return json_encode( array(
					"error" => "invalid request"
				) );
				break;
		}
	}

	private function getCentreAgentName($param,$type) {
		if ( ! isset( $param ) || $param === '') {
			return array(
				"error" => "no agent name provided"
			);
		}
		
		$searchString = sprintf( '%s', $param );
		
		//SQl Injection checks here
		$searchFTString = $searchString . "*";
		$searchLKString = $searchString . "%";

		try {
				$results = DB::table( 'tblAgentReference' )
			             ->select( 'AgentReferenceName as name', 'AgentReferenceUrl as url', 'AgentReferenceSource as src' )
			             ->where( 'AgentReferenceName', 'like', "%".$searchLKString )
			             ->orderByRaw("Instr(AgentReferenceName,'?') asc, char_length(AgentReferenceName) asc", $searchString)
			             ->limit( 10 )
			             ->get();

			$output = array();
			foreach ( $results as $res ) {
				$output[] = array(
					"name" => $res->name,
                    "url"  => isset($res->url) ? $res->url : '',
                    "src"  => isset($res->src) ? $res->src : ''
				);
			}

			return $output;
		} catch ( \Exception $e ) {
			return array(
				"error" => $e->getMessage() //somehow things don't seem to get here - when we stuff the query up, it doesn't spit a message
			);
		}
	}
	
	private function getEUPCS($param) {
		if ( ! isset( $param ) ) {
			return array(
				"error" => "no category name provided"
			);
		}

		try {
			$results = DB::table( 'tblAgentEUPCS' )
				->select( 'AgentEUPCSCode as name' )
			    ->where( 'AgentEUPCSCode', 'like', sprintf( '%s%%', $param ) )
			    ->limit( 10 )
			    ->get();			
			
			$output = array();
			foreach ( $results as $res ) {
				$output[] = array(
					"name" => $res->name
				);
			}

			return $output;
		} catch ( \Exception $e ) {
			return array(
				"error" => $e->getMessage() //somehow things don't seem to get here - when we stuff the query up, it doesn't spit a message
			);
		}
	}
	
	private function getExtURL($param) {
		if ( ! isset( $param ) ) {
			return array(
				"error" => "no search provided"
			);
		}
		$SourceString = $request->query( 'Source' );
		if ( ! isset( $SourceString ) ) {
			return json_encode( array(
				"error" => "no source"
			) );
		}
		//replace '+' with ' ' in param
        $fparam = str_replace("+", " ", $param);

        try {
                $results = DB::table( 'tblExternalToxData' )
                ->select( 'URL','name','source')
                ->where( 'name', 'like', sprintf( '%s%%', $fparam ) )
			    ->where( 'source', 'like', sprintf( '%s%%', $SourceString ) )
			    ->limit( 10 )
			    ->get();			
			
			$output = array();
			foreach ( $results as $res ) {
				$output[] = array(
					"URL" => $res->URL
				);
			}

			return $output;
		} catch ( \Exception $e ) {
			return array(
				"error" => $e->getMessage() 
			);
		}
	}

	private function fetchQuery($request) {
		$file = $request->query('file');
		if (!preg_match('/^result(\w+).csv$/', $file)) {
			return json_encode( array(
				"error" => 'No such file'
			) );
		}

		$headers = [
			'Content-Type' => 'text/csv',
		];

		return response()->download('../' . Storage::disk('query-data')->url('query-data/' . $file), $file, $headers);
	}

	private function striposa( $haystack, $needle ) {
		if ( ! is_array( $needle ) ) {
			$needle = array( $needle );
		}
		foreach ( $needle as $what ) {
			if ( ( $pos = stripos( $haystack, $what ) ) !== false ) {
				return $pos;
			}
		}

		return false;
	}

}
