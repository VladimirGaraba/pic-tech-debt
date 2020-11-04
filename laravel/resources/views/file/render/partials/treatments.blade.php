<div class="section">
    <h2 class="pbi_avoid">@lang('file.treatments.title')</h2>

    <dl>
        @if(count($treatments) > 0)
            @foreach(end($treatments)['treatments'] as $category => $item)
                @foreach($item as $value)
                    <dt>@lang('file.treatments.treatment.recommended.label.long')</dt>
                    <dd>
                        {{ $category }} - {{ $value }}
                    </dd>
                @endforeach
            @endforeach
        @else
            <dd>@lang('global.messages.none')</dd>
        @endif
    </dl>
</div>