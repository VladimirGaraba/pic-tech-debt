<div class="section">
    <h2 class="pbi_avoid">@lang('file.investigations.title')</h2>
    <dl>
        @if(count($investigations) > 0)
            @foreach($investigations as $ix => $request)
                <dt>
                    @lang('file.investigations.request.label.long')
                </dt>
                <dd>
                    <strong>{{ date( "Y-m-d H:i T", strtotime($notes[$request['request']]['timestamp'])) }}</strong><br />
                    {!! nl2br(e(!empty($notes[$request['request']]['content'])
                        ? $notes[$request['request']]['content']
                        : Lang::get('global.messages.none'))) !!}
                </dd>
                <dt>@lang('file.investigations.results.label.long')</dt>
                <dd>
                    @if(count($request['results']) > 0)
                        @foreach($request['results'] as $result)
                            <p>
                                <strong>{{ $notes[$result]['title'] }} - {{ date( "Y-m-d H:i T", strtotime($notes[$result]['timestamp'])) }}</strong><br />
                                {!! nl2br(e(!empty($notes[$result]['content']) ? $notes[$result]['content'] : Lang::get('global.messages.none'))) !!}
                            </p>
                        @endforeach
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