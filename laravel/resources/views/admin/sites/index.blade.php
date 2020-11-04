<?php
/**
 * resources/views/admin/sites/index.blade.php
 *
 * @package default
 */


?>
@extends('layouts.app')

@section('content')
    <h3 class="page-title">@lang('global.sites.title')</h3>
    <p>
        <a href="{{ route('admin.sites.create') }}" class="btn btn-success">@lang('global.app_add_new')</a>
    </p>

    <div class="panel panel-default">
        <div class="panel-heading">
            @lang('global.app_list')
        </div>

        <div class="panel-body table-responsive">
            <table class="table table-bordered table-striped {{ count($sites) > 0 ? 'datatable' : '' }} dt-select">
                <thead>
                    <tr>
                        <th style="text-align:center;"><input type="checkbox" id="select-all" /></th>

                        <th>@lang('global.sites.fields.idtblSite.title')</th>
                        <th>@lang('global.sites.fields.SiteName.title')</th>
                        <th>@lang('global.sites.fields.Shortcode.title')</th>
                        <th>@lang('global.sites.fields.tblOrganisation_OrganisationState.title')</th>
                        <th>@lang('global.sites.fields.tblISOtoCountry_ISOAlpha2.title')</th>
                        <th>@lang('global.sites.fields.SiteDefaultTimeZone.title')</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                @if (count($sites) > 0)
                    @foreach ($sites->all() as $site)
                        <tr data-entry-id="{{ $site->idtblSite }}">
                            <td></td>

                            <td>{{$site->idtblSite}}</td>
                            <td>{{$site->SiteName}}</td>
                            <td>{{$site->Shortcode}}</td>
                            <td>{{$site->tblOrganisation->OrganisationState}}</td>
                            <td>{{$site->tblISOtoCountry->CountryName}}</td>
                            <td>{{sprintf('%+05d', $site->SiteDefaultTimeZone)}}</td>
                            <td>
                                <a href="{{ route('admin.sites.edit',[$site->idtblSite]) }}"
                                   class="btn btn-xs btn-info">@lang('global.app_edit')</a>
                            </td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <td colspan="7">@lang('global.app_no_entries_in_table')</td>
                    </tr>
                @endif
                </tbody>
            </table>
        </div>
@stop
