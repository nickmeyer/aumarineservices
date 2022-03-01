/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkucGFyYWxsYXgtMS4xLjMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcblBsdWdpbjogalF1ZXJ5IFBhcmFsbGF4XG5WZXJzaW9uIDEuMS4zXG5BdXRob3I6IElhbiBMdW5uXG5Ud2l0dGVyOiBASWFuTHVublxuQXV0aG9yIFVSTDogaHR0cDovL3d3dy5pYW5sdW5uLmNvLnVrL1xuUGx1Z2luIFVSTDogaHR0cDovL3d3dy5pYW5sdW5uLmNvLnVrL3BsdWdpbnMvanF1ZXJ5LXBhcmFsbGF4L1xuXG5EdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCBsaWNlbnNlczpcbmh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5odHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLmh0bWxcbiovXG5cbihmdW5jdGlvbiggJCApe1xuXHR2YXIgJHdpbmRvdyA9ICQod2luZG93KTtcblx0dmFyIHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCk7XG5cblx0JHdpbmRvdy5yZXNpemUoZnVuY3Rpb24gKCkge1xuXHRcdHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCk7XG5cdH0pO1xuXG5cdCQuZm4ucGFyYWxsYXggPSBmdW5jdGlvbih4cG9zLCBzcGVlZEZhY3Rvciwgb3V0ZXJIZWlnaHQpIHtcblx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdHZhciBnZXRIZWlnaHQ7XG5cdFx0dmFyIGZpcnN0VG9wO1xuXHRcdHZhciBwYWRkaW5nVG9wID0gMDtcblx0XHRcblx0XHQvL2dldCB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgZWFjaCBlbGVtZW50IHRvIGhhdmUgcGFyYWxsYXggYXBwbGllZCB0byBpdFx0XHRcblx0XHQkdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0ICAgIGZpcnN0VG9wID0gJHRoaXMub2Zmc2V0KCkudG9wO1xuXHRcdH0pO1xuXG5cdFx0aWYgKG91dGVySGVpZ2h0KSB7XG5cdFx0XHRnZXRIZWlnaHQgPSBmdW5jdGlvbihqcW8pIHtcblx0XHRcdFx0cmV0dXJuIGpxby5vdXRlckhlaWdodCh0cnVlKTtcblx0XHRcdH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGdldEhlaWdodCA9IGZ1bmN0aW9uKGpxbykge1xuXHRcdFx0XHRyZXR1cm4ganFvLmhlaWdodCgpO1xuXHRcdFx0fTtcblx0XHR9XG5cdFx0XHRcblx0XHQvLyBzZXR1cCBkZWZhdWx0cyBpZiBhcmd1bWVudHMgYXJlbid0IHNwZWNpZmllZFxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSB8fCB4cG9zID09PSBudWxsKSB4cG9zID0gXCI1MCVcIjtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIgfHwgc3BlZWRGYWN0b3IgPT09IG51bGwpIHNwZWVkRmFjdG9yID0gMC4xO1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMyB8fCBvdXRlckhlaWdodCA9PT0gbnVsbCkgb3V0ZXJIZWlnaHQgPSB0cnVlO1xuXHRcdFxuXHRcdC8vIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgd2luZG93IGlzIHNjcm9sbGVkIG9yIHJlc2l6ZWRcblx0XHRmdW5jdGlvbiB1cGRhdGUoKXtcblx0XHRcdHZhciBwb3MgPSAkd2luZG93LnNjcm9sbFRvcCgpO1x0XHRcdFx0XG5cblx0XHRcdCR0aGlzLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyICRlbGVtZW50ID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIHRvcCA9ICRlbGVtZW50Lm9mZnNldCgpLnRvcDtcblx0XHRcdFx0dmFyIGhlaWdodCA9IGdldEhlaWdodCgkZWxlbWVudCk7XG5cblx0XHRcdFx0Ly8gQ2hlY2sgaWYgdG90YWxseSBhYm92ZSBvciB0b3RhbGx5IGJlbG93IHZpZXdwb3J0XG5cdFx0XHRcdGlmICh0b3AgKyBoZWlnaHQgPCBwb3MgfHwgdG9wID4gcG9zICsgd2luZG93SGVpZ2h0KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0JHRoaXMuY3NzKCdiYWNrZ3JvdW5kUG9zaXRpb24nLCB4cG9zICsgXCIgXCIgKyBNYXRoLnJvdW5kKChmaXJzdFRvcCAtIHBvcykgKiBzcGVlZEZhY3RvcikgKyBcInB4XCIpO1xuXHRcdFx0fSk7XG5cdFx0fVx0XHRcblxuXHRcdCR3aW5kb3cuYmluZCgnc2Nyb2xsJywgdXBkYXRlKS5yZXNpemUodXBkYXRlKTtcblx0XHR1cGRhdGUoKTtcblx0fTtcbn0pKGpRdWVyeSk7XG4iXSwiZmlsZSI6ImpxdWVyeS5wYXJhbGxheC0xLjEuMy5qcyJ9
