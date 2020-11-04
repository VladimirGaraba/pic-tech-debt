<h4 class="pbi_avoid">@lang('file.clinical-features.title')</h4>
<dl>
    @if(isset($featureHistory['when']))
        <dt>@lang('file.clinical-features.when.label.long')</dt>
        <dd>
            @lang('file.clinical-features.when.options.' . $featureHistory['when'])
        </dd>
    @endif
    @if(isset($featureHistory['pastDescriptors']) && count($featureHistory['pastDescriptors']) > 0)
        @foreach(array_keys($featureHistory['pastDescriptors']) as $category)
            @foreach($featureHistory['pastDescriptors'][$category] as $descriptor)
                @if(!($featureHistory['descriptors']
                 && isset($featureHistory['descriptors'][$category])
                 && in_array($descriptor, $featureHistory['descriptors'][$category])))
                    <dd><del>{{$category}}: {{$descriptor}}</del></dd>
                @endif
            @endforeach
        @endforeach
    @endif
    @if(isset($featureHistory['descriptors']))
        @foreach(array_keys($featureHistory['descriptors']) as $category)
            @foreach($featureHistory['descriptors'][$category] as $descriptor)
                <dd>{{$category}}: {{$descriptor}}</dd>
            @endforeach
        @endforeach
    @endif
</dl>