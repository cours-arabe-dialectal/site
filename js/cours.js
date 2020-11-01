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

    ["lecture",
    "conjugaison",
    "grammaire",
    "vocabulaire",
    "lecture-menu",
    "conjugaison-menu",
    "grammaire-menu",
    "vocabulaire-menu",
    ].forEach(item => {
        $('#' + item).on('click', function(e) {
            if (Object.values(e.currentTarget.classList).includes('menu')) {
                item = item.substring(0, item.length - 5);
            };
            document.getElementById("main-content").innerHTML = '<object id="loaded-content" type="text/html" data="cours/' + item + '.html" ></object>';
            $("#loaded-content").css('width', '100%');
            $("#loaded-content").css('height', $("#layoutSidenav_content").height() + 'px');
            $("body").toggleClass("sb-sidenav-toggled");
            $('.collapse').collapse('hide');

        });
    })

})(jQuery);