/* jQuery tubular plugin
|* by Sean McCambridge
|* http://www.seanmccambridge.com/tubular
|* version: 1.0
|* updated: October 1, 2012
|* since 2010
|* licensed under the MIT License
|* Enjoy.
|* 
|* Thanks,
|* Sean */

;(function ($, window) {

    // test for feature support and return if failure
    
    // defaults
    var defaults = {
        ratio: 16/9, // usually either 4/3 or 16/9 -- tweak as needed
        videoId: 'ZCAnLxRvNNc', // toy robot in space is a good default, no?
        mute: true,
        repeat: true,
        width: $(window).width(),
        wrapperZIndex: 99,
        playButtonClass: 'tubular-play',
        pauseButtonClass: 'tubular-pause',
        muteButtonClass: 'tubular-mute',
        volumeUpClass: 'tubular-volume-up',
        volumeDownClass: 'tubular-volume-down',
        increaseVolumeBy: 10,
        start: 0
    };

    // methods

    var tubular = function(node, options) { // should be called on the wrapper div
        var options = $.extend({}, defaults, options),
            $body = $('body') // cache body node
            $node = $(node); // cache wrapper node

        // build container
        var tubularContainer = '<div id="tubular-container" style="overflow: hidden; position: fixed; z-index: 1; width: 100%; height: 100%"><div id="tubular-player" style="position: absolute"></div></div><div id="tubular-shield" style="width: 100%; height: 100%; z-index: 2; position: absolute; left: 0; top: 0;"></div>';

        // set up css prereq's, inject tubular container and set up wrapper defaults
        $('html,body').css({'width': '100%', 'height': '100%'});
        $body.prepend(tubularContainer);
        $node.css({position: 'relative', 'z-index': options.wrapperZIndex});

        // set up iframe player, use global scope so YT api can talk
        window.player;
        window.onYouTubeIframeAPIReady = function() {
            player = new YT.Player('tubular-player', {
                width: options.width,
                height: Math.ceil(options.width / options.ratio),
                videoId: options.videoId,
                playerVars: {
                    controls: 0,
                    showinfo: 0,
                    modestbranding: 1,
                    wmode: 'transparent'
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        window.onPlayerReady = function(e) {
            resize();
            if (options.mute) e.target.mute();
            e.target.seekTo(options.start);
            e.target.playVideo();
        }

        window.onPlayerStateChange = function(state) {
            if (state.data === 0 && options.repeat) { // video ended and repeat option is set true
                player.seekTo(options.start); // restart
            }
        }

        // resize handler updates width, height and offset of player after resize/init
        var resize = function() {
            var width = $(window).width(),
                pWidth, // player width, to be defined
                height = $(window).height(),
                pHeight, // player height, tbd
                $tubularPlayer = $('#tubular-player');

            // when screen aspect ratio differs from video, video must center and underlay one dimension

            if (width / options.ratio < height) { // if new video height < window height (gap underneath)
                pWidth = Math.ceil(height * options.ratio); // get new player width
                $tubularPlayer.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0}); // player width is greater, offset left; reset top
            } else { // new video width < window width (gap to right)
                pHeight = Math.ceil(width / options.ratio); // get new player height
                $tubularPlayer.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2}); // player height is greater, offset top; reset left
            }

        }

        // events
        $(window).on('resize.tubular', function() {
            resize();
        })

        $('body').on('click','.' + options.playButtonClass, function(e) { // play button
            e.preventDefault();
            player.playVideo();
        }).on('click', '.' + options.pauseButtonClass, function(e) { // pause button
            e.preventDefault();
            player.pauseVideo();
        }).on('click', '.' + options.muteButtonClass, function(e) { // mute button
            e.preventDefault();
            (player.isMuted()) ? player.unMute() : player.mute();
        }).on('click', '.' + options.volumeDownClass, function(e) { // volume down button
            e.preventDefault();
            var currentVolume = player.getVolume();
            if (currentVolume < options.increaseVolumeBy) currentVolume = options.increaseVolumeBy;
            player.setVolume(currentVolume - options.increaseVolumeBy);
        }).on('click', '.' + options.volumeUpClass, function(e) { // volume up button
            e.preventDefault();
            if (player.isMuted()) player.unMute(); // if mute is on, unmute
            var currentVolume = player.getVolume();
            if (currentVolume > 100 - options.increaseVolumeBy) currentVolume = 100 - options.increaseVolumeBy;
            player.setVolume(currentVolume + options.increaseVolumeBy);
        })
    }

    // load yt iframe js api

    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // create plugin

    $.fn.tubular = function (options) {
        return this.each(function () {
            if (!$.data(this, 'tubular_instantiated')) { // let's only run one
                $.data(this, 'tubular_instantiated', 
                tubular(this, options));
            }
        });
    }

})(jQuery, window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkudHVidWxhci4xLjAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogalF1ZXJ5IHR1YnVsYXIgcGx1Z2luXG58KiBieSBTZWFuIE1jQ2FtYnJpZGdlXG58KiBodHRwOi8vd3d3LnNlYW5tY2NhbWJyaWRnZS5jb20vdHVidWxhclxufCogdmVyc2lvbjogMS4wXG58KiB1cGRhdGVkOiBPY3RvYmVyIDEsIDIwMTJcbnwqIHNpbmNlIDIwMTBcbnwqIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxufCogRW5qb3kuXG58KiBcbnwqIFRoYW5rcyxcbnwqIFNlYW4gKi9cblxuOyhmdW5jdGlvbiAoJCwgd2luZG93KSB7XG5cbiAgICAvLyB0ZXN0IGZvciBmZWF0dXJlIHN1cHBvcnQgYW5kIHJldHVybiBpZiBmYWlsdXJlXG4gICAgXG4gICAgLy8gZGVmYXVsdHNcbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIHJhdGlvOiAxNi85LCAvLyB1c3VhbGx5IGVpdGhlciA0LzMgb3IgMTYvOSAtLSB0d2VhayBhcyBuZWVkZWRcbiAgICAgICAgdmlkZW9JZDogJ1pDQW5MeFJ2Tk5jJywgLy8gdG95IHJvYm90IGluIHNwYWNlIGlzIGEgZ29vZCBkZWZhdWx0LCBubz9cbiAgICAgICAgbXV0ZTogdHJ1ZSxcbiAgICAgICAgcmVwZWF0OiB0cnVlLFxuICAgICAgICB3aWR0aDogJCh3aW5kb3cpLndpZHRoKCksXG4gICAgICAgIHdyYXBwZXJaSW5kZXg6IDk5LFxuICAgICAgICBwbGF5QnV0dG9uQ2xhc3M6ICd0dWJ1bGFyLXBsYXknLFxuICAgICAgICBwYXVzZUJ1dHRvbkNsYXNzOiAndHVidWxhci1wYXVzZScsXG4gICAgICAgIG11dGVCdXR0b25DbGFzczogJ3R1YnVsYXItbXV0ZScsXG4gICAgICAgIHZvbHVtZVVwQ2xhc3M6ICd0dWJ1bGFyLXZvbHVtZS11cCcsXG4gICAgICAgIHZvbHVtZURvd25DbGFzczogJ3R1YnVsYXItdm9sdW1lLWRvd24nLFxuICAgICAgICBpbmNyZWFzZVZvbHVtZUJ5OiAxMCxcbiAgICAgICAgc3RhcnQ6IDBcbiAgICB9O1xuXG4gICAgLy8gbWV0aG9kc1xuXG4gICAgdmFyIHR1YnVsYXIgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zKSB7IC8vIHNob3VsZCBiZSBjYWxsZWQgb24gdGhlIHdyYXBwZXIgZGl2XG4gICAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKSxcbiAgICAgICAgICAgICRib2R5ID0gJCgnYm9keScpIC8vIGNhY2hlIGJvZHkgbm9kZVxuICAgICAgICAgICAgJG5vZGUgPSAkKG5vZGUpOyAvLyBjYWNoZSB3cmFwcGVyIG5vZGVcblxuICAgICAgICAvLyBidWlsZCBjb250YWluZXJcbiAgICAgICAgdmFyIHR1YnVsYXJDb250YWluZXIgPSAnPGRpdiBpZD1cInR1YnVsYXItY29udGFpbmVyXCIgc3R5bGU9XCJvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDE7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCVcIj48ZGl2IGlkPVwidHVidWxhci1wbGF5ZXJcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZVwiPjwvZGl2PjwvZGl2PjxkaXYgaWQ9XCJ0dWJ1bGFyLXNoaWVsZFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgei1pbmRleDogMjsgcG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAwOyB0b3A6IDA7XCI+PC9kaXY+JztcblxuICAgICAgICAvLyBzZXQgdXAgY3NzIHByZXJlcSdzLCBpbmplY3QgdHVidWxhciBjb250YWluZXIgYW5kIHNldCB1cCB3cmFwcGVyIGRlZmF1bHRzXG4gICAgICAgICQoJ2h0bWwsYm9keScpLmNzcyh7J3dpZHRoJzogJzEwMCUnLCAnaGVpZ2h0JzogJzEwMCUnfSk7XG4gICAgICAgICRib2R5LnByZXBlbmQodHVidWxhckNvbnRhaW5lcik7XG4gICAgICAgICRub2RlLmNzcyh7cG9zaXRpb246ICdyZWxhdGl2ZScsICd6LWluZGV4Jzogb3B0aW9ucy53cmFwcGVyWkluZGV4fSk7XG5cbiAgICAgICAgLy8gc2V0IHVwIGlmcmFtZSBwbGF5ZXIsIHVzZSBnbG9iYWwgc2NvcGUgc28gWVQgYXBpIGNhbiB0YWxrXG4gICAgICAgIHdpbmRvdy5wbGF5ZXI7XG4gICAgICAgIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGxheWVyID0gbmV3IFlULlBsYXllcigndHVidWxhci1wbGF5ZXInLCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBNYXRoLmNlaWwob3B0aW9ucy53aWR0aCAvIG9wdGlvbnMucmF0aW8pLFxuICAgICAgICAgICAgICAgIHZpZGVvSWQ6IG9wdGlvbnMudmlkZW9JZCxcbiAgICAgICAgICAgICAgICBwbGF5ZXJWYXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzOiAwLFxuICAgICAgICAgICAgICAgICAgICBzaG93aW5mbzogMCxcbiAgICAgICAgICAgICAgICAgICAgbW9kZXN0YnJhbmRpbmc6IDEsXG4gICAgICAgICAgICAgICAgICAgIHdtb2RlOiAndHJhbnNwYXJlbnQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ29uUmVhZHknOiBvblBsYXllclJlYWR5LFxuICAgICAgICAgICAgICAgICAgICAnb25TdGF0ZUNoYW5nZSc6IG9uUGxheWVyU3RhdGVDaGFuZ2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5vblBsYXllclJlYWR5ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmVzaXplKCk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tdXRlKSBlLnRhcmdldC5tdXRlKCk7XG4gICAgICAgICAgICBlLnRhcmdldC5zZWVrVG8ob3B0aW9ucy5zdGFydCk7XG4gICAgICAgICAgICBlLnRhcmdldC5wbGF5VmlkZW8oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5vblBsYXllclN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5kYXRhID09PSAwICYmIG9wdGlvbnMucmVwZWF0KSB7IC8vIHZpZGVvIGVuZGVkIGFuZCByZXBlYXQgb3B0aW9uIGlzIHNldCB0cnVlXG4gICAgICAgICAgICAgICAgcGxheWVyLnNlZWtUbyhvcHRpb25zLnN0YXJ0KTsgLy8gcmVzdGFydFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzaXplIGhhbmRsZXIgdXBkYXRlcyB3aWR0aCwgaGVpZ2h0IGFuZCBvZmZzZXQgb2YgcGxheWVyIGFmdGVyIHJlc2l6ZS9pbml0XG4gICAgICAgIHZhciByZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9ICQod2luZG93KS53aWR0aCgpLFxuICAgICAgICAgICAgICAgIHBXaWR0aCwgLy8gcGxheWVyIHdpZHRoLCB0byBiZSBkZWZpbmVkXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpLFxuICAgICAgICAgICAgICAgIHBIZWlnaHQsIC8vIHBsYXllciBoZWlnaHQsIHRiZFxuICAgICAgICAgICAgICAgICR0dWJ1bGFyUGxheWVyID0gJCgnI3R1YnVsYXItcGxheWVyJyk7XG5cbiAgICAgICAgICAgIC8vIHdoZW4gc2NyZWVuIGFzcGVjdCByYXRpbyBkaWZmZXJzIGZyb20gdmlkZW8sIHZpZGVvIG11c3QgY2VudGVyIGFuZCB1bmRlcmxheSBvbmUgZGltZW5zaW9uXG5cbiAgICAgICAgICAgIGlmICh3aWR0aCAvIG9wdGlvbnMucmF0aW8gPCBoZWlnaHQpIHsgLy8gaWYgbmV3IHZpZGVvIGhlaWdodCA8IHdpbmRvdyBoZWlnaHQgKGdhcCB1bmRlcm5lYXRoKVxuICAgICAgICAgICAgICAgIHBXaWR0aCA9IE1hdGguY2VpbChoZWlnaHQgKiBvcHRpb25zLnJhdGlvKTsgLy8gZ2V0IG5ldyBwbGF5ZXIgd2lkdGhcbiAgICAgICAgICAgICAgICAkdHVidWxhclBsYXllci53aWR0aChwV2lkdGgpLmhlaWdodChoZWlnaHQpLmNzcyh7bGVmdDogKHdpZHRoIC0gcFdpZHRoKSAvIDIsIHRvcDogMH0pOyAvLyBwbGF5ZXIgd2lkdGggaXMgZ3JlYXRlciwgb2Zmc2V0IGxlZnQ7IHJlc2V0IHRvcFxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gbmV3IHZpZGVvIHdpZHRoIDwgd2luZG93IHdpZHRoIChnYXAgdG8gcmlnaHQpXG4gICAgICAgICAgICAgICAgcEhlaWdodCA9IE1hdGguY2VpbCh3aWR0aCAvIG9wdGlvbnMucmF0aW8pOyAvLyBnZXQgbmV3IHBsYXllciBoZWlnaHRcbiAgICAgICAgICAgICAgICAkdHVidWxhclBsYXllci53aWR0aCh3aWR0aCkuaGVpZ2h0KHBIZWlnaHQpLmNzcyh7bGVmdDogMCwgdG9wOiAoaGVpZ2h0IC0gcEhlaWdodCkgLyAyfSk7IC8vIHBsYXllciBoZWlnaHQgaXMgZ3JlYXRlciwgb2Zmc2V0IHRvcDsgcmVzZXQgbGVmdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBldmVudHNcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUudHVidWxhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVzaXplKCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsJy4nICsgb3B0aW9ucy5wbGF5QnV0dG9uQ2xhc3MsIGZ1bmN0aW9uKGUpIHsgLy8gcGxheSBidXR0b25cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy4nICsgb3B0aW9ucy5wYXVzZUJ1dHRvbkNsYXNzLCBmdW5jdGlvbihlKSB7IC8vIHBhdXNlIGJ1dHRvblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy4nICsgb3B0aW9ucy5tdXRlQnV0dG9uQ2xhc3MsIGZ1bmN0aW9uKGUpIHsgLy8gbXV0ZSBidXR0b25cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIChwbGF5ZXIuaXNNdXRlZCgpKSA/IHBsYXllci51bk11dGUoKSA6IHBsYXllci5tdXRlKCk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcuJyArIG9wdGlvbnMudm9sdW1lRG93bkNsYXNzLCBmdW5jdGlvbihlKSB7IC8vIHZvbHVtZSBkb3duIGJ1dHRvblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRWb2x1bWUgPSBwbGF5ZXIuZ2V0Vm9sdW1lKCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFZvbHVtZSA8IG9wdGlvbnMuaW5jcmVhc2VWb2x1bWVCeSkgY3VycmVudFZvbHVtZSA9IG9wdGlvbnMuaW5jcmVhc2VWb2x1bWVCeTtcbiAgICAgICAgICAgIHBsYXllci5zZXRWb2x1bWUoY3VycmVudFZvbHVtZSAtIG9wdGlvbnMuaW5jcmVhc2VWb2x1bWVCeSk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcuJyArIG9wdGlvbnMudm9sdW1lVXBDbGFzcywgZnVuY3Rpb24oZSkgeyAvLyB2b2x1bWUgdXAgYnV0dG9uXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAocGxheWVyLmlzTXV0ZWQoKSkgcGxheWVyLnVuTXV0ZSgpOyAvLyBpZiBtdXRlIGlzIG9uLCB1bm11dGVcbiAgICAgICAgICAgIHZhciBjdXJyZW50Vm9sdW1lID0gcGxheWVyLmdldFZvbHVtZSgpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRWb2x1bWUgPiAxMDAgLSBvcHRpb25zLmluY3JlYXNlVm9sdW1lQnkpIGN1cnJlbnRWb2x1bWUgPSAxMDAgLSBvcHRpb25zLmluY3JlYXNlVm9sdW1lQnk7XG4gICAgICAgICAgICBwbGF5ZXIuc2V0Vm9sdW1lKGN1cnJlbnRWb2x1bWUgKyBvcHRpb25zLmluY3JlYXNlVm9sdW1lQnkpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIGxvYWQgeXQgaWZyYW1lIGpzIGFwaVxuXG4gICAgdmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHRhZy5zcmMgPSBcIi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIjtcbiAgICB2YXIgZmlyc3RTY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XG5cbiAgICAvLyBjcmVhdGUgcGx1Z2luXG5cbiAgICAkLmZuLnR1YnVsYXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghJC5kYXRhKHRoaXMsICd0dWJ1bGFyX2luc3RhbnRpYXRlZCcpKSB7IC8vIGxldCdzIG9ubHkgcnVuIG9uZVxuICAgICAgICAgICAgICAgICQuZGF0YSh0aGlzLCAndHVidWxhcl9pbnN0YW50aWF0ZWQnLCBcbiAgICAgICAgICAgICAgICB0dWJ1bGFyKHRoaXMsIG9wdGlvbnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59KShqUXVlcnksIHdpbmRvdyk7Il0sImZpbGUiOiJqcXVlcnkudHVidWxhci4xLjAuanMifQ==
