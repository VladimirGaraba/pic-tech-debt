<?php
/**
 * resources/views/partials/sidebar.blade.php
 *
 * @package default
 */


?>
@inject('request', 'Illuminate\Http\Request')
<!-- Left side column. contains the sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <ul class="sidebar-menu">

            <li class="{{ $request->segment(1) == 'home' ? 'active' : '' }}">
                <a href="{{ url('/') }}">
                    <i class="fa fa-phone"></i>
                    <span class="title">@lang('global.app_spa')</span>
                </a>
            </li>

            <!--li class="{{ $request->segment(1) == 'home' ? 'active' : '' }}">
                <a href="{{ Request::root() . '/dashboard' }}">
                    <i class="fa fa-wrench"></i>
                    <span class="title">@lang('global.app_dashboard')</span>
                </a>
            </li-->

            @can('view data analytics')
            <li class="{{ $request->segment(1) == 'home' ? 'active' : '' }}">
                <a href="{{ route('analytics.home') }}">
                    <i class="fa fa-database"></i>
                    <span class="title">@lang('global.app_analytics')</span>
                </a>
            </li>

            <li class="{{ $request->segment(1) == 'home' ? 'active' : '' }}">
                <a href="{{ route('analytics.reports') }}">
                    <i class="fa fa-database"></i>
                    <span class="title">@lang('global.app_reports')</span>
                </a>
            </li>
            @endcan

            @can('manage users')
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-users"></i>
                    <span class="title">@lang('global.user-management.title')</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">

                    @if (Auth::user()->isAn('administrator'))
                    <li class="{{ $request->segment(2) == 'abilities' ? 'active active-sub' : '' }}">
                        <a href="{{ route('admin.abilities.index') }}">
                            <i class="fa fa-briefcase"></i>
                            <span class="title">
                                @lang('global.abilities.title')
                            </span>
                        </a>
                    </li>
                    <li class="{{ $request->segment(2) == 'roles' ? 'active active-sub' : '' }}">
                        <a href="{{ route('admin.roles.index') }}">
                            <i class="fa fa-briefcase"></i>
                            <span class="title">
                                @lang('global.roles.title')
                            </span>
                        </a>
                    </li>
                    @endif

                    <li class="{{ $request->segment(2) == 'users' ? 'active active-sub' : '' }}">
                        <a href="{{ route('admin.users.index') }}">
                            <i class="fa fa-user"></i>
                            <span class="title">
                                @lang('global.users.title')
                            </span>
                        </a>
                    </li>
                </ul>
            </li>
            @endcan

            @if(Gate::check('manage site') || Gate::check('administrate sites'))
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-sitemap"></i>
                    <span class="title">@lang('global.sites.settings.tree_title')</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">

                    @can('administrate sites')
                    <li class="{{ $request->segment(2) == 'sites' && $request->segment(3) == '' ? 'active active-sub' : '' }}">
                        <a href="{{ route('admin.sites.index') }}">
                            <i class="fa fa-briefcase"></i>
                            <span class="title">@lang('global.sites.actions.index.title')</span>
                        </a>
                    </li>
                    @endcan
                    @can('manage site')
                    <li class="{{ $request->segment(2) == 'sites' && $request->segment(3) == Auth::user()->tblUser->tblSite->idtblSite && $request->segment(4) == 'edit' ? 'active active-sub' : '' }}">
                        <a href="{{ route('admin.sites.edit', [Auth::user()->tblUser->tblSite->idtblSite]) }}">
                            <i class="fa fa-sitemap"></i>
                            <span class="title">@lang('global.app_edit_site')</span>
                        </a>
                    </li>
                    @endcan
                </ul>
            </li>
            @endif

            <li>
                <a href="{{ route('admin.users.edit',[Auth::user()->id]) }}">
                    <i class="fa fa-user"></i>
                    <span class="title">@lang('global.app_edit_profile')</span>
                </a>
            </li>

            <li class="{{ $request->segment(1) == 'change_password' ? 'active' : '' }}">
                <a href="{{ route('auth.password.change') }}">
                    <i class="fa fa-key"></i>
                    <span class="title">Change password</span>
                </a>
            </li>

            <li>
                <a href="#logout" onclick="$('#logout').submit();">
                    <i class="fa fa-arrow-left"></i>
                    <span class="title">@lang('global.app_logout')</span>
                </a>
            </li>
        </ul>
    </section>
</aside>
{!! Form::open(['route' => 'auth.logout', 'style' => 'display:none;', 'id' => 'logout']) !!}
<button type="submit">@lang('global.logout')</button>
{!! Form::close() !!}
