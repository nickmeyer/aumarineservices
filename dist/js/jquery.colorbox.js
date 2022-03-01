/*!
	jQuery Colorbox v1.4.6 - 2013-03-28
	(c) 2013 Jack Moore - jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($, document, window) {
	var
	// Default settings object.
	// See http://jacklmoore.com/colorbox for details.
	defaults = {
		transition: "elastic",
		speed: 300,
		width: false,
		initialWidth: "600",
		innerWidth: false,
		maxWidth: false,
		height: false,
		initialHeight: "450",
		innerHeight: false,
		maxHeight: false,
		scalePhotos: true,
		scrolling: true,
		inline: false,
		html: false,
		iframe: false,
		fastIframe: true,
		photo: false,
		href: false,
		title: false,
		rel: false,
		opacity: 0.9,
		preloading: true,
		className: false,
		
		// alternate image paths for high-res displays
		retinaImage: false,
		retinaUrl: false,
		retinaSuffix: '@2x.$1',

		// internationalization
		current: "image {current} of {total}",
		previous: "previous",
		next: "next",
		close: "close",
		xhrError: "This content failed to load.",
		imgError: "This image failed to load.",

		open: false,
		returnFocus: true,
		reposition: true,
		loop: true,
		slideshow: false,
		slideshowAuto: true,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i,

		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false,
		overlayClose: true,
		escKey: true,
		arrowKey: true,
		top: false,
		bottom: false,
		left: false,
		right: false,
		fixed: false,
		data: undefined
	},
	
	// Abstracting the HTML and event identifiers for easy rebranding
	colorbox = 'colorbox',
	prefix = 'cbox',
	boxElement = prefix + 'Element',
	
	// Events
	event_open = prefix + '_open',
	event_load = prefix + '_load',
	event_complete = prefix + '_complete',
	event_cleanup = prefix + '_cleanup',
	event_closed = prefix + '_closed',
	event_purge = prefix + '_purge',
	
	// Special Handling for IE
	isIE = !$.support.leadingWhitespace, // IE6 to IE8
	isIE6 = isIE && !window.XMLHttpRequest, // IE6
	event_ie6 = prefix + '_IE6',

	// Cached jQuery Object Variables
	$overlay,
	$box,
	$wrap,
	$content,
	$topBorder,
	$leftBorder,
	$rightBorder,
	$bottomBorder,
	$related,
	$window,
	$loaded,
	$loadingBay,
	$loadingOverlay,
	$title,
	$current,
	$slideshow,
	$next,
	$prev,
	$close,
	$groupControls,
	$events = $('<a/>'),
	
	// Variables for cached values or use across multiple functions
	settings,
	interfaceHeight,
	interfaceWidth,
	loadedHeight,
	loadedWidth,
	element,
	index,
	photo,
	open,
	active,
	closing,
	loadingTimer,
	publicMethod,
	div = "div",
	className,
	requests = 0,
	init;

	// ****************
	// HELPER FUNCTIONS
	// ****************
	
	// Convience function for creating new jQuery objects
	function $tag(tag, id, css) {
		var element = document.createElement(tag);

		if (id) {
			element.id = prefix + id;
		}

		if (css) {
			element.style.cssText = css;
		}

		return $(element);
	}
	
	// Get the window height using innerHeight when available to avoid an issue with iOS
	// http://bugs.jquery.com/ticket/6724
	function winheight() {
		return window.innerHeight ? window.innerHeight : $(window).height();
	}

	// Determine the next and previous members in a group.
	function getIndex(increment) {
		var
		max = $related.length,
		newIndex = (index + increment) % max;
		
		return (newIndex < 0) ? max + newIndex : newIndex;
	}

	// Convert '%' and 'px' values to integers
	function setSize(size, dimension) {
		return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : winheight()) / 100) : 1) * parseInt(size, 10));
	}
	
	// Checks an href to see if it is a photo.
	// There is a force photo option (photo: true) for hrefs that cannot be matched by the regex.
	function isImage(settings, url) {
		return settings.photo || settings.photoRegex.test(url);
	}

	function retinaUrl(settings, url) {
		return settings.retinaUrl && window.devicePixelRatio > 1 ? url.replace(settings.photoRegex, settings.retinaSuffix) : url;
	}

	function trapFocus(e) {
		if ('contains' in $box[0] && !$box[0].contains(e.target)) {
			e.stopPropagation();
			$box.focus();
		}
	}

	// Assigns function results to their respective properties
	function makeSettings() {
		var i,
			data = $.data(element, colorbox);
		
		if (data == null) {
			settings = $.extend({}, defaults);
			if (console && console.log) {
				console.log('Error: cboxElement missing settings object');
			}
		} else {
			settings = $.extend({}, data);
		}
		
		for (i in settings) {
			if ($.isFunction(settings[i]) && i.slice(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
				settings[i] = settings[i].call(element);
			}
		}
		
		settings.rel = settings.rel || element.rel || $(element).data('rel') || 'nofollow';
		settings.href = settings.href || $(element).attr('href');
		settings.title = settings.title || element.title;
		
		if (typeof settings.href === "string") {
			settings.href = $.trim(settings.href);
		}
	}

	function trigger(event, callback) {
		// for external use
		$(document).trigger(event);

		// for internal use
		$events.trigger(event);

		if ($.isFunction(callback)) {
			callback.call(element);
		}
	}

	// Slideshow functionality
	function slideshow() {
		var
		timeOut,
		className = prefix + "Slideshow_",
		click = "click." + prefix,
		clear,
		set,
		start,
		stop;
		
		if (settings.slideshow && $related[1]) {
			clear = function () {
				clearTimeout(timeOut);
			};

			set = function () {
				if (settings.loop || $related[index + 1]) {
					timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
				}
			};

			start = function () {
				$slideshow
					.html(settings.slideshowStop)
					.unbind(click)
					.one(click, stop);

				$events
					.bind(event_complete, set)
					.bind(event_load, clear)
					.bind(event_cleanup, stop);

				$box.removeClass(className + "off").addClass(className + "on");
			};
			
			stop = function () {
				clear();
				
				$events
					.unbind(event_complete, set)
					.unbind(event_load, clear)
					.unbind(event_cleanup, stop);
				
				$slideshow
					.html(settings.slideshowStart)
					.unbind(click)
					.one(click, function () {
						publicMethod.next();
						start();
					});

				$box.removeClass(className + "on").addClass(className + "off");
			};
			
			if (settings.slideshowAuto) {
				start();
			} else {
				stop();
			}
		} else {
			$box.removeClass(className + "off " + className + "on");
		}
	}

	function launch(target) {
		if (!closing) {
			
			element = target;
			
			makeSettings();
			
			$related = $(element);
			
			index = 0;
			
			if (settings.rel !== 'nofollow') {
				$related = $('.' + boxElement).filter(function () {
					var data = $.data(this, colorbox),
						relRelated;

					if (data) {
						relRelated =  $(this).data('rel') || data.rel || this.rel;
					}
					
					return (relRelated === settings.rel);
				});
				index = $related.index(element);
				
				// Check direct calls to Colorbox.
				if (index === -1) {
					$related = $related.add(element);
					index = $related.length - 1;
				}
			}
			
			$overlay.css({
				opacity: parseFloat(settings.opacity),
				cursor: settings.overlayClose ? "pointer" : "auto",
				visibility: 'visible'
			}).show();
			

			if (className) {
				$box.add($overlay).removeClass(className);
			}
			if (settings.className) {
				$box.add($overlay).addClass(settings.className);
			}
			className = settings.className;

			$close.html(settings.close).show();

			if (!open) {
				open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
				
				// Show colorbox so the sizes can be calculated in older versions of jQuery
				$box.css({visibility:'hidden', display:'block'});
				
				$loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden').appendTo($content);

				// Cache values needed for size calculations
				interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
				interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
				loadedHeight = $loaded.outerHeight(true);
				loadedWidth = $loaded.outerWidth(true);
				
				
				// Opens inital empty Colorbox prior to content being loaded.
				settings.w = setSize(settings.initialWidth, 'x');
				settings.h = setSize(settings.initialHeight, 'y');
				publicMethod.position();

				if (isIE6) {
					$window.bind('resize.' + event_ie6 + ' scroll.' + event_ie6, function () {
						$overlay.css({width: $window.width(), height: winheight(), top: $window.scrollTop(), left: $window.scrollLeft()});
					}).trigger('resize.' + event_ie6);
				}
				
				slideshow();

				trigger(event_open, settings.onOpen);
				
				$groupControls.add($title).hide();

				$box.focus();
				
				// Confine focus to the modal
				// Uses event capturing that is not supported in IE8-
				if (document.addEventListener) {

					document.addEventListener('focus', trapFocus, true);
					
					$events.one(event_closed, function () {
						document.removeEventListener('focus', trapFocus, true);
					});
				}

				// Return focus on closing
				if (settings.returnFocus) {
					$events.one(event_closed, function () {
						$(element).focus();
					});
				}
			}
			
			load();
		}
	}

	// Colorbox's markup needs to be added to the DOM prior to being called
	// so that the browser will go ahead and load the CSS background images.
	function appendHTML() {
		if (!$box && document.body) {
			init = false;

			$window = $(window);
			$box = $tag(div).attr({
				id: colorbox,
				'class': isIE ? prefix + (isIE6 ? 'IE6' : 'IE') : '',
				role: 'dialog',
				tabindex: '-1'
			}).hide();
			$overlay = $tag(div, "Overlay", isIE6 ? 'position:absolute' : '').hide();
			$loadingOverlay = $tag(div, "LoadingOverlay").add($tag(div, "LoadingGraphic"));
			$wrap = $tag(div, "Wrapper");
			$content = $tag(div, "Content").append(
				$title = $tag(div, "Title"),
				$current = $tag(div, "Current"),
				$prev = $tag('button', "Previous"),
				$next = $tag('button', "Next"),
				$slideshow = $tag('button', "Slideshow"),
				$loadingOverlay,
				$close = $tag('button', "Close")
			);
			
			$wrap.append( // The 3x3 Grid that makes up Colorbox
				$tag(div).append(
					$tag(div, "TopLeft"),
					$topBorder = $tag(div, "TopCenter"),
					$tag(div, "TopRight")
				),
				$tag(div, false, 'clear:left').append(
					$leftBorder = $tag(div, "MiddleLeft"),
					$content,
					$rightBorder = $tag(div, "MiddleRight")
				),
				$tag(div, false, 'clear:left').append(
					$tag(div, "BottomLeft"),
					$bottomBorder = $tag(div, "BottomCenter"),
					$tag(div, "BottomRight")
				)
			).find('div div').css({'float': 'left'});
			
			$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none');
			
			$groupControls = $next.add($prev).add($current).add($slideshow);

			$(document.body).append($overlay, $box.append($wrap, $loadingBay));
		}
	}

	// Add Colorbox's event bindings
	function addBindings() {
		function clickHandler(e) {
			// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
			// See: http://jacklmoore.com/notes/click-events/
			if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.control)) {
				e.preventDefault();
				launch(this);
			}
		}

		if ($box) {
			if (!init) {
				init = true;

				// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
				$next.click(function () {
					publicMethod.next();
				});
				$prev.click(function () {
					publicMethod.prev();
				});
				$close.click(function () {
					publicMethod.close();
				});
				$overlay.click(function () {
					if (settings.overlayClose) {
						publicMethod.close();
					}
				});
				
				// Key Bindings
				$(document).bind('keydown.' + prefix, function (e) {
					var key = e.keyCode;
					if (open && settings.escKey && key === 27) {
						e.preventDefault();
						publicMethod.close();
					}
					if (open && settings.arrowKey && $related[1] && !e.altKey) {
						if (key === 37) {
							e.preventDefault();
							$prev.click();
						} else if (key === 39) {
							e.preventDefault();
							$next.click();
						}
					}
				});

				if ($.isFunction($.fn.on)) {
					// For jQuery 1.7+
					$(document).on('click.'+prefix, '.'+boxElement, clickHandler);
				} else {
					// For jQuery 1.3.x -> 1.6.x
					// This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
					// This is not here for jQuery 1.9, it's here for legacy users.
					$('.'+boxElement).live('click.'+prefix, clickHandler);
				}
			}
			return true;
		}
		return false;
	}

	// Don't do anything if Colorbox already exists.
	if ($.colorbox) {
		return;
	}

	// Append the HTML when the DOM loads
	$(appendHTML);


	// ****************
	// PUBLIC FUNCTIONS
	// Usage format: $.colorbox.close();
	// Usage from within an iframe: parent.jQuery.colorbox.close();
	// ****************
	
	publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
		var $this = this;
		
		options = options || {};
		
		appendHTML();

		if (addBindings()) {
			if ($.isFunction($this)) { // assume a call to $.colorbox
				$this = $('<a/>');
				options.open = true;
			} else if (!$this[0]) { // colorbox being applied to empty collection
				return $this;
			}
			
			if (callback) {
				options.onComplete = callback;
			}
			
			$this.each(function () {
				$.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options));
			}).addClass(boxElement);
			
			if (($.isFunction(options.open) && options.open.call($this)) || options.open) {
				launch($this[0]);
			}
		}
		
		return $this;
	};

	publicMethod.position = function (speed, loadedCallback) {
		var
		css,
		top = 0,
		left = 0,
		offset = $box.offset(),
		scrollTop,
		scrollLeft;
		
		$window.unbind('resize.' + prefix);

		// remove the modal so that it doesn't influence the document width/height
		$box.css({top: -9e4, left: -9e4});

		scrollTop = $window.scrollTop();
		scrollLeft = $window.scrollLeft();

		if (settings.fixed && !isIE6) {
			offset.top -= scrollTop;
			offset.left -= scrollLeft;
			$box.css({position: 'fixed'});
		} else {
			top = scrollTop;
			left = scrollLeft;
			$box.css({position: 'absolute'});
		}

		// keeps the top and left positions within the browser's viewport.
		if (settings.right !== false) {
			left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.right, 'x'), 0);
		} else if (settings.left !== false) {
			left += setSize(settings.left, 'x');
		} else {
			left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
		}
		
		if (settings.bottom !== false) {
			top += Math.max(winheight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.bottom, 'y'), 0);
		} else if (settings.top !== false) {
			top += setSize(settings.top, 'y');
		} else {
			top += Math.round(Math.max(winheight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
		}

		$box.css({top: offset.top, left: offset.left, visibility:'visible'});

		// setting the speed to 0 to reduce the delay between same-sized content.
		speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed || 0;
		
		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		// it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";
		
		function modalDimensions(that) {
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt(that.style.width,10) - interfaceWidth)+'px';
			$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt(that.style.height,10) - interfaceHeight)+'px';
		}

		css = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};

		if(speed===0){ // temporary workaround to side-step jQuery-UI 1.8 bug (http://bugs.jquery.com/ticket/12273)
			$box.css(css);
		}
		$box.dequeue().animate(css, {
			duration: speed,
			complete: function () {
				modalDimensions(this);
				
				active = false;
				
				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
				
				if (settings.reposition) {
					setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
						$window.bind('resize.' + prefix, publicMethod.position);
					}, 1);
				}

				if (loadedCallback) {
					loadedCallback();
				}
			},
			step: function () {
				modalDimensions(this);
			}
		});
	};

	publicMethod.resize = function (options) {
		if (open) {
			options = options || {};
			
			if (options.width) {
				settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
			}
			if (options.innerWidth) {
				settings.w = setSize(options.innerWidth, 'x');
			}
			$loaded.css({width: settings.w});
			
			if (options.height) {
				settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
			}
			if (options.innerHeight) {
				settings.h = setSize(options.innerHeight, 'y');
			}
			if (!options.innerHeight && !options.height) {
				$loaded.css({height: "auto"});
				settings.h = $loaded.height();
			}
			$loaded.css({height: settings.h});
			
			publicMethod.position(settings.transition === "none" ? 0 : settings.speed);
		}
	};

	publicMethod.prep = function (object) {
		if (!open) {
			return;
		}
		
		var callback, speed = settings.transition === "none" ? 0 : settings.speed;

		$loaded.empty().remove(); // Using empty first may prevent some IE7 issues.

		$loaded = $tag(div, 'LoadedContent').append(object);
		
		function getWidth() {
			settings.w = settings.w || $loaded.width();
			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
			return settings.w;
		}
		function getHeight() {
			settings.h = settings.h || $loaded.height();
			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
			return settings.h;
		}
		
		$loaded.hide()
		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
		.css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);
		
		$loadingBay.hide();
		
		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
		
		$(photo).css({'float': 'none'});

		callback = function () {
			var total = $related.length,
				iframe,
				frameBorder = 'frameBorder',
				allowTransparency = 'allowTransparency',
				complete;
			
			if (!open) {
				return;
			}
			
			function removeFilter() {
				if (isIE) {
					$box[0].style.removeAttribute('filter');
				}
			}
			
			complete = function () {
				clearTimeout(loadingTimer);
				$loadingOverlay.hide();
				trigger(event_complete, settings.onComplete);
			};
			
			if (isIE) {
				//This fadeIn helps the bicubic resampling to kick-in.
				if (photo) {
					$loaded.fadeIn(100);
				}
			}
			
			$title.html(settings.title).add($loaded).show();
			
			if (total > 1) { // handle grouping
				if (typeof settings.current === "string") {
					$current.html(settings.current.replace('{current}', index + 1).replace('{total}', total)).show();
				}
				
				$next[(settings.loop || index < total - 1) ? "show" : "hide"]().html(settings.next);
				$prev[(settings.loop || index) ? "show" : "hide"]().html(settings.previous);
				
				if (settings.slideshow) {
					$slideshow.show();
				}
				
				// Preloads images within a rel group
				if (settings.preloading) {
					$.each([getIndex(-1), getIndex(1)], function(){
						var src,
							img,
							i = $related[this],
							data = $.data(i, colorbox);

						if (data && data.href) {
							src = data.href;
							if ($.isFunction(src)) {
								src = src.call(i);
							}
						} else {
							src = $(i).attr('href');
						}

						if (src && isImage(data, src)) {
							src = retinaUrl(data, src);
							img = new Image();
							img.src = src;
						}
					});
				}
			} else {
				$groupControls.hide();
			}
			
			if (settings.iframe) {
				iframe = $tag('iframe')[0];
				
				if (frameBorder in iframe) {
					iframe[frameBorder] = 0;
				}
				
				if (allowTransparency in iframe) {
					iframe[allowTransparency] = "true";
				}

				if (!settings.scrolling) {
					iframe.scrolling = "no";
				}
				
				$(iframe)
					.attr({
						src: settings.href,
						name: (new Date()).getTime(), // give the iframe a unique name to prevent caching
						'class': prefix + 'Iframe',
						allowFullScreen : true, // allow HTML5 video to go fullscreen
						webkitAllowFullScreen : true,
						mozallowfullscreen : true
					})
					.one('load', complete)
					.appendTo($loaded);
				
				$events.one(event_purge, function () {
					iframe.src = "//about:blank";
				});

				if (settings.fastIframe) {
					$(iframe).trigger('load');
				}
			} else {
				complete();
			}
			
			if (settings.transition === 'fade') {
				$box.fadeTo(speed, 1, removeFilter);
			} else {
				removeFilter();
			}
		};
		
		if (settings.transition === 'fade') {
			$box.fadeTo(speed, 0, function () {
				publicMethod.position(0, callback);
			});
		} else {
			publicMethod.position(speed, callback);
		}
	};

	function load () {
		var href, setResize, prep = publicMethod.prep, $inline, request = ++requests;
		
		active = true;
		
		photo = false;
		
		element = $related[index];
		
		makeSettings();
		
		trigger(event_purge);
		
		trigger(event_load, settings.onLoad);
		
		settings.h = settings.height ?
				setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
				settings.innerHeight && setSize(settings.innerHeight, 'y');
		
		settings.w = settings.width ?
				setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
				settings.innerWidth && setSize(settings.innerWidth, 'x');
		
		// Sets the minimum dimensions for use in image scaling
		settings.mw = settings.w;
		settings.mh = settings.h;
		
		// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
		// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
		if (settings.maxWidth) {
			settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
		}
		if (settings.maxHeight) {
			settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
		}
		
		href = settings.href;
		
		loadingTimer = setTimeout(function () {
			$loadingOverlay.show();
		}, 100);
		
		if (settings.inline) {
			// Inserts an empty placeholder where inline content is being pulled from.
			// An event is bound to put inline content back when Colorbox closes or loads new content.
			$inline = $tag(div).hide().insertBefore($(href)[0]);

			$events.one(event_purge, function () {
				$inline.replaceWith($loaded.children());
			});

			prep($(href));
		} else if (settings.iframe) {
			// IFrame element won't be added to the DOM until it is ready to be displayed,
			// to avoid problems with DOM-ready JS that might be trying to run in that iframe.
			prep(" ");
		} else if (settings.html) {
			prep(settings.html);
		} else if (isImage(settings, href)) {

			href = retinaUrl(settings, href);

			$(photo = new Image())
			.addClass(prefix + 'Photo')
			.bind('error',function () {
				settings.title = false;
				prep($tag(div, 'Error').html(settings.imgError));
			})
			.one('load', function () {
				var percent;

				if (request !== requests) {
					return;
				}

				if (settings.retinaImage && window.devicePixelRatio > 1) {
					photo.height = photo.height / window.devicePixelRatio;
					photo.width = photo.width / window.devicePixelRatio;
				}

				if (settings.scalePhotos) {
					setResize = function () {
						photo.height -= photo.height * percent;
						photo.width -= photo.width * percent;
					};
					if (settings.mw && photo.width > settings.mw) {
						percent = (photo.width - settings.mw) / photo.width;
						setResize();
					}
					if (settings.mh && photo.height > settings.mh) {
						percent = (photo.height - settings.mh) / photo.height;
						setResize();
					}
				}
				
				if (settings.h) {
					photo.style.marginTop = Math.max(settings.mh - photo.height, 0) / 2 + 'px';
				}
				
				if ($related[1] && (settings.loop || $related[index + 1])) {
					photo.style.cursor = 'pointer';
					photo.onclick = function () {
						publicMethod.next();
					};
				}
				
				if (isIE) {
					photo.style.msInterpolationMode = 'bicubic';
				}
				
				setTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.
					prep(photo);
				}, 1);
			});
			
			setTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.
				photo.src = href;
			}, 1);
		} else if (href) {
			$loadingBay.load(href, settings.data, function (data, status) {
				if (request === requests) {
					prep(status === 'error' ? $tag(div, 'Error').html(settings.xhrError) : $(this).contents());
				}
			});
		}
	}
		
	// Navigates to the next page/image in a set.
	publicMethod.next = function () {
		if (!active && $related[1] && (settings.loop || $related[index + 1])) {
			index = getIndex(1);
			launch($related[index]);
		}
	};
	
	publicMethod.prev = function () {
		if (!active && $related[1] && (settings.loop || index)) {
			index = getIndex(-1);
			launch($related[index]);
		}
	};

	// Note: to use this within an iframe use the following format: parent.jQuery.colorbox.close();
	publicMethod.close = function () {
		if (open && !closing) {
			
			closing = true;
			
			open = false;
			
			trigger(event_cleanup, settings.onCleanup);
			
			$window.unbind('.' + prefix + ' .' + event_ie6);
			
			$overlay.fadeTo(200, 0);
			
			$box.stop().fadeTo(300, 0, function () {
			
				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
				
				trigger(event_purge);
				
				$loaded.empty().remove(); // Using empty first may prevent some IE7 issues.
				
				setTimeout(function () {
					closing = false;
					trigger(event_closed, settings.onClosed);
				}, 1);
			});
		}
	};

	// Removes changes Colorbox made to the document, but does not remove the plugin
	// from jQuery.
	publicMethod.remove = function () {
		$([]).add($box).add($overlay).remove();
		$box = null;
		$('.' + boxElement)
			.removeData(colorbox)
			.removeClass(boxElement);

		$(document).unbind('click.'+prefix);
	};

	// A method for fetching the current element Colorbox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $(element);
	};

	publicMethod.settings = defaults;

}(jQuery, document, window));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkuY29sb3Jib3guanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG5cdGpRdWVyeSBDb2xvcmJveCB2MS40LjYgLSAyMDEzLTAzLTI4XG5cdChjKSAyMDEzIEphY2sgTW9vcmUgLSBqYWNrbG1vb3JlLmNvbS9jb2xvcmJveFxuXHRsaWNlbnNlOiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuKi9cbihmdW5jdGlvbiAoJCwgZG9jdW1lbnQsIHdpbmRvdykge1xuXHR2YXJcblx0Ly8gRGVmYXVsdCBzZXR0aW5ncyBvYmplY3QuXG5cdC8vIFNlZSBodHRwOi8vamFja2xtb29yZS5jb20vY29sb3Jib3ggZm9yIGRldGFpbHMuXG5cdGRlZmF1bHRzID0ge1xuXHRcdHRyYW5zaXRpb246IFwiZWxhc3RpY1wiLFxuXHRcdHNwZWVkOiAzMDAsXG5cdFx0d2lkdGg6IGZhbHNlLFxuXHRcdGluaXRpYWxXaWR0aDogXCI2MDBcIixcblx0XHRpbm5lcldpZHRoOiBmYWxzZSxcblx0XHRtYXhXaWR0aDogZmFsc2UsXG5cdFx0aGVpZ2h0OiBmYWxzZSxcblx0XHRpbml0aWFsSGVpZ2h0OiBcIjQ1MFwiLFxuXHRcdGlubmVySGVpZ2h0OiBmYWxzZSxcblx0XHRtYXhIZWlnaHQ6IGZhbHNlLFxuXHRcdHNjYWxlUGhvdG9zOiB0cnVlLFxuXHRcdHNjcm9sbGluZzogdHJ1ZSxcblx0XHRpbmxpbmU6IGZhbHNlLFxuXHRcdGh0bWw6IGZhbHNlLFxuXHRcdGlmcmFtZTogZmFsc2UsXG5cdFx0ZmFzdElmcmFtZTogdHJ1ZSxcblx0XHRwaG90bzogZmFsc2UsXG5cdFx0aHJlZjogZmFsc2UsXG5cdFx0dGl0bGU6IGZhbHNlLFxuXHRcdHJlbDogZmFsc2UsXG5cdFx0b3BhY2l0eTogMC45LFxuXHRcdHByZWxvYWRpbmc6IHRydWUsXG5cdFx0Y2xhc3NOYW1lOiBmYWxzZSxcblx0XHRcblx0XHQvLyBhbHRlcm5hdGUgaW1hZ2UgcGF0aHMgZm9yIGhpZ2gtcmVzIGRpc3BsYXlzXG5cdFx0cmV0aW5hSW1hZ2U6IGZhbHNlLFxuXHRcdHJldGluYVVybDogZmFsc2UsXG5cdFx0cmV0aW5hU3VmZml4OiAnQDJ4LiQxJyxcblxuXHRcdC8vIGludGVybmF0aW9uYWxpemF0aW9uXG5cdFx0Y3VycmVudDogXCJpbWFnZSB7Y3VycmVudH0gb2Yge3RvdGFsfVwiLFxuXHRcdHByZXZpb3VzOiBcInByZXZpb3VzXCIsXG5cdFx0bmV4dDogXCJuZXh0XCIsXG5cdFx0Y2xvc2U6IFwiY2xvc2VcIixcblx0XHR4aHJFcnJvcjogXCJUaGlzIGNvbnRlbnQgZmFpbGVkIHRvIGxvYWQuXCIsXG5cdFx0aW1nRXJyb3I6IFwiVGhpcyBpbWFnZSBmYWlsZWQgdG8gbG9hZC5cIixcblxuXHRcdG9wZW46IGZhbHNlLFxuXHRcdHJldHVybkZvY3VzOiB0cnVlLFxuXHRcdHJlcG9zaXRpb246IHRydWUsXG5cdFx0bG9vcDogdHJ1ZSxcblx0XHRzbGlkZXNob3c6IGZhbHNlLFxuXHRcdHNsaWRlc2hvd0F1dG86IHRydWUsXG5cdFx0c2xpZGVzaG93U3BlZWQ6IDI1MDAsXG5cdFx0c2xpZGVzaG93U3RhcnQ6IFwic3RhcnQgc2xpZGVzaG93XCIsXG5cdFx0c2xpZGVzaG93U3RvcDogXCJzdG9wIHNsaWRlc2hvd1wiLFxuXHRcdHBob3RvUmVnZXg6IC9cXC4oZ2lmfHBuZ3xqcChlfGd8ZWcpfGJtcHxpY28pKCgjfFxcPykuKik/JC9pLFxuXG5cdFx0b25PcGVuOiBmYWxzZSxcblx0XHRvbkxvYWQ6IGZhbHNlLFxuXHRcdG9uQ29tcGxldGU6IGZhbHNlLFxuXHRcdG9uQ2xlYW51cDogZmFsc2UsXG5cdFx0b25DbG9zZWQ6IGZhbHNlLFxuXHRcdG92ZXJsYXlDbG9zZTogdHJ1ZSxcblx0XHRlc2NLZXk6IHRydWUsXG5cdFx0YXJyb3dLZXk6IHRydWUsXG5cdFx0dG9wOiBmYWxzZSxcblx0XHRib3R0b206IGZhbHNlLFxuXHRcdGxlZnQ6IGZhbHNlLFxuXHRcdHJpZ2h0OiBmYWxzZSxcblx0XHRmaXhlZDogZmFsc2UsXG5cdFx0ZGF0YTogdW5kZWZpbmVkXG5cdH0sXG5cdFxuXHQvLyBBYnN0cmFjdGluZyB0aGUgSFRNTCBhbmQgZXZlbnQgaWRlbnRpZmllcnMgZm9yIGVhc3kgcmVicmFuZGluZ1xuXHRjb2xvcmJveCA9ICdjb2xvcmJveCcsXG5cdHByZWZpeCA9ICdjYm94Jyxcblx0Ym94RWxlbWVudCA9IHByZWZpeCArICdFbGVtZW50Jyxcblx0XG5cdC8vIEV2ZW50c1xuXHRldmVudF9vcGVuID0gcHJlZml4ICsgJ19vcGVuJyxcblx0ZXZlbnRfbG9hZCA9IHByZWZpeCArICdfbG9hZCcsXG5cdGV2ZW50X2NvbXBsZXRlID0gcHJlZml4ICsgJ19jb21wbGV0ZScsXG5cdGV2ZW50X2NsZWFudXAgPSBwcmVmaXggKyAnX2NsZWFudXAnLFxuXHRldmVudF9jbG9zZWQgPSBwcmVmaXggKyAnX2Nsb3NlZCcsXG5cdGV2ZW50X3B1cmdlID0gcHJlZml4ICsgJ19wdXJnZScsXG5cdFxuXHQvLyBTcGVjaWFsIEhhbmRsaW5nIGZvciBJRVxuXHRpc0lFID0gISQuc3VwcG9ydC5sZWFkaW5nV2hpdGVzcGFjZSwgLy8gSUU2IHRvIElFOFxuXHRpc0lFNiA9IGlzSUUgJiYgIXdpbmRvdy5YTUxIdHRwUmVxdWVzdCwgLy8gSUU2XG5cdGV2ZW50X2llNiA9IHByZWZpeCArICdfSUU2JyxcblxuXHQvLyBDYWNoZWQgalF1ZXJ5IE9iamVjdCBWYXJpYWJsZXNcblx0JG92ZXJsYXksXG5cdCRib3gsXG5cdCR3cmFwLFxuXHQkY29udGVudCxcblx0JHRvcEJvcmRlcixcblx0JGxlZnRCb3JkZXIsXG5cdCRyaWdodEJvcmRlcixcblx0JGJvdHRvbUJvcmRlcixcblx0JHJlbGF0ZWQsXG5cdCR3aW5kb3csXG5cdCRsb2FkZWQsXG5cdCRsb2FkaW5nQmF5LFxuXHQkbG9hZGluZ092ZXJsYXksXG5cdCR0aXRsZSxcblx0JGN1cnJlbnQsXG5cdCRzbGlkZXNob3csXG5cdCRuZXh0LFxuXHQkcHJldixcblx0JGNsb3NlLFxuXHQkZ3JvdXBDb250cm9scyxcblx0JGV2ZW50cyA9ICQoJzxhLz4nKSxcblx0XG5cdC8vIFZhcmlhYmxlcyBmb3IgY2FjaGVkIHZhbHVlcyBvciB1c2UgYWNyb3NzIG11bHRpcGxlIGZ1bmN0aW9uc1xuXHRzZXR0aW5ncyxcblx0aW50ZXJmYWNlSGVpZ2h0LFxuXHRpbnRlcmZhY2VXaWR0aCxcblx0bG9hZGVkSGVpZ2h0LFxuXHRsb2FkZWRXaWR0aCxcblx0ZWxlbWVudCxcblx0aW5kZXgsXG5cdHBob3RvLFxuXHRvcGVuLFxuXHRhY3RpdmUsXG5cdGNsb3NpbmcsXG5cdGxvYWRpbmdUaW1lcixcblx0cHVibGljTWV0aG9kLFxuXHRkaXYgPSBcImRpdlwiLFxuXHRjbGFzc05hbWUsXG5cdHJlcXVlc3RzID0gMCxcblx0aW5pdDtcblxuXHQvLyAqKioqKioqKioqKioqKioqXG5cdC8vIEhFTFBFUiBGVU5DVElPTlNcblx0Ly8gKioqKioqKioqKioqKioqKlxuXHRcblx0Ly8gQ29udmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBuZXcgalF1ZXJ5IG9iamVjdHNcblx0ZnVuY3Rpb24gJHRhZyh0YWcsIGlkLCBjc3MpIHtcblx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuXHRcdGlmIChpZCkge1xuXHRcdFx0ZWxlbWVudC5pZCA9IHByZWZpeCArIGlkO1xuXHRcdH1cblxuXHRcdGlmIChjc3MpIHtcblx0XHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGNzcztcblx0XHR9XG5cblx0XHRyZXR1cm4gJChlbGVtZW50KTtcblx0fVxuXHRcblx0Ly8gR2V0IHRoZSB3aW5kb3cgaGVpZ2h0IHVzaW5nIGlubmVySGVpZ2h0IHdoZW4gYXZhaWxhYmxlIHRvIGF2b2lkIGFuIGlzc3VlIHdpdGggaU9TXG5cdC8vIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzY3MjRcblx0ZnVuY3Rpb24gd2luaGVpZ2h0KCkge1xuXHRcdHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cdH1cblxuXHQvLyBEZXRlcm1pbmUgdGhlIG5leHQgYW5kIHByZXZpb3VzIG1lbWJlcnMgaW4gYSBncm91cC5cblx0ZnVuY3Rpb24gZ2V0SW5kZXgoaW5jcmVtZW50KSB7XG5cdFx0dmFyXG5cdFx0bWF4ID0gJHJlbGF0ZWQubGVuZ3RoLFxuXHRcdG5ld0luZGV4ID0gKGluZGV4ICsgaW5jcmVtZW50KSAlIG1heDtcblx0XHRcblx0XHRyZXR1cm4gKG5ld0luZGV4IDwgMCkgPyBtYXggKyBuZXdJbmRleCA6IG5ld0luZGV4O1xuXHR9XG5cblx0Ly8gQ29udmVydCAnJScgYW5kICdweCcgdmFsdWVzIHRvIGludGVnZXJzXG5cdGZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgZGltZW5zaW9uKSB7XG5cdFx0cmV0dXJuIE1hdGgucm91bmQoKC8lLy50ZXN0KHNpemUpID8gKChkaW1lbnNpb24gPT09ICd4JyA/ICR3aW5kb3cud2lkdGgoKSA6IHdpbmhlaWdodCgpKSAvIDEwMCkgOiAxKSAqIHBhcnNlSW50KHNpemUsIDEwKSk7XG5cdH1cblx0XG5cdC8vIENoZWNrcyBhbiBocmVmIHRvIHNlZSBpZiBpdCBpcyBhIHBob3RvLlxuXHQvLyBUaGVyZSBpcyBhIGZvcmNlIHBob3RvIG9wdGlvbiAocGhvdG86IHRydWUpIGZvciBocmVmcyB0aGF0IGNhbm5vdCBiZSBtYXRjaGVkIGJ5IHRoZSByZWdleC5cblx0ZnVuY3Rpb24gaXNJbWFnZShzZXR0aW5ncywgdXJsKSB7XG5cdFx0cmV0dXJuIHNldHRpbmdzLnBob3RvIHx8IHNldHRpbmdzLnBob3RvUmVnZXgudGVzdCh1cmwpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmV0aW5hVXJsKHNldHRpbmdzLCB1cmwpIHtcblx0XHRyZXR1cm4gc2V0dGluZ3MucmV0aW5hVXJsICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSA/IHVybC5yZXBsYWNlKHNldHRpbmdzLnBob3RvUmVnZXgsIHNldHRpbmdzLnJldGluYVN1ZmZpeCkgOiB1cmw7XG5cdH1cblxuXHRmdW5jdGlvbiB0cmFwRm9jdXMoZSkge1xuXHRcdGlmICgnY29udGFpbnMnIGluICRib3hbMF0gJiYgISRib3hbMF0uY29udGFpbnMoZS50YXJnZXQpKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0JGJveC5mb2N1cygpO1xuXHRcdH1cblx0fVxuXG5cdC8vIEFzc2lnbnMgZnVuY3Rpb24gcmVzdWx0cyB0byB0aGVpciByZXNwZWN0aXZlIHByb3BlcnRpZXNcblx0ZnVuY3Rpb24gbWFrZVNldHRpbmdzKCkge1xuXHRcdHZhciBpLFxuXHRcdFx0ZGF0YSA9ICQuZGF0YShlbGVtZW50LCBjb2xvcmJveCk7XG5cdFx0XG5cdFx0aWYgKGRhdGEgPT0gbnVsbCkge1xuXHRcdFx0c2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMpO1xuXHRcdFx0aWYgKGNvbnNvbGUgJiYgY29uc29sZS5sb2cpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yOiBjYm94RWxlbWVudCBtaXNzaW5nIHNldHRpbmdzIG9iamVjdCcpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkYXRhKTtcblx0XHR9XG5cdFx0XG5cdFx0Zm9yIChpIGluIHNldHRpbmdzKSB7XG5cdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKHNldHRpbmdzW2ldKSAmJiBpLnNsaWNlKDAsIDIpICE9PSAnb24nKSB7IC8vIGNoZWNrcyB0byBtYWtlIHN1cmUgdGhlIGZ1bmN0aW9uIGlzbid0IG9uZSBvZiB0aGUgY2FsbGJhY2tzLCB0aGV5IHdpbGwgYmUgaGFuZGxlZCBhdCB0aGUgYXBwcm9wcmlhdGUgdGltZS5cblx0XHRcdFx0c2V0dGluZ3NbaV0gPSBzZXR0aW5nc1tpXS5jYWxsKGVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRzZXR0aW5ncy5yZWwgPSBzZXR0aW5ncy5yZWwgfHwgZWxlbWVudC5yZWwgfHwgJChlbGVtZW50KS5kYXRhKCdyZWwnKSB8fCAnbm9mb2xsb3cnO1xuXHRcdHNldHRpbmdzLmhyZWYgPSBzZXR0aW5ncy5ocmVmIHx8ICQoZWxlbWVudCkuYXR0cignaHJlZicpO1xuXHRcdHNldHRpbmdzLnRpdGxlID0gc2V0dGluZ3MudGl0bGUgfHwgZWxlbWVudC50aXRsZTtcblx0XHRcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzLmhyZWYgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHNldHRpbmdzLmhyZWYgPSAkLnRyaW0oc2V0dGluZ3MuaHJlZik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdHJpZ2dlcihldmVudCwgY2FsbGJhY2spIHtcblx0XHQvLyBmb3IgZXh0ZXJuYWwgdXNlXG5cdFx0JChkb2N1bWVudCkudHJpZ2dlcihldmVudCk7XG5cblx0XHQvLyBmb3IgaW50ZXJuYWwgdXNlXG5cdFx0JGV2ZW50cy50cmlnZ2VyKGV2ZW50KTtcblxuXHRcdGlmICgkLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG5cdFx0XHRjYWxsYmFjay5jYWxsKGVsZW1lbnQpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFNsaWRlc2hvdyBmdW5jdGlvbmFsaXR5XG5cdGZ1bmN0aW9uIHNsaWRlc2hvdygpIHtcblx0XHR2YXJcblx0XHR0aW1lT3V0LFxuXHRcdGNsYXNzTmFtZSA9IHByZWZpeCArIFwiU2xpZGVzaG93X1wiLFxuXHRcdGNsaWNrID0gXCJjbGljay5cIiArIHByZWZpeCxcblx0XHRjbGVhcixcblx0XHRzZXQsXG5cdFx0c3RhcnQsXG5cdFx0c3RvcDtcblx0XHRcblx0XHRpZiAoc2V0dGluZ3Muc2xpZGVzaG93ICYmICRyZWxhdGVkWzFdKSB7XG5cdFx0XHRjbGVhciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVPdXQpO1xuXHRcdFx0fTtcblxuXHRcdFx0c2V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoc2V0dGluZ3MubG9vcCB8fCAkcmVsYXRlZFtpbmRleCArIDFdKSB7XG5cdFx0XHRcdFx0dGltZU91dCA9IHNldFRpbWVvdXQocHVibGljTWV0aG9kLm5leHQsIHNldHRpbmdzLnNsaWRlc2hvd1NwZWVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0c3RhcnQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCRzbGlkZXNob3dcblx0XHRcdFx0XHQuaHRtbChzZXR0aW5ncy5zbGlkZXNob3dTdG9wKVxuXHRcdFx0XHRcdC51bmJpbmQoY2xpY2spXG5cdFx0XHRcdFx0Lm9uZShjbGljaywgc3RvcCk7XG5cblx0XHRcdFx0JGV2ZW50c1xuXHRcdFx0XHRcdC5iaW5kKGV2ZW50X2NvbXBsZXRlLCBzZXQpXG5cdFx0XHRcdFx0LmJpbmQoZXZlbnRfbG9hZCwgY2xlYXIpXG5cdFx0XHRcdFx0LmJpbmQoZXZlbnRfY2xlYW51cCwgc3RvcCk7XG5cblx0XHRcdFx0JGJveC5yZW1vdmVDbGFzcyhjbGFzc05hbWUgKyBcIm9mZlwiKS5hZGRDbGFzcyhjbGFzc05hbWUgKyBcIm9uXCIpO1xuXHRcdFx0fTtcblx0XHRcdFxuXHRcdFx0c3RvcCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y2xlYXIoKTtcblx0XHRcdFx0XG5cdFx0XHRcdCRldmVudHNcblx0XHRcdFx0XHQudW5iaW5kKGV2ZW50X2NvbXBsZXRlLCBzZXQpXG5cdFx0XHRcdFx0LnVuYmluZChldmVudF9sb2FkLCBjbGVhcilcblx0XHRcdFx0XHQudW5iaW5kKGV2ZW50X2NsZWFudXAsIHN0b3ApO1xuXHRcdFx0XHRcblx0XHRcdFx0JHNsaWRlc2hvd1xuXHRcdFx0XHRcdC5odG1sKHNldHRpbmdzLnNsaWRlc2hvd1N0YXJ0KVxuXHRcdFx0XHRcdC51bmJpbmQoY2xpY2spXG5cdFx0XHRcdFx0Lm9uZShjbGljaywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cHVibGljTWV0aG9kLm5leHQoKTtcblx0XHRcdFx0XHRcdHN0YXJ0KCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JGJveC5yZW1vdmVDbGFzcyhjbGFzc05hbWUgKyBcIm9uXCIpLmFkZENsYXNzKGNsYXNzTmFtZSArIFwib2ZmXCIpO1xuXHRcdFx0fTtcblx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLnNsaWRlc2hvd0F1dG8pIHtcblx0XHRcdFx0c3RhcnQoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN0b3AoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0JGJveC5yZW1vdmVDbGFzcyhjbGFzc05hbWUgKyBcIm9mZiBcIiArIGNsYXNzTmFtZSArIFwib25cIik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gbGF1bmNoKHRhcmdldCkge1xuXHRcdGlmICghY2xvc2luZykge1xuXHRcdFx0XG5cdFx0XHRlbGVtZW50ID0gdGFyZ2V0O1xuXHRcdFx0XG5cdFx0XHRtYWtlU2V0dGluZ3MoKTtcblx0XHRcdFxuXHRcdFx0JHJlbGF0ZWQgPSAkKGVsZW1lbnQpO1xuXHRcdFx0XG5cdFx0XHRpbmRleCA9IDA7XG5cdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5yZWwgIT09ICdub2ZvbGxvdycpIHtcblx0XHRcdFx0JHJlbGF0ZWQgPSAkKCcuJyArIGJveEVsZW1lbnQpLmZpbHRlcihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGRhdGEgPSAkLmRhdGEodGhpcywgY29sb3Jib3gpLFxuXHRcdFx0XHRcdFx0cmVsUmVsYXRlZDtcblxuXHRcdFx0XHRcdGlmIChkYXRhKSB7XG5cdFx0XHRcdFx0XHRyZWxSZWxhdGVkID0gICQodGhpcykuZGF0YSgncmVsJykgfHwgZGF0YS5yZWwgfHwgdGhpcy5yZWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiAocmVsUmVsYXRlZCA9PT0gc2V0dGluZ3MucmVsKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGluZGV4ID0gJHJlbGF0ZWQuaW5kZXgoZWxlbWVudCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDaGVjayBkaXJlY3QgY2FsbHMgdG8gQ29sb3Jib3guXG5cdFx0XHRcdGlmIChpbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0XHQkcmVsYXRlZCA9ICRyZWxhdGVkLmFkZChlbGVtZW50KTtcblx0XHRcdFx0XHRpbmRleCA9ICRyZWxhdGVkLmxlbmd0aCAtIDE7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0JG92ZXJsYXkuY3NzKHtcblx0XHRcdFx0b3BhY2l0eTogcGFyc2VGbG9hdChzZXR0aW5ncy5vcGFjaXR5KSxcblx0XHRcdFx0Y3Vyc29yOiBzZXR0aW5ncy5vdmVybGF5Q2xvc2UgPyBcInBvaW50ZXJcIiA6IFwiYXV0b1wiLFxuXHRcdFx0XHR2aXNpYmlsaXR5OiAndmlzaWJsZSdcblx0XHRcdH0pLnNob3coKTtcblx0XHRcdFxuXG5cdFx0XHRpZiAoY2xhc3NOYW1lKSB7XG5cdFx0XHRcdCRib3guYWRkKCRvdmVybGF5KS5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHNldHRpbmdzLmNsYXNzTmFtZSkge1xuXHRcdFx0XHQkYm94LmFkZCgkb3ZlcmxheSkuYWRkQ2xhc3Moc2V0dGluZ3MuY2xhc3NOYW1lKTtcblx0XHRcdH1cblx0XHRcdGNsYXNzTmFtZSA9IHNldHRpbmdzLmNsYXNzTmFtZTtcblxuXHRcdFx0JGNsb3NlLmh0bWwoc2V0dGluZ3MuY2xvc2UpLnNob3coKTtcblxuXHRcdFx0aWYgKCFvcGVuKSB7XG5cdFx0XHRcdG9wZW4gPSBhY3RpdmUgPSB0cnVlOyAvLyBQcmV2ZW50cyB0aGUgcGFnZS1jaGFuZ2UgYWN0aW9uIGZyb20gcXVldWluZyB1cCBpZiB0aGUgdmlzaXRvciBob2xkcyBkb3duIHRoZSBsZWZ0IG9yIHJpZ2h0IGtleXMuXG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBTaG93IGNvbG9yYm94IHNvIHRoZSBzaXplcyBjYW4gYmUgY2FsY3VsYXRlZCBpbiBvbGRlciB2ZXJzaW9ucyBvZiBqUXVlcnlcblx0XHRcdFx0JGJveC5jc3Moe3Zpc2liaWxpdHk6J2hpZGRlbicsIGRpc3BsYXk6J2Jsb2NrJ30pO1xuXHRcdFx0XHRcblx0XHRcdFx0JGxvYWRlZCA9ICR0YWcoZGl2LCAnTG9hZGVkQ29udGVudCcsICd3aWR0aDowOyBoZWlnaHQ6MDsgb3ZlcmZsb3c6aGlkZGVuJykuYXBwZW5kVG8oJGNvbnRlbnQpO1xuXG5cdFx0XHRcdC8vIENhY2hlIHZhbHVlcyBuZWVkZWQgZm9yIHNpemUgY2FsY3VsYXRpb25zXG5cdFx0XHRcdGludGVyZmFjZUhlaWdodCA9ICR0b3BCb3JkZXIuaGVpZ2h0KCkgKyAkYm90dG9tQm9yZGVyLmhlaWdodCgpICsgJGNvbnRlbnQub3V0ZXJIZWlnaHQodHJ1ZSkgLSAkY29udGVudC5oZWlnaHQoKTsvL1N1YnRyYWN0aW9uIG5lZWRlZCBmb3IgSUU2XG5cdFx0XHRcdGludGVyZmFjZVdpZHRoID0gJGxlZnRCb3JkZXIud2lkdGgoKSArICRyaWdodEJvcmRlci53aWR0aCgpICsgJGNvbnRlbnQub3V0ZXJXaWR0aCh0cnVlKSAtICRjb250ZW50LndpZHRoKCk7XG5cdFx0XHRcdGxvYWRlZEhlaWdodCA9ICRsb2FkZWQub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cdFx0XHRcdGxvYWRlZFdpZHRoID0gJGxvYWRlZC5vdXRlcldpZHRoKHRydWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHRcdC8vIE9wZW5zIGluaXRhbCBlbXB0eSBDb2xvcmJveCBwcmlvciB0byBjb250ZW50IGJlaW5nIGxvYWRlZC5cblx0XHRcdFx0c2V0dGluZ3MudyA9IHNldFNpemUoc2V0dGluZ3MuaW5pdGlhbFdpZHRoLCAneCcpO1xuXHRcdFx0XHRzZXR0aW5ncy5oID0gc2V0U2l6ZShzZXR0aW5ncy5pbml0aWFsSGVpZ2h0LCAneScpO1xuXHRcdFx0XHRwdWJsaWNNZXRob2QucG9zaXRpb24oKTtcblxuXHRcdFx0XHRpZiAoaXNJRTYpIHtcblx0XHRcdFx0XHQkd2luZG93LmJpbmQoJ3Jlc2l6ZS4nICsgZXZlbnRfaWU2ICsgJyBzY3JvbGwuJyArIGV2ZW50X2llNiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0JG92ZXJsYXkuY3NzKHt3aWR0aDogJHdpbmRvdy53aWR0aCgpLCBoZWlnaHQ6IHdpbmhlaWdodCgpLCB0b3A6ICR3aW5kb3cuc2Nyb2xsVG9wKCksIGxlZnQ6ICR3aW5kb3cuc2Nyb2xsTGVmdCgpfSk7XG5cdFx0XHRcdFx0fSkudHJpZ2dlcigncmVzaXplLicgKyBldmVudF9pZTYpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRzbGlkZXNob3coKTtcblxuXHRcdFx0XHR0cmlnZ2VyKGV2ZW50X29wZW4sIHNldHRpbmdzLm9uT3Blbik7XG5cdFx0XHRcdFxuXHRcdFx0XHQkZ3JvdXBDb250cm9scy5hZGQoJHRpdGxlKS5oaWRlKCk7XG5cblx0XHRcdFx0JGJveC5mb2N1cygpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ29uZmluZSBmb2N1cyB0byB0aGUgbW9kYWxcblx0XHRcdFx0Ly8gVXNlcyBldmVudCBjYXB0dXJpbmcgdGhhdCBpcyBub3Qgc3VwcG9ydGVkIGluIElFOC1cblx0XHRcdFx0aWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcblxuXHRcdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdHJhcEZvY3VzLCB0cnVlKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQkZXZlbnRzLm9uZShldmVudF9jbG9zZWQsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdHJhcEZvY3VzLCB0cnVlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJldHVybiBmb2N1cyBvbiBjbG9zaW5nXG5cdFx0XHRcdGlmIChzZXR0aW5ncy5yZXR1cm5Gb2N1cykge1xuXHRcdFx0XHRcdCRldmVudHMub25lKGV2ZW50X2Nsb3NlZCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0JChlbGVtZW50KS5mb2N1cygpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGxvYWQoKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDb2xvcmJveCdzIG1hcmt1cCBuZWVkcyB0byBiZSBhZGRlZCB0byB0aGUgRE9NIHByaW9yIHRvIGJlaW5nIGNhbGxlZFxuXHQvLyBzbyB0aGF0IHRoZSBicm93c2VyIHdpbGwgZ28gYWhlYWQgYW5kIGxvYWQgdGhlIENTUyBiYWNrZ3JvdW5kIGltYWdlcy5cblx0ZnVuY3Rpb24gYXBwZW5kSFRNTCgpIHtcblx0XHRpZiAoISRib3ggJiYgZG9jdW1lbnQuYm9keSkge1xuXHRcdFx0aW5pdCA9IGZhbHNlO1xuXG5cdFx0XHQkd2luZG93ID0gJCh3aW5kb3cpO1xuXHRcdFx0JGJveCA9ICR0YWcoZGl2KS5hdHRyKHtcblx0XHRcdFx0aWQ6IGNvbG9yYm94LFxuXHRcdFx0XHQnY2xhc3MnOiBpc0lFID8gcHJlZml4ICsgKGlzSUU2ID8gJ0lFNicgOiAnSUUnKSA6ICcnLFxuXHRcdFx0XHRyb2xlOiAnZGlhbG9nJyxcblx0XHRcdFx0dGFiaW5kZXg6ICctMSdcblx0XHRcdH0pLmhpZGUoKTtcblx0XHRcdCRvdmVybGF5ID0gJHRhZyhkaXYsIFwiT3ZlcmxheVwiLCBpc0lFNiA/ICdwb3NpdGlvbjphYnNvbHV0ZScgOiAnJykuaGlkZSgpO1xuXHRcdFx0JGxvYWRpbmdPdmVybGF5ID0gJHRhZyhkaXYsIFwiTG9hZGluZ092ZXJsYXlcIikuYWRkKCR0YWcoZGl2LCBcIkxvYWRpbmdHcmFwaGljXCIpKTtcblx0XHRcdCR3cmFwID0gJHRhZyhkaXYsIFwiV3JhcHBlclwiKTtcblx0XHRcdCRjb250ZW50ID0gJHRhZyhkaXYsIFwiQ29udGVudFwiKS5hcHBlbmQoXG5cdFx0XHRcdCR0aXRsZSA9ICR0YWcoZGl2LCBcIlRpdGxlXCIpLFxuXHRcdFx0XHQkY3VycmVudCA9ICR0YWcoZGl2LCBcIkN1cnJlbnRcIiksXG5cdFx0XHRcdCRwcmV2ID0gJHRhZygnYnV0dG9uJywgXCJQcmV2aW91c1wiKSxcblx0XHRcdFx0JG5leHQgPSAkdGFnKCdidXR0b24nLCBcIk5leHRcIiksXG5cdFx0XHRcdCRzbGlkZXNob3cgPSAkdGFnKCdidXR0b24nLCBcIlNsaWRlc2hvd1wiKSxcblx0XHRcdFx0JGxvYWRpbmdPdmVybGF5LFxuXHRcdFx0XHQkY2xvc2UgPSAkdGFnKCdidXR0b24nLCBcIkNsb3NlXCIpXG5cdFx0XHQpO1xuXHRcdFx0XG5cdFx0XHQkd3JhcC5hcHBlbmQoIC8vIFRoZSAzeDMgR3JpZCB0aGF0IG1ha2VzIHVwIENvbG9yYm94XG5cdFx0XHRcdCR0YWcoZGl2KS5hcHBlbmQoXG5cdFx0XHRcdFx0JHRhZyhkaXYsIFwiVG9wTGVmdFwiKSxcblx0XHRcdFx0XHQkdG9wQm9yZGVyID0gJHRhZyhkaXYsIFwiVG9wQ2VudGVyXCIpLFxuXHRcdFx0XHRcdCR0YWcoZGl2LCBcIlRvcFJpZ2h0XCIpXG5cdFx0XHRcdCksXG5cdFx0XHRcdCR0YWcoZGl2LCBmYWxzZSwgJ2NsZWFyOmxlZnQnKS5hcHBlbmQoXG5cdFx0XHRcdFx0JGxlZnRCb3JkZXIgPSAkdGFnKGRpdiwgXCJNaWRkbGVMZWZ0XCIpLFxuXHRcdFx0XHRcdCRjb250ZW50LFxuXHRcdFx0XHRcdCRyaWdodEJvcmRlciA9ICR0YWcoZGl2LCBcIk1pZGRsZVJpZ2h0XCIpXG5cdFx0XHRcdCksXG5cdFx0XHRcdCR0YWcoZGl2LCBmYWxzZSwgJ2NsZWFyOmxlZnQnKS5hcHBlbmQoXG5cdFx0XHRcdFx0JHRhZyhkaXYsIFwiQm90dG9tTGVmdFwiKSxcblx0XHRcdFx0XHQkYm90dG9tQm9yZGVyID0gJHRhZyhkaXYsIFwiQm90dG9tQ2VudGVyXCIpLFxuXHRcdFx0XHRcdCR0YWcoZGl2LCBcIkJvdHRvbVJpZ2h0XCIpXG5cdFx0XHRcdClcblx0XHRcdCkuZmluZCgnZGl2IGRpdicpLmNzcyh7J2Zsb2F0JzogJ2xlZnQnfSk7XG5cdFx0XHRcblx0XHRcdCRsb2FkaW5nQmF5ID0gJHRhZyhkaXYsIGZhbHNlLCAncG9zaXRpb246YWJzb2x1dGU7IHdpZHRoOjk5OTlweDsgdmlzaWJpbGl0eTpoaWRkZW47IGRpc3BsYXk6bm9uZScpO1xuXHRcdFx0XG5cdFx0XHQkZ3JvdXBDb250cm9scyA9ICRuZXh0LmFkZCgkcHJldikuYWRkKCRjdXJyZW50KS5hZGQoJHNsaWRlc2hvdyk7XG5cblx0XHRcdCQoZG9jdW1lbnQuYm9keSkuYXBwZW5kKCRvdmVybGF5LCAkYm94LmFwcGVuZCgkd3JhcCwgJGxvYWRpbmdCYXkpKTtcblx0XHR9XG5cdH1cblxuXHQvLyBBZGQgQ29sb3Jib3gncyBldmVudCBiaW5kaW5nc1xuXHRmdW5jdGlvbiBhZGRCaW5kaW5ncygpIHtcblx0XHRmdW5jdGlvbiBjbGlja0hhbmRsZXIoZSkge1xuXHRcdFx0Ly8gaWdub3JlIG5vbi1sZWZ0LW1vdXNlLWNsaWNrcyBhbmQgY2xpY2tzIG1vZGlmaWVkIHdpdGggY3RybCAvIGNvbW1hbmQsIHNoaWZ0LCBvciBhbHQuXG5cdFx0XHQvLyBTZWU6IGh0dHA6Ly9qYWNrbG1vb3JlLmNvbS9ub3Rlcy9jbGljay1ldmVudHMvXG5cdFx0XHRpZiAoIShlLndoaWNoID4gMSB8fCBlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5IHx8IGUubWV0YUtleSB8fCBlLmNvbnRyb2wpKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0bGF1bmNoKHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICgkYm94KSB7XG5cdFx0XHRpZiAoIWluaXQpIHtcblx0XHRcdFx0aW5pdCA9IHRydWU7XG5cblx0XHRcdFx0Ly8gQW5vbnltb3VzIGZ1bmN0aW9ucyBoZXJlIGtlZXAgdGhlIHB1YmxpYyBtZXRob2QgZnJvbSBiZWluZyBjYWNoZWQsIHRoZXJlYnkgYWxsb3dpbmcgdGhlbSB0byBiZSByZWRlZmluZWQgb24gdGhlIGZseS5cblx0XHRcdFx0JG5leHQuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHB1YmxpY01ldGhvZC5uZXh0KCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQkcHJldi5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cHVibGljTWV0aG9kLnByZXYoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCRjbG9zZS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cHVibGljTWV0aG9kLmNsb3NlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQkb3ZlcmxheS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKHNldHRpbmdzLm92ZXJsYXlDbG9zZSkge1xuXHRcdFx0XHRcdFx0cHVibGljTWV0aG9kLmNsb3NlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEtleSBCaW5kaW5nc1xuXHRcdFx0XHQkKGRvY3VtZW50KS5iaW5kKCdrZXlkb3duLicgKyBwcmVmaXgsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0dmFyIGtleSA9IGUua2V5Q29kZTtcblx0XHRcdFx0XHRpZiAob3BlbiAmJiBzZXR0aW5ncy5lc2NLZXkgJiYga2V5ID09PSAyNykge1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cHVibGljTWV0aG9kLmNsb3NlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChvcGVuICYmIHNldHRpbmdzLmFycm93S2V5ICYmICRyZWxhdGVkWzFdICYmICFlLmFsdEtleSkge1xuXHRcdFx0XHRcdFx0aWYgKGtleSA9PT0gMzcpIHtcblx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHQkcHJldi5jbGljaygpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChrZXkgPT09IDM5KSB7XG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0JG5leHQuY2xpY2soKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmICgkLmlzRnVuY3Rpb24oJC5mbi5vbikpIHtcblx0XHRcdFx0XHQvLyBGb3IgalF1ZXJ5IDEuNytcblx0XHRcdFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2suJytwcmVmaXgsICcuJytib3hFbGVtZW50LCBjbGlja0hhbmRsZXIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEZvciBqUXVlcnkgMS4zLnggLT4gMS42Lnhcblx0XHRcdFx0XHQvLyBUaGlzIGNvZGUgaXMgbmV2ZXIgcmVhY2hlZCBpbiBqUXVlcnkgMS45LCBzbyBkbyBub3QgY29udGFjdCBtZSBhYm91dCAnbGl2ZScgYmVpbmcgcmVtb3ZlZC5cblx0XHRcdFx0XHQvLyBUaGlzIGlzIG5vdCBoZXJlIGZvciBqUXVlcnkgMS45LCBpdCdzIGhlcmUgZm9yIGxlZ2FjeSB1c2Vycy5cblx0XHRcdFx0XHQkKCcuJytib3hFbGVtZW50KS5saXZlKCdjbGljay4nK3ByZWZpeCwgY2xpY2tIYW5kbGVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIERvbid0IGRvIGFueXRoaW5nIGlmIENvbG9yYm94IGFscmVhZHkgZXhpc3RzLlxuXHRpZiAoJC5jb2xvcmJveCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIEFwcGVuZCB0aGUgSFRNTCB3aGVuIHRoZSBET00gbG9hZHNcblx0JChhcHBlbmRIVE1MKTtcblxuXG5cdC8vICoqKioqKioqKioqKioqKipcblx0Ly8gUFVCTElDIEZVTkNUSU9OU1xuXHQvLyBVc2FnZSBmb3JtYXQ6ICQuY29sb3Jib3guY2xvc2UoKTtcblx0Ly8gVXNhZ2UgZnJvbSB3aXRoaW4gYW4gaWZyYW1lOiBwYXJlbnQualF1ZXJ5LmNvbG9yYm94LmNsb3NlKCk7XG5cdC8vICoqKioqKioqKioqKioqKipcblx0XG5cdHB1YmxpY01ldGhvZCA9ICQuZm5bY29sb3Jib3hdID0gJFtjb2xvcmJveF0gPSBmdW5jdGlvbiAob3B0aW9ucywgY2FsbGJhY2spIHtcblx0XHR2YXIgJHRoaXMgPSB0aGlzO1xuXHRcdFxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRcdFxuXHRcdGFwcGVuZEhUTUwoKTtcblxuXHRcdGlmIChhZGRCaW5kaW5ncygpKSB7XG5cdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKCR0aGlzKSkgeyAvLyBhc3N1bWUgYSBjYWxsIHRvICQuY29sb3Jib3hcblx0XHRcdFx0JHRoaXMgPSAkKCc8YS8+Jyk7XG5cdFx0XHRcdG9wdGlvbnMub3BlbiA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKCEkdGhpc1swXSkgeyAvLyBjb2xvcmJveCBiZWluZyBhcHBsaWVkIHRvIGVtcHR5IGNvbGxlY3Rpb25cblx0XHRcdFx0cmV0dXJuICR0aGlzO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0b3B0aW9ucy5vbkNvbXBsZXRlID0gY2FsbGJhY2s7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdCR0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkLmRhdGEodGhpcywgY29sb3Jib3gsICQuZXh0ZW5kKHt9LCAkLmRhdGEodGhpcywgY29sb3Jib3gpIHx8IGRlZmF1bHRzLCBvcHRpb25zKSk7XG5cdFx0XHR9KS5hZGRDbGFzcyhib3hFbGVtZW50KTtcblx0XHRcdFxuXHRcdFx0aWYgKCgkLmlzRnVuY3Rpb24ob3B0aW9ucy5vcGVuKSAmJiBvcHRpb25zLm9wZW4uY2FsbCgkdGhpcykpIHx8IG9wdGlvbnMub3Blbikge1xuXHRcdFx0XHRsYXVuY2goJHRoaXNbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gJHRoaXM7XG5cdH07XG5cblx0cHVibGljTWV0aG9kLnBvc2l0aW9uID0gZnVuY3Rpb24gKHNwZWVkLCBsb2FkZWRDYWxsYmFjaykge1xuXHRcdHZhclxuXHRcdGNzcyxcblx0XHR0b3AgPSAwLFxuXHRcdGxlZnQgPSAwLFxuXHRcdG9mZnNldCA9ICRib3gub2Zmc2V0KCksXG5cdFx0c2Nyb2xsVG9wLFxuXHRcdHNjcm9sbExlZnQ7XG5cdFx0XG5cdFx0JHdpbmRvdy51bmJpbmQoJ3Jlc2l6ZS4nICsgcHJlZml4KTtcblxuXHRcdC8vIHJlbW92ZSB0aGUgbW9kYWwgc28gdGhhdCBpdCBkb2Vzbid0IGluZmx1ZW5jZSB0aGUgZG9jdW1lbnQgd2lkdGgvaGVpZ2h0XG5cdFx0JGJveC5jc3Moe3RvcDogLTllNCwgbGVmdDogLTllNH0pO1xuXG5cdFx0c2Nyb2xsVG9wID0gJHdpbmRvdy5zY3JvbGxUb3AoKTtcblx0XHRzY3JvbGxMZWZ0ID0gJHdpbmRvdy5zY3JvbGxMZWZ0KCk7XG5cblx0XHRpZiAoc2V0dGluZ3MuZml4ZWQgJiYgIWlzSUU2KSB7XG5cdFx0XHRvZmZzZXQudG9wIC09IHNjcm9sbFRvcDtcblx0XHRcdG9mZnNldC5sZWZ0IC09IHNjcm9sbExlZnQ7XG5cdFx0XHQkYm94LmNzcyh7cG9zaXRpb246ICdmaXhlZCd9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9wID0gc2Nyb2xsVG9wO1xuXHRcdFx0bGVmdCA9IHNjcm9sbExlZnQ7XG5cdFx0XHQkYm94LmNzcyh7cG9zaXRpb246ICdhYnNvbHV0ZSd9KTtcblx0XHR9XG5cblx0XHQvLyBrZWVwcyB0aGUgdG9wIGFuZCBsZWZ0IHBvc2l0aW9ucyB3aXRoaW4gdGhlIGJyb3dzZXIncyB2aWV3cG9ydC5cblx0XHRpZiAoc2V0dGluZ3MucmlnaHQgIT09IGZhbHNlKSB7XG5cdFx0XHRsZWZ0ICs9IE1hdGgubWF4KCR3aW5kb3cud2lkdGgoKSAtIHNldHRpbmdzLncgLSBsb2FkZWRXaWR0aCAtIGludGVyZmFjZVdpZHRoIC0gc2V0U2l6ZShzZXR0aW5ncy5yaWdodCwgJ3gnKSwgMCk7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy5sZWZ0ICE9PSBmYWxzZSkge1xuXHRcdFx0bGVmdCArPSBzZXRTaXplKHNldHRpbmdzLmxlZnQsICd4Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlZnQgKz0gTWF0aC5yb3VuZChNYXRoLm1heCgkd2luZG93LndpZHRoKCkgLSBzZXR0aW5ncy53IC0gbG9hZGVkV2lkdGggLSBpbnRlcmZhY2VXaWR0aCwgMCkgLyAyKTtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLmJvdHRvbSAhPT0gZmFsc2UpIHtcblx0XHRcdHRvcCArPSBNYXRoLm1heCh3aW5oZWlnaHQoKSAtIHNldHRpbmdzLmggLSBsb2FkZWRIZWlnaHQgLSBpbnRlcmZhY2VIZWlnaHQgLSBzZXRTaXplKHNldHRpbmdzLmJvdHRvbSwgJ3knKSwgMCk7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5ncy50b3AgIT09IGZhbHNlKSB7XG5cdFx0XHR0b3AgKz0gc2V0U2l6ZShzZXR0aW5ncy50b3AsICd5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvcCArPSBNYXRoLnJvdW5kKE1hdGgubWF4KHdpbmhlaWdodCgpIC0gc2V0dGluZ3MuaCAtIGxvYWRlZEhlaWdodCAtIGludGVyZmFjZUhlaWdodCwgMCkgLyAyKTtcblx0XHR9XG5cblx0XHQkYm94LmNzcyh7dG9wOiBvZmZzZXQudG9wLCBsZWZ0OiBvZmZzZXQubGVmdCwgdmlzaWJpbGl0eTondmlzaWJsZSd9KTtcblxuXHRcdC8vIHNldHRpbmcgdGhlIHNwZWVkIHRvIDAgdG8gcmVkdWNlIHRoZSBkZWxheSBiZXR3ZWVuIHNhbWUtc2l6ZWQgY29udGVudC5cblx0XHRzcGVlZCA9ICgkYm94LndpZHRoKCkgPT09IHNldHRpbmdzLncgKyBsb2FkZWRXaWR0aCAmJiAkYm94LmhlaWdodCgpID09PSBzZXR0aW5ncy5oICsgbG9hZGVkSGVpZ2h0KSA/IDAgOiBzcGVlZCB8fCAwO1xuXHRcdFxuXHRcdC8vIHRoaXMgZ2l2ZXMgdGhlIHdyYXBwZXIgcGxlbnR5IG9mIGJyZWF0aGluZyByb29tIHNvIGl0J3MgZmxvYXRlZCBjb250ZW50cyBjYW4gbW92ZSBhcm91bmQgc21vb3RobHksXG5cdFx0Ly8gYnV0IGl0IGhhcyB0byBiZSBzaHJhbmsgZG93biBhcm91bmQgdGhlIHNpemUgb2YgZGl2I2NvbG9yYm94IHdoZW4gaXQncyBkb25lLiAgSWYgbm90LFxuXHRcdC8vIGl0IGNhbiBpbnZva2UgYW4gb2JzY3VyZSBJRSBidWcgd2hlbiB1c2luZyBpZnJhbWVzLlxuXHRcdCR3cmFwWzBdLnN0eWxlLndpZHRoID0gJHdyYXBbMF0uc3R5bGUuaGVpZ2h0ID0gXCI5OTk5cHhcIjtcblx0XHRcblx0XHRmdW5jdGlvbiBtb2RhbERpbWVuc2lvbnModGhhdCkge1xuXHRcdFx0JHRvcEJvcmRlclswXS5zdHlsZS53aWR0aCA9ICRib3R0b21Cb3JkZXJbMF0uc3R5bGUud2lkdGggPSAkY29udGVudFswXS5zdHlsZS53aWR0aCA9IChwYXJzZUludCh0aGF0LnN0eWxlLndpZHRoLDEwKSAtIGludGVyZmFjZVdpZHRoKSsncHgnO1xuXHRcdFx0JGNvbnRlbnRbMF0uc3R5bGUuaGVpZ2h0ID0gJGxlZnRCb3JkZXJbMF0uc3R5bGUuaGVpZ2h0ID0gJHJpZ2h0Qm9yZGVyWzBdLnN0eWxlLmhlaWdodCA9IChwYXJzZUludCh0aGF0LnN0eWxlLmhlaWdodCwxMCkgLSBpbnRlcmZhY2VIZWlnaHQpKydweCc7XG5cdFx0fVxuXG5cdFx0Y3NzID0ge3dpZHRoOiBzZXR0aW5ncy53ICsgbG9hZGVkV2lkdGggKyBpbnRlcmZhY2VXaWR0aCwgaGVpZ2h0OiBzZXR0aW5ncy5oICsgbG9hZGVkSGVpZ2h0ICsgaW50ZXJmYWNlSGVpZ2h0LCB0b3A6IHRvcCwgbGVmdDogbGVmdH07XG5cblx0XHRpZihzcGVlZD09PTApeyAvLyB0ZW1wb3Jhcnkgd29ya2Fyb3VuZCB0byBzaWRlLXN0ZXAgalF1ZXJ5LVVJIDEuOCBidWcgKGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMjczKVxuXHRcdFx0JGJveC5jc3MoY3NzKTtcblx0XHR9XG5cdFx0JGJveC5kZXF1ZXVlKCkuYW5pbWF0ZShjc3MsIHtcblx0XHRcdGR1cmF0aW9uOiBzcGVlZCxcblx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdG1vZGFsRGltZW5zaW9ucyh0aGlzKTtcblx0XHRcdFx0XG5cdFx0XHRcdGFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gc2hyaW5rIHRoZSB3cmFwcGVyIGRvd24gdG8gZXhhY3RseSB0aGUgc2l6ZSBvZiBjb2xvcmJveCB0byBhdm9pZCBhIGJ1ZyBpbiBJRSdzIGlmcmFtZSBpbXBsZW1lbnRhdGlvbi5cblx0XHRcdFx0JHdyYXBbMF0uc3R5bGUud2lkdGggPSAoc2V0dGluZ3MudyArIGxvYWRlZFdpZHRoICsgaW50ZXJmYWNlV2lkdGgpICsgXCJweFwiO1xuXHRcdFx0XHQkd3JhcFswXS5zdHlsZS5oZWlnaHQgPSAoc2V0dGluZ3MuaCArIGxvYWRlZEhlaWdodCArIGludGVyZmFjZUhlaWdodCkgKyBcInB4XCI7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoc2V0dGluZ3MucmVwb3NpdGlvbikge1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyAgLy8gc21hbGwgZGVsYXkgYmVmb3JlIGJpbmRpbmcgb25yZXNpemUgZHVlIHRvIGFuIElFOCBidWcuXG5cdFx0XHRcdFx0XHQkd2luZG93LmJpbmQoJ3Jlc2l6ZS4nICsgcHJlZml4LCBwdWJsaWNNZXRob2QucG9zaXRpb24pO1xuXHRcdFx0XHRcdH0sIDEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGxvYWRlZENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0bG9hZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHN0ZXA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0bW9kYWxEaW1lbnNpb25zKHRoaXMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdHB1YmxpY01ldGhvZC5yZXNpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdGlmIChvcGVuKSB7XG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0XHRcdFxuXHRcdFx0aWYgKG9wdGlvbnMud2lkdGgpIHtcblx0XHRcdFx0c2V0dGluZ3MudyA9IHNldFNpemUob3B0aW9ucy53aWR0aCwgJ3gnKSAtIGxvYWRlZFdpZHRoIC0gaW50ZXJmYWNlV2lkdGg7XG5cdFx0XHR9XG5cdFx0XHRpZiAob3B0aW9ucy5pbm5lcldpZHRoKSB7XG5cdFx0XHRcdHNldHRpbmdzLncgPSBzZXRTaXplKG9wdGlvbnMuaW5uZXJXaWR0aCwgJ3gnKTtcblx0XHRcdH1cblx0XHRcdCRsb2FkZWQuY3NzKHt3aWR0aDogc2V0dGluZ3Mud30pO1xuXHRcdFx0XG5cdFx0XHRpZiAob3B0aW9ucy5oZWlnaHQpIHtcblx0XHRcdFx0c2V0dGluZ3MuaCA9IHNldFNpemUob3B0aW9ucy5oZWlnaHQsICd5JykgLSBsb2FkZWRIZWlnaHQgLSBpbnRlcmZhY2VIZWlnaHQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAob3B0aW9ucy5pbm5lckhlaWdodCkge1xuXHRcdFx0XHRzZXR0aW5ncy5oID0gc2V0U2l6ZShvcHRpb25zLmlubmVySGVpZ2h0LCAneScpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFvcHRpb25zLmlubmVySGVpZ2h0ICYmICFvcHRpb25zLmhlaWdodCkge1xuXHRcdFx0XHQkbG9hZGVkLmNzcyh7aGVpZ2h0OiBcImF1dG9cIn0pO1xuXHRcdFx0XHRzZXR0aW5ncy5oID0gJGxvYWRlZC5oZWlnaHQoKTtcblx0XHRcdH1cblx0XHRcdCRsb2FkZWQuY3NzKHtoZWlnaHQ6IHNldHRpbmdzLmh9KTtcblx0XHRcdFxuXHRcdFx0cHVibGljTWV0aG9kLnBvc2l0aW9uKHNldHRpbmdzLnRyYW5zaXRpb24gPT09IFwibm9uZVwiID8gMCA6IHNldHRpbmdzLnNwZWVkKTtcblx0XHR9XG5cdH07XG5cblx0cHVibGljTWV0aG9kLnByZXAgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG5cdFx0aWYgKCFvcGVuKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBjYWxsYmFjaywgc3BlZWQgPSBzZXR0aW5ncy50cmFuc2l0aW9uID09PSBcIm5vbmVcIiA/IDAgOiBzZXR0aW5ncy5zcGVlZDtcblxuXHRcdCRsb2FkZWQuZW1wdHkoKS5yZW1vdmUoKTsgLy8gVXNpbmcgZW1wdHkgZmlyc3QgbWF5IHByZXZlbnQgc29tZSBJRTcgaXNzdWVzLlxuXG5cdFx0JGxvYWRlZCA9ICR0YWcoZGl2LCAnTG9hZGVkQ29udGVudCcpLmFwcGVuZChvYmplY3QpO1xuXHRcdFxuXHRcdGZ1bmN0aW9uIGdldFdpZHRoKCkge1xuXHRcdFx0c2V0dGluZ3MudyA9IHNldHRpbmdzLncgfHwgJGxvYWRlZC53aWR0aCgpO1xuXHRcdFx0c2V0dGluZ3MudyA9IHNldHRpbmdzLm13ICYmIHNldHRpbmdzLm13IDwgc2V0dGluZ3MudyA/IHNldHRpbmdzLm13IDogc2V0dGluZ3Mudztcblx0XHRcdHJldHVybiBzZXR0aW5ncy53O1xuXHRcdH1cblx0XHRmdW5jdGlvbiBnZXRIZWlnaHQoKSB7XG5cdFx0XHRzZXR0aW5ncy5oID0gc2V0dGluZ3MuaCB8fCAkbG9hZGVkLmhlaWdodCgpO1xuXHRcdFx0c2V0dGluZ3MuaCA9IHNldHRpbmdzLm1oICYmIHNldHRpbmdzLm1oIDwgc2V0dGluZ3MuaCA/IHNldHRpbmdzLm1oIDogc2V0dGluZ3MuaDtcblx0XHRcdHJldHVybiBzZXR0aW5ncy5oO1xuXHRcdH1cblx0XHRcblx0XHQkbG9hZGVkLmhpZGUoKVxuXHRcdC5hcHBlbmRUbygkbG9hZGluZ0JheS5zaG93KCkpLy8gY29udGVudCBoYXMgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIERPTSBmb3IgYWNjdXJhdGUgc2l6ZSBjYWxjdWxhdGlvbnMuXG5cdFx0LmNzcyh7d2lkdGg6IGdldFdpZHRoKCksIG92ZXJmbG93OiBzZXR0aW5ncy5zY3JvbGxpbmcgPyAnYXV0bycgOiAnaGlkZGVuJ30pXG5cdFx0LmNzcyh7aGVpZ2h0OiBnZXRIZWlnaHQoKX0pLy8gc2V0cyB0aGUgaGVpZ2h0IGluZGVwZW5kZW50bHkgZnJvbSB0aGUgd2lkdGggaW4gY2FzZSB0aGUgbmV3IHdpZHRoIGluZmx1ZW5jZXMgdGhlIHZhbHVlIG9mIGhlaWdodC5cblx0XHQucHJlcGVuZFRvKCRjb250ZW50KTtcblx0XHRcblx0XHQkbG9hZGluZ0JheS5oaWRlKCk7XG5cdFx0XG5cdFx0Ly8gZmxvYXRpbmcgdGhlIElNRyByZW1vdmVzIHRoZSBib3R0b20gbGluZS1oZWlnaHQgYW5kIGZpeGVkIGEgcHJvYmxlbSB3aGVyZSBJRSBtaXNjYWxjdWxhdGVzIHRoZSB3aWR0aCBvZiB0aGUgcGFyZW50IGVsZW1lbnQgYXMgMTAwJSBvZiB0aGUgZG9jdW1lbnQgd2lkdGguXG5cdFx0XG5cdFx0JChwaG90bykuY3NzKHsnZmxvYXQnOiAnbm9uZSd9KTtcblxuXHRcdGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHRvdGFsID0gJHJlbGF0ZWQubGVuZ3RoLFxuXHRcdFx0XHRpZnJhbWUsXG5cdFx0XHRcdGZyYW1lQm9yZGVyID0gJ2ZyYW1lQm9yZGVyJyxcblx0XHRcdFx0YWxsb3dUcmFuc3BhcmVuY3kgPSAnYWxsb3dUcmFuc3BhcmVuY3knLFxuXHRcdFx0XHRjb21wbGV0ZTtcblx0XHRcdFxuXHRcdFx0aWYgKCFvcGVuKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0ZnVuY3Rpb24gcmVtb3ZlRmlsdGVyKCkge1xuXHRcdFx0XHRpZiAoaXNJRSkge1xuXHRcdFx0XHRcdCRib3hbMF0uc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdmaWx0ZXInKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRjb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KGxvYWRpbmdUaW1lcik7XG5cdFx0XHRcdCRsb2FkaW5nT3ZlcmxheS5oaWRlKCk7XG5cdFx0XHRcdHRyaWdnZXIoZXZlbnRfY29tcGxldGUsIHNldHRpbmdzLm9uQ29tcGxldGUpO1xuXHRcdFx0fTtcblx0XHRcdFxuXHRcdFx0aWYgKGlzSUUpIHtcblx0XHRcdFx0Ly9UaGlzIGZhZGVJbiBoZWxwcyB0aGUgYmljdWJpYyByZXNhbXBsaW5nIHRvIGtpY2staW4uXG5cdFx0XHRcdGlmIChwaG90bykge1xuXHRcdFx0XHRcdCRsb2FkZWQuZmFkZUluKDEwMCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0JHRpdGxlLmh0bWwoc2V0dGluZ3MudGl0bGUpLmFkZCgkbG9hZGVkKS5zaG93KCk7XG5cdFx0XHRcblx0XHRcdGlmICh0b3RhbCA+IDEpIHsgLy8gaGFuZGxlIGdyb3VwaW5nXG5cdFx0XHRcdGlmICh0eXBlb2Ygc2V0dGluZ3MuY3VycmVudCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdCRjdXJyZW50Lmh0bWwoc2V0dGluZ3MuY3VycmVudC5yZXBsYWNlKCd7Y3VycmVudH0nLCBpbmRleCArIDEpLnJlcGxhY2UoJ3t0b3RhbH0nLCB0b3RhbCkpLnNob3coKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0JG5leHRbKHNldHRpbmdzLmxvb3AgfHwgaW5kZXggPCB0b3RhbCAtIDEpID8gXCJzaG93XCIgOiBcImhpZGVcIl0oKS5odG1sKHNldHRpbmdzLm5leHQpO1xuXHRcdFx0XHQkcHJldlsoc2V0dGluZ3MubG9vcCB8fCBpbmRleCkgPyBcInNob3dcIiA6IFwiaGlkZVwiXSgpLmh0bWwoc2V0dGluZ3MucHJldmlvdXMpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKHNldHRpbmdzLnNsaWRlc2hvdykge1xuXHRcdFx0XHRcdCRzbGlkZXNob3cuc2hvdygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBQcmVsb2FkcyBpbWFnZXMgd2l0aGluIGEgcmVsIGdyb3VwXG5cdFx0XHRcdGlmIChzZXR0aW5ncy5wcmVsb2FkaW5nKSB7XG5cdFx0XHRcdFx0JC5lYWNoKFtnZXRJbmRleCgtMSksIGdldEluZGV4KDEpXSwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHZhciBzcmMsXG5cdFx0XHRcdFx0XHRcdGltZyxcblx0XHRcdFx0XHRcdFx0aSA9ICRyZWxhdGVkW3RoaXNdLFxuXHRcdFx0XHRcdFx0XHRkYXRhID0gJC5kYXRhKGksIGNvbG9yYm94KTtcblxuXHRcdFx0XHRcdFx0aWYgKGRhdGEgJiYgZGF0YS5ocmVmKSB7XG5cdFx0XHRcdFx0XHRcdHNyYyA9IGRhdGEuaHJlZjtcblx0XHRcdFx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbihzcmMpKSB7XG5cdFx0XHRcdFx0XHRcdFx0c3JjID0gc3JjLmNhbGwoaSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNyYyA9ICQoaSkuYXR0cignaHJlZicpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoc3JjICYmIGlzSW1hZ2UoZGF0YSwgc3JjKSkge1xuXHRcdFx0XHRcdFx0XHRzcmMgPSByZXRpbmFVcmwoZGF0YSwgc3JjKTtcblx0XHRcdFx0XHRcdFx0aW1nID0gbmV3IEltYWdlKCk7XG5cdFx0XHRcdFx0XHRcdGltZy5zcmMgPSBzcmM7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRncm91cENvbnRyb2xzLmhpZGUoKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLmlmcmFtZSkge1xuXHRcdFx0XHRpZnJhbWUgPSAkdGFnKCdpZnJhbWUnKVswXTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChmcmFtZUJvcmRlciBpbiBpZnJhbWUpIHtcblx0XHRcdFx0XHRpZnJhbWVbZnJhbWVCb3JkZXJdID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGFsbG93VHJhbnNwYXJlbmN5IGluIGlmcmFtZSkge1xuXHRcdFx0XHRcdGlmcmFtZVthbGxvd1RyYW5zcGFyZW5jeV0gPSBcInRydWVcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghc2V0dGluZ3Muc2Nyb2xsaW5nKSB7XG5cdFx0XHRcdFx0aWZyYW1lLnNjcm9sbGluZyA9IFwibm9cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0JChpZnJhbWUpXG5cdFx0XHRcdFx0LmF0dHIoe1xuXHRcdFx0XHRcdFx0c3JjOiBzZXR0aW5ncy5ocmVmLFxuXHRcdFx0XHRcdFx0bmFtZTogKG5ldyBEYXRlKCkpLmdldFRpbWUoKSwgLy8gZ2l2ZSB0aGUgaWZyYW1lIGEgdW5pcXVlIG5hbWUgdG8gcHJldmVudCBjYWNoaW5nXG5cdFx0XHRcdFx0XHQnY2xhc3MnOiBwcmVmaXggKyAnSWZyYW1lJyxcblx0XHRcdFx0XHRcdGFsbG93RnVsbFNjcmVlbiA6IHRydWUsIC8vIGFsbG93IEhUTUw1IHZpZGVvIHRvIGdvIGZ1bGxzY3JlZW5cblx0XHRcdFx0XHRcdHdlYmtpdEFsbG93RnVsbFNjcmVlbiA6IHRydWUsXG5cdFx0XHRcdFx0XHRtb3phbGxvd2Z1bGxzY3JlZW4gOiB0cnVlXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQub25lKCdsb2FkJywgY29tcGxldGUpXG5cdFx0XHRcdFx0LmFwcGVuZFRvKCRsb2FkZWQpO1xuXHRcdFx0XHRcblx0XHRcdFx0JGV2ZW50cy5vbmUoZXZlbnRfcHVyZ2UsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZnJhbWUuc3JjID0gXCIvL2Fib3V0OmJsYW5rXCI7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChzZXR0aW5ncy5mYXN0SWZyYW1lKSB7XG5cdFx0XHRcdFx0JChpZnJhbWUpLnRyaWdnZXIoJ2xvYWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29tcGxldGUoKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLnRyYW5zaXRpb24gPT09ICdmYWRlJykge1xuXHRcdFx0XHQkYm94LmZhZGVUbyhzcGVlZCwgMSwgcmVtb3ZlRmlsdGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlbW92ZUZpbHRlcigpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLnRyYW5zaXRpb24gPT09ICdmYWRlJykge1xuXHRcdFx0JGJveC5mYWRlVG8oc3BlZWQsIDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cHVibGljTWV0aG9kLnBvc2l0aW9uKDAsIGNhbGxiYWNrKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwdWJsaWNNZXRob2QucG9zaXRpb24oc3BlZWQsIGNhbGxiYWNrKTtcblx0XHR9XG5cdH07XG5cblx0ZnVuY3Rpb24gbG9hZCAoKSB7XG5cdFx0dmFyIGhyZWYsIHNldFJlc2l6ZSwgcHJlcCA9IHB1YmxpY01ldGhvZC5wcmVwLCAkaW5saW5lLCByZXF1ZXN0ID0gKytyZXF1ZXN0cztcblx0XHRcblx0XHRhY3RpdmUgPSB0cnVlO1xuXHRcdFxuXHRcdHBob3RvID0gZmFsc2U7XG5cdFx0XG5cdFx0ZWxlbWVudCA9ICRyZWxhdGVkW2luZGV4XTtcblx0XHRcblx0XHRtYWtlU2V0dGluZ3MoKTtcblx0XHRcblx0XHR0cmlnZ2VyKGV2ZW50X3B1cmdlKTtcblx0XHRcblx0XHR0cmlnZ2VyKGV2ZW50X2xvYWQsIHNldHRpbmdzLm9uTG9hZCk7XG5cdFx0XG5cdFx0c2V0dGluZ3MuaCA9IHNldHRpbmdzLmhlaWdodCA/XG5cdFx0XHRcdHNldFNpemUoc2V0dGluZ3MuaGVpZ2h0LCAneScpIC0gbG9hZGVkSGVpZ2h0IC0gaW50ZXJmYWNlSGVpZ2h0IDpcblx0XHRcdFx0c2V0dGluZ3MuaW5uZXJIZWlnaHQgJiYgc2V0U2l6ZShzZXR0aW5ncy5pbm5lckhlaWdodCwgJ3knKTtcblx0XHRcblx0XHRzZXR0aW5ncy53ID0gc2V0dGluZ3Mud2lkdGggP1xuXHRcdFx0XHRzZXRTaXplKHNldHRpbmdzLndpZHRoLCAneCcpIC0gbG9hZGVkV2lkdGggLSBpbnRlcmZhY2VXaWR0aCA6XG5cdFx0XHRcdHNldHRpbmdzLmlubmVyV2lkdGggJiYgc2V0U2l6ZShzZXR0aW5ncy5pbm5lcldpZHRoLCAneCcpO1xuXHRcdFxuXHRcdC8vIFNldHMgdGhlIG1pbmltdW0gZGltZW5zaW9ucyBmb3IgdXNlIGluIGltYWdlIHNjYWxpbmdcblx0XHRzZXR0aW5ncy5tdyA9IHNldHRpbmdzLnc7XG5cdFx0c2V0dGluZ3MubWggPSBzZXR0aW5ncy5oO1xuXHRcdFxuXHRcdC8vIFJlLWV2YWx1YXRlIHRoZSBtaW5pbXVtIHdpZHRoIGFuZCBoZWlnaHQgYmFzZWQgb24gbWF4V2lkdGggYW5kIG1heEhlaWdodCB2YWx1ZXMuXG5cdFx0Ly8gSWYgdGhlIHdpZHRoIG9yIGhlaWdodCBleGNlZWQgdGhlIG1heFdpZHRoIG9yIG1heEhlaWdodCwgdXNlIHRoZSBtYXhpbXVtIHZhbHVlcyBpbnN0ZWFkLlxuXHRcdGlmIChzZXR0aW5ncy5tYXhXaWR0aCkge1xuXHRcdFx0c2V0dGluZ3MubXcgPSBzZXRTaXplKHNldHRpbmdzLm1heFdpZHRoLCAneCcpIC0gbG9hZGVkV2lkdGggLSBpbnRlcmZhY2VXaWR0aDtcblx0XHRcdHNldHRpbmdzLm13ID0gc2V0dGluZ3MudyAmJiBzZXR0aW5ncy53IDwgc2V0dGluZ3MubXcgPyBzZXR0aW5ncy53IDogc2V0dGluZ3MubXc7XG5cdFx0fVxuXHRcdGlmIChzZXR0aW5ncy5tYXhIZWlnaHQpIHtcblx0XHRcdHNldHRpbmdzLm1oID0gc2V0U2l6ZShzZXR0aW5ncy5tYXhIZWlnaHQsICd5JykgLSBsb2FkZWRIZWlnaHQgLSBpbnRlcmZhY2VIZWlnaHQ7XG5cdFx0XHRzZXR0aW5ncy5taCA9IHNldHRpbmdzLmggJiYgc2V0dGluZ3MuaCA8IHNldHRpbmdzLm1oID8gc2V0dGluZ3MuaCA6IHNldHRpbmdzLm1oO1xuXHRcdH1cblx0XHRcblx0XHRocmVmID0gc2V0dGluZ3MuaHJlZjtcblx0XHRcblx0XHRsb2FkaW5nVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdCRsb2FkaW5nT3ZlcmxheS5zaG93KCk7XG5cdFx0fSwgMTAwKTtcblx0XHRcblx0XHRpZiAoc2V0dGluZ3MuaW5saW5lKSB7XG5cdFx0XHQvLyBJbnNlcnRzIGFuIGVtcHR5IHBsYWNlaG9sZGVyIHdoZXJlIGlubGluZSBjb250ZW50IGlzIGJlaW5nIHB1bGxlZCBmcm9tLlxuXHRcdFx0Ly8gQW4gZXZlbnQgaXMgYm91bmQgdG8gcHV0IGlubGluZSBjb250ZW50IGJhY2sgd2hlbiBDb2xvcmJveCBjbG9zZXMgb3IgbG9hZHMgbmV3IGNvbnRlbnQuXG5cdFx0XHQkaW5saW5lID0gJHRhZyhkaXYpLmhpZGUoKS5pbnNlcnRCZWZvcmUoJChocmVmKVswXSk7XG5cblx0XHRcdCRldmVudHMub25lKGV2ZW50X3B1cmdlLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCRpbmxpbmUucmVwbGFjZVdpdGgoJGxvYWRlZC5jaGlsZHJlbigpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRwcmVwKCQoaHJlZikpO1xuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuaWZyYW1lKSB7XG5cdFx0XHQvLyBJRnJhbWUgZWxlbWVudCB3b24ndCBiZSBhZGRlZCB0byB0aGUgRE9NIHVudGlsIGl0IGlzIHJlYWR5IHRvIGJlIGRpc3BsYXllZCxcblx0XHRcdC8vIHRvIGF2b2lkIHByb2JsZW1zIHdpdGggRE9NLXJlYWR5IEpTIHRoYXQgbWlnaHQgYmUgdHJ5aW5nIHRvIHJ1biBpbiB0aGF0IGlmcmFtZS5cblx0XHRcdHByZXAoXCIgXCIpO1xuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MuaHRtbCkge1xuXHRcdFx0cHJlcChzZXR0aW5ncy5odG1sKTtcblx0XHR9IGVsc2UgaWYgKGlzSW1hZ2Uoc2V0dGluZ3MsIGhyZWYpKSB7XG5cblx0XHRcdGhyZWYgPSByZXRpbmFVcmwoc2V0dGluZ3MsIGhyZWYpO1xuXG5cdFx0XHQkKHBob3RvID0gbmV3IEltYWdlKCkpXG5cdFx0XHQuYWRkQ2xhc3MocHJlZml4ICsgJ1Bob3RvJylcblx0XHRcdC5iaW5kKCdlcnJvcicsZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRzZXR0aW5ncy50aXRsZSA9IGZhbHNlO1xuXHRcdFx0XHRwcmVwKCR0YWcoZGl2LCAnRXJyb3InKS5odG1sKHNldHRpbmdzLmltZ0Vycm9yKSk7XG5cdFx0XHR9KVxuXHRcdFx0Lm9uZSgnbG9hZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHBlcmNlbnQ7XG5cblx0XHRcdFx0aWYgKHJlcXVlc3QgIT09IHJlcXVlc3RzKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHNldHRpbmdzLnJldGluYUltYWdlICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuXHRcdFx0XHRcdHBob3RvLmhlaWdodCA9IHBob3RvLmhlaWdodCAvIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuXHRcdFx0XHRcdHBob3RvLndpZHRoID0gcGhvdG8ud2lkdGggLyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzZXR0aW5ncy5zY2FsZVBob3Rvcykge1xuXHRcdFx0XHRcdHNldFJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHBob3RvLmhlaWdodCAtPSBwaG90by5oZWlnaHQgKiBwZXJjZW50O1xuXHRcdFx0XHRcdFx0cGhvdG8ud2lkdGggLT0gcGhvdG8ud2lkdGggKiBwZXJjZW50O1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0aWYgKHNldHRpbmdzLm13ICYmIHBob3RvLndpZHRoID4gc2V0dGluZ3MubXcpIHtcblx0XHRcdFx0XHRcdHBlcmNlbnQgPSAocGhvdG8ud2lkdGggLSBzZXR0aW5ncy5tdykgLyBwaG90by53aWR0aDtcblx0XHRcdFx0XHRcdHNldFJlc2l6ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoc2V0dGluZ3MubWggJiYgcGhvdG8uaGVpZ2h0ID4gc2V0dGluZ3MubWgpIHtcblx0XHRcdFx0XHRcdHBlcmNlbnQgPSAocGhvdG8uaGVpZ2h0IC0gc2V0dGluZ3MubWgpIC8gcGhvdG8uaGVpZ2h0O1xuXHRcdFx0XHRcdFx0c2V0UmVzaXplKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoc2V0dGluZ3MuaCkge1xuXHRcdFx0XHRcdHBob3RvLnN0eWxlLm1hcmdpblRvcCA9IE1hdGgubWF4KHNldHRpbmdzLm1oIC0gcGhvdG8uaGVpZ2h0LCAwKSAvIDIgKyAncHgnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoJHJlbGF0ZWRbMV0gJiYgKHNldHRpbmdzLmxvb3AgfHwgJHJlbGF0ZWRbaW5kZXggKyAxXSkpIHtcblx0XHRcdFx0XHRwaG90by5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdFx0XHRcdFx0cGhvdG8ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHB1YmxpY01ldGhvZC5uZXh0KCk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGlzSUUpIHtcblx0XHRcdFx0XHRwaG90by5zdHlsZS5tc0ludGVycG9sYXRpb25Nb2RlID0gJ2JpY3ViaWMnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgLy8gQSBwYXVzZSBiZWNhdXNlIENocm9tZSB3aWxsIHNvbWV0aW1lcyByZXBvcnQgYSAwIGJ5IDAgc2l6ZSBvdGhlcndpc2UuXG5cdFx0XHRcdFx0cHJlcChwaG90byk7XG5cdFx0XHRcdH0sIDEpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyAvLyBBIHBhdXNlIGJlY2F1c2UgT3BlcmEgMTAuNisgd2lsbCBzb21ldGltZXMgbm90IHJ1biB0aGUgb25sb2FkIGZ1bmN0aW9uIG90aGVyd2lzZS5cblx0XHRcdFx0cGhvdG8uc3JjID0gaHJlZjtcblx0XHRcdH0sIDEpO1xuXHRcdH0gZWxzZSBpZiAoaHJlZikge1xuXHRcdFx0JGxvYWRpbmdCYXkubG9hZChocmVmLCBzZXR0aW5ncy5kYXRhLCBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG5cdFx0XHRcdGlmIChyZXF1ZXN0ID09PSByZXF1ZXN0cykge1xuXHRcdFx0XHRcdHByZXAoc3RhdHVzID09PSAnZXJyb3InID8gJHRhZyhkaXYsICdFcnJvcicpLmh0bWwoc2V0dGluZ3MueGhyRXJyb3IpIDogJCh0aGlzKS5jb250ZW50cygpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdFx0XG5cdC8vIE5hdmlnYXRlcyB0byB0aGUgbmV4dCBwYWdlL2ltYWdlIGluIGEgc2V0LlxuXHRwdWJsaWNNZXRob2QubmV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIWFjdGl2ZSAmJiAkcmVsYXRlZFsxXSAmJiAoc2V0dGluZ3MubG9vcCB8fCAkcmVsYXRlZFtpbmRleCArIDFdKSkge1xuXHRcdFx0aW5kZXggPSBnZXRJbmRleCgxKTtcblx0XHRcdGxhdW5jaCgkcmVsYXRlZFtpbmRleF0pO1xuXHRcdH1cblx0fTtcblx0XG5cdHB1YmxpY01ldGhvZC5wcmV2ID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmICghYWN0aXZlICYmICRyZWxhdGVkWzFdICYmIChzZXR0aW5ncy5sb29wIHx8IGluZGV4KSkge1xuXHRcdFx0aW5kZXggPSBnZXRJbmRleCgtMSk7XG5cdFx0XHRsYXVuY2goJHJlbGF0ZWRbaW5kZXhdKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gTm90ZTogdG8gdXNlIHRoaXMgd2l0aGluIGFuIGlmcmFtZSB1c2UgdGhlIGZvbGxvd2luZyBmb3JtYXQ6IHBhcmVudC5qUXVlcnkuY29sb3Jib3guY2xvc2UoKTtcblx0cHVibGljTWV0aG9kLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmIChvcGVuICYmICFjbG9zaW5nKSB7XG5cdFx0XHRcblx0XHRcdGNsb3NpbmcgPSB0cnVlO1xuXHRcdFx0XG5cdFx0XHRvcGVuID0gZmFsc2U7XG5cdFx0XHRcblx0XHRcdHRyaWdnZXIoZXZlbnRfY2xlYW51cCwgc2V0dGluZ3Mub25DbGVhbnVwKTtcblx0XHRcdFxuXHRcdFx0JHdpbmRvdy51bmJpbmQoJy4nICsgcHJlZml4ICsgJyAuJyArIGV2ZW50X2llNik7XG5cdFx0XHRcblx0XHRcdCRvdmVybGF5LmZhZGVUbygyMDAsIDApO1xuXHRcdFx0XG5cdFx0XHQkYm94LnN0b3AoKS5mYWRlVG8oMzAwLCAwLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcblx0XHRcdFx0JGJveC5hZGQoJG92ZXJsYXkpLmNzcyh7J29wYWNpdHknOiAxLCBjdXJzb3I6ICdhdXRvJ30pLmhpZGUoKTtcblx0XHRcdFx0XG5cdFx0XHRcdHRyaWdnZXIoZXZlbnRfcHVyZ2UpO1xuXHRcdFx0XHRcblx0XHRcdFx0JGxvYWRlZC5lbXB0eSgpLnJlbW92ZSgpOyAvLyBVc2luZyBlbXB0eSBmaXJzdCBtYXkgcHJldmVudCBzb21lIElFNyBpc3N1ZXMuXG5cdFx0XHRcdFxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRjbG9zaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0dHJpZ2dlcihldmVudF9jbG9zZWQsIHNldHRpbmdzLm9uQ2xvc2VkKTtcblx0XHRcdFx0fSwgMSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0Ly8gUmVtb3ZlcyBjaGFuZ2VzIENvbG9yYm94IG1hZGUgdG8gdGhlIGRvY3VtZW50LCBidXQgZG9lcyBub3QgcmVtb3ZlIHRoZSBwbHVnaW5cblx0Ly8gZnJvbSBqUXVlcnkuXG5cdHB1YmxpY01ldGhvZC5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0JChbXSkuYWRkKCRib3gpLmFkZCgkb3ZlcmxheSkucmVtb3ZlKCk7XG5cdFx0JGJveCA9IG51bGw7XG5cdFx0JCgnLicgKyBib3hFbGVtZW50KVxuXHRcdFx0LnJlbW92ZURhdGEoY29sb3Jib3gpXG5cdFx0XHQucmVtb3ZlQ2xhc3MoYm94RWxlbWVudCk7XG5cblx0XHQkKGRvY3VtZW50KS51bmJpbmQoJ2NsaWNrLicrcHJlZml4KTtcblx0fTtcblxuXHQvLyBBIG1ldGhvZCBmb3IgZmV0Y2hpbmcgdGhlIGN1cnJlbnQgZWxlbWVudCBDb2xvcmJveCBpcyByZWZlcmVuY2luZy5cblx0Ly8gcmV0dXJucyBhIGpRdWVyeSBvYmplY3QuXG5cdHB1YmxpY01ldGhvZC5lbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAkKGVsZW1lbnQpO1xuXHR9O1xuXG5cdHB1YmxpY01ldGhvZC5zZXR0aW5ncyA9IGRlZmF1bHRzO1xuXG59KGpRdWVyeSwgZG9jdW1lbnQsIHdpbmRvdykpO1xuIl0sImZpbGUiOiJqcXVlcnkuY29sb3Jib3guanMifQ==
