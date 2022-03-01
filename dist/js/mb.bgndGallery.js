/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: mb.bgndGallery.js
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
 *  last modified: 24/06/13 18.06
 *  *****************************************************************************
 */

/*Browser detection patch*/
(function(){if(!(8>jQuery.fn.jquery.split(".")[1])){jQuery.browser={};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.msie=!1;var a=navigator.userAgent;jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var c,b;if(-1!=(b=a.indexOf("Opera"))){if(jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=a.substring(b+6),-1!=(b= a.indexOf("Version")))jQuery.browser.fullVersion=a.substring(b+8)}else if(-1!=(b=a.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=a.substring(b+5);else if(-1!=(b=a.indexOf("Chrome")))jQuery.browser.webkit=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=a.substring(b+7);else if(-1!=(b=a.indexOf("Safari"))){if(jQuery.browser.webkit=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=a.substring(b+7),-1!=(b=a.indexOf("Version")))jQuery.browser.fullVersion= a.substring(b+8)}else if(-1!=(b=a.indexOf("Firefox")))jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=a.substring(b+8);else if((c=a.lastIndexOf(" ")+1)<(b=a.lastIndexOf("/")))jQuery.browser.name=a.substring(c,b),jQuery.browser.fullVersion=a.substring(b+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName);if(-1!=(a=jQuery.browser.fullVersion.indexOf(";")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0, a);if(-1!=(a=jQuery.browser.fullVersion.indexOf(" ")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,a);jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));jQuery.browser.version=jQuery.browser.majorVersion}})(jQuery);

/*
 *   jquery.mb.components
 *  file: jquery.mb.CSSAnimate.js
 */

/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.CSSAnimate.js
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
 *  last modified: 09/06/13 17.08
 *  *****************************************************************************
 */

/*
 * version: 1.6.1
 *  params:

 @opt        -> the CSS object (ex: {top:300, left:400, ...})
 @duration   -> an int for the animation duration in milliseconds
 @delay      -> an int for the animation delay in milliseconds
 @ease       -> ease  ||  linear || ease-in || ease-out || ease-in-out  ||  cubic-bezier(<number>, <number>,  <number>,  <number>)
 @callback   -> a callback function called once the transition end

 example:

 jQuery(this).CSSAnimate({top:t, left:l, width:w, height:h, transform: 'rotate(50deg) scale(.8)'}, 2000, 100, "ease-out", callback;})
 */


/*Browser detection patch*/
(function(){if(!(8>jQuery.fn.jquery.split(".")[1])){jQuery.browser={};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.msie=!1;var a=navigator.userAgent;jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var c,b;if(-1!=(b=a.indexOf("Opera"))){if(jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=a.substring(b+6),-1!=(b= a.indexOf("Version")))jQuery.browser.fullVersion=a.substring(b+8)}else if(-1!=(b=a.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=a.substring(b+5);else if(-1!=(b=a.indexOf("Chrome")))jQuery.browser.webkit=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=a.substring(b+7);else if(-1!=(b=a.indexOf("Safari"))){if(jQuery.browser.webkit=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=a.substring(b+7),-1!=(b=a.indexOf("Version")))jQuery.browser.fullVersion= a.substring(b+8)}else if(-1!=(b=a.indexOf("Firefox")))jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=a.substring(b+8);else if((c=a.lastIndexOf(" ")+1)<(b=a.lastIndexOf("/")))jQuery.browser.name=a.substring(c,b),jQuery.browser.fullVersion=a.substring(b+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName);if(-1!=(a=jQuery.browser.fullVersion.indexOf(";")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0, a);if(-1!=(a=jQuery.browser.fullVersion.indexOf(" ")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,a);jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));jQuery.browser.version=jQuery.browser.majorVersion}})(jQuery);

/*CSSAnimate*/
jQuery.fn.CSSAnimate=function(a,f,k,m,e){return this.each(function(){var b=jQuery(this);this.id=this.id||"CSSA_"+(new Date).getTime();if(0!==b.length&&a){"function"==typeof f&&(e=f,f=jQuery.fx.speeds._default);"function"==typeof k&&(e=k,k=0);"function"==typeof m&&(e=m,m="cubic-bezier(0.65,0.03,0.36,0.72)");if("string"==typeof f)for(var l in jQuery.fx.speeds)if(f==l){f=jQuery.fx.speeds[l];break}else f=null;if(jQuery.support.transition){var d="",j="transitionEnd";jQuery.browser.webkit?(d="-webkit-", j="webkitTransitionEnd"):jQuery.browser.mozilla?(d="-moz-",j="transitionend"):jQuery.browser.opera?(d="-o-",j="otransitionend"):jQuery.browser.msie&&(d="-ms-",j="msTransitionEnd");l=[];for(c in a){var g=c;"transform"===g&&(g=d+"transform",a[g]=a[c],delete a[c]);"transform-origin"===g&&(g=d+"transform-origin",a[g]=a[c],delete a[c]);l.push(g)}var c=l.join(","),n=function(){b.off(j+"_"+b.get(0).id);clearTimeout(b.get(0).timeout);b.css(d+"transition","");"function"==typeof e&&(b.called=!0,e(b))},h={}; $.extend(h,a);h[d+"transition-property"]=c;h[d+"transition-duration"]=f+"ms";h[d+"transition-delay"]=k+"ms";h[d+"transition-timing-function"]=m;h[d+"backface-visibility"]="hidden";setTimeout(function(){b.css(h);b.one(j+"_"+b.get(0).id,n)},1);b.get(0).timeout=setTimeout(function(){b.called||!e?b.called=!1:(b.css(d+"transition",""),e(b))},f+k+100)}else{for(var c in a)"transform"===c&&delete a[c],"transform-origin"===c&&delete a[c],"auto"===a[c]&&delete a[c];if(!e||"string"===typeof e)e="linear";b.animate(a, f,e)}}})};jQuery.support.transition=function(){var a=(document.body||document.documentElement).style;return void 0!==a.transition||void 0!==a.WebkitTransition||void 0!==a.MozTransition||void 0!==a.MsTransition||void 0!==a.OTransition}();

(function($){

	$.mbBgndGallery ={
		name:"mb.bgndGallery",
		author:"Matteo Bicocchi",
		version:"1.8.0",
		defaults:{
			containment:"body",
			images:[],
			shuffle:false,
			controls:null,
			effect:"fade",
			timer:4000,
			effTimer:3000,
			raster:false, //"inc/raster.png"
			folderPath:false,
			autoStart:true,
			grayScale:false,
			activateKeyboard:false,
			preserveTop:false,
			preserveWidth:false,
			placeHolder:"",

			// idx = the zero based index of the displayed photo
			// opt=the options relatives to this component instance you can manipulate on the specific event

			// for example, if you want to reverse the enter/exit effect once the previous button is clicked:
			// you can change the opt.effect onPrev event : opt.effect = "slideRight"
			// onNext:function(opt){opt.effect = "slideLeft"}
			// onPrev:function(opt){opt.effect = "slideRight"}

			onStart:function(){},
			onChange:function(opt,idx){},
			onPause:function(opt){},
			onPlay:function(opt){},
			onNext:function(opt){},
			onPrev:function(opt){}
		},
		clear:false,

		// ENTER/EXIT EFFECTS

		effects:{
			fade:{enter:{left:0,opacity:0},exit:{left:0,opacity:0}, enterTiming:"ease-in", exitTiming:"ease-in"},
			slideUp:{enter:{top:"100%",opacity:1},exit:{top:0,opacity:0}, enterTiming:"ease-in", exitTiming:"ease-in"},
			slideDown:{enter:{top:"-100%",opacity:1},exit:{top:0,opacity:0}, enterTiming:"ease-in", exitTiming:"ease-in"},
			slideLeft:{enter:{left:"100%",opacity:1},exit:{left:0,opacity:0}, enterTiming:"ease-in", exitTiming:"ease-in"},
			slideRight:{enter:{left:"-100%",opacity:1},exit:{left:0,opacity:0}, enterTiming:"ease-in", exitTiming:"ease-in"},
			zoom:{enter:{transform:"scale("+(1+ Math.random()*5)+")",opacity:0},exit:{transform:"scale("+(1 + Math.random()*5)+")",opacity:0}, enterTiming:"cubic-bezier(0.19, 1, 0.22, 1)", exitTiming:"cubic-bezier(0.19, 1, 0.22, 1)"}
		},

		buildGallery:function(options){
			var opt = {};
			$.extend(opt, $.mbBgndGallery.defaults,options);
			opt.galleryID= new Date().getTime();
			var el= $(opt.containment).get(0);
			el.opt= opt;

			if(el.opt.onStart)
				el.opt.onStart();

			el.opt.gallery= $("<div/>").attr({id:"bgndGallery_"+el.opt.galleryID}).addClass("mbBgndGallery");
			var pos= el.opt.containment=="body"?"fixed":"absolute";
			el.opt.gallery.css({position:pos,top:0,let:0,width:"100%",height:"100%",overflow:"hidden"});

			var containment = el.opt.containment;

			if(containment !="body" && $(containment).text().trim()!=""){
				var wrapper=$("<div/>").css({"position":"absolute",minHeight:"100%", minWidth:"100%", zIndex:3});
				$(containment).wrapInner(wrapper);
				if($(containment).css("position")=="static")
					$(containment).css("position","relative");
			}
			if(opt.raster){
				var raster=$("<div/>").css({position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"url("+opt.raster+")",zIndex:1});
				opt.gallery.append(raster);
			}

			$(containment).prepend(opt.gallery);

			if(el.opt.folderPath && el.opt.images.length==0)
				el.opt.images = jQuery.loadFromSystem(el.opt.folderPath);


			if(el.opt.shuffle)
				el.opt.images= $.shuffle(el.opt.images);

			var totImg= el.opt.images.length;

			var loadCounter=0;

			$.mbBgndGallery.preload(el.opt.images[0],el);
			$(el.opt.gallery).on("imageLoaded."+el.opt.galleryID,function(){
				loadCounter++;
				if(loadCounter==totImg){
					$(el.opt.gallery).off("imageLoaded."+el.opt.galleryID);
					return;
				}
				$.mbBgndGallery.preload(el.opt.images[loadCounter],el);
			});

			el.opt.imageCounter=0;

			$.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);

			if (!opt.autoStart){
				el.opt.paused=true;
				$(el.opt.gallery).trigger("paused");
			}

			$(el.opt.gallery).on("imageReady."+el.opt.galleryID,function(){

				if(el.opt.paused)
					return;

				clearTimeout(el.opt.changing);

				$.mbBgndGallery.play(el);
			});

			$(window).on("resize",function(){
				var image=$("#bgndGallery_"+el.opt.galleryID+" img");
				$.mbBgndGallery.checkSize(image,el);
			});

			var controls = el.opt.controls;
			if(controls){
				var counter=$(el.opt.controls).find(".counter");
				counter.html(el.opt.imageCounter+1+" / "+el.opt.images.length);

				$.mbBgndGallery.buildControls(controls,el);
				$(el.opt.containment).on("paused",function(){
					$(el.opt.controls).find(".play").show();
					$(el.opt.controls).find(".pause").hide();
				});
				$(el.opt.containment).on("play",function(){
					$(el.opt.controls).find(".play").hide();
					$(el.opt.controls).find(".pause").show();
				});
			}
		},
		normalizeCss:function(opt){
			var newOpt = jQuery.extend(true, {}, opt);
			var sfx = "";
			var transitionEnd = "transitionEnd";
			if ($.browser.webkit) {
				sfx = "-webkit-";
				transitionEnd = "webkitTransitionEnd";
			} else if ($.browser.mozilla) {
				sfx = "-moz-";
				transitionEnd = "transitionend";
			} else if ($.browser.opera) {
				sfx = "-o-";
				transitionEnd = "oTransitionEnd";
			} else if ($.browser.msie) {
				sfx = "-ms-";
				transitionEnd = "msTransitionEnd";
			}

			for(var o in newOpt){
				if (o==="transform"){
					newOpt[sfx+"transform"]=newOpt[o];
					delete newOpt[o];
				}
				if (o==="transform-origin"){
					newOpt[sfx+"transform-origin"]=opt[o];
					delete newOpt[o];
				}
			}
			return newOpt;
		},
		preload:function(url,el){
			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			var img= $("<img/>").load(function(){
				$(el.opt.gallery).trigger("imageLoaded."+el.opt.galleryID);
			}).attr("src",url);
		},

		checkSize:function(image,el){

			if($.mbBgndGallery.changing)
				return;

			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			return image.each(function(){
				var image=$(this);
				var w= image.attr("w");
				var h= image.attr("h");

				var containment = el.opt.containment == "body"? window : el.opt.containment;
				var aspectRatio= w/h;
				var wAspectRatio=$(containment).width()/$(containment).height();
				if(aspectRatio>=wAspectRatio){
					image.css("height","100%");
					image.css("width","auto");
				} else{
					image.css("width","100%");
					image.css("height","auto");
				}
				image.css("margin-left",(($(containment).width()-image.width())/2));

				if(!el.opt.preserveTop)
					image.css("margin-top",(($(containment).height()-image.height())/2));

				if(el.opt.preserveWidth){
					image.css({width:"100%", height:"auto", left:0, marginLeft:0});
				}

			});
		},

		changePhoto:function(url,el){

			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			$.mbBgndGallery.changing=true;

			if(el.opt.onChange)
				el.opt.onChange(el.opt, el.opt.imageCounter);

			var image=$("<img/>").hide().load(function(){
				var image=$(this);

				var tmp=$("<div/>").css({position:"absolute",top:-5000});
				tmp.append(image);
				$("body").append(tmp);
				image.attr("w", image.width());
				image.attr("h", image.height());
				tmp.remove();

				el.opt.effect = typeof el.opt.effect == "object" ? el.opt.effect : $.mbBgndGallery.effects[el.opt.effect];


				$("#bgndGallery_"+el.opt.galleryID+" img").CSSAnimate(el.opt.effect.exit,el.opt.effTimer,0,el.opt.effect.exitTiming,function(el){
					el.remove();
				});
				image.css({position:"absolute"});
				$("#bgndGallery_"+el.opt.galleryID).append(image);

				//todo: add a property to let height for vertica  l images
				$.mbBgndGallery.changing=false;
				$.mbBgndGallery.checkSize(image, el);

				image.css($.mbBgndGallery.normalizeCss(el.opt.effect.enter)).show().CSSAnimate({top:0,left:0,opacity:1, transform:"scale(1) rotate(0deg)"},el.opt.effTimer,0,el.opt.effect.enterTiming,function(){
					$(el.opt.gallery).trigger("imageReady."+el.opt.galleryID);
				});
			}).attr("src",url);

			image.error(function(){
				var image=$(this);
				image.attr("src", el.opt.placeHolder);
			})

			if(el.opt.grayScale){
				image.greyScale();
			}

			var counter=$(el.opt.controls).find(".counter");
			counter.html(el.opt.imageCounter+1+" / "+el.opt.images.length);

		},

		play:function(el){

			clearTimeout(el.opt.changing);

			var imgToRemove = $("#bgndGallery_"+el.opt.galleryID+" img").not(":last");
			imgToRemove.remove();


			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			if(el.opt.onPlay)
				el.opt.onPlay(el.opt);

			el.opt.changing=setTimeout(function(){
				if(el.opt.paused)
					return;

				if(el.opt.onNext)
					el.opt.onNext(el.opt);

				if (el.opt.imageCounter>=el.opt.images.length-1)
					el.opt.imageCounter=-1;

				el.opt.imageCounter++;

				$.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],$(el.opt.containment).get(0));
			},el.opt.paused?0:el.opt.timer);

			$(el.opt.gallery).trigger("play");

		},

		pause:function(el){
			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			clearTimeout(el.opt.changing);
			el.opt.paused=true;
			$(el.opt.gallery).trigger("paused");

			if(el.opt.onPause)
				el.opt.onPause(el.opt);
		},

		next:function(el){
			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			if(el.opt.onNext)
				el.opt.onNext(el.opt);

			$.mbBgndGallery.pause(el);
			if (el.opt.imageCounter==el.opt.images.length-1)
				el.opt.imageCounter=-1;

			el.opt.imageCounter++;

			$.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);
			clearTimeout(el.opt.changing);
		},

		prev:function(el){
			if($.mbBgndGallery.clear){
				$(el.opt.gallery).remove();
				return;
			}

			if(el.opt.onPrev)
				el.opt.onPrev(el.opt);

			$.mbBgndGallery.pause(el);

			clearTimeout(el.opt.changing);
			if (el.opt.imageCounter==0)
				el.opt.imageCounter=el.opt.images.length;

			el.opt.imageCounter--;

			$.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);
		},

		loader:{
			show:function(){},
			hide:function(){}
		},

		keyboard:function(el){
			$(document).on("keydown.bgndGallery",function(e){
				switch(e.keyCode){
					case 32:
						if(el.opt.paused){
							$.mbBgndGallery.play(el);
							el.opt.paused=false;
						}else{
							el.opt.paused=true;
							$.mbBgndGallery.pause(el);
						}
						e.preventDefault();
						break;
					case 39:
						$.mbBgndGallery.next(el);
						e.preventDefault();

						break;
					case 37:
						$.mbBgndGallery.prev(el);
						e.preventDefault();

						break;
				}
			})
		},

		buildControls:function(controls,el){
			var pause=$(controls).find(".pause");
			var play=$(controls).find(".play");
			var next=$(controls).find(".next");
			var prev=$(controls).find(".prev");
			var fullScreen =  $(controls).find(".fullscreen");

			if(($.browser.msie || $.browser.opera)){
				fullScreen.remove();
			}

			if(el.opt.autoStart)
				play.hide();

			pause.on("click",function(){
				$.mbBgndGallery.pause(el);
				$(this).hide();
				play.show();
			});

			play.on("click",function(){
				if(!el.opt.paused) return;
				clearTimeout(el.opt.changing);
				$.mbBgndGallery.play(el);
				el.opt.paused=false;
			});

			next.on("click",function(){
				$.mbBgndGallery.next(el);
				pause.hide();
				play.show();

			});

			prev.on("click",function(){
				$.mbBgndGallery.prev(el);
				pause.hide();
				play.show();
			});

			fullScreen.on("click",function(){
				var gallery = $("#bgndGallery_"+el.opt.galleryID).get(0)
				$.mbBgndGallery.runFullscreen(gallery, el);
			});

			if(el.opt.activateKeyboard)
				$.mbBgndGallery.keyboard(el);
		},

		changeGallery:function(el,array){

			$(el.gallery).fadeOut();

			$.mbBgndGallery.pause(el);

			el.opt.images=array;
			var images= el.opt.images;
			var totImg= images.length;
			var loadCounter=0;

			$.mbBgndGallery.preload(images[0],el);
			$(el.opt.gallery).on("imageLoaded."+el.opt.galleryID,function(){
				loadCounter++;
				if(loadCounter==totImg){
					$(el.opt.gallery).off("imageLoaded."+el.opt.galleryID);
					$(el.gallery).fadeIn();
					$.mbBgndGallery.play(el);
					el.opt.paused=false;
					return;
				}
				$.mbBgndGallery.preload(images[loadCounter],el);
			});
			el.opt.imageCounter=0;
		},

		runFullscreen: function(gallery, el){
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
				setTimeout(function(){
					var fullscreenchange = $.browser.mozilla ? "mozfullscreenchange" : $.browser.webkit ? "webkitfullscreenchange" : $.browser.msie ? "msfullscreenchange" :  $.browser.opera ? "ofullscreenchange" : "fullscreenchange";
					$(document).one(fullscreenchange, function(e) {
						var isFullScreen = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
						if (!isFullScreen) {
							el.isFullscreen = false;
							$(".fullScreen_controls").remove();
						}
					});
				},1000);
			}

			function cancelFullscreen() {
				if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
					RunPrefixMethod(document, "CancelFullScreen");
				}
			}

			if(el.isFullscreen){
				cancelFullscreen();
				el.isFullscreen = false;
				$(".fullScreen_controls").remove();
			}else{
				el.isFullscreen = true;
				var controls = $(el.opt.controls).clone(true).addClass("fullScreen_controls").css({position:"absolute", zIndex:1000, bottom: 20, right:20});
				controls.find(".fullscreen").html("exit");
				$(gallery).append(controls);
				$(gallery).addClass("fullScreen");
				launchFullscreen(gallery);
			}
		}

	};

	jQuery.loadFromSystem=function(folderPath, type){

		// if directory listing is enabled on the remote server.
		// if you run the page locally you need to run it under a local web server (Ex: http://localhost/yourPage)
		// otherwise the directory listing is unavailable.

		if(!folderPath)
			return;
		if(!type)
			type= ["jpg","jpeg","png"];
		var arr=[];
		$.ajax({
			url:folderPath,
			async:false,
			success:function(response){
				var tmp=$(response);
				var els= tmp.find("[href]");

				els.each(function(){
					for (var i in type){
						if ($(this).attr("href").indexOf(type[i])>=0)
							arr.push(folderPath+$(this).attr("href"));
						arr = $.unique(arr);
					}
				});
				tmp.remove();
			}
		});
		return arr;
	};

	$.fn.greyScale = function() {
		return this.each(function() {

			if ($.browser.msie && $.browser.version<9) {
				this.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)";
			} else {
				this.src = grayScaleImage(this);
			}

		})
	};

	$.shuffle = function(arr) {
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

	function grayScaleImage(imgObj){
		var canvas = document.createElement('canvas');
		var canvasContext = canvas.getContext('2d');

		var imgW = imgObj.width;
		var imgH = imgObj.height;
		canvas.width = imgW;
		canvas.height = imgH;

		canvasContext.drawImage(imgObj, 0, 0);
		var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg;
				imgPixels.data[i + 1] = avg;
				imgPixels.data[i + 2] = avg;
			}
		}
		canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
	}

})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYi5iZ25kR2FsbGVyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAganF1ZXJ5Lm1iLmNvbXBvbmVudHNcbiAqICBmaWxlOiBtYi5iZ25kR2FsbGVyeS5qc1xuICpcbiAqICBDb3B5cmlnaHQgKGMpIDIwMDEtMjAxMy4gTWF0dGVvIEJpY29jY2hpIChQdXB1bnppKTtcbiAqICBPcGVuIGxhYiBzcmwsIEZpcmVuemUgLSBJdGFseVxuICogIGVtYWlsOiBtYXR0ZW9Ab3Blbi1sYWIuY29tXG4gKiAgc2l0ZTogXHRodHRwOi8vcHVwdW56aS5jb21cbiAqICBibG9nOlx0aHR0cDovL3B1cHVuemkub3Blbi1sYWIuY29tXG4gKiBcdGh0dHA6Ly9vcGVuLWxhYi5jb21cbiAqXG4gKiAgTGljZW5jZXM6IE1JVCwgR1BMXG4gKiAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqICBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLmh0bWxcbiAqXG4gKiAgbGFzdCBtb2RpZmllZDogMjQvMDYvMTMgMTguMDZcbiAqICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICovXG5cbi8qQnJvd3NlciBkZXRlY3Rpb24gcGF0Y2gqL1xuKGZ1bmN0aW9uKCl7aWYoISg4PmpRdWVyeS5mbi5qcXVlcnkuc3BsaXQoXCIuXCIpWzFdKSl7alF1ZXJ5LmJyb3dzZXI9e307alF1ZXJ5LmJyb3dzZXIubW96aWxsYT0hMTtqUXVlcnkuYnJvd3Nlci53ZWJraXQ9ITE7alF1ZXJ5LmJyb3dzZXIub3BlcmE9ITE7alF1ZXJ5LmJyb3dzZXIubXNpZT0hMTt2YXIgYT1uYXZpZ2F0b3IudXNlckFnZW50O2pRdWVyeS5icm93c2VyLm5hbWU9bmF2aWdhdG9yLmFwcE5hbWU7alF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249XCJcIitwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtqUXVlcnkuYnJvd3Nlci5tYWpvclZlcnNpb249cGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sMTApO3ZhciBjLGI7aWYoLTEhPShiPWEuaW5kZXhPZihcIk9wZXJhXCIpKSl7aWYoalF1ZXJ5LmJyb3dzZXIub3BlcmE9ITAsalF1ZXJ5LmJyb3dzZXIubmFtZT1cIk9wZXJhXCIsalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249YS5zdWJzdHJpbmcoYis2KSwtMSE9KGI9IGEuaW5kZXhPZihcIlZlcnNpb25cIikpKWpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrOCl9ZWxzZSBpZigtMSE9KGI9YS5pbmRleE9mKFwiTVNJRVwiKSkpalF1ZXJ5LmJyb3dzZXIubXNpZT0hMCxqUXVlcnkuYnJvd3Nlci5uYW1lPVwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCIsalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249YS5zdWJzdHJpbmcoYis1KTtlbHNlIGlmKC0xIT0oYj1hLmluZGV4T2YoXCJDaHJvbWVcIikpKWpRdWVyeS5icm93c2VyLndlYmtpdD0hMCxqUXVlcnkuYnJvd3Nlci5uYW1lPVwiQ2hyb21lXCIsalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249YS5zdWJzdHJpbmcoYis3KTtlbHNlIGlmKC0xIT0oYj1hLmluZGV4T2YoXCJTYWZhcmlcIikpKXtpZihqUXVlcnkuYnJvd3Nlci53ZWJraXQ9ITAsalF1ZXJ5LmJyb3dzZXIubmFtZT1cIlNhZmFyaVwiLGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrNyksLTEhPShiPWEuaW5kZXhPZihcIlZlcnNpb25cIikpKWpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPSBhLnN1YnN0cmluZyhiKzgpfWVsc2UgaWYoLTEhPShiPWEuaW5kZXhPZihcIkZpcmVmb3hcIikpKWpRdWVyeS5icm93c2VyLm1vemlsbGE9ITAsalF1ZXJ5LmJyb3dzZXIubmFtZT1cIkZpcmVmb3hcIixqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1hLnN1YnN0cmluZyhiKzgpO2Vsc2UgaWYoKGM9YS5sYXN0SW5kZXhPZihcIiBcIikrMSk8KGI9YS5sYXN0SW5kZXhPZihcIi9cIikpKWpRdWVyeS5icm93c2VyLm5hbWU9YS5zdWJzdHJpbmcoYyxiKSxqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1hLnN1YnN0cmluZyhiKzEpLGpRdWVyeS5icm93c2VyLm5hbWUudG9Mb3dlckNhc2UoKT09alF1ZXJ5LmJyb3dzZXIubmFtZS50b1VwcGVyQ2FzZSgpJiYoalF1ZXJ5LmJyb3dzZXIubmFtZT1uYXZpZ2F0b3IuYXBwTmFtZSk7aWYoLTEhPShhPWpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uLmluZGV4T2YoXCI7XCIpKSlqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1qUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbi5zdWJzdHJpbmcoMCwgYSk7aWYoLTEhPShhPWpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uLmluZGV4T2YoXCIgXCIpKSlqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1qUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbi5zdWJzdHJpbmcoMCxhKTtqUXVlcnkuYnJvd3Nlci5tYWpvclZlcnNpb249cGFyc2VJbnQoXCJcIitqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbiwxMCk7aXNOYU4oalF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9uKSYmKGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPVwiXCIrcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbiksalF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9uPXBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLDEwKSk7alF1ZXJ5LmJyb3dzZXIudmVyc2lvbj1qUXVlcnkuYnJvd3Nlci5tYWpvclZlcnNpb259fSkoalF1ZXJ5KTtcblxuLypcbiAqICAganF1ZXJ5Lm1iLmNvbXBvbmVudHNcbiAqICBmaWxlOiBqcXVlcnkubWIuQ1NTQW5pbWF0ZS5qc1xuICovXG5cbi8qXG4gKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBqcXVlcnkubWIuY29tcG9uZW50c1xuICogIGZpbGU6IGpxdWVyeS5tYi5DU1NBbmltYXRlLmpzXG4gKlxuICogIENvcHlyaWdodCAoYykgMjAwMS0yMDEzLiBNYXR0ZW8gQmljb2NjaGkgKFB1cHVuemkpO1xuICogIE9wZW4gbGFiIHNybCwgRmlyZW56ZSAtIEl0YWx5XG4gKiAgZW1haWw6IG1hdHRlb0BvcGVuLWxhYi5jb21cbiAqICBzaXRlOiBcdGh0dHA6Ly9wdXB1bnppLmNvbVxuICogIGJsb2c6XHRodHRwOi8vcHVwdW56aS5vcGVuLWxhYi5jb21cbiAqIFx0aHR0cDovL29wZW4tbGFiLmNvbVxuICpcbiAqICBMaWNlbmNlczogTUlULCBHUExcbiAqICBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICogIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwuaHRtbFxuICpcbiAqICBsYXN0IG1vZGlmaWVkOiAwOS8wNi8xMyAxNy4wOFxuICogICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKi9cblxuLypcbiAqIHZlcnNpb246IDEuNi4xXG4gKiAgcGFyYW1zOlxuXG4gQG9wdCAgICAgICAgLT4gdGhlIENTUyBvYmplY3QgKGV4OiB7dG9wOjMwMCwgbGVmdDo0MDAsIC4uLn0pXG4gQGR1cmF0aW9uICAgLT4gYW4gaW50IGZvciB0aGUgYW5pbWF0aW9uIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kc1xuIEBkZWxheSAgICAgIC0+IGFuIGludCBmb3IgdGhlIGFuaW1hdGlvbiBkZWxheSBpbiBtaWxsaXNlY29uZHNcbiBAZWFzZSAgICAgICAtPiBlYXNlICB8fCAgbGluZWFyIHx8IGVhc2UtaW4gfHwgZWFzZS1vdXQgfHwgZWFzZS1pbi1vdXQgIHx8ICBjdWJpYy1iZXppZXIoPG51bWJlcj4sIDxudW1iZXI+LCAgPG51bWJlcj4sICA8bnVtYmVyPilcbiBAY2FsbGJhY2sgICAtPiBhIGNhbGxiYWNrIGZ1bmN0aW9uIGNhbGxlZCBvbmNlIHRoZSB0cmFuc2l0aW9uIGVuZFxuXG4gZXhhbXBsZTpcblxuIGpRdWVyeSh0aGlzKS5DU1NBbmltYXRlKHt0b3A6dCwgbGVmdDpsLCB3aWR0aDp3LCBoZWlnaHQ6aCwgdHJhbnNmb3JtOiAncm90YXRlKDUwZGVnKSBzY2FsZSguOCknfSwgMjAwMCwgMTAwLCBcImVhc2Utb3V0XCIsIGNhbGxiYWNrO30pXG4gKi9cblxuXG4vKkJyb3dzZXIgZGV0ZWN0aW9uIHBhdGNoKi9cbihmdW5jdGlvbigpe2lmKCEoOD5qUXVlcnkuZm4uanF1ZXJ5LnNwbGl0KFwiLlwiKVsxXSkpe2pRdWVyeS5icm93c2VyPXt9O2pRdWVyeS5icm93c2VyLm1vemlsbGE9ITE7alF1ZXJ5LmJyb3dzZXIud2Via2l0PSExO2pRdWVyeS5icm93c2VyLm9wZXJhPSExO2pRdWVyeS5icm93c2VyLm1zaWU9ITE7dmFyIGE9bmF2aWdhdG9yLnVzZXJBZ2VudDtqUXVlcnkuYnJvd3Nlci5uYW1lPW5hdmlnYXRvci5hcHBOYW1lO2pRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPVwiXCIrcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7alF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9uPXBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLDEwKTt2YXIgYyxiO2lmKC0xIT0oYj1hLmluZGV4T2YoXCJPcGVyYVwiKSkpe2lmKGpRdWVyeS5icm93c2VyLm9wZXJhPSEwLGpRdWVyeS5icm93c2VyLm5hbWU9XCJPcGVyYVwiLGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrNiksLTEhPShiPSBhLmluZGV4T2YoXCJWZXJzaW9uXCIpKSlqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1hLnN1YnN0cmluZyhiKzgpfWVsc2UgaWYoLTEhPShiPWEuaW5kZXhPZihcIk1TSUVcIikpKWpRdWVyeS5icm93c2VyLm1zaWU9ITAsalF1ZXJ5LmJyb3dzZXIubmFtZT1cIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiLGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrNSk7ZWxzZSBpZigtMSE9KGI9YS5pbmRleE9mKFwiQ2hyb21lXCIpKSlqUXVlcnkuYnJvd3Nlci53ZWJraXQ9ITAsalF1ZXJ5LmJyb3dzZXIubmFtZT1cIkNocm9tZVwiLGpRdWVyeS5icm93c2VyLmZ1bGxWZXJzaW9uPWEuc3Vic3RyaW5nKGIrNyk7ZWxzZSBpZigtMSE9KGI9YS5pbmRleE9mKFwiU2FmYXJpXCIpKSl7aWYoalF1ZXJ5LmJyb3dzZXIud2Via2l0PSEwLGpRdWVyeS5icm93c2VyLm5hbWU9XCJTYWZhcmlcIixqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1hLnN1YnN0cmluZyhiKzcpLC0xIT0oYj1hLmluZGV4T2YoXCJWZXJzaW9uXCIpKSlqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj0gYS5zdWJzdHJpbmcoYis4KX1lbHNlIGlmKC0xIT0oYj1hLmluZGV4T2YoXCJGaXJlZm94XCIpKSlqUXVlcnkuYnJvd3Nlci5tb3ppbGxhPSEwLGpRdWVyeS5icm93c2VyLm5hbWU9XCJGaXJlZm94XCIsalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249YS5zdWJzdHJpbmcoYis4KTtlbHNlIGlmKChjPWEubGFzdEluZGV4T2YoXCIgXCIpKzEpPChiPWEubGFzdEluZGV4T2YoXCIvXCIpKSlqUXVlcnkuYnJvd3Nlci5uYW1lPWEuc3Vic3RyaW5nKGMsYiksalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249YS5zdWJzdHJpbmcoYisxKSxqUXVlcnkuYnJvd3Nlci5uYW1lLnRvTG93ZXJDYXNlKCk9PWpRdWVyeS5icm93c2VyLm5hbWUudG9VcHBlckNhc2UoKSYmKGpRdWVyeS5icm93c2VyLm5hbWU9bmF2aWdhdG9yLmFwcE5hbWUpO2lmKC0xIT0oYT1qUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbi5pbmRleE9mKFwiO1wiKSkpalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249alF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb24uc3Vic3RyaW5nKDAsIGEpO2lmKC0xIT0oYT1qUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbi5pbmRleE9mKFwiIFwiKSkpalF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb249alF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb24uc3Vic3RyaW5nKDAsYSk7alF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9uPXBhcnNlSW50KFwiXCIralF1ZXJ5LmJyb3dzZXIuZnVsbFZlcnNpb24sMTApO2lzTmFOKGpRdWVyeS5icm93c2VyLm1ham9yVmVyc2lvbikmJihqUXVlcnkuYnJvd3Nlci5mdWxsVmVyc2lvbj1cIlwiK3BhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pLGpRdWVyeS5icm93c2VyLm1ham9yVmVyc2lvbj1wYXJzZUludChuYXZpZ2F0b3IuYXBwVmVyc2lvbiwxMCkpO2pRdWVyeS5icm93c2VyLnZlcnNpb249alF1ZXJ5LmJyb3dzZXIubWFqb3JWZXJzaW9ufX0pKGpRdWVyeSk7XG5cbi8qQ1NTQW5pbWF0ZSovXG5qUXVlcnkuZm4uQ1NTQW5pbWF0ZT1mdW5jdGlvbihhLGYsayxtLGUpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgYj1qUXVlcnkodGhpcyk7dGhpcy5pZD10aGlzLmlkfHxcIkNTU0FfXCIrKG5ldyBEYXRlKS5nZXRUaW1lKCk7aWYoMCE9PWIubGVuZ3RoJiZhKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBmJiYoZT1mLGY9alF1ZXJ5LmZ4LnNwZWVkcy5fZGVmYXVsdCk7XCJmdW5jdGlvblwiPT10eXBlb2YgayYmKGU9ayxrPTApO1wiZnVuY3Rpb25cIj09dHlwZW9mIG0mJihlPW0sbT1cImN1YmljLWJlemllcigwLjY1LDAuMDMsMC4zNiwwLjcyKVwiKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZilmb3IodmFyIGwgaW4galF1ZXJ5LmZ4LnNwZWVkcylpZihmPT1sKXtmPWpRdWVyeS5meC5zcGVlZHNbbF07YnJlYWt9ZWxzZSBmPW51bGw7aWYoalF1ZXJ5LnN1cHBvcnQudHJhbnNpdGlvbil7dmFyIGQ9XCJcIixqPVwidHJhbnNpdGlvbkVuZFwiO2pRdWVyeS5icm93c2VyLndlYmtpdD8oZD1cIi13ZWJraXQtXCIsIGo9XCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIpOmpRdWVyeS5icm93c2VyLm1vemlsbGE/KGQ9XCItbW96LVwiLGo9XCJ0cmFuc2l0aW9uZW5kXCIpOmpRdWVyeS5icm93c2VyLm9wZXJhPyhkPVwiLW8tXCIsaj1cIm90cmFuc2l0aW9uZW5kXCIpOmpRdWVyeS5icm93c2VyLm1zaWUmJihkPVwiLW1zLVwiLGo9XCJtc1RyYW5zaXRpb25FbmRcIik7bD1bXTtmb3IoYyBpbiBhKXt2YXIgZz1jO1widHJhbnNmb3JtXCI9PT1nJiYoZz1kK1widHJhbnNmb3JtXCIsYVtnXT1hW2NdLGRlbGV0ZSBhW2NdKTtcInRyYW5zZm9ybS1vcmlnaW5cIj09PWcmJihnPWQrXCJ0cmFuc2Zvcm0tb3JpZ2luXCIsYVtnXT1hW2NdLGRlbGV0ZSBhW2NdKTtsLnB1c2goZyl9dmFyIGM9bC5qb2luKFwiLFwiKSxuPWZ1bmN0aW9uKCl7Yi5vZmYoaitcIl9cIitiLmdldCgwKS5pZCk7Y2xlYXJUaW1lb3V0KGIuZ2V0KDApLnRpbWVvdXQpO2IuY3NzKGQrXCJ0cmFuc2l0aW9uXCIsXCJcIik7XCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKGIuY2FsbGVkPSEwLGUoYikpfSxoPXt9OyAkLmV4dGVuZChoLGEpO2hbZCtcInRyYW5zaXRpb24tcHJvcGVydHlcIl09YztoW2QrXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCJdPWYrXCJtc1wiO2hbZCtcInRyYW5zaXRpb24tZGVsYXlcIl09aytcIm1zXCI7aFtkK1widHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25cIl09bTtoW2QrXCJiYWNrZmFjZS12aXNpYmlsaXR5XCJdPVwiaGlkZGVuXCI7c2V0VGltZW91dChmdW5jdGlvbigpe2IuY3NzKGgpO2Iub25lKGorXCJfXCIrYi5nZXQoMCkuaWQsbil9LDEpO2IuZ2V0KDApLnRpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbigpe2IuY2FsbGVkfHwhZT9iLmNhbGxlZD0hMTooYi5jc3MoZCtcInRyYW5zaXRpb25cIixcIlwiKSxlKGIpKX0sZitrKzEwMCl9ZWxzZXtmb3IodmFyIGMgaW4gYSlcInRyYW5zZm9ybVwiPT09YyYmZGVsZXRlIGFbY10sXCJ0cmFuc2Zvcm0tb3JpZ2luXCI9PT1jJiZkZWxldGUgYVtjXSxcImF1dG9cIj09PWFbY10mJmRlbGV0ZSBhW2NdO2lmKCFlfHxcInN0cmluZ1wiPT09dHlwZW9mIGUpZT1cImxpbmVhclwiO2IuYW5pbWF0ZShhLCBmLGUpfX19KX07alF1ZXJ5LnN1cHBvcnQudHJhbnNpdGlvbj1mdW5jdGlvbigpe3ZhciBhPShkb2N1bWVudC5ib2R5fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLnN0eWxlO3JldHVybiB2b2lkIDAhPT1hLnRyYW5zaXRpb258fHZvaWQgMCE9PWEuV2Via2l0VHJhbnNpdGlvbnx8dm9pZCAwIT09YS5Nb3pUcmFuc2l0aW9ufHx2b2lkIDAhPT1hLk1zVHJhbnNpdGlvbnx8dm9pZCAwIT09YS5PVHJhbnNpdGlvbn0oKTtcblxuKGZ1bmN0aW9uKCQpe1xuXG5cdCQubWJCZ25kR2FsbGVyeSA9e1xuXHRcdG5hbWU6XCJtYi5iZ25kR2FsbGVyeVwiLFxuXHRcdGF1dGhvcjpcIk1hdHRlbyBCaWNvY2NoaVwiLFxuXHRcdHZlcnNpb246XCIxLjguMFwiLFxuXHRcdGRlZmF1bHRzOntcblx0XHRcdGNvbnRhaW5tZW50OlwiYm9keVwiLFxuXHRcdFx0aW1hZ2VzOltdLFxuXHRcdFx0c2h1ZmZsZTpmYWxzZSxcblx0XHRcdGNvbnRyb2xzOm51bGwsXG5cdFx0XHRlZmZlY3Q6XCJmYWRlXCIsXG5cdFx0XHR0aW1lcjo0MDAwLFxuXHRcdFx0ZWZmVGltZXI6MzAwMCxcblx0XHRcdHJhc3RlcjpmYWxzZSwgLy9cImluYy9yYXN0ZXIucG5nXCJcblx0XHRcdGZvbGRlclBhdGg6ZmFsc2UsXG5cdFx0XHRhdXRvU3RhcnQ6dHJ1ZSxcblx0XHRcdGdyYXlTY2FsZTpmYWxzZSxcblx0XHRcdGFjdGl2YXRlS2V5Ym9hcmQ6ZmFsc2UsXG5cdFx0XHRwcmVzZXJ2ZVRvcDpmYWxzZSxcblx0XHRcdHByZXNlcnZlV2lkdGg6ZmFsc2UsXG5cdFx0XHRwbGFjZUhvbGRlcjpcIlwiLFxuXG5cdFx0XHQvLyBpZHggPSB0aGUgemVybyBiYXNlZCBpbmRleCBvZiB0aGUgZGlzcGxheWVkIHBob3RvXG5cdFx0XHQvLyBvcHQ9dGhlIG9wdGlvbnMgcmVsYXRpdmVzIHRvIHRoaXMgY29tcG9uZW50IGluc3RhbmNlIHlvdSBjYW4gbWFuaXB1bGF0ZSBvbiB0aGUgc3BlY2lmaWMgZXZlbnRcblxuXHRcdFx0Ly8gZm9yIGV4YW1wbGUsIGlmIHlvdSB3YW50IHRvIHJldmVyc2UgdGhlIGVudGVyL2V4aXQgZWZmZWN0IG9uY2UgdGhlIHByZXZpb3VzIGJ1dHRvbiBpcyBjbGlja2VkOlxuXHRcdFx0Ly8geW91IGNhbiBjaGFuZ2UgdGhlIG9wdC5lZmZlY3Qgb25QcmV2IGV2ZW50IDogb3B0LmVmZmVjdCA9IFwic2xpZGVSaWdodFwiXG5cdFx0XHQvLyBvbk5leHQ6ZnVuY3Rpb24ob3B0KXtvcHQuZWZmZWN0ID0gXCJzbGlkZUxlZnRcIn1cblx0XHRcdC8vIG9uUHJldjpmdW5jdGlvbihvcHQpe29wdC5lZmZlY3QgPSBcInNsaWRlUmlnaHRcIn1cblxuXHRcdFx0b25TdGFydDpmdW5jdGlvbigpe30sXG5cdFx0XHRvbkNoYW5nZTpmdW5jdGlvbihvcHQsaWR4KXt9LFxuXHRcdFx0b25QYXVzZTpmdW5jdGlvbihvcHQpe30sXG5cdFx0XHRvblBsYXk6ZnVuY3Rpb24ob3B0KXt9LFxuXHRcdFx0b25OZXh0OmZ1bmN0aW9uKG9wdCl7fSxcblx0XHRcdG9uUHJldjpmdW5jdGlvbihvcHQpe31cblx0XHR9LFxuXHRcdGNsZWFyOmZhbHNlLFxuXG5cdFx0Ly8gRU5URVIvRVhJVCBFRkZFQ1RTXG5cblx0XHRlZmZlY3RzOntcblx0XHRcdGZhZGU6e2VudGVyOntsZWZ0OjAsb3BhY2l0eTowfSxleGl0OntsZWZ0OjAsb3BhY2l0eTowfSwgZW50ZXJUaW1pbmc6XCJlYXNlLWluXCIsIGV4aXRUaW1pbmc6XCJlYXNlLWluXCJ9LFxuXHRcdFx0c2xpZGVVcDp7ZW50ZXI6e3RvcDpcIjEwMCVcIixvcGFjaXR5OjF9LGV4aXQ6e3RvcDowLG9wYWNpdHk6MH0sIGVudGVyVGltaW5nOlwiZWFzZS1pblwiLCBleGl0VGltaW5nOlwiZWFzZS1pblwifSxcblx0XHRcdHNsaWRlRG93bjp7ZW50ZXI6e3RvcDpcIi0xMDAlXCIsb3BhY2l0eToxfSxleGl0Ont0b3A6MCxvcGFjaXR5OjB9LCBlbnRlclRpbWluZzpcImVhc2UtaW5cIiwgZXhpdFRpbWluZzpcImVhc2UtaW5cIn0sXG5cdFx0XHRzbGlkZUxlZnQ6e2VudGVyOntsZWZ0OlwiMTAwJVwiLG9wYWNpdHk6MX0sZXhpdDp7bGVmdDowLG9wYWNpdHk6MH0sIGVudGVyVGltaW5nOlwiZWFzZS1pblwiLCBleGl0VGltaW5nOlwiZWFzZS1pblwifSxcblx0XHRcdHNsaWRlUmlnaHQ6e2VudGVyOntsZWZ0OlwiLTEwMCVcIixvcGFjaXR5OjF9LGV4aXQ6e2xlZnQ6MCxvcGFjaXR5OjB9LCBlbnRlclRpbWluZzpcImVhc2UtaW5cIiwgZXhpdFRpbWluZzpcImVhc2UtaW5cIn0sXG5cdFx0XHR6b29tOntlbnRlcjp7dHJhbnNmb3JtOlwic2NhbGUoXCIrKDErIE1hdGgucmFuZG9tKCkqNSkrXCIpXCIsb3BhY2l0eTowfSxleGl0Ont0cmFuc2Zvcm06XCJzY2FsZShcIisoMSArIE1hdGgucmFuZG9tKCkqNSkrXCIpXCIsb3BhY2l0eTowfSwgZW50ZXJUaW1pbmc6XCJjdWJpYy1iZXppZXIoMC4xOSwgMSwgMC4yMiwgMSlcIiwgZXhpdFRpbWluZzpcImN1YmljLWJlemllcigwLjE5LCAxLCAwLjIyLCAxKVwifVxuXHRcdH0sXG5cblx0XHRidWlsZEdhbGxlcnk6ZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0XHR2YXIgb3B0ID0ge307XG5cdFx0XHQkLmV4dGVuZChvcHQsICQubWJCZ25kR2FsbGVyeS5kZWZhdWx0cyxvcHRpb25zKTtcblx0XHRcdG9wdC5nYWxsZXJ5SUQ9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdFx0dmFyIGVsPSAkKG9wdC5jb250YWlubWVudCkuZ2V0KDApO1xuXHRcdFx0ZWwub3B0PSBvcHQ7XG5cblx0XHRcdGlmKGVsLm9wdC5vblN0YXJ0KVxuXHRcdFx0XHRlbC5vcHQub25TdGFydCgpO1xuXG5cdFx0XHRlbC5vcHQuZ2FsbGVyeT0gJChcIjxkaXYvPlwiKS5hdHRyKHtpZDpcImJnbmRHYWxsZXJ5X1wiK2VsLm9wdC5nYWxsZXJ5SUR9KS5hZGRDbGFzcyhcIm1iQmduZEdhbGxlcnlcIik7XG5cdFx0XHR2YXIgcG9zPSBlbC5vcHQuY29udGFpbm1lbnQ9PVwiYm9keVwiP1wiZml4ZWRcIjpcImFic29sdXRlXCI7XG5cdFx0XHRlbC5vcHQuZ2FsbGVyeS5jc3Moe3Bvc2l0aW9uOnBvcyx0b3A6MCxsZXQ6MCx3aWR0aDpcIjEwMCVcIixoZWlnaHQ6XCIxMDAlXCIsb3ZlcmZsb3c6XCJoaWRkZW5cIn0pO1xuXG5cdFx0XHR2YXIgY29udGFpbm1lbnQgPSBlbC5vcHQuY29udGFpbm1lbnQ7XG5cblx0XHRcdGlmKGNvbnRhaW5tZW50ICE9XCJib2R5XCIgJiYgJChjb250YWlubWVudCkudGV4dCgpLnRyaW0oKSE9XCJcIil7XG5cdFx0XHRcdHZhciB3cmFwcGVyPSQoXCI8ZGl2Lz5cIikuY3NzKHtcInBvc2l0aW9uXCI6XCJhYnNvbHV0ZVwiLG1pbkhlaWdodDpcIjEwMCVcIiwgbWluV2lkdGg6XCIxMDAlXCIsIHpJbmRleDozfSk7XG5cdFx0XHRcdCQoY29udGFpbm1lbnQpLndyYXBJbm5lcih3cmFwcGVyKTtcblx0XHRcdFx0aWYoJChjb250YWlubWVudCkuY3NzKFwicG9zaXRpb25cIik9PVwic3RhdGljXCIpXG5cdFx0XHRcdFx0JChjb250YWlubWVudCkuY3NzKFwicG9zaXRpb25cIixcInJlbGF0aXZlXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYob3B0LnJhc3Rlcil7XG5cdFx0XHRcdHZhciByYXN0ZXI9JChcIjxkaXYvPlwiKS5jc3Moe3Bvc2l0aW9uOlwiYWJzb2x1dGVcIix0b3A6MCxsZWZ0OjAsd2lkdGg6XCIxMDAlXCIsaGVpZ2h0OlwiMTAwJVwiLGJhY2tncm91bmQ6XCJ1cmwoXCIrb3B0LnJhc3RlcitcIilcIix6SW5kZXg6MX0pO1xuXHRcdFx0XHRvcHQuZ2FsbGVyeS5hcHBlbmQocmFzdGVyKTtcblx0XHRcdH1cblxuXHRcdFx0JChjb250YWlubWVudCkucHJlcGVuZChvcHQuZ2FsbGVyeSk7XG5cblx0XHRcdGlmKGVsLm9wdC5mb2xkZXJQYXRoICYmIGVsLm9wdC5pbWFnZXMubGVuZ3RoPT0wKVxuXHRcdFx0XHRlbC5vcHQuaW1hZ2VzID0galF1ZXJ5LmxvYWRGcm9tU3lzdGVtKGVsLm9wdC5mb2xkZXJQYXRoKTtcblxuXG5cdFx0XHRpZihlbC5vcHQuc2h1ZmZsZSlcblx0XHRcdFx0ZWwub3B0LmltYWdlcz0gJC5zaHVmZmxlKGVsLm9wdC5pbWFnZXMpO1xuXG5cdFx0XHR2YXIgdG90SW1nPSBlbC5vcHQuaW1hZ2VzLmxlbmd0aDtcblxuXHRcdFx0dmFyIGxvYWRDb3VudGVyPTA7XG5cblx0XHRcdCQubWJCZ25kR2FsbGVyeS5wcmVsb2FkKGVsLm9wdC5pbWFnZXNbMF0sZWwpO1xuXHRcdFx0JChlbC5vcHQuZ2FsbGVyeSkub24oXCJpbWFnZUxvYWRlZC5cIitlbC5vcHQuZ2FsbGVyeUlELGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGxvYWRDb3VudGVyKys7XG5cdFx0XHRcdGlmKGxvYWRDb3VudGVyPT10b3RJbWcpe1xuXHRcdFx0XHRcdCQoZWwub3B0LmdhbGxlcnkpLm9mZihcImltYWdlTG9hZGVkLlwiK2VsLm9wdC5nYWxsZXJ5SUQpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHQkLm1iQmduZEdhbGxlcnkucHJlbG9hZChlbC5vcHQuaW1hZ2VzW2xvYWRDb3VudGVyXSxlbCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWwub3B0LmltYWdlQ291bnRlcj0wO1xuXG5cdFx0XHQkLm1iQmduZEdhbGxlcnkuY2hhbmdlUGhvdG8oZWwub3B0LmltYWdlc1tlbC5vcHQuaW1hZ2VDb3VudGVyXSxlbCk7XG5cblx0XHRcdGlmICghb3B0LmF1dG9TdGFydCl7XG5cdFx0XHRcdGVsLm9wdC5wYXVzZWQ9dHJ1ZTtcblx0XHRcdFx0JChlbC5vcHQuZ2FsbGVyeSkudHJpZ2dlcihcInBhdXNlZFwiKTtcblx0XHRcdH1cblxuXHRcdFx0JChlbC5vcHQuZ2FsbGVyeSkub24oXCJpbWFnZVJlYWR5LlwiK2VsLm9wdC5nYWxsZXJ5SUQsZnVuY3Rpb24oKXtcblxuXHRcdFx0XHRpZihlbC5vcHQucGF1c2VkKVxuXHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRjbGVhclRpbWVvdXQoZWwub3B0LmNoYW5naW5nKTtcblxuXHRcdFx0XHQkLm1iQmduZEdhbGxlcnkucGxheShlbCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh3aW5kb3cpLm9uKFwicmVzaXplXCIsZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIGltYWdlPSQoXCIjYmduZEdhbGxlcnlfXCIrZWwub3B0LmdhbGxlcnlJRCtcIiBpbWdcIik7XG5cdFx0XHRcdCQubWJCZ25kR2FsbGVyeS5jaGVja1NpemUoaW1hZ2UsZWwpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHZhciBjb250cm9scyA9IGVsLm9wdC5jb250cm9scztcblx0XHRcdGlmKGNvbnRyb2xzKXtcblx0XHRcdFx0dmFyIGNvdW50ZXI9JChlbC5vcHQuY29udHJvbHMpLmZpbmQoXCIuY291bnRlclwiKTtcblx0XHRcdFx0Y291bnRlci5odG1sKGVsLm9wdC5pbWFnZUNvdW50ZXIrMStcIiAvIFwiK2VsLm9wdC5pbWFnZXMubGVuZ3RoKTtcblxuXHRcdFx0XHQkLm1iQmduZEdhbGxlcnkuYnVpbGRDb250cm9scyhjb250cm9scyxlbCk7XG5cdFx0XHRcdCQoZWwub3B0LmNvbnRhaW5tZW50KS5vbihcInBhdXNlZFwiLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JChlbC5vcHQuY29udHJvbHMpLmZpbmQoXCIucGxheVwiKS5zaG93KCk7XG5cdFx0XHRcdFx0JChlbC5vcHQuY29udHJvbHMpLmZpbmQoXCIucGF1c2VcIikuaGlkZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0JChlbC5vcHQuY29udGFpbm1lbnQpLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JChlbC5vcHQuY29udHJvbHMpLmZpbmQoXCIucGxheVwiKS5oaWRlKCk7XG5cdFx0XHRcdFx0JChlbC5vcHQuY29udHJvbHMpLmZpbmQoXCIucGF1c2VcIikuc2hvdygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdG5vcm1hbGl6ZUNzczpmdW5jdGlvbihvcHQpe1xuXHRcdFx0dmFyIG5ld09wdCA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIG9wdCk7XG5cdFx0XHR2YXIgc2Z4ID0gXCJcIjtcblx0XHRcdHZhciB0cmFuc2l0aW9uRW5kID0gXCJ0cmFuc2l0aW9uRW5kXCI7XG5cdFx0XHRpZiAoJC5icm93c2VyLndlYmtpdCkge1xuXHRcdFx0XHRzZnggPSBcIi13ZWJraXQtXCI7XG5cdFx0XHRcdHRyYW5zaXRpb25FbmQgPSBcIndlYmtpdFRyYW5zaXRpb25FbmRcIjtcblx0XHRcdH0gZWxzZSBpZiAoJC5icm93c2VyLm1vemlsbGEpIHtcblx0XHRcdFx0c2Z4ID0gXCItbW96LVwiO1xuXHRcdFx0XHR0cmFuc2l0aW9uRW5kID0gXCJ0cmFuc2l0aW9uZW5kXCI7XG5cdFx0XHR9IGVsc2UgaWYgKCQuYnJvd3Nlci5vcGVyYSkge1xuXHRcdFx0XHRzZnggPSBcIi1vLVwiO1xuXHRcdFx0XHR0cmFuc2l0aW9uRW5kID0gXCJvVHJhbnNpdGlvbkVuZFwiO1xuXHRcdFx0fSBlbHNlIGlmICgkLmJyb3dzZXIubXNpZSkge1xuXHRcdFx0XHRzZnggPSBcIi1tcy1cIjtcblx0XHRcdFx0dHJhbnNpdGlvbkVuZCA9IFwibXNUcmFuc2l0aW9uRW5kXCI7XG5cdFx0XHR9XG5cblx0XHRcdGZvcih2YXIgbyBpbiBuZXdPcHQpe1xuXHRcdFx0XHRpZiAobz09PVwidHJhbnNmb3JtXCIpe1xuXHRcdFx0XHRcdG5ld09wdFtzZngrXCJ0cmFuc2Zvcm1cIl09bmV3T3B0W29dO1xuXHRcdFx0XHRcdGRlbGV0ZSBuZXdPcHRbb107XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG89PT1cInRyYW5zZm9ybS1vcmlnaW5cIil7XG5cdFx0XHRcdFx0bmV3T3B0W3NmeCtcInRyYW5zZm9ybS1vcmlnaW5cIl09b3B0W29dO1xuXHRcdFx0XHRcdGRlbGV0ZSBuZXdPcHRbb107XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdPcHQ7XG5cdFx0fSxcblx0XHRwcmVsb2FkOmZ1bmN0aW9uKHVybCxlbCl7XG5cdFx0XHRpZigkLm1iQmduZEdhbGxlcnkuY2xlYXIpe1xuXHRcdFx0XHQkKGVsLm9wdC5nYWxsZXJ5KS5yZW1vdmUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaW1nPSAkKFwiPGltZy8+XCIpLmxvYWQoZnVuY3Rpb24oKXtcblx0XHRcdFx0JChlbC5vcHQuZ2FsbGVyeSkudHJpZ2dlcihcImltYWdlTG9hZGVkLlwiK2VsLm9wdC5nYWxsZXJ5SUQpO1xuXHRcdFx0fSkuYXR0cihcInNyY1wiLHVybCk7XG5cdFx0fSxcblxuXHRcdGNoZWNrU2l6ZTpmdW5jdGlvbihpbWFnZSxlbCl7XG5cblx0XHRcdGlmKCQubWJCZ25kR2FsbGVyeS5jaGFuZ2luZylcblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRpZigkLm1iQmduZEdhbGxlcnkuY2xlYXIpe1xuXHRcdFx0XHQkKGVsLm9wdC5nYWxsZXJ5KS5yZW1vdmUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaW1hZ2UuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgaW1hZ2U9JCh0aGlzKTtcblx0XHRcdFx0dmFyIHc9IGltYWdlLmF0dHIoXCJ3XCIpO1xuXHRcdFx0XHR2YXIgaD0gaW1hZ2UuYXR0cihcImhcIik7XG5cblx0XHRcdFx0dmFyIGNvbnRhaW5tZW50ID0gZWwub3B0LmNvbnRhaW5tZW50ID09IFwiYm9keVwiPyB3aW5kb3cgOiBlbC5vcHQuY29udGFpbm1lbnQ7XG5cdFx0XHRcdHZhciBhc3BlY3RSYXRpbz0gdy9oO1xuXHRcdFx0XHR2YXIgd0FzcGVjdFJhdGlvPSQoY29udGFpbm1lbnQpLndpZHRoKCkvJChjb250YWlubWVudCkuaGVpZ2h0KCk7XG5cdFx0XHRcdGlmKGFzcGVjdFJhdGlvPj13QXNwZWN0UmF0aW8pe1xuXHRcdFx0XHRcdGltYWdlLmNzcyhcImhlaWdodFwiLFwiMTAwJVwiKTtcblx0XHRcdFx0XHRpbWFnZS5jc3MoXCJ3aWR0aFwiLFwiYXV0b1wiKTtcblx0XHRcdFx0fSBlbHNle1xuXHRcdFx0XHRcdGltYWdlLmNzcyhcIndpZHRoXCIsXCIxMDAlXCIpO1xuXHRcdFx0XHRcdGltYWdlLmNzcyhcImhlaWdodFwiLFwiYXV0b1wiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpbWFnZS5jc3MoXCJtYXJnaW4tbGVmdFwiLCgoJChjb250YWlubWVudCkud2lkdGgoKS1pbWFnZS53aWR0aCgpKS8yKSk7XG5cblx0XHRcdFx0aWYoIWVsLm9wdC5wcmVzZXJ2ZVRvcClcblx0XHRcdFx0XHRpbWFnZS5jc3MoXCJtYXJnaW4tdG9wXCIsKCgkKGNvbnRhaW5tZW50KS5oZWlnaHQoKS1pbWFnZS5oZWlnaHQoKSkvMikpO1xuXG5cdFx0XHRcdGlmKGVsLm9wdC5wcmVzZXJ2ZVdpZHRoKXtcblx0XHRcdFx0XHRpbWFnZS5jc3Moe3dpZHRoOlwiMTAwJVwiLCBoZWlnaHQ6XCJhdXRvXCIsIGxlZnQ6MCwgbWFyZ2luTGVmdDowfSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdGNoYW5nZVBob3RvOmZ1bmN0aW9uKHVybCxlbCl7XG5cblx0XHRcdGlmKCQubWJCZ25kR2FsbGVyeS5jbGVhcil7XG5cdFx0XHRcdCQoZWwub3B0LmdhbGxlcnkpLnJlbW92ZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdCQubWJCZ25kR2FsbGVyeS5jaGFuZ2luZz10cnVlO1xuXG5cdFx0XHRpZihlbC5vcHQub25DaGFuZ2UpXG5cdFx0XHRcdGVsLm9wdC5vbkNoYW5nZShlbC5vcHQsIGVsLm9wdC5pbWFnZUNvdW50ZXIpO1xuXG5cdFx0XHR2YXIgaW1hZ2U9JChcIjxpbWcvPlwiKS5oaWRlKCkubG9hZChmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgaW1hZ2U9JCh0aGlzKTtcblxuXHRcdFx0XHR2YXIgdG1wPSQoXCI8ZGl2Lz5cIikuY3NzKHtwb3NpdGlvbjpcImFic29sdXRlXCIsdG9wOi01MDAwfSk7XG5cdFx0XHRcdHRtcC5hcHBlbmQoaW1hZ2UpO1xuXHRcdFx0XHQkKFwiYm9keVwiKS5hcHBlbmQodG1wKTtcblx0XHRcdFx0aW1hZ2UuYXR0cihcIndcIiwgaW1hZ2Uud2lkdGgoKSk7XG5cdFx0XHRcdGltYWdlLmF0dHIoXCJoXCIsIGltYWdlLmhlaWdodCgpKTtcblx0XHRcdFx0dG1wLnJlbW92ZSgpO1xuXG5cdFx0XHRcdGVsLm9wdC5lZmZlY3QgPSB0eXBlb2YgZWwub3B0LmVmZmVjdCA9PSBcIm9iamVjdFwiID8gZWwub3B0LmVmZmVjdCA6ICQubWJCZ25kR2FsbGVyeS5lZmZlY3RzW2VsLm9wdC5lZmZlY3RdO1xuXG5cblx0XHRcdFx0JChcIiNiZ25kR2FsbGVyeV9cIitlbC5vcHQuZ2FsbGVyeUlEK1wiIGltZ1wiKS5DU1NBbmltYXRlKGVsLm9wdC5lZmZlY3QuZXhpdCxlbC5vcHQuZWZmVGltZXIsMCxlbC5vcHQuZWZmZWN0LmV4aXRUaW1pbmcsZnVuY3Rpb24oZWwpe1xuXHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0aW1hZ2UuY3NzKHtwb3NpdGlvbjpcImFic29sdXRlXCJ9KTtcblx0XHRcdFx0JChcIiNiZ25kR2FsbGVyeV9cIitlbC5vcHQuZ2FsbGVyeUlEKS5hcHBlbmQoaW1hZ2UpO1xuXG5cdFx0XHRcdC8vdG9kbzogYWRkIGEgcHJvcGVydHkgdG8gbGV0IGhlaWdodCBmb3IgdmVydGljYSAgbCBpbWFnZXNcblx0XHRcdFx0JC5tYkJnbmRHYWxsZXJ5LmNoYW5naW5nPWZhbHNlO1xuXHRcdFx0XHQkLm1iQmduZEdhbGxlcnkuY2hlY2tTaXplKGltYWdlLCBlbCk7XG5cblx0XHRcdFx0aW1hZ2UuY3NzKCQubWJCZ25kR2FsbGVyeS5ub3JtYWxpemVDc3MoZWwub3B0LmVmZmVjdC5lbnRlcikpLnNob3coKS5DU1NBbmltYXRlKHt0b3A6MCxsZWZ0OjAsb3BhY2l0eToxLCB0cmFuc2Zvcm06XCJzY2FsZSgxKSByb3RhdGUoMGRlZylcIn0sZWwub3B0LmVmZlRpbWVyLDAsZWwub3B0LmVmZmVjdC5lbnRlclRpbWluZyxmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCQoZWwub3B0LmdhbGxlcnkpLnRyaWdnZXIoXCJpbWFnZVJlYWR5LlwiK2VsLm9wdC5nYWxsZXJ5SUQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pLmF0dHIoXCJzcmNcIix1cmwpO1xuXG5cdFx0XHRpbWFnZS5lcnJvcihmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgaW1hZ2U9JCh0aGlzKTtcblx0XHRcdFx0aW1hZ2UuYXR0cihcInNyY1wiLCBlbC5vcHQucGxhY2VIb2xkZXIpO1xuXHRcdFx0fSlcblxuXHRcdFx0aWYoZWwub3B0LmdyYXlTY2FsZSl7XG5cdFx0XHRcdGltYWdlLmdyZXlTY2FsZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY291bnRlcj0kKGVsLm9wdC5jb250cm9scykuZmluZChcIi5jb3VudGVyXCIpO1xuXHRcdFx0Y291bnRlci5odG1sKGVsLm9wdC5pbWFnZUNvdW50ZXIrMStcIiAvIFwiK2VsLm9wdC5pbWFnZXMubGVuZ3RoKTtcblxuXHRcdH0sXG5cblx0XHRwbGF5OmZ1bmN0aW9uKGVsKXtcblxuXHRcdFx0Y2xlYXJUaW1lb3V0KGVsLm9wdC5jaGFuZ2luZyk7XG5cblx0XHRcdHZhciBpbWdUb1JlbW92ZSA9ICQoXCIjYmduZEdhbGxlcnlfXCIrZWwub3B0LmdhbGxlcnlJRCtcIiBpbWdcIikubm90KFwiOmxhc3RcIik7XG5cdFx0XHRpbWdUb1JlbW92ZS5yZW1vdmUoKTtcblxuXG5cdFx0XHRpZigkLm1iQmduZEdhbGxlcnkuY2xlYXIpe1xuXHRcdFx0XHQkKGVsLm9wdC5nYWxsZXJ5KS5yZW1vdmUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihlbC5vcHQub25QbGF5KVxuXHRcdFx0XHRlbC5vcHQub25QbGF5KGVsLm9wdCk7XG5cblx0XHRcdGVsLm9wdC5jaGFuZ2luZz1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmKGVsLm9wdC5wYXVzZWQpXG5cdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdGlmKGVsLm9wdC5vbk5leHQpXG5cdFx0XHRcdFx0ZWwub3B0Lm9uTmV4dChlbC5vcHQpO1xuXG5cdFx0XHRcdGlmIChlbC5vcHQuaW1hZ2VDb3VudGVyPj1lbC5vcHQuaW1hZ2VzLmxlbmd0aC0xKVxuXHRcdFx0XHRcdGVsLm9wdC5pbWFnZUNvdW50ZXI9LTE7XG5cblx0XHRcdFx0ZWwub3B0LmltYWdlQ291bnRlcisrO1xuXG5cdFx0XHRcdCQubWJCZ25kR2FsbGVyeS5jaGFuZ2VQaG90byhlbC5vcHQuaW1hZ2VzW2VsLm9wdC5pbWFnZUNvdW50ZXJdLCQoZWwub3B0LmNvbnRhaW5tZW50KS5nZXQoMCkpO1xuXHRcdFx0fSxlbC5vcHQucGF1c2VkPzA6ZWwub3B0LnRpbWVyKTtcblxuXHRcdFx0JChlbC5vcHQuZ2FsbGVyeSkudHJpZ2dlcihcInBsYXlcIik7XG5cblx0XHR9LFxuXG5cdFx0cGF1c2U6ZnVuY3Rpb24oZWwpe1xuXHRcdFx0aWYoJC5tYkJnbmRHYWxsZXJ5LmNsZWFyKXtcblx0XHRcdFx0JChlbC5vcHQuZ2FsbGVyeSkucmVtb3ZlKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y2xlYXJUaW1lb3V0KGVsLm9wdC5jaGFuZ2luZyk7XG5cdFx0XHRlbC5vcHQucGF1c2VkPXRydWU7XG5cdFx0XHQkKGVsLm9wdC5nYWxsZXJ5KS50cmlnZ2VyKFwicGF1c2VkXCIpO1xuXG5cdFx0XHRpZihlbC5vcHQub25QYXVzZSlcblx0XHRcdFx0ZWwub3B0Lm9uUGF1c2UoZWwub3B0KTtcblx0XHR9LFxuXG5cdFx0bmV4dDpmdW5jdGlvbihlbCl7XG5cdFx0XHRpZigkLm1iQmduZEdhbGxlcnkuY2xlYXIpe1xuXHRcdFx0XHQkKGVsLm9wdC5nYWxsZXJ5KS5yZW1vdmUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihlbC5vcHQub25OZXh0KVxuXHRcdFx0XHRlbC5vcHQub25OZXh0KGVsLm9wdCk7XG5cblx0XHRcdCQubWJCZ25kR2FsbGVyeS5wYXVzZShlbCk7XG5cdFx0XHRpZiAoZWwub3B0LmltYWdlQ291bnRlcj09ZWwub3B0LmltYWdlcy5sZW5ndGgtMSlcblx0XHRcdFx0ZWwub3B0LmltYWdlQ291bnRlcj0tMTtcblxuXHRcdFx0ZWwub3B0LmltYWdlQ291bnRlcisrO1xuXG5cdFx0XHQkLm1iQmduZEdhbGxlcnkuY2hhbmdlUGhvdG8oZWwub3B0LmltYWdlc1tlbC5vcHQuaW1hZ2VDb3VudGVyXSxlbCk7XG5cdFx0XHRjbGVhclRpbWVvdXQoZWwub3B0LmNoYW5naW5nKTtcblx0XHR9LFxuXG5cdFx0cHJldjpmdW5jdGlvbihlbCl7XG5cdFx0XHRpZigkLm1iQmduZEdhbGxlcnkuY2xlYXIpe1xuXHRcdFx0XHQkKGVsLm9wdC5nYWxsZXJ5KS5yZW1vdmUoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihlbC5vcHQub25QcmV2KVxuXHRcdFx0XHRlbC5vcHQub25QcmV2KGVsLm9wdCk7XG5cblx0XHRcdCQubWJCZ25kR2FsbGVyeS5wYXVzZShlbCk7XG5cblx0XHRcdGNsZWFyVGltZW91dChlbC5vcHQuY2hhbmdpbmcpO1xuXHRcdFx0aWYgKGVsLm9wdC5pbWFnZUNvdW50ZXI9PTApXG5cdFx0XHRcdGVsLm9wdC5pbWFnZUNvdW50ZXI9ZWwub3B0LmltYWdlcy5sZW5ndGg7XG5cblx0XHRcdGVsLm9wdC5pbWFnZUNvdW50ZXItLTtcblxuXHRcdFx0JC5tYkJnbmRHYWxsZXJ5LmNoYW5nZVBob3RvKGVsLm9wdC5pbWFnZXNbZWwub3B0LmltYWdlQ291bnRlcl0sZWwpO1xuXHRcdH0sXG5cblx0XHRsb2FkZXI6e1xuXHRcdFx0c2hvdzpmdW5jdGlvbigpe30sXG5cdFx0XHRoaWRlOmZ1bmN0aW9uKCl7fVxuXHRcdH0sXG5cblx0XHRrZXlib2FyZDpmdW5jdGlvbihlbCl7XG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImtleWRvd24uYmduZEdhbGxlcnlcIixmdW5jdGlvbihlKXtcblx0XHRcdFx0c3dpdGNoKGUua2V5Q29kZSl7XG5cdFx0XHRcdFx0Y2FzZSAzMjpcblx0XHRcdFx0XHRcdGlmKGVsLm9wdC5wYXVzZWQpe1xuXHRcdFx0XHRcdFx0XHQkLm1iQmduZEdhbGxlcnkucGxheShlbCk7XG5cdFx0XHRcdFx0XHRcdGVsLm9wdC5wYXVzZWQ9ZmFsc2U7XG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0ZWwub3B0LnBhdXNlZD10cnVlO1xuXHRcdFx0XHRcdFx0XHQkLm1iQmduZEdhbGxlcnkucGF1c2UoZWwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0XHRcdCQubWJCZ25kR2FsbGVyeS5uZXh0KGVsKTtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0XHRcdCQubWJCZ25kR2FsbGVyeS5wcmV2KGVsKTtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSxcblxuXHRcdGJ1aWxkQ29udHJvbHM6ZnVuY3Rpb24oY29udHJvbHMsZWwpe1xuXHRcdFx0dmFyIHBhdXNlPSQoY29udHJvbHMpLmZpbmQoXCIucGF1c2VcIik7XG5cdFx0XHR2YXIgcGxheT0kKGNvbnRyb2xzKS5maW5kKFwiLnBsYXlcIik7XG5cdFx0XHR2YXIgbmV4dD0kKGNvbnRyb2xzKS5maW5kKFwiLm5leHRcIik7XG5cdFx0XHR2YXIgcHJldj0kKGNvbnRyb2xzKS5maW5kKFwiLnByZXZcIik7XG5cdFx0XHR2YXIgZnVsbFNjcmVlbiA9ICAkKGNvbnRyb2xzKS5maW5kKFwiLmZ1bGxzY3JlZW5cIik7XG5cblx0XHRcdGlmKCgkLmJyb3dzZXIubXNpZSB8fCAkLmJyb3dzZXIub3BlcmEpKXtcblx0XHRcdFx0ZnVsbFNjcmVlbi5yZW1vdmUoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYoZWwub3B0LmF1dG9TdGFydClcblx0XHRcdFx0cGxheS5oaWRlKCk7XG5cblx0XHRcdHBhdXNlLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuXHRcdFx0XHQkLm1iQmduZEdhbGxlcnkucGF1c2UoZWwpO1xuXHRcdFx0XHQkKHRoaXMpLmhpZGUoKTtcblx0XHRcdFx0cGxheS5zaG93KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cGxheS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYoIWVsLm9wdC5wYXVzZWQpIHJldHVybjtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KGVsLm9wdC5jaGFuZ2luZyk7XG5cdFx0XHRcdCQubWJCZ25kR2FsbGVyeS5wbGF5KGVsKTtcblx0XHRcdFx0ZWwub3B0LnBhdXNlZD1mYWxzZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRuZXh0Lm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuXHRcdFx0XHQkLm1iQmduZEdhbGxlcnkubmV4dChlbCk7XG5cdFx0XHRcdHBhdXNlLmhpZGUoKTtcblx0XHRcdFx0cGxheS5zaG93KCk7XG5cblx0XHRcdH0pO1xuXG5cdFx0XHRwcmV2Lm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuXHRcdFx0XHQkLm1iQmduZEdhbGxlcnkucHJldihlbCk7XG5cdFx0XHRcdHBhdXNlLmhpZGUoKTtcblx0XHRcdFx0cGxheS5zaG93KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZnVsbFNjcmVlbi5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIGdhbGxlcnkgPSAkKFwiI2JnbmRHYWxsZXJ5X1wiK2VsLm9wdC5nYWxsZXJ5SUQpLmdldCgwKVxuXHRcdFx0XHQkLm1iQmduZEdhbGxlcnkucnVuRnVsbHNjcmVlbihnYWxsZXJ5LCBlbCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYoZWwub3B0LmFjdGl2YXRlS2V5Ym9hcmQpXG5cdFx0XHRcdCQubWJCZ25kR2FsbGVyeS5rZXlib2FyZChlbCk7XG5cdFx0fSxcblxuXHRcdGNoYW5nZUdhbGxlcnk6ZnVuY3Rpb24oZWwsYXJyYXkpe1xuXG5cdFx0XHQkKGVsLmdhbGxlcnkpLmZhZGVPdXQoKTtcblxuXHRcdFx0JC5tYkJnbmRHYWxsZXJ5LnBhdXNlKGVsKTtcblxuXHRcdFx0ZWwub3B0LmltYWdlcz1hcnJheTtcblx0XHRcdHZhciBpbWFnZXM9IGVsLm9wdC5pbWFnZXM7XG5cdFx0XHR2YXIgdG90SW1nPSBpbWFnZXMubGVuZ3RoO1xuXHRcdFx0dmFyIGxvYWRDb3VudGVyPTA7XG5cblx0XHRcdCQubWJCZ25kR2FsbGVyeS5wcmVsb2FkKGltYWdlc1swXSxlbCk7XG5cdFx0XHQkKGVsLm9wdC5nYWxsZXJ5KS5vbihcImltYWdlTG9hZGVkLlwiK2VsLm9wdC5nYWxsZXJ5SUQsZnVuY3Rpb24oKXtcblx0XHRcdFx0bG9hZENvdW50ZXIrKztcblx0XHRcdFx0aWYobG9hZENvdW50ZXI9PXRvdEltZyl7XG5cdFx0XHRcdFx0JChlbC5vcHQuZ2FsbGVyeSkub2ZmKFwiaW1hZ2VMb2FkZWQuXCIrZWwub3B0LmdhbGxlcnlJRCk7XG5cdFx0XHRcdFx0JChlbC5nYWxsZXJ5KS5mYWRlSW4oKTtcblx0XHRcdFx0XHQkLm1iQmduZEdhbGxlcnkucGxheShlbCk7XG5cdFx0XHRcdFx0ZWwub3B0LnBhdXNlZD1mYWxzZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0JC5tYkJnbmRHYWxsZXJ5LnByZWxvYWQoaW1hZ2VzW2xvYWRDb3VudGVyXSxlbCk7XG5cdFx0XHR9KTtcblx0XHRcdGVsLm9wdC5pbWFnZUNvdW50ZXI9MDtcblx0XHR9LFxuXG5cdFx0cnVuRnVsbHNjcmVlbjogZnVuY3Rpb24oZ2FsbGVyeSwgZWwpe1xuXHRcdFx0ZnVuY3Rpb24gUnVuUHJlZml4TWV0aG9kKG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRcdHZhciBwZnggPSBbXCJ3ZWJraXRcIiwgXCJtb3pcIiwgXCJtc1wiLCBcIm9cIiwgXCJcIl07XG5cdFx0XHRcdHZhciBwID0gMCwgbSwgdDtcblx0XHRcdFx0d2hpbGUgKHAgPCBwZngubGVuZ3RoICYmICFvYmpbbV0pIHtcblx0XHRcdFx0XHRtID0gbWV0aG9kO1xuXHRcdFx0XHRcdGlmIChwZnhbcF0gPT0gXCJcIikge1xuXHRcdFx0XHRcdFx0bSA9IG0uc3Vic3RyKDAsMSkudG9Mb3dlckNhc2UoKSArIG0uc3Vic3RyKDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtID0gcGZ4W3BdICsgbTtcblx0XHRcdFx0XHR0ID0gdHlwZW9mIG9ialttXTtcblx0XHRcdFx0XHRpZiAodCAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHRwZnggPSBbcGZ4W3BdXTtcblx0XHRcdFx0XHRcdHJldHVybiAodCA9PSBcImZ1bmN0aW9uXCIgPyBvYmpbbV0oKSA6IG9ialttXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHArKztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBsYXVuY2hGdWxsc2NyZWVuKGVsZW1lbnQpIHtcblx0XHRcdFx0UnVuUHJlZml4TWV0aG9kKGVsZW1lbnQsIFwiUmVxdWVzdEZ1bGxTY3JlZW5cIik7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR2YXIgZnVsbHNjcmVlbmNoYW5nZSA9ICQuYnJvd3Nlci5tb3ppbGxhID8gXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIgOiAkLmJyb3dzZXIud2Via2l0ID8gXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIgOiAkLmJyb3dzZXIubXNpZSA/IFwibXNmdWxsc2NyZWVuY2hhbmdlXCIgOiAgJC5icm93c2VyLm9wZXJhID8gXCJvZnVsbHNjcmVlbmNoYW5nZVwiIDogXCJmdWxsc2NyZWVuY2hhbmdlXCI7XG5cdFx0XHRcdFx0JChkb2N1bWVudCkub25lKGZ1bGxzY3JlZW5jaGFuZ2UsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdHZhciBpc0Z1bGxTY3JlZW4gPSBSdW5QcmVmaXhNZXRob2QoZG9jdW1lbnQsIFwiSXNGdWxsU2NyZWVuXCIpIHx8IFJ1blByZWZpeE1ldGhvZChkb2N1bWVudCwgXCJGdWxsU2NyZWVuXCIpO1xuXHRcdFx0XHRcdFx0aWYgKCFpc0Z1bGxTY3JlZW4pIHtcblx0XHRcdFx0XHRcdFx0ZWwuaXNGdWxsc2NyZWVuID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdCQoXCIuZnVsbFNjcmVlbl9jb250cm9sc1wiKS5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSwxMDAwKTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gY2FuY2VsRnVsbHNjcmVlbigpIHtcblx0XHRcdFx0aWYgKFJ1blByZWZpeE1ldGhvZChkb2N1bWVudCwgXCJGdWxsU2NyZWVuXCIpIHx8IFJ1blByZWZpeE1ldGhvZChkb2N1bWVudCwgXCJJc0Z1bGxTY3JlZW5cIikpIHtcblx0XHRcdFx0XHRSdW5QcmVmaXhNZXRob2QoZG9jdW1lbnQsIFwiQ2FuY2VsRnVsbFNjcmVlblwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZihlbC5pc0Z1bGxzY3JlZW4pe1xuXHRcdFx0XHRjYW5jZWxGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdGVsLmlzRnVsbHNjcmVlbiA9IGZhbHNlO1xuXHRcdFx0XHQkKFwiLmZ1bGxTY3JlZW5fY29udHJvbHNcIikucmVtb3ZlKCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0ZWwuaXNGdWxsc2NyZWVuID0gdHJ1ZTtcblx0XHRcdFx0dmFyIGNvbnRyb2xzID0gJChlbC5vcHQuY29udHJvbHMpLmNsb25lKHRydWUpLmFkZENsYXNzKFwiZnVsbFNjcmVlbl9jb250cm9sc1wiKS5jc3Moe3Bvc2l0aW9uOlwiYWJzb2x1dGVcIiwgekluZGV4OjEwMDAsIGJvdHRvbTogMjAsIHJpZ2h0OjIwfSk7XG5cdFx0XHRcdGNvbnRyb2xzLmZpbmQoXCIuZnVsbHNjcmVlblwiKS5odG1sKFwiZXhpdFwiKTtcblx0XHRcdFx0JChnYWxsZXJ5KS5hcHBlbmQoY29udHJvbHMpO1xuXHRcdFx0XHQkKGdhbGxlcnkpLmFkZENsYXNzKFwiZnVsbFNjcmVlblwiKTtcblx0XHRcdFx0bGF1bmNoRnVsbHNjcmVlbihnYWxsZXJ5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0fTtcblxuXHRqUXVlcnkubG9hZEZyb21TeXN0ZW09ZnVuY3Rpb24oZm9sZGVyUGF0aCwgdHlwZSl7XG5cblx0XHQvLyBpZiBkaXJlY3RvcnkgbGlzdGluZyBpcyBlbmFibGVkIG9uIHRoZSByZW1vdGUgc2VydmVyLlxuXHRcdC8vIGlmIHlvdSBydW4gdGhlIHBhZ2UgbG9jYWxseSB5b3UgbmVlZCB0byBydW4gaXQgdW5kZXIgYSBsb2NhbCB3ZWIgc2VydmVyIChFeDogaHR0cDovL2xvY2FsaG9zdC95b3VyUGFnZSlcblx0XHQvLyBvdGhlcndpc2UgdGhlIGRpcmVjdG9yeSBsaXN0aW5nIGlzIHVuYXZhaWxhYmxlLlxuXG5cdFx0aWYoIWZvbGRlclBhdGgpXG5cdFx0XHRyZXR1cm47XG5cdFx0aWYoIXR5cGUpXG5cdFx0XHR0eXBlPSBbXCJqcGdcIixcImpwZWdcIixcInBuZ1wiXTtcblx0XHR2YXIgYXJyPVtdO1xuXHRcdCQuYWpheCh7XG5cdFx0XHR1cmw6Zm9sZGVyUGF0aCxcblx0XHRcdGFzeW5jOmZhbHNlLFxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRcdHZhciB0bXA9JChyZXNwb25zZSk7XG5cdFx0XHRcdHZhciBlbHM9IHRtcC5maW5kKFwiW2hyZWZdXCIpO1xuXG5cdFx0XHRcdGVscy5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSBpbiB0eXBlKXtcblx0XHRcdFx0XHRcdGlmICgkKHRoaXMpLmF0dHIoXCJocmVmXCIpLmluZGV4T2YodHlwZVtpXSk+PTApXG5cdFx0XHRcdFx0XHRcdGFyci5wdXNoKGZvbGRlclBhdGgrJCh0aGlzKS5hdHRyKFwiaHJlZlwiKSk7XG5cdFx0XHRcdFx0XHRhcnIgPSAkLnVuaXF1ZShhcnIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHRtcC5yZW1vdmUoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gYXJyO1xuXHR9O1xuXG5cdCQuZm4uZ3JleVNjYWxlID0gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblxuXHRcdFx0aWYgKCQuYnJvd3Nlci5tc2llICYmICQuYnJvd3Nlci52ZXJzaW9uPDkpIHtcblx0XHRcdFx0dGhpcy5zdHlsZS5maWx0ZXIgPSBcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CYXNpY0ltYWdlKGdyYXlTY2FsZT0xKVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zcmMgPSBncmF5U2NhbGVJbWFnZSh0aGlzKTtcblx0XHRcdH1cblxuXHRcdH0pXG5cdH07XG5cblx0JC5zaHVmZmxlID0gZnVuY3Rpb24oYXJyKSB7XG5cdFx0dmFyIG5ld0FycmF5ID0gYXJyLnNsaWNlKCk7XG5cdFx0dmFyIGxlbiA9IG5ld0FycmF5Lmxlbmd0aDtcblx0XHR2YXIgaSA9IGxlbjtcblx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHR2YXIgcCA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkqbGVuKTtcblx0XHRcdHZhciB0ID0gbmV3QXJyYXlbaV07XG5cdFx0XHRuZXdBcnJheVtpXSA9IG5ld0FycmF5W3BdO1xuXHRcdFx0bmV3QXJyYXlbcF0gPSB0O1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3QXJyYXk7XG5cdH07XG5cblx0ZnVuY3Rpb24gZ3JheVNjYWxlSW1hZ2UoaW1nT2JqKXtcblx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cdFx0dmFyIGNhbnZhc0NvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHRcdHZhciBpbWdXID0gaW1nT2JqLndpZHRoO1xuXHRcdHZhciBpbWdIID0gaW1nT2JqLmhlaWdodDtcblx0XHRjYW52YXMud2lkdGggPSBpbWdXO1xuXHRcdGNhbnZhcy5oZWlnaHQgPSBpbWdIO1xuXG5cdFx0Y2FudmFzQ29udGV4dC5kcmF3SW1hZ2UoaW1nT2JqLCAwLCAwKTtcblx0XHR2YXIgaW1nUGl4ZWxzID0gY2FudmFzQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgaW1nVywgaW1nSCk7XG5cblx0XHRmb3IodmFyIHkgPSAwOyB5IDwgaW1nUGl4ZWxzLmhlaWdodDsgeSsrKXtcblx0XHRcdGZvcih2YXIgeCA9IDA7IHggPCBpbWdQaXhlbHMud2lkdGg7IHgrKyl7XG5cdFx0XHRcdHZhciBpID0gKHkgKiA0KSAqIGltZ1BpeGVscy53aWR0aCArIHggKiA0O1xuXHRcdFx0XHR2YXIgYXZnID0gKGltZ1BpeGVscy5kYXRhW2ldICsgaW1nUGl4ZWxzLmRhdGFbaSArIDFdICsgaW1nUGl4ZWxzLmRhdGFbaSArIDJdKSAvIDM7XG5cdFx0XHRcdGltZ1BpeGVscy5kYXRhW2ldID0gYXZnO1xuXHRcdFx0XHRpbWdQaXhlbHMuZGF0YVtpICsgMV0gPSBhdmc7XG5cdFx0XHRcdGltZ1BpeGVscy5kYXRhW2kgKyAyXSA9IGF2Zztcblx0XHRcdH1cblx0XHR9XG5cdFx0Y2FudmFzQ29udGV4dC5wdXRJbWFnZURhdGEoaW1nUGl4ZWxzLCAwLCAwLCAwLCAwLCBpbWdQaXhlbHMud2lkdGgsIGltZ1BpeGVscy5oZWlnaHQpO1xuXHRcdHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XG5cdH1cblxufSkoalF1ZXJ5KTsiXSwiZmlsZSI6Im1iLmJnbmRHYWxsZXJ5LmpzIn0=
