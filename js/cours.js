(function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        if (this.href === path) {
            $(this).addClass("active");
        }
    });

    //load cours

    ["matieres-lecture",
    "matieres-conjugaison",
    "matieres-grammaire",
    "matieres-vocabulaire",
    "matieres-lecture-menu",
    "matieres-conjugaison-menu",
    "matieres-grammaire-menu",
    "matieres-vocabulaire-menu",

    ]

})(jQuery);