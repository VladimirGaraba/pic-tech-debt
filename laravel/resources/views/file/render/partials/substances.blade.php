<div class="section">
    <h2 class="pbi_avoid enhanced">@choice('file.substances.title', 2)</h2>
    @if(count($substances) > 0)
        @foreach($substances as $substance)
            <h3 class="pbi_avoid">@lang('file.substances.name.common.label.long') <span>{{ $substance['name'] }}</span></h3>
            <dl>
                <dt>@lang('file.substances.quantity.label.long')</dt>
                <dd>@lang('file.substances.quantity.format', ['quantity' => $substance['dosage']['quantity'] ? $substance['dosage']['quantity'] : Lang::get('global.messages.unspecified'), 'units' => $substance['dosage']['quantity'] ? ($substance['dosage']['units'] ? $substance['dosage']['units'] : Lang::get('global.messages.unspecified')) : ''])</dd>
                <dt>@lang('file.substances.timestamp.label.long')</dt>
                <dd>{{ date( "Y-m-d H:i T", strtotime($substance['exposure']['timestamp'])) }}</dd>
                <dt>@lang('file.substances.route.label.long')</dt>
                <dd>{{ is_array($substance['exposure']['route']) ? implode(', ', $substance['exposure']['route']) : $substance['exposure']['route'] }}</dd>
                <dt>@lang('file.substances.type.label.long')</dt>
                <dd>{{ $substance['exposure']['type']}}</dd>
                <dt>@lang('file.substances.use-type.label.long')</dt>
                <dd>{{ is_array($substance['type']) ? implode(', ', $substance['type']) : $substance['type'] }}</dd>
                <dt>@lang('file.substances.intended-use.label.long')</dt>
                <dd>{{ $substance['intendedUseGiven'] }}</dd>
            </dl>
        @endforeach
        @foreach($centreAgents as $name => $centreAgent)
            <h3 class="pbi_avoid enhanced">@choice('file.substances.title', 1) {{ $loop->iteration }}</h3>
            <dl>
                <dt>@choice('file.substances.centre-agent.label.long', 1)</dt>
                <dd>{{ $name }}</dd>
                <dt>@lang('file.substances.amount.label.long')</dt>
                <dd>{{ $centreAgent['qty'] ? implode(', ', $centreAgent['qty']) : Lang::get('global.messages.unspecified') }}</dd>
                <dt>@lang('file.substances.dosage.label.short')</dt>
                <dd>{{ $centreAgent['dosage'] ? implode(', ', $centreAgent['dosage']) : Lang::get('global.messages.unspecified') }}</dd>
            </dl>
        @endforeach
    @else
        <p>@lang('global.messages.none')</p>
    @endif
</div>