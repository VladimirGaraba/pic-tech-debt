<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PICSI Analytics</title>
    <link href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />   
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="{{ asset('css/analytics/easyquery/easyquery.css') }}" rel="stylesheet" type="text/css" media="screen" >
    <link href="{{ asset('css/analytics/easyquery/eq-icons-default.css') }}" rel="stylesheet" type="text/css" media="screen" >
    <link href="{{ asset('css/analytics/easyquery/eqview.css') }}" rel="stylesheet" type="text/css" media="screen" >
    <link href="{{ asset('css/analytics/easyquery/easychart.css') }}" rel="stylesheet" type="text/css" media="screen" >
</head>

<body>
    <form action="./" id="__AjaxAntiForgeryForm" method="post">
        <input name="__RequestVerificationToken" type="hidden" value="j6BmDvXyu6RGRCk1EHEKzTVVVhlSOKs5HE7ha6vi1KhAmFWNB-v8tOsWFqHMmJ6X13nZadv6cQrm372IWyC_vLj8ENGD0Z7r0x_209AF63M1" />
    </form>
    <div class="container-fluid">
        <div class="col-xs-3">
            <div id="content row">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="dropdown btn-group btn-group-lg btn-group-link">
                        <button type="button" class="dropdown-toggle btn btn-lg btn-link" data-toggle="dropdown"><span><span class="glyphicon glyphicon-menu-hamburger"></span>
                            <br><span style="font-size: 1rem;"><span>Menu</span></span>
                            </span>
                        </button>
                        <ul class="dropdown-menu">
                            <li role="presentation" class=""><a href="/" target="_self" role="menuitem" tabindex="-1"><span>App</span></a></li>
                            @if (Bouncer::can('view dashboard'))
                            <li role="presentation" class=""><a action="push" href="/dashboard" role="menuitem" tabindex="-1"><span>Dashboard</span></a></li>
                            @endif
                            <li role="presentation" class=""><a href="/settings" target="_self" role="menuitem" tabindex="-1"><span>Settings</span></a></li>
                            <li role="separator" class="divider"></li>
                            <li role="presentation" class="">
							<a href="{{ url('/logout') }}"
                                        onclick="event.preventDefault();
                                                 document.getElementById('logout-form').submit();" role="menuitem" tabindex="-1" class="logout">
                                        <span>Logout</span>
                                    </a>

                                    <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                                        {{ csrf_field() }}
                                    </form>
							</li>
                        </ul>
                    </div>
                    <button type="button" class="btn btn-lg btn-link" id="SaveQueryButton"><span class="glyphicon glyphicon-floppy-save"></span>
                    <br><span style="font-size: 1rem;"><span>Save Query</span></span>
                    </button>
                    <button type="button" class="btn btn-lg btn-link" id="LoadQueryButton"><span class="glyphicon glyphicon-floppy-open"></span>
                        <br><span style="font-size: 1rem;"><span>Load Query</span></span>
                    </button>
                    <button type="button" class="btn btn-lg btn-link" id="ExecuteQueryButton"><span class="glyphicon glyphicon-play"></span>
                        <br><span style="font-size: 1rem;"><span>Run Query</span></span>
                    </button>
                </nav>
            </div>
            <div id="content row">
                <div class="entities-block">
                    <hr class="entities-hr hr" />
                    <div class="entities-title">Fields</div>
                    <div class="entities-panel-container">
                        <!-- EntitiesPanel widget placeholder -->
                        <div id="EntitiesPanel" onselectstart="return false"></div>
                    </div>
                </div>
            </div>
            <div id="content row">
                <div class="sql-panel">
                    <hr class="sql-panel-hr hr" />
                    <div class="sql-panel-title">SQL</div>
                    <div id="SqlPanel" class="sql-block">
                        <div class="sql-panel-result"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-9">
            <div id="content row">
                <div class="columns-block">
                    <hr class="columns-hr hr" />
                    <div class="columns-title">Columns 
						<div id="ClearQueryButton" class="btn btn-lg btn-link pull-right">
							<span class="glyphicon glyphicon-remove"></span>
							<span style="font-size: 1rem;"><span>Clear Query</span>
							</span>
						</div> 
					</div>
                    <div class="columns-panel-container">
                        <!-- ColumnsPanel widget placeholder -->
                        <div id="ColumnsPanel"></div>
                    </div>
                </div>

                <div class="columns-sorting-block">
                    <div class="columns-sorting-title">Columns Sorting</div>
                    <div class="columns-sorting-container">
                        <div id="SortingBar"></div>
                    </div>
                </div>
            </div>
            <div id="content row">
                <div class="conditions-block">
                    <hr class="conditions-hr hr" />
                    <div class="conditions-title">Conditions</div>
                    <div class="query-panel-container">
                        <!-- QueryPanel widget placeholder -->
                        <div id="QueryPanel"></div>
                    </div>
                </div>
            </div>
            <div id="content row">
                <div class="result-panel">
                    <hr class="result-panel-hr hr" />
                    <div class="result-panel-title">Result
                        <span id="ResultCount" style="display:none; margin-left:20px; font-size:small"></span>

                        <span id="ResultExportButtons">
                         <a href="#" onclick="javascript:ExportCsv.run()">Export to Excel</a>   
                    </span>
                    </div>
                    <div id="ResultPanel" class="result-panel-content">
                    </div>
                    <div class="result-panel-content-padding">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div id="footer">
    </div>
    <div id='loading_wrap'>
        <div class="loader"></div>
    </div>
    @include('analytics.modal.loadquery')
    @include('analytics.modal.savequery')
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
    <script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script> 
    <!-- EasyQuery widgets settings -->
	<script src="{{ asset('js/analytics/easyquery/eq.widget.settings.js') }}" type="text/javascript"></script>     
    <!-- EasyQuery script files -->
	<script src="{{ asset('js/analytics/easyquery/eq.all.min.js') }}" type="text/javascript"></script>
	<script src="{{ asset('js/analytics/easyquery/eq.view.basic.js') }}" type="text/javascript"></script>
	<script src="{{ asset('js/analytics/easyquery/easychart.js') }}" type="text/javascript"></script>
	<script src="{{ asset('js/analytics/easyquery/easychart.google.js') }}" type="text/javascript"></script>
	<script src="{{ asset('js/analytics/easyquery/export.js') }}" type="text/javascript"></script>
</body>
</html>
