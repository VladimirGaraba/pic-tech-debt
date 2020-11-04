<div class="section">
    <h2 class="pbi_avoid">@lang('file.risk-assessment.title')</h2>
    <dl>
        <dt>@lang('file.risk-assessment.assessment.label.long')</dt>
        <dd>{{ $riskAssessment or Lang::get('global.messages.unspecified') }}</dd>
        <dt>@lang('file.risk-assessment.severity.label.initial')</dt>
        <dd>
            @if ( isset($initialPoisonSeverityScore) )
                {{ $initialPoisonSeverityScore[1] or Lang::get('global.messages.unspecified') }}
            @else
                {{ Lang::get('global.messages.unspecified') }}
            @endif
        </dd>
        <dt>@lang('file.risk-assessment.severity.label.final')</dt>
        <dd>{{ $poisonSeverityScore or Lang::get('global.messages.unspecified') }}</dd>
    </dl>
</div>