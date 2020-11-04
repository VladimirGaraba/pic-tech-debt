<div class="section">
    <h2 class="pbi_avoid enhanced">@lang('file.case-history.title')</h2>
    @foreach($communications as $ix => $communication)
        <h3>
            #{{ isset($communication['sequenceId']) ? $communication['sequenceId'] : $loop->iteration }}:
            {{ $communication['type'] }} - {{ date( "Y-m-d H:i T", strtotime($communication['timestamp'])) }}
            @if (isset($communication['endTimestamp']))
            {{  Lang::get('file.communications.endTimestamp.format', ['endTimestamp' => date( "Y-m-d H:i T", strtotime($communication['endTimestamp']))]) }}
            @endif;
        </h3>
        <h4 class="pbi_avoid">@choice('file.communications.title', 1)</h4>
        <dl>
            <dt>@lang('file.communications.method.label.long')</dt>
            <dd>
                {{ isset($communication['direction']) ? ucfirst($communication['direction']) : Lang::get('global.messages.unspecified') }}: {{ $communication['medium']['type'] or Lang::get('global.messages.unspecified') }}
            </dd>
            <dt>@lang('file.communications.spi.label.long')</dt>
            <dd>{{ $communication['spi']['name'] or Lang::get('global.messages.unknown') }}</dd>
        </dl>

        @include('file.render.partials.history.interlocutor', array('interlocutor' => isset($communication['interlocutor']) ? $communication['interlocutor'] : null))

        @if (!isset($communication['history']))
            @lang('file.communications.history.missing')
        @else
            @if (isset($communication['history']['patient']))
                @include('file.render.partials.history.patient', array('patientHistory' => $communication['history']['patient']))
            @endif

            @if (isset($communication['history']['features']) && count(array_filter($communication['history']['features'])))
                @include('file.render.partials.history.features', array('featureHistory' => $communication['history']['features']))
            @endif

            @if (isset($communication['history']['investigations']) && !empty($communication['history']['investigations']))
                @include('file.render.partials.history.investigations', array('investigationHistory' => $communication['history']['investigations'], 'notes' => $investigationNotes))
            @endif

            @if (isset($communication['history']['treatments']) && !empty($communication['history']['treatments']))
                @include('file.render.partials.history.treatments', array('treatmentHistory' => $communication['history']['treatments']))
            @endif

            @if (isset($communication['history']['agents']) && count(array_keys($communication['history']['agents'])) > 0)
                @include('file.render.partials.history.substances', array('substanceHistory' => $communication['history']['agents'], 'substances' => $agents))
            @endif
        @endif
    @endforeach
</div>