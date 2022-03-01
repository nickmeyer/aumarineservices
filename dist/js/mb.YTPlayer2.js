
$(document).ready(function(){
	var onMobile = false;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { onMobile = true; }

	if( ( onMobile === false ) ) {

			$(".player").mb_YTPlayer();

	} else {

			/* as a fallback we add a special class to the header which displays a poster image */
			$('#home').addClass('video-section');

			/* hide player */
			$(".player").hide();

			$("#video-volume").hide();

		}
});


/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.YTPlayer.js
 *
 *  Copyright (c) 2001-2013. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 30/08/13 23.31
 *  *****************************************************************************
 */

/*Browser detection patch*/
(function(){if(!(8>jQuery.fn.jquery.split(".")[1])){jQuery.browser={};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.msie=!1;var a=navigator.userAgent;jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var c,b;if(-1!=(b=a.indexOf("Opera"))){if(jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=a.substring(b+6),-1!=(b= a.indexOf("Version")))jQuery.browser.fullVersion=a.substring(b+8)}else if(-1!=(b=a.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=a.substring(b+5);else if(-1!=(b=a.indexOf("Chrome")))jQuery.browser.webkit=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=a.substring(b+7);else if(-1!=(b=a.indexOf("Safari"))){if(jQuery.browser.webkit=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=a.substring(b+7),-1!=(b=a.indexOf("Version")))jQuery.browser.fullVersion= a.substring(b+8)}else if(-1!=(b=a.indexOf("Firefox")))jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=a.substring(b+8);else if((c=a.lastIndexOf(" ")+1)<(b=a.lastIndexOf("/")))jQuery.browser.name=a.substring(c,b),jQuery.browser.fullVersion=a.substring(b+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName);if(-1!=(a=jQuery.browser.fullVersion.indexOf(";")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0, a);if(-1!=(a=jQuery.browser.fullVersion.indexOf(" ")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,a);jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));jQuery.browser.version=jQuery.browser.majorVersion}})(jQuery);

/*******************************************************************************
 * jQuery.mb.components: jquery.mb.CSSAnimate
 ******************************************************************************/

jQuery.fn.CSSAnimate=function(a,b,k,l,f){return this.each(function(){var c=jQuery(this);if(0!==c.length&&a){"function"==typeof b&&(f=b,b=jQuery.fx.speeds._default);"function"==typeof k&&(f=k,k=0);"function"==typeof l&&(f=l,l="cubic-bezier(0.65,0.03,0.36,0.72)");if("string"==typeof b)for(var j in jQuery.fx.speeds)if(b==j){b=jQuery.fx.speeds[j];break}else b=null;if(jQuery.support.transition){var e="",h="transitionEnd";jQuery.browser.webkit?(e="-webkit-",h="webkitTransitionEnd"):jQuery.browser.mozilla? (e="-moz-",h="transitionend"):jQuery.browser.opera?(e="-o-",h="otransitionend"):jQuery.browser.msie&&(e="-ms-",h="msTransitionEnd");j=[];for(d in a){var g=d;"transform"===g&&(g=e+"transform",a[g]=a[d],delete a[d]);"transform-origin"===g&&(g=e+"transform-origin",a[g]=a[d],delete a[d]);j.push(g);c.css(g)||c.css(g,0)}d=j.join(",");c.css(e+"transition-property",d);c.css(e+"transition-duration",b+"ms");c.css(e+"transition-delay",k+"ms");c.css(e+"transition-timing-function",l);c.css(e+"backface-visibility", "hidden");setTimeout(function(){c.css(a)},0);setTimeout(function(){c.called||!f?c.called=!1:f()},b+20);c.on(h,function(a){c.off(h);c.css(e+"transition","");a.stopPropagation();"function"==typeof f&&(c.called=!0,f());return!1})}else{for(var d in a)"transform"===d&&delete a[d],"transform-origin"===d&&delete a[d],"auto"===a[d]&&delete a[d];if(!f||"string"===typeof f)f="linear";c.animate(a,b,f)}}})}; jQuery.fn.CSSAnimateStop=function(){var a="",b="transitionEnd";jQuery.browser.webkit?(a="-webkit-",b="webkitTransitionEnd"):jQuery.browser.mozilla?(a="-moz-",b="transitionend"):jQuery.browser.opera?(a="-o-",b="otransitionend"):jQuery.browser.msie&&(a="-ms-",b="msTransitionEnd");jQuery(this).css(a+"transition","");jQuery(this).off(b)}; jQuery.support.transition=function(){var a=(document.body||document.documentElement).style;return void 0!==a.transition||void 0!==a.WebkitTransition||void 0!==a.MozTransition||void 0!==a.MsTransition||void 0!==a.OTransition}();

/*
 * Metadata - jQuery plugin for parsing metadata from elements
 * Copyright (c) 2006 John Resig, Yehuda Katz, Jörn Zaefferer, Paul McLanahan
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function(c){c.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/({.*})/,single:"metadata"},setType:function(b,c){this.defaults.type=b;this.defaults.name=c},get:function(b,f){var d=c.extend({},this.defaults,f);d.single.length||(d.single="metadata");var a=c.data(b,d.single);if(a)return a;a="{}";if("class"==d.type){var e=d.cre.exec(b.className);e&&(a=e[1])}else if("elem"==d.type){if(!b.getElementsByTagName)return;e=b.getElementsByTagName(d.name);e.length&&(a=c.trim(e[0].innerHTML))}else void 0!= b.getAttribute&&(e=b.getAttribute(d.name))&&(a=e);0>a.indexOf("{")&&(a="{"+a+"}");a=eval("("+a+")");c.data(b,d.single,a);return a}}});c.fn.metadata=function(b){return c.metadata.get(this[0],b)}})(jQuery);

/***************************************************************************************/
if(typeof ytp != "object")
	ytp ={};

String.prototype.getVideoID=function(){
	var movieURL;
	if(this.substr(0,16)=="https://youtu.be/"){
		movieURL= this.replace("https://youtu.be/","");
	}else if(this.indexOf("https")>-1){
		movieURL = this.match(/[\\?&]v=([^&#]*)/)[1];
	}else{
		movieURL = this
	}
	return movieURL;
};

var isDevice = 'ontouchstart' in window;

function onYouTubePlayerAPIReady() {
	if(ytp.YTAPIReady)
		return;

	ytp.YTAPIReady=true;
	jQuery(document).trigger("YTAPIReady");
}

(function (jQuery) {

	jQuery.mbYTPlayer = {
		name           : "jquery.mb.YTPlayer",
		version        : "2.5.7",
		author         : "auMarine",
		defaults       : {
			containment            : "body",
			ratio                  : "16/9",
			showYTLogo             : false,
			videoURL               : null,
			startAt                : 0,
			autoPlay               : true,
			vol                    :10,
			addRaster              : false,
			opacity                : 1,
			quality                : "default", //or "small", "medium", "large", "hd720", "hd1080", "highres"
			mute                   : false,
			loop                   : true,
			showControls           : true,
			showAnnotations        : false,
			printUrl               : true,
			stopMovieOnClick       :false,
			realfullscreen         :true,
			onReady                : function (player) {},
			onStateChange          : function (player) {},
			onPlaybackQualityChange: function (player) {},
			onError                : function (player) {}
		},
		//todo: use @font-face instead
		controls       : {
			play  : "P",
			pause : "p",
			mute  : "M",
			unmute: "A",
			onlyYT: "O",
			showSite: "R",
			ytLogo: "Y"
		},
		rasterImg      : "images/raster.png",
		rasterImgRetina: "images/raster@2x.png",

		buildPlayer: function (options) {

			return this.each(function () {
				var YTPlayer = this;
				var $YTPlayer = jQuery(YTPlayer);

				YTPlayer.loop = 0;
				YTPlayer.opt = {};
				var property = {};

				$YTPlayer.addClass("mb_YTVPlayer");

				if (jQuery.metadata) {
					jQuery.metadata.setType("class");
					property = $YTPlayer.metadata();
				}

				if (jQuery.isEmptyObject(property))
					property = $YTPlayer.data("property") && typeof $YTPlayer.data("property") == "string" ? eval('(' + $YTPlayer.data("property") + ')') : $YTPlayer.data("property");

				jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property);

				var canGoFullscreen = true;

				if(!canGoFullscreen)
					YTPlayer.opt.realfullscreen = t;

				if (!$YTPlayer.attr("id"))
					$YTPlayer.attr("id", "id_" + new Date().getTime());

				YTPlayer.opt.id = YTPlayer.id;
				YTPlayer.isAlone = false;

				/*to maintain back compatibility
				 * ***********************************************************/
				if (YTPlayer.opt.isBgndMovie)
					YTPlayer.opt.containment = "body";

				if (YTPlayer.opt.isBgndMovie && YTPlayer.opt.isBgndMovie.mute != undefined)
					YTPlayer.opt.mute = YTPlayer.opt.isBgndMovie.mute;

				if (!YTPlayer.opt.videoURL)
					YTPlayer.opt.videoURL = $YTPlayer.attr("href");

				/************************************************************/

				var playerID = "mbYTP_" + YTPlayer.id;
				var videoID = this.opt.videoURL ? this.opt.videoURL.getVideoID() : $YTPlayer.attr("href") ? $YTPlayer.attr("href").getVideoID() : false;
				YTPlayer.videoID = videoID;


				YTPlayer.opt.showAnnotations = (YTPlayer.opt.showAnnotations) ? '0' : '3';
				var playerVars = { 'autoplay': 0, 'modestbranding': 1, 'controls': 0, 'showinfo': 0, 'rel': 0, 'enablejsapi': 1, 'version': 3, 'playerapiid': playerID, 'origin': '*', 'allowfullscreen': true, 'wmode': "transparent", 'iv_load_policy': YTPlayer.opt.showAnnotations};

				var canPlayHTML5 = false;
				var v = document.createElement('video');
				if (v.canPlayType ) { // && !jQuery.browser.msie
					canPlayHTML5 = true;
				}

				if (canPlayHTML5) //  && !(YTPlayer.isPlayList && jQuery.browser.msie)
					jQuery.extend(playerVars, {'html5': 1});

				if(jQuery.browser.msie && jQuery.browser.version < 9 ){
					this.opt.opacity = 1;
				}

				var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox");
				var overlay = jQuery("<div/>").css({position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}).addClass("YTPOverlay"); //YTPlayer.isBackground ? "fixed" :

				YTPlayer.opt.containment = YTPlayer.opt.containment == "self" ? jQuery(this) : jQuery(YTPlayer.opt.containment);

				YTPlayer.isBackground = YTPlayer.opt.containment.get(0).tagName.toLowerCase() == "body";

				if (isDevice && YTPlayer.isBackground){
					$YTPlayer.hide();
					return;
				}

				if (YTPlayer.opt.addRaster) {
					var retina = (window.retina || window.devicePixelRatio > 1);
					overlay.addClass(retina ? "raster retina" : "raster");
				}else{
					overlay.removeClass("raster retina");
				}

				var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
				wrapper.css({position: "absolute", zIndex: 0, minWidth: "100%", minHeight: "100%",left:0, top:0, overflow: "hidden", opacity: 0});
				playerBox.css({position: "absolute", zIndex: 0, width: "100%", height: "100%", top: 0, left: 0, overflow: "hidden", opacity: this.opt.opacity});
				wrapper.append(playerBox);

				if (YTPlayer.isBackground && ytp.isInit)
					return;

				YTPlayer.opt.containment.children().each(function () {
					if (jQuery(this).css("position") == "static")
						jQuery(this).css("position", "relative");
				});

				if (YTPlayer.isBackground) {
					jQuery("body").css({position: "relative", minWidth: "100%", minHeight: "100%", zIndex: 1, boxSizing: "border-box"});
					wrapper.css({position: "absolute", top: 0, left: 0, zIndex: 0});
					$YTPlayer.hide();
					YTPlayer.opt.containment.prepend(wrapper);
				} else
					YTPlayer.opt.containment.prepend(wrapper);

				YTPlayer.wrapper = wrapper;

				playerBox.css({opacity: 1});

				if (!isDevice){
					playerBox.after(overlay);
					YTPlayer.overlay = overlay;
				}


				if(!YTPlayer.isBackground){
					overlay.on("mouseenter",function(){
						$YTPlayer.find(".mb_YTVPBar").addClass("visible");
					}).on("mouseleave",function(){
								$YTPlayer.find(".mb_YTVPBar").removeClass("visible");
							})
				}

				// add YT API to the header
				//jQuery("#YTAPI").remove();

				if(!ytp.YTAPIReady){
					var tag = document.createElement('script');
					tag.src = "https://www.youtube.com/player_api";
					tag.id = "YTAPI";
					var firstScriptTag = document.getElementsByTagName('script')[0];
					firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
				}else{
					setTimeout(function(){
						jQuery(document).trigger("YTAPIReady");
					}, 200)
				}

				jQuery(document).on("YTAPIReady", function () {

					if ((YTPlayer.isBackground && ytp.isInit) || YTPlayer.opt.isInit)
						return;

					if(YTPlayer.isBackground && YTPlayer.opt.stopMovieOnClick)
						jQuery(document).off("mousedown.ytplayer").on("mousedown,.ytplayer",function(e){
							var target = jQuery(e.target);
							if(target.is("a") || target.parents().is("a")){
								$YTPlayer.pauseYTP();
							}
						});

					if (YTPlayer.isBackground)
						ytp.isInit = true;

					YTPlayer.opt.isInit = true;

					YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100;

					jQuery.mbYTPlayer.getDataFromFeed(YTPlayer.videoID, YTPlayer);

					jQuery(document).on("getVideoInfo_" + YTPlayer.opt.id, function () {

						if(isDevice && !YTPlayer.isBackground){
							new YT.Player(playerID, {
								height: '100%',
								width: '100%',
								videoId: YTPlayer.videoID,
								events: {
									'onReady': function(){
										$YTPlayer.optimizeDisplay();
										playerBox.css({opacity: 1});
										YTPlayer.wrapper.css({opacity: 1});
										$YTPlayer.optimizeDisplay();
									},
									'onStateChange': function(){}
								}
							});
							return;
						}

						new YT.Player(playerID, {
							videoId   : YTPlayer.videoID.toString(),
							playerVars: playerVars,
							events    : {
								'onReady': function (event) {

									YTPlayer.player = event.target;

									if(YTPlayer.isReady)
										return;

									YTPlayer.isReady = true;

									YTPlayer.playerEl = YTPlayer.player.getIframe();
									$YTPlayer.optimizeDisplay();

									YTPlayer.videoID = videoID;

									jQuery(window).on("resize.YTP",function () {
										$YTPlayer.optimizeDisplay();
									});

									if (YTPlayer.opt.showControls)
										jQuery(YTPlayer).buildYTPControls();

									//YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality);

									if (YTPlayer.opt.startAt > 0)
										YTPlayer.player.seekTo(parseFloat(YTPlayer.opt.startAt), true);

									if (!YTPlayer.opt.autoPlay) {

										$YTPlayer.stopYTP();
										YTPlayer.checkForStartAt = setInterval(function () {
											if (YTPlayer.player.getCurrentTime() >= YTPlayer.opt.startAt) {
												clearInterval(YTPlayer.checkForStartAt);
												$YTPlayer.pauseYTP();

												if (YTPlayer.opt.mute) {
													jQuery(YTPlayer).muteYTPVolume();
												}else{
													jQuery(YTPlayer).unmuteYTPVolume();
												}
											}
										}, 1);

									} else {
										$YTPlayer.playYTP();
										YTPlayer.player.setVolume(YTPlayer.opt.vol);

										if (YTPlayer.opt.mute) {
											jQuery(YTPlayer).muteYTPVolume();
										}else{
											jQuery(YTPlayer).unmuteYTPVolume();
										}
									}

									if (typeof YTPlayer.opt.onReady == "function")
										YTPlayer.opt.onReady($YTPlayer);

									jQuery.mbYTPlayer.checkForState(YTPlayer);

								},

								'onStateChange'          : function (event) {

									/*
									 -1 (unstarted)
									 0 (ended)
									 1 (playing)
									 2 (paused)
									 3 (buffering)
									 5 (video cued).
									 */

									if (typeof event.target.getPlayerState != "function")
										return;
									var state = event.target.getPlayerState();

									if (typeof YTPlayer.opt.onStateChange == "function")
										YTPlayer.opt.onStateChange($YTPlayer, state);

									var playerBox = jQuery(YTPlayer.playerEl);
									var controls = jQuery("#controlBar_" + YTPlayer.id);

									var data = YTPlayer.opt;

									if (state == 0) { // end
										if (YTPlayer.state == state)
											return;

										YTPlayer.state = state;
										YTPlayer.player.pauseVideo();
										var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;

										if (data.loop) {
											YTPlayer.wrapper.css({opacity: 0});
											$YTPlayer.playYTP();
											YTPlayer.player.seekTo(startAt,true);

										} else if (!YTPlayer.isBackground) {
											YTPlayer.player.seekTo(startAt, true);
											$YTPlayer.playYTP();
											setTimeout(function () {
												$YTPlayer.pauseYTP();
											}, 10);
										}

										if (!data.loop && YTPlayer.isBackground)
											YTPlayer.wrapper.CSSAnimate({opacity: 0}, 2000);
										else if (data.loop) {
											YTPlayer.wrapper.css({opacity: 0});
											YTPlayer.loop++;
										}

										controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
										jQuery(YTPlayer).trigger("YTPEnd");
									}

									if (state == 3) { // buffering
										if (YTPlayer.state == state)
											return;
										YTPlayer.state = state;
										controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
										jQuery(YTPlayer).trigger("YTPBuffering");
									}

									if (state == -1) { // unstarted
										if (YTPlayer.state == state)
											return;
										YTPlayer.state = state;

										YTPlayer.wrapper.css({opacity:0});

										jQuery(YTPlayer).trigger("YTPUnstarted");
									}

									if (state == 1) { // play
										if (YTPlayer.state == state)
											return;
										YTPlayer.state = state;
										YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality);

										if(YTPlayer.opt.mute){
											$YTPlayer.muteYTPVolume();
											YTPlayer.opt.mute = false;
										}

										if (YTPlayer.opt.autoPlay && YTPlayer.loop == 0) {
											YTPlayer.wrapper.CSSAnimate({opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity}, 2000);
										} else if(!YTPlayer.isBackground) {
											YTPlayer.wrapper.css({opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity});
											$YTPlayer.css({background: "rgba(0,0,0,0.5)"});
										}else{
											setTimeout(function () {
												jQuery(YTPlayer.playerEl).CSSAnimate({opacity: 1}, 2000);
												YTPlayer.wrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, 2000);
											}, 1000);
										}

										controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.pause);

										jQuery(YTPlayer).trigger("YTPStart");
									}

									if (state == 2) { // pause
										if (YTPlayer.state == state)
											return;
										YTPlayer.state = state;
										controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
										jQuery(YTPlayer).trigger("YTPPause");
									}
								},
								'onPlaybackQualityChange': function (e) {
									if (typeof YTPlayer.opt.onPlaybackQualityChange == "function")
										YTPlayer.opt.onPlaybackQualityChange($YTPlayer);
								},
								'onError'                : function (err) {

									if(err.data == 2 && YTPlayer.isPlayList)
										jQuery(YTPlayer).playNext();

									if (typeof YTPlayer.opt.onError == "function")
										YTPlayer.opt.onError($YTPlayer, err);
								}
							}
						});
					});
				})
			});
		},

		getDataFromFeed: function (videoID, YTPlayer) {
			//Get video info from FEEDS API

			YTPlayer.videoID = videoID;
			if (!jQuery.browser.msie) { //!(jQuery.browser.msie && jQuery.browser.version<9)

				jQuery.getJSON('https://www.googleapis.com/youtube/v3/' + videoID + '?v=2&alt=jsonc', function (data, status, xhr) {

					YTPlayer.dataReceived = true;

					var videoData = data.data;

					YTPlayer.title = videoData.title;
					YTPlayer.videoData = videoData;

					if (YTPlayer.opt.ratio == "auto")
						if (videoData.aspectRatio && videoData.aspectRatio === "widescreen")
							YTPlayer.opt.ratio = "16/9";
						else
							YTPlayer.opt.ratio = "4/3";

					if(!YTPlayer.isInit){

						YTPlayer.isInit = true;

						if (!YTPlayer.isBackground) {
							var bgndURL = YTPlayer.videoData.thumbnail.hqDefault;

							jQuery(YTPlayer).css({background: "rgba(0,0,0,0.5) url(" + bgndURL + ") center center", backgroundSize: "cover"});
						}

						jQuery(document).trigger("getVideoInfo_" + YTPlayer.opt.id);
					}
					jQuery(YTPlayer).trigger("YTPChanged");
				});

				setTimeout(function(){
					if(!YTPlayer.dataReceived && !YTPlayer.isInit){
						YTPlayer.isInit = true;
						jQuery(document).trigger("getVideoInfo_" + YTPlayer.opt.id);
					}
				},2500)

			} else {
				YTPlayer.opt.ratio == "auto" ? YTPlayer.opt.ratio = "16/9" : YTPlayer.opt.ratio;

				if(!YTPlayer.isInit){
					YTPlayer.isInit = true;
					setTimeout(function(){
						jQuery(document).trigger("getVideoInfo_" + YTPlayer.opt.id);
					},100)

				}
				jQuery(YTPlayer).trigger("YTPChanged");
			}
		},

		getVideoID: function(){
			var YTPlayer = this.get(0);
			return YTPlayer.videoID || false ;
		},

		setVideoQuality: function(quality){
			var YTPlayer = this.get(0);
			YTPlayer.player.setPlaybackQuality(quality);
		},

		YTPlaylist : function(videos, shuffle, callback){
			var YTPlayer = this.get(0);

			YTPlayer.isPlayList = true;

			if(shuffle)
				videos = jQuery.shuffle(videos);

			if(!YTPlayer.videoID){
				YTPlayer.videos = videos;
				YTPlayer.videoCounter = 0;
				YTPlayer.videoLength = videos.length;

				jQuery(YTPlayer).data("property", videos[0]);
				jQuery(YTPlayer).mb_YTPlayer();
			}

			if(typeof callback == "function")
				jQuery(YTPlayer).on("YTPChanged",function(){
					callback(YTPlayer);
				});

			jQuery(YTPlayer).on("YTPEnd", function(){
				jQuery(YTPlayer).playNext();
			});
		},

		playNext: function(){
			var YTPlayer = this.get(0);
			YTPlayer.videoCounter++;
			if(YTPlayer.videoCounter>=YTPlayer.videoLength)
				YTPlayer.videoCounter = 0;
			jQuery(YTPlayer.playerEl).css({opacity:0});
			jQuery(YTPlayer).changeMovie(YTPlayer.videos[YTPlayer.videoCounter]);
		},

		changeMovie: function (opt) {
			var YTPlayer = this.get(0);
			var data = YTPlayer.opt;
			if (opt) {
				jQuery.extend(data, opt);
			}

			YTPlayer.videoID = data.videoURL.getVideoID();

			jQuery(YTPlayer).pauseYTP();
			var timer = jQuery.browser.msie ? 1000 : 0;
			jQuery(YTPlayer).getPlayer().cueVideoByUrl(encodeURI("https://www.youtube.com/v/" + YTPlayer.videoID) , 5 , YTPlayer.opt.quality);

			setTimeout(function(){
				jQuery(YTPlayer).playYTP();
				jQuery(YTPlayer).one("YTPStart", function(){
					jQuery(YTPlayer.playerEl).CSSAnimate({opacity:1},2000);
				});

			},timer)

			if (YTPlayer.opt.mute) {
				jQuery(YTPlayer).muteYTPVolume();
			}else{
				jQuery(YTPlayer).unmuteYTPVolume();
			}

			if (YTPlayer.opt.addRaster) {
				var retina = (window.retina || window.devicePixelRatio > 1);
				YTPlayer.overlay.addClass(retina ? "raster retina" : "raster");
			}else{
				YTPlayer.overlay.removeClass("raster");
				YTPlayer.overlay.removeClass("retina");
			}

			jQuery("#controlBar_" + YTPlayer.id).remove();

			if (YTPlayer.opt.showControls)
				jQuery(YTPlayer).buildYTPControls();

			jQuery.mbYTPlayer.getDataFromFeed(YTPlayer.videoID, YTPlayer);
			jQuery(YTPlayer).optimizeDisplay();
			jQuery.mbYTPlayer.checkForState(YTPlayer);

		},

		getPlayer: function () {
			return jQuery(this).get(0).player;
		},

		playerDestroy: function () {
			var YTPlayer = this.get(0);
			ytp.YTAPIReady = false;
			ytp.isInit = false;
			YTPlayer.opt.isInit = false;
			YTPlayer.videoID = null;

			var playerBox = YTPlayer.wrapper;
			playerBox.remove();
			jQuery("#controlBar_" + YTPlayer.id).remove();
		},

		fullscreen: function(real) {

			var YTPlayer = this.get(0);

			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var fullScreenBtn = controls.find(".mb_OnlyYT");
			var videoWrapper = jQuery(YTPlayer.wrapper);
			if(real){
				var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
				jQuery(document).off(fullscreenchange);
				jQuery(document).on(fullscreenchange, function() {
					var isFullScreen = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");

					if (!isFullScreen) {
						jQuery(YTPlayer).removeClass("fullscreen");
						YTPlayer.isAlone = false;
						fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT)
						jQuery(YTPlayer).setVideoQuality(YTPlayer.opt.quality);

						if (YTPlayer.isBackground){
							jQuery("body").after(controls);
						}else{
							YTPlayer.wrapper.before(controls);
						}
					}else{
						jQuery(YTPlayer).setVideoQuality("default");
					}
				});
			}

			if (!YTPlayer.isAlone) {

				if (YTPlayer.player.getPlayerState() >= 1) {

					if(YTPlayer.player.getPlayerState() != 1 && YTPlayer.player.getPlayerState() != 2)
						jQuery(YTPlayer).playYTP();

					if(real){
						YTPlayer.wrapper.append(controls);
						jQuery(YTPlayer).addClass("fullscreen");
						launchFullscreen(videoWrapper.get(0));
					} else
						videoWrapper.css({zIndex: 10000}).CSSAnimate({opacity: 1}, 1000, 0);

					jQuery(YTPlayer).trigger("YTPFullScreenStart");

					fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite)
					YTPlayer.isAlone = true;
				}

			} else {

				if(real){
					cancelFullscreen();
				} else{
					videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, 500);
				}

				jQuery(YTPlayer).trigger("YTPFullScreenEnd");

				videoWrapper.css({zIndex: -1});
				fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT)
				YTPlayer.isAlone = false;
			}

			function RunPrefixMethod(obj, method) {
				var pfx = ["webkit", "moz", "ms", "o", ""];
				var p = 0, m, t;
				while (p < pfx.length && !obj[m]) {
					m = method;
					if (pfx[p] == "") {
						m = m.substr(0,1).toLowerCase() + m.substr(1);
					}
					m = pfx[p] + m;
					t = typeof obj[m];
					if (t != "undefined") {
						pfx = [pfx[p]];
						return (t == "function" ? obj[m]() : obj[m]);
					}
					p++;
				}
			}

			function launchFullscreen(element) {
				RunPrefixMethod(element, "RequestFullScreen");
			}

			function cancelFullscreen() {
				if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
					RunPrefixMethod(document, "CancelFullScreen");
				}
			}
		},

		playYTP: function () {
			var YTPlayer = this.get(0);
			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var playBtn = controls.find(".mb_YTVPPlaypause");
			playBtn.html(jQuery.mbYTPlayer.controls.pause);
			YTPlayer.player.playVideo();

			YTPlayer.wrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, 2000);
			$(YTPlayer).on("YTPStart", function(){
				jQuery(YTPlayer).css("background", "none");
			})
		},

		toggleLoops: function () {
			var YTPlayer = this.get(0);
			var data = YTPlayer.opt;
			if (data.loop == 1) {
				data.loop = 0;
			} else {
				if(data.startAt) {
					YTPlayer.player.seekTo(data.startAt);
				} else {
					YTPlayer.player.playVideo();
				}
				data.loop = 1;
			}
		},

		stopYTP: function () {
			var YTPlayer = this.get(0);
			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var playBtn = controls.find(".mb_YTVPPlaypause");
			playBtn.html(jQuery.mbYTPlayer.controls.play);
			YTPlayer.player.stopVideo();
		},

		pauseYTP: function () {
			var YTPlayer = this.get(0);
			var data = YTPlayer.opt;
			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var playBtn = controls.find(".mb_YTVPPlaypause");
			playBtn.html(jQuery.mbYTPlayer.controls.play);
			YTPlayer.player.pauseVideo();
		},

		setYTPVolume: function (val) {
			var YTPlayer = this.get(0);
			if (!val && !YTPlayer.opt.vol && player.getVolume() == 0)
				jQuery(YTPlayer).unmuteYTPVolume();
			else if ((!val && YTPlayer.player.getVolume() > 0) || (val && YTPlayer.player.getVolume() == val))
				jQuery(YTPlayer).muteYTPVolume();
			else
				YTPlayer.opt.vol = val;
			YTPlayer.player.setVolume(YTPlayer.opt.vol);
		},

		muteYTPVolume: function () {
			var YTPlayer = this.get(0);
			YTPlayer.opt.vol = YTPlayer.player.getVolume() || 50;
			YTPlayer.player.mute();
			YTPlayer.player.setVolume(0);
			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var muteBtn = controls.find(".mb_YTVPMuteUnmute");
			muteBtn.html(jQuery.mbYTPlayer.controls.unmute);
		},

		unmuteYTPVolume: function () {
			var YTPlayer = this.get(0);

			YTPlayer.player.unMute();
			YTPlayer.player.setVolume(YTPlayer.opt.vol);

			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var muteBtn = controls.find(".mb_YTVPMuteUnmute");
			muteBtn.html(jQuery.mbYTPlayer.controls.mute);
		},

		manageYTPProgress: function () {
			var YTPlayer = this.get(0);
			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var progressBar = controls.find(".mb_YTVPProgress");
			var loadedBar = controls.find(".mb_YTVPLoaded");
			var timeBar = controls.find(".mb_YTVTime");
			var totW = progressBar.outerWidth();

			var currentTime = Math.floor(YTPlayer.player.getCurrentTime());
			var totalTime = Math.floor(YTPlayer.player.getDuration());
			var timeW = (currentTime * totW) / totalTime;
			var startLeft = 0;

			var loadedW = YTPlayer.player.getVideoLoadedFraction() * 100;

			loadedBar.css({left: startLeft, width: loadedW + "%"});
			timeBar.css({left: 0, width: timeW});
			return {totalTime: totalTime, currentTime: currentTime};
		},

		buildYTPControls: function () {
			var YTPlayer = this.get(0);
			var data = YTPlayer.opt;

			if(jQuery("#controlBar_"+ YTPlayer.id).length)
				return;

			var controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTVPBar").css({whiteSpace: "noWrap", position: YTPlayer.isBackground ? "fixed" : "absolute", zIndex: YTPlayer.isBackground ? 10000 : 1000}).hide();
			var buttonBar = jQuery("<div/>").addClass("buttonBar");
			var playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTVPPlaypause ytpicon").click(function () {
				if (YTPlayer.player.getPlayerState() == 1)
					jQuery(YTPlayer).pauseYTP();
				else
					jQuery(YTPlayer).playYTP();
			});

			var MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTVPMuteUnmute ytpicon").click(function () {
				if (YTPlayer.player.getVolume()==0) {
					jQuery(YTPlayer).unmuteYTPVolume();
				} else {
					jQuery(YTPlayer).muteYTPVolume();
				}
			});

			var idx = jQuery("<span/>").addClass("mb_YTVPTime");

			var vURL = data.videoURL;
			if(vURL.indexOf("https") < 0)
				vURL = "https://www.youtube.com/watch?v="+data.videoURL;
			var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTVPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {window.open(vURL, "viewOnYT")});
			var onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click",function () {jQuery(YTPlayer).fullscreen(data.realfullscreen);});

			var progressBar = jQuery("<div/>").addClass("mb_YTVPProgress").css("position", "absolute").click(function (e) {
				timeBar.css({width: (e.clientX - timeBar.offset().left)});
				YTPlayer.timeW = e.clientX - timeBar.offset().left;
				controlBar.find(".mb_YTVPLoaded").css({width: 0});
				var totalTime = Math.floor(YTPlayer.player.getDuration());
				YTPlayer.goto = (timeBar.outerWidth() * totalTime) / progressBar.outerWidth();

				YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), true);
				controlBar.find(".mb_YTVPLoaded").css({width: 0});
			});

			var loadedBar = jQuery("<div/>").addClass("mb_YTVPLoaded").css("position", "absolute");
			var timeBar = jQuery("<div/>").addClass("mb_YTVTime").css("position", "absolute");

			progressBar.append(loadedBar).append(timeBar);
			buttonBar.append(playpause).append(MuteUnmute).append(idx);

			if (data.printUrl){
				buttonBar.append(movieUrl);
			}

			if (YTPlayer.isBackground || (YTPlayer.opt.realfullscreen && !YTPlayer.isBackground))
				buttonBar.append(onlyVideo);

			controlBar.append(buttonBar).append(progressBar);

			if (!YTPlayer.isBackground) {
				controlBar.addClass("inlinePlayer");
				YTPlayer.wrapper.before(controlBar);
			} else {
				jQuery("body").after(controlBar);
			}
			controlBar.fadeIn();

		},

		checkForState:function(YTPlayer){

			var controlBar = jQuery("#controlBar_" + YTPlayer.id);
			var data = YTPlayer.opt;
			var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;

			YTPlayer.getState = setInterval(function () {
				var prog = jQuery(YTPlayer).manageYTPProgress();

				controlBar.find(".mb_YTVPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime));
				if (parseFloat(YTPlayer.player.getDuration() - 3) < YTPlayer.player.getCurrentTime() && YTPlayer.player.getPlayerState() == 1 && !YTPlayer.isPlayList) {
					if(!data.loop){
						YTPlayer.player.pauseVideo();
						YTPlayer.wrapper.CSSAnimate({opacity: 0}, 2000,function(){
							YTPlayer.player.seekTo(startAt);

							if (!YTPlayer.isBackground) {
								var bgndURL = YTPlayer.videoData.thumbnail.hqDefault;
								jQuery(YTPlayer).css({background: "rgba(0,0,0,0.5) url(" + bgndURL + ") center center", backgroundSize: "cover"});
							}
						});
					}else
						YTPlayer.player.seekTo(startAt);
					jQuery(YTPlayer).trigger("YTPEnd");
				}
			}, 1);

		},

		formatTime      : function (s) {
			var min = Math.floor(s / 60);
			var sec = Math.floor(s - (60 * min));
			return (min < 9 ? "0" + min : min) + " : " + (sec < 9 ? "0" + sec : sec);
		}
	};

	jQuery.fn.toggleVolume = function () {
		var YTPlayer = this.get(0);
		if (!YTPlayer)
			return;

		if (YTPlayer.player.isMuted()) {
			jQuery(YTPlayer).unmuteYTPVolume();
			return true;
		} else {
			jQuery(YTPlayer).muteYTPVolume();
			return false;
		}
	};

	jQuery.fn.optimizeDisplay = function () {
		var YTPlayer = this.get(0);
		var data = YTPlayer.opt;
		var playerBox = jQuery(YTPlayer.playerEl);
		var win = {};
		var el = !YTPlayer.isBackground ? data.containment : jQuery(window);

		win.width = el.width();
		win.height = el.height();

		var margin = 24;
		var vid = {};
		vid.width = win.width + ((win.width * margin) / 100);
		vid.height = data.ratio == "16/9" ? Math.ceil((9 * win.width) / 16) : Math.ceil((3 * win.width) / 4);
		vid.marginTop = -((vid.height - win.height) / 2);
		vid.marginLeft = -((win.width * (margin / 2)) / 100);

		if (vid.height < win.height) {
			vid.height = win.height + ((win.height * margin) / 100);
			vid.width = data.ratio == "16/9" ? Math.floor((16 * win.height) / 9) : Math.floor((4 * win.height) / 3);
			vid.marginTop = -((win.height * (margin / 2)) / 100);
			vid.marginLeft = -((vid.width - win.width) / 2);
		}
		playerBox.css({width: vid.width, height: vid.height, marginTop: vid.marginTop, marginLeft: vid.marginLeft});
	};

	jQuery.shuffle = function(arr) {
		var newArray = arr.slice();
		var len = newArray.length;
		var i = len;
		while (i--) {
			var p = parseInt(Math.random()*len);
			var t = newArray[i];
			newArray[i] = newArray[p];
			newArray[p] = t;
		}
		return newArray;
	};

	jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer;
	jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.YTPlaylist;
	jQuery.fn.playNext = jQuery.mbYTPlayer.playNext;
	jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie;
	jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID;
	jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer;
	jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy;
	jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen;
	jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildYTPControls;
	jQuery.fn.playYTP = jQuery.mbYTPlayer.playYTP;
	jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops;
	jQuery.fn.stopYTP = jQuery.mbYTPlayer.stopYTP;
	jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pauseYTP;
	jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.muteYTPVolume;
	jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmuteYTPVolume;
	jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setYTPVolume;
	jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality;
	jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageYTPProgress;

})(jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYi5ZVFBsYXllcjIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblx0dmFyIG9uTW9iaWxlID0gZmFsc2U7XHJcblx0aWYoIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgKSB7IG9uTW9iaWxlID0gdHJ1ZTsgfVxyXG5cclxuXHRpZiggKCBvbk1vYmlsZSA9PT0gZmFsc2UgKSApIHtcclxuXHJcblx0XHRcdCQoXCIucGxheWVyXCIpLm1iX1lUUGxheWVyKCk7XHJcblxyXG5cdH0gZWxzZSB7XHJcblxyXG5cdFx0XHQvKiBhcyBhIGZhbGxiYWNrIHdlIGFkZCBhIHNwZWNpYWwgY2xhc3MgdG8gdGhlIGhlYWRlciB3aGljaCBkaXNwbGF5cyBhIHBvc3RlciBpbWFnZSAqL1xyXG5cdFx0XHQkKCcjaG9tZScpLmFkZENsYXNzKCd2aWRlby1zZWN0aW9uJyk7XHJcblxyXG5cdFx0XHQvKiBoaWRlIHBsYXllciAqL1xyXG5cdFx0XHQkKFwiLnBsYXllclwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHQkKFwiI3ZpZGVvLXZvbHVtZVwiKS5oaWRlKCk7XHJcblxyXG5cdFx0fVxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogIGpxdWVyeS5tYi5jb21wb25lbnRzXHJcbiAqICBmaWxlOiBqcXVlcnkubWIuWVRQbGF5ZXIuanNcclxuICpcclxuICogIENvcHlyaWdodCAoYykgMjAwMS0yMDEzLiBNYXR0ZW8gQmljb2NjaGkgKFB1cHVuemkpO1xyXG4gKiAgT3BlbiBsYWIgc3JsLCBGaXJlbnplIC0gSXRhbHlcclxuICogIGVtYWlsOiBtYXR0ZW9Ab3Blbi1sYWIuY29tXHJcbiAqICBzaXRlOiBcdGh0dHA6Ly9wdXB1bnppLmNvbVxyXG4gKiAgYmxvZzpcdGh0dHA6Ly9wdXB1bnppLm9wZW4tbGFiLmNvbVxyXG4gKiBcdGh0dHA6Ly9vcGVuLWxhYi5jb21cclxuICpcclxuICogIExpY2VuY2VzOiBNSVQsIEdQTFxyXG4gKiAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuICogIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwuaHRtbFxyXG4gKlxyXG4gKiAgbGFzdCBtb2RpZmllZDogMzAvMDgvMTMgMjMuMzFcclxuICogICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqL1xyXG5cclxuLypCcm93c2VyIGRldGVjdGlvbiBwYXRjaCovXHJcbihmdW5jdGlvbigpe2lmKCEoOD5qUXVlcnkuZm4uanF1ZXJ5LnNwbGl0KFwiLlwiKVsxXSkpe2pRdWVyeS5icm93c2VyPXt9O2pRdWVyeS5icm93c2VyLm1vemlsbGE9ITE7alF1ZXJ5LmJyb3dzZXIud2Via2l0PSExO2pRdWVyeS5icm93c2VyLm9wZXJhPSExO2pRdWVyeS5icm93c2VyLm1zaWU9ITE7dmFyIGE9bmF2aWdhdG9yLnVzZXJBZ2VudDtqUXVlcnkuYnJvd3Nlci5uYW1lPW5hdmlnYXRvci5hcHBOYW1lO2pRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPVwiXCIrcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7alF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9uPXBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLDEwKTt2YXIgYyxiO2lmKC0xIT0oYj1hLmluZGV4T2YoXCJPcGVyYVwiKSkpe2lmKGpRdWVyeS5icm93c2VyLm9wZXJhPSEwLGpRdWVyeS5icm93c2VyLm5hbWU9XCJPcGVyYVwiLGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrNiksLTEhPShiPSBhLmluZGV4T2YoXCJWZXJzaW9uXCIpKSlqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1hLnN1YnN0cmluZyhiKzgpfWVsc2UgaWYoLTEhPShiPWEuaW5kZXhPZihcIk1TSUVcIikpKWpRdWVyeS5icm93c2VyLm1zaWU9ITAsalF1ZXJ5LmJyb3dzZXIubmFtZT1cIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiLGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrNSk7ZWxzZSBpZigtMSE9KGI9YS5pbmRleE9mKFwiQ2hyb21lXCIpKSlqUXVlcnkuYnJvd3Nlci53ZWJraXQ9ITAsalF1ZXJ5LmJyb3dzZXIubmFtZT1cIkNocm9tZVwiLGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrNyk7ZWxzZSBpZigtMSE9KGI9YS5pbmRleE9mKFwiU2FmYXJpXCIpKSl7aWYoalF1ZXJ5LmJyb3dzZXIud2Via2l0PSEwLGpRdWVyeS5icm93c2VyLm5hbWU9XCJTYWZhcmlcIixqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1hLnN1YnN0cmluZyhiKzcpLC0xIT0oYj1hLmluZGV4T2YoXCJWZXJzaW9uXCIpKSlqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj0gYS5zdWJzdHJpbmcoYis4KX1lbHNlIGlmKC0xIT0oYj1hLmluZGV4T2YoXCJGaXJlZm94XCIpKSlqUXVlcnkuYnJvd3Nlci5tb3ppbGxhPSEwLGpRdWVyeS5icm93c2VyLm5hbWU9XCJGaXJlZm94XCIsalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249YS5zdWJzdHJpbmcoYis4KTtlbHNlIGlmKChjPWEubGFzdEluZGV4T2YoXCIgXCIpKzEpPChiPWEubGFzdEluZGV4T2YoXCIvXCIpKSlqUXVlcnkuYnJvd3Nlci5uYW1lPWEuc3Vic3RyaW5nKGMsYiksalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249YS5zdWJzdHJpbmcoYisxKSxqUXVlcnkuYnJvd3Nlci5uYW1lLnRvTG93ZXJDYXNlKCk9PWpRdWVyeS5icm93c2VyLm5hbWUudG9VcHBlckNhc2UoKSYmKGpRdWVyeS5icm93c2VyLm5hbWU9bmF2aWdhdG9yLmFwcE5hbWUpO2lmKC0xIT0oYT1qUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbi5pbmRleE9mKFwiO1wiKSkpalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249alF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb24uc3Vic3RyaW5nKDAsIGEpO2lmKC0xIT0oYT1qUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbi5pbmRleE9mKFwiIFwiKSkpalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249alF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb24uc3Vic3RyaW5nKDAsYSk7alF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9uPXBhcnNlSW50KFwiXCIralF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb24sMTApO2lzTmFOKGpRdWVyeS5icm93c2VyLm1ham9yVmVyc2lvbikmJihqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1cIlwiK3BhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pLGpRdWVyeS5icm93c2VyLm1ham9yVmVyc2lvbj1wYXJzZUludChuYXZpZ2F0b3IuYXBwVmVyc2lvbiwxMCkpO2pRdWVyeS5icm93c2VyLnZlcnNpb249alF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9ufX0pKGpRdWVyeSk7XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBqUXVlcnkubWIuY29tcG9uZW50czoganF1ZXJ5Lm1iLkNTU0FuaW1hdGVcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmpRdWVyeS5mbi5DU1NBbmltYXRlPWZ1bmN0aW9uKGEsYixrLGwsZil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBjPWpRdWVyeSh0aGlzKTtpZigwIT09Yy5sZW5ndGgmJmEpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGImJihmPWIsYj1qUXVlcnkuZnguc3BlZWRzLl9kZWZhdWx0KTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBrJiYoZj1rLGs9MCk7XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmKGY9bCxsPVwiY3ViaWMtYmV6aWVyKDAuNjUsMC4wMywwLjM2LDAuNzIpXCIpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiKWZvcih2YXIgaiBpbiBqUXVlcnkuZnguc3BlZWRzKWlmKGI9PWope2I9alF1ZXJ5LmZ4LnNwZWVkc1tqXTticmVha31lbHNlIGI9bnVsbDtpZihqUXVlcnkuc3VwcG9ydC50cmFuc2l0aW9uKXt2YXIgZT1cIlwiLGg9XCJ0cmFuc2l0aW9uRW5kXCI7alF1ZXJ5LmJyb3dzZXIud2Via2l0PyhlPVwiLXdlYmtpdC1cIixoPVwid2Via2l0VHJhbnNpdGlvbkVuZFwiKTpqUXVlcnkuYnJvd3Nlci5tb3ppbGxhPyAoZT1cIi1tb3otXCIsaD1cInRyYW5zaXRpb25lbmRcIik6alF1ZXJ5LmJyb3dzZXIub3BlcmE/KGU9XCItby1cIixoPVwib3RyYW5zaXRpb25lbmRcIik6alF1ZXJ5LmJyb3dzZXIubXNpZSYmKGU9XCItbXMtXCIsaD1cIm1zVHJhbnNpdGlvbkVuZFwiKTtqPVtdO2ZvcihkIGluIGEpe3ZhciBnPWQ7XCJ0cmFuc2Zvcm1cIj09PWcmJihnPWUrXCJ0cmFuc2Zvcm1cIixhW2ddPWFbZF0sZGVsZXRlIGFbZF0pO1widHJhbnNmb3JtLW9yaWdpblwiPT09ZyYmKGc9ZStcInRyYW5zZm9ybS1vcmlnaW5cIixhW2ddPWFbZF0sZGVsZXRlIGFbZF0pO2oucHVzaChnKTtjLmNzcyhnKXx8Yy5jc3MoZywwKX1kPWouam9pbihcIixcIik7Yy5jc3MoZStcInRyYW5zaXRpb24tcHJvcGVydHlcIixkKTtjLmNzcyhlK1widHJhbnNpdGlvbi1kdXJhdGlvblwiLGIrXCJtc1wiKTtjLmNzcyhlK1widHJhbnNpdGlvbi1kZWxheVwiLGsrXCJtc1wiKTtjLmNzcyhlK1widHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25cIixsKTtjLmNzcyhlK1wiYmFja2ZhY2UtdmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Yy5jc3MoYSl9LDApO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtjLmNhbGxlZHx8IWY/Yy5jYWxsZWQ9ITE6ZigpfSxiKzIwKTtjLm9uKGgsZnVuY3Rpb24oYSl7Yy5vZmYoaCk7Yy5jc3MoZStcInRyYW5zaXRpb25cIixcIlwiKTthLnN0b3BQcm9wYWdhdGlvbigpO1wiZnVuY3Rpb25cIj09dHlwZW9mIGYmJihjLmNhbGxlZD0hMCxmKCkpO3JldHVybiExfSl9ZWxzZXtmb3IodmFyIGQgaW4gYSlcInRyYW5zZm9ybVwiPT09ZCYmZGVsZXRlIGFbZF0sXCJ0cmFuc2Zvcm0tb3JpZ2luXCI9PT1kJiZkZWxldGUgYVtkXSxcImF1dG9cIj09PWFbZF0mJmRlbGV0ZSBhW2RdO2lmKCFmfHxcInN0cmluZ1wiPT09dHlwZW9mIGYpZj1cImxpbmVhclwiO2MuYW5pbWF0ZShhLGIsZil9fX0pfTsgalF1ZXJ5LmZuLkNTU0FuaW1hdGVTdG9wPWZ1bmN0aW9uKCl7dmFyIGE9XCJcIixiPVwidHJhbnNpdGlvbkVuZFwiO2pRdWVyeS5icm93c2VyLndlYmtpdD8oYT1cIi13ZWJraXQtXCIsYj1cIndlYmtpdFRyYW5zaXRpb25FbmRcIik6alF1ZXJ5LmJyb3dzZXIubW96aWxsYT8oYT1cIi1tb3otXCIsYj1cInRyYW5zaXRpb25lbmRcIik6alF1ZXJ5LmJyb3dzZXIub3BlcmE/KGE9XCItby1cIixiPVwib3RyYW5zaXRpb25lbmRcIik6alF1ZXJ5LmJyb3dzZXIubXNpZSYmKGE9XCItbXMtXCIsYj1cIm1zVHJhbnNpdGlvbkVuZFwiKTtqUXVlcnkodGhpcykuY3NzKGErXCJ0cmFuc2l0aW9uXCIsXCJcIik7alF1ZXJ5KHRoaXMpLm9mZihiKX07IGpRdWVyeS5zdXBwb3J0LnRyYW5zaXRpb249ZnVuY3Rpb24oKXt2YXIgYT0oZG9jdW1lbnQuYm9keXx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5zdHlsZTtyZXR1cm4gdm9pZCAwIT09YS50cmFuc2l0aW9ufHx2b2lkIDAhPT1hLldlYmtpdFRyYW5zaXRpb258fHZvaWQgMCE9PWEuTW96VHJhbnNpdGlvbnx8dm9pZCAwIT09YS5Nc1RyYW5zaXRpb258fHZvaWQgMCE9PWEuT1RyYW5zaXRpb259KCk7XHJcblxyXG4vKlxyXG4gKiBNZXRhZGF0YSAtIGpRdWVyeSBwbHVnaW4gZm9yIHBhcnNpbmcgbWV0YWRhdGEgZnJvbSBlbGVtZW50c1xyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMDYgSm9obiBSZXNpZywgWWVodWRhIEthdHosIErDtnJuIFphZWZmZXJlciwgUGF1bCBNY0xhbmFoYW5cclxuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgbGljZW5zZXM6XHJcbiAqICAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuICogICBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLmh0bWxcclxuICovXHJcblxyXG4oZnVuY3Rpb24oYyl7Yy5leHRlbmQoe21ldGFkYXRhOntkZWZhdWx0czp7dHlwZTpcImNsYXNzXCIsbmFtZTpcIm1ldGFkYXRhXCIsY3JlOi8oey4qfSkvLHNpbmdsZTpcIm1ldGFkYXRhXCJ9LHNldFR5cGU6ZnVuY3Rpb24oYixjKXt0aGlzLmRlZmF1bHRzLnR5cGU9Yjt0aGlzLmRlZmF1bHRzLm5hbWU9Y30sZ2V0OmZ1bmN0aW9uKGIsZil7dmFyIGQ9Yy5leHRlbmQoe30sdGhpcy5kZWZhdWx0cyxmKTtkLnNpbmdsZS5sZW5ndGh8fChkLnNpbmdsZT1cIm1ldGFkYXRhXCIpO3ZhciBhPWMuZGF0YShiLGQuc2luZ2xlKTtpZihhKXJldHVybiBhO2E9XCJ7fVwiO2lmKFwiY2xhc3NcIj09ZC50eXBlKXt2YXIgZT1kLmNyZS5leGVjKGIuY2xhc3NOYW1lKTtlJiYoYT1lWzFdKX1lbHNlIGlmKFwiZWxlbVwiPT1kLnR5cGUpe2lmKCFiLmdldEVsZW1lbnRzQnlUYWdOYW1lKXJldHVybjtlPWIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZC5uYW1lKTtlLmxlbmd0aCYmKGE9Yy50cmltKGVbMF0uaW5uZXJIVE1MKSl9ZWxzZSB2b2lkIDAhPSBiLmdldEF0dHJpYnV0ZSYmKGU9Yi5nZXRBdHRyaWJ1dGUoZC5uYW1lKSkmJihhPWUpOzA+YS5pbmRleE9mKFwie1wiKSYmKGE9XCJ7XCIrYStcIn1cIik7YT1ldmFsKFwiKFwiK2ErXCIpXCIpO2MuZGF0YShiLGQuc2luZ2xlLGEpO3JldHVybiBhfX19KTtjLmZuLm1ldGFkYXRhPWZ1bmN0aW9uKGIpe3JldHVybiBjLm1ldGFkYXRhLmdldCh0aGlzWzBdLGIpfX0pKGpRdWVyeSk7XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pZih0eXBlb2YgeXRwICE9IFwib2JqZWN0XCIpXHJcblx0eXRwID17fTtcclxuXHJcblN0cmluZy5wcm90b3R5cGUuZ2V0VmlkZW9JRD1mdW5jdGlvbigpe1xyXG5cdHZhciBtb3ZpZVVSTDtcclxuXHRpZih0aGlzLnN1YnN0cigwLDE2KT09XCJodHRwczovL3lvdXR1LmJlL1wiKXtcclxuXHRcdG1vdmllVVJMPSB0aGlzLnJlcGxhY2UoXCJodHRwczovL3lvdXR1LmJlL1wiLFwiXCIpO1xyXG5cdH1lbHNlIGlmKHRoaXMuaW5kZXhPZihcImh0dHBzXCIpPi0xKXtcclxuXHRcdG1vdmllVVJMID0gdGhpcy5tYXRjaCgvW1xcXFw/Jl12PShbXiYjXSopLylbMV07XHJcblx0fWVsc2V7XHJcblx0XHRtb3ZpZVVSTCA9IHRoaXNcclxuXHR9XHJcblx0cmV0dXJuIG1vdmllVVJMO1xyXG59O1xyXG5cclxudmFyIGlzRGV2aWNlID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93O1xyXG5cclxuZnVuY3Rpb24gb25Zb3VUdWJlUGxheWVyQVBJUmVhZHkoKSB7XHJcblx0aWYoeXRwLllUQVBJUmVhZHkpXHJcblx0XHRyZXR1cm47XHJcblxyXG5cdHl0cC5ZVEFQSVJlYWR5PXRydWU7XHJcblx0alF1ZXJ5KGRvY3VtZW50KS50cmlnZ2VyKFwiWVRBUElSZWFkeVwiKTtcclxufVxyXG5cclxuKGZ1bmN0aW9uIChqUXVlcnkpIHtcclxuXHJcblx0alF1ZXJ5Lm1iWVRQbGF5ZXIgPSB7XHJcblx0XHRuYW1lICAgICAgICAgICA6IFwianF1ZXJ5Lm1iLllUUGxheWVyXCIsXHJcblx0XHR2ZXJzaW9uICAgICAgICA6IFwiMi41LjdcIixcclxuXHRcdGF1dGhvciAgICAgICAgIDogXCJhdU1hcmluZVwiLFxyXG5cdFx0ZGVmYXVsdHMgICAgICAgOiB7XHJcblx0XHRcdGNvbnRhaW5tZW50ICAgICAgICAgICAgOiBcImJvZHlcIixcclxuXHRcdFx0cmF0aW8gICAgICAgICAgICAgICAgICA6IFwiMTYvOVwiLFxyXG5cdFx0XHRzaG93WVRMb2dvICAgICAgICAgICAgIDogZmFsc2UsXHJcblx0XHRcdHZpZGVvVVJMICAgICAgICAgICAgICAgOiBudWxsLFxyXG5cdFx0XHRzdGFydEF0ICAgICAgICAgICAgICAgIDogMCxcclxuXHRcdFx0YXV0b1BsYXkgICAgICAgICAgICAgICA6IHRydWUsXHJcblx0XHRcdHZvbCAgICAgICAgICAgICAgICAgICAgOjEwLFxyXG5cdFx0XHRhZGRSYXN0ZXIgICAgICAgICAgICAgIDogZmFsc2UsXHJcblx0XHRcdG9wYWNpdHkgICAgICAgICAgICAgICAgOiAxLFxyXG5cdFx0XHRxdWFsaXR5ICAgICAgICAgICAgICAgIDogXCJkZWZhdWx0XCIsIC8vb3IgXCJzbWFsbFwiLCBcIm1lZGl1bVwiLCBcImxhcmdlXCIsIFwiaGQ3MjBcIiwgXCJoZDEwODBcIiwgXCJoaWdocmVzXCJcclxuXHRcdFx0bXV0ZSAgICAgICAgICAgICAgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRsb29wICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcclxuXHRcdFx0c2hvd0NvbnRyb2xzICAgICAgICAgICA6IHRydWUsXHJcblx0XHRcdHNob3dBbm5vdGF0aW9ucyAgICAgICAgOiBmYWxzZSxcclxuXHRcdFx0cHJpbnRVcmwgICAgICAgICAgICAgICA6IHRydWUsXHJcblx0XHRcdHN0b3BNb3ZpZU9uQ2xpY2sgICAgICAgOmZhbHNlLFxyXG5cdFx0XHRyZWFsZnVsbHNjcmVlbiAgICAgICAgIDp0cnVlLFxyXG5cdFx0XHRvblJlYWR5ICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKHBsYXllcikge30sXHJcblx0XHRcdG9uU3RhdGVDaGFuZ2UgICAgICAgICAgOiBmdW5jdGlvbiAocGxheWVyKSB7fSxcclxuXHRcdFx0b25QbGF5YmFja1F1YWxpdHlDaGFuZ2U6IGZ1bmN0aW9uIChwbGF5ZXIpIHt9LFxyXG5cdFx0XHRvbkVycm9yICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKHBsYXllcikge31cclxuXHRcdH0sXHJcblx0XHQvL3RvZG86IHVzZSBAZm9udC1mYWNlIGluc3RlYWRcclxuXHRcdGNvbnRyb2xzICAgICAgIDoge1xyXG5cdFx0XHRwbGF5ICA6IFwiUFwiLFxyXG5cdFx0XHRwYXVzZSA6IFwicFwiLFxyXG5cdFx0XHRtdXRlICA6IFwiTVwiLFxyXG5cdFx0XHR1bm11dGU6IFwiQVwiLFxyXG5cdFx0XHRvbmx5WVQ6IFwiT1wiLFxyXG5cdFx0XHRzaG93U2l0ZTogXCJSXCIsXHJcblx0XHRcdHl0TG9nbzogXCJZXCJcclxuXHRcdH0sXHJcblx0XHRyYXN0ZXJJbWcgICAgICA6IFwiaW1hZ2VzL3Jhc3Rlci5wbmdcIixcclxuXHRcdHJhc3RlckltZ1JldGluYTogXCJpbWFnZXMvcmFzdGVyQDJ4LnBuZ1wiLFxyXG5cclxuXHRcdGJ1aWxkUGxheWVyOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcztcclxuXHRcdFx0XHR2YXIgJFlUUGxheWVyID0galF1ZXJ5KFlUUGxheWVyKTtcclxuXHJcblx0XHRcdFx0WVRQbGF5ZXIubG9vcCA9IDA7XHJcblx0XHRcdFx0WVRQbGF5ZXIub3B0ID0ge307XHJcblx0XHRcdFx0dmFyIHByb3BlcnR5ID0ge307XHJcblxyXG5cdFx0XHRcdCRZVFBsYXllci5hZGRDbGFzcyhcIm1iX1lUVlBsYXllclwiKTtcclxuXHJcblx0XHRcdFx0aWYgKGpRdWVyeS5tZXRhZGF0YSkge1xyXG5cdFx0XHRcdFx0alF1ZXJ5Lm1ldGFkYXRhLnNldFR5cGUoXCJjbGFzc1wiKTtcclxuXHRcdFx0XHRcdHByb3BlcnR5ID0gJFlUUGxheWVyLm1ldGFkYXRhKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoalF1ZXJ5LmlzRW1wdHlPYmplY3QocHJvcGVydHkpKVxyXG5cdFx0XHRcdFx0cHJvcGVydHkgPSAkWVRQbGF5ZXIuZGF0YShcInByb3BlcnR5XCIpICYmIHR5cGVvZiAkWVRQbGF5ZXIuZGF0YShcInByb3BlcnR5XCIpID09IFwic3RyaW5nXCIgPyBldmFsKCcoJyArICRZVFBsYXllci5kYXRhKFwicHJvcGVydHlcIikgKyAnKScpIDogJFlUUGxheWVyLmRhdGEoXCJwcm9wZXJ0eVwiKTtcclxuXHJcblx0XHRcdFx0alF1ZXJ5LmV4dGVuZChZVFBsYXllci5vcHQsIGpRdWVyeS5tYllUUGxheWVyLmRlZmF1bHRzLCBvcHRpb25zLCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0XHRcdHZhciBjYW5Hb0Z1bGxzY3JlZW4gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZighY2FuR29GdWxsc2NyZWVuKVxyXG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0LnJlYWxmdWxsc2NyZWVuID0gdDtcclxuXHJcblx0XHRcdFx0aWYgKCEkWVRQbGF5ZXIuYXR0cihcImlkXCIpKVxyXG5cdFx0XHRcdFx0JFlUUGxheWVyLmF0dHIoXCJpZFwiLCBcImlkX1wiICsgbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG5cclxuXHRcdFx0XHRZVFBsYXllci5vcHQuaWQgPSBZVFBsYXllci5pZDtcclxuXHRcdFx0XHRZVFBsYXllci5pc0Fsb25lID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8qdG8gbWFpbnRhaW4gYmFjayBjb21wYXRpYmlsaXR5XHJcblx0XHRcdFx0ICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5pc0JnbmRNb3ZpZSlcclxuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC5jb250YWlubWVudCA9IFwiYm9keVwiO1xyXG5cclxuXHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmlzQmduZE1vdmllICYmIFlUUGxheWVyLm9wdC5pc0JnbmRNb3ZpZS5tdXRlICE9IHVuZGVmaW5lZClcclxuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC5tdXRlID0gWVRQbGF5ZXIub3B0LmlzQmduZE1vdmllLm11dGU7XHJcblxyXG5cdFx0XHRcdGlmICghWVRQbGF5ZXIub3B0LnZpZGVvVVJMKVxyXG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0LnZpZGVvVVJMID0gJFlUUGxheWVyLmF0dHIoXCJocmVmXCIpO1xyXG5cclxuXHRcdFx0XHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHRcdFx0XHR2YXIgcGxheWVySUQgPSBcIm1iWVRQX1wiICsgWVRQbGF5ZXIuaWQ7XHJcblx0XHRcdFx0dmFyIHZpZGVvSUQgPSB0aGlzLm9wdC52aWRlb1VSTCA/IHRoaXMub3B0LnZpZGVvVVJMLmdldFZpZGVvSUQoKSA6ICRZVFBsYXllci5hdHRyKFwiaHJlZlwiKSA/ICRZVFBsYXllci5hdHRyKFwiaHJlZlwiKS5nZXRWaWRlb0lEKCkgOiBmYWxzZTtcclxuXHRcdFx0XHRZVFBsYXllci52aWRlb0lEID0gdmlkZW9JRDtcclxuXHJcblxyXG5cdFx0XHRcdFlUUGxheWVyLm9wdC5zaG93QW5ub3RhdGlvbnMgPSAoWVRQbGF5ZXIub3B0LnNob3dBbm5vdGF0aW9ucykgPyAnMCcgOiAnMyc7XHJcblx0XHRcdFx0dmFyIHBsYXllclZhcnMgPSB7ICdhdXRvcGxheSc6IDAsICdtb2Rlc3RicmFuZGluZyc6IDEsICdjb250cm9scyc6IDAsICdzaG93aW5mbyc6IDAsICdyZWwnOiAwLCAnZW5hYmxlanNhcGknOiAxLCAndmVyc2lvbic6IDMsICdwbGF5ZXJhcGlpZCc6IHBsYXllcklELCAnb3JpZ2luJzogJyonLCAnYWxsb3dmdWxsc2NyZWVuJzogdHJ1ZSwgJ3dtb2RlJzogXCJ0cmFuc3BhcmVudFwiLCAnaXZfbG9hZF9wb2xpY3knOiBZVFBsYXllci5vcHQuc2hvd0Fubm90YXRpb25zfTtcclxuXHJcblx0XHRcdFx0dmFyIGNhblBsYXlIVE1MNSA9IGZhbHNlO1xyXG5cdFx0XHRcdHZhciB2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuXHRcdFx0XHRpZiAodi5jYW5QbGF5VHlwZSApIHsgLy8gJiYgIWpRdWVyeS5icm93c2VyLm1zaWVcclxuXHRcdFx0XHRcdGNhblBsYXlIVE1MNSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY2FuUGxheUhUTUw1KSAvLyAgJiYgIShZVFBsYXllci5pc1BsYXlMaXN0ICYmIGpRdWVyeS5icm93c2VyLm1zaWUpXHJcblx0XHRcdFx0XHRqUXVlcnkuZXh0ZW5kKHBsYXllclZhcnMsIHsnaHRtbDUnOiAxfSk7XHJcblxyXG5cdFx0XHRcdGlmKGpRdWVyeS5icm93c2VyLm1zaWUgJiYgalF1ZXJ5LmJyb3dzZXIudmVyc2lvbiA8IDkgKXtcclxuXHRcdFx0XHRcdHRoaXMub3B0Lm9wYWNpdHkgPSAxO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHBsYXllckJveCA9IGpRdWVyeShcIjxkaXYvPlwiKS5hdHRyKFwiaWRcIiwgcGxheWVySUQpLmFkZENsYXNzKFwicGxheWVyQm94XCIpO1xyXG5cdFx0XHRcdHZhciBvdmVybGF5ID0galF1ZXJ5KFwiPGRpdi8+XCIpLmNzcyh7cG9zaXRpb246IFwiYWJzb2x1dGVcIiwgdG9wOiAwLCBsZWZ0OiAwLCB3aWR0aDogXCIxMDAlXCIsIGhlaWdodDogXCIxMDAlXCJ9KS5hZGRDbGFzcyhcIllUUE92ZXJsYXlcIik7IC8vWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kID8gXCJmaXhlZFwiIDpcclxuXHJcblx0XHRcdFx0WVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50ID0gWVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50ID09IFwic2VsZlwiID8galF1ZXJ5KHRoaXMpIDogalF1ZXJ5KFlUUGxheWVyLm9wdC5jb250YWlubWVudCk7XHJcblxyXG5cdFx0XHRcdFlUUGxheWVyLmlzQmFja2dyb3VuZCA9IFlUUGxheWVyLm9wdC5jb250YWlubWVudC5nZXQoMCkudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09IFwiYm9keVwiO1xyXG5cclxuXHRcdFx0XHRpZiAoaXNEZXZpY2UgJiYgWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKXtcclxuXHRcdFx0XHRcdCRZVFBsYXllci5oaWRlKCk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmFkZFJhc3Rlcikge1xyXG5cdFx0XHRcdFx0dmFyIHJldGluYSA9ICh3aW5kb3cucmV0aW5hIHx8IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSk7XHJcblx0XHRcdFx0XHRvdmVybGF5LmFkZENsYXNzKHJldGluYSA/IFwicmFzdGVyIHJldGluYVwiIDogXCJyYXN0ZXJcIik7XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRvdmVybGF5LnJlbW92ZUNsYXNzKFwicmFzdGVyIHJldGluYVwiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciB3cmFwcGVyID0galF1ZXJ5KFwiPGRpdi8+XCIpLmFkZENsYXNzKFwibWJZVFBfd3JhcHBlclwiKS5hdHRyKFwiaWRcIiwgXCJ3cmFwcGVyX1wiICsgcGxheWVySUQpO1xyXG5cdFx0XHRcdHdyYXBwZXIuY3NzKHtwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB6SW5kZXg6IDAsIG1pbldpZHRoOiBcIjEwMCVcIiwgbWluSGVpZ2h0OiBcIjEwMCVcIixsZWZ0OjAsIHRvcDowLCBvdmVyZmxvdzogXCJoaWRkZW5cIiwgb3BhY2l0eTogMH0pO1xyXG5cdFx0XHRcdHBsYXllckJveC5jc3Moe3Bvc2l0aW9uOiBcImFic29sdXRlXCIsIHpJbmRleDogMCwgd2lkdGg6IFwiMTAwJVwiLCBoZWlnaHQ6IFwiMTAwJVwiLCB0b3A6IDAsIGxlZnQ6IDAsIG92ZXJmbG93OiBcImhpZGRlblwiLCBvcGFjaXR5OiB0aGlzLm9wdC5vcGFjaXR5fSk7XHJcblx0XHRcdFx0d3JhcHBlci5hcHBlbmQocGxheWVyQm94KTtcclxuXHJcblx0XHRcdFx0aWYgKFlUUGxheWVyLmlzQmFja2dyb3VuZCAmJiB5dHAuaXNJbml0KVxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRZVFBsYXllci5vcHQuY29udGFpbm1lbnQuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmIChqUXVlcnkodGhpcykuY3NzKFwicG9zaXRpb25cIikgPT0gXCJzdGF0aWNcIilcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KHRoaXMpLmNzcyhcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIik7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGlmIChZVFBsYXllci5pc0JhY2tncm91bmQpIHtcclxuXHRcdFx0XHRcdGpRdWVyeShcImJvZHlcIikuY3NzKHtwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLCBtaW5XaWR0aDogXCIxMDAlXCIsIG1pbkhlaWdodDogXCIxMDAlXCIsIHpJbmRleDogMSwgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIn0pO1xyXG5cdFx0XHRcdFx0d3JhcHBlci5jc3Moe3Bvc2l0aW9uOiBcImFic29sdXRlXCIsIHRvcDogMCwgbGVmdDogMCwgekluZGV4OiAwfSk7XHJcblx0XHRcdFx0XHQkWVRQbGF5ZXIuaGlkZSgpO1xyXG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50LnByZXBlbmQod3JhcHBlcik7XHJcblx0XHRcdFx0fSBlbHNlXHJcblx0XHRcdFx0XHRZVFBsYXllci5vcHQuY29udGFpbm1lbnQucHJlcGVuZCh3cmFwcGVyKTtcclxuXHJcblx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlciA9IHdyYXBwZXI7XHJcblxyXG5cdFx0XHRcdHBsYXllckJveC5jc3Moe29wYWNpdHk6IDF9KTtcclxuXHJcblx0XHRcdFx0aWYgKCFpc0RldmljZSl7XHJcblx0XHRcdFx0XHRwbGF5ZXJCb3guYWZ0ZXIob3ZlcmxheSk7XHJcblx0XHRcdFx0XHRZVFBsYXllci5vdmVybGF5ID0gb3ZlcmxheTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHRpZighWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKXtcclxuXHRcdFx0XHRcdG92ZXJsYXkub24oXCJtb3VzZWVudGVyXCIsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0JFlUUGxheWVyLmZpbmQoXCIubWJfWVRWUEJhclwiKS5hZGRDbGFzcyhcInZpc2libGVcIik7XHJcblx0XHRcdFx0XHR9KS5vbihcIm1vdXNlbGVhdmVcIixmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLmZpbmQoXCIubWJfWVRWUEJhclwiKS5yZW1vdmVDbGFzcyhcInZpc2libGVcIik7XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGFkZCBZVCBBUEkgdG8gdGhlIGhlYWRlclxyXG5cdFx0XHRcdC8valF1ZXJ5KFwiI1lUQVBJXCIpLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0XHRpZigheXRwLllUQVBJUmVhZHkpe1xyXG5cdFx0XHRcdFx0dmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cdFx0XHRcdFx0dGFnLnNyYyA9IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vcGxheWVyX2FwaVwiO1xyXG5cdFx0XHRcdFx0dGFnLmlkID0gXCJZVEFQSVwiO1xyXG5cdFx0XHRcdFx0dmFyIGZpcnN0U2NyaXB0VGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xyXG5cdFx0XHRcdFx0Zmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGpRdWVyeShkb2N1bWVudCkudHJpZ2dlcihcIllUQVBJUmVhZHlcIik7XHJcblx0XHRcdFx0XHR9LCAyMDApXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRqUXVlcnkoZG9jdW1lbnQpLm9uKFwiWVRBUElSZWFkeVwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKChZVFBsYXllci5pc0JhY2tncm91bmQgJiYgeXRwLmlzSW5pdCkgfHwgWVRQbGF5ZXIub3B0LmlzSW5pdClcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdGlmKFlUUGxheWVyLmlzQmFja2dyb3VuZCAmJiBZVFBsYXllci5vcHQuc3RvcE1vdmllT25DbGljaylcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KGRvY3VtZW50KS5vZmYoXCJtb3VzZWRvd24ueXRwbGF5ZXJcIikub24oXCJtb3VzZWRvd24sLnl0cGxheWVyXCIsZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHRhcmdldCA9IGpRdWVyeShlLnRhcmdldCk7XHJcblx0XHRcdFx0XHRcdFx0aWYodGFyZ2V0LmlzKFwiYVwiKSB8fCB0YXJnZXQucGFyZW50cygpLmlzKFwiYVwiKSl7XHJcblx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIucGF1c2VZVFAoKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdGlmIChZVFBsYXllci5pc0JhY2tncm91bmQpXHJcblx0XHRcdFx0XHRcdHl0cC5pc0luaXQgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC5pc0luaXQgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC52b2wgPSBZVFBsYXllci5vcHQudm9sID8gWVRQbGF5ZXIub3B0LnZvbCA6IDEwMDtcclxuXHJcblx0XHRcdFx0XHRqUXVlcnkubWJZVFBsYXllci5nZXREYXRhRnJvbUZlZWQoWVRQbGF5ZXIudmlkZW9JRCwgWVRQbGF5ZXIpO1xyXG5cclxuXHRcdFx0XHRcdGpRdWVyeShkb2N1bWVudCkub24oXCJnZXRWaWRlb0luZm9fXCIgKyBZVFBsYXllci5vcHQuaWQsIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdFx0XHRcdGlmKGlzRGV2aWNlICYmICFZVFBsYXllci5pc0JhY2tncm91bmQpe1xyXG5cdFx0XHRcdFx0XHRcdG5ldyBZVC5QbGF5ZXIocGxheWVySUQsIHtcclxuXHRcdFx0XHRcdFx0XHRcdGhlaWdodDogJzEwMCUnLFxyXG5cdFx0XHRcdFx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdFx0XHRcdFx0XHRcdHZpZGVvSWQ6IFlUUGxheWVyLnZpZGVvSUQsXHJcblx0XHRcdFx0XHRcdFx0XHRldmVudHM6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0J29uUmVhZHknOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5vcHRpbWl6ZURpc3BsYXkoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwbGF5ZXJCb3guY3NzKHtvcGFjaXR5OiAxfSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5jc3Moe29wYWNpdHk6IDF9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIub3B0aW1pemVEaXNwbGF5KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdCdvblN0YXRlQ2hhbmdlJzogZnVuY3Rpb24oKXt9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRuZXcgWVQuUGxheWVyKHBsYXllcklELCB7XHJcblx0XHRcdFx0XHRcdFx0dmlkZW9JZCAgIDogWVRQbGF5ZXIudmlkZW9JRC50b1N0cmluZygpLFxyXG5cdFx0XHRcdFx0XHRcdHBsYXllclZhcnM6IHBsYXllclZhcnMsXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnRzICAgIDoge1xyXG5cdFx0XHRcdFx0XHRcdFx0J29uUmVhZHknOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllciA9IGV2ZW50LnRhcmdldDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmKFlUUGxheWVyLmlzUmVhZHkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIuaXNSZWFkeSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXJFbCA9IFlUUGxheWVyLnBsYXllci5nZXRJZnJhbWUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLm9wdGltaXplRGlzcGxheSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIudmlkZW9JRCA9IHZpZGVvSUQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkod2luZG93KS5vbihcInJlc2l6ZS5ZVFBcIixmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLm9wdGltaXplRGlzcGxheSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5vcHQuc2hvd0NvbnRyb2xzKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikuYnVpbGRZVFBDb250cm9scygpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly9ZVFBsYXllci5wbGF5ZXIuc2V0UGxheWJhY2tRdWFsaXR5KFlUUGxheWVyLm9wdC5xdWFsaXR5KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5vcHQuc3RhcnRBdCA+IDApXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnNlZWtUbyhwYXJzZUZsb2F0KFlUUGxheWVyLm9wdC5zdGFydEF0KSwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIVlUUGxheWVyLm9wdC5hdXRvUGxheSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIuc3RvcFlUUCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLmNoZWNrRm9yU3RhcnRBdCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5wbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSA+PSBZVFBsYXllci5vcHQuc3RhcnRBdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGVhckludGVydmFsKFlUUGxheWVyLmNoZWNrRm9yU3RhcnRBdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5wYXVzZVlUUCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5tdXRlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5tdXRlWVRQVm9sdW1lKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudW5tdXRlWVRQVm9sdW1lKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9LCAxKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLnBsYXlZVFAoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2V0Vm9sdW1lKFlUUGxheWVyLm9wdC52b2wpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0Lm11dGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikubXV0ZVlUUFZvbHVtZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS51bm11dGVZVFBWb2x1bWUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgWVRQbGF5ZXIub3B0Lm9uUmVhZHkgPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLm9wdC5vblJlYWR5KCRZVFBsYXllcik7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkubWJZVFBsYXllci5jaGVja0ZvclN0YXRlKFlUUGxheWVyKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdCdvblN0YXRlQ2hhbmdlJyAgICAgICAgICA6IGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0LypcclxuXHRcdFx0XHRcdFx0XHRcdFx0IC0xICh1bnN0YXJ0ZWQpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCAwIChlbmRlZClcclxuXHRcdFx0XHRcdFx0XHRcdFx0IDEgKHBsYXlpbmcpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCAyIChwYXVzZWQpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCAzIChidWZmZXJpbmcpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCA1ICh2aWRlbyBjdWVkKS5cclxuXHRcdFx0XHRcdFx0XHRcdFx0ICovXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGV2ZW50LnRhcmdldC5nZXRQbGF5ZXJTdGF0ZSAhPSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgc3RhdGUgPSBldmVudC50YXJnZXQuZ2V0UGxheWVyU3RhdGUoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgWVRQbGF5ZXIub3B0Lm9uU3RhdGVDaGFuZ2UgPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLm9wdC5vblN0YXRlQ2hhbmdlKCRZVFBsYXllciwgc3RhdGUpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHBsYXllckJveCA9IGpRdWVyeShZVFBsYXllci5wbGF5ZXJFbCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBjb250cm9scyA9IGpRdWVyeShcIiNjb250cm9sQmFyX1wiICsgWVRQbGF5ZXIuaWQpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGRhdGEgPSBZVFBsYXllci5vcHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoc3RhdGUgPT0gMCkgeyAvLyBlbmRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIuc3RhdGUgPT0gc3RhdGUpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnN0YXRlID0gc3RhdGU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnBhdXNlVmlkZW8oKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgc3RhcnRBdCA9IFlUUGxheWVyLm9wdC5zdGFydEF0ID8gWVRQbGF5ZXIub3B0LnN0YXJ0QXQgOiAxO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZGF0YS5sb29wKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLmNzcyh7b3BhY2l0eTogMH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLnBsYXlZVFAoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5zZWVrVG8oc3RhcnRBdCx0cnVlKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICghWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2Vla1RvKHN0YXJ0QXQsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLnBsYXlZVFAoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIucGF1c2VZVFAoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0sIDEwKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghZGF0YS5sb29wICYmIFlUUGxheWVyLmlzQmFja2dyb3VuZClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLndyYXBwZXIuQ1NTQW5pbWF0ZSh7b3BhY2l0eTogMH0sIDIwMDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGRhdGEubG9vcCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5jc3Moe29wYWNpdHk6IDB9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLmxvb3ArKztcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRyb2xzLmZpbmQoXCIubWJfWVRWUFBsYXlwYXVzZVwiKS5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBsYXkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihcIllUUEVuZFwiKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHN0YXRlID09IDMpIHsgLy8gYnVmZmVyaW5nXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLnN0YXRlID09IHN0YXRlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnN0YXRlID0gc3RhdGU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udHJvbHMuZmluZChcIi5tYl9ZVFZQUGxheXBhdXNlXCIpLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMucGxheSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFwiWVRQQnVmZmVyaW5nXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoc3RhdGUgPT0gLTEpIHsgLy8gdW5zdGFydGVkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLnN0YXRlID09IHN0YXRlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnN0YXRlID0gc3RhdGU7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLndyYXBwZXIuY3NzKHtvcGFjaXR5OjB9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFwiWVRQVW5zdGFydGVkXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoc3RhdGUgPT0gMSkgeyAvLyBwbGF5XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLnN0YXRlID09IHN0YXRlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnN0YXRlID0gc3RhdGU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnNldFBsYXliYWNrUXVhbGl0eShZVFBsYXllci5vcHQucXVhbGl0eSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKFlUUGxheWVyLm9wdC5tdXRlKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5tdXRlWVRQVm9sdW1lKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5vcHQubXV0ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5hdXRvUGxheSAmJiBZVFBsYXllci5sb29wID09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLndyYXBwZXIuQ1NTQW5pbWF0ZSh7b3BhY2l0eTogWVRQbGF5ZXIuaXNBbG9uZSA/IDEgOiBZVFBsYXllci5vcHQub3BhY2l0eX0sIDIwMDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZighWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLmNzcyh7b3BhY2l0eTogWVRQbGF5ZXIuaXNBbG9uZSA/IDEgOiBZVFBsYXllci5vcHQub3BhY2l0eX0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLmNzcyh7YmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNSlcIn0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllci5wbGF5ZXJFbCkuQ1NTQW5pbWF0ZSh7b3BhY2l0eTogMX0sIDIwMDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLkNTU0FuaW1hdGUoe29wYWNpdHk6IFlUUGxheWVyLm9wdC5vcGFjaXR5fSwgMjAwMCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9LCAxMDAwKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRyb2xzLmZpbmQoXCIubWJfWVRWUFBsYXlwYXVzZVwiKS5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBhdXNlKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFwiWVRQU3RhcnRcIik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzdGF0ZSA9PSAyKSB7IC8vIHBhdXNlXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLnN0YXRlID09IHN0YXRlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnN0YXRlID0gc3RhdGU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udHJvbHMuZmluZChcIi5tYl9ZVFZQUGxheXBhdXNlXCIpLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMucGxheSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFwiWVRQUGF1c2VcIik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHQnb25QbGF5YmFja1F1YWxpdHlDaGFuZ2UnOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIFlUUGxheWVyLm9wdC5vblBsYXliYWNrUXVhbGl0eUNoYW5nZSA9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIub3B0Lm9uUGxheWJhY2tRdWFsaXR5Q2hhbmdlKCRZVFBsYXllcik7XHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0J29uRXJyb3InICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKGVycikge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZXJyLmRhdGEgPT0gMiAmJiBZVFBsYXllci5pc1BsYXlMaXN0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikucGxheU5leHQoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgWVRQbGF5ZXIub3B0Lm9uRXJyb3IgPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLm9wdC5vbkVycm9yKCRZVFBsYXllciwgZXJyKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGdldERhdGFGcm9tRmVlZDogZnVuY3Rpb24gKHZpZGVvSUQsIFlUUGxheWVyKSB7XHJcblx0XHRcdC8vR2V0IHZpZGVvIGluZm8gZnJvbSBGRUVEUyBBUElcclxuXHJcblx0XHRcdFlUUGxheWVyLnZpZGVvSUQgPSB2aWRlb0lEO1xyXG5cdFx0XHRpZiAoIWpRdWVyeS5icm93c2VyLm1zaWUpIHsgLy8hKGpRdWVyeS5icm93c2VyLm1zaWUgJiYgalF1ZXJ5LmJyb3dzZXIudmVyc2lvbjw5KVxyXG5cclxuXHRcdFx0XHRqUXVlcnkuZ2V0SlNPTignaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My8nICsgdmlkZW9JRCArICc/dj0yJmFsdD1qc29uYycsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHhocikge1xyXG5cclxuXHRcdFx0XHRcdFlUUGxheWVyLmRhdGFSZWNlaXZlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHZpZGVvRGF0YSA9IGRhdGEuZGF0YTtcclxuXHJcblx0XHRcdFx0XHRZVFBsYXllci50aXRsZSA9IHZpZGVvRGF0YS50aXRsZTtcclxuXHRcdFx0XHRcdFlUUGxheWVyLnZpZGVvRGF0YSA9IHZpZGVvRGF0YTtcclxuXHJcblx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LnJhdGlvID09IFwiYXV0b1wiKVxyXG5cdFx0XHRcdFx0XHRpZiAodmlkZW9EYXRhLmFzcGVjdFJhdGlvICYmIHZpZGVvRGF0YS5hc3BlY3RSYXRpbyA9PT0gXCJ3aWRlc2NyZWVuXCIpXHJcblx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIub3B0LnJhdGlvID0gXCIxNi85XCI7XHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRZVFBsYXllci5vcHQucmF0aW8gPSBcIjQvM1wiO1xyXG5cclxuXHRcdFx0XHRcdGlmKCFZVFBsYXllci5pc0luaXQpe1xyXG5cclxuXHRcdFx0XHRcdFx0WVRQbGF5ZXIuaXNJbml0ID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICghWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGJnbmRVUkwgPSBZVFBsYXllci52aWRlb0RhdGEudGh1bWJuYWlsLmhxRGVmYXVsdDtcclxuXHJcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5jc3Moe2JhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjUpIHVybChcIiArIGJnbmRVUkwgKyBcIikgY2VudGVyIGNlbnRlclwiLCBiYWNrZ3JvdW5kU2l6ZTogXCJjb3ZlclwifSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGpRdWVyeShkb2N1bWVudCkudHJpZ2dlcihcImdldFZpZGVvSW5mb19cIiArIFlUUGxheWVyLm9wdC5pZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnRyaWdnZXIoXCJZVFBDaGFuZ2VkXCIpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRpZighWVRQbGF5ZXIuZGF0YVJlY2VpdmVkICYmICFZVFBsYXllci5pc0luaXQpe1xyXG5cdFx0XHRcdFx0XHRZVFBsYXllci5pc0luaXQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRqUXVlcnkoZG9jdW1lbnQpLnRyaWdnZXIoXCJnZXRWaWRlb0luZm9fXCIgKyBZVFBsYXllci5vcHQuaWQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sMjUwMClcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0WVRQbGF5ZXIub3B0LnJhdGlvID09IFwiYXV0b1wiID8gWVRQbGF5ZXIub3B0LnJhdGlvID0gXCIxNi85XCIgOiBZVFBsYXllci5vcHQucmF0aW87XHJcblxyXG5cdFx0XHRcdGlmKCFZVFBsYXllci5pc0luaXQpe1xyXG5cdFx0XHRcdFx0WVRQbGF5ZXIuaXNJbml0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KGRvY3VtZW50KS50cmlnZ2VyKFwiZ2V0VmlkZW9JbmZvX1wiICsgWVRQbGF5ZXIub3B0LmlkKTtcclxuXHRcdFx0XHRcdH0sMTAwKVxyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFwiWVRQQ2hhbmdlZFwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRWaWRlb0lEOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdFx0cmV0dXJuIFlUUGxheWVyLnZpZGVvSUQgfHwgZmFsc2UgO1xyXG5cdFx0fSxcclxuXHJcblx0XHRzZXRWaWRlb1F1YWxpdHk6IGZ1bmN0aW9uKHF1YWxpdHkpe1xyXG5cdFx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdFx0WVRQbGF5ZXIucGxheWVyLnNldFBsYXliYWNrUXVhbGl0eShxdWFsaXR5KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0WVRQbGF5bGlzdCA6IGZ1bmN0aW9uKHZpZGVvcywgc2h1ZmZsZSwgY2FsbGJhY2spe1xyXG5cdFx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHJcblx0XHRcdFlUUGxheWVyLmlzUGxheUxpc3QgPSB0cnVlO1xyXG5cclxuXHRcdFx0aWYoc2h1ZmZsZSlcclxuXHRcdFx0XHR2aWRlb3MgPSBqUXVlcnkuc2h1ZmZsZSh2aWRlb3MpO1xyXG5cclxuXHRcdFx0aWYoIVlUUGxheWVyLnZpZGVvSUQpe1xyXG5cdFx0XHRcdFlUUGxheWVyLnZpZGVvcyA9IHZpZGVvcztcclxuXHRcdFx0XHRZVFBsYXllci52aWRlb0NvdW50ZXIgPSAwO1xyXG5cdFx0XHRcdFlUUGxheWVyLnZpZGVvTGVuZ3RoID0gdmlkZW9zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5kYXRhKFwicHJvcGVydHlcIiwgdmlkZW9zWzBdKTtcclxuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLm1iX1lUUGxheWVyKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHR5cGVvZiBjYWxsYmFjayA9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5vbihcIllUUENoYW5nZWRcIixmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soWVRQbGF5ZXIpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5vbihcIllUUEVuZFwiLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikucGxheU5leHQoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHBsYXlOZXh0OiBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdFx0WVRQbGF5ZXIudmlkZW9Db3VudGVyKys7XHJcblx0XHRcdGlmKFlUUGxheWVyLnZpZGVvQ291bnRlcj49WVRQbGF5ZXIudmlkZW9MZW5ndGgpXHJcblx0XHRcdFx0WVRQbGF5ZXIudmlkZW9Db3VudGVyID0gMDtcclxuXHRcdFx0alF1ZXJ5KFlUUGxheWVyLnBsYXllckVsKS5jc3Moe29wYWNpdHk6MH0pO1xyXG5cdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLmNoYW5nZU1vdmllKFlUUGxheWVyLnZpZGVvc1tZVFBsYXllci52aWRlb0NvdW50ZXJdKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Y2hhbmdlTW92aWU6IGZ1bmN0aW9uIChvcHQpIHtcclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblx0XHRcdHZhciBkYXRhID0gWVRQbGF5ZXIub3B0O1xyXG5cdFx0XHRpZiAob3B0KSB7XHJcblx0XHRcdFx0alF1ZXJ5LmV4dGVuZChkYXRhLCBvcHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRZVFBsYXllci52aWRlb0lEID0gZGF0YS52aWRlb1VSTC5nZXRWaWRlb0lEKCk7XHJcblxyXG5cdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnBhdXNlWVRQKCk7XHJcblx0XHRcdHZhciB0aW1lciA9IGpRdWVyeS5icm93c2VyLm1zaWUgPyAxMDAwIDogMDtcclxuXHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5nZXRQbGF5ZXIoKS5jdWVWaWRlb0J5VXJsKGVuY29kZVVSSShcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3YvXCIgKyBZVFBsYXllci52aWRlb0lEKSAsIDUgLCBZVFBsYXllci5vcHQucXVhbGl0eSk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5wbGF5WVRQKCk7XHJcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5vbmUoXCJZVFBTdGFydFwiLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyLnBsYXllckVsKS5DU1NBbmltYXRlKHtvcGFjaXR5OjF9LDIwMDApO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSx0aW1lcilcclxuXHJcblx0XHRcdGlmIChZVFBsYXllci5vcHQubXV0ZSkge1xyXG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikubXV0ZVlUUFZvbHVtZSgpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnVubXV0ZVlUUFZvbHVtZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmFkZFJhc3Rlcikge1xyXG5cdFx0XHRcdHZhciByZXRpbmEgPSAod2luZG93LnJldGluYSB8fCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEpO1xyXG5cdFx0XHRcdFlUUGxheWVyLm92ZXJsYXkuYWRkQ2xhc3MocmV0aW5hID8gXCJyYXN0ZXIgcmV0aW5hXCIgOiBcInJhc3RlclwiKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0WVRQbGF5ZXIub3ZlcmxheS5yZW1vdmVDbGFzcyhcInJhc3RlclwiKTtcclxuXHRcdFx0XHRZVFBsYXllci5vdmVybGF5LnJlbW92ZUNsYXNzKFwicmV0aW5hXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRqUXVlcnkoXCIjY29udHJvbEJhcl9cIiArIFlUUGxheWVyLmlkKS5yZW1vdmUoKTtcclxuXHJcblx0XHRcdGlmIChZVFBsYXllci5vcHQuc2hvd0NvbnRyb2xzKVxyXG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikuYnVpbGRZVFBDb250cm9scygpO1xyXG5cclxuXHRcdFx0alF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0RGF0YUZyb21GZWVkKFlUUGxheWVyLnZpZGVvSUQsIFlUUGxheWVyKTtcclxuXHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5vcHRpbWl6ZURpc3BsYXkoKTtcclxuXHRcdFx0alF1ZXJ5Lm1iWVRQbGF5ZXIuY2hlY2tGb3JTdGF0ZShZVFBsYXllcik7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRQbGF5ZXI6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGpRdWVyeSh0aGlzKS5nZXQoMCkucGxheWVyO1xyXG5cdFx0fSxcclxuXHJcblx0XHRwbGF5ZXJEZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cdFx0XHR5dHAuWVRBUElSZWFkeSA9IGZhbHNlO1xyXG5cdFx0XHR5dHAuaXNJbml0ID0gZmFsc2U7XHJcblx0XHRcdFlUUGxheWVyLm9wdC5pc0luaXQgPSBmYWxzZTtcclxuXHRcdFx0WVRQbGF5ZXIudmlkZW9JRCA9IG51bGw7XHJcblxyXG5cdFx0XHR2YXIgcGxheWVyQm94ID0gWVRQbGF5ZXIud3JhcHBlcjtcclxuXHRcdFx0cGxheWVyQm94LnJlbW92ZSgpO1xyXG5cdFx0XHRqUXVlcnkoXCIjY29udHJvbEJhcl9cIiArIFlUUGxheWVyLmlkKS5yZW1vdmUoKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZnVsbHNjcmVlbjogZnVuY3Rpb24ocmVhbCkge1xyXG5cclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblxyXG5cdFx0XHR2YXIgY29udHJvbHMgPSBqUXVlcnkoXCIjY29udHJvbEJhcl9cIiArIFlUUGxheWVyLmlkKTtcclxuXHRcdFx0dmFyIGZ1bGxTY3JlZW5CdG4gPSBjb250cm9scy5maW5kKFwiLm1iX09ubHlZVFwiKTtcclxuXHRcdFx0dmFyIHZpZGVvV3JhcHBlciA9IGpRdWVyeShZVFBsYXllci53cmFwcGVyKTtcclxuXHRcdFx0aWYocmVhbCl7XHJcblx0XHRcdFx0dmFyIGZ1bGxzY3JlZW5jaGFuZ2UgPSBqUXVlcnkuYnJvd3Nlci5tb3ppbGxhID8gXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIgOiBqUXVlcnkuYnJvd3Nlci53ZWJraXQgPyBcIndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2VcIiA6IFwiZnVsbHNjcmVlbmNoYW5nZVwiO1xyXG5cdFx0XHRcdGpRdWVyeShkb2N1bWVudCkub2ZmKGZ1bGxzY3JlZW5jaGFuZ2UpO1xyXG5cdFx0XHRcdGpRdWVyeShkb2N1bWVudCkub24oZnVsbHNjcmVlbmNoYW5nZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgaXNGdWxsU2NyZWVuID0gUnVuUHJlZml4TWV0aG9kKGRvY3VtZW50LCBcIklzRnVsbFNjcmVlblwiKSB8fCBSdW5QcmVmaXhNZXRob2QoZG9jdW1lbnQsIFwiRnVsbFNjcmVlblwiKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWlzRnVsbFNjcmVlbikge1xyXG5cdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnJlbW92ZUNsYXNzKFwiZnVsbHNjcmVlblwiKTtcclxuXHRcdFx0XHRcdFx0WVRQbGF5ZXIuaXNBbG9uZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRmdWxsU2NyZWVuQnRuLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMub25seVlUKVxyXG5cdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnNldFZpZGVvUXVhbGl0eShZVFBsYXllci5vcHQucXVhbGl0eSk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKXtcclxuXHRcdFx0XHRcdFx0XHRqUXVlcnkoXCJib2R5XCIpLmFmdGVyKGNvbnRyb2xzKTtcclxuXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5iZWZvcmUoY29udHJvbHMpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5zZXRWaWRlb1F1YWxpdHkoXCJkZWZhdWx0XCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIVlUUGxheWVyLmlzQWxvbmUpIHtcclxuXHJcblx0XHRcdFx0aWYgKFlUUGxheWVyLnBsYXllci5nZXRQbGF5ZXJTdGF0ZSgpID49IDEpIHtcclxuXHJcblx0XHRcdFx0XHRpZihZVFBsYXllci5wbGF5ZXIuZ2V0UGxheWVyU3RhdGUoKSAhPSAxICYmIFlUUGxheWVyLnBsYXllci5nZXRQbGF5ZXJTdGF0ZSgpICE9IDIpXHJcblx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikucGxheVlUUCgpO1xyXG5cclxuXHRcdFx0XHRcdGlmKHJlYWwpe1xyXG5cdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLmFwcGVuZChjb250cm9scyk7XHJcblx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikuYWRkQ2xhc3MoXCJmdWxsc2NyZWVuXCIpO1xyXG5cdFx0XHRcdFx0XHRsYXVuY2hGdWxsc2NyZWVuKHZpZGVvV3JhcHBlci5nZXQoMCkpO1xyXG5cdFx0XHRcdFx0fSBlbHNlXHJcblx0XHRcdFx0XHRcdHZpZGVvV3JhcHBlci5jc3Moe3pJbmRleDogMTAwMDB9KS5DU1NBbmltYXRlKHtvcGFjaXR5OiAxfSwgMTAwMCwgMCk7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFwiWVRQRnVsbFNjcmVlblN0YXJ0XCIpO1xyXG5cclxuXHRcdFx0XHRcdGZ1bGxTY3JlZW5CdG4uaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5zaG93U2l0ZSlcclxuXHRcdFx0XHRcdFlUUGxheWVyLmlzQWxvbmUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGlmKHJlYWwpe1xyXG5cdFx0XHRcdFx0Y2FuY2VsRnVsbHNjcmVlbigpO1xyXG5cdFx0XHRcdH0gZWxzZXtcclxuXHRcdFx0XHRcdHZpZGVvV3JhcHBlci5DU1NBbmltYXRlKHtvcGFjaXR5OiBZVFBsYXllci5vcHQub3BhY2l0eX0sIDUwMCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnRyaWdnZXIoXCJZVFBGdWxsU2NyZWVuRW5kXCIpO1xyXG5cclxuXHRcdFx0XHR2aWRlb1dyYXBwZXIuY3NzKHt6SW5kZXg6IC0xfSk7XHJcblx0XHRcdFx0ZnVsbFNjcmVlbkJ0bi5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLm9ubHlZVClcclxuXHRcdFx0XHRZVFBsYXllci5pc0Fsb25lID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIFJ1blByZWZpeE1ldGhvZChvYmosIG1ldGhvZCkge1xyXG5cdFx0XHRcdHZhciBwZnggPSBbXCJ3ZWJraXRcIiwgXCJtb3pcIiwgXCJtc1wiLCBcIm9cIiwgXCJcIl07XHJcblx0XHRcdFx0dmFyIHAgPSAwLCBtLCB0O1xyXG5cdFx0XHRcdHdoaWxlIChwIDwgcGZ4Lmxlbmd0aCAmJiAhb2JqW21dKSB7XHJcblx0XHRcdFx0XHRtID0gbWV0aG9kO1xyXG5cdFx0XHRcdFx0aWYgKHBmeFtwXSA9PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRcdG0gPSBtLnN1YnN0cigwLDEpLnRvTG93ZXJDYXNlKCkgKyBtLnN1YnN0cigxKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdG0gPSBwZnhbcF0gKyBtO1xyXG5cdFx0XHRcdFx0dCA9IHR5cGVvZiBvYmpbbV07XHJcblx0XHRcdFx0XHRpZiAodCAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdHBmeCA9IFtwZnhbcF1dO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gKHQgPT0gXCJmdW5jdGlvblwiID8gb2JqW21dKCkgOiBvYmpbbV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cCsrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gbGF1bmNoRnVsbHNjcmVlbihlbGVtZW50KSB7XHJcblx0XHRcdFx0UnVuUHJlZml4TWV0aG9kKGVsZW1lbnQsIFwiUmVxdWVzdEZ1bGxTY3JlZW5cIik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGNhbmNlbEZ1bGxzY3JlZW4oKSB7XHJcblx0XHRcdFx0aWYgKFJ1blByZWZpeE1ldGhvZChkb2N1bWVudCwgXCJGdWxsU2NyZWVuXCIpIHx8IFJ1blByZWZpeE1ldGhvZChkb2N1bWVudCwgXCJJc0Z1bGxTY3JlZW5cIikpIHtcclxuXHRcdFx0XHRcdFJ1blByZWZpeE1ldGhvZChkb2N1bWVudCwgXCJDYW5jZWxGdWxsU2NyZWVuXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRwbGF5WVRQOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cdFx0XHR2YXIgY29udHJvbHMgPSBqUXVlcnkoXCIjY29udHJvbEJhcl9cIiArIFlUUGxheWVyLmlkKTtcclxuXHRcdFx0dmFyIHBsYXlCdG4gPSBjb250cm9scy5maW5kKFwiLm1iX1lUVlBQbGF5cGF1c2VcIik7XHJcblx0XHRcdHBsYXlCdG4uaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5wYXVzZSk7XHJcblx0XHRcdFlUUGxheWVyLnBsYXllci5wbGF5VmlkZW8oKTtcclxuXHJcblx0XHRcdFlUUGxheWVyLndyYXBwZXIuQ1NTQW5pbWF0ZSh7b3BhY2l0eTogWVRQbGF5ZXIub3B0Lm9wYWNpdHl9LCAyMDAwKTtcclxuXHRcdFx0JChZVFBsYXllcikub24oXCJZVFBTdGFydFwiLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikuY3NzKFwiYmFja2dyb3VuZFwiLCBcIm5vbmVcIik7XHJcblx0XHRcdH0pXHJcblx0XHR9LFxyXG5cclxuXHRcdHRvZ2dsZUxvb3BzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cdFx0XHR2YXIgZGF0YSA9IFlUUGxheWVyLm9wdDtcclxuXHRcdFx0aWYgKGRhdGEubG9vcCA9PSAxKSB7XHJcblx0XHRcdFx0ZGF0YS5sb29wID0gMDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZihkYXRhLnN0YXJ0QXQpIHtcclxuXHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5zZWVrVG8oZGF0YS5zdGFydEF0KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnBsYXlWaWRlbygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkYXRhLmxvb3AgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdHN0b3BZVFA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblx0XHRcdHZhciBjb250cm9scyA9IGpRdWVyeShcIiNjb250cm9sQmFyX1wiICsgWVRQbGF5ZXIuaWQpO1xyXG5cdFx0XHR2YXIgcGxheUJ0biA9IGNvbnRyb2xzLmZpbmQoXCIubWJfWVRWUFBsYXlwYXVzZVwiKTtcclxuXHRcdFx0cGxheUJ0bi5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBsYXkpO1xyXG5cdFx0XHRZVFBsYXllci5wbGF5ZXIuc3RvcFZpZGVvKCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHBhdXNlWVRQOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cdFx0XHR2YXIgZGF0YSA9IFlUUGxheWVyLm9wdDtcclxuXHRcdFx0dmFyIGNvbnRyb2xzID0galF1ZXJ5KFwiI2NvbnRyb2xCYXJfXCIgKyBZVFBsYXllci5pZCk7XHJcblx0XHRcdHZhciBwbGF5QnRuID0gY29udHJvbHMuZmluZChcIi5tYl9ZVFZQUGxheXBhdXNlXCIpO1xyXG5cdFx0XHRwbGF5QnRuLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMucGxheSk7XHJcblx0XHRcdFlUUGxheWVyLnBsYXllci5wYXVzZVZpZGVvKCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHNldFlUUFZvbHVtZTogZnVuY3Rpb24gKHZhbCkge1xyXG5cdFx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdFx0aWYgKCF2YWwgJiYgIVlUUGxheWVyLm9wdC52b2wgJiYgcGxheWVyLmdldFZvbHVtZSgpID09IDApXHJcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS51bm11dGVZVFBWb2x1bWUoKTtcclxuXHRcdFx0ZWxzZSBpZiAoKCF2YWwgJiYgWVRQbGF5ZXIucGxheWVyLmdldFZvbHVtZSgpID4gMCkgfHwgKHZhbCAmJiBZVFBsYXllci5wbGF5ZXIuZ2V0Vm9sdW1lKCkgPT0gdmFsKSlcclxuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLm11dGVZVFBWb2x1bWUoKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFlUUGxheWVyLm9wdC52b2wgPSB2YWw7XHJcblx0XHRcdFlUUGxheWVyLnBsYXllci5zZXRWb2x1bWUoWVRQbGF5ZXIub3B0LnZvbCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdG11dGVZVFBWb2x1bWU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblx0XHRcdFlUUGxheWVyLm9wdC52b2wgPSBZVFBsYXllci5wbGF5ZXIuZ2V0Vm9sdW1lKCkgfHwgNTA7XHJcblx0XHRcdFlUUGxheWVyLnBsYXllci5tdXRlKCk7XHJcblx0XHRcdFlUUGxheWVyLnBsYXllci5zZXRWb2x1bWUoMCk7XHJcblx0XHRcdHZhciBjb250cm9scyA9IGpRdWVyeShcIiNjb250cm9sQmFyX1wiICsgWVRQbGF5ZXIuaWQpO1xyXG5cdFx0XHR2YXIgbXV0ZUJ0biA9IGNvbnRyb2xzLmZpbmQoXCIubWJfWVRWUE11dGVVbm11dGVcIik7XHJcblx0XHRcdG11dGVCdG4uaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy51bm11dGUpO1xyXG5cdFx0fSxcclxuXHJcblx0XHR1bm11dGVZVFBWb2x1bWU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblxyXG5cdFx0XHRZVFBsYXllci5wbGF5ZXIudW5NdXRlKCk7XHJcblx0XHRcdFlUUGxheWVyLnBsYXllci5zZXRWb2x1bWUoWVRQbGF5ZXIub3B0LnZvbCk7XHJcblxyXG5cdFx0XHR2YXIgY29udHJvbHMgPSBqUXVlcnkoXCIjY29udHJvbEJhcl9cIiArIFlUUGxheWVyLmlkKTtcclxuXHRcdFx0dmFyIG11dGVCdG4gPSBjb250cm9scy5maW5kKFwiLm1iX1lUVlBNdXRlVW5tdXRlXCIpO1xyXG5cdFx0XHRtdXRlQnRuLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMubXV0ZSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdG1hbmFnZVlUUFByb2dyZXNzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cdFx0XHR2YXIgY29udHJvbHMgPSBqUXVlcnkoXCIjY29udHJvbEJhcl9cIiArIFlUUGxheWVyLmlkKTtcclxuXHRcdFx0dmFyIHByb2dyZXNzQmFyID0gY29udHJvbHMuZmluZChcIi5tYl9ZVFZQUHJvZ3Jlc3NcIik7XHJcblx0XHRcdHZhciBsb2FkZWRCYXIgPSBjb250cm9scy5maW5kKFwiLm1iX1lUVlBMb2FkZWRcIik7XHJcblx0XHRcdHZhciB0aW1lQmFyID0gY29udHJvbHMuZmluZChcIi5tYl9ZVFZUaW1lXCIpO1xyXG5cdFx0XHR2YXIgdG90VyA9IHByb2dyZXNzQmFyLm91dGVyV2lkdGgoKTtcclxuXHJcblx0XHRcdHZhciBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IoWVRQbGF5ZXIucGxheWVyLmdldEN1cnJlbnRUaW1lKCkpO1xyXG5cdFx0XHR2YXIgdG90YWxUaW1lID0gTWF0aC5mbG9vcihZVFBsYXllci5wbGF5ZXIuZ2V0RHVyYXRpb24oKSk7XHJcblx0XHRcdHZhciB0aW1lVyA9IChjdXJyZW50VGltZSAqIHRvdFcpIC8gdG90YWxUaW1lO1xyXG5cdFx0XHR2YXIgc3RhcnRMZWZ0ID0gMDtcclxuXHJcblx0XHRcdHZhciBsb2FkZWRXID0gWVRQbGF5ZXIucGxheWVyLmdldFZpZGVvTG9hZGVkRnJhY3Rpb24oKSAqIDEwMDtcclxuXHJcblx0XHRcdGxvYWRlZEJhci5jc3Moe2xlZnQ6IHN0YXJ0TGVmdCwgd2lkdGg6IGxvYWRlZFcgKyBcIiVcIn0pO1xyXG5cdFx0XHR0aW1lQmFyLmNzcyh7bGVmdDogMCwgd2lkdGg6IHRpbWVXfSk7XHJcblx0XHRcdHJldHVybiB7dG90YWxUaW1lOiB0b3RhbFRpbWUsIGN1cnJlbnRUaW1lOiBjdXJyZW50VGltZX07XHJcblx0XHR9LFxyXG5cclxuXHRcdGJ1aWxkWVRQQ29udHJvbHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblx0XHRcdHZhciBkYXRhID0gWVRQbGF5ZXIub3B0O1xyXG5cclxuXHRcdFx0aWYoalF1ZXJ5KFwiI2NvbnRyb2xCYXJfXCIrIFlUUGxheWVyLmlkKS5sZW5ndGgpXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0dmFyIGNvbnRyb2xCYXIgPSBqUXVlcnkoXCI8c3Bhbi8+XCIpLmF0dHIoXCJpZFwiLCBcImNvbnRyb2xCYXJfXCIgKyBZVFBsYXllci5pZCkuYWRkQ2xhc3MoXCJtYl9ZVFZQQmFyXCIpLmNzcyh7d2hpdGVTcGFjZTogXCJub1dyYXBcIiwgcG9zaXRpb246IFlUUGxheWVyLmlzQmFja2dyb3VuZCA/IFwiZml4ZWRcIiA6IFwiYWJzb2x1dGVcIiwgekluZGV4OiBZVFBsYXllci5pc0JhY2tncm91bmQgPyAxMDAwMCA6IDEwMDB9KS5oaWRlKCk7XHJcblx0XHRcdHZhciBidXR0b25CYXIgPSBqUXVlcnkoXCI8ZGl2Lz5cIikuYWRkQ2xhc3MoXCJidXR0b25CYXJcIik7XHJcblx0XHRcdHZhciBwbGF5cGF1c2UgPSBqUXVlcnkoXCI8c3Bhbj5cIiArIGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBsYXkgKyBcIjwvc3Bhbj5cIikuYWRkQ2xhc3MoXCJtYl9ZVFZQUGxheXBhdXNlIHl0cGljb25cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlmIChZVFBsYXllci5wbGF5ZXIuZ2V0UGxheWVyU3RhdGUoKSA9PSAxKVxyXG5cdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5wYXVzZVlUUCgpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikucGxheVlUUCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHZhciBNdXRlVW5tdXRlID0galF1ZXJ5KFwiPHNwYW4+XCIgKyBqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5tdXRlICsgXCI8L3NwYW4+XCIpLmFkZENsYXNzKFwibWJfWVRWUE11dGVVbm11dGUgeXRwaWNvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0aWYgKFlUUGxheWVyLnBsYXllci5nZXRWb2x1bWUoKT09MCkge1xyXG5cdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS51bm11dGVZVFBWb2x1bWUoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5tdXRlWVRQVm9sdW1lKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHZhciBpZHggPSBqUXVlcnkoXCI8c3Bhbi8+XCIpLmFkZENsYXNzKFwibWJfWVRWUFRpbWVcIik7XHJcblxyXG5cdFx0XHR2YXIgdlVSTCA9IGRhdGEudmlkZW9VUkw7XHJcblx0XHRcdGlmKHZVUkwuaW5kZXhPZihcImh0dHBzXCIpIDwgMClcclxuXHRcdFx0XHR2VVJMID0gXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PVwiK2RhdGEudmlkZW9VUkw7XHJcblx0XHRcdHZhciBtb3ZpZVVybCA9IGpRdWVyeShcIjxzcGFuLz5cIikuaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy55dExvZ28pLmFkZENsYXNzKFwibWJfWVRWUFVybCB5dHBpY29uXCIpLmF0dHIoXCJ0aXRsZVwiLCBcInZpZXcgb24gWW91VHViZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHt3aW5kb3cub3Blbih2VVJMLCBcInZpZXdPbllUXCIpfSk7XHJcblx0XHRcdHZhciBvbmx5VmlkZW8gPSBqUXVlcnkoXCI8c3Bhbi8+XCIpLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMub25seVlUKS5hZGRDbGFzcyhcIm1iX09ubHlZVCB5dHBpY29uXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbiAoKSB7alF1ZXJ5KFlUUGxheWVyKS5mdWxsc2NyZWVuKGRhdGEucmVhbGZ1bGxzY3JlZW4pO30pO1xyXG5cclxuXHRcdFx0dmFyIHByb2dyZXNzQmFyID0galF1ZXJ5KFwiPGRpdi8+XCIpLmFkZENsYXNzKFwibWJfWVRWUFByb2dyZXNzXCIpLmNzcyhcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHR0aW1lQmFyLmNzcyh7d2lkdGg6IChlLmNsaWVudFggLSB0aW1lQmFyLm9mZnNldCgpLmxlZnQpfSk7XHJcblx0XHRcdFx0WVRQbGF5ZXIudGltZVcgPSBlLmNsaWVudFggLSB0aW1lQmFyLm9mZnNldCgpLmxlZnQ7XHJcblx0XHRcdFx0Y29udHJvbEJhci5maW5kKFwiLm1iX1lUVlBMb2FkZWRcIikuY3NzKHt3aWR0aDogMH0pO1xyXG5cdFx0XHRcdHZhciB0b3RhbFRpbWUgPSBNYXRoLmZsb29yKFlUUGxheWVyLnBsYXllci5nZXREdXJhdGlvbigpKTtcclxuXHRcdFx0XHRZVFBsYXllci5nb3RvID0gKHRpbWVCYXIub3V0ZXJXaWR0aCgpICogdG90YWxUaW1lKSAvIHByb2dyZXNzQmFyLm91dGVyV2lkdGgoKTtcclxuXHJcblx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnNlZWtUbyhwYXJzZUZsb2F0KFlUUGxheWVyLmdvdG8pLCB0cnVlKTtcclxuXHRcdFx0XHRjb250cm9sQmFyLmZpbmQoXCIubWJfWVRWUExvYWRlZFwiKS5jc3Moe3dpZHRoOiAwfSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dmFyIGxvYWRlZEJhciA9IGpRdWVyeShcIjxkaXYvPlwiKS5hZGRDbGFzcyhcIm1iX1lUVlBMb2FkZWRcIikuY3NzKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKTtcclxuXHRcdFx0dmFyIHRpbWVCYXIgPSBqUXVlcnkoXCI8ZGl2Lz5cIikuYWRkQ2xhc3MoXCJtYl9ZVFZUaW1lXCIpLmNzcyhcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIik7XHJcblxyXG5cdFx0XHRwcm9ncmVzc0Jhci5hcHBlbmQobG9hZGVkQmFyKS5hcHBlbmQodGltZUJhcik7XHJcblx0XHRcdGJ1dHRvbkJhci5hcHBlbmQocGxheXBhdXNlKS5hcHBlbmQoTXV0ZVVubXV0ZSkuYXBwZW5kKGlkeCk7XHJcblxyXG5cdFx0XHRpZiAoZGF0YS5wcmludFVybCl7XHJcblx0XHRcdFx0YnV0dG9uQmFyLmFwcGVuZChtb3ZpZVVybCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChZVFBsYXllci5pc0JhY2tncm91bmQgfHwgKFlUUGxheWVyLm9wdC5yZWFsZnVsbHNjcmVlbiAmJiAhWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKSlcclxuXHRcdFx0XHRidXR0b25CYXIuYXBwZW5kKG9ubHlWaWRlbyk7XHJcblxyXG5cdFx0XHRjb250cm9sQmFyLmFwcGVuZChidXR0b25CYXIpLmFwcGVuZChwcm9ncmVzc0Jhcik7XHJcblxyXG5cdFx0XHRpZiAoIVlUUGxheWVyLmlzQmFja2dyb3VuZCkge1xyXG5cdFx0XHRcdGNvbnRyb2xCYXIuYWRkQ2xhc3MoXCJpbmxpbmVQbGF5ZXJcIik7XHJcblx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5iZWZvcmUoY29udHJvbEJhcik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0alF1ZXJ5KFwiYm9keVwiKS5hZnRlcihjb250cm9sQmFyKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb250cm9sQmFyLmZhZGVJbigpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0Y2hlY2tGb3JTdGF0ZTpmdW5jdGlvbihZVFBsYXllcil7XHJcblxyXG5cdFx0XHR2YXIgY29udHJvbEJhciA9IGpRdWVyeShcIiNjb250cm9sQmFyX1wiICsgWVRQbGF5ZXIuaWQpO1xyXG5cdFx0XHR2YXIgZGF0YSA9IFlUUGxheWVyLm9wdDtcclxuXHRcdFx0dmFyIHN0YXJ0QXQgPSBZVFBsYXllci5vcHQuc3RhcnRBdCA/IFlUUGxheWVyLm9wdC5zdGFydEF0IDogMTtcclxuXHJcblx0XHRcdFlUUGxheWVyLmdldFN0YXRlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBwcm9nID0galF1ZXJ5KFlUUGxheWVyKS5tYW5hZ2VZVFBQcm9ncmVzcygpO1xyXG5cclxuXHRcdFx0XHRjb250cm9sQmFyLmZpbmQoXCIubWJfWVRWUFRpbWVcIikuaHRtbChqUXVlcnkubWJZVFBsYXllci5mb3JtYXRUaW1lKHByb2cuY3VycmVudFRpbWUpICsgXCIgLyBcIiArIGpRdWVyeS5tYllUUGxheWVyLmZvcm1hdFRpbWUocHJvZy50b3RhbFRpbWUpKTtcclxuXHRcdFx0XHRpZiAocGFyc2VGbG9hdChZVFBsYXllci5wbGF5ZXIuZ2V0RHVyYXRpb24oKSAtIDMpIDwgWVRQbGF5ZXIucGxheWVyLmdldEN1cnJlbnRUaW1lKCkgJiYgWVRQbGF5ZXIucGxheWVyLmdldFBsYXllclN0YXRlKCkgPT0gMSAmJiAhWVRQbGF5ZXIuaXNQbGF5TGlzdCkge1xyXG5cdFx0XHRcdFx0aWYoIWRhdGEubG9vcCl7XHJcblx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5wYXVzZVZpZGVvKCk7XHJcblx0XHRcdFx0XHRcdFlUUGxheWVyLndyYXBwZXIuQ1NTQW5pbWF0ZSh7b3BhY2l0eTogMH0sIDIwMDAsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2Vla1RvKHN0YXJ0QXQpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoIVlUUGxheWVyLmlzQmFja2dyb3VuZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGJnbmRVUkwgPSBZVFBsYXllci52aWRlb0RhdGEudGh1bWJuYWlsLmhxRGVmYXVsdDtcclxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikuY3NzKHtiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC41KSB1cmwoXCIgKyBiZ25kVVJMICsgXCIpIGNlbnRlciBjZW50ZXJcIiwgYmFja2dyb3VuZFNpemU6IFwiY292ZXJcIn0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2Vla1RvKHN0YXJ0QXQpO1xyXG5cdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFwiWVRQRW5kXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMSk7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRmb3JtYXRUaW1lICAgICAgOiBmdW5jdGlvbiAocykge1xyXG5cdFx0XHR2YXIgbWluID0gTWF0aC5mbG9vcihzIC8gNjApO1xyXG5cdFx0XHR2YXIgc2VjID0gTWF0aC5mbG9vcihzIC0gKDYwICogbWluKSk7XHJcblx0XHRcdHJldHVybiAobWluIDwgOSA/IFwiMFwiICsgbWluIDogbWluKSArIFwiIDogXCIgKyAoc2VjIDwgOSA/IFwiMFwiICsgc2VjIDogc2VjKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRqUXVlcnkuZm4udG9nZ2xlVm9sdW1lID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblx0XHRpZiAoIVlUUGxheWVyKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0aWYgKFlUUGxheWVyLnBsYXllci5pc011dGVkKCkpIHtcclxuXHRcdFx0alF1ZXJ5KFlUUGxheWVyKS51bm11dGVZVFBWb2x1bWUoKTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLm11dGVZVFBWb2x1bWUoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGpRdWVyeS5mbi5vcHRpbWl6ZURpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdHZhciBkYXRhID0gWVRQbGF5ZXIub3B0O1xyXG5cdFx0dmFyIHBsYXllckJveCA9IGpRdWVyeShZVFBsYXllci5wbGF5ZXJFbCk7XHJcblx0XHR2YXIgd2luID0ge307XHJcblx0XHR2YXIgZWwgPSAhWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kID8gZGF0YS5jb250YWlubWVudCA6IGpRdWVyeSh3aW5kb3cpO1xyXG5cclxuXHRcdHdpbi53aWR0aCA9IGVsLndpZHRoKCk7XHJcblx0XHR3aW4uaGVpZ2h0ID0gZWwuaGVpZ2h0KCk7XHJcblxyXG5cdFx0dmFyIG1hcmdpbiA9IDI0O1xyXG5cdFx0dmFyIHZpZCA9IHt9O1xyXG5cdFx0dmlkLndpZHRoID0gd2luLndpZHRoICsgKCh3aW4ud2lkdGggKiBtYXJnaW4pIC8gMTAwKTtcclxuXHRcdHZpZC5oZWlnaHQgPSBkYXRhLnJhdGlvID09IFwiMTYvOVwiID8gTWF0aC5jZWlsKCg5ICogd2luLndpZHRoKSAvIDE2KSA6IE1hdGguY2VpbCgoMyAqIHdpbi53aWR0aCkgLyA0KTtcclxuXHRcdHZpZC5tYXJnaW5Ub3AgPSAtKCh2aWQuaGVpZ2h0IC0gd2luLmhlaWdodCkgLyAyKTtcclxuXHRcdHZpZC5tYXJnaW5MZWZ0ID0gLSgod2luLndpZHRoICogKG1hcmdpbiAvIDIpKSAvIDEwMCk7XHJcblxyXG5cdFx0aWYgKHZpZC5oZWlnaHQgPCB3aW4uaGVpZ2h0KSB7XHJcblx0XHRcdHZpZC5oZWlnaHQgPSB3aW4uaGVpZ2h0ICsgKCh3aW4uaGVpZ2h0ICogbWFyZ2luKSAvIDEwMCk7XHJcblx0XHRcdHZpZC53aWR0aCA9IGRhdGEucmF0aW8gPT0gXCIxNi85XCIgPyBNYXRoLmZsb29yKCgxNiAqIHdpbi5oZWlnaHQpIC8gOSkgOiBNYXRoLmZsb29yKCg0ICogd2luLmhlaWdodCkgLyAzKTtcclxuXHRcdFx0dmlkLm1hcmdpblRvcCA9IC0oKHdpbi5oZWlnaHQgKiAobWFyZ2luIC8gMikpIC8gMTAwKTtcclxuXHRcdFx0dmlkLm1hcmdpbkxlZnQgPSAtKCh2aWQud2lkdGggLSB3aW4ud2lkdGgpIC8gMik7XHJcblx0XHR9XHJcblx0XHRwbGF5ZXJCb3guY3NzKHt3aWR0aDogdmlkLndpZHRoLCBoZWlnaHQ6IHZpZC5oZWlnaHQsIG1hcmdpblRvcDogdmlkLm1hcmdpblRvcCwgbWFyZ2luTGVmdDogdmlkLm1hcmdpbkxlZnR9KTtcclxuXHR9O1xyXG5cclxuXHRqUXVlcnkuc2h1ZmZsZSA9IGZ1bmN0aW9uKGFycikge1xyXG5cdFx0dmFyIG5ld0FycmF5ID0gYXJyLnNsaWNlKCk7XHJcblx0XHR2YXIgbGVuID0gbmV3QXJyYXkubGVuZ3RoO1xyXG5cdFx0dmFyIGkgPSBsZW47XHJcblx0XHR3aGlsZSAoaS0tKSB7XHJcblx0XHRcdHZhciBwID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSpsZW4pO1xyXG5cdFx0XHR2YXIgdCA9IG5ld0FycmF5W2ldO1xyXG5cdFx0XHRuZXdBcnJheVtpXSA9IG5ld0FycmF5W3BdO1xyXG5cdFx0XHRuZXdBcnJheVtwXSA9IHQ7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3QXJyYXk7XHJcblx0fTtcclxuXHJcblx0alF1ZXJ5LmZuLm1iX1lUUGxheWVyID0galF1ZXJ5Lm1iWVRQbGF5ZXIuYnVpbGRQbGF5ZXI7XHJcblx0alF1ZXJ5LmZuLllUUGxheWxpc3QgPSBqUXVlcnkubWJZVFBsYXllci5ZVFBsYXlsaXN0O1xyXG5cdGpRdWVyeS5mbi5wbGF5TmV4dCA9IGpRdWVyeS5tYllUUGxheWVyLnBsYXlOZXh0O1xyXG5cdGpRdWVyeS5mbi5jaGFuZ2VNb3ZpZSA9IGpRdWVyeS5tYllUUGxheWVyLmNoYW5nZU1vdmllO1xyXG5cdGpRdWVyeS5mbi5nZXRWaWRlb0lEID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0VmlkZW9JRDtcclxuXHRqUXVlcnkuZm4uZ2V0UGxheWVyID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0UGxheWVyO1xyXG5cdGpRdWVyeS5mbi5wbGF5ZXJEZXN0cm95ID0galF1ZXJ5Lm1iWVRQbGF5ZXIucGxheWVyRGVzdHJveTtcclxuXHRqUXVlcnkuZm4uZnVsbHNjcmVlbiA9IGpRdWVyeS5tYllUUGxheWVyLmZ1bGxzY3JlZW47XHJcblx0alF1ZXJ5LmZuLmJ1aWxkWVRQQ29udHJvbHMgPSBqUXVlcnkubWJZVFBsYXllci5idWlsZFlUUENvbnRyb2xzO1xyXG5cdGpRdWVyeS5mbi5wbGF5WVRQID0galF1ZXJ5Lm1iWVRQbGF5ZXIucGxheVlUUDtcclxuXHRqUXVlcnkuZm4udG9nZ2xlTG9vcHMgPSBqUXVlcnkubWJZVFBsYXllci50b2dnbGVMb29wcztcclxuXHRqUXVlcnkuZm4uc3RvcFlUUCA9IGpRdWVyeS5tYllUUGxheWVyLnN0b3BZVFA7XHJcblx0alF1ZXJ5LmZuLnBhdXNlWVRQID0galF1ZXJ5Lm1iWVRQbGF5ZXIucGF1c2VZVFA7XHJcblx0alF1ZXJ5LmZuLm11dGVZVFBWb2x1bWUgPSBqUXVlcnkubWJZVFBsYXllci5tdXRlWVRQVm9sdW1lO1xyXG5cdGpRdWVyeS5mbi51bm11dGVZVFBWb2x1bWUgPSBqUXVlcnkubWJZVFBsYXllci51bm11dGVZVFBWb2x1bWU7XHJcblx0alF1ZXJ5LmZuLnNldFlUUFZvbHVtZSA9IGpRdWVyeS5tYllUUGxheWVyLnNldFlUUFZvbHVtZTtcclxuXHRqUXVlcnkuZm4uc2V0VmlkZW9RdWFsaXR5ID0galF1ZXJ5Lm1iWVRQbGF5ZXIuc2V0VmlkZW9RdWFsaXR5O1xyXG5cdGpRdWVyeS5mbi5tYW5hZ2VZVFBQcm9ncmVzcyA9IGpRdWVyeS5tYllUUGxheWVyLm1hbmFnZVlUUFByb2dyZXNzO1xyXG5cclxufSkoalF1ZXJ5KTtcclxuIl0sImZpbGUiOiJtYi5ZVFBsYXllcjIuanMifQ==
