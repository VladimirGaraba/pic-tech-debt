<?php
/**
 * resources/views/analytics/reports.blade.php
 *
 * @package default
 */


?>
@extends('layouts.app')

@push('css')
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/jQuery-QueryBuilder/dist/css/query-builder.default.min.css" />
@endpush

@push('js')
    <script src="//cdn.jsdelivr.net/npm/jQuery-QueryBuilder/dist/js/query-builder.standalone.js"></script>
    <script src="{{ asset('js/plugins/couchdb-support.js') }}"></script>
    <script src="{{ asset('js/reports.js') }}"></script>
@endpush

@section('content')
    <div id="query-builder"></div>
    <div id="reports"></div>
@stop