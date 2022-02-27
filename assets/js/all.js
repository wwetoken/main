function sticky_relocate() {
    var window_top = jQuery(window).scrollTop();
    var div_top = jQuery('#sec_1_stick').offset().top;
    if (window_top > div_top) {
        jQuery('.logo-menu').addClass('stick_menu_main');
        jQuery('div#sec_1_stick').css("min-height", "40px");
    } else {
        jQuery('.logo-menu').removeClass('stick_menu_main');
        jQuery('div#sec_1_stick').css("min-height", "unset");
    }
}
jQuery(function() {
    jQuery(window).scroll(sticky_relocate);
    sticky_relocate();
});
var sentences = [];
var currentText;
$(document).ready(function() {
    AOS.init();
    $('.banner-text p').each(function() {
        var text = $(this).text();
        sentences.push(text.trim());
    });
    currentText = sentences.shift();
    typeWord(currentText);
});
jQuery.fn.extend({
    appendChars: function(char) {
        $(this).text(char);
    }
});

function spliter(string) {
    return string.trim().split("");
}

function appendTextLine() {
    if ($('.type-append-body').has('span')) {
        $('.type-append-body').append('<br/>');
    }
    return $('<span class="text-line"></span>').appendTo('.type-append-body');
}

function appendBreakLine() {
    $('.type-append-body').append('<br/>');
}

function typeWord(text) {
    if (!text) {
        return;
    }
    var charArray = [];
    for (i = 0; i < text.length; i++) {
        var i1 = i + 1;
        var char = text.slice(0, i1);
        charArray.push(char);
    }
    var textLine = appendTextLine();
    $('.cursor').removeClass('cursor');
    textLine.addClass('cursor');
    var interval = setInterval(function() {
        firstChar = charArray.shift();
        $(textLine).appendChars(firstChar);
        if (charArray.length === 0) {
            currentText = sentences.shift();
            typeWord(currentText);
            clearInterval(interval);
        }
    }, 75);
}
$(document).ready(function() {
    var owl = $('.loop').owlCarousel({
        items: 2,
        loop: true,
        nav: true,
        margin: 0,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            }
        },
        nav: true
    });
    $('.owl-next').click(function() {
        owl.trigger('next.owl.carousel');
    })
    $('.owl-prev').click(function() {
        owl.trigger('prev.owl.carousel');
    })
    $('.intro-section__1-btn').on('mouseover', function(e) {
        var id = $(this).data('id');
        var text_1 = $('div[data-text="' + id + '"][data-part="1"]').text()
        var text_2 = $('div[data-text="' + id + '"][data-part="2"]').text()
        $('.intro-section__1-btn').removeClass('active');
        $(this).addClass('active');
        $('#intro-section__2-2-text').html('<p>' + text_1 + '</p>' + '<p>' + text_2 + '</p>');
    })
    $('.intro-1-section__list > a').on('mouseover', function(e) {
        $('.intro-1-section__list > a').removeClass('active');
        $('.intro-1-section__list-toggled-text').removeClass('active');
        $(this).parent().find('.intro-1-section__list-toggled-text').addClass('active');
        $(this).addClass('active');
    })
    $('.intro-1-section__list > a').on('mouseout', function(e) {
        e.stopPropagation();
        $('.intro-1-section__list > a').removeClass('active');
        $('.intro-1-section__list-toggled-text').removeClass('active');
    })
    $('.member-box').on('mouseenter', function(e) {
        $('.member-box').removeClass('active');
        $(this).addClass('active');
    })
    $('.member-box').on('mouseleave', function(e) {
        $('.member-box').removeClass('active');
    })
    $('.member-box__description__arrow').on('click', function(e) {
        e.stopPropagation();
        $(this).parent().parent().toggleClass('active');
    })
    $('.about-details-box__text-list--our-perks > li > span').on('mouseenter', function(e) {
        $('.about-details-box__text-list--our-perks > li > span').parent().removeClass('active');
        $(this).parent().addClass('active');
    })
    $('.about-details-box__text-list--our-perks > li > span').on('mouseleave', function(e) {
        $('.about-details-box__text-list--our-perks > li > span').parent().removeClass('active');
    })
    $('.about-details-box__arrow').on('click', function(e) {
        e.stopPropagation();
        $(this).parent().parent().toggleClass('active');
    })
    $(".contact-form").on('submit', function(e) {
        e.preventDefault();
        var data = {
            name: $("#form_name").val(),
            email: $("#form_email").val(),
            message: $("#msg_text").val(),
        };
        const errorMessage = `<div class='alert alert-danger'>Error while sending email. Please try again later.</div>`;
        $.ajax({
            type: "POST",
            url: "https://api.Baba.network/api/send-email-to-Baba",
            data: JSON.stringify(data),
            success: function(res) {
                const data = res === 'sent' ? `<div class='alert alert-success'>We will get in touch shortly</div>` : errorMessage;
                $('.message-form').html(data);
                $("#form_name").val('');
                $("#form_email").val('');
                $("#msg_text").val('');
            },
            error: function(err) {
                $('.message-form').html(errorMessage);
            },
            contentType: "application/json",
        });
    });
    $('.navbar-nav li.nav-item a').on('click', function() {
        if (!$(this).hasClass('dropdown-submenu')) {
            $('.navbar-collapse').collapse('hide');
        }
    });
});

function isMobile() {
    return ('ontouchstart' in document.documentElement);
}
var accordionBtn = $('.faq-details button.btn.btn-link');
var bedAccordion = $('.faq-details .card ');
$(document).ready(function() {
    $(bedAccordion).on('show.bs.collapse', function(e) {
        toggleButton.call(this);
        $(this).find('.collapse').collapse('hide');
    });
    $(bedAccordion).on('hide.bs.collapse', function() {
        toggleButton.call(this);
    });
});

function toggleButton() {
    $(this).find('button').toggleClass('active');
    $(this).find('button').parent().parent().toggleClass('active');
}
$(window).bind('mousewheel', function() {
    $('.faq-details').css("padding-top", '50px');
});