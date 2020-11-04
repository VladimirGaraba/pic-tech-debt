<?php
/**
 * resources/views/admin/sites/edit.blade.php
 *
 * @package default
 */


?>
@extends('layouts.app')

@section('content')
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkTn-QiZu1X5iQ1beIN51DDU7M4NR337w&libraries=places"></script>
    <h3 class="page-title">
        @if(Auth::user()->tblUser->tblSite->idtblSite === $site->idtblSite)
            @lang('global.app_edit_site')
        @endif
    </h3>

    {!! Form::model($site, ['method' => 'PUT', 'route' => ['admin.sites.update', $site->idtblSite], 'enctype' => "multipart/form-data"]) !!}

    <div class="panel panel-default">
        <div class="panel-heading">
            @lang('global.sites.title')
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('site_name', Lang::get('global.sites.fields.SiteName.title'), ['class' => 'control-label']) !!}
                    {!! Form::text('site_name', $site->SiteName, ['class' => 'form-control', 'placeholder' => '']) !!}
                    <p class="help-block">
                        @lang('global.sites.fields.SiteName.helper')
                    </p>
                    @if($errors->has('site_name'))
                        <p class="help-block">
                            {{ $errors->first('site_name') }}
                        </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('shortcode', Lang::get('global.sites.fields.Shortcode.title'), ['class' => 'control-label']) !!}
                    {!! Form::text('shortcode', $site->Shortcode, ['class' => 'form-control', 'placeholder' => '', !empty($site->Shortcode) ? 'readonly' : '']) !!}
                    <p class="help-block">
                        @lang('global.sites.fields.Shortcode.helper')
                    </p>
                    @if($errors->has('site_name'))
                        <p class="help-block">
                            {{ $errors->first('site_name') }}
                        </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('organisation', Lang::get('global.sites.fields.tblOrganisation_idtblOrganisation.title'), ['class' => 'control-label']) !!}
                    <input type="text" id="organisation_search" class="form-control" placeholder="" />
                    <p class="help-block">
                        @lang('global.sites.fields.tblOrganisation_idtblOrganisation.helper')
                    </p>

                    {!! Form::hidden('organisation_latitude', $site->tblOrganisation->OrganisationLatitude, ['id' => 'organisation_latitude']) !!}
                    {!! Form::hidden('organisation_longitude', $site->tblOrganisation->OrganisationLongitude, ['id' => 'organisation_longitude']) !!}
                    {!! Form::hidden('organisation_place_id', $site->tblOrganisation->GooglePlaceId, ['id' => 'organisation_place_id']) !!}
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('organisation', Lang::get('global.organisation.fields.OrganisationState.title'), ['class' => 'control-label']) !!}
                    {!! Form::text('organisation_state', $site->tblOrganisation->OrganisationState, ['id' => 'organisation_state', 'size' => 100 , 'readonly' => 'true', 'class' => 'form-control', 'placeholder' => '']) !!}
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('country_code', Lang::get('global.sites.fields.tblISOtoCountry_ISOAlpha2.title'), ['class' => 'control-label']) !!}
                    {!! Form::select('country_code', $iso_to_country, $site->tblOrganisation->tblISOtoCountry_ISOAlpha2, ['id' => 'country_code', 'readonly' => true, 'class' => 'form-control', 'placeholder' => '']) !!}
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('timezone', Lang::get('global.sites.fields.SiteDefaultTimeZone.title'), ['class' => 'control-label']) !!}
                    {!! Form::select('timezone',[
                        -1200 => '(GMT -12:00) Eniwetok, Kwajalein',
                        -1100 => '(GMT -11:00) Midway Island, Samoa',
                        -1000 => '(GMT -10:00) Hawaii',
                        -930  => '(GMT -9:30) Taiohae',
                        -900  => '(GMT -9:00) Alaska',
                        -800  => '(GMT -8:00) Pacific Time (US &amp; Canada)',
                        -700  => '(GMT -7:00) Mountain Time (US &amp; Canada)',
                        -600  => '(GMT -6:00) Central Time (US &amp; Canada), Mexico City',
                        -500  => '(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima',
                        -430  => '(GMT -4:30) Caracas',
                        -400  => '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
                        -330  => '(GMT -3:30) Newfoundland',
                        -300  => '(GMT -3:00) Brazil, Buenos Aires, Georgetown',
                        -200  => '(GMT -2:00) Mid-Atlantic',
                        -100  => '(GMT -1:00) Azores, Cape Verde Islands',
                        0  => '(GMT) Western Europe Time, London, Lisbon, Casablanca',
                        100  => '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris',
                        200  => '(GMT +2:00) Kaliningrad, South Africa',
                        300  => '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
                        330  => '(GMT +3:30) Tehran',
                        400  => '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
                        430  => '(GMT +4:30) Kabul',
                        500  => '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
                        530  => '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
                        545  => '(GMT +5:45) Kathmandu, Pokhara',
                        600  => '(GMT +6:00) Almaty, Dhaka, Colombo',
                        630  => '(GMT +6:30) Yangon, Mandalay',
                        700  => '(GMT +7:00) Bangkok, Hanoi, Jakarta',
                        800  => '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
                        845  => '(GMT +8:45) Eucla',
                        900  => '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
                        930  => '(GMT +9:30) Adelaide, Darwin',
                        1000 => '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
                        1030 => '(GMT +10:30) Lord Howe Island',
                        1100 => '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
                        1130 => '(GMT +11:30) Norfolk Island',
                        1200 => '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
                        1245 => '(GMT +12:45) Chatham Islands',
                        1300 => '(GMT +13:00) Apia, Nukualofa',
                        1400 => '(GMT +14:00) Line Islands, Tokelau'
                    ],
                    $site->SiteDefaultTimeZone,
                    ['class' => 'form-control', 'placeholder' => '']
                    ) !!}
                    <p class="help-block">
                        @lang('global.sites.fields.tblISOtoCountry_ISOAlpha2.helper')
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-8 form-group">
                    {!! Form::label('logo', Lang::get('global.sites.logo.name'), ['class' => 'control-label']) !!}
                    {!! Form::file('logo', array('class' => 'form-control')) !!}
                    <p class="help-block">
                        @lang('global.sites.logo.helper')
                    </p>
                </div>
                <div class="col-xs-4">
                    @if(!empty($meta['logo']))
                        <img src="{{asset($meta['logo'])}}" />
                    @endif
                </div>
            </div>
        </div>
    </div>

    <script>
      var autocomplete;
      var interested_elements = {
        administrative_area_level_1: 'long_name',
        country: 'short_name'
      };
      var element_form_map = {
        administrative_area_level_1: 'organisation_state',
        country: 'country_code'
      };

      var input = document.getElementById('organisation_search');
      var options = {
        types: ['(regions)']
      };
      autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.addListener('place_changed', fill_org_details);

      function fill_org_details() {
        var place = autocomplete.getPlace();

        for (var component in element_form_map) {
          if (component != 'country')
            document.getElementById(element_form_map[component]).value = '';
        }

        document.getElementById('organisation_place_id').value = place.place_id;

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (interested_elements[addressType]) {
            var val = place.address_components[i][interested_elements[addressType]];
            document.getElementById(element_form_map[addressType]).value = val;
          }
        }

        document.getElementById('organisation_latitude').value = place.geometry.location.lat();
        document.getElementById('organisation_longitude').value = place.geometry.location.lng();
      }
    </script>

    <div class="panel panel-default">
        <div class="panel-heading">
            @lang('global.sites.settings.title')
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('meta[print-format]', Lang::get('global.sites.settings.print-format.name'), ['class' => 'control-label']) !!}
                    {!! Form::select('meta[print-format]', array(
                            'standard' => Lang::get('global.sites.settings.print-format.options.standard'),
                            'medical' => Lang::get('global.sites.settings.print-format.options.medical'),
                            'user-selectable' => Lang::get('global.sites.settings.print-format.options.user-selectable')
                        ), $meta->get('print-format', 'standard'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    @if($errors->has('meta[print-format]'))
                        <p class="help-block">
                            {{ $errors->first('meta[print-format]') }}
                        </p>
                    @endif
                </div>
            </div>
        </div>
    </div>

    {!! Form::submit(trans('global.app_update'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop
