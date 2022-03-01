
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
		apiKey : '&key=AIzaSyA5Ey2sVWMSFe0RBwBZoV0aaz_kPdZ7bGA',
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYi5ZVFBsYXllcjMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblx0dmFyIG9uTW9iaWxlID0gZmFsc2U7XHJcblx0aWYoIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgKSB7IG9uTW9iaWxlID0gdHJ1ZTsgfVxyXG5cclxuXHRpZiggKCBvbk1vYmlsZSA9PT0gZmFsc2UgKSApIHtcclxuXHJcblx0XHRcdCQoXCIucGxheWVyXCIpLm1iX1lUUGxheWVyKCk7XHJcblxyXG5cdH0gZWxzZSB7XHJcblxyXG5cdFx0XHQvKiBhcyBhIGZhbGxiYWNrIHdlIGFkZCBhIHNwZWNpYWwgY2xhc3MgdG8gdGhlIGhlYWRlciB3aGljaCBkaXNwbGF5cyBhIHBvc3RlciBpbWFnZSAqL1xyXG5cdFx0XHQkKCcjaG9tZScpLmFkZENsYXNzKCd2aWRlby1zZWN0aW9uJyk7XHJcblxyXG5cdFx0XHQvKiBoaWRlIHBsYXllciAqL1xyXG5cdFx0XHQkKFwiLnBsYXllclwiKS5oaWRlKCk7XHJcblxyXG5cdFx0XHQkKFwiI3ZpZGVvLXZvbHVtZVwiKS5oaWRlKCk7XHJcblxyXG5cdFx0fVxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogIGpxdWVyeS5tYi5jb21wb25lbnRzXHJcbiAqICBmaWxlOiBqcXVlcnkubWIuWVRQbGF5ZXIuanNcclxuICpcclxuICogIENvcHlyaWdodCAoYykgMjAwMS0yMDEzLiBNYXR0ZW8gQmljb2NjaGkgKFB1cHVuemkpO1xyXG4gKiAgT3BlbiBsYWIgc3JsLCBGaXJlbnplIC0gSXRhbHlcclxuICogIGVtYWlsOiBtYXR0ZW9Ab3Blbi1sYWIuY29tXHJcbiAqICBzaXRlOiBcdGh0dHA6Ly9wdXB1bnppLmNvbVxyXG4gKiAgYmxvZzpcdGh0dHA6Ly9wdXB1bnppLm9wZW4tbGFiLmNvbVxyXG4gKiBcdGh0dHA6Ly9vcGVuLWxhYi5jb21cclxuICpcclxuICogIExpY2VuY2VzOiBNSVQsIEdQTFxyXG4gKiAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuICogIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwuaHRtbFxyXG4gKlxyXG4gKiAgbGFzdCBtb2RpZmllZDogMzAvMDgvMTMgMjMuMzFcclxuICogICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqL1xyXG5cclxuLypCcm93c2VyIGRldGVjdGlvbiBwYXRjaCovXHJcbihmdW5jdGlvbigpe2lmKCEoOD5qUXVlcnkuZm4uanF1ZXJ5LnNwbGl0KFwiLlwiKVsxXSkpe2pRdWVyeS5icm93c2VyPXt9O2pRdWVyeS5icm93c2VyLm1vemlsbGE9ITE7alF1ZXJ5LmJyb3dzZXIud2Via2l0PSExO2pRdWVyeS5icm93c2VyLm9wZXJhPSExO2pRdWVyeS5icm93c2VyLm1zaWU9ITE7dmFyIGE9bmF2aWdhdG9yLnVzZXJBZ2VudDtqUXVlcnkuYnJvd3Nlci5uYW1lPW5hdmlnYXRvci5hcHBOYW1lO2pRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPVwiXCIrcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7alF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9uPXBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLDEwKTt2YXIgYyxiO2lmKC0xIT0oYj1hLmluZGV4T2YoXCJPcGVyYVwiKSkpe2lmKGpRdWVyeS5icm93c2VyLm9wZXJhPSEwLGpRdWVyeS5icm93c2VyLm5hbWU9XCJPcGVyYVwiLGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrNiksLTEhPShiPSBhLmluZGV4T2YoXCJWZXJzaW9uXCIpKSlqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1hLnN1YnN0cmluZyhiKzgpfWVsc2UgaWYoLTEhPShiPWEuaW5kZXhPZihcIk1TSUVcIikpKWpRdWVyeS5icm93c2VyLm1zaWU9ITAsalF1ZXJ5LmJyb3dzZXIubmFtZT1cIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiLGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrNSk7ZWxzZSBpZigtMSE9KGI9YS5pbmRleE9mKFwiQ2hyb21lXCIpKSlqUXVlcnkuYnJvd3Nlci53ZWJraXQ9ITAsalF1ZXJ5LmJyb3dzZXIubmFtZT1cIkNocm9tZVwiLGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrNyk7ZWxzZSBpZigtMSE9KGI9YS5pbmRleE9mKFwiU2FmYXJpXCIpKSl7aWYoalF1ZXJ5LmJyb3dzZXIud2Via2l0PSEwLGpRdWVyeS5icm93c2VyLm5hbWU9XCJTYWZhcmlcIixqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1hLnN1YnN0cmluZyhiKzcpLC0xIT0oYj1hLmluZGV4T2YoXCJWZXJzaW9uXCIpKSlqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj0gYS5zdWJzdHJpbmcoYis4KX1lbHNlIGlmKC0xIT0oYj1hLmluZGV4T2YoXCJGaXJlZm94XCIpKSlqUXVlcnkuYnJvd3Nlci5tb3ppbGxhPSEwLGpRdWVyeS5icm93c2VyLm5hbWU9XCJGaXJlZm94XCIsalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249YS5zdWJzdHJpbmcoYis4KTtlbHNlIGlmKChjPWEubGFzdEluZGV4T2YoXCIgXCIpKzEpPChiPWEubGFzdEluZGV4T2YoXCIvXCIpKSlqUXVlcnkuYnJvd3Nlci5uYW1lPWEuc3Vic3RyaW5nKGMsYiksalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249YS5zdWJzdHJpbmcoYisxKSxqUXVlcnkuYnJvd3Nlci5uYW1lLnRvTG93ZXJDYXNlKCk9PWpRdWVyeS5icm93c2VyLm5hbWUudG9VcHBlckNhc2UoKSYmKGpRdWVyeS5icm93c2VyLm5hbWU9bmF2aWdhdG9yLmFwcE5hbWUpO2lmKC0xIT0oYT1qUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbi5pbmRleE9mKFwiO1wiKSkpalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249alF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb24uc3Vic3RyaW5nKDAsIGEpO2lmKC0xIT0oYT1qUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbi5pbmRleE9mKFwiIFwiKSkpalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249alF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb24uc3Vic3RyaW5nKDAsYSk7alF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9uPXBhcnNlSW50KFwiXCIralF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb24sMTApO2lzTmFOKGpRdWVyeS5icm93c2VyLm1ham9yVmVyc2lvbikmJihqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1cIlwiK3BhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pLGpRdWVyeS5icm93c2VyLm1ham9yVmVyc2lvbj1wYXJzZUludChuYXZpZ2F0b3IuYXBwVmVyc2lvbiwxMCkpO2pRdWVyeS5icm93c2VyLnZlcnNpb249alF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9ufX0pKGpRdWVyeSk7XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBqUXVlcnkubWIuY29tcG9uZW50czoganF1ZXJ5Lm1iLkNTU0FuaW1hdGVcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmpRdWVyeS5mbi5DU1NBbmltYXRlPWZ1bmN0aW9uKGEsYixrLGwsZil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBjPWpRdWVyeSh0aGlzKTtpZigwIT09Yy5sZW5ndGgmJmEpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGImJihmPWIsYj1qUXVlcnkuZnguc3BlZWRzLl9kZWZhdWx0KTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBrJiYoZj1rLGs9MCk7XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmKGY9bCxsPVwiY3ViaWMtYmV6aWVyKDAuNjUsMC4wMywwLjM2LDAuNzIpXCIpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiKWZvcih2YXIgaiBpbiBqUXVlcnkuZnguc3BlZWRzKWlmKGI9PWope2I9alF1ZXJ5LmZ4LnNwZWVkc1tqXTticmVha31lbHNlIGI9bnVsbDtpZihqUXVlcnkuc3VwcG9ydC50cmFuc2l0aW9uKXt2YXIgZT1cIlwiLGg9XCJ0cmFuc2l0aW9uRW5kXCI7alF1ZXJ5LmJyb3dzZXIud2Via2l0PyhlPVwiLXdlYmtpdC1cIixoPVwid2Via2l0VHJhbnNpdGlvbkVuZFwiKTpqUXVlcnkuYnJvd3Nlci5tb3ppbGxhPyAoZT1cIi1tb3otXCIsaD1cInRyYW5zaXRpb25lbmRcIik6alF1ZXJ5LmJyb3dzZXIub3BlcmE/KGU9XCItby1cIixoPVwib3RyYW5zaXRpb25lbmRcIik6alF1ZXJ5LmJyb3dzZXIubXNpZSYmKGU9XCItbXMtXCIsaD1cIm1zVHJhbnNpdGlvbkVuZFwiKTtqPVtdO2ZvcihkIGluIGEpe3ZhciBnPWQ7XCJ0cmFuc2Zvcm1cIj09PWcmJihnPWUrXCJ0cmFuc2Zvcm1cIixhW2ddPWFbZF0sZGVsZXRlIGFbZF0pO1widHJhbnNmb3JtLW9yaWdpblwiPT09ZyYmKGc9ZStcInRyYW5zZm9ybS1vcmlnaW5cIixhW2ddPWFbZF0sZGVsZXRlIGFbZF0pO2oucHVzaChnKTtjLmNzcyhnKXx8Yy5jc3MoZywwKX1kPWouam9pbihcIixcIik7Yy5jc3MoZStcInRyYW5zaXRpb24tcHJvcGVydHlcIixkKTtjLmNzcyhlK1widHJhbnNpdGlvbi1kdXJhdGlvblwiLGIrXCJtc1wiKTtjLmNzcyhlK1widHJhbnNpdGlvbi1kZWxheVwiLGsrXCJtc1wiKTtjLmNzcyhlK1widHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25cIixsKTtjLmNzcyhlK1wiYmFja2ZhY2UtdmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Yy5jc3MoYSl9LDApO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtjLmNhbGxlZHx8IWY/Yy5jYWxsZWQ9ITE6ZigpfSxiKzIwKTtjLm9uKGgsZnVuY3Rpb24oYSl7Yy5vZmYoaCk7Yy5jc3MoZStcInRyYW5zaXRpb25cIixcIlwiKTthLnN0b3BQcm9wYWdhdGlvbigpO1wiZnVuY3Rpb25cIj09dHlwZW9mIGYmJihjLmNhbGxlZD0hMCxmKCkpO3JldHVybiExfSl9ZWxzZXtmb3IodmFyIGQgaW4gYSlcInRyYW5zZm9ybVwiPT09ZCYmZGVsZXRlIGFbZF0sXCJ0cmFuc2Zvcm0tb3JpZ2luXCI9PT1kJiZkZWxldGUgYVtkXSxcImF1dG9cIj09PWFbZF0mJmRlbGV0ZSBhW2RdO2lmKCFmfHxcInN0cmluZ1wiPT09dHlwZW9mIGYpZj1cImxpbmVhclwiO2MuYW5pbWF0ZShhLGIsZil9fX0pfTsgalF1ZXJ5LmZuLkNTU0FuaW1hdGVTdG9wPWZ1bmN0aW9uKCl7dmFyIGE9XCJcIixiPVwidHJhbnNpdGlvbkVuZFwiO2pRdWVyeS5icm93c2VyLndlYmtpdD8oYT1cIi13ZWJraXQtXCIsYj1cIndlYmtpdFRyYW5zaXRpb25FbmRcIik6alF1ZXJ5LmJyb3dzZXIubW96aWxsYT8oYT1cIi1tb3otXCIsYj1cInRyYW5zaXRpb25lbmRcIik6alF1ZXJ5LmJyb3dzZXIub3BlcmE/KGE9XCItby1cIixiPVwib3RyYW5zaXRpb25lbmRcIik6alF1ZXJ5LmJyb3dzZXIubXNpZSYmKGE9XCItbXMtXCIsYj1cIm1zVHJhbnNpdGlvbkVuZFwiKTtqUXVlcnkodGhpcykuY3NzKGErXCJ0cmFuc2l0aW9uXCIsXCJcIik7alF1ZXJ5KHRoaXMpLm9mZihiKX07IGpRdWVyeS5zdXBwb3J0LnRyYW5zaXRpb249ZnVuY3Rpb24oKXt2YXIgYT0oZG9jdW1lbnQuYm9keXx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5zdHlsZTtyZXR1cm4gdm9pZCAwIT09YS50cmFuc2l0aW9ufHx2b2lkIDAhPT1hLldlYmtpdFRyYW5zaXRpb258fHZvaWQgMCE9PWEuTW96VHJhbnNpdGlvbnx8dm9pZCAwIT09YS5Nc1RyYW5zaXRpb258fHZvaWQgMCE9PWEuT1RyYW5zaXRpb259KCk7XHJcblxyXG4vKlxyXG4gKiBNZXRhZGF0YSAtIGpRdWVyeSBwbHVnaW4gZm9yIHBhcnNpbmcgbWV0YWRhdGEgZnJvbSBlbGVtZW50c1xyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMDYgSm9obiBSZXNpZywgWWVodWRhIEthdHosIErDtnJuIFphZWZmZXJlciwgUGF1bCBNY0xhbmFoYW5cclxuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgbGljZW5zZXM6XHJcbiAqICAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuICogICBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLmh0bWxcclxuICovXHJcblxyXG4oZnVuY3Rpb24oYyl7Yy5leHRlbmQoe21ldGFkYXRhOntkZWZhdWx0czp7dHlwZTpcImNsYXNzXCIsbmFtZTpcIm1ldGFkYXRhXCIsY3JlOi8oey4qfSkvLHNpbmdsZTpcIm1ldGFkYXRhXCJ9LHNldFR5cGU6ZnVuY3Rpb24oYixjKXt0aGlzLmRlZmF1bHRzLnR5cGU9Yjt0aGlzLmRlZmF1bHRzLm5hbWU9Y30sZ2V0OmZ1bmN0aW9uKGIsZil7dmFyIGQ9Yy5leHRlbmQoe30sdGhpcy5kZWZhdWx0cyxmKTtkLnNpbmdsZS5sZW5ndGh8fChkLnNpbmdsZT1cIm1ldGFkYXRhXCIpO3ZhciBhPWMuZGF0YShiLGQuc2luZ2xlKTtpZihhKXJldHVybiBhO2E9XCJ7fVwiO2lmKFwiY2xhc3NcIj09ZC50eXBlKXt2YXIgZT1kLmNyZS5leGVjKGIuY2xhc3NOYW1lKTtlJiYoYT1lWzFdKX1lbHNlIGlmKFwiZWxlbVwiPT1kLnR5cGUpe2lmKCFiLmdldEVsZW1lbnRzQnlUYWdOYW1lKXJldHVybjtlPWIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZC5uYW1lKTtlLmxlbmd0aCYmKGE9Yy50cmltKGVbMF0uaW5uZXJIVE1MKSl9ZWxzZSB2b2lkIDAhPSBiLmdldEF0dHJpYnV0ZSYmKGU9Yi5nZXRBdHRyaWJ1dGUoZC5uYW1lKSkmJihhPWUpOzA+YS5pbmRleE9mKFwie1wiKSYmKGE9XCJ7XCIrYStcIn1cIik7YT1ldmFsKFwiKFwiK2ErXCIpXCIpO2MuZGF0YShiLGQuc2luZ2xlLGEpO3JldHVybiBhfX19KTtjLmZuLm1ldGFkYXRhPWZ1bmN0aW9uKGIpe3JldHVybiBjLm1ldGFkYXRhLmdldCh0aGlzWzBdLGIpfX0pKGpRdWVyeSk7XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5pZih0eXBlb2YgeXRwICE9IFwib2JqZWN0XCIpXHJcblx0eXRwID17fTtcclxuXHJcblN0cmluZy5wcm90b3R5cGUuZ2V0VmlkZW9JRD1mdW5jdGlvbigpe1xyXG5cdHZhciBtb3ZpZVVSTDtcclxuXHRpZih0aGlzLnN1YnN0cigwLDE2KT09XCJodHRwczovL3lvdXR1LmJlL1wiKXtcclxuXHRcdG1vdmllVVJMPSB0aGlzLnJlcGxhY2UoXCJodHRwczovL3lvdXR1LmJlL1wiLFwiXCIpO1xyXG5cdH1lbHNlIGlmKHRoaXMuaW5kZXhPZihcImh0dHBzXCIpPi0xKXtcclxuXHRcdG1vdmllVVJMID0gdGhpcy5tYXRjaCgvW1xcXFw/Jl12PShbXiYjXSopLylbMV07XHJcblx0fWVsc2V7XHJcblx0XHRtb3ZpZVVSTCA9IHRoaXNcclxuXHR9XHJcblx0cmV0dXJuIG1vdmllVVJMO1xyXG59O1xyXG5cclxudmFyIGlzRGV2aWNlID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93O1xyXG5cclxuZnVuY3Rpb24gb25Zb3VUdWJlUGxheWVyQVBJUmVhZHkoKSB7XHJcblx0aWYoeXRwLllUQVBJUmVhZHkpXHJcblx0XHRyZXR1cm47XHJcblxyXG5cdHl0cC5ZVEFQSVJlYWR5PXRydWU7XHJcblx0alF1ZXJ5KGRvY3VtZW50KS50cmlnZ2VyKFwiWVRBUElSZWFkeVwiKTtcclxufVxyXG5cclxuKGZ1bmN0aW9uIChqUXVlcnkpIHtcclxuXHJcblx0alF1ZXJ5Lm1iWVRQbGF5ZXIgPSB7XHJcblx0XHRuYW1lICAgICAgICAgICA6IFwianF1ZXJ5Lm1iLllUUGxheWVyXCIsXHJcblx0XHR2ZXJzaW9uICAgICAgICA6IFwiMi41LjdcIixcclxuXHRcdGF1dGhvciAgICAgICAgIDogXCJhdU1hcmluZVwiLFxyXG5cdFx0YXBpS2V5IDogJyZrZXk9QUl6YVN5QTVFeTJzVldNU0ZlMFJCd0Jab1YwYWF6X2tQZFo3YkdBJyxcclxuXHRcdGRlZmF1bHRzICAgICAgIDoge1xyXG5cdFx0XHRjb250YWlubWVudCAgICAgICAgICAgIDogXCJib2R5XCIsXHJcblx0XHRcdHJhdGlvICAgICAgICAgICAgICAgICAgOiBcIjE2LzlcIixcclxuXHRcdFx0c2hvd1lUTG9nbyAgICAgICAgICAgICA6IGZhbHNlLFxyXG5cdFx0XHR2aWRlb1VSTCAgICAgICAgICAgICAgIDogbnVsbCxcclxuXHRcdFx0c3RhcnRBdCAgICAgICAgICAgICAgICA6IDAsXHJcblx0XHRcdGF1dG9QbGF5ICAgICAgICAgICAgICAgOiB0cnVlLFxyXG5cdFx0XHR2b2wgICAgICAgICAgICAgICAgICAgIDoxMCxcclxuXHRcdFx0YWRkUmFzdGVyICAgICAgICAgICAgICA6IGZhbHNlLFxyXG5cdFx0XHRvcGFjaXR5ICAgICAgICAgICAgICAgIDogMSxcclxuXHRcdFx0cXVhbGl0eSAgICAgICAgICAgICAgICA6IFwiZGVmYXVsdFwiLCAvL29yIFwic21hbGxcIiwgXCJtZWRpdW1cIiwgXCJsYXJnZVwiLCBcImhkNzIwXCIsIFwiaGQxMDgwXCIsIFwiaGlnaHJlc1wiXHJcblx0XHRcdG11dGUgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcclxuXHRcdFx0bG9vcCAgICAgICAgICAgICAgICAgICA6IHRydWUsXHJcblx0XHRcdHNob3dDb250cm9scyAgICAgICAgICAgOiB0cnVlLFxyXG5cdFx0XHRzaG93QW5ub3RhdGlvbnMgICAgICAgIDogZmFsc2UsXHJcblx0XHRcdHByaW50VXJsICAgICAgICAgICAgICAgOiB0cnVlLFxyXG5cdFx0XHRzdG9wTW92aWVPbkNsaWNrICAgICAgIDpmYWxzZSxcclxuXHRcdFx0cmVhbGZ1bGxzY3JlZW4gICAgICAgICA6dHJ1ZSxcclxuXHRcdFx0b25SZWFkeSAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uIChwbGF5ZXIpIHt9LFxyXG5cdFx0XHRvblN0YXRlQ2hhbmdlICAgICAgICAgIDogZnVuY3Rpb24gKHBsYXllcikge30sXHJcblx0XHRcdG9uUGxheWJhY2tRdWFsaXR5Q2hhbmdlOiBmdW5jdGlvbiAocGxheWVyKSB7fSxcclxuXHRcdFx0b25FcnJvciAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uIChwbGF5ZXIpIHt9XHJcblx0XHR9LFxyXG5cdFx0Ly90b2RvOiB1c2UgQGZvbnQtZmFjZSBpbnN0ZWFkXHJcblx0XHRjb250cm9scyAgICAgICA6IHtcclxuXHRcdFx0cGxheSAgOiBcIlBcIixcclxuXHRcdFx0cGF1c2UgOiBcInBcIixcclxuXHRcdFx0bXV0ZSAgOiBcIk1cIixcclxuXHRcdFx0dW5tdXRlOiBcIkFcIixcclxuXHRcdFx0b25seVlUOiBcIk9cIixcclxuXHRcdFx0c2hvd1NpdGU6IFwiUlwiLFxyXG5cdFx0XHR5dExvZ286IFwiWVwiXHJcblx0XHR9LFxyXG5cdFx0cmFzdGVySW1nICAgICAgOiBcImltYWdlcy9yYXN0ZXIucG5nXCIsXHJcblx0XHRyYXN0ZXJJbWdSZXRpbmE6IFwiaW1hZ2VzL3Jhc3RlckAyeC5wbmdcIixcclxuXHJcblx0XHRidWlsZFBsYXllcjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBZVFBsYXllciA9IHRoaXM7XHJcblx0XHRcdFx0dmFyICRZVFBsYXllciA9IGpRdWVyeShZVFBsYXllcik7XHJcblxyXG5cdFx0XHRcdFlUUGxheWVyLmxvb3AgPSAwO1xyXG5cdFx0XHRcdFlUUGxheWVyLm9wdCA9IHt9O1xyXG5cdFx0XHRcdHZhciBwcm9wZXJ0eSA9IHt9O1xyXG5cclxuXHRcdFx0XHQkWVRQbGF5ZXIuYWRkQ2xhc3MoXCJtYl9ZVFZQbGF5ZXJcIik7XHJcblxyXG5cdFx0XHRcdGlmIChqUXVlcnkubWV0YWRhdGEpIHtcclxuXHRcdFx0XHRcdGpRdWVyeS5tZXRhZGF0YS5zZXRUeXBlKFwiY2xhc3NcIik7XHJcblx0XHRcdFx0XHRwcm9wZXJ0eSA9ICRZVFBsYXllci5tZXRhZGF0YSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGpRdWVyeS5pc0VtcHR5T2JqZWN0KHByb3BlcnR5KSlcclxuXHRcdFx0XHRcdHByb3BlcnR5ID0gJFlUUGxheWVyLmRhdGEoXCJwcm9wZXJ0eVwiKSAmJiB0eXBlb2YgJFlUUGxheWVyLmRhdGEoXCJwcm9wZXJ0eVwiKSA9PSBcInN0cmluZ1wiID8gZXZhbCgnKCcgKyAkWVRQbGF5ZXIuZGF0YShcInByb3BlcnR5XCIpICsgJyknKSA6ICRZVFBsYXllci5kYXRhKFwicHJvcGVydHlcIik7XHJcblxyXG5cdFx0XHRcdGpRdWVyeS5leHRlbmQoWVRQbGF5ZXIub3B0LCBqUXVlcnkubWJZVFBsYXllci5kZWZhdWx0cywgb3B0aW9ucywgcHJvcGVydHkpO1xyXG5cclxuXHRcdFx0XHR2YXIgY2FuR29GdWxsc2NyZWVuID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0aWYoIWNhbkdvRnVsbHNjcmVlbilcclxuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC5yZWFsZnVsbHNjcmVlbiA9IHQ7XHJcblxyXG5cdFx0XHRcdGlmICghJFlUUGxheWVyLmF0dHIoXCJpZFwiKSlcclxuXHRcdFx0XHRcdCRZVFBsYXllci5hdHRyKFwiaWRcIiwgXCJpZF9cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuXHJcblx0XHRcdFx0WVRQbGF5ZXIub3B0LmlkID0gWVRQbGF5ZXIuaWQ7XHJcblx0XHRcdFx0WVRQbGF5ZXIuaXNBbG9uZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvKnRvIG1haW50YWluIGJhY2sgY29tcGF0aWJpbGl0eVxyXG5cdFx0XHRcdCAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cdFx0XHRcdGlmIChZVFBsYXllci5vcHQuaXNCZ25kTW92aWUpXHJcblx0XHRcdFx0XHRZVFBsYXllci5vcHQuY29udGFpbm1lbnQgPSBcImJvZHlcIjtcclxuXHJcblx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5pc0JnbmRNb3ZpZSAmJiBZVFBsYXllci5vcHQuaXNCZ25kTW92aWUubXV0ZSAhPSB1bmRlZmluZWQpXHJcblx0XHRcdFx0XHRZVFBsYXllci5vcHQubXV0ZSA9IFlUUGxheWVyLm9wdC5pc0JnbmRNb3ZpZS5tdXRlO1xyXG5cclxuXHRcdFx0XHRpZiAoIVlUUGxheWVyLm9wdC52aWRlb1VSTClcclxuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC52aWRlb1VSTCA9ICRZVFBsYXllci5hdHRyKFwiaHJlZlwiKTtcclxuXHJcblx0XHRcdFx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblx0XHRcdFx0dmFyIHBsYXllcklEID0gXCJtYllUUF9cIiArIFlUUGxheWVyLmlkO1xyXG5cdFx0XHRcdHZhciB2aWRlb0lEID0gdGhpcy5vcHQudmlkZW9VUkwgPyB0aGlzLm9wdC52aWRlb1VSTC5nZXRWaWRlb0lEKCkgOiAkWVRQbGF5ZXIuYXR0cihcImhyZWZcIikgPyAkWVRQbGF5ZXIuYXR0cihcImhyZWZcIikuZ2V0VmlkZW9JRCgpIDogZmFsc2U7XHJcblx0XHRcdFx0WVRQbGF5ZXIudmlkZW9JRCA9IHZpZGVvSUQ7XHJcblxyXG5cclxuXHRcdFx0XHRZVFBsYXllci5vcHQuc2hvd0Fubm90YXRpb25zID0gKFlUUGxheWVyLm9wdC5zaG93QW5ub3RhdGlvbnMpID8gJzAnIDogJzMnO1xyXG5cdFx0XHRcdHZhciBwbGF5ZXJWYXJzID0geyAnYXV0b3BsYXknOiAwLCAnbW9kZXN0YnJhbmRpbmcnOiAxLCAnY29udHJvbHMnOiAwLCAnc2hvd2luZm8nOiAwLCAncmVsJzogMCwgJ2VuYWJsZWpzYXBpJzogMSwgJ3ZlcnNpb24nOiAzLCAncGxheWVyYXBpaWQnOiBwbGF5ZXJJRCwgJ29yaWdpbic6ICcqJywgJ2FsbG93ZnVsbHNjcmVlbic6IHRydWUsICd3bW9kZSc6IFwidHJhbnNwYXJlbnRcIiwgJ2l2X2xvYWRfcG9saWN5JzogWVRQbGF5ZXIub3B0LnNob3dBbm5vdGF0aW9uc307XHJcblxyXG5cdFx0XHRcdHZhciBjYW5QbGF5SFRNTDUgPSBmYWxzZTtcclxuXHRcdFx0XHR2YXIgdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcblx0XHRcdFx0aWYgKHYuY2FuUGxheVR5cGUgKSB7IC8vICYmICFqUXVlcnkuYnJvd3Nlci5tc2llXHJcblx0XHRcdFx0XHRjYW5QbGF5SFRNTDUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGNhblBsYXlIVE1MNSkgLy8gICYmICEoWVRQbGF5ZXIuaXNQbGF5TGlzdCAmJiBqUXVlcnkuYnJvd3Nlci5tc2llKVxyXG5cdFx0XHRcdFx0alF1ZXJ5LmV4dGVuZChwbGF5ZXJWYXJzLCB7J2h0bWw1JzogMX0pO1xyXG5cclxuXHRcdFx0XHRpZihqUXVlcnkuYnJvd3Nlci5tc2llICYmIGpRdWVyeS5icm93c2VyLnZlcnNpb24gPCA5ICl7XHJcblx0XHRcdFx0XHR0aGlzLm9wdC5vcGFjaXR5ID0gMTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBwbGF5ZXJCb3ggPSBqUXVlcnkoXCI8ZGl2Lz5cIikuYXR0cihcImlkXCIsIHBsYXllcklEKS5hZGRDbGFzcyhcInBsYXllckJveFwiKTtcclxuXHRcdFx0XHR2YXIgb3ZlcmxheSA9IGpRdWVyeShcIjxkaXYvPlwiKS5jc3Moe3Bvc2l0aW9uOiBcImFic29sdXRlXCIsIHRvcDogMCwgbGVmdDogMCwgd2lkdGg6IFwiMTAwJVwiLCBoZWlnaHQ6IFwiMTAwJVwifSkuYWRkQ2xhc3MoXCJZVFBPdmVybGF5XCIpOyAvL1lUUGxheWVyLmlzQmFja2dyb3VuZCA/IFwiZml4ZWRcIiA6XHJcblxyXG5cdFx0XHRcdFlUUGxheWVyLm9wdC5jb250YWlubWVudCA9IFlUUGxheWVyLm9wdC5jb250YWlubWVudCA9PSBcInNlbGZcIiA/IGpRdWVyeSh0aGlzKSA6IGpRdWVyeShZVFBsYXllci5vcHQuY29udGFpbm1lbnQpO1xyXG5cclxuXHRcdFx0XHRZVFBsYXllci5pc0JhY2tncm91bmQgPSBZVFBsYXllci5vcHQuY29udGFpbm1lbnQuZ2V0KDApLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSBcImJvZHlcIjtcclxuXHJcblx0XHRcdFx0aWYgKGlzRGV2aWNlICYmIFlUUGxheWVyLmlzQmFja2dyb3VuZCl7XHJcblx0XHRcdFx0XHQkWVRQbGF5ZXIuaGlkZSgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5hZGRSYXN0ZXIpIHtcclxuXHRcdFx0XHRcdHZhciByZXRpbmEgPSAod2luZG93LnJldGluYSB8fCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEpO1xyXG5cdFx0XHRcdFx0b3ZlcmxheS5hZGRDbGFzcyhyZXRpbmEgPyBcInJhc3RlciByZXRpbmFcIiA6IFwicmFzdGVyXCIpO1xyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0b3ZlcmxheS5yZW1vdmVDbGFzcyhcInJhc3RlciByZXRpbmFcIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR2YXIgd3JhcHBlciA9IGpRdWVyeShcIjxkaXYvPlwiKS5hZGRDbGFzcyhcIm1iWVRQX3dyYXBwZXJcIikuYXR0cihcImlkXCIsIFwid3JhcHBlcl9cIiArIHBsYXllcklEKTtcclxuXHRcdFx0XHR3cmFwcGVyLmNzcyh7cG9zaXRpb246IFwiYWJzb2x1dGVcIiwgekluZGV4OiAwLCBtaW5XaWR0aDogXCIxMDAlXCIsIG1pbkhlaWdodDogXCIxMDAlXCIsbGVmdDowLCB0b3A6MCwgb3ZlcmZsb3c6IFwiaGlkZGVuXCIsIG9wYWNpdHk6IDB9KTtcclxuXHRcdFx0XHRwbGF5ZXJCb3guY3NzKHtwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB6SW5kZXg6IDAsIHdpZHRoOiBcIjEwMCVcIiwgaGVpZ2h0OiBcIjEwMCVcIiwgdG9wOiAwLCBsZWZ0OiAwLCBvdmVyZmxvdzogXCJoaWRkZW5cIiwgb3BhY2l0eTogdGhpcy5vcHQub3BhY2l0eX0pO1xyXG5cdFx0XHRcdHdyYXBwZXIuYXBwZW5kKHBsYXllckJveCk7XHJcblxyXG5cdFx0XHRcdGlmIChZVFBsYXllci5pc0JhY2tncm91bmQgJiYgeXRwLmlzSW5pdClcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0WVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50LmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRpZiAoalF1ZXJ5KHRoaXMpLmNzcyhcInBvc2l0aW9uXCIpID09IFwic3RhdGljXCIpXHJcblx0XHRcdFx0XHRcdGpRdWVyeSh0aGlzKS5jc3MoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRpZiAoWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKSB7XHJcblx0XHRcdFx0XHRqUXVlcnkoXCJib2R5XCIpLmNzcyh7cG9zaXRpb246IFwicmVsYXRpdmVcIiwgbWluV2lkdGg6IFwiMTAwJVwiLCBtaW5IZWlnaHQ6IFwiMTAwJVwiLCB6SW5kZXg6IDEsIGJveFNpemluZzogXCJib3JkZXItYm94XCJ9KTtcclxuXHRcdFx0XHRcdHdyYXBwZXIuY3NzKHtwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB0b3A6IDAsIGxlZnQ6IDAsIHpJbmRleDogMH0pO1xyXG5cdFx0XHRcdFx0JFlUUGxheWVyLmhpZGUoKTtcclxuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC5jb250YWlubWVudC5wcmVwZW5kKHdyYXBwZXIpO1xyXG5cdFx0XHRcdH0gZWxzZVxyXG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50LnByZXBlbmQod3JhcHBlcik7XHJcblxyXG5cdFx0XHRcdFlUUGxheWVyLndyYXBwZXIgPSB3cmFwcGVyO1xyXG5cclxuXHRcdFx0XHRwbGF5ZXJCb3guY3NzKHtvcGFjaXR5OiAxfSk7XHJcblxyXG5cdFx0XHRcdGlmICghaXNEZXZpY2Upe1xyXG5cdFx0XHRcdFx0cGxheWVyQm94LmFmdGVyKG92ZXJsYXkpO1xyXG5cdFx0XHRcdFx0WVRQbGF5ZXIub3ZlcmxheSA9IG92ZXJsYXk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdFx0aWYoIVlUUGxheWVyLmlzQmFja2dyb3VuZCl7XHJcblx0XHRcdFx0XHRvdmVybGF5Lm9uKFwibW91c2VlbnRlclwiLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdCRZVFBsYXllci5maW5kKFwiLm1iX1lUVlBCYXJcIikuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG5cdFx0XHRcdFx0fSkub24oXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5maW5kKFwiLm1iX1lUVlBCYXJcIikucmVtb3ZlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgWVQgQVBJIHRvIHRoZSBoZWFkZXJcclxuXHRcdFx0XHQvL2pRdWVyeShcIiNZVEFQSVwiKS5yZW1vdmUoKTtcclxuXHJcblx0XHRcdFx0aWYoIXl0cC5ZVEFQSVJlYWR5KXtcclxuXHRcdFx0XHRcdHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRcdFx0XHRcdHRhZy5zcmMgPSBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3BsYXllcl9hcGlcIjtcclxuXHRcdFx0XHRcdHRhZy5pZCA9IFwiWVRBUElcIjtcclxuXHRcdFx0XHRcdHZhciBmaXJzdFNjcmlwdFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcclxuXHRcdFx0XHRcdGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRqUXVlcnkoZG9jdW1lbnQpLnRyaWdnZXIoXCJZVEFQSVJlYWR5XCIpO1xyXG5cdFx0XHRcdFx0fSwgMjAwKVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0alF1ZXJ5KGRvY3VtZW50KS5vbihcIllUQVBJUmVhZHlcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0XHRcdGlmICgoWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kICYmIHl0cC5pc0luaXQpIHx8IFlUUGxheWVyLm9wdC5pc0luaXQpXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRpZihZVFBsYXllci5pc0JhY2tncm91bmQgJiYgWVRQbGF5ZXIub3B0LnN0b3BNb3ZpZU9uQ2xpY2spXHJcblx0XHRcdFx0XHRcdGpRdWVyeShkb2N1bWVudCkub2ZmKFwibW91c2Vkb3duLnl0cGxheWVyXCIpLm9uKFwibW91c2Vkb3duLC55dHBsYXllclwiLGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0XHRcdHZhciB0YXJnZXQgPSBqUXVlcnkoZS50YXJnZXQpO1xyXG5cdFx0XHRcdFx0XHRcdGlmKHRhcmdldC5pcyhcImFcIikgfHwgdGFyZ2V0LnBhcmVudHMoKS5pcyhcImFcIikpe1xyXG5cdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLnBhdXNlWVRQKCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKVxyXG5cdFx0XHRcdFx0XHR5dHAuaXNJbml0ID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHRZVFBsYXllci5vcHQuaXNJbml0ID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHRZVFBsYXllci5vcHQudm9sID0gWVRQbGF5ZXIub3B0LnZvbCA/IFlUUGxheWVyLm9wdC52b2wgOiAxMDA7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0RGF0YUZyb21GZWVkKFlUUGxheWVyLnZpZGVvSUQsIFlUUGxheWVyKTtcclxuXHJcblx0XHRcdFx0XHRqUXVlcnkoZG9jdW1lbnQpLm9uKFwiZ2V0VmlkZW9JbmZvX1wiICsgWVRQbGF5ZXIub3B0LmlkLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRpZihpc0RldmljZSAmJiAhWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKXtcclxuXHRcdFx0XHRcdFx0XHRuZXcgWVQuUGxheWVyKHBsYXllcklELCB7XHJcblx0XHRcdFx0XHRcdFx0XHRoZWlnaHQ6ICcxMDAlJyxcclxuXHRcdFx0XHRcdFx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHRcdFx0XHRcdFx0XHR2aWRlb0lkOiBZVFBsYXllci52aWRlb0lELFxyXG5cdFx0XHRcdFx0XHRcdFx0ZXZlbnRzOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdCdvblJlYWR5JzogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIub3B0aW1pemVEaXNwbGF5KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGxheWVyQm94LmNzcyh7b3BhY2l0eTogMX0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLndyYXBwZXIuY3NzKHtvcGFjaXR5OiAxfSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLm9wdGltaXplRGlzcGxheSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQnb25TdGF0ZUNoYW5nZSc6IGZ1bmN0aW9uKCl7fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0bmV3IFlULlBsYXllcihwbGF5ZXJJRCwge1xyXG5cdFx0XHRcdFx0XHRcdHZpZGVvSWQgICA6IFlUUGxheWVyLnZpZGVvSUQudG9TdHJpbmcoKSxcclxuXHRcdFx0XHRcdFx0XHRwbGF5ZXJWYXJzOiBwbGF5ZXJWYXJzLFxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50cyAgICA6IHtcclxuXHRcdFx0XHRcdFx0XHRcdCdvblJlYWR5JzogZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIgPSBldmVudC50YXJnZXQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZihZVFBsYXllci5pc1JlYWR5KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLmlzUmVhZHkgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyRWwgPSBZVFBsYXllci5wbGF5ZXIuZ2V0SWZyYW1lKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5vcHRpbWl6ZURpc3BsYXkoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnZpZGVvSUQgPSB2aWRlb0lEO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KHdpbmRvdykub24oXCJyZXNpemUuWVRQXCIsZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5vcHRpbWl6ZURpc3BsYXkoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LnNob3dDb250cm9scylcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLmJ1aWxkWVRQQ29udHJvbHMoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vWVRQbGF5ZXIucGxheWVyLnNldFBsYXliYWNrUXVhbGl0eShZVFBsYXllci5vcHQucXVhbGl0eSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LnN0YXJ0QXQgPiAwKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5zZWVrVG8ocGFyc2VGbG9hdChZVFBsYXllci5vcHQuc3RhcnRBdCksIHRydWUpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFZVFBsYXllci5vcHQuYXV0b1BsYXkpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLnN0b3BZVFAoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5jaGVja0ZvclN0YXJ0QXQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIucGxheWVyLmdldEN1cnJlbnRUaW1lKCkgPj0gWVRQbGF5ZXIub3B0LnN0YXJ0QXQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChZVFBsYXllci5jaGVja0ZvclN0YXJ0QXQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIucGF1c2VZVFAoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5vcHQubXV0ZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikubXV0ZVlUUFZvbHVtZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnVubXV0ZVlUUFZvbHVtZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSwgMSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5wbGF5WVRQKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnNldFZvbHVtZShZVFBsYXllci5vcHQudm9sKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5tdXRlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLm11dGVZVFBWb2x1bWUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudW5tdXRlWVRQVm9sdW1lKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIFlUUGxheWVyLm9wdC5vblJlYWR5ID09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5vcHQub25SZWFkeSgkWVRQbGF5ZXIpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5Lm1iWVRQbGF5ZXIuY2hlY2tGb3JTdGF0ZShZVFBsYXllcik7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQnb25TdGF0ZUNoYW5nZScgICAgICAgICAgOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8qXHJcblx0XHRcdFx0XHRcdFx0XHRcdCAtMSAodW5zdGFydGVkKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQgMCAoZW5kZWQpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCAxIChwbGF5aW5nKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQgMiAocGF1c2VkKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQgMyAoYnVmZmVyaW5nKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQgNSAodmlkZW8gY3VlZCkuXHJcblx0XHRcdFx0XHRcdFx0XHRcdCAqL1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBldmVudC50YXJnZXQuZ2V0UGxheWVyU3RhdGUgIT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHN0YXRlID0gZXZlbnQudGFyZ2V0LmdldFBsYXllclN0YXRlKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIFlUUGxheWVyLm9wdC5vblN0YXRlQ2hhbmdlID09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5vcHQub25TdGF0ZUNoYW5nZSgkWVRQbGF5ZXIsIHN0YXRlKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBwbGF5ZXJCb3ggPSBqUXVlcnkoWVRQbGF5ZXIucGxheWVyRWwpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgY29udHJvbHMgPSBqUXVlcnkoXCIjY29udHJvbEJhcl9cIiArIFlUUGxheWVyLmlkKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBkYXRhID0gWVRQbGF5ZXIub3B0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHN0YXRlID09IDApIHsgLy8gZW5kXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLnN0YXRlID09IHN0YXRlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5zdGF0ZSA9IHN0YXRlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5wYXVzZVZpZGVvKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIHN0YXJ0QXQgPSBZVFBsYXllci5vcHQuc3RhcnRBdCA/IFlUUGxheWVyLm9wdC5zdGFydEF0IDogMTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGRhdGEubG9vcCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5jc3Moe29wYWNpdHk6IDB9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5wbGF5WVRQKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2Vla1RvKHN0YXJ0QXQsdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIVlUUGxheWVyLmlzQmFja2dyb3VuZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnNlZWtUbyhzdGFydEF0LCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5wbGF5WVRQKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLnBhdXNlWVRQKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9LCAxMCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWRhdGEubG9vcCAmJiBZVFBsYXllci5pc0JhY2tncm91bmQpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLkNTU0FuaW1hdGUoe29wYWNpdHk6IDB9LCAyMDAwKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIChkYXRhLmxvb3ApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLndyYXBwZXIuY3NzKHtvcGFjaXR5OiAwfSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5sb29wKys7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb250cm9scy5maW5kKFwiLm1iX1lUVlBQbGF5cGF1c2VcIikuaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5wbGF5KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnRyaWdnZXIoXCJZVFBFbmRcIik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzdGF0ZSA9PSAzKSB7IC8vIGJ1ZmZlcmluZ1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5zdGF0ZSA9PSBzdGF0ZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5zdGF0ZSA9IHN0YXRlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRyb2xzLmZpbmQoXCIubWJfWVRWUFBsYXlwYXVzZVwiKS5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBsYXkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihcIllUUEJ1ZmZlcmluZ1wiKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHN0YXRlID09IC0xKSB7IC8vIHVuc3RhcnRlZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5zdGF0ZSA9PSBzdGF0ZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5zdGF0ZSA9IHN0YXRlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLmNzcyh7b3BhY2l0eTowfSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihcIllUUFVuc3RhcnRlZFwiKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHN0YXRlID09IDEpIHsgLy8gcGxheVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5zdGF0ZSA9PSBzdGF0ZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5zdGF0ZSA9IHN0YXRlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5zZXRQbGF5YmFja1F1YWxpdHkoWVRQbGF5ZXIub3B0LnF1YWxpdHkpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZihZVFBsYXllci5vcHQubXV0ZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIubXV0ZVlUUFZvbHVtZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIub3B0Lm11dGUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5vcHQuYXV0b1BsYXkgJiYgWVRQbGF5ZXIubG9vcCA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLkNTU0FuaW1hdGUoe29wYWNpdHk6IFlUUGxheWVyLmlzQWxvbmUgPyAxIDogWVRQbGF5ZXIub3B0Lm9wYWNpdHl9LCAyMDAwKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYoIVlUUGxheWVyLmlzQmFja2dyb3VuZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5jc3Moe29wYWNpdHk6IFlUUGxheWVyLmlzQWxvbmUgPyAxIDogWVRQbGF5ZXIub3B0Lm9wYWNpdHl9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5jc3Moe2JhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjUpXCJ9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIucGxheWVyRWwpLkNTU0FuaW1hdGUoe29wYWNpdHk6IDF9LCAyMDAwKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5DU1NBbmltYXRlKHtvcGFjaXR5OiBZVFBsYXllci5vcHQub3BhY2l0eX0sIDIwMDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb250cm9scy5maW5kKFwiLm1iX1lUVlBQbGF5cGF1c2VcIikuaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5wYXVzZSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihcIllUUFN0YXJ0XCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoc3RhdGUgPT0gMikgeyAvLyBwYXVzZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5zdGF0ZSA9PSBzdGF0ZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5zdGF0ZSA9IHN0YXRlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRyb2xzLmZpbmQoXCIubWJfWVRWUFBsYXlwYXVzZVwiKS5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBsYXkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihcIllUUFBhdXNlXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0J29uUGxheWJhY2tRdWFsaXR5Q2hhbmdlJzogZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBZVFBsYXllci5vcHQub25QbGF5YmFja1F1YWxpdHlDaGFuZ2UgPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLm9wdC5vblBsYXliYWNrUXVhbGl0eUNoYW5nZSgkWVRQbGF5ZXIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdCdvbkVycm9yJyAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uIChlcnIpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGVyci5kYXRhID09IDIgJiYgWVRQbGF5ZXIuaXNQbGF5TGlzdClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnBsYXlOZXh0KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIFlUUGxheWVyLm9wdC5vbkVycm9yID09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5vcHQub25FcnJvcigkWVRQbGF5ZXIsIGVycik7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXREYXRhRnJvbUZlZWQ6IGZ1bmN0aW9uICh2aWRlb0lELCBZVFBsYXllcikge1xyXG5cdFx0XHQvL0dldCB2aWRlbyBpbmZvIGZyb20gRkVFRFMgQVBJXHJcblxyXG5cdFx0XHRZVFBsYXllci52aWRlb0lEID0gdmlkZW9JRDtcclxuXHRcdFx0aWYgKCFqUXVlcnkuYnJvd3Nlci5tc2llKSB7IC8vIShqUXVlcnkuYnJvd3Nlci5tc2llICYmIGpRdWVyeS5icm93c2VyLnZlcnNpb248OSlcclxuXHJcblx0XHRcdFx0alF1ZXJ5LmdldEpTT04oJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvJyArIHZpZGVvSUQgKyAnP3Y9MiZhbHQ9anNvbmMnLCBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCB4aHIpIHtcclxuXHJcblx0XHRcdFx0XHRZVFBsYXllci5kYXRhUmVjZWl2ZWQgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdHZhciB2aWRlb0RhdGEgPSBkYXRhLmRhdGE7XHJcblxyXG5cdFx0XHRcdFx0WVRQbGF5ZXIudGl0bGUgPSB2aWRlb0RhdGEudGl0bGU7XHJcblx0XHRcdFx0XHRZVFBsYXllci52aWRlb0RhdGEgPSB2aWRlb0RhdGE7XHJcblxyXG5cdFx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5yYXRpbyA9PSBcImF1dG9cIilcclxuXHRcdFx0XHRcdFx0aWYgKHZpZGVvRGF0YS5hc3BlY3RSYXRpbyAmJiB2aWRlb0RhdGEuYXNwZWN0UmF0aW8gPT09IFwid2lkZXNjcmVlblwiKVxyXG5cdFx0XHRcdFx0XHRcdFlUUGxheWVyLm9wdC5yYXRpbyA9IFwiMTYvOVwiO1xyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIub3B0LnJhdGlvID0gXCI0LzNcIjtcclxuXHJcblx0XHRcdFx0XHRpZighWVRQbGF5ZXIuaXNJbml0KXtcclxuXHJcblx0XHRcdFx0XHRcdFlUUGxheWVyLmlzSW5pdCA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIVlUUGxheWVyLmlzQmFja2dyb3VuZCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBiZ25kVVJMID0gWVRQbGF5ZXIudmlkZW9EYXRhLnRodW1ibmFpbC5ocURlZmF1bHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikuY3NzKHtiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC41KSB1cmwoXCIgKyBiZ25kVVJMICsgXCIpIGNlbnRlciBjZW50ZXJcIiwgYmFja2dyb3VuZFNpemU6IFwiY292ZXJcIn0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRqUXVlcnkoZG9jdW1lbnQpLnRyaWdnZXIoXCJnZXRWaWRlb0luZm9fXCIgKyBZVFBsYXllci5vcHQuaWQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFwiWVRQQ2hhbmdlZFwiKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0aWYoIVlUUGxheWVyLmRhdGFSZWNlaXZlZCAmJiAhWVRQbGF5ZXIuaXNJbml0KXtcclxuXHRcdFx0XHRcdFx0WVRQbGF5ZXIuaXNJbml0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KGRvY3VtZW50KS50cmlnZ2VyKFwiZ2V0VmlkZW9JbmZvX1wiICsgWVRQbGF5ZXIub3B0LmlkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LDI1MDApXHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFlUUGxheWVyLm9wdC5yYXRpbyA9PSBcImF1dG9cIiA/IFlUUGxheWVyLm9wdC5yYXRpbyA9IFwiMTYvOVwiIDogWVRQbGF5ZXIub3B0LnJhdGlvO1xyXG5cclxuXHRcdFx0XHRpZighWVRQbGF5ZXIuaXNJbml0KXtcclxuXHRcdFx0XHRcdFlUUGxheWVyLmlzSW5pdCA9IHRydWU7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGpRdWVyeShkb2N1bWVudCkudHJpZ2dlcihcImdldFZpZGVvSW5mb19cIiArIFlUUGxheWVyLm9wdC5pZCk7XHJcblx0XHRcdFx0XHR9LDEwMClcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihcIllUUENoYW5nZWRcIik7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Z2V0VmlkZW9JRDogZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblx0XHRcdHJldHVybiBZVFBsYXllci52aWRlb0lEIHx8IGZhbHNlIDtcclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0VmlkZW9RdWFsaXR5OiBmdW5jdGlvbihxdWFsaXR5KXtcclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblx0XHRcdFlUUGxheWVyLnBsYXllci5zZXRQbGF5YmFja1F1YWxpdHkocXVhbGl0eSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdFlUUGxheWxpc3QgOiBmdW5jdGlvbih2aWRlb3MsIHNodWZmbGUsIGNhbGxiYWNrKXtcclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblxyXG5cdFx0XHRZVFBsYXllci5pc1BsYXlMaXN0ID0gdHJ1ZTtcclxuXHJcblx0XHRcdGlmKHNodWZmbGUpXHJcblx0XHRcdFx0dmlkZW9zID0galF1ZXJ5LnNodWZmbGUodmlkZW9zKTtcclxuXHJcblx0XHRcdGlmKCFZVFBsYXllci52aWRlb0lEKXtcclxuXHRcdFx0XHRZVFBsYXllci52aWRlb3MgPSB2aWRlb3M7XHJcblx0XHRcdFx0WVRQbGF5ZXIudmlkZW9Db3VudGVyID0gMDtcclxuXHRcdFx0XHRZVFBsYXllci52aWRlb0xlbmd0aCA9IHZpZGVvcy5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikuZGF0YShcInByb3BlcnR5XCIsIHZpZGVvc1swXSk7XHJcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5tYl9ZVFBsYXllcigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih0eXBlb2YgY2FsbGJhY2sgPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikub24oXCJZVFBDaGFuZ2VkXCIsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKFlUUGxheWVyKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdGpRdWVyeShZVFBsYXllcikub24oXCJZVFBFbmRcIiwgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnBsYXlOZXh0KCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRwbGF5TmV4dDogZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblx0XHRcdFlUUGxheWVyLnZpZGVvQ291bnRlcisrO1xyXG5cdFx0XHRpZihZVFBsYXllci52aWRlb0NvdW50ZXI+PVlUUGxheWVyLnZpZGVvTGVuZ3RoKVxyXG5cdFx0XHRcdFlUUGxheWVyLnZpZGVvQ291bnRlciA9IDA7XHJcblx0XHRcdGpRdWVyeShZVFBsYXllci5wbGF5ZXJFbCkuY3NzKHtvcGFjaXR5OjB9KTtcclxuXHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5jaGFuZ2VNb3ZpZShZVFBsYXllci52aWRlb3NbWVRQbGF5ZXIudmlkZW9Db3VudGVyXSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGNoYW5nZU1vdmllOiBmdW5jdGlvbiAob3B0KSB7XHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cdFx0XHR2YXIgZGF0YSA9IFlUUGxheWVyLm9wdDtcclxuXHRcdFx0aWYgKG9wdCkge1xyXG5cdFx0XHRcdGpRdWVyeS5leHRlbmQoZGF0YSwgb3B0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0WVRQbGF5ZXIudmlkZW9JRCA9IGRhdGEudmlkZW9VUkwuZ2V0VmlkZW9JRCgpO1xyXG5cclxuXHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5wYXVzZVlUUCgpO1xyXG5cdFx0XHR2YXIgdGltZXIgPSBqUXVlcnkuYnJvd3Nlci5tc2llID8gMTAwMCA6IDA7XHJcblx0XHRcdGpRdWVyeShZVFBsYXllcikuZ2V0UGxheWVyKCkuY3VlVmlkZW9CeVVybChlbmNvZGVVUkkoXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS92L1wiICsgWVRQbGF5ZXIudmlkZW9JRCkgLCA1ICwgWVRQbGF5ZXIub3B0LnF1YWxpdHkpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikucGxheVlUUCgpO1xyXG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikub25lKFwiWVRQU3RhcnRcIiwgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGpRdWVyeShZVFBsYXllci5wbGF5ZXJFbCkuQ1NTQW5pbWF0ZSh7b3BhY2l0eToxfSwyMDAwKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH0sdGltZXIpXHJcblxyXG5cdFx0XHRpZiAoWVRQbGF5ZXIub3B0Lm11dGUpIHtcclxuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLm11dGVZVFBWb2x1bWUoKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS51bm11dGVZVFBWb2x1bWUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKFlUUGxheWVyLm9wdC5hZGRSYXN0ZXIpIHtcclxuXHRcdFx0XHR2YXIgcmV0aW5hID0gKHdpbmRvdy5yZXRpbmEgfHwgd2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxKTtcclxuXHRcdFx0XHRZVFBsYXllci5vdmVybGF5LmFkZENsYXNzKHJldGluYSA/IFwicmFzdGVyIHJldGluYVwiIDogXCJyYXN0ZXJcIik7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFlUUGxheWVyLm92ZXJsYXkucmVtb3ZlQ2xhc3MoXCJyYXN0ZXJcIik7XHJcblx0XHRcdFx0WVRQbGF5ZXIub3ZlcmxheS5yZW1vdmVDbGFzcyhcInJldGluYVwiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0alF1ZXJ5KFwiI2NvbnRyb2xCYXJfXCIgKyBZVFBsYXllci5pZCkucmVtb3ZlKCk7XHJcblxyXG5cdFx0XHRpZiAoWVRQbGF5ZXIub3B0LnNob3dDb250cm9scylcclxuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLmJ1aWxkWVRQQ29udHJvbHMoKTtcclxuXHJcblx0XHRcdGpRdWVyeS5tYllUUGxheWVyLmdldERhdGFGcm9tRmVlZChZVFBsYXllci52aWRlb0lELCBZVFBsYXllcik7XHJcblx0XHRcdGpRdWVyeShZVFBsYXllcikub3B0aW1pemVEaXNwbGF5KCk7XHJcblx0XHRcdGpRdWVyeS5tYllUUGxheWVyLmNoZWNrRm9yU3RhdGUoWVRQbGF5ZXIpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0Z2V0UGxheWVyOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBqUXVlcnkodGhpcykuZ2V0KDApLnBsYXllcjtcclxuXHRcdH0sXHJcblxyXG5cdFx0cGxheWVyRGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdFx0eXRwLllUQVBJUmVhZHkgPSBmYWxzZTtcclxuXHRcdFx0eXRwLmlzSW5pdCA9IGZhbHNlO1xyXG5cdFx0XHRZVFBsYXllci5vcHQuaXNJbml0ID0gZmFsc2U7XHJcblx0XHRcdFlUUGxheWVyLnZpZGVvSUQgPSBudWxsO1xyXG5cclxuXHRcdFx0dmFyIHBsYXllckJveCA9IFlUUGxheWVyLndyYXBwZXI7XHJcblx0XHRcdHBsYXllckJveC5yZW1vdmUoKTtcclxuXHRcdFx0alF1ZXJ5KFwiI2NvbnRyb2xCYXJfXCIgKyBZVFBsYXllci5pZCkucmVtb3ZlKCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGZ1bGxzY3JlZW46IGZ1bmN0aW9uKHJlYWwpIHtcclxuXHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cclxuXHRcdFx0dmFyIGNvbnRyb2xzID0galF1ZXJ5KFwiI2NvbnRyb2xCYXJfXCIgKyBZVFBsYXllci5pZCk7XHJcblx0XHRcdHZhciBmdWxsU2NyZWVuQnRuID0gY29udHJvbHMuZmluZChcIi5tYl9Pbmx5WVRcIik7XHJcblx0XHRcdHZhciB2aWRlb1dyYXBwZXIgPSBqUXVlcnkoWVRQbGF5ZXIud3JhcHBlcik7XHJcblx0XHRcdGlmKHJlYWwpe1xyXG5cdFx0XHRcdHZhciBmdWxsc2NyZWVuY2hhbmdlID0galF1ZXJ5LmJyb3dzZXIubW96aWxsYSA/IFwibW96ZnVsbHNjcmVlbmNoYW5nZVwiIDogalF1ZXJ5LmJyb3dzZXIud2Via2l0ID8gXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIgOiBcImZ1bGxzY3JlZW5jaGFuZ2VcIjtcclxuXHRcdFx0XHRqUXVlcnkoZG9jdW1lbnQpLm9mZihmdWxsc2NyZWVuY2hhbmdlKTtcclxuXHRcdFx0XHRqUXVlcnkoZG9jdW1lbnQpLm9uKGZ1bGxzY3JlZW5jaGFuZ2UsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0dmFyIGlzRnVsbFNjcmVlbiA9IFJ1blByZWZpeE1ldGhvZChkb2N1bWVudCwgXCJJc0Z1bGxTY3JlZW5cIikgfHwgUnVuUHJlZml4TWV0aG9kKGRvY3VtZW50LCBcIkZ1bGxTY3JlZW5cIik7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFpc0Z1bGxTY3JlZW4pIHtcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5yZW1vdmVDbGFzcyhcImZ1bGxzY3JlZW5cIik7XHJcblx0XHRcdFx0XHRcdFlUUGxheWVyLmlzQWxvbmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0ZnVsbFNjcmVlbkJ0bi5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLm9ubHlZVClcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5zZXRWaWRlb1F1YWxpdHkoWVRQbGF5ZXIub3B0LnF1YWxpdHkpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLmlzQmFja2dyb3VuZCl7XHJcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KFwiYm9keVwiKS5hZnRlcihjb250cm9scyk7XHJcblx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdFlUUGxheWVyLndyYXBwZXIuYmVmb3JlKGNvbnRyb2xzKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikuc2V0VmlkZW9RdWFsaXR5KFwiZGVmYXVsdFwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFZVFBsYXllci5pc0Fsb25lKSB7XHJcblxyXG5cdFx0XHRcdGlmIChZVFBsYXllci5wbGF5ZXIuZ2V0UGxheWVyU3RhdGUoKSA+PSAxKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYoWVRQbGF5ZXIucGxheWVyLmdldFBsYXllclN0YXRlKCkgIT0gMSAmJiBZVFBsYXllci5wbGF5ZXIuZ2V0UGxheWVyU3RhdGUoKSAhPSAyKVxyXG5cdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnBsYXlZVFAoKTtcclxuXHJcblx0XHRcdFx0XHRpZihyZWFsKXtcclxuXHRcdFx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5hcHBlbmQoY29udHJvbHMpO1xyXG5cdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLmFkZENsYXNzKFwiZnVsbHNjcmVlblwiKTtcclxuXHRcdFx0XHRcdFx0bGF1bmNoRnVsbHNjcmVlbih2aWRlb1dyYXBwZXIuZ2V0KDApKTtcclxuXHRcdFx0XHRcdH0gZWxzZVxyXG5cdFx0XHRcdFx0XHR2aWRlb1dyYXBwZXIuY3NzKHt6SW5kZXg6IDEwMDAwfSkuQ1NTQW5pbWF0ZSh7b3BhY2l0eTogMX0sIDEwMDAsIDApO1xyXG5cclxuXHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihcIllUUEZ1bGxTY3JlZW5TdGFydFwiKTtcclxuXHJcblx0XHRcdFx0XHRmdWxsU2NyZWVuQnRuLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMuc2hvd1NpdGUpXHJcblx0XHRcdFx0XHRZVFBsYXllci5pc0Fsb25lID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRpZihyZWFsKXtcclxuXHRcdFx0XHRcdGNhbmNlbEZ1bGxzY3JlZW4oKTtcclxuXHRcdFx0XHR9IGVsc2V7XHJcblx0XHRcdFx0XHR2aWRlb1dyYXBwZXIuQ1NTQW5pbWF0ZSh7b3BhY2l0eTogWVRQbGF5ZXIub3B0Lm9wYWNpdHl9LCA1MDApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFwiWVRQRnVsbFNjcmVlbkVuZFwiKTtcclxuXHJcblx0XHRcdFx0dmlkZW9XcmFwcGVyLmNzcyh7ekluZGV4OiAtMX0pO1xyXG5cdFx0XHRcdGZ1bGxTY3JlZW5CdG4uaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5vbmx5WVQpXHJcblx0XHRcdFx0WVRQbGF5ZXIuaXNBbG9uZSA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBSdW5QcmVmaXhNZXRob2Qob2JqLCBtZXRob2QpIHtcclxuXHRcdFx0XHR2YXIgcGZ4ID0gW1wid2Via2l0XCIsIFwibW96XCIsIFwibXNcIiwgXCJvXCIsIFwiXCJdO1xyXG5cdFx0XHRcdHZhciBwID0gMCwgbSwgdDtcclxuXHRcdFx0XHR3aGlsZSAocCA8IHBmeC5sZW5ndGggJiYgIW9ialttXSkge1xyXG5cdFx0XHRcdFx0bSA9IG1ldGhvZDtcclxuXHRcdFx0XHRcdGlmIChwZnhbcF0gPT0gXCJcIikge1xyXG5cdFx0XHRcdFx0XHRtID0gbS5zdWJzdHIoMCwxKS50b0xvd2VyQ2FzZSgpICsgbS5zdWJzdHIoMSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRtID0gcGZ4W3BdICsgbTtcclxuXHRcdFx0XHRcdHQgPSB0eXBlb2Ygb2JqW21dO1xyXG5cdFx0XHRcdFx0aWYgKHQgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHRwZnggPSBbcGZ4W3BdXTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICh0ID09IFwiZnVuY3Rpb25cIiA/IG9ialttXSgpIDogb2JqW21dKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHArKztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGxhdW5jaEZ1bGxzY3JlZW4oZWxlbWVudCkge1xyXG5cdFx0XHRcdFJ1blByZWZpeE1ldGhvZChlbGVtZW50LCBcIlJlcXVlc3RGdWxsU2NyZWVuXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBjYW5jZWxGdWxsc2NyZWVuKCkge1xyXG5cdFx0XHRcdGlmIChSdW5QcmVmaXhNZXRob2QoZG9jdW1lbnQsIFwiRnVsbFNjcmVlblwiKSB8fCBSdW5QcmVmaXhNZXRob2QoZG9jdW1lbnQsIFwiSXNGdWxsU2NyZWVuXCIpKSB7XHJcblx0XHRcdFx0XHRSdW5QcmVmaXhNZXRob2QoZG9jdW1lbnQsIFwiQ2FuY2VsRnVsbFNjcmVlblwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0cGxheVlUUDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdFx0dmFyIGNvbnRyb2xzID0galF1ZXJ5KFwiI2NvbnRyb2xCYXJfXCIgKyBZVFBsYXllci5pZCk7XHJcblx0XHRcdHZhciBwbGF5QnRuID0gY29udHJvbHMuZmluZChcIi5tYl9ZVFZQUGxheXBhdXNlXCIpO1xyXG5cdFx0XHRwbGF5QnRuLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMucGF1c2UpO1xyXG5cdFx0XHRZVFBsYXllci5wbGF5ZXIucGxheVZpZGVvKCk7XHJcblxyXG5cdFx0XHRZVFBsYXllci53cmFwcGVyLkNTU0FuaW1hdGUoe29wYWNpdHk6IFlUUGxheWVyLm9wdC5vcGFjaXR5fSwgMjAwMCk7XHJcblx0XHRcdCQoWVRQbGF5ZXIpLm9uKFwiWVRQU3RhcnRcIiwgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLmNzcyhcImJhY2tncm91bmRcIiwgXCJub25lXCIpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSxcclxuXHJcblx0XHR0b2dnbGVMb29wczogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdFx0dmFyIGRhdGEgPSBZVFBsYXllci5vcHQ7XHJcblx0XHRcdGlmIChkYXRhLmxvb3AgPT0gMSkge1xyXG5cdFx0XHRcdGRhdGEubG9vcCA9IDA7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYoZGF0YS5zdGFydEF0KSB7XHJcblx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2Vla1RvKGRhdGEuc3RhcnRBdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5wbGF5VmlkZW8oKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZGF0YS5sb29wID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRzdG9wWVRQOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cdFx0XHR2YXIgY29udHJvbHMgPSBqUXVlcnkoXCIjY29udHJvbEJhcl9cIiArIFlUUGxheWVyLmlkKTtcclxuXHRcdFx0dmFyIHBsYXlCdG4gPSBjb250cm9scy5maW5kKFwiLm1iX1lUVlBQbGF5cGF1c2VcIik7XHJcblx0XHRcdHBsYXlCdG4uaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5wbGF5KTtcclxuXHRcdFx0WVRQbGF5ZXIucGxheWVyLnN0b3BWaWRlbygpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRwYXVzZVlUUDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdFx0dmFyIGRhdGEgPSBZVFBsYXllci5vcHQ7XHJcblx0XHRcdHZhciBjb250cm9scyA9IGpRdWVyeShcIiNjb250cm9sQmFyX1wiICsgWVRQbGF5ZXIuaWQpO1xyXG5cdFx0XHR2YXIgcGxheUJ0biA9IGNvbnRyb2xzLmZpbmQoXCIubWJfWVRWUFBsYXlwYXVzZVwiKTtcclxuXHRcdFx0cGxheUJ0bi5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBsYXkpO1xyXG5cdFx0XHRZVFBsYXllci5wbGF5ZXIucGF1c2VWaWRlbygpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRzZXRZVFBWb2x1bWU6IGZ1bmN0aW9uICh2YWwpIHtcclxuXHRcdFx0dmFyIFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XHJcblx0XHRcdGlmICghdmFsICYmICFZVFBsYXllci5vcHQudm9sICYmIHBsYXllci5nZXRWb2x1bWUoKSA9PSAwKVxyXG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikudW5tdXRlWVRQVm9sdW1lKCk7XHJcblx0XHRcdGVsc2UgaWYgKCghdmFsICYmIFlUUGxheWVyLnBsYXllci5nZXRWb2x1bWUoKSA+IDApIHx8ICh2YWwgJiYgWVRQbGF5ZXIucGxheWVyLmdldFZvbHVtZSgpID09IHZhbCkpXHJcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5tdXRlWVRQVm9sdW1lKCk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRZVFBsYXllci5vcHQudm9sID0gdmFsO1xyXG5cdFx0XHRZVFBsYXllci5wbGF5ZXIuc2V0Vm9sdW1lKFlUUGxheWVyLm9wdC52b2wpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRtdXRlWVRQVm9sdW1lOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cdFx0XHRZVFBsYXllci5vcHQudm9sID0gWVRQbGF5ZXIucGxheWVyLmdldFZvbHVtZSgpIHx8IDUwO1xyXG5cdFx0XHRZVFBsYXllci5wbGF5ZXIubXV0ZSgpO1xyXG5cdFx0XHRZVFBsYXllci5wbGF5ZXIuc2V0Vm9sdW1lKDApO1xyXG5cdFx0XHR2YXIgY29udHJvbHMgPSBqUXVlcnkoXCIjY29udHJvbEJhcl9cIiArIFlUUGxheWVyLmlkKTtcclxuXHRcdFx0dmFyIG11dGVCdG4gPSBjb250cm9scy5maW5kKFwiLm1iX1lUVlBNdXRlVW5tdXRlXCIpO1xyXG5cdFx0XHRtdXRlQnRuLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMudW5tdXRlKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0dW5tdXRlWVRQVm9sdW1lOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cclxuXHRcdFx0WVRQbGF5ZXIucGxheWVyLnVuTXV0ZSgpO1xyXG5cdFx0XHRZVFBsYXllci5wbGF5ZXIuc2V0Vm9sdW1lKFlUUGxheWVyLm9wdC52b2wpO1xyXG5cclxuXHRcdFx0dmFyIGNvbnRyb2xzID0galF1ZXJ5KFwiI2NvbnRyb2xCYXJfXCIgKyBZVFBsYXllci5pZCk7XHJcblx0XHRcdHZhciBtdXRlQnRuID0gY29udHJvbHMuZmluZChcIi5tYl9ZVFZQTXV0ZVVubXV0ZVwiKTtcclxuXHRcdFx0bXV0ZUJ0bi5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLm11dGUpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRtYW5hZ2VZVFBQcm9ncmVzczogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdFx0dmFyIGNvbnRyb2xzID0galF1ZXJ5KFwiI2NvbnRyb2xCYXJfXCIgKyBZVFBsYXllci5pZCk7XHJcblx0XHRcdHZhciBwcm9ncmVzc0JhciA9IGNvbnRyb2xzLmZpbmQoXCIubWJfWVRWUFByb2dyZXNzXCIpO1xyXG5cdFx0XHR2YXIgbG9hZGVkQmFyID0gY29udHJvbHMuZmluZChcIi5tYl9ZVFZQTG9hZGVkXCIpO1xyXG5cdFx0XHR2YXIgdGltZUJhciA9IGNvbnRyb2xzLmZpbmQoXCIubWJfWVRWVGltZVwiKTtcclxuXHRcdFx0dmFyIHRvdFcgPSBwcm9ncmVzc0Jhci5vdXRlcldpZHRoKCk7XHJcblxyXG5cdFx0XHR2YXIgY3VycmVudFRpbWUgPSBNYXRoLmZsb29yKFlUUGxheWVyLnBsYXllci5nZXRDdXJyZW50VGltZSgpKTtcclxuXHRcdFx0dmFyIHRvdGFsVGltZSA9IE1hdGguZmxvb3IoWVRQbGF5ZXIucGxheWVyLmdldER1cmF0aW9uKCkpO1xyXG5cdFx0XHR2YXIgdGltZVcgPSAoY3VycmVudFRpbWUgKiB0b3RXKSAvIHRvdGFsVGltZTtcclxuXHRcdFx0dmFyIHN0YXJ0TGVmdCA9IDA7XHJcblxyXG5cdFx0XHR2YXIgbG9hZGVkVyA9IFlUUGxheWVyLnBsYXllci5nZXRWaWRlb0xvYWRlZEZyYWN0aW9uKCkgKiAxMDA7XHJcblxyXG5cdFx0XHRsb2FkZWRCYXIuY3NzKHtsZWZ0OiBzdGFydExlZnQsIHdpZHRoOiBsb2FkZWRXICsgXCIlXCJ9KTtcclxuXHRcdFx0dGltZUJhci5jc3Moe2xlZnQ6IDAsIHdpZHRoOiB0aW1lV30pO1xyXG5cdFx0XHRyZXR1cm4ge3RvdGFsVGltZTogdG90YWxUaW1lLCBjdXJyZW50VGltZTogY3VycmVudFRpbWV9O1xyXG5cdFx0fSxcclxuXHJcblx0XHRidWlsZFlUUENvbnRyb2xzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xyXG5cdFx0XHR2YXIgZGF0YSA9IFlUUGxheWVyLm9wdDtcclxuXHJcblx0XHRcdGlmKGpRdWVyeShcIiNjb250cm9sQmFyX1wiKyBZVFBsYXllci5pZCkubGVuZ3RoKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdHZhciBjb250cm9sQmFyID0galF1ZXJ5KFwiPHNwYW4vPlwiKS5hdHRyKFwiaWRcIiwgXCJjb250cm9sQmFyX1wiICsgWVRQbGF5ZXIuaWQpLmFkZENsYXNzKFwibWJfWVRWUEJhclwiKS5jc3Moe3doaXRlU3BhY2U6IFwibm9XcmFwXCIsIHBvc2l0aW9uOiBZVFBsYXllci5pc0JhY2tncm91bmQgPyBcImZpeGVkXCIgOiBcImFic29sdXRlXCIsIHpJbmRleDogWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kID8gMTAwMDAgOiAxMDAwfSkuaGlkZSgpO1xyXG5cdFx0XHR2YXIgYnV0dG9uQmFyID0galF1ZXJ5KFwiPGRpdi8+XCIpLmFkZENsYXNzKFwiYnV0dG9uQmFyXCIpO1xyXG5cdFx0XHR2YXIgcGxheXBhdXNlID0galF1ZXJ5KFwiPHNwYW4+XCIgKyBqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5wbGF5ICsgXCI8L3NwYW4+XCIpLmFkZENsYXNzKFwibWJfWVRWUFBsYXlwYXVzZSB5dHBpY29uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRpZiAoWVRQbGF5ZXIucGxheWVyLmdldFBsYXllclN0YXRlKCkgPT0gMSlcclxuXHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikucGF1c2VZVFAoKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnBsYXlZVFAoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR2YXIgTXV0ZVVubXV0ZSA9IGpRdWVyeShcIjxzcGFuPlwiICsgalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMubXV0ZSArIFwiPC9zcGFuPlwiKS5hZGRDbGFzcyhcIm1iX1lUVlBNdXRlVW5tdXRlIHl0cGljb25cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlmIChZVFBsYXllci5wbGF5ZXIuZ2V0Vm9sdW1lKCk9PTApIHtcclxuXHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudW5tdXRlWVRQVm9sdW1lKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikubXV0ZVlUUFZvbHVtZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR2YXIgaWR4ID0galF1ZXJ5KFwiPHNwYW4vPlwiKS5hZGRDbGFzcyhcIm1iX1lUVlBUaW1lXCIpO1xyXG5cclxuXHRcdFx0dmFyIHZVUkwgPSBkYXRhLnZpZGVvVVJMO1xyXG5cdFx0XHRpZih2VVJMLmluZGV4T2YoXCJodHRwc1wiKSA8IDApXHJcblx0XHRcdFx0dlVSTCA9IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1cIitkYXRhLnZpZGVvVVJMO1xyXG5cdFx0XHR2YXIgbW92aWVVcmwgPSBqUXVlcnkoXCI8c3Bhbi8+XCIpLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMueXRMb2dvKS5hZGRDbGFzcyhcIm1iX1lUVlBVcmwgeXRwaWNvblwiKS5hdHRyKFwidGl0bGVcIiwgXCJ2aWV3IG9uIFlvdVR1YmVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7d2luZG93Lm9wZW4odlVSTCwgXCJ2aWV3T25ZVFwiKX0pO1xyXG5cdFx0XHR2YXIgb25seVZpZGVvID0galF1ZXJ5KFwiPHNwYW4vPlwiKS5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLm9ubHlZVCkuYWRkQ2xhc3MoXCJtYl9Pbmx5WVQgeXRwaWNvblwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24gKCkge2pRdWVyeShZVFBsYXllcikuZnVsbHNjcmVlbihkYXRhLnJlYWxmdWxsc2NyZWVuKTt9KTtcclxuXHJcblx0XHRcdHZhciBwcm9ncmVzc0JhciA9IGpRdWVyeShcIjxkaXYvPlwiKS5hZGRDbGFzcyhcIm1iX1lUVlBQcm9ncmVzc1wiKS5jc3MoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0dGltZUJhci5jc3Moe3dpZHRoOiAoZS5jbGllbnRYIC0gdGltZUJhci5vZmZzZXQoKS5sZWZ0KX0pO1xyXG5cdFx0XHRcdFlUUGxheWVyLnRpbWVXID0gZS5jbGllbnRYIC0gdGltZUJhci5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0XHRcdGNvbnRyb2xCYXIuZmluZChcIi5tYl9ZVFZQTG9hZGVkXCIpLmNzcyh7d2lkdGg6IDB9KTtcclxuXHRcdFx0XHR2YXIgdG90YWxUaW1lID0gTWF0aC5mbG9vcihZVFBsYXllci5wbGF5ZXIuZ2V0RHVyYXRpb24oKSk7XHJcblx0XHRcdFx0WVRQbGF5ZXIuZ290byA9ICh0aW1lQmFyLm91dGVyV2lkdGgoKSAqIHRvdGFsVGltZSkgLyBwcm9ncmVzc0Jhci5vdXRlcldpZHRoKCk7XHJcblxyXG5cdFx0XHRcdFlUUGxheWVyLnBsYXllci5zZWVrVG8ocGFyc2VGbG9hdChZVFBsYXllci5nb3RvKSwgdHJ1ZSk7XHJcblx0XHRcdFx0Y29udHJvbEJhci5maW5kKFwiLm1iX1lUVlBMb2FkZWRcIikuY3NzKHt3aWR0aDogMH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHZhciBsb2FkZWRCYXIgPSBqUXVlcnkoXCI8ZGl2Lz5cIikuYWRkQ2xhc3MoXCJtYl9ZVFZQTG9hZGVkXCIpLmNzcyhcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIik7XHJcblx0XHRcdHZhciB0aW1lQmFyID0galF1ZXJ5KFwiPGRpdi8+XCIpLmFkZENsYXNzKFwibWJfWVRWVGltZVwiKS5jc3MoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpO1xyXG5cclxuXHRcdFx0cHJvZ3Jlc3NCYXIuYXBwZW5kKGxvYWRlZEJhcikuYXBwZW5kKHRpbWVCYXIpO1xyXG5cdFx0XHRidXR0b25CYXIuYXBwZW5kKHBsYXlwYXVzZSkuYXBwZW5kKE11dGVVbm11dGUpLmFwcGVuZChpZHgpO1xyXG5cclxuXHRcdFx0aWYgKGRhdGEucHJpbnRVcmwpe1xyXG5cdFx0XHRcdGJ1dHRvbkJhci5hcHBlbmQobW92aWVVcmwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kIHx8IChZVFBsYXllci5vcHQucmVhbGZ1bGxzY3JlZW4gJiYgIVlUUGxheWVyLmlzQmFja2dyb3VuZCkpXHJcblx0XHRcdFx0YnV0dG9uQmFyLmFwcGVuZChvbmx5VmlkZW8pO1xyXG5cclxuXHRcdFx0Y29udHJvbEJhci5hcHBlbmQoYnV0dG9uQmFyKS5hcHBlbmQocHJvZ3Jlc3NCYXIpO1xyXG5cclxuXHRcdFx0aWYgKCFZVFBsYXllci5pc0JhY2tncm91bmQpIHtcclxuXHRcdFx0XHRjb250cm9sQmFyLmFkZENsYXNzKFwiaW5saW5lUGxheWVyXCIpO1xyXG5cdFx0XHRcdFlUUGxheWVyLndyYXBwZXIuYmVmb3JlKGNvbnRyb2xCYXIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGpRdWVyeShcImJvZHlcIikuYWZ0ZXIoY29udHJvbEJhcik7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29udHJvbEJhci5mYWRlSW4oKTtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdGNoZWNrRm9yU3RhdGU6ZnVuY3Rpb24oWVRQbGF5ZXIpe1xyXG5cclxuXHRcdFx0dmFyIGNvbnRyb2xCYXIgPSBqUXVlcnkoXCIjY29udHJvbEJhcl9cIiArIFlUUGxheWVyLmlkKTtcclxuXHRcdFx0dmFyIGRhdGEgPSBZVFBsYXllci5vcHQ7XHJcblx0XHRcdHZhciBzdGFydEF0ID0gWVRQbGF5ZXIub3B0LnN0YXJ0QXQgPyBZVFBsYXllci5vcHQuc3RhcnRBdCA6IDE7XHJcblxyXG5cdFx0XHRZVFBsYXllci5nZXRTdGF0ZSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR2YXIgcHJvZyA9IGpRdWVyeShZVFBsYXllcikubWFuYWdlWVRQUHJvZ3Jlc3MoKTtcclxuXHJcblx0XHRcdFx0Y29udHJvbEJhci5maW5kKFwiLm1iX1lUVlBUaW1lXCIpLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuZm9ybWF0VGltZShwcm9nLmN1cnJlbnRUaW1lKSArIFwiIC8gXCIgKyBqUXVlcnkubWJZVFBsYXllci5mb3JtYXRUaW1lKHByb2cudG90YWxUaW1lKSk7XHJcblx0XHRcdFx0aWYgKHBhcnNlRmxvYXQoWVRQbGF5ZXIucGxheWVyLmdldER1cmF0aW9uKCkgLSAzKSA8IFlUUGxheWVyLnBsYXllci5nZXRDdXJyZW50VGltZSgpICYmIFlUUGxheWVyLnBsYXllci5nZXRQbGF5ZXJTdGF0ZSgpID09IDEgJiYgIVlUUGxheWVyLmlzUGxheUxpc3QpIHtcclxuXHRcdFx0XHRcdGlmKCFkYXRhLmxvb3Ape1xyXG5cdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIucGF1c2VWaWRlbygpO1xyXG5cdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLkNTU0FuaW1hdGUoe29wYWNpdHk6IDB9LCAyMDAwLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnNlZWtUbyhzdGFydEF0KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCFZVFBsYXllci5pc0JhY2tncm91bmQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBiZ25kVVJMID0gWVRQbGF5ZXIudmlkZW9EYXRhLnRodW1ibmFpbC5ocURlZmF1bHQ7XHJcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLmNzcyh7YmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNSkgdXJsKFwiICsgYmduZFVSTCArIFwiKSBjZW50ZXIgY2VudGVyXCIsIGJhY2tncm91bmRTaXplOiBcImNvdmVyXCJ9KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnNlZWtUbyhzdGFydEF0KTtcclxuXHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihcIllUUEVuZFwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIDEpO1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0Zm9ybWF0VGltZSAgICAgIDogZnVuY3Rpb24gKHMpIHtcclxuXHRcdFx0dmFyIG1pbiA9IE1hdGguZmxvb3IocyAvIDYwKTtcclxuXHRcdFx0dmFyIHNlYyA9IE1hdGguZmxvb3IocyAtICg2MCAqIG1pbikpO1xyXG5cdFx0XHRyZXR1cm4gKG1pbiA8IDkgPyBcIjBcIiArIG1pbiA6IG1pbikgKyBcIiA6IFwiICsgKHNlYyA8IDkgPyBcIjBcIiArIHNlYyA6IHNlYyk7XHJcblx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGpRdWVyeS5mbi50b2dnbGVWb2x1bWUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdGlmICghWVRQbGF5ZXIpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRpZiAoWVRQbGF5ZXIucGxheWVyLmlzTXV0ZWQoKSkge1xyXG5cdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnVubXV0ZVlUUFZvbHVtZSgpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGpRdWVyeShZVFBsYXllcikubXV0ZVlUUFZvbHVtZSgpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGpRdWVyeS5mbi5vcHRpbWl6ZURpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcclxuXHRcdHZhciBkYXRhID0gWVRQbGF5ZXIub3B0O1xyXG5cdFx0dmFyIHBsYXllckJveCA9IGpRdWVyeShZVFBsYXllci5wbGF5ZXJFbCk7XHJcblx0XHR2YXIgd2luID0ge307XHJcblx0XHR2YXIgZWwgPSAhWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kID8gZGF0YS5jb250YWlubWVudCA6IGpRdWVyeSh3aW5kb3cpO1xyXG5cclxuXHRcdHdpbi53aWR0aCA9IGVsLndpZHRoKCk7XHJcblx0XHR3aW4uaGVpZ2h0ID0gZWwuaGVpZ2h0KCk7XHJcblxyXG5cdFx0dmFyIG1hcmdpbiA9IDI0O1xyXG5cdFx0dmFyIHZpZCA9IHt9O1xyXG5cdFx0dmlkLndpZHRoID0gd2luLndpZHRoICsgKCh3aW4ud2lkdGggKiBtYXJnaW4pIC8gMTAwKTtcclxuXHRcdHZpZC5oZWlnaHQgPSBkYXRhLnJhdGlvID09IFwiMTYvOVwiID8gTWF0aC5jZWlsKCg5ICogd2luLndpZHRoKSAvIDE2KSA6IE1hdGguY2VpbCgoMyAqIHdpbi53aWR0aCkgLyA0KTtcclxuXHRcdHZpZC5tYXJnaW5Ub3AgPSAtKCh2aWQuaGVpZ2h0IC0gd2luLmhlaWdodCkgLyAyKTtcclxuXHRcdHZpZC5tYXJnaW5MZWZ0ID0gLSgod2luLndpZHRoICogKG1hcmdpbiAvIDIpKSAvIDEwMCk7XHJcblxyXG5cdFx0aWYgKHZpZC5oZWlnaHQgPCB3aW4uaGVpZ2h0KSB7XHJcblx0XHRcdHZpZC5oZWlnaHQgPSB3aW4uaGVpZ2h0ICsgKCh3aW4uaGVpZ2h0ICogbWFyZ2luKSAvIDEwMCk7XHJcblx0XHRcdHZpZC53aWR0aCA9IGRhdGEucmF0aW8gPT0gXCIxNi85XCIgPyBNYXRoLmZsb29yKCgxNiAqIHdpbi5oZWlnaHQpIC8gOSkgOiBNYXRoLmZsb29yKCg0ICogd2luLmhlaWdodCkgLyAzKTtcclxuXHRcdFx0dmlkLm1hcmdpblRvcCA9IC0oKHdpbi5oZWlnaHQgKiAobWFyZ2luIC8gMikpIC8gMTAwKTtcclxuXHRcdFx0dmlkLm1hcmdpbkxlZnQgPSAtKCh2aWQud2lkdGggLSB3aW4ud2lkdGgpIC8gMik7XHJcblx0XHR9XHJcblx0XHRwbGF5ZXJCb3guY3NzKHt3aWR0aDogdmlkLndpZHRoLCBoZWlnaHQ6IHZpZC5oZWlnaHQsIG1hcmdpblRvcDogdmlkLm1hcmdpblRvcCwgbWFyZ2luTGVmdDogdmlkLm1hcmdpbkxlZnR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0alF1ZXJ5LnNodWZmbGUgPSBmdW5jdGlvbihhcnIpIHtcclxuXHRcdHZhciBuZXdBcnJheSA9IGFyci5zbGljZSgpO1xyXG5cdFx0dmFyIGxlbiA9IG5ld0FycmF5Lmxlbmd0aDtcclxuXHRcdHZhciBpID0gbGVuO1xyXG5cdFx0d2hpbGUgKGktLSkge1xyXG5cdFx0XHR2YXIgcCA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkqbGVuKTtcclxuXHRcdFx0dmFyIHQgPSBuZXdBcnJheVtpXTtcclxuXHRcdFx0bmV3QXJyYXlbaV0gPSBuZXdBcnJheVtwXTtcclxuXHRcdFx0bmV3QXJyYXlbcF0gPSB0O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ld0FycmF5O1xyXG5cdFx0fTtcclxuXHJcblx0XHRqUXVlcnkuZm4ubWJfWVRQbGF5ZXIgPSBqUXVlcnkubWJZVFBsYXllci5idWlsZFBsYXllcjtcclxuXHRcdGpRdWVyeS5mbi5ZVFBsYXlsaXN0ID0galF1ZXJ5Lm1iWVRQbGF5ZXIuWVRQbGF5bGlzdDtcclxuXHRcdGpRdWVyeS5mbi5wbGF5TmV4dCA9IGpRdWVyeS5tYllUUGxheWVyLnBsYXlOZXh0O1xyXG5cdFx0alF1ZXJ5LmZuLmNoYW5nZU1vdmllID0galF1ZXJ5Lm1iWVRQbGF5ZXIuY2hhbmdlTW92aWU7XHJcblx0XHRqUXVlcnkuZm4uZ2V0VmlkZW9JRCA9IGpRdWVyeS5tYllUUGxheWVyLmdldFZpZGVvSUQ7XHJcblx0XHRqUXVlcnkuZm4uZ2V0UGxheWVyID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0UGxheWVyO1xyXG5cdFx0alF1ZXJ5LmZuLnBsYXllckRlc3Ryb3kgPSBqUXVlcnkubWJZVFBsYXllci5wbGF5ZXJEZXN0cm95O1xyXG5cdFx0alF1ZXJ5LmZuLmZ1bGxzY3JlZW4gPSBqUXVlcnkubWJZVFBsYXllci5mdWxsc2NyZWVuO1xyXG5cdFx0alF1ZXJ5LmZuLmJ1aWxkWVRQQ29udHJvbHMgPSBqUXVlcnkubWJZVFBsYXllci5idWlsZFlUUENvbnRyb2xzO1xyXG5cdFx0alF1ZXJ5LmZuLnBsYXlZVFAgPSBqUXVlcnkubWJZVFBsYXllci5wbGF5WVRQO1xyXG5cdFx0alF1ZXJ5LmZuLnRvZ2dsZUxvb3BzID0galF1ZXJ5Lm1iWVRQbGF5ZXIudG9nZ2xlTG9vcHM7XHJcblx0XHRqUXVlcnkuZm4uc3RvcFlUUCA9IGpRdWVyeS5tYllUUGxheWVyLnN0b3BZVFA7XHJcblx0XHRqUXVlcnkuZm4ucGF1c2VZVFAgPSBqUXVlcnkubWJZVFBsYXllci5wYXVzZVlUUDtcclxuXHRcdGpRdWVyeS5mbi5tdXRlWVRQVm9sdW1lID0galF1ZXJ5Lm1iWVRQbGF5ZXIubXV0ZVlUUFZvbHVtZTtcclxuXHRcdGpRdWVyeS5mbi51bm11dGVZVFBWb2x1bWUgPSBqUXVlcnkubWJZVFBsYXllci51bm11dGVZVFBWb2x1bWU7XHJcblx0XHRqUXVlcnkuZm4uc2V0WVRQVm9sdW1lID0galF1ZXJ5Lm1iWVRQbGF5ZXIuc2V0WVRQVm9sdW1lO1xyXG5cdFx0alF1ZXJ5LmZuLnNldFZpZGVvUXVhbGl0eSA9IGpRdWVyeS5tYllUUGxheWVyLnNldFZpZGVvUXVhbGl0eTtcclxuXHRcdGpRdWVyeS5mbi5tYW5hZ2VZVFBQcm9ncmVzcyA9IGpRdWVyeS5tYllUUGxheWVyLm1hbmFnZVlUUFByb2dyZXNzO1xyXG5cclxuXHRcdH0pKGpRdWVyeSk7XHJcbiJdLCJmaWxlIjoibWIuWVRQbGF5ZXIzLmpzIn0=
