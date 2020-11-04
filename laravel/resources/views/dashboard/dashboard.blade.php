<!DOCTYPE html>
<html lang="en">

<head>
    <title>{{$site['SiteName'] or Lang::get('global.messages.unspecified')}} Operations Dashboard</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.0/jquery-ui.js"></script>
    <link href="https://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.0/lodash.min.js"></script>
    <script type="text/javascript" src="{{ asset('js/dashboard/gridstack.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/dashboard/gridstack.jQueryUI.min.js') }}"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.min.js" integrity="sha256-MZo5XY1Ah7Z2Aui4/alkfeiq3CopMdV/bbkc/Sh41+s=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="{{ asset('js/dashboard/patternomaly.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/dashboard/dash.js') }}"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{ asset('css/dashboard/gridstack.min.css') }}" type="text/css" />
    <style media="screen" type="text/css">
		<style type="text/css">
        .grid-stack {
            
        }

        .grid-stack-item-content {
            /*margin-bottom: 10px;*/
            left: 15px;
            right: 15px;
			padding: 10px 17px;
			background: #fff;
			border: 1px solid #e6e9ed;
        }
        .grid-stack-item {
            
        }
 .defaultWidgetFrame {
    margin-bottom: 10px;
    padding: 10px 17px;
    background: #fff;
    border: 1px solid #e6e9ed;
}
.defaultWidgetFrameHeader .title {
    font-size: 18px;
    float: left;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
element.style {
    opacity: 1;
}
.defaultWidgetFrameHeader {
	/*border-bottom: 2px solid #e6e9ed;*/
    padding: 1px 5px 6px;
    margin-bottom: 10px;
}
/* Centered section inside the top navigation */
.topnav-centered {
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
    </style>
</head>

<body>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="dropdown btn-group btn-group-lg btn-group-link">
                <button type="button" class="dropdown-toggle btn btn-lg btn-link" data-toggle="dropdown"><span><span class="glyphicon glyphicon-menu-hamburger"></span>
                    <br><span style="font-size: 1rem;"><span>Menu</span></span>
                    </span>
                </button>
                <ul class="dropdown-menu">
                    <li role="presentation" class=""><a href="/" target="_self" role="menuitem" tabindex="-1"><span>App</span></a></li>
                    @if (Bouncer::can('view data analytics'))
                    <li role="presentation" class=""><a action="push" href="/analytics" role="menuitem" tabindex="-1"><span>Analytics</span></a></li>
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
            <!--<button type="button" class="btn btn-lg btn-link" id="save-grid"><span class="glyphicon glyphicon-floppy-save"></span>
                <br><span style="font-size: 1rem;"><span>Save Layout</span></span>
            </button>
            <button type="button" class="btn btn-lg btn-link" id="load-grid"><span class="glyphicon glyphicon-floppy-open"></span>
                <br><span style="font-size: 1rem;"><span>Load Layout</span></span>
            </button>
            <button type="button" class="btn btn-lg btn-link" id="clear-grid"><span class="glyphicon glyphicon-play"></span>
                <br><span style="font-size: 1rem;"><span>Clear Layout</span></span>
            </button>-->
            <!-- centred title -->
            <div class="topnav-centered">
				<h2>{{$site['SiteName'] or Lang::get('global.messages.unspecified')}} Operations Dashboard</h2>
			</div>
        </nav>

        <br/>

        <div class="grid-stack">
        </div>

        <!--<hr/>

        <textarea id="saved-data" cols="100" rows="20" readonly="readonly"></textarea>-->
    </div>
</body>

</html>
