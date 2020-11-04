<div class="section">
    <h2 class="pbi_avoid">@lang('file.patient.title')</h2>

    <dl>
        <dt>@lang('file.patient.name.label.short')</dt>
        <dd>
            {{ $patientName or Lang::get('global.messages.none') }}
        </dd>
        <dt>@lang('file.mrn.label.long')</dt>
        <dd>
            {{ $patientMedicalRecordNumber or Lang::get('global.messages.none') }}
        </dd>
        <dt>@lang('file.patient.category.label.long')</dt>
        <dd>
            {{ $patientCategory
                ? Lang::get('file.patient.category.options.' . $patientCategory)
                : Lang::get('file.patient.category.options.unknown') }}
        </dd>
        <dt>@lang('file.patient.sex.label.long')</dt>
        <dd>
            {{ $patientGender
                ? Lang::get('file.patient.sex.options.' . $patientGender)
                : Lang::get('file.patient.sex.options.unknown') }}
        </dd>
        <dt>@lang('file.patient.pregnant.label.long')</dt>
        <dd>
            {{ $pregnantStatus
             ? Lang::get('file.patient.pregnant.options.' . $pregnantStatus)
             : Lang::get('file.patient.pregnant.options.unknown') }}`
            {{ $pregnantStatus && $pregnantStatus === 'yes'
             ? ':' . Lang::get('file.patient.trimester.options.' . $pregnantTrimester)
             : '' }}
        </dd>
        <dt>@lang('file.patient.age.label.long')</dt>
        <dd>
            {{ $patientAge
                ? Lang::get('file.patient.age.format', ['age' => $patientAge, 'units' => $patientAgeUnits ? $patientAgeUnits : Lang::get('global.messages.unspecified')])
                : Lang::get('global.messages.unspecified') }}
        </dd>
        <dt>@lang('file.patient.ageGroup.label.long')</dt>
        <dd>
            {{ $patientAgeGroup
                ? Lang::get('file.patient.ageGroup.options.' . $patientAgeGroup)
                : Lang::get('global.messages.unspecified') }}
        </dd>
        <dt>@lang('file.patient.weight.label.long')</dt>
        <dd>
            {{ $patientWeight
                ? Lang::get('file.patient.weight.format', ['weight' =>  $patientWeight, 'units' => $patientWeightUnits ? $patientWeightUnits : Lang::get('global.messages.unspecified')])
                : Lang::get('global.messages.unspecified') }}
        </dd>
    </dl>
</div>