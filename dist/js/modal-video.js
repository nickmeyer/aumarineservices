/**
 * Modules in this bundle
 * @license
 *
 * modal-video:
 *   license: appleple
 *   author: appleple
 *   homepage: http://developer.a-blogcms.jp
 *   version: 2.4.2
 *
 * custom-event-polyfill:
 *   license: MIT (http://opensource.org/licenses/MIT)
 *   contributors: Frank Panetta, Mikhail Reenko <reenko@yandex.ru>, Joscha Feth <joscha@feth.com>
 *   homepage: https://github.com/krambuhl/custom-event-polyfill#readme
 *   version: 0.3.0
 *
 * es6-object-assign:
 *   license: MIT (http://opensource.org/licenses/MIT)
 *   author: Rubén Norte <rubennorte@gmail.com>
 *   homepage: https://github.com/rubennorte/es6-object-assign
 *   version: 1.1.0
 *
 * This header is generated by licensify (https://github.com/twada/licensify)
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ModalVideo = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}

},{}],2:[function(require,module,exports){
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

'use strict';

function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('custom-event-polyfill');

var _util = require('../lib/util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assign = require('es6-object-assign').assign;

var defaults = {
  channel: 'youtube',
  facebook: {},
  youtube: {
    autoplay: 1,
    cc_load_policy: 1,
    color: null,
    controls: 1,
    disablekb: 0,
    enablejsapi: 0,
    end: null,
    fs: 1,
    h1: null,
    iv_load_policy: 1,
    list: null,
    listType: null,
    loop: 0,
    modestbranding: null,
    mute: 0,
    origin: null,
    playlist: null,
    playsinline: null,
    rel: 0,
    showinfo: 1,
    start: 0,
    wmode: 'transparent',
    theme: 'dark',
    nocookie: false
  },
  ratio: '16:9',
  vimeo: {
    api: false,
    autopause: true,
    autoplay: true,
    byline: true,
    callback: null,
    color: null,
    controls: true,
    height: null,
    loop: false,
    maxheight: null,
    maxwidth: null,
    muted: false,
    player_id: null,
    portrait: true,
    title: true,
    width: null,
    xhtml: false
  },
  allowFullScreen: true,
  allowAutoplay: true,
  animationSpeed: 300,
  classNames: {
    modalVideo: 'modal-video',
    modalVideoClose: 'modal-video-close',
    modalVideoBody: 'modal-video-body',
    modalVideoInner: 'modal-video-inner',
    modalVideoIframeWrap: 'modal-video-movie-wrap',
    modalVideoCloseBtn: 'modal-video-close-btn'
  },
  aria: {
    openMessage: 'You just openned the modal video',
    dismissBtnMessage: 'Close the modal by clicking here'
  }
};

var ModalVideo = function () {
  function ModalVideo(ele, option) {
    var _this = this;

    _classCallCheck(this, ModalVideo);

    var opt = assign({}, defaults, option);
    var selectors = typeof ele === 'string' ? document.querySelectorAll(ele) : ele;
    var body = document.querySelector('body');
    var classNames = opt.classNames;
    var speed = opt.animationSpeed;
    [].forEach.call(selectors, function (selector) {
      selector.addEventListener('click', function (event) {
        if (selector.tagName === 'A') {
          event.preventDefault();
        }
        var videoId = selector.dataset.videoId;
        var channel = selector.dataset.channel || opt.channel;
        var id = (0, _util.getUniqId)();
        var videoUrl = selector.dataset.videoUrl || _this.getVideoUrl(opt, channel, videoId);
        var html = _this.getHtml(opt, videoUrl, id);
        (0, _util.append)(body, html);
        var modal = document.getElementById(id);
        var btn = modal.querySelector('.js-modal-video-dismiss-btn');
        modal.focus();
        modal.addEventListener('click', function () {
          (0, _util.addClass)(modal, classNames.modalVideoClose);
          setTimeout(function () {
            (0, _util.remove)(modal);
            selector.focus();
          }, speed);
        });
        modal.addEventListener('keydown', function (e) {
          if (e.which === 9) {
            e.preventDefault();
            if (document.activeElement === modal) {
              btn.focus();
            } else {
              modal.setAttribute('aria-label', '');
              modal.focus();
            }
          }
        });
        btn.addEventListener('click', function () {
          (0, _util.triggerEvent)(modal, 'click');
        });
      });
    });
  }

  _createClass(ModalVideo, [{
    key: 'getPadding',
    value: function getPadding(ratio) {
      var arr = ratio.split(':');
      var width = Number(arr[0]);
      var height = Number(arr[1]);
      var padding = height * 100 / width;
      return padding + '%';
    }
  }, {
    key: 'getQueryString',
    value: function getQueryString(obj) {
      var url = '';
      Object.keys(obj).forEach(function (key) {
        url += key + '=' + obj[key] + '&';
      });
      return url.substr(0, url.length - 1);
    }
  }, {
    key: 'getVideoUrl',
    value: function getVideoUrl(opt, channel, videoId) {
      if (channel === 'youtube') {
        return this.getYoutubeUrl(opt.youtube, videoId);
      } else if (channel === 'vimeo') {
        return this.getVimeoUrl(opt.vimeo, videoId);
      } else if (channel === 'facebook') {
        return this.getFacebookUrl(opt.facebook, videoId);
      }
      return '';
    }
  }, {
    key: 'getVimeoUrl',
    value: function getVimeoUrl(vimeo, videoId) {
      var query = this.getQueryString(vimeo);
      return '//player.vimeo.com/video/' + videoId + '?' + query;
    }
  }, {
    key: 'getYoutubeUrl',
    value: function getYoutubeUrl(youtube, videoId) {
      var query = this.getQueryString(youtube);
      if (youtube.nocookie === true) {
        return '//www.youtube-nocookie.com/embed/' + videoId + '?' + query;
      }

      return '//www.youtube.com/embed/' + videoId + '?' + query;
    }
  }, {
    key: 'getFacebookUrl',
    value: function getFacebookUrl(facebook, videoId) {
      return '//www.facebook.com/v2.10/plugins/video.php?href=https://www.facebook.com/facebook/videos/' + videoId + '&' + this.getQueryString(facebook);
    }
  }, {
    key: 'getHtml',
    value: function getHtml(opt, videoUrl, id) {
      var padding = this.getPadding(opt.ratio);
      var classNames = opt.classNames;
      return '\n      <div class="' + classNames.modalVideo + '" tabindex="-1" role="dialog" aria-label="' + opt.aria.openMessage + '" id="' + id + '">\n        <div class="' + classNames.modalVideoBody + '">\n          <div class="' + classNames.modalVideoInner + '">\n            <div class="' + classNames.modalVideoIframeWrap + '" style="padding-bottom:' + padding + '">\n              <button class="' + classNames.modalVideoCloseBtn + ' js-modal-video-dismiss-btn" aria-label="' + opt.aria.dismissBtnMessage + '"></button>\n              <iframe width=\'460\' height=\'230\' src="https:' + videoUrl + '" frameborder=\'0\' allowfullscreen=' + opt.allowFullScreen + ' tabindex="-1" ' + (opt.allowAutoplay ? 'allow="autoplay"' : '') + '/>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
    }
  }]);

  return ModalVideo;
}();

exports.default = ModalVideo;
module.exports = exports['default'];

},{"../lib/util":5,"custom-event-polyfill":1,"es6-object-assign":2}],4:[function(require,module,exports){
'use strict';

module.exports = require('./core/');

},{"./core/":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var append = exports.append = function append(element, string) {
  var div = document.createElement('div');
  div.innerHTML = string;
  while (div.children.length > 0) {
    element.appendChild(div.children[0]);
  }
};

var getUniqId = exports.getUniqId = function getUniqId() {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
};

var remove = exports.remove = function remove(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
};

var addClass = exports.addClass = function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
};

var triggerEvent = exports.triggerEvent = function triggerEvent(el, eventName, options) {
  var event = void 0;
  if (window.CustomEvent) {
    event = new CustomEvent(eventName, { cancelable: true });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, false, options);
  }
  el.dispatchEvent(event);
};

},{}]},{},[4])(4)
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtb2RhbC12aWRlby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1vZHVsZXMgaW4gdGhpcyBidW5kbGVcbiAqIEBsaWNlbnNlXG4gKlxuICogbW9kYWwtdmlkZW86XG4gKiAgIGxpY2Vuc2U6IGFwcGxlcGxlXG4gKiAgIGF1dGhvcjogYXBwbGVwbGVcbiAqICAgaG9tZXBhZ2U6IGh0dHA6Ly9kZXZlbG9wZXIuYS1ibG9nY21zLmpwXG4gKiAgIHZlcnNpb246IDIuNC4yXG4gKlxuICogY3VzdG9tLWV2ZW50LXBvbHlmaWxsOlxuICogICBsaWNlbnNlOiBNSVQgKGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQpXG4gKiAgIGNvbnRyaWJ1dG9yczogRnJhbmsgUGFuZXR0YSwgTWlraGFpbCBSZWVua28gPHJlZW5rb0B5YW5kZXgucnU+LCBKb3NjaGEgRmV0aCA8am9zY2hhQGZldGguY29tPlxuICogICBob21lcGFnZTogaHR0cHM6Ly9naXRodWIuY29tL2tyYW1idWhsL2N1c3RvbS1ldmVudC1wb2x5ZmlsbCNyZWFkbWVcbiAqICAgdmVyc2lvbjogMC4zLjBcbiAqXG4gKiBlczYtb2JqZWN0LWFzc2lnbjpcbiAqICAgbGljZW5zZTogTUlUIChodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUKVxuICogICBhdXRob3I6IFJ1YsOpbiBOb3J0ZSA8cnViZW5ub3J0ZUBnbWFpbC5jb20+XG4gKiAgIGhvbWVwYWdlOiBodHRwczovL2dpdGh1Yi5jb20vcnViZW5ub3J0ZS9lczYtb2JqZWN0LWFzc2lnblxuICogICB2ZXJzaW9uOiAxLjEuMFxuICpcbiAqIFRoaXMgaGVhZGVyIGlzIGdlbmVyYXRlZCBieSBsaWNlbnNpZnkgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2FkYS9saWNlbnNpZnkpXG4gKi9cbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLk1vZGFsVmlkZW8gPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gUG9seWZpbGwgZm9yIGNyZWF0aW5nIEN1c3RvbUV2ZW50cyBvbiBJRTkvMTAvMTFcblxuLy8gY29kZSBwdWxsZWQgZnJvbTpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kNHRvY2NoaW5pL2N1c3RvbWV2ZW50LXBvbHlmaWxsXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQjUG9seWZpbGxcblxudHJ5IHtcbiAgICB2YXIgY2UgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KCd0ZXN0Jyk7XG4gICAgY2UucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoY2UuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAvLyBJRSBoYXMgcHJvYmxlbXMgd2l0aCAucHJldmVudERlZmF1bHQoKSBvbiBjdXN0b20gZXZlbnRzXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjMzNDkxOTFcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcHJldmVudCBkZWZhdWx0Jyk7XG4gICAgfVxufSBjYXRjaChlKSB7XG4gIHZhciBDdXN0b21FdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXMpIHtcbiAgICB2YXIgZXZ0LCBvcmlnUHJldmVudDtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge1xuICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgIGRldGFpbDogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICBvcmlnUHJldmVudCA9IGV2dC5wcmV2ZW50RGVmYXVsdDtcbiAgICBldnQucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBvcmlnUHJldmVudC5jYWxsKHRoaXMpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdkZWZhdWx0UHJldmVudGVkJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICB0aGlzLmRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGV2dDtcbiAgfTtcblxuICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xuICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDsgLy8gZXhwb3NlIGRlZmluaXRpb24gdG8gd2luZG93XG59XG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb2RlIHJlZmFjdG9yZWQgZnJvbSBNb3ppbGxhIERldmVsb3BlciBOZXR3b3JrOlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgZmlyc3RTb3VyY2UpIHtcbiAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgaWYgKG5leHRTb3VyY2UgPT09IHVuZGVmaW5lZCB8fCBuZXh0U291cmNlID09PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIga2V5c0FycmF5ID0gT2JqZWN0LmtleXMoT2JqZWN0KG5leHRTb3VyY2UpKTtcbiAgICBmb3IgKHZhciBuZXh0SW5kZXggPSAwLCBsZW4gPSBrZXlzQXJyYXkubGVuZ3RoOyBuZXh0SW5kZXggPCBsZW47IG5leHRJbmRleCsrKSB7XG4gICAgICB2YXIgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuICAgICAgaWYgKGRlc2MgIT09IHVuZGVmaW5lZCAmJiBkZXNjLmVudW1lcmFibGUpIHtcbiAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdG87XG59XG5cbmZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICBpZiAoIU9iamVjdC5hc3NpZ24pIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnYXNzaWduJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBhc3NpZ25cbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXNzaWduOiBhc3NpZ24sXG4gIHBvbHlmaWxsOiBwb2x5ZmlsbFxufTtcblxufSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnJlcXVpcmUoJ2N1c3RvbS1ldmVudC1wb2x5ZmlsbCcpO1xuXG52YXIgX3V0aWwgPSByZXF1aXJlKCcuLi9saWIvdXRpbCcpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnZXM2LW9iamVjdC1hc3NpZ24nKS5hc3NpZ247XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgY2hhbm5lbDogJ3lvdXR1YmUnLFxuICBmYWNlYm9vazoge30sXG4gIHlvdXR1YmU6IHtcbiAgICBhdXRvcGxheTogMSxcbiAgICBjY19sb2FkX3BvbGljeTogMSxcbiAgICBjb2xvcjogbnVsbCxcbiAgICBjb250cm9sczogMSxcbiAgICBkaXNhYmxla2I6IDAsXG4gICAgZW5hYmxlanNhcGk6IDAsXG4gICAgZW5kOiBudWxsLFxuICAgIGZzOiAxLFxuICAgIGgxOiBudWxsLFxuICAgIGl2X2xvYWRfcG9saWN5OiAxLFxuICAgIGxpc3Q6IG51bGwsXG4gICAgbGlzdFR5cGU6IG51bGwsXG4gICAgbG9vcDogMCxcbiAgICBtb2Rlc3RicmFuZGluZzogbnVsbCxcbiAgICBtdXRlOiAwLFxuICAgIG9yaWdpbjogbnVsbCxcbiAgICBwbGF5bGlzdDogbnVsbCxcbiAgICBwbGF5c2lubGluZTogbnVsbCxcbiAgICByZWw6IDAsXG4gICAgc2hvd2luZm86IDEsXG4gICAgc3RhcnQ6IDAsXG4gICAgd21vZGU6ICd0cmFuc3BhcmVudCcsXG4gICAgdGhlbWU6ICdkYXJrJyxcbiAgICBub2Nvb2tpZTogZmFsc2VcbiAgfSxcbiAgcmF0aW86ICcxNjo5JyxcbiAgdmltZW86IHtcbiAgICBhcGk6IGZhbHNlLFxuICAgIGF1dG9wYXVzZTogdHJ1ZSxcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBieWxpbmU6IHRydWUsXG4gICAgY2FsbGJhY2s6IG51bGwsXG4gICAgY29sb3I6IG51bGwsXG4gICAgY29udHJvbHM6IHRydWUsXG4gICAgaGVpZ2h0OiBudWxsLFxuICAgIGxvb3A6IGZhbHNlLFxuICAgIG1heGhlaWdodDogbnVsbCxcbiAgICBtYXh3aWR0aDogbnVsbCxcbiAgICBtdXRlZDogZmFsc2UsXG4gICAgcGxheWVyX2lkOiBudWxsLFxuICAgIHBvcnRyYWl0OiB0cnVlLFxuICAgIHRpdGxlOiB0cnVlLFxuICAgIHdpZHRoOiBudWxsLFxuICAgIHhodG1sOiBmYWxzZVxuICB9LFxuICBhbGxvd0Z1bGxTY3JlZW46IHRydWUsXG4gIGFsbG93QXV0b3BsYXk6IHRydWUsXG4gIGFuaW1hdGlvblNwZWVkOiAzMDAsXG4gIGNsYXNzTmFtZXM6IHtcbiAgICBtb2RhbFZpZGVvOiAnbW9kYWwtdmlkZW8nLFxuICAgIG1vZGFsVmlkZW9DbG9zZTogJ21vZGFsLXZpZGVvLWNsb3NlJyxcbiAgICBtb2RhbFZpZGVvQm9keTogJ21vZGFsLXZpZGVvLWJvZHknLFxuICAgIG1vZGFsVmlkZW9Jbm5lcjogJ21vZGFsLXZpZGVvLWlubmVyJyxcbiAgICBtb2RhbFZpZGVvSWZyYW1lV3JhcDogJ21vZGFsLXZpZGVvLW1vdmllLXdyYXAnLFxuICAgIG1vZGFsVmlkZW9DbG9zZUJ0bjogJ21vZGFsLXZpZGVvLWNsb3NlLWJ0bidcbiAgfSxcbiAgYXJpYToge1xuICAgIG9wZW5NZXNzYWdlOiAnWW91IGp1c3Qgb3Blbm5lZCB0aGUgbW9kYWwgdmlkZW8nLFxuICAgIGRpc21pc3NCdG5NZXNzYWdlOiAnQ2xvc2UgdGhlIG1vZGFsIGJ5IGNsaWNraW5nIGhlcmUnXG4gIH1cbn07XG5cbnZhciBNb2RhbFZpZGVvID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNb2RhbFZpZGVvKGVsZSwgb3B0aW9uKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNb2RhbFZpZGVvKTtcblxuICAgIHZhciBvcHQgPSBhc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb24pO1xuICAgIHZhciBzZWxlY3RvcnMgPSB0eXBlb2YgZWxlID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlKSA6IGVsZTtcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICB2YXIgY2xhc3NOYW1lcyA9IG9wdC5jbGFzc05hbWVzO1xuICAgIHZhciBzcGVlZCA9IG9wdC5hbmltYXRpb25TcGVlZDtcbiAgICBbXS5mb3JFYWNoLmNhbGwoc2VsZWN0b3JzLCBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChzZWxlY3Rvci50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2aWRlb0lkID0gc2VsZWN0b3IuZGF0YXNldC52aWRlb0lkO1xuICAgICAgICB2YXIgY2hhbm5lbCA9IHNlbGVjdG9yLmRhdGFzZXQuY2hhbm5lbCB8fCBvcHQuY2hhbm5lbDtcbiAgICAgICAgdmFyIGlkID0gKDAsIF91dGlsLmdldFVuaXFJZCkoKTtcbiAgICAgICAgdmFyIHZpZGVvVXJsID0gc2VsZWN0b3IuZGF0YXNldC52aWRlb1VybCB8fCBfdGhpcy5nZXRWaWRlb1VybChvcHQsIGNoYW5uZWwsIHZpZGVvSWQpO1xuICAgICAgICB2YXIgaHRtbCA9IF90aGlzLmdldEh0bWwob3B0LCB2aWRlb1VybCwgaWQpO1xuICAgICAgICAoMCwgX3V0aWwuYXBwZW5kKShib2R5LCBodG1sKTtcbiAgICAgICAgdmFyIG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICB2YXIgYnRuID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmpzLW1vZGFsLXZpZGVvLWRpc21pc3MtYnRuJyk7XG4gICAgICAgIG1vZGFsLmZvY3VzKCk7XG4gICAgICAgIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICgwLCBfdXRpbC5hZGRDbGFzcykobW9kYWwsIGNsYXNzTmFtZXMubW9kYWxWaWRlb0Nsb3NlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICgwLCBfdXRpbC5yZW1vdmUpKG1vZGFsKTtcbiAgICAgICAgICAgIHNlbGVjdG9yLmZvY3VzKCk7XG4gICAgICAgICAgfSwgc3BlZWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKGUud2hpY2ggPT09IDkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBtb2RhbCkge1xuICAgICAgICAgICAgICBidG4uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICcnKTtcbiAgICAgICAgICAgICAgbW9kYWwuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgKDAsIF91dGlsLnRyaWdnZXJFdmVudCkobW9kYWwsICdjbGljaycpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1vZGFsVmlkZW8sIFt7XG4gICAga2V5OiAnZ2V0UGFkZGluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFBhZGRpbmcocmF0aW8pIHtcbiAgICAgIHZhciBhcnIgPSByYXRpby5zcGxpdCgnOicpO1xuICAgICAgdmFyIHdpZHRoID0gTnVtYmVyKGFyclswXSk7XG4gICAgICB2YXIgaGVpZ2h0ID0gTnVtYmVyKGFyclsxXSk7XG4gICAgICB2YXIgcGFkZGluZyA9IGhlaWdodCAqIDEwMCAvIHdpZHRoO1xuICAgICAgcmV0dXJuIHBhZGRpbmcgKyAnJSc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0UXVlcnlTdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRRdWVyeVN0cmluZyhvYmopIHtcbiAgICAgIHZhciB1cmwgPSAnJztcbiAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHVybCArPSBrZXkgKyAnPScgKyBvYmpba2V5XSArICcmJztcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHVybC5zdWJzdHIoMCwgdXJsLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFZpZGVvVXJsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmlkZW9Vcmwob3B0LCBjaGFubmVsLCB2aWRlb0lkKSB7XG4gICAgICBpZiAoY2hhbm5lbCA9PT0gJ3lvdXR1YmUnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFlvdXR1YmVVcmwob3B0LnlvdXR1YmUsIHZpZGVvSWQpO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsID09PSAndmltZW8nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFZpbWVvVXJsKG9wdC52aW1lbywgdmlkZW9JZCk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWwgPT09ICdmYWNlYm9vaycpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmFjZWJvb2tVcmwob3B0LmZhY2Vib29rLCB2aWRlb0lkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRWaW1lb1VybCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFZpbWVvVXJsKHZpbWVvLCB2aWRlb0lkKSB7XG4gICAgICB2YXIgcXVlcnkgPSB0aGlzLmdldFF1ZXJ5U3RyaW5nKHZpbWVvKTtcbiAgICAgIHJldHVybiAnLy9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLycgKyB2aWRlb0lkICsgJz8nICsgcXVlcnk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0WW91dHViZVVybCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFlvdXR1YmVVcmwoeW91dHViZSwgdmlkZW9JZCkge1xuICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5nZXRRdWVyeVN0cmluZyh5b3V0dWJlKTtcbiAgICAgIGlmICh5b3V0dWJlLm5vY29va2llID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiAnLy93d3cueW91dHViZS1ub2Nvb2tpZS5jb20vZW1iZWQvJyArIHZpZGVvSWQgKyAnPycgKyBxdWVyeTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdmlkZW9JZCArICc/JyArIHF1ZXJ5O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldEZhY2Vib29rVXJsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RmFjZWJvb2tVcmwoZmFjZWJvb2ssIHZpZGVvSWQpIHtcbiAgICAgIHJldHVybiAnLy93d3cuZmFjZWJvb2suY29tL3YyLjEwL3BsdWdpbnMvdmlkZW8ucGhwP2hyZWY9aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2ZhY2Vib29rL3ZpZGVvcy8nICsgdmlkZW9JZCArICcmJyArIHRoaXMuZ2V0UXVlcnlTdHJpbmcoZmFjZWJvb2spO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldEh0bWwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRIdG1sKG9wdCwgdmlkZW9VcmwsIGlkKSB7XG4gICAgICB2YXIgcGFkZGluZyA9IHRoaXMuZ2V0UGFkZGluZyhvcHQucmF0aW8pO1xuICAgICAgdmFyIGNsYXNzTmFtZXMgPSBvcHQuY2xhc3NOYW1lcztcbiAgICAgIHJldHVybiAnXFxuICAgICAgPGRpdiBjbGFzcz1cIicgKyBjbGFzc05hbWVzLm1vZGFsVmlkZW8gKyAnXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsPVwiJyArIG9wdC5hcmlhLm9wZW5NZXNzYWdlICsgJ1wiIGlkPVwiJyArIGlkICsgJ1wiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cIicgKyBjbGFzc05hbWVzLm1vZGFsVmlkZW9Cb2R5ICsgJ1wiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJyArIGNsYXNzTmFtZXMubW9kYWxWaWRlb0lubmVyICsgJ1wiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCInICsgY2xhc3NOYW1lcy5tb2RhbFZpZGVvSWZyYW1lV3JhcCArICdcIiBzdHlsZT1cInBhZGRpbmctYm90dG9tOicgKyBwYWRkaW5nICsgJ1wiPlxcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIicgKyBjbGFzc05hbWVzLm1vZGFsVmlkZW9DbG9zZUJ0biArICcganMtbW9kYWwtdmlkZW8tZGlzbWlzcy1idG5cIiBhcmlhLWxhYmVsPVwiJyArIG9wdC5hcmlhLmRpc21pc3NCdG5NZXNzYWdlICsgJ1wiPjwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgPGlmcmFtZSB3aWR0aD1cXCc0NjBcXCcgaGVpZ2h0PVxcJzIzMFxcJyBzcmM9XCJodHRwczonICsgdmlkZW9VcmwgKyAnXCIgZnJhbWVib3JkZXI9XFwnMFxcJyBhbGxvd2Z1bGxzY3JlZW49JyArIG9wdC5hbGxvd0Z1bGxTY3JlZW4gKyAnIHRhYmluZGV4PVwiLTFcIiAnICsgKG9wdC5hbGxvd0F1dG9wbGF5ID8gJ2FsbG93PVwiYXV0b3BsYXlcIicgOiAnJykgKyAnLz5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgJztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTW9kYWxWaWRlbztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTW9kYWxWaWRlbztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG59LHtcIi4uL2xpYi91dGlsXCI6NSxcImN1c3RvbS1ldmVudC1wb2x5ZmlsbFwiOjEsXCJlczYtb2JqZWN0LWFzc2lnblwiOjJ9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NvcmUvJyk7XG5cbn0se1wiLi9jb3JlL1wiOjN9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBhcHBlbmQgPSBleHBvcnRzLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZChlbGVtZW50LCBzdHJpbmcpIHtcbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaW5uZXJIVE1MID0gc3RyaW5nO1xuICB3aGlsZSAoZGl2LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGRpdi5jaGlsZHJlblswXSk7XG4gIH1cbn07XG5cbnZhciBnZXRVbmlxSWQgPSBleHBvcnRzLmdldFVuaXFJZCA9IGZ1bmN0aW9uIGdldFVuaXFJZCgpIHtcbiAgcmV0dXJuIChEYXRlLm5vdygpLnRvU3RyaW5nKDM2KSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA1KSkudG9VcHBlckNhc2UoKTtcbn07XG5cbnZhciByZW1vdmUgPSBleHBvcnRzLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgfVxufTtcblxudmFyIGFkZENsYXNzID0gZXhwb3J0cy5hZGRDbGFzcyA9IGZ1bmN0aW9uIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gIH1cbn07XG5cbnZhciB0cmlnZ2VyRXZlbnQgPSBleHBvcnRzLnRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uIHRyaWdnZXJFdmVudChlbCwgZXZlbnROYW1lLCBvcHRpb25zKSB7XG4gIHZhciBldmVudCA9IHZvaWQgMDtcbiAgaWYgKHdpbmRvdy5DdXN0b21FdmVudCkge1xuICAgIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgeyBjYW5jZWxhYmxlOiB0cnVlIH0pO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgZmFsc2UsIGZhbHNlLCBvcHRpb25zKTtcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn07XG5cbn0se31dfSx7fSxbNF0pKDQpXG59KTtcbiJdLCJmaWxlIjoibW9kYWwtdmlkZW8uanMifQ==