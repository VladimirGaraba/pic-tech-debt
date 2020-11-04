<div class="section">
    <h2 class="pbi_avoid">@lang('file.clinical-features.title')</h2>
    <dl>
        @if(count(array_keys($features)) > 0)
            @foreach(array_keys($features) as $parent)
                @foreach($features[$parent] as $feature)
                    <dd>{{ $parent }}:{{ $feature }}</dd>
                @endforeach
            @endforeach
        @else
            <dd>@lang('file.clinical-features.none')</dd>
        @endif
    </dl>
</div>