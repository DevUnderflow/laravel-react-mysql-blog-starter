<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>ReferRoute</title>

    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="{{ asset('assets/main') }}/bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('assets/main') }}/bower_components/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.1.4/tailwind.min.css">

    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('assets/main') }}/dist/css/AdminLTE.min.css">

    <!-- Theme skin -->
    <link rel="stylesheet" href="{{ asset('assets/main') }}/dist/css/skins/skin-green.css">

    <!-- bootstrap wysihtml5 - text editor -->
    <link rel="stylesheet" href="{{ asset('assets/main') }}/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
    <!-- Google Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
    <style>
    @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

    body{
    font-family: 'Nunito', sans-serif;
    }

    #app {
        height: 100vh
    }
    .bg-white-custom {
        background-color: white !important;
    }
    .line-clamp {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: justify;
    }
    .img_fit {
        object-fit: contain;
        border-radius: 6px !important;
        height: 150px;
    }
    .pagination>.active>a {
        background-color: #151b26 !important;
        border-color: #151b26 !important;
    }
    .hidden_small {
        display: none;
    }
    </style>
</head>
<body class="hold-transition skin-green sidebar-mini">
    <div id="app"></div>

    <!-- Main app script -->
    <script src="{{ asset('js/main.js') }}" type="text/javascript"></script>

    <!-- jQuery 3 -->
    <script src="{{ asset('assets/main') }}/bower_components/jquery/dist/jquery.min.js"></script>

    <!-- Bootstrap 3.3.7 -->
    <script src="{{ asset('assets/main') }}/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- Bootstrap WYSIHTML5 -->
    <script src="{{ asset('assets/main') }}/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
    <!-- AdminLTE App -->
    <script src="{{ asset('assets/main') }}/dist/js/adminlte.min.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="{{ asset('assets/main') }}/dist/js/demo.js"></script>
</body>
</html>
