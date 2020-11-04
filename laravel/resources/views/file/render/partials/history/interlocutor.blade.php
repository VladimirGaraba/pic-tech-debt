<h4 class="pbi_avoid">@lang('file.communications.caller.title')</h4>
<dl>
    @if(isset($interlocutor))
        <dt>@lang('file.communications.caller.name.label.long')</dt>
        <dd>{{ $interlocutor['name'] or Lang::get('global.messages.unspecified') }}</dd>
        <dt>@lang('file.communications.caller.category.label.long')</dt>
        <dd>{{ $interlocutor['category'] or Lang::get('global.messages.unspecified') }}</dd>
        <dt>@lang('file.communications.caller.location.label.long')</dt>
        <dd>{{ $interlocutor['organisation']['location'] or Lang::get('global.messages.unspecified') }}</dd>
        <dt>@lang('file.communications.caller.organisation.label.short')</dt>
        <dd>{{ $interlocutor['organisation']['name'] or Lang::get('global.messages.unspecified') }}</dd>
        <dt>@lang('file.communications.caller.telephone.label.long')</dt>
        <dd>{{ $interlocutor['organisation']['telephone'] or Lang::get('global.messages.unspecified') }}</dd>
        <dt>@lang('file.communications.caller.organisation.address.street1.label.short')</dt>
        <dd>{{ $interlocutor['organisation']['address1'] or Lang::get('file.communications.caller.organisation.missing', ['field' => 'address1']) }}</dd>
        <dt>@lang('file.communications.caller.organisation.address.city.label.short')</dt>
        <dd>{{ $interlocutor['organisation']['city'] or Lang::get('file.communications.caller.organisation.missing', ['field' => 'city']) }}</dd>
        <dt>@lang('file.communications.caller.organisation.address.postcode.label.short')</dt>
        <dd>{{ $interlocutor['organisation']['postcode'] or Lang::get('file.communications.caller.organisation.missing', ['field' => 'postcode']) }}</dd>
        <dt>@lang('file.communications.caller.organisation.address.state.label.short')</dt>
        <dd>{{ $interlocutor['organisation']['state'] or Lang::get('file.communications.caller.organisation.missing', ['field' => 'state']) }}</dd>
        <dt>@lang('file.communications.caller.organisation.address.country.label.short')</dt>
        <dd>{{ $interlocutor['organisation']['country'] or Lang::get('file.communications.caller.organisation.missing', ['field' => 'country']) }}</dd>
    @else
        <dd>@lang('file.communications.caller.organisation.missing', ['field' => Lang::get('file.communications.caller.name.label.short')])</dd>
    @endif
</dl>