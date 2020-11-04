@if(isset($treatmentHistory['referrals']) && count($treatmentHistory['referrals']) > 0))
<h4 class="pbi_avoid">@lang('file.referrals.title')</h4>
<dl>
    @foreach($treatmentHistory['referrals'] as $referral)
        <dd>@lang('file.referrals.format', ['specialty' => $referral['specialty'], 'referee' => $referral['referee']])</dd>
    @endforeach
</dl>
@endif

@if(isset($treatmentHistory['treatments']) && count($treatmentHistory['treatments']) > 0)
    <h4 class="pbi_avoid">@lang('file.treatments.title')</h4>
    <dl>
        @foreach($treatmentHistory['treatments'] as $treatment)
            <dt>@lang('file.treatments.disposition.label.long')</dt><dd>{{ $treatment['disposition'] }}</dd>
            @if (count($treatment['treatments']) > 0)
                @foreach(array_keys($treatment['treatments']) as $category)
                    @foreach($treatment['treatments'][$category] as $key)
                        <dd>{{$category}} - {{$key}}</dd>
                    @endforeach
                @endforeach
            @endif
        @endforeach
    </dl>
@endif