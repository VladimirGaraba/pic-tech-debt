<div class="section">
    <h4 class="pbi_avoid">@choice('file.substances.title', 2)</h4>
    @foreach(array_keys($substanceHistory) as $h)
        @if(count(array_keys($substanceHistory[$h])) > 0)
            @if(isset($substanceHistory[$h]['deleted']))
                <h4 class="pbi_avoid"><del>{{$substanceHistory[$h]['interlocutorAgentName'] or Lang::get('global.messages.unspecified')}}</del></h4>
            @else
                <h4 class="pbi_avoid">
                    @if(isset($substanceHistory[$h]['interlocutorAgentName']))
                        {{ $substanceHistory[$h]['interlocutorAgentName'][1] }}
                    @else
                        @foreach($substances as $s)
                            @if($s['id'] == $h)
                                {{ $s['name'] or Lang::get('global.messages.unspecified') }}
                                @php($found = true)
                            @endif
                        @endforeach
                        @if(!isset($found))
                            @lang('global.messages.unspecified')
                        @endif
                    @endif
                </h4>
                <dl>
                    @if(isset($substanceHistory[$h]['quantity']))
                        <dt>@lang('file.substances.quantity.label.long')</dt>
                        <dd>
                            @if(($substanceHistory[$h]['quantity'][0] && $substanceHistory[$h]['quantity'][0] !== $substanceHistory[$h]['quantity'][1]) || ($substanceHistory[$h]['quantityUnits'][0] && $substanceHistory[$h]['quantityUnits'][0] !== $substanceHistory[$h]['quantityUnits'][1]))
                                <del>@lang('file.substances.quantity.format', ['quantity' => $substanceHistory[$h]['quantity'][1], 'units' => $substanceHistory[$h]['quantityUnits'][1]])</del>
                            @endif
                            @if(isset($substanceHistory[$h]['quantityUnknown']) && $substanceHistory[$h]['quantityUnknown'][1] === true)
                                @lang('global.messages.unknown')
                            @else
                                @lang('file.substances.quantity.format', ['quantity' => $substanceHistory[$h]['quantity'][1], 'units' => $substanceHistory[$h]['quantityUnits'][1]])
                            @endif
                        </dd>
                    @endif
                    @if(isset($substanceHistory[$h]['duration']))
                        <dt>@lang('file.substances.duration.label.short')</dt>
                        <dd>
                            @if(($substanceHistory[$h]['duration'][0] && $substanceHistory[$h]['duration'][0] !== $substanceHistory[$h]['duration'][1]) || ($substanceHistory[$h]['durationUnits'][0] && $substanceHistory[$h]['durationUnits'][0] !== $substanceHistory[$h]['durationUnits'][1]))
                                <del>@lang('file.substances.duration.format', ['duration' => $substanceHistory[$h]['duration'][1], 'units' => $substanceHistory[$h]['durationUnits'][1]])</del>
                            @endif
                            @if(isset($substanceHistory[$h]['durationUnknown']) && $substanceHistory[$h]['durationUnknown'][1] === true)
                                @lang('global.messages.unknown')
                            @else
                                @lang('file.substances.duration.format', ['duration' => $substanceHistory[$h]['duration'][1], 'units' => $substanceHistory[$h]['durationUnits'][1]])
                            @endif
                        </dd>
                    @endif
                    @if(isset($substanceHistory[$h]['timestamp']))
                        <dt>@lang('file.substances.timestamp.label.long')</dt>
                        <dd>
                            @if($substanceHistory[$h]['timestamp'][0] && $substanceHistory[$h]['timestamp'][0] !== $substanceHistory[$h]['timestamp'][1])
                                <del>
                                    {{ !empty($substanceHistory[$h]['timestamp'][0])
                                        ? date( "Y-m-d H:i T", strtotime($substanceHistory[$h]['timestamp'][0]))
                                        : Lang::get('global.messages.blank') }}
                                </del>
                            @endif
                            {{ !empty($substanceHistory[$h]['timestamp'][1])
                                ? date( "Y-m-d H:i T", strtotime($substanceHistory[$h]['timestamp'][1]))
                                : Lang::get('global.messages.blank') }}
                        </dd>
                    @endif
                    @if(isset($substanceHistory[$h]['category']))
                        <dt>@lang('file.substances.category.label.long')</dt>
                        <dd>
                            @if($substanceHistory[$h]['category'][0] && $substanceHistory[$h]['category'][0] !== $substanceHistory[$h]['category'][1])
                                <del>{{ $substanceHistory[$h]['category'][0] }}</del>
                            @endif
                            {{ $substanceHistory[$h]['category'][1] or Lang::get('global.messages.blank') }}
                        </dd>
                    @endif
                    @if(isset($substanceHistory[$h]['useType']))
                        <dt>@lang('file.substances.use-type.label.long')</dt>
                        <dd>
                            @if($substanceHistory[$h]['useType'][0] && json_encode($substanceHistory[$h]['useType'][0]) !== json_encode($substanceHistory[$h]['useType'][1]))
                                <del>{{ is_array($substanceHistory[$h]['useType'][0]) ? implode(', ', $substanceHistory[$h]['useType'][0]) : $substanceHistory[$h]['useType'][0] }}</del>
                            @endif
                            @if(is_array($substanceHistory[$h]['useType'][1]) && count($substanceHistory[$h]['useType'][1]) > 0)
                                {{ implode(', ', $substanceHistory[$h]['useType'][1]) }}
                            @else
                                {{ Lang::get('global.messages.blank') }}
                            @endif
                        </dd>
                    @endif
                    @if(isset($substanceHistory[$h]['intendedUseGiven']))
                        <dt>@lang('file.substances.intended-use.label.long')</dt>
                        <dd>
                            @if($substanceHistory[$h]['intendedUseGiven'][0] && $substanceHistory[$h]['intendedUseGiven'][0] !== $substanceHistory[$h]['intendedUseGiven'][1])
                                <del>{{ $substanceHistory[$h]['intendedUseGiven'][0] }}</del>
                            @endif
                            {{ $substanceHistory[$h]['intendedUseGiven'][1] or Lang::get('global.messages.blank') }}
                        </dd>
                    @endif
                    @if(isset($substanceHistory[$h]['typeOfExposure']))
                        <dt>@lang('file.substances.type.label.long')</dt>
                        <dd>
                            @if($substanceHistory[$h]['typeOfExposure'][0] && $substanceHistory[$h]['typeOfExposure'][0] !== $substanceHistory[$h]['typeOfExposure'][1])
                                <del>{{ $substanceHistory[$h]['typeOfExposure'][0] }}</del>
                            @endif
                            {{ $substanceHistory[$h]['typeOfExposure'][1] or Lang::get('global.messages.blank') }}
                        </dd>
                    @endif
                    @if(isset($substanceHistory[$h]['routeOfExposure']))
                        <dt>@lang('file.substances.route.label.long')</dt>
                        <dd>
                            @if($substanceHistory[$h]['routeOfExposure'][0] && json_encode($substanceHistory[$h]['routeOfExposure'][0]) !== json_encode($substanceHistory[$h]['routeOfExposure'][1]))
                                <del>{{ is_array($substanceHistory[$h]['routeOfExposure'][0]) ? implode(', ', $substanceHistory[$h]['routeOfExposure'][0]) : $substanceHistory[$h]['routeOfExposure'][0] }}</del>
                            @endif
                            @if(is_array($substanceHistory[$h]['routeOfExposure'][1]) && count($substanceHistory[$h]['routeOfExposure'][1]) > 0)
                                {{ implode(', ', $substanceHistory[$h]['routeOfExposure'][1]) }}
                            @else
                                {{ Lang::get('global.messages.blank') }}
                            @endif
                        </dd>
                    @endif
                </dl>
                @if(isset($substanceHistory[$h]['centreAgents']) && count(array_keys($substanceHistory[$h]['centreAgents'])) > 0)
                    <strong>@choice('file.substances.centre-agent.label.long', 2)</strong>
                    <dl>
                        @foreach(array_keys($substanceHistory[$h]['centreAgents']) as $agentName)
                            <dd>
                                @if (array_key_exists('deleted', $substanceHistory[$h]['centreAgents'][$agentName]))
                                    @if(($substanceHistory[$h]['centreAgents'][$agentName]['name'] && $substanceHistory[$h]['centreAgents'][$agentName]['name'][0])
                                        || ($substanceHistory[$h]['centreAgents'][$agentName]['quantity'] && $substanceHistory[$h]['centreAgents'][$agentName]['quantity'][0]))
                                        <del>@lang('file.substances.centre-agent.format', [
                                                'name' => ($substanceHistory[$h]['centreAgents'][$agentName]['name'] && $substanceHistory[$h]['centreAgents'][$agentName]['name'][0]) ? $substanceHistory[$h]['centreAgents'][$agentName]['name'][0] : Lang::get('global.messages.blank'),
                                                'quantity' => ($substanceHistory[$h]['centreAgents'][$agentName]['quantity'] && $substanceHistory[$h]['centreAgents'][$agentName]['quantity'][0]) ? $substanceHistory[$h]['centreAgents'][$agentName]['quantity'][0] : Lang::get('global.messages.blank'),
                                                'units' => ($substanceHistory[$h]['centreAgents'][$agentName]['units'] && $substanceHistory[$h]['centreAgents'][$agentName]['units'][0]) ? $substanceHistory[$h]['centreAgents'][$agentName]['units'][0] : Lang::get('global.messages.blank')])</del>
                                    @endif
                                @else
                                    @if((($substanceHistory[$h]['centreAgents'][$agentName]['name'][0] == $substanceHistory[$h]['centreAgents'][$agentName]['name'][1])
                                        && ($substanceHistory[$h]['centreAgents'][$agentName]['quantity'][0] == $substanceHistory[$h]['centreAgents'][$agentName]['quantity'][1])
                                        && ($substanceHistory[$h]['centreAgents'][$agentName]['units'][0] == $substanceHistory[$h]['centreAgents'][$agentName]['units'][1])
                                    ) || (
                                        $substanceHistory[$h]['centreAgents'][$agentName]['name'][0] == ''
                                        && $substanceHistory[$h]['centreAgents'][$agentName]['quantity'][0] == ''
                                        && $substanceHistory[$h]['centreAgents'][$agentName]['units'][0] == ''
                                    ))
                                        @lang('file.substances.centre-agent.format', [
                                                'name' => ($substanceHistory[$h]['centreAgents'][$agentName]['name'] && $substanceHistory[$h]['centreAgents'][$agentName]['name'][1])
                                                    ? $substanceHistory[$h]['centreAgents'][$agentName]['name'][1]
                                                    : Lang::get('global.messages.blank'),
                                                'quantity' => ($substanceHistory[$h]['centreAgents'][$agentName]['quantity'] && $substanceHistory[$h]['centreAgents'][$agentName]['quantity'][1])
                                                    ? $substanceHistory[$h]['centreAgents'][$agentName]['quantity'][1]
                                                    : Lang::get('global.messages.blank'),
                                                'units' => ($substanceHistory[$h]['centreAgents'][$agentName]['units'] && $substanceHistory[$h]['centreAgents'][$agentName]['units'][1])
                                                    ? $substanceHistory[$h]['centreAgents'][$agentName]['units'][1]
                                                    : Lang::get('global.messages.blank')])
                                    @else
                                        @lang('file.substances.centre-agent.format', [
                                            'name' => ($substanceHistory[$h]['centreAgents'][$agentName]['name'] && $substanceHistory[$h]['centreAgents'][$agentName]['name'][1])
                                                ? $substanceHistory[$h]['centreAgents'][$agentName]['name'][1]
                                                : Lang::get('global.messages.blank'),
                                            'quantity' => ($substanceHistory[$h]['centreAgents'][$agentName]['quantity'] && $substanceHistory[$h]['centreAgents'][$agentName]['quantity'][1])
                                                ? $substanceHistory[$h]['centreAgents'][$agentName]['quantity'][1]
                                                : Lang::get('global.messages.unknown'),
                                            'units' => ($substanceHistory[$h]['centreAgents'][$agentName]['units'] && $substanceHistory[$h]['centreAgents'][$agentName]['units'][1])
                                                ? $substanceHistory[$h]['centreAgents'][$agentName]['units'][1]
                                                : ''])
                                    @endif
                                @endif
                            </dd>
                        @endforeach
                    </dl>
                @endif
            @endif
        @endif
    @endforeach
</div>