/* ===========================================================

jquery-onepage-scroll.js v1.1.1
===========================================================
Copyright 2013 Pete Rojwongsuriya.
http://www.thepetedesign.com *
Create an Apple-like website that let user scroll
one page at a time *
Credit: Eike Send for the awesome swipe event
https://github.com/peachananr/onepage-scroll *
License: GPL v3 *
========================================================== */
!function($){

$.support.transition = (function(){
var thisBody = document.body || document.documentElement, 
thisStyle = thisBody.style,
support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
return support;
})();

var defaults = {
sectionContainer: "section",
easing: "ease",
animationTime: 600,
pagination: true,
updateURL: false,
keyboard: true,
beforeMove: null,
afterMove: null,
loop: false
};

/------------------------------------------------/
/* Credit: Eike Send for the awesome swipe event /
/------------------------------------------------*/

$.fn.swipeEvents = function() {
return this.each(function() {

    var startX,
        startY,
        $this = $(this);

    $this.bind('touchstart', touchstart);

    function touchstart(event) {
      var touches = event.originalEvent.touches;
      if (touches && touches.length) {
        startX = touches[0].pageX;
        startY = touches[0].pageY;
        $this.bind('touchmove', touchmove);
      }
      event.preventDefault();
    }

    function touchmove(event) {
      var touches = event.originalEvent.touches;
      if (touches && touches.length) {
        var deltaX = startX - touches[0].pageX;
        var deltaY = startY - touches[0].pageY;

        if (deltaX >= 50) {
          $this.trigger("swipeLeft");
        }
        if (deltaX <= -50) {
          $this.trigger("swipeRight");
        }
        if (deltaY >= 50) {
          $this.trigger("swipeUp");
        }
        if (deltaY <= -50) {
          $this.trigger("swipeDown");
        }
        if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
          $this.unbind('touchmove', touchmove);
        }
      }
      event.preventDefault();
    }

  });
};
$.fn.onepage_scroll = function(options){
var settings = $.extend({}, defaults, options),
el = $(this),
sections = $(settings.sectionContainer)
total = sections.length,
status = "off",
topPos = 0,
lastAnimation = 0,
quietPeriod = 500,
paginationList = "";

$.fn.transformPage = function(settings, pos, index) {
 if ( ! $.support.transition ) {
    $(this).animate({
     'top': pos + '%'
    },400);
    return;
 }  
  $(this).css({
    "-webkit-transform": "translate3d(0, " + pos + "%, 0)",
    "-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
    "-moz-transform": "translate3d(0, " + pos + "%, 0)",
    "-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
    "-ms-transform": "translate3d(0, " + pos + "%, 0)",
    "-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
    "transform": "translate3d(0, " + pos + "%, 0)",
    "transition": "all " + settings.animationTime + "ms " + settings.easing
  });
  $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
    if (typeof settings.afterMove == 'function') settings.afterMove(index);
  });
}

$.fn.jumpTo = function(newIndex) {
  var el = $(this)
  index = $(settings.sectionContainer +".active").data("index");
  current = $(settings.sectionContainer + "[data-index='" + index + "']");
  next = $(settings.sectionContainer + "[data-index='" + (newIndex+1) + "']");
  if(next.length < 1) {
    if (settings.loop == true) {
      pos = 0;
      next = $(settings.sectionContainer + "[data-index='" + (newIndex) + "']");
    } else {
      return
    }

  }else {
    pos = (newIndex * 100) * -1;
  }

  current.removeClass("active")
  next.addClass("active");
  if(settings.pagination == true) {
    $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
    $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
  }

  $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
  $("body").addClass("viewing-page-"+next.data("index"))

  if (history.replaceState && settings.updateURL == true) {
    var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (index + 1);
    history.pushState( {}, document.title, href );
  }
  el.transformPage(settings, pos, newIndex);
}




$.fn.moveDown = function() {
  var el = $(this)
  index = $(settings.sectionContainer +".active").data("index");
  current = $(settings.sectionContainer + "[data-index='" + index + "']");
  next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");
  if(next.length < 1) {
    if (settings.loop == true) {
      pos = 0;
      next = $(settings.sectionContainer + "[data-index='1']");
    } else {
      return
    }

  }else {
    pos = (index * 100) * -1;
  }
  if (typeof settings.beforeMove == 'function') settings.beforeMove( current.data("index"));
  current.removeClass("active")
  next.addClass("active");
  if(settings.pagination == true) {
    $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
    $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
  }

  $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
  $("body").addClass("viewing-page-"+next.data("index"))

  if (history.replaceState && settings.updateURL == true) {
    var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (index + 1);
    history.pushState( {}, document.title, href );
  }
  el.transformPage(settings, pos, index);
}

$.fn.moveUp = function() {
  var el = $(this)
  index = $(settings.sectionContainer +".active").data("index");
  current = $(settings.sectionContainer + "[data-index='" + index + "']");
  next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");

  if(next.length < 1) {
    if (settings.loop == true) {
      pos = ((total - 1) * 100) * -1;
      next = $(settings.sectionContainer + "[data-index='"+total+"']");
    }
    else {
      return
    }
  }else {
    pos = ((next.data("index") - 1) * 100) * -1;
  }
  if (typeof settings.beforeMove == 'function') settings.beforeMove(current.data("index"));
  current.removeClass("active")
  next.addClass("active")
  if(settings.pagination == true) {
    $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
    $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
  }
  $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
  $("body").addClass("viewing-page-"+next.data("index"))

  if (history.replaceState && settings.updateURL == true) {
    var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (index - 1);
    history.pushState( {}, document.title, href );
  }
  el.transformPage(settings, pos, index);
}

function init_scroll(event, delta) {
    deltaOfInterest = delta;
    var timeNow = new Date().getTime();
    // Cancel scroll if currently animating or within quiet period
    if(timeNow - lastAnimation < quietPeriod + settings.animationTime) {
        event.preventDefault();
        return;
    }

    if (deltaOfInterest < 0) {
      el.moveDown()
    } else {
      el.moveUp()
    }
    lastAnimation = timeNow;
}

// Prepare everything before binding wheel scroll

el.addClass("onepage-wrapper").css("position","relative");
$.each( sections, function(i) {
  $(this).css({
    position: "absolute",
    top: topPos + "%"
  }).addClass("section").attr("data-index", i+1);
  topPos = topPos + 100;
  if(settings.pagination == true) {
    paginationList += "<li><a data-index='"+(i+1)+"' href='#" + (i+1) + "'></a></li>"
  }
});

el.swipeEvents().bind("swipeDown", function(){
  el.moveUp();
}).bind("swipeUp", function(){
  el.moveDown();
});

// Create Pagination and Display Them
if(settings.pagination == true) {
  $("<ul class='onepage-pagination'>" + paginationList + "</ul>").prependTo("body");
  posTop = (el.find(".onepage-pagination").height() / 2) * -1;
  el.find(".onepage-pagination").css("margin-top", posTop);
}

if(window.location.hash != "" && window.location.hash != "#1") {
  init_index = window.location.hash.replace("#", "")
  $(settings.sectionContainer + "[data-index='" + init_index + "']").addClass("active")
  $("body").addClass("viewing-page-"+ init_index)
  if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + init_index + "']").addClass("active");

  next = $(settings.sectionContainer + "[data-index='" + (init_index) + "']");
  if(next) {
    next.addClass("active")
    if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + (init_index) + "']").addClass("active");
    $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
    $("body").addClass("viewing-page-"+next.data("index"))
    if (history.replaceState && settings.updateURL == true) {
      var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (init_index);
      history.pushState( {}, document.title, href );
    }
  }
  pos = ((init_index - 1) * 100) * -1;
  el.transformPage(settings, pos, init_index);

}else{
  $(settings.sectionContainer + "[data-index='1']").addClass("active")
  $("body").addClass("viewing-page-1")
  if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
}
if(settings.pagination == true) {
  $(".onepage-pagination li a").click(function (){
    var page_index = $(this).data("index");
    if (!$(this).hasClass("active")) {
      current = $(settings.sectionContainer + ".active")
      next = $(settings.sectionContainer + "[data-index='" + (page_index) + "']");
      if(next) {
        current.removeClass("active")
        next.addClass("active")
        $(".onepage-pagination li a" + ".active").removeClass("active");
        $(".onepage-pagination li a" + "[data-index='" + (page_index) + "']").addClass("active");
        $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
        $("body").addClass("viewing-page-"+next.data("index"))
      }
      pos = ((page_index - 1) * 100) * -1;
      el.transformPage(settings, pos, page_index);
    }
    if (settings.updateURL == false) return false;
  });
}



$(document).bind('mousewheel DOMMouseScroll', function(event) {
  event.preventDefault();
  var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
  init_scroll(event, delta);
});

if(settings.keyboard == true) {
  $(document).keydown(function(e) {
    var tag = e.target.tagName.toLowerCase();
    switch(e.which) {
      case 38:
        if (tag != 'input' && tag != 'textarea') el.moveUp()
      break;
      case 40:
        if (tag != 'input' && tag != 'textarea') el.moveDown()
      break;
      default: return;
    }
    e.preventDefault();
  });
}
return false;
}

}(window.jQuery);

$(".navigation > input").click(function(){
$(".main").jumpTo($(this).data("target"));

});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkub25lcGFnZS1zY3JvbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuanF1ZXJ5LW9uZXBhZ2Utc2Nyb2xsLmpzIHYxLjEuMVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbkNvcHlyaWdodCAyMDEzIFBldGUgUm9qd29uZ3N1cml5YS5cbmh0dHA6Ly93d3cudGhlcGV0ZWRlc2lnbi5jb20gKlxuQ3JlYXRlIGFuIEFwcGxlLWxpa2Ugd2Vic2l0ZSB0aGF0IGxldCB1c2VyIHNjcm9sbFxub25lIHBhZ2UgYXQgYSB0aW1lICpcbkNyZWRpdDogRWlrZSBTZW5kIGZvciB0aGUgYXdlc29tZSBzd2lwZSBldmVudFxuaHR0cHM6Ly9naXRodWIuY29tL3BlYWNoYW5hbnIvb25lcGFnZS1zY3JvbGwgKlxuTGljZW5zZTogR1BMIHYzICpcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbiFmdW5jdGlvbigkKXtcblxuJC5zdXBwb3J0LnRyYW5zaXRpb24gPSAoZnVuY3Rpb24oKXtcbnZhciB0aGlzQm9keSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBcbnRoaXNTdHlsZSA9IHRoaXNCb2R5LnN0eWxlLFxuc3VwcG9ydCA9IHRoaXNTdHlsZS50cmFuc2l0aW9uICE9PSB1bmRlZmluZWQgfHwgdGhpc1N0eWxlLldlYmtpdFRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCB8fCB0aGlzU3R5bGUuTW96VHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkIHx8IHRoaXNTdHlsZS5Nc1RyYW5zaXRpb24gIT09IHVuZGVmaW5lZCB8fCB0aGlzU3R5bGUuT1RyYW5zaXRpb24gIT09IHVuZGVmaW5lZDtcbnJldHVybiBzdXBwb3J0O1xufSkoKTtcblxudmFyIGRlZmF1bHRzID0ge1xuc2VjdGlvbkNvbnRhaW5lcjogXCJzZWN0aW9uXCIsXG5lYXNpbmc6IFwiZWFzZVwiLFxuYW5pbWF0aW9uVGltZTogNjAwLFxucGFnaW5hdGlvbjogdHJ1ZSxcbnVwZGF0ZVVSTDogZmFsc2UsXG5rZXlib2FyZDogdHJ1ZSxcbmJlZm9yZU1vdmU6IG51bGwsXG5hZnRlck1vdmU6IG51bGwsXG5sb29wOiBmYWxzZVxufTtcblxuLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS9cbi8qIENyZWRpdDogRWlrZSBTZW5kIGZvciB0aGUgYXdlc29tZSBzd2lwZSBldmVudCAvXG4vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJC5mbi5zd2lwZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xucmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGFydFgsXG4gICAgICAgIHN0YXJ0WSxcbiAgICAgICAgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgJHRoaXMuYmluZCgndG91Y2hzdGFydCcsIHRvdWNoc3RhcnQpO1xuXG4gICAgZnVuY3Rpb24gdG91Y2hzdGFydChldmVudCkge1xuICAgICAgdmFyIHRvdWNoZXMgPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXM7XG4gICAgICBpZiAodG91Y2hlcyAmJiB0b3VjaGVzLmxlbmd0aCkge1xuICAgICAgICBzdGFydFggPSB0b3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICBzdGFydFkgPSB0b3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICAkdGhpcy5iaW5kKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmUpO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaG1vdmUoZXZlbnQpIHtcbiAgICAgIHZhciB0b3VjaGVzID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzO1xuICAgICAgaWYgKHRvdWNoZXMgJiYgdG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGRlbHRhWCA9IHN0YXJ0WCAtIHRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgIHZhciBkZWx0YVkgPSBzdGFydFkgLSB0b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgIGlmIChkZWx0YVggPj0gNTApIHtcbiAgICAgICAgICAkdGhpcy50cmlnZ2VyKFwic3dpcGVMZWZ0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWx0YVggPD0gLTUwKSB7XG4gICAgICAgICAgJHRoaXMudHJpZ2dlcihcInN3aXBlUmlnaHRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlbHRhWSA+PSA1MCkge1xuICAgICAgICAgICR0aGlzLnRyaWdnZXIoXCJzd2lwZVVwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWx0YVkgPD0gLTUwKSB7XG4gICAgICAgICAgJHRoaXMudHJpZ2dlcihcInN3aXBlRG93blwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGFYKSA+PSA1MCB8fCBNYXRoLmFicyhkZWx0YVkpID49IDUwKSB7XG4gICAgICAgICAgJHRoaXMudW5iaW5kKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICB9KTtcbn07XG4kLmZuLm9uZXBhZ2Vfc2Nyb2xsID0gZnVuY3Rpb24ob3B0aW9ucyl7XG52YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpLFxuZWwgPSAkKHRoaXMpLFxuc2VjdGlvbnMgPSAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIpXG50b3RhbCA9IHNlY3Rpb25zLmxlbmd0aCxcbnN0YXR1cyA9IFwib2ZmXCIsXG50b3BQb3MgPSAwLFxubGFzdEFuaW1hdGlvbiA9IDAsXG5xdWlldFBlcmlvZCA9IDUwMCxcbnBhZ2luYXRpb25MaXN0ID0gXCJcIjtcblxuJC5mbi50cmFuc2Zvcm1QYWdlID0gZnVuY3Rpb24oc2V0dGluZ3MsIHBvcywgaW5kZXgpIHtcbiBpZiAoICEgJC5zdXBwb3J0LnRyYW5zaXRpb24gKSB7XG4gICAgJCh0aGlzKS5hbmltYXRlKHtcbiAgICAgJ3RvcCc6IHBvcyArICclJ1xuICAgIH0sNDAwKTtcbiAgICByZXR1cm47XG4gfSAgXG4gICQodGhpcykuY3NzKHtcbiAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoMCwgXCIgKyBwb3MgKyBcIiUsIDApXCIsXG4gICAgXCItd2Via2l0LXRyYW5zaXRpb25cIjogXCJhbGwgXCIgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1lICsgXCJtcyBcIiArIHNldHRpbmdzLmVhc2luZyxcbiAgICBcIi1tb3otdHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoMCwgXCIgKyBwb3MgKyBcIiUsIDApXCIsXG4gICAgXCItbW96LXRyYW5zaXRpb25cIjogXCJhbGwgXCIgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1lICsgXCJtcyBcIiArIHNldHRpbmdzLmVhc2luZyxcbiAgICBcIi1tcy10cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGUzZCgwLCBcIiArIHBvcyArIFwiJSwgMClcIixcbiAgICBcIi1tcy10cmFuc2l0aW9uXCI6IFwiYWxsIFwiICsgc2V0dGluZ3MuYW5pbWF0aW9uVGltZSArIFwibXMgXCIgKyBzZXR0aW5ncy5lYXNpbmcsXG4gICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGUzZCgwLCBcIiArIHBvcyArIFwiJSwgMClcIixcbiAgICBcInRyYW5zaXRpb25cIjogXCJhbGwgXCIgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1lICsgXCJtcyBcIiArIHNldHRpbmdzLmVhc2luZ1xuICB9KTtcbiAgJCh0aGlzKS5vbmUoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5hZnRlck1vdmUgPT0gJ2Z1bmN0aW9uJykgc2V0dGluZ3MuYWZ0ZXJNb3ZlKGluZGV4KTtcbiAgfSk7XG59XG5cbiQuZm4uanVtcFRvID0gZnVuY3Rpb24obmV3SW5kZXgpIHtcbiAgdmFyIGVsID0gJCh0aGlzKVxuICBpbmRleCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArXCIuYWN0aXZlXCIpLmRhdGEoXCJpbmRleFwiKTtcbiAgY3VycmVudCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9J1wiICsgaW5kZXggKyBcIiddXCIpO1xuICBuZXh0ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyAobmV3SW5kZXgrMSkgKyBcIiddXCIpO1xuICBpZihuZXh0Lmxlbmd0aCA8IDEpIHtcbiAgICBpZiAoc2V0dGluZ3MubG9vcCA9PSB0cnVlKSB7XG4gICAgICBwb3MgPSAwO1xuICAgICAgbmV4dCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9J1wiICsgKG5ld0luZGV4KSArIFwiJ11cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICB9ZWxzZSB7XG4gICAgcG9zID0gKG5ld0luZGV4ICogMTAwKSAqIC0xO1xuICB9XG5cbiAgY3VycmVudC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKVxuICBuZXh0LmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICBpZihzZXR0aW5ncy5wYWdpbmF0aW9uID09IHRydWUpIHtcbiAgICAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIgKyBcIltkYXRhLWluZGV4PSdcIiArIGluZGV4ICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIgKyBcIltkYXRhLWluZGV4PSdcIiArIG5leHQuZGF0YShcImluZGV4XCIpICsgXCInXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfVxuXG4gICQoXCJib2R5XCIpWzBdLmNsYXNzTmFtZSA9ICQoXCJib2R5XCIpWzBdLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJ2aWV3aW5nLXBhZ2UtXFxkLio/XFxiL2csICcnKTtcbiAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJ2aWV3aW5nLXBhZ2UtXCIrbmV4dC5kYXRhKFwiaW5kZXhcIikpXG5cbiAgaWYgKGhpc3RvcnkucmVwbGFjZVN0YXRlICYmIHNldHRpbmdzLnVwZGF0ZVVSTCA9PSB0cnVlKSB7XG4gICAgdmFyIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zdWJzdHIoMCx3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJykpICsgXCIjXCIgKyAoaW5kZXggKyAxKTtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSgge30sIGRvY3VtZW50LnRpdGxlLCBocmVmICk7XG4gIH1cbiAgZWwudHJhbnNmb3JtUGFnZShzZXR0aW5ncywgcG9zLCBuZXdJbmRleCk7XG59XG5cblxuXG5cbiQuZm4ubW92ZURvd24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGVsID0gJCh0aGlzKVxuICBpbmRleCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArXCIuYWN0aXZlXCIpLmRhdGEoXCJpbmRleFwiKTtcbiAgY3VycmVudCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9J1wiICsgaW5kZXggKyBcIiddXCIpO1xuICBuZXh0ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyAoaW5kZXggKyAxKSArIFwiJ11cIik7XG4gIGlmKG5leHQubGVuZ3RoIDwgMSkge1xuICAgIGlmIChzZXR0aW5ncy5sb29wID09IHRydWUpIHtcbiAgICAgIHBvcyA9IDA7XG4gICAgICBuZXh0ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nMSddXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgfWVsc2Uge1xuICAgIHBvcyA9IChpbmRleCAqIDEwMCkgKiAtMTtcbiAgfVxuICBpZiAodHlwZW9mIHNldHRpbmdzLmJlZm9yZU1vdmUgPT0gJ2Z1bmN0aW9uJykgc2V0dGluZ3MuYmVmb3JlTW92ZSggY3VycmVudC5kYXRhKFwiaW5kZXhcIikpO1xuICBjdXJyZW50LnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpXG4gIG5leHQuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gIGlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkge1xuICAgICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9J1wiICsgaW5kZXggKyBcIiddXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9J1wiICsgbmV4dC5kYXRhKFwiaW5kZXhcIikgKyBcIiddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgJChcImJvZHlcIilbMF0uY2xhc3NOYW1lID0gJChcImJvZHlcIilbMF0uY2xhc3NOYW1lLnJlcGxhY2UoL1xcYnZpZXdpbmctcGFnZS1cXGQuKj9cXGIvZywgJycpO1xuICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInZpZXdpbmctcGFnZS1cIituZXh0LmRhdGEoXCJpbmRleFwiKSlcblxuICBpZiAoaGlzdG9yeS5yZXBsYWNlU3RhdGUgJiYgc2V0dGluZ3MudXBkYXRlVVJMID09IHRydWUpIHtcbiAgICB2YXIgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN1YnN0cigwLHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJyMnKSkgKyBcIiNcIiArIChpbmRleCArIDEpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKCB7fSwgZG9jdW1lbnQudGl0bGUsIGhyZWYgKTtcbiAgfVxuICBlbC50cmFuc2Zvcm1QYWdlKHNldHRpbmdzLCBwb3MsIGluZGV4KTtcbn1cblxuJC5mbi5tb3ZlVXAgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGVsID0gJCh0aGlzKVxuICBpbmRleCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArXCIuYWN0aXZlXCIpLmRhdGEoXCJpbmRleFwiKTtcbiAgY3VycmVudCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9J1wiICsgaW5kZXggKyBcIiddXCIpO1xuICBuZXh0ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyAoaW5kZXggLSAxKSArIFwiJ11cIik7XG5cbiAgaWYobmV4dC5sZW5ndGggPCAxKSB7XG4gICAgaWYgKHNldHRpbmdzLmxvb3AgPT0gdHJ1ZSkge1xuICAgICAgcG9zID0gKCh0b3RhbCAtIDEpICogMTAwKSAqIC0xO1xuICAgICAgbmV4dCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9J1wiK3RvdGFsK1wiJ11cIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9ZWxzZSB7XG4gICAgcG9zID0gKChuZXh0LmRhdGEoXCJpbmRleFwiKSAtIDEpICogMTAwKSAqIC0xO1xuICB9XG4gIGlmICh0eXBlb2Ygc2V0dGluZ3MuYmVmb3JlTW92ZSA9PSAnZnVuY3Rpb24nKSBzZXR0aW5ncy5iZWZvcmVNb3ZlKGN1cnJlbnQuZGF0YShcImluZGV4XCIpKTtcbiAgY3VycmVudC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKVxuICBuZXh0LmFkZENsYXNzKFwiYWN0aXZlXCIpXG4gIGlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkge1xuICAgICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9J1wiICsgaW5kZXggKyBcIiddXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9J1wiICsgbmV4dC5kYXRhKFwiaW5kZXhcIikgKyBcIiddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICB9XG4gICQoXCJib2R5XCIpWzBdLmNsYXNzTmFtZSA9ICQoXCJib2R5XCIpWzBdLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJ2aWV3aW5nLXBhZ2UtXFxkLio/XFxiL2csICcnKTtcbiAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJ2aWV3aW5nLXBhZ2UtXCIrbmV4dC5kYXRhKFwiaW5kZXhcIikpXG5cbiAgaWYgKGhpc3RvcnkucmVwbGFjZVN0YXRlICYmIHNldHRpbmdzLnVwZGF0ZVVSTCA9PSB0cnVlKSB7XG4gICAgdmFyIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zdWJzdHIoMCx3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJykpICsgXCIjXCIgKyAoaW5kZXggLSAxKTtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSgge30sIGRvY3VtZW50LnRpdGxlLCBocmVmICk7XG4gIH1cbiAgZWwudHJhbnNmb3JtUGFnZShzZXR0aW5ncywgcG9zLCBpbmRleCk7XG59XG5cbmZ1bmN0aW9uIGluaXRfc2Nyb2xsKGV2ZW50LCBkZWx0YSkge1xuICAgIGRlbHRhT2ZJbnRlcmVzdCA9IGRlbHRhO1xuICAgIHZhciB0aW1lTm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgLy8gQ2FuY2VsIHNjcm9sbCBpZiBjdXJyZW50bHkgYW5pbWF0aW5nIG9yIHdpdGhpbiBxdWlldCBwZXJpb2RcbiAgICBpZih0aW1lTm93IC0gbGFzdEFuaW1hdGlvbiA8IHF1aWV0UGVyaW9kICsgc2V0dGluZ3MuYW5pbWF0aW9uVGltZSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRlbHRhT2ZJbnRlcmVzdCA8IDApIHtcbiAgICAgIGVsLm1vdmVEb3duKClcbiAgICB9IGVsc2Uge1xuICAgICAgZWwubW92ZVVwKClcbiAgICB9XG4gICAgbGFzdEFuaW1hdGlvbiA9IHRpbWVOb3c7XG59XG5cbi8vIFByZXBhcmUgZXZlcnl0aGluZyBiZWZvcmUgYmluZGluZyB3aGVlbCBzY3JvbGxcblxuZWwuYWRkQ2xhc3MoXCJvbmVwYWdlLXdyYXBwZXJcIikuY3NzKFwicG9zaXRpb25cIixcInJlbGF0aXZlXCIpO1xuJC5lYWNoKCBzZWN0aW9ucywgZnVuY3Rpb24oaSkge1xuICAkKHRoaXMpLmNzcyh7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICB0b3A6IHRvcFBvcyArIFwiJVwiXG4gIH0pLmFkZENsYXNzKFwic2VjdGlvblwiKS5hdHRyKFwiZGF0YS1pbmRleFwiLCBpKzEpO1xuICB0b3BQb3MgPSB0b3BQb3MgKyAxMDA7XG4gIGlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkge1xuICAgIHBhZ2luYXRpb25MaXN0ICs9IFwiPGxpPjxhIGRhdGEtaW5kZXg9J1wiKyhpKzEpK1wiJyBocmVmPScjXCIgKyAoaSsxKSArIFwiJz48L2E+PC9saT5cIlxuICB9XG59KTtcblxuZWwuc3dpcGVFdmVudHMoKS5iaW5kKFwic3dpcGVEb3duXCIsIGZ1bmN0aW9uKCl7XG4gIGVsLm1vdmVVcCgpO1xufSkuYmluZChcInN3aXBlVXBcIiwgZnVuY3Rpb24oKXtcbiAgZWwubW92ZURvd24oKTtcbn0pO1xuXG4vLyBDcmVhdGUgUGFnaW5hdGlvbiBhbmQgRGlzcGxheSBUaGVtXG5pZihzZXR0aW5ncy5wYWdpbmF0aW9uID09IHRydWUpIHtcbiAgJChcIjx1bCBjbGFzcz0nb25lcGFnZS1wYWdpbmF0aW9uJz5cIiArIHBhZ2luYXRpb25MaXN0ICsgXCI8L3VsPlwiKS5wcmVwZW5kVG8oXCJib2R5XCIpO1xuICBwb3NUb3AgPSAoZWwuZmluZChcIi5vbmVwYWdlLXBhZ2luYXRpb25cIikuaGVpZ2h0KCkgLyAyKSAqIC0xO1xuICBlbC5maW5kKFwiLm9uZXBhZ2UtcGFnaW5hdGlvblwiKS5jc3MoXCJtYXJnaW4tdG9wXCIsIHBvc1RvcCk7XG59XG5cbmlmKHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9IFwiXCIgJiYgd2luZG93LmxvY2F0aW9uLmhhc2ggIT0gXCIjMVwiKSB7XG4gIGluaXRfaW5kZXggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKVxuICAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgKyBcIltkYXRhLWluZGV4PSdcIiArIGluaXRfaW5kZXggKyBcIiddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpXG4gICQoXCJib2R5XCIpLmFkZENsYXNzKFwidmlld2luZy1wYWdlLVwiKyBpbml0X2luZGV4KVxuICBpZihzZXR0aW5ncy5wYWdpbmF0aW9uID09IHRydWUpICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9J1wiICsgaW5pdF9pbmRleCArIFwiJ11cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgbmV4dCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9J1wiICsgKGluaXRfaW5kZXgpICsgXCInXVwiKTtcbiAgaWYobmV4dCkge1xuICAgIG5leHQuYWRkQ2xhc3MoXCJhY3RpdmVcIilcbiAgICBpZihzZXR0aW5ncy5wYWdpbmF0aW9uID09IHRydWUpICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9J1wiICsgKGluaXRfaW5kZXgpICsgXCInXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKFwiYm9keVwiKVswXS5jbGFzc05hbWUgPSAkKFwiYm9keVwiKVswXS5jbGFzc05hbWUucmVwbGFjZSgvXFxidmlld2luZy1wYWdlLVxcZC4qP1xcYi9nLCAnJyk7XG4gICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJ2aWV3aW5nLXBhZ2UtXCIrbmV4dC5kYXRhKFwiaW5kZXhcIikpXG4gICAgaWYgKGhpc3RvcnkucmVwbGFjZVN0YXRlICYmIHNldHRpbmdzLnVwZGF0ZVVSTCA9PSB0cnVlKSB7XG4gICAgICB2YXIgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN1YnN0cigwLHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJyMnKSkgKyBcIiNcIiArIChpbml0X2luZGV4KTtcbiAgICAgIGhpc3RvcnkucHVzaFN0YXRlKCB7fSwgZG9jdW1lbnQudGl0bGUsIGhyZWYgKTtcbiAgICB9XG4gIH1cbiAgcG9zID0gKChpbml0X2luZGV4IC0gMSkgKiAxMDApICogLTE7XG4gIGVsLnRyYW5zZm9ybVBhZ2Uoc2V0dGluZ3MsIHBvcywgaW5pdF9pbmRleCk7XG5cbn1lbHNle1xuICAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgKyBcIltkYXRhLWluZGV4PScxJ11cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIilcbiAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJ2aWV3aW5nLXBhZ2UtMVwiKVxuICBpZihzZXR0aW5ncy5wYWdpbmF0aW9uID09IHRydWUpICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9JzEnXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbn1cbmlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkge1xuICAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIpLmNsaWNrKGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlX2luZGV4ID0gJCh0aGlzKS5kYXRhKFwiaW5kZXhcIik7XG4gICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKFwiYWN0aXZlXCIpKSB7XG4gICAgICBjdXJyZW50ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCIuYWN0aXZlXCIpXG4gICAgICBuZXh0ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyAocGFnZV9pbmRleCkgKyBcIiddXCIpO1xuICAgICAgaWYobmV4dCkge1xuICAgICAgICBjdXJyZW50LnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpXG4gICAgICAgIG5leHQuYWRkQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgICAgJChcIi5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYVwiICsgXCIuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIgKyBcIltkYXRhLWluZGV4PSdcIiArIChwYWdlX2luZGV4KSArIFwiJ11cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICQoXCJib2R5XCIpWzBdLmNsYXNzTmFtZSA9ICQoXCJib2R5XCIpWzBdLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJ2aWV3aW5nLXBhZ2UtXFxkLio/XFxiL2csICcnKTtcbiAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJ2aWV3aW5nLXBhZ2UtXCIrbmV4dC5kYXRhKFwiaW5kZXhcIikpXG4gICAgICB9XG4gICAgICBwb3MgPSAoKHBhZ2VfaW5kZXggLSAxKSAqIDEwMCkgKiAtMTtcbiAgICAgIGVsLnRyYW5zZm9ybVBhZ2Uoc2V0dGluZ3MsIHBvcywgcGFnZV9pbmRleCk7XG4gICAgfVxuICAgIGlmIChzZXR0aW5ncy51cGRhdGVVUkwgPT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgfSk7XG59XG5cblxuXG4kKGRvY3VtZW50KS5iaW5kKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdmFyIGRlbHRhID0gZXZlbnQub3JpZ2luYWxFdmVudC53aGVlbERlbHRhIHx8IC1ldmVudC5vcmlnaW5hbEV2ZW50LmRldGFpbDtcbiAgaW5pdF9zY3JvbGwoZXZlbnQsIGRlbHRhKTtcbn0pO1xuXG5pZihzZXR0aW5ncy5rZXlib2FyZCA9PSB0cnVlKSB7XG4gICQoZG9jdW1lbnQpLmtleWRvd24oZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YWcgPSBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgc3dpdGNoKGUud2hpY2gpIHtcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIGlmICh0YWcgIT0gJ2lucHV0JyAmJiB0YWcgIT0gJ3RleHRhcmVhJykgZWwubW92ZVVwKClcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDpcbiAgICAgICAgaWYgKHRhZyAhPSAnaW5wdXQnICYmIHRhZyAhPSAndGV4dGFyZWEnKSBlbC5tb3ZlRG93bigpXG4gICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcbn1cbnJldHVybiBmYWxzZTtcbn1cblxufSh3aW5kb3cualF1ZXJ5KTtcblxuJChcIi5uYXZpZ2F0aW9uID4gaW5wdXRcIikuY2xpY2soZnVuY3Rpb24oKXtcbiQoXCIubWFpblwiKS5qdW1wVG8oJCh0aGlzKS5kYXRhKFwidGFyZ2V0XCIpKTtcblxufSk7XG5cbiJdLCJmaWxlIjoianF1ZXJ5Lm9uZXBhZ2Utc2Nyb2xsLmpzIn0=
