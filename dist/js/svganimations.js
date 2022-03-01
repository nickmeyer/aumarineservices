/**
 * svganimations.js v1.0.0
 * http://www.codrops.com
 *
 * the svg path animation is based on http://24ways.org/2013/animating-vectors-with-svg/ by Brian Suda (@briansuda)
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function() {

	'use strict';

	var docElem = window.document.documentElement;

	window.requestAnimFrame = function(){
		return (
			window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback){
				window.setTimeout(callback, 1000 / 60);
			}
		);
	}();

	window.cancelAnimFrame = function(){
		return (
			window.cancelAnimationFrame       || 
			window.webkitCancelAnimationFrame || 
			window.mozCancelAnimationFrame    || 
			window.oCancelAnimationFrame      || 
			window.msCancelAnimationFrame     || 
			function(id){
				window.clearTimeout(id);
			}
		);
	}();

	function SVGEl( el ) {
		this.el = el;
		this.image = this.el.previousElementSibling;
		this.current_frame = 0;
		this.total_frames = 60;
		this.path = new Array();
		this.length = new Array();
		this.handle = 0;
		this.init();
	}

	SVGEl.prototype.init = function() {
		var self = this;
		[].slice.call( this.el.querySelectorAll( 'path' ) ).forEach( function( path, i ) {
			self.path[i] = path;
			var l = self.path[i].getTotalLength();
			self.length[i] = l;
			self.path[i].style.strokeDasharray = l + ' ' + l; 
			self.path[i].style.strokeDashoffset = l;
		} );
	};

	SVGEl.prototype.render = function() {
		if( this.rendered ) return;
		this.rendered = true;
		this.draw();
	};

	SVGEl.prototype.draw = function() {
		var self = this,
			progress = this.current_frame/this.total_frames;
		if (progress > 1) {
			window.cancelAnimFrame(this.handle);
			this.showImage();
		} else {
			this.current_frame++;
			for(var j=0, len = this.path.length; j<len;j++){
				this.path[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
			}
			this.handle = window.requestAnimFrame(function() { self.draw(); });
		}
	};

	SVGEl.prototype.showImage = function() {
		classie.add( this.image, 'show' );
		classie.add( this.el, 'hide' );
	};

	function getViewportH() {
		var client = docElem['clientHeight'],
			inner = window['innerHeight'];
		 
		if( client < inner )
			return inner;
		else
			return client;
	}
 
	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}
 
	// http://stackoverflow.com/a/5598797/989439
	function getOffset( el ) {
		var offsetTop = 0, offsetLeft = 0;
		do {
			if ( !isNaN( el.offsetTop ) ) {
				offsetTop += el.offsetTop;
			}
			if ( !isNaN( el.offsetLeft ) ) {
				offsetLeft += el.offsetLeft;
			}
		} while( el = el.offsetParent )
 
		return {
			top : offsetTop,
			left : offsetLeft
		};
	}
 
	function inViewport( el, h ) {
		var elH = el.offsetHeight,
			scrolled = scrollY(),
			viewed = scrolled + getViewportH(),
			elTop = getOffset(el).top,
			elBottom = elTop + elH,
			// if 0, the element is considered in the viewport as soon as it enters.
			// if 1, the element is considered in the viewport only when it's fully inside
			// value in percentage (1 >= h >= 0)
			h = h || 0;
 
		return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
	}
	
	function init() {
		var svgs = Array.prototype.slice.call( document.querySelectorAll( '#main svg' ) ),
			svgArr = new Array(),
			didScroll = false,
			resizeTimeout;

		// the svgs already shown...
		svgs.forEach( function( el, i ) {
			var svg = new SVGEl( el );
			svgArr[i] = svg;
			setTimeout(function( el ) {
				return function() {
					if( inViewport( el.parentNode ) ) {
						svg.render();
					}
				};
			}( el ), 250 ); 
		} );

		var scrollHandler = function() {
				if( !didScroll ) {
					didScroll = true;
					setTimeout( function() { scrollPage(); }, 60 );
				}
			},
			scrollPage = function() {
				svgs.forEach( function( el, i ) {
					if( inViewport( el.parentNode, 0.5 ) ) {
						svgArr[i].render();
					}
				});
				didScroll = false;
			},
			resizeHandler = function() {
				function delayed() {
					scrollPage();
					resizeTimeout = null;
				}
				if ( resizeTimeout ) {
					clearTimeout( resizeTimeout );
				}
				resizeTimeout = setTimeout( delayed, 200 );
			};

		window.addEventListener( 'scroll', scrollHandler, false );
		window.addEventListener( 'resize', resizeHandler, false );
	}

	init();

})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdmdhbmltYXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogc3ZnYW5pbWF0aW9ucy5qcyB2MS4wLjBcbiAqIGh0dHA6Ly93d3cuY29kcm9wcy5jb21cbiAqXG4gKiB0aGUgc3ZnIHBhdGggYW5pbWF0aW9uIGlzIGJhc2VkIG9uIGh0dHA6Ly8yNHdheXMub3JnLzIwMTMvYW5pbWF0aW5nLXZlY3RvcnMtd2l0aC1zdmcvIGJ5IEJyaWFuIFN1ZGEgKEBicmlhbnN1ZGEpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqIFxuICogQ29weXJpZ2h0IDIwMTMsIENvZHJvcHNcbiAqIGh0dHA6Ly93d3cuY29kcm9wcy5jb21cbiAqL1xuKGZ1bmN0aW9uKCkge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgZG9jRWxlbSA9IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0d2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8IFxuXHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBcblx0XHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHwgXG5cdFx0XHR3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8IFxuXHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fCBcblx0XHRcdGZ1bmN0aW9uKC8qIGZ1bmN0aW9uICovIGNhbGxiYWNrKXtcblx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG5cdFx0XHR9XG5cdFx0KTtcblx0fSgpO1xuXG5cdHdpbmRvdy5jYW5jZWxBbmltRnJhbWUgPSBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgICAgfHwgXG5cdFx0XHR3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgXG5cdFx0XHR3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgfHwgXG5cdFx0XHR3aW5kb3cub0NhbmNlbEFuaW1hdGlvbkZyYW1lICAgICAgfHwgXG5cdFx0XHR3aW5kb3cubXNDYW5jZWxBbmltYXRpb25GcmFtZSAgICAgfHwgXG5cdFx0XHRmdW5jdGlvbihpZCl7XG5cdFx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoaWQpO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH0oKTtcblxuXHRmdW5jdGlvbiBTVkdFbCggZWwgKSB7XG5cdFx0dGhpcy5lbCA9IGVsO1xuXHRcdHRoaXMuaW1hZ2UgPSB0aGlzLmVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cdFx0dGhpcy5jdXJyZW50X2ZyYW1lID0gMDtcblx0XHR0aGlzLnRvdGFsX2ZyYW1lcyA9IDYwO1xuXHRcdHRoaXMucGF0aCA9IG5ldyBBcnJheSgpO1xuXHRcdHRoaXMubGVuZ3RoID0gbmV3IEFycmF5KCk7XG5cdFx0dGhpcy5oYW5kbGUgPSAwO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0U1ZHRWwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0W10uc2xpY2UuY2FsbCggdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKCAncGF0aCcgKSApLmZvckVhY2goIGZ1bmN0aW9uKCBwYXRoLCBpICkge1xuXHRcdFx0c2VsZi5wYXRoW2ldID0gcGF0aDtcblx0XHRcdHZhciBsID0gc2VsZi5wYXRoW2ldLmdldFRvdGFsTGVuZ3RoKCk7XG5cdFx0XHRzZWxmLmxlbmd0aFtpXSA9IGw7XG5cdFx0XHRzZWxmLnBhdGhbaV0uc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gbCArICcgJyArIGw7IFxuXHRcdFx0c2VsZi5wYXRoW2ldLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBsO1xuXHRcdH0gKTtcblx0fTtcblxuXHRTVkdFbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYoIHRoaXMucmVuZGVyZWQgKSByZXR1cm47XG5cdFx0dGhpcy5yZW5kZXJlZCA9IHRydWU7XG5cdFx0dGhpcy5kcmF3KCk7XG5cdH07XG5cblx0U1ZHRWwucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRwcm9ncmVzcyA9IHRoaXMuY3VycmVudF9mcmFtZS90aGlzLnRvdGFsX2ZyYW1lcztcblx0XHRpZiAocHJvZ3Jlc3MgPiAxKSB7XG5cdFx0XHR3aW5kb3cuY2FuY2VsQW5pbUZyYW1lKHRoaXMuaGFuZGxlKTtcblx0XHRcdHRoaXMuc2hvd0ltYWdlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY3VycmVudF9mcmFtZSsrO1xuXHRcdFx0Zm9yKHZhciBqPTAsIGxlbiA9IHRoaXMucGF0aC5sZW5ndGg7IGo8bGVuO2orKyl7XG5cdFx0XHRcdHRoaXMucGF0aFtqXS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gTWF0aC5mbG9vcih0aGlzLmxlbmd0aFtqXSAqICgxIC0gcHJvZ3Jlc3MpKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaGFuZGxlID0gd2luZG93LnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24oKSB7IHNlbGYuZHJhdygpOyB9KTtcblx0XHR9XG5cdH07XG5cblx0U1ZHRWwucHJvdG90eXBlLnNob3dJbWFnZSA9IGZ1bmN0aW9uKCkge1xuXHRcdGNsYXNzaWUuYWRkKCB0aGlzLmltYWdlLCAnc2hvdycgKTtcblx0XHRjbGFzc2llLmFkZCggdGhpcy5lbCwgJ2hpZGUnICk7XG5cdH07XG5cblx0ZnVuY3Rpb24gZ2V0Vmlld3BvcnRIKCkge1xuXHRcdHZhciBjbGllbnQgPSBkb2NFbGVtWydjbGllbnRIZWlnaHQnXSxcblx0XHRcdGlubmVyID0gd2luZG93Wydpbm5lckhlaWdodCddO1xuXHRcdCBcblx0XHRpZiggY2xpZW50IDwgaW5uZXIgKVxuXHRcdFx0cmV0dXJuIGlubmVyO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBjbGllbnQ7XG5cdH1cbiBcblx0ZnVuY3Rpb24gc2Nyb2xsWSgpIHtcblx0XHRyZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsVG9wO1xuXHR9XG4gXG5cdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU1OTg3OTcvOTg5NDM5XG5cdGZ1bmN0aW9uIGdldE9mZnNldCggZWwgKSB7XG5cdFx0dmFyIG9mZnNldFRvcCA9IDAsIG9mZnNldExlZnQgPSAwO1xuXHRcdGRvIHtcblx0XHRcdGlmICggIWlzTmFOKCBlbC5vZmZzZXRUb3AgKSApIHtcblx0XHRcdFx0b2Zmc2V0VG9wICs9IGVsLm9mZnNldFRvcDtcblx0XHRcdH1cblx0XHRcdGlmICggIWlzTmFOKCBlbC5vZmZzZXRMZWZ0ICkgKSB7XG5cdFx0XHRcdG9mZnNldExlZnQgKz0gZWwub2Zmc2V0TGVmdDtcblx0XHRcdH1cblx0XHR9IHdoaWxlKCBlbCA9IGVsLm9mZnNldFBhcmVudCApXG4gXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcCA6IG9mZnNldFRvcCxcblx0XHRcdGxlZnQgOiBvZmZzZXRMZWZ0XG5cdFx0fTtcblx0fVxuIFxuXHRmdW5jdGlvbiBpblZpZXdwb3J0KCBlbCwgaCApIHtcblx0XHR2YXIgZWxIID0gZWwub2Zmc2V0SGVpZ2h0LFxuXHRcdFx0c2Nyb2xsZWQgPSBzY3JvbGxZKCksXG5cdFx0XHR2aWV3ZWQgPSBzY3JvbGxlZCArIGdldFZpZXdwb3J0SCgpLFxuXHRcdFx0ZWxUb3AgPSBnZXRPZmZzZXQoZWwpLnRvcCxcblx0XHRcdGVsQm90dG9tID0gZWxUb3AgKyBlbEgsXG5cdFx0XHQvLyBpZiAwLCB0aGUgZWxlbWVudCBpcyBjb25zaWRlcmVkIGluIHRoZSB2aWV3cG9ydCBhcyBzb29uIGFzIGl0IGVudGVycy5cblx0XHRcdC8vIGlmIDEsIHRoZSBlbGVtZW50IGlzIGNvbnNpZGVyZWQgaW4gdGhlIHZpZXdwb3J0IG9ubHkgd2hlbiBpdCdzIGZ1bGx5IGluc2lkZVxuXHRcdFx0Ly8gdmFsdWUgaW4gcGVyY2VudGFnZSAoMSA+PSBoID49IDApXG5cdFx0XHRoID0gaCB8fCAwO1xuIFxuXHRcdHJldHVybiAoZWxUb3AgKyBlbEggKiBoKSA8PSB2aWV3ZWQgJiYgKGVsQm90dG9tKSA+PSBzY3JvbGxlZDtcblx0fVxuXHRcblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHR2YXIgc3ZncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnI21haW4gc3ZnJyApICksXG5cdFx0XHRzdmdBcnIgPSBuZXcgQXJyYXkoKSxcblx0XHRcdGRpZFNjcm9sbCA9IGZhbHNlLFxuXHRcdFx0cmVzaXplVGltZW91dDtcblxuXHRcdC8vIHRoZSBzdmdzIGFscmVhZHkgc2hvd24uLi5cblx0XHRzdmdzLmZvckVhY2goIGZ1bmN0aW9uKCBlbCwgaSApIHtcblx0XHRcdHZhciBzdmcgPSBuZXcgU1ZHRWwoIGVsICk7XG5cdFx0XHRzdmdBcnJbaV0gPSBzdmc7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmKCBpblZpZXdwb3J0KCBlbC5wYXJlbnROb2RlICkgKSB7XG5cdFx0XHRcdFx0XHRzdmcucmVuZGVyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSggZWwgKSwgMjUwICk7IFxuXHRcdH0gKTtcblxuXHRcdHZhciBzY3JvbGxIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmKCAhZGlkU2Nyb2xsICkge1xuXHRcdFx0XHRcdGRpZFNjcm9sbCA9IHRydWU7XG5cdFx0XHRcdFx0c2V0VGltZW91dCggZnVuY3Rpb24oKSB7IHNjcm9sbFBhZ2UoKTsgfSwgNjAgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNjcm9sbFBhZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0c3Zncy5mb3JFYWNoKCBmdW5jdGlvbiggZWwsIGkgKSB7XG5cdFx0XHRcdFx0aWYoIGluVmlld3BvcnQoIGVsLnBhcmVudE5vZGUsIDAuNSApICkge1xuXHRcdFx0XHRcdFx0c3ZnQXJyW2ldLnJlbmRlcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGRpZFNjcm9sbCA9IGZhbHNlO1xuXHRcdFx0fSxcblx0XHRcdHJlc2l6ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZnVuY3Rpb24gZGVsYXllZCgpIHtcblx0XHRcdFx0XHRzY3JvbGxQYWdlKCk7XG5cdFx0XHRcdFx0cmVzaXplVGltZW91dCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCByZXNpemVUaW1lb3V0ICkge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dCggcmVzaXplVGltZW91dCApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCBkZWxheWVkLCAyMDAgKTtcblx0XHRcdH07XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHNjcm9sbEhhbmRsZXIsIGZhbHNlICk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCByZXNpemVIYW5kbGVyLCBmYWxzZSApO1xuXHR9XG5cblx0aW5pdCgpO1xuXG59KSgpOyJdLCJmaWxlIjoic3ZnYW5pbWF0aW9ucy5qcyJ9
