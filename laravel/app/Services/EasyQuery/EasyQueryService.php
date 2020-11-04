<?php
namespace App\Services\EasyQuery;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EasyQueryService
{
    /**
     * EasyQueryService constructor.
     */
    public function __construct()
    {
    }

    /**
     * @param Integer $type
     * @return String
     */
    public function getTypeName($type) : String
    {
        $types[1] = 'number';
        $types[2] = 'number';
        $types[3] = 'number';
        $types[4] = 'number';
        $types[5] = 'number';
        $types[5] = 'number';
        $types[8] = 'number';
        $types[9] = 'number';
        $types[246] = 'number';
        $types[7] = 'datetime';
        $types[10] = 'datetime';
        $types[11] = 'datetime';
        $types[12] = 'datetime';
        if (!isset($types[$type])) return 'string';
        return $types[$type];
    }

    /**
     * @param Object $recordSet
     * @return Array
     */
    public function renderDataTable($recordSet) : array
    {
		        
        $ret = array();

        $columns = $recordSet->fetch_fields();
        foreach ($columns as $col) {
            $columnDescr = array();
            $columnDescr['id'] = $col->name;
            $columnDescr['label'] = $col->name;
            $columnDescr['type'] = $this->getTypeName($col->type);
            $ret['cols'][] = $columnDescr;
        }

        while ($array = $recordSet->fetch_array(MYSQLI_ASSOC)) {
            $values = array_values($array);
            $rowData = array();
            $rowData['c'] = array();
            $col_index = 0;
            $colType = '';
            foreach ($values as $value) {
                $colType = $ret['cols'][$col_index]['type'];
                if ($colType == 'number') {
                    $rowData['c'][] = array("v" => $value * 1);
                } else if ($colType == 'datetime') {
					//mysqldatetime looks like - 2018-12-28 03:25:52
					$timestamp = strtotime($value);
					$year = substr($value, 0, 4);
					$month = intval(substr($value, 5, 2)) - 1;
					$day = substr($value, 8, 2);
					$hour= substr($value, 11, 2);
					$minute= substr($value, 14, 2);
					$second= substr($value, 17, 2);
					$rowData['c'][]=array("v"=> "Date(" . $year . ", " . $month . ", " . $day . ", " . $hour . ", " . $minute . ", " . $second . ")");               
				} else {
                    $rowData['c'][] = array("v" => $value);
                }
                $col_index++;
            }
            $ret['rows'][] = $rowData;

        }
        return $ret;
    }

    public function renderRequestedList($recordSet)
    {
        $ret = array();
        while ($array = $recordSet->fetch_array(MYSQLI_NUM)) {
            if (!isset($array[1])) $array[1] = $array[0];
            $ret[] = array('id' => $array[0], 'text' => $array[1]);
        }
        $ret_json = json_encode($ret);
        return $ret_json;
    }

    /**
     * @param String $sql
     * @return Array
     */
    public function executeSql($sql)
    {
        $mysqlConnections = config('easyquery.connections');
        $mysqli = new \mysqli($mysqlConnections['host'], $mysqlConnections['username'], $mysqlConnections['password'], $mysqlConnections['database'], $mysqlConnections['port']);
        if ($mysqli->connect_error) {
            return null;
        }
        $eResult = $mysqli->query($sql);
        //Log::debug('query result: '.print_r( $eResult, true )); 
        
        return $eResult;
    }

    /**
     * @param String $query_json
     * @return String
     */
    public function buildSql($query_json)
    {
		//we are slipping in a condition to force the query string to always have joins in tblCareTeam and a conditions that matches the user's site
		//first we find out which site the user belongs to
		// Get the currently authenticated user's ID...
		$id = Auth::id();
		$results = DB::table( 'tblUser' )
					->select( 'tblSite_idtblSite as id_site')
					->where( 'userId', '=', $id)
					->get();
					
		$site = $results[0]->id_site;
		
		//now we inject the condition into the json
		//Log::debug('initial query data: '.$query_json);

		//we need to modify things if it is trying to select anything that has case data - so that they can only see their own case data or their own users
		if(strpos($query_json,'users')>0) {  //we have something including users table
			$Condition_Site=',{"justAdded":false,"typeName":"SMPL","enabled":true,"operatorID":"Equal","expressions":[{"kind":"Attribute","typeName":"ENTATTR","id":"users.id_Site"},{"typeName":"CONST","dataType":"Int","kind":"Scalar","value":"' . $site . '","text":"' . $site . '"}],"blockId":"QueryPanel-cond-4"}';
		}
		else {
			$Condition_Site = ',{"justAdded":false,"typeName":"SMPL","enabled":true,"operatorID":"Equal","expressions":[{"kind":"Attribute","typeName":"ENTATTR","id":"tblCareTeam.id_Site"},{"typeName":"CONST","dataType":"Int","kind":"Scalar","value":"' . $site . '","text":"' . $site . '"}],"blockId":"QueryPanel-cond-99"}';
		}
		$ConditionsPos = strpos($query_json, ']},"columns"');
		$query_json = substr_replace($query_json, $Condition_Site, $ConditionsPos, 0);
		
		//Log::debug('modified query data: '.$query_json);
		//end condition injection
		
		//send a request to the REST web-service
        $url = config('easyquery.sqbapi_host') . 'api/2.0/SqlQueryBuilder';
        $request_data = '{"modelId":"' . config('easyquery.model_id') . '", "query":' . $query_json . '}';

		$options = array(
            'http' => array(
                'header' => "Content-type: application/json\r\nSQB-Key: " . config('easyquery.sqbapi_key') . "\r\n",
                'method' => 'POST',
                'content' => $request_data,
            ),
        );
        $context = stream_context_create($options);
        try {
            $response = file_get_contents($url, false, $context);
        } catch (\Throwable $th) {
            $response = false;
        }
		//Log::debug('response json: '.$response);
		
		//get a response in JSON format	
        if ($response !== false) {
            $res = json_decode($response, true);

            $sql = "";
			//now we get an SQL statement by the query defined on client-side
            if ($res != null && array_key_exists("sql", $res))
                $sql = $res["sql"];
				//Log::debug('sql query: '.$sql);
            return $sql;
        } else {
            return 'ERROR';
            Log::debug('Query error');
        }
    }

    public function getXmlModel($modelId)
    {
	//Get XML Model from SimpleQueryBuilder
        $url = config('easyquery.sqbapi_host') . 'api/2.0/DataModels/' . $modelId;

        $options = array(
            'http' => array(
                'header' => "SQB-Key: " . config('easyquery.sqbapi_key'),
            ),
        );
        $context = stream_context_create($options);

        $response = file_get_contents($url, false, $context);

        return $response;
    }

    /**
     * @param Array $query
     * @return bool
     */
    public function isQueryEmpty(array $query)
    {
        $column_count = count($query['columns']);
        $condition_count = count($query['root']['conditions']);
        return $column_count == 0 && $condition_count == 0;
    }

    /**
     * @param String $folderPath
     * @param String $queryJson
     * @return bool
     */
    public function queryExists($folderPath, $queryJson)
    {
        $files = scandir($folderPath);
        foreach ($files as $key => $file) {
            if ($file == '.' || $file == '..') continue;
            $storedJson = file_get_contents($folderPath . $file);
            if ($storedJson == $queryJson)
                return true;
        }
        return false;
    }

    /**
     * @param String $folderPath
     * @return String
     */
    public function uniqueFileName($folderPath)
    {
        $filename = uniqid();
        while (file_exists($folderPath . $filename)) {
            $filename = uniqid();
        }
        return $filename;
    }

    /**
     * @param String $path
     * @param Number $mode
     * @return bool
     */
    public function makePath($path, $mode = 0777)
    {
        if (@mkdir($path, $mode) or file_exists($path)) return true;
        return ($this->makePath(dirname($path)) and mkdir($path, 0777));
    }

    /**
     * @param String $folderPath
     * @return Array
     */
    public function loadQueries($folderPath)
    {
        $files = scandir($folderPath);
        $queries = [];
        foreach ($files as $key => $file) {
            if ($file == '.' || $file == '..') continue;
            $query_data = json_decode(file_get_contents($folderPath . $file), true);
            $sql = "";
            if (!$this->isQueryEmpty($query_data)) {
                $queryJson = json_encode($query_data);
                $sql = $this->buildSql($queryJson);
            }
            array_push($queries, [
                'statement' => $sql,
                'filename' => $file,
                'query_data' => $query_data
            ]);
        }
        return $queries;
    }
}
