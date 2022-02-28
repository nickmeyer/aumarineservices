//Home fit screen

	/*global $:false */
	$(function(){"use strict";
		$('#home').css({'height':($(window).height())+'px'});
		$(window).resize(function(){
		$('#home').css({'height':($(window).height())+'px'});
		});
	});


//Scrolling

	$(document).ready(
	function() {
		$("html").niceScroll();
		}
	);


//Navigation

$('ul.slimmenu').on('click',function(){
var width = $(window).width();
if ((width <= 800)){
    $(this).slideToggle();
}
});
$('ul.slimmenu').slimmenu(
{
    resizeWidth: '800',
    collapserTitle: '',
    easingEffect:'easeInOutQuint',
    animSpeed:'medium',
    indentChildren: true,
    childrenIndenter: '&raquo;'
});
/*global $:false */
$(document).ready(function(){"use strict";
	$(".scroll").click(function(event){

		event.preventDefault();

		var full_url = this.href;
		var parts = full_url.split("#");
		var trgt = parts[1];
		var target_offset = $("#"+trgt).offset();
		var target_top = target_offset.top - 60;

		$('html, body').animate({scrollTop:target_top}, 1200);
	});
});



//Home Text Rotator

            $(document).ready(function () {

                $('.flippy').flippy({
                    interval: 4,
                    speed: 500,
                    stop: false,
                    distance: "100px"
                });

            });


//Tooltip

$(document).ready(function() {
	$(".tipped").tipper();
});




//Team flip

$(document).ready(function () {
    $('.flipWrapper').click(function () {
        $(this).find('.card').toggleClass('flipped');
        return false;
    });
});


//Testimonials slider
	$(document).ready(function(){
		$('.slider3').bxSlider({
			adaptiveHeight: true,
			touchEnabled: true,
			pager: false,
			controls: true,
			auto: false,
			slideMargin: 1
		});
	});




 //Counter

    jQuery(document).ready(function( $ ) {
        $('.counter').counterUp({
            delay: 100,
            time: 2000
        });
    });


//Portfolio filter

/*global $:false */
	$(window).load(function () {
	    var $container = $('.portfolio-wrap');
	    var $filter = $('#filter');
	    // Initialize isotope
	    $container.isotope({
	        filter: '*',
	        layoutMode: 'fitRows',
	        animationOptions: {
	            duration: 750,
	            easing: 'linear'
	        }
	    });
	    // Filter items when filter link is clicked
	    $filter.find('a').click(function () {
	        var selector = $(this).attr('data-filter');
	        $filter.find('a').removeClass('current');
	        $(this).addClass('current');
	        $container.isotope({
	            filter: selector,
	            animationOptions: {
	                animationDuration: 750,
	                easing: 'linear',
	                queue: false,
	            }
	        });
	        return false;
	    });
	});


// Portfolio Isotope

  jQuery(document).ready(function($){

	var container = $('.portfolio-wrap');

		function splitColumns() {
			var winWidth = $(window).width(),
				columnNumb = 1;


			if (winWidth > 1024) {
				columnNumb = 4;
			} else if (winWidth > 900) {
				columnNumb = 2;
			} else if (winWidth > 479) {
				columnNumb = 2;
			} else if (winWidth < 479) {
				columnNumb = 1;
			}

			return columnNumb;
		}

		function setColumns() {
			var winWidth = $(window).width(),
				columnNumb = splitColumns(),
				postWidth = Math.floor(winWidth / columnNumb);

			container.find('.portfolio-box').each(function () {
				$(this).css( {
					width : postWidth + 'px'
				});
			});
		}

		function setProjects() {
			setColumns();
			container.isotope('reLayout');
		}

		container.imagesLoaded(function () {
			setColumns();
		});


		$(window).bind('resize', function () {
			setProjects();
		});

});


 // Portfolio Ajax


        $(window).load(function() {
       	'use strict';
		  var loader = $('.expander-wrap');
		if(typeof loader.html() == 'undefined'){
			$('<div class="expander-wrap"><div id="expander-wrap" class="container clearfix relative"><p class="cls-btn"><a class="close">X</a></p><div/></div></div>').css({opacity:0}).hide().insertAfter('.portfolio');
			loader = $('.expander-wrap');
		}
		$('.expander').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			var url = $(this).attr('href');



			loader.slideUp(function(){
				$.get(url, function(data){
					var portfolioContainer = $('.portfolio');
					var topPosition = portfolioContainer.offset().top;
					var bottomPosition = topPosition + portfolioContainer.height();
					$('html,body').delay(600).animate({ scrollTop: bottomPosition - -10}, 800);
					var container = $('#expander-wrap>div', loader);

					container.html(data);
					$(".video").fitVids();
					$('.bxslider').bxSlider({
						adaptiveHeight: true,
						touchEnabled: true,
						pager: false,
						controls: true,
						auto: false,
						slideMargin: 1
					});


					loader.slideDown(function(){
						if(typeof keepVideoRatio == 'function'){
							keepVideoRatio('.video > iframe');
						}
					}).delay(1000).animate({opacity:1}, 200);
				});
			});
		});

		$('.close', loader).on('click', function(){
			loader.delay(300).slideUp(function(){
				var container = $('#expander-wrap>div', loader);
				container.html('');
				$(this).css({opacity:0});

			});
			var portfolioContainer = $('.portfolio');
				var topPosition = portfolioContainer.offset().top;
				$('html,body').delay(0).animate({ scrollTop: topPosition - 70}, 500);
		});

});


































// Switcher CSS
  $(document).ready(function() {
"use strict";
    $("#hide, #show").click(function () {
        if ($("#show").is(":visible")) {

            $("#show").animate({
                "margin-left": "-300px"
            }, 300, function () {
                $(this).hide();
            });

            $("#switch").animate({
                "margin-left": "0px"
            }, 300).show();
        } else {
            $("#switch").animate({
                "margin-left": "-300px"
            }, 300, function () {
                $(this).hide();
            });
            $("#show").show().animate({
                "margin-left": "0"
            }, 300);
        }
    });

});
