@extends('adminlte::page')

@section('title', trans('global.global_title'))

@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Main content -->
        <section class="content">
            @if(isset($siteTitle))
                <h3 class="page-title">
                    {{ $siteTitle }}
                </h3>
            @endif

            <div class="row">
                <div class="col-md-12">

                    @if (Session::has('message'))
                        <div class="alert alert-info">
                            <p>{{ Session::get('message') }}</p>
                        </div>
                    @endif
                    @if ($errors->count() > 0)
                        <div class="alert alert-danger">
                            <ul class="list-unstyled">
                                @foreach($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    @yield('content')

                </div>
            </div>
        </section>
    </div>
@stop

@section('adminlte_css')
    <link rel="stylesheet" href="{{ asset('css/skin.css')}} " />
    @stack('css')
    @yield('css')
@stop

@push('css')
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" />
@endpush

@push('js')
    <script>
      window._token = '{{ csrf_token() }}';
    </script>
@endpush