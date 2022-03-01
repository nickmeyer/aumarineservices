

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



var ytp = ytp || {};

function onYouTubeIframeAPIReady() {
	if (ytp.YTAPIReady)
		return;
	ytp.YTAPIReady = true;
	jQuery(document).trigger('YTAPIReady')
}

let getYTPVideoID = function (url) {
	let videoID, playlistID;
	if (url.indexOf('youtu.be') > 0 || url.indexOf('youtube.com/embed') > 0) {
		videoID = url.substr(url.lastIndexOf('/') + 1, url.length);
		playlistID = videoID.indexOf('?list=') > 0 ? videoID.substr(videoID.lastIndexOf('='), videoID.length) : null;
		videoID = playlistID ? videoID.substr(0, videoID.lastIndexOf('?')) : videoID
	} else if (url.indexOf('http') > -1) {
		//videoID = url.match( /([\/&]v\/([^&#]*))|([\\?&]v=([^&#]*))/ )[ 1 ];
		videoID = url.match(/[\\?&]v=([^&#]*)/)[1];
		playlistID = url.indexOf('list=') > 0 ? url.match(/[\\?&]list=([^&#]*)/)[1] : null
	} else {
		videoID = url.length > 15 ? null : url;
		playlistID = videoID ? null : url
	}
	return {
		videoID   : videoID,
		playlistID: playlistID
	}
};

function iOSversion() {
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		let v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)]
	}
}

(function (jQuery, ytp) {

	jQuery.mbYTPlayer = {
		name   : 'jquery.mb.YTPlayer',
		version: '{{ version }}',
		build  : '{{ buildnum }}',
		author : 'Matteo Bicocchi (pupunzi)',
		apiKey : '',

		/*
		 * Default options for the player
		 */
		defaults        : {
			videoURL: null,
			containment: 'body',
			ratio: 'auto',
			fadeOnStartTime: 1000,
			startAt: 0,
			stopAt: 0,
			autoPlay: true,
			coverImage: false,
			loop: true,
			addRaster: false,
			mask: false,
			opacity: 1,
			quality: 'default',
			vol: 50,
			mute: false,
			showControls: true,
			anchor: 'center,center',
			showAnnotations: false,
			cc_load_policy: false,
			showYTLogo: false,
			useOnMobile: true,
			playOnlyIfVisible: false,
			onScreenPercentage: 30,
			goFullScreenOnPlay: false,
			stopMovieOnBlur: true,
			realFullscreen: true,
			optimizeDisplay: true,
			abundance: 0.3,
			gaTrack: true,
			remember_last_time: false,
			addFilters: false,
			onReady: function (player) {
			},

			onError: function (player, err) {
			},

			onEnd: function () {
			}
		},
		/**
		 *  @fontface icons
		 *  */
		controls        : {
			play    : 'P',
			pause   : 'p',
			mute    : 'M',
			unmute  : 'A',
			onlyYT  : 'O',
			showSite: 'R',
			ytLogo  : 'Y'
		},

    rasterImg      : "images/raster.png",
		rasterImgRetina: "images/raster@2x.png",
		controlBar      : null,
		locationProtocol: 'https:',

		/**
		 * Applicable filters
		 */
		defaultFilters: {
			grayscale : {value: 0, unit: '%'},
			hue_rotate: {value: 0, unit: 'deg'},
			invert    : {value: 0, unit: '%'},
			opacity   : {value: 0, unit: '%'},
			saturate  : {value: 0, unit: '%'},
			sepia     : {value: 0, unit: '%'},
			brightness: {value: 0, unit: '%'},
			contrast  : {value: 0, unit: '%'},
			blur      : {value: 0, unit: 'px'}
		},

		/**
		 * build the player
		 * @param options
		 * @returns [players]
		 */
		buildPlayer: function (options) {

			if (!ytp.YTAPIReady && typeof window.YT === 'undefined') {
				jQuery('#YTAPI').remove();
				let tag = jQuery('<script>').attr({
					'src': 'https://www.youtube.com/iframe_api?v=' + jQuery.mbYTPlayer.version,
					'id' : 'YTAPI'
				});
				jQuery('head').prepend(tag)
			} else {
				setTimeout(function () {
					jQuery(document).trigger('YTAPIReady');
					ytp.YTAPIReady = true
				}, 100)
			}

			function isIframe() {
				let isIfr = false;
				try {
					if (self.location.href !== top.location.href) isIfr = true
				} catch (e) {
					isIfr = true
				}
				return isIfr
			}

			console.time('YTPlayerInit');
			console.time('YTPlayerStartPlay');

			return this.each(function () {
				let YTPlayer = this;
				let $YTPlayer = jQuery(YTPlayer);
				$YTPlayer.hide();
				YTPlayer.loop = 0;
				YTPlayer.state = 0;
				YTPlayer.filters = jQuery.extend(true, {}, jQuery.mbYTPlayer.defaultFilters);
				YTPlayer.filtersEnabled = true;
				YTPlayer.id = YTPlayer.id || 'YTP_' + new Date().getTime();
				$YTPlayer.addClass('mb_YTPlayer');

				/**
				 Set properties
				 */
				let property = $YTPlayer.data('property') && typeof $YTPlayer.data('property') == 'string' ?
						eval('(' + $YTPlayer.data('property') + ')') :
						$YTPlayer.data('property');

				if (typeof property !== 'object')
					property = {};

				YTPlayer.opt = jQuery.extend(true, {}, jQuery.mbYTPlayer.defaults, YTPlayer.opt, options, property);

				YTPlayer.opt.elementId = YTPlayer.id;

				if (YTPlayer.opt.vol === 0) {
					YTPlayer.opt.vol = 1;
					YTPlayer.opt.mute = true
				}

				/**
				 * If autoPlay is set to true and  mute is set to false
				 * Webkit browser will not auto-play
				 * Start playing after the first click
				 */
				if (YTPlayer.opt.autoPlay && YTPlayer.opt.mute === false && jQuery.mbBrowser.chrome) {
					//YTPlayer.opt.mute = true;
					jQuery(document).one('mousedown.YTPstart', function () {
						$YTPlayer.YTPPlay()
					});
					console.info('YTPlayer info: On Webkit browsers you can not autoplay the video if the audio is on.')
				}

				if (YTPlayer.opt.loop && typeof YTPlayer.opt.loop === 'boolean') {
					YTPlayer.opt.loop = 9999
				}

				/**
				 Disable fullScreen if is in an iframe or full-screen API is not available
				 */
				let fullScreenAvailable = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
				YTPlayer.opt.realFullscreen = isIframe() || !fullScreenAvailable ? false : YTPlayer.opt.realFullscreen;

				/**
				 Manage annotations
				 */
				YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? '1' : '3';

				/**
				 Manage show subtitle and caption
				 */
				YTPlayer.opt.cc_load_policy = YTPlayer.opt.cc_load_policy ? '1' : '0';

				/**
				 Manage cover image
				 */
				YTPlayer.opt.coverImage = YTPlayer.opt.coverImage || YTPlayer.opt.backgroundImage;

				/**
				 Manage Quality
				 the setPlaybackQuality has been deprecated by YT
				 */
				YTPlayer.opt.quality = 'default';

				/**
				 * todo: remove
				 Manage Opacity for IE < 10
				 */
				if (jQuery.mbBrowser.msie && jQuery.mbBrowser.version < 9)
					YTPlayer.opt.opacity = 1;

				YTPlayer.opt.containment = YTPlayer.opt.containment === 'self' ? $YTPlayer : jQuery(YTPlayer.opt.containment);
				YTPlayer.isRetina = (window.retina || window.devicePixelRatio > 1);

				YTPlayer.opt.ratio = YTPlayer.opt.ratio === 'auto' ? 16 / 9 : YTPlayer.opt.ratio;
				YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio);

				let origContainmentBackground = YTPlayer.opt.containment.css('background-image');
				origContainmentBackground = (origContainmentBackground === 'none') ? null : origContainmentBackground;
				YTPlayer.orig_containment_background = origContainmentBackground;

				if (!$YTPlayer.attr('id'))
					$YTPlayer.attr('id', 'ytp_' + new Date().getTime());

				YTPlayer.playerID = 'iframe_' + YTPlayer.id;

				YTPlayer.isAlone = false;
				YTPlayer.hasFocus = true;
				YTPlayer.videoID = YTPlayer.opt.videoURL ?
						getYTPVideoID(YTPlayer.opt.videoURL).videoID : $YTPlayer.attr('href') ?
								getYTPVideoID($YTPlayer.attr('href')).videoID :
								false;

				/**
				 Check if it is a video list
				 */
				YTPlayer.playlistID = YTPlayer.opt.videoURL ?
						getYTPVideoID(YTPlayer.opt.videoURL).playlistID : $YTPlayer.attr('href') ?
								getYTPVideoID($YTPlayer.attr('href')).playlistID :
								false;

				let start_from_last = 0;
				if (jQuery.mbCookie.get('YTPlayer_start_from' + YTPlayer.videoID))
					start_from_last = parseFloat(jQuery.mbCookie.get('YTPlayer_start_from' + YTPlayer.videoID));
				if (YTPlayer.opt.remember_last_time && start_from_last) {
					YTPlayer.start_from_last = start_from_last;
					jQuery.mbCookie.remove('YTPlayer_start_from' + YTPlayer.videoID)
				}

				YTPlayer.isPlayer = $YTPlayer.is(YTPlayer.opt.containment);
				YTPlayer.isBackground = YTPlayer.opt.containment.is('body');

				if (YTPlayer.isBackground && ytp.backgroundIsInited)
					return;

				/**
				 Hide the placeholder if it's not the target of the player
				 */
				if (YTPlayer.isPlayer)
					$YTPlayer.show();

				/**
				 create the overlay
				 */
				YTPlayer.overlay = jQuery('<div/>').css({
					position: 'absolute',
					top     : 0,
					left    : 0,
					width   : '100%',
					height  : '100%'
				}).addClass('YTPOverlay');

				$YTPlayer.changeCoverImage();
				/*
								if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
									let bgndURL = YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background
									if (bgndURL)
										YTPlayer.opt.containment.css({
											background      : bgndURL,
											backgroundSize  : 'cover',
											backgroundRepeat: 'no-repeat'
										})
								}
				*/

				/**
				 create the wrapper
				 */
				YTPlayer.wrapper = jQuery('<div/>').attr('id', 'wrapper_' + YTPlayer.id).css({
					position : 'absolute',
					zIndex   : 0,
					minWidth : '100%',
					minHeight: '100%',
					left     : 0,
					top      : 0,
					overflow : 'hidden',
					opacity  : 0
				}).addClass('mbYTP_wrapper');

				/**
				 If is an inline player toggle play if the overlay is clicked
				 */
				if (YTPlayer.isPlayer) {
					let inlinePlayButtonCss = jQuery.browser.mobile ? "inlinePlayButtonMobile" : "inlinePlayButton";
					YTPlayer.inlinePlayButton = jQuery('<div/>').addClass('inlinePlayButton').html(jQuery.mbYTPlayer.controls.play);
					$YTPlayer.append(YTPlayer.inlinePlayButton);
					YTPlayer.inlinePlayButton.on('click', function (e) {

						$YTPlayer.YTPPlay();
						/**
						 * Hide the PLAY button on play
						 */
						YTPlayer.inlinePlayButton.hide();

						/**
						 * set the fullscreen on play
						 */
						if (YTPlayer.opt.goFullScreenOnPlay) {
							$YTPlayer.YTPFullscreen();
						}

						e.stopPropagation()
					});

					if (YTPlayer.opt.autoPlay)
						YTPlayer.inlinePlayButton.hide();

					YTPlayer.overlay.on('click', function () {
						$YTPlayer.YTPTogglePlay();

						if (YTPlayer.opt.goFullScreenOnPlay) {
							$YTPlayer.YTPFullscreen();
						}

					}).css({cursor: 'pointer'})

				}

				/**
				 create the playerBox where the YT iframe will be placed
				 */
				let playerBox = jQuery('<div/>').attr('id', YTPlayer.playerID).addClass('playerBox');
				playerBox.css({
					position: 'absolute',
					zIndex  : 0,
					width   : '100%',
					height  : '100%',
					top     : 0,
					left    : 0,
					overflow: 'hidden',
					opacity : 1
				});

				YTPlayer.wrapper.append(playerBox);
				playerBox.after(YTPlayer.overlay);

				if (YTPlayer.isPlayer) {
					YTPlayer.inlineWrapper = jQuery('<div/>').addClass('inline-YTPlayer');

					YTPlayer.inlineWrapper.css({
						position: 'relative',
						maxWidth: YTPlayer.opt.containment.css('width')
					});

					YTPlayer.opt.containment.css({
						position     : 'relative',
						paddingBottom: '56.25%',
						overflow     : 'hidden',
						height       : 0
					});
					YTPlayer.opt.containment.wrap(YTPlayer.inlineWrapper)
				}

				/**
				 Loop all the elements inside the container and check if their position is not "static"
				 */
				YTPlayer.opt.containment.children().not('script, style').each(function () {
					if (jQuery(this).css('position') === 'static')
						jQuery(this).css('position', 'relative')
				});

				if (YTPlayer.isBackground) {
					jQuery('body').css({
						boxSizing: 'border-box'
					});

					YTPlayer.wrapper.css({
						position: 'fixed',
						top     : 0,
						left    : 0,
						zIndex  : 0
					})

				} else if (YTPlayer.opt.containment.css('position') === 'static') {

					YTPlayer.opt.containment.css({
						position: 'relative'
					});
					$YTPlayer.show()
				}
				YTPlayer.opt.containment.prepend(YTPlayer.wrapper);

				if (!YTPlayer.isBackground) {
					YTPlayer.overlay.on('mouseenter', function () {
						if (YTPlayer.controlBar && YTPlayer.controlBar.length)
							YTPlayer.controlBar.addClass('visible')
					}).on('mouseleave', function () {
						if (YTPlayer.controlBar && YTPlayer.controlBar.length)
							YTPlayer.controlBar.removeClass('visible')
					})
				}

				if (jQuery.mbBrowser.mobile && !YTPlayer.opt.useOnMobile) {
					if (YTPlayer.opt.coverImage) {
						YTPlayer.wrapper.css({
							backgroundImage   : 'url(' + YTPlayer.opt.coverImage + ')',
							backgroundPosition: 'center center',
							backgroundSize    : 'cover',
							backgroundRepeat  : 'no-repeat',
							opacity           : 1
						});

						YTPlayer.wrapper.css({opacity: 1})
					}
					return $YTPlayer
				}

				/**
				 If is on device start playing on first touch
				 */
				if (jQuery.mbBrowser.mobile && YTPlayer.opt.autoPlay && YTPlayer.opt.useOnMobile)
					jQuery('body').one('touchstart', function () {
						YTPlayer.player.playVideo()
					});

				jQuery(document).one('YTAPIReady', function () {
					$YTPlayer.trigger('YTAPIReady_' + YTPlayer.id);
					ytp.YTAPIReady = true
				});

				YTPlayer.isOnScreen = jQuery.mbYTPlayer.isOnScreen(YTPlayer, YTPlayer.opt.onScreenPercentage);

				$YTPlayer.one('YTAPIReady_' + YTPlayer.id, function () {

					let YTPlayer = this;
					let $YTPlayer = jQuery(YTPlayer);

					if ((YTPlayer.isBackground && ytp.backgroundIsInited) || YTPlayer.isInit)
						return;

					if (YTPlayer.isBackground)
						ytp.backgroundIsInited = true;

					YTPlayer.opt.autoPlay = typeof YTPlayer.opt.autoPlay == 'undefined' ? (!!YTPlayer.isBackground) : YTPlayer.opt.autoPlay;
					YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100;

					jQuery.mbYTPlayer.getDataFromAPI(YTPlayer);

					jQuery(YTPlayer).on('YTPChanged', function (e) {

						if (YTPlayer.isInit)
							return;

						YTPlayer.isInit = true;

						/** Initialize the YT player ------------------------------------
						 * Youtube player variables
						 * @type {{modestbranding: number, autoplay: number, controls: number, showinfo: number, rel: number, enablejsapi: number, version: number, playerapiid: string, origin: string, allowfullscreen: boolean, iv_load_policy: (string|*|jQuery.mbYTPlayer.opt.showAnnotations), playsinline: number}}
						 */
						let playerVars = {
							'modestbranding' : 1,
							'autoplay'       : 0,
							'controls'       : 0,
							'showinfo'       : 0,
							'rel'            : 0,
							'enablejsapi'    : 1,
							'version'        : 3,
							'playerapiid'    : YTPlayer.playerID,
							'origin'         : '*',
							'allowfullscreen': true,
							'wmode'          : 'transparent',
							'iv_load_policy' : YTPlayer.opt.showAnnotations,
							'cc_load_policy' : YTPlayer.opt.cc_load_policy,
							'playsinline'    : jQuery.mbBrowser.mobile && !YTPlayer.isPlayer ? 1 : 0,

							/**
							 Check if the browser can play HTML5 videos
							 */
							'html5': document.createElement('video').canPlayType ? 1 : 0
						};

						new YT.Player(YTPlayer.playerID, {
							//videoId: YTPlayer.videoID.toString(),
							playerVars: playerVars,
							events    : {
								'onReady'                : function (event) {

									YTPlayer.player = event.target;

									//todo: make playlist works
									/* if (YTPlayer.playlistID && YTPlayer.apiKey) {
										YTPlayer.isList = true;
										YTPlayer.videos = [];
										YTPlayer.player.cuePlaylist({
											listType: 'playlist',
											list: YTPlayer.playlistID.toString(),
											startSeconds: YTPlayer.opt.startAt,
											endSeconds: YTPlayer.opt.stopAt,
											suggestedQuality: YTPlayer.opt.quality
										});
										}
										 else { */

									YTPlayer.player.loadVideoById({
										videoId         : YTPlayer.videoID.toString(),
										// startSeconds: YTPlayer.start_from_last || YTPlayer.opt.startAt,
										// endSeconds: YTPlayer.opt.stopAt,
										suggestedQuality: YTPlayer.opt.quality
									});

									/*}*/

									$YTPlayer.trigger('YTPlayerIsReady_' + YTPlayer.id)
								},
								/**
								 * on State Change
								 * @param event
								 *
								 * -1 (unstarted)
								 * 0 (ended)
								 * 1 (playing)
								 * 2 (paused)
								 * 3 (buffering)
								 * 5 (video cued)
								 */
								'onStateChange'          : function (event) {

									if (typeof event.target.getPlayerState != 'function')
										return;

									let state = event.target.getPlayerState();

									if (YTPlayer.preventTrigger || YTPlayer.isStarting) {
										YTPlayer.preventTrigger = false;
										return
									}

									YTPlayer.state = state;
									// console.debug(YTPlayer.state);

									/*
																		if (event.data === YT.PlayerState.PLAYING) {
																			// console.debug('YTPlayer.opt.quality', YTPlayer.opt.quality)
																		//	event.target.setPlaybackQuality(YTPlayer.opt.quality)
																			event.target.setPlaybackQuality('default')
																		}
									*/

									// console.debug('YTPGetVideoQuality', jQuery(YTPlayer).YTPGetVideoQuality());

									let eventType;
									switch (state) {

											/** unstarted */
										case -1:
											eventType = 'YTPUnstarted';
											break;

											/** unstarted */
										case 0:
											eventType = 'YTPRealEnd';
											break;

											/** play */
										case 1:
											eventType = 'YTPPlay';
											if (YTPlayer.controlBar.length)
												YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.pause);

											if (YTPlayer.isPlayer)
												YTPlayer.inlinePlayButton.hide();

											jQuery(document).off('mousedown.YTPstart');
											break;

											/** pause */
										case 2:
											eventType = 'YTPPause';
											if (YTPlayer.controlBar.length)
												YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play);

											if (YTPlayer.isPlayer)
												YTPlayer.inlinePlayButton.show();
											break;

											/** buffer */
										case 3:
											// YTPlayer.player.setPlaybackQuality('default');
											// YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality);
											eventType = 'YTPBuffering';
											if (YTPlayer.controlBar.length)
												YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play);
											break;

											/** cued */
										case 5:
											eventType = 'YTPCued';
											break;

										default:
											break
									}

									/**
									 Trigger state events
									 */
									let YTPEvent = jQuery.Event(eventType);
									YTPEvent.time = YTPlayer.currentTime;
									jQuery(YTPlayer).trigger(YTPEvent)
								},
								/**
								 * onPlaybackQualityChange
								 * @param e
								 */
								'onPlaybackQualityChange': function (e) {
									let quality = e.target.getPlaybackQuality();
									let YTPQualityChange = jQuery.Event('YTPQualityChange');
									YTPQualityChange.quality = quality;
									jQuery(YTPlayer).trigger(YTPQualityChange)
								},
								/**
								 * onError
								 * @param err
								 *
								 2 – The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
								 5 – The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
								 100 – The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
								 101 – The owner of the requested video does not allow it to be played in embedded players.
								 150 – This error is the same as 101. It's just a 101 error in disguise!
								 */
								'onError'                : function (err) {

									if (typeof YTPlayer.opt.onError == 'function')
										YTPlayer.opt.onError($YTPlayer, err);

									console.debug("error:", err);

									switch (err.data) {
										case 2:
											console.error('video ID:: ' + YTPlayer.videoID + ': The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.');
											break;
										case 5:
											console.error('video ID:: ' + YTPlayer.videoID + ': The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.');
											break;
										case 100:
											console.error('video ID:: ' + YTPlayer.videoID + ': The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.');
											break;
										case 101:
										case 150:
											console.error('video ID:: ' + YTPlayer.videoID + ': The video doesn\'t exist or The owner does not allow it to be played in embedded players.');
											break
									}

									if (YTPlayer.isList)
										jQuery(YTPlayer).YTPPlayNext()

								}
							}
						});

						$YTPlayer.on('YTPlayerIsReady_' + YTPlayer.id, function () {

							if (YTPlayer.isReady)
								return this;

							YTPlayer.playerEl = YTPlayer.player.getIframe();
							jQuery(YTPlayer.playerEl).unselectable();
							$YTPlayer.optimizeDisplay();

							/**
							 * Optimize display on resize
							 */
							jQuery(window).off('resize.YTP_' + YTPlayer.id).on('resize.YTP_' + YTPlayer.id, function () {
								$YTPlayer.optimizeDisplay()
							});

							/**
							 * Optimize display on orientation change
							 */
							jQuery(window).off('orientationchange.YTP_' + YTPlayer.id).on('orientationchange.YTP_' + YTPlayer.id, function () {
								// setTimeout(function (){
								//console.debug('orientationchange')
								$YTPlayer.optimizeDisplay()
								// },1)
							});

							/**
							 * Set the time of the last visit progress
							 */
							if (YTPlayer.opt.remember_last_time) {
								jQuery(window).on('unload.YTP_' + YTPlayer.id, function () {
									let current_time = YTPlayer.player.getCurrentTime();
									jQuery.mbCookie.set('YTPlayer_start_from' + YTPlayer.videoID, current_time, 0)
								})
							}

							$YTPlayer.YTPCheckForState()

						})
					})
				});

				$YTPlayer.off('YTPTime.mask');
				jQuery.mbYTPlayer.applyMask(YTPlayer);

				console.timeEnd('YTPlayerInit')
			})
		},

		/**
		 *
		 * @param YTPlayer
		 * @param perc
		 * @returns {boolean}
		 */
		isOnScreen: function (YTPlayer, perc) {
			perc = perc || 10;
			let playerBox = YTPlayer.wrapper;
			let winTop = jQuery(window).scrollTop();
			let winBottom = winTop + jQuery(window).height();

			let margin = (playerBox.height() * perc) / 100;
			let elTop = playerBox.offset().top + margin;
			let elBottom = playerBox.offset().top + (playerBox.height() - margin);

			return ((elBottom <= winBottom) && (elTop >= winTop))
		},

		/**
		 * getDataFromAPI
		 * @param YTPlayer
		 */
		getDataFromAPI: function (YTPlayer) {

			YTPlayer.videoData = jQuery.mbStorage.get('YTPlayer_data_' + YTPlayer.videoID);
			if (YTPlayer.videoData) {
				setTimeout(function () {
					YTPlayer.dataReceived = true;

					let YTPChanged = jQuery.Event('YTPChanged');
					YTPChanged.time = YTPlayer.currentTime;
					YTPChanged.videoId = YTPlayer.videoID;
					YTPChanged.opt = YTPlayer.opt;

					//console.debug("videoData:",YTPlayer.videoData)

					jQuery(YTPlayer).trigger(YTPChanged);

					let YTPData = jQuery.Event('YTPData');
					YTPData.prop = {};

					for (let x in YTPlayer.videoData)
						if (YTPlayer.videoData.hasOwnProperty(x))
							YTPData.prop[x] = YTPlayer.videoData[x];

					jQuery(YTPlayer).trigger(YTPData)

				}, YTPlayer.opt.fadeOnStartTime);

				YTPlayer.hasData = true

			} else if (jQuery.mbYTPlayer.apiKey) {

				/**
				 * Get video info from API3 (needs api key)
				 * snippet,player,contentDetails,statistics,status
				 */

				jQuery.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + YTPlayer.videoID + '&key=' + jQuery.mbYTPlayer.apiKey + '&part=snippet', function (data) {
					YTPlayer.dataReceived = true;

					let YTPChanged = jQuery.Event('YTPChanged');
					YTPChanged.time = YTPlayer.currentTime;
					YTPChanged.videoId = YTPlayer.videoID;
					jQuery(YTPlayer).trigger(YTPChanged);

					function parseYTPlayer_data(data) {
						YTPlayer.videoData = {};
						YTPlayer.videoData.id = YTPlayer.videoID;
						YTPlayer.videoData.channelTitle = data.channelTitle;
						YTPlayer.videoData.title = data.title;
						YTPlayer.videoData.description = data.description.length < 400 ? data.description : data.description.substring(0, 400) + ' ...';
						YTPlayer.videoData.thumb_max = data.thumbnails.maxres ? data.thumbnails.maxres.url : null;
						YTPlayer.videoData.thumb_high = data.thumbnails.high ? data.thumbnails.high.url : null;
						YTPlayer.videoData.thumb_medium = data.thumbnails.medium ? data.thumbnails.medium.url : null;
						jQuery.mbStorage.set('YTPlayer_data_' + YTPlayer.videoID, YTPlayer.videoData)
					}

					if (!data.items[0]) {
						YTPlayer.videoData = {};
						YTPlayer.hasData = false
					} else {
						parseYTPlayer_data(data.items[0].snippet);
						YTPlayer.hasData = true
					}

					let YTPData = jQuery.Event('YTPData');
					YTPData.prop = {};
					for (let x in YTPlayer.videoData) YTPData.prop[x] = YTPlayer.videoData[x];
					jQuery(YTPlayer).trigger(YTPData)
				})
						.fail(function (jqxhr) {
							console.error("YT data error:: ", jqxhr);
							YTPlayer.hasData = false;

							let YTPChanged = jQuery.Event('YTPChanged');
							YTPChanged.time = YTPlayer.currentTime;
							YTPChanged.videoId = YTPlayer.videoID;
							jQuery(YTPlayer).trigger(YTPChanged)
						})
			} else {

				setTimeout(function () {
					let YTPChanged = jQuery.Event('YTPChanged');
					YTPChanged.time = YTPlayer.currentTime;
					YTPChanged.videoId = YTPlayer.videoID;
					jQuery(YTPlayer).trigger(YTPChanged)
				}, 10);
				YTPlayer.videoData = null
			}

			YTPlayer.opt.ratio = YTPlayer.opt.ratio == 'auto' ? 16 / 9 : YTPlayer.opt.ratio;

			if (YTPlayer.isPlayer && !YTPlayer.opt.autoPlay) { //&& ( !jQuery.mbBrowser.mobile && !jQuery.isTablet )
				YTPlayer.loading = jQuery('<div/>').addClass('loading').html('Loading').hide();
				jQuery(YTPlayer).append(YTPlayer.loading);
				YTPlayer.loading.fadeIn()
			}
		},

		/**
		 * removeStoredData
		 */
		removeStoredData: function () {
			jQuery.mbStorage.remove()
		},

		/**
		 * getVideoData
		 * @returns {*|YTPlayer.videoData}
		 */
		getVideoData: function () {
			let YTPlayer = this.get(0);
			return YTPlayer.videoData
		},

		/**
		 * getVideoID
		 * @returns {*|YTPlayer.videoID|boolean}
		 */
		getVideoID: function () {
			let YTPlayer = this.get(0);
			return YTPlayer.videoID || false
		},

		/**
		 * getPlaylistID
		 * @returns {*|YTPlayer.videoID|boolean}
		 */
		getPlaylistID  : function () {
			let YTPlayer = this.get(0);
			return YTPlayer.playlistID || false
		},
		/**
		 * setVideoQuality
		 * @deprecated
		 *
		 * @param quality
		 * @returns {jQuery.mbYTPlayer}
		 */
		setVideoQuality: function (quality) {

			return this;

			/*
						let YTPlayer = this.get(0);
						jQuery(YTPlayer).YTPPause();
						YTPlayer.opt.quality = quality;
						YTPlayer.player.setPlaybackQuality(quality);
						jQuery(YTPlayer).YTPPlay();
						return this
			*/
		},

		/**
		 * getVideoQuality
		 * @returns {jQuery.mbYTPlayer}
		 */
		getVideoQuality: function () {
			let YTPlayer = this.get(0);
			let quality = YTPlayer.player.getPlaybackQuality();
			return quality
		},

		/**
		 * playlist
		 * @param videos -> Array or String (videoList ID)
		 * @param shuffle
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 *
		 * To retrieve a Youtube playlist the Youtube API key is required:
		 * https://console.developers.google.com/
		 * jQuery.mbYTPlayer.apiKey
		 */
		playlist: function (videos, shuffle, callback) {

			let $YTPlayer = this;
			let YTPlayer = $YTPlayer.get(0);

			/*
			if (typeof videos == "String" && jQuery.mbYTPlayer.apiKey != "") {
				function getVideoListFromYoutube(playListID, page) {
				page = page || '';
				let youtubeAPI = "https://www.googleapis.com/youtube/v3/playlistItems";
				jQuery.getJSON(youtubeAPI, {
					part      : "snippet,contentDetails",
					playlistId: playListID, //You have to enter the PlaylistID
					maxResults: 50,
					pageToken : page,
					key       : jQuery.mbYTPlayer.apiKey //You have to enter your own YoutubeAPIKey
				}).done(function (response) {
					CreateVideosArray(response);
					if (response.nextPageToken) {
					page = response.nextPageToken;
					getVideoListFromYoutube(plID, page, videos);
					} else {
					$YTPlayer.YTPlaylist(YTPlayer.videos, shuffle, callback)
					}
					;
				});
				};

				function CreateVideosArray(response) {
				let k = response.items.length;
				for (let i = 0; i < k; i++) {
					YTPlayer.videos.push({
					"videoURL": response.items[i].contentDetails.videoId
					});
				}
				;
				};

				getVideoListFromYoutube(videos);
				return this;
			}
			*/

			YTPlayer.isList = true;

			if (shuffle)
				videos = jQuery.shuffle(videos);

			if (!YTPlayer.videoID) {
				YTPlayer.videos = videos;
				YTPlayer.videoCounter = 1;
				YTPlayer.videoLength = videos.length;
				jQuery(YTPlayer).data('property', videos[0]);
				jQuery(YTPlayer).YTPlayer()
			}

			if (typeof callback == 'function')
				jQuery(YTPlayer).on('YTPChanged', function () {
					callback(YTPlayer)
				});

			jQuery(YTPlayer).on('YTPEnd', function () {
				jQuery(YTPlayer).YTPPlayNext()
			});
			return this
		},

		/**
		 * playNext
		 * @returns {jQuery.mbYTPlayer}
		 */
		playNext: function () {
			let YTPlayer = this.get(0);
			YTPlayer.videoCounter++;
			if (YTPlayer.videoCounter > YTPlayer.videoLength)
				YTPlayer.videoCounter = 1;
			jQuery(YTPlayer).YTPPlayIndex(YTPlayer.videoCounter);
			return this
		},

		/**
		 * playPrev
		 * @returns {jQuery.mbYTPlayer}
		 */
		playPrev: function () {
			let YTPlayer = this.get(0);
			YTPlayer.videoCounter--;
			if (YTPlayer.videoCounter <= 0)
				YTPlayer.videoCounter = YTPlayer.videoLength;
			jQuery(YTPlayer).YTPPlayIndex(YTPlayer.videoCounter);
			return this
		},

		/**
		 * playIndex
		 * @param idx
		 * @returns {jQuery.mbYTPlayer}
		 */
		playIndex: function (idx) {
			let YTPlayer = this.get(0);
			if (YTPlayer.checkForStartAt) {
				clearInterval(YTPlayer.checkForStartAt);
				clearInterval(YTPlayer.getState)
			}
			YTPlayer.videoCounter = idx;

			if (YTPlayer.videoCounter >= YTPlayer.videoLength)
				YTPlayer.videoCounter = YTPlayer.videoLength;

			let video = YTPlayer.videos[YTPlayer.videoCounter - 1];

			jQuery(YTPlayer).YTPChangeVideo(video);
			return this
		},

		/**
		 * changeVideo
		 * @param opt
		 * @returns {jQuery.mbYTPlayer}
		 */
		changeVideo: function (opt) {
			let $YTPlayer = this;
			let YTPlayer = $YTPlayer.get(0);

			YTPlayer.opt.startAt = 0;
			YTPlayer.opt.stopAt = 0;
			YTPlayer.opt.mask = false;
			YTPlayer.opt.mute = true;
			YTPlayer.opt.autoPlay = true;
			YTPlayer.opt.addFilters = false;
			YTPlayer.opt.coverImage = false;

			YTPlayer.hasData = false;
			YTPlayer.hasChanged = true;

			YTPlayer.player.loopTime = undefined;

			if (opt)
				jQuery.extend(YTPlayer.opt, opt);

			YTPlayer.videoID = getYTPVideoID(YTPlayer.opt.videoURL).videoID;

			if (YTPlayer.opt.loop && typeof YTPlayer.opt.loop == 'boolean')
				YTPlayer.opt.loop = 9999;

			YTPlayer.wrapper.css({
				background: 'none'
			});

			jQuery(YTPlayer.playerEl).CSSAnimate({
				opacity: 0
			}, YTPlayer.opt.fadeOnStartTime, function () {

				jQuery.mbYTPlayer.getDataFromAPI(YTPlayer);

				$YTPlayer.YTPGetPlayer().loadVideoById({
					videoId         : YTPlayer.videoID,
					// startSeconds: YTPlayer.opt.startAt,
					// endSeconds: YTPlayer.opt.stopAt,
					suggestedQuality: YTPlayer.opt.quality
				});

				$YTPlayer.YTPPause();
				$YTPlayer.optimizeDisplay();

				if (YTPlayer.checkForStartAt) {
					clearInterval(YTPlayer.checkForStartAt);
					clearInterval(YTPlayer.getState)
				}
				$YTPlayer.YTPCheckForState()
			});

			let YTPChangeVideo = jQuery.Event('YTPChangeVideo');
			YTPChangeVideo.time = YTPlayer.currentTime;
			jQuery(YTPlayer).trigger(YTPChangeVideo);

			jQuery.mbYTPlayer.applyMask(YTPlayer);

			return this
		},

		/**
		 * getPlayer
		 * @returns {player}
		 */
		getPlayer: function () {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return null;

			return YTPlayer.player || null
		},

		/**
		 * playerDestroy
		 * @returns {jQuery.mbYTPlayer}
		 */
		playerDestroy: function () {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			ytp.YTAPIReady = true;
			ytp.backgroundIsInited = false;
			YTPlayer.isInit = false;
			YTPlayer.videoID = null;
			YTPlayer.isReady = false;
			YTPlayer.wrapper.remove();
			jQuery('#controlBar_' + YTPlayer.id).remove();
			clearInterval(YTPlayer.checkForStartAt);
			clearInterval(YTPlayer.getState);
			return this
		},

		/**
		 * fullscreen
		 * @param real
		 * @returns {jQuery.mbYTPlayer}
		 */
		fullscreen: function (real) {
			let YTPlayer = this.get(0);

			if (typeof real == 'undefined')
				real = eval(YTPlayer.opt.realFullscreen);

			let controls = jQuery('#controlBar_' + YTPlayer.id);
			let fullScreenBtn = controls.find('.mb_OnlyYT');
			let videoWrapper = YTPlayer.isPlayer ? YTPlayer.opt.containment : YTPlayer.wrapper;

			if (real) {
				let fullscreenchange = jQuery.mbBrowser.mozilla ? 'mozfullscreenchange' : jQuery.mbBrowser.webkit ? 'webkitfullscreenchange' : 'fullscreenchange';
				jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
					let isFullScreen = RunPrefixMethod(document, 'IsFullScreen') || RunPrefixMethod(document, 'FullScreen');
					if (!isFullScreen) {
						YTPlayer.isAlone = false;
						fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT);
						//jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality);
						videoWrapper.removeClass('YTPFullscreen');
						videoWrapper.CSSAnimate({
							opacity: YTPlayer.opt.opacity
						}, YTPlayer.opt.fadeOnStartTime);

						videoWrapper.css({
							zIndex: 0
						});

						if (YTPlayer.isBackground) {
							jQuery('body').after(controls)
						} else {
							YTPlayer.wrapper.before(controls)
						}
						jQuery(window).resize();
						jQuery(YTPlayer).trigger('YTPFullScreenEnd')

					} else {

						//jQuery(YTPlayer).YTPSetVideoQuality('default');
						jQuery(YTPlayer).trigger('YTPFullScreenStart')

					}
				})
			}
			if (!YTPlayer.isAlone) {
				function hideMouse() {
					YTPlayer.overlay.css({
						cursor: 'none'
					})
				}

				jQuery(document).on('mousemove.YTPlayer', function (e) {
					YTPlayer.overlay.css({
						cursor: 'auto'
					});
					clearTimeout(YTPlayer.hideCursor);
					if (!jQuery(e.target).parents().is('.mb_YTPBar'))
						YTPlayer.hideCursor = setTimeout(hideMouse, 3000)
				});

				hideMouse();

				if (real) {
					videoWrapper.css({
						opacity: 0
					});
					videoWrapper.addClass('YTPFullscreen');
					launchFullscreen(videoWrapper.get(0));

					setTimeout(function () {
						videoWrapper.CSSAnimate({
							opacity: 1
						}, YTPlayer.opt.fadeOnStartTime * 2);

						videoWrapper.append(controls);
						jQuery(YTPlayer).optimizeDisplay();
						YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, true)

					}, YTPlayer.opt.fadeOnStartTime)
				} else
					videoWrapper.css({
						zIndex: 10000
					}).CSSAnimate({
						opacity: 1
					}, YTPlayer.opt.fadeOnStartTime * 2);
				fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite);
				YTPlayer.isAlone = true
			} else {
				jQuery(document).off('mousemove.YTPlayer');
				clearTimeout(YTPlayer.hideCursor);
				YTPlayer.overlay.css({
					cursor: 'auto'
				});
				if (real) {
					cancelFullscreen()
				} else {
					videoWrapper.CSSAnimate({
						opacity: YTPlayer.opt.opacity
					}, YTPlayer.opt.fadeOnStartTime);
					videoWrapper.css({
						zIndex: 0
					})
				}
				fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT);
				YTPlayer.isAlone = false
			}

			function RunPrefixMethod(obj, method) {
				let pfx = ['webkit', 'moz', 'ms', 'o', ''];
				let p = 0,
						m, t;
				while (p < pfx.length && !obj[m]) {
					m = method;
					if (pfx[p] == '') {
						m = m.substr(0, 1).toLowerCase() + m.substr(1)
					}
					m = pfx[p] + m;
					t = typeof obj[m];
					if (t != 'undefined') {
						pfx = [pfx[p]];
						return (t == 'function' ? obj[m]() : obj[m])
					}
					p++
				}
			}

			function launchFullscreen(element) {
				RunPrefixMethod(element, 'RequestFullScreen')
			}

			function cancelFullscreen() {
				if (RunPrefixMethod(document, 'FullScreen') || RunPrefixMethod(document, 'IsFullScreen')) {
					RunPrefixMethod(document, 'CancelFullScreen')
				}
			}

			return this
		},

		/**
		 * toggleLoops
		 * @returns {jQuery.mbYTPlayer}
		 */
		toggleLoops: function () {
			let YTPlayer = this.get(0);
			let data = YTPlayer.opt;
			if (data.loop == 1) {
				data.loop = 0
			} else {
				if (data.startAt) {
					YTPlayer.player.seekTo(data.startAt)
				} else {
					YTPlayer.player.playVideo()
				}
				data.loop = 1
			}
			return this
		},

		/**
		 * play
		 * @returns {jQuery.mbYTPlayer}
		 */
		play: function () {
			let YTPlayer = this.get(0);
			let $YTPlayer = jQuery(YTPlayer);

			if (!YTPlayer.isReady)
				return this;

			setTimeout(function () {
				$YTPlayer.YTPSetAbundance(YTPlayer.opt.abundance)
			}, 300);

			YTPlayer.player.playVideo();

			jQuery(YTPlayer.playerEl).css({
				opacity: 1
			});

			YTPlayer.wrapper.css({
				backgroundImage: 'none'
			});

			YTPlayer.wrapper.CSSAnimate({
				opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
			}, YTPlayer.opt.fadeOnStartTime);

			let controls = jQuery('#controlBar_' + YTPlayer.id);
			let playBtn = controls.find('.mb_YTPPlayPause');
			playBtn.html(jQuery.mbYTPlayer.controls.pause);
			YTPlayer.state = 1;

			return this
		},

		/**
		 * togglePlay
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 */
		togglePlay: function (callback) {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			if (YTPlayer.state == 1)
				this.YTPPause();
			else
				this.YTPPlay();

			if (typeof callback == 'function')
				callback(YTPlayer.state);

			return this
		},

		/**
		 * stop
		 * @returns {jQuery.mbYTPlayer}
		 */
		stop: function () {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			let controls = jQuery('#controlBar_' + YTPlayer.id);
			let playBtn = controls.find('.mb_YTPPlayPause');
			playBtn.html(jQuery.mbYTPlayer.controls.play);
			YTPlayer.player.stopVideo();
			return this
		},

		/**
		 * pause
		 * @returns {jQuery.mbYTPlayer}
		 */
		pause: function () {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			if (YTPlayer.opt.abundance < .2)
				this.YTPSetAbundance(.2);

			YTPlayer.player.pauseVideo();
			YTPlayer.state = 2;
			return this
		},

		/**
		 * seekTo
		 * @param sec
		 * @returns {jQuery.mbYTPlayer}
		 */
		seekTo: function (sec) {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			YTPlayer.player.seekTo(sec, true);
			return this
		},

		/**
		 *
		 * @returns {*}
		 */
		getPlaybackRate: function () {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			return YTPlayer.player.getPlaybackRate()
		},

		/**
		 * setPlaybackRate
		 * @param val:Number
		 * 0.25, 0.5, 1, 1.5, 2
		 * @returns {jQuery.mbYTPlayer}
		 */
		setPlaybackRate: function (val) {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			YTPlayer.player.setPlaybackRate(val);
			return this
		},

		/**
		 * setVolume
		 * @param val
		 * @returns {jQuery.mbYTPlayer}
		 */
		setVolume: function (val) {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			YTPlayer.opt.vol = val;
			this.YTPUnmute();
			YTPlayer.player.setVolume(YTPlayer.opt.vol);

			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length)
				YTPlayer.volumeBar.updateSliderVal(val);

			return this
		},
		/**
		 * getVolume
		 * @returns {*}
		 */
		getVolume: function () {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			return YTPlayer.player.getVolume()
		},

		/**
		 * toggleVolume
		 * @returns {jQuery.mbYTPlayer}
		 */
		toggleVolume: function () {

			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			if (YTPlayer.isMute) {
				if (!jQuery.mbBrowser.mobile)
					this.YTPSetVolume(YTPlayer.opt.vol);
				this.YTPUnmute()
			} else {
				this.YTPMute()
			}
			return this
		},

		/**
		 * mute
		 * @returns {jQuery.mbYTPlayer}
		 */
		mute: function () {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			if (YTPlayer.isMute)
				return this;
			YTPlayer.player.mute();
			YTPlayer.isMute = true;
			YTPlayer.player.setVolume(0);
			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length && YTPlayer.volumeBar.width() > 10) {
				YTPlayer.volumeBar.updateSliderVal(0)
			}
			let controls = jQuery('#controlBar_' + YTPlayer.id);
			let muteBtn = controls.find('.mb_YTPMuteUnmute');
			muteBtn.html(jQuery.mbYTPlayer.controls.unmute);
			jQuery(YTPlayer).addClass('isMuted');
			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length) YTPlayer.volumeBar.addClass('muted');
			let YTPEvent = jQuery.Event('YTPMuted');
			YTPEvent.time = YTPlayer.currentTime;

			if (!YTPlayer.preventTrigger)
				jQuery(YTPlayer).trigger(YTPEvent);

			return this
		},

		/**
		 * unmute
		 * @returns {jQuery.mbYTPlayer}
		 */
		unmute: function () {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			// console.debug("unmute::", YTPlayer.isMute,"Vol::", YTPlayer.opt.vol)

			if (!YTPlayer.isMute)
				return this;

			YTPlayer.player.unMute();
			YTPlayer.isMute = false;
			jQuery(YTPlayer).YTPSetVolume(YTPlayer.opt.vol);
			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length)
				YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol > 10 ? YTPlayer.opt.vol : 10);
			let controls = jQuery('#controlBar_' + YTPlayer.id);
			let muteBtn = controls.find('.mb_YTPMuteUnmute');
			muteBtn.html(jQuery.mbYTPlayer.controls.mute);
			jQuery(YTPlayer).removeClass('isMuted');
			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length)
				YTPlayer.volumeBar.removeClass('muted');
			let YTPEvent = jQuery.Event('YTPUnmuted');
			YTPEvent.time = YTPlayer.currentTime;

			if (!YTPlayer.preventTrigger)
				jQuery(YTPlayer).trigger(YTPEvent);

			return this
		},

		/* FILTERS ---------------------------------------------------------------------------------------------------------*/

		/**
		 * applyFilter
		 * @param filter
		 * @param value
		 * @returns {jQuery.mbYTPlayer}
		 */
		applyFilter: function (filter, value) {
			let $YTPlayer = this;
			let YTPlayer = $YTPlayer.get(0);

			if (!YTPlayer.isReady)
				return this;

			YTPlayer.filters[filter].value = value;
			if (YTPlayer.filtersEnabled)
				$YTPlayer.YTPEnableFilters()
		},

		/**
		 * applyFilters
		 * @param filters
		 * @returns {jQuery.mbYTPlayer}
		 */
		applyFilters: function (filters) {
			let $YTPlayer = this;
			let YTPlayer = $YTPlayer.get(0);

			if (!YTPlayer.isReady) {
				jQuery(YTPlayer).on('YTPReady', function () {
					$YTPlayer.YTPApplyFilters(filters)
				});
				return this
			}

			for (let key in filters) {
				$YTPlayer.YTPApplyFilter(key, filters[key])
			}

			$YTPlayer.trigger('YTPFiltersApplied')
		},

		/**
		 * toggleFilter
		 * @param filter
		 * @param value
		 * @returns {jQuery.mbYTPlayer}
		 */
		toggleFilter: function (filter, value) {
			let $YTPlayer = this;
			let YTPlayer = $YTPlayer.get(0);

			if (!YTPlayer.isReady)
				return this;

			if (!YTPlayer.filters[filter].value)
				YTPlayer.filters[filter].value = value;
			else
				YTPlayer.filters[filter].value = 0;

			if (YTPlayer.filtersEnabled)
				jQuery(YTPlayer).YTPEnableFilters();

			return this
		},

		/**
		 * toggleFilters
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 */
		toggleFilters: function (callback) {
			let $YTPlayer = this;
			let YTPlayer = $YTPlayer.get(0);

			if (!YTPlayer.isReady)
				return this;

			if (YTPlayer.filtersEnabled) {
				jQuery(YTPlayer).trigger('YTPDisableFilters');
				jQuery(YTPlayer).YTPDisableFilters()
			} else {
				jQuery(YTPlayer).YTPEnableFilters();
				jQuery(YTPlayer).trigger('YTPEnableFilters')
			}
			if (typeof callback == 'function')
				callback(YTPlayer.filtersEnabled);

			return this
		},

		/**
		 * disableFilters
		 * @returns {jQuery.mbYTPlayer}
		 */
		disableFilters: function () {
			let $YTPlayer = this;
			let YTPlayer = $YTPlayer.get(0);

			if (!YTPlayer.isReady)
				return this;

			let iframe = jQuery(YTPlayer.playerEl);
			iframe.css('-webkit-filter', '');
			iframe.css('filter', '');
			YTPlayer.filtersEnabled = false;

			return this
		},

		/**
		 * enableFilters
		 * @returns {jQuery.mbYTPlayer}
		 */
		enableFilters: function () {
			let $YTPlayer = this;
			let YTPlayer = $YTPlayer.get(0);

			if (!YTPlayer.isReady)
				return this;

			let iframe = jQuery(YTPlayer.playerEl);
			let filterStyle = '';
			for (let key in YTPlayer.filters) {
				if (YTPlayer.filters[key].value)
					filterStyle += key.replace('_', '-') + '(' + YTPlayer.filters[key].value + YTPlayer.filters[key].unit + ') '
			}
			iframe.css('-webkit-filter', filterStyle);
			iframe.css('filter', filterStyle);
			YTPlayer.filtersEnabled = true;

			return this
		},

		/**
		 * removeFilter
		 * @param filter
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 */
		removeFilter: function (filter, callback) {
			let $YTPlayer = this;
			let YTPlayer = $YTPlayer.get(0);

			if (!YTPlayer.isReady)
				return this;

			if (typeof filter == 'function') {
				callback = filter;
				filter = null
			}

			if (!filter) {
				for (let key in YTPlayer.filters) {
					if (YTPlayer.filters.hasOwnProperty(key)) {
						$YTPlayer.YTPApplyFilter(key, 0);
						if (typeof callback == 'function')
							callback(key);
					}
				}

				YTPlayer.filters = jQuery.extend(true, {}, jQuery.mbYTPlayer.defaultFilters)

			} else {
				$YTPlayer.YTPApplyFilter(filter, 0);
				if (typeof callback == 'function') callback(filter)
			}

			let YTPEvent = jQuery.Event('YTPFiltersApplied');
			$YTPlayer.trigger(YTPEvent);

			return this
		},

		/**
		 * getFilters
		 * @returns {filters}
		 */
		getFilters: function () {
			let YTPlayer = this.get(0);

			if (!YTPlayer.isReady)
				return this;

			return YTPlayer.filters
		},

		/* MASK ---------------------------------------------------------------------------------------------------------*/

		/**
		 * addMask
		 * @param mask
		 * @returns {jQuery.mbYTPlayer}
		 */
		addMask: function (mask) {
			let YTPlayer = this.get(0);

			/*
					if (!YTPlayer.isReady)
					return this;
			*/

			if (!mask)
				mask = YTPlayer.actualMask;

			let tempImg = jQuery('<img/>').attr('src', mask).on('load', function () {
				YTPlayer.overlay.CSSAnimate({
					opacity: 0
				}, YTPlayer.opt.fadeOnStartTime, function () {
					YTPlayer.hasMask = true;
					tempImg.remove();
					YTPlayer.overlay.css({
						backgroundImage   : 'url(' + mask + ')',
						backgroundRepeat  : 'no-repeat',
						backgroundPosition: 'center center',
						backgroundSize    : 'cover'
					});
					YTPlayer.overlay.CSSAnimate({
						opacity: 1
					}, YTPlayer.opt.fadeOnStartTime)
				})
			});

			return this
		},

		/**
		 * removeMask
		 * @returns {jQuery.mbYTPlayer}
		 */
		removeMask: function () {
			let YTPlayer = this.get(0);

			/*
					if (!YTPlayer.isReady)
					return this;
			*/

			YTPlayer.overlay.CSSAnimate({
				opacity: 0
			}, YTPlayer.opt.fadeOnStartTime, function () {
				YTPlayer.hasMask = false;
				YTPlayer.overlay.css({
					backgroundImage   : '',
					backgroundRepeat  : '',
					backgroundPosition: '',
					backgroundSize    : ''
				});
				YTPlayer.overlay.CSSAnimate({
					opacity: 1
				}, YTPlayer.opt.fadeOnStartTime)
			});

			return this
		},

		/**
		 * Apply mask
		 * @param YTPlayer
		 */
		applyMask: function (YTPlayer) {
			let $YTPlayer = jQuery(YTPlayer);

			/*
					if (!YTPlayer.isReady)
					return this;
			*/

			$YTPlayer.off('YTPTime.mask');

			if (YTPlayer.opt.mask) {
				if (typeof YTPlayer.opt.mask == 'string') {

					$YTPlayer.YTPAddMask(YTPlayer.opt.mask);
					YTPlayer.actualMask = YTPlayer.opt.mask

				} else if (typeof YTPlayer.opt.mask == 'object') {

					//console.debug(YTPlayer.opt.mask)

					for (let time in YTPlayer.opt.mask) {

						if (YTPlayer.opt.mask[time])
							img = jQuery('<img/>').attr('src', YTPlayer.opt.mask[time])

					}

					if (YTPlayer.opt.mask[0])
						$YTPlayer.YTPAddMask(YTPlayer.opt.mask[0]);

					$YTPlayer.on('YTPTime.mask', function (e) {

						for (let time in YTPlayer.opt.mask) {
							if (e.time == time)
								if (!YTPlayer.opt.mask[time]) {
									$YTPlayer.YTPRemoveMask()
								} else {
									$YTPlayer.YTPAddMask(YTPlayer.opt.mask[time]);
									YTPlayer.actualMask = YTPlayer.opt.mask[time]
								}
						}
					})
				}
			}
		},

		/**
		 * toggleMask
		 * @returns {jQuery.mbYTPlayer}
		 */
		toggleMask: function () {
			let YTPlayer = this.get(0);

			/*
					if (!YTPlayer.isReady)
					return this;
			*/

			let $YTPlayer = jQuery(YTPlayer);
			if (YTPlayer.hasMask)
				$YTPlayer.YTPRemoveMask();
			else
				$YTPlayer.YTPAddMask();
			return this
		},

		/* CONTROLS --------------------------------------------------------------------------------------------------------*/

		/**
		 * manageProgress
		 * @returns {{totalTime: number, currentTime: number}}
		 */
		manageProgress: function () {
			let YTPlayer = this.get(0);
			let controls = jQuery('#controlBar_' + YTPlayer.id);
			let progressBar = controls.find('.mb_YTPProgress');
			let loadedBar = controls.find('.mb_YTPLoaded');
			let timeBar = controls.find('.mb_YTPseekbar');
			let totW = progressBar.outerWidth();
			let currentTime = Math.floor(YTPlayer.player.getCurrentTime());
			let totalTime = Math.floor(YTPlayer.player.getDuration());
			let timeW = (currentTime * totW) / totalTime;
			let startLeft = 0;
			let loadedW = YTPlayer.player.getVideoLoadedFraction() * 100;
			loadedBar.css({
				left : startLeft,
				width: loadedW + '%'
			});
			timeBar.css({
				left : 0,
				width: timeW
			});
			return {
				totalTime  : totalTime,
				currentTime: currentTime
			}
		},

		/**
		 * buildControls
		 * @param YTPlayer
		 */
		buildControls: function (YTPlayer) {

			jQuery('#controlBar_' + YTPlayer.id).remove();
			if (!YTPlayer.opt.showControls) {
				YTPlayer.controlBar = false;
				return
			}

			// @YTPlayer.opt.printUrl: is deprecated; use YTPlayer.opt.showYTLogo
			YTPlayer.opt.showYTLogo = YTPlayer.opt.showYTLogo || YTPlayer.opt.printUrl;
			if (jQuery('#controlBar_' + YTPlayer.id).length)
				return;
			YTPlayer.controlBar = jQuery('<div/>').attr('id', 'controlBar_' + YTPlayer.id).addClass('mb_YTPBar').css({
				whiteSpace: 'noWrap',
				position  : YTPlayer.isBackground ? 'fixed' : 'absolute',
				zIndex    : YTPlayer.isBackground ? 10000 : 1000
			}).hide().on('click', function (e) {
				e.stopPropagation()
			});
			let buttonBar = jQuery('<div/>').addClass('buttonBar');
			/**
			 *  play/pause button
			 * */
			let playpause = jQuery('<span>' + jQuery.mbYTPlayer.controls.play + '</span>').addClass('mb_YTPPlayPause ytpicon').on('click', function (e) {
				e.stopPropagation();
				jQuery(YTPlayer).YTPTogglePlay()
			});
			/**
			 *  mute/unmute button
			 * */
			let MuteUnmute = jQuery('<span>' + jQuery.mbYTPlayer.controls.mute + '</span>').addClass('mb_YTPMuteUnmute ytpicon').on('click', function (e) {
				e.stopPropagation();
				jQuery(YTPlayer).YTPToggleVolume()
			});
			/**
			 *  volume bar
			 * */
			let volumeBar = jQuery('<div/>').addClass('mb_YTPVolumeBar').css({
				display: 'inline-block'
			});
			YTPlayer.volumeBar = volumeBar;

			/**
			 * time elapsed
			 * */
			let idx = jQuery('<span/>').addClass('mb_YTPTime');
			let vURL = YTPlayer.opt.videoURL ? YTPlayer.opt.videoURL : '';
			if (vURL.indexOf('http') < 0) vURL = 'https://www.youtube.com/watch?v=' + YTPlayer.opt.videoURL;
			let movieUrl = jQuery('<span/>').html(jQuery.mbYTPlayer.controls.ytLogo).addClass('mb_YTPUrl ytpicon').attr('title', 'view on YouTube').on('click', function () {
				window.open(vURL, 'viewOnYT')
			});
			let onlyVideo = jQuery('<span/>').html(jQuery.mbYTPlayer.controls.onlyYT).addClass('mb_OnlyYT ytpicon').on('click', function (e) {
				e.stopPropagation();
				jQuery(YTPlayer).YTPFullscreen(YTPlayer.opt.realFullscreen)
			});
			let progressBar = jQuery('<div/>').addClass('mb_YTPProgress').css('position', 'absolute').on('click', function (e) {
				e.stopPropagation();
				timeBar.css({
					width: (e.clientX - timeBar.offset().left)
				});
				YTPlayer.timeW = e.clientX - timeBar.offset().left;
				YTPlayer.controlBar.find('.mb_YTPLoaded').css({
					width: 0
				});
				let totalTime = Math.floor(YTPlayer.player.getDuration());
				YTPlayer.goto = (timeBar.outerWidth() * totalTime) / progressBar.outerWidth();
				YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), true);
				YTPlayer.controlBar.find('.mb_YTPLoaded').css({
					width: 0
				})
			});
			let loadedBar = jQuery('<div/>').addClass('mb_YTPLoaded').css('position', 'absolute');
			let timeBar = jQuery('<div/>').addClass('mb_YTPseekbar').css('position', 'absolute');
			progressBar.append(loadedBar).append(timeBar);
			buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx);

			if (YTPlayer.opt.showYTLogo) {
				buttonBar.append(movieUrl)
			}

			/**
			 * Full screen button
			 */
			if (YTPlayer.isBackground || (eval(YTPlayer.opt.realFullscreen) && !YTPlayer.isBackground))
				buttonBar.append(onlyVideo);

			YTPlayer.controlBar.append(buttonBar).append(progressBar);

			if (!YTPlayer.isBackground) {
				YTPlayer.controlBar.addClass('inlinePlayer');
				YTPlayer.wrapper.before(YTPlayer.controlBar)
			} else {
				jQuery('body').after(YTPlayer.controlBar)
			}

			/**
			 * Volume slider
			 */
			volumeBar.simpleSlider({
				initialval : YTPlayer.opt.vol,
				scale      : 100,
				orientation: 'h',
				callback   : function (el) {

					if (el.value == 0) {
						jQuery(YTPlayer).YTPMute()
					} else {
						jQuery(YTPlayer).YTPUnmute()
					}
					YTPlayer.player.setVolume(el.value);
					if (!YTPlayer.isMute)
						YTPlayer.opt.vol = el.value

					// console.debug(jQuery(YTPlayer).YTPGetVolume())

				}

			})
		},

		/**
		 * changeCoverImage
		 *
		 * @param imageURL
		 * @returns {jQuery.mbYTPlayer}
		 */
		changeCoverImage: function (imageURL) {
			let YTPlayer = this.get(0);
			if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
				let bgndURL = imageURL || (YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background);

				//	console.debug(YTPlayer.wrapper);

				if (bgndURL)
					YTPlayer.opt.containment.css({
						background          : bgndURL,
						backgroundSize      : 'cover',
						// backgroundRepeat    : 'no-repeat',
						backgroundAttachment: 'fixed'

					})
			}
			return this;
		},

		/* MANAGE PLAYER STATE ------------------------------------------------------------------------------------------*/

		/**
		 * checkForState
		 */
		checkForState: function () {
			let YTPlayer = this.get(0);
			let $YTPlayer = jQuery(YTPlayer);

			clearInterval(YTPlayer.getState);
			let interval = 100;
			//Checking if player has been removed from the scene
			if (!jQuery.contains(document, YTPlayer)) {
				$YTPlayer.YTPPlayerDestroy();
				clearInterval(YTPlayer.getState);
				clearInterval(YTPlayer.checkForStartAt);
				return
			}

			jQuery.mbYTPlayer.checkForStart(YTPlayer);

			YTPlayer.getState = setInterval(function () {
				let $YTPlayer = jQuery(YTPlayer);

				if (!YTPlayer.isReady)
					return;

				let prog = jQuery(YTPlayer).YTPManageProgress();

				let stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
				stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0;

				if (YTPlayer.currentTime != prog.currentTime) {
					let YTPEvent = jQuery.Event('YTPTime');
					YTPEvent.time = YTPlayer.currentTime;
					jQuery(YTPlayer).trigger(YTPEvent)
				}

				YTPlayer.currentTime = prog.currentTime;
				YTPlayer.totalTime = YTPlayer.player.getDuration();
				if (YTPlayer.player.getVolume() == 0) $YTPlayer.addClass('isMuted');
				else $YTPlayer.removeClass('isMuted');

				if (YTPlayer.opt.showControls)
					if (prog.totalTime) {
						YTPlayer.controlBar.find('.mb_YTPTime').html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + ' / ' + jQuery.mbYTPlayer.formatTime(prog.totalTime))
					} else {
						YTPlayer.controlBar.find('.mb_YTPTime').html('-- : -- / -- : --')
					}

				/**
				 * Manage video pause on window blur
				 */
				if (eval(YTPlayer.opt.stopMovieOnBlur)) {
					if (!document.hasFocus()) {
						if (YTPlayer.state == 1) {
							YTPlayer.hasFocus = false;
							YTPlayer.preventTrigger = true;
							$YTPlayer.YTPPause()
						}
					} else if (document.hasFocus() && !YTPlayer.hasFocus && !(YTPlayer.state == -1 || YTPlayer.state == 0)) {
						YTPlayer.hasFocus = true;
						YTPlayer.preventTrigger = true;
						$YTPlayer.YTPPlay()
					}
				}

				/**
				 * Manage video pause if not on screen
				 */
				if (YTPlayer.opt.playOnlyIfVisible) {
					let isOnScreen = jQuery.mbYTPlayer.isOnScreen(YTPlayer, YTPlayer.opt.onScreenPercentage);
					if (!isOnScreen && YTPlayer.state == 1) {
						YTPlayer.isOnScreen = false;
						$YTPlayer.YTPPause()
					} else if (isOnScreen && !YTPlayer.isOnScreen) {
						YTPlayer.isOnScreen = true;
						YTPlayer.player.playVideo()
					}
				}

				if (YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact) {
					YTPlayer.controlBar.addClass('compact');
					YTPlayer.isCompact = true;
					if (!YTPlayer.isMute && YTPlayer.volumeBar) YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)
				} else if (YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact) {
					YTPlayer.controlBar.removeClass('compact');
					YTPlayer.isCompact = false;

					if (!YTPlayer.isMute && YTPlayer.volumeBar)
						YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)
				}
				// the video is ended
				if (YTPlayer.player.getPlayerState() > 0 && ((parseFloat(YTPlayer.player.getDuration() - (YTPlayer.opt.fadeOnStartTime / 1000)) < YTPlayer.player.getCurrentTime()) || (stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) >= stopAt))) {

					if (YTPlayer.isEnded)
						return;

					YTPlayer.isEnded = true;

					setTimeout(function () {
						YTPlayer.isEnded = false
					}, 1000);

					if (YTPlayer.isList) {
						if (!YTPlayer.opt.loop || (YTPlayer.opt.loop > 0 && YTPlayer.player.loopTime === YTPlayer.opt.loop - 1)) {
							YTPlayer.player.loopTime = undefined;
							clearInterval(YTPlayer.getState);
							let YTPEnd = jQuery.Event('YTPEnd');
							YTPEnd.time = YTPlayer.currentTime;
							jQuery(YTPlayer).trigger(YTPEnd);
							return
						}
					} else if (!YTPlayer.opt.loop || (YTPlayer.opt.loop > 0 && YTPlayer.player.loopTime === YTPlayer.opt.loop - 1)) {
						YTPlayer.player.loopTime = undefined;

						YTPlayer.state = 2;

						$YTPlayer.changeCoverImage(YTPlayer);

						jQuery(YTPlayer).YTPPause();
						YTPlayer.wrapper.CSSAnimate({
							opacity: 0
						}, YTPlayer.opt.fadeOnStartTime, function () {

							if (YTPlayer.controlBar.length)
								YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play);

							$YTPlayer.changeCoverImage();
							/*
														if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
															let bgndURL = YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background
															if (bgndURL)
																YTPlayer.opt.containment.css({
																	background      : bgndURL,
																	backgroundSize  : 'cover',
																	backgroundRepeat: 'no-repeat'
																})
														}
							*/

							let YTPEnd = jQuery.Event('YTPEnd');
							YTPEnd.time = YTPlayer.currentTime;
							jQuery(YTPlayer).trigger(YTPEnd);
							YTPlayer.player.seekTo(YTPlayer.opt.startAt, true);


						});
						return
					}

					YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1;
					YTPlayer.opt.startAt = YTPlayer.opt.startAt || 1;
					YTPlayer.preventTrigger = true;
					YTPlayer.state = 2;
					//YTPlayer.player.pauseVideo();
					YTPlayer.player.seekTo(YTPlayer.opt.startAt, true)
					//YTPlayer.player.playVideo();
				}
			}, interval)
		},

		/**
		 * checkForStart
		 * @param YTPlayer
		 */
		checkForStart: function (YTPlayer) {
			let $YTPlayer = jQuery(YTPlayer);

			/* If the player has been removed from scene destroy it */
			if (!jQuery.contains(document, YTPlayer)) {
				$YTPlayer.YTPPlayerDestroy();
				return
			}

			/* CREATE CONTROL BAR */
			jQuery.mbYTPlayer.buildControls(YTPlayer);

			if (YTPlayer.overlay)
				if (YTPlayer.opt.addRaster) {
					let classN = YTPlayer.opt.addRaster == 'dot' ? 'raster-dot' : 'raster';
					YTPlayer.overlay.addClass(YTPlayer.isRetina ? classN + ' retina' : classN)
				} else {
					YTPlayer.overlay.removeClass(function (index, classNames) {
						// change the list into an array
						let current_classes = classNames.split(' '),
								// array of classes which are to be removed
								classes_to_remove = [];
						jQuery.each(current_classes, function (index, class_name) {
							// if the classname begins with bg add it to the classes_to_remove array
							if (/raster.*/.test(class_name)) {
								classes_to_remove.push(class_name)
							}
						});
						classes_to_remove.push('retina');
						// turn the array back into a string
						return classes_to_remove.join(' ')
					})
				}

			YTPlayer.preventTrigger = true;
			YTPlayer.state = 2;
			YTPlayer.preventTrigger = true;

			YTPlayer.player.mute();
			YTPlayer.player.playVideo();
			YTPlayer.isStarting = true;

			let startAt = YTPlayer.start_from_last ? YTPlayer.start_from_last : YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;

			YTPlayer.preventTrigger = true;
			YTPlayer.checkForStartAt = setInterval(function () {

				YTPlayer.player.mute();
				YTPlayer.player.seekTo(startAt, true);

				let canPlayVideo = YTPlayer.player.getVideoLoadedFraction() >= startAt / YTPlayer.player.getDuration();

				if (jQuery.browser.mobile)
					canPlayVideo = true;

				if (YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= startAt && canPlayVideo) {
					YTPlayer.start_from_last = null;

					YTPlayer.preventTrigger = true;
					$YTPlayer.YTPPause();

					clearInterval(YTPlayer.checkForStartAt);

					if (typeof YTPlayer.opt.onReady == 'function')
						YTPlayer.opt.onReady(YTPlayer);

					YTPlayer.isReady = true;

					$YTPlayer.YTPRemoveFilter();

					if (YTPlayer.opt.addFilters) {
						$YTPlayer.YTPApplyFilters(YTPlayer.opt.addFilters)
					} else {
						$YTPlayer.YTPApplyFilters()
					}
					$YTPlayer.YTPEnableFilters();
					let YTPready = jQuery.Event('YTPReady');
					YTPready.time = YTPlayer.currentTime;
					$YTPlayer.trigger(YTPready);

					YTPlayer.state = 2;

					if (!YTPlayer.opt.mute) {

						if (YTPlayer.opt.autoPlay) {
							console.debug('To make the video \'auto-play\' you must mute the audio according with the latest vendor policy');
							YTPlayer.player.mute()
						}

						YTPlayer.player.unMute()

					} else {
						$YTPlayer.YTPMute()
					}

					if (typeof _gaq != 'undefined' && eval(YTPlayer.opt.gaTrack))
						_gaq.push(['_trackEvent', 'YTPlayer', 'Play', (YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString())]);
					else if (typeof ga != 'undefined' && eval(YTPlayer.opt.gaTrack))
						ga('send', 'event', 'YTPlayer', 'play', (YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()));

					if (YTPlayer.opt.autoPlay) {

						let YTPStart = jQuery.Event('YTPStart');
						YTPStart.time = YTPlayer.currentTime;
						jQuery(YTPlayer).trigger(YTPStart);

						YTPlayer.isStarting = false;

						/* Fix for Safari freeze */
						if (jQuery.mbBrowser.os.name === 'mac' && jQuery.mbBrowser.safari) {
							jQuery('body').one('mousedown.YTPstart', function () {
								$YTPlayer.YTPPlay()
							})
						}
						$YTPlayer.YTPPlay();
						console.timeEnd('YTPlayerStartPlay')

					} else {

						YTPlayer.preventTrigger = true;
						$YTPlayer.YTPPause();

						if (YTPlayer.start_from_last)
							YTPlayer.player.seekTo(startAt, true);

						setTimeout(function () {
							YTPlayer.preventTrigger = true;
							$YTPlayer.YTPPause();

							if (!YTPlayer.isPlayer) {
								if (!YTPlayer.opt.coverImage) {
									jQuery(YTPlayer.playerEl).CSSAnimate({
										opacity: 1
									}, YTPlayer.opt.fadeOnStartTime);
									YTPlayer.wrapper.CSSAnimate({
										opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
									}, YTPlayer.opt.fadeOnStartTime)
								} else {
									YTPlayer.wrapper.css({opacity: 0});
									setTimeout(function () {
										$YTPlayer.changeCoverImage()
									}, YTPlayer.opt.fadeOnStartTime)
								}
							}
							YTPlayer.isStarting = false
						}, 500);

						if (YTPlayer.controlBar.length)
							YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play)
					}

					console.debug()
					if (YTPlayer.isPlayer && !YTPlayer.opt.autoPlay && (YTPlayer.loading && YTPlayer.loading.length)) {
						YTPlayer.loading.html('Ready');
						setTimeout(function () {
							YTPlayer.loading.fadeOut()
						}, 100)
					}

					if (YTPlayer.controlBar && YTPlayer.controlBar.length)
						YTPlayer.controlBar.slideDown(1000)
				}

				if (jQuery.mbBrowser.os.name === 'mac' && jQuery.mbBrowser.safari) {
					YTPlayer.player.playVideo();
					if (startAt >= 0)
						YTPlayer.player.seekTo(startAt, true)
				}

			}, 100);

			return $YTPlayer
		},

		/* TIME METHODS -------------------------------------------------------------------------------------------*/

		/**
		 * getTime
		 * @returns {string} time
		 */
		getTime: function () {
			let YTPlayer = this.get(0);
			return jQuery.mbYTPlayer.formatTime(YTPlayer.currentTime)
		},

		/**
		 * getTotalTime
		 * @returns {string} total time
		 */
		getTotalTime: function () {
			let YTPlayer = this.get(0);
			return jQuery.mbYTPlayer.formatTime(YTPlayer.totalTime)
		},

		/**
		 * formatTime
		 * @param s
		 * @returns {string}
		 */
		formatTime: function (s) {
			let min = Math.floor(s / 60);
			let sec = Math.floor(s - (60 * min));
			return (min <= 9 ? '0' + min : min) + ' : ' + (sec <= 9 ? '0' + sec : sec)
		},

		/* PLAYER POSITION AND SIZE OPTIMIZATION-------------------------------------------------------------------------------------------*/

		/**
		 * setAnchor
		 * @param anchor
		 */
		setAnchor: function (anchor) {
			let $YTplayer = this;
			$YTplayer.optimizeDisplay(anchor)
		},

		/**
		 * getAnchor
		 */
		getAnchor: function () {
			let YTPlayer = this.get(0);
			return YTPlayer.opt.anchor
		},

		/**
		 * setAbundance
		 * @param val
		 * @param updateOptions
		 * @returns {jQuery.mbYTPlayer}
		 */
		setAbundance: function (val, updateOptions) {
			let YTPlayer = this.get(0);
			let $YTPlayer = this;
			if (updateOptions)
				YTPlayer.opt.abundance = val;
			$YTPlayer.optimizeDisplay(YTPlayer.opt.anchor, val);
			return $YTPlayer
		},

		/**
		 * getAbundance
		 * @returns {*}
		 */
		getAbundance: function () {
			let YTPlayer = this.get(0);
			return YTPlayer.opt.abundance
		},

		/**
		 * setOption
		 * @param opt
		 * @param val
		 * @returns {jQuery.mbYTPlayer}
		 */
		setOption: function (opt, val) {
			let YTPlayer = this.get(0);
			let $YTPlayer = this;
			YTPlayer.opt[opt] = val;
			return $YTPlayer
		}
	};

	/**
	 * optimizeDisplay
	 * @param anchor
	 * @param abundanceX
	 */
	jQuery.fn.optimizeDisplay = function (anchor, abundanceX) {

		let YTPlayer = this.get(0);
		let vid = {};
		let el = YTPlayer.wrapper;
		let iframe = jQuery(YTPlayer.playerEl);

		YTPlayer.opt.anchor = anchor || YTPlayer.opt.anchor;

		// console.debug(YTPlayer.opt.anchor);

		YTPlayer.opt.anchor = typeof YTPlayer.opt.anchor != 'undefined ' ? YTPlayer.opt.anchor : 'center,center';
		let YTPAlign = YTPlayer.opt.anchor.split(',');
		let ab = abundanceX ? abundanceX : YTPlayer.opt.abundance;

		if (YTPlayer.opt.optimizeDisplay) {
			let abundance = el.height() * ab;
			let win = {};
			win.width = el.outerWidth();
			win.height = el.outerHeight() + abundance;

			YTPlayer.opt.ratio = YTPlayer.opt.ratio === 'auto' ? 16 / 9 : YTPlayer.opt.ratio;
			YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio);

			vid.width = win.width + abundance;
			vid.height = Math.ceil(vid.width / YTPlayer.opt.ratio);
			vid.marginTop = Math.ceil(-((vid.height - win.height + abundance) / 2));
			vid.marginLeft = -(abundance / 2);
			let lowest = vid.height < win.height;

			if (lowest) {
				vid.height = win.height + abundance;
				vid.width = Math.ceil(vid.height * YTPlayer.opt.ratio);
				vid.marginTop = -(abundance / 2);
				vid.marginLeft = Math.ceil(-((vid.width - win.width) / 2))
			}

			for (let a in YTPAlign) {
				if (YTPAlign.hasOwnProperty(a)) {
					let al = YTPAlign[a].replace(/ /g, '');

					switch (al) {
						case 'top':
							vid.marginTop = -abundance;
							break;
						case 'bottom':
							vid.marginTop = Math.ceil(-(vid.height - win.height) - (abundance / 2));
							break;
						case 'left':
							vid.marginLeft = -(abundance);
							break;
						case 'right':
							vid.marginLeft = Math.ceil(-(vid.width - win.width) + (abundance / 2));
							break
					}

				}
			}

		} else {
			vid.width = '100%';
			vid.height = '100%';
			vid.marginTop = 0;
			vid.marginLeft = 0
		}

		iframe.css({
			width     : vid.width,
			height    : vid.height,
			marginTop : vid.marginTop,
			marginLeft: vid.marginLeft,
			maxWidth  : 'initial'
		})


	};


	/* UTILITIES -----------------------------------------------------------------------------------------------------------------------*/

	/**
	 * shuffle
	 * @param arr
	 * @returns {Array|string|Blob|*}
	 *
	 */
	jQuery.shuffle = function (arr) {
		let newArray = arr.slice();
		let len = newArray.length;
		let i = len;
		while (i--) {
			let p = parseInt(Math.random() * len);
			let t = newArray[i];
			newArray[i] = newArray[p];
			newArray[p] = t
		}
		return newArray;
	};

	/**
	 * Unselectable
	 * @returns {*}
	 */
	jQuery.fn.unselectable = function () {
		return this.each(function () {
			jQuery(this).css({
				'-moz-user-select'   : 'none',
				'-webkit-user-select': 'none',
				'user-select'        : 'none'
			}).attr('unselectable', 'on')
		})
	};

	/* EXTERNAL METHODS -----------------------------------------------------------------------------------------------------------------------*/

	jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer;
	jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer;

	jQuery.fn.YTPCheckForState = jQuery.mbYTPlayer.checkForState;

	jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer;
	jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID;
	jQuery.fn.YTPGetPlaylistID = jQuery.mbYTPlayer.getPlaylistID;
	jQuery.fn.YTPChangeVideo = jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeVideo;
	jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy;

	jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play;
	jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay;
	jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop;
	jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause;
	jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo;

	jQuery.fn.YTPGetPlaybackRate = jQuery.mbYTPlayer.getPlaybackRate;
	jQuery.fn.YTPSetPlaybackRate = jQuery.mbYTPlayer.setPlaybackRate;

	jQuery.fn.changeCoverImage = jQuery.mbYTPlayer.changeCoverImage;

	jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist;
	jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext;
	jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev;
	jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex;

	jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute;
	jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute;
	jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume;
	jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume;
	jQuery.fn.YTPGetVolume = jQuery.mbYTPlayer.getVolume;

	jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData;
	jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen;
	jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops;
	jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress;

	jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality;
	jQuery.fn.YTPGetVideoQuality = jQuery.mbYTPlayer.getVideoQuality;

	jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter;
	jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters;
	jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter;
	jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters;
	jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter;
	jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters;
	jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters;
	jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters;

	jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime;
	jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime;

	jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask;
	jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask;
	jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask;

	jQuery.fn.YTPGetAbundance = jQuery.mbYTPlayer.getAbundance;
	jQuery.fn.YTPSetAbundance = jQuery.mbYTPlayer.setAbundance;

	jQuery.fn.YTPSetAnchor = jQuery.mbYTPlayer.setAnchor;
	jQuery.fn.YTPGetAnchor = jQuery.mbYTPlayer.getAnchor;

	jQuery.fn.YTPSetOption = jQuery.mbYTPlayer.setOption

})(jQuery, ytp);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYi5ZVFBsYXk0NXQ2NDVlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0dmFyIG9uTW9iaWxlID0gZmFsc2U7XG5cdGlmKCAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICkgeyBvbk1vYmlsZSA9IHRydWU7IH1cblxuXHRpZiggKCBvbk1vYmlsZSA9PT0gZmFsc2UgKSApIHtcblxuXHRcdFx0JChcIi5wbGF5ZXJcIikubWJfWVRQbGF5ZXIoKTtcblxuXHR9IGVsc2Uge1xuXG5cdFx0XHQvKiBhcyBhIGZhbGxiYWNrIHdlIGFkZCBhIHNwZWNpYWwgY2xhc3MgdG8gdGhlIGhlYWRlciB3aGljaCBkaXNwbGF5cyBhIHBvc3RlciBpbWFnZSAqL1xuXHRcdFx0JCgnI2hvbWUnKS5hZGRDbGFzcygndmlkZW8tc2VjdGlvbicpO1xuXG5cdFx0XHQvKiBoaWRlIHBsYXllciAqL1xuXHRcdFx0JChcIi5wbGF5ZXJcIikuaGlkZSgpO1xuXG5cdFx0XHQkKFwiI3ZpZGVvLXZvbHVtZVwiKS5oaWRlKCk7XG5cblx0XHR9XG59KTtcblxuXG5cbnZhciB5dHAgPSB5dHAgfHwge307XG5cbmZ1bmN0aW9uIG9uWW91VHViZUlmcmFtZUFQSVJlYWR5KCkge1xuXHRpZiAoeXRwLllUQVBJUmVhZHkpXG5cdFx0cmV0dXJuO1xuXHR5dHAuWVRBUElSZWFkeSA9IHRydWU7XG5cdGpRdWVyeShkb2N1bWVudCkudHJpZ2dlcignWVRBUElSZWFkeScpXG59XG5cbmxldCBnZXRZVFBWaWRlb0lEID0gZnVuY3Rpb24gKHVybCkge1xuXHRsZXQgdmlkZW9JRCwgcGxheWxpc3RJRDtcblx0aWYgKHVybC5pbmRleE9mKCd5b3V0dS5iZScpID4gMCB8fCB1cmwuaW5kZXhPZigneW91dHViZS5jb20vZW1iZWQnKSA+IDApIHtcblx0XHR2aWRlb0lEID0gdXJsLnN1YnN0cih1cmwubGFzdEluZGV4T2YoJy8nKSArIDEsIHVybC5sZW5ndGgpO1xuXHRcdHBsYXlsaXN0SUQgPSB2aWRlb0lELmluZGV4T2YoJz9saXN0PScpID4gMCA/IHZpZGVvSUQuc3Vic3RyKHZpZGVvSUQubGFzdEluZGV4T2YoJz0nKSwgdmlkZW9JRC5sZW5ndGgpIDogbnVsbDtcblx0XHR2aWRlb0lEID0gcGxheWxpc3RJRCA/IHZpZGVvSUQuc3Vic3RyKDAsIHZpZGVvSUQubGFzdEluZGV4T2YoJz8nKSkgOiB2aWRlb0lEXG5cdH0gZWxzZSBpZiAodXJsLmluZGV4T2YoJ2h0dHAnKSA+IC0xKSB7XG5cdFx0Ly92aWRlb0lEID0gdXJsLm1hdGNoKCAvKFtcXC8mXXZcXC8oW14mI10qKSl8KFtcXFxcPyZddj0oW14mI10qKSkvIClbIDEgXTtcblx0XHR2aWRlb0lEID0gdXJsLm1hdGNoKC9bXFxcXD8mXXY9KFteJiNdKikvKVsxXTtcblx0XHRwbGF5bGlzdElEID0gdXJsLmluZGV4T2YoJ2xpc3Q9JykgPiAwID8gdXJsLm1hdGNoKC9bXFxcXD8mXWxpc3Q9KFteJiNdKikvKVsxXSA6IG51bGxcblx0fSBlbHNlIHtcblx0XHR2aWRlb0lEID0gdXJsLmxlbmd0aCA+IDE1ID8gbnVsbCA6IHVybDtcblx0XHRwbGF5bGlzdElEID0gdmlkZW9JRCA/IG51bGwgOiB1cmxcblx0fVxuXHRyZXR1cm4ge1xuXHRcdHZpZGVvSUQgICA6IHZpZGVvSUQsXG5cdFx0cGxheWxpc3RJRDogcGxheWxpc3RJRFxuXHR9XG59O1xuXG5mdW5jdGlvbiBpT1N2ZXJzaW9uKCkge1xuXHRpZiAoL2lQKGhvbmV8b2R8YWQpLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSkpIHtcblx0XHRsZXQgdiA9IChuYXZpZ2F0b3IuYXBwVmVyc2lvbikubWF0Y2goL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vKTtcblx0XHRyZXR1cm4gW3BhcnNlSW50KHZbMV0sIDEwKSwgcGFyc2VJbnQodlsyXSwgMTApLCBwYXJzZUludCh2WzNdIHx8IDAsIDEwKV1cblx0fVxufVxuXG4oZnVuY3Rpb24gKGpRdWVyeSwgeXRwKSB7XG5cblx0alF1ZXJ5Lm1iWVRQbGF5ZXIgPSB7XG5cdFx0bmFtZSAgIDogJ2pxdWVyeS5tYi5ZVFBsYXllcicsXG5cdFx0dmVyc2lvbjogJ3t7IHZlcnNpb24gfX0nLFxuXHRcdGJ1aWxkICA6ICd7eyBidWlsZG51bSB9fScsXG5cdFx0YXV0aG9yIDogJ01hdHRlbyBCaWNvY2NoaSAocHVwdW56aSknLFxuXHRcdGFwaUtleSA6ICcnLFxuXG5cdFx0Lypcblx0XHQgKiBEZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBwbGF5ZXJcblx0XHQgKi9cblx0XHRkZWZhdWx0cyAgICAgICAgOiB7XG5cdFx0XHR2aWRlb1VSTDogbnVsbCxcblx0XHRcdGNvbnRhaW5tZW50OiAnYm9keScsXG5cdFx0XHRyYXRpbzogJ2F1dG8nLFxuXHRcdFx0ZmFkZU9uU3RhcnRUaW1lOiAxMDAwLFxuXHRcdFx0c3RhcnRBdDogMCxcblx0XHRcdHN0b3BBdDogMCxcblx0XHRcdGF1dG9QbGF5OiB0cnVlLFxuXHRcdFx0Y292ZXJJbWFnZTogZmFsc2UsXG5cdFx0XHRsb29wOiB0cnVlLFxuXHRcdFx0YWRkUmFzdGVyOiBmYWxzZSxcblx0XHRcdG1hc2s6IGZhbHNlLFxuXHRcdFx0b3BhY2l0eTogMSxcblx0XHRcdHF1YWxpdHk6ICdkZWZhdWx0Jyxcblx0XHRcdHZvbDogNTAsXG5cdFx0XHRtdXRlOiBmYWxzZSxcblx0XHRcdHNob3dDb250cm9sczogdHJ1ZSxcblx0XHRcdGFuY2hvcjogJ2NlbnRlcixjZW50ZXInLFxuXHRcdFx0c2hvd0Fubm90YXRpb25zOiBmYWxzZSxcblx0XHRcdGNjX2xvYWRfcG9saWN5OiBmYWxzZSxcblx0XHRcdHNob3dZVExvZ286IGZhbHNlLFxuXHRcdFx0dXNlT25Nb2JpbGU6IHRydWUsXG5cdFx0XHRwbGF5T25seUlmVmlzaWJsZTogZmFsc2UsXG5cdFx0XHRvblNjcmVlblBlcmNlbnRhZ2U6IDMwLFxuXHRcdFx0Z29GdWxsU2NyZWVuT25QbGF5OiBmYWxzZSxcblx0XHRcdHN0b3BNb3ZpZU9uQmx1cjogdHJ1ZSxcblx0XHRcdHJlYWxGdWxsc2NyZWVuOiB0cnVlLFxuXHRcdFx0b3B0aW1pemVEaXNwbGF5OiB0cnVlLFxuXHRcdFx0YWJ1bmRhbmNlOiAwLjMsXG5cdFx0XHRnYVRyYWNrOiB0cnVlLFxuXHRcdFx0cmVtZW1iZXJfbGFzdF90aW1lOiBmYWxzZSxcblx0XHRcdGFkZEZpbHRlcnM6IGZhbHNlLFxuXHRcdFx0b25SZWFkeTogZnVuY3Rpb24gKHBsYXllcikge1xuXHRcdFx0fSxcblxuXHRcdFx0b25FcnJvcjogZnVuY3Rpb24gKHBsYXllciwgZXJyKSB7XG5cdFx0XHR9LFxuXG5cdFx0XHRvbkVuZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogIEBmb250ZmFjZSBpY29uc1xuXHRcdCAqICAqL1xuXHRcdGNvbnRyb2xzICAgICAgICA6IHtcblx0XHRcdHBsYXkgICAgOiAnUCcsXG5cdFx0XHRwYXVzZSAgIDogJ3AnLFxuXHRcdFx0bXV0ZSAgICA6ICdNJyxcblx0XHRcdHVubXV0ZSAgOiAnQScsXG5cdFx0XHRvbmx5WVQgIDogJ08nLFxuXHRcdFx0c2hvd1NpdGU6ICdSJyxcblx0XHRcdHl0TG9nbyAgOiAnWSdcblx0XHR9LFxuXG4gICAgcmFzdGVySW1nICAgICAgOiBcImltYWdlcy9yYXN0ZXIucG5nXCIsXG5cdFx0cmFzdGVySW1nUmV0aW5hOiBcImltYWdlcy9yYXN0ZXJAMngucG5nXCIsXG5cdFx0Y29udHJvbEJhciAgICAgIDogbnVsbCxcblx0XHRsb2NhdGlvblByb3RvY29sOiAnaHR0cHM6JyxcblxuXHRcdC8qKlxuXHRcdCAqIEFwcGxpY2FibGUgZmlsdGVyc1xuXHRcdCAqL1xuXHRcdGRlZmF1bHRGaWx0ZXJzOiB7XG5cdFx0XHRncmF5c2NhbGUgOiB7dmFsdWU6IDAsIHVuaXQ6ICclJ30sXG5cdFx0XHRodWVfcm90YXRlOiB7dmFsdWU6IDAsIHVuaXQ6ICdkZWcnfSxcblx0XHRcdGludmVydCAgICA6IHt2YWx1ZTogMCwgdW5pdDogJyUnfSxcblx0XHRcdG9wYWNpdHkgICA6IHt2YWx1ZTogMCwgdW5pdDogJyUnfSxcblx0XHRcdHNhdHVyYXRlICA6IHt2YWx1ZTogMCwgdW5pdDogJyUnfSxcblx0XHRcdHNlcGlhICAgICA6IHt2YWx1ZTogMCwgdW5pdDogJyUnfSxcblx0XHRcdGJyaWdodG5lc3M6IHt2YWx1ZTogMCwgdW5pdDogJyUnfSxcblx0XHRcdGNvbnRyYXN0ICA6IHt2YWx1ZTogMCwgdW5pdDogJyUnfSxcblx0XHRcdGJsdXIgICAgICA6IHt2YWx1ZTogMCwgdW5pdDogJ3B4J31cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogYnVpbGQgdGhlIHBsYXllclxuXHRcdCAqIEBwYXJhbSBvcHRpb25zXG5cdFx0ICogQHJldHVybnMgW3BsYXllcnNdXG5cdFx0ICovXG5cdFx0YnVpbGRQbGF5ZXI6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cblx0XHRcdGlmICgheXRwLllUQVBJUmVhZHkgJiYgdHlwZW9mIHdpbmRvdy5ZVCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0alF1ZXJ5KCcjWVRBUEknKS5yZW1vdmUoKTtcblx0XHRcdFx0bGV0IHRhZyA9IGpRdWVyeSgnPHNjcmlwdD4nKS5hdHRyKHtcblx0XHRcdFx0XHQnc3JjJzogJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGk/dj0nICsgalF1ZXJ5Lm1iWVRQbGF5ZXIudmVyc2lvbixcblx0XHRcdFx0XHQnaWQnIDogJ1lUQVBJJ1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0alF1ZXJ5KCdoZWFkJykucHJlcGVuZCh0YWcpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRqUXVlcnkoZG9jdW1lbnQpLnRyaWdnZXIoJ1lUQVBJUmVhZHknKTtcblx0XHRcdFx0XHR5dHAuWVRBUElSZWFkeSA9IHRydWVcblx0XHRcdFx0fSwgMTAwKVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBpc0lmcmFtZSgpIHtcblx0XHRcdFx0bGV0IGlzSWZyID0gZmFsc2U7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKHNlbGYubG9jYXRpb24uaHJlZiAhPT0gdG9wLmxvY2F0aW9uLmhyZWYpIGlzSWZyID0gdHJ1ZVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0aXNJZnIgPSB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGlzSWZyXG5cdFx0XHR9XG5cblx0XHRcdGNvbnNvbGUudGltZSgnWVRQbGF5ZXJJbml0Jyk7XG5cdFx0XHRjb25zb2xlLnRpbWUoJ1lUUGxheWVyU3RhcnRQbGF5Jyk7XG5cblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzO1xuXHRcdFx0XHRsZXQgJFlUUGxheWVyID0galF1ZXJ5KFlUUGxheWVyKTtcblx0XHRcdFx0JFlUUGxheWVyLmhpZGUoKTtcblx0XHRcdFx0WVRQbGF5ZXIubG9vcCA9IDA7XG5cdFx0XHRcdFlUUGxheWVyLnN0YXRlID0gMDtcblx0XHRcdFx0WVRQbGF5ZXIuZmlsdGVycyA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIGpRdWVyeS5tYllUUGxheWVyLmRlZmF1bHRGaWx0ZXJzKTtcblx0XHRcdFx0WVRQbGF5ZXIuZmlsdGVyc0VuYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRZVFBsYXllci5pZCA9IFlUUGxheWVyLmlkIHx8ICdZVFBfJyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdFx0XHQkWVRQbGF5ZXIuYWRkQ2xhc3MoJ21iX1lUUGxheWVyJyk7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCBTZXQgcHJvcGVydGllc1xuXHRcdFx0XHQgKi9cblx0XHRcdFx0bGV0IHByb3BlcnR5ID0gJFlUUGxheWVyLmRhdGEoJ3Byb3BlcnR5JykgJiYgdHlwZW9mICRZVFBsYXllci5kYXRhKCdwcm9wZXJ0eScpID09ICdzdHJpbmcnID9cblx0XHRcdFx0XHRcdGV2YWwoJygnICsgJFlUUGxheWVyLmRhdGEoJ3Byb3BlcnR5JykgKyAnKScpIDpcblx0XHRcdFx0XHRcdCRZVFBsYXllci5kYXRhKCdwcm9wZXJ0eScpO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgcHJvcGVydHkgIT09ICdvYmplY3QnKVxuXHRcdFx0XHRcdHByb3BlcnR5ID0ge307XG5cblx0XHRcdFx0WVRQbGF5ZXIub3B0ID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgalF1ZXJ5Lm1iWVRQbGF5ZXIuZGVmYXVsdHMsIFlUUGxheWVyLm9wdCwgb3B0aW9ucywgcHJvcGVydHkpO1xuXG5cdFx0XHRcdFlUUGxheWVyLm9wdC5lbGVtZW50SWQgPSBZVFBsYXllci5pZDtcblxuXHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LnZvbCA9PT0gMCkge1xuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC52b2wgPSAxO1xuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC5tdXRlID0gdHJ1ZVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIElmIGF1dG9QbGF5IGlzIHNldCB0byB0cnVlIGFuZCAgbXV0ZSBpcyBzZXQgdG8gZmFsc2Vcblx0XHRcdFx0ICogV2Via2l0IGJyb3dzZXIgd2lsbCBub3QgYXV0by1wbGF5XG5cdFx0XHRcdCAqIFN0YXJ0IHBsYXlpbmcgYWZ0ZXIgdGhlIGZpcnN0IGNsaWNrXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmF1dG9QbGF5ICYmIFlUUGxheWVyLm9wdC5tdXRlID09PSBmYWxzZSAmJiBqUXVlcnkubWJCcm93c2VyLmNocm9tZSkge1xuXHRcdFx0XHRcdC8vWVRQbGF5ZXIub3B0Lm11dGUgPSB0cnVlO1xuXHRcdFx0XHRcdGpRdWVyeShkb2N1bWVudCkub25lKCdtb3VzZWRvd24uWVRQc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQkWVRQbGF5ZXIuWVRQUGxheSgpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Y29uc29sZS5pbmZvKCdZVFBsYXllciBpbmZvOiBPbiBXZWJraXQgYnJvd3NlcnMgeW91IGNhbiBub3QgYXV0b3BsYXkgdGhlIHZpZGVvIGlmIHRoZSBhdWRpbyBpcyBvbi4nKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5sb29wICYmIHR5cGVvZiBZVFBsYXllci5vcHQubG9vcCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0Lmxvb3AgPSA5OTk5XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcblx0XHRcdFx0IERpc2FibGUgZnVsbFNjcmVlbiBpZiBpcyBpbiBhbiBpZnJhbWUgb3IgZnVsbC1zY3JlZW4gQVBJIGlzIG5vdCBhdmFpbGFibGVcblx0XHRcdFx0ICovXG5cdFx0XHRcdGxldCBmdWxsU2NyZWVuQXZhaWxhYmxlID0gZG9jdW1lbnQuZnVsbHNjcmVlbkVuYWJsZWQgfHwgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVuYWJsZWQgfHwgZG9jdW1lbnQubW96RnVsbFNjcmVlbkVuYWJsZWQgfHwgZG9jdW1lbnQubXNGdWxsc2NyZWVuRW5hYmxlZDtcblx0XHRcdFx0WVRQbGF5ZXIub3B0LnJlYWxGdWxsc2NyZWVuID0gaXNJZnJhbWUoKSB8fCAhZnVsbFNjcmVlbkF2YWlsYWJsZSA/IGZhbHNlIDogWVRQbGF5ZXIub3B0LnJlYWxGdWxsc2NyZWVuO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgTWFuYWdlIGFubm90YXRpb25zXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRZVFBsYXllci5vcHQuc2hvd0Fubm90YXRpb25zID0gWVRQbGF5ZXIub3B0LnNob3dBbm5vdGF0aW9ucyA/ICcxJyA6ICczJztcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0IE1hbmFnZSBzaG93IHN1YnRpdGxlIGFuZCBjYXB0aW9uXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRZVFBsYXllci5vcHQuY2NfbG9hZF9wb2xpY3kgPSBZVFBsYXllci5vcHQuY2NfbG9hZF9wb2xpY3kgPyAnMScgOiAnMCc7XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCBNYW5hZ2UgY292ZXIgaW1hZ2Vcblx0XHRcdFx0ICovXG5cdFx0XHRcdFlUUGxheWVyLm9wdC5jb3ZlckltYWdlID0gWVRQbGF5ZXIub3B0LmNvdmVySW1hZ2UgfHwgWVRQbGF5ZXIub3B0LmJhY2tncm91bmRJbWFnZTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0IE1hbmFnZSBRdWFsaXR5XG5cdFx0XHRcdCB0aGUgc2V0UGxheWJhY2tRdWFsaXR5IGhhcyBiZWVuIGRlcHJlY2F0ZWQgYnkgWVRcblx0XHRcdFx0ICovXG5cdFx0XHRcdFlUUGxheWVyLm9wdC5xdWFsaXR5ID0gJ2RlZmF1bHQnO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiB0b2RvOiByZW1vdmVcblx0XHRcdFx0IE1hbmFnZSBPcGFjaXR5IGZvciBJRSA8IDEwXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRpZiAoalF1ZXJ5Lm1iQnJvd3Nlci5tc2llICYmIGpRdWVyeS5tYkJyb3dzZXIudmVyc2lvbiA8IDkpXG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0Lm9wYWNpdHkgPSAxO1xuXG5cdFx0XHRcdFlUUGxheWVyLm9wdC5jb250YWlubWVudCA9IFlUUGxheWVyLm9wdC5jb250YWlubWVudCA9PT0gJ3NlbGYnID8gJFlUUGxheWVyIDogalF1ZXJ5KFlUUGxheWVyLm9wdC5jb250YWlubWVudCk7XG5cdFx0XHRcdFlUUGxheWVyLmlzUmV0aW5hID0gKHdpbmRvdy5yZXRpbmEgfHwgd2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxKTtcblxuXHRcdFx0XHRZVFBsYXllci5vcHQucmF0aW8gPSBZVFBsYXllci5vcHQucmF0aW8gPT09ICdhdXRvJyA/IDE2IC8gOSA6IFlUUGxheWVyLm9wdC5yYXRpbztcblx0XHRcdFx0WVRQbGF5ZXIub3B0LnJhdGlvID0gZXZhbChZVFBsYXllci5vcHQucmF0aW8pO1xuXG5cdFx0XHRcdGxldCBvcmlnQ29udGFpbm1lbnRCYWNrZ3JvdW5kID0gWVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50LmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xuXHRcdFx0XHRvcmlnQ29udGFpbm1lbnRCYWNrZ3JvdW5kID0gKG9yaWdDb250YWlubWVudEJhY2tncm91bmQgPT09ICdub25lJykgPyBudWxsIDogb3JpZ0NvbnRhaW5tZW50QmFja2dyb3VuZDtcblx0XHRcdFx0WVRQbGF5ZXIub3JpZ19jb250YWlubWVudF9iYWNrZ3JvdW5kID0gb3JpZ0NvbnRhaW5tZW50QmFja2dyb3VuZDtcblxuXHRcdFx0XHRpZiAoISRZVFBsYXllci5hdHRyKCdpZCcpKVxuXHRcdFx0XHRcdCRZVFBsYXllci5hdHRyKCdpZCcsICd5dHBfJyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcblxuXHRcdFx0XHRZVFBsYXllci5wbGF5ZXJJRCA9ICdpZnJhbWVfJyArIFlUUGxheWVyLmlkO1xuXG5cdFx0XHRcdFlUUGxheWVyLmlzQWxvbmUgPSBmYWxzZTtcblx0XHRcdFx0WVRQbGF5ZXIuaGFzRm9jdXMgPSB0cnVlO1xuXHRcdFx0XHRZVFBsYXllci52aWRlb0lEID0gWVRQbGF5ZXIub3B0LnZpZGVvVVJMID9cblx0XHRcdFx0XHRcdGdldFlUUFZpZGVvSUQoWVRQbGF5ZXIub3B0LnZpZGVvVVJMKS52aWRlb0lEIDogJFlUUGxheWVyLmF0dHIoJ2hyZWYnKSA/XG5cdFx0XHRcdFx0XHRcdFx0Z2V0WVRQVmlkZW9JRCgkWVRQbGF5ZXIuYXR0cignaHJlZicpKS52aWRlb0lEIDpcblx0XHRcdFx0XHRcdFx0XHRmYWxzZTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0IENoZWNrIGlmIGl0IGlzIGEgdmlkZW8gbGlzdFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0WVRQbGF5ZXIucGxheWxpc3RJRCA9IFlUUGxheWVyLm9wdC52aWRlb1VSTCA/XG5cdFx0XHRcdFx0XHRnZXRZVFBWaWRlb0lEKFlUUGxheWVyLm9wdC52aWRlb1VSTCkucGxheWxpc3RJRCA6ICRZVFBsYXllci5hdHRyKCdocmVmJykgP1xuXHRcdFx0XHRcdFx0XHRcdGdldFlUUFZpZGVvSUQoJFlUUGxheWVyLmF0dHIoJ2hyZWYnKSkucGxheWxpc3RJRCA6XG5cdFx0XHRcdFx0XHRcdFx0ZmFsc2U7XG5cblx0XHRcdFx0bGV0IHN0YXJ0X2Zyb21fbGFzdCA9IDA7XG5cdFx0XHRcdGlmIChqUXVlcnkubWJDb29raWUuZ2V0KCdZVFBsYXllcl9zdGFydF9mcm9tJyArIFlUUGxheWVyLnZpZGVvSUQpKVxuXHRcdFx0XHRcdHN0YXJ0X2Zyb21fbGFzdCA9IHBhcnNlRmxvYXQoalF1ZXJ5Lm1iQ29va2llLmdldCgnWVRQbGF5ZXJfc3RhcnRfZnJvbScgKyBZVFBsYXllci52aWRlb0lEKSk7XG5cdFx0XHRcdGlmIChZVFBsYXllci5vcHQucmVtZW1iZXJfbGFzdF90aW1lICYmIHN0YXJ0X2Zyb21fbGFzdCkge1xuXHRcdFx0XHRcdFlUUGxheWVyLnN0YXJ0X2Zyb21fbGFzdCA9IHN0YXJ0X2Zyb21fbGFzdDtcblx0XHRcdFx0XHRqUXVlcnkubWJDb29raWUucmVtb3ZlKCdZVFBsYXllcl9zdGFydF9mcm9tJyArIFlUUGxheWVyLnZpZGVvSUQpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRZVFBsYXllci5pc1BsYXllciA9ICRZVFBsYXllci5pcyhZVFBsYXllci5vcHQuY29udGFpbm1lbnQpO1xuXHRcdFx0XHRZVFBsYXllci5pc0JhY2tncm91bmQgPSBZVFBsYXllci5vcHQuY29udGFpbm1lbnQuaXMoJ2JvZHknKTtcblxuXHRcdFx0XHRpZiAoWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kICYmIHl0cC5iYWNrZ3JvdW5kSXNJbml0ZWQpXG5cdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgSGlkZSB0aGUgcGxhY2Vob2xkZXIgaWYgaXQncyBub3QgdGhlIHRhcmdldCBvZiB0aGUgcGxheWVyXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRpZiAoWVRQbGF5ZXIuaXNQbGF5ZXIpXG5cdFx0XHRcdFx0JFlUUGxheWVyLnNob3coKTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0IGNyZWF0ZSB0aGUgb3ZlcmxheVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0WVRQbGF5ZXIub3ZlcmxheSA9IGpRdWVyeSgnPGRpdi8+JykuY3NzKHtcblx0XHRcdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdFx0XHR0b3AgICAgIDogMCxcblx0XHRcdFx0XHRsZWZ0ICAgIDogMCxcblx0XHRcdFx0XHR3aWR0aCAgIDogJzEwMCUnLFxuXHRcdFx0XHRcdGhlaWdodCAgOiAnMTAwJSdcblx0XHRcdFx0fSkuYWRkQ2xhc3MoJ1lUUE92ZXJsYXknKTtcblxuXHRcdFx0XHQkWVRQbGF5ZXIuY2hhbmdlQ292ZXJJbWFnZSgpO1xuXHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5vcHQuY292ZXJJbWFnZSB8fCBZVFBsYXllci5vcmlnX2NvbnRhaW5tZW50X2JhY2tncm91bmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBiZ25kVVJMID0gWVRQbGF5ZXIub3B0LmNvdmVySW1hZ2UgPyAndXJsKCcgKyBZVFBsYXllci5vcHQuY292ZXJJbWFnZSArICcpIGNlbnRlciBjZW50ZXInIDogWVRQbGF5ZXIub3JpZ19jb250YWlubWVudF9iYWNrZ3JvdW5kXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoYmduZFVSTClcblx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50LmNzcyh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZCAgICAgIDogYmduZFVSTCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kU2l6ZSAgOiAnY292ZXInLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHQqL1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgY3JlYXRlIHRoZSB3cmFwcGVyXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRZVFBsYXllci53cmFwcGVyID0galF1ZXJ5KCc8ZGl2Lz4nKS5hdHRyKCdpZCcsICd3cmFwcGVyXycgKyBZVFBsYXllci5pZCkuY3NzKHtcblx0XHRcdFx0XHRwb3NpdGlvbiA6ICdhYnNvbHV0ZScsXG5cdFx0XHRcdFx0ekluZGV4ICAgOiAwLFxuXHRcdFx0XHRcdG1pbldpZHRoIDogJzEwMCUnLFxuXHRcdFx0XHRcdG1pbkhlaWdodDogJzEwMCUnLFxuXHRcdFx0XHRcdGxlZnQgICAgIDogMCxcblx0XHRcdFx0XHR0b3AgICAgICA6IDAsXG5cdFx0XHRcdFx0b3ZlcmZsb3cgOiAnaGlkZGVuJyxcblx0XHRcdFx0XHRvcGFjaXR5ICA6IDBcblx0XHRcdFx0fSkuYWRkQ2xhc3MoJ21iWVRQX3dyYXBwZXInKTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0IElmIGlzIGFuIGlubGluZSBwbGF5ZXIgdG9nZ2xlIHBsYXkgaWYgdGhlIG92ZXJsYXkgaXMgY2xpY2tlZFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0aWYgKFlUUGxheWVyLmlzUGxheWVyKSB7XG5cdFx0XHRcdFx0bGV0IGlubGluZVBsYXlCdXR0b25Dc3MgPSBqUXVlcnkuYnJvd3Nlci5tb2JpbGUgPyBcImlubGluZVBsYXlCdXR0b25Nb2JpbGVcIiA6IFwiaW5saW5lUGxheUJ1dHRvblwiO1xuXHRcdFx0XHRcdFlUUGxheWVyLmlubGluZVBsYXlCdXR0b24gPSBqUXVlcnkoJzxkaXYvPicpLmFkZENsYXNzKCdpbmxpbmVQbGF5QnV0dG9uJykuaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5wbGF5KTtcblx0XHRcdFx0XHQkWVRQbGF5ZXIuYXBwZW5kKFlUUGxheWVyLmlubGluZVBsYXlCdXR0b24pO1xuXHRcdFx0XHRcdFlUUGxheWVyLmlubGluZVBsYXlCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblxuXHRcdFx0XHRcdFx0JFlUUGxheWVyLllUUFBsYXkoKTtcblx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0ICogSGlkZSB0aGUgUExBWSBidXR0b24gb24gcGxheVxuXHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRZVFBsYXllci5pbmxpbmVQbGF5QnV0dG9uLmhpZGUoKTtcblxuXHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHQgKiBzZXQgdGhlIGZ1bGxzY3JlZW4gb24gcGxheVxuXHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmdvRnVsbFNjcmVlbk9uUGxheSkge1xuXHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIuWVRQRnVsbHNjcmVlbigpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmF1dG9QbGF5KVxuXHRcdFx0XHRcdFx0WVRQbGF5ZXIuaW5saW5lUGxheUJ1dHRvbi5oaWRlKCk7XG5cblx0XHRcdFx0XHRZVFBsYXllci5vdmVybGF5Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCRZVFBsYXllci5ZVFBUb2dnbGVQbGF5KCk7XG5cblx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5vcHQuZ29GdWxsU2NyZWVuT25QbGF5KSB7XG5cdFx0XHRcdFx0XHRcdCRZVFBsYXllci5ZVFBGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9KS5jc3Moe2N1cnNvcjogJ3BvaW50ZXInfSlcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCBjcmVhdGUgdGhlIHBsYXllckJveCB3aGVyZSB0aGUgWVQgaWZyYW1lIHdpbGwgYmUgcGxhY2VkXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRsZXQgcGxheWVyQm94ID0galF1ZXJ5KCc8ZGl2Lz4nKS5hdHRyKCdpZCcsIFlUUGxheWVyLnBsYXllcklEKS5hZGRDbGFzcygncGxheWVyQm94Jyk7XG5cdFx0XHRcdHBsYXllckJveC5jc3Moe1xuXHRcdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0XHRcdHpJbmRleCAgOiAwLFxuXHRcdFx0XHRcdHdpZHRoICAgOiAnMTAwJScsXG5cdFx0XHRcdFx0aGVpZ2h0ICA6ICcxMDAlJyxcblx0XHRcdFx0XHR0b3AgICAgIDogMCxcblx0XHRcdFx0XHRsZWZ0ICAgIDogMCxcblx0XHRcdFx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXG5cdFx0XHRcdFx0b3BhY2l0eSA6IDFcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5hcHBlbmQocGxheWVyQm94KTtcblx0XHRcdFx0cGxheWVyQm94LmFmdGVyKFlUUGxheWVyLm92ZXJsYXkpO1xuXG5cdFx0XHRcdGlmIChZVFBsYXllci5pc1BsYXllcikge1xuXHRcdFx0XHRcdFlUUGxheWVyLmlubGluZVdyYXBwZXIgPSBqUXVlcnkoJzxkaXYvPicpLmFkZENsYXNzKCdpbmxpbmUtWVRQbGF5ZXInKTtcblxuXHRcdFx0XHRcdFlUUGxheWVyLmlubGluZVdyYXBwZXIuY3NzKHtcblx0XHRcdFx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0XHRcdFx0bWF4V2lkdGg6IFlUUGxheWVyLm9wdC5jb250YWlubWVudC5jc3MoJ3dpZHRoJylcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC5jb250YWlubWVudC5jc3Moe1xuXHRcdFx0XHRcdFx0cG9zaXRpb24gICAgIDogJ3JlbGF0aXZlJyxcblx0XHRcdFx0XHRcdHBhZGRpbmdCb3R0b206ICc1Ni4yNSUnLFxuXHRcdFx0XHRcdFx0b3ZlcmZsb3cgICAgIDogJ2hpZGRlbicsXG5cdFx0XHRcdFx0XHRoZWlnaHQgICAgICAgOiAwXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50LndyYXAoWVRQbGF5ZXIuaW5saW5lV3JhcHBlcilcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgTG9vcCBhbGwgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgY29udGFpbmVyIGFuZCBjaGVjayBpZiB0aGVpciBwb3NpdGlvbiBpcyBub3QgXCJzdGF0aWNcIlxuXHRcdFx0XHQgKi9cblx0XHRcdFx0WVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50LmNoaWxkcmVuKCkubm90KCdzY3JpcHQsIHN0eWxlJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKGpRdWVyeSh0aGlzKS5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKVxuXHRcdFx0XHRcdFx0alF1ZXJ5KHRoaXMpLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoWVRQbGF5ZXIuaXNCYWNrZ3JvdW5kKSB7XG5cdFx0XHRcdFx0alF1ZXJ5KCdib2R5JykuY3NzKHtcblx0XHRcdFx0XHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLmNzcyh7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbjogJ2ZpeGVkJyxcblx0XHRcdFx0XHRcdHRvcCAgICAgOiAwLFxuXHRcdFx0XHRcdFx0bGVmdCAgICA6IDAsXG5cdFx0XHRcdFx0XHR6SW5kZXggIDogMFxuXHRcdFx0XHRcdH0pXG5cblx0XHRcdFx0fSBlbHNlIGlmIChZVFBsYXllci5vcHQuY29udGFpbm1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50LmNzcyh7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdCRZVFBsYXllci5zaG93KClcblx0XHRcdFx0fVxuXHRcdFx0XHRZVFBsYXllci5vcHQuY29udGFpbm1lbnQucHJlcGVuZChZVFBsYXllci53cmFwcGVyKTtcblxuXHRcdFx0XHRpZiAoIVlUUGxheWVyLmlzQmFja2dyb3VuZCkge1xuXHRcdFx0XHRcdFlUUGxheWVyLm92ZXJsYXkub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIuY29udHJvbEJhciAmJiBZVFBsYXllci5jb250cm9sQmFyLmxlbmd0aClcblx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIuY29udHJvbEJhci5hZGRDbGFzcygndmlzaWJsZScpXG5cdFx0XHRcdFx0fSkub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIuY29udHJvbEJhciAmJiBZVFBsYXllci5jb250cm9sQmFyLmxlbmd0aClcblx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIuY29udHJvbEJhci5yZW1vdmVDbGFzcygndmlzaWJsZScpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChqUXVlcnkubWJCcm93c2VyLm1vYmlsZSAmJiAhWVRQbGF5ZXIub3B0LnVzZU9uTW9iaWxlKSB7XG5cdFx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5jb3ZlckltYWdlKSB7XG5cdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLmNzcyh7XG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRJbWFnZSAgIDogJ3VybCgnICsgWVRQbGF5ZXIub3B0LmNvdmVySW1hZ2UgKyAnKScsXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlciBjZW50ZXInLFxuXHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kU2l6ZSAgICA6ICdjb3ZlcicsXG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRSZXBlYXQgIDogJ25vLXJlcGVhdCcsXG5cdFx0XHRcdFx0XHRcdG9wYWNpdHkgICAgICAgICAgIDogMVxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFlUUGxheWVyLndyYXBwZXIuY3NzKHtvcGFjaXR5OiAxfSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuICRZVFBsYXllclxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCBJZiBpcyBvbiBkZXZpY2Ugc3RhcnQgcGxheWluZyBvbiBmaXJzdCB0b3VjaFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0aWYgKGpRdWVyeS5tYkJyb3dzZXIubW9iaWxlICYmIFlUUGxheWVyLm9wdC5hdXRvUGxheSAmJiBZVFBsYXllci5vcHQudXNlT25Nb2JpbGUpXG5cdFx0XHRcdFx0alF1ZXJ5KCdib2R5Jykub25lKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnBsYXlWaWRlbygpXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0alF1ZXJ5KGRvY3VtZW50KS5vbmUoJ1lUQVBJUmVhZHknLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JFlUUGxheWVyLnRyaWdnZXIoJ1lUQVBJUmVhZHlfJyArIFlUUGxheWVyLmlkKTtcblx0XHRcdFx0XHR5dHAuWVRBUElSZWFkeSA9IHRydWVcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0WVRQbGF5ZXIuaXNPblNjcmVlbiA9IGpRdWVyeS5tYllUUGxheWVyLmlzT25TY3JlZW4oWVRQbGF5ZXIsIFlUUGxheWVyLm9wdC5vblNjcmVlblBlcmNlbnRhZ2UpO1xuXG5cdFx0XHRcdCRZVFBsYXllci5vbmUoJ1lUQVBJUmVhZHlfJyArIFlUUGxheWVyLmlkLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzO1xuXHRcdFx0XHRcdGxldCAkWVRQbGF5ZXIgPSBqUXVlcnkoWVRQbGF5ZXIpO1xuXG5cdFx0XHRcdFx0aWYgKChZVFBsYXllci5pc0JhY2tncm91bmQgJiYgeXRwLmJhY2tncm91bmRJc0luaXRlZCkgfHwgWVRQbGF5ZXIuaXNJbml0KVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdFx0aWYgKFlUUGxheWVyLmlzQmFja2dyb3VuZClcblx0XHRcdFx0XHRcdHl0cC5iYWNrZ3JvdW5kSXNJbml0ZWQgPSB0cnVlO1xuXG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0LmF1dG9QbGF5ID0gdHlwZW9mIFlUUGxheWVyLm9wdC5hdXRvUGxheSA9PSAndW5kZWZpbmVkJyA/ICghIVlUUGxheWVyLmlzQmFja2dyb3VuZCkgOiBZVFBsYXllci5vcHQuYXV0b1BsYXk7XG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0LnZvbCA9IFlUUGxheWVyLm9wdC52b2wgPyBZVFBsYXllci5vcHQudm9sIDogMTAwO1xuXG5cdFx0XHRcdFx0alF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0RGF0YUZyb21BUEkoWVRQbGF5ZXIpO1xuXG5cdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5vbignWVRQQ2hhbmdlZCcsIGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5pc0luaXQpXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRcdFx0WVRQbGF5ZXIuaXNJbml0ID0gdHJ1ZTtcblxuXHRcdFx0XHRcdFx0LyoqIEluaXRpYWxpemUgdGhlIFlUIHBsYXllciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0XHRcdCAqIFlvdXR1YmUgcGxheWVyIHZhcmlhYmxlc1xuXHRcdFx0XHRcdFx0ICogQHR5cGUge3ttb2Rlc3RicmFuZGluZzogbnVtYmVyLCBhdXRvcGxheTogbnVtYmVyLCBjb250cm9sczogbnVtYmVyLCBzaG93aW5mbzogbnVtYmVyLCByZWw6IG51bWJlciwgZW5hYmxlanNhcGk6IG51bWJlciwgdmVyc2lvbjogbnVtYmVyLCBwbGF5ZXJhcGlpZDogc3RyaW5nLCBvcmlnaW46IHN0cmluZywgYWxsb3dmdWxsc2NyZWVuOiBib29sZWFuLCBpdl9sb2FkX3BvbGljeTogKHN0cmluZ3wqfGpRdWVyeS5tYllUUGxheWVyLm9wdC5zaG93QW5ub3RhdGlvbnMpLCBwbGF5c2lubGluZTogbnVtYmVyfX1cblx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0bGV0IHBsYXllclZhcnMgPSB7XG5cdFx0XHRcdFx0XHRcdCdtb2Rlc3RicmFuZGluZycgOiAxLFxuXHRcdFx0XHRcdFx0XHQnYXV0b3BsYXknICAgICAgIDogMCxcblx0XHRcdFx0XHRcdFx0J2NvbnRyb2xzJyAgICAgICA6IDAsXG5cdFx0XHRcdFx0XHRcdCdzaG93aW5mbycgICAgICAgOiAwLFxuXHRcdFx0XHRcdFx0XHQncmVsJyAgICAgICAgICAgIDogMCxcblx0XHRcdFx0XHRcdFx0J2VuYWJsZWpzYXBpJyAgICA6IDEsXG5cdFx0XHRcdFx0XHRcdCd2ZXJzaW9uJyAgICAgICAgOiAzLFxuXHRcdFx0XHRcdFx0XHQncGxheWVyYXBpaWQnICAgIDogWVRQbGF5ZXIucGxheWVySUQsXG5cdFx0XHRcdFx0XHRcdCdvcmlnaW4nICAgICAgICAgOiAnKicsXG5cdFx0XHRcdFx0XHRcdCdhbGxvd2Z1bGxzY3JlZW4nOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHQnd21vZGUnICAgICAgICAgIDogJ3RyYW5zcGFyZW50Jyxcblx0XHRcdFx0XHRcdFx0J2l2X2xvYWRfcG9saWN5JyA6IFlUUGxheWVyLm9wdC5zaG93QW5ub3RhdGlvbnMsXG5cdFx0XHRcdFx0XHRcdCdjY19sb2FkX3BvbGljeScgOiBZVFBsYXllci5vcHQuY2NfbG9hZF9wb2xpY3ksXG5cdFx0XHRcdFx0XHRcdCdwbGF5c2lubGluZScgICAgOiBqUXVlcnkubWJCcm93c2VyLm1vYmlsZSAmJiAhWVRQbGF5ZXIuaXNQbGF5ZXIgPyAxIDogMCxcblxuXHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0IENoZWNrIGlmIHRoZSBicm93c2VyIGNhbiBwbGF5IEhUTUw1IHZpZGVvc1xuXHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0J2h0bWw1JzogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKS5jYW5QbGF5VHlwZSA/IDEgOiAwXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRuZXcgWVQuUGxheWVyKFlUUGxheWVyLnBsYXllcklELCB7XG5cdFx0XHRcdFx0XHRcdC8vdmlkZW9JZDogWVRQbGF5ZXIudmlkZW9JRC50b1N0cmluZygpLFxuXHRcdFx0XHRcdFx0XHRwbGF5ZXJWYXJzOiBwbGF5ZXJWYXJzLFxuXHRcdFx0XHRcdFx0XHRldmVudHMgICAgOiB7XG5cdFx0XHRcdFx0XHRcdFx0J29uUmVhZHknICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllciA9IGV2ZW50LnRhcmdldDtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly90b2RvOiBtYWtlIHBsYXlsaXN0IHdvcmtzXG5cdFx0XHRcdFx0XHRcdFx0XHQvKiBpZiAoWVRQbGF5ZXIucGxheWxpc3RJRCAmJiBZVFBsYXllci5hcGlLZXkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIuaXNMaXN0ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIudmlkZW9zID0gW107XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5jdWVQbGF5bGlzdCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdFR5cGU6ICdwbGF5bGlzdCcsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdDogWVRQbGF5ZXIucGxheWxpc3RJRC50b1N0cmluZygpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0U2Vjb25kczogWVRQbGF5ZXIub3B0LnN0YXJ0QXQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZW5kU2Vjb25kczogWVRQbGF5ZXIub3B0LnN0b3BBdCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdWdnZXN0ZWRRdWFsaXR5OiBZVFBsYXllci5vcHQucXVhbGl0eVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgZWxzZSB7ICovXG5cblx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5sb2FkVmlkZW9CeUlkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmlkZW9JZCAgICAgICAgIDogWVRQbGF5ZXIudmlkZW9JRC50b1N0cmluZygpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBzdGFydFNlY29uZHM6IFlUUGxheWVyLnN0YXJ0X2Zyb21fbGFzdCB8fCBZVFBsYXllci5vcHQuc3RhcnRBdCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gZW5kU2Vjb25kczogWVRQbGF5ZXIub3B0LnN0b3BBdCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3VnZ2VzdGVkUXVhbGl0eTogWVRQbGF5ZXIub3B0LnF1YWxpdHlcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvKn0qL1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIudHJpZ2dlcignWVRQbGF5ZXJJc1JlYWR5XycgKyBZVFBsYXllci5pZClcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0XHRcdCAqIG9uIFN0YXRlIENoYW5nZVxuXHRcdFx0XHRcdFx0XHRcdCAqIEBwYXJhbSBldmVudFxuXHRcdFx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHRcdFx0ICogLTEgKHVuc3RhcnRlZClcblx0XHRcdFx0XHRcdFx0XHQgKiAwIChlbmRlZClcblx0XHRcdFx0XHRcdFx0XHQgKiAxIChwbGF5aW5nKVxuXHRcdFx0XHRcdFx0XHRcdCAqIDIgKHBhdXNlZClcblx0XHRcdFx0XHRcdFx0XHQgKiAzIChidWZmZXJpbmcpXG5cdFx0XHRcdFx0XHRcdFx0ICogNSAodmlkZW8gY3VlZClcblx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHQnb25TdGF0ZUNoYW5nZScgICAgICAgICAgOiBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBldmVudC50YXJnZXQuZ2V0UGxheWVyU3RhdGUgIT0gJ2Z1bmN0aW9uJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgc3RhdGUgPSBldmVudC50YXJnZXQuZ2V0UGxheWVyU3RhdGUoKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLnByZXZlbnRUcmlnZ2VyIHx8IFlUUGxheWVyLmlzU3RhcnRpbmcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIucHJldmVudFRyaWdnZXIgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLnN0YXRlID0gc3RhdGU7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBjb25zb2xlLmRlYnVnKFlUUGxheWVyLnN0YXRlKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChldmVudC5kYXRhID09PSBZVC5QbGF5ZXJTdGF0ZS5QTEFZSU5HKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGNvbnNvbGUuZGVidWcoJ1lUUGxheWVyLm9wdC5xdWFsaXR5JywgWVRQbGF5ZXIub3B0LnF1YWxpdHkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL1x0ZXZlbnQudGFyZ2V0LnNldFBsYXliYWNrUXVhbGl0eShZVFBsYXllci5vcHQucXVhbGl0eSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnQudGFyZ2V0LnNldFBsYXliYWNrUXVhbGl0eSgnZGVmYXVsdCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHQqL1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBjb25zb2xlLmRlYnVnKCdZVFBHZXRWaWRlb1F1YWxpdHknLCBqUXVlcnkoWVRQbGF5ZXIpLllUUEdldFZpZGVvUXVhbGl0eSgpKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGV2ZW50VHlwZTtcblx0XHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoc3RhdGUpIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8qKiB1bnN0YXJ0ZWQgKi9cblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAtMTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRldmVudFR5cGUgPSAnWVRQVW5zdGFydGVkJztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8qKiB1bnN0YXJ0ZWQgKi9cblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGV2ZW50VHlwZSA9ICdZVFBSZWFsRW5kJztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8qKiBwbGF5ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRldmVudFR5cGUgPSAnWVRQUGxheSc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLmNvbnRyb2xCYXIubGVuZ3RoKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIuY29udHJvbEJhci5maW5kKCcubWJfWVRQUGxheVBhdXNlJykuaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5wYXVzZSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIuaXNQbGF5ZXIpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5pbmxpbmVQbGF5QnV0dG9uLmhpZGUoKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShkb2N1bWVudCkub2ZmKCdtb3VzZWRvd24uWVRQc3RhcnQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8qKiBwYXVzZSAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnRUeXBlID0gJ1lUUFBhdXNlJztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIuY29udHJvbEJhci5sZW5ndGgpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5jb250cm9sQmFyLmZpbmQoJy5tYl9ZVFBQbGF5UGF1c2UnKS5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBsYXkpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLmlzUGxheWVyKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIuaW5saW5lUGxheUJ1dHRvbi5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvKiogYnVmZmVyICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBZVFBsYXllci5wbGF5ZXIuc2V0UGxheWJhY2tRdWFsaXR5KCdkZWZhdWx0Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gWVRQbGF5ZXIucGxheWVyLnNldFBsYXliYWNrUXVhbGl0eShZVFBsYXllci5vcHQucXVhbGl0eSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnRUeXBlID0gJ1lUUEJ1ZmZlcmluZyc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLmNvbnRyb2xCYXIubGVuZ3RoKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIuY29udHJvbEJhci5maW5kKCcubWJfWVRQUGxheVBhdXNlJykuaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5wbGF5KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8qKiBjdWVkICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgNTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRldmVudFR5cGUgPSAnWVRQQ3VlZCc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0XHRcdCBUcmlnZ2VyIHN0YXRlIGV2ZW50c1xuXHRcdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgWVRQRXZlbnQgPSBqUXVlcnkuRXZlbnQoZXZlbnRUeXBlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFlUUEV2ZW50LnRpbWUgPSBZVFBsYXllci5jdXJyZW50VGltZTtcblx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihZVFBFdmVudClcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0XHRcdCAqIG9uUGxheWJhY2tRdWFsaXR5Q2hhbmdlXG5cdFx0XHRcdFx0XHRcdFx0ICogQHBhcmFtIGVcblx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHQnb25QbGF5YmFja1F1YWxpdHlDaGFuZ2UnOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IHF1YWxpdHkgPSBlLnRhcmdldC5nZXRQbGF5YmFja1F1YWxpdHkoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBZVFBRdWFsaXR5Q2hhbmdlID0galF1ZXJ5LkV2ZW50KCdZVFBRdWFsaXR5Q2hhbmdlJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRZVFBRdWFsaXR5Q2hhbmdlLnF1YWxpdHkgPSBxdWFsaXR5O1xuXHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFlUUFF1YWxpdHlDaGFuZ2UpXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0XHQgKiBvbkVycm9yXG5cdFx0XHRcdFx0XHRcdFx0ICogQHBhcmFtIGVyclxuXHRcdFx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHRcdFx0IDIg4oCTIFRoZSByZXF1ZXN0IGNvbnRhaW5zIGFuIGludmFsaWQgcGFyYW1ldGVyIHZhbHVlLiBGb3IgZXhhbXBsZSwgdGhpcyBlcnJvciBvY2N1cnMgaWYgeW91IHNwZWNpZnkgYSB2aWRlbyBJRCB0aGF0IGRvZXMgbm90IGhhdmUgMTEgY2hhcmFjdGVycywgb3IgaWYgdGhlIHZpZGVvIElEIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycywgc3VjaCBhcyBleGNsYW1hdGlvbiBwb2ludHMgb3IgYXN0ZXJpc2tzLlxuXHRcdFx0XHRcdFx0XHRcdCA1IOKAkyBUaGUgcmVxdWVzdGVkIGNvbnRlbnQgY2Fubm90IGJlIHBsYXllZCBpbiBhbiBIVE1MNSBwbGF5ZXIgb3IgYW5vdGhlciBlcnJvciByZWxhdGVkIHRvIHRoZSBIVE1MNSBwbGF5ZXIgaGFzIG9jY3VycmVkLlxuXHRcdFx0XHRcdFx0XHRcdCAxMDAg4oCTIFRoZSB2aWRlbyByZXF1ZXN0ZWQgd2FzIG5vdCBmb3VuZC4gVGhpcyBlcnJvciBvY2N1cnMgd2hlbiBhIHZpZGVvIGhhcyBiZWVuIHJlbW92ZWQgKGZvciBhbnkgcmVhc29uKSBvciBoYXMgYmVlbiBtYXJrZWQgYXMgcHJpdmF0ZS5cblx0XHRcdFx0XHRcdFx0XHQgMTAxIOKAkyBUaGUgb3duZXIgb2YgdGhlIHJlcXVlc3RlZCB2aWRlbyBkb2VzIG5vdCBhbGxvdyBpdCB0byBiZSBwbGF5ZWQgaW4gZW1iZWRkZWQgcGxheWVycy5cblx0XHRcdFx0XHRcdFx0XHQgMTUwIOKAkyBUaGlzIGVycm9yIGlzIHRoZSBzYW1lIGFzIDEwMS4gSXQncyBqdXN0IGEgMTAxIGVycm9yIGluIGRpc2d1aXNlIVxuXHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdCdvbkVycm9yJyAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uIChlcnIpIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBZVFBsYXllci5vcHQub25FcnJvciA9PSAnZnVuY3Rpb24nKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRZVFBsYXllci5vcHQub25FcnJvcigkWVRQbGF5ZXIsIGVycik7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZGVidWcoXCJlcnJvcjpcIiwgZXJyKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChlcnIuZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcigndmlkZW8gSUQ6OiAnICsgWVRQbGF5ZXIudmlkZW9JRCArICc6IFRoZSByZXF1ZXN0IGNvbnRhaW5zIGFuIGludmFsaWQgcGFyYW1ldGVyIHZhbHVlLiBGb3IgZXhhbXBsZSwgdGhpcyBlcnJvciBvY2N1cnMgaWYgeW91IHNwZWNpZnkgYSB2aWRlbyBJRCB0aGF0IGRvZXMgbm90IGhhdmUgMTEgY2hhcmFjdGVycywgb3IgaWYgdGhlIHZpZGVvIElEIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycywgc3VjaCBhcyBleGNsYW1hdGlvbiBwb2ludHMgb3IgYXN0ZXJpc2tzLicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDU6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcigndmlkZW8gSUQ6OiAnICsgWVRQbGF5ZXIudmlkZW9JRCArICc6IFRoZSByZXF1ZXN0ZWQgY29udGVudCBjYW5ub3QgYmUgcGxheWVkIGluIGFuIEhUTUw1IHBsYXllciBvciBhbm90aGVyIGVycm9yIHJlbGF0ZWQgdG8gdGhlIEhUTUw1IHBsYXllciBoYXMgb2NjdXJyZWQuJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMTAwOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ3ZpZGVvIElEOjogJyArIFlUUGxheWVyLnZpZGVvSUQgKyAnOiBUaGUgdmlkZW8gcmVxdWVzdGVkIHdhcyBub3QgZm91bmQuIFRoaXMgZXJyb3Igb2NjdXJzIHdoZW4gYSB2aWRlbyBoYXMgYmVlbiByZW1vdmVkIChmb3IgYW55IHJlYXNvbikgb3IgaGFzIGJlZW4gbWFya2VkIGFzIHByaXZhdGUuJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMTAxOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDE1MDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCd2aWRlbyBJRDo6ICcgKyBZVFBsYXllci52aWRlb0lEICsgJzogVGhlIHZpZGVvIGRvZXNuXFwndCBleGlzdCBvciBUaGUgb3duZXIgZG9lcyBub3QgYWxsb3cgaXQgdG8gYmUgcGxheWVkIGluIGVtYmVkZGVkIHBsYXllcnMuJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLmlzTGlzdClcblx0XHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5ZVFBQbGF5TmV4dCgpXG5cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHQkWVRQbGF5ZXIub24oJ1lUUGxheWVySXNSZWFkeV8nICsgWVRQbGF5ZXIuaWQsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIuaXNSZWFkeSlcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXJFbCA9IFlUUGxheWVyLnBsYXllci5nZXRJZnJhbWUoKTtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyLnBsYXllckVsKS51bnNlbGVjdGFibGUoKTtcblx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLm9wdGltaXplRGlzcGxheSgpO1xuXG5cdFx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0XHQgKiBPcHRpbWl6ZSBkaXNwbGF5IG9uIHJlc2l6ZVxuXHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0alF1ZXJ5KHdpbmRvdykub2ZmKCdyZXNpemUuWVRQXycgKyBZVFBsYXllci5pZCkub24oJ3Jlc2l6ZS5ZVFBfJyArIFlUUGxheWVyLmlkLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLm9wdGltaXplRGlzcGxheSgpXG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0XHQgKiBPcHRpbWl6ZSBkaXNwbGF5IG9uIG9yaWVudGF0aW9uIGNoYW5nZVxuXHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0alF1ZXJ5KHdpbmRvdykub2ZmKCdvcmllbnRhdGlvbmNoYW5nZS5ZVFBfJyArIFlUUGxheWVyLmlkKS5vbignb3JpZW50YXRpb25jaGFuZ2UuWVRQXycgKyBZVFBsYXllci5pZCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG5cdFx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmRlYnVnKCdvcmllbnRhdGlvbmNoYW5nZScpXG5cdFx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLm9wdGltaXplRGlzcGxheSgpXG5cdFx0XHRcdFx0XHRcdFx0Ly8gfSwxKVxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0ICogU2V0IHRoZSB0aW1lIG9mIHRoZSBsYXN0IHZpc2l0IHByb2dyZXNzXG5cdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LnJlbWVtYmVyX2xhc3RfdGltZSkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSh3aW5kb3cpLm9uKCd1bmxvYWQuWVRQXycgKyBZVFBsYXllci5pZCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGN1cnJlbnRfdGltZSA9IFlUUGxheWVyLnBsYXllci5nZXRDdXJyZW50VGltZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5Lm1iQ29va2llLnNldCgnWVRQbGF5ZXJfc3RhcnRfZnJvbScgKyBZVFBsYXllci52aWRlb0lELCBjdXJyZW50X3RpbWUsIDApXG5cdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdCRZVFBsYXllci5ZVFBDaGVja0ZvclN0YXRlKClcblxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkWVRQbGF5ZXIub2ZmKCdZVFBUaW1lLm1hc2snKTtcblx0XHRcdFx0alF1ZXJ5Lm1iWVRQbGF5ZXIuYXBwbHlNYXNrKFlUUGxheWVyKTtcblxuXHRcdFx0XHRjb25zb2xlLnRpbWVFbmQoJ1lUUGxheWVySW5pdCcpXG5cdFx0XHR9KVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBZVFBsYXllclxuXHRcdCAqIEBwYXJhbSBwZXJjXG5cdFx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdFx0ICovXG5cdFx0aXNPblNjcmVlbjogZnVuY3Rpb24gKFlUUGxheWVyLCBwZXJjKSB7XG5cdFx0XHRwZXJjID0gcGVyYyB8fCAxMDtcblx0XHRcdGxldCBwbGF5ZXJCb3ggPSBZVFBsYXllci53cmFwcGVyO1xuXHRcdFx0bGV0IHdpblRvcCA9IGpRdWVyeSh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXHRcdFx0bGV0IHdpbkJvdHRvbSA9IHdpblRvcCArIGpRdWVyeSh3aW5kb3cpLmhlaWdodCgpO1xuXG5cdFx0XHRsZXQgbWFyZ2luID0gKHBsYXllckJveC5oZWlnaHQoKSAqIHBlcmMpIC8gMTAwO1xuXHRcdFx0bGV0IGVsVG9wID0gcGxheWVyQm94Lm9mZnNldCgpLnRvcCArIG1hcmdpbjtcblx0XHRcdGxldCBlbEJvdHRvbSA9IHBsYXllckJveC5vZmZzZXQoKS50b3AgKyAocGxheWVyQm94LmhlaWdodCgpIC0gbWFyZ2luKTtcblxuXHRcdFx0cmV0dXJuICgoZWxCb3R0b20gPD0gd2luQm90dG9tKSAmJiAoZWxUb3AgPj0gd2luVG9wKSlcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogZ2V0RGF0YUZyb21BUElcblx0XHQgKiBAcGFyYW0gWVRQbGF5ZXJcblx0XHQgKi9cblx0XHRnZXREYXRhRnJvbUFQSTogZnVuY3Rpb24gKFlUUGxheWVyKSB7XG5cblx0XHRcdFlUUGxheWVyLnZpZGVvRGF0YSA9IGpRdWVyeS5tYlN0b3JhZ2UuZ2V0KCdZVFBsYXllcl9kYXRhXycgKyBZVFBsYXllci52aWRlb0lEKTtcblx0XHRcdGlmIChZVFBsYXllci52aWRlb0RhdGEpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0WVRQbGF5ZXIuZGF0YVJlY2VpdmVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdGxldCBZVFBDaGFuZ2VkID0galF1ZXJ5LkV2ZW50KCdZVFBDaGFuZ2VkJyk7XG5cdFx0XHRcdFx0WVRQQ2hhbmdlZC50aW1lID0gWVRQbGF5ZXIuY3VycmVudFRpbWU7XG5cdFx0XHRcdFx0WVRQQ2hhbmdlZC52aWRlb0lkID0gWVRQbGF5ZXIudmlkZW9JRDtcblx0XHRcdFx0XHRZVFBDaGFuZ2VkLm9wdCA9IFlUUGxheWVyLm9wdDtcblxuXHRcdFx0XHRcdC8vY29uc29sZS5kZWJ1ZyhcInZpZGVvRGF0YTpcIixZVFBsYXllci52aWRlb0RhdGEpXG5cblx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnRyaWdnZXIoWVRQQ2hhbmdlZCk7XG5cblx0XHRcdFx0XHRsZXQgWVRQRGF0YSA9IGpRdWVyeS5FdmVudCgnWVRQRGF0YScpO1xuXHRcdFx0XHRcdFlUUERhdGEucHJvcCA9IHt9O1xuXG5cdFx0XHRcdFx0Zm9yIChsZXQgeCBpbiBZVFBsYXllci52aWRlb0RhdGEpXG5cdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIudmlkZW9EYXRhLmhhc093blByb3BlcnR5KHgpKVxuXHRcdFx0XHRcdFx0XHRZVFBEYXRhLnByb3BbeF0gPSBZVFBsYXllci52aWRlb0RhdGFbeF07XG5cblx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnRyaWdnZXIoWVRQRGF0YSlcblxuXHRcdFx0XHR9LCBZVFBsYXllci5vcHQuZmFkZU9uU3RhcnRUaW1lKTtcblxuXHRcdFx0XHRZVFBsYXllci5oYXNEYXRhID0gdHJ1ZVxuXG5cdFx0XHR9IGVsc2UgaWYgKGpRdWVyeS5tYllUUGxheWVyLmFwaUtleSkge1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBHZXQgdmlkZW8gaW5mbyBmcm9tIEFQSTMgKG5lZWRzIGFwaSBrZXkpXG5cdFx0XHRcdCAqIHNuaXBwZXQscGxheWVyLGNvbnRlbnREZXRhaWxzLHN0YXRpc3RpY3Msc3RhdHVzXG5cdFx0XHRcdCAqL1xuXG5cdFx0XHRcdGpRdWVyeS5nZXRKU09OKCdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3ZpZGVvcz9pZD0nICsgWVRQbGF5ZXIudmlkZW9JRCArICcma2V5PScgKyBqUXVlcnkubWJZVFBsYXllci5hcGlLZXkgKyAnJnBhcnQ9c25pcHBldCcsIGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0WVRQbGF5ZXIuZGF0YVJlY2VpdmVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdGxldCBZVFBDaGFuZ2VkID0galF1ZXJ5LkV2ZW50KCdZVFBDaGFuZ2VkJyk7XG5cdFx0XHRcdFx0WVRQQ2hhbmdlZC50aW1lID0gWVRQbGF5ZXIuY3VycmVudFRpbWU7XG5cdFx0XHRcdFx0WVRQQ2hhbmdlZC52aWRlb0lkID0gWVRQbGF5ZXIudmlkZW9JRDtcblx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnRyaWdnZXIoWVRQQ2hhbmdlZCk7XG5cblx0XHRcdFx0XHRmdW5jdGlvbiBwYXJzZVlUUGxheWVyX2RhdGEoZGF0YSkge1xuXHRcdFx0XHRcdFx0WVRQbGF5ZXIudmlkZW9EYXRhID0ge307XG5cdFx0XHRcdFx0XHRZVFBsYXllci52aWRlb0RhdGEuaWQgPSBZVFBsYXllci52aWRlb0lEO1xuXHRcdFx0XHRcdFx0WVRQbGF5ZXIudmlkZW9EYXRhLmNoYW5uZWxUaXRsZSA9IGRhdGEuY2hhbm5lbFRpdGxlO1xuXHRcdFx0XHRcdFx0WVRQbGF5ZXIudmlkZW9EYXRhLnRpdGxlID0gZGF0YS50aXRsZTtcblx0XHRcdFx0XHRcdFlUUGxheWVyLnZpZGVvRGF0YS5kZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb24ubGVuZ3RoIDwgNDAwID8gZGF0YS5kZXNjcmlwdGlvbiA6IGRhdGEuZGVzY3JpcHRpb24uc3Vic3RyaW5nKDAsIDQwMCkgKyAnIC4uLic7XG5cdFx0XHRcdFx0XHRZVFBsYXllci52aWRlb0RhdGEudGh1bWJfbWF4ID0gZGF0YS50aHVtYm5haWxzLm1heHJlcyA/IGRhdGEudGh1bWJuYWlscy5tYXhyZXMudXJsIDogbnVsbDtcblx0XHRcdFx0XHRcdFlUUGxheWVyLnZpZGVvRGF0YS50aHVtYl9oaWdoID0gZGF0YS50aHVtYm5haWxzLmhpZ2ggPyBkYXRhLnRodW1ibmFpbHMuaGlnaC51cmwgOiBudWxsO1xuXHRcdFx0XHRcdFx0WVRQbGF5ZXIudmlkZW9EYXRhLnRodW1iX21lZGl1bSA9IGRhdGEudGh1bWJuYWlscy5tZWRpdW0gPyBkYXRhLnRodW1ibmFpbHMubWVkaXVtLnVybCA6IG51bGw7XG5cdFx0XHRcdFx0XHRqUXVlcnkubWJTdG9yYWdlLnNldCgnWVRQbGF5ZXJfZGF0YV8nICsgWVRQbGF5ZXIudmlkZW9JRCwgWVRQbGF5ZXIudmlkZW9EYXRhKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghZGF0YS5pdGVtc1swXSkge1xuXHRcdFx0XHRcdFx0WVRQbGF5ZXIudmlkZW9EYXRhID0ge307XG5cdFx0XHRcdFx0XHRZVFBsYXllci5oYXNEYXRhID0gZmFsc2Vcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cGFyc2VZVFBsYXllcl9kYXRhKGRhdGEuaXRlbXNbMF0uc25pcHBldCk7XG5cdFx0XHRcdFx0XHRZVFBsYXllci5oYXNEYXRhID0gdHJ1ZVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxldCBZVFBEYXRhID0galF1ZXJ5LkV2ZW50KCdZVFBEYXRhJyk7XG5cdFx0XHRcdFx0WVRQRGF0YS5wcm9wID0ge307XG5cdFx0XHRcdFx0Zm9yIChsZXQgeCBpbiBZVFBsYXllci52aWRlb0RhdGEpIFlUUERhdGEucHJvcFt4XSA9IFlUUGxheWVyLnZpZGVvRGF0YVt4XTtcblx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnRyaWdnZXIoWVRQRGF0YSlcblx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5mYWlsKGZ1bmN0aW9uIChqcXhocikge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiWVQgZGF0YSBlcnJvcjo6IFwiLCBqcXhocik7XG5cdFx0XHRcdFx0XHRcdFlUUGxheWVyLmhhc0RhdGEgPSBmYWxzZTtcblxuXHRcdFx0XHRcdFx0XHRsZXQgWVRQQ2hhbmdlZCA9IGpRdWVyeS5FdmVudCgnWVRQQ2hhbmdlZCcpO1xuXHRcdFx0XHRcdFx0XHRZVFBDaGFuZ2VkLnRpbWUgPSBZVFBsYXllci5jdXJyZW50VGltZTtcblx0XHRcdFx0XHRcdFx0WVRQQ2hhbmdlZC52aWRlb0lkID0gWVRQbGF5ZXIudmlkZW9JRDtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFlUUENoYW5nZWQpXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRsZXQgWVRQQ2hhbmdlZCA9IGpRdWVyeS5FdmVudCgnWVRQQ2hhbmdlZCcpO1xuXHRcdFx0XHRcdFlUUENoYW5nZWQudGltZSA9IFlUUGxheWVyLmN1cnJlbnRUaW1lO1xuXHRcdFx0XHRcdFlUUENoYW5nZWQudmlkZW9JZCA9IFlUUGxheWVyLnZpZGVvSUQ7XG5cdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFlUUENoYW5nZWQpXG5cdFx0XHRcdH0sIDEwKTtcblx0XHRcdFx0WVRQbGF5ZXIudmlkZW9EYXRhID0gbnVsbFxuXHRcdFx0fVxuXG5cdFx0XHRZVFBsYXllci5vcHQucmF0aW8gPSBZVFBsYXllci5vcHQucmF0aW8gPT0gJ2F1dG8nID8gMTYgLyA5IDogWVRQbGF5ZXIub3B0LnJhdGlvO1xuXG5cdFx0XHRpZiAoWVRQbGF5ZXIuaXNQbGF5ZXIgJiYgIVlUUGxheWVyLm9wdC5hdXRvUGxheSkgeyAvLyYmICggIWpRdWVyeS5tYkJyb3dzZXIubW9iaWxlICYmICFqUXVlcnkuaXNUYWJsZXQgKVxuXHRcdFx0XHRZVFBsYXllci5sb2FkaW5nID0galF1ZXJ5KCc8ZGl2Lz4nKS5hZGRDbGFzcygnbG9hZGluZycpLmh0bWwoJ0xvYWRpbmcnKS5oaWRlKCk7XG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikuYXBwZW5kKFlUUGxheWVyLmxvYWRpbmcpO1xuXHRcdFx0XHRZVFBsYXllci5sb2FkaW5nLmZhZGVJbigpXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIHJlbW92ZVN0b3JlZERhdGFcblx0XHQgKi9cblx0XHRyZW1vdmVTdG9yZWREYXRhOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRqUXVlcnkubWJTdG9yYWdlLnJlbW92ZSgpXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIGdldFZpZGVvRGF0YVxuXHRcdCAqIEByZXR1cm5zIHsqfFlUUGxheWVyLnZpZGVvRGF0YX1cblx0XHQgKi9cblx0XHRnZXRWaWRlb0RhdGE6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXHRcdFx0cmV0dXJuIFlUUGxheWVyLnZpZGVvRGF0YVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBnZXRWaWRlb0lEXG5cdFx0ICogQHJldHVybnMgeyp8WVRQbGF5ZXIudmlkZW9JRHxib29sZWFufVxuXHRcdCAqL1xuXHRcdGdldFZpZGVvSUQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXHRcdFx0cmV0dXJuIFlUUGxheWVyLnZpZGVvSUQgfHwgZmFsc2Vcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogZ2V0UGxheWxpc3RJRFxuXHRcdCAqIEByZXR1cm5zIHsqfFlUUGxheWVyLnZpZGVvSUR8Ym9vbGVhbn1cblx0XHQgKi9cblx0XHRnZXRQbGF5bGlzdElEICA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXHRcdFx0cmV0dXJuIFlUUGxheWVyLnBsYXlsaXN0SUQgfHwgZmFsc2Vcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHNldFZpZGVvUXVhbGl0eVxuXHRcdCAqIEBkZXByZWNhdGVkXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gcXVhbGl0eVxuXHRcdCAqIEByZXR1cm5zIHtqUXVlcnkubWJZVFBsYXllcn1cblx0XHQgKi9cblx0XHRzZXRWaWRlb1F1YWxpdHk6IGZ1bmN0aW9uIChxdWFsaXR5KSB7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHQvKlxuXHRcdFx0XHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLllUUFBhdXNlKCk7XG5cdFx0XHRcdFx0XHRZVFBsYXllci5vcHQucXVhbGl0eSA9IHF1YWxpdHk7XG5cdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2V0UGxheWJhY2tRdWFsaXR5KHF1YWxpdHkpO1xuXHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5ZVFBQbGF5KCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1xuXHRcdFx0Ki9cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogZ2V0VmlkZW9RdWFsaXR5XG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdGdldFZpZGVvUXVhbGl0eTogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cdFx0XHRsZXQgcXVhbGl0eSA9IFlUUGxheWVyLnBsYXllci5nZXRQbGF5YmFja1F1YWxpdHkoKTtcblx0XHRcdHJldHVybiBxdWFsaXR5XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIHBsYXlsaXN0XG5cdFx0ICogQHBhcmFtIHZpZGVvcyAtPiBBcnJheSBvciBTdHJpbmcgKHZpZGVvTGlzdCBJRClcblx0XHQgKiBAcGFyYW0gc2h1ZmZsZVxuXHRcdCAqIEBwYXJhbSBjYWxsYmFja1xuXHRcdCAqIEByZXR1cm5zIHtqUXVlcnkubWJZVFBsYXllcn1cblx0XHQgKlxuXHRcdCAqIFRvIHJldHJpZXZlIGEgWW91dHViZSBwbGF5bGlzdCB0aGUgWW91dHViZSBBUEkga2V5IGlzIHJlcXVpcmVkOlxuXHRcdCAqIGh0dHBzOi8vY29uc29sZS5kZXZlbG9wZXJzLmdvb2dsZS5jb20vXG5cdFx0ICogalF1ZXJ5Lm1iWVRQbGF5ZXIuYXBpS2V5XG5cdFx0ICovXG5cdFx0cGxheWxpc3Q6IGZ1bmN0aW9uICh2aWRlb3MsIHNodWZmbGUsIGNhbGxiYWNrKSB7XG5cblx0XHRcdGxldCAkWVRQbGF5ZXIgPSB0aGlzO1xuXHRcdFx0bGV0IFlUUGxheWVyID0gJFlUUGxheWVyLmdldCgwKTtcblxuXHRcdFx0Lypcblx0XHRcdGlmICh0eXBlb2YgdmlkZW9zID09IFwiU3RyaW5nXCIgJiYgalF1ZXJ5Lm1iWVRQbGF5ZXIuYXBpS2V5ICE9IFwiXCIpIHtcblx0XHRcdFx0ZnVuY3Rpb24gZ2V0VmlkZW9MaXN0RnJvbVlvdXR1YmUocGxheUxpc3RJRCwgcGFnZSkge1xuXHRcdFx0XHRwYWdlID0gcGFnZSB8fCAnJztcblx0XHRcdFx0bGV0IHlvdXR1YmVBUEkgPSBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvcGxheWxpc3RJdGVtc1wiO1xuXHRcdFx0XHRqUXVlcnkuZ2V0SlNPTih5b3V0dWJlQVBJLCB7XG5cdFx0XHRcdFx0cGFydCAgICAgIDogXCJzbmlwcGV0LGNvbnRlbnREZXRhaWxzXCIsXG5cdFx0XHRcdFx0cGxheWxpc3RJZDogcGxheUxpc3RJRCwgLy9Zb3UgaGF2ZSB0byBlbnRlciB0aGUgUGxheWxpc3RJRFxuXHRcdFx0XHRcdG1heFJlc3VsdHM6IDUwLFxuXHRcdFx0XHRcdHBhZ2VUb2tlbiA6IHBhZ2UsXG5cdFx0XHRcdFx0a2V5ICAgICAgIDogalF1ZXJ5Lm1iWVRQbGF5ZXIuYXBpS2V5IC8vWW91IGhhdmUgdG8gZW50ZXIgeW91ciBvd24gWW91dHViZUFQSUtleVxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFx0XHRcdENyZWF0ZVZpZGVvc0FycmF5KHJlc3BvbnNlKTtcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UubmV4dFBhZ2VUb2tlbikge1xuXHRcdFx0XHRcdHBhZ2UgPSByZXNwb25zZS5uZXh0UGFnZVRva2VuO1xuXHRcdFx0XHRcdGdldFZpZGVvTGlzdEZyb21Zb3V0dWJlKHBsSUQsIHBhZ2UsIHZpZGVvcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkWVRQbGF5ZXIuWVRQbGF5bGlzdChZVFBsYXllci52aWRlb3MsIHNodWZmbGUsIGNhbGxiYWNrKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGZ1bmN0aW9uIENyZWF0ZVZpZGVvc0FycmF5KHJlc3BvbnNlKSB7XG5cdFx0XHRcdGxldCBrID0gcmVzcG9uc2UuaXRlbXMubGVuZ3RoO1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGs7IGkrKykge1xuXHRcdFx0XHRcdFlUUGxheWVyLnZpZGVvcy5wdXNoKHtcblx0XHRcdFx0XHRcInZpZGVvVVJMXCI6IHJlc3BvbnNlLml0ZW1zW2ldLmNvbnRlbnREZXRhaWxzLnZpZGVvSWRcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHQ7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Z2V0VmlkZW9MaXN0RnJvbVlvdXR1YmUodmlkZW9zKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0XHQqL1xuXG5cdFx0XHRZVFBsYXllci5pc0xpc3QgPSB0cnVlO1xuXG5cdFx0XHRpZiAoc2h1ZmZsZSlcblx0XHRcdFx0dmlkZW9zID0galF1ZXJ5LnNodWZmbGUodmlkZW9zKTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci52aWRlb0lEKSB7XG5cdFx0XHRcdFlUUGxheWVyLnZpZGVvcyA9IHZpZGVvcztcblx0XHRcdFx0WVRQbGF5ZXIudmlkZW9Db3VudGVyID0gMTtcblx0XHRcdFx0WVRQbGF5ZXIudmlkZW9MZW5ndGggPSB2aWRlb3MubGVuZ3RoO1xuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLmRhdGEoJ3Byb3BlcnR5JywgdmlkZW9zWzBdKTtcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5ZVFBsYXllcigpXG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJylcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5vbignWVRQQ2hhbmdlZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRjYWxsYmFjayhZVFBsYXllcilcblx0XHRcdFx0fSk7XG5cblx0XHRcdGpRdWVyeShZVFBsYXllcikub24oJ1lUUEVuZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5ZVFBQbGF5TmV4dCgpXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIHBsYXlOZXh0XG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdHBsYXlOZXh0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblx0XHRcdFlUUGxheWVyLnZpZGVvQ291bnRlcisrO1xuXHRcdFx0aWYgKFlUUGxheWVyLnZpZGVvQ291bnRlciA+IFlUUGxheWVyLnZpZGVvTGVuZ3RoKVxuXHRcdFx0XHRZVFBsYXllci52aWRlb0NvdW50ZXIgPSAxO1xuXHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5ZVFBQbGF5SW5kZXgoWVRQbGF5ZXIudmlkZW9Db3VudGVyKTtcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIHBsYXlQcmV2XG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdHBsYXlQcmV2OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblx0XHRcdFlUUGxheWVyLnZpZGVvQ291bnRlci0tO1xuXHRcdFx0aWYgKFlUUGxheWVyLnZpZGVvQ291bnRlciA8PSAwKVxuXHRcdFx0XHRZVFBsYXllci52aWRlb0NvdW50ZXIgPSBZVFBsYXllci52aWRlb0xlbmd0aDtcblx0XHRcdGpRdWVyeShZVFBsYXllcikuWVRQUGxheUluZGV4KFlUUGxheWVyLnZpZGVvQ291bnRlcik7XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBwbGF5SW5kZXhcblx0XHQgKiBAcGFyYW0gaWR4XG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdHBsYXlJbmRleDogZnVuY3Rpb24gKGlkeCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cdFx0XHRpZiAoWVRQbGF5ZXIuY2hlY2tGb3JTdGFydEF0KSB7XG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwoWVRQbGF5ZXIuY2hlY2tGb3JTdGFydEF0KTtcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbChZVFBsYXllci5nZXRTdGF0ZSlcblx0XHRcdH1cblx0XHRcdFlUUGxheWVyLnZpZGVvQ291bnRlciA9IGlkeDtcblxuXHRcdFx0aWYgKFlUUGxheWVyLnZpZGVvQ291bnRlciA+PSBZVFBsYXllci52aWRlb0xlbmd0aClcblx0XHRcdFx0WVRQbGF5ZXIudmlkZW9Db3VudGVyID0gWVRQbGF5ZXIudmlkZW9MZW5ndGg7XG5cblx0XHRcdGxldCB2aWRlbyA9IFlUUGxheWVyLnZpZGVvc1tZVFBsYXllci52aWRlb0NvdW50ZXIgLSAxXTtcblxuXHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5ZVFBDaGFuZ2VWaWRlbyh2aWRlbyk7XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBjaGFuZ2VWaWRlb1xuXHRcdCAqIEBwYXJhbSBvcHRcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0Y2hhbmdlVmlkZW86IGZ1bmN0aW9uIChvcHQpIHtcblx0XHRcdGxldCAkWVRQbGF5ZXIgPSB0aGlzO1xuXHRcdFx0bGV0IFlUUGxheWVyID0gJFlUUGxheWVyLmdldCgwKTtcblxuXHRcdFx0WVRQbGF5ZXIub3B0LnN0YXJ0QXQgPSAwO1xuXHRcdFx0WVRQbGF5ZXIub3B0LnN0b3BBdCA9IDA7XG5cdFx0XHRZVFBsYXllci5vcHQubWFzayA9IGZhbHNlO1xuXHRcdFx0WVRQbGF5ZXIub3B0Lm11dGUgPSB0cnVlO1xuXHRcdFx0WVRQbGF5ZXIub3B0LmF1dG9QbGF5ID0gdHJ1ZTtcblx0XHRcdFlUUGxheWVyLm9wdC5hZGRGaWx0ZXJzID0gZmFsc2U7XG5cdFx0XHRZVFBsYXllci5vcHQuY292ZXJJbWFnZSA9IGZhbHNlO1xuXG5cdFx0XHRZVFBsYXllci5oYXNEYXRhID0gZmFsc2U7XG5cdFx0XHRZVFBsYXllci5oYXNDaGFuZ2VkID0gdHJ1ZTtcblxuXHRcdFx0WVRQbGF5ZXIucGxheWVyLmxvb3BUaW1lID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRpZiAob3B0KVxuXHRcdFx0XHRqUXVlcnkuZXh0ZW5kKFlUUGxheWVyLm9wdCwgb3B0KTtcblxuXHRcdFx0WVRQbGF5ZXIudmlkZW9JRCA9IGdldFlUUFZpZGVvSUQoWVRQbGF5ZXIub3B0LnZpZGVvVVJMKS52aWRlb0lEO1xuXG5cdFx0XHRpZiAoWVRQbGF5ZXIub3B0Lmxvb3AgJiYgdHlwZW9mIFlUUGxheWVyLm9wdC5sb29wID09ICdib29sZWFuJylcblx0XHRcdFx0WVRQbGF5ZXIub3B0Lmxvb3AgPSA5OTk5O1xuXG5cdFx0XHRZVFBsYXllci53cmFwcGVyLmNzcyh7XG5cdFx0XHRcdGJhY2tncm91bmQ6ICdub25lJ1xuXHRcdFx0fSk7XG5cblx0XHRcdGpRdWVyeShZVFBsYXllci5wbGF5ZXJFbCkuQ1NTQW5pbWF0ZSh7XG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdH0sIFlUUGxheWVyLm9wdC5mYWRlT25TdGFydFRpbWUsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRqUXVlcnkubWJZVFBsYXllci5nZXREYXRhRnJvbUFQSShZVFBsYXllcik7XG5cblx0XHRcdFx0JFlUUGxheWVyLllUUEdldFBsYXllcigpLmxvYWRWaWRlb0J5SWQoe1xuXHRcdFx0XHRcdHZpZGVvSWQgICAgICAgICA6IFlUUGxheWVyLnZpZGVvSUQsXG5cdFx0XHRcdFx0Ly8gc3RhcnRTZWNvbmRzOiBZVFBsYXllci5vcHQuc3RhcnRBdCxcblx0XHRcdFx0XHQvLyBlbmRTZWNvbmRzOiBZVFBsYXllci5vcHQuc3RvcEF0LFxuXHRcdFx0XHRcdHN1Z2dlc3RlZFF1YWxpdHk6IFlUUGxheWVyLm9wdC5xdWFsaXR5XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCRZVFBsYXllci5ZVFBQYXVzZSgpO1xuXHRcdFx0XHQkWVRQbGF5ZXIub3B0aW1pemVEaXNwbGF5KCk7XG5cblx0XHRcdFx0aWYgKFlUUGxheWVyLmNoZWNrRm9yU3RhcnRBdCkge1xuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoWVRQbGF5ZXIuY2hlY2tGb3JTdGFydEF0KTtcblx0XHRcdFx0XHRjbGVhckludGVydmFsKFlUUGxheWVyLmdldFN0YXRlKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCRZVFBsYXllci5ZVFBDaGVja0ZvclN0YXRlKClcblx0XHRcdH0pO1xuXG5cdFx0XHRsZXQgWVRQQ2hhbmdlVmlkZW8gPSBqUXVlcnkuRXZlbnQoJ1lUUENoYW5nZVZpZGVvJyk7XG5cdFx0XHRZVFBDaGFuZ2VWaWRlby50aW1lID0gWVRQbGF5ZXIuY3VycmVudFRpbWU7XG5cdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnRyaWdnZXIoWVRQQ2hhbmdlVmlkZW8pO1xuXG5cdFx0XHRqUXVlcnkubWJZVFBsYXllci5hcHBseU1hc2soWVRQbGF5ZXIpO1xuXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBnZXRQbGF5ZXJcblx0XHQgKiBAcmV0dXJucyB7cGxheWVyfVxuXHRcdCAqL1xuXHRcdGdldFBsYXllcjogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cblx0XHRcdGlmICghWVRQbGF5ZXIuaXNSZWFkeSlcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHRcdHJldHVybiBZVFBsYXllci5wbGF5ZXIgfHwgbnVsbFxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBwbGF5ZXJEZXN0cm95XG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdHBsYXllckRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXG5cdFx0XHRpZiAoIVlUUGxheWVyLmlzUmVhZHkpXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHR5dHAuWVRBUElSZWFkeSA9IHRydWU7XG5cdFx0XHR5dHAuYmFja2dyb3VuZElzSW5pdGVkID0gZmFsc2U7XG5cdFx0XHRZVFBsYXllci5pc0luaXQgPSBmYWxzZTtcblx0XHRcdFlUUGxheWVyLnZpZGVvSUQgPSBudWxsO1xuXHRcdFx0WVRQbGF5ZXIuaXNSZWFkeSA9IGZhbHNlO1xuXHRcdFx0WVRQbGF5ZXIud3JhcHBlci5yZW1vdmUoKTtcblx0XHRcdGpRdWVyeSgnI2NvbnRyb2xCYXJfJyArIFlUUGxheWVyLmlkKS5yZW1vdmUoKTtcblx0XHRcdGNsZWFySW50ZXJ2YWwoWVRQbGF5ZXIuY2hlY2tGb3JTdGFydEF0KTtcblx0XHRcdGNsZWFySW50ZXJ2YWwoWVRQbGF5ZXIuZ2V0U3RhdGUpO1xuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogZnVsbHNjcmVlblxuXHRcdCAqIEBwYXJhbSByZWFsXG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdGZ1bGxzY3JlZW46IGZ1bmN0aW9uIChyZWFsKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblxuXHRcdFx0aWYgKHR5cGVvZiByZWFsID09ICd1bmRlZmluZWQnKVxuXHRcdFx0XHRyZWFsID0gZXZhbChZVFBsYXllci5vcHQucmVhbEZ1bGxzY3JlZW4pO1xuXG5cdFx0XHRsZXQgY29udHJvbHMgPSBqUXVlcnkoJyNjb250cm9sQmFyXycgKyBZVFBsYXllci5pZCk7XG5cdFx0XHRsZXQgZnVsbFNjcmVlbkJ0biA9IGNvbnRyb2xzLmZpbmQoJy5tYl9Pbmx5WVQnKTtcblx0XHRcdGxldCB2aWRlb1dyYXBwZXIgPSBZVFBsYXllci5pc1BsYXllciA/IFlUUGxheWVyLm9wdC5jb250YWlubWVudCA6IFlUUGxheWVyLndyYXBwZXI7XG5cblx0XHRcdGlmIChyZWFsKSB7XG5cdFx0XHRcdGxldCBmdWxsc2NyZWVuY2hhbmdlID0galF1ZXJ5Lm1iQnJvd3Nlci5tb3ppbGxhID8gJ21vemZ1bGxzY3JlZW5jaGFuZ2UnIDogalF1ZXJ5Lm1iQnJvd3Nlci53ZWJraXQgPyAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScgOiAnZnVsbHNjcmVlbmNoYW5nZSc7XG5cdFx0XHRcdGpRdWVyeShkb2N1bWVudCkub2ZmKGZ1bGxzY3JlZW5jaGFuZ2UpLm9uKGZ1bGxzY3JlZW5jaGFuZ2UsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRsZXQgaXNGdWxsU2NyZWVuID0gUnVuUHJlZml4TWV0aG9kKGRvY3VtZW50LCAnSXNGdWxsU2NyZWVuJykgfHwgUnVuUHJlZml4TWV0aG9kKGRvY3VtZW50LCAnRnVsbFNjcmVlbicpO1xuXHRcdFx0XHRcdGlmICghaXNGdWxsU2NyZWVuKSB7XG5cdFx0XHRcdFx0XHRZVFBsYXllci5pc0Fsb25lID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRmdWxsU2NyZWVuQnRuLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMub25seVlUKTtcblx0XHRcdFx0XHRcdC8valF1ZXJ5KFlUUGxheWVyKS5ZVFBTZXRWaWRlb1F1YWxpdHkoWVRQbGF5ZXIub3B0LnF1YWxpdHkpO1xuXHRcdFx0XHRcdFx0dmlkZW9XcmFwcGVyLnJlbW92ZUNsYXNzKCdZVFBGdWxsc2NyZWVuJyk7XG5cdFx0XHRcdFx0XHR2aWRlb1dyYXBwZXIuQ1NTQW5pbWF0ZSh7XG5cdFx0XHRcdFx0XHRcdG9wYWNpdHk6IFlUUGxheWVyLm9wdC5vcGFjaXR5XG5cdFx0XHRcdFx0XHR9LCBZVFBsYXllci5vcHQuZmFkZU9uU3RhcnRUaW1lKTtcblxuXHRcdFx0XHRcdFx0dmlkZW9XcmFwcGVyLmNzcyh7XG5cdFx0XHRcdFx0XHRcdHpJbmRleDogMFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5pc0JhY2tncm91bmQpIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KCdib2R5JykuYWZ0ZXIoY29udHJvbHMpXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLmJlZm9yZShjb250cm9scylcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGpRdWVyeSh3aW5kb3cpLnJlc2l6ZSgpO1xuXHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKCdZVFBGdWxsU2NyZWVuRW5kJylcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdC8valF1ZXJ5KFlUUGxheWVyKS5ZVFBTZXRWaWRlb1F1YWxpdHkoJ2RlZmF1bHQnKTtcblx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcignWVRQRnVsbFNjcmVlblN0YXJ0JylcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdGlmICghWVRQbGF5ZXIuaXNBbG9uZSkge1xuXHRcdFx0XHRmdW5jdGlvbiBoaWRlTW91c2UoKSB7XG5cdFx0XHRcdFx0WVRQbGF5ZXIub3ZlcmxheS5jc3Moe1xuXHRcdFx0XHRcdFx0Y3Vyc29yOiAnbm9uZSdcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0alF1ZXJ5KGRvY3VtZW50KS5vbignbW91c2Vtb3ZlLllUUGxheWVyJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRZVFBsYXllci5vdmVybGF5LmNzcyh7XG5cdFx0XHRcdFx0XHRjdXJzb3I6ICdhdXRvJ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChZVFBsYXllci5oaWRlQ3Vyc29yKTtcblx0XHRcdFx0XHRpZiAoIWpRdWVyeShlLnRhcmdldCkucGFyZW50cygpLmlzKCcubWJfWVRQQmFyJykpXG5cdFx0XHRcdFx0XHRZVFBsYXllci5oaWRlQ3Vyc29yID0gc2V0VGltZW91dChoaWRlTW91c2UsIDMwMDApXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGhpZGVNb3VzZSgpO1xuXG5cdFx0XHRcdGlmIChyZWFsKSB7XG5cdFx0XHRcdFx0dmlkZW9XcmFwcGVyLmNzcyh7XG5cdFx0XHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dmlkZW9XcmFwcGVyLmFkZENsYXNzKCdZVFBGdWxsc2NyZWVuJyk7XG5cdFx0XHRcdFx0bGF1bmNoRnVsbHNjcmVlbih2aWRlb1dyYXBwZXIuZ2V0KDApKTtcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0dmlkZW9XcmFwcGVyLkNTU0FuaW1hdGUoe1xuXHRcdFx0XHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRcdFx0XHR9LCBZVFBsYXllci5vcHQuZmFkZU9uU3RhcnRUaW1lICogMik7XG5cblx0XHRcdFx0XHRcdHZpZGVvV3JhcHBlci5hcHBlbmQoY29udHJvbHMpO1xuXHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5vcHRpbWl6ZURpc3BsYXkoKTtcblx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5zZWVrVG8oWVRQbGF5ZXIucGxheWVyLmdldEN1cnJlbnRUaW1lKCkgKyAuMSwgdHJ1ZSlcblxuXHRcdFx0XHRcdH0sIFlUUGxheWVyLm9wdC5mYWRlT25TdGFydFRpbWUpXG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdHZpZGVvV3JhcHBlci5jc3Moe1xuXHRcdFx0XHRcdFx0ekluZGV4OiAxMDAwMFxuXHRcdFx0XHRcdH0pLkNTU0FuaW1hdGUoe1xuXHRcdFx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRcdH0sIFlUUGxheWVyLm9wdC5mYWRlT25TdGFydFRpbWUgKiAyKTtcblx0XHRcdFx0ZnVsbFNjcmVlbkJ0bi5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnNob3dTaXRlKTtcblx0XHRcdFx0WVRQbGF5ZXIuaXNBbG9uZSA9IHRydWVcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGpRdWVyeShkb2N1bWVudCkub2ZmKCdtb3VzZW1vdmUuWVRQbGF5ZXInKTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KFlUUGxheWVyLmhpZGVDdXJzb3IpO1xuXHRcdFx0XHRZVFBsYXllci5vdmVybGF5LmNzcyh7XG5cdFx0XHRcdFx0Y3Vyc29yOiAnYXV0bydcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChyZWFsKSB7XG5cdFx0XHRcdFx0Y2FuY2VsRnVsbHNjcmVlbigpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmlkZW9XcmFwcGVyLkNTU0FuaW1hdGUoe1xuXHRcdFx0XHRcdFx0b3BhY2l0eTogWVRQbGF5ZXIub3B0Lm9wYWNpdHlcblx0XHRcdFx0XHR9LCBZVFBsYXllci5vcHQuZmFkZU9uU3RhcnRUaW1lKTtcblx0XHRcdFx0XHR2aWRlb1dyYXBwZXIuY3NzKHtcblx0XHRcdFx0XHRcdHpJbmRleDogMFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0ZnVsbFNjcmVlbkJ0bi5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLm9ubHlZVCk7XG5cdFx0XHRcdFlUUGxheWVyLmlzQWxvbmUgPSBmYWxzZVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBSdW5QcmVmaXhNZXRob2Qob2JqLCBtZXRob2QpIHtcblx0XHRcdFx0bGV0IHBmeCA9IFsnd2Via2l0JywgJ21veicsICdtcycsICdvJywgJyddO1xuXHRcdFx0XHRsZXQgcCA9IDAsXG5cdFx0XHRcdFx0XHRtLCB0O1xuXHRcdFx0XHR3aGlsZSAocCA8IHBmeC5sZW5ndGggJiYgIW9ialttXSkge1xuXHRcdFx0XHRcdG0gPSBtZXRob2Q7XG5cdFx0XHRcdFx0aWYgKHBmeFtwXSA9PSAnJykge1xuXHRcdFx0XHRcdFx0bSA9IG0uc3Vic3RyKDAsIDEpLnRvTG93ZXJDYXNlKCkgKyBtLnN1YnN0cigxKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtID0gcGZ4W3BdICsgbTtcblx0XHRcdFx0XHR0ID0gdHlwZW9mIG9ialttXTtcblx0XHRcdFx0XHRpZiAodCAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0cGZ4ID0gW3BmeFtwXV07XG5cdFx0XHRcdFx0XHRyZXR1cm4gKHQgPT0gJ2Z1bmN0aW9uJyA/IG9ialttXSgpIDogb2JqW21dKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwKytcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBsYXVuY2hGdWxsc2NyZWVuKGVsZW1lbnQpIHtcblx0XHRcdFx0UnVuUHJlZml4TWV0aG9kKGVsZW1lbnQsICdSZXF1ZXN0RnVsbFNjcmVlbicpXG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGNhbmNlbEZ1bGxzY3JlZW4oKSB7XG5cdFx0XHRcdGlmIChSdW5QcmVmaXhNZXRob2QoZG9jdW1lbnQsICdGdWxsU2NyZWVuJykgfHwgUnVuUHJlZml4TWV0aG9kKGRvY3VtZW50LCAnSXNGdWxsU2NyZWVuJykpIHtcblx0XHRcdFx0XHRSdW5QcmVmaXhNZXRob2QoZG9jdW1lbnQsICdDYW5jZWxGdWxsU2NyZWVuJylcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiB0b2dnbGVMb29wc1xuXHRcdCAqIEByZXR1cm5zIHtqUXVlcnkubWJZVFBsYXllcn1cblx0XHQgKi9cblx0XHR0b2dnbGVMb29wczogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cdFx0XHRsZXQgZGF0YSA9IFlUUGxheWVyLm9wdDtcblx0XHRcdGlmIChkYXRhLmxvb3AgPT0gMSkge1xuXHRcdFx0XHRkYXRhLmxvb3AgPSAwXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoZGF0YS5zdGFydEF0KSB7XG5cdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnNlZWtUbyhkYXRhLnN0YXJ0QXQpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnBsYXlWaWRlbygpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZGF0YS5sb29wID0gMVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogcGxheVxuXHRcdCAqIEByZXR1cm5zIHtqUXVlcnkubWJZVFBsYXllcn1cblx0XHQgKi9cblx0XHRwbGF5OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblx0XHRcdGxldCAkWVRQbGF5ZXIgPSBqUXVlcnkoWVRQbGF5ZXIpO1xuXG5cdFx0XHRpZiAoIVlUUGxheWVyLmlzUmVhZHkpXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JFlUUGxheWVyLllUUFNldEFidW5kYW5jZShZVFBsYXllci5vcHQuYWJ1bmRhbmNlKVxuXHRcdFx0fSwgMzAwKTtcblxuXHRcdFx0WVRQbGF5ZXIucGxheWVyLnBsYXlWaWRlbygpO1xuXG5cdFx0XHRqUXVlcnkoWVRQbGF5ZXIucGxheWVyRWwpLmNzcyh7XG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdH0pO1xuXG5cdFx0XHRZVFBsYXllci53cmFwcGVyLmNzcyh7XG5cdFx0XHRcdGJhY2tncm91bmRJbWFnZTogJ25vbmUnXG5cdFx0XHR9KTtcblxuXHRcdFx0WVRQbGF5ZXIud3JhcHBlci5DU1NBbmltYXRlKHtcblx0XHRcdFx0b3BhY2l0eTogWVRQbGF5ZXIuaXNBbG9uZSA/IDEgOiBZVFBsYXllci5vcHQub3BhY2l0eVxuXHRcdFx0fSwgWVRQbGF5ZXIub3B0LmZhZGVPblN0YXJ0VGltZSk7XG5cblx0XHRcdGxldCBjb250cm9scyA9IGpRdWVyeSgnI2NvbnRyb2xCYXJfJyArIFlUUGxheWVyLmlkKTtcblx0XHRcdGxldCBwbGF5QnRuID0gY29udHJvbHMuZmluZCgnLm1iX1lUUFBsYXlQYXVzZScpO1xuXHRcdFx0cGxheUJ0bi5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBhdXNlKTtcblx0XHRcdFlUUGxheWVyLnN0YXRlID0gMTtcblxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogdG9nZ2xlUGxheVxuXHRcdCAqIEBwYXJhbSBjYWxsYmFja1xuXHRcdCAqIEByZXR1cm5zIHtqUXVlcnkubWJZVFBsYXllcn1cblx0XHQgKi9cblx0XHR0b2dnbGVQbGF5OiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXG5cdFx0XHRpZiAoIVlUUGxheWVyLmlzUmVhZHkpXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRpZiAoWVRQbGF5ZXIuc3RhdGUgPT0gMSlcblx0XHRcdFx0dGhpcy5ZVFBQYXVzZSgpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLllUUFBsYXkoKTtcblxuXHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKVxuXHRcdFx0XHRjYWxsYmFjayhZVFBsYXllci5zdGF0ZSk7XG5cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIHN0b3Bcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0c3RvcDogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cblx0XHRcdGlmICghWVRQbGF5ZXIuaXNSZWFkeSlcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdGxldCBjb250cm9scyA9IGpRdWVyeSgnI2NvbnRyb2xCYXJfJyArIFlUUGxheWVyLmlkKTtcblx0XHRcdGxldCBwbGF5QnRuID0gY29udHJvbHMuZmluZCgnLm1iX1lUUFBsYXlQYXVzZScpO1xuXHRcdFx0cGxheUJ0bi5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBsYXkpO1xuXHRcdFx0WVRQbGF5ZXIucGxheWVyLnN0b3BWaWRlbygpO1xuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogcGF1c2Vcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0cGF1c2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXG5cdFx0XHRpZiAoIVlUUGxheWVyLmlzUmVhZHkpXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmFidW5kYW5jZSA8IC4yKVxuXHRcdFx0XHR0aGlzLllUUFNldEFidW5kYW5jZSguMik7XG5cblx0XHRcdFlUUGxheWVyLnBsYXllci5wYXVzZVZpZGVvKCk7XG5cdFx0XHRZVFBsYXllci5zdGF0ZSA9IDI7XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBzZWVrVG9cblx0XHQgKiBAcGFyYW0gc2VjXG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdHNlZWtUbzogZnVuY3Rpb24gKHNlYykge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cblx0XHRcdGlmICghWVRQbGF5ZXIuaXNSZWFkeSlcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdFlUUGxheWVyLnBsYXllci5zZWVrVG8oc2VjLCB0cnVlKTtcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqXG5cdFx0ICogQHJldHVybnMgeyp9XG5cdFx0ICovXG5cdFx0Z2V0UGxheWJhY2tSYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci5pc1JlYWR5KVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0cmV0dXJuIFlUUGxheWVyLnBsYXllci5nZXRQbGF5YmFja1JhdGUoKVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBzZXRQbGF5YmFja1JhdGVcblx0XHQgKiBAcGFyYW0gdmFsOk51bWJlclxuXHRcdCAqIDAuMjUsIDAuNSwgMSwgMS41LCAyXG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdHNldFBsYXliYWNrUmF0ZTogZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cblx0XHRcdGlmICghWVRQbGF5ZXIuaXNSZWFkeSlcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdFlUUGxheWVyLnBsYXllci5zZXRQbGF5YmFja1JhdGUodmFsKTtcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIHNldFZvbHVtZVxuXHRcdCAqIEBwYXJhbSB2YWxcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0c2V0Vm9sdW1lOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci5pc1JlYWR5KVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0WVRQbGF5ZXIub3B0LnZvbCA9IHZhbDtcblx0XHRcdHRoaXMuWVRQVW5tdXRlKCk7XG5cdFx0XHRZVFBsYXllci5wbGF5ZXIuc2V0Vm9sdW1lKFlUUGxheWVyLm9wdC52b2wpO1xuXG5cdFx0XHRpZiAoWVRQbGF5ZXIudm9sdW1lQmFyICYmIFlUUGxheWVyLnZvbHVtZUJhci5sZW5ndGgpXG5cdFx0XHRcdFlUUGxheWVyLnZvbHVtZUJhci51cGRhdGVTbGlkZXJWYWwodmFsKTtcblxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldFZvbHVtZVxuXHRcdCAqIEByZXR1cm5zIHsqfVxuXHRcdCAqL1xuXHRcdGdldFZvbHVtZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cblx0XHRcdGlmICghWVRQbGF5ZXIuaXNSZWFkeSlcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdHJldHVybiBZVFBsYXllci5wbGF5ZXIuZ2V0Vm9sdW1lKClcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogdG9nZ2xlVm9sdW1lXG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdHRvZ2dsZVZvbHVtZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci5pc1JlYWR5KVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0aWYgKFlUUGxheWVyLmlzTXV0ZSkge1xuXHRcdFx0XHRpZiAoIWpRdWVyeS5tYkJyb3dzZXIubW9iaWxlKVxuXHRcdFx0XHRcdHRoaXMuWVRQU2V0Vm9sdW1lKFlUUGxheWVyLm9wdC52b2wpO1xuXHRcdFx0XHR0aGlzLllUUFVubXV0ZSgpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLllUUE11dGUoKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogbXV0ZVxuXHRcdCAqIEByZXR1cm5zIHtqUXVlcnkubWJZVFBsYXllcn1cblx0XHQgKi9cblx0XHRtdXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci5pc1JlYWR5KVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0aWYgKFlUUGxheWVyLmlzTXV0ZSlcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRZVFBsYXllci5wbGF5ZXIubXV0ZSgpO1xuXHRcdFx0WVRQbGF5ZXIuaXNNdXRlID0gdHJ1ZTtcblx0XHRcdFlUUGxheWVyLnBsYXllci5zZXRWb2x1bWUoMCk7XG5cdFx0XHRpZiAoWVRQbGF5ZXIudm9sdW1lQmFyICYmIFlUUGxheWVyLnZvbHVtZUJhci5sZW5ndGggJiYgWVRQbGF5ZXIudm9sdW1lQmFyLndpZHRoKCkgPiAxMCkge1xuXHRcdFx0XHRZVFBsYXllci52b2x1bWVCYXIudXBkYXRlU2xpZGVyVmFsKDApXG5cdFx0XHR9XG5cdFx0XHRsZXQgY29udHJvbHMgPSBqUXVlcnkoJyNjb250cm9sQmFyXycgKyBZVFBsYXllci5pZCk7XG5cdFx0XHRsZXQgbXV0ZUJ0biA9IGNvbnRyb2xzLmZpbmQoJy5tYl9ZVFBNdXRlVW5tdXRlJyk7XG5cdFx0XHRtdXRlQnRuLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMudW5tdXRlKTtcblx0XHRcdGpRdWVyeShZVFBsYXllcikuYWRkQ2xhc3MoJ2lzTXV0ZWQnKTtcblx0XHRcdGlmIChZVFBsYXllci52b2x1bWVCYXIgJiYgWVRQbGF5ZXIudm9sdW1lQmFyLmxlbmd0aCkgWVRQbGF5ZXIudm9sdW1lQmFyLmFkZENsYXNzKCdtdXRlZCcpO1xuXHRcdFx0bGV0IFlUUEV2ZW50ID0galF1ZXJ5LkV2ZW50KCdZVFBNdXRlZCcpO1xuXHRcdFx0WVRQRXZlbnQudGltZSA9IFlUUGxheWVyLmN1cnJlbnRUaW1lO1xuXG5cdFx0XHRpZiAoIVlUUGxheWVyLnByZXZlbnRUcmlnZ2VyKVxuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnRyaWdnZXIoWVRQRXZlbnQpO1xuXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiB1bm11dGVcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0dW5tdXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci5pc1JlYWR5KVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0Ly8gY29uc29sZS5kZWJ1ZyhcInVubXV0ZTo6XCIsIFlUUGxheWVyLmlzTXV0ZSxcIlZvbDo6XCIsIFlUUGxheWVyLm9wdC52b2wpXG5cblx0XHRcdGlmICghWVRQbGF5ZXIuaXNNdXRlKVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0WVRQbGF5ZXIucGxheWVyLnVuTXV0ZSgpO1xuXHRcdFx0WVRQbGF5ZXIuaXNNdXRlID0gZmFsc2U7XG5cdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLllUUFNldFZvbHVtZShZVFBsYXllci5vcHQudm9sKTtcblx0XHRcdGlmIChZVFBsYXllci52b2x1bWVCYXIgJiYgWVRQbGF5ZXIudm9sdW1lQmFyLmxlbmd0aClcblx0XHRcdFx0WVRQbGF5ZXIudm9sdW1lQmFyLnVwZGF0ZVNsaWRlclZhbChZVFBsYXllci5vcHQudm9sID4gMTAgPyBZVFBsYXllci5vcHQudm9sIDogMTApO1xuXHRcdFx0bGV0IGNvbnRyb2xzID0galF1ZXJ5KCcjY29udHJvbEJhcl8nICsgWVRQbGF5ZXIuaWQpO1xuXHRcdFx0bGV0IG11dGVCdG4gPSBjb250cm9scy5maW5kKCcubWJfWVRQTXV0ZVVubXV0ZScpO1xuXHRcdFx0bXV0ZUJ0bi5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLm11dGUpO1xuXHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5yZW1vdmVDbGFzcygnaXNNdXRlZCcpO1xuXHRcdFx0aWYgKFlUUGxheWVyLnZvbHVtZUJhciAmJiBZVFBsYXllci52b2x1bWVCYXIubGVuZ3RoKVxuXHRcdFx0XHRZVFBsYXllci52b2x1bWVCYXIucmVtb3ZlQ2xhc3MoJ211dGVkJyk7XG5cdFx0XHRsZXQgWVRQRXZlbnQgPSBqUXVlcnkuRXZlbnQoJ1lUUFVubXV0ZWQnKTtcblx0XHRcdFlUUEV2ZW50LnRpbWUgPSBZVFBsYXllci5jdXJyZW50VGltZTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci5wcmV2ZW50VHJpZ2dlcilcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFlUUEV2ZW50KTtcblxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXG5cdFx0LyogRklMVEVSUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0LyoqXG5cdFx0ICogYXBwbHlGaWx0ZXJcblx0XHQgKiBAcGFyYW0gZmlsdGVyXG5cdFx0ICogQHBhcmFtIHZhbHVlXG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdGFwcGx5RmlsdGVyOiBmdW5jdGlvbiAoZmlsdGVyLCB2YWx1ZSkge1xuXHRcdFx0bGV0ICRZVFBsYXllciA9IHRoaXM7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSAkWVRQbGF5ZXIuZ2V0KDApO1xuXG5cdFx0XHRpZiAoIVlUUGxheWVyLmlzUmVhZHkpXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRZVFBsYXllci5maWx0ZXJzW2ZpbHRlcl0udmFsdWUgPSB2YWx1ZTtcblx0XHRcdGlmIChZVFBsYXllci5maWx0ZXJzRW5hYmxlZClcblx0XHRcdFx0JFlUUGxheWVyLllUUEVuYWJsZUZpbHRlcnMoKVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBhcHBseUZpbHRlcnNcblx0XHQgKiBAcGFyYW0gZmlsdGVyc1xuXHRcdCAqIEByZXR1cm5zIHtqUXVlcnkubWJZVFBsYXllcn1cblx0XHQgKi9cblx0XHRhcHBseUZpbHRlcnM6IGZ1bmN0aW9uIChmaWx0ZXJzKSB7XG5cdFx0XHRsZXQgJFlUUGxheWVyID0gdGhpcztcblx0XHRcdGxldCBZVFBsYXllciA9ICRZVFBsYXllci5nZXQoMCk7XG5cblx0XHRcdGlmICghWVRQbGF5ZXIuaXNSZWFkeSkge1xuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLm9uKCdZVFBSZWFkeScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkWVRQbGF5ZXIuWVRQQXBwbHlGaWx0ZXJzKGZpbHRlcnMpXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gdGhpc1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBrZXkgaW4gZmlsdGVycykge1xuXHRcdFx0XHQkWVRQbGF5ZXIuWVRQQXBwbHlGaWx0ZXIoa2V5LCBmaWx0ZXJzW2tleV0pXG5cdFx0XHR9XG5cblx0XHRcdCRZVFBsYXllci50cmlnZ2VyKCdZVFBGaWx0ZXJzQXBwbGllZCcpXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIHRvZ2dsZUZpbHRlclxuXHRcdCAqIEBwYXJhbSBmaWx0ZXJcblx0XHQgKiBAcGFyYW0gdmFsdWVcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0dG9nZ2xlRmlsdGVyOiBmdW5jdGlvbiAoZmlsdGVyLCB2YWx1ZSkge1xuXHRcdFx0bGV0ICRZVFBsYXllciA9IHRoaXM7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSAkWVRQbGF5ZXIuZ2V0KDApO1xuXG5cdFx0XHRpZiAoIVlUUGxheWVyLmlzUmVhZHkpXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRpZiAoIVlUUGxheWVyLmZpbHRlcnNbZmlsdGVyXS52YWx1ZSlcblx0XHRcdFx0WVRQbGF5ZXIuZmlsdGVyc1tmaWx0ZXJdLnZhbHVlID0gdmFsdWU7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdFlUUGxheWVyLmZpbHRlcnNbZmlsdGVyXS52YWx1ZSA9IDA7XG5cblx0XHRcdGlmIChZVFBsYXllci5maWx0ZXJzRW5hYmxlZClcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5ZVFBFbmFibGVGaWx0ZXJzKCk7XG5cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIHRvZ2dsZUZpbHRlcnNcblx0XHQgKiBAcGFyYW0gY2FsbGJhY2tcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0dG9nZ2xlRmlsdGVyczogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRsZXQgJFlUUGxheWVyID0gdGhpcztcblx0XHRcdGxldCBZVFBsYXllciA9ICRZVFBsYXllci5nZXQoMCk7XG5cblx0XHRcdGlmICghWVRQbGF5ZXIuaXNSZWFkeSlcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdGlmIChZVFBsYXllci5maWx0ZXJzRW5hYmxlZCkge1xuXHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLnRyaWdnZXIoJ1lUUERpc2FibGVGaWx0ZXJzJyk7XG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikuWVRQRGlzYWJsZUZpbHRlcnMoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5ZVFBFbmFibGVGaWx0ZXJzKCk7XG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcignWVRQRW5hYmxlRmlsdGVycycpXG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpXG5cdFx0XHRcdGNhbGxiYWNrKFlUUGxheWVyLmZpbHRlcnNFbmFibGVkKTtcblxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogZGlzYWJsZUZpbHRlcnNcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0ZGlzYWJsZUZpbHRlcnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCAkWVRQbGF5ZXIgPSB0aGlzO1xuXHRcdFx0bGV0IFlUUGxheWVyID0gJFlUUGxheWVyLmdldCgwKTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci5pc1JlYWR5KVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0bGV0IGlmcmFtZSA9IGpRdWVyeShZVFBsYXllci5wbGF5ZXJFbCk7XG5cdFx0XHRpZnJhbWUuY3NzKCctd2Via2l0LWZpbHRlcicsICcnKTtcblx0XHRcdGlmcmFtZS5jc3MoJ2ZpbHRlcicsICcnKTtcblx0XHRcdFlUUGxheWVyLmZpbHRlcnNFbmFibGVkID0gZmFsc2U7XG5cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIGVuYWJsZUZpbHRlcnNcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0ZW5hYmxlRmlsdGVyczogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0ICRZVFBsYXllciA9IHRoaXM7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSAkWVRQbGF5ZXIuZ2V0KDApO1xuXG5cdFx0XHRpZiAoIVlUUGxheWVyLmlzUmVhZHkpXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRsZXQgaWZyYW1lID0galF1ZXJ5KFlUUGxheWVyLnBsYXllckVsKTtcblx0XHRcdGxldCBmaWx0ZXJTdHlsZSA9ICcnO1xuXHRcdFx0Zm9yIChsZXQga2V5IGluIFlUUGxheWVyLmZpbHRlcnMpIHtcblx0XHRcdFx0aWYgKFlUUGxheWVyLmZpbHRlcnNba2V5XS52YWx1ZSlcblx0XHRcdFx0XHRmaWx0ZXJTdHlsZSArPSBrZXkucmVwbGFjZSgnXycsICctJykgKyAnKCcgKyBZVFBsYXllci5maWx0ZXJzW2tleV0udmFsdWUgKyBZVFBsYXllci5maWx0ZXJzW2tleV0udW5pdCArICcpICdcblx0XHRcdH1cblx0XHRcdGlmcmFtZS5jc3MoJy13ZWJraXQtZmlsdGVyJywgZmlsdGVyU3R5bGUpO1xuXHRcdFx0aWZyYW1lLmNzcygnZmlsdGVyJywgZmlsdGVyU3R5bGUpO1xuXHRcdFx0WVRQbGF5ZXIuZmlsdGVyc0VuYWJsZWQgPSB0cnVlO1xuXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiByZW1vdmVGaWx0ZXJcblx0XHQgKiBAcGFyYW0gZmlsdGVyXG5cdFx0ICogQHBhcmFtIGNhbGxiYWNrXG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdHJlbW92ZUZpbHRlcjogZnVuY3Rpb24gKGZpbHRlciwgY2FsbGJhY2spIHtcblx0XHRcdGxldCAkWVRQbGF5ZXIgPSB0aGlzO1xuXHRcdFx0bGV0IFlUUGxheWVyID0gJFlUUGxheWVyLmdldCgwKTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci5pc1JlYWR5KVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0aWYgKHR5cGVvZiBmaWx0ZXIgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRjYWxsYmFjayA9IGZpbHRlcjtcblx0XHRcdFx0ZmlsdGVyID0gbnVsbFxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWZpbHRlcikge1xuXHRcdFx0XHRmb3IgKGxldCBrZXkgaW4gWVRQbGF5ZXIuZmlsdGVycykge1xuXHRcdFx0XHRcdGlmIChZVFBsYXllci5maWx0ZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdCRZVFBsYXllci5ZVFBBcHBseUZpbHRlcihrZXksIDApO1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKVxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdFlUUGxheWVyLmZpbHRlcnMgPSBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBqUXVlcnkubWJZVFBsYXllci5kZWZhdWx0RmlsdGVycylcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JFlUUGxheWVyLllUUEFwcGx5RmlsdGVyKGZpbHRlciwgMCk7XG5cdFx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soZmlsdGVyKVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgWVRQRXZlbnQgPSBqUXVlcnkuRXZlbnQoJ1lUUEZpbHRlcnNBcHBsaWVkJyk7XG5cdFx0XHQkWVRQbGF5ZXIudHJpZ2dlcihZVFBFdmVudCk7XG5cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIGdldEZpbHRlcnNcblx0XHQgKiBAcmV0dXJucyB7ZmlsdGVyc31cblx0XHQgKi9cblx0XHRnZXRGaWx0ZXJzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci5pc1JlYWR5KVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0cmV0dXJuIFlUUGxheWVyLmZpbHRlcnNcblx0XHR9LFxuXG5cdFx0LyogTUFTSyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0LyoqXG5cdFx0ICogYWRkTWFza1xuXHRcdCAqIEBwYXJhbSBtYXNrXG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdGFkZE1hc2s6IGZ1bmN0aW9uIChtYXNrKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblxuXHRcdFx0Lypcblx0XHRcdFx0XHRpZiAoIVlUUGxheWVyLmlzUmVhZHkpXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHQqL1xuXG5cdFx0XHRpZiAoIW1hc2spXG5cdFx0XHRcdG1hc2sgPSBZVFBsYXllci5hY3R1YWxNYXNrO1xuXG5cdFx0XHRsZXQgdGVtcEltZyA9IGpRdWVyeSgnPGltZy8+JykuYXR0cignc3JjJywgbWFzaykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFlUUGxheWVyLm92ZXJsYXkuQ1NTQW5pbWF0ZSh7XG5cdFx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0XHR9LCBZVFBsYXllci5vcHQuZmFkZU9uU3RhcnRUaW1lLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0WVRQbGF5ZXIuaGFzTWFzayA9IHRydWU7XG5cdFx0XHRcdFx0dGVtcEltZy5yZW1vdmUoKTtcblx0XHRcdFx0XHRZVFBsYXllci5vdmVybGF5LmNzcyh7XG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2UgICA6ICd1cmwoJyArIG1hc2sgKyAnKScsXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kUmVwZWF0ICA6ICduby1yZXBlYXQnLFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyIGNlbnRlcicsXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kU2l6ZSAgICA6ICdjb3Zlcidcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRZVFBsYXllci5vdmVybGF5LkNTU0FuaW1hdGUoe1xuXHRcdFx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRcdH0sIFlUUGxheWVyLm9wdC5mYWRlT25TdGFydFRpbWUpXG5cdFx0XHRcdH0pXG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogcmVtb3ZlTWFza1xuXHRcdCAqIEByZXR1cm5zIHtqUXVlcnkubWJZVFBsYXllcn1cblx0XHQgKi9cblx0XHRyZW1vdmVNYXNrOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgWVRQbGF5ZXIgPSB0aGlzLmdldCgwKTtcblxuXHRcdFx0Lypcblx0XHRcdFx0XHRpZiAoIVlUUGxheWVyLmlzUmVhZHkpXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHQqL1xuXG5cdFx0XHRZVFBsYXllci5vdmVybGF5LkNTU0FuaW1hdGUoe1xuXHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHR9LCBZVFBsYXllci5vcHQuZmFkZU9uU3RhcnRUaW1lLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFlUUGxheWVyLmhhc01hc2sgPSBmYWxzZTtcblx0XHRcdFx0WVRQbGF5ZXIub3ZlcmxheS5jc3Moe1xuXHRcdFx0XHRcdGJhY2tncm91bmRJbWFnZSAgIDogJycsXG5cdFx0XHRcdFx0YmFja2dyb3VuZFJlcGVhdCAgOiAnJyxcblx0XHRcdFx0XHRiYWNrZ3JvdW5kUG9zaXRpb246ICcnLFxuXHRcdFx0XHRcdGJhY2tncm91bmRTaXplICAgIDogJydcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFlUUGxheWVyLm92ZXJsYXkuQ1NTQW5pbWF0ZSh7XG5cdFx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHR9LCBZVFBsYXllci5vcHQuZmFkZU9uU3RhcnRUaW1lKVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEFwcGx5IG1hc2tcblx0XHQgKiBAcGFyYW0gWVRQbGF5ZXJcblx0XHQgKi9cblx0XHRhcHBseU1hc2s6IGZ1bmN0aW9uIChZVFBsYXllcikge1xuXHRcdFx0bGV0ICRZVFBsYXllciA9IGpRdWVyeShZVFBsYXllcik7XG5cblx0XHRcdC8qXG5cdFx0XHRcdFx0aWYgKCFZVFBsYXllci5pc1JlYWR5KVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0Ki9cblxuXHRcdFx0JFlUUGxheWVyLm9mZignWVRQVGltZS5tYXNrJyk7XG5cblx0XHRcdGlmIChZVFBsYXllci5vcHQubWFzaykge1xuXHRcdFx0XHRpZiAodHlwZW9mIFlUUGxheWVyLm9wdC5tYXNrID09ICdzdHJpbmcnKSB7XG5cblx0XHRcdFx0XHQkWVRQbGF5ZXIuWVRQQWRkTWFzayhZVFBsYXllci5vcHQubWFzayk7XG5cdFx0XHRcdFx0WVRQbGF5ZXIuYWN0dWFsTWFzayA9IFlUUGxheWVyLm9wdC5tYXNrXG5cblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgWVRQbGF5ZXIub3B0Lm1hc2sgPT0gJ29iamVjdCcpIHtcblxuXHRcdFx0XHRcdC8vY29uc29sZS5kZWJ1ZyhZVFBsYXllci5vcHQubWFzaylcblxuXHRcdFx0XHRcdGZvciAobGV0IHRpbWUgaW4gWVRQbGF5ZXIub3B0Lm1hc2spIHtcblxuXHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5tYXNrW3RpbWVdKVxuXHRcdFx0XHRcdFx0XHRpbWcgPSBqUXVlcnkoJzxpbWcvPicpLmF0dHIoJ3NyYycsIFlUUGxheWVyLm9wdC5tYXNrW3RpbWVdKVxuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5tYXNrWzBdKVxuXHRcdFx0XHRcdFx0JFlUUGxheWVyLllUUEFkZE1hc2soWVRQbGF5ZXIub3B0Lm1hc2tbMF0pO1xuXG5cdFx0XHRcdFx0JFlUUGxheWVyLm9uKCdZVFBUaW1lLm1hc2snLCBmdW5jdGlvbiAoZSkge1xuXG5cdFx0XHRcdFx0XHRmb3IgKGxldCB0aW1lIGluIFlUUGxheWVyLm9wdC5tYXNrKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChlLnRpbWUgPT0gdGltZSlcblx0XHRcdFx0XHRcdFx0XHRpZiAoIVlUUGxheWVyLm9wdC5tYXNrW3RpbWVdKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIuWVRQUmVtb3ZlTWFzaygpXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdCRZVFBsYXllci5ZVFBBZGRNYXNrKFlUUGxheWVyLm9wdC5tYXNrW3RpbWVdKTtcblx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLmFjdHVhbE1hc2sgPSBZVFBsYXllci5vcHQubWFza1t0aW1lXVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIHRvZ2dsZU1hc2tcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0dG9nZ2xlTWFzazogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cblx0XHRcdC8qXG5cdFx0XHRcdFx0aWYgKCFZVFBsYXllci5pc1JlYWR5KVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0Ki9cblxuXHRcdFx0bGV0ICRZVFBsYXllciA9IGpRdWVyeShZVFBsYXllcik7XG5cdFx0XHRpZiAoWVRQbGF5ZXIuaGFzTWFzaylcblx0XHRcdFx0JFlUUGxheWVyLllUUFJlbW92ZU1hc2soKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0JFlUUGxheWVyLllUUEFkZE1hc2soKTtcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblxuXHRcdC8qIENPTlRST0xTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdC8qKlxuXHRcdCAqIG1hbmFnZVByb2dyZXNzXG5cdFx0ICogQHJldHVybnMge3t0b3RhbFRpbWU6IG51bWJlciwgY3VycmVudFRpbWU6IG51bWJlcn19XG5cdFx0ICovXG5cdFx0bWFuYWdlUHJvZ3Jlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXHRcdFx0bGV0IGNvbnRyb2xzID0galF1ZXJ5KCcjY29udHJvbEJhcl8nICsgWVRQbGF5ZXIuaWQpO1xuXHRcdFx0bGV0IHByb2dyZXNzQmFyID0gY29udHJvbHMuZmluZCgnLm1iX1lUUFByb2dyZXNzJyk7XG5cdFx0XHRsZXQgbG9hZGVkQmFyID0gY29udHJvbHMuZmluZCgnLm1iX1lUUExvYWRlZCcpO1xuXHRcdFx0bGV0IHRpbWVCYXIgPSBjb250cm9scy5maW5kKCcubWJfWVRQc2Vla2JhcicpO1xuXHRcdFx0bGV0IHRvdFcgPSBwcm9ncmVzc0Jhci5vdXRlcldpZHRoKCk7XG5cdFx0XHRsZXQgY3VycmVudFRpbWUgPSBNYXRoLmZsb29yKFlUUGxheWVyLnBsYXllci5nZXRDdXJyZW50VGltZSgpKTtcblx0XHRcdGxldCB0b3RhbFRpbWUgPSBNYXRoLmZsb29yKFlUUGxheWVyLnBsYXllci5nZXREdXJhdGlvbigpKTtcblx0XHRcdGxldCB0aW1lVyA9IChjdXJyZW50VGltZSAqIHRvdFcpIC8gdG90YWxUaW1lO1xuXHRcdFx0bGV0IHN0YXJ0TGVmdCA9IDA7XG5cdFx0XHRsZXQgbG9hZGVkVyA9IFlUUGxheWVyLnBsYXllci5nZXRWaWRlb0xvYWRlZEZyYWN0aW9uKCkgKiAxMDA7XG5cdFx0XHRsb2FkZWRCYXIuY3NzKHtcblx0XHRcdFx0bGVmdCA6IHN0YXJ0TGVmdCxcblx0XHRcdFx0d2lkdGg6IGxvYWRlZFcgKyAnJSdcblx0XHRcdH0pO1xuXHRcdFx0dGltZUJhci5jc3Moe1xuXHRcdFx0XHRsZWZ0IDogMCxcblx0XHRcdFx0d2lkdGg6IHRpbWVXXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHRvdGFsVGltZSAgOiB0b3RhbFRpbWUsXG5cdFx0XHRcdGN1cnJlbnRUaW1lOiBjdXJyZW50VGltZVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBidWlsZENvbnRyb2xzXG5cdFx0ICogQHBhcmFtIFlUUGxheWVyXG5cdFx0ICovXG5cdFx0YnVpbGRDb250cm9sczogZnVuY3Rpb24gKFlUUGxheWVyKSB7XG5cblx0XHRcdGpRdWVyeSgnI2NvbnRyb2xCYXJfJyArIFlUUGxheWVyLmlkKS5yZW1vdmUoKTtcblx0XHRcdGlmICghWVRQbGF5ZXIub3B0LnNob3dDb250cm9scykge1xuXHRcdFx0XHRZVFBsYXllci5jb250cm9sQmFyID0gZmFsc2U7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBAWVRQbGF5ZXIub3B0LnByaW50VXJsOiBpcyBkZXByZWNhdGVkOyB1c2UgWVRQbGF5ZXIub3B0LnNob3dZVExvZ29cblx0XHRcdFlUUGxheWVyLm9wdC5zaG93WVRMb2dvID0gWVRQbGF5ZXIub3B0LnNob3dZVExvZ28gfHwgWVRQbGF5ZXIub3B0LnByaW50VXJsO1xuXHRcdFx0aWYgKGpRdWVyeSgnI2NvbnRyb2xCYXJfJyArIFlUUGxheWVyLmlkKS5sZW5ndGgpXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdFlUUGxheWVyLmNvbnRyb2xCYXIgPSBqUXVlcnkoJzxkaXYvPicpLmF0dHIoJ2lkJywgJ2NvbnRyb2xCYXJfJyArIFlUUGxheWVyLmlkKS5hZGRDbGFzcygnbWJfWVRQQmFyJykuY3NzKHtcblx0XHRcdFx0d2hpdGVTcGFjZTogJ25vV3JhcCcsXG5cdFx0XHRcdHBvc2l0aW9uICA6IFlUUGxheWVyLmlzQmFja2dyb3VuZCA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnLFxuXHRcdFx0XHR6SW5kZXggICAgOiBZVFBsYXllci5pc0JhY2tncm91bmQgPyAxMDAwMCA6IDEwMDBcblx0XHRcdH0pLmhpZGUoKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHR9KTtcblx0XHRcdGxldCBidXR0b25CYXIgPSBqUXVlcnkoJzxkaXYvPicpLmFkZENsYXNzKCdidXR0b25CYXInKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogIHBsYXkvcGF1c2UgYnV0dG9uXG5cdFx0XHQgKiAqL1xuXHRcdFx0bGV0IHBsYXlwYXVzZSA9IGpRdWVyeSgnPHNwYW4+JyArIGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnBsYXkgKyAnPC9zcGFuPicpLmFkZENsYXNzKCdtYl9ZVFBQbGF5UGF1c2UgeXRwaWNvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikuWVRQVG9nZ2xlUGxheSgpXG5cdFx0XHR9KTtcblx0XHRcdC8qKlxuXHRcdFx0ICogIG11dGUvdW5tdXRlIGJ1dHRvblxuXHRcdFx0ICogKi9cblx0XHRcdGxldCBNdXRlVW5tdXRlID0galF1ZXJ5KCc8c3Bhbj4nICsgalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMubXV0ZSArICc8L3NwYW4+JykuYWRkQ2xhc3MoJ21iX1lUUE11dGVVbm11dGUgeXRwaWNvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikuWVRQVG9nZ2xlVm9sdW1lKClcblx0XHRcdH0pO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiAgdm9sdW1lIGJhclxuXHRcdFx0ICogKi9cblx0XHRcdGxldCB2b2x1bWVCYXIgPSBqUXVlcnkoJzxkaXYvPicpLmFkZENsYXNzKCdtYl9ZVFBWb2x1bWVCYXInKS5jc3Moe1xuXHRcdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXHRcdFx0fSk7XG5cdFx0XHRZVFBsYXllci52b2x1bWVCYXIgPSB2b2x1bWVCYXI7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogdGltZSBlbGFwc2VkXG5cdFx0XHQgKiAqL1xuXHRcdFx0bGV0IGlkeCA9IGpRdWVyeSgnPHNwYW4vPicpLmFkZENsYXNzKCdtYl9ZVFBUaW1lJyk7XG5cdFx0XHRsZXQgdlVSTCA9IFlUUGxheWVyLm9wdC52aWRlb1VSTCA/IFlUUGxheWVyLm9wdC52aWRlb1VSTCA6ICcnO1xuXHRcdFx0aWYgKHZVUkwuaW5kZXhPZignaHR0cCcpIDwgMCkgdlVSTCA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PScgKyBZVFBsYXllci5vcHQudmlkZW9VUkw7XG5cdFx0XHRsZXQgbW92aWVVcmwgPSBqUXVlcnkoJzxzcGFuLz4nKS5odG1sKGpRdWVyeS5tYllUUGxheWVyLmNvbnRyb2xzLnl0TG9nbykuYWRkQ2xhc3MoJ21iX1lUUFVybCB5dHBpY29uJykuYXR0cigndGl0bGUnLCAndmlldyBvbiBZb3VUdWJlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR3aW5kb3cub3Blbih2VVJMLCAndmlld09uWVQnKVxuXHRcdFx0fSk7XG5cdFx0XHRsZXQgb25seVZpZGVvID0galF1ZXJ5KCc8c3Bhbi8+JykuaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5vbmx5WVQpLmFkZENsYXNzKCdtYl9Pbmx5WVQgeXRwaWNvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdGpRdWVyeShZVFBsYXllcikuWVRQRnVsbHNjcmVlbihZVFBsYXllci5vcHQucmVhbEZ1bGxzY3JlZW4pXG5cdFx0XHR9KTtcblx0XHRcdGxldCBwcm9ncmVzc0JhciA9IGpRdWVyeSgnPGRpdi8+JykuYWRkQ2xhc3MoJ21iX1lUUFByb2dyZXNzJykuY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHRpbWVCYXIuY3NzKHtcblx0XHRcdFx0XHR3aWR0aDogKGUuY2xpZW50WCAtIHRpbWVCYXIub2Zmc2V0KCkubGVmdClcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFlUUGxheWVyLnRpbWVXID0gZS5jbGllbnRYIC0gdGltZUJhci5vZmZzZXQoKS5sZWZ0O1xuXHRcdFx0XHRZVFBsYXllci5jb250cm9sQmFyLmZpbmQoJy5tYl9ZVFBMb2FkZWQnKS5jc3Moe1xuXHRcdFx0XHRcdHdpZHRoOiAwXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRsZXQgdG90YWxUaW1lID0gTWF0aC5mbG9vcihZVFBsYXllci5wbGF5ZXIuZ2V0RHVyYXRpb24oKSk7XG5cdFx0XHRcdFlUUGxheWVyLmdvdG8gPSAodGltZUJhci5vdXRlcldpZHRoKCkgKiB0b3RhbFRpbWUpIC8gcHJvZ3Jlc3NCYXIub3V0ZXJXaWR0aCgpO1xuXHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2Vla1RvKHBhcnNlRmxvYXQoWVRQbGF5ZXIuZ290byksIHRydWUpO1xuXHRcdFx0XHRZVFBsYXllci5jb250cm9sQmFyLmZpbmQoJy5tYl9ZVFBMb2FkZWQnKS5jc3Moe1xuXHRcdFx0XHRcdHdpZHRoOiAwXG5cdFx0XHRcdH0pXG5cdFx0XHR9KTtcblx0XHRcdGxldCBsb2FkZWRCYXIgPSBqUXVlcnkoJzxkaXYvPicpLmFkZENsYXNzKCdtYl9ZVFBMb2FkZWQnKS5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG5cdFx0XHRsZXQgdGltZUJhciA9IGpRdWVyeSgnPGRpdi8+JykuYWRkQ2xhc3MoJ21iX1lUUHNlZWtiYXInKS5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG5cdFx0XHRwcm9ncmVzc0Jhci5hcHBlbmQobG9hZGVkQmFyKS5hcHBlbmQodGltZUJhcik7XG5cdFx0XHRidXR0b25CYXIuYXBwZW5kKHBsYXlwYXVzZSkuYXBwZW5kKE11dGVVbm11dGUpLmFwcGVuZCh2b2x1bWVCYXIpLmFwcGVuZChpZHgpO1xuXG5cdFx0XHRpZiAoWVRQbGF5ZXIub3B0LnNob3dZVExvZ28pIHtcblx0XHRcdFx0YnV0dG9uQmFyLmFwcGVuZChtb3ZpZVVybClcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBGdWxsIHNjcmVlbiBidXR0b25cblx0XHRcdCAqL1xuXHRcdFx0aWYgKFlUUGxheWVyLmlzQmFja2dyb3VuZCB8fCAoZXZhbChZVFBsYXllci5vcHQucmVhbEZ1bGxzY3JlZW4pICYmICFZVFBsYXllci5pc0JhY2tncm91bmQpKVxuXHRcdFx0XHRidXR0b25CYXIuYXBwZW5kKG9ubHlWaWRlbyk7XG5cblx0XHRcdFlUUGxheWVyLmNvbnRyb2xCYXIuYXBwZW5kKGJ1dHRvbkJhcikuYXBwZW5kKHByb2dyZXNzQmFyKTtcblxuXHRcdFx0aWYgKCFZVFBsYXllci5pc0JhY2tncm91bmQpIHtcblx0XHRcdFx0WVRQbGF5ZXIuY29udHJvbEJhci5hZGRDbGFzcygnaW5saW5lUGxheWVyJyk7XG5cdFx0XHRcdFlUUGxheWVyLndyYXBwZXIuYmVmb3JlKFlUUGxheWVyLmNvbnRyb2xCYXIpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRqUXVlcnkoJ2JvZHknKS5hZnRlcihZVFBsYXllci5jb250cm9sQmFyKVxuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFZvbHVtZSBzbGlkZXJcblx0XHRcdCAqL1xuXHRcdFx0dm9sdW1lQmFyLnNpbXBsZVNsaWRlcih7XG5cdFx0XHRcdGluaXRpYWx2YWwgOiBZVFBsYXllci5vcHQudm9sLFxuXHRcdFx0XHRzY2FsZSAgICAgIDogMTAwLFxuXHRcdFx0XHRvcmllbnRhdGlvbjogJ2gnLFxuXHRcdFx0XHRjYWxsYmFjayAgIDogZnVuY3Rpb24gKGVsKSB7XG5cblx0XHRcdFx0XHRpZiAoZWwudmFsdWUgPT0gMCkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5ZVFBNdXRlKClcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS5ZVFBVbm11dGUoKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2V0Vm9sdW1lKGVsLnZhbHVlKTtcblx0XHRcdFx0XHRpZiAoIVlUUGxheWVyLmlzTXV0ZSlcblx0XHRcdFx0XHRcdFlUUGxheWVyLm9wdC52b2wgPSBlbC52YWx1ZVxuXG5cdFx0XHRcdFx0Ly8gY29uc29sZS5kZWJ1ZyhqUXVlcnkoWVRQbGF5ZXIpLllUUEdldFZvbHVtZSgpKVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSlcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogY2hhbmdlQ292ZXJJbWFnZVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGltYWdlVVJMXG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdGNoYW5nZUNvdmVySW1hZ2U6IGZ1bmN0aW9uIChpbWFnZVVSTCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmNvdmVySW1hZ2UgfHwgWVRQbGF5ZXIub3JpZ19jb250YWlubWVudF9iYWNrZ3JvdW5kKSB7XG5cdFx0XHRcdGxldCBiZ25kVVJMID0gaW1hZ2VVUkwgfHwgKFlUUGxheWVyLm9wdC5jb3ZlckltYWdlID8gJ3VybCgnICsgWVRQbGF5ZXIub3B0LmNvdmVySW1hZ2UgKyAnKSBjZW50ZXIgY2VudGVyJyA6IFlUUGxheWVyLm9yaWdfY29udGFpbm1lbnRfYmFja2dyb3VuZCk7XG5cblx0XHRcdFx0Ly9cdGNvbnNvbGUuZGVidWcoWVRQbGF5ZXIud3JhcHBlcik7XG5cblx0XHRcdFx0aWYgKGJnbmRVUkwpXG5cdFx0XHRcdFx0WVRQbGF5ZXIub3B0LmNvbnRhaW5tZW50LmNzcyh7XG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kICAgICAgICAgIDogYmduZFVSTCxcblx0XHRcdFx0XHRcdGJhY2tncm91bmRTaXplICAgICAgOiAnY292ZXInLFxuXHRcdFx0XHRcdFx0Ly8gYmFja2dyb3VuZFJlcGVhdCAgICA6ICduby1yZXBlYXQnLFxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZEF0dGFjaG1lbnQ6ICdmaXhlZCdcblxuXHRcdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0LyogTUFOQUdFIFBMQVlFUiBTVEFURSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0LyoqXG5cdFx0ICogY2hlY2tGb3JTdGF0ZVxuXHRcdCAqL1xuXHRcdGNoZWNrRm9yU3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXHRcdFx0bGV0ICRZVFBsYXllciA9IGpRdWVyeShZVFBsYXllcik7XG5cblx0XHRcdGNsZWFySW50ZXJ2YWwoWVRQbGF5ZXIuZ2V0U3RhdGUpO1xuXHRcdFx0bGV0IGludGVydmFsID0gMTAwO1xuXHRcdFx0Ly9DaGVja2luZyBpZiBwbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBzY2VuZVxuXHRcdFx0aWYgKCFqUXVlcnkuY29udGFpbnMoZG9jdW1lbnQsIFlUUGxheWVyKSkge1xuXHRcdFx0XHQkWVRQbGF5ZXIuWVRQUGxheWVyRGVzdHJveSgpO1xuXHRcdFx0XHRjbGVhckludGVydmFsKFlUUGxheWVyLmdldFN0YXRlKTtcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbChZVFBsYXllci5jaGVja0ZvclN0YXJ0QXQpO1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblxuXHRcdFx0alF1ZXJ5Lm1iWVRQbGF5ZXIuY2hlY2tGb3JTdGFydChZVFBsYXllcik7XG5cblx0XHRcdFlUUGxheWVyLmdldFN0YXRlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRsZXQgJFlUUGxheWVyID0galF1ZXJ5KFlUUGxheWVyKTtcblxuXHRcdFx0XHRpZiAoIVlUUGxheWVyLmlzUmVhZHkpXG5cdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdGxldCBwcm9nID0galF1ZXJ5KFlUUGxheWVyKS5ZVFBNYW5hZ2VQcm9ncmVzcygpO1xuXG5cdFx0XHRcdGxldCBzdG9wQXQgPSBZVFBsYXllci5vcHQuc3RvcEF0ID4gWVRQbGF5ZXIub3B0LnN0YXJ0QXQgPyBZVFBsYXllci5vcHQuc3RvcEF0IDogMDtcblx0XHRcdFx0c3RvcEF0ID0gc3RvcEF0IDwgWVRQbGF5ZXIucGxheWVyLmdldER1cmF0aW9uKCkgPyBzdG9wQXQgOiAwO1xuXG5cdFx0XHRcdGlmIChZVFBsYXllci5jdXJyZW50VGltZSAhPSBwcm9nLmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRcdFx0bGV0IFlUUEV2ZW50ID0galF1ZXJ5LkV2ZW50KCdZVFBUaW1lJyk7XG5cdFx0XHRcdFx0WVRQRXZlbnQudGltZSA9IFlUUGxheWVyLmN1cnJlbnRUaW1lO1xuXHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihZVFBFdmVudClcblx0XHRcdFx0fVxuXG5cdFx0XHRcdFlUUGxheWVyLmN1cnJlbnRUaW1lID0gcHJvZy5jdXJyZW50VGltZTtcblx0XHRcdFx0WVRQbGF5ZXIudG90YWxUaW1lID0gWVRQbGF5ZXIucGxheWVyLmdldER1cmF0aW9uKCk7XG5cdFx0XHRcdGlmIChZVFBsYXllci5wbGF5ZXIuZ2V0Vm9sdW1lKCkgPT0gMCkgJFlUUGxheWVyLmFkZENsYXNzKCdpc011dGVkJyk7XG5cdFx0XHRcdGVsc2UgJFlUUGxheWVyLnJlbW92ZUNsYXNzKCdpc011dGVkJyk7XG5cblx0XHRcdFx0aWYgKFlUUGxheWVyLm9wdC5zaG93Q29udHJvbHMpXG5cdFx0XHRcdFx0aWYgKHByb2cudG90YWxUaW1lKSB7XG5cdFx0XHRcdFx0XHRZVFBsYXllci5jb250cm9sQmFyLmZpbmQoJy5tYl9ZVFBUaW1lJykuaHRtbChqUXVlcnkubWJZVFBsYXllci5mb3JtYXRUaW1lKHByb2cuY3VycmVudFRpbWUpICsgJyAvICcgKyBqUXVlcnkubWJZVFBsYXllci5mb3JtYXRUaW1lKHByb2cudG90YWxUaW1lKSlcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0WVRQbGF5ZXIuY29udHJvbEJhci5maW5kKCcubWJfWVRQVGltZScpLmh0bWwoJy0tIDogLS0gLyAtLSA6IC0tJylcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIE1hbmFnZSB2aWRlbyBwYXVzZSBvbiB3aW5kb3cgYmx1clxuXHRcdFx0XHQgKi9cblx0XHRcdFx0aWYgKGV2YWwoWVRQbGF5ZXIub3B0LnN0b3BNb3ZpZU9uQmx1cikpIHtcblx0XHRcdFx0XHRpZiAoIWRvY3VtZW50Lmhhc0ZvY3VzKCkpIHtcblx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5zdGF0ZSA9PSAxKSB7XG5cdFx0XHRcdFx0XHRcdFlUUGxheWVyLmhhc0ZvY3VzID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFlUUGxheWVyLnByZXZlbnRUcmlnZ2VyID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLllUUFBhdXNlKClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGRvY3VtZW50Lmhhc0ZvY3VzKCkgJiYgIVlUUGxheWVyLmhhc0ZvY3VzICYmICEoWVRQbGF5ZXIuc3RhdGUgPT0gLTEgfHwgWVRQbGF5ZXIuc3RhdGUgPT0gMCkpIHtcblx0XHRcdFx0XHRcdFlUUGxheWVyLmhhc0ZvY3VzID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFlUUGxheWVyLnByZXZlbnRUcmlnZ2VyID0gdHJ1ZTtcblx0XHRcdFx0XHRcdCRZVFBsYXllci5ZVFBQbGF5KClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogTWFuYWdlIHZpZGVvIHBhdXNlIGlmIG5vdCBvbiBzY3JlZW5cblx0XHRcdFx0ICovXG5cdFx0XHRcdGlmIChZVFBsYXllci5vcHQucGxheU9ubHlJZlZpc2libGUpIHtcblx0XHRcdFx0XHRsZXQgaXNPblNjcmVlbiA9IGpRdWVyeS5tYllUUGxheWVyLmlzT25TY3JlZW4oWVRQbGF5ZXIsIFlUUGxheWVyLm9wdC5vblNjcmVlblBlcmNlbnRhZ2UpO1xuXHRcdFx0XHRcdGlmICghaXNPblNjcmVlbiAmJiBZVFBsYXllci5zdGF0ZSA9PSAxKSB7XG5cdFx0XHRcdFx0XHRZVFBsYXllci5pc09uU2NyZWVuID0gZmFsc2U7XG5cdFx0XHRcdFx0XHQkWVRQbGF5ZXIuWVRQUGF1c2UoKVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaXNPblNjcmVlbiAmJiAhWVRQbGF5ZXIuaXNPblNjcmVlbikge1xuXHRcdFx0XHRcdFx0WVRQbGF5ZXIuaXNPblNjcmVlbiA9IHRydWU7XG5cdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIucGxheVZpZGVvKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoWVRQbGF5ZXIuY29udHJvbEJhci5sZW5ndGggJiYgWVRQbGF5ZXIuY29udHJvbEJhci5vdXRlcldpZHRoKCkgPD0gNDAwICYmICFZVFBsYXllci5pc0NvbXBhY3QpIHtcblx0XHRcdFx0XHRZVFBsYXllci5jb250cm9sQmFyLmFkZENsYXNzKCdjb21wYWN0Jyk7XG5cdFx0XHRcdFx0WVRQbGF5ZXIuaXNDb21wYWN0ID0gdHJ1ZTtcblx0XHRcdFx0XHRpZiAoIVlUUGxheWVyLmlzTXV0ZSAmJiBZVFBsYXllci52b2x1bWVCYXIpIFlUUGxheWVyLnZvbHVtZUJhci51cGRhdGVTbGlkZXJWYWwoWVRQbGF5ZXIub3B0LnZvbClcblx0XHRcdFx0fSBlbHNlIGlmIChZVFBsYXllci5jb250cm9sQmFyLmxlbmd0aCAmJiBZVFBsYXllci5jb250cm9sQmFyLm91dGVyV2lkdGgoKSA+IDQwMCAmJiBZVFBsYXllci5pc0NvbXBhY3QpIHtcblx0XHRcdFx0XHRZVFBsYXllci5jb250cm9sQmFyLnJlbW92ZUNsYXNzKCdjb21wYWN0Jyk7XG5cdFx0XHRcdFx0WVRQbGF5ZXIuaXNDb21wYWN0ID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAoIVlUUGxheWVyLmlzTXV0ZSAmJiBZVFBsYXllci52b2x1bWVCYXIpXG5cdFx0XHRcdFx0XHRZVFBsYXllci52b2x1bWVCYXIudXBkYXRlU2xpZGVyVmFsKFlUUGxheWVyLm9wdC52b2wpXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gdGhlIHZpZGVvIGlzIGVuZGVkXG5cdFx0XHRcdGlmIChZVFBsYXllci5wbGF5ZXIuZ2V0UGxheWVyU3RhdGUoKSA+IDAgJiYgKChwYXJzZUZsb2F0KFlUUGxheWVyLnBsYXllci5nZXREdXJhdGlvbigpIC0gKFlUUGxheWVyLm9wdC5mYWRlT25TdGFydFRpbWUgLyAxMDAwKSkgPCBZVFBsYXllci5wbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSkgfHwgKHN0b3BBdCA+IDAgJiYgcGFyc2VGbG9hdChZVFBsYXllci5wbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSkgPj0gc3RvcEF0KSkpIHtcblxuXHRcdFx0XHRcdGlmIChZVFBsYXllci5pc0VuZGVkKVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdFx0WVRQbGF5ZXIuaXNFbmRlZCA9IHRydWU7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFlUUGxheWVyLmlzRW5kZWQgPSBmYWxzZVxuXHRcdFx0XHRcdH0sIDEwMDApO1xuXG5cdFx0XHRcdFx0aWYgKFlUUGxheWVyLmlzTGlzdCkge1xuXHRcdFx0XHRcdFx0aWYgKCFZVFBsYXllci5vcHQubG9vcCB8fCAoWVRQbGF5ZXIub3B0Lmxvb3AgPiAwICYmIFlUUGxheWVyLnBsYXllci5sb29wVGltZSA9PT0gWVRQbGF5ZXIub3B0Lmxvb3AgLSAxKSkge1xuXHRcdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIubG9vcFRpbWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoWVRQbGF5ZXIuZ2V0U3RhdGUpO1xuXHRcdFx0XHRcdFx0XHRsZXQgWVRQRW5kID0galF1ZXJ5LkV2ZW50KCdZVFBFbmQnKTtcblx0XHRcdFx0XHRcdFx0WVRQRW5kLnRpbWUgPSBZVFBsYXllci5jdXJyZW50VGltZTtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFlUUEVuZCk7XG5cdFx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIVlUUGxheWVyLm9wdC5sb29wIHx8IChZVFBsYXllci5vcHQubG9vcCA+IDAgJiYgWVRQbGF5ZXIucGxheWVyLmxvb3BUaW1lID09PSBZVFBsYXllci5vcHQubG9vcCAtIDEpKSB7XG5cdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIubG9vcFRpbWUgPSB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHRcdFlUUGxheWVyLnN0YXRlID0gMjtcblxuXHRcdFx0XHRcdFx0JFlUUGxheWVyLmNoYW5nZUNvdmVySW1hZ2UoWVRQbGF5ZXIpO1xuXG5cdFx0XHRcdFx0XHRqUXVlcnkoWVRQbGF5ZXIpLllUUFBhdXNlKCk7XG5cdFx0XHRcdFx0XHRZVFBsYXllci53cmFwcGVyLkNTU0FuaW1hdGUoe1xuXHRcdFx0XHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdFx0XHR9LCBZVFBsYXllci5vcHQuZmFkZU9uU3RhcnRUaW1lLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLmNvbnRyb2xCYXIubGVuZ3RoKVxuXHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLmNvbnRyb2xCYXIuZmluZCgnLm1iX1lUUFBsYXlQYXVzZScpLmh0bWwoalF1ZXJ5Lm1iWVRQbGF5ZXIuY29udHJvbHMucGxheSk7XG5cblx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLmNoYW5nZUNvdmVySW1hZ2UoKTtcblx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmNvdmVySW1hZ2UgfHwgWVRQbGF5ZXIub3JpZ19jb250YWlubWVudF9iYWNrZ3JvdW5kKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgYmduZFVSTCA9IFlUUGxheWVyLm9wdC5jb3ZlckltYWdlID8gJ3VybCgnICsgWVRQbGF5ZXIub3B0LmNvdmVySW1hZ2UgKyAnKSBjZW50ZXIgY2VudGVyJyA6IFlUUGxheWVyLm9yaWdfY29udGFpbm1lbnRfYmFja2dyb3VuZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGJnbmRVUkwpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFlUUGxheWVyLm9wdC5jb250YWlubWVudC5jc3Moe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQgICAgICA6IGJnbmRVUkwsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZFNpemUgIDogJ2NvdmVyJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0J1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Ki9cblxuXHRcdFx0XHRcdFx0XHRsZXQgWVRQRW5kID0galF1ZXJ5LkV2ZW50KCdZVFBFbmQnKTtcblx0XHRcdFx0XHRcdFx0WVRQRW5kLnRpbWUgPSBZVFBsYXllci5jdXJyZW50VGltZTtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KFlUUGxheWVyKS50cmlnZ2VyKFlUUEVuZCk7XG5cdFx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5zZWVrVG8oWVRQbGF5ZXIub3B0LnN0YXJ0QXQsIHRydWUpO1xuXG5cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLmxvb3BUaW1lID0gWVRQbGF5ZXIucGxheWVyLmxvb3BUaW1lID8gKytZVFBsYXllci5wbGF5ZXIubG9vcFRpbWUgOiAxO1xuXHRcdFx0XHRcdFlUUGxheWVyLm9wdC5zdGFydEF0ID0gWVRQbGF5ZXIub3B0LnN0YXJ0QXQgfHwgMTtcblx0XHRcdFx0XHRZVFBsYXllci5wcmV2ZW50VHJpZ2dlciA9IHRydWU7XG5cdFx0XHRcdFx0WVRQbGF5ZXIuc3RhdGUgPSAyO1xuXHRcdFx0XHRcdC8vWVRQbGF5ZXIucGxheWVyLnBhdXNlVmlkZW8oKTtcblx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2Vla1RvKFlUUGxheWVyLm9wdC5zdGFydEF0LCB0cnVlKVxuXHRcdFx0XHRcdC8vWVRQbGF5ZXIucGxheWVyLnBsYXlWaWRlbygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBpbnRlcnZhbClcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogY2hlY2tGb3JTdGFydFxuXHRcdCAqIEBwYXJhbSBZVFBsYXllclxuXHRcdCAqL1xuXHRcdGNoZWNrRm9yU3RhcnQ6IGZ1bmN0aW9uIChZVFBsYXllcikge1xuXHRcdFx0bGV0ICRZVFBsYXllciA9IGpRdWVyeShZVFBsYXllcik7XG5cblx0XHRcdC8qIElmIHRoZSBwbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIHNjZW5lIGRlc3Ryb3kgaXQgKi9cblx0XHRcdGlmICghalF1ZXJ5LmNvbnRhaW5zKGRvY3VtZW50LCBZVFBsYXllcikpIHtcblx0XHRcdFx0JFlUUGxheWVyLllUUFBsYXllckRlc3Ryb3koKTtcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cblx0XHRcdC8qIENSRUFURSBDT05UUk9MIEJBUiAqL1xuXHRcdFx0alF1ZXJ5Lm1iWVRQbGF5ZXIuYnVpbGRDb250cm9scyhZVFBsYXllcik7XG5cblx0XHRcdGlmIChZVFBsYXllci5vdmVybGF5KVxuXHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmFkZFJhc3Rlcikge1xuXHRcdFx0XHRcdGxldCBjbGFzc04gPSBZVFBsYXllci5vcHQuYWRkUmFzdGVyID09ICdkb3QnID8gJ3Jhc3Rlci1kb3QnIDogJ3Jhc3Rlcic7XG5cdFx0XHRcdFx0WVRQbGF5ZXIub3ZlcmxheS5hZGRDbGFzcyhZVFBsYXllci5pc1JldGluYSA/IGNsYXNzTiArICcgcmV0aW5hJyA6IGNsYXNzTilcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRZVFBsYXllci5vdmVybGF5LnJlbW92ZUNsYXNzKGZ1bmN0aW9uIChpbmRleCwgY2xhc3NOYW1lcykge1xuXHRcdFx0XHRcdFx0Ly8gY2hhbmdlIHRoZSBsaXN0IGludG8gYW4gYXJyYXlcblx0XHRcdFx0XHRcdGxldCBjdXJyZW50X2NsYXNzZXMgPSBjbGFzc05hbWVzLnNwbGl0KCcgJyksXG5cdFx0XHRcdFx0XHRcdFx0Ly8gYXJyYXkgb2YgY2xhc3NlcyB3aGljaCBhcmUgdG8gYmUgcmVtb3ZlZFxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzZXNfdG9fcmVtb3ZlID0gW107XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaChjdXJyZW50X2NsYXNzZXMsIGZ1bmN0aW9uIChpbmRleCwgY2xhc3NfbmFtZSkge1xuXHRcdFx0XHRcdFx0XHQvLyBpZiB0aGUgY2xhc3NuYW1lIGJlZ2lucyB3aXRoIGJnIGFkZCBpdCB0byB0aGUgY2xhc3Nlc190b19yZW1vdmUgYXJyYXlcblx0XHRcdFx0XHRcdFx0aWYgKC9yYXN0ZXIuKi8udGVzdChjbGFzc19uYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzZXNfdG9fcmVtb3ZlLnB1c2goY2xhc3NfbmFtZSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRjbGFzc2VzX3RvX3JlbW92ZS5wdXNoKCdyZXRpbmEnKTtcblx0XHRcdFx0XHRcdC8vIHR1cm4gdGhlIGFycmF5IGJhY2sgaW50byBhIHN0cmluZ1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNsYXNzZXNfdG9fcmVtb3ZlLmpvaW4oJyAnKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblxuXHRcdFx0WVRQbGF5ZXIucHJldmVudFRyaWdnZXIgPSB0cnVlO1xuXHRcdFx0WVRQbGF5ZXIuc3RhdGUgPSAyO1xuXHRcdFx0WVRQbGF5ZXIucHJldmVudFRyaWdnZXIgPSB0cnVlO1xuXG5cdFx0XHRZVFBsYXllci5wbGF5ZXIubXV0ZSgpO1xuXHRcdFx0WVRQbGF5ZXIucGxheWVyLnBsYXlWaWRlbygpO1xuXHRcdFx0WVRQbGF5ZXIuaXNTdGFydGluZyA9IHRydWU7XG5cblx0XHRcdGxldCBzdGFydEF0ID0gWVRQbGF5ZXIuc3RhcnRfZnJvbV9sYXN0ID8gWVRQbGF5ZXIuc3RhcnRfZnJvbV9sYXN0IDogWVRQbGF5ZXIub3B0LnN0YXJ0QXQgPyBZVFBsYXllci5vcHQuc3RhcnRBdCA6IDE7XG5cblx0XHRcdFlUUGxheWVyLnByZXZlbnRUcmlnZ2VyID0gdHJ1ZTtcblx0XHRcdFlUUGxheWVyLmNoZWNrRm9yU3RhcnRBdCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRZVFBsYXllci5wbGF5ZXIubXV0ZSgpO1xuXHRcdFx0XHRZVFBsYXllci5wbGF5ZXIuc2Vla1RvKHN0YXJ0QXQsIHRydWUpO1xuXG5cdFx0XHRcdGxldCBjYW5QbGF5VmlkZW8gPSBZVFBsYXllci5wbGF5ZXIuZ2V0VmlkZW9Mb2FkZWRGcmFjdGlvbigpID49IHN0YXJ0QXQgLyBZVFBsYXllci5wbGF5ZXIuZ2V0RHVyYXRpb24oKTtcblxuXHRcdFx0XHRpZiAoalF1ZXJ5LmJyb3dzZXIubW9iaWxlKVxuXHRcdFx0XHRcdGNhblBsYXlWaWRlbyA9IHRydWU7XG5cblx0XHRcdFx0aWYgKFlUUGxheWVyLnBsYXllci5nZXREdXJhdGlvbigpID4gMCAmJiBZVFBsYXllci5wbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSA+PSBzdGFydEF0ICYmIGNhblBsYXlWaWRlbykge1xuXHRcdFx0XHRcdFlUUGxheWVyLnN0YXJ0X2Zyb21fbGFzdCA9IG51bGw7XG5cblx0XHRcdFx0XHRZVFBsYXllci5wcmV2ZW50VHJpZ2dlciA9IHRydWU7XG5cdFx0XHRcdFx0JFlUUGxheWVyLllUUFBhdXNlKCk7XG5cblx0XHRcdFx0XHRjbGVhckludGVydmFsKFlUUGxheWVyLmNoZWNrRm9yU3RhcnRBdCk7XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIFlUUGxheWVyLm9wdC5vblJlYWR5ID09ICdmdW5jdGlvbicpXG5cdFx0XHRcdFx0XHRZVFBsYXllci5vcHQub25SZWFkeShZVFBsYXllcik7XG5cblx0XHRcdFx0XHRZVFBsYXllci5pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdFx0XHRcdCRZVFBsYXllci5ZVFBSZW1vdmVGaWx0ZXIoKTtcblxuXHRcdFx0XHRcdGlmIChZVFBsYXllci5vcHQuYWRkRmlsdGVycykge1xuXHRcdFx0XHRcdFx0JFlUUGxheWVyLllUUEFwcGx5RmlsdGVycyhZVFBsYXllci5vcHQuYWRkRmlsdGVycylcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JFlUUGxheWVyLllUUEFwcGx5RmlsdGVycygpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCRZVFBsYXllci5ZVFBFbmFibGVGaWx0ZXJzKCk7XG5cdFx0XHRcdFx0bGV0IFlUUHJlYWR5ID0galF1ZXJ5LkV2ZW50KCdZVFBSZWFkeScpO1xuXHRcdFx0XHRcdFlUUHJlYWR5LnRpbWUgPSBZVFBsYXllci5jdXJyZW50VGltZTtcblx0XHRcdFx0XHQkWVRQbGF5ZXIudHJpZ2dlcihZVFByZWFkeSk7XG5cblx0XHRcdFx0XHRZVFBsYXllci5zdGF0ZSA9IDI7XG5cblx0XHRcdFx0XHRpZiAoIVlUUGxheWVyLm9wdC5tdXRlKSB7XG5cblx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5vcHQuYXV0b1BsYXkpIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5kZWJ1ZygnVG8gbWFrZSB0aGUgdmlkZW8gXFwnYXV0by1wbGF5XFwnIHlvdSBtdXN0IG11dGUgdGhlIGF1ZGlvIGFjY29yZGluZyB3aXRoIHRoZSBsYXRlc3QgdmVuZG9yIHBvbGljeScpO1xuXHRcdFx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIubXV0ZSgpXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci51bk11dGUoKVxuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCRZVFBsYXllci5ZVFBNdXRlKClcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIF9nYXEgIT0gJ3VuZGVmaW5lZCcgJiYgZXZhbChZVFBsYXllci5vcHQuZ2FUcmFjaykpXG5cdFx0XHRcdFx0XHRfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsICdZVFBsYXllcicsICdQbGF5JywgKFlUUGxheWVyLmhhc0RhdGEgPyBZVFBsYXllci52aWRlb0RhdGEudGl0bGUgOiBZVFBsYXllci52aWRlb0lELnRvU3RyaW5nKCkpXSk7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGdhICE9ICd1bmRlZmluZWQnICYmIGV2YWwoWVRQbGF5ZXIub3B0LmdhVHJhY2spKVxuXHRcdFx0XHRcdFx0Z2EoJ3NlbmQnLCAnZXZlbnQnLCAnWVRQbGF5ZXInLCAncGxheScsIChZVFBsYXllci5oYXNEYXRhID8gWVRQbGF5ZXIudmlkZW9EYXRhLnRpdGxlIDogWVRQbGF5ZXIudmlkZW9JRC50b1N0cmluZygpKSk7XG5cblx0XHRcdFx0XHRpZiAoWVRQbGF5ZXIub3B0LmF1dG9QbGF5KSB7XG5cblx0XHRcdFx0XHRcdGxldCBZVFBTdGFydCA9IGpRdWVyeS5FdmVudCgnWVRQU3RhcnQnKTtcblx0XHRcdFx0XHRcdFlUUFN0YXJ0LnRpbWUgPSBZVFBsYXllci5jdXJyZW50VGltZTtcblx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllcikudHJpZ2dlcihZVFBTdGFydCk7XG5cblx0XHRcdFx0XHRcdFlUUGxheWVyLmlzU3RhcnRpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRcdFx0LyogRml4IGZvciBTYWZhcmkgZnJlZXplICovXG5cdFx0XHRcdFx0XHRpZiAoalF1ZXJ5Lm1iQnJvd3Nlci5vcy5uYW1lID09PSAnbWFjJyAmJiBqUXVlcnkubWJCcm93c2VyLnNhZmFyaSkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkoJ2JvZHknKS5vbmUoJ21vdXNlZG93bi5ZVFBzdGFydCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIuWVRQUGxheSgpXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQkWVRQbGF5ZXIuWVRQUGxheSgpO1xuXHRcdFx0XHRcdFx0Y29uc29sZS50aW1lRW5kKCdZVFBsYXllclN0YXJ0UGxheScpXG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRZVFBsYXllci5wcmV2ZW50VHJpZ2dlciA9IHRydWU7XG5cdFx0XHRcdFx0XHQkWVRQbGF5ZXIuWVRQUGF1c2UoKTtcblxuXHRcdFx0XHRcdFx0aWYgKFlUUGxheWVyLnN0YXJ0X2Zyb21fbGFzdClcblx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIucGxheWVyLnNlZWtUbyhzdGFydEF0LCB0cnVlKTtcblxuXHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFlUUGxheWVyLnByZXZlbnRUcmlnZ2VyID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0JFlUUGxheWVyLllUUFBhdXNlKCk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCFZVFBsYXllci5pc1BsYXllcikge1xuXHRcdFx0XHRcdFx0XHRcdGlmICghWVRQbGF5ZXIub3B0LmNvdmVySW1hZ2UpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShZVFBsYXllci5wbGF5ZXJFbCkuQ1NTQW5pbWF0ZSh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdFx0XHRcdFx0XHRcdH0sIFlUUGxheWVyLm9wdC5mYWRlT25TdGFydFRpbWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5DU1NBbmltYXRlKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3BhY2l0eTogWVRQbGF5ZXIuaXNBbG9uZSA/IDEgOiBZVFBsYXllci5vcHQub3BhY2l0eVxuXHRcdFx0XHRcdFx0XHRcdFx0fSwgWVRQbGF5ZXIub3B0LmZhZGVPblN0YXJ0VGltZSlcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIud3JhcHBlci5jc3Moe29wYWNpdHk6IDB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkWVRQbGF5ZXIuY2hhbmdlQ292ZXJJbWFnZSgpXG5cdFx0XHRcdFx0XHRcdFx0XHR9LCBZVFBsYXllci5vcHQuZmFkZU9uU3RhcnRUaW1lKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRZVFBsYXllci5pc1N0YXJ0aW5nID0gZmFsc2Vcblx0XHRcdFx0XHRcdH0sIDUwMCk7XG5cblx0XHRcdFx0XHRcdGlmIChZVFBsYXllci5jb250cm9sQmFyLmxlbmd0aClcblx0XHRcdFx0XHRcdFx0WVRQbGF5ZXIuY29udHJvbEJhci5maW5kKCcubWJfWVRQUGxheVBhdXNlJykuaHRtbChqUXVlcnkubWJZVFBsYXllci5jb250cm9scy5wbGF5KVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnNvbGUuZGVidWcoKVxuXHRcdFx0XHRcdGlmIChZVFBsYXllci5pc1BsYXllciAmJiAhWVRQbGF5ZXIub3B0LmF1dG9QbGF5ICYmIChZVFBsYXllci5sb2FkaW5nICYmIFlUUGxheWVyLmxvYWRpbmcubGVuZ3RoKSkge1xuXHRcdFx0XHRcdFx0WVRQbGF5ZXIubG9hZGluZy5odG1sKCdSZWFkeScpO1xuXHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFlUUGxheWVyLmxvYWRpbmcuZmFkZU91dCgpXG5cdFx0XHRcdFx0XHR9LCAxMDApXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKFlUUGxheWVyLmNvbnRyb2xCYXIgJiYgWVRQbGF5ZXIuY29udHJvbEJhci5sZW5ndGgpXG5cdFx0XHRcdFx0XHRZVFBsYXllci5jb250cm9sQmFyLnNsaWRlRG93bigxMDAwKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGpRdWVyeS5tYkJyb3dzZXIub3MubmFtZSA9PT0gJ21hYycgJiYgalF1ZXJ5Lm1iQnJvd3Nlci5zYWZhcmkpIHtcblx0XHRcdFx0XHRZVFBsYXllci5wbGF5ZXIucGxheVZpZGVvKCk7XG5cdFx0XHRcdFx0aWYgKHN0YXJ0QXQgPj0gMClcblx0XHRcdFx0XHRcdFlUUGxheWVyLnBsYXllci5zZWVrVG8oc3RhcnRBdCwgdHJ1ZSlcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCAxMDApO1xuXG5cdFx0XHRyZXR1cm4gJFlUUGxheWVyXG5cdFx0fSxcblxuXHRcdC8qIFRJTUUgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdC8qKlxuXHRcdCAqIGdldFRpbWVcblx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfSB0aW1lXG5cdFx0ICovXG5cdFx0Z2V0VGltZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cdFx0XHRyZXR1cm4galF1ZXJ5Lm1iWVRQbGF5ZXIuZm9ybWF0VGltZShZVFBsYXllci5jdXJyZW50VGltZSlcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogZ2V0VG90YWxUaW1lXG5cdFx0ICogQHJldHVybnMge3N0cmluZ30gdG90YWwgdGltZVxuXHRcdCAqL1xuXHRcdGdldFRvdGFsVGltZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cdFx0XHRyZXR1cm4galF1ZXJ5Lm1iWVRQbGF5ZXIuZm9ybWF0VGltZShZVFBsYXllci50b3RhbFRpbWUpXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIGZvcm1hdFRpbWVcblx0XHQgKiBAcGFyYW0gc1xuXHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0Zm9ybWF0VGltZTogZnVuY3Rpb24gKHMpIHtcblx0XHRcdGxldCBtaW4gPSBNYXRoLmZsb29yKHMgLyA2MCk7XG5cdFx0XHRsZXQgc2VjID0gTWF0aC5mbG9vcihzIC0gKDYwICogbWluKSk7XG5cdFx0XHRyZXR1cm4gKG1pbiA8PSA5ID8gJzAnICsgbWluIDogbWluKSArICcgOiAnICsgKHNlYyA8PSA5ID8gJzAnICsgc2VjIDogc2VjKVxuXHRcdH0sXG5cblx0XHQvKiBQTEFZRVIgUE9TSVRJT04gQU5EIFNJWkUgT1BUSU1JWkFUSU9OLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQvKipcblx0XHQgKiBzZXRBbmNob3Jcblx0XHQgKiBAcGFyYW0gYW5jaG9yXG5cdFx0ICovXG5cdFx0c2V0QW5jaG9yOiBmdW5jdGlvbiAoYW5jaG9yKSB7XG5cdFx0XHRsZXQgJFlUcGxheWVyID0gdGhpcztcblx0XHRcdCRZVHBsYXllci5vcHRpbWl6ZURpc3BsYXkoYW5jaG9yKVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBnZXRBbmNob3Jcblx0XHQgKi9cblx0XHRnZXRBbmNob3I6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXHRcdFx0cmV0dXJuIFlUUGxheWVyLm9wdC5hbmNob3Jcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogc2V0QWJ1bmRhbmNlXG5cdFx0ICogQHBhcmFtIHZhbFxuXHRcdCAqIEBwYXJhbSB1cGRhdGVPcHRpb25zXG5cdFx0ICogQHJldHVybnMge2pRdWVyeS5tYllUUGxheWVyfVxuXHRcdCAqL1xuXHRcdHNldEFidW5kYW5jZTogZnVuY3Rpb24gKHZhbCwgdXBkYXRlT3B0aW9ucykge1xuXHRcdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cdFx0XHRsZXQgJFlUUGxheWVyID0gdGhpcztcblx0XHRcdGlmICh1cGRhdGVPcHRpb25zKVxuXHRcdFx0XHRZVFBsYXllci5vcHQuYWJ1bmRhbmNlID0gdmFsO1xuXHRcdFx0JFlUUGxheWVyLm9wdGltaXplRGlzcGxheShZVFBsYXllci5vcHQuYW5jaG9yLCB2YWwpO1xuXHRcdFx0cmV0dXJuICRZVFBsYXllclxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBnZXRBYnVuZGFuY2Vcblx0XHQgKiBAcmV0dXJucyB7Kn1cblx0XHQgKi9cblx0XHRnZXRBYnVuZGFuY2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXHRcdFx0cmV0dXJuIFlUUGxheWVyLm9wdC5hYnVuZGFuY2Vcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogc2V0T3B0aW9uXG5cdFx0ICogQHBhcmFtIG9wdFxuXHRcdCAqIEBwYXJhbSB2YWxcblx0XHQgKiBAcmV0dXJucyB7alF1ZXJ5Lm1iWVRQbGF5ZXJ9XG5cdFx0ICovXG5cdFx0c2V0T3B0aW9uOiBmdW5jdGlvbiAob3B0LCB2YWwpIHtcblx0XHRcdGxldCBZVFBsYXllciA9IHRoaXMuZ2V0KDApO1xuXHRcdFx0bGV0ICRZVFBsYXllciA9IHRoaXM7XG5cdFx0XHRZVFBsYXllci5vcHRbb3B0XSA9IHZhbDtcblx0XHRcdHJldHVybiAkWVRQbGF5ZXJcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIG9wdGltaXplRGlzcGxheVxuXHQgKiBAcGFyYW0gYW5jaG9yXG5cdCAqIEBwYXJhbSBhYnVuZGFuY2VYXG5cdCAqL1xuXHRqUXVlcnkuZm4ub3B0aW1pemVEaXNwbGF5ID0gZnVuY3Rpb24gKGFuY2hvciwgYWJ1bmRhbmNlWCkge1xuXG5cdFx0bGV0IFlUUGxheWVyID0gdGhpcy5nZXQoMCk7XG5cdFx0bGV0IHZpZCA9IHt9O1xuXHRcdGxldCBlbCA9IFlUUGxheWVyLndyYXBwZXI7XG5cdFx0bGV0IGlmcmFtZSA9IGpRdWVyeShZVFBsYXllci5wbGF5ZXJFbCk7XG5cblx0XHRZVFBsYXllci5vcHQuYW5jaG9yID0gYW5jaG9yIHx8IFlUUGxheWVyLm9wdC5hbmNob3I7XG5cblx0XHQvLyBjb25zb2xlLmRlYnVnKFlUUGxheWVyLm9wdC5hbmNob3IpO1xuXG5cdFx0WVRQbGF5ZXIub3B0LmFuY2hvciA9IHR5cGVvZiBZVFBsYXllci5vcHQuYW5jaG9yICE9ICd1bmRlZmluZWQgJyA/IFlUUGxheWVyLm9wdC5hbmNob3IgOiAnY2VudGVyLGNlbnRlcic7XG5cdFx0bGV0IFlUUEFsaWduID0gWVRQbGF5ZXIub3B0LmFuY2hvci5zcGxpdCgnLCcpO1xuXHRcdGxldCBhYiA9IGFidW5kYW5jZVggPyBhYnVuZGFuY2VYIDogWVRQbGF5ZXIub3B0LmFidW5kYW5jZTtcblxuXHRcdGlmIChZVFBsYXllci5vcHQub3B0aW1pemVEaXNwbGF5KSB7XG5cdFx0XHRsZXQgYWJ1bmRhbmNlID0gZWwuaGVpZ2h0KCkgKiBhYjtcblx0XHRcdGxldCB3aW4gPSB7fTtcblx0XHRcdHdpbi53aWR0aCA9IGVsLm91dGVyV2lkdGgoKTtcblx0XHRcdHdpbi5oZWlnaHQgPSBlbC5vdXRlckhlaWdodCgpICsgYWJ1bmRhbmNlO1xuXG5cdFx0XHRZVFBsYXllci5vcHQucmF0aW8gPSBZVFBsYXllci5vcHQucmF0aW8gPT09ICdhdXRvJyA/IDE2IC8gOSA6IFlUUGxheWVyLm9wdC5yYXRpbztcblx0XHRcdFlUUGxheWVyLm9wdC5yYXRpbyA9IGV2YWwoWVRQbGF5ZXIub3B0LnJhdGlvKTtcblxuXHRcdFx0dmlkLndpZHRoID0gd2luLndpZHRoICsgYWJ1bmRhbmNlO1xuXHRcdFx0dmlkLmhlaWdodCA9IE1hdGguY2VpbCh2aWQud2lkdGggLyBZVFBsYXllci5vcHQucmF0aW8pO1xuXHRcdFx0dmlkLm1hcmdpblRvcCA9IE1hdGguY2VpbCgtKCh2aWQuaGVpZ2h0IC0gd2luLmhlaWdodCArIGFidW5kYW5jZSkgLyAyKSk7XG5cdFx0XHR2aWQubWFyZ2luTGVmdCA9IC0oYWJ1bmRhbmNlIC8gMik7XG5cdFx0XHRsZXQgbG93ZXN0ID0gdmlkLmhlaWdodCA8IHdpbi5oZWlnaHQ7XG5cblx0XHRcdGlmIChsb3dlc3QpIHtcblx0XHRcdFx0dmlkLmhlaWdodCA9IHdpbi5oZWlnaHQgKyBhYnVuZGFuY2U7XG5cdFx0XHRcdHZpZC53aWR0aCA9IE1hdGguY2VpbCh2aWQuaGVpZ2h0ICogWVRQbGF5ZXIub3B0LnJhdGlvKTtcblx0XHRcdFx0dmlkLm1hcmdpblRvcCA9IC0oYWJ1bmRhbmNlIC8gMik7XG5cdFx0XHRcdHZpZC5tYXJnaW5MZWZ0ID0gTWF0aC5jZWlsKC0oKHZpZC53aWR0aCAtIHdpbi53aWR0aCkgLyAyKSlcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgYSBpbiBZVFBBbGlnbikge1xuXHRcdFx0XHRpZiAoWVRQQWxpZ24uaGFzT3duUHJvcGVydHkoYSkpIHtcblx0XHRcdFx0XHRsZXQgYWwgPSBZVFBBbGlnblthXS5yZXBsYWNlKC8gL2csICcnKTtcblxuXHRcdFx0XHRcdHN3aXRjaCAoYWwpIHtcblx0XHRcdFx0XHRcdGNhc2UgJ3RvcCc6XG5cdFx0XHRcdFx0XHRcdHZpZC5tYXJnaW5Ub3AgPSAtYWJ1bmRhbmNlO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ2JvdHRvbSc6XG5cdFx0XHRcdFx0XHRcdHZpZC5tYXJnaW5Ub3AgPSBNYXRoLmNlaWwoLSh2aWQuaGVpZ2h0IC0gd2luLmhlaWdodCkgLSAoYWJ1bmRhbmNlIC8gMikpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ2xlZnQnOlxuXHRcdFx0XHRcdFx0XHR2aWQubWFyZ2luTGVmdCA9IC0oYWJ1bmRhbmNlKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdyaWdodCc6XG5cdFx0XHRcdFx0XHRcdHZpZC5tYXJnaW5MZWZ0ID0gTWF0aC5jZWlsKC0odmlkLndpZHRoIC0gd2luLndpZHRoKSArIChhYnVuZGFuY2UgLyAyKSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2aWQud2lkdGggPSAnMTAwJSc7XG5cdFx0XHR2aWQuaGVpZ2h0ID0gJzEwMCUnO1xuXHRcdFx0dmlkLm1hcmdpblRvcCA9IDA7XG5cdFx0XHR2aWQubWFyZ2luTGVmdCA9IDBcblx0XHR9XG5cblx0XHRpZnJhbWUuY3NzKHtcblx0XHRcdHdpZHRoICAgICA6IHZpZC53aWR0aCxcblx0XHRcdGhlaWdodCAgICA6IHZpZC5oZWlnaHQsXG5cdFx0XHRtYXJnaW5Ub3AgOiB2aWQubWFyZ2luVG9wLFxuXHRcdFx0bWFyZ2luTGVmdDogdmlkLm1hcmdpbkxlZnQsXG5cdFx0XHRtYXhXaWR0aCAgOiAnaW5pdGlhbCdcblx0XHR9KVxuXG5cblx0fTtcblxuXG5cdC8qIFVUSUxJVElFUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAqIHNodWZmbGVcblx0ICogQHBhcmFtIGFyclxuXHQgKiBAcmV0dXJucyB7QXJyYXl8c3RyaW5nfEJsb2J8Kn1cblx0ICpcblx0ICovXG5cdGpRdWVyeS5zaHVmZmxlID0gZnVuY3Rpb24gKGFycikge1xuXHRcdGxldCBuZXdBcnJheSA9IGFyci5zbGljZSgpO1xuXHRcdGxldCBsZW4gPSBuZXdBcnJheS5sZW5ndGg7XG5cdFx0bGV0IGkgPSBsZW47XG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0bGV0IHAgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogbGVuKTtcblx0XHRcdGxldCB0ID0gbmV3QXJyYXlbaV07XG5cdFx0XHRuZXdBcnJheVtpXSA9IG5ld0FycmF5W3BdO1xuXHRcdFx0bmV3QXJyYXlbcF0gPSB0XG5cdFx0fVxuXHRcdHJldHVybiBuZXdBcnJheTtcblx0fTtcblxuXHQvKipcblx0ICogVW5zZWxlY3RhYmxlXG5cdCAqIEByZXR1cm5zIHsqfVxuXHQgKi9cblx0alF1ZXJ5LmZuLnVuc2VsZWN0YWJsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdGpRdWVyeSh0aGlzKS5jc3Moe1xuXHRcdFx0XHQnLW1vei11c2VyLXNlbGVjdCcgICA6ICdub25lJyxcblx0XHRcdFx0Jy13ZWJraXQtdXNlci1zZWxlY3QnOiAnbm9uZScsXG5cdFx0XHRcdCd1c2VyLXNlbGVjdCcgICAgICAgIDogJ25vbmUnXG5cdFx0XHR9KS5hdHRyKCd1bnNlbGVjdGFibGUnLCAnb24nKVxuXHRcdH0pXG5cdH07XG5cblx0LyogRVhURVJOQUwgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0alF1ZXJ5LmZuLllUUGxheWVyID0galF1ZXJ5Lm1iWVRQbGF5ZXIuYnVpbGRQbGF5ZXI7XG5cdGpRdWVyeS5mbi5tYl9ZVFBsYXllciA9IGpRdWVyeS5tYllUUGxheWVyLmJ1aWxkUGxheWVyO1xuXG5cdGpRdWVyeS5mbi5ZVFBDaGVja0ZvclN0YXRlID0galF1ZXJ5Lm1iWVRQbGF5ZXIuY2hlY2tGb3JTdGF0ZTtcblxuXHRqUXVlcnkuZm4uWVRQR2V0UGxheWVyID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0UGxheWVyO1xuXHRqUXVlcnkuZm4uWVRQR2V0VmlkZW9JRCA9IGpRdWVyeS5tYllUUGxheWVyLmdldFZpZGVvSUQ7XG5cdGpRdWVyeS5mbi5ZVFBHZXRQbGF5bGlzdElEID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0UGxheWxpc3RJRDtcblx0alF1ZXJ5LmZuLllUUENoYW5nZVZpZGVvID0galF1ZXJ5LmZuLllUUENoYW5nZU1vdmllID0galF1ZXJ5Lm1iWVRQbGF5ZXIuY2hhbmdlVmlkZW87XG5cdGpRdWVyeS5mbi5ZVFBQbGF5ZXJEZXN0cm95ID0galF1ZXJ5Lm1iWVRQbGF5ZXIucGxheWVyRGVzdHJveTtcblxuXHRqUXVlcnkuZm4uWVRQUGxheSA9IGpRdWVyeS5tYllUUGxheWVyLnBsYXk7XG5cdGpRdWVyeS5mbi5ZVFBUb2dnbGVQbGF5ID0galF1ZXJ5Lm1iWVRQbGF5ZXIudG9nZ2xlUGxheTtcblx0alF1ZXJ5LmZuLllUUFN0b3AgPSBqUXVlcnkubWJZVFBsYXllci5zdG9wO1xuXHRqUXVlcnkuZm4uWVRQUGF1c2UgPSBqUXVlcnkubWJZVFBsYXllci5wYXVzZTtcblx0alF1ZXJ5LmZuLllUUFNlZWtUbyA9IGpRdWVyeS5tYllUUGxheWVyLnNlZWtUbztcblxuXHRqUXVlcnkuZm4uWVRQR2V0UGxheWJhY2tSYXRlID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0UGxheWJhY2tSYXRlO1xuXHRqUXVlcnkuZm4uWVRQU2V0UGxheWJhY2tSYXRlID0galF1ZXJ5Lm1iWVRQbGF5ZXIuc2V0UGxheWJhY2tSYXRlO1xuXG5cdGpRdWVyeS5mbi5jaGFuZ2VDb3ZlckltYWdlID0galF1ZXJ5Lm1iWVRQbGF5ZXIuY2hhbmdlQ292ZXJJbWFnZTtcblxuXHRqUXVlcnkuZm4uWVRQbGF5bGlzdCA9IGpRdWVyeS5tYllUUGxheWVyLnBsYXlsaXN0O1xuXHRqUXVlcnkuZm4uWVRQUGxheU5leHQgPSBqUXVlcnkubWJZVFBsYXllci5wbGF5TmV4dDtcblx0alF1ZXJ5LmZuLllUUFBsYXlQcmV2ID0galF1ZXJ5Lm1iWVRQbGF5ZXIucGxheVByZXY7XG5cdGpRdWVyeS5mbi5ZVFBQbGF5SW5kZXggPSBqUXVlcnkubWJZVFBsYXllci5wbGF5SW5kZXg7XG5cblx0alF1ZXJ5LmZuLllUUE11dGUgPSBqUXVlcnkubWJZVFBsYXllci5tdXRlO1xuXHRqUXVlcnkuZm4uWVRQVW5tdXRlID0galF1ZXJ5Lm1iWVRQbGF5ZXIudW5tdXRlO1xuXHRqUXVlcnkuZm4uWVRQVG9nZ2xlVm9sdW1lID0galF1ZXJ5Lm1iWVRQbGF5ZXIudG9nZ2xlVm9sdW1lO1xuXHRqUXVlcnkuZm4uWVRQU2V0Vm9sdW1lID0galF1ZXJ5Lm1iWVRQbGF5ZXIuc2V0Vm9sdW1lO1xuXHRqUXVlcnkuZm4uWVRQR2V0Vm9sdW1lID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0Vm9sdW1lO1xuXG5cdGpRdWVyeS5mbi5ZVFBHZXRWaWRlb0RhdGEgPSBqUXVlcnkubWJZVFBsYXllci5nZXRWaWRlb0RhdGE7XG5cdGpRdWVyeS5mbi5ZVFBGdWxsc2NyZWVuID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZnVsbHNjcmVlbjtcblx0alF1ZXJ5LmZuLllUUFRvZ2dsZUxvb3BzID0galF1ZXJ5Lm1iWVRQbGF5ZXIudG9nZ2xlTG9vcHM7XG5cdGpRdWVyeS5mbi5ZVFBNYW5hZ2VQcm9ncmVzcyA9IGpRdWVyeS5tYllUUGxheWVyLm1hbmFnZVByb2dyZXNzO1xuXG5cdGpRdWVyeS5mbi5ZVFBTZXRWaWRlb1F1YWxpdHkgPSBqUXVlcnkubWJZVFBsYXllci5zZXRWaWRlb1F1YWxpdHk7XG5cdGpRdWVyeS5mbi5ZVFBHZXRWaWRlb1F1YWxpdHkgPSBqUXVlcnkubWJZVFBsYXllci5nZXRWaWRlb1F1YWxpdHk7XG5cblx0alF1ZXJ5LmZuLllUUEFwcGx5RmlsdGVyID0galF1ZXJ5Lm1iWVRQbGF5ZXIuYXBwbHlGaWx0ZXI7XG5cdGpRdWVyeS5mbi5ZVFBBcHBseUZpbHRlcnMgPSBqUXVlcnkubWJZVFBsYXllci5hcHBseUZpbHRlcnM7XG5cdGpRdWVyeS5mbi5ZVFBUb2dnbGVGaWx0ZXIgPSBqUXVlcnkubWJZVFBsYXllci50b2dnbGVGaWx0ZXI7XG5cdGpRdWVyeS5mbi5ZVFBUb2dnbGVGaWx0ZXJzID0galF1ZXJ5Lm1iWVRQbGF5ZXIudG9nZ2xlRmlsdGVycztcblx0alF1ZXJ5LmZuLllUUFJlbW92ZUZpbHRlciA9IGpRdWVyeS5tYllUUGxheWVyLnJlbW92ZUZpbHRlcjtcblx0alF1ZXJ5LmZuLllUUERpc2FibGVGaWx0ZXJzID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZGlzYWJsZUZpbHRlcnM7XG5cdGpRdWVyeS5mbi5ZVFBFbmFibGVGaWx0ZXJzID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZW5hYmxlRmlsdGVycztcblx0alF1ZXJ5LmZuLllUUEdldEZpbHRlcnMgPSBqUXVlcnkubWJZVFBsYXllci5nZXRGaWx0ZXJzO1xuXG5cdGpRdWVyeS5mbi5ZVFBHZXRUaW1lID0galF1ZXJ5Lm1iWVRQbGF5ZXIuZ2V0VGltZTtcblx0alF1ZXJ5LmZuLllUUEdldFRvdGFsVGltZSA9IGpRdWVyeS5tYllUUGxheWVyLmdldFRvdGFsVGltZTtcblxuXHRqUXVlcnkuZm4uWVRQQWRkTWFzayA9IGpRdWVyeS5tYllUUGxheWVyLmFkZE1hc2s7XG5cdGpRdWVyeS5mbi5ZVFBSZW1vdmVNYXNrID0galF1ZXJ5Lm1iWVRQbGF5ZXIucmVtb3ZlTWFzaztcblx0alF1ZXJ5LmZuLllUUFRvZ2dsZU1hc2sgPSBqUXVlcnkubWJZVFBsYXllci50b2dnbGVNYXNrO1xuXG5cdGpRdWVyeS5mbi5ZVFBHZXRBYnVuZGFuY2UgPSBqUXVlcnkubWJZVFBsYXllci5nZXRBYnVuZGFuY2U7XG5cdGpRdWVyeS5mbi5ZVFBTZXRBYnVuZGFuY2UgPSBqUXVlcnkubWJZVFBsYXllci5zZXRBYnVuZGFuY2U7XG5cblx0alF1ZXJ5LmZuLllUUFNldEFuY2hvciA9IGpRdWVyeS5tYllUUGxheWVyLnNldEFuY2hvcjtcblx0alF1ZXJ5LmZuLllUUEdldEFuY2hvciA9IGpRdWVyeS5tYllUUGxheWVyLmdldEFuY2hvcjtcblxuXHRqUXVlcnkuZm4uWVRQU2V0T3B0aW9uID0galF1ZXJ5Lm1iWVRQbGF5ZXIuc2V0T3B0aW9uXG5cbn0pKGpRdWVyeSwgeXRwKTtcbiJdLCJmaWxlIjoibWIuWVRQbGF5NDV0NjQ1ZXIuanMifQ==
