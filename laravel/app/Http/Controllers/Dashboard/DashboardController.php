<?php

namespace App\Http\Controllers\Dashboard;

use App\TblSite;
use App\TblISOtoCountry;
use App\TblOrganisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class DashboardController extends Controller {

	// our colourblind safe colour list
	const COLORS = array('#ffe119', '#4363d8', '#a9a9a9', '#000000', '#e6194B', '#3cb44b', '#f58231', '#42d4f4', '#f032e6', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#000075');
	const PATTERNS = array('plus','cross','dash','cross-dash','dot','dot-dash','disc','ring','line','line-vertical','weave','zigzag','zigzag-vertical','diagonal','diagonal-right-left','square','box','triangle','triangle-inverted','diamond','diamond-box');

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
		
		$site = TblSite::findOrFail(Auth::user()->tblUser->tblSite->idtblSite);
        $site->loadMissing('tblOrganisation');
		return view( 'dashboard.dashboard', compact('site') );
	}

	public function getDashboard() {
		
		
		// Get the currently authenticated user's ID...
		$id = Auth::id();
		$results = DB::table( 'tblUser' )
					->select( 'tblSite_idtblSite as id_site')
					->where( 'userId', '=', $id)
					->get();
					
		$site = $results[0]->id_site;
				
		try {
				$results = DB::table( 'tblDashboardItem' )
			             ->select( 'idDashboardItem as id', 'loc_x as x', 'loc_y as y', 'width','height','QueryName','Title' )
			             ->where( 'id_Site', '=', $site)
			             ->orderby('idDashboardItem', 'asc')
			             ->get();

			$output = array();
			
			foreach ( $results as $res ) {
				
				$el=      "<div class=\"grid-stack-item-content\" > ";
				//$el=$el .   "<div class=\"defaultWidgetFrame\">";
				//$el=$el .     "<div class=\"defaultWidgetFrameHeader\">";
				//$el=$el .       "<span class=\"title\">" . $res->Title ."</span>";
				//$el=$el .     "</div>";
				$el=$el .     "<canvas id=\"container" . $res->id . "\"></canvas>";
				$el=$el .     $this->GenerateDashObject($res->id,$res->QueryName,$res->Title);
				//$el=$el .   "</div>";
				$el=$el . "</div>";

				
				$output[] = array(
					"id" => $res->id,
					"x" => $res->x,
                    "y" => $res->y,
                    "width" => $res->width,
					"height" => $res->height,
					"el" => $el					
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
		// Get the currently authenticated user's ID...
		$id = Auth::id();
		$results = DB::table( 'tblUser' )
					->select( 'tblSite_idtblSite as id_site')
					->where( 'userId', '=', $id)
					->get();
					
		$site = $results[0]->id_site;
		
		if (substr($method,0,1)=='*') {
			$queryID=substr($method,1,strlen($method)-1);
			switch($queryID) {
				case 'byhour':	
					$sql="SELECT IF(ISNULL(COUNT(t2.Comms_Timestamp)), 0, COUNT(t2.Comms_Timestamp)) AS call_count ,A.x AS bucket
FROM (SELECT 1 x UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION SELECT 21
UNION SELECT 22 UNION SELECT 23 UNION SELECT 24) AS A
LEFT JOIN (select C.Comms_Timestamp 
from tblCommunication as C left join tblCareTeam as CT on C.id_Case = CT.id_Case 
where CT.id_Site=".$site.") AS t2 ON HOUR(t2.Comms_Timestamp) = A.x
GROUP BY bucket
ORDER BY bucket";
					
					$mysqlConnections = config('easyquery.connections');
					$mysqli = new \mysqli($mysqlConnections['host'], $mysqlConnections['username'], $mysqlConnections['password'], $mysqlConnections['database'], $mysqlConnections['port']);
					if ($mysqli->connect_error) {
						return null;
					}
					if ($result = $mysqli->query($sql)) {
					
						while($row = $result->fetch_array(MYSQLI_BOTH)) {
							$value_array[]=$row["call_count"]+0; //force values to numbers
							$label_array[]=$row["bucket"] . ":00";
							//TODO fix cases where count is zero.. we still need the label
						}
						$data = array();
							$data['labels'] = $label_array;
						$dataset = array();
							$dataset['label'] = 'calls';
							$dataset['data'] = $value_array;
							$dataset['backgroundColor'] = self::COLORS[0];//'rgba(255, 99, 132, 0.2)';
							$dataset['borderColor'] = self::COLORS[0];
							$dataset['borderWidth'] = 1;
							$dataset['hoverBackgroundColor'] = 'rgba(255,99,132,0.4)';
							$dataset['hoverBorderColor'] = 'rgba(255,99,132,1)';
								$data['datasets'] = array($dataset);
							

						$mydata = array();
							$mydata['type'] = "bar";
							$mydata['data'] = $data;
						$options=array();
							$options['maintainAspectRatio']=false;
							$options['animationSteps'] =300;
							$scales=array();
								$yAxes=array();
									$ticks = array();
									$ticks['beginAtZero']=true;
								$yAxes['ticks'] = $ticks;
							$scales['yAxes'] = array($yAxes);	
							$options['scales']=$scales;
							$title=array();
								$title['text']='Calls by time of day';
								$title['position']='top';
								$title['fontSize']=18;
								$title['padding']=3;
								$title['display']=true;
							$options['title']=$title;
							$legend = array();
								$legend['display'] = false;
							$options['legend'] = $legend;
							$mydata['options']=$options;
						$result->close();
						$mysqli->close();
						return json_encode($mydata);
					}	
					$result->close();
					$mysqli->close();
					return;				
				break;
				case 'bymonth':
					$sql="select count(C.Comms_Timestamp) as call_count,Month(C.Comms_Timestamp) as bucket, CT.id_Site 
					from tblCommunication as C left join tblCareTeam as CT on C.id_Case = CT.id_Case  
					group by CT.id_Site,Month(C.Comms_Timestamp) having CT.id_Site=".$site;
					
					$mysqlConnections = config('easyquery.connections');
					$mysqli = new \mysqli($mysqlConnections['host'], $mysqlConnections['username'], $mysqlConnections['password'], $mysqlConnections['database'], $mysqlConnections['port']);
					if ($mysqli->connect_error) {
						return null;
					}
					if ($result = $mysqli->query($sql)) {
					
						while($row = $result->fetch_array(MYSQLI_BOTH)) {
							$value_array[]=$row["call_count"]+0; //force values to numbers
							//convert month num to month name
							$label_array[]=date('M', mktime(0, 0, 0, $row["bucket"], 10));;
							//TODO fix cases where count is zero.. we still need the label
						}
						$data = array();
							$data['labels'] = $label_array;
						$dataset = array();
							$dataset['label'] = 'calls';
							$dataset['data'] = $value_array;
							$dataset['backgroundColor'] =self::COLORS;
							$dataset['borderColor'] = self::COLORS;
							$dataset['borderWidth'] = 1;
								$data['datasets'] = array($dataset);
							

						$mydata = array();
							$mydata['type'] = "pie";
							$mydata['data'] = $data;
						$options=array();
							$options['maintainAspectRatio']=false;
							$options['animationSteps'] =300;
							$options['animation.animateRotate'] = true;
							$options['showTooltips'] = true;
							$legend=array();
								$leglabels=array();
								$leglabels['boxWidth']=8;
								$leglabels['fontSize']=8;
								$leglabels['paddings']=5;
							$legend['labels'] = $leglabels;
							$options['legend']=$legend;
							$title=array();
								$title['text']='Calls by month';
								$title['position']='top';
								$title['fontSize']=18;
								$title['padding']=3;
								$title['display']=true;
							$options['title']=$title;							
							$mydata['options']=$options;

						$result->close();
						$mysqli->close();
						return json_encode($mydata);
					}	
					$result->close();
					$mysqli->close();
					return;		
				break;
				case 'byyear':
					$sql="select IF(ISNULL(COUNT(t2.Comms_Timestamp)), 0, COUNT(t2.Comms_Timestamp)) as call_count,A.x as bucket 
from (SELECT 2017 x UNION SELECT 2018 UNION SELECT 2019 UNION SELECT 2020) AS A
LEFT JOIN (select C.Comms_Timestamp 
from tblCommunication as C left join tblCareTeam as CT on C.id_Case = CT.id_Case 
where CT.id_Site=".$site.") AS t2 ON YEAR(t2.Comms_Timestamp) = A.x
GROUP BY bucket
ORDER BY bucket";
					
					$mysqlConnections = config('easyquery.connections');
					$mysqli = new \mysqli($mysqlConnections['host'], $mysqlConnections['username'], $mysqlConnections['password'], $mysqlConnections['database'], $mysqlConnections['port']);
					if ($mysqli->connect_error) {
						return null;
					}
					if ($result = $mysqli->query($sql)) {
					
						while($row = $result->fetch_array(MYSQLI_BOTH)) {
							$value_array[]=$row["call_count"]+0; //force values to numbers
							$label_array[]=$row["bucket"];
							//TODO fix cases where count is zero.. we still need the label
						}
						
						$data = array();
							$data['labels'] = $label_array;
						$dataset = array();
							$dataset['label'] = 'calls';
							$dataset['data'] = $value_array;
							$dataset['backgroundColor'] = self::COLORS[10];
							$dataset['borderColor'] = self::COLORS[10];
							$dataset['borderWidth'] = 1;
							$dataset['hoverBackgroundColor'] = 'rgba(255,99,132,0.4)';
							$dataset['hoverBorderColor'] = 'rgba(255,99,132,1)';
							$dataset['pointColor'] = 'rgba(81, 192, 191,1)';
							$dataset['pointBackgroundColor'] = 'rgba(81, 192, 191,1)';
								$data['datasets'] = array($dataset);
							

						$mydata = array();
							$mydata['type'] = "line";
							$mydata['data'] = $data;
						$options=array();
							$options['maintainAspectRatio']=false;
							$options['animationSteps'] =300;
							$options['animationEasing'] = 'easeInSine';
							$options['showTooltips'] = true;
							$title=array();
								$title['text']='Calls by year';
								$title['position']='top';
								$title['fontSize']=18;
								$title['padding']=3;
								$title['display']=true;
							$options['title']=$title;
							$legend = array();
								$legend['display'] = false;
							$options['legend'] = $legend;
							$mydata['options']=$options;
						
						$result->close();
						$mysqli->close();
						return json_encode($mydata);
					}	
					$result->close();
					$mysqli->close();
					return;		
				break;
				case 'bystate':
					$sql="select count(C.Comms_Timestamp) as call_count, C.state as bucket, CT.id_Site 
					from tblCommunication as C left join tblCareTeam as CT on C.id_Case = CT.id_Case 
					group by CT.id_Site,C.State having CT.id_Site=" . $site . " AND C.state IS NOT NULL
					order by C.State";
										
					$mysqlConnections = config('easyquery.connections');
					$mysqli = new \mysqli($mysqlConnections['host'], $mysqlConnections['username'], $mysqlConnections['password'], $mysqlConnections['database'], $mysqlConnections['port']);
					if ($mysqli->connect_error) {
						return null;
					}
					if ($result = $mysqli->query($sql)) {
					
						while($row = $result->fetch_array(MYSQLI_BOTH)) {
							$value_array[]=$row["call_count"]+0; //force values to numbers
							$label_array[]=$row["bucket"];
							//TODO fix cases where count is zero.. we still need the label
						}
						
						$data = array();
							$data['labels'] = $label_array;
						$dataset = array();
							$dataset['label'] = 'calls';
							$dataset['data'] = $value_array;
							$dataset['backgroundColor'] = self::COLORS[5];
							$dataset['borderColor'] = self::COLORS[5];
							$dataset['borderWidth'] = 1;
							$dataset['hoverBackgroundColor'] = 'rgba(255,99,132,0.4)';
							$dataset['hoverBorderColor'] = 'rgba(255,99,132,1)';
							$dataset['pointColor'] = 'rgba(61, 163, 232,1)';
							$dataset['pointBackgroundColor'] = 'rgba(61, 163, 232,1)';
								$data['datasets'] = array($dataset);
							

						$mydata = array();
							$mydata['type'] = "horizontalBar";
							$mydata['data'] = $data;
						$options=array();
							$options['maintainAspectRatio']=false;
							$options['animationSteps'] =300;
							$scales=array();
								$xAxes=array();
									$ticks = array();
									$ticks['beginAtZero']=true;
								$xAxes['ticks'] = $ticks;
								$yAxes=array();
								$yAxes['stacked'] = true;
							$scales['xAxes'] = array($xAxes);
							$scales['yAxes'] = array($yAxes);	
							$options['scales']=$scales;
							$title=array();
								$title['text']='Calls by state';
								$title['position']='top';
								$title['fontSize']=18;
								$title['padding']=3;
								$title['display']=true;
							$options['title']=$title;
							$legend = array();
								$legend['display'] = false;
							$options['legend'] = $legend;
							$mydata['options']=$options;
						
						$result->close();
						$mysqli->close();
						return json_encode($mydata);
					}	
					$result->close();
					$mysqli->close();
					return;		
				break;
				case 'bydayofweek':
					$sql="SELECT IF(ISNULL(COUNT(t2.Comms_Timestamp)), 0, COUNT(t2.Comms_Timestamp)) AS call_count ,A.x AS bucket
FROM (select 1 x union select 2 union select 3 union select 4 union select 5 union select 6 union select 7) AS A
LEFT JOIN (select C.Comms_Timestamp 
from tblCommunication as C left join tblCareTeam as CT on C.id_Case = CT.id_Case 
where CT.id_Site=".$site.") AS t2 ON DAYOFWEEK(t2.Comms_Timestamp) = A.x
GROUP BY bucket
ORDER BY bucket";
					
					$mysqlConnections = config('easyquery.connections');
					$mysqli = new \mysqli($mysqlConnections['host'], $mysqlConnections['username'], $mysqlConnections['password'], $mysqlConnections['database'], $mysqlConnections['port']);
					if ($mysqli->connect_error) {
						return null;
					}
					if ($result = $mysqli->query($sql)) {
					
						while($row = $result->fetch_array(MYSQLI_BOTH)) {
							$value_array[]=$row["call_count"]+0; //force values to numbers
							//convert day num to day short name
							switch($row["bucket"]) {
								case 1:
									$label_array[]='Sun';
									break;
								case 2:
									$label_array[]='Mon';
									break;
								case 3:
									$label_array[]='Tue';
									break;
								case 4:
									$label_array[]='Wed';
									break;
								case 5:
									$label_array[]='Thu';
									break;
								case 6:
									$label_array[]='Fri';
									break;
								case 7:
									$label_array[]='Sat';
									break;
							}
							
							//TODO fix cases where count is zero.. we still need the label
						}

						$data = array();
							$data['labels'] = $label_array;
						$dataset = array();
							$dataset['label'] = 'calls';
							$dataset['data'] = $value_array;
							$dataset['backgroundColor'] = self::COLORS[6];
							$dataset['borderColor'] = self::COLORS[6];
							$dataset['borderWidth'] = 1;
							$dataset['hoverBackgroundColor'] = 'rgba(255,99,132,0.4)';
							$dataset['hoverBorderColor'] = 'rgba(255,99,132,1)';
							$dataset['pointColor'] = 'rgba(61,163,232,1)';
							$dataset['pointBackgroundColor'] = 'rgba(61,163,232,1)';
								$data['datasets'] = array($dataset);
							

						$mydata = array();
							$mydata['type'] = "radar";
							$mydata['data'] = $data;
						$options=array();
							$options['maintainAspectRatio']=false;
							$options['animationSteps'] =300;
							$options['animationEasing'] = 'easeInSine';
						$legend = array();
							$legend['display'] = false;
							$options['legend'] = $legend;
							$options['showTooltips'] = true;
							
							$mydata['options']=$options;
						
						$result->close();
						$mysqli->close();
						return json_encode($mydata);
					}	
					$result->close();
					$mysqli->close();
					return;		
				break;
								
			}
		}
		
		
	}
	
	
	private function GenerateDashObject($id,$query,$title) {
		
		$testscript="
		<script>
		var URL=`/dashboard/data/" . $query . "`;
		var data=[{}];$.ajax({url:URL,async:false,dataType:'json',success:function(items){data=items}});
		
		var ctx = document.getElementById('container" . $id . "').getContext('2d');
		var myChart = new Chart(ctx, data);
		</script>";
				
		return $testscript;
	}

}

