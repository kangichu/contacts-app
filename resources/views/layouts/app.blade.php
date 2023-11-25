<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/animate.css') }}" rel="stylesheet">
    <link href="{{ asset('other/plugins/global/plugins.bundle.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('other/css/style.bundle.css') }}" rel="stylesheet" type="text/css" />

    @if(request()->is('uploads/*'))

    <link href="{{ asset('css/uppy.min.css') }}" rel="stylesheet">

    @endif

    <script src="{{ asset('js/fontawesome-all.js') }}"></script>
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
            <div class="container">
                
                   <a class="navbar-brand animated fadeInDown" href="{{ url('/') }}">
                     <span class="mb-0 h1">
                         {{ config('app.name', 'Laravel') }}
                     </span>  
                   </a>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li><a class="nav-link" href="{{ route('login') }}">Login</a></li>
                            <li><a class="nav-link" href="{{ route('register') }}">Register</a></li>
                        @else
                            <li>

                                <strong> Welcome <b class="text-success">{{ Auth::user()->name }}</b></strong><span class="caret"></span>
       
                                <a class="btn btn-dark ml-3" href="{{ route('logout') }}"
                                   onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    <b><i class="fas fa-sign-out-alt fa-lg ml-1"></i> LOGOUT</b>
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>

                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>
        
       <div class="container">
            <main class="py-4">
                @include('inc.messages')
                @yield('content')
            </main>
       </div>
       
    </div>

    <script src="{{ asset('other/plugins/global/plugins.bundle.js') }}"></script>
    <script src="{{ asset('other/js/scripts.bundle.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    <script>
       window.setTimeout(function() {
            $(".alert").fadeTo(300, 0).slideUp(500, function(){
                $(this).remove(); 
            });
        }, 4000);
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var selectElements = document.querySelectorAll('select');

            selectElements.forEach(function(select) {
                $(select).select2();
            });
        });
    </script>

    @if(request()->is('uploads/*') )

    <script src="{{ asset('js/uppy.min.js') }}"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            $('[id*=drag-drop-area]').each(function() {
                var listingId = $(this).data('listing-id'); // Get the listing ID
    
                var uppy = new Uppy.Core({
                    allowMultipleUploadBatches: true,
                    restrictions: {
                        maxFileSize: 100000000,
                        maxNumberOfFiles: 1,
                        minNumberOfFiles: 1,
                        allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png']
                    }
                })
                .use(Uppy.Dashboard, {
                    inline: true,
                    target: "#" + $(this).attr('id') + ""
                })
                .use(Uppy.XHRUpload, {
                    endpoint: '/uploading?listing_id=' + listingId,
                    method: 'post',
                    formData: true, // You can still include this line if other form data is needed
                    bundle: true,
                    headers: {
                        'X-CSRF-Token': "{{ csrf_token() }}",
                    },
                });

            });
        });
    </script>

    @endif

    @if(request()->is('dashboard'))

    <script>
        $(document).ready(function () {
          $("#groupFilter").on("input", function () {
            filterTable(0, $(this).val());
          });
      
          $("#nameFilter").on("input", function () {
            filterTable(1, $(this).val());
          });
      
          $("#emailFilter").on("input", function () {
            filterTable(2, $(this).val());
          });
      
          function filterTable(column, value) {
            var table = $("#myTable");
            var rows = $("tbody tr", table);
      
            rows.each(function () {
              var cell = $("td:eq(" + column + ")", this);
              if (cell.text().toLowerCase().includes(value.toLowerCase())) {
                $(this).show();
              } else {
                $(this).hide();
              }
            });
          }
        });
    </script>
    
    @endif

    @if(request()->is('groups'))

    <script>
        $(document).ready(function () {
          $("#nameFilter").on("input", function () {
            filterTable(0, $(this).val());
          });
      
          $("#bioFilter").on("input", function () {
            filterTable(1, $(this).val());
          });
      
          function filterTable(column, value) {
            var table = $("#myGroupsTable");
            var rows = $("tbody tr", table);
      
            rows.each(function () {
              var cell = $("td:eq(" + column + ")", this);
              if (cell.text().toLowerCase().includes(value.toLowerCase())) {
                $(this).show();
              } else {
                $(this).hide();
              }
            });
          }
        });
      </script>
    
    @endif
      
    
</body>
</html>
