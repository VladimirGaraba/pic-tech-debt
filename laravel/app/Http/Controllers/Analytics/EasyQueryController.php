<?php

namespace App\Http\Controllers\Analytics;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EasyQueryController extends Controller
{
    /**
     * EasyQueryController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the analytics query builder.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('analytics.query_builder_new');
    }
}
