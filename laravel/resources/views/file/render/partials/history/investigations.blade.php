<h4 class="pbi_avoid">@lang('file.investigations.title')</h4>
@foreach(array_keys($investigationHistory) as $ix => $key)
    <dl>
        <dt>#{{$key}} - Request</dt>
        <dd>
            @if(isset($investigationHistory[$key]['request']))
                <strong>{{ $notes[$investigationHistory[$key]['request']]['title'] or Lang::get('file.investigations.request.untitled') }}</strong><br />
                {!! nl2br(e(!empty($notes[$investigationHistory[$key]['request']]['content'])
                    ? $notes[$investigationHistory[$key]['request']]['content']
                    : Lang::get('global.messages.none'))) !!}
            @endif
        </dd>
        @if(count($investigationHistory[$key]['results']) > 0)
            <dt>@lang('file.investigations.results.label.long')</dt>
            <dd>
                @foreach($investigationHistory[$key]['results'] as $reskey)
                    <div>
                        {!! nl2br(e(!empty($notes[$reskey]['content'])
                            ? $notes[$reskey]['content']
                            : Lang::get('global.messages.none'))) !!}
                    </div>
                    @if(count($notes[$reskey]['attachments']) > 0)
                        <strong>@lang('file.investigations.attachments.label.long')</strong><br />
                        <ul>
                            @foreach($notes[$reskey]['attachments'] as $attachment)
                                <li>{{$attachment}}</li>
                            @endforeach
                        </ul>
                    @endif
                @endforeach
            </dd>
        @endif
    </dl>
@endforeach