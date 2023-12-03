<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

abstract class RestController extends Controller
{
    protected $request;

    public function __construct(Request $request)
    {
    	$this->request = $request;
    }

    public function sendResponse($result = null, $message = '', $meta = [], $code = 200)
    {
        if(is_object($result) && $result->resource instanceof \Illuminate\Pagination\LengthAwarePaginator){
            $meta = $result->resource->toArray();
            unset($meta['data']);
        }

    	return response()->json([
    		'success' => true,
    		'data' => $result,
            'meta' => $meta,
    		'message' => $message
    	], $code);
    }

    public function setResponse($result = null, $message = '', $ip = '0', $code = 200)
    {
        // if(is_object($result) && $result->resource instanceof \Illuminate\Pagination\LengthAwarePaginator){
        //     $meta = $result->resource->toArray();
        //     unset($meta['data']);
        // }

        $resps = [
        		'success' => true,
        		'message' => $message
      	];

        if(!empty($result)){
            $resps['response_code'] = $code;
            $resps['error_code'] = null;
            $resps['error_message'] = null;
            $resps['data'] = $result;
        }

      	return response()->json($resps, $code);
    }

    public function setError($message = '', $errorMessages = [], $ip = '0', $code = 404)
    {
        $resps = [
        		'success' => false,
        		'message' => $message
      	];

        $resps["clientIP"] = $ip;
        $resps["timestamp"] = strtotime("now");
        if(!empty($errorMessages)){
            $resps['data'] = $errorMessages;
        }

      	return response()->json($resps, $code);
    }

    public function sendError($error, $errorMessages = [], $code = 404)
    {
    	$response = [
            'success' => false,
            'message' => $error,
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    public function validate($rules = [])
    {
    	return Validator::make($this->request->all(), $rules);
    }
}
