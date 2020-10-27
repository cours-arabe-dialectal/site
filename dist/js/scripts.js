/*!
 * Start Bootstrap - SB Admin v6.0.1 (https://startbootstrap.com/templates/sb-admin)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
(function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        if (this.href === path) {
            $(this).addClass("active");
        }
    });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });


    ['personnages-bibliques-flashcards',
        'couleurs-flashcards',
        'livres-bibliques-flashcards',
        "jours-flashcards",
        "mots-theocratiques-flashcards",
        "mots-courants-flashcards",
        "100-mots-flashcards",
    ].forEach(item => {

        $('#' + item).on('click', function(e) {
            document.getElementById("main-content").innerHTML = '<object id="loaded-content" type="text/html" data="flashcards/' + item + '.html" ></object>';

            // $('#flashcard').removeClass('d-none');

            $("#loaded-content").css('width', '100%');
            $("#loaded-content").css('height', $("#layoutSidenav_content").height() + 'px');
            $("body").toggleClass("sb-sidenav-toggled");
            $('.collapse').collapse('hide');
        });
    })

    $('#generator').on('click', function(e) {
        document.getElementById("main-content").innerHTML = '<object id="loaded-content" type="text/html" data="' + 'generateur-universel-langue' + '.html" ></object>';
        $("#loaded-content").css('width', '100%');
        $("#loaded-content").css('height', $("#layoutSidenav_content").height() + 'px');
        $("body").toggleClass("sb-sidenav-toggled");
        $('.collapse').collapse('hide');
    });



})(jQuery);