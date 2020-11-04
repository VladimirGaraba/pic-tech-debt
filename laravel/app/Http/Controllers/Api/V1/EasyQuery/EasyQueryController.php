<?php

namespace App\Http\Controllers\Api\V1\EasyQuery;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Services\EasyQuery\EasyQueryService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EasyQueryController extends Controller
{
    /**
     * @var EasyQueryService
     */
    private $easyQueryService;

    /**
     * EasyQueryController constructor.
     * @param EasyQueryService $easyQueryService
     */
    public function __construct(
        EasyQueryService $easyQueryService
    ) {
        $this->middleware('auth:api');
        $this->easyQueryService = $easyQueryService;
    }

    /**
     * @param $data
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respond($data)
    {
        return response()->json($data, 200);
    }

    /**
     * @param $data
     * @param int $errorCode
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondWithError($data, $errorCode = 500)
    {
        return response()->json($data, $errorCode);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function postModel(Request $request) : JsonResponse
    {
        //get model name
        $modelId = $request->get('modelId');
        //read model from a file and return in response
        $model = file_get_contents(storage_path('query-data/json/') . config('easyquery.model_file_json'));
        return $this->respond(json_decode($model));
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function postSync(Request $request) : JsonResponse
    {
        $query_data = $request->get('query');

        $sql = "";
        if (!$this->easyQueryService->isQueryEmpty($query_data)) {
            $queryJson = json_encode($query_data);
            $sql = $this->easyQueryService->buildSql($queryJson);
        }

        return $this->respond([
            'statement' => $sql
        ]);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function postExecute(Request $request) : JsonResponse
    {
		//get query in JSON format
        $query_data = $request->get('query');

        $query_json = json_encode($query_data);
        $sql = $this->easyQueryService->buildSql($query_json);
        $result = '{}';
        $recordSet = $this->easyQueryService->executeSql($sql);
        if ($recordSet) {
            $resultSet = $this->easyQueryService->renderDataTable($recordSet);
            $ret = array('statement' => $sql, 'resultSet' => $resultSet);
        } else {
            $ret['statement'] = "DATABASE CONNECTION ERROR!!!";
        }
        return $this->respond($ret);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function postSave(Request $request) : JsonResponse
    {
		//get query in JSON format
        $query_data = $request->get('query');
        //get query name
        $query_name = $query_data['id'];
        $query_json = json_encode($query_data);

		// Get the currently authenticated user's ID...
		$id = Auth::id();
		$results = DB::table( 'tblUser' )
					->select( 'tblSite_idtblSite as id_site')
					->where( 'userId', '=', $id)
					->get();
					
		$site = $results[0]->id_site;

        //save query to a file
        //$user = auth()->user();
        $folder_path = storage_path('query-data/store/' . $site . '/');
        if ($this->easyQueryService->makePath($folder_path)) {
            if (!$this->easyQueryService->queryExists($folder_path, $query_json)) {
                //$file_name = $this->easyQueryService->uniqueFileName($folder_path);
                file_put_contents($folder_path . $query_name, $query_json);
            }
            return $this->respond([
                'result' => "OK"
            ]);
        }
        return $this->respondWithError([
            'result' => "Fail"
        ]);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function postLoad(Request $request) : JsonResponse
    {
		// Get the currently authenticated user's ID...
		$id = Auth::id();
		$results = DB::table( 'tblUser' )
					->select( 'tblSite_idtblSite as id_site')
					->where( 'userId', '=', $id)
					->get();
					
		$site = $results[0]->id_site;
		
		//get query name
        $query_id = $request->get('id');
        //read query from a file and return in response
        $user = auth()->user();
        $folder_path = storage_path('query-data/store/' . $site . '/');

        if (!file_exists($folder_path)) {
            return $this->respondWithError([
                'result' => "Not Found Data"
            ]);
        }
        if ($request->get('fileName')) {
            $query_data = json_decode(file_get_contents($folder_path . $request->get('fileName')));
            return $this->respond($query_data);
        }
        return $this->respond($this->easyQueryService->loadQueries($folder_path));
    }
}
