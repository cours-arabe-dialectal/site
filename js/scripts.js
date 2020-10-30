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

    // load flashcards
    ['personnages-bibliques-flashcards',
        'couleurs-flashcards',
        'livres-bibliques-flashcards',
        "jours-flashcards",
        "mots-theocratiques-flashcards",
        "mots-courants-flashcards",
        "100-mots-flashcards",
        "alphabet-flashcards",
        "chiffres-flashcards",
        "questions-conversation-flashcards",
        'personnages-bibliques-flashcards-menu',
        'couleurs-flashcards-menu',
        'livres-bibliques-flashcards-menu',
        "jours-flashcards-menu",
        "mots-theocratiques-flashcards-menu",
        "mots-courants-flashcards-menu",
        "100-mots-flashcards-menu",
        "alphabet-flashcards-menu",
        "chiffres-flashcards-menu",
        "questions-conversation-flashcards-menu",
        "verbes-courants-flashcards",
        "verbes-courants-flashcards-menu",
    ].forEach(item => {
        $('#' + item).on('click', function(e) {
            if (Object.values(e.currentTarget.classList).includes('menu')) {
                item = item.substring(0, item.length - 5);
            };
            document.getElementById("main-content").innerHTML = '<object id="loaded-content" type="text/html" data="flashcards/' + item + '.html" ></object>';
            $("#loaded-content").css('width', '100%');
            $("#loaded-content").css('height', $("#layoutSidenav_content").height() + 'px');
            $("body").toggleClass("sb-sidenav-toggled");
            $('.collapse').collapse('hide');

        });
    })

    // load generator
    $('#generator,#home-generator-button').on('click', function(e) {
        document.getElementById("main-content").innerHTML = '<object id="loaded-content" type="text/html" data="generator/' + 'generateur-universel-langue' + '.html" ></object>';
        $("#loaded-content").css('width', '100%');
        $("#loaded-content").css('height', $("#layoutSidenav_content").height() + 'px');
        if (e.currentTarget.id === "generator") {
            $("body").toggleClass("sb-sidenav-toggled");
            $('.collapse').collapse('hide');
        };
    });

    // toggle content
    $('#layoutSidenav_content').on('click', function(e) {
        if ($('body').hasClass('sb-sidenav-toggled')) {
            $("body").toggleClass("sb-sidenav-toggled");
            $('.collapse').collapse('hide');
        };
    });

    // toggle content
    $('.home').on('click', function(e) {
        if (e.currentTarget.id.substring(0, e.currentTarget.id.length - 7) !== "home-generator") {
            $("#home").addClass('d-none');
            $("#" + e.currentTarget.id.substring(0, e.currentTarget.id.length - 7)).removeClass('d-none');
        };
    });


    $("#button").on('click', function(e) {
        if (CryptoJS.SHA256($("#inputPassword").val()).toString() === "cce66316b4c1c59df94a35afb80cecd82d1a8d91b554022557e115f5c275f515") {
            window.open("home.html", "_self");
            return false;
        } else {
            alert('Le mot de passe est incorrect. Veuillez réessayer.')
        }
    });
})(jQuery);