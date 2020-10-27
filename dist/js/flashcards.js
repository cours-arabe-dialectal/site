(function($) {
    "use strict";

    document.configuration = {
        'flashcard': {
            'title': 'Mots Théocratiques',
            'data': {
                'francais': [],
                'phonetique': [],
                'arabe': [],
                'image': [],
                'audio': [],
            },
            'dataset': [],
            'current_id': 0,
            'deck_size': 0,
            'has_image': false,
            'has_audio': false,
            'image_folder': 'assets/mots_theocratiques/image/',
            'audio_folder': 'assets/mots_theocratiques/audio/',
            'file_number': 8,
            'image_extension': '.jpg',
            'display_subtitle': true,
            'play_audio': true,
            'random': false,
            'display_phonetique': true,
            'fr_to_ar': true,
        },
    };

    // $("#toto").on('change', function(e) {
    //     document.configuration.flashcard.play_audio = $("#toto").prop('checked');
    //     console.log('toto')
    // });

    $.getJSON("https://spreadsheets.google.com/feeds/list/1D7Exy65w_DHXYuALQZJg1mayC1mW-x47sxvvWjaUKtQ/" +
        document.configuration.flashcard.file_number + "/public/values?alt=json",
        function(data) {
            var sheetData = data.feed.entry;
            var i;
            document.configuration.flashcard.dataset = [];
            document.configuration.flashcard.current_id = 0;
            document.configuration.flashcard.deck_size = sheetData.length;

            for (i = 0; i < sheetData.length; i++) {
                let array = [];
                Object.keys(document.configuration.flashcard.data).forEach(key => {
                    document.configuration.flashcard.data[key].push(data.feed.entry[i]['gsx$' + key]['$t']);
                    array.push(data.feed.entry[i]['gsx$' + key]['$t']);
                });
                document.configuration.flashcard.dataset.push(array);
            };
            $("#theme").text(document.configuration.flashcard.title);
            create_card();
        });

    $("#next").on('click', function(e) {
        if (document.configuration.flashcard.random) {
            document.configuration.flashcard.current_id = getRandomInt(0, document.configuration.flashcard.deck_size - 1)
        } else {
            if (document.configuration.flashcard.current_id === document.configuration.flashcard.deck_size - 1) {
                document.configuration.flashcard.current_id = 0;
            } else {
                document.configuration.flashcard.current_id += 1;
            };
        };
        create_card();
    });

    $("#previous").on('click', function(e) {
        if (document.configuration.flashcard.random) {
            document.configuration.flashcard.current_id = getRandomInt(0, document.configuration.flashcard.deck_size - 1)
        } else {
            if (document.configuration.flashcard.current_id === 0) {
                document.configuration.flashcard.current_id = document.configuration.flashcard.deck_size - 1;
            } else {
                document.configuration.flashcard.current_id -= 1;
            };
        };
        create_card();
    });

    function create_card() {

        $('#item_image').text(document.configuration.flashcard.dataset[document.configuration.flashcard.current_id][0]);
        $('#item').text(document.configuration.flashcard.dataset[document.configuration.flashcard.current_id][0]);
        $('#answer_fr').text(document.configuration.flashcard.dataset[document.configuration.flashcard.current_id][1]);
        $('#answer_ar').text(document.configuration.flashcard.dataset[document.configuration.flashcard.current_id][2]);
        $('#item').addClass('d-none');
        let dims = calculateAspectRatioFit($('#image').width(), $('#image').height(), $(".card-body").width(), $(".card-body").width())
        $('#image').css('width', dims.width).css('height', dims.height);

        let path_image = document.configuration.flashcard.image_folder + document.configuration.flashcard.dataset[document.configuration.flashcard.current_id][0] + document.configuration.flashcard.image_extension;
        let myImage = document.getElementById('image');
        myImage.src = path_image;

        document.configuration.flashcard.has_image = true;
        myImage.onerror = function() {
            document.configuration.flashcard.has_image = false;
            myImage.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
            if (document.configuration.flashcard.fr_to_ar) {
                $('#item').removeClass('d-none');
            } else {
                $('#item').addClass('d-none');
            };
            $('#item_image').addClass('d-none');
            // console.log('image error');
        };
        myImage.onload = function() {
            if (document.configuration.flashcard.display_subtitle && document.configuration.flashcard.has_image) {
                if (document.configuration.flashcard.fr_to_ar) {
                    $('#item_image').removeClass('d-none');
                };
                // console.log('image loaded');
            };
        };

        document.configuration.flashcard.has_audio = true;
        let path_audio = document.configuration.flashcard.audio_folder + document.configuration.flashcard.dataset[document.configuration.flashcard.current_id][0] + '.mp3';
        let myAudio = document.getElementById('audio');
        myAudio.src = path_audio;
        myAudio.onerror = function() {
            document.configuration.flashcard.has_audio = false;
        };

        if (document.configuration.flashcard.fr_to_ar) {
            $('#image').css('opacity', 1)
            $('.answer-div').addClass('d-none');
        } else {
            $('#image').css('opacity', 0)
            $('#item').addClass('d-none');
            if (document.configuration.flashcard.display_phonetique) {
                $('#answer_fr').removeClass('d-none');
            } else {
                $('#answer_fr').addClass('d-none');
            }
            $('.answer-div').removeClass('d-none');
            $('#item_image').addClass('d-none');
        };

    };

    $("#image, #item, .answer-div").on('click', function(e) {
        if ($('.answer-div').hasClass('d-none')) {
            $('#image').css('opacity', 0.1)
            if (document.configuration.flashcard.display_phonetique) {
                $('#answer_fr').removeClass('d-none');
            } else {
                $('#answer_fr').addClass('d-none');
            }
            $('.answer-div').removeClass('d-none');
            $('#item').addClass('d-none');
            if (document.configuration.flashcard.has_audio && document.configuration.flashcard.play_audio && document.configuration.flashcard.fr_to_ar) {
                document.getElementById("audio").play();
            };
        } else {
            $('#image').css('opacity', 1)
            $('.answer-div').addClass('d-none');
            if (document.configuration.flashcard.has_image) {
                $('#item').addClass('d-none');
                if (!document.configuration.flashcard.fr_to_ar) {
                    $('#item_image').removeClass('d-none');
                };
            } else {
                $('#item').removeClass('d-none');
            };
            if (document.configuration.flashcard.has_audio && document.configuration.flashcard.play_audio && document.configuration.flashcard.fr_to_ar) {
                document.getElementById("audio").pause();
            };
        };
    });

    function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {
            width: srcWidth * ratio,
            height: srcHeight * ratio
        };
    };

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

})(jQuery);