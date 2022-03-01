/*
                       _ _ _____                      _   _
                      | | |  __ \                    | | (_)
    ___  ___ _ __ ___ | | | |__) |_____   _____  __ _| |  _ ___
   / __|/ __| '__/ _ \| | |  _  // _ \ \ / / _ \/ _` | | | / __|
   \__ \ (__| | | (_) | | | | \ \  __/\ V /  __/ (_| | |_| \__ \
   |___/\___|_|  \___/|_|_|_|  \_\___| \_/ \___|\__,_|_(_) |___/
                                                        _/ |
                                                       |__/

    "Declarative on-scroll reveal animations."

/*=============================================================================

    scrollReveal.js is inspired by cbpScroller.js, © 2014, Codrops.

    Licensed under the MIT license.
    http://www.opensource.org/licenses/mit-license.php

    scrollReveal.js, © 2014 https://twitter.com/julianlloyd

=============================================================================*/

;(function (window) {

  'use strict';

  var docElem = window.document.documentElement;

  function getViewportH () {
    var client = docElem['clientHeight'],
      inner = window['innerHeight'];

    return (client < inner) ? inner : client;
  }

  function getOffset (el) {
    var offsetTop = 0,
        offsetLeft = 0;

    do {
      if (!isNaN(el.offsetTop)) {
        offsetTop += el.offsetTop;
      }
      if (!isNaN(el.offsetLeft)) {
        offsetLeft += el.offsetLeft;
      }
    } while (el = el.offsetParent)

    return {
      top: offsetTop,
      left: offsetLeft
    }
  }

  function isElementInViewport (el, h) {
    var scrolled = window.pageYOffset,
        viewed = scrolled + getViewportH(),
        elH = el.offsetHeight,
        elTop = getOffset(el).top,
        elBottom = elTop + elH,
        h = h || 0;

    return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
  }

  function extend (a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }


  function scrollReveal(options) {
      this.options = extend(this.defaults, options);
      this._init();
  }



  scrollReveal.prototype = {
    defaults: {
      axis: 'y',
      distance: '25px',
      duration: '0.66s',
      delay: '0s',

  //  if 0, the element is considered in the viewport as soon as it enters
  //  if 1, the element is considered in the viewport when it's fully visible
      viewportFactor: 0.33
    },

    /*=============================================================================*/

    _init: function () {

      var self = this;

      this.elems = Array.prototype.slice.call(docElem.querySelectorAll('[data-scrollReveal]'));
      this.scrolled = false;

  //  Initialize all scrollreveals, triggering all
  //  reveals on visible elements.
      this.elems.forEach(function (el, i) {
        self.animate(el);
      });

      var scrollHandler = function () {
        if (!self.scrolled) {
          self.scrolled = true;
          setTimeout(function () {
            self._scrollPage();
          }, 60);
        }
      };

      var resizeHandler = function () {
        function delayed() {
          self._scrollPage();
          self.resizeTimeout = null;
        }
        if (self.resizeTimeout) {
          clearTimeout(self.resizeTimeout);
        }
        self.resizeTimeout = setTimeout(delayed, 200);
      };

      window.addEventListener('scroll', scrollHandler, false);
      window.addEventListener('resize', resizeHandler, false);
    },

    /*=============================================================================*/

    _scrollPage: function () {
        var self = this;

        this.elems.forEach(function (el, i) {
            if (isElementInViewport(el, self.options.viewportFactor)) {
                self.animate(el);
            }
        });
        this.scrolled = false;
    },

    /*=============================================================================*/

    parseLanguage: function (el) {

  //  Splits on a sequence of one or more commas or spaces.
      var words = el.getAttribute('data-scrollreveal').split(/[, ]+/),
          enterFrom,
          parsed = {};

      function filter (words) {
        var ret = [],

            blacklist = [
              "from",
              "the",
              "and",
              "then",
              "but"
            ];

        words.forEach(function (word, i) {
          if (blacklist.indexOf(word) > -1) {
            return;
          }
          ret.push(word);
        });

        return ret;
      }

      words = filter(words);

      words.forEach(function (word, i) {

        switch (word) {
          case "enter":
            enterFrom = words[i + 1];

            if (enterFrom == "top" || enterFrom == "bottom") {
              parsed.axis = "y";
            }

            if (enterFrom == "left" || enterFrom == "right") {
              parsed.axis = "x";
            }

            return;

          case "after":
            parsed.delay = words[i + 1];
            return;

          case "wait":
            parsed.delay = words[i + 1];
            return;

          case "move":
            parsed.distance = words[i + 1];
            return;

          case "over":
            parsed.duration = words[i + 1];
            return;

          case "trigger":
            parsed.eventName = words[i + 1];
            return;

          default:
        //  Unrecognizable words; do nothing.
            return;
        }
      });

  //  After all values are parsed, let’s make sure our our
  //  pixel distance is negative for top and left entrances.
  //
  //  ie. "move 25px from top" starts at 'top: -25px' in CSS.

      if (enterFrom == "top" || enterFrom == "left") {

        if (!typeof parsed.distance == "undefined") {
          parsed.distance = "-" + parsed.distance;
        }

        else {
          parsed.distance = "-" + this.options.distance;
        }

      }

      return parsed;
    },

    /*=============================================================================*/

    genCSS: function (el, axis) {
      var parsed = this.parseLanguage(el);

      var dist   = parsed.distance || this.options.distance,
          dur    = parsed.duration || this.options.duration,
          delay  = parsed.delay    || this.options.delay,
          axis   = parsed.axis     || this.options.axis;

      var transition = "-webkit-transition: all " + dur + " ease " + delay + ";" +
                          "-moz-transition: all " + dur + " ease " + delay + ";" +
                            "-o-transition: all " + dur + " ease " + delay + ";" +
                               "transition: all " + dur + " ease " + delay + ";";

      var initial = "-webkit-transform: translate" + axis + "(" + dist + ");" +
                       "-moz-transform: translate" + axis + "(" + dist + ");" +
                            "transform: translate" + axis + "(" + dist + ");" +
                              "opacity: 0;";

      var target = "-webkit-transform: translate" + axis + "(0);" +
                      "-moz-transform: translate" + axis + "(0);" +
                           "transform: translate" + axis + "(0);" +
                             "opacity: 1;";
      return {
        transition: transition,
        initial: initial,
        target: target,
        totalDuration: ((parseFloat(dur) + parseFloat(delay)) * 1000)
      };
    },

    /*=============================================================================*/

    animate: function (el) {
      var css = this.genCSS(el);

      if (!el.getAttribute('data-sr-init')) {
        el.setAttribute('style', css.initial);
        el.setAttribute('data-sr-init', true);
      }

      if (el.getAttribute('data-sr-complete')) {
        return;
      }

      if (isElementInViewport(el, this.options.viewportFactor)) {
        el.setAttribute('style', css.target + css.transition);

        setTimeout(function () {
          el.removeAttribute('style');
          el.setAttribute('data-sr-complete', true);
        }, css.totalDuration);
      }

    }
  }; // end scrollReveal.prototype

  document.addEventListener("DOMContentLoaded", function (evt) {
    window.scrollReveal = new scrollReveal();
  });

})(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JvbGxSZXZlYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICAgICAgICAgICAgICAgICAgICAgXyBfIF9fX19fICAgICAgICAgICAgICAgICAgICAgIF8gICBfXG4gICAgICAgICAgICAgICAgICAgICAgfCB8IHwgIF9fIFxcICAgICAgICAgICAgICAgICAgICB8IHwgKF8pXG4gICAgX19fICBfX18gXyBfXyBfX18gfCB8IHwgfF9fKSB8X19fX18gICBfX19fXyAgX18gX3wgfCAgXyBfX19cbiAgIC8gX198LyBfX3wgJ19fLyBfIFxcfCB8IHwgIF8gIC8vIF8gXFwgXFwgLyAvIF8gXFwvIF9gIHwgfCB8IC8gX198XG4gICBcXF9fIFxcIChfX3wgfCB8IChfKSB8IHwgfCB8IFxcIFxcICBfXy9cXCBWIC8gIF9fLyAoX3wgfCB8X3wgXFxfXyBcXFxuICAgfF9fXy9cXF9fX3xffCAgXFxfX18vfF98X3xffCAgXFxfXFxfX198IFxcXy8gXFxfX198XFxfXyxffF8oXykgfF9fXy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy8gfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxfXy9cblxuICAgIFwiRGVjbGFyYXRpdmUgb24tc2Nyb2xsIHJldmVhbCBhbmltYXRpb25zLlwiXG5cbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIHNjcm9sbFJldmVhbC5qcyBpcyBpbnNwaXJlZCBieSBjYnBTY3JvbGxlci5qcywgwqkgMjAxNCwgQ29kcm9wcy5cblxuICAgIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAgICBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4gICAgc2Nyb2xsUmV2ZWFsLmpzLCDCqSAyMDE0IGh0dHBzOi8vdHdpdHRlci5jb20vanVsaWFubGxveWRcblxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG47KGZ1bmN0aW9uICh3aW5kb3cpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGRvY0VsZW0gPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gIGZ1bmN0aW9uIGdldFZpZXdwb3J0SCAoKSB7XG4gICAgdmFyIGNsaWVudCA9IGRvY0VsZW1bJ2NsaWVudEhlaWdodCddLFxuICAgICAgaW5uZXIgPSB3aW5kb3dbJ2lubmVySGVpZ2h0J107XG5cbiAgICByZXR1cm4gKGNsaWVudCA8IGlubmVyKSA/IGlubmVyIDogY2xpZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0T2Zmc2V0IChlbCkge1xuICAgIHZhciBvZmZzZXRUb3AgPSAwLFxuICAgICAgICBvZmZzZXRMZWZ0ID0gMDtcblxuICAgIGRvIHtcbiAgICAgIGlmICghaXNOYU4oZWwub2Zmc2V0VG9wKSkge1xuICAgICAgICBvZmZzZXRUb3AgKz0gZWwub2Zmc2V0VG9wO1xuICAgICAgfVxuICAgICAgaWYgKCFpc05hTihlbC5vZmZzZXRMZWZ0KSkge1xuICAgICAgICBvZmZzZXRMZWZ0ICs9IGVsLm9mZnNldExlZnQ7XG4gICAgICB9XG4gICAgfSB3aGlsZSAoZWwgPSBlbC5vZmZzZXRQYXJlbnQpXG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiBvZmZzZXRUb3AsXG4gICAgICBsZWZ0OiBvZmZzZXRMZWZ0XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydCAoZWwsIGgpIHtcbiAgICB2YXIgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQsXG4gICAgICAgIHZpZXdlZCA9IHNjcm9sbGVkICsgZ2V0Vmlld3BvcnRIKCksXG4gICAgICAgIGVsSCA9IGVsLm9mZnNldEhlaWdodCxcbiAgICAgICAgZWxUb3AgPSBnZXRPZmZzZXQoZWwpLnRvcCxcbiAgICAgICAgZWxCb3R0b20gPSBlbFRvcCArIGVsSCxcbiAgICAgICAgaCA9IGggfHwgMDtcblxuICAgIHJldHVybiAoZWxUb3AgKyBlbEggKiBoKSA8PSB2aWV3ZWQgJiYgKGVsQm90dG9tKSA+PSBzY3JvbGxlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZCAoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGE7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHNjcm9sbFJldmVhbChvcHRpb25zKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBleHRlbmQodGhpcy5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuXG5cbiAgc2Nyb2xsUmV2ZWFsLnByb3RvdHlwZSA9IHtcbiAgICBkZWZhdWx0czoge1xuICAgICAgYXhpczogJ3knLFxuICAgICAgZGlzdGFuY2U6ICcyNXB4JyxcbiAgICAgIGR1cmF0aW9uOiAnMC42NnMnLFxuICAgICAgZGVsYXk6ICcwcycsXG5cbiAgLy8gIGlmIDAsIHRoZSBlbGVtZW50IGlzIGNvbnNpZGVyZWQgaW4gdGhlIHZpZXdwb3J0IGFzIHNvb24gYXMgaXQgZW50ZXJzXG4gIC8vICBpZiAxLCB0aGUgZWxlbWVudCBpcyBjb25zaWRlcmVkIGluIHRoZSB2aWV3cG9ydCB3aGVuIGl0J3MgZnVsbHkgdmlzaWJsZVxuICAgICAgdmlld3BvcnRGYWN0b3I6IDAuMzNcbiAgICB9LFxuXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbiAgICBfaW5pdDogZnVuY3Rpb24gKCkge1xuXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuZWxlbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2NFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNjcm9sbFJldmVhbF0nKSk7XG4gICAgICB0aGlzLnNjcm9sbGVkID0gZmFsc2U7XG5cbiAgLy8gIEluaXRpYWxpemUgYWxsIHNjcm9sbHJldmVhbHMsIHRyaWdnZXJpbmcgYWxsXG4gIC8vICByZXZlYWxzIG9uIHZpc2libGUgZWxlbWVudHMuXG4gICAgICB0aGlzLmVsZW1zLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgIHNlbGYuYW5pbWF0ZShlbCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyIHNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghc2VsZi5zY3JvbGxlZCkge1xuICAgICAgICAgIHNlbGYuc2Nyb2xsZWQgPSB0cnVlO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5fc2Nyb2xsUGFnZSgpO1xuICAgICAgICAgIH0sIDYwKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdmFyIHJlc2l6ZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGRlbGF5ZWQoKSB7XG4gICAgICAgICAgc2VsZi5fc2Nyb2xsUGFnZSgpO1xuICAgICAgICAgIHNlbGYucmVzaXplVGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYucmVzaXplVGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChzZWxmLnJlc2l6ZVRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoZGVsYXllZCwgMjAwKTtcbiAgICAgIH07XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplSGFuZGxlciwgZmFsc2UpO1xuICAgIH0sXG5cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuICAgIF9zY3JvbGxQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmVsZW1zLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG4gICAgICAgICAgICBpZiAoaXNFbGVtZW50SW5WaWV3cG9ydChlbCwgc2VsZi5vcHRpb25zLnZpZXdwb3J0RmFjdG9yKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuYW5pbWF0ZShlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNjcm9sbGVkID0gZmFsc2U7XG4gICAgfSxcblxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4gICAgcGFyc2VMYW5ndWFnZTogZnVuY3Rpb24gKGVsKSB7XG5cbiAgLy8gIFNwbGl0cyBvbiBhIHNlcXVlbmNlIG9mIG9uZSBvciBtb3JlIGNvbW1hcyBvciBzcGFjZXMuXG4gICAgICB2YXIgd29yZHMgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xscmV2ZWFsJykuc3BsaXQoL1ssIF0rLyksXG4gICAgICAgICAgZW50ZXJGcm9tLFxuICAgICAgICAgIHBhcnNlZCA9IHt9O1xuXG4gICAgICBmdW5jdGlvbiBmaWx0ZXIgKHdvcmRzKSB7XG4gICAgICAgIHZhciByZXQgPSBbXSxcblxuICAgICAgICAgICAgYmxhY2tsaXN0ID0gW1xuICAgICAgICAgICAgICBcImZyb21cIixcbiAgICAgICAgICAgICAgXCJ0aGVcIixcbiAgICAgICAgICAgICAgXCJhbmRcIixcbiAgICAgICAgICAgICAgXCJ0aGVuXCIsXG4gICAgICAgICAgICAgIFwiYnV0XCJcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgd29yZHMuZm9yRWFjaChmdW5jdGlvbiAod29yZCwgaSkge1xuICAgICAgICAgIGlmIChibGFja2xpc3QuaW5kZXhPZih3b3JkKSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldC5wdXNoKHdvcmQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuXG4gICAgICB3b3JkcyA9IGZpbHRlcih3b3Jkcyk7XG5cbiAgICAgIHdvcmRzLmZvckVhY2goZnVuY3Rpb24gKHdvcmQsIGkpIHtcblxuICAgICAgICBzd2l0Y2ggKHdvcmQpIHtcbiAgICAgICAgICBjYXNlIFwiZW50ZXJcIjpcbiAgICAgICAgICAgIGVudGVyRnJvbSA9IHdvcmRzW2kgKyAxXTtcblxuICAgICAgICAgICAgaWYgKGVudGVyRnJvbSA9PSBcInRvcFwiIHx8IGVudGVyRnJvbSA9PSBcImJvdHRvbVwiKSB7XG4gICAgICAgICAgICAgIHBhcnNlZC5heGlzID0gXCJ5XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbnRlckZyb20gPT0gXCJsZWZ0XCIgfHwgZW50ZXJGcm9tID09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgICBwYXJzZWQuYXhpcyA9IFwieFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICBjYXNlIFwiYWZ0ZXJcIjpcbiAgICAgICAgICAgIHBhcnNlZC5kZWxheSA9IHdvcmRzW2kgKyAxXTtcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgIGNhc2UgXCJ3YWl0XCI6XG4gICAgICAgICAgICBwYXJzZWQuZGVsYXkgPSB3b3Jkc1tpICsgMV07XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICBjYXNlIFwibW92ZVwiOlxuICAgICAgICAgICAgcGFyc2VkLmRpc3RhbmNlID0gd29yZHNbaSArIDFdO1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgY2FzZSBcIm92ZXJcIjpcbiAgICAgICAgICAgIHBhcnNlZC5kdXJhdGlvbiA9IHdvcmRzW2kgKyAxXTtcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgIGNhc2UgXCJ0cmlnZ2VyXCI6XG4gICAgICAgICAgICBwYXJzZWQuZXZlbnROYW1lID0gd29yZHNbaSArIDFdO1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gIFVucmVjb2duaXphYmxlIHdvcmRzOyBkbyBub3RoaW5nLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAvLyAgQWZ0ZXIgYWxsIHZhbHVlcyBhcmUgcGFyc2VkLCBsZXTigJlzIG1ha2Ugc3VyZSBvdXIgb3VyXG4gIC8vICBwaXhlbCBkaXN0YW5jZSBpcyBuZWdhdGl2ZSBmb3IgdG9wIGFuZCBsZWZ0IGVudHJhbmNlcy5cbiAgLy9cbiAgLy8gIGllLiBcIm1vdmUgMjVweCBmcm9tIHRvcFwiIHN0YXJ0cyBhdCAndG9wOiAtMjVweCcgaW4gQ1NTLlxuXG4gICAgICBpZiAoZW50ZXJGcm9tID09IFwidG9wXCIgfHwgZW50ZXJGcm9tID09IFwibGVmdFwiKSB7XG5cbiAgICAgICAgaWYgKCF0eXBlb2YgcGFyc2VkLmRpc3RhbmNlID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBwYXJzZWQuZGlzdGFuY2UgPSBcIi1cIiArIHBhcnNlZC5kaXN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHBhcnNlZC5kaXN0YW5jZSA9IFwiLVwiICsgdGhpcy5vcHRpb25zLmRpc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcnNlZDtcbiAgICB9LFxuXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbiAgICBnZW5DU1M6IGZ1bmN0aW9uIChlbCwgYXhpcykge1xuICAgICAgdmFyIHBhcnNlZCA9IHRoaXMucGFyc2VMYW5ndWFnZShlbCk7XG5cbiAgICAgIHZhciBkaXN0ICAgPSBwYXJzZWQuZGlzdGFuY2UgfHwgdGhpcy5vcHRpb25zLmRpc3RhbmNlLFxuICAgICAgICAgIGR1ciAgICA9IHBhcnNlZC5kdXJhdGlvbiB8fCB0aGlzLm9wdGlvbnMuZHVyYXRpb24sXG4gICAgICAgICAgZGVsYXkgID0gcGFyc2VkLmRlbGF5ICAgIHx8IHRoaXMub3B0aW9ucy5kZWxheSxcbiAgICAgICAgICBheGlzICAgPSBwYXJzZWQuYXhpcyAgICAgfHwgdGhpcy5vcHRpb25zLmF4aXM7XG5cbiAgICAgIHZhciB0cmFuc2l0aW9uID0gXCItd2Via2l0LXRyYW5zaXRpb246IGFsbCBcIiArIGR1ciArIFwiIGVhc2UgXCIgKyBkZWxheSArIFwiO1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCItbW96LXRyYW5zaXRpb246IGFsbCBcIiArIGR1ciArIFwiIGVhc2UgXCIgKyBkZWxheSArIFwiO1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIi1vLXRyYW5zaXRpb246IGFsbCBcIiArIGR1ciArIFwiIGVhc2UgXCIgKyBkZWxheSArIFwiO1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zaXRpb246IGFsbCBcIiArIGR1ciArIFwiIGVhc2UgXCIgKyBkZWxheSArIFwiO1wiO1xuXG4gICAgICB2YXIgaW5pdGlhbCA9IFwiLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVwiICsgYXhpcyArIFwiKFwiICsgZGlzdCArIFwiKTtcIiArXG4gICAgICAgICAgICAgICAgICAgICAgIFwiLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVwiICsgYXhpcyArIFwiKFwiICsgZGlzdCArIFwiKTtcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZVwiICsgYXhpcyArIFwiKFwiICsgZGlzdCArIFwiKTtcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9wYWNpdHk6IDA7XCI7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBcIi13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVcIiArIGF4aXMgKyBcIigwKTtcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCItbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlXCIgKyBheGlzICsgXCIoMCk7XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZVwiICsgYXhpcyArIFwiKDApO1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvcGFjaXR5OiAxO1wiO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcbiAgICAgICAgaW5pdGlhbDogaW5pdGlhbCxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHRvdGFsRHVyYXRpb246ICgocGFyc2VGbG9hdChkdXIpICsgcGFyc2VGbG9hdChkZWxheSkpICogMTAwMClcbiAgICAgIH07XG4gICAgfSxcblxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4gICAgYW5pbWF0ZTogZnVuY3Rpb24gKGVsKSB7XG4gICAgICB2YXIgY3NzID0gdGhpcy5nZW5DU1MoZWwpO1xuXG4gICAgICBpZiAoIWVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zci1pbml0JykpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdzdHlsZScsIGNzcy5pbml0aWFsKTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXNyLWluaXQnLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zci1jb21wbGV0ZScpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRWxlbWVudEluVmlld3BvcnQoZWwsIHRoaXMub3B0aW9ucy52aWV3cG9ydEZhY3RvcikpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdzdHlsZScsIGNzcy50YXJnZXQgKyBjc3MudHJhbnNpdGlvbik7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1zci1jb21wbGV0ZScsIHRydWUpO1xuICAgICAgICB9LCBjc3MudG90YWxEdXJhdGlvbik7XG4gICAgICB9XG5cbiAgICB9XG4gIH07IC8vIGVuZCBzY3JvbGxSZXZlYWwucHJvdG90eXBlXG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKGV2dCkge1xuICAgIHdpbmRvdy5zY3JvbGxSZXZlYWwgPSBuZXcgc2Nyb2xsUmV2ZWFsKCk7XG4gIH0pO1xuXG59KSh3aW5kb3cpOyJdLCJmaWxlIjoic2Nyb2xsUmV2ZWFsLmpzIn0=
