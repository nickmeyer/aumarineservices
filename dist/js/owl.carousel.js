/*
 *	jQuery OwlCarousel v1.31
 *
 *	Copyright (c) 2013 Bartosz Wojciechowski
 *	http://www.owlgraphic.com/owlcarousel/
 *
 *	Licensed under MIT
 *
 */

if ( typeof Object.create !== "function" ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}
(function( $, window, document, undefined ) {

	var Carousel = {
		init :function(options, el){
			var base = this;

			base.$elem = $(el);

			// options passed via js override options passed via data attributes
			base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);

			base.userOptions = options;
			base.loadContent();
		},

		loadContent : function(){
			var base = this;

			if (typeof base.options.beforeInit === "function") {
				base.options.beforeInit.apply(this,[base.$elem]);
			}

			if (typeof base.options.jsonPath === "string") {
				var url = base.options.jsonPath;

				function getData(data) {
					if (typeof base.options.jsonSuccess === "function") {
						base.options.jsonSuccess.apply(this,[data]);
					} else {
						var content = "";
						for(var i in data["owl"]){
							content += data["owl"][i]["item"];
						}
						base.$elem.html(content);
					}
					base.logIn();
				}
				$.getJSON(url,getData);
			} else {
				base.logIn();
			}
		},

		logIn : function(action){
			var base = this;

			base.$elem.data("owl-originalStyles", base.$elem.attr("style"))
					  .data("owl-originalClasses", base.$elem.attr("class"));

			base.$elem.css({opacity: 0});
			base.orignalItems = base.options.items;
			base.checkBrowser();
			base.wrapperWidth = 0;
			base.checkVisible;
			base.setVars();
		},

		setVars : function(){
			var base = this;
			if(base.$elem.children().length === 0){return false}
			base.baseClass();
			base.eventTypes();
			base.$userItems = base.$elem.children();
			base.itemsAmount = base.$userItems.length;
			base.wrapItems();
			base.$owlItems = base.$elem.find(".owl-item");
			base.$owlWrapper = base.$elem.find(".owl-wrapper");
			base.playDirection = "next";
			base.prevItem = 0;
			base.prevArr = [0];
			base.currentItem = 0;
			base.customEvents();
			base.onStartup();
		},

		onStartup : function(){
			var base = this;
			base.updateItems();
			base.calculateAll();
			base.buildControls();
			base.updateControls();
			base.response();
			base.moveEvents();
			base.stopOnHover();
			base.owlStatus();

			if(base.options.transitionStyle !== false){
				base.transitionTypes(base.options.transitionStyle);
			}
			if(base.options.autoPlay === true){
				base.options.autoPlay = 5000;
			}
			base.play();

			base.$elem.find(".owl-wrapper").css("display","block")

			if(!base.$elem.is(":visible")){
				base.watchVisibility();
			} else {
				base.$elem.css("opacity",1);
			}
			base.onstartup = false;
			base.eachMoveUpdate();
			if (typeof base.options.afterInit === "function") {
				base.options.afterInit.apply(this,[base.$elem]);
			}
		},

		eachMoveUpdate : function(){
			var base = this;

			if(base.options.lazyLoad === true){
				base.lazyLoad();
			}
			if(base.options.autoHeight === true){
				base.autoHeight();
			}
			base.onVisibleItems();

			if (typeof base.options.afterAction === "function") {
				base.options.afterAction.apply(this,[base.$elem]);
			}
		},

		updateVars : function(){
			var base = this;
			if(typeof base.options.beforeUpdate === "function") {
				base.options.beforeUpdate.apply(this,[base.$elem]);
			}
			base.watchVisibility();
			base.updateItems();
			base.calculateAll();
			base.updatePosition();
			base.updateControls();
			base.eachMoveUpdate();
			if(typeof base.options.afterUpdate === "function") {
				base.options.afterUpdate.apply(this,[base.$elem]);
			}
		},

		reload : function(elements){
			var base = this;
			setTimeout(function(){
				base.updateVars();
			},0)
		},

		watchVisibility : function(){
			var base = this;

			if(base.$elem.is(":visible") === false){
				base.$elem.css({opacity: 0});
				clearInterval(base.autoPlayInterval);
				clearInterval(base.checkVisible);
			} else {
				return false;
			}
			base.checkVisible = setInterval(function(){
				if (base.$elem.is(":visible")) {
					base.reload();
					base.$elem.animate({opacity: 1},200);
					clearInterval(base.checkVisible);
				}
			}, 500);
		},

		wrapItems : function(){
			var base = this;
			base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
			base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
			base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
			base.$elem.css("display","block");
		},

		baseClass : function(){
			var base = this;
			var hasBaseClass = base.$elem.hasClass(base.options.baseClass);
			var hasThemeClass = base.$elem.hasClass(base.options.theme);

			if(!hasBaseClass){
				base.$elem.addClass(base.options.baseClass);
			}

			if(!hasThemeClass){
				base.$elem.addClass(base.options.theme);
			}
		},

		updateItems : function(){
			var base = this;

			if(base.options.responsive === false){
				return false;
			}
			if(base.options.singleItem === true){
				base.options.items = base.orignalItems = 1;
				base.options.itemsCustom = false;
				base.options.itemsDesktop = false;
				base.options.itemsDesktopSmall = false;
				base.options.itemsTablet = false;
				base.options.itemsTabletSmall = false;
				base.options.itemsMobile = false;
				return false;
			}

			var width = $(base.options.responsiveBaseWidth).width();

			if(width > (base.options.itemsDesktop[0] || base.orignalItems) ){
				base.options.items = base.orignalItems;
			}

			if(typeof(base.options.itemsCustom) !== 'undefined' && base.options.itemsCustom !== false){
				//Reorder array by screen size
				base.options.itemsCustom.sort(function(a,b){return a[0]-b[0];});
				for(var i in base.options.itemsCustom){
					if(typeof(base.options.itemsCustom[i]) !== 'undefined' && base.options.itemsCustom[i][0] <= width){
						base.options.items = base.options.itemsCustom[i][1];
					}
				}
			} else {

				if(width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false){
					base.options.items = base.options.itemsDesktop[1];
				}

				if(width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false){
					base.options.items = base.options.itemsDesktopSmall[1];
				}

				if(width <= base.options.itemsTablet[0]  && base.options.itemsTablet !== false){
					base.options.items = base.options.itemsTablet[1];
				}

				if(width <= base.options.itemsTabletSmall[0]  && base.options.itemsTabletSmall !== false){
					base.options.items = base.options.itemsTabletSmall[1];
				}

				if(width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false){
					base.options.items = base.options.itemsMobile[1];
				}
			}

			//if number of items is less than declared
			if(base.options.items > base.itemsAmount && base.options.itemsScaleUp === true){
				base.options.items = base.itemsAmount;
			}
		},

		response : function(){
			var base = this,
				smallDelay;
			if(base.options.responsive !== true){
				return false
			}
			var lastWindowWidth = $(window).width();

			base.resizer = function(){
				if($(window).width() !== lastWindowWidth){
					if(base.options.autoPlay !== false){
						clearInterval(base.autoPlayInterval);
					}
					clearTimeout(smallDelay);
					smallDelay = setTimeout(function(){
						lastWindowWidth = $(window).width();
						base.updateVars();
					},base.options.responsiveRefreshRate);
				}
			}
			$(window).resize(base.resizer)
		},

		updatePosition : function(){
			var base = this;
			base.jumpTo(base.currentItem);
			if(base.options.autoPlay !== false){
				base.checkAp();
			}
		},

		appendItemsSizes : function(){
			var base = this;

			var roundPages = 0;
			var lastItem = base.itemsAmount - base.options.items;

			base.$owlItems.each(function(index){
				var $this = $(this);
				$this
					.css({"width": base.itemWidth})
					.data("owl-item",Number(index));

				if(index % base.options.items === 0 || index === lastItem){
					if(!(index > lastItem)){
						roundPages +=1;
					}
				}
				$this.data("owl-roundPages",roundPages)
			});
		},

		appendWrapperSizes : function(){
			var base = this;
			var width = 0;

			var width = base.$owlItems.length * base.itemWidth;

			base.$owlWrapper.css({
				"width": width*2,
				"left": 0
			});
			base.appendItemsSizes();
		},

		calculateAll : function(){
			var base = this;
			base.calculateWidth();
			base.appendWrapperSizes();
			base.loops();
			base.max();
		},

		calculateWidth : function(){
			var base = this;
			base.itemWidth = Math.round(base.$elem.width()/base.options.items)
		},

		max : function(){
			var base = this;
			var maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
			if(base.options.items > base.itemsAmount){
				base.maximumItem = 0;
				maximum = 0
				base.maximumPixels = 0;
			} else {
				base.maximumItem = base.itemsAmount - base.options.items;
				base.maximumPixels = maximum;
			}
			return maximum;
		},

		min : function(){
			return 0;
		},

		loops : function(){
			var base = this;

			base.positionsInArray = [0];
			base.pagesInArray = [];
			var prev = 0;
			var elWidth = 0;

			for(var i = 0; i<base.itemsAmount; i++){
				elWidth += base.itemWidth;
				base.positionsInArray.push(-elWidth);

				if(base.options.scrollPerPage === true){
					var item = $(base.$owlItems[i]);
					var roundPageNum = item.data("owl-roundPages");
					if(roundPageNum !== prev){
						base.pagesInArray[prev] = base.positionsInArray[i];
						prev = roundPageNum;
					}
				}
			}
		},

		buildControls : function(){
			var base = this;
			if(base.options.navigation === true || base.options.pagination === true){
				base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
			}
			if(base.options.pagination === true){
				base.buildPagination();
			}
			if(base.options.navigation === true){
				base.buildButtons();
			}
		},

		buildButtons : function(){
			var base = this;
			var buttonsWrapper = $("<div class=\"owl-buttons\"/>")
			base.owlControls.append(buttonsWrapper);

			base.buttonPrev = $("<div/>",{
				"class" : "owl-prev",
				"html" : base.options.navigationText[0] || ""
				});

			base.buttonNext = $("<div/>",{
				"class" : "owl-next",
				"html" : base.options.navigationText[1] || ""
				});

			buttonsWrapper
			.append(base.buttonPrev)
			.append(base.buttonNext);

			buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function(event){
				event.preventDefault();
			})

			buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function(event){
				event.preventDefault();
				if($(this).hasClass("owl-next")){
					base.next();
				} else{
					base.prev();
				}
			})
		},

		buildPagination : function(){
			var base = this;

			base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
			base.owlControls.append(base.paginationWrapper);

			base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(event){
				event.preventDefault();
				if(Number($(this).data("owl-page")) !== base.currentItem){
					base.goTo( Number($(this).data("owl-page")), true);
				}
			});
		},

		updatePagination : function(){
			var base = this;
			if(base.options.pagination === false){
				return false;
			}

			base.paginationWrapper.html("");

			var counter = 0;
			var lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

			for(var i = 0; i<base.itemsAmount; i++){
				if(i % base.options.items === 0){
					counter +=1;
					if(lastPage === i){
						var lastItem = base.itemsAmount - base.options.items;
					}
					var paginationButton = $("<div/>",{
						"class" : "owl-page"
						});
					var paginationButtonInner = $("<span></span>",{
						"text": base.options.paginationNumbers === true ? counter : "",
						"class": base.options.paginationNumbers === true ? "owl-numbers" : ""
					});
					paginationButton.append(paginationButtonInner);

					paginationButton.data("owl-page",lastPage === i ? lastItem : i);
					paginationButton.data("owl-roundPages",counter);

					base.paginationWrapper.append(paginationButton);
				}
			}
			base.checkPagination();
		},
		checkPagination : function(){
			var base = this;
			if(base.options.pagination === false){
				return false;
			}
			base.paginationWrapper.find(".owl-page").each(function(i,v){
				if($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages") ){
					base.paginationWrapper
						.find(".owl-page")
						.removeClass("active");
					$(this).addClass("active");
				}
			});
		},

		checkNavigation : function(){
			var base = this;

			if(base.options.navigation === false){
				return false;
			}
			if(base.options.rewindNav === false){
				if(base.currentItem === 0 && base.maximumItem === 0){
					base.buttonPrev.addClass("disabled");
					base.buttonNext.addClass("disabled");
				} else if(base.currentItem === 0 && base.maximumItem !== 0){
					base.buttonPrev.addClass("disabled");
					base.buttonNext.removeClass("disabled");
				} else if (base.currentItem === base.maximumItem){
					base.buttonPrev.removeClass("disabled");
					base.buttonNext.addClass("disabled");
				} else if(base.currentItem !== 0 && base.currentItem !== base.maximumItem){
					base.buttonPrev.removeClass("disabled");
					base.buttonNext.removeClass("disabled");
				}
			}
		},

		updateControls : function(){
			var base = this;
			base.updatePagination();
			base.checkNavigation();
			if(base.owlControls){
				if(base.options.items >= base.itemsAmount){
					base.owlControls.hide();
				} else {
					base.owlControls.show();
				}
			}
		},

		destroyControls : function(){
			var base = this;
			if(base.owlControls){
				base.owlControls.remove();
			}
		},

		next : function(speed){
			var base = this;

			if(base.isTransition){
				return false;
			}

			base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
			if(base.currentItem > base.maximumItem + (base.options.scrollPerPage == true ? (base.options.items - 1) : 0)){
				if(base.options.rewindNav === true){
					base.currentItem = 0;
					speed = "rewind";
				} else {
					base.currentItem = base.maximumItem;
					return false;
				}
			}
			base.goTo(base.currentItem,speed);
		},

		prev : function(speed){
			var base = this;

			if(base.isTransition){
				return false;
			}

			if(base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items){
				base.currentItem = 0
			} else {
				base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
			}
			if(base.currentItem < 0){
				if(base.options.rewindNav === true){
					base.currentItem = base.maximumItem;
					speed = "rewind"
				} else {
					base.currentItem =0;
					return false;
				}
			}
			base.goTo(base.currentItem,speed);
		},

		goTo : function(position,speed,drag){
			var base = this;

			if(base.isTransition){
				return false;
			}
			if(typeof base.options.beforeMove === "function") {
				base.options.beforeMove.apply(this,[base.$elem]);
			}
			if(position >= base.maximumItem){
				position = base.maximumItem;
			}
			else if( position <= 0 ){
				position = 0;
			}

			base.currentItem = base.owl.currentItem = position;
			if( base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true){
				base.swapSpeed(0)
				if(base.browser.support3d === true){
					base.transition3d(base.positionsInArray[position]);
				} else {
					base.css2slide(base.positionsInArray[position],1);
				}
				base.afterGo();
				base.singleItemTransition();
				
				return false;
			}
			var goToPixel = base.positionsInArray[position];

			if(base.browser.support3d === true){
				base.isCss3Finish = false;

				if(speed === true){
					base.swapSpeed("paginationSpeed");
					setTimeout(function() {
						base.isCss3Finish = true;
					}, base.options.paginationSpeed);

				} else if(speed === "rewind" ){
					base.swapSpeed(base.options.rewindSpeed);
					setTimeout(function() {
						base.isCss3Finish = true;
					}, base.options.rewindSpeed);

				} else {
					base.swapSpeed("slideSpeed");
					setTimeout(function() {
						base.isCss3Finish = true;
					}, base.options.slideSpeed);
				}
				base.transition3d(goToPixel);
			} else {
				if(speed === true){
					base.css2slide(goToPixel, base.options.paginationSpeed);
				} else if(speed === "rewind" ){
					base.css2slide(goToPixel, base.options.rewindSpeed);
				} else {
					base.css2slide(goToPixel, base.options.slideSpeed);
				}
			}
			base.afterGo();
		},

		jumpTo : function(position){
			var base = this;
			if(typeof base.options.beforeMove === "function") {
				base.options.beforeMove.apply(this,[base.$elem]);
			}
			if(position >= base.maximumItem || position === -1){
				position = base.maximumItem;
			}
			else if( position <= 0 ){
				position = 0;
			}
			base.swapSpeed(0)
			if(base.browser.support3d === true){
				base.transition3d(base.positionsInArray[position]);
			} else {
				base.css2slide(base.positionsInArray[position],1);
			}
			base.currentItem = base.owl.currentItem = position;
			base.afterGo();
		},

		afterGo : function(){
			var base = this;

			base.prevArr.push(base.currentItem);
			base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length -2];
			base.prevArr.shift(0)

			if(base.prevItem !== base.currentItem){
				base.checkPagination();
				base.checkNavigation();
				base.eachMoveUpdate();

				if(base.options.autoPlay !== false){
					base.checkAp();
				}
			}
			if(typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
				base.options.afterMove.apply(this,[base.$elem]);
			}
		},

		stop : function(){
			var base = this;
			base.apStatus = "stop";
			clearInterval(base.autoPlayInterval);
		},

		checkAp : function(){
			var base = this;
			if(base.apStatus !== "stop"){
				base.play();
			}
		},

		play : function(){
			var base = this;
			base.apStatus = "play";
			if(base.options.autoPlay === false){
				return false;
			}
			clearInterval(base.autoPlayInterval);
			base.autoPlayInterval = setInterval(function(){
				base.next(true);
			},base.options.autoPlay);
		},

		swapSpeed : function(action){
			var base = this;
			if(action === "slideSpeed"){
				base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
			} else if(action === "paginationSpeed" ){
				base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
			} else if(typeof action !== "string"){
				base.$owlWrapper.css(base.addCssSpeed(action));
			}
		},

		addCssSpeed : function(speed){
			var base = this;
			return {
				"-webkit-transition": "all "+ speed +"ms ease",
				"-moz-transition": "all "+ speed +"ms ease",
				"-o-transition": "all "+ speed +"ms ease",
				"transition": "all "+ speed +"ms ease"
			};
		},

		removeTransition : function(){
			return {
				"-webkit-transition": "",
				"-moz-transition": "",
				"-o-transition": "",
				"transition": ""
			};
		},

		doTranslate : function(pixels){
			return {
				"-webkit-transform": "translate3d("+pixels+"px, 0px, 0px)",
				"-moz-transform": "translate3d("+pixels+"px, 0px, 0px)",
				"-o-transform": "translate3d("+pixels+"px, 0px, 0px)",
				"-ms-transform": "translate3d("+pixels+"px, 0px, 0px)",
				"transform": "translate3d("+pixels+"px, 0px,0px)"
			};
		},

		transition3d : function(value){
			var base = this;
			base.$owlWrapper.css(base.doTranslate(value));
		},

		css2move : function(value){
			var base = this;
			base.$owlWrapper.css({"left" : value})
		},

		css2slide : function(value,speed){
			var base = this;

			base.isCssFinish = false;
			base.$owlWrapper.stop(true,true).animate({
				"left" : value
			}, {
				duration : speed || base.options.slideSpeed ,
				complete : function(){
					base.isCssFinish = true;
				}
			});
		},

		checkBrowser : function(){
			var base = this;

			//Check 3d support
			var	translate3D = "translate3d(0px, 0px, 0px)",
				tempElem = document.createElement("div");

			tempElem.style.cssText= "  -moz-transform:"    + translate3D +
								  "; -ms-transform:"     + translate3D +
								  "; -o-transform:"      + translate3D +
								  "; -webkit-transform:" + translate3D +
								  "; transform:"         + translate3D;
			var	regex = /translate3d\(0px, 0px, 0px\)/g,
				asSupport = tempElem.style.cssText.match(regex),
				support3d = (asSupport !== null && asSupport.length === 1);

			var isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

			base.browser = {
				"support3d" : support3d,
				"isTouch" : isTouch
			}
		},

		moveEvents : function(){
			var base = this;
			if(base.options.mouseDrag !== false || base.options.touchDrag !== false){
				base.gestures();
				base.disabledEvents();
			}
		},

		eventTypes : function(){
			var base = this;
			var types = ["s","e","x"];

			base.ev_types = {};

			if(base.options.mouseDrag === true && base.options.touchDrag === true){
				types = [
					"touchstart.owl mousedown.owl",
					"touchmove.owl mousemove.owl",
					"touchend.owl touchcancel.owl mouseup.owl"
				];
			} else if(base.options.mouseDrag === false && base.options.touchDrag === true){
				types = [
					"touchstart.owl",
					"touchmove.owl",
					"touchend.owl touchcancel.owl"
				];
			} else if(base.options.mouseDrag === true && base.options.touchDrag === false){
				types = [
					"mousedown.owl",
					"mousemove.owl",
					"mouseup.owl"
				];
			}

			base.ev_types["start"] = types[0];
			base.ev_types["move"] = types[1];
			base.ev_types["end"] = types[2];
		},

		disabledEvents :  function(){
			var base = this;
			base.$elem.on("dragstart.owl", function(event) { event.preventDefault();});
			base.$elem.on("mousedown.disableTextSelect", function(e) {
				return $(e.target).is('input, textarea, select, option');
			});
		},

		gestures : function(){
			var base = this;

			var locals = {
				offsetX : 0,
				offsetY : 0,
				baseElWidth : 0,
				relativePos : 0,
				position: null,
				minSwipe : null,
				maxSwipe: null,
				sliding : null,
				dargging: null,
				targetElement : null
			}

			base.isCssFinish = true;

			function getTouches(event){
				if(event.touches){
					return {
						x : event.touches[0].pageX,
						y : event.touches[0].pageY
					}
				} else {
					if(event.pageX !== undefined){
						return {
							x : event.pageX,
							y : event.pageY
						}
					} else {
						return {
							x : event.clientX,
							y : event.clientY
						}
					}
				}
			}

			function swapEvents(type){
				if(type === "on"){
					$(document).on(base.ev_types["move"], dragMove);
					$(document).on(base.ev_types["end"], dragEnd);
				} else if(type === "off"){
					$(document).off(base.ev_types["move"]);
					$(document).off(base.ev_types["end"]);
				}
			}

			function dragStart(event) {
				var event = event.originalEvent || event || window.event;

				if (event.which === 3) {
					return false;
				}
				if(base.itemsAmount <= base.options.items){
					return;
				}
				if(base.isCssFinish === false && !base.options.dragBeforeAnimFinish ){
					return false;
				}
				if(base.isCss3Finish === false && !base.options.dragBeforeAnimFinish ){
					return false;
				}

				if(base.options.autoPlay !== false){
					clearInterval(base.autoPlayInterval);
				}

				if(base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")){
					base.$owlWrapper.addClass("grabbing")
				}

				base.newPosX = 0;
				base.newRelativeX = 0;

				$(this).css(base.removeTransition());

				var position = $(this).position();
				locals.relativePos = position.left;
				
				locals.offsetX = getTouches(event).x - position.left;
				locals.offsetY = getTouches(event).y - position.top;

				swapEvents("on");

				locals.sliding = false;
				locals.targetElement = event.target || event.srcElement;
			}

			function dragMove(event){
				var event = event.originalEvent || event || window.event;

				base.newPosX = getTouches(event).x- locals.offsetX;
				base.newPosY = getTouches(event).y - locals.offsetY;
				base.newRelativeX = base.newPosX - locals.relativePos;	

				if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
					locals.dragging = true;
					base.options.startDragging.apply(base,[base.$elem]);
				}

				if(base.newRelativeX > 8 || base.newRelativeX < -8 && base.browser.isTouch === true){
					event.preventDefault ? event.preventDefault() : event.returnValue = false;
					locals.sliding = true;
				}

				if((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false){
					$(document).off("touchmove.owl");
				}

				var minSwipe = function(){
					return  base.newRelativeX / 5;
				}
				var maxSwipe = function(){
					return  base.maximumPixels + base.newRelativeX / 5;
				}

				base.newPosX = Math.max(Math.min( base.newPosX, minSwipe() ), maxSwipe() );
				if(base.browser.support3d === true){
					base.transition3d(base.newPosX);
				} else {
					base.css2move(base.newPosX);
				}
			}

			function dragEnd(event){
				var event = event.originalEvent || event || window.event;
				event.target = event.target || event.srcElement;

				locals.dragging = false;

				if(base.browser.isTouch !== true){
					base.$owlWrapper.removeClass("grabbing");
				}

				if(base.newRelativeX<0){
					base.dragDirection = base.owl.dragDirection = "left"
				} else {
					base.dragDirection = base.owl.dragDirection = "right"
				}

				if(base.newRelativeX !== 0){
					var newPosition = base.getNewPosition();
					base.goTo(newPosition,false,"drag");
					if(locals.targetElement === event.target && base.browser.isTouch !== true){
						$(event.target).on("click.disable", function(ev){
							ev.stopImmediatePropagation();
							ev.stopPropagation();
							ev.preventDefault();
							$(event.target).off("click.disable");
						});
						var handlers = $._data(event.target, "events")["click"];
						var owlStopEvent = handlers.pop();
						handlers.splice(0, 0, owlStopEvent);
					}
				}
				swapEvents("off");
			}
			base.$elem.on(base.ev_types["start"], ".owl-wrapper", dragStart); 
		},

		getNewPosition : function(){
			var base = this,
				newPosition;
			
			newPosition = base.closestItem();

			if(newPosition>base.maximumItem){
				base.currentItem = base.maximumItem;
				newPosition  = base.maximumItem;
			} else if( base.newPosX >=0 ){
				newPosition = 0;
				base.currentItem = 0;
			}
			return newPosition;
		},
		closestItem : function(){
			var base = this,
				array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
				goal = base.newPosX,
				closest = null;

			$.each(array, function(i,v){
				if( goal - (base.itemWidth/20) > array[i+1] && goal - (base.itemWidth/20)< v && base.moveDirection() === "left") {
					closest = v;
					if(base.options.scrollPerPage === true){
						base.currentItem = $.inArray(closest, base.positionsInArray);
					} else {
						base.currentItem = i;
					}
				} 
				else if (goal + (base.itemWidth/20) < v && goal + (base.itemWidth/20) > (array[i+1] || array[i]-base.itemWidth) && base.moveDirection() === "right"){
					if(base.options.scrollPerPage === true){
						closest = array[i+1] || array[array.length-1];
						base.currentItem = $.inArray(closest, base.positionsInArray);
					} else {
						closest = array[i+1];
						base.currentItem = i+1;
					}
				}
			});
			return base.currentItem;
		},

		moveDirection : function(){
			var base = this,
				direction;
			if(base.newRelativeX < 0 ){
				direction = "right"
				base.playDirection = "next"
			} else {
				direction = "left"
				base.playDirection = "prev"
			}
			return direction
		},

		customEvents : function(){
			var base = this;
			base.$elem.on("owl.next",function(){
				base.next();
			});
			base.$elem.on("owl.prev",function(){
				base.prev();
			});
			base.$elem.on("owl.play",function(event,speed){
				base.options.autoPlay = speed;
				base.play();
				base.hoverStatus = "play";
			});
			base.$elem.on("owl.stop",function(){
				base.stop();
				base.hoverStatus = "stop";
			});
			base.$elem.on("owl.goTo",function(event,item){
				base.goTo(item)
			});
			base.$elem.on("owl.jumpTo",function(event,item){
				base.jumpTo(item)
			});
		},
		
		stopOnHover : function(){
			var base = this;
			if(base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false){
				base.$elem.on("mouseover", function(){
					base.stop();
				});
				base.$elem.on("mouseout", function(){
					if(base.hoverStatus !== "stop"){
						base.play();
					}
				});
			}
		},

		lazyLoad : function(){
			var base = this;

			if(base.options.lazyLoad === false){
				return false;
			}
			for(var i=0; i<base.itemsAmount; i++){
				var $item = $(base.$owlItems[i]);

				if($item.data("owl-loaded") === "loaded"){
					continue;
				}

				var	itemNumber = $item.data("owl-item"),
					$lazyImg = $item.find(".lazyOwl"),
					follow;

				if( typeof $lazyImg.data("src") !== "string"){
					$item.data("owl-loaded","loaded");
					continue;
				}				
				if($item.data("owl-loaded") === undefined){
					$lazyImg.hide();
					$item.addClass("loading").data("owl-loaded","checked");
				}
				if(base.options.lazyFollow === true){
					follow = itemNumber >= base.currentItem;
				} else {
					follow = true;
				}
				if(follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length){
					base.lazyPreload($item,$lazyImg);
				}
			}
		},

		lazyPreload : function($item,$lazyImg){
			var base = this,
				iterations = 0;
				if ($lazyImg.prop("tagName") === "DIV") {
					$lazyImg.css("background-image", "url(" + $lazyImg.data("src")+ ")" );
					var isBackgroundImg=true;
				} else {
					$lazyImg[0].src = $lazyImg.data("src");
				}
				checkLazyImage();

			function checkLazyImage(){
				iterations += 1;
				if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
					showImage();
				} else if(iterations <= 100){//if image loads in less than 10 seconds 
					setTimeout(checkLazyImage,100);
				} else {
					showImage();
				}
			}
			function showImage(){
				$item.data("owl-loaded", "loaded").removeClass("loading");
				$lazyImg.removeAttr("data-src");
				base.options.lazyEffect === "fade" ? $lazyImg.fadeIn(400) : $lazyImg.show();
				if(typeof base.options.afterLazyLoad === "function") {
					base.options.afterLazyLoad.apply(this,[base.$elem]);
				}
			}
		},

		autoHeight : function(){
			var base = this;
			var $currentimg = $(base.$owlItems[base.currentItem]).find("img");

			if($currentimg.get(0) !== undefined ){
				var iterations = 0;
				checkImage();
			} else {
				addHeight();
			}
			function checkImage(){
				iterations += 1;
				if ( base.completeImg($currentimg.get(0)) ) {
					addHeight();
				} else if(iterations <= 100){ //if image loads in less than 10 seconds 
					setTimeout(checkImage,100);
				} else {
					base.wrapperOuter.css("height", ""); //Else remove height attribute
				}
			}

			function addHeight(){
				var $currentItem = $(base.$owlItems[base.currentItem]).height();
				base.wrapperOuter.css("height",$currentItem+"px");
				if(!base.wrapperOuter.hasClass("autoHeight")){
					setTimeout(function(){
						base.wrapperOuter.addClass("autoHeight");
					},0);
				}
			}
		},

		completeImg : function(img) {
		    if (!img.complete) {
		        return false;
		    }
		    if (typeof img.naturalWidth !== "undefined" && img.naturalWidth == 0) {
		        return false;
		    }
		    return true;
		},

		onVisibleItems : function(){
			var base = this;

			if(base.options.addClassActive === true){
				base.$owlItems.removeClass("active");
			}
			base.visibleItems = [];
			for(var i=base.currentItem; i<base.currentItem + base.options.items; i++){
				base.visibleItems.push(i);

				if(base.options.addClassActive === true){
					$(base.$owlItems[i]).addClass("active");
				}
			}
			base.owl.visibleItems = base.visibleItems;
		},

		transitionTypes : function(className){
			var base = this;
			//Currently available: "fade","backSlide","goDown","fadeUp"
			base.outClass = "owl-"+className+"-out";
			base.inClass = "owl-"+className+"-in";
		},

		singleItemTransition : function(){
			var base = this;
			base.isTransition = true;

			var outClass = base.outClass,
				inClass = base.inClass,
				$currentItem = base.$owlItems.eq(base.currentItem),
				$prevItem = base.$owlItems.eq(base.prevItem),
				prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
				origin = Math.abs(base.positionsInArray[base.currentItem])+base.itemWidth/2;

            base.$owlWrapper
	            .addClass('owl-origin')
	            .css({
	            	"-webkit-transform-origin" : origin+"px",
	            	"-moz-perspective-origin" : origin+"px",
	            	"perspective-origin" : origin+"px"
	            });
	        function transStyles(prevPos,zindex){
				return {
					"position" : "relative",
					"left" : prevPos+"px"
				};
			}

	        var animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

			$prevItem
			.css(transStyles(prevPos,10))
			.addClass(outClass)
			.on(animEnd, function() {
				base.endPrev = true;
				$prevItem.off(animEnd);
		    	base.clearTransStyle($prevItem,outClass);
			});

			$currentItem
			.addClass(inClass)
			.on(animEnd, function() {
				base.endCurrent = true;
				$currentItem.off(animEnd);
		    	base.clearTransStyle($currentItem,inClass);
		    });
		},

		clearTransStyle : function(item,classToRemove){
			var base = this;
			item.css({
					"position" : "",
					"left" : ""
				})
				.removeClass(classToRemove);
			if(base.endPrev && base.endCurrent){
				base.$owlWrapper.removeClass('owl-origin');
				base.endPrev = false;
				base.endCurrent = false;
				base.isTransition = false;
			}
		},

		owlStatus : function(){
			var base = this;
			base.owl = {
				"userOptions"	: base.userOptions,
				"baseElement" 	: base.$elem,
				"userItems"		: base.$userItems,
				"owlItems"		: base.$owlItems,
				"currentItem"	: base.currentItem,
				"prevItem"		: base.prevItem,
				"visibleItems"	: base.visibleItems,
				"isTouch" 		: base.browser.isTouch,
				"browser"		: base.browser,
				"dragDirection" : base.dragDirection
			}
		},

		clearEvents : function(){
			var base = this;
			base.$elem.off(".owl owl mousedown.disableTextSelect");
			$(document).off(".owl owl");
			$(window).off("resize", base.resizer);
		},

		unWrap : function(){
			var base = this;
			if(base.$elem.children().length !== 0){
				base.$owlWrapper.unwrap();
				base.$userItems.unwrap().unwrap();
				if(base.owlControls){
					base.owlControls.remove();
				}
			}
			base.clearEvents();
			base.$elem
				.attr("style", base.$elem.data("owl-originalStyles") || "")
				.attr("class", base.$elem.data("owl-originalClasses"));
		},

		destroy : function(){
			var base = this;
			base.stop();
			clearInterval(base.checkVisible);
			base.unWrap();
			base.$elem.removeData();
		},

		reinit : function(newOptions){
			var base = this;
			var options = $.extend({}, base.userOptions, newOptions);
		 	base.unWrap();
		 	base.init(options,base.$elem);
		},

		addItem : function(htmlString,targetPosition){
			var base = this,
				position;

			if(!htmlString){return false}

			if(base.$elem.children().length === 0){
				base.$elem.append(htmlString);
				base.setVars();
				return false;
			}
			base.unWrap();
			if(targetPosition === undefined || targetPosition === -1){
				position = -1;
			} else {
				position = targetPosition;
			}
			if(position >= base.$userItems.length || position === -1){
				base.$userItems.eq(-1).after(htmlString)
			} else {
				base.$userItems.eq(position).before(htmlString)
			}

			base.setVars();
		},

		removeItem : function(targetPosition){
			var base = this,
				position;

			if(base.$elem.children().length === 0){return false}
			
			if(targetPosition === undefined || targetPosition === -1){
				position = -1;
			} else {
				position = targetPosition;
			}

			base.unWrap();
			base.$userItems.eq(position).remove();
			base.setVars();
		}

	};

	$.fn.owlCarousel = function( options ){
		return this.each(function() {
			if($(this).data("owl-init") === true){
				return false;
			}
			$(this).data("owl-init", true);
			var carousel = Object.create( Carousel );
			carousel.init( options, this );
			$.data( this, "owlCarousel", carousel );
		});
	};

	$.fn.owlCarousel.options = {

		items : 5,
		itemsCustom : false,
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,3],
		itemsTablet : [768,2],
		itemsTabletSmall : false,
		itemsMobile : [479,1],
		singleItem : false,
		itemsScaleUp : false,

		slideSpeed : 200,
		paginationSpeed : 800,
		rewindSpeed : 1000,

		autoPlay : false,
		stopOnHover : false,

		navigation : false,
		navigationText : ["prev","next"],
		rewindNav : true,
		scrollPerPage : false,

		pagination : true,
		paginationNumbers : false,

		responsive : true,
		responsiveRefreshRate : 200,
		responsiveBaseWidth	: window,
		

		baseClass : "owl-carousel",
		theme : "owl-theme",

		lazyLoad : false,
		lazyFollow : true,
		lazyEffect : "fade",

		autoHeight : false,

		jsonPath : false,
		jsonSuccess : false,

		dragBeforeAnimFinish : true,
		mouseDrag : true,
		touchDrag : true,

		addClassActive : false,
		transitionStyle : false,

		beforeUpdate : false,
		afterUpdate : false,
		beforeInit : false,
		afterInit : false,
		beforeMove : false,
		afterMove : false,
		afterAction : false,
		startDragging : false,
		afterLazyLoad: false
		
	};
})( jQuery, window, document );

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJvd2wuY2Fyb3VzZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqXHRqUXVlcnkgT3dsQ2Fyb3VzZWwgdjEuMzFcbiAqXG4gKlx0Q29weXJpZ2h0IChjKSAyMDEzIEJhcnRvc3ogV29qY2llY2hvd3NraVxuICpcdGh0dHA6Ly93d3cub3dsZ3JhcGhpYy5jb20vb3dsY2Fyb3VzZWwvXG4gKlxuICpcdExpY2Vuc2VkIHVuZGVyIE1JVFxuICpcbiAqL1xuXG5pZiAoIHR5cGVvZiBPYmplY3QuY3JlYXRlICE9PSBcImZ1bmN0aW9uXCIgKSB7XG5cdE9iamVjdC5jcmVhdGUgPSBmdW5jdGlvbiggb2JqICkge1xuXHRcdGZ1bmN0aW9uIEYoKSB7fTtcblx0XHRGLnByb3RvdHlwZSA9IG9iajtcblx0XHRyZXR1cm4gbmV3IEYoKTtcblx0fTtcbn1cbihmdW5jdGlvbiggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXG5cdHZhciBDYXJvdXNlbCA9IHtcblx0XHRpbml0IDpmdW5jdGlvbihvcHRpb25zLCBlbCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cblx0XHRcdGJhc2UuJGVsZW0gPSAkKGVsKTtcblxuXHRcdFx0Ly8gb3B0aW9ucyBwYXNzZWQgdmlhIGpzIG92ZXJyaWRlIG9wdGlvbnMgcGFzc2VkIHZpYSBkYXRhIGF0dHJpYnV0ZXNcblx0XHRcdGJhc2Uub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLmZuLm93bENhcm91c2VsLm9wdGlvbnMsIGJhc2UuJGVsZW0uZGF0YSgpLCBvcHRpb25zKTtcblxuXHRcdFx0YmFzZS51c2VyT3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0XHRiYXNlLmxvYWRDb250ZW50KCk7XG5cdFx0fSxcblxuXHRcdGxvYWRDb250ZW50IDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblxuXHRcdFx0aWYgKHR5cGVvZiBiYXNlLm9wdGlvbnMuYmVmb3JlSW5pdCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdGJhc2Uub3B0aW9ucy5iZWZvcmVJbml0LmFwcGx5KHRoaXMsW2Jhc2UuJGVsZW1dKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBiYXNlLm9wdGlvbnMuanNvblBhdGggPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0dmFyIHVybCA9IGJhc2Uub3B0aW9ucy5qc29uUGF0aDtcblxuXHRcdFx0XHRmdW5jdGlvbiBnZXREYXRhKGRhdGEpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGJhc2Uub3B0aW9ucy5qc29uU3VjY2VzcyA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRiYXNlLm9wdGlvbnMuanNvblN1Y2Nlc3MuYXBwbHkodGhpcyxbZGF0YV0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2YXIgY29udGVudCA9IFwiXCI7XG5cdFx0XHRcdFx0XHRmb3IodmFyIGkgaW4gZGF0YVtcIm93bFwiXSl7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gZGF0YVtcIm93bFwiXVtpXVtcIml0ZW1cIl07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRiYXNlLiRlbGVtLmh0bWwoY29udGVudCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJhc2UubG9nSW4oKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkLmdldEpTT04odXJsLGdldERhdGEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YmFzZS5sb2dJbigpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRsb2dJbiA6IGZ1bmN0aW9uKGFjdGlvbil7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cblx0XHRcdGJhc2UuJGVsZW0uZGF0YShcIm93bC1vcmlnaW5hbFN0eWxlc1wiLCBiYXNlLiRlbGVtLmF0dHIoXCJzdHlsZVwiKSlcblx0XHRcdFx0XHQgIC5kYXRhKFwib3dsLW9yaWdpbmFsQ2xhc3Nlc1wiLCBiYXNlLiRlbGVtLmF0dHIoXCJjbGFzc1wiKSk7XG5cblx0XHRcdGJhc2UuJGVsZW0uY3NzKHtvcGFjaXR5OiAwfSk7XG5cdFx0XHRiYXNlLm9yaWduYWxJdGVtcyA9IGJhc2Uub3B0aW9ucy5pdGVtcztcblx0XHRcdGJhc2UuY2hlY2tCcm93c2VyKCk7XG5cdFx0XHRiYXNlLndyYXBwZXJXaWR0aCA9IDA7XG5cdFx0XHRiYXNlLmNoZWNrVmlzaWJsZTtcblx0XHRcdGJhc2Uuc2V0VmFycygpO1xuXHRcdH0sXG5cblx0XHRzZXRWYXJzIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdGlmKGJhc2UuJGVsZW0uY2hpbGRyZW4oKS5sZW5ndGggPT09IDApe3JldHVybiBmYWxzZX1cblx0XHRcdGJhc2UuYmFzZUNsYXNzKCk7XG5cdFx0XHRiYXNlLmV2ZW50VHlwZXMoKTtcblx0XHRcdGJhc2UuJHVzZXJJdGVtcyA9IGJhc2UuJGVsZW0uY2hpbGRyZW4oKTtcblx0XHRcdGJhc2UuaXRlbXNBbW91bnQgPSBiYXNlLiR1c2VySXRlbXMubGVuZ3RoO1xuXHRcdFx0YmFzZS53cmFwSXRlbXMoKTtcblx0XHRcdGJhc2UuJG93bEl0ZW1zID0gYmFzZS4kZWxlbS5maW5kKFwiLm93bC1pdGVtXCIpO1xuXHRcdFx0YmFzZS4kb3dsV3JhcHBlciA9IGJhc2UuJGVsZW0uZmluZChcIi5vd2wtd3JhcHBlclwiKTtcblx0XHRcdGJhc2UucGxheURpcmVjdGlvbiA9IFwibmV4dFwiO1xuXHRcdFx0YmFzZS5wcmV2SXRlbSA9IDA7XG5cdFx0XHRiYXNlLnByZXZBcnIgPSBbMF07XG5cdFx0XHRiYXNlLmN1cnJlbnRJdGVtID0gMDtcblx0XHRcdGJhc2UuY3VzdG9tRXZlbnRzKCk7XG5cdFx0XHRiYXNlLm9uU3RhcnR1cCgpO1xuXHRcdH0sXG5cblx0XHRvblN0YXJ0dXAgOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXHRcdFx0YmFzZS51cGRhdGVJdGVtcygpO1xuXHRcdFx0YmFzZS5jYWxjdWxhdGVBbGwoKTtcblx0XHRcdGJhc2UuYnVpbGRDb250cm9scygpO1xuXHRcdFx0YmFzZS51cGRhdGVDb250cm9scygpO1xuXHRcdFx0YmFzZS5yZXNwb25zZSgpO1xuXHRcdFx0YmFzZS5tb3ZlRXZlbnRzKCk7XG5cdFx0XHRiYXNlLnN0b3BPbkhvdmVyKCk7XG5cdFx0XHRiYXNlLm93bFN0YXR1cygpO1xuXG5cdFx0XHRpZihiYXNlLm9wdGlvbnMudHJhbnNpdGlvblN0eWxlICE9PSBmYWxzZSl7XG5cdFx0XHRcdGJhc2UudHJhbnNpdGlvblR5cGVzKGJhc2Uub3B0aW9ucy50cmFuc2l0aW9uU3R5bGUpO1xuXHRcdFx0fVxuXHRcdFx0aWYoYmFzZS5vcHRpb25zLmF1dG9QbGF5ID09PSB0cnVlKXtcblx0XHRcdFx0YmFzZS5vcHRpb25zLmF1dG9QbGF5ID0gNTAwMDtcblx0XHRcdH1cblx0XHRcdGJhc2UucGxheSgpO1xuXG5cdFx0XHRiYXNlLiRlbGVtLmZpbmQoXCIub3dsLXdyYXBwZXJcIikuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIilcblxuXHRcdFx0aWYoIWJhc2UuJGVsZW0uaXMoXCI6dmlzaWJsZVwiKSl7XG5cdFx0XHRcdGJhc2Uud2F0Y2hWaXNpYmlsaXR5KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRiYXNlLiRlbGVtLmNzcyhcIm9wYWNpdHlcIiwxKTtcblx0XHRcdH1cblx0XHRcdGJhc2Uub25zdGFydHVwID0gZmFsc2U7XG5cdFx0XHRiYXNlLmVhY2hNb3ZlVXBkYXRlKCk7XG5cdFx0XHRpZiAodHlwZW9mIGJhc2Uub3B0aW9ucy5hZnRlckluaXQgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRiYXNlLm9wdGlvbnMuYWZ0ZXJJbml0LmFwcGx5KHRoaXMsW2Jhc2UuJGVsZW1dKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0ZWFjaE1vdmVVcGRhdGUgOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXG5cdFx0XHRpZihiYXNlLm9wdGlvbnMubGF6eUxvYWQgPT09IHRydWUpe1xuXHRcdFx0XHRiYXNlLmxhenlMb2FkKCk7XG5cdFx0XHR9XG5cdFx0XHRpZihiYXNlLm9wdGlvbnMuYXV0b0hlaWdodCA9PT0gdHJ1ZSl7XG5cdFx0XHRcdGJhc2UuYXV0b0hlaWdodCgpO1xuXHRcdFx0fVxuXHRcdFx0YmFzZS5vblZpc2libGVJdGVtcygpO1xuXG5cdFx0XHRpZiAodHlwZW9mIGJhc2Uub3B0aW9ucy5hZnRlckFjdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdGJhc2Uub3B0aW9ucy5hZnRlckFjdGlvbi5hcHBseSh0aGlzLFtiYXNlLiRlbGVtXSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHVwZGF0ZVZhcnMgOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXHRcdFx0aWYodHlwZW9mIGJhc2Uub3B0aW9ucy5iZWZvcmVVcGRhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRiYXNlLm9wdGlvbnMuYmVmb3JlVXBkYXRlLmFwcGx5KHRoaXMsW2Jhc2UuJGVsZW1dKTtcblx0XHRcdH1cblx0XHRcdGJhc2Uud2F0Y2hWaXNpYmlsaXR5KCk7XG5cdFx0XHRiYXNlLnVwZGF0ZUl0ZW1zKCk7XG5cdFx0XHRiYXNlLmNhbGN1bGF0ZUFsbCgpO1xuXHRcdFx0YmFzZS51cGRhdGVQb3NpdGlvbigpO1xuXHRcdFx0YmFzZS51cGRhdGVDb250cm9scygpO1xuXHRcdFx0YmFzZS5lYWNoTW92ZVVwZGF0ZSgpO1xuXHRcdFx0aWYodHlwZW9mIGJhc2Uub3B0aW9ucy5hZnRlclVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdGJhc2Uub3B0aW9ucy5hZnRlclVwZGF0ZS5hcHBseSh0aGlzLFtiYXNlLiRlbGVtXSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHJlbG9hZCA6IGZ1bmN0aW9uKGVsZW1lbnRzKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0YmFzZS51cGRhdGVWYXJzKCk7XG5cdFx0XHR9LDApXG5cdFx0fSxcblxuXHRcdHdhdGNoVmlzaWJpbGl0eSA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cblx0XHRcdGlmKGJhc2UuJGVsZW0uaXMoXCI6dmlzaWJsZVwiKSA9PT0gZmFsc2Upe1xuXHRcdFx0XHRiYXNlLiRlbGVtLmNzcyh7b3BhY2l0eTogMH0pO1xuXHRcdFx0XHRjbGVhckludGVydmFsKGJhc2UuYXV0b1BsYXlJbnRlcnZhbCk7XG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwoYmFzZS5jaGVja1Zpc2libGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0YmFzZS5jaGVja1Zpc2libGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoYmFzZS4kZWxlbS5pcyhcIjp2aXNpYmxlXCIpKSB7XG5cdFx0XHRcdFx0YmFzZS5yZWxvYWQoKTtcblx0XHRcdFx0XHRiYXNlLiRlbGVtLmFuaW1hdGUoe29wYWNpdHk6IDF9LDIwMCk7XG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChiYXNlLmNoZWNrVmlzaWJsZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDUwMCk7XG5cdFx0fSxcblxuXHRcdHdyYXBJdGVtcyA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRiYXNlLiR1c2VySXRlbXMud3JhcEFsbChcIjxkaXYgY2xhc3M9XFxcIm93bC13cmFwcGVyXFxcIj5cIikud3JhcChcIjxkaXYgY2xhc3M9XFxcIm93bC1pdGVtXFxcIj48L2Rpdj5cIik7XG5cdFx0XHRiYXNlLiRlbGVtLmZpbmQoXCIub3dsLXdyYXBwZXJcIikud3JhcChcIjxkaXYgY2xhc3M9XFxcIm93bC13cmFwcGVyLW91dGVyXFxcIj5cIik7XG5cdFx0XHRiYXNlLndyYXBwZXJPdXRlciA9IGJhc2UuJGVsZW0uZmluZChcIi5vd2wtd3JhcHBlci1vdXRlclwiKTtcblx0XHRcdGJhc2UuJGVsZW0uY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG5cdFx0fSxcblxuXHRcdGJhc2VDbGFzcyA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHR2YXIgaGFzQmFzZUNsYXNzID0gYmFzZS4kZWxlbS5oYXNDbGFzcyhiYXNlLm9wdGlvbnMuYmFzZUNsYXNzKTtcblx0XHRcdHZhciBoYXNUaGVtZUNsYXNzID0gYmFzZS4kZWxlbS5oYXNDbGFzcyhiYXNlLm9wdGlvbnMudGhlbWUpO1xuXG5cdFx0XHRpZighaGFzQmFzZUNsYXNzKXtcblx0XHRcdFx0YmFzZS4kZWxlbS5hZGRDbGFzcyhiYXNlLm9wdGlvbnMuYmFzZUNsYXNzKTtcblx0XHRcdH1cblxuXHRcdFx0aWYoIWhhc1RoZW1lQ2xhc3Mpe1xuXHRcdFx0XHRiYXNlLiRlbGVtLmFkZENsYXNzKGJhc2Uub3B0aW9ucy50aGVtZSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUl0ZW1zIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblxuXHRcdFx0aWYoYmFzZS5vcHRpb25zLnJlc3BvbnNpdmUgPT09IGZhbHNlKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYoYmFzZS5vcHRpb25zLnNpbmdsZUl0ZW0gPT09IHRydWUpe1xuXHRcdFx0XHRiYXNlLm9wdGlvbnMuaXRlbXMgPSBiYXNlLm9yaWduYWxJdGVtcyA9IDE7XG5cdFx0XHRcdGJhc2Uub3B0aW9ucy5pdGVtc0N1c3RvbSA9IGZhbHNlO1xuXHRcdFx0XHRiYXNlLm9wdGlvbnMuaXRlbXNEZXNrdG9wID0gZmFsc2U7XG5cdFx0XHRcdGJhc2Uub3B0aW9ucy5pdGVtc0Rlc2t0b3BTbWFsbCA9IGZhbHNlO1xuXHRcdFx0XHRiYXNlLm9wdGlvbnMuaXRlbXNUYWJsZXQgPSBmYWxzZTtcblx0XHRcdFx0YmFzZS5vcHRpb25zLml0ZW1zVGFibGV0U21hbGwgPSBmYWxzZTtcblx0XHRcdFx0YmFzZS5vcHRpb25zLml0ZW1zTW9iaWxlID0gZmFsc2U7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHdpZHRoID0gJChiYXNlLm9wdGlvbnMucmVzcG9uc2l2ZUJhc2VXaWR0aCkud2lkdGgoKTtcblxuXHRcdFx0aWYod2lkdGggPiAoYmFzZS5vcHRpb25zLml0ZW1zRGVza3RvcFswXSB8fCBiYXNlLm9yaWduYWxJdGVtcykgKXtcblx0XHRcdFx0YmFzZS5vcHRpb25zLml0ZW1zID0gYmFzZS5vcmlnbmFsSXRlbXM7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHR5cGVvZihiYXNlLm9wdGlvbnMuaXRlbXNDdXN0b20pICE9PSAndW5kZWZpbmVkJyAmJiBiYXNlLm9wdGlvbnMuaXRlbXNDdXN0b20gIT09IGZhbHNlKXtcblx0XHRcdFx0Ly9SZW9yZGVyIGFycmF5IGJ5IHNjcmVlbiBzaXplXG5cdFx0XHRcdGJhc2Uub3B0aW9ucy5pdGVtc0N1c3RvbS5zb3J0KGZ1bmN0aW9uKGEsYil7cmV0dXJuIGFbMF0tYlswXTt9KTtcblx0XHRcdFx0Zm9yKHZhciBpIGluIGJhc2Uub3B0aW9ucy5pdGVtc0N1c3RvbSl7XG5cdFx0XHRcdFx0aWYodHlwZW9mKGJhc2Uub3B0aW9ucy5pdGVtc0N1c3RvbVtpXSkgIT09ICd1bmRlZmluZWQnICYmIGJhc2Uub3B0aW9ucy5pdGVtc0N1c3RvbVtpXVswXSA8PSB3aWR0aCl7XG5cdFx0XHRcdFx0XHRiYXNlLm9wdGlvbnMuaXRlbXMgPSBiYXNlLm9wdGlvbnMuaXRlbXNDdXN0b21baV1bMV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGlmKHdpZHRoIDw9IGJhc2Uub3B0aW9ucy5pdGVtc0Rlc2t0b3BbMF0gJiYgYmFzZS5vcHRpb25zLml0ZW1zRGVza3RvcCAhPT0gZmFsc2Upe1xuXHRcdFx0XHRcdGJhc2Uub3B0aW9ucy5pdGVtcyA9IGJhc2Uub3B0aW9ucy5pdGVtc0Rlc2t0b3BbMV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZih3aWR0aCA8PSBiYXNlLm9wdGlvbnMuaXRlbXNEZXNrdG9wU21hbGxbMF0gJiYgYmFzZS5vcHRpb25zLml0ZW1zRGVza3RvcFNtYWxsICE9PSBmYWxzZSl7XG5cdFx0XHRcdFx0YmFzZS5vcHRpb25zLml0ZW1zID0gYmFzZS5vcHRpb25zLml0ZW1zRGVza3RvcFNtYWxsWzFdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYod2lkdGggPD0gYmFzZS5vcHRpb25zLml0ZW1zVGFibGV0WzBdICAmJiBiYXNlLm9wdGlvbnMuaXRlbXNUYWJsZXQgIT09IGZhbHNlKXtcblx0XHRcdFx0XHRiYXNlLm9wdGlvbnMuaXRlbXMgPSBiYXNlLm9wdGlvbnMuaXRlbXNUYWJsZXRbMV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZih3aWR0aCA8PSBiYXNlLm9wdGlvbnMuaXRlbXNUYWJsZXRTbWFsbFswXSAgJiYgYmFzZS5vcHRpb25zLml0ZW1zVGFibGV0U21hbGwgIT09IGZhbHNlKXtcblx0XHRcdFx0XHRiYXNlLm9wdGlvbnMuaXRlbXMgPSBiYXNlLm9wdGlvbnMuaXRlbXNUYWJsZXRTbWFsbFsxXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKHdpZHRoIDw9IGJhc2Uub3B0aW9ucy5pdGVtc01vYmlsZVswXSAmJiBiYXNlLm9wdGlvbnMuaXRlbXNNb2JpbGUgIT09IGZhbHNlKXtcblx0XHRcdFx0XHRiYXNlLm9wdGlvbnMuaXRlbXMgPSBiYXNlLm9wdGlvbnMuaXRlbXNNb2JpbGVbMV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly9pZiBudW1iZXIgb2YgaXRlbXMgaXMgbGVzcyB0aGFuIGRlY2xhcmVkXG5cdFx0XHRpZihiYXNlLm9wdGlvbnMuaXRlbXMgPiBiYXNlLml0ZW1zQW1vdW50ICYmIGJhc2Uub3B0aW9ucy5pdGVtc1NjYWxlVXAgPT09IHRydWUpe1xuXHRcdFx0XHRiYXNlLm9wdGlvbnMuaXRlbXMgPSBiYXNlLml0ZW1zQW1vdW50O1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRyZXNwb25zZSA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXMsXG5cdFx0XHRcdHNtYWxsRGVsYXk7XG5cdFx0XHRpZihiYXNlLm9wdGlvbnMucmVzcG9uc2l2ZSAhPT0gdHJ1ZSl7XG5cdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0fVxuXHRcdFx0dmFyIGxhc3RXaW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0XHRiYXNlLnJlc2l6ZXIgPSBmdW5jdGlvbigpe1xuXHRcdFx0XHRpZigkKHdpbmRvdykud2lkdGgoKSAhPT0gbGFzdFdpbmRvd1dpZHRoKXtcblx0XHRcdFx0XHRpZihiYXNlLm9wdGlvbnMuYXV0b1BsYXkgIT09IGZhbHNlKXtcblx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoYmFzZS5hdXRvUGxheUludGVydmFsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHNtYWxsRGVsYXkpO1xuXHRcdFx0XHRcdHNtYWxsRGVsYXkgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRsYXN0V2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcblx0XHRcdFx0XHRcdGJhc2UudXBkYXRlVmFycygpO1xuXHRcdFx0XHRcdH0sYmFzZS5vcHRpb25zLnJlc3BvbnNpdmVSZWZyZXNoUmF0ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCQod2luZG93KS5yZXNpemUoYmFzZS5yZXNpemVyKVxuXHRcdH0sXG5cblx0XHR1cGRhdGVQb3NpdGlvbiA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRiYXNlLmp1bXBUbyhiYXNlLmN1cnJlbnRJdGVtKTtcblx0XHRcdGlmKGJhc2Uub3B0aW9ucy5hdXRvUGxheSAhPT0gZmFsc2Upe1xuXHRcdFx0XHRiYXNlLmNoZWNrQXAoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YXBwZW5kSXRlbXNTaXplcyA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cblx0XHRcdHZhciByb3VuZFBhZ2VzID0gMDtcblx0XHRcdHZhciBsYXN0SXRlbSA9IGJhc2UuaXRlbXNBbW91bnQgLSBiYXNlLm9wdGlvbnMuaXRlbXM7XG5cblx0XHRcdGJhc2UuJG93bEl0ZW1zLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHQkdGhpc1xuXHRcdFx0XHRcdC5jc3Moe1wid2lkdGhcIjogYmFzZS5pdGVtV2lkdGh9KVxuXHRcdFx0XHRcdC5kYXRhKFwib3dsLWl0ZW1cIixOdW1iZXIoaW5kZXgpKTtcblxuXHRcdFx0XHRpZihpbmRleCAlIGJhc2Uub3B0aW9ucy5pdGVtcyA9PT0gMCB8fCBpbmRleCA9PT0gbGFzdEl0ZW0pe1xuXHRcdFx0XHRcdGlmKCEoaW5kZXggPiBsYXN0SXRlbSkpe1xuXHRcdFx0XHRcdFx0cm91bmRQYWdlcyArPTE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR0aGlzLmRhdGEoXCJvd2wtcm91bmRQYWdlc1wiLHJvdW5kUGFnZXMpXG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0YXBwZW5kV3JhcHBlclNpemVzIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdHZhciB3aWR0aCA9IDA7XG5cblx0XHRcdHZhciB3aWR0aCA9IGJhc2UuJG93bEl0ZW1zLmxlbmd0aCAqIGJhc2UuaXRlbVdpZHRoO1xuXG5cdFx0XHRiYXNlLiRvd2xXcmFwcGVyLmNzcyh7XG5cdFx0XHRcdFwid2lkdGhcIjogd2lkdGgqMixcblx0XHRcdFx0XCJsZWZ0XCI6IDBcblx0XHRcdH0pO1xuXHRcdFx0YmFzZS5hcHBlbmRJdGVtc1NpemVzKCk7XG5cdFx0fSxcblxuXHRcdGNhbGN1bGF0ZUFsbCA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRiYXNlLmNhbGN1bGF0ZVdpZHRoKCk7XG5cdFx0XHRiYXNlLmFwcGVuZFdyYXBwZXJTaXplcygpO1xuXHRcdFx0YmFzZS5sb29wcygpO1xuXHRcdFx0YmFzZS5tYXgoKTtcblx0XHR9LFxuXG5cdFx0Y2FsY3VsYXRlV2lkdGggOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXHRcdFx0YmFzZS5pdGVtV2lkdGggPSBNYXRoLnJvdW5kKGJhc2UuJGVsZW0ud2lkdGgoKS9iYXNlLm9wdGlvbnMuaXRlbXMpXG5cdFx0fSxcblxuXHRcdG1heCA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHR2YXIgbWF4aW11bSA9ICgoYmFzZS5pdGVtc0Ftb3VudCAqIGJhc2UuaXRlbVdpZHRoKSAtIGJhc2Uub3B0aW9ucy5pdGVtcyAqIGJhc2UuaXRlbVdpZHRoKSAqIC0xO1xuXHRcdFx0aWYoYmFzZS5vcHRpb25zLml0ZW1zID4gYmFzZS5pdGVtc0Ftb3VudCl7XG5cdFx0XHRcdGJhc2UubWF4aW11bUl0ZW0gPSAwO1xuXHRcdFx0XHRtYXhpbXVtID0gMFxuXHRcdFx0XHRiYXNlLm1heGltdW1QaXhlbHMgPSAwO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YmFzZS5tYXhpbXVtSXRlbSA9IGJhc2UuaXRlbXNBbW91bnQgLSBiYXNlLm9wdGlvbnMuaXRlbXM7XG5cdFx0XHRcdGJhc2UubWF4aW11bVBpeGVscyA9IG1heGltdW07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF4aW11bTtcblx0XHR9LFxuXG5cdFx0bWluIDogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAwO1xuXHRcdH0sXG5cblx0XHRsb29wcyA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cblx0XHRcdGJhc2UucG9zaXRpb25zSW5BcnJheSA9IFswXTtcblx0XHRcdGJhc2UucGFnZXNJbkFycmF5ID0gW107XG5cdFx0XHR2YXIgcHJldiA9IDA7XG5cdFx0XHR2YXIgZWxXaWR0aCA9IDA7XG5cblx0XHRcdGZvcih2YXIgaSA9IDA7IGk8YmFzZS5pdGVtc0Ftb3VudDsgaSsrKXtcblx0XHRcdFx0ZWxXaWR0aCArPSBiYXNlLml0ZW1XaWR0aDtcblx0XHRcdFx0YmFzZS5wb3NpdGlvbnNJbkFycmF5LnB1c2goLWVsV2lkdGgpO1xuXG5cdFx0XHRcdGlmKGJhc2Uub3B0aW9ucy5zY3JvbGxQZXJQYWdlID09PSB0cnVlKXtcblx0XHRcdFx0XHR2YXIgaXRlbSA9ICQoYmFzZS4kb3dsSXRlbXNbaV0pO1xuXHRcdFx0XHRcdHZhciByb3VuZFBhZ2VOdW0gPSBpdGVtLmRhdGEoXCJvd2wtcm91bmRQYWdlc1wiKTtcblx0XHRcdFx0XHRpZihyb3VuZFBhZ2VOdW0gIT09IHByZXYpe1xuXHRcdFx0XHRcdFx0YmFzZS5wYWdlc0luQXJyYXlbcHJldl0gPSBiYXNlLnBvc2l0aW9uc0luQXJyYXlbaV07XG5cdFx0XHRcdFx0XHRwcmV2ID0gcm91bmRQYWdlTnVtO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRidWlsZENvbnRyb2xzIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdGlmKGJhc2Uub3B0aW9ucy5uYXZpZ2F0aW9uID09PSB0cnVlIHx8IGJhc2Uub3B0aW9ucy5wYWdpbmF0aW9uID09PSB0cnVlKXtcblx0XHRcdFx0YmFzZS5vd2xDb250cm9scyA9ICQoXCI8ZGl2IGNsYXNzPVxcXCJvd2wtY29udHJvbHNcXFwiLz5cIikudG9nZ2xlQ2xhc3MoXCJjbGlja2FibGVcIiwgIWJhc2UuYnJvd3Nlci5pc1RvdWNoKS5hcHBlbmRUbyhiYXNlLiRlbGVtKTtcblx0XHRcdH1cblx0XHRcdGlmKGJhc2Uub3B0aW9ucy5wYWdpbmF0aW9uID09PSB0cnVlKXtcblx0XHRcdFx0YmFzZS5idWlsZFBhZ2luYXRpb24oKTtcblx0XHRcdH1cblx0XHRcdGlmKGJhc2Uub3B0aW9ucy5uYXZpZ2F0aW9uID09PSB0cnVlKXtcblx0XHRcdFx0YmFzZS5idWlsZEJ1dHRvbnMoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YnVpbGRCdXR0b25zIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdHZhciBidXR0b25zV3JhcHBlciA9ICQoXCI8ZGl2IGNsYXNzPVxcXCJvd2wtYnV0dG9uc1xcXCIvPlwiKVxuXHRcdFx0YmFzZS5vd2xDb250cm9scy5hcHBlbmQoYnV0dG9uc1dyYXBwZXIpO1xuXG5cdFx0XHRiYXNlLmJ1dHRvblByZXYgPSAkKFwiPGRpdi8+XCIse1xuXHRcdFx0XHRcImNsYXNzXCIgOiBcIm93bC1wcmV2XCIsXG5cdFx0XHRcdFwiaHRtbFwiIDogYmFzZS5vcHRpb25zLm5hdmlnYXRpb25UZXh0WzBdIHx8IFwiXCJcblx0XHRcdFx0fSk7XG5cblx0XHRcdGJhc2UuYnV0dG9uTmV4dCA9ICQoXCI8ZGl2Lz5cIix7XG5cdFx0XHRcdFwiY2xhc3NcIiA6IFwib3dsLW5leHRcIixcblx0XHRcdFx0XCJodG1sXCIgOiBiYXNlLm9wdGlvbnMubmF2aWdhdGlvblRleHRbMV0gfHwgXCJcIlxuXHRcdFx0XHR9KTtcblxuXHRcdFx0YnV0dG9uc1dyYXBwZXJcblx0XHRcdC5hcHBlbmQoYmFzZS5idXR0b25QcmV2KVxuXHRcdFx0LmFwcGVuZChiYXNlLmJ1dHRvbk5leHQpO1xuXG5cdFx0XHRidXR0b25zV3JhcHBlci5vbihcInRvdWNoc3RhcnQub3dsQ29udHJvbHMgbW91c2Vkb3duLm93bENvbnRyb2xzXCIsIFwiZGl2W2NsYXNzXj1cXFwib3dsXFxcIl1cIiwgZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSlcblxuXHRcdFx0YnV0dG9uc1dyYXBwZXIub24oXCJ0b3VjaGVuZC5vd2xDb250cm9scyBtb3VzZXVwLm93bENvbnRyb2xzXCIsIFwiZGl2W2NsYXNzXj1cXFwib3dsXFxcIl1cIiwgZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRpZigkKHRoaXMpLmhhc0NsYXNzKFwib3dsLW5leHRcIikpe1xuXHRcdFx0XHRcdGJhc2UubmV4dCgpO1xuXHRcdFx0XHR9IGVsc2V7XG5cdFx0XHRcdFx0YmFzZS5wcmV2KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSxcblxuXHRcdGJ1aWxkUGFnaW5hdGlvbiA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cblx0XHRcdGJhc2UucGFnaW5hdGlvbldyYXBwZXIgPSAkKFwiPGRpdiBjbGFzcz1cXFwib3dsLXBhZ2luYXRpb25cXFwiLz5cIik7XG5cdFx0XHRiYXNlLm93bENvbnRyb2xzLmFwcGVuZChiYXNlLnBhZ2luYXRpb25XcmFwcGVyKTtcblxuXHRcdFx0YmFzZS5wYWdpbmF0aW9uV3JhcHBlci5vbihcInRvdWNoZW5kLm93bENvbnRyb2xzIG1vdXNldXAub3dsQ29udHJvbHNcIiwgXCIub3dsLXBhZ2VcIiwgZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRpZihOdW1iZXIoJCh0aGlzKS5kYXRhKFwib3dsLXBhZ2VcIikpICE9PSBiYXNlLmN1cnJlbnRJdGVtKXtcblx0XHRcdFx0XHRiYXNlLmdvVG8oIE51bWJlcigkKHRoaXMpLmRhdGEoXCJvd2wtcGFnZVwiKSksIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0dXBkYXRlUGFnaW5hdGlvbiA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRpZihiYXNlLm9wdGlvbnMucGFnaW5hdGlvbiA9PT0gZmFsc2Upe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGJhc2UucGFnaW5hdGlvbldyYXBwZXIuaHRtbChcIlwiKTtcblxuXHRcdFx0dmFyIGNvdW50ZXIgPSAwO1xuXHRcdFx0dmFyIGxhc3RQYWdlID0gYmFzZS5pdGVtc0Ftb3VudCAtIGJhc2UuaXRlbXNBbW91bnQgJSBiYXNlLm9wdGlvbnMuaXRlbXM7XG5cblx0XHRcdGZvcih2YXIgaSA9IDA7IGk8YmFzZS5pdGVtc0Ftb3VudDsgaSsrKXtcblx0XHRcdFx0aWYoaSAlIGJhc2Uub3B0aW9ucy5pdGVtcyA9PT0gMCl7XG5cdFx0XHRcdFx0Y291bnRlciArPTE7XG5cdFx0XHRcdFx0aWYobGFzdFBhZ2UgPT09IGkpe1xuXHRcdFx0XHRcdFx0dmFyIGxhc3RJdGVtID0gYmFzZS5pdGVtc0Ftb3VudCAtIGJhc2Uub3B0aW9ucy5pdGVtcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIHBhZ2luYXRpb25CdXR0b24gPSAkKFwiPGRpdi8+XCIse1xuXHRcdFx0XHRcdFx0XCJjbGFzc1wiIDogXCJvd2wtcGFnZVwiXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR2YXIgcGFnaW5hdGlvbkJ1dHRvbklubmVyID0gJChcIjxzcGFuPjwvc3Bhbj5cIix7XG5cdFx0XHRcdFx0XHRcInRleHRcIjogYmFzZS5vcHRpb25zLnBhZ2luYXRpb25OdW1iZXJzID09PSB0cnVlID8gY291bnRlciA6IFwiXCIsXG5cdFx0XHRcdFx0XHRcImNsYXNzXCI6IGJhc2Uub3B0aW9ucy5wYWdpbmF0aW9uTnVtYmVycyA9PT0gdHJ1ZSA/IFwib3dsLW51bWJlcnNcIiA6IFwiXCJcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRwYWdpbmF0aW9uQnV0dG9uLmFwcGVuZChwYWdpbmF0aW9uQnV0dG9uSW5uZXIpO1xuXG5cdFx0XHRcdFx0cGFnaW5hdGlvbkJ1dHRvbi5kYXRhKFwib3dsLXBhZ2VcIixsYXN0UGFnZSA9PT0gaSA/IGxhc3RJdGVtIDogaSk7XG5cdFx0XHRcdFx0cGFnaW5hdGlvbkJ1dHRvbi5kYXRhKFwib3dsLXJvdW5kUGFnZXNcIixjb3VudGVyKTtcblxuXHRcdFx0XHRcdGJhc2UucGFnaW5hdGlvbldyYXBwZXIuYXBwZW5kKHBhZ2luYXRpb25CdXR0b24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRiYXNlLmNoZWNrUGFnaW5hdGlvbigpO1xuXHRcdH0sXG5cdFx0Y2hlY2tQYWdpbmF0aW9uIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdGlmKGJhc2Uub3B0aW9ucy5wYWdpbmF0aW9uID09PSBmYWxzZSl7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGJhc2UucGFnaW5hdGlvbldyYXBwZXIuZmluZChcIi5vd2wtcGFnZVwiKS5lYWNoKGZ1bmN0aW9uKGksdil7XG5cdFx0XHRcdGlmKCQodGhpcykuZGF0YShcIm93bC1yb3VuZFBhZ2VzXCIpID09PSAkKGJhc2UuJG93bEl0ZW1zW2Jhc2UuY3VycmVudEl0ZW1dKS5kYXRhKFwib3dsLXJvdW5kUGFnZXNcIikgKXtcblx0XHRcdFx0XHRiYXNlLnBhZ2luYXRpb25XcmFwcGVyXG5cdFx0XHRcdFx0XHQuZmluZChcIi5vd2wtcGFnZVwiKVxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRjaGVja05hdmlnYXRpb24gOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXG5cdFx0XHRpZihiYXNlLm9wdGlvbnMubmF2aWdhdGlvbiA9PT0gZmFsc2Upe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZihiYXNlLm9wdGlvbnMucmV3aW5kTmF2ID09PSBmYWxzZSl7XG5cdFx0XHRcdGlmKGJhc2UuY3VycmVudEl0ZW0gPT09IDAgJiYgYmFzZS5tYXhpbXVtSXRlbSA9PT0gMCl7XG5cdFx0XHRcdFx0YmFzZS5idXR0b25QcmV2LmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cdFx0XHRcdFx0YmFzZS5idXR0b25OZXh0LmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cdFx0XHRcdH0gZWxzZSBpZihiYXNlLmN1cnJlbnRJdGVtID09PSAwICYmIGJhc2UubWF4aW11bUl0ZW0gIT09IDApe1xuXHRcdFx0XHRcdGJhc2UuYnV0dG9uUHJldi5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuXHRcdFx0XHRcdGJhc2UuYnV0dG9uTmV4dC5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGJhc2UuY3VycmVudEl0ZW0gPT09IGJhc2UubWF4aW11bUl0ZW0pe1xuXHRcdFx0XHRcdGJhc2UuYnV0dG9uUHJldi5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuXHRcdFx0XHRcdGJhc2UuYnV0dG9uTmV4dC5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuXHRcdFx0XHR9IGVsc2UgaWYoYmFzZS5jdXJyZW50SXRlbSAhPT0gMCAmJiBiYXNlLmN1cnJlbnRJdGVtICE9PSBiYXNlLm1heGltdW1JdGVtKXtcblx0XHRcdFx0XHRiYXNlLmJ1dHRvblByZXYucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblx0XHRcdFx0XHRiYXNlLmJ1dHRvbk5leHQucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHR1cGRhdGVDb250cm9scyA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRiYXNlLnVwZGF0ZVBhZ2luYXRpb24oKTtcblx0XHRcdGJhc2UuY2hlY2tOYXZpZ2F0aW9uKCk7XG5cdFx0XHRpZihiYXNlLm93bENvbnRyb2xzKXtcblx0XHRcdFx0aWYoYmFzZS5vcHRpb25zLml0ZW1zID49IGJhc2UuaXRlbXNBbW91bnQpe1xuXHRcdFx0XHRcdGJhc2Uub3dsQ29udHJvbHMuaGlkZSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJhc2Uub3dsQ29udHJvbHMuc2hvdygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGRlc3Ryb3lDb250cm9scyA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRpZihiYXNlLm93bENvbnRyb2xzKXtcblx0XHRcdFx0YmFzZS5vd2xDb250cm9scy5yZW1vdmUoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0bmV4dCA6IGZ1bmN0aW9uKHNwZWVkKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblxuXHRcdFx0aWYoYmFzZS5pc1RyYW5zaXRpb24pe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGJhc2UuY3VycmVudEl0ZW0gKz0gYmFzZS5vcHRpb25zLnNjcm9sbFBlclBhZ2UgPT09IHRydWUgPyBiYXNlLm9wdGlvbnMuaXRlbXMgOiAxO1xuXHRcdFx0aWYoYmFzZS5jdXJyZW50SXRlbSA+IGJhc2UubWF4aW11bUl0ZW0gKyAoYmFzZS5vcHRpb25zLnNjcm9sbFBlclBhZ2UgPT0gdHJ1ZSA/IChiYXNlLm9wdGlvbnMuaXRlbXMgLSAxKSA6IDApKXtcblx0XHRcdFx0aWYoYmFzZS5vcHRpb25zLnJld2luZE5hdiA9PT0gdHJ1ZSl7XG5cdFx0XHRcdFx0YmFzZS5jdXJyZW50SXRlbSA9IDA7XG5cdFx0XHRcdFx0c3BlZWQgPSBcInJld2luZFwiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJhc2UuY3VycmVudEl0ZW0gPSBiYXNlLm1heGltdW1JdGVtO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YmFzZS5nb1RvKGJhc2UuY3VycmVudEl0ZW0sc3BlZWQpO1xuXHRcdH0sXG5cblx0XHRwcmV2IDogZnVuY3Rpb24oc3BlZWQpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXG5cdFx0XHRpZihiYXNlLmlzVHJhbnNpdGlvbil7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYoYmFzZS5vcHRpb25zLnNjcm9sbFBlclBhZ2UgPT09IHRydWUgJiYgYmFzZS5jdXJyZW50SXRlbSA+IDAgJiYgYmFzZS5jdXJyZW50SXRlbSA8IGJhc2Uub3B0aW9ucy5pdGVtcyl7XG5cdFx0XHRcdGJhc2UuY3VycmVudEl0ZW0gPSAwXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRiYXNlLmN1cnJlbnRJdGVtIC09IGJhc2Uub3B0aW9ucy5zY3JvbGxQZXJQYWdlID09PSB0cnVlID8gYmFzZS5vcHRpb25zLml0ZW1zIDogMTtcblx0XHRcdH1cblx0XHRcdGlmKGJhc2UuY3VycmVudEl0ZW0gPCAwKXtcblx0XHRcdFx0aWYoYmFzZS5vcHRpb25zLnJld2luZE5hdiA9PT0gdHJ1ZSl7XG5cdFx0XHRcdFx0YmFzZS5jdXJyZW50SXRlbSA9IGJhc2UubWF4aW11bUl0ZW07XG5cdFx0XHRcdFx0c3BlZWQgPSBcInJld2luZFwiXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YmFzZS5jdXJyZW50SXRlbSA9MDtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGJhc2UuZ29UbyhiYXNlLmN1cnJlbnRJdGVtLHNwZWVkKTtcblx0XHR9LFxuXG5cdFx0Z29UbyA6IGZ1bmN0aW9uKHBvc2l0aW9uLHNwZWVkLGRyYWcpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXG5cdFx0XHRpZihiYXNlLmlzVHJhbnNpdGlvbil7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKHR5cGVvZiBiYXNlLm9wdGlvbnMuYmVmb3JlTW92ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdGJhc2Uub3B0aW9ucy5iZWZvcmVNb3ZlLmFwcGx5KHRoaXMsW2Jhc2UuJGVsZW1dKTtcblx0XHRcdH1cblx0XHRcdGlmKHBvc2l0aW9uID49IGJhc2UubWF4aW11bUl0ZW0pe1xuXHRcdFx0XHRwb3NpdGlvbiA9IGJhc2UubWF4aW11bUl0ZW07XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKCBwb3NpdGlvbiA8PSAwICl7XG5cdFx0XHRcdHBvc2l0aW9uID0gMDtcblx0XHRcdH1cblxuXHRcdFx0YmFzZS5jdXJyZW50SXRlbSA9IGJhc2Uub3dsLmN1cnJlbnRJdGVtID0gcG9zaXRpb247XG5cdFx0XHRpZiggYmFzZS5vcHRpb25zLnRyYW5zaXRpb25TdHlsZSAhPT0gZmFsc2UgJiYgZHJhZyAhPT0gXCJkcmFnXCIgJiYgYmFzZS5vcHRpb25zLml0ZW1zID09PSAxICYmIGJhc2UuYnJvd3Nlci5zdXBwb3J0M2QgPT09IHRydWUpe1xuXHRcdFx0XHRiYXNlLnN3YXBTcGVlZCgwKVxuXHRcdFx0XHRpZihiYXNlLmJyb3dzZXIuc3VwcG9ydDNkID09PSB0cnVlKXtcblx0XHRcdFx0XHRiYXNlLnRyYW5zaXRpb24zZChiYXNlLnBvc2l0aW9uc0luQXJyYXlbcG9zaXRpb25dKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRiYXNlLmNzczJzbGlkZShiYXNlLnBvc2l0aW9uc0luQXJyYXlbcG9zaXRpb25dLDEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJhc2UuYWZ0ZXJHbygpO1xuXHRcdFx0XHRiYXNlLnNpbmdsZUl0ZW1UcmFuc2l0aW9uKCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR2YXIgZ29Ub1BpeGVsID0gYmFzZS5wb3NpdGlvbnNJbkFycmF5W3Bvc2l0aW9uXTtcblxuXHRcdFx0aWYoYmFzZS5icm93c2VyLnN1cHBvcnQzZCA9PT0gdHJ1ZSl7XG5cdFx0XHRcdGJhc2UuaXNDc3MzRmluaXNoID0gZmFsc2U7XG5cblx0XHRcdFx0aWYoc3BlZWQgPT09IHRydWUpe1xuXHRcdFx0XHRcdGJhc2Uuc3dhcFNwZWVkKFwicGFnaW5hdGlvblNwZWVkXCIpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRiYXNlLmlzQ3NzM0ZpbmlzaCA9IHRydWU7XG5cdFx0XHRcdFx0fSwgYmFzZS5vcHRpb25zLnBhZ2luYXRpb25TcGVlZCk7XG5cblx0XHRcdFx0fSBlbHNlIGlmKHNwZWVkID09PSBcInJld2luZFwiICl7XG5cdFx0XHRcdFx0YmFzZS5zd2FwU3BlZWQoYmFzZS5vcHRpb25zLnJld2luZFNwZWVkKTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0YmFzZS5pc0NzczNGaW5pc2ggPSB0cnVlO1xuXHRcdFx0XHRcdH0sIGJhc2Uub3B0aW9ucy5yZXdpbmRTcGVlZCk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRiYXNlLnN3YXBTcGVlZChcInNsaWRlU3BlZWRcIik7XG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGJhc2UuaXNDc3MzRmluaXNoID0gdHJ1ZTtcblx0XHRcdFx0XHR9LCBiYXNlLm9wdGlvbnMuc2xpZGVTcGVlZCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YmFzZS50cmFuc2l0aW9uM2QoZ29Ub1BpeGVsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHNwZWVkID09PSB0cnVlKXtcblx0XHRcdFx0XHRiYXNlLmNzczJzbGlkZShnb1RvUGl4ZWwsIGJhc2Uub3B0aW9ucy5wYWdpbmF0aW9uU3BlZWQpO1xuXHRcdFx0XHR9IGVsc2UgaWYoc3BlZWQgPT09IFwicmV3aW5kXCIgKXtcblx0XHRcdFx0XHRiYXNlLmNzczJzbGlkZShnb1RvUGl4ZWwsIGJhc2Uub3B0aW9ucy5yZXdpbmRTcGVlZCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YmFzZS5jc3Myc2xpZGUoZ29Ub1BpeGVsLCBiYXNlLm9wdGlvbnMuc2xpZGVTcGVlZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGJhc2UuYWZ0ZXJHbygpO1xuXHRcdH0sXG5cblx0XHRqdW1wVG8gOiBmdW5jdGlvbihwb3NpdGlvbil7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRpZih0eXBlb2YgYmFzZS5vcHRpb25zLmJlZm9yZU1vdmUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRiYXNlLm9wdGlvbnMuYmVmb3JlTW92ZS5hcHBseSh0aGlzLFtiYXNlLiRlbGVtXSk7XG5cdFx0XHR9XG5cdFx0XHRpZihwb3NpdGlvbiA+PSBiYXNlLm1heGltdW1JdGVtIHx8IHBvc2l0aW9uID09PSAtMSl7XG5cdFx0XHRcdHBvc2l0aW9uID0gYmFzZS5tYXhpbXVtSXRlbTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYoIHBvc2l0aW9uIDw9IDAgKXtcblx0XHRcdFx0cG9zaXRpb24gPSAwO1xuXHRcdFx0fVxuXHRcdFx0YmFzZS5zd2FwU3BlZWQoMClcblx0XHRcdGlmKGJhc2UuYnJvd3Nlci5zdXBwb3J0M2QgPT09IHRydWUpe1xuXHRcdFx0XHRiYXNlLnRyYW5zaXRpb24zZChiYXNlLnBvc2l0aW9uc0luQXJyYXlbcG9zaXRpb25dKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJhc2UuY3NzMnNsaWRlKGJhc2UucG9zaXRpb25zSW5BcnJheVtwb3NpdGlvbl0sMSk7XG5cdFx0XHR9XG5cdFx0XHRiYXNlLmN1cnJlbnRJdGVtID0gYmFzZS5vd2wuY3VycmVudEl0ZW0gPSBwb3NpdGlvbjtcblx0XHRcdGJhc2UuYWZ0ZXJHbygpO1xuXHRcdH0sXG5cblx0XHRhZnRlckdvIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblxuXHRcdFx0YmFzZS5wcmV2QXJyLnB1c2goYmFzZS5jdXJyZW50SXRlbSk7XG5cdFx0XHRiYXNlLnByZXZJdGVtID0gYmFzZS5vd2wucHJldkl0ZW0gPSBiYXNlLnByZXZBcnJbYmFzZS5wcmV2QXJyLmxlbmd0aCAtMl07XG5cdFx0XHRiYXNlLnByZXZBcnIuc2hpZnQoMClcblxuXHRcdFx0aWYoYmFzZS5wcmV2SXRlbSAhPT0gYmFzZS5jdXJyZW50SXRlbSl7XG5cdFx0XHRcdGJhc2UuY2hlY2tQYWdpbmF0aW9uKCk7XG5cdFx0XHRcdGJhc2UuY2hlY2tOYXZpZ2F0aW9uKCk7XG5cdFx0XHRcdGJhc2UuZWFjaE1vdmVVcGRhdGUoKTtcblxuXHRcdFx0XHRpZihiYXNlLm9wdGlvbnMuYXV0b1BsYXkgIT09IGZhbHNlKXtcblx0XHRcdFx0XHRiYXNlLmNoZWNrQXAoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYodHlwZW9mIGJhc2Uub3B0aW9ucy5hZnRlck1vdmUgPT09IFwiZnVuY3Rpb25cIiAmJiBiYXNlLnByZXZJdGVtICE9PSBiYXNlLmN1cnJlbnRJdGVtKSB7XG5cdFx0XHRcdGJhc2Uub3B0aW9ucy5hZnRlck1vdmUuYXBwbHkodGhpcyxbYmFzZS4kZWxlbV0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzdG9wIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdGJhc2UuYXBTdGF0dXMgPSBcInN0b3BcIjtcblx0XHRcdGNsZWFySW50ZXJ2YWwoYmFzZS5hdXRvUGxheUludGVydmFsKTtcblx0XHR9LFxuXG5cdFx0Y2hlY2tBcCA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRpZihiYXNlLmFwU3RhdHVzICE9PSBcInN0b3BcIil7XG5cdFx0XHRcdGJhc2UucGxheSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRwbGF5IDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdGJhc2UuYXBTdGF0dXMgPSBcInBsYXlcIjtcblx0XHRcdGlmKGJhc2Uub3B0aW9ucy5hdXRvUGxheSA9PT0gZmFsc2Upe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRjbGVhckludGVydmFsKGJhc2UuYXV0b1BsYXlJbnRlcnZhbCk7XG5cdFx0XHRiYXNlLmF1dG9QbGF5SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuXHRcdFx0XHRiYXNlLm5leHQodHJ1ZSk7XG5cdFx0XHR9LGJhc2Uub3B0aW9ucy5hdXRvUGxheSk7XG5cdFx0fSxcblxuXHRcdHN3YXBTcGVlZCA6IGZ1bmN0aW9uKGFjdGlvbil7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRpZihhY3Rpb24gPT09IFwic2xpZGVTcGVlZFwiKXtcblx0XHRcdFx0YmFzZS4kb3dsV3JhcHBlci5jc3MoYmFzZS5hZGRDc3NTcGVlZChiYXNlLm9wdGlvbnMuc2xpZGVTcGVlZCkpO1xuXHRcdFx0fSBlbHNlIGlmKGFjdGlvbiA9PT0gXCJwYWdpbmF0aW9uU3BlZWRcIiApe1xuXHRcdFx0XHRiYXNlLiRvd2xXcmFwcGVyLmNzcyhiYXNlLmFkZENzc1NwZWVkKGJhc2Uub3B0aW9ucy5wYWdpbmF0aW9uU3BlZWQpKTtcblx0XHRcdH0gZWxzZSBpZih0eXBlb2YgYWN0aW9uICE9PSBcInN0cmluZ1wiKXtcblx0XHRcdFx0YmFzZS4kb3dsV3JhcHBlci5jc3MoYmFzZS5hZGRDc3NTcGVlZChhY3Rpb24pKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YWRkQ3NzU3BlZWQgOiBmdW5jdGlvbihzcGVlZCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcIi13ZWJraXQtdHJhbnNpdGlvblwiOiBcImFsbCBcIisgc3BlZWQgK1wibXMgZWFzZVwiLFxuXHRcdFx0XHRcIi1tb3otdHJhbnNpdGlvblwiOiBcImFsbCBcIisgc3BlZWQgK1wibXMgZWFzZVwiLFxuXHRcdFx0XHRcIi1vLXRyYW5zaXRpb25cIjogXCJhbGwgXCIrIHNwZWVkICtcIm1zIGVhc2VcIixcblx0XHRcdFx0XCJ0cmFuc2l0aW9uXCI6IFwiYWxsIFwiKyBzcGVlZCArXCJtcyBlYXNlXCJcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdHJlbW92ZVRyYW5zaXRpb24gOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XCItd2Via2l0LXRyYW5zaXRpb25cIjogXCJcIixcblx0XHRcdFx0XCItbW96LXRyYW5zaXRpb25cIjogXCJcIixcblx0XHRcdFx0XCItby10cmFuc2l0aW9uXCI6IFwiXCIsXG5cdFx0XHRcdFwidHJhbnNpdGlvblwiOiBcIlwiXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRkb1RyYW5zbGF0ZSA6IGZ1bmN0aW9uKHBpeGVscyl7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoXCIrcGl4ZWxzK1wicHgsIDBweCwgMHB4KVwiLFxuXHRcdFx0XHRcIi1tb3otdHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoXCIrcGl4ZWxzK1wicHgsIDBweCwgMHB4KVwiLFxuXHRcdFx0XHRcIi1vLXRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZTNkKFwiK3BpeGVscytcInB4LCAwcHgsIDBweClcIixcblx0XHRcdFx0XCItbXMtdHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoXCIrcGl4ZWxzK1wicHgsIDBweCwgMHB4KVwiLFxuXHRcdFx0XHRcInRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZTNkKFwiK3BpeGVscytcInB4LCAwcHgsMHB4KVwiXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHR0cmFuc2l0aW9uM2QgOiBmdW5jdGlvbih2YWx1ZSl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRiYXNlLiRvd2xXcmFwcGVyLmNzcyhiYXNlLmRvVHJhbnNsYXRlKHZhbHVlKSk7XG5cdFx0fSxcblxuXHRcdGNzczJtb3ZlIDogZnVuY3Rpb24odmFsdWUpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXHRcdFx0YmFzZS4kb3dsV3JhcHBlci5jc3Moe1wibGVmdFwiIDogdmFsdWV9KVxuXHRcdH0sXG5cblx0XHRjc3Myc2xpZGUgOiBmdW5jdGlvbih2YWx1ZSxzcGVlZCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cblx0XHRcdGJhc2UuaXNDc3NGaW5pc2ggPSBmYWxzZTtcblx0XHRcdGJhc2UuJG93bFdyYXBwZXIuc3RvcCh0cnVlLHRydWUpLmFuaW1hdGUoe1xuXHRcdFx0XHRcImxlZnRcIiA6IHZhbHVlXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGR1cmF0aW9uIDogc3BlZWQgfHwgYmFzZS5vcHRpb25zLnNsaWRlU3BlZWQgLFxuXHRcdFx0XHRjb21wbGV0ZSA6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0YmFzZS5pc0Nzc0ZpbmlzaCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRjaGVja0Jyb3dzZXIgOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXG5cdFx0XHQvL0NoZWNrIDNkIHN1cHBvcnRcblx0XHRcdHZhclx0dHJhbnNsYXRlM0QgPSBcInRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpXCIsXG5cdFx0XHRcdHRlbXBFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuXHRcdFx0dGVtcEVsZW0uc3R5bGUuY3NzVGV4dD0gXCIgIC1tb3otdHJhbnNmb3JtOlwiICAgICsgdHJhbnNsYXRlM0QgK1xuXHRcdFx0XHRcdFx0XHRcdCAgXCI7IC1tcy10cmFuc2Zvcm06XCIgICAgICsgdHJhbnNsYXRlM0QgK1xuXHRcdFx0XHRcdFx0XHRcdCAgXCI7IC1vLXRyYW5zZm9ybTpcIiAgICAgICsgdHJhbnNsYXRlM0QgK1xuXHRcdFx0XHRcdFx0XHRcdCAgXCI7IC13ZWJraXQtdHJhbnNmb3JtOlwiICsgdHJhbnNsYXRlM0QgK1xuXHRcdFx0XHRcdFx0XHRcdCAgXCI7IHRyYW5zZm9ybTpcIiAgICAgICAgICsgdHJhbnNsYXRlM0Q7XG5cdFx0XHR2YXJcdHJlZ2V4ID0gL3RyYW5zbGF0ZTNkXFwoMHB4LCAwcHgsIDBweFxcKS9nLFxuXHRcdFx0XHRhc1N1cHBvcnQgPSB0ZW1wRWxlbS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSxcblx0XHRcdFx0c3VwcG9ydDNkID0gKGFzU3VwcG9ydCAhPT0gbnVsbCAmJiBhc1N1cHBvcnQubGVuZ3RoID09PSAxKTtcblxuXHRcdFx0dmFyIGlzVG91Y2ggPSBcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cztcblxuXHRcdFx0YmFzZS5icm93c2VyID0ge1xuXHRcdFx0XHRcInN1cHBvcnQzZFwiIDogc3VwcG9ydDNkLFxuXHRcdFx0XHRcImlzVG91Y2hcIiA6IGlzVG91Y2hcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0bW92ZUV2ZW50cyA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRpZihiYXNlLm9wdGlvbnMubW91c2VEcmFnICE9PSBmYWxzZSB8fCBiYXNlLm9wdGlvbnMudG91Y2hEcmFnICE9PSBmYWxzZSl7XG5cdFx0XHRcdGJhc2UuZ2VzdHVyZXMoKTtcblx0XHRcdFx0YmFzZS5kaXNhYmxlZEV2ZW50cygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRldmVudFR5cGVzIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdHZhciB0eXBlcyA9IFtcInNcIixcImVcIixcInhcIl07XG5cblx0XHRcdGJhc2UuZXZfdHlwZXMgPSB7fTtcblxuXHRcdFx0aWYoYmFzZS5vcHRpb25zLm1vdXNlRHJhZyA9PT0gdHJ1ZSAmJiBiYXNlLm9wdGlvbnMudG91Y2hEcmFnID09PSB0cnVlKXtcblx0XHRcdFx0dHlwZXMgPSBbXG5cdFx0XHRcdFx0XCJ0b3VjaHN0YXJ0Lm93bCBtb3VzZWRvd24ub3dsXCIsXG5cdFx0XHRcdFx0XCJ0b3VjaG1vdmUub3dsIG1vdXNlbW92ZS5vd2xcIixcblx0XHRcdFx0XHRcInRvdWNoZW5kLm93bCB0b3VjaGNhbmNlbC5vd2wgbW91c2V1cC5vd2xcIlxuXHRcdFx0XHRdO1xuXHRcdFx0fSBlbHNlIGlmKGJhc2Uub3B0aW9ucy5tb3VzZURyYWcgPT09IGZhbHNlICYmIGJhc2Uub3B0aW9ucy50b3VjaERyYWcgPT09IHRydWUpe1xuXHRcdFx0XHR0eXBlcyA9IFtcblx0XHRcdFx0XHRcInRvdWNoc3RhcnQub3dsXCIsXG5cdFx0XHRcdFx0XCJ0b3VjaG1vdmUub3dsXCIsXG5cdFx0XHRcdFx0XCJ0b3VjaGVuZC5vd2wgdG91Y2hjYW5jZWwub3dsXCJcblx0XHRcdFx0XTtcblx0XHRcdH0gZWxzZSBpZihiYXNlLm9wdGlvbnMubW91c2VEcmFnID09PSB0cnVlICYmIGJhc2Uub3B0aW9ucy50b3VjaERyYWcgPT09IGZhbHNlKXtcblx0XHRcdFx0dHlwZXMgPSBbXG5cdFx0XHRcdFx0XCJtb3VzZWRvd24ub3dsXCIsXG5cdFx0XHRcdFx0XCJtb3VzZW1vdmUub3dsXCIsXG5cdFx0XHRcdFx0XCJtb3VzZXVwLm93bFwiXG5cdFx0XHRcdF07XG5cdFx0XHR9XG5cblx0XHRcdGJhc2UuZXZfdHlwZXNbXCJzdGFydFwiXSA9IHR5cGVzWzBdO1xuXHRcdFx0YmFzZS5ldl90eXBlc1tcIm1vdmVcIl0gPSB0eXBlc1sxXTtcblx0XHRcdGJhc2UuZXZfdHlwZXNbXCJlbmRcIl0gPSB0eXBlc1syXTtcblx0XHR9LFxuXG5cdFx0ZGlzYWJsZWRFdmVudHMgOiAgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdGJhc2UuJGVsZW0ub24oXCJkcmFnc3RhcnQub3dsXCIsIGZ1bmN0aW9uKGV2ZW50KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7fSk7XG5cdFx0XHRiYXNlLiRlbGVtLm9uKFwibW91c2Vkb3duLmRpc2FibGVUZXh0U2VsZWN0XCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0cmV0dXJuICQoZS50YXJnZXQpLmlzKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgb3B0aW9uJyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Z2VzdHVyZXMgOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXG5cdFx0XHR2YXIgbG9jYWxzID0ge1xuXHRcdFx0XHRvZmZzZXRYIDogMCxcblx0XHRcdFx0b2Zmc2V0WSA6IDAsXG5cdFx0XHRcdGJhc2VFbFdpZHRoIDogMCxcblx0XHRcdFx0cmVsYXRpdmVQb3MgOiAwLFxuXHRcdFx0XHRwb3NpdGlvbjogbnVsbCxcblx0XHRcdFx0bWluU3dpcGUgOiBudWxsLFxuXHRcdFx0XHRtYXhTd2lwZTogbnVsbCxcblx0XHRcdFx0c2xpZGluZyA6IG51bGwsXG5cdFx0XHRcdGRhcmdnaW5nOiBudWxsLFxuXHRcdFx0XHR0YXJnZXRFbGVtZW50IDogbnVsbFxuXHRcdFx0fVxuXG5cdFx0XHRiYXNlLmlzQ3NzRmluaXNoID0gdHJ1ZTtcblxuXHRcdFx0ZnVuY3Rpb24gZ2V0VG91Y2hlcyhldmVudCl7XG5cdFx0XHRcdGlmKGV2ZW50LnRvdWNoZXMpe1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHR4IDogZXZlbnQudG91Y2hlc1swXS5wYWdlWCxcblx0XHRcdFx0XHRcdHkgOiBldmVudC50b3VjaGVzWzBdLnBhZ2VZXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmKGV2ZW50LnBhZ2VYICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0eCA6IGV2ZW50LnBhZ2VYLFxuXHRcdFx0XHRcdFx0XHR5IDogZXZlbnQucGFnZVlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0eCA6IGV2ZW50LmNsaWVudFgsXG5cdFx0XHRcdFx0XHRcdHkgOiBldmVudC5jbGllbnRZXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIHN3YXBFdmVudHModHlwZSl7XG5cdFx0XHRcdGlmKHR5cGUgPT09IFwib25cIil7XG5cdFx0XHRcdFx0JChkb2N1bWVudCkub24oYmFzZS5ldl90eXBlc1tcIm1vdmVcIl0sIGRyYWdNb3ZlKTtcblx0XHRcdFx0XHQkKGRvY3VtZW50KS5vbihiYXNlLmV2X3R5cGVzW1wiZW5kXCJdLCBkcmFnRW5kKTtcblx0XHRcdFx0fSBlbHNlIGlmKHR5cGUgPT09IFwib2ZmXCIpe1xuXHRcdFx0XHRcdCQoZG9jdW1lbnQpLm9mZihiYXNlLmV2X3R5cGVzW1wibW92ZVwiXSk7XG5cdFx0XHRcdFx0JChkb2N1bWVudCkub2ZmKGJhc2UuZXZfdHlwZXNbXCJlbmRcIl0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGRyYWdTdGFydChldmVudCkge1xuXHRcdFx0XHR2YXIgZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblxuXHRcdFx0XHRpZiAoZXZlbnQud2hpY2ggPT09IDMpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoYmFzZS5pdGVtc0Ftb3VudCA8PSBiYXNlLm9wdGlvbnMuaXRlbXMpe1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihiYXNlLmlzQ3NzRmluaXNoID09PSBmYWxzZSAmJiAhYmFzZS5vcHRpb25zLmRyYWdCZWZvcmVBbmltRmluaXNoICl7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGJhc2UuaXNDc3MzRmluaXNoID09PSBmYWxzZSAmJiAhYmFzZS5vcHRpb25zLmRyYWdCZWZvcmVBbmltRmluaXNoICl7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoYmFzZS5vcHRpb25zLmF1dG9QbGF5ICE9PSBmYWxzZSl7XG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChiYXNlLmF1dG9QbGF5SW50ZXJ2YWwpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoYmFzZS5icm93c2VyLmlzVG91Y2ggIT09IHRydWUgJiYgIWJhc2UuJG93bFdyYXBwZXIuaGFzQ2xhc3MoXCJncmFiYmluZ1wiKSl7XG5cdFx0XHRcdFx0YmFzZS4kb3dsV3JhcHBlci5hZGRDbGFzcyhcImdyYWJiaW5nXCIpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRiYXNlLm5ld1Bvc1ggPSAwO1xuXHRcdFx0XHRiYXNlLm5ld1JlbGF0aXZlWCA9IDA7XG5cblx0XHRcdFx0JCh0aGlzKS5jc3MoYmFzZS5yZW1vdmVUcmFuc2l0aW9uKCkpO1xuXG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9ICQodGhpcykucG9zaXRpb24oKTtcblx0XHRcdFx0bG9jYWxzLnJlbGF0aXZlUG9zID0gcG9zaXRpb24ubGVmdDtcblx0XHRcdFx0XG5cdFx0XHRcdGxvY2Fscy5vZmZzZXRYID0gZ2V0VG91Y2hlcyhldmVudCkueCAtIHBvc2l0aW9uLmxlZnQ7XG5cdFx0XHRcdGxvY2Fscy5vZmZzZXRZID0gZ2V0VG91Y2hlcyhldmVudCkueSAtIHBvc2l0aW9uLnRvcDtcblxuXHRcdFx0XHRzd2FwRXZlbnRzKFwib25cIik7XG5cblx0XHRcdFx0bG9jYWxzLnNsaWRpbmcgPSBmYWxzZTtcblx0XHRcdFx0bG9jYWxzLnRhcmdldEVsZW1lbnQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gZHJhZ01vdmUoZXZlbnQpe1xuXHRcdFx0XHR2YXIgZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblxuXHRcdFx0XHRiYXNlLm5ld1Bvc1ggPSBnZXRUb3VjaGVzKGV2ZW50KS54LSBsb2NhbHMub2Zmc2V0WDtcblx0XHRcdFx0YmFzZS5uZXdQb3NZID0gZ2V0VG91Y2hlcyhldmVudCkueSAtIGxvY2Fscy5vZmZzZXRZO1xuXHRcdFx0XHRiYXNlLm5ld1JlbGF0aXZlWCA9IGJhc2UubmV3UG9zWCAtIGxvY2Fscy5yZWxhdGl2ZVBvcztcdFxuXG5cdFx0XHRcdGlmICh0eXBlb2YgYmFzZS5vcHRpb25zLnN0YXJ0RHJhZ2dpbmcgPT09IFwiZnVuY3Rpb25cIiAmJiBsb2NhbHMuZHJhZ2dpbmcgIT09IHRydWUgJiYgYmFzZS5uZXdSZWxhdGl2ZVggIT09IDApIHtcblx0XHRcdFx0XHRsb2NhbHMuZHJhZ2dpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdGJhc2Uub3B0aW9ucy5zdGFydERyYWdnaW5nLmFwcGx5KGJhc2UsW2Jhc2UuJGVsZW1dKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGJhc2UubmV3UmVsYXRpdmVYID4gOCB8fCBiYXNlLm5ld1JlbGF0aXZlWCA8IC04ICYmIGJhc2UuYnJvd3Nlci5pc1RvdWNoID09PSB0cnVlKXtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCA/IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgOiBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXHRcdFx0XHRcdGxvY2Fscy5zbGlkaW5nID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKChiYXNlLm5ld1Bvc1kgPiAxMCB8fCBiYXNlLm5ld1Bvc1kgPCAtMTApICYmIGxvY2Fscy5zbGlkaW5nID09PSBmYWxzZSl7XG5cdFx0XHRcdFx0JChkb2N1bWVudCkub2ZmKFwidG91Y2htb3ZlLm93bFwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBtaW5Td2lwZSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0cmV0dXJuICBiYXNlLm5ld1JlbGF0aXZlWCAvIDU7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIG1heFN3aXBlID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRyZXR1cm4gIGJhc2UubWF4aW11bVBpeGVscyArIGJhc2UubmV3UmVsYXRpdmVYIC8gNTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJhc2UubmV3UG9zWCA9IE1hdGgubWF4KE1hdGgubWluKCBiYXNlLm5ld1Bvc1gsIG1pblN3aXBlKCkgKSwgbWF4U3dpcGUoKSApO1xuXHRcdFx0XHRpZihiYXNlLmJyb3dzZXIuc3VwcG9ydDNkID09PSB0cnVlKXtcblx0XHRcdFx0XHRiYXNlLnRyYW5zaXRpb24zZChiYXNlLm5ld1Bvc1gpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJhc2UuY3NzMm1vdmUoYmFzZS5uZXdQb3NYKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBkcmFnRW5kKGV2ZW50KXtcblx0XHRcdFx0dmFyIGV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCB8fCBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG5cdFx0XHRcdGV2ZW50LnRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuXG5cdFx0XHRcdGxvY2Fscy5kcmFnZ2luZyA9IGZhbHNlO1xuXG5cdFx0XHRcdGlmKGJhc2UuYnJvd3Nlci5pc1RvdWNoICE9PSB0cnVlKXtcblx0XHRcdFx0XHRiYXNlLiRvd2xXcmFwcGVyLnJlbW92ZUNsYXNzKFwiZ3JhYmJpbmdcIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihiYXNlLm5ld1JlbGF0aXZlWDwwKXtcblx0XHRcdFx0XHRiYXNlLmRyYWdEaXJlY3Rpb24gPSBiYXNlLm93bC5kcmFnRGlyZWN0aW9uID0gXCJsZWZ0XCJcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRiYXNlLmRyYWdEaXJlY3Rpb24gPSBiYXNlLm93bC5kcmFnRGlyZWN0aW9uID0gXCJyaWdodFwiXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihiYXNlLm5ld1JlbGF0aXZlWCAhPT0gMCl7XG5cdFx0XHRcdFx0dmFyIG5ld1Bvc2l0aW9uID0gYmFzZS5nZXROZXdQb3NpdGlvbigpO1xuXHRcdFx0XHRcdGJhc2UuZ29UbyhuZXdQb3NpdGlvbixmYWxzZSxcImRyYWdcIik7XG5cdFx0XHRcdFx0aWYobG9jYWxzLnRhcmdldEVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCAmJiBiYXNlLmJyb3dzZXIuaXNUb3VjaCAhPT0gdHJ1ZSl7XG5cdFx0XHRcdFx0XHQkKGV2ZW50LnRhcmdldCkub24oXCJjbGljay5kaXNhYmxlXCIsIGZ1bmN0aW9uKGV2KXtcblx0XHRcdFx0XHRcdFx0ZXYuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHQkKGV2ZW50LnRhcmdldCkub2ZmKFwiY2xpY2suZGlzYWJsZVwiKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0dmFyIGhhbmRsZXJzID0gJC5fZGF0YShldmVudC50YXJnZXQsIFwiZXZlbnRzXCIpW1wiY2xpY2tcIl07XG5cdFx0XHRcdFx0XHR2YXIgb3dsU3RvcEV2ZW50ID0gaGFuZGxlcnMucG9wKCk7XG5cdFx0XHRcdFx0XHRoYW5kbGVycy5zcGxpY2UoMCwgMCwgb3dsU3RvcEV2ZW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c3dhcEV2ZW50cyhcIm9mZlwiKTtcblx0XHRcdH1cblx0XHRcdGJhc2UuJGVsZW0ub24oYmFzZS5ldl90eXBlc1tcInN0YXJ0XCJdLCBcIi5vd2wtd3JhcHBlclwiLCBkcmFnU3RhcnQpOyBcblx0XHR9LFxuXG5cdFx0Z2V0TmV3UG9zaXRpb24gOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzLFxuXHRcdFx0XHRuZXdQb3NpdGlvbjtcblx0XHRcdFxuXHRcdFx0bmV3UG9zaXRpb24gPSBiYXNlLmNsb3Nlc3RJdGVtKCk7XG5cblx0XHRcdGlmKG5ld1Bvc2l0aW9uPmJhc2UubWF4aW11bUl0ZW0pe1xuXHRcdFx0XHRiYXNlLmN1cnJlbnRJdGVtID0gYmFzZS5tYXhpbXVtSXRlbTtcblx0XHRcdFx0bmV3UG9zaXRpb24gID0gYmFzZS5tYXhpbXVtSXRlbTtcblx0XHRcdH0gZWxzZSBpZiggYmFzZS5uZXdQb3NYID49MCApe1xuXHRcdFx0XHRuZXdQb3NpdGlvbiA9IDA7XG5cdFx0XHRcdGJhc2UuY3VycmVudEl0ZW0gPSAwO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ld1Bvc2l0aW9uO1xuXHRcdH0sXG5cdFx0Y2xvc2VzdEl0ZW0gOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzLFxuXHRcdFx0XHRhcnJheSA9IGJhc2Uub3B0aW9ucy5zY3JvbGxQZXJQYWdlID09PSB0cnVlID8gYmFzZS5wYWdlc0luQXJyYXkgOiBiYXNlLnBvc2l0aW9uc0luQXJyYXksXG5cdFx0XHRcdGdvYWwgPSBiYXNlLm5ld1Bvc1gsXG5cdFx0XHRcdGNsb3Nlc3QgPSBudWxsO1xuXG5cdFx0XHQkLmVhY2goYXJyYXksIGZ1bmN0aW9uKGksdil7XG5cdFx0XHRcdGlmKCBnb2FsIC0gKGJhc2UuaXRlbVdpZHRoLzIwKSA+IGFycmF5W2krMV0gJiYgZ29hbCAtIChiYXNlLml0ZW1XaWR0aC8yMCk8IHYgJiYgYmFzZS5tb3ZlRGlyZWN0aW9uKCkgPT09IFwibGVmdFwiKSB7XG5cdFx0XHRcdFx0Y2xvc2VzdCA9IHY7XG5cdFx0XHRcdFx0aWYoYmFzZS5vcHRpb25zLnNjcm9sbFBlclBhZ2UgPT09IHRydWUpe1xuXHRcdFx0XHRcdFx0YmFzZS5jdXJyZW50SXRlbSA9ICQuaW5BcnJheShjbG9zZXN0LCBiYXNlLnBvc2l0aW9uc0luQXJyYXkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRiYXNlLmN1cnJlbnRJdGVtID0gaTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gXG5cdFx0XHRcdGVsc2UgaWYgKGdvYWwgKyAoYmFzZS5pdGVtV2lkdGgvMjApIDwgdiAmJiBnb2FsICsgKGJhc2UuaXRlbVdpZHRoLzIwKSA+IChhcnJheVtpKzFdIHx8IGFycmF5W2ldLWJhc2UuaXRlbVdpZHRoKSAmJiBiYXNlLm1vdmVEaXJlY3Rpb24oKSA9PT0gXCJyaWdodFwiKXtcblx0XHRcdFx0XHRpZihiYXNlLm9wdGlvbnMuc2Nyb2xsUGVyUGFnZSA9PT0gdHJ1ZSl7XG5cdFx0XHRcdFx0XHRjbG9zZXN0ID0gYXJyYXlbaSsxXSB8fCBhcnJheVthcnJheS5sZW5ndGgtMV07XG5cdFx0XHRcdFx0XHRiYXNlLmN1cnJlbnRJdGVtID0gJC5pbkFycmF5KGNsb3Nlc3QsIGJhc2UucG9zaXRpb25zSW5BcnJheSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNsb3Nlc3QgPSBhcnJheVtpKzFdO1xuXHRcdFx0XHRcdFx0YmFzZS5jdXJyZW50SXRlbSA9IGkrMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGJhc2UuY3VycmVudEl0ZW07XG5cdFx0fSxcblxuXHRcdG1vdmVEaXJlY3Rpb24gOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzLFxuXHRcdFx0XHRkaXJlY3Rpb247XG5cdFx0XHRpZihiYXNlLm5ld1JlbGF0aXZlWCA8IDAgKXtcblx0XHRcdFx0ZGlyZWN0aW9uID0gXCJyaWdodFwiXG5cdFx0XHRcdGJhc2UucGxheURpcmVjdGlvbiA9IFwibmV4dFwiXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkaXJlY3Rpb24gPSBcImxlZnRcIlxuXHRcdFx0XHRiYXNlLnBsYXlEaXJlY3Rpb24gPSBcInByZXZcIlxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRpcmVjdGlvblxuXHRcdH0sXG5cblx0XHRjdXN0b21FdmVudHMgOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXHRcdFx0YmFzZS4kZWxlbS5vbihcIm93bC5uZXh0XCIsZnVuY3Rpb24oKXtcblx0XHRcdFx0YmFzZS5uZXh0KCk7XG5cdFx0XHR9KTtcblx0XHRcdGJhc2UuJGVsZW0ub24oXCJvd2wucHJldlwiLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGJhc2UucHJldigpO1xuXHRcdFx0fSk7XG5cdFx0XHRiYXNlLiRlbGVtLm9uKFwib3dsLnBsYXlcIixmdW5jdGlvbihldmVudCxzcGVlZCl7XG5cdFx0XHRcdGJhc2Uub3B0aW9ucy5hdXRvUGxheSA9IHNwZWVkO1xuXHRcdFx0XHRiYXNlLnBsYXkoKTtcblx0XHRcdFx0YmFzZS5ob3ZlclN0YXR1cyA9IFwicGxheVwiO1xuXHRcdFx0fSk7XG5cdFx0XHRiYXNlLiRlbGVtLm9uKFwib3dsLnN0b3BcIixmdW5jdGlvbigpe1xuXHRcdFx0XHRiYXNlLnN0b3AoKTtcblx0XHRcdFx0YmFzZS5ob3ZlclN0YXR1cyA9IFwic3RvcFwiO1xuXHRcdFx0fSk7XG5cdFx0XHRiYXNlLiRlbGVtLm9uKFwib3dsLmdvVG9cIixmdW5jdGlvbihldmVudCxpdGVtKXtcblx0XHRcdFx0YmFzZS5nb1RvKGl0ZW0pXG5cdFx0XHR9KTtcblx0XHRcdGJhc2UuJGVsZW0ub24oXCJvd2wuanVtcFRvXCIsZnVuY3Rpb24oZXZlbnQsaXRlbSl7XG5cdFx0XHRcdGJhc2UuanVtcFRvKGl0ZW0pXG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdFxuXHRcdHN0b3BPbkhvdmVyIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdGlmKGJhc2Uub3B0aW9ucy5zdG9wT25Ib3ZlciA9PT0gdHJ1ZSAmJiBiYXNlLmJyb3dzZXIuaXNUb3VjaCAhPT0gdHJ1ZSAmJiBiYXNlLm9wdGlvbnMuYXV0b1BsYXkgIT09IGZhbHNlKXtcblx0XHRcdFx0YmFzZS4kZWxlbS5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGJhc2Uuc3RvcCgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0YmFzZS4kZWxlbS5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0aWYoYmFzZS5ob3ZlclN0YXR1cyAhPT0gXCJzdG9wXCIpe1xuXHRcdFx0XHRcdFx0YmFzZS5wbGF5KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0bGF6eUxvYWQgOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXG5cdFx0XHRpZihiYXNlLm9wdGlvbnMubGF6eUxvYWQgPT09IGZhbHNlKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0Zm9yKHZhciBpPTA7IGk8YmFzZS5pdGVtc0Ftb3VudDsgaSsrKXtcblx0XHRcdFx0dmFyICRpdGVtID0gJChiYXNlLiRvd2xJdGVtc1tpXSk7XG5cblx0XHRcdFx0aWYoJGl0ZW0uZGF0YShcIm93bC1sb2FkZWRcIikgPT09IFwibG9hZGVkXCIpe1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyXHRpdGVtTnVtYmVyID0gJGl0ZW0uZGF0YShcIm93bC1pdGVtXCIpLFxuXHRcdFx0XHRcdCRsYXp5SW1nID0gJGl0ZW0uZmluZChcIi5sYXp5T3dsXCIpLFxuXHRcdFx0XHRcdGZvbGxvdztcblxuXHRcdFx0XHRpZiggdHlwZW9mICRsYXp5SW1nLmRhdGEoXCJzcmNcIikgIT09IFwic3RyaW5nXCIpe1xuXHRcdFx0XHRcdCRpdGVtLmRhdGEoXCJvd2wtbG9hZGVkXCIsXCJsb2FkZWRcIik7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cdFx0XHRcdFxuXHRcdFx0XHRpZigkaXRlbS5kYXRhKFwib3dsLWxvYWRlZFwiKSA9PT0gdW5kZWZpbmVkKXtcblx0XHRcdFx0XHQkbGF6eUltZy5oaWRlKCk7XG5cdFx0XHRcdFx0JGl0ZW0uYWRkQ2xhc3MoXCJsb2FkaW5nXCIpLmRhdGEoXCJvd2wtbG9hZGVkXCIsXCJjaGVja2VkXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGJhc2Uub3B0aW9ucy5sYXp5Rm9sbG93ID09PSB0cnVlKXtcblx0XHRcdFx0XHRmb2xsb3cgPSBpdGVtTnVtYmVyID49IGJhc2UuY3VycmVudEl0ZW07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Zm9sbG93ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihmb2xsb3cgJiYgaXRlbU51bWJlciA8IGJhc2UuY3VycmVudEl0ZW0gKyBiYXNlLm9wdGlvbnMuaXRlbXMgJiYgJGxhenlJbWcubGVuZ3RoKXtcblx0XHRcdFx0XHRiYXNlLmxhenlQcmVsb2FkKCRpdGVtLCRsYXp5SW1nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRsYXp5UHJlbG9hZCA6IGZ1bmN0aW9uKCRpdGVtLCRsYXp5SW1nKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcyxcblx0XHRcdFx0aXRlcmF0aW9ucyA9IDA7XG5cdFx0XHRcdGlmICgkbGF6eUltZy5wcm9wKFwidGFnTmFtZVwiKSA9PT0gXCJESVZcIikge1xuXHRcdFx0XHRcdCRsYXp5SW1nLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgXCJ1cmwoXCIgKyAkbGF6eUltZy5kYXRhKFwic3JjXCIpKyBcIilcIiApO1xuXHRcdFx0XHRcdHZhciBpc0JhY2tncm91bmRJbWc9dHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkbGF6eUltZ1swXS5zcmMgPSAkbGF6eUltZy5kYXRhKFwic3JjXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNoZWNrTGF6eUltYWdlKCk7XG5cblx0XHRcdGZ1bmN0aW9uIGNoZWNrTGF6eUltYWdlKCl7XG5cdFx0XHRcdGl0ZXJhdGlvbnMgKz0gMTtcblx0XHRcdFx0aWYgKGJhc2UuY29tcGxldGVJbWcoJGxhenlJbWcuZ2V0KDApKSB8fCBpc0JhY2tncm91bmRJbWcgPT09IHRydWUpIHtcblx0XHRcdFx0XHRzaG93SW1hZ2UoKTtcblx0XHRcdFx0fSBlbHNlIGlmKGl0ZXJhdGlvbnMgPD0gMTAwKXsvL2lmIGltYWdlIGxvYWRzIGluIGxlc3MgdGhhbiAxMCBzZWNvbmRzIFxuXHRcdFx0XHRcdHNldFRpbWVvdXQoY2hlY2tMYXp5SW1hZ2UsMTAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzaG93SW1hZ2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gc2hvd0ltYWdlKCl7XG5cdFx0XHRcdCRpdGVtLmRhdGEoXCJvd2wtbG9hZGVkXCIsIFwibG9hZGVkXCIpLnJlbW92ZUNsYXNzKFwibG9hZGluZ1wiKTtcblx0XHRcdFx0JGxhenlJbWcucmVtb3ZlQXR0cihcImRhdGEtc3JjXCIpO1xuXHRcdFx0XHRiYXNlLm9wdGlvbnMubGF6eUVmZmVjdCA9PT0gXCJmYWRlXCIgPyAkbGF6eUltZy5mYWRlSW4oNDAwKSA6ICRsYXp5SW1nLnNob3coKTtcblx0XHRcdFx0aWYodHlwZW9mIGJhc2Uub3B0aW9ucy5hZnRlckxhenlMb2FkID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRiYXNlLm9wdGlvbnMuYWZ0ZXJMYXp5TG9hZC5hcHBseSh0aGlzLFtiYXNlLiRlbGVtXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YXV0b0hlaWdodCA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHR2YXIgJGN1cnJlbnRpbWcgPSAkKGJhc2UuJG93bEl0ZW1zW2Jhc2UuY3VycmVudEl0ZW1dKS5maW5kKFwiaW1nXCIpO1xuXG5cdFx0XHRpZigkY3VycmVudGltZy5nZXQoMCkgIT09IHVuZGVmaW5lZCApe1xuXHRcdFx0XHR2YXIgaXRlcmF0aW9ucyA9IDA7XG5cdFx0XHRcdGNoZWNrSW1hZ2UoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFkZEhlaWdodCgpO1xuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gY2hlY2tJbWFnZSgpe1xuXHRcdFx0XHRpdGVyYXRpb25zICs9IDE7XG5cdFx0XHRcdGlmICggYmFzZS5jb21wbGV0ZUltZygkY3VycmVudGltZy5nZXQoMCkpICkge1xuXHRcdFx0XHRcdGFkZEhlaWdodCgpO1xuXHRcdFx0XHR9IGVsc2UgaWYoaXRlcmF0aW9ucyA8PSAxMDApeyAvL2lmIGltYWdlIGxvYWRzIGluIGxlc3MgdGhhbiAxMCBzZWNvbmRzIFxuXHRcdFx0XHRcdHNldFRpbWVvdXQoY2hlY2tJbWFnZSwxMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJhc2Uud3JhcHBlck91dGVyLmNzcyhcImhlaWdodFwiLCBcIlwiKTsgLy9FbHNlIHJlbW92ZSBoZWlnaHQgYXR0cmlidXRlXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYWRkSGVpZ2h0KCl7XG5cdFx0XHRcdHZhciAkY3VycmVudEl0ZW0gPSAkKGJhc2UuJG93bEl0ZW1zW2Jhc2UuY3VycmVudEl0ZW1dKS5oZWlnaHQoKTtcblx0XHRcdFx0YmFzZS53cmFwcGVyT3V0ZXIuY3NzKFwiaGVpZ2h0XCIsJGN1cnJlbnRJdGVtK1wicHhcIik7XG5cdFx0XHRcdGlmKCFiYXNlLndyYXBwZXJPdXRlci5oYXNDbGFzcyhcImF1dG9IZWlnaHRcIikpe1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGJhc2Uud3JhcHBlck91dGVyLmFkZENsYXNzKFwiYXV0b0hlaWdodFwiKTtcblx0XHRcdFx0XHR9LDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGNvbXBsZXRlSW1nIDogZnVuY3Rpb24oaW1nKSB7XG5cdFx0ICAgIGlmICghaW1nLmNvbXBsZXRlKSB7XG5cdFx0ICAgICAgICByZXR1cm4gZmFsc2U7XG5cdFx0ICAgIH1cblx0XHQgICAgaWYgKHR5cGVvZiBpbWcubmF0dXJhbFdpZHRoICE9PSBcInVuZGVmaW5lZFwiICYmIGltZy5uYXR1cmFsV2lkdGggPT0gMCkge1xuXHRcdCAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHRcdCAgICB9XG5cdFx0ICAgIHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRvblZpc2libGVJdGVtcyA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cblx0XHRcdGlmKGJhc2Uub3B0aW9ucy5hZGRDbGFzc0FjdGl2ZSA9PT0gdHJ1ZSl7XG5cdFx0XHRcdGJhc2UuJG93bEl0ZW1zLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdFx0fVxuXHRcdFx0YmFzZS52aXNpYmxlSXRlbXMgPSBbXTtcblx0XHRcdGZvcih2YXIgaT1iYXNlLmN1cnJlbnRJdGVtOyBpPGJhc2UuY3VycmVudEl0ZW0gKyBiYXNlLm9wdGlvbnMuaXRlbXM7IGkrKyl7XG5cdFx0XHRcdGJhc2UudmlzaWJsZUl0ZW1zLnB1c2goaSk7XG5cblx0XHRcdFx0aWYoYmFzZS5vcHRpb25zLmFkZENsYXNzQWN0aXZlID09PSB0cnVlKXtcblx0XHRcdFx0XHQkKGJhc2UuJG93bEl0ZW1zW2ldKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YmFzZS5vd2wudmlzaWJsZUl0ZW1zID0gYmFzZS52aXNpYmxlSXRlbXM7XG5cdFx0fSxcblxuXHRcdHRyYW5zaXRpb25UeXBlcyA6IGZ1bmN0aW9uKGNsYXNzTmFtZSl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHQvL0N1cnJlbnRseSBhdmFpbGFibGU6IFwiZmFkZVwiLFwiYmFja1NsaWRlXCIsXCJnb0Rvd25cIixcImZhZGVVcFwiXG5cdFx0XHRiYXNlLm91dENsYXNzID0gXCJvd2wtXCIrY2xhc3NOYW1lK1wiLW91dFwiO1xuXHRcdFx0YmFzZS5pbkNsYXNzID0gXCJvd2wtXCIrY2xhc3NOYW1lK1wiLWluXCI7XG5cdFx0fSxcblxuXHRcdHNpbmdsZUl0ZW1UcmFuc2l0aW9uIDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdGJhc2UuaXNUcmFuc2l0aW9uID0gdHJ1ZTtcblxuXHRcdFx0dmFyIG91dENsYXNzID0gYmFzZS5vdXRDbGFzcyxcblx0XHRcdFx0aW5DbGFzcyA9IGJhc2UuaW5DbGFzcyxcblx0XHRcdFx0JGN1cnJlbnRJdGVtID0gYmFzZS4kb3dsSXRlbXMuZXEoYmFzZS5jdXJyZW50SXRlbSksXG5cdFx0XHRcdCRwcmV2SXRlbSA9IGJhc2UuJG93bEl0ZW1zLmVxKGJhc2UucHJldkl0ZW0pLFxuXHRcdFx0XHRwcmV2UG9zID0gTWF0aC5hYnMoYmFzZS5wb3NpdGlvbnNJbkFycmF5W2Jhc2UuY3VycmVudEl0ZW1dKSArIGJhc2UucG9zaXRpb25zSW5BcnJheVtiYXNlLnByZXZJdGVtXSxcblx0XHRcdFx0b3JpZ2luID0gTWF0aC5hYnMoYmFzZS5wb3NpdGlvbnNJbkFycmF5W2Jhc2UuY3VycmVudEl0ZW1dKStiYXNlLml0ZW1XaWR0aC8yO1xuXG4gICAgICAgICAgICBiYXNlLiRvd2xXcmFwcGVyXG5cdCAgICAgICAgICAgIC5hZGRDbGFzcygnb3dsLW9yaWdpbicpXG5cdCAgICAgICAgICAgIC5jc3Moe1xuXHQgICAgICAgICAgICBcdFwiLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luXCIgOiBvcmlnaW4rXCJweFwiLFxuXHQgICAgICAgICAgICBcdFwiLW1vei1wZXJzcGVjdGl2ZS1vcmlnaW5cIiA6IG9yaWdpbitcInB4XCIsXG5cdCAgICAgICAgICAgIFx0XCJwZXJzcGVjdGl2ZS1vcmlnaW5cIiA6IG9yaWdpbitcInB4XCJcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgZnVuY3Rpb24gdHJhbnNTdHlsZXMocHJldlBvcyx6aW5kZXgpe1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFwicG9zaXRpb25cIiA6IFwicmVsYXRpdmVcIixcblx0XHRcdFx0XHRcImxlZnRcIiA6IHByZXZQb3MrXCJweFwiXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0ICAgICAgICB2YXIgYW5pbUVuZCA9ICd3ZWJraXRBbmltYXRpb25FbmQgb0FuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBhbmltYXRpb25lbmQnO1xuXG5cdFx0XHQkcHJldkl0ZW1cblx0XHRcdC5jc3ModHJhbnNTdHlsZXMocHJldlBvcywxMCkpXG5cdFx0XHQuYWRkQ2xhc3Mob3V0Q2xhc3MpXG5cdFx0XHQub24oYW5pbUVuZCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGJhc2UuZW5kUHJldiA9IHRydWU7XG5cdFx0XHRcdCRwcmV2SXRlbS5vZmYoYW5pbUVuZCk7XG5cdFx0ICAgIFx0YmFzZS5jbGVhclRyYW5zU3R5bGUoJHByZXZJdGVtLG91dENsYXNzKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkY3VycmVudEl0ZW1cblx0XHRcdC5hZGRDbGFzcyhpbkNsYXNzKVxuXHRcdFx0Lm9uKGFuaW1FbmQsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRiYXNlLmVuZEN1cnJlbnQgPSB0cnVlO1xuXHRcdFx0XHQkY3VycmVudEl0ZW0ub2ZmKGFuaW1FbmQpO1xuXHRcdCAgICBcdGJhc2UuY2xlYXJUcmFuc1N0eWxlKCRjdXJyZW50SXRlbSxpbkNsYXNzKTtcblx0XHQgICAgfSk7XG5cdFx0fSxcblxuXHRcdGNsZWFyVHJhbnNTdHlsZSA6IGZ1bmN0aW9uKGl0ZW0sY2xhc3NUb1JlbW92ZSl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRpdGVtLmNzcyh7XG5cdFx0XHRcdFx0XCJwb3NpdGlvblwiIDogXCJcIixcblx0XHRcdFx0XHRcImxlZnRcIiA6IFwiXCJcblx0XHRcdFx0fSlcblx0XHRcdFx0LnJlbW92ZUNsYXNzKGNsYXNzVG9SZW1vdmUpO1xuXHRcdFx0aWYoYmFzZS5lbmRQcmV2ICYmIGJhc2UuZW5kQ3VycmVudCl7XG5cdFx0XHRcdGJhc2UuJG93bFdyYXBwZXIucmVtb3ZlQ2xhc3MoJ293bC1vcmlnaW4nKTtcblx0XHRcdFx0YmFzZS5lbmRQcmV2ID0gZmFsc2U7XG5cdFx0XHRcdGJhc2UuZW5kQ3VycmVudCA9IGZhbHNlO1xuXHRcdFx0XHRiYXNlLmlzVHJhbnNpdGlvbiA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRvd2xTdGF0dXMgOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXHRcdFx0YmFzZS5vd2wgPSB7XG5cdFx0XHRcdFwidXNlck9wdGlvbnNcIlx0OiBiYXNlLnVzZXJPcHRpb25zLFxuXHRcdFx0XHRcImJhc2VFbGVtZW50XCIgXHQ6IGJhc2UuJGVsZW0sXG5cdFx0XHRcdFwidXNlckl0ZW1zXCJcdFx0OiBiYXNlLiR1c2VySXRlbXMsXG5cdFx0XHRcdFwib3dsSXRlbXNcIlx0XHQ6IGJhc2UuJG93bEl0ZW1zLFxuXHRcdFx0XHRcImN1cnJlbnRJdGVtXCJcdDogYmFzZS5jdXJyZW50SXRlbSxcblx0XHRcdFx0XCJwcmV2SXRlbVwiXHRcdDogYmFzZS5wcmV2SXRlbSxcblx0XHRcdFx0XCJ2aXNpYmxlSXRlbXNcIlx0OiBiYXNlLnZpc2libGVJdGVtcyxcblx0XHRcdFx0XCJpc1RvdWNoXCIgXHRcdDogYmFzZS5icm93c2VyLmlzVG91Y2gsXG5cdFx0XHRcdFwiYnJvd3NlclwiXHRcdDogYmFzZS5icm93c2VyLFxuXHRcdFx0XHRcImRyYWdEaXJlY3Rpb25cIiA6IGJhc2UuZHJhZ0RpcmVjdGlvblxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRjbGVhckV2ZW50cyA6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYmFzZSA9IHRoaXM7XG5cdFx0XHRiYXNlLiRlbGVtLm9mZihcIi5vd2wgb3dsIG1vdXNlZG93bi5kaXNhYmxlVGV4dFNlbGVjdFwiKTtcblx0XHRcdCQoZG9jdW1lbnQpLm9mZihcIi5vd2wgb3dsXCIpO1xuXHRcdFx0JCh3aW5kb3cpLm9mZihcInJlc2l6ZVwiLCBiYXNlLnJlc2l6ZXIpO1xuXHRcdH0sXG5cblx0XHR1bldyYXAgOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXHRcdFx0aWYoYmFzZS4kZWxlbS5jaGlsZHJlbigpLmxlbmd0aCAhPT0gMCl7XG5cdFx0XHRcdGJhc2UuJG93bFdyYXBwZXIudW53cmFwKCk7XG5cdFx0XHRcdGJhc2UuJHVzZXJJdGVtcy51bndyYXAoKS51bndyYXAoKTtcblx0XHRcdFx0aWYoYmFzZS5vd2xDb250cm9scyl7XG5cdFx0XHRcdFx0YmFzZS5vd2xDb250cm9scy5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YmFzZS5jbGVhckV2ZW50cygpO1xuXHRcdFx0YmFzZS4kZWxlbVxuXHRcdFx0XHQuYXR0cihcInN0eWxlXCIsIGJhc2UuJGVsZW0uZGF0YShcIm93bC1vcmlnaW5hbFN0eWxlc1wiKSB8fCBcIlwiKVxuXHRcdFx0XHQuYXR0cihcImNsYXNzXCIsIGJhc2UuJGVsZW0uZGF0YShcIm93bC1vcmlnaW5hbENsYXNzZXNcIikpO1xuXHRcdH0sXG5cblx0XHRkZXN0cm95IDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBiYXNlID0gdGhpcztcblx0XHRcdGJhc2Uuc3RvcCgpO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbChiYXNlLmNoZWNrVmlzaWJsZSk7XG5cdFx0XHRiYXNlLnVuV3JhcCgpO1xuXHRcdFx0YmFzZS4kZWxlbS5yZW1vdmVEYXRhKCk7XG5cdFx0fSxcblxuXHRcdHJlaW5pdCA6IGZ1bmN0aW9uKG5ld09wdGlvbnMpe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzO1xuXHRcdFx0dmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgYmFzZS51c2VyT3B0aW9ucywgbmV3T3B0aW9ucyk7XG5cdFx0IFx0YmFzZS51bldyYXAoKTtcblx0XHQgXHRiYXNlLmluaXQob3B0aW9ucyxiYXNlLiRlbGVtKTtcblx0XHR9LFxuXG5cdFx0YWRkSXRlbSA6IGZ1bmN0aW9uKGh0bWxTdHJpbmcsdGFyZ2V0UG9zaXRpb24pe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzLFxuXHRcdFx0XHRwb3NpdGlvbjtcblxuXHRcdFx0aWYoIWh0bWxTdHJpbmcpe3JldHVybiBmYWxzZX1cblxuXHRcdFx0aWYoYmFzZS4kZWxlbS5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdGJhc2UuJGVsZW0uYXBwZW5kKGh0bWxTdHJpbmcpO1xuXHRcdFx0XHRiYXNlLnNldFZhcnMoKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0YmFzZS51bldyYXAoKTtcblx0XHRcdGlmKHRhcmdldFBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0UG9zaXRpb24gPT09IC0xKXtcblx0XHRcdFx0cG9zaXRpb24gPSAtMTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBvc2l0aW9uID0gdGFyZ2V0UG9zaXRpb247XG5cdFx0XHR9XG5cdFx0XHRpZihwb3NpdGlvbiA+PSBiYXNlLiR1c2VySXRlbXMubGVuZ3RoIHx8IHBvc2l0aW9uID09PSAtMSl7XG5cdFx0XHRcdGJhc2UuJHVzZXJJdGVtcy5lcSgtMSkuYWZ0ZXIoaHRtbFN0cmluZylcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJhc2UuJHVzZXJJdGVtcy5lcShwb3NpdGlvbikuYmVmb3JlKGh0bWxTdHJpbmcpXG5cdFx0XHR9XG5cblx0XHRcdGJhc2Uuc2V0VmFycygpO1xuXHRcdH0sXG5cblx0XHRyZW1vdmVJdGVtIDogZnVuY3Rpb24odGFyZ2V0UG9zaXRpb24pe1xuXHRcdFx0dmFyIGJhc2UgPSB0aGlzLFxuXHRcdFx0XHRwb3NpdGlvbjtcblxuXHRcdFx0aWYoYmFzZS4kZWxlbS5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMCl7cmV0dXJuIGZhbHNlfVxuXHRcdFx0XG5cdFx0XHRpZih0YXJnZXRQb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldFBvc2l0aW9uID09PSAtMSl7XG5cdFx0XHRcdHBvc2l0aW9uID0gLTE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwb3NpdGlvbiA9IHRhcmdldFBvc2l0aW9uO1xuXHRcdFx0fVxuXG5cdFx0XHRiYXNlLnVuV3JhcCgpO1xuXHRcdFx0YmFzZS4kdXNlckl0ZW1zLmVxKHBvc2l0aW9uKS5yZW1vdmUoKTtcblx0XHRcdGJhc2Uuc2V0VmFycygpO1xuXHRcdH1cblxuXHR9O1xuXG5cdCQuZm4ub3dsQ2Fyb3VzZWwgPSBmdW5jdGlvbiggb3B0aW9ucyApe1xuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoXCJvd2wtaW5pdFwiKSA9PT0gdHJ1ZSl7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdCQodGhpcykuZGF0YShcIm93bC1pbml0XCIsIHRydWUpO1xuXHRcdFx0dmFyIGNhcm91c2VsID0gT2JqZWN0LmNyZWF0ZSggQ2Fyb3VzZWwgKTtcblx0XHRcdGNhcm91c2VsLmluaXQoIG9wdGlvbnMsIHRoaXMgKTtcblx0XHRcdCQuZGF0YSggdGhpcywgXCJvd2xDYXJvdXNlbFwiLCBjYXJvdXNlbCApO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQuZm4ub3dsQ2Fyb3VzZWwub3B0aW9ucyA9IHtcblxuXHRcdGl0ZW1zIDogNSxcblx0XHRpdGVtc0N1c3RvbSA6IGZhbHNlLFxuXHRcdGl0ZW1zRGVza3RvcCA6IFsxMTk5LDRdLFxuXHRcdGl0ZW1zRGVza3RvcFNtYWxsIDogWzk3OSwzXSxcblx0XHRpdGVtc1RhYmxldCA6IFs3NjgsMl0sXG5cdFx0aXRlbXNUYWJsZXRTbWFsbCA6IGZhbHNlLFxuXHRcdGl0ZW1zTW9iaWxlIDogWzQ3OSwxXSxcblx0XHRzaW5nbGVJdGVtIDogZmFsc2UsXG5cdFx0aXRlbXNTY2FsZVVwIDogZmFsc2UsXG5cblx0XHRzbGlkZVNwZWVkIDogMjAwLFxuXHRcdHBhZ2luYXRpb25TcGVlZCA6IDgwMCxcblx0XHRyZXdpbmRTcGVlZCA6IDEwMDAsXG5cblx0XHRhdXRvUGxheSA6IGZhbHNlLFxuXHRcdHN0b3BPbkhvdmVyIDogZmFsc2UsXG5cblx0XHRuYXZpZ2F0aW9uIDogZmFsc2UsXG5cdFx0bmF2aWdhdGlvblRleHQgOiBbXCJwcmV2XCIsXCJuZXh0XCJdLFxuXHRcdHJld2luZE5hdiA6IHRydWUsXG5cdFx0c2Nyb2xsUGVyUGFnZSA6IGZhbHNlLFxuXG5cdFx0cGFnaW5hdGlvbiA6IHRydWUsXG5cdFx0cGFnaW5hdGlvbk51bWJlcnMgOiBmYWxzZSxcblxuXHRcdHJlc3BvbnNpdmUgOiB0cnVlLFxuXHRcdHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA6IDIwMCxcblx0XHRyZXNwb25zaXZlQmFzZVdpZHRoXHQ6IHdpbmRvdyxcblx0XHRcblxuXHRcdGJhc2VDbGFzcyA6IFwib3dsLWNhcm91c2VsXCIsXG5cdFx0dGhlbWUgOiBcIm93bC10aGVtZVwiLFxuXG5cdFx0bGF6eUxvYWQgOiBmYWxzZSxcblx0XHRsYXp5Rm9sbG93IDogdHJ1ZSxcblx0XHRsYXp5RWZmZWN0IDogXCJmYWRlXCIsXG5cblx0XHRhdXRvSGVpZ2h0IDogZmFsc2UsXG5cblx0XHRqc29uUGF0aCA6IGZhbHNlLFxuXHRcdGpzb25TdWNjZXNzIDogZmFsc2UsXG5cblx0XHRkcmFnQmVmb3JlQW5pbUZpbmlzaCA6IHRydWUsXG5cdFx0bW91c2VEcmFnIDogdHJ1ZSxcblx0XHR0b3VjaERyYWcgOiB0cnVlLFxuXG5cdFx0YWRkQ2xhc3NBY3RpdmUgOiBmYWxzZSxcblx0XHR0cmFuc2l0aW9uU3R5bGUgOiBmYWxzZSxcblxuXHRcdGJlZm9yZVVwZGF0ZSA6IGZhbHNlLFxuXHRcdGFmdGVyVXBkYXRlIDogZmFsc2UsXG5cdFx0YmVmb3JlSW5pdCA6IGZhbHNlLFxuXHRcdGFmdGVySW5pdCA6IGZhbHNlLFxuXHRcdGJlZm9yZU1vdmUgOiBmYWxzZSxcblx0XHRhZnRlck1vdmUgOiBmYWxzZSxcblx0XHRhZnRlckFjdGlvbiA6IGZhbHNlLFxuXHRcdHN0YXJ0RHJhZ2dpbmcgOiBmYWxzZSxcblx0XHRhZnRlckxhenlMb2FkOiBmYWxzZVxuXHRcdFxuXHR9O1xufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApO1xuIl0sImZpbGUiOiJvd2wuY2Fyb3VzZWwuanMifQ==
