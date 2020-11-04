@if (isset($patientHistory) && !empty(array_filter($patientHistory)))
    @if(
        isset($patientHistory['circumstance'])
        || isset($patientHistory['location'])
        || isset($patientHistory['postcode'])
    )
        <h4 class="pbi_avoid">@lang('file.patient.circumstance.title')</h4>
        <dl>
            @if(isset($patientHistory['circumstance']))
                <dt>@lang('file.patient.circumstance.label.long')</dt>
                <dd>
                    @if(!empty($patientHistory['circumstance'][0]))
                        <del>{{ $patientHistory['circumstance'][0] }}</del>
                    @endif
                    {{ $patientHistory['circumstance'][1] or Lang::get('global.messages.unknown') }}
                </dd>
            @endif
            @if(isset($patientHistory['location']))
                <dt>@lang('file.patient.location.label.long')</dt>
                <dd>
                    @if(!empty($patientHistory['location'][0]))
                        <del>{{ $patientHistory['location'][0] }}</del>
                    @endif
                    {{ $patientHistory['location'][1] or Lang::get('global.messages.unknown') }}
                </dd>
            @endif
            @if(isset($patientHistory['postcode']))
                <dt>@lang('file.patient.postcode.label.long')</dt>
                <dd>
                    @if(!empty($patientHistory['postcode'][0]))
                        <del>{{ $patientHistory['postcode'][0] }}</del>
                    @endif
                    {{ $patientHistory['postcode'][1] or Lang::get('global.messages.unknown') }}
                </dd>
            @endif
        </dl>
    @endif

    <h4 class="pbi_avoid">@lang('file.patient.title')</h4>
    <dl>
        @if(isset($patientHistory['topic']))
            <dt>@lang('file.topic.label.long')</dt>
            <dd>
                @if(!empty($patientHistory['topic'][0]))
                    <del>{{ $patientHistory['topic'][0] }}</del>
                @endif
                {{ $patientHistory['topic'][1] }}
            </dd>
        @endif
        @if(isset($patientHistory['name']))
            <dt>@lang('file.patient.name.label.long')</dt>
            <dd>
                @if(!empty($patientHistory['name'][0]))
                    <del>{{ $patientHistory['name'][0] }}</del>
                @endif
                {{ $patientHistory['name'][1] or Lang::get('global.messages.unknown') }}
            </dd>
        @endif
        @if(isset($patientHistory['medicalRecordNumber']))
            <dt>@lang('file.mrn.label.long')</dt>
            <dd>
                @if(!empty($patientHistory['medicalRecordNumber'][0]))
                    <del>{{ $patientHistory['medicalRecordNumber'][0] }}</del>
                @endif
                {{ $patientHistory['medicalRecordNumber'][1] or Lang::get('global.messages.unknown') }}
            </dd>
        @endif
        @if(isset($patientHistory['animalType']))
            <dt>@lang('file.patient.animalType.label.long')</dt>
            <dd>
                @if(!empty($patientHistory['animalType'][0]))
                    <del>{{ $patientHistory['animalType'][0] }}</del>
                @endif
                {{ $patientHistory['animalType'][1] or Lang::get('global.messages.unknown') }}
            </dd>
        @endif
        @if(isset($patientHistory['gender']))
            <dt>@lang('file.patient.sex.label.long')</dt>
            <dd>
                @if(!empty($patientHistory['gender'][0]))
                    <del>{{ $patientHistory['gender'][0] }}</del>
                @endif
                {{ $patientHistory['gender'][1] or Lang::get('global.messages.unknown') }}
            </dd>
        @endif
        @if(isset($patientHistory['occupation']))
            <dt>@lang('file.patient.occupation.label.long')</dt>
            <dd>
                @if(!empty($patientHistory['occupation'][0]))
                    <del>{{ $patientHistory['occupation'][0] }}</del>
                @endif
                {{ $patientHistory['occupation'][1] or Lang::get('global.messages.unknown') }}
            </dd>
        @endif
        @if(isset($patientHistory['weight']))
            <dt>@lang('file.patient.weight.label.long')</dt>
            <dd>
                @if(
                    !empty($patientHistory['weight'][0])
                    && (
                        $patientHistory['weight'][0] !== $patientHistory['weight'][1]
                        || $patientHistory['weightUnits'][0] !== $patientHistory['weightUnits'][1]
                    )
                )
                    <del>@lang('file.patient.weight.format', ['weight' => $patientHistory['weight'][0], 'units' => $patientHistory['weightUnits'][0]])</del>
                @endif
                @lang('file.patient.weight.format', ['weight' => $patientHistory['weight'][1], 'units' => $patientHistory['weightUnits'][1]])
            </dd>
        @endif
        @if(isset($patientHistory['age']))
            <dt>@lang('file.patient.age.label.long')</dt>
            <dd>
                @if(!empty($patientHistory['age'][0])
                    && (
                        $patientHistory['age'][0] !== $patientHistory['age'][1]
                        || $patientHistory['ageUnits'][0] !== $patientHistory['ageUnits'][1]
                    )
                )
                    <del>@lang('file.patient.age.format', ['age' => $patientHistory['age'][0], 'units' => $patientHistory['ageUnits'][0]])</del>
                @endif
                @lang('file.patient.age.format', ['age' => $patientHistory['age'][1], 'units' => $patientHistory['ageUnits'][1]])
            </dd>
        @endif
        @if(isset($patientHistory['ageGroup']))
            <dt>@lang('file.patient.ageGroup.label.long')</dt>
            <dd>
                @if(!empty($patientHistory['ageGroup'][0]))
                    <del>{{ $patientHistory['ageGroup'][0] }}</del>
                @endif
                {{ $patientHistory['ageGroup'][1] }}
            </dd>
        @endif
        @if(isset($patientHistory['poisonSeverityScore']))
            <dt>@lang('file.risk-assessment.severity.label.long')</dt>
            <dd>
                @if(!empty($patientHistory['poisonSeverityScore'][0]))
                    <del>{{ $patientHistory['poisonSeverityScore'][0] }}</del>
                @endif
                {{ $patientHistory['poisonSeverityScore'][1] }}
            </dd>
        @endif
        @if(isset($patientHistory['riskAssessment']))
            <dt>@lang('file.risk-assessment.assessment.label.long')</dt>
            <dd>
                @if(!empty($patientHistory['riskAssessment'][0]))
                    <del>{{ $patientHistory['riskAssessment'][0] }}</del>
                @endif
                {{ $patientHistory['riskAssessment'][1] }}
            </dd>
        @endif
    </dl>
@endif