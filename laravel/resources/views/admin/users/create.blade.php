<?php
/**
 * resources/views/admin/users/create.blade.php
 *
 * @package default
 */


?>
@extends('layouts.app')

@section('content')
    <h3 class="page-title">@lang('global.users.title')</h3>
    {!! Form::open(['method' => 'POST', 'route' => ['admin.users.store']]) !!}

    <div class="panel panel-default">
        <div class="panel-heading">
            @lang('global.app_create')
        </div>

        <div class="panel-body">
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('name', 'Name*', ['class' => 'control-label']) !!}
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
                    {!! Form::label('email', 'Email*', ['class' => 'control-label']) !!}
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
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('tblUser[UserPhone]', 'Phone*', ['class' => 'control-label']) !!}
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
                        array_combine(\App\TblUser::$jobs, array_map(function ($j) { return Lang::get('global.users.fields.job.options.' . $j); }, \App\TblUser::$jobs)),
                        old('tblUser[UserJob]'), ['class' => 'form-control', 'required' => '']) !!}
                    @if($errors->has('tblUser[UserJob]'))
                    <p class="help-block">
                        <span class="text-danger">
                            {{ $errors->first('tblUser[UserJob]') }}
                        </span>
                    </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('password', 'Password*', ['class' => 'control-label']) !!}
                    {!! Form::password('password', ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
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
                    {!! Form::label('roles', 'Roles*', ['class' => 'control-label']) !!}
                    {!! Form::select('roles[]', $roles, old('roles'), ['class' => 'form-control select2', 'multiple' => 'multiple', 'required' => '']) !!}
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
                        {!! Form::select('site', $sites, $current_site, ['class' => 'form-control']) !!}
                    @else
                        {!! Form::select('site', $sites, $current_site, ['readonly' => true, 'class' => 'form-control']) !!}
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

    {!! Form::submit(trans('global.app_save'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop
