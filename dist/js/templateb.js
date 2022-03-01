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



//Google map

jQuery(document).ready(function(){
	var e=new google.maps.LatLng(44.789511,20.43633),
		o={zoom:14,center:new google.maps.LatLng(44.789511,20.43633),
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		mapTypeControl:!1,
		scrollwheel:!1,
		draggable:!0,
		navigationControl:!1
	},
		n=new google.maps.Map(document.getElementById("google_map"),o);
		google.maps.event.addDomListener(window,"resize",function(){var e=n.getCenter();
		google.maps.event.trigger(n,"resize"),n.setCenter(e)});

		var g='<div class="map-tooltip"><h6></h6><p>Checking out our office too?</p></div>',a=new google.maps.InfoWindow({content:g})
		,t=new google.maps.MarkerImage("images/map-pin.png",new google.maps.Size(40,70),
		new google.maps.Point(0,0),new google.maps.Point(20,55)),
		i=new google.maps.LatLng(44.789511,20.43633),
		p=new google.maps.Marker({position:i,map:n,icon:t,zIndex:3});
		google.maps.event.addListener(p,"click",function(){a.open(n,p)}),
		$(".button-map").click(function(){$("#google_map").slideToggle(300,function(){google.maps.event.trigger(n,"resize"),n.setCenter(e)}),
		$(this).toggleClass("close-map show-map")});

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZWIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9Ib21lIGZpdCBzY3JlZW5cclxuXHJcblx0LypnbG9iYWwgJDpmYWxzZSAqL1xyXG5cdCQoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtcclxuXHRcdCQoJyNob21lJykuY3NzKHsnaGVpZ2h0JzooJCh3aW5kb3cpLmhlaWdodCgpKSsncHgnfSk7XHJcblx0XHQkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcjaG9tZScpLmNzcyh7J2hlaWdodCc6KCQod2luZG93KS5oZWlnaHQoKSkrJ3B4J30pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuLy9TY3JvbGxpbmdcclxuXHJcblx0JChkb2N1bWVudCkucmVhZHkoXHJcblx0ZnVuY3Rpb24oKSB7XHJcblx0XHQkKFwiaHRtbFwiKS5uaWNlU2Nyb2xsKCk7XHJcblx0XHR9XHJcblx0KTtcclxuXHJcblxyXG4vL05hdmlnYXRpb25cclxuXHJcbiQoJ3VsLnNsaW1tZW51Jykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG52YXIgd2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuaWYgKCh3aWR0aCA8PSA4MDApKXtcclxuICAgICQodGhpcykuc2xpZGVUb2dnbGUoKTtcclxufVxyXG59KTtcclxuJCgndWwuc2xpbW1lbnUnKS5zbGltbWVudShcclxue1xyXG4gICAgcmVzaXplV2lkdGg6ICc4MDAnLFxyXG4gICAgY29sbGFwc2VyVGl0bGU6ICcnLFxyXG4gICAgZWFzaW5nRWZmZWN0OidlYXNlSW5PdXRRdWludCcsXHJcbiAgICBhbmltU3BlZWQ6J21lZGl1bScsXHJcbiAgICBpbmRlbnRDaGlsZHJlbjogdHJ1ZSxcclxuICAgIGNoaWxkcmVuSW5kZW50ZXI6ICcmcmFxdW87J1xyXG59KTtcclxuLypnbG9iYWwgJDpmYWxzZSAqL1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO1xyXG5cdCQoXCIuc2Nyb2xsXCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcclxuXHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHZhciBmdWxsX3VybCA9IHRoaXMuaHJlZjtcclxuXHRcdHZhciBwYXJ0cyA9IGZ1bGxfdXJsLnNwbGl0KFwiI1wiKTtcclxuXHRcdHZhciB0cmd0ID0gcGFydHNbMV07XHJcblx0XHR2YXIgdGFyZ2V0X29mZnNldCA9ICQoXCIjXCIrdHJndCkub2Zmc2V0KCk7XHJcblx0XHR2YXIgdGFyZ2V0X3RvcCA9IHRhcmdldF9vZmZzZXQudG9wIC0gNjA7XHJcblxyXG5cdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDp0YXJnZXRfdG9wfSwgMTIwMCk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vL0hvbWUgVGV4dCBSb3RhdG9yXHJcblxyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmZsaXBweScpLmZsaXBweSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWw6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDUwMCxcclxuICAgICAgICAgICAgICAgICAgICBzdG9wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogXCIxMDBweFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbi8vVG9vbHRpcFxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0JChcIi50aXBwZWRcIikudGlwcGVyKCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuLy9UZWFtIGZsaXBcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5mbGlwV3JhcHBlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5jYXJkJykudG9nZ2xlQ2xhc3MoJ2ZsaXBwZWQnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxuLy9UZXN0aW1vbmlhbHMgc2xpZGVyXHJcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5zbGlkZXIzJykuYnhTbGlkZXIoe1xyXG5cdFx0XHRhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcclxuXHRcdFx0dG91Y2hFbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRwYWdlcjogZmFsc2UsXHJcblx0XHRcdGNvbnRyb2xzOiB0cnVlLFxyXG5cdFx0XHRhdXRvOiBmYWxzZSxcclxuXHRcdFx0c2xpZGVNYXJnaW46IDFcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblxyXG5cclxuIC8vQ291bnRlclxyXG5cclxuICAgIGpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oICQgKSB7XHJcbiAgICAgICAgJCgnLmNvdW50ZXInKS5jb3VudGVyVXAoe1xyXG4gICAgICAgICAgICBkZWxheTogMTAwLFxyXG4gICAgICAgICAgICB0aW1lOiAyMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vL1BvcnRmb2xpbyBmaWx0ZXJcclxuXHJcbi8qZ2xvYmFsICQ6ZmFsc2UgKi9cclxuXHQkKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XHJcblx0ICAgIHZhciAkY29udGFpbmVyID0gJCgnLnBvcnRmb2xpby13cmFwJyk7XHJcblx0ICAgIHZhciAkZmlsdGVyID0gJCgnI2ZpbHRlcicpO1xyXG5cdCAgICAvLyBJbml0aWFsaXplIGlzb3RvcGVcclxuXHQgICAgJGNvbnRhaW5lci5pc290b3BlKHtcclxuXHQgICAgICAgIGZpbHRlcjogJyonLFxyXG5cdCAgICAgICAgbGF5b3V0TW9kZTogJ2ZpdFJvd3MnLFxyXG5cdCAgICAgICAgYW5pbWF0aW9uT3B0aW9uczoge1xyXG5cdCAgICAgICAgICAgIGR1cmF0aW9uOiA3NTAsXHJcblx0ICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJ1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9KTtcclxuXHQgICAgLy8gRmlsdGVyIGl0ZW1zIHdoZW4gZmlsdGVyIGxpbmsgaXMgY2xpY2tlZFxyXG5cdCAgICAkZmlsdGVyLmZpbmQoJ2EnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgICB2YXIgc2VsZWN0b3IgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtZmlsdGVyJyk7XHJcblx0ICAgICAgICAkZmlsdGVyLmZpbmQoJ2EnKS5yZW1vdmVDbGFzcygnY3VycmVudCcpO1xyXG5cdCAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnY3VycmVudCcpO1xyXG5cdCAgICAgICAgJGNvbnRhaW5lci5pc290b3BlKHtcclxuXHQgICAgICAgICAgICBmaWx0ZXI6IHNlbGVjdG9yLFxyXG5cdCAgICAgICAgICAgIGFuaW1hdGlvbk9wdGlvbnM6IHtcclxuXHQgICAgICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDc1MCxcclxuXHQgICAgICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcclxuXHQgICAgICAgICAgICAgICAgcXVldWU6IGZhbHNlLFxyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH0pO1xyXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICB9KTtcclxuXHR9KTtcclxuXHJcblxyXG4vLyBQb3J0Zm9saW8gSXNvdG9wZVxyXG5cclxuICBqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xyXG5cclxuXHR2YXIgY29udGFpbmVyID0gJCgnLnBvcnRmb2xpby13cmFwJyk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gc3BsaXRDb2x1bW5zKCkge1xyXG5cdFx0XHR2YXIgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKSxcclxuXHRcdFx0XHRjb2x1bW5OdW1iID0gMTtcclxuXHJcblxyXG5cdFx0XHRpZiAod2luV2lkdGggPiAxMDI0KSB7XHJcblx0XHRcdFx0Y29sdW1uTnVtYiA9IDQ7XHJcblx0XHRcdH0gZWxzZSBpZiAod2luV2lkdGggPiA5MDApIHtcclxuXHRcdFx0XHRjb2x1bW5OdW1iID0gMjtcclxuXHRcdFx0fSBlbHNlIGlmICh3aW5XaWR0aCA+IDQ3OSkge1xyXG5cdFx0XHRcdGNvbHVtbk51bWIgPSAyO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHdpbldpZHRoIDwgNDc5KSB7XHJcblx0XHRcdFx0Y29sdW1uTnVtYiA9IDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBjb2x1bW5OdW1iO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldENvbHVtbnMoKSB7XHJcblx0XHRcdHZhciB3aW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpLFxyXG5cdFx0XHRcdGNvbHVtbk51bWIgPSBzcGxpdENvbHVtbnMoKSxcclxuXHRcdFx0XHRwb3N0V2lkdGggPSBNYXRoLmZsb29yKHdpbldpZHRoIC8gY29sdW1uTnVtYik7XHJcblxyXG5cdFx0XHRjb250YWluZXIuZmluZCgnLnBvcnRmb2xpby1ib3gnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQkKHRoaXMpLmNzcygge1xyXG5cdFx0XHRcdFx0d2lkdGggOiBwb3N0V2lkdGggKyAncHgnXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldFByb2plY3RzKCkge1xyXG5cdFx0XHRzZXRDb2x1bW5zKCk7XHJcblx0XHRcdGNvbnRhaW5lci5pc290b3BlKCdyZUxheW91dCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRhaW5lci5pbWFnZXNMb2FkZWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRzZXRDb2x1bW5zKCk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0JCh3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2V0UHJvamVjdHMoKTtcclxuXHRcdH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuIC8vIFBvcnRmb2xpbyBBamF4XHJcblxyXG5cclxuICAgICAgICAkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcclxuICAgICAgIFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0ICB2YXIgbG9hZGVyID0gJCgnLmV4cGFuZGVyLXdyYXAnKTtcclxuXHRcdGlmKHR5cGVvZiBsb2FkZXIuaHRtbCgpID09ICd1bmRlZmluZWQnKXtcclxuXHRcdFx0JCgnPGRpdiBjbGFzcz1cImV4cGFuZGVyLXdyYXBcIj48ZGl2IGlkPVwiZXhwYW5kZXItd3JhcFwiIGNsYXNzPVwiY29udGFpbmVyIGNsZWFyZml4IHJlbGF0aXZlXCI+PHAgY2xhc3M9XCJjbHMtYnRuXCI+PGEgY2xhc3M9XCJjbG9zZVwiPlg8L2E+PC9wPjxkaXYvPjwvZGl2PjwvZGl2PicpLmNzcyh7b3BhY2l0eTowfSkuaGlkZSgpLmluc2VydEFmdGVyKCcucG9ydGZvbGlvJyk7XHJcblx0XHRcdGxvYWRlciA9ICQoJy5leHBhbmRlci13cmFwJyk7XHJcblx0XHR9XHJcblx0XHQkKCcuZXhwYW5kZXInKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR2YXIgdXJsID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblxyXG5cclxuXHJcblx0XHRcdGxvYWRlci5zbGlkZVVwKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JC5nZXQodXJsLCBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdHZhciBwb3J0Zm9saW9Db250YWluZXIgPSAkKCcucG9ydGZvbGlvJyk7XHJcblx0XHRcdFx0XHR2YXIgdG9wUG9zaXRpb24gPSBwb3J0Zm9saW9Db250YWluZXIub2Zmc2V0KCkudG9wO1xyXG5cdFx0XHRcdFx0dmFyIGJvdHRvbVBvc2l0aW9uID0gdG9wUG9zaXRpb24gKyBwb3J0Zm9saW9Db250YWluZXIuaGVpZ2h0KCk7XHJcblx0XHRcdFx0XHQkKCdodG1sLGJvZHknKS5kZWxheSg2MDApLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGJvdHRvbVBvc2l0aW9uIC0gLTEwfSwgODAwKTtcclxuXHRcdFx0XHRcdHZhciBjb250YWluZXIgPSAkKCcjZXhwYW5kZXItd3JhcD5kaXYnLCBsb2FkZXIpO1xyXG5cclxuXHRcdFx0XHRcdGNvbnRhaW5lci5odG1sKGRhdGEpO1xyXG5cdFx0XHRcdFx0JChcIi52aWRlb1wiKS5maXRWaWRzKCk7XHJcblx0XHRcdFx0XHQkKCcuYnhzbGlkZXInKS5ieFNsaWRlcih7XHJcblx0XHRcdFx0XHRcdGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxyXG5cdFx0XHRcdFx0XHR0b3VjaEVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdFx0XHRcdHBhZ2VyOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0Y29udHJvbHM6IHRydWUsXHJcblx0XHRcdFx0XHRcdGF1dG86IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRzbGlkZU1hcmdpbjogMVxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cclxuXHRcdFx0XHRcdGxvYWRlci5zbGlkZURvd24oZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0aWYodHlwZW9mIGtlZXBWaWRlb1JhdGlvID09ICdmdW5jdGlvbicpe1xyXG5cdFx0XHRcdFx0XHRcdGtlZXBWaWRlb1JhdGlvKCcudmlkZW8gPiBpZnJhbWUnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSkuZGVsYXkoMTAwMCkuYW5pbWF0ZSh7b3BhY2l0eToxfSwgMjAwKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcuY2xvc2UnLCBsb2FkZXIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdGxvYWRlci5kZWxheSgzMDApLnNsaWRlVXAoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR2YXIgY29udGFpbmVyID0gJCgnI2V4cGFuZGVyLXdyYXA+ZGl2JywgbG9hZGVyKTtcclxuXHRcdFx0XHRjb250YWluZXIuaHRtbCgnJyk7XHJcblx0XHRcdFx0JCh0aGlzKS5jc3Moe29wYWNpdHk6MH0pO1xyXG5cclxuXHRcdFx0fSk7XHJcblx0XHRcdHZhciBwb3J0Zm9saW9Db250YWluZXIgPSAkKCcucG9ydGZvbGlvJyk7XHJcblx0XHRcdFx0dmFyIHRvcFBvc2l0aW9uID0gcG9ydGZvbGlvQ29udGFpbmVyLm9mZnNldCgpLnRvcDtcclxuXHRcdFx0XHQkKCdodG1sLGJvZHknKS5kZWxheSgwKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0b3BQb3NpdGlvbiAtIDcwfSwgNTAwKTtcclxuXHRcdH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcbi8vR29vZ2xlIG1hcFxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cdHZhciBlPW5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDQuNzg5NTExLDIwLjQzNjMzKSxcclxuXHRcdG89e3pvb206MTQsY2VudGVyOm5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDQuNzg5NTExLDIwLjQzNjMzKSxcclxuXHRcdG1hcFR5cGVJZDpnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcclxuXHRcdG1hcFR5cGVDb250cm9sOiExLFxyXG5cdFx0c2Nyb2xsd2hlZWw6ITEsXHJcblx0XHRkcmFnZ2FibGU6ITAsXHJcblx0XHRuYXZpZ2F0aW9uQ29udHJvbDohMVxyXG5cdH0sXHJcblx0XHRuPW5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnb29nbGVfbWFwXCIpLG8pO1xyXG5cdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LFwicmVzaXplXCIsZnVuY3Rpb24oKXt2YXIgZT1uLmdldENlbnRlcigpO1xyXG5cdFx0Z29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihuLFwicmVzaXplXCIpLG4uc2V0Q2VudGVyKGUpfSk7XHJcblxyXG5cdFx0dmFyIGc9JzxkaXYgY2xhc3M9XCJtYXAtdG9vbHRpcFwiPjxoNj48L2g2PjxwPkNoZWNraW5nIG91dCBvdXIgb2ZmaWNlIHRvbz88L3A+PC9kaXY+JyxhPW5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtjb250ZW50Omd9KVxyXG5cdFx0LHQ9bmV3IGdvb2dsZS5tYXBzLk1hcmtlckltYWdlKFwiaW1hZ2VzL21hcC1waW4ucG5nXCIsbmV3IGdvb2dsZS5tYXBzLlNpemUoNDAsNzApLFxyXG5cdFx0bmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsMCksbmV3IGdvb2dsZS5tYXBzLlBvaW50KDIwLDU1KSksXHJcblx0XHRpPW5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDQuNzg5NTExLDIwLjQzNjMzKSxcclxuXHRcdHA9bmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7cG9zaXRpb246aSxtYXA6bixpY29uOnQsekluZGV4OjN9KTtcclxuXHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHAsXCJjbGlja1wiLGZ1bmN0aW9uKCl7YS5vcGVuKG4scCl9KSxcclxuXHRcdCQoXCIuYnV0dG9uLW1hcFwiKS5jbGljayhmdW5jdGlvbigpeyQoXCIjZ29vZ2xlX21hcFwiKS5zbGlkZVRvZ2dsZSgzMDAsZnVuY3Rpb24oKXtnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG4sXCJyZXNpemVcIiksbi5zZXRDZW50ZXIoZSl9KSxcclxuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoXCJjbG9zZS1tYXAgc2hvdy1tYXBcIil9KTtcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gU3dpdGNoZXIgQ1NTXHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblwidXNlIHN0cmljdFwiO1xyXG4gICAgJChcIiNoaWRlLCAjc2hvd1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoXCIjc2hvd1wiKS5pcyhcIjp2aXNpYmxlXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAkKFwiI3Nob3dcIikuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi1sZWZ0XCI6IFwiLTMwMHB4XCJcclxuICAgICAgICAgICAgfSwgMzAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI3N3aXRjaFwiKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWxlZnRcIjogXCIwcHhcIlxyXG4gICAgICAgICAgICB9LCAzMDApLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI3N3aXRjaFwiKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWxlZnRcIjogXCItMzAwcHhcIlxyXG4gICAgICAgICAgICB9LCAzMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIiNzaG93XCIpLnNob3coKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWxlZnRcIjogXCIwXCJcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG4iXSwiZmlsZSI6InRlbXBsYXRlYi5qcyJ9
