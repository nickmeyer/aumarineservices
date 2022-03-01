var $ = jQuery;
// extend jQuery
$.fn.extend({
    flippy: function (options) {
        var settings = {
            // stop after iteration through all items
            stop: false,
            // time (seconds) between flipps
            interval: 3,
            // speed (ms) of animations
            speed: 1000,
            // distance to fade out
            distance: "150px"
        };
        settings = $.extend(settings, options);
        return this.each(function () {
            // store instance of this
            var $this = $(this);
            // top position of child element
            var topPo = $this.children().eq(1).css('top');
            // interval counter
            var count = 1;
            // interval
            var timer = setInterval(function () {
                // animate item away
                $this.children().eq(0).animate({
                    top: settings.distance,
                    opacity: 0
                }, settings.speed, function () {
                    // move item to the back of the line
                    $(this).css({
                        top: topPo,
                    }).remove().appendTo($this);
                });
                // animate second item in
                $this.children().eq(1).animate({
                    top: 0,
                    opacity: 1
                }, settings.speed / 5);
                // increment
                count++;
                // if stop is true and count equals list length
                if (settings.stop && count === $this.children().length) {
                    // clear timer
                    clearInterval(timer);
                }
            }, settings.interval * 1000);
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmbGlwcHkuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyICQgPSBqUXVlcnk7XG4vLyBleHRlbmQgalF1ZXJ5XG4kLmZuLmV4dGVuZCh7XG4gICAgZmxpcHB5OiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAvLyBzdG9wIGFmdGVyIGl0ZXJhdGlvbiB0aHJvdWdoIGFsbCBpdGVtc1xuICAgICAgICAgICAgc3RvcDogZmFsc2UsXG4gICAgICAgICAgICAvLyB0aW1lIChzZWNvbmRzKSBiZXR3ZWVuIGZsaXBwc1xuICAgICAgICAgICAgaW50ZXJ2YWw6IDMsXG4gICAgICAgICAgICAvLyBzcGVlZCAobXMpIG9mIGFuaW1hdGlvbnNcbiAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgLy8gZGlzdGFuY2UgdG8gZmFkZSBvdXRcbiAgICAgICAgICAgIGRpc3RhbmNlOiBcIjE1MHB4XCJcbiAgICAgICAgfTtcbiAgICAgICAgc2V0dGluZ3MgPSAkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgaW5zdGFuY2Ugb2YgdGhpc1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRvcCBwb3NpdGlvbiBvZiBjaGlsZCBlbGVtZW50XG4gICAgICAgICAgICB2YXIgdG9wUG8gPSAkdGhpcy5jaGlsZHJlbigpLmVxKDEpLmNzcygndG9wJyk7XG4gICAgICAgICAgICAvLyBpbnRlcnZhbCBjb3VudGVyXG4gICAgICAgICAgICB2YXIgY291bnQgPSAxO1xuICAgICAgICAgICAgLy8gaW50ZXJ2YWxcbiAgICAgICAgICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBhbmltYXRlIGl0ZW0gYXdheVxuICAgICAgICAgICAgICAgICR0aGlzLmNoaWxkcmVuKCkuZXEoMCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogc2V0dGluZ3MuZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlIGl0ZW0gdG8gdGhlIGJhY2sgb2YgdGhlIGxpbmVcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3BQbyxcbiAgICAgICAgICAgICAgICAgICAgfSkucmVtb3ZlKCkuYXBwZW5kVG8oJHRoaXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIGFuaW1hdGUgc2Vjb25kIGl0ZW0gaW5cbiAgICAgICAgICAgICAgICAkdGhpcy5jaGlsZHJlbigpLmVxKDEpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCAvIDUpO1xuICAgICAgICAgICAgICAgIC8vIGluY3JlbWVudFxuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgLy8gaWYgc3RvcCBpcyB0cnVlIGFuZCBjb3VudCBlcXVhbHMgbGlzdCBsZW5ndGhcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3Muc3RvcCAmJiBjb3VudCA9PT0gJHRoaXMuY2hpbGRyZW4oKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYXIgdGltZXJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgc2V0dGluZ3MuaW50ZXJ2YWwgKiAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7Il0sImZpbGUiOiJmbGlwcHkuanMifQ==
