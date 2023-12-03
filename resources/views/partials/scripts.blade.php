@stack('script')
<!--   Core JS Files   -->
<script src="{{ asset('tadmin/js/core/popper.min.js') }}"></script>
<script src="{{ asset('tadmin/js/core/bootstrap.min.js') }}"></script>
<script src="{{ asset('tadmin/js/plugins/perfect-scrollbar.min.js') }}"></script>
<script src="{{ asset('tadmin/js/plugins/smooth-scrollbar.min.js') }}"></script>
<!-- Kanban scripts -->
<script src="{{ asset('tadmin/js/plugins/dragula/dragula.min.js') }}"></script>
<script src="{{ asset('tadmin/js/plugins/jkanban/jkanban.js') }}"></script>

<script src="{{ asset('tadmin/js/plugins/chartjs.min.js') }}"></script>

<script src="{{ asset('tadmin/js/plugins/threejs.js') }}"></script>
<script src="{{ asset('tadmin/js/plugins/orbit-controls.js') }}"></script>

@yield('scripts');
