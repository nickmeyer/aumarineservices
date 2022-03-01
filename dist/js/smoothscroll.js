/**
 * Created by IntelliJ IDEA.
 *
 * User: phil
 * Date: 15/11/12
 * Time: 11:04 AM
 *
 */
(function ($) {

    var self = this, container, running=false, currentY = 0, targetY = 0, oldY = 0, maxScrollTop= 0, minScrollTop, direction, onRenderCallback=null,
            fricton = 10, // higher value for slower deceleration
            vy = 0,
            stepAmt = 1,
            minMovement= 0.1,
            ts=0.1;

    var updateScrollTarget = function (amt) {
        targetY += amt;
        vy += (targetY - oldY) * stepAmt;

        oldY = targetY;


    }
    var render = function () {
        if (vy < -(minMovement) || vy > minMovement) {

            currentY = (currentY + vy);
            if (currentY > maxScrollTop) {
                currentY = vy = 0;
            } else if (currentY < minScrollTop) {
                    vy = 0;
                    currentY = minScrollTop;
                }

            container.scrollTop(-currentY);

            vy *= fricton;

         //   vy += ts * (currentY-targetY);
            // scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);
            // currentY += ts * (targetY - currentY);

            if(onRenderCallback){
                onRenderCallback();
            }
        }
    }
    var animateLoop = function () {
        if(! running)return;
        requestAnimFrame(animateLoop);
        render();
        //log("45","animateLoop","animateLoop", "",stop);
    }
    var onWheel = function (e) {
        e.preventDefault();
        var evt = e.originalEvent;

        var delta = evt.detail ? evt.detail * -1 : evt.wheelDelta / 40;
        var dir = delta < 0 ? -1 : 1;
        if (dir != direction) {
            vy = 0;
            direction = dir;
        }

        //reset currentY in case non-wheel scroll has occurred (scrollbar drag, etc.)
        currentY = -container.scrollTop();

        updateScrollTarget(delta);
    }

    /*
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };


    })();

    /*
     * http://jsbin.com/iqafek/2/edit
     */
    var normalizeWheelDelta = function () {
        // Keep a distribution of observed values, and scale by the
        // 33rd percentile.
        var distribution = [], done = null, scale = 30;
        return function (n) {
            // Zeroes don't count.
            if (n == 0) return n;
            // After 500 samples, we stop sampling and keep current factor.
            if (done != null) return n * done;
            var abs = Math.abs(n);
            // Insert value (sorted in ascending order).
            outer: do { // Just used for break goto
                for (var i = 0; i < distribution.length; ++i) {
                    if (abs <= distribution[i]) {
                        distribution.splice(i, 0, abs);
                        break outer;
                    }
                }
                distribution.push(abs);
            } while (false);
            // Factor is scale divided by 33rd percentile.
            var factor = scale / distribution[Math.floor(distribution.length / 3)];
            if (distribution.length == 500) done = factor;
            return n * factor;
        };
    }();


    $.fn.smoothWheel = function () {
        //  var args = [].splice.call(arguments, 0);
        var options = jQuery.extend({}, arguments[0]);
        return this.each(function (index, elm) {

            if(!('ontouchstart' in window)){
                container = $(this);
                container.bind("mousewheel", onWheel);
                container.bind("DOMMouseScroll", onWheel);

                //set target/old/current Y to match current scroll position to prevent jump to top of container
                targetY = oldY = container.get(0).scrollTop;
                currentY = -targetY;

                minScrollTop = container.get(0).clientHeight - container.get(0).scrollHeight;
                if(options.onRender){
                    onRenderCallback = options.onRender;
                }
                if(options.remove){
                    log("122","smoothWheel","remove", "");
                    running=false;
                    container.unbind("mousewheel", onWheel);
                    container.unbind("DOMMouseScroll", onWheel);
                }else if(!running){
                    running=true;
                    animateLoop();
                }

            }
        });
    };

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzbW9vdGhzY3JvbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IEludGVsbGlKIElERUEuXG4gKlxuICogVXNlcjogcGhpbFxuICogRGF0ZTogMTUvMTEvMTJcbiAqIFRpbWU6IDExOjA0IEFNXG4gKlxuICovXG4oZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBzZWxmID0gdGhpcywgY29udGFpbmVyLCBydW5uaW5nPWZhbHNlLCBjdXJyZW50WSA9IDAsIHRhcmdldFkgPSAwLCBvbGRZID0gMCwgbWF4U2Nyb2xsVG9wPSAwLCBtaW5TY3JvbGxUb3AsIGRpcmVjdGlvbiwgb25SZW5kZXJDYWxsYmFjaz1udWxsLFxuICAgICAgICAgICAgZnJpY3RvbiA9IDEwLCAvLyBoaWdoZXIgdmFsdWUgZm9yIHNsb3dlciBkZWNlbGVyYXRpb25cbiAgICAgICAgICAgIHZ5ID0gMCxcbiAgICAgICAgICAgIHN0ZXBBbXQgPSAxLFxuICAgICAgICAgICAgbWluTW92ZW1lbnQ9IDAuMSxcbiAgICAgICAgICAgIHRzPTAuMTtcblxuICAgIHZhciB1cGRhdGVTY3JvbGxUYXJnZXQgPSBmdW5jdGlvbiAoYW10KSB7XG4gICAgICAgIHRhcmdldFkgKz0gYW10O1xuICAgICAgICB2eSArPSAodGFyZ2V0WSAtIG9sZFkpICogc3RlcEFtdDtcblxuICAgICAgICBvbGRZID0gdGFyZ2V0WTtcblxuXG4gICAgfVxuICAgIHZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh2eSA8IC0obWluTW92ZW1lbnQpIHx8IHZ5ID4gbWluTW92ZW1lbnQpIHtcblxuICAgICAgICAgICAgY3VycmVudFkgPSAoY3VycmVudFkgKyB2eSk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFkgPiBtYXhTY3JvbGxUb3ApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50WSA9IHZ5ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFkgPCBtaW5TY3JvbGxUb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgdnkgPSAwO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WSA9IG1pblNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AoLWN1cnJlbnRZKTtcblxuICAgICAgICAgICAgdnkgKj0gZnJpY3RvbjtcblxuICAgICAgICAgLy8gICB2eSArPSB0cyAqIChjdXJyZW50WS10YXJnZXRZKTtcbiAgICAgICAgICAgIC8vIHNjcm9sbFRvcFR3ZWVuZWQgKz0gc2V0dGluZ3MudHdlZW5TcGVlZCAqIChzY3JvbGxUb3AgLSBzY3JvbGxUb3BUd2VlbmVkKTtcbiAgICAgICAgICAgIC8vIGN1cnJlbnRZICs9IHRzICogKHRhcmdldFkgLSBjdXJyZW50WSk7XG5cbiAgICAgICAgICAgIGlmKG9uUmVuZGVyQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgIG9uUmVuZGVyQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgYW5pbWF0ZUxvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmKCEgcnVubmluZylyZXR1cm47XG4gICAgICAgIHJlcXVlc3RBbmltRnJhbWUoYW5pbWF0ZUxvb3ApO1xuICAgICAgICByZW5kZXIoKTtcbiAgICAgICAgLy9sb2coXCI0NVwiLFwiYW5pbWF0ZUxvb3BcIixcImFuaW1hdGVMb29wXCIsIFwiXCIsc3RvcCk7XG4gICAgfVxuICAgIHZhciBvbldoZWVsID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgZXZ0ID0gZS5vcmlnaW5hbEV2ZW50O1xuXG4gICAgICAgIHZhciBkZWx0YSA9IGV2dC5kZXRhaWwgPyBldnQuZGV0YWlsICogLTEgOiBldnQud2hlZWxEZWx0YSAvIDQwO1xuICAgICAgICB2YXIgZGlyID0gZGVsdGEgPCAwID8gLTEgOiAxO1xuICAgICAgICBpZiAoZGlyICE9IGRpcmVjdGlvbikge1xuICAgICAgICAgICAgdnkgPSAwO1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gZGlyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXNldCBjdXJyZW50WSBpbiBjYXNlIG5vbi13aGVlbCBzY3JvbGwgaGFzIG9jY3VycmVkIChzY3JvbGxiYXIgZHJhZywgZXRjLilcbiAgICAgICAgY3VycmVudFkgPSAtY29udGFpbmVyLnNjcm9sbFRvcCgpO1xuXG4gICAgICAgIHVwZGF0ZVNjcm9sbFRhcmdldChkZWx0YSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuICAgICAqL1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgICAgICAgICB9O1xuXG5cbiAgICB9KSgpO1xuXG4gICAgLypcbiAgICAgKiBodHRwOi8vanNiaW4uY29tL2lxYWZlay8yL2VkaXRcbiAgICAgKi9cbiAgICB2YXIgbm9ybWFsaXplV2hlZWxEZWx0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gS2VlcCBhIGRpc3RyaWJ1dGlvbiBvZiBvYnNlcnZlZCB2YWx1ZXMsIGFuZCBzY2FsZSBieSB0aGVcbiAgICAgICAgLy8gMzNyZCBwZXJjZW50aWxlLlxuICAgICAgICB2YXIgZGlzdHJpYnV0aW9uID0gW10sIGRvbmUgPSBudWxsLCBzY2FsZSA9IDMwO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgIC8vIFplcm9lcyBkb24ndCBjb3VudC5cbiAgICAgICAgICAgIGlmIChuID09IDApIHJldHVybiBuO1xuICAgICAgICAgICAgLy8gQWZ0ZXIgNTAwIHNhbXBsZXMsIHdlIHN0b3Agc2FtcGxpbmcgYW5kIGtlZXAgY3VycmVudCBmYWN0b3IuXG4gICAgICAgICAgICBpZiAoZG9uZSAhPSBudWxsKSByZXR1cm4gbiAqIGRvbmU7XG4gICAgICAgICAgICB2YXIgYWJzID0gTWF0aC5hYnMobik7XG4gICAgICAgICAgICAvLyBJbnNlcnQgdmFsdWUgKHNvcnRlZCBpbiBhc2NlbmRpbmcgb3JkZXIpLlxuICAgICAgICAgICAgb3V0ZXI6IGRvIHsgLy8gSnVzdCB1c2VkIGZvciBicmVhayBnb3RvXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXN0cmlidXRpb24ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFicyA8PSBkaXN0cmlidXRpb25baV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RyaWJ1dGlvbi5zcGxpY2UoaSwgMCwgYWJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIG91dGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpc3RyaWJ1dGlvbi5wdXNoKGFicyk7XG4gICAgICAgICAgICB9IHdoaWxlIChmYWxzZSk7XG4gICAgICAgICAgICAvLyBGYWN0b3IgaXMgc2NhbGUgZGl2aWRlZCBieSAzM3JkIHBlcmNlbnRpbGUuXG4gICAgICAgICAgICB2YXIgZmFjdG9yID0gc2NhbGUgLyBkaXN0cmlidXRpb25bTWF0aC5mbG9vcihkaXN0cmlidXRpb24ubGVuZ3RoIC8gMyldO1xuICAgICAgICAgICAgaWYgKGRpc3RyaWJ1dGlvbi5sZW5ndGggPT0gNTAwKSBkb25lID0gZmFjdG9yO1xuICAgICAgICAgICAgcmV0dXJuIG4gKiBmYWN0b3I7XG4gICAgICAgIH07XG4gICAgfSgpO1xuXG5cbiAgICAkLmZuLnNtb290aFdoZWVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgdmFyIGFyZ3MgPSBbXS5zcGxpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGpRdWVyeS5leHRlbmQoe30sIGFyZ3VtZW50c1swXSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbG0pIHtcblxuICAgICAgICAgICAgaWYoISgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpKXtcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5iaW5kKFwibW91c2V3aGVlbFwiLCBvbldoZWVsKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYmluZChcIkRPTU1vdXNlU2Nyb2xsXCIsIG9uV2hlZWwpO1xuXG4gICAgICAgICAgICAgICAgLy9zZXQgdGFyZ2V0L29sZC9jdXJyZW50IFkgdG8gbWF0Y2ggY3VycmVudCBzY3JvbGwgcG9zaXRpb24gdG8gcHJldmVudCBqdW1wIHRvIHRvcCBvZiBjb250YWluZXJcbiAgICAgICAgICAgICAgICB0YXJnZXRZID0gb2xkWSA9IGNvbnRhaW5lci5nZXQoMCkuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRZID0gLXRhcmdldFk7XG5cbiAgICAgICAgICAgICAgICBtaW5TY3JvbGxUb3AgPSBjb250YWluZXIuZ2V0KDApLmNsaWVudEhlaWdodCAtIGNvbnRhaW5lci5nZXQoMCkuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMub25SZW5kZXIpe1xuICAgICAgICAgICAgICAgICAgICBvblJlbmRlckNhbGxiYWNrID0gb3B0aW9ucy5vblJlbmRlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYob3B0aW9ucy5yZW1vdmUpe1xuICAgICAgICAgICAgICAgICAgICBsb2coXCIxMjJcIixcInNtb290aFdoZWVsXCIsXCJyZW1vdmVcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc9ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci51bmJpbmQoXCJtb3VzZXdoZWVsXCIsIG9uV2hlZWwpO1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIudW5iaW5kKFwiRE9NTW91c2VTY3JvbGxcIiwgb25XaGVlbCk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoIXJ1bm5pbmcpe1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVMb29wKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4iXSwiZmlsZSI6InNtb290aHNjcm9sbC5qcyJ9
