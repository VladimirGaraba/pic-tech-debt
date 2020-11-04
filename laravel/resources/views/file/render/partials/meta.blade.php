<div class="section section_enhanced first">
    <h2 class="pbi_avoid">@lang('file.meta.title')</h2>

    <dl>
        <dt>@lang('file.created.label.date')</dt>
        <dd>
            {{ strftime( "%x", strtotime($timestamp)) }}
        </dd>
        <dt>@lang('file.created.label.time')</dt>
        <dd>
            {{ date( "H:i T", strtotime($timestamp)) }}
        </dd>
        <dt>@lang('file.topic.label.long')</dt>
        <dd>
            {{ $topic or Lang::get('global.messages.none') }}
        </dd>
        @if(isset($outcome) && $outcome !== '')
            <dt>@lang('file.outcome.label.long')</dt>
            <dd>
                @lang('file.outcome.format', ['outcome' => $outcome])
            </dd>
        @endif
        <dt>@lang('file.communications.spi.label.long')</dt>
        <dd>
            {{ $spi ? $spi['name'] : Lang::get('global.messages.unknown') }}
        </dd>
        @if(isset($incidentId))
        <dt>@lang('file.incident.label.long')</dt>
        <dd>
            {{ $incidentId }}
        </dd>
        @endif
    </dl>
</div>