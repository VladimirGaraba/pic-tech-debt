<?php
/**
 * resources/views/admin/users/edit.blade.php
 *
 * @package default
 */


?>
@extends('layouts.app')

@section('content')
    <h3 class="page-title">
        @if(Auth::user()->id === $user->id)
            @lang('global.app_edit_profile')
        @else
            @lang('global.users.title')
        @endif
    </h3>

    {!! Form::model($user, ['method' => 'PUT', 'route' => ['admin.users.update', $user->id]]) !!}

    <div class="panel panel-default">
        <div class="panel-heading">
            @if(Auth::user()->id === $user->id)
                @lang('global.users.profile')
            @else
                @lang('global.app_edit')
            @endif
        </div>

        <div class="panel-body">
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('name', Lang::get('global.users.fields.name.title') . '*', ['class' => 'control-label']) !!}
                    {!! Form::text('name', old('name'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    @if($errors->has('name'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('name') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('email', Lang::get('global.users.fields.email.title') . '*', ['class' => 'control-label']) !!}
                    {!! Form::email('email', old('email'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    @if($errors->has('email'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('email') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            @if($tblUser)
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('tblUser[UserPhone]', Lang::get('global.users.fields.phone.title') . '*', ['class' => 'control-label']) !!}
                    {!! Form::text('tblUser[UserPhone]', old('tblUser[UserPhone]'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    @if($errors->has('tblUser[UserPhone]'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('tblUser[UserPhone]') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('tblUser[UserJob]', Lang::get('global.users.fields.job.title') . '*', ['class' => 'control-label']) !!}
                    {!! Form::select('tblUser[UserJob]',
                        array_combine($jobOptions, array_map(function ($j) { return Lang::get('global.users.fields.job.options.' . $j); }, $jobOptions)),
                        old('tblUser[UserJob]'), ['class' => 'form-control', 'required' => '']) !!}
                    <p class="help-block">
                        @lang('global.users.fields.job.help')
                        @if($errors->has('tblUser[UserJob]'))
                            <br />
                            <span class="text-danger">
                                {{ $errors->first('tblUser[UserJob]') }}
                            </span>
                        @endif
                    </p>
                </div>
            </div>
            @endif
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('password', Lang::get('global.users.fields.password.title'), ['class' => 'control-label']) !!}
                    {!! Form::password('password', ['class' => 'form-control', 'placeholder' => '']) !!}
                    @if($errors->has('password'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('password') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('roles', Lang::get('global.users.fields.roles.title') . '*', ['class' => 'control-label']) !!}
                    {!! Form::select('roles[]', $roles, old('roles') ? old('role') : $user->roles()->pluck('name', 'name'), $roleOpts) !!}
                    @if($errors->has('roles'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('roles') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            @can('manage users')
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('site', Lang::get('global.users.fields.site.title') . '*', ['class' => 'control-label']) !!}
                    @can('administrate users')
                        {!! Form::select('site', $sites, $tblUserObj->tblSite_idtblSite, ['class' => 'form-control']) !!}
                    @else
                        {!! Form::text('site', $tblUserObj->tblSite->SiteName, ['readonly' => true, 'class' => 'form-control']) !!}
                    @endcan
                    @if($errors->has('site'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('site') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            @endcan
        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            @lang('global.users.organisation.title')
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('tblUser[tblSite][tblOrganisation][OrganisationName]', Lang::get('global.users.organisation.name'), ['class' => 'control-label']) !!}
                    {!! Form::text('tblUser[tblSite][tblOrganisation][OrganisationName]', old('tblUser[tblSite][tblOrganisation][OrganisationName]'), ['class' => 'form-control', 'placeholder' => '', 'readonly' => '']) !!}
                    @if($errors->has('tblUser[tblSite][tblOrganisation][OrganisationName]'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('tblUser[tblSite][tblOrganisation][OrganisationName]') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('tblUser[tblSite][tblOrganisation][OrganisationStreet]', Lang::get('global.addresses.street'), ['class' => 'control-label']) !!}
                    {!! Form::text('tblUser[tblSite][tblOrganisation][OrganisationStreet]', old('tblUser[tblSite][tblOrganisation][OrganisationStreet]'), ['class' => 'form-control', 'placeholder' => '', 'readonly' => '']) !!}
                    @if($errors->has('tblUser[tblSite][tblOrganisation][OrganisationStreet]'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('tblUser[tblSite][tblOrganisation][OrganisationStreet]') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6 form-group">
                    {!! Form::label('tblUser[tblSite][tblOrganisation][OrganisationSuburb]', Lang::get('global.addresses.suburb'), ['class' => 'control-label']) !!}
                    {!! Form::text('tblUser[tblSite][tblOrganisation][OrganisationSuburb]', old('tblUser[tblSite][tblOrganisation][OrganisationSuburb]'), ['class' => 'form-control', 'placeholder' => '', 'readonly' => '']) !!}
                    @if($errors->has('tblUser[tblSite][tblOrganisation][OrganisationSuburb]'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('tblUser[tblSite][tblOrganisation][OrganisationSuburb]') }}
                        </span>
                    </p>
                    @endif
                </div>
                <div class="col-xs-6 form-group">
                    {!! Form::label('tblUser[tblSite][tblOrganisation][OrganisationPostcode]', Lang::get('global.addresses.postcode'), ['class' => 'control-label']) !!}
                    {!! Form::text('tblUser[tblSite][tblOrganisation][OrganisationPostcode]', old('tblUser[tblSite][tblOrganisation][OrganisationPostcode]'), ['class' => 'form-control', 'placeholder' => '', 'readonly' => '']) !!}
                    @if($errors->has('tblUser[tblSite][tblOrganisation][OrganisationPostcode]'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('tblUser[tblSite][tblOrganisation][OrganisationPostcode]') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6 form-group">
                    {!! Form::label('tblUser[tblSite][tblOrganisation][OrganisationState]', Lang::get('global.addresses.state'), ['class' => 'control-label']) !!}
                    {!! Form::text('tblUser[tblSite][tblOrganisation][OrganisationState]', old('tblUser[tblSite][tblOrganisation][OrganisationState]'), ['class' => 'form-control', 'placeholder' => '', 'readonly' => '']) !!}
                    @if($errors->has('tblUser[tblSite][tblOrganisation][OrganisationState]'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('tblUser[tblSite][tblOrganisation][OrganisationState]') }}
                        </span>
                    </p>
                    @endif
                </div>
                <div class="col-xs-6 form-group">
                    {!! Form::label('tblUser[tblSite][tblOrganisation][tblISOtoCountry][CountryName]', Lang::get('global.addresses.country'), ['class' => 'control-label']) !!}
                    {!! Form::text('tblUser[tblSite][tblOrganisation][tblISOtoCountry][CountryName]', old('tblUser[tblSite][tblOrganisation][tblISOtoCountry][CountryName]'), ['class' => 'form-control', 'placeholder' => '', 'readonly' => '']) !!}
                    @if($errors->has('tblUser[tblSite][tblOrganisation][tblISOtoCountry][CountryName]'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('tblUser[tblSite][tblOrganisation][tblISOtoCountry][CountryName]') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            @lang('global.users.settings.title')
        </div>
        <div class="panel-body">
            @if(array_key_exists('print-format', $siteMeta) && $siteMeta['print-format'] === 'user-selectable')
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('meta[print-format]', Lang::get('global.users.settings.print-format.name'), ['class' => 'control-label']) !!}
                    {!! Form::select('meta[print-format]', array(
                            'standard' => Lang::get('global.users.settings.print-format.options.standard'),
                            'medical' => Lang::get('global.users.settings.print-format.options.medical')
                        ), array_key_exists('print-format', $meta) ? $meta['print-format'] : 'standard', ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    @if($errors->has('meta[print-format]'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('meta[print-format]') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            @endif
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('meta[theme]', Lang::get('global.users.settings.theme.name'), ['class' => 'control-label']) !!}
                    {!! Form::select('meta[theme]', array(
                            'bootstrap' => Lang::get('global.users.settings.theme.options.bootstrap'),
                            'ocean' => Lang::get('global.users.settings.theme.options.ocean'),
                            'magenta' => Lang::get('global.users.settings.theme.options.magenta'),
                            'oreo' => Lang::get('global.users.settings.theme.options.oreo')
                        ), array_key_exists('theme', $meta) ? $meta['theme'] : 'bootstrap', ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    @if($errors->has('meta[theme]'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('meta[theme]') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
        </div>
    </div>

    {!! Form::submit(trans('global.app_update'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop
