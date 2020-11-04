<?php
/**
 * standard.blade.php
 *
 * @package default
 */


?>
<!DOCTYPE html>
<html>
<head>
    <style type="text/css" media="screen,print">
        @page {
        }
        .pbi_avoid {
            page-break-inside: avoid !important;
        }
    </style>
    <style>
        body {
            font-family: sans-serif;
            font-size: 10pt;
        }

        h1, h2, h3, h4, h5 {
            page-break-inside: avoid;
            margin-bottom: 0;
            margin-top: 0;
            padding-top: 1em;
        }

        h1 {
            margin-bottom: 1em;
        }

        h2 {
            font-size: 1.2em;
        }

        h2.enhanced {
            padding: 0.25em 0;
            border-top: 2px solid #CFCFCF;
            border-bottom: 2px solid #CFCFCF;
            font-size: 1.4em;
            margin-left: -5mm;
            padding-left: 5mm;
        }

        h3 {
            font-size: 1.1em;
        }

        h3 span {
            font-weight: normal !important;
        }

        h4, h5 {
            font-size: 1em;
        }

        dl {
            position: relative;
            width: 100%;
            margin-left: 6em;
            margin-top: 0;
        }

        dl::after {
            content: "";
            display: table;
            clear: both;
        }

        dl dt, dl dd {
            float: left;
            margin: 0;
            padding: 0;
        }

        dl dt {
            clear: left;
            width: 25%;
            font-weight: bold;
        }

        dl dt::after {
            content: ":";
        }

        dl dd {
            clear: right;
            width: 74%;
        }

        #notes dl dt, #notes dl dd {
            width: 99%;
            float: none;
            clear: both;
        }

        #notes dl dd {
            margin-bottom: 1em;
        }

        table {
            width: 100%;
        }

        table th {
            text-align: left;
        }

        div.section_enhanced {
            border-bottom: 2px solid #CFCFCF;
        }

        div.first {
            border-top: none;
        }
    </style>
    @if($format === 'medical')
        <style>
            @page {
                margin-top: 45mm;
                header: page-header;
                footer: page-footer;
            }

            table.page-header {
                table-layout: fixed;
            }

            table.page-header td {
                vertical-align: top;
                padding: 3mm;
                height: 34.5mm;
                overflow: hidden;
            }

            table.page-header td.left {
                width: 60%;
            }

            table.page-header td.right {
                width: 40%;
                font-size: 20pt;
            }

            .wrapper-inner {
                margin-right: 0;
            }

            .section {
                padding-left: 5mm;
            }
        </style>
    @endif
</head>
<body>
@if($format === 'medical')
    <htmlpageheader name="page-header">
        <table class="page-header" style="overflow: wrap">
            <tbody>
            <tr>
                <td class="left">
                    @if($site['logo-jpg'])
                        <div class="logo">
                            <img src="data:image/jpg;base64,{{$site['logo-jpg']}}" height="20mm" />
                        </div>
                    @else
                        {{$site['SiteName'] or Lang::get('global.messages.unspecified')}}
                    @endif
                    <br />
                    <strong>@lang('file.patient.name.label.long'):</strong> {{ $patient['patientName'] or Lang::get('global.messages.none') }}
                </td>
                <td class="right">
                    <span class="mrn">{{ $patient['patientMedicalRecordNumber'] or $displayId }}</span>
                </td>
            </tr>
            </tbody>
        </table>
    </htmlpageheader>
    <htmlpagefooter name="page-footer">
        <div class="page-footer"></div>
    </htmlpagefooter>
@else
<h1>@lang('file.type.options.' . $type) {{ $displayId }}</h1>
@endif
<div class="wrapper">
    <div class="wrapper-inner">
        @include('file.render.partials.meta', array('timestamp' => $timestamp, 'topic' => $topic, 'spi' => $communications[0] && $communications[0]['spi'] ? $communications[0]['spi'] : null, 'outcome' => isset($outcome) ? $outcome : null))

        @include('file.render.partials.patient', $patient)

        @if(!(isset($patient['patientCategory']) && $patient['patientCategory'] === 'animal'))
            @include('file.render.partials.treatments', array('treatments' => $treatments))

            @include('file.render.partials.risk', array('riskAssessment' => $riskAssessment, 'poisonSeverityScore' => $poisonSeverityScore, 'initialPoisonSeverityScore' => $communications[0]['history']['patient']['poisonSeverityScore']))

            @include('file.render.partials.features', array('features' => $descriptorList))

            <div class="section">
                <h2 class="pbi_avoid">@lang('file.patient.circumstance.title')</h2>
                <dl>
                    <dt>@lang('file.patient.circumstance.label.long')</dt>
                    <dd>{{ $patient['patientCircumstance'] or Lang::get('global.messages.unknown') }}</dd>
                    <dt>@lang('file.patient.location.label.long')</dt>
                    <dd>{{ $patient['patientLocation'] or Lang::get('global.messages.unknown') }}</dd>
                    <dt>@lang('file.patient.postcode.label.long')</dt>
                    <dd>{{ $patient['patientPostcode'] or Lang::get('global.messages.unknown') }}</dd>
                </dl>
            </div>

            @include('file.render.partials.investigations', array('investigations' => $investigations, 'notes' => $investigationNotes))
        @endif

        @include('file.render.partials.notes', array('notes' => $otherNotes))

        @include('file.render.partials.substances', array('substances' => $agents, 'centreAgents' => $centreAgents))

        @include('file.render.partials.history', array('communications' => $communications, 'investigationNotes' => $investigationNotes))
    </div>
</div>
</body>
</html>
