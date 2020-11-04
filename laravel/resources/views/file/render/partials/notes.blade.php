<div id="notes" class="section">
    <h2 class="pbi_avoid">@lang('file.notes.title')</h2>
    <dl>
        @if(count($notes) > 0)
            @foreach($notes as $key => $note)
                <dt>
                    <strong>{{ date( "Y-m-d", strtotime($note['timestamp'])) }} {{ date( "H:i T", strtotime($note['timestamp'])) }}</strong> -
                    <strong>{{ ucfirst($note['context']) }}</strong>
                </dt>
                <dd>
                    @if (!empty($note['content']))
                        {{ $note['content'] }}
                    @else
                        @lang('global.messages.none')
                    @endif
                </dd>
            @endforeach
        @else
            <dd>@lang('global.messages.none')</dd>
        @endif
    </dl>
</div>