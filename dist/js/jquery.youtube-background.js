/* jquery.youtube-background v1.0.7 | Nikola Stamatovic <@stamat> | MIT */

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


//native addClass, removeClass, hasClass and toggleClass
if (!window.hasOwnProperty('d0')) {
	window.d0 = {};

	d0.hasClass = function(element, className) {
		if (element.classList) {
			return element.classList.contains(className);
		}
	    return new RegExp('\\b'+ className+'\\b').test(element.className);
	};

	d0.addClass = function(element, className) {
	    if (element.classList) {
			element.classList.add(className);
			return;
		}

		if (!d0.hasClass(element, className)) {
			element.className += ' ' + className;
		}
	};

	d0.removeClass = function(element, className) {
	    if (element.classList) {
			element.classList.remove(className);
			return;
		}

		element.className = element.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
	};

	d0.toogleClass = function(element, className) {
	    if (d0.hasClass(element, className)) {
			d0.removeClass(element, className);
		} else {
			d0.addClass(element, className);
		}
	};
}

function YoutubeBackground(elem, params, id, uid) {
	this.is_mobile = this.isMobile();

	this.element = elem;
	this.ytid = id;
	this.uid = uid;
	this.player = null;
	this.buttons = {};

	this.state = {};
	this.state.play = false;
	this.state.mute = false;

	this.params = {};

	this.defaults = {
		'pause': false, //deprecated
		'play-button': false,
		'mute-button': false,
		'autoplay': true,
		'muted': true,
		'loop': true,
		'mobile': false,
		'load-background': true,
		'resolution': '16:9',
		'offset': 200
	};

	this.__init__ = function () {
		if (!this.ytid) {
			return;
		}

		this.parseProperties(params);
		this.params.resolution_mod = this.parseResolutionString(this.params.resolution);
		this.state.playing = this.params.autoplay;
		this.state.muted = this.params.muted;

		this.buildHTML();
		this.injectIFrame();


		if (this.params['play-button']) {
			this.generateActionButton({
				name: 'play',
				className: 'play-toggle',
				innerHtml: '<i class="fa"></i>',
				initialState: false,
				stateClassName: 'paused',
				condition_parameter: 'autoplay',
				stateChildClassNames: ['fa-pause-circle', 'fa-play-circle'],
				actions: ['play', 'pause']
			});
		}

		if (this.params['mute-button']) {
			this.generateActionButton({
				name: 'mute',
				className: 'mute-toggle',
				innerHtml: '<i class="fa"></i>',
				initialState: true,
				stateClassName: 'muted',
				condition_parameter: 'muted',
				stateChildClassNames: ['fa-volume-up', 'fa-volume-mute'],
				actions: ['unmute', 'mute']
			});
		}
	}

	this.__init__();
}

YoutubeBackground.prototype.initYTPlayer = function () {
	var self = this;

	if (window.hasOwnProperty('YT')) {
		this.player = new YT.Player(this.uid, {
			events: {
				'onReady': function(event) {
					self.onVideoPlayerReady(event);
				},
				'onStateChange': function(event) {
					self.onVideoStateChange(event);
				},
				'onError' : function(event) {
					//console.error('player_api', event);
				}
			}
		});
	}
};

YoutubeBackground.prototype.onVideoPlayerReady = function (event) {
	if (this.params.autoplay) {
		event.target.playVideo();
	}
};

YoutubeBackground.prototype.onVideoStateChange = function (event) {
	if (event.data === 0 && this.params.loop) {
		event.target.playVideo();
	}

	if (event.data === -1 && this.params.autoplay) {
		event.target.playVideo();
	}

	if (event.data === 1) {
		this.iframe.style.opacity = 1;
	}
};

YoutubeBackground.prototype.parseProperties = function (params) {
	if (!params) {
		this.params = this.defaults;
	} else {
		//load in defaults
		for (var k in this.defaults) {
			if (!this.params.hasOwnProperty(k)) {
				this.params[k] = this.defaults[k];
			}
		}
	}

	// load params from data attributes
	for (var k in this.params) {
		var data = this.element.getAttribute('data-ytbg-'+k);

		if (data !== undefined && data !== null) {
			switch (data) {
				case data === 'false':
					data = false;
					break;
				case data === 'true':
					data = true;
					break;
			}

			this.params[k] = data;
		}
	}

	//pause deprecated
	if (this.params.pause) {
		this.params['play-button'] = this.params.pause;
	}
};

YoutubeBackground.prototype.injectIFrame = function () {
	this.iframe = document.createElement('iframe');
	this.iframe.setAttribute('frameborder', 0);
	this.iframe.setAttribute('allow', ['autoplay;']);
	var src = 'https://www.youtube.com/embed/'+this.ytid+'?enablejsapi=1&disablekb=1&controls=0&rel=0&iv_load_policy=3&cc_load_policy=0&playsinline=1&showinfo=0&modestbranding=1&fs=0&origin='+window.location.origin;

	if (this.params.muted) {
		src += '&mute=1';
	}

	if (this.params.autoplay) {
		src += '&autoplay=1';
	}

	if (this.params.loop) {
		src += '&loop=1';
	}

	this.iframe.src = src;

	if (this.uid) {
		this.iframe.id = this.uid;
	}

	this.iframe.style.top = '50%';
	this.iframe.style.left = '50%';
	this.iframe.style.transform = 'translateX(-50%) translateY(-50%)';
	this.iframe.style.position = 'absolute';
	this.iframe.style.opacity = 0;

	this.element.parentNode.appendChild(this.iframe);
	this.iframe.parentNode.removeChild(this.element);

	var self = this;

	function onResize() {
		var h = self.iframe.parentNode.offsetHeight + self.params.offset; // since showinfo is deprecated and ignored after September 25, 2018. we add +200 to hide it in the overflow
		var w = self.iframe.parentNode.offsetWidth + self.params.offset;
		var res = self.params.resolution_mod;

		if (res > w/h) {
			self.iframe.style.width = h*res + 'px';
			self.iframe.style.height = h + 'px';
		} else {
			self.iframe.style.width = w + 'px';
			self.iframe.style.height = w/res + 'px';
		}
	}

	window.addEventListener('resize', onResize);
	onResize();
};

YoutubeBackground.prototype.buildHTML = function () {
	var parent = this.element.parentNode;
	// wrap
	var wrapper = document.createElement('div');
	wrapper.className = 'youtube-background';
	parent.insertBefore(wrapper, this.element);
	wrapper.appendChild(this.element);
	var id = this.element.id;
	this.element.id = '';
	wrapper.id = id;

	//set css rules
	var wrapper_styles = {
		"height" : "100%",
		"width" : "100%",
		"z-index": "0",
		"position": "absolute",
		"overflow": "hidden",
		"top": 0, // added by @insad
		"left": 0,
		"bottom": 0,
		"right": 0
	};

	if (!this.params['mute-button']) {
		wrapper_styles["pointer-events"] = "none" // avoid right mouse click popup menu
	}

	if (this.params['load-background']) {
		wrapper_styles['background-image'] = 'url(https://img.youtube.com/vi/'+this.ytid+'/maxresdefault.jpg)';
		wrapper_styles['background-size'] = 'cover';
		wrapper_styles['background-repeat'] = 'no-repeat';
		wrapper_styles['background-position'] = 'center';
	}

	for (var property in wrapper_styles) {
		wrapper.style[property] = wrapper_styles[property];
	}

	wrapper.parentNode.style.position = 'relative';

	if (this.is_mobile && !this.params.mobile) {
		return wrapper;
	}

	// set play/mute controls wrap
	if (this.params['play-button'] || this.params['mute-button']) {
		var controls = document.createElement('div');
		controls.className = 'video-background-controls';

		controls.style.position = 'absolute';
		controls.style.top = '10px';
		controls.style.right = '10px';
		controls.style['z-index'] = 2;

		this.controls_element = controls;
		wrapper.parentNode.appendChild(controls);
	}

	return wrapper;
};

YoutubeBackground.prototype.play = function () {
	if (this.buttons.hasOwnProperty('play')) {
		var btn_obj = this.buttons.play;
		d0.removeClass(btn_obj.element, btn_obj.button_properties.stateClassName);
		d0.addClass(btn_obj.element.firstChild, btn_obj.button_properties.stateChildClassNames[0])
		d0.removeClass(btn_obj.element.firstChild, btn_obj.button_properties.stateChildClassNames[1]);
	}

	if (this.player) {
		this.player.playVideo();
	}
}

YoutubeBackground.prototype.pause = function () {
	if (this.buttons.hasOwnProperty('play')) {
		var btn_obj = this.buttons.play;
		d0.addClass(btn_obj.element, btn_obj.button_properties.stateClassName);
		d0.removeClass(btn_obj.element.firstChild, btn_obj.button_properties.stateChildClassNames[0])
		d0.addClass(btn_obj.element.firstChild, btn_obj.button_properties.stateChildClassNames[1]);
	}

	if (this.player) {
		this.player.pauseVideo();
	}
}

YoutubeBackground.prototype.unmute = function () {
	if (this.buttons.hasOwnProperty('mute')) {
		var btn_obj = this.buttons.mute;
		d0.removeClass(btn_obj.element, btn_obj.button_properties.stateClassName);
		d0.addClass(btn_obj.element.firstChild, btn_obj.button_properties.stateChildClassNames[0])
		d0.removeClass(btn_obj.element.firstChild, btn_obj.button_properties.stateChildClassNames[1]);
	}

	if (this.player) {
		this.player.unMute();
	}
}

YoutubeBackground.prototype.mute = function () {
	if (this.buttons.hasOwnProperty('mute')) {
		var btn_obj = this.buttons.mute;
		d0.addClass(btn_obj.element, btn_obj.button_properties.stateClassName);
		d0.removeClass(btn_obj.element.firstChild, btn_obj.button_properties.stateChildClassNames[0])
		d0.addClass(btn_obj.element.firstChild, btn_obj.button_properties.stateChildClassNames[1]);
	}

	if (this.player) {
		this.player.mute();
	}
}

//TODO: refactor states to be equal for all buttons
YoutubeBackground.prototype.generateActionButton = function (obj) {
	var btn = document.createElement('button');
	btn.className = obj.className;
	btn.innerHTML = obj.innerHtml;
	d0.addClass(btn.firstChild, obj.stateChildClassNames[0]);

	if (this.params[obj.condition_parameter] == obj.initialState) {
		d0.addClass(btn, obj.stateClassName);
		d0.removeClass(btn.firstChild, obj.stateChildClassNames[0]);
		d0.addClass(btn.firstChild, obj.stateChildClassNames[1]);
	}

	var self = this;
	btn.addEventListener('click', function(e) {
		if (d0.hasClass(this, obj.stateClassName)) {
			self.state[obj.name] = false;
			self[obj.actions[0]]();
		} else {
			self.state[obj.name] = true;
			self[obj.actions[1]]();
		}
	});

	this.buttons[obj.name] = {
		element: btn,
		button_properties: obj
	};

	this.controls_element.appendChild(btn);
};


YoutubeBackground.prototype.parseResolutionString = function (res) {
	var pts = res.split(/\s?:\s?/i);
	if (pts.length < 2) {
		return 16/9;
	}

	var w = parseInt(pts[0], 10);
	var h = parseInt(pts[1], 10);

	if (isNaN(w) || isNaN(h)) {
		return 16/9;
	}

	return w/h;
};

YoutubeBackground.prototype.isMobile = function (event) {
	var is_mobile = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) is_mobile = true;})(navigator.userAgent||navigator.vendor||window.opera);

	return is_mobile;
};

YoutubeBackground.prototype.error = function (message, value) {
	if (window.hasOwnProperty('console')
		&& window.console.hasOwnProperty('error')) {
		console.error(message, value);
	}
};

function ActivityMonitor(on_activity, on_inactivity, activity_timeout, inactivity_timeout, events) {
	this.timer = null;
	this.timeout = inactivity_timeout || 10000;
	this.activity_timer = null; //for event throttling
	this.activity_timeout = activity_timeout || 1000;
	this.last_activity = null;

	this.resetTimer = function() {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}

		var self = this;
		this.timer = setTimeout(function() {
			if (self.last_activity + self.timeout + self.activity_timeout
				>= new Date().getTime()) {
					if (on_inactivity) {
						on_inactivity();
					}
			}
		}, this.timeout);
	};

	this.logActivity = function() {
		this.last_activity = new Date().getTime();

		if (on_activity) {
			on_activity();
		}
	};

	this.onActivity = function() {
		if (!this.activity_timer) {
			var self = this;
			this.activity_timer = setTimeout(function(){
				self.logActivity();
				self.resetTimer();

				clearTimeout(self.activity_timer);
				self.activity_timer = null;
			}, this.activity_timeout);
		}
	};

	this.__init__ = function() {
		var self = this;

		if (!events) {
			events = ['click', 'mousemove', 'scroll'];
		} else {
			if (typeof events === 'string') {
				events = [events];
			}
		}

		for (var i = 0; i < events.length; i++) {
			document.addEventListener(events[i], function() {
				self.onActivity();
			});
		}
	};

	this.__init__();
}

function VideoBackgrounds(selector, params) {
	this.elements = selector;

	if (typeof selector === 'string') {
		this.elements = document.querySelectorAll(selector);
	}

	this.index = {};
	this.re = {};
	this.re.YOUTUBE = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

	this.__init__ = function () {
		for (var i = 0; i < this.elements.length; i++) {
			var element = this.elements[i];

			var link = element.getAttribute('data-youtube');
			var ytid = this.getYTID(link);
			var uid = this.generateUID(ytid);

			var yb = new YoutubeBackground(element, params, ytid, uid);

			if (!uid) {
				continue;
			}

			this.index[uid] = yb;
		}

		var self = this;

		this.initYTPlayers(function() {
			//TODO: FIX!
			if (params &&
				(params.hasOwnProperty('activity_timeout')
				|| params.hasOwnProperty('inactivity_timeout'))) {
					this.activity_monitor = new ActivityMonitor(function () {
						self.playVideos();
					}, function() {
						self.pauseVideos();
					},
					params ? params.activity_timeout : null,
					params ? params.inactivity_timeout : null,
					['mousemove', 'scroll']
				);
			}
		});
	};

	this.__init__();
}

VideoBackgrounds.prototype.getYTID = function (link) {
	if (link !== undefined && link !== null) {
		var pts = link.match(this.re.YOUTUBE);
		if (pts && pts.length) {
			this.re.YOUTUBE.lastIndex = 0; //regex needs a reset in for loops, I always forget this
			return pts[1];
		}
	}
	return null;
};

VideoBackgrounds.prototype.generateUID = function (pref) {
	//index the instance
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
	}

	var uid = pref +'-'+ getRandomIntInclusive(0, 9999);
	while (this.index.hasOwnProperty(uid)) {
		uid = pref +'-'+ getRandomIntInclusive(0, 9999);
	}

	return uid;
};

VideoBackgrounds.prototype.pauseVideos = function () {
	for (var k in this.index) {
		this.index[k].pause();
	}
};

VideoBackgrounds.prototype.playVideos = function () {
	for (var k in this.index) {
		this.index[k].play();
	}
};

VideoBackgrounds.prototype.initYTPlayers = function (callback) {
	var self = this;

	window.onYouTubeIframeAPIReady = function () {
		for (var k in self.index) {
			self.index[k].initYTPlayer();
		}

		if (callback) {
			setTimeout(callback, 100);
		}
	};

	if (window.hasOwnProperty('YT') && window.YT.loaded) {
		window.onYouTubeIframeAPIReady();
	}
};

if (window.hasOwnProperty('jQuery')) {
	(function ($) {
	    $.fn.youtube_background = function(params) {
	        var $this = $(this);
			new VideoBackgrounds(this, params);
	 		return $this;
	 	};
	})(jQuery);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkueW91dHViZS1iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGpxdWVyeS55b3V0dWJlLWJhY2tncm91bmQgdjEuMC43IHwgTmlrb2xhIFN0YW1hdG92aWMgPEBzdGFtYXQ+IHwgTUlUICovXG5cbnZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbnRhZy5zcmMgPSBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3BsYXllcl9hcGlcIjtcbnZhciBmaXJzdFNjcmlwdFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbmZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xuXG5cbi8vbmF0aXZlIGFkZENsYXNzLCByZW1vdmVDbGFzcywgaGFzQ2xhc3MgYW5kIHRvZ2dsZUNsYXNzXG5pZiAoIXdpbmRvdy5oYXNPd25Qcm9wZXJ0eSgnZDAnKSkge1xuXHR3aW5kb3cuZDAgPSB7fTtcblxuXHRkMC5oYXNDbGFzcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuXHRcdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG5cdFx0fVxuXHQgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ1xcXFxiJysgY2xhc3NOYW1lKydcXFxcYicpLnRlc3QoZWxlbWVudC5jbGFzc05hbWUpO1xuXHR9O1xuXG5cdGQwLmFkZENsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY2xhc3NOYW1lKSB7XG5cdCAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICghZDAuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuXHRcdH1cblx0fTtcblxuXHRkMC5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuXHQgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFxcXGInKyBjbGFzc05hbWUrJ1xcXFxiJywgJ2cnKSwgJycpO1xuXHR9O1xuXG5cdGQwLnRvb2dsZUNsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY2xhc3NOYW1lKSB7XG5cdCAgICBpZiAoZDAuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xuXHRcdFx0ZDAucmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZDAuYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIFlvdXR1YmVCYWNrZ3JvdW5kKGVsZW0sIHBhcmFtcywgaWQsIHVpZCkge1xuXHR0aGlzLmlzX21vYmlsZSA9IHRoaXMuaXNNb2JpbGUoKTtcblxuXHR0aGlzLmVsZW1lbnQgPSBlbGVtO1xuXHR0aGlzLnl0aWQgPSBpZDtcblx0dGhpcy51aWQgPSB1aWQ7XG5cdHRoaXMucGxheWVyID0gbnVsbDtcblx0dGhpcy5idXR0b25zID0ge307XG5cblx0dGhpcy5zdGF0ZSA9IHt9O1xuXHR0aGlzLnN0YXRlLnBsYXkgPSBmYWxzZTtcblx0dGhpcy5zdGF0ZS5tdXRlID0gZmFsc2U7XG5cblx0dGhpcy5wYXJhbXMgPSB7fTtcblxuXHR0aGlzLmRlZmF1bHRzID0ge1xuXHRcdCdwYXVzZSc6IGZhbHNlLCAvL2RlcHJlY2F0ZWRcblx0XHQncGxheS1idXR0b24nOiBmYWxzZSxcblx0XHQnbXV0ZS1idXR0b24nOiBmYWxzZSxcblx0XHQnYXV0b3BsYXknOiB0cnVlLFxuXHRcdCdtdXRlZCc6IHRydWUsXG5cdFx0J2xvb3AnOiB0cnVlLFxuXHRcdCdtb2JpbGUnOiBmYWxzZSxcblx0XHQnbG9hZC1iYWNrZ3JvdW5kJzogdHJ1ZSxcblx0XHQncmVzb2x1dGlvbic6ICcxNjo5Jyxcblx0XHQnb2Zmc2V0JzogMjAwXG5cdH07XG5cblx0dGhpcy5fX2luaXRfXyA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIXRoaXMueXRpZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMucGFyc2VQcm9wZXJ0aWVzKHBhcmFtcyk7XG5cdFx0dGhpcy5wYXJhbXMucmVzb2x1dGlvbl9tb2QgPSB0aGlzLnBhcnNlUmVzb2x1dGlvblN0cmluZyh0aGlzLnBhcmFtcy5yZXNvbHV0aW9uKTtcblx0XHR0aGlzLnN0YXRlLnBsYXlpbmcgPSB0aGlzLnBhcmFtcy5hdXRvcGxheTtcblx0XHR0aGlzLnN0YXRlLm11dGVkID0gdGhpcy5wYXJhbXMubXV0ZWQ7XG5cblx0XHR0aGlzLmJ1aWxkSFRNTCgpO1xuXHRcdHRoaXMuaW5qZWN0SUZyYW1lKCk7XG5cblxuXHRcdGlmICh0aGlzLnBhcmFtc1sncGxheS1idXR0b24nXSkge1xuXHRcdFx0dGhpcy5nZW5lcmF0ZUFjdGlvbkJ1dHRvbih7XG5cdFx0XHRcdG5hbWU6ICdwbGF5Jyxcblx0XHRcdFx0Y2xhc3NOYW1lOiAncGxheS10b2dnbGUnLFxuXHRcdFx0XHRpbm5lckh0bWw6ICc8aSBjbGFzcz1cImZhXCI+PC9pPicsXG5cdFx0XHRcdGluaXRpYWxTdGF0ZTogZmFsc2UsXG5cdFx0XHRcdHN0YXRlQ2xhc3NOYW1lOiAncGF1c2VkJyxcblx0XHRcdFx0Y29uZGl0aW9uX3BhcmFtZXRlcjogJ2F1dG9wbGF5Jyxcblx0XHRcdFx0c3RhdGVDaGlsZENsYXNzTmFtZXM6IFsnZmEtcGF1c2UtY2lyY2xlJywgJ2ZhLXBsYXktY2lyY2xlJ10sXG5cdFx0XHRcdGFjdGlvbnM6IFsncGxheScsICdwYXVzZSddXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wYXJhbXNbJ211dGUtYnV0dG9uJ10pIHtcblx0XHRcdHRoaXMuZ2VuZXJhdGVBY3Rpb25CdXR0b24oe1xuXHRcdFx0XHRuYW1lOiAnbXV0ZScsXG5cdFx0XHRcdGNsYXNzTmFtZTogJ211dGUtdG9nZ2xlJyxcblx0XHRcdFx0aW5uZXJIdG1sOiAnPGkgY2xhc3M9XCJmYVwiPjwvaT4nLFxuXHRcdFx0XHRpbml0aWFsU3RhdGU6IHRydWUsXG5cdFx0XHRcdHN0YXRlQ2xhc3NOYW1lOiAnbXV0ZWQnLFxuXHRcdFx0XHRjb25kaXRpb25fcGFyYW1ldGVyOiAnbXV0ZWQnLFxuXHRcdFx0XHRzdGF0ZUNoaWxkQ2xhc3NOYW1lczogWydmYS12b2x1bWUtdXAnLCAnZmEtdm9sdW1lLW11dGUnXSxcblx0XHRcdFx0YWN0aW9uczogWyd1bm11dGUnLCAnbXV0ZSddXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHR0aGlzLl9faW5pdF9fKCk7XG59XG5cbllvdXR1YmVCYWNrZ3JvdW5kLnByb3RvdHlwZS5pbml0WVRQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRpZiAod2luZG93Lmhhc093blByb3BlcnR5KCdZVCcpKSB7XG5cdFx0dGhpcy5wbGF5ZXIgPSBuZXcgWVQuUGxheWVyKHRoaXMudWlkLCB7XG5cdFx0XHRldmVudHM6IHtcblx0XHRcdFx0J29uUmVhZHknOiBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdHNlbGYub25WaWRlb1BsYXllclJlYWR5KGV2ZW50KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0J29uU3RhdGVDaGFuZ2UnOiBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdHNlbGYub25WaWRlb1N0YXRlQ2hhbmdlKGV2ZW50KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0J29uRXJyb3InIDogZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHQvL2NvbnNvbGUuZXJyb3IoJ3BsYXllcl9hcGknLCBldmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufTtcblxuWW91dHViZUJhY2tncm91bmQucHJvdG90eXBlLm9uVmlkZW9QbGF5ZXJSZWFkeSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRpZiAodGhpcy5wYXJhbXMuYXV0b3BsYXkpIHtcblx0XHRldmVudC50YXJnZXQucGxheVZpZGVvKCk7XG5cdH1cbn07XG5cbllvdXR1YmVCYWNrZ3JvdW5kLnByb3RvdHlwZS5vblZpZGVvU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0aWYgKGV2ZW50LmRhdGEgPT09IDAgJiYgdGhpcy5wYXJhbXMubG9vcCkge1xuXHRcdGV2ZW50LnRhcmdldC5wbGF5VmlkZW8oKTtcblx0fVxuXG5cdGlmIChldmVudC5kYXRhID09PSAtMSAmJiB0aGlzLnBhcmFtcy5hdXRvcGxheSkge1xuXHRcdGV2ZW50LnRhcmdldC5wbGF5VmlkZW8oKTtcblx0fVxuXG5cdGlmIChldmVudC5kYXRhID09PSAxKSB7XG5cdFx0dGhpcy5pZnJhbWUuc3R5bGUub3BhY2l0eSA9IDE7XG5cdH1cbn07XG5cbllvdXR1YmVCYWNrZ3JvdW5kLnByb3RvdHlwZS5wYXJzZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG5cdGlmICghcGFyYW1zKSB7XG5cdFx0dGhpcy5wYXJhbXMgPSB0aGlzLmRlZmF1bHRzO1xuXHR9IGVsc2Uge1xuXHRcdC8vbG9hZCBpbiBkZWZhdWx0c1xuXHRcdGZvciAodmFyIGsgaW4gdGhpcy5kZWZhdWx0cykge1xuXHRcdFx0aWYgKCF0aGlzLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrKSkge1xuXHRcdFx0XHR0aGlzLnBhcmFtc1trXSA9IHRoaXMuZGVmYXVsdHNba107XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gbG9hZCBwYXJhbXMgZnJvbSBkYXRhIGF0dHJpYnV0ZXNcblx0Zm9yICh2YXIgayBpbiB0aGlzLnBhcmFtcykge1xuXHRcdHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS15dGJnLScrayk7XG5cblx0XHRpZiAoZGF0YSAhPT0gdW5kZWZpbmVkICYmIGRhdGEgIT09IG51bGwpIHtcblx0XHRcdHN3aXRjaCAoZGF0YSkge1xuXHRcdFx0XHRjYXNlIGRhdGEgPT09ICdmYWxzZSc6XG5cdFx0XHRcdFx0ZGF0YSA9IGZhbHNlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIGRhdGEgPT09ICd0cnVlJzpcblx0XHRcdFx0XHRkYXRhID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wYXJhbXNba10gPSBkYXRhO1xuXHRcdH1cblx0fVxuXG5cdC8vcGF1c2UgZGVwcmVjYXRlZFxuXHRpZiAodGhpcy5wYXJhbXMucGF1c2UpIHtcblx0XHR0aGlzLnBhcmFtc1sncGxheS1idXR0b24nXSA9IHRoaXMucGFyYW1zLnBhdXNlO1xuXHR9XG59O1xuXG5Zb3V0dWJlQmFja2dyb3VuZC5wcm90b3R5cGUuaW5qZWN0SUZyYW1lID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLmlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXHR0aGlzLmlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2ZyYW1lYm9yZGVyJywgMCk7XG5cdHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3cnLCBbJ2F1dG9wbGF5OyddKTtcblx0dmFyIHNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nK3RoaXMueXRpZCsnP2VuYWJsZWpzYXBpPTEmZGlzYWJsZWtiPTEmY29udHJvbHM9MCZyZWw9MCZpdl9sb2FkX3BvbGljeT0zJmNjX2xvYWRfcG9saWN5PTAmcGxheXNpbmxpbmU9MSZzaG93aW5mbz0wJm1vZGVzdGJyYW5kaW5nPTEmZnM9MCZvcmlnaW49Jyt3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuXG5cdGlmICh0aGlzLnBhcmFtcy5tdXRlZCkge1xuXHRcdHNyYyArPSAnJm11dGU9MSc7XG5cdH1cblxuXHRpZiAodGhpcy5wYXJhbXMuYXV0b3BsYXkpIHtcblx0XHRzcmMgKz0gJyZhdXRvcGxheT0xJztcblx0fVxuXG5cdGlmICh0aGlzLnBhcmFtcy5sb29wKSB7XG5cdFx0c3JjICs9ICcmbG9vcD0xJztcblx0fVxuXG5cdHRoaXMuaWZyYW1lLnNyYyA9IHNyYztcblxuXHRpZiAodGhpcy51aWQpIHtcblx0XHR0aGlzLmlmcmFtZS5pZCA9IHRoaXMudWlkO1xuXHR9XG5cblx0dGhpcy5pZnJhbWUuc3R5bGUudG9wID0gJzUwJSc7XG5cdHRoaXMuaWZyYW1lLnN0eWxlLmxlZnQgPSAnNTAlJztcblx0dGhpcy5pZnJhbWUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKSc7XG5cdHRoaXMuaWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0dGhpcy5pZnJhbWUuc3R5bGUub3BhY2l0eSA9IDA7XG5cblx0dGhpcy5lbGVtZW50LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy5pZnJhbWUpO1xuXHR0aGlzLmlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCk7XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdGZ1bmN0aW9uIG9uUmVzaXplKCkge1xuXHRcdHZhciBoID0gc2VsZi5pZnJhbWUucGFyZW50Tm9kZS5vZmZzZXRIZWlnaHQgKyBzZWxmLnBhcmFtcy5vZmZzZXQ7IC8vIHNpbmNlIHNob3dpbmZvIGlzIGRlcHJlY2F0ZWQgYW5kIGlnbm9yZWQgYWZ0ZXIgU2VwdGVtYmVyIDI1LCAyMDE4LiB3ZSBhZGQgKzIwMCB0byBoaWRlIGl0IGluIHRoZSBvdmVyZmxvd1xuXHRcdHZhciB3ID0gc2VsZi5pZnJhbWUucGFyZW50Tm9kZS5vZmZzZXRXaWR0aCArIHNlbGYucGFyYW1zLm9mZnNldDtcblx0XHR2YXIgcmVzID0gc2VsZi5wYXJhbXMucmVzb2x1dGlvbl9tb2Q7XG5cblx0XHRpZiAocmVzID4gdy9oKSB7XG5cdFx0XHRzZWxmLmlmcmFtZS5zdHlsZS53aWR0aCA9IGgqcmVzICsgJ3B4Jztcblx0XHRcdHNlbGYuaWZyYW1lLnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZWxmLmlmcmFtZS5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuXHRcdFx0c2VsZi5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gdy9yZXMgKyAncHgnO1xuXHRcdH1cblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSk7XG5cdG9uUmVzaXplKCk7XG59O1xuXG5Zb3V0dWJlQmFja2dyb3VuZC5wcm90b3R5cGUuYnVpbGRIVE1MID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcGFyZW50ID0gdGhpcy5lbGVtZW50LnBhcmVudE5vZGU7XG5cdC8vIHdyYXBcblx0dmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0d3JhcHBlci5jbGFzc05hbWUgPSAneW91dHViZS1iYWNrZ3JvdW5kJztcblx0cGFyZW50Lmluc2VydEJlZm9yZSh3cmFwcGVyLCB0aGlzLmVsZW1lbnQpO1xuXHR3cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG5cdHZhciBpZCA9IHRoaXMuZWxlbWVudC5pZDtcblx0dGhpcy5lbGVtZW50LmlkID0gJyc7XG5cdHdyYXBwZXIuaWQgPSBpZDtcblxuXHQvL3NldCBjc3MgcnVsZXNcblx0dmFyIHdyYXBwZXJfc3R5bGVzID0ge1xuXHRcdFwiaGVpZ2h0XCIgOiBcIjEwMCVcIixcblx0XHRcIndpZHRoXCIgOiBcIjEwMCVcIixcblx0XHRcInotaW5kZXhcIjogXCIwXCIsXG5cdFx0XCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG5cdFx0XCJvdmVyZmxvd1wiOiBcImhpZGRlblwiLFxuXHRcdFwidG9wXCI6IDAsIC8vIGFkZGVkIGJ5IEBpbnNhZFxuXHRcdFwibGVmdFwiOiAwLFxuXHRcdFwiYm90dG9tXCI6IDAsXG5cdFx0XCJyaWdodFwiOiAwXG5cdH07XG5cblx0aWYgKCF0aGlzLnBhcmFtc1snbXV0ZS1idXR0b24nXSkge1xuXHRcdHdyYXBwZXJfc3R5bGVzW1wicG9pbnRlci1ldmVudHNcIl0gPSBcIm5vbmVcIiAvLyBhdm9pZCByaWdodCBtb3VzZSBjbGljayBwb3B1cCBtZW51XG5cdH1cblxuXHRpZiAodGhpcy5wYXJhbXNbJ2xvYWQtYmFja2dyb3VuZCddKSB7XG5cdFx0d3JhcHBlcl9zdHlsZXNbJ2JhY2tncm91bmQtaW1hZ2UnXSA9ICd1cmwoaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvJyt0aGlzLnl0aWQrJy9tYXhyZXNkZWZhdWx0LmpwZyknO1xuXHRcdHdyYXBwZXJfc3R5bGVzWydiYWNrZ3JvdW5kLXNpemUnXSA9ICdjb3Zlcic7XG5cdFx0d3JhcHBlcl9zdHlsZXNbJ2JhY2tncm91bmQtcmVwZWF0J10gPSAnbm8tcmVwZWF0Jztcblx0XHR3cmFwcGVyX3N0eWxlc1snYmFja2dyb3VuZC1wb3NpdGlvbiddID0gJ2NlbnRlcic7XG5cdH1cblxuXHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB3cmFwcGVyX3N0eWxlcykge1xuXHRcdHdyYXBwZXIuc3R5bGVbcHJvcGVydHldID0gd3JhcHBlcl9zdHlsZXNbcHJvcGVydHldO1xuXHR9XG5cblx0d3JhcHBlci5wYXJlbnROb2RlLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcblxuXHRpZiAodGhpcy5pc19tb2JpbGUgJiYgIXRoaXMucGFyYW1zLm1vYmlsZSkge1xuXHRcdHJldHVybiB3cmFwcGVyO1xuXHR9XG5cblx0Ly8gc2V0IHBsYXkvbXV0ZSBjb250cm9scyB3cmFwXG5cdGlmICh0aGlzLnBhcmFtc1sncGxheS1idXR0b24nXSB8fCB0aGlzLnBhcmFtc1snbXV0ZS1idXR0b24nXSkge1xuXHRcdHZhciBjb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGNvbnRyb2xzLmNsYXNzTmFtZSA9ICd2aWRlby1iYWNrZ3JvdW5kLWNvbnRyb2xzJztcblxuXHRcdGNvbnRyb2xzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRjb250cm9scy5zdHlsZS50b3AgPSAnMTBweCc7XG5cdFx0Y29udHJvbHMuc3R5bGUucmlnaHQgPSAnMTBweCc7XG5cdFx0Y29udHJvbHMuc3R5bGVbJ3otaW5kZXgnXSA9IDI7XG5cblx0XHR0aGlzLmNvbnRyb2xzX2VsZW1lbnQgPSBjb250cm9scztcblx0XHR3cmFwcGVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY29udHJvbHMpO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZXI7XG59O1xuXG5Zb3V0dWJlQmFja2dyb3VuZC5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMuYnV0dG9ucy5oYXNPd25Qcm9wZXJ0eSgncGxheScpKSB7XG5cdFx0dmFyIGJ0bl9vYmogPSB0aGlzLmJ1dHRvbnMucGxheTtcblx0XHRkMC5yZW1vdmVDbGFzcyhidG5fb2JqLmVsZW1lbnQsIGJ0bl9vYmouYnV0dG9uX3Byb3BlcnRpZXMuc3RhdGVDbGFzc05hbWUpO1xuXHRcdGQwLmFkZENsYXNzKGJ0bl9vYmouZWxlbWVudC5maXJzdENoaWxkLCBidG5fb2JqLmJ1dHRvbl9wcm9wZXJ0aWVzLnN0YXRlQ2hpbGRDbGFzc05hbWVzWzBdKVxuXHRcdGQwLnJlbW92ZUNsYXNzKGJ0bl9vYmouZWxlbWVudC5maXJzdENoaWxkLCBidG5fb2JqLmJ1dHRvbl9wcm9wZXJ0aWVzLnN0YXRlQ2hpbGRDbGFzc05hbWVzWzFdKTtcblx0fVxuXG5cdGlmICh0aGlzLnBsYXllcikge1xuXHRcdHRoaXMucGxheWVyLnBsYXlWaWRlbygpO1xuXHR9XG59XG5cbllvdXR1YmVCYWNrZ3JvdW5kLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMuYnV0dG9ucy5oYXNPd25Qcm9wZXJ0eSgncGxheScpKSB7XG5cdFx0dmFyIGJ0bl9vYmogPSB0aGlzLmJ1dHRvbnMucGxheTtcblx0XHRkMC5hZGRDbGFzcyhidG5fb2JqLmVsZW1lbnQsIGJ0bl9vYmouYnV0dG9uX3Byb3BlcnRpZXMuc3RhdGVDbGFzc05hbWUpO1xuXHRcdGQwLnJlbW92ZUNsYXNzKGJ0bl9vYmouZWxlbWVudC5maXJzdENoaWxkLCBidG5fb2JqLmJ1dHRvbl9wcm9wZXJ0aWVzLnN0YXRlQ2hpbGRDbGFzc05hbWVzWzBdKVxuXHRcdGQwLmFkZENsYXNzKGJ0bl9vYmouZWxlbWVudC5maXJzdENoaWxkLCBidG5fb2JqLmJ1dHRvbl9wcm9wZXJ0aWVzLnN0YXRlQ2hpbGRDbGFzc05hbWVzWzFdKTtcblx0fVxuXG5cdGlmICh0aGlzLnBsYXllcikge1xuXHRcdHRoaXMucGxheWVyLnBhdXNlVmlkZW8oKTtcblx0fVxufVxuXG5Zb3V0dWJlQmFja2dyb3VuZC5wcm90b3R5cGUudW5tdXRlID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodGhpcy5idXR0b25zLmhhc093blByb3BlcnR5KCdtdXRlJykpIHtcblx0XHR2YXIgYnRuX29iaiA9IHRoaXMuYnV0dG9ucy5tdXRlO1xuXHRcdGQwLnJlbW92ZUNsYXNzKGJ0bl9vYmouZWxlbWVudCwgYnRuX29iai5idXR0b25fcHJvcGVydGllcy5zdGF0ZUNsYXNzTmFtZSk7XG5cdFx0ZDAuYWRkQ2xhc3MoYnRuX29iai5lbGVtZW50LmZpcnN0Q2hpbGQsIGJ0bl9vYmouYnV0dG9uX3Byb3BlcnRpZXMuc3RhdGVDaGlsZENsYXNzTmFtZXNbMF0pXG5cdFx0ZDAucmVtb3ZlQ2xhc3MoYnRuX29iai5lbGVtZW50LmZpcnN0Q2hpbGQsIGJ0bl9vYmouYnV0dG9uX3Byb3BlcnRpZXMuc3RhdGVDaGlsZENsYXNzTmFtZXNbMV0pO1xuXHR9XG5cblx0aWYgKHRoaXMucGxheWVyKSB7XG5cdFx0dGhpcy5wbGF5ZXIudW5NdXRlKCk7XG5cdH1cbn1cblxuWW91dHViZUJhY2tncm91bmQucHJvdG90eXBlLm11dGUgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0aGlzLmJ1dHRvbnMuaGFzT3duUHJvcGVydHkoJ211dGUnKSkge1xuXHRcdHZhciBidG5fb2JqID0gdGhpcy5idXR0b25zLm11dGU7XG5cdFx0ZDAuYWRkQ2xhc3MoYnRuX29iai5lbGVtZW50LCBidG5fb2JqLmJ1dHRvbl9wcm9wZXJ0aWVzLnN0YXRlQ2xhc3NOYW1lKTtcblx0XHRkMC5yZW1vdmVDbGFzcyhidG5fb2JqLmVsZW1lbnQuZmlyc3RDaGlsZCwgYnRuX29iai5idXR0b25fcHJvcGVydGllcy5zdGF0ZUNoaWxkQ2xhc3NOYW1lc1swXSlcblx0XHRkMC5hZGRDbGFzcyhidG5fb2JqLmVsZW1lbnQuZmlyc3RDaGlsZCwgYnRuX29iai5idXR0b25fcHJvcGVydGllcy5zdGF0ZUNoaWxkQ2xhc3NOYW1lc1sxXSk7XG5cdH1cblxuXHRpZiAodGhpcy5wbGF5ZXIpIHtcblx0XHR0aGlzLnBsYXllci5tdXRlKCk7XG5cdH1cbn1cblxuLy9UT0RPOiByZWZhY3RvciBzdGF0ZXMgdG8gYmUgZXF1YWwgZm9yIGFsbCBidXR0b25zXG5Zb3V0dWJlQmFja2dyb3VuZC5wcm90b3R5cGUuZ2VuZXJhdGVBY3Rpb25CdXR0b24gPSBmdW5jdGlvbiAob2JqKSB7XG5cdHZhciBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0YnRuLmNsYXNzTmFtZSA9IG9iai5jbGFzc05hbWU7XG5cdGJ0bi5pbm5lckhUTUwgPSBvYmouaW5uZXJIdG1sO1xuXHRkMC5hZGRDbGFzcyhidG4uZmlyc3RDaGlsZCwgb2JqLnN0YXRlQ2hpbGRDbGFzc05hbWVzWzBdKTtcblxuXHRpZiAodGhpcy5wYXJhbXNbb2JqLmNvbmRpdGlvbl9wYXJhbWV0ZXJdID09IG9iai5pbml0aWFsU3RhdGUpIHtcblx0XHRkMC5hZGRDbGFzcyhidG4sIG9iai5zdGF0ZUNsYXNzTmFtZSk7XG5cdFx0ZDAucmVtb3ZlQ2xhc3MoYnRuLmZpcnN0Q2hpbGQsIG9iai5zdGF0ZUNoaWxkQ2xhc3NOYW1lc1swXSk7XG5cdFx0ZDAuYWRkQ2xhc3MoYnRuLmZpcnN0Q2hpbGQsIG9iai5zdGF0ZUNoaWxkQ2xhc3NOYW1lc1sxXSk7XG5cdH1cblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoZDAuaGFzQ2xhc3ModGhpcywgb2JqLnN0YXRlQ2xhc3NOYW1lKSkge1xuXHRcdFx0c2VsZi5zdGF0ZVtvYmoubmFtZV0gPSBmYWxzZTtcblx0XHRcdHNlbGZbb2JqLmFjdGlvbnNbMF1dKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNlbGYuc3RhdGVbb2JqLm5hbWVdID0gdHJ1ZTtcblx0XHRcdHNlbGZbb2JqLmFjdGlvbnNbMV1dKCk7XG5cdFx0fVxuXHR9KTtcblxuXHR0aGlzLmJ1dHRvbnNbb2JqLm5hbWVdID0ge1xuXHRcdGVsZW1lbnQ6IGJ0bixcblx0XHRidXR0b25fcHJvcGVydGllczogb2JqXG5cdH07XG5cblx0dGhpcy5jb250cm9sc19lbGVtZW50LmFwcGVuZENoaWxkKGJ0bik7XG59O1xuXG5cbllvdXR1YmVCYWNrZ3JvdW5kLnByb3RvdHlwZS5wYXJzZVJlc29sdXRpb25TdHJpbmcgPSBmdW5jdGlvbiAocmVzKSB7XG5cdHZhciBwdHMgPSByZXMuc3BsaXQoL1xccz86XFxzPy9pKTtcblx0aWYgKHB0cy5sZW5ndGggPCAyKSB7XG5cdFx0cmV0dXJuIDE2Lzk7XG5cdH1cblxuXHR2YXIgdyA9IHBhcnNlSW50KHB0c1swXSwgMTApO1xuXHR2YXIgaCA9IHBhcnNlSW50KHB0c1sxXSwgMTApO1xuXG5cdGlmIChpc05hTih3KSB8fCBpc05hTihoKSkge1xuXHRcdHJldHVybiAxNi85O1xuXHR9XG5cblx0cmV0dXJuIHcvaDtcbn07XG5cbllvdXR1YmVCYWNrZ3JvdW5kLnByb3RvdHlwZS5pc01vYmlsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR2YXIgaXNfbW9iaWxlID0gZmFsc2U7XG5cdChmdW5jdGlvbihhKXtpZigvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLDQpKSkgaXNfbW9iaWxlID0gdHJ1ZTt9KShuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHx3aW5kb3cub3BlcmEpO1xuXG5cdHJldHVybiBpc19tb2JpbGU7XG59O1xuXG5Zb3V0dWJlQmFja2dyb3VuZC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSwgdmFsdWUpIHtcblx0aWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eSgnY29uc29sZScpXG5cdFx0JiYgd2luZG93LmNvbnNvbGUuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykpIHtcblx0XHRjb25zb2xlLmVycm9yKG1lc3NhZ2UsIHZhbHVlKTtcblx0fVxufTtcblxuZnVuY3Rpb24gQWN0aXZpdHlNb25pdG9yKG9uX2FjdGl2aXR5LCBvbl9pbmFjdGl2aXR5LCBhY3Rpdml0eV90aW1lb3V0LCBpbmFjdGl2aXR5X3RpbWVvdXQsIGV2ZW50cykge1xuXHR0aGlzLnRpbWVyID0gbnVsbDtcblx0dGhpcy50aW1lb3V0ID0gaW5hY3Rpdml0eV90aW1lb3V0IHx8IDEwMDAwO1xuXHR0aGlzLmFjdGl2aXR5X3RpbWVyID0gbnVsbDsgLy9mb3IgZXZlbnQgdGhyb3R0bGluZ1xuXHR0aGlzLmFjdGl2aXR5X3RpbWVvdXQgPSBhY3Rpdml0eV90aW1lb3V0IHx8IDEwMDA7XG5cdHRoaXMubGFzdF9hY3Rpdml0eSA9IG51bGw7XG5cblx0dGhpcy5yZXNldFRpbWVyID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHRoaXMudGltZXIpIHtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcblx0XHRcdHRoaXMudGltZXIgPSBudWxsO1xuXHRcdH1cblxuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHR0aGlzLnRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGlmIChzZWxmLmxhc3RfYWN0aXZpdHkgKyBzZWxmLnRpbWVvdXQgKyBzZWxmLmFjdGl2aXR5X3RpbWVvdXRcblx0XHRcdFx0Pj0gbmV3IERhdGUoKS5nZXRUaW1lKCkpIHtcblx0XHRcdFx0XHRpZiAob25faW5hY3Rpdml0eSkge1xuXHRcdFx0XHRcdFx0b25faW5hY3Rpdml0eSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LCB0aGlzLnRpbWVvdXQpO1xuXHR9O1xuXG5cdHRoaXMubG9nQWN0aXZpdHkgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmxhc3RfYWN0aXZpdHkgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuXHRcdGlmIChvbl9hY3Rpdml0eSkge1xuXHRcdFx0b25fYWN0aXZpdHkoKTtcblx0XHR9XG5cdH07XG5cblx0dGhpcy5vbkFjdGl2aXR5ID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCF0aGlzLmFjdGl2aXR5X3RpbWVyKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHR0aGlzLmFjdGl2aXR5X3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRzZWxmLmxvZ0FjdGl2aXR5KCk7XG5cdFx0XHRcdHNlbGYucmVzZXRUaW1lcigpO1xuXG5cdFx0XHRcdGNsZWFyVGltZW91dChzZWxmLmFjdGl2aXR5X3RpbWVyKTtcblx0XHRcdFx0c2VsZi5hY3Rpdml0eV90aW1lciA9IG51bGw7XG5cdFx0XHR9LCB0aGlzLmFjdGl2aXR5X3RpbWVvdXQpO1xuXHRcdH1cblx0fTtcblxuXHR0aGlzLl9faW5pdF9fID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0aWYgKCFldmVudHMpIHtcblx0XHRcdGV2ZW50cyA9IFsnY2xpY2snLCAnbW91c2Vtb3ZlJywgJ3Njcm9sbCddO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodHlwZW9mIGV2ZW50cyA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0ZXZlbnRzID0gW2V2ZW50c107XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5vbkFjdGl2aXR5KCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0dGhpcy5fX2luaXRfXygpO1xufVxuXG5mdW5jdGlvbiBWaWRlb0JhY2tncm91bmRzKHNlbGVjdG9yLCBwYXJhbXMpIHtcblx0dGhpcy5lbGVtZW50cyA9IHNlbGVjdG9yO1xuXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG5cdFx0dGhpcy5lbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHR9XG5cblx0dGhpcy5pbmRleCA9IHt9O1xuXHR0aGlzLnJlID0ge307XG5cdHRoaXMucmUuWU9VVFVCRSA9IC8oPzp5b3V0dWJlXFwuY29tXFwvKD86W15cXC9dK1xcLy4rXFwvfCg/OnZ8ZSg/Om1iZWQpPylcXC98LipbPyZddj0pfHlvdXR1XFwuYmVcXC8pKFteXCImP1xcLyBdezExfSkvaTtcblxuXHR0aGlzLl9faW5pdF9fID0gZnVuY3Rpb24gKCkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzW2ldO1xuXG5cdFx0XHR2YXIgbGluayA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXlvdXR1YmUnKTtcblx0XHRcdHZhciB5dGlkID0gdGhpcy5nZXRZVElEKGxpbmspO1xuXHRcdFx0dmFyIHVpZCA9IHRoaXMuZ2VuZXJhdGVVSUQoeXRpZCk7XG5cblx0XHRcdHZhciB5YiA9IG5ldyBZb3V0dWJlQmFja2dyb3VuZChlbGVtZW50LCBwYXJhbXMsIHl0aWQsIHVpZCk7XG5cblx0XHRcdGlmICghdWlkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmluZGV4W3VpZF0gPSB5Yjtcblx0XHR9XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHR0aGlzLmluaXRZVFBsYXllcnMoZnVuY3Rpb24oKSB7XG5cdFx0XHQvL1RPRE86IEZJWCFcblx0XHRcdGlmIChwYXJhbXMgJiZcblx0XHRcdFx0KHBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnYWN0aXZpdHlfdGltZW91dCcpXG5cdFx0XHRcdHx8IHBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnaW5hY3Rpdml0eV90aW1lb3V0JykpKSB7XG5cdFx0XHRcdFx0dGhpcy5hY3Rpdml0eV9tb25pdG9yID0gbmV3IEFjdGl2aXR5TW9uaXRvcihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnBsYXlWaWRlb3MoKTtcblx0XHRcdFx0XHR9LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHNlbGYucGF1c2VWaWRlb3MoKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBhcmFtcyA/IHBhcmFtcy5hY3Rpdml0eV90aW1lb3V0IDogbnVsbCxcblx0XHRcdFx0XHRwYXJhbXMgPyBwYXJhbXMuaW5hY3Rpdml0eV90aW1lb3V0IDogbnVsbCxcblx0XHRcdFx0XHRbJ21vdXNlbW92ZScsICdzY3JvbGwnXVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdHRoaXMuX19pbml0X18oKTtcbn1cblxuVmlkZW9CYWNrZ3JvdW5kcy5wcm90b3R5cGUuZ2V0WVRJRCA9IGZ1bmN0aW9uIChsaW5rKSB7XG5cdGlmIChsaW5rICE9PSB1bmRlZmluZWQgJiYgbGluayAhPT0gbnVsbCkge1xuXHRcdHZhciBwdHMgPSBsaW5rLm1hdGNoKHRoaXMucmUuWU9VVFVCRSk7XG5cdFx0aWYgKHB0cyAmJiBwdHMubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLnJlLllPVVRVQkUubGFzdEluZGV4ID0gMDsgLy9yZWdleCBuZWVkcyBhIHJlc2V0IGluIGZvciBsb29wcywgSSBhbHdheXMgZm9yZ2V0IHRoaXNcblx0XHRcdHJldHVybiBwdHNbMV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuVmlkZW9CYWNrZ3JvdW5kcy5wcm90b3R5cGUuZ2VuZXJhdGVVSUQgPSBmdW5jdGlvbiAocHJlZikge1xuXHQvL2luZGV4IHRoZSBpbnN0YW5jZVxuXHRmdW5jdGlvbiBnZXRSYW5kb21JbnRJbmNsdXNpdmUobWluLCBtYXgpIHtcblx0XHRtaW4gPSBNYXRoLmNlaWwobWluKTtcblx0XHRtYXggPSBNYXRoLmZsb29yKG1heCk7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47IC8vVGhlIG1heGltdW0gaXMgaW5jbHVzaXZlIGFuZCB0aGUgbWluaW11bSBpcyBpbmNsdXNpdmVcblx0fVxuXG5cdHZhciB1aWQgPSBwcmVmICsnLScrIGdldFJhbmRvbUludEluY2x1c2l2ZSgwLCA5OTk5KTtcblx0d2hpbGUgKHRoaXMuaW5kZXguaGFzT3duUHJvcGVydHkodWlkKSkge1xuXHRcdHVpZCA9IHByZWYgKyctJysgZ2V0UmFuZG9tSW50SW5jbHVzaXZlKDAsIDk5OTkpO1xuXHR9XG5cblx0cmV0dXJuIHVpZDtcbn07XG5cblZpZGVvQmFja2dyb3VuZHMucHJvdG90eXBlLnBhdXNlVmlkZW9zID0gZnVuY3Rpb24gKCkge1xuXHRmb3IgKHZhciBrIGluIHRoaXMuaW5kZXgpIHtcblx0XHR0aGlzLmluZGV4W2tdLnBhdXNlKCk7XG5cdH1cbn07XG5cblZpZGVvQmFja2dyb3VuZHMucHJvdG90eXBlLnBsYXlWaWRlb3MgPSBmdW5jdGlvbiAoKSB7XG5cdGZvciAodmFyIGsgaW4gdGhpcy5pbmRleCkge1xuXHRcdHRoaXMuaW5kZXhba10ucGxheSgpO1xuXHR9XG59O1xuXG5WaWRlb0JhY2tncm91bmRzLnByb3RvdHlwZS5pbml0WVRQbGF5ZXJzID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHR3aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Zm9yICh2YXIgayBpbiBzZWxmLmluZGV4KSB7XG5cdFx0XHRzZWxmLmluZGV4W2tdLmluaXRZVFBsYXllcigpO1xuXHRcdH1cblxuXHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0c2V0VGltZW91dChjYWxsYmFjaywgMTAwKTtcblx0XHR9XG5cdH07XG5cblx0aWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eSgnWVQnKSAmJiB3aW5kb3cuWVQubG9hZGVkKSB7XG5cdFx0d2luZG93Lm9uWW91VHViZUlmcmFtZUFQSVJlYWR5KCk7XG5cdH1cbn07XG5cbmlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoJ2pRdWVyeScpKSB7XG5cdChmdW5jdGlvbiAoJCkge1xuXHQgICAgJC5mbi55b3V0dWJlX2JhY2tncm91bmQgPSBmdW5jdGlvbihwYXJhbXMpIHtcblx0ICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0bmV3IFZpZGVvQmFja2dyb3VuZHModGhpcywgcGFyYW1zKTtcblx0IFx0XHRyZXR1cm4gJHRoaXM7XG5cdCBcdH07XG5cdH0pKGpRdWVyeSk7XG59XG4iXSwiZmlsZSI6ImpxdWVyeS55b3V0dWJlLWJhY2tncm91bmQuanMifQ==
