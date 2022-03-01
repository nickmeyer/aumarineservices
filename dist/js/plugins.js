





/*
 * Tipper v3.0.2 - 2014-02-12
 * A jQuery plugin for simple tooltips. Part of the formstone library.
 * http://formstone.it/tipper/
 *
 * Copyright 2014 Ben Plum; MIT Licensed
 */

!function(a){"use strict";function b(b){return h.formatter=d,a(this).not(".tipper-attached").addClass("tipper-attached").on("mouseenter.tipper",a.extend({},h,b||{}),c)}function c(b){g=a("body");var c=a(this),d=a.extend(!0,{},b.data,c.data("tipper-options")),h="";h+='<div class="tipper '+d.direction+'">',h+='<div class="tipper-content">',h+=d.formatter.apply(g,[c]),h+='<span class="tipper-caret"</span>',h+="</div>",h+="</div>",d.$target=c,d.$tipper=a(h),g.append(d.$tipper),d.$content=d.$tipper.find(".tipper-content"),d.$caret=d.$tipper.find(".tipper-caret"),d.offset=c.offset(),d.height=c.outerHeight(),d.width=c.outerWidth(),d.tipperPos={},d.caretPos={},d.contentPos={};var i=d.$caret.outerHeight(!0),j=d.$caret.outerWidth(!0),k=d.$content.outerHeight(!0),l=d.$content.outerWidth(!0)+j;"right"===d.direction||"left"===d.direction?(d.caretPos.top=(k-i)/2,d.contentPos.top=-k/2,"right"===d.direction?d.contentPos.left=j+d.margin:"left"===d.direction&&(d.contentPos.left=-(l+d.margin))):(d.caretPos.left=(l-j)/2,d.contentPos.left=-l/2,"bottom"===d.direction?d.contentPos.top=d.margin:"top"===d.direction&&(d.contentPos.top=-(k+d.margin))),d.$content.css(d.contentPos),d.$caret.css(d.caretPos),d.follow?d.$target.on("mousemove.tipper",d,e).trigger("mousemove"):("right"===d.direction||"left"===d.direction?(d.tipperPos.top=d.offset.top+d.height/2,"right"===d.direction?d.tipperPos.left=d.offset.left+d.width:"left"===d.direction&&(d.tipperPos.left=d.offset.left)):(d.tipperPos.left=d.offset.left+d.width/2,"bottom"===d.direction?d.tipperPos.top=d.offset.top+d.height:"top"===d.direction&&(d.tipperPos.top=d.offset.top)),d.$tipper.css(d.tipperPos)),d.$target.one("mouseleave.tipper",d,f)}function d(a){return a.data("title")}function e(a){var b=a.data;b.$tipper.css({left:a.pageX,top:a.pageY})}function f(a){var b=a.data;b.$tipper.remove(),b.$target.off("mousemove.tipper mouseleave.tipper")}var g,h={direction:"top",follow:!1,formatter:a.noop,margin:15},i={defaults:function(b){return h=a.extend(h,b||{}),a(this)},destroy:function(){return a(this).trigger("mouseleave.tipper").off(".tipper").removeClass("tipper-attached")}};a.fn.tipper=function(a){return i[a]?i[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof a&&a?this:b.apply(this,arguments)},a.tipper=function(a){"defaults"===a&&i.defaults.apply(this,Array.prototype.slice.call(arguments,1))}}(jQuery);



/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2012 David DeSandro / Metafizzy
 */
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[j],r=h("transitionDuration"));var s=b.event,t=b.event.handle?"handle":"dispatch",u;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",u&&clearTimeout(u),u=setTimeout(function(){s[t].apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var v=["width","height"],w=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=v.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&w.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return c=c.filter(function(a,b){return b.nodeType===1}),this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),w.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var x=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){x("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){x("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);





/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/(function(e){"use strict";e.fn.counterUp=function(t){var n=e.extend({time:400,delay:10},t);return this.each(function(){var t=e(this),r=n,i=function(){var e=[],n=r.time/r.delay,i=t.text(),s=/[0-9]+,[0-9]+/.test(i);i=i.replace(/,/g,"");var o=/^[0-9]+$/.test(i),u=/^[0-9]+\.[0-9]+$/.test(i),a=u?(i.split(".")[1]||[]).length:0;for(var f=n;f>=1;f--){var l=parseInt(i/n*f);u&&(l=parseFloat(i/n*f).toFixed(a));if(s)while(/(\d+)(\d{3})/.test(l.toString()))l=l.toString().replace(/(\d+)(\d{3})/,"$1,$2");e.unshift(l)}t.data("counterup-nums",e);t.text("0");var c=function(){t.text(t.data("counterup-nums").shift());if(t.data("counterup-nums").length)setTimeout(t.data("counterup-func"),r.delay);else{delete t.data("counterup-nums");t.data("counterup-nums",null);t.data("counterup-func",null)}};t.data("counterup-func",c);setTimeout(t.data("counterup-func"),r.delay)};t.waypoint(i,{offset:"100%",triggerOnce:!0})})}})(jQuery);





// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);



/*
                       _ _ _____                      _   _
                      | | |  __ \                    | | (_)
    ___  ___ _ __ ___ | | | |__) |_____   _____  __ _| |  _ ___
   / __|/ __| '__/ _ \| | |  _  // _ \ \ / / _ \/ _` | | | / __|
   \__ \ (__| | | (_) | | | | \ \  __/\ V /  __/ (_| | |_| \__ \
   |___/\___|_|  \___/|_|_|_|  \_\___| \_/ \___|\__,_|_(_) |___/
                                                        _/ |
                                                       |__/

    "Declarative on-scroll reveal animations."

/*=============================================================================

    scrollReveal.js is inspired by cbpScroller.js, © 2014, Codrops.

    Licensed under the MIT license.
    http://www.opensource.org/licenses/mit-license.php

    scrollReveal.js, © 2014 https://twitter.com/julianlloyd

=============================================================================*/

;(function(window){'use strict';var docElem=window.document.documentElement;function getViewportH(){var client=docElem['clientHeight'],inner=window['innerHeight'];return(client<inner)?inner:client}function getOffset(el){var offsetTop=0,offsetLeft=0;do{if(!isNaN(el.offsetTop)){offsetTop+=el.offsetTop}if(!isNaN(el.offsetLeft)){offsetLeft+=el.offsetLeft}}while(el=el.offsetParent)return{top:offsetTop,left:offsetLeft}}function isElementInViewport(el,h){var scrolled=window.pageYOffset,viewed=scrolled+getViewportH(),elH=el.offsetHeight,elTop=getOffset(el).top,elBottom=elTop+elH,h=h||0;return(elTop+elH*h)<=viewed&&(elBottom)>=scrolled}function extend(a,b){for(var key in b){if(b.hasOwnProperty(key)){a[key]=b[key]}}return a}function scrollReveal(options){this.options=extend(this.defaults,options);this._init()}scrollReveal.prototype={defaults:{axis:'y',distance:'25px',duration:'0.66s',delay:'0s',viewportFactor:0.33},_init:function(){var self=this;this.elems=Array.prototype.slice.call(docElem.querySelectorAll('[data-scrollReveal]'));this.scrolled=false;this.elems.forEach(function(el,i){self.animate(el)});var scrollHandler=function(){if(!self.scrolled){self.scrolled=true;setTimeout(function(){self._scrollPage()},60)}};var resizeHandler=function(){function delayed(){self._scrollPage();self.resizeTimeout=null}if(self.resizeTimeout){clearTimeout(self.resizeTimeout)}self.resizeTimeout=setTimeout(delayed,200)};window.addEventListener('scroll',scrollHandler,false);window.addEventListener('resize',resizeHandler,false)},_scrollPage:function(){var self=this;this.elems.forEach(function(el,i){if(isElementInViewport(el,self.options.viewportFactor)){self.animate(el)}});this.scrolled=false},parseLanguage:function(el){var words=el.getAttribute('data-scrollreveal').split(/[, ]+/),enterFrom,parsed={};function filter(words){var ret=[],blacklist=["from","the","and","then","but"];words.forEach(function(word,i){if(blacklist.indexOf(word)>-1){return}ret.push(word)});return ret}words=filter(words);words.forEach(function(word,i){switch(word){case"enter":enterFrom=words[i+1];if(enterFrom=="top"||enterFrom=="bottom"){parsed.axis="y"}if(enterFrom=="left"||enterFrom=="right"){parsed.axis="x"}return;case"after":parsed.delay=words[i+1];return;case"wait":parsed.delay=words[i+1];return;case"move":parsed.distance=words[i+1];return;case"over":parsed.duration=words[i+1];return;case"trigger":parsed.eventName=words[i+1];return;default:return}});if(enterFrom=="top"||enterFrom=="left"){if(!typeof parsed.distance=="undefined"){parsed.distance="-"+parsed.distance}else{parsed.distance="-"+this.options.distance}}return parsed},genCSS:function(el,axis){var parsed=this.parseLanguage(el);var dist=parsed.distance||this.options.distance,dur=parsed.duration||this.options.duration,delay=parsed.delay||this.options.delay,axis=parsed.axis||this.options.axis;var transition="-webkit-transition: all "+dur+" ease "+delay+";"+"-moz-transition: all "+dur+" ease "+delay+";"+"-o-transition: all "+dur+" ease "+delay+";"+"transition: all "+dur+" ease "+delay+";";var initial="-webkit-transform: translate"+axis+"("+dist+");"+"-moz-transform: translate"+axis+"("+dist+");"+"transform: translate"+axis+"("+dist+");"+"opacity: 0;";var target="-webkit-transform: translate"+axis+"(0);"+"-moz-transform: translate"+axis+"(0);"+"transform: translate"+axis+"(0);"+"opacity: 1;";return{transition:transition,initial:initial,target:target,totalDuration:((parseFloat(dur)+parseFloat(delay))*1000)}},animate:function(el){var css=this.genCSS(el);if(!el.getAttribute('data-sr-init')){el.setAttribute('style',css.initial);el.setAttribute('data-sr-init',true)}if(el.getAttribute('data-sr-complete')){return}if(isElementInViewport(el,this.options.viewportFactor)){el.setAttribute('style',css.target+css.transition);setTimeout(function(){el.removeAttribute('style');el.setAttribute('data-sr-complete',true)},css.totalDuration)}}};document.addEventListener("DOMContentLoaded",function(evt){window.scrollReveal=new scrollReveal()})})(window);








(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS.
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
}(function (jQuery) {

  "use strict";

  // globals
  var domfocus = false,
    mousefocus = false,
    tabindexcounter = 0,
    ascrailcounter = 2000,
    globalmaxzindex = 0;

  var $ = jQuery,       // sandbox
    _doc = document,
    _win = window,
    $window = $(_win);

  var delegatevents = [];

  // http://stackoverflow.com/questions/2161159/get-script-path
  function getScriptPath() {
    var scripts = _doc.currentScript || (function () { var s = _doc.getElementsByTagName('script'); return (s.length) ? s[s.length - 1] : false; })();
    var path = scripts ? scripts.src.split('?')[0] : '';
    return (path.split('/').length > 0) ? path.split('/').slice(0, -1).join('/') + '/' : '';
  }

  // based on code by Paul Irish https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  var setAnimationFrame = _win.requestAnimationFrame || _win.webkitRequestAnimationFrame || _win.mozRequestAnimationFrame || false;
  var clearAnimationFrame = _win.cancelAnimationFrame || _win.webkitCancelAnimationFrame || _win.mozCancelAnimationFrame || false;

  if (!setAnimationFrame) {
    var anilasttime = 0;
    setAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - anilasttime));
      var id = _win.setTimeout(function () { callback(currTime + timeToCall); },
        timeToCall);
      anilasttime = currTime + timeToCall;
      return id;
    };
    clearAnimationFrame = function (id) {
      _win.clearTimeout(id);
    };
  } else {
    if (!_win.cancelAnimationFrame) clearAnimationFrame = function (id) { };
  }

  var ClsMutationObserver = _win.MutationObserver || _win.WebKitMutationObserver || false;

  var now = Date.now || function () { return new Date().getTime(); };

  var _globaloptions = {
    zindex: "auto",
    cursoropacitymin: 0,
    cursoropacitymax: 1,
    cursorcolor: "#424242",
    cursorwidth: "6px",
    cursorborder: "1px solid #fff",
    cursorborderradius: "5px",
    scrollspeed: 40,
    mousescrollstep: 9 * 3,
    touchbehavior: false,   // deprecated
    emulatetouch: false,    // replacing touchbehavior
    hwacceleration: true,
    usetransition: true,
    boxzoom: false,
    dblclickzoom: true,
    gesturezoom: true,
    grabcursorenabled: true,
    autohidemode: true,
    background: "",
    iframeautoresize: true,
    cursorminheight: 32,
    preservenativescrolling: true,
    railoffset: false,
    railhoffset: false,
    bouncescroll: true,
    spacebarenabled: true,
    railpadding: {
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    },
    disableoutline: true,
    horizrailenabled: true,
    railalign: "right",
    railvalign: "bottom",
    enabletranslate3d: true,
    enablemousewheel: true,
    enablekeyboard: true,
    smoothscroll: true,
    sensitiverail: true,
    enablemouselockapi: true,
    //      cursormaxheight:false,
    cursorfixedheight: false,
    directionlockdeadzone: 6,
    hidecursordelay: 400,
    nativeparentscrolling: true,
    enablescrollonselection: true,
    overflowx: true,
    overflowy: true,
    cursordragspeed: 0.3,
    rtlmode: "auto",
    cursordragontouch: false,
    oneaxismousemode: "auto",
    scriptpath: getScriptPath(),
    preventmultitouchscrolling: true,
    disablemutationobserver: false,
    enableobserver: true,
    scrollbarid: false
  };

  var browserdetected = false;

  var getBrowserDetection = function () {

    if (browserdetected) return browserdetected;

    var _el = _doc.createElement('DIV'),
      _style = _el.style,
      _agent = navigator.userAgent,
      _platform = navigator.platform,
      d = {};

    d.haspointerlock = "pointerLockElement" in _doc || "webkitPointerLockElement" in _doc || "mozPointerLockElement" in _doc;

    d.isopera = ("opera" in _win); // 12-
    d.isopera12 = (d.isopera && ("getUserMedia" in navigator));
    d.isoperamini = (Object.prototype.toString.call(_win.operamini) === "[object OperaMini]");

    d.isie = (("all" in _doc) && ("attachEvent" in _el) && !d.isopera); //IE10-
    d.isieold = (d.isie && !("msInterpolationMode" in _style)); // IE6 and older
    d.isie7 = d.isie && !d.isieold && (!("documentMode" in _doc) || (_doc.documentMode === 7));
    d.isie8 = d.isie && ("documentMode" in _doc) && (_doc.documentMode === 8);
    d.isie9 = d.isie && ("performance" in _win) && (_doc.documentMode === 9);
    d.isie10 = d.isie && ("performance" in _win) && (_doc.documentMode === 10);
    d.isie11 = ("msRequestFullscreen" in _el) && (_doc.documentMode >= 11); // IE11+

    d.ismsedge = ("msCredentials" in _win);  // MS Edge 14+

    d.ismozilla = ("MozAppearance" in _style);

    d.iswebkit = !d.ismsedge && ("WebkitAppearance" in _style);

    d.ischrome = d.iswebkit && ("chrome" in _win);
    d.ischrome38 = (d.ischrome && ("touchAction" in _style)); // behavior changed in touch emulation
    d.ischrome22 = (!d.ischrome38) && (d.ischrome && d.haspointerlock);
    d.ischrome26 = (!d.ischrome38) && (d.ischrome && ("transition" in _style)); // issue with transform detection (maintain prefix)

    d.cantouch = ("ontouchstart" in _doc.documentElement) || ("ontouchstart" in _win); // with detection for Chrome Touch Emulation
    d.hasw3ctouch = (_win.PointerEvent || false) && ((navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)); //IE11 pointer events, following W3C Pointer Events spec
    d.hasmstouch = (!d.hasw3ctouch) && (_win.MSPointerEvent || false); // IE10 pointer events

    d.ismac = /^mac$/i.test(_platform);

    d.isios = d.cantouch && /iphone|ipad|ipod/i.test(_platform);
    d.isios4 = d.isios && !("seal" in Object);
    d.isios7 = d.isios && ("webkitHidden" in _doc);  //iOS 7+
    d.isios8 = d.isios && ("hidden" in _doc);  //iOS 8+
    d.isios10 = d.isios && _win.Proxy;  //iOS 10+

    d.isandroid = (/android/i.test(_agent));

    d.haseventlistener = ("addEventListener" in _el);

    d.trstyle = false;
    d.hastransform = false;
    d.hastranslate3d = false;
    d.transitionstyle = false;
    d.hastransition = false;
    d.transitionend = false;

    d.trstyle = "transform";
    d.hastransform = ("transform" in _style) || (function () {
      var check = ['msTransform', 'webkitTransform', 'MozTransform', 'OTransform'];
      for (var a = 0, c = check.length; a < c; a++) {
        if (_style[check[a]] !== undefined) {
          d.trstyle = check[a];
          break;
        }
      }
      d.hastransform = (!!d.trstyle);
    })();

    if (d.hastransform) {
      _style[d.trstyle] = "translate3d(1px,2px,3px)";
      d.hastranslate3d = /translate3d/.test(_style[d.trstyle]);
    }

    d.transitionstyle = "transition";
    d.prefixstyle = '';
    d.transitionend = "transitionend";

    d.hastransition = ("transition" in _style) || (function () {

      d.transitionend = false;
      var check = ['webkitTransition', 'msTransition', 'MozTransition', 'OTransition', 'OTransition', 'KhtmlTransition'];
      var prefix = ['-webkit-', '-ms-', '-moz-', '-o-', '-o', '-khtml-'];
      var evs = ['webkitTransitionEnd', 'msTransitionEnd', 'transitionend', 'otransitionend', 'oTransitionEnd', 'KhtmlTransitionEnd'];
      for (var a = 0, c = check.length; a < c; a++) {
        if (check[a] in _style) {
          d.transitionstyle = check[a];
          d.prefixstyle = prefix[a];
          d.transitionend = evs[a];
          break;
        }
      }
      if (d.ischrome26) d.prefixstyle = prefix[1];  // always use prefix

      d.hastransition = (d.transitionstyle);

    })();

    function detectCursorGrab() {
      var lst = ['grab', '-webkit-grab', '-moz-grab'];
      if ((d.ischrome && !d.ischrome38) || d.isie) lst = []; // force setting for IE returns false positive and chrome cursor bug
      for (var a = 0, l = lst.length; a < l; a++) {
        var p = lst[a];
        _style.cursor = p;
        if (_style.cursor == p) return p;
      }
      return 'url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize'; // thanks to https://cdnjs.com/ for the openhand cursor!
    }
    d.cursorgrabvalue = detectCursorGrab();

    d.hasmousecapture = ("setCapture" in _el);

    d.hasMutationObserver = (ClsMutationObserver !== false);

    _el = null; //memory released

    browserdetected = d;

    return d;
  };

  var NiceScrollClass = function (myopt, me) {

    var self = this;

    this.version = '3.7.6';
    this.name = 'nicescroll';

    this.me = me;

    var $body = $("body");

    var opt = this.opt = {
      doc: $body,
      win: false
    };

    $.extend(opt, _globaloptions);  // clone opts

    // Options for internal use
    opt.snapbackspeed = 80;

    if (myopt || false) {
      for (var a in opt) {
        if (myopt[a] !== undefined) opt[a] = myopt[a];
      }
    }

    if (opt.disablemutationobserver) ClsMutationObserver = false;

    this.doc = opt.doc;
    this.iddoc = (this.doc && this.doc[0]) ? this.doc[0].id || '' : '';
    this.ispage = /^BODY|HTML/.test((opt.win) ? opt.win[0].nodeName : this.doc[0].nodeName);
    this.haswrapper = (opt.win !== false);
    this.win = opt.win || (this.ispage ? $window : this.doc);
    this.docscroll = (this.ispage && !this.haswrapper) ? $window : this.win;
    this.body = $body;
    this.viewport = false;

    this.isfixed = false;

    this.iframe = false;
    this.isiframe = ((this.doc[0].nodeName == 'IFRAME') && (this.win[0].nodeName == 'IFRAME'));

    this.istextarea = (this.win[0].nodeName == 'TEXTAREA');

    this.forcescreen = false; //force to use screen position on events

    this.canshowonmouseevent = (opt.autohidemode != "scroll");

    // Events jump table
    this.onmousedown = false;
    this.onmouseup = false;
    this.onmousemove = false;
    this.onmousewheel = false;
    this.onkeypress = false;
    this.ongesturezoom = false;
    this.onclick = false;

    // Nicescroll custom events
    this.onscrollstart = false;
    this.onscrollend = false;
    this.onscrollcancel = false;

    this.onzoomin = false;
    this.onzoomout = false;

    // Let's start!
    this.view = false;
    this.page = false;

    this.scroll = {
      x: 0,
      y: 0
    };
    this.scrollratio = {
      x: 0,
      y: 0
    };
    this.cursorheight = 20;
    this.scrollvaluemax = 0;

    // http://dev.w3.org/csswg/css-writing-modes-3/#logical-to-physical
    // http://dev.w3.org/csswg/css-writing-modes-3/#svg-writing-mode
    if (opt.rtlmode == "auto") {
      var target = this.win[0] == _win ? this.body : this.win;
      var writingMode = target.css("writing-mode") || target.css("-webkit-writing-mode") || target.css("-ms-writing-mode") || target.css("-moz-writing-mode");

      if (writingMode == "horizontal-tb" || writingMode == "lr-tb" || writingMode === "") {
        this.isrtlmode = (target.css("direction") == "rtl");
        this.isvertical = false;
      } else {
        this.isrtlmode = (writingMode == "vertical-rl" || writingMode == "tb" || writingMode == "tb-rl" || writingMode == "rl-tb");
        this.isvertical = (writingMode == "vertical-rl" || writingMode == "tb" || writingMode == "tb-rl");
      }
    } else {
      this.isrtlmode = (opt.rtlmode === true);
      this.isvertical = false;
    }
    //    this.checkrtlmode = false;

    this.scrollrunning = false;

    this.scrollmom = false;

    this.observer = false;  // observer div changes
    this.observerremover = false;  // observer on parent for remove detection
    this.observerbody = false;  // observer on body for position change

    if (opt.scrollbarid !== false) {
      this.id = opt.scrollbarid;
    } else {
      do {
        this.id = "ascrail" + (ascrailcounter++);
      } while (_doc.getElementById(this.id));
    }

    this.rail = false;
    this.cursor = false;
    this.cursorfreezed = false;
    this.selectiondrag = false;

    this.zoom = false;
    this.zoomactive = false;

    this.hasfocus = false;
    this.hasmousefocus = false;

    //this.visibility = true;
    this.railslocked = false;  // locked by resize
    this.locked = false;  // prevent lost of locked status sets by user
    this.hidden = false; // rails always hidden
    this.cursoractive = true; // user can interact with cursors

    this.wheelprevented = false; //prevent mousewheel event

    this.overflowx = opt.overflowx;
    this.overflowy = opt.overflowy;

    this.nativescrollingarea = false;
    this.checkarea = 0;

    this.events = []; // event list for unbind

    this.saved = {};  // style saved

    this.delaylist = {};
    this.synclist = {};

    this.lastdeltax = 0;
    this.lastdeltay = 0;

    this.detected = getBrowserDetection();

    var cap = $.extend({}, this.detected);

    this.canhwscroll = (cap.hastransform && opt.hwacceleration);
    this.ishwscroll = (this.canhwscroll && self.haswrapper);

    if (!this.isrtlmode) {
      this.hasreversehr = false;
    } else if (this.isvertical) { // RTL mode with reverse horizontal axis
      this.hasreversehr = !(cap.iswebkit || cap.isie || cap.isie11);
    } else {
      this.hasreversehr = !(cap.iswebkit || (cap.isie && !cap.isie10 && !cap.isie11));
    }

    this.istouchcapable = false; // desktop devices with touch screen support

    //## Check WebKit-based desktop with touch support
    //## + Firefox 18 nightly build (desktop) false positive (or desktop with touch support)

    if (!cap.cantouch && (cap.hasw3ctouch || cap.hasmstouch)) {  // desktop device with multiple input
      this.istouchcapable = true;
    } else if (cap.cantouch && !cap.isios && !cap.isandroid && (cap.iswebkit || cap.ismozilla)) {
      this.istouchcapable = true;
    }

    //## disable MouseLock API on user request
    if (!opt.enablemouselockapi) {
      cap.hasmousecapture = false;
      cap.haspointerlock = false;
    }

    this.debounced = function (name, fn, tm) {
      if (!self) return;
      var dd = self.delaylist[name] || false;
      if (!dd) {
        self.delaylist[name] = {
          h: setAnimationFrame(function () {
            self.delaylist[name].fn.call(self);
            self.delaylist[name] = false;
          }, tm)
        };
        fn.call(self);
      }
      self.delaylist[name].fn = fn;
    };


    this.synched = function (name, fn) {
      if (self.synclist[name]) self.synclist[name] = fn;
      else {
        self.synclist[name] = fn;
        setAnimationFrame(function () {
          if (!self) return;
          self.synclist[name] && self.synclist[name].call(self);
          self.synclist[name] = null;
        });
      }
    };

    this.unsynched = function (name) {
      if (self.synclist[name]) self.synclist[name] = false;
    };

    this.css = function (el, pars) { // save & set
      for (var n in pars) {
        self.saved.css.push([el, n, el.css(n)]);
        el.css(n, pars[n]);
      }
    };

    this.scrollTop = function (val) {
      return (val === undefined) ? self.getScrollTop() : self.setScrollTop(val);
    };

    this.scrollLeft = function (val) {
      return (val === undefined) ? self.getScrollLeft() : self.setScrollLeft(val);
    };

    // derived by by Dan Pupius www.pupius.net
    var BezierClass = function (st, ed, spd, p1, p2, p3, p4) {

      this.st = st;
      this.ed = ed;
      this.spd = spd;

      this.p1 = p1 || 0;
      this.p2 = p2 || 1;
      this.p3 = p3 || 0;
      this.p4 = p4 || 1;

      this.ts = now();
      this.df = ed - st;
    };
    BezierClass.prototype = {
      B2: function (t) {
        return 3 * (1 - t) * (1 - t) * t;
      },
      B3: function (t) {
        return 3 * (1 - t) * t * t;
      },
      B4: function (t) {
        return t * t * t;
      },
      getPos: function () {
        return (now() - this.ts) / this.spd;
      },
      getNow: function () {
        var pc = (now() - this.ts) / this.spd;
        var bz = this.B2(pc) + this.B3(pc) + this.B4(pc);
        return (pc >= 1) ? this.ed : this.st + (this.df * bz) | 0;
      },
      update: function (ed, spd) {
        this.st = this.getNow();
        this.ed = ed;
        this.spd = spd;
        this.ts = now();
        this.df = this.ed - this.st;
        return this;
      }
    };

    //derived from http://stackoverflow.com/questions/11236090/
    function getMatrixValues() {
      var tr = self.doc.css(cap.trstyle);
      if (tr && (tr.substr(0, 6) == "matrix")) {
        return tr.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, '').split(/, +/);
      }
      return false;
    }

    if (this.ishwscroll) {    // hw accelerated scroll

      this.doc.translate = {
        x: 0,
        y: 0,
        tx: "0px",
        ty: "0px"
      };

      //this one can help to enable hw accel on ios6 http://indiegamr.com/ios6-html-hardware-acceleration-changes-and-how-to-fix-them/
      if (cap.hastranslate3d && cap.isios) this.doc.css("-webkit-backface-visibility", "hidden"); // prevent flickering http://stackoverflow.com/questions/3461441/

      this.getScrollTop = function (last) {
        if (!last) {
          var mtx = getMatrixValues();
          if (mtx) return (mtx.length == 16) ? -mtx[13] : -mtx[5]; //matrix3d 16 on IE10
          if (self.timerscroll && self.timerscroll.bz) return self.timerscroll.bz.getNow();
        }
        return self.doc.translate.y;
      };

      this.getScrollLeft = function (last) {
        if (!last) {
          var mtx = getMatrixValues();
          if (mtx) return (mtx.length == 16) ? -mtx[12] : -mtx[4]; //matrix3d 16 on IE10
          if (self.timerscroll && self.timerscroll.bh) return self.timerscroll.bh.getNow();
        }
        return self.doc.translate.x;
      };

      this.notifyScrollEvent = function (el) {
        var e = _doc.createEvent("UIEvents");
        e.initUIEvent("scroll", false, false, _win, 1);
        e.niceevent = true;
        el.dispatchEvent(e);
      };

      var cxscrollleft = (this.isrtlmode) ? 1 : -1;

      if (cap.hastranslate3d && opt.enabletranslate3d) {
        this.setScrollTop = function (val, silent) {
          self.doc.translate.y = val;
          self.doc.translate.ty = (val * -1) + "px";
          self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0)");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
        this.setScrollLeft = function (val, silent) {
          self.doc.translate.x = val;
          self.doc.translate.tx = (val * cxscrollleft) + "px";
          self.doc.css(cap.trstyle, "translate3d(" + self.doc.translate.tx + "," + self.doc.translate.ty + ",0)");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
      } else {
        this.setScrollTop = function (val, silent) {
          self.doc.translate.y = val;
          self.doc.translate.ty = (val * -1) + "px";
          self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
        this.setScrollLeft = function (val, silent) {
          self.doc.translate.x = val;
          self.doc.translate.tx = (val * cxscrollleft) + "px";
          self.doc.css(cap.trstyle, "translate(" + self.doc.translate.tx + "," + self.doc.translate.ty + ")");
          if (!silent) self.notifyScrollEvent(self.win[0]);
        };
      }
    } else {    // native scroll

      this.getScrollTop = function () {
        return self.docscroll.scrollTop();
      };
      this.setScrollTop = function (val) {
        self.docscroll.scrollTop(val);
      };

      this.getScrollLeft = function () {
        var val;
        if (!self.hasreversehr) {
          val = self.docscroll.scrollLeft();
        } else if (self.detected.ismozilla) {
          val = self.page.maxw - Math.abs(self.docscroll.scrollLeft());
        } else {
          val = self.page.maxw - self.docscroll.scrollLeft();
        }
        return val;
      };
      this.setScrollLeft = function (val) {
        return setTimeout(function () {
          if (!self) return;
          if (self.hasreversehr) {
            if (self.detected.ismozilla) {
              val = -(self.page.maxw - val);
            } else {
              val = self.page.maxw - val;
            }
          }
          return self.docscroll.scrollLeft(val);
        }, 1);
      };
    }

    this.getTarget = function (e) {
      if (!e) return false;
      if (e.target) return e.target;
      if (e.srcElement) return e.srcElement;
      return false;
    };

    this.hasParent = function (e, id) {
      if (!e) return false;
      var el = e.target || e.srcElement || e || false;
      while (el && el.id != id) {
        el = el.parentNode || false;
      }
      return (el !== false);
    };

    function getZIndex() {
      var dom = self.win;
      if ("zIndex" in dom) return dom.zIndex(); // use jQuery UI method when available
      while (dom.length > 0) {
        if (dom[0].nodeType == 9) return false;
        var zi = dom.css('zIndex');
        if (!isNaN(zi) && zi !== 0) return parseInt(zi);
        dom = dom.parent();
      }
      return false;
    }

    //inspired by http://forum.jquery.com/topic/width-includes-border-width-when-set-to-thin-medium-thick-in-ie
    var _convertBorderWidth = {
      "thin": 1,
      "medium": 3,
      "thick": 5
    };

    function getWidthToPixel(dom, prop, chkheight) {
      var wd = dom.css(prop);
      var px = parseFloat(wd);
      if (isNaN(px)) {
        px = _convertBorderWidth[wd] || 0;
        var brd = (px == 3) ? ((chkheight) ? (self.win.outerHeight() - self.win.innerHeight()) : (self.win.outerWidth() - self.win.innerWidth())) : 1; //DON'T TRUST CSS
        if (self.isie8 && px) px += 1;
        return (brd) ? px : 0;
      }
      return px;
    }

    this.getDocumentScrollOffset = function () {
      return {
        top: _win.pageYOffset || _doc.documentElement.scrollTop,
        left: _win.pageXOffset || _doc.documentElement.scrollLeft
      };
    };

    this.getOffset = function () {
      if (self.isfixed) {
        var ofs = self.win.offset();  // fix Chrome auto issue (when right/bottom props only)
        var scrl = self.getDocumentScrollOffset();
        ofs.top -= scrl.top;
        ofs.left -= scrl.left;
        return ofs;
      }
      var ww = self.win.offset();
      if (!self.viewport) return ww;
      var vp = self.viewport.offset();
      return {
        top: ww.top - vp.top,
        left: ww.left - vp.left
      };
    };

    this.updateScrollBar = function (len) {
      var pos, off;
      if (self.ishwscroll) {
        self.rail.css({
          height: self.win.innerHeight() - (opt.railpadding.top + opt.railpadding.bottom)
        });
        if (self.railh) self.railh.css({
          width: self.win.innerWidth() - (opt.railpadding.left + opt.railpadding.right)
        });
      } else {
        var wpos = self.getOffset();
        pos = {
          top: wpos.top,
          left: wpos.left - (opt.railpadding.left + opt.railpadding.right)
        };
        pos.top += getWidthToPixel(self.win, 'border-top-width', true);
        pos.left += (self.rail.align) ? self.win.outerWidth() - getWidthToPixel(self.win, 'border-right-width') - self.rail.width : getWidthToPixel(self.win, 'border-left-width');

        off = opt.railoffset;
        if (off) {
          if (off.top) pos.top += off.top;
          if (off.left) pos.left += off.left;
        }

        if (!self.railslocked) self.rail.css({
          top: pos.top,
          left: pos.left,
          height: ((len) ? len.h : self.win.innerHeight()) - (opt.railpadding.top + opt.railpadding.bottom)
        });

        if (self.zoom) {
          self.zoom.css({
            top: pos.top + 1,
            left: (self.rail.align == 1) ? pos.left - 20 : pos.left + self.rail.width + 4
          });
        }

        if (self.railh && !self.railslocked) {
          pos = {
            top: wpos.top,
            left: wpos.left
          };
          off = opt.railhoffset;
          if (off) {
            if (off.top) pos.top += off.top;
            if (off.left) pos.left += off.left;
          }
          var y = (self.railh.align) ? pos.top + getWidthToPixel(self.win, 'border-top-width', true) + self.win.innerHeight() - self.railh.height : pos.top + getWidthToPixel(self.win, 'border-top-width', true);
          var x = pos.left + getWidthToPixel(self.win, 'border-left-width');
          self.railh.css({
            top: y - (opt.railpadding.top + opt.railpadding.bottom),
            left: x,
            width: self.railh.width
          });
        }

      }
    };

    this.doRailClick = function (e, dbl, hr) {
      var fn, pg, cur, pos;

      if (self.railslocked) return;

      self.cancelEvent(e);

      if (!("pageY" in e)) {
        e.pageX = e.clientX + _doc.documentElement.scrollLeft;
        e.pageY = e.clientY + _doc.documentElement.scrollTop;
      }

      if (dbl) {
        fn = (hr) ? self.doScrollLeft : self.doScrollTop;
        cur = (hr) ? ((e.pageX - self.railh.offset().left - (self.cursorwidth / 2)) * self.scrollratio.x) : ((e.pageY - self.rail.offset().top - (self.cursorheight / 2)) * self.scrollratio.y);
        self.unsynched("relativexy");
        fn(cur|0);
      } else {
        fn = (hr) ? self.doScrollLeftBy : self.doScrollBy;
        cur = (hr) ? self.scroll.x : self.scroll.y;
        pos = (hr) ? e.pageX - self.railh.offset().left : e.pageY - self.rail.offset().top;
        pg = (hr) ? self.view.w : self.view.h;
        fn((cur >= pos) ? pg : -pg);
      }

    };

    self.newscrolly = self.newscrollx = 0;

    self.hasanimationframe = ("requestAnimationFrame" in _win);
    self.hascancelanimationframe = ("cancelAnimationFrame" in _win);

    self.hasborderbox = false;

    this.init = function () {

      self.saved.css = [];

      if (cap.isoperamini) return true; // SORRY, DO NOT WORK!
      if (cap.isandroid && !("hidden" in _doc)) return true; // Android 3- SORRY, DO NOT WORK!

      opt.emulatetouch = opt.emulatetouch || opt.touchbehavior;  // mantain compatibility with "touchbehavior"

      self.hasborderbox = _win.getComputedStyle && (_win.getComputedStyle(_doc.body)['box-sizing'] === "border-box");

      var _scrollyhidden = { 'overflow-y': 'hidden' };
      if (cap.isie11 || cap.isie10) _scrollyhidden['-ms-overflow-style'] = 'none';  // IE 10 & 11 is always a world apart!

      if (self.ishwscroll) {
        this.doc.css(cap.transitionstyle, cap.prefixstyle + 'transform 0ms ease-out');
        if (cap.transitionend) self.bind(self.doc, cap.transitionend, self.onScrollTransitionEnd, false); //I have got to do something usefull!!
      }

      self.zindex = "auto";
      if (!self.ispage && opt.zindex == "auto") {
        self.zindex = getZIndex() || "auto";
      } else {
        self.zindex = opt.zindex;
      }

      if (!self.ispage && self.zindex != "auto" && self.zindex > globalmaxzindex) {
        globalmaxzindex = self.zindex;
      }

      if (self.isie && self.zindex === 0 && opt.zindex == "auto") { // fix IE auto == 0
        self.zindex = "auto";
      }

      if (!self.ispage || !cap.isieold) {

        var cont = self.docscroll;
        if (self.ispage) cont = (self.haswrapper) ? self.win : self.doc;

        self.css(cont, _scrollyhidden);

        if (self.ispage && (cap.isie11 || cap.isie)) { // IE 7-11
          self.css($("html"), _scrollyhidden);
        }

        if (cap.isios && !self.ispage && !self.haswrapper) self.css($body, {
          "-webkit-overflow-scrolling": "touch"
        }); //force hw acceleration

        var cursor = $(_doc.createElement('div'));
        cursor.css({
          position: "relative",
          top: 0,
          "float": "right",
          width: opt.cursorwidth,
          height: 0,
          'background-color': opt.cursorcolor,
          border: opt.cursorborder,
          'background-clip': 'padding-box',
          '-webkit-border-radius': opt.cursorborderradius,
          '-moz-border-radius': opt.cursorborderradius,
          'border-radius': opt.cursorborderradius
        });

        cursor.addClass('nicescroll-cursors');

        self.cursor = cursor;

        var rail = $(_doc.createElement('div'));
        rail.attr('id', self.id);
        rail.addClass('nicescroll-rails nicescroll-rails-vr');

        var v, a, kp = ["left", "right", "top", "bottom"];  //**
        for (var n in kp) {
          a = kp[n];
          v = opt.railpadding[a] || 0;
          v && rail.css("padding-" + a, v + "px");
        }

        rail.append(cursor);

        rail.width = Math.max(parseFloat(opt.cursorwidth), cursor.outerWidth());
        rail.css({
          width: rail.width + "px",
          zIndex: self.zindex,
          background: opt.background,
          cursor: "default"
        });

        rail.visibility = true;
        rail.scrollable = true;

        rail.align = (opt.railalign == "left") ? 0 : 1;

        self.rail = rail;

        self.rail.drag = false;

        var zoom = false;
        if (opt.boxzoom && !self.ispage && !cap.isieold) {
          zoom = _doc.createElement('div');

          self.bind(zoom, "click", self.doZoom);
          self.bind(zoom, "mouseenter", function () {
            self.zoom.css('opacity', opt.cursoropacitymax);
          });
          self.bind(zoom, "mouseleave", function () {
            self.zoom.css('opacity', opt.cursoropacitymin);
          });

          self.zoom = $(zoom);
          self.zoom.css({
            cursor: "pointer",
            zIndex: self.zindex,
            backgroundImage: 'url(' + opt.scriptpath + 'zoomico.png)',
            height: 18,
            width: 18,
            backgroundPosition: '0 0'
          });
          if (opt.dblclickzoom) self.bind(self.win, "dblclick", self.doZoom);
          if (cap.cantouch && opt.gesturezoom) {
            self.ongesturezoom = function (e) {
              if (e.scale > 1.5) self.doZoomIn(e);
              if (e.scale < 0.8) self.doZoomOut(e);
              return self.cancelEvent(e);
            };
            self.bind(self.win, "gestureend", self.ongesturezoom);
          }
        }

        // init HORIZ

        self.railh = false;
        var railh;

        if (opt.horizrailenabled) {

          self.css(cont, {
            overflowX: 'hidden'
          });

          cursor = $(_doc.createElement('div'));
          cursor.css({
            position: "absolute",
            top: 0,
            height: opt.cursorwidth,
            width: 0,
            backgroundColor: opt.cursorcolor,
            border: opt.cursorborder,
            backgroundClip: 'padding-box',
            '-webkit-border-radius': opt.cursorborderradius,
            '-moz-border-radius': opt.cursorborderradius,
            'border-radius': opt.cursorborderradius
          });

          if (cap.isieold) cursor.css('overflow', 'hidden');  //IE6 horiz scrollbar issue

          cursor.addClass('nicescroll-cursors');

          self.cursorh = cursor;

          railh = $(_doc.createElement('div'));
          railh.attr('id', self.id + '-hr');
          railh.addClass('nicescroll-rails nicescroll-rails-hr');
          railh.height = Math.max(parseFloat(opt.cursorwidth), cursor.outerHeight());
          railh.css({
            height: railh.height + "px",
            'zIndex': self.zindex,
            "background": opt.background
          });

          railh.append(cursor);

          railh.visibility = true;
          railh.scrollable = true;

          railh.align = (opt.railvalign == "top") ? 0 : 1;

          self.railh = railh;

          self.railh.drag = false;

        }

        if (self.ispage) {

          rail.css({
            position: "fixed",
            top: 0,
            height: "100%"
          });

          rail.css((rail.align) ? { right: 0 } : { left: 0 });

          self.body.append(rail);
          if (self.railh) {
            railh.css({
              position: "fixed",
              left: 0,
              width: "100%"
            });

            railh.css((railh.align) ? { bottom: 0 } : { top: 0 });

            self.body.append(railh);
          }
        } else {
          if (self.ishwscroll) {
            if (self.win.css('position') == 'static') self.css(self.win, { 'position': 'relative' });
            var bd = (self.win[0].nodeName == 'HTML') ? self.body : self.win;
            $(bd).scrollTop(0).scrollLeft(0);  // fix rail position if content already scrolled
            if (self.zoom) {
              self.zoom.css({
                position: "absolute",
                top: 1,
                right: 0,
                "margin-right": rail.width + 4
              });
              bd.append(self.zoom);
            }
            rail.css({
              position: "absolute",
              top: 0
            });
            rail.css((rail.align) ? { right: 0 } : { left: 0 });
            bd.append(rail);
            if (railh) {
              railh.css({
                position: "absolute",
                left: 0,
                bottom: 0
              });
              railh.css((railh.align) ? { bottom: 0 } : { top: 0 });
              bd.append(railh);
            }
          } else {
            self.isfixed = (self.win.css("position") == "fixed");
            var rlpos = (self.isfixed) ? "fixed" : "absolute";

            if (!self.isfixed) self.viewport = self.getViewport(self.win[0]);
            if (self.viewport) {
              self.body = self.viewport;
              if (!(/fixed|absolute/.test(self.viewport.css("position")))) self.css(self.viewport, {
                "position": "relative"
              });
            }

            rail.css({
              position: rlpos
            });
            if (self.zoom) self.zoom.css({
              position: rlpos
            });
            self.updateScrollBar();
            self.body.append(rail);
            if (self.zoom) self.body.append(self.zoom);
            if (self.railh) {
              railh.css({
                position: rlpos
              });
              self.body.append(railh);
            }
          }

          if (cap.isios) self.css(self.win, {
            '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
            '-webkit-touch-callout': 'none'
          }); // prevent grey layer on click

          if (opt.disableoutline) {
            if (cap.isie) self.win.attr("hideFocus", "true"); // IE, prevent dotted rectangle on focused div
            if (cap.iswebkit) self.win.css('outline', 'none');  // Webkit outline
          }

        }

        if (opt.autohidemode === false) {
          self.autohidedom = false;
          self.rail.css({
            opacity: opt.cursoropacitymax
          });
          if (self.railh) self.railh.css({
            opacity: opt.cursoropacitymax
          });
        } else if ((opt.autohidemode === true) || (opt.autohidemode === "leave")) {
          self.autohidedom = $().add(self.rail);
          if (cap.isie8) self.autohidedom = self.autohidedom.add(self.cursor);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
          if (self.railh && cap.isie8) self.autohidedom = self.autohidedom.add(self.cursorh);
        } else if (opt.autohidemode == "scroll") {
          self.autohidedom = $().add(self.rail);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.railh);
        } else if (opt.autohidemode == "cursor") {
          self.autohidedom = $().add(self.cursor);
          if (self.railh) self.autohidedom = self.autohidedom.add(self.cursorh);
        } else if (opt.autohidemode == "hidden") {
          self.autohidedom = false;
          self.hide();
          self.railslocked = false;
        }

        if (cap.cantouch || self.istouchcapable || opt.emulatetouch || cap.hasmstouch) {

          self.scrollmom = new ScrollMomentumClass2D(self);

          var delayedclick = null;

          self.ontouchstart = function (e) {

            if (self.locked) return false;

            //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
            if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return false;  // need test on surface!!

            self.hasmoving = false;

            if (self.scrollmom.timer) {
              self.triggerScrollEnd();
              self.scrollmom.stop();
            }

            if (!self.railslocked) {
              var tg = self.getTarget(e);

              if (tg) {
                var skp = (/INPUT/i.test(tg.nodeName)) && (/range/i.test(tg.type));
                if (skp) return self.stopPropagation(e);
              }

              var ismouse = (e.type === "mousedown");

              if (!("clientX" in e) && ("changedTouches" in e)) {
                e.clientX = e.changedTouches[0].clientX;
                e.clientY = e.changedTouches[0].clientY;
              }

              if (self.forcescreen) {
                var le = e;
                e = {
                  "original": (e.original) ? e.original : e
                };
                e.clientX = le.screenX;
                e.clientY = le.screenY;
              }

              self.rail.drag = {
                x: e.clientX,
                y: e.clientY,
                sx: self.scroll.x,
                sy: self.scroll.y,
                st: self.getScrollTop(),
                sl: self.getScrollLeft(),
                pt: 2,
                dl: false,
                tg: tg
              };

              if (self.ispage || !opt.directionlockdeadzone) {

                self.rail.drag.dl = "f";

              } else {

                var view = {
                  w: $window.width(),
                  h: $window.height()
                };

                var page = self.getContentSize();

                var maxh = page.h - view.h;
                var maxw = page.w - view.w;

                if (self.rail.scrollable && !self.railh.scrollable) self.rail.drag.ck = (maxh > 0) ? "v" : false;
                else if (!self.rail.scrollable && self.railh.scrollable) self.rail.drag.ck = (maxw > 0) ? "h" : false;
                else self.rail.drag.ck = false;

              }

              if (opt.emulatetouch && self.isiframe && cap.isie) {
                var wp = self.win.position();
                self.rail.drag.x += wp.left;
                self.rail.drag.y += wp.top;
              }

              self.hasmoving = false;
              self.lastmouseup = false;
              self.scrollmom.reset(e.clientX, e.clientY);

              if (tg&&ismouse) {

                var ip = /INPUT|SELECT|BUTTON|TEXTAREA/i.test(tg.nodeName);
                if (!ip) {
                  if (cap.hasmousecapture) tg.setCapture();
                  if (opt.emulatetouch) {
                    if (tg.onclick && !(tg._onclick || false)) { // intercept DOM0 onclick event
                      tg._onclick = tg.onclick;
                      tg.onclick = function (e) {
                        if (self.hasmoving) return false;
                        tg._onclick.call(this, e);
                      };
                    }
                    return self.cancelEvent(e);
                  }
                  return self.stopPropagation(e);
                }

                if (/SUBMIT|CANCEL|BUTTON/i.test($(tg).attr('type'))) {
                  self.preventclick = {
                    "tg": tg,
                    "click": false
                  };
                }

              }
            }

          };

          self.ontouchend = function (e) {

            if (!self.rail.drag) return true;

            if (self.rail.drag.pt == 2) {
              //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
              if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return false;

              self.rail.drag = false;

              var ismouse = (e.type === "mouseup");

              if (self.hasmoving) {
                self.scrollmom.doMomentum();
                self.lastmouseup = true;
                self.hideCursor();
                if (cap.hasmousecapture) _doc.releaseCapture();
                if (ismouse) return self.cancelEvent(e);
              }

            }
            else if (self.rail.drag.pt == 1) {
              return self.onmouseup(e);
            }

          };

          var moveneedoffset = (opt.emulatetouch && self.isiframe && !cap.hasmousecapture);

          var locktollerance = opt.directionlockdeadzone * 0.3 | 0;

          self.ontouchmove = function (e, byiframe) {

            if (!self.rail.drag) return true;

            if (e.targetTouches && opt.preventmultitouchscrolling) {
              if (e.targetTouches.length > 1) return true; // multitouch
            }

            //if (e.pointerType && e.pointerType != 2 && e.pointerType != "touch") return false;
            if (e.pointerType && (e.pointerType === 'mouse' || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return true;

            if (self.rail.drag.pt == 2) {

              if (("changedTouches" in e)) {
                e.clientX = e.changedTouches[0].clientX;
                e.clientY = e.changedTouches[0].clientY;
              }

              var ofy, ofx;
              ofx = ofy = 0;

              if (moveneedoffset && !byiframe) {
                var wp = self.win.position();
                ofx = -wp.left;
                ofy = -wp.top;
              }

              var fy = e.clientY + ofy;
              var my = (fy - self.rail.drag.y);
              var fx = e.clientX + ofx;
              var mx = (fx - self.rail.drag.x);

              var ny = self.rail.drag.st - my;

              if (self.ishwscroll && opt.bouncescroll) {
                if (ny < 0) {
                  ny = Math.round(ny / 2);
                } else if (ny > self.page.maxh) {
                  ny = self.page.maxh + Math.round((ny - self.page.maxh) / 2);
                }
              } else {
                if (ny < 0) {
                  ny = 0;
                  fy = 0;
                }
                else if (ny > self.page.maxh) {
                  ny = self.page.maxh;
                  fy = 0;
                }
                if (fy === 0 && !self.hasmoving) {
                  if (!self.ispage) self.rail.drag = false;
                  return true;
                }
              }

              var nx = self.getScrollLeft();

              if (self.railh && self.railh.scrollable) {
                nx = (self.isrtlmode) ? mx - self.rail.drag.sl : self.rail.drag.sl - mx;

                if (self.ishwscroll && opt.bouncescroll) {
                  if (nx < 0) {
                    nx = Math.round(nx / 2);
                  } else if (nx > self.page.maxw) {
                    nx = self.page.maxw + Math.round((nx - self.page.maxw) / 2);
                  }
                } else {
                  if (nx < 0) {
                    nx = 0;
                    fx = 0;
                  }
                  if (nx > self.page.maxw) {
                    nx = self.page.maxw;
                    fx = 0;
                  }
                }

              }


              if (!self.hasmoving) {

                if (self.rail.drag.y === e.clientY && self.rail.drag.x === e.clientX) return self.cancelEvent(e);  // prevent first useless move event

                var ay = Math.abs(my);
                var ax = Math.abs(mx);
                var dz = opt.directionlockdeadzone;

                if (!self.rail.drag.ck) {
                  if (ay > dz && ax > dz) self.rail.drag.dl = "f";
                  else if (ay > dz) self.rail.drag.dl = (ax > locktollerance) ? "f" : "v";
                  else if (ax > dz) self.rail.drag.dl = (ay > locktollerance) ? "f" : "h";
                }
                else if (self.rail.drag.ck == "v") {
                  if (ax > dz && ay <= locktollerance) {
                    self.rail.drag = false;
                  }
                  else if (ay > dz) self.rail.drag.dl = "v";

                }
                else if (self.rail.drag.ck == "h") {

                  if (ay > dz && ax <= locktollerance) {
                    self.rail.drag = false;
                  }
                  else if (ax > dz) self.rail.drag.dl = "h";

                }

                if (!self.rail.drag.dl) return self.cancelEvent(e);

                self.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0);
                self.hasmoving = true;
              }

              if (self.preventclick && !self.preventclick.click) {
                self.preventclick.click = self.preventclick.tg.onclick || false;
                self.preventclick.tg.onclick = self.onpreventclick;
              }

              if (self.rail.drag.dl) {
                if (self.rail.drag.dl == "v") nx = self.rail.drag.sl;
                else if (self.rail.drag.dl == "h") ny = self.rail.drag.st;
              }

              self.synched("touchmove", function () {
                if (self.rail.drag && (self.rail.drag.pt == 2)) {
                  if (self.prepareTransition) self.resetTransition();
                  if (self.rail.scrollable) self.setScrollTop(ny);
                  self.scrollmom.update(fx, fy);
                  if (self.railh && self.railh.scrollable) {
                    self.setScrollLeft(nx);
                    self.showCursor(ny, nx);
                  } else {
                    self.showCursor(ny);
                  }
                  if (cap.isie10) _doc.selection.clear();
                }
              });

              return self.cancelEvent(e);

            }
            else if (self.rail.drag.pt == 1) { // drag on cursor
              return self.onmousemove(e);
            }

          };

          self.ontouchstartCursor = function (e, hronly) {
            if (self.rail.drag && self.rail.drag.pt != 3) return;
            if (self.locked) return self.cancelEvent(e);
            self.cancelScroll();
            self.rail.drag = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
              sx: self.scroll.x,
              sy: self.scroll.y,
              pt: 3,
              hr: (!!hronly)
            };
            var tg = self.getTarget(e);
            if (!self.ispage && cap.hasmousecapture) tg.setCapture();
            if (self.isiframe && !cap.hasmousecapture) {
              self.saved.csspointerevents = self.doc.css("pointer-events");
              self.css(self.doc, { "pointer-events": "none" });
            }
            return self.cancelEvent(e);
          };

          self.ontouchendCursor = function (e) {
            if (self.rail.drag) {
              if (cap.hasmousecapture) _doc.releaseCapture();
              if (self.isiframe && !cap.hasmousecapture) self.doc.css("pointer-events", self.saved.csspointerevents);
              if (self.rail.drag.pt != 3) return;
              self.rail.drag = false;
              return self.cancelEvent(e);
            }
          };

          self.ontouchmoveCursor = function (e) {
            if (self.rail.drag) {
              if (self.rail.drag.pt != 3) return;

              self.cursorfreezed = true;

              if (self.rail.drag.hr) {
                self.scroll.x = self.rail.drag.sx + (e.touches[0].clientX - self.rail.drag.x);
                if (self.scroll.x < 0) self.scroll.x = 0;
                var mw = self.scrollvaluemaxw;
                if (self.scroll.x > mw) self.scroll.x = mw;
              } else {
                self.scroll.y = self.rail.drag.sy + (e.touches[0].clientY - self.rail.drag.y);
                if (self.scroll.y < 0) self.scroll.y = 0;
                var my = self.scrollvaluemax;
                if (self.scroll.y > my) self.scroll.y = my;
              }

              self.synched('touchmove', function () {
                if (self.rail.drag && (self.rail.drag.pt == 3)) {
                  self.showCursor();
                  if (self.rail.drag.hr) self.doScrollLeft(Math.round(self.scroll.x * self.scrollratio.x), opt.cursordragspeed);
                  else self.doScrollTop(Math.round(self.scroll.y * self.scrollratio.y), opt.cursordragspeed);
                }
              });

              return self.cancelEvent(e);
            }

          };

        }

        self.onmousedown = function (e, hronly) {
          if (self.rail.drag && self.rail.drag.pt != 1) return;
          if (self.railslocked) return self.cancelEvent(e);
          self.cancelScroll();
          self.rail.drag = {
            x: e.clientX,
            y: e.clientY,
            sx: self.scroll.x,
            sy: self.scroll.y,
            pt: 1,
            hr: hronly || false
          };
          var tg = self.getTarget(e);

          if (cap.hasmousecapture) tg.setCapture();
          if (self.isiframe && !cap.hasmousecapture) {
            self.saved.csspointerevents = self.doc.css("pointer-events");
            self.css(self.doc, {
              "pointer-events": "none"
            });
          }
          self.hasmoving = false;
          return self.cancelEvent(e);
        };

        self.onmouseup = function (e) {
          if (self.rail.drag) {
            if (self.rail.drag.pt != 1) return true;

            if (cap.hasmousecapture) _doc.releaseCapture();
            if (self.isiframe && !cap.hasmousecapture) self.doc.css("pointer-events", self.saved.csspointerevents);
            self.rail.drag = false;
            self.cursorfreezed = false;
            if (self.hasmoving) self.triggerScrollEnd();
            return self.cancelEvent(e);
          }
        };

        self.onmousemove = function (e) {
          if (self.rail.drag) {
            if (self.rail.drag.pt !== 1) return;

            if (cap.ischrome && e.which === 0) return self.onmouseup(e);

            self.cursorfreezed = true;

            if (!self.hasmoving) self.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0);

            self.hasmoving = true;

            if (self.rail.drag.hr) {
              self.scroll.x = self.rail.drag.sx + (e.clientX - self.rail.drag.x);
              if (self.scroll.x < 0) self.scroll.x = 0;
              var mw = self.scrollvaluemaxw;
              if (self.scroll.x > mw) self.scroll.x = mw;
            } else {
              self.scroll.y = self.rail.drag.sy + (e.clientY - self.rail.drag.y);
              if (self.scroll.y < 0) self.scroll.y = 0;
              var my = self.scrollvaluemax;
              if (self.scroll.y > my) self.scroll.y = my;
            }

            self.synched('mousemove', function () {

              if (self.cursorfreezed) {
                self.showCursor();

                if (self.rail.drag.hr) {
                  self.scrollLeft(Math.round(self.scroll.x * self.scrollratio.x));
                } else {
                  self.scrollTop(Math.round(self.scroll.y * self.scrollratio.y));
                }

              }
            });

            return self.cancelEvent(e);
          }
          else {
            self.checkarea = 0;
          }
        };

        if (cap.cantouch || opt.emulatetouch) {

          self.onpreventclick = function (e) {
            if (self.preventclick) {
              self.preventclick.tg.onclick = self.preventclick.click;
              self.preventclick = false;
              return self.cancelEvent(e);
            }
          };

          self.onclick = (cap.isios) ? false : function (e) {  // it needs to check IE11 ???
            if (self.lastmouseup) {
              self.lastmouseup = false;
              return self.cancelEvent(e);
            } else {
              return true;
            }
          };

          if (opt.grabcursorenabled && cap.cursorgrabvalue) {
            self.css((self.ispage) ? self.doc : self.win, {
              'cursor': cap.cursorgrabvalue
            });
            self.css(self.rail, {
              'cursor': cap.cursorgrabvalue
            });
          }

        } else {

          var checkSelectionScroll = function (e) {
            if (!self.selectiondrag) return;

            if (e) {
              var ww = self.win.outerHeight();
              var df = (e.pageY - self.selectiondrag.top);
              if (df > 0 && df < ww) df = 0;
              if (df >= ww) df -= ww;
              self.selectiondrag.df = df;
            }
            if (self.selectiondrag.df === 0) return;

            var rt = -(self.selectiondrag.df*2/6)|0;
            self.doScrollBy(rt);

            self.debounced("doselectionscroll", function () {
              checkSelectionScroll();
            }, 50);
          };

          if ("getSelection" in _doc) { // A grade - Major browsers
            self.hasTextSelected = function () {
              return (_doc.getSelection().rangeCount > 0);
            };
          } else if ("selection" in _doc) { //IE9-
            self.hasTextSelected = function () {
              return (_doc.selection.type != "None");
            };
          } else {
            self.hasTextSelected = function () { // no support
              return false;
            };
          }

          self.onselectionstart = function (e) {
            //  More testing - severe chrome issues
            /*
                          if (!self.haswrapper&&(e.which&&e.which==2)) {  // fool browser to manage middle button scrolling
                            self.win.css({'overflow':'auto'});
                            setTimeout(function(){
                              self.win.css({'overflow':'hidden'});
                            },10);
                            return true;
                          }
            */
            if (self.ispage) return;
            self.selectiondrag = self.win.offset();
          };

          self.onselectionend = function (e) {
            self.selectiondrag = false;
          };
          self.onselectiondrag = function (e) {
            if (!self.selectiondrag) return;
            if (self.hasTextSelected()) self.debounced("selectionscroll", function () {
              checkSelectionScroll(e);
            }, 250);
          };
        }

        if (cap.hasw3ctouch) { //IE11+
          self.css((self.ispage) ? $("html") : self.win, { 'touch-action': 'none' });
          self.css(self.rail, {
            'touch-action': 'none'
          });
          self.css(self.cursor, {
            'touch-action': 'none'
          });
          self.bind(self.win, "pointerdown", self.ontouchstart);
          self.bind(_doc, "pointerup", self.ontouchend);
          self.delegate(_doc, "pointermove", self.ontouchmove);
        } else if (cap.hasmstouch) { //IE10
          self.css((self.ispage) ? $("html") : self.win, { '-ms-touch-action': 'none' });
          self.css(self.rail, {
            '-ms-touch-action': 'none'
          });
          self.css(self.cursor, {
            '-ms-touch-action': 'none'
          });
          self.bind(self.win, "MSPointerDown", self.ontouchstart);
          self.bind(_doc, "MSPointerUp", self.ontouchend);
          self.delegate(_doc, "MSPointerMove", self.ontouchmove);
          self.bind(self.cursor, "MSGestureHold", function (e) {
            e.preventDefault();
          });
          self.bind(self.cursor, "contextmenu", function (e) {
            e.preventDefault();
          });
        } else if (cap.cantouch) { // smartphones/touch devices
          self.bind(self.win, "touchstart", self.ontouchstart, false, true);
          self.bind(_doc, "touchend", self.ontouchend, false, true);
          self.bind(_doc, "touchcancel", self.ontouchend, false, true);
          self.delegate(_doc, "touchmove", self.ontouchmove, false, true);
        }

        if (opt.emulatetouch) {
          self.bind(self.win, "mousedown", self.ontouchstart, false, true);
          self.bind(_doc, "mouseup", self.ontouchend, false, true);
          self.bind(_doc, "mousemove", self.ontouchmove, false, true);
        }

        if (opt.cursordragontouch || (!cap.cantouch && !opt.emulatetouch)) {

          self.rail.css({
            cursor: "default"
          });
          self.railh && self.railh.css({
            cursor: "default"
          });

          self.jqbind(self.rail, "mouseenter", function () {
            if (!self.ispage && !self.win.is(":visible")) return false;
            if (self.canshowonmouseevent) self.showCursor();
            self.rail.active = true;
          });
          self.jqbind(self.rail, "mouseleave", function () {
            self.rail.active = false;
            if (!self.rail.drag) self.hideCursor();
          });

          if (opt.sensitiverail) {
            self.bind(self.rail, "click", function (e) {
              self.doRailClick(e, false, false);
            });
            self.bind(self.rail, "dblclick", function (e) {
              self.doRailClick(e, true, false);
            });
            self.bind(self.cursor, "click", function (e) {
              self.cancelEvent(e);
            });
            self.bind(self.cursor, "dblclick", function (e) {
              self.cancelEvent(e);
            });
          }

          if (self.railh) {
            self.jqbind(self.railh, "mouseenter", function () {
              if (!self.ispage && !self.win.is(":visible")) return false;
              if (self.canshowonmouseevent) self.showCursor();
              self.rail.active = true;
            });
            self.jqbind(self.railh, "mouseleave", function () {
              self.rail.active = false;
              if (!self.rail.drag) self.hideCursor();
            });

            if (opt.sensitiverail) {
              self.bind(self.railh, "click", function (e) {
                self.doRailClick(e, false, true);
              });
              self.bind(self.railh, "dblclick", function (e) {
                self.doRailClick(e, true, true);
              });
              self.bind(self.cursorh, "click", function (e) {
                self.cancelEvent(e);
              });
              self.bind(self.cursorh, "dblclick", function (e) {
                self.cancelEvent(e);
              });
            }

          }

        }

        if (opt.cursordragontouch && (this.istouchcapable || cap.cantouch)) {
          self.bind(self.cursor, "touchstart", self.ontouchstartCursor);
          self.bind(self.cursor, "touchmove", self.ontouchmoveCursor);
          self.bind(self.cursor, "touchend", self.ontouchendCursor);
          self.cursorh && self.bind(self.cursorh, "touchstart", function (e) {
            self.ontouchstartCursor(e, true);
          });
          self.cursorh && self.bind(self.cursorh, "touchmove", self.ontouchmoveCursor);
          self.cursorh && self.bind(self.cursorh, "touchend", self.ontouchendCursor);
        }

//        if (!cap.cantouch && !opt.emulatetouch) {
        if (!opt.emulatetouch && !cap.isandroid && !cap.isios) {

          self.bind((cap.hasmousecapture) ? self.win : _doc, "mouseup", self.onmouseup);
          self.bind(_doc, "mousemove", self.onmousemove);
          if (self.onclick) self.bind(_doc, "click", self.onclick);

          self.bind(self.cursor, "mousedown", self.onmousedown);
          self.bind(self.cursor, "mouseup", self.onmouseup);

          if (self.railh) {
            self.bind(self.cursorh, "mousedown", function (e) {
              self.onmousedown(e, true);
            });
            self.bind(self.cursorh, "mouseup", self.onmouseup);
          }

          if (!self.ispage && opt.enablescrollonselection) {
            self.bind(self.win[0], "mousedown", self.onselectionstart);
            self.bind(_doc, "mouseup", self.onselectionend);
            self.bind(self.cursor, "mouseup", self.onselectionend);
            if (self.cursorh) self.bind(self.cursorh, "mouseup", self.onselectionend);
            self.bind(_doc, "mousemove", self.onselectiondrag);
          }

          if (self.zoom) {
            self.jqbind(self.zoom, "mouseenter", function () {
              if (self.canshowonmouseevent) self.showCursor();
              self.rail.active = true;
            });
            self.jqbind(self.zoom, "mouseleave", function () {
              self.rail.active = false;
              if (!self.rail.drag) self.hideCursor();
            });
          }

        } else {

          self.bind((cap.hasmousecapture) ? self.win : _doc, "mouseup", self.ontouchend);
          if (self.onclick) self.bind(_doc, "click", self.onclick);

          if (opt.cursordragontouch) {
            self.bind(self.cursor, "mousedown", self.onmousedown);
            self.bind(self.cursor, "mouseup", self.onmouseup);
            self.cursorh && self.bind(self.cursorh, "mousedown", function (e) {
              self.onmousedown(e, true);
            });
            self.cursorh && self.bind(self.cursorh, "mouseup", self.onmouseup);
          } else {
            self.bind(self.rail, "mousedown", function (e) { e.preventDefault(); });  // prevent text selection
            self.railh && self.bind(self.railh, "mousedown", function (e) { e.preventDefault(); });
          }

        }


        if (opt.enablemousewheel) {
          if (!self.isiframe) self.mousewheel((cap.isie && self.ispage) ? _doc : self.win, self.onmousewheel);
          self.mousewheel(self.rail, self.onmousewheel);
          if (self.railh) self.mousewheel(self.railh, self.onmousewheelhr);
        }

        if (!self.ispage && !cap.cantouch && !(/HTML|^BODY/.test(self.win[0].nodeName))) {
          if (!self.win.attr("tabindex")) self.win.attr({
            "tabindex": ++tabindexcounter
          });

          self.bind(self.win, "focus", function (e) {  // better using native events
            domfocus = (self.getTarget(e)).id || self.getTarget(e) || false;
            self.hasfocus = true;
            if (self.canshowonmouseevent) self.noticeCursor();
          });
          self.bind(self.win, "blur", function (e) {  // *
            domfocus = false;
            self.hasfocus = false;
          });

          self.bind(self.win, "mouseenter", function (e) {   // *
            mousefocus = (self.getTarget(e)).id || self.getTarget(e) || false;
            self.hasmousefocus = true;
            if (self.canshowonmouseevent) self.noticeCursor();
          });
          self.bind(self.win, "mouseleave", function (e) {   // *
            mousefocus = false;
            self.hasmousefocus = false;
            if (!self.rail.drag) self.hideCursor();
          });

        }


        //Thanks to http://www.quirksmode.org !!
        self.onkeypress = function (e) {
          if (self.railslocked && self.page.maxh === 0) return true;

          e = e || _win.event;
          var tg = self.getTarget(e);
          if (tg && /INPUT|TEXTAREA|SELECT|OPTION/.test(tg.nodeName)) {
            var tp = tg.getAttribute('type') || tg.type || false;
            if ((!tp) || !(/submit|button|cancel/i.tp)) return true;
          }

          if ($(tg).attr('contenteditable')) return true;

          if (self.hasfocus || (self.hasmousefocus && !domfocus) || (self.ispage && !domfocus && !mousefocus)) {
            var key = e.keyCode;

            if (self.railslocked && key != 27) return self.cancelEvent(e);

            var ctrl = e.ctrlKey || false;
            var shift = e.shiftKey || false;

            var ret = false;
            switch (key) {
              case 38:
              case 63233: //safari
                self.doScrollBy(24 * 3);
                ret = true;
                break;
              case 40:
              case 63235: //safari
                self.doScrollBy(-24 * 3);
                ret = true;
                break;
              case 37:
              case 63232: //safari
                if (self.railh) {
                  (ctrl) ? self.doScrollLeft(0) : self.doScrollLeftBy(24 * 3);
                  ret = true;
                }
                break;
              case 39:
              case 63234: //safari
                if (self.railh) {
                  (ctrl) ? self.doScrollLeft(self.page.maxw) : self.doScrollLeftBy(-24 * 3);
                  ret = true;
                }
                break;
              case 33:
              case 63276: // safari
                self.doScrollBy(self.view.h);
                ret = true;
                break;
              case 34:
              case 63277: // safari
                self.doScrollBy(-self.view.h);
                ret = true;
                break;
              case 36:
              case 63273: // safari
                (self.railh && ctrl) ? self.doScrollPos(0, 0) : self.doScrollTo(0);
                ret = true;
                break;
              case 35:
              case 63275: // safari
                (self.railh && ctrl) ? self.doScrollPos(self.page.maxw, self.page.maxh) : self.doScrollTo(self.page.maxh);
                ret = true;
                break;
              case 32:
                if (opt.spacebarenabled) {
                  (shift) ? self.doScrollBy(self.view.h) : self.doScrollBy(-self.view.h);
                  ret = true;
                }
                break;
              case 27: // ESC
                if (self.zoomactive) {
                  self.doZoom();
                  ret = true;
                }
                break;
            }
            if (ret) return self.cancelEvent(e);
          }
        };

        if (opt.enablekeyboard) self.bind(_doc, (cap.isopera && !cap.isopera12) ? "keypress" : "keydown", self.onkeypress);

        self.bind(_doc, "keydown", function (e) {
          var ctrl = e.ctrlKey || false;
          if (ctrl) self.wheelprevented = true;
        });
        self.bind(_doc, "keyup", function (e) {
          var ctrl = e.ctrlKey || false;
          if (!ctrl) self.wheelprevented = false;
        });
        self.bind(_win, "blur", function (e) {
          self.wheelprevented = false;
        });

        self.bind(_win, 'resize', self.onscreenresize);
        self.bind(_win, 'orientationchange', self.onscreenresize);

        self.bind(_win, "load", self.lazyResize);

        if (cap.ischrome && !self.ispage && !self.haswrapper) { //chrome void scrollbar bug - it persists in version 26
          var tmp = self.win.attr("style");
          var ww = parseFloat(self.win.css("width")) + 1;
          self.win.css('width', ww);
          self.synched("chromefix", function () {
            self.win.attr("style", tmp);
          });
        }


        // Trying a cross-browser implementation - good luck!

        self.onAttributeChange = function (e) {
          self.lazyResize(self.isieold ? 250 : 30);
        };

        if (opt.enableobserver) {

          if ((!self.isie11) && (ClsMutationObserver !== false)) {  // IE11 crashes  #568
            self.observerbody = new ClsMutationObserver(function (mutations) {
              mutations.forEach(function (mut) {
                if (mut.type == "attributes") {
                  return ($body.hasClass("modal-open") && $body.hasClass("modal-dialog") && !$.contains($('.modal-dialog')[0], self.doc[0])) ? self.hide() : self.show();  // Support for Bootstrap modal; Added check if the nice scroll element is inside a modal
                }
              });
              if (self.me.clientWidth != self.page.width || self.me.clientHeight != self.page.height) return self.lazyResize(30);
            });
            self.observerbody.observe(_doc.body, {
              childList: true,
              subtree: true,
              characterData: false,
              attributes: true,
              attributeFilter: ['class']
            });
          }

          if (!self.ispage && !self.haswrapper) {

            var _dom = self.win[0];

            // redesigned MutationObserver for Chrome18+/Firefox14+/iOS6+ with support for: remove div, add/remove content
            if (ClsMutationObserver !== false) {
              self.observer = new ClsMutationObserver(function (mutations) {
                mutations.forEach(self.onAttributeChange);
              });
              self.observer.observe(_dom, {
                childList: true,
                characterData: false,
                attributes: true,
                subtree: false
              });
              self.observerremover = new ClsMutationObserver(function (mutations) {
                mutations.forEach(function (mo) {
                  if (mo.removedNodes.length > 0) {
                    for (var dd in mo.removedNodes) {
                      if (!!self && (mo.removedNodes[dd] === _dom)) return self.remove();
                    }
                  }
                });
              });
              self.observerremover.observe(_dom.parentNode, {
                childList: true,
                characterData: false,
                attributes: false,
                subtree: false
              });
            } else {
              self.bind(_dom, (cap.isie && !cap.isie9) ? "propertychange" : "DOMAttrModified", self.onAttributeChange);
              if (cap.isie9) _dom.attachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug
              self.bind(_dom, "DOMNodeRemoved", function (e) {
                if (e.target === _dom) self.remove();
              });
            }
          }

        }

        //

        if (!self.ispage && opt.boxzoom) self.bind(_win, "resize", self.resizeZoom);
        if (self.istextarea) {
          self.bind(self.win, "keydown", self.lazyResize);
          self.bind(self.win, "mouseup", self.lazyResize);
        }

        self.lazyResize(30);

      }

      if (this.doc[0].nodeName == 'IFRAME') {
        var oniframeload = function () {
          self.iframexd = false;
          var doc;
          try {
            doc = 'contentDocument' in this ? this.contentDocument : this.contentWindow._doc;
            var a = doc.domain;
          } catch (e) {
            self.iframexd = true;
            doc = false;
          }

          if (self.iframexd) {
            if ("console" in _win) console.log('NiceScroll error: policy restriced iframe');
            return true; //cross-domain - I can't manage this
          }

          self.forcescreen = true;

          if (self.isiframe) {
            self.iframe = {
              "doc": $(doc),
              "html": self.doc.contents().find('html')[0],
              "body": self.doc.contents().find('body')[0]
            };
            self.getContentSize = function () {
              return {
                w: Math.max(self.iframe.html.scrollWidth, self.iframe.body.scrollWidth),
                h: Math.max(self.iframe.html.scrollHeight, self.iframe.body.scrollHeight)
              };
            };
            self.docscroll = $(self.iframe.body);
          }

          if (!cap.isios && opt.iframeautoresize && !self.isiframe) {
            self.win.scrollTop(0); // reset position
            self.doc.height(""); //reset height to fix browser bug
            var hh = Math.max(doc.getElementsByTagName('html')[0].scrollHeight, doc.body.scrollHeight);
            self.doc.height(hh);
          }
          self.lazyResize(30);

          self.css($(self.iframe.body), _scrollyhidden);

          if (cap.isios && self.haswrapper) {
            self.css($(doc.body), {
              '-webkit-transform': 'translate3d(0,0,0)'
            }); // avoid iFrame content clipping - thanks to http://blog.derraab.com/2012/04/02/avoid-iframe-content-clipping-with-css-transform-on-ios/
          }

          if ('contentWindow' in this) {
            self.bind(this.contentWindow, "scroll", self.onscroll); //IE8 & minor
          } else {
            self.bind(doc, "scroll", self.onscroll);
          }

          if (opt.enablemousewheel) {
            self.mousewheel(doc, self.onmousewheel);
          }

          if (opt.enablekeyboard) self.bind(doc, (cap.isopera) ? "keypress" : "keydown", self.onkeypress);

          if (cap.cantouch) {
            self.bind(doc, "touchstart", self.ontouchstart);
            self.bind(doc, "touchmove", self.ontouchmove);
          }
          else if (opt.emulatetouch) {
            self.bind(doc, "mousedown", self.ontouchstart);
            self.bind(doc, "mousemove", function (e) {
              return self.ontouchmove(e, true);
            });
            if (opt.grabcursorenabled && cap.cursorgrabvalue) self.css($(doc.body), {
              'cursor': cap.cursorgrabvalue
            });
          }

          self.bind(doc, "mouseup", self.ontouchend);

          if (self.zoom) {
            if (opt.dblclickzoom) self.bind(doc, 'dblclick', self.doZoom);
            if (self.ongesturezoom) self.bind(doc, "gestureend", self.ongesturezoom);
          }
        };

        if (this.doc[0].readyState && this.doc[0].readyState === "complete") {
          setTimeout(function () {
            oniframeload.call(self.doc[0], false);
          }, 500);
        }
        self.bind(this.doc, "load", oniframeload);

      }

    };

    this.showCursor = function (py, px) {
      if (self.cursortimeout) {
        clearTimeout(self.cursortimeout);
        self.cursortimeout = 0;
      }
      if (!self.rail) return;
      if (self.autohidedom) {
        self.autohidedom.stop().css({
          opacity: opt.cursoropacitymax
        });
        self.cursoractive = true;
      }

      if (!self.rail.drag || self.rail.drag.pt != 1) {
        if (py !== undefined && py !== false) {
          self.scroll.y = (py / self.scrollratio.y) | 0;
        }
        if (px !== undefined) {
          self.scroll.x = (px / self.scrollratio.x) | 0;
        }
      }

      self.cursor.css({
        height: self.cursorheight,
        top: self.scroll.y
      });
      if (self.cursorh) {
        var lx = (self.hasreversehr) ? self.scrollvaluemaxw - self.scroll.x : self.scroll.x;
        self.cursorh.css({
          width: self.cursorwidth,
          left: (!self.rail.align && self.rail.visibility) ? lx + self.rail.width : lx
        });
        self.cursoractive = true;
      }

      if (self.zoom) self.zoom.stop().css({
        opacity: opt.cursoropacitymax
      });
    };

    this.hideCursor = function (tm) {
      if (self.cursortimeout) return;
      if (!self.rail) return;
      if (!self.autohidedom) return;

      if (self.hasmousefocus && opt.autohidemode === "leave") return;
      self.cursortimeout = setTimeout(function () {
        if (!self.rail.active || !self.showonmouseevent) {
          self.autohidedom.stop().animate({
            opacity: opt.cursoropacitymin
          });
          if (self.zoom) self.zoom.stop().animate({
            opacity: opt.cursoropacitymin
          });
          self.cursoractive = false;
        }
        self.cursortimeout = 0;
      }, tm || opt.hidecursordelay);
    };

    this.noticeCursor = function (tm, py, px) {
      self.showCursor(py, px);
      if (!self.rail.active) self.hideCursor(tm);
    };

    this.getContentSize =
      (self.ispage) ?
        function () {
          return {
            w: Math.max(_doc.body.scrollWidth, _doc.documentElement.scrollWidth),
            h: Math.max(_doc.body.scrollHeight, _doc.documentElement.scrollHeight)
          };
        } : (self.haswrapper) ?
          function () {
            return {
              w: self.doc[0].offsetWidth,
              h: self.doc[0].offsetHeight
            };
          } : function () {
            return {
              w: self.docscroll[0].scrollWidth,
              h: self.docscroll[0].scrollHeight
            };
          };

    this.onResize = function (e, page) {

      if (!self || !self.win) return false;

      var premaxh = self.page.maxh,
          premaxw = self.page.maxw,
          previewh = self.view.h,
          previeww = self.view.w;

      self.view = {
        w: (self.ispage) ? self.win.width() : self.win[0].clientWidth,
        h: (self.ispage) ? self.win.height() : self.win[0].clientHeight
      };

      self.page = (page) ? page : self.getContentSize();

      self.page.maxh = Math.max(0, self.page.h - self.view.h);
      self.page.maxw = Math.max(0, self.page.w - self.view.w);

      if ((self.page.maxh == premaxh) && (self.page.maxw == premaxw) && (self.view.w == previeww) && (self.view.h == previewh)) {
        // test position
        if (!self.ispage) {
          var pos = self.win.offset();
          if (self.lastposition) {
            var lst = self.lastposition;
            if ((lst.top == pos.top) && (lst.left == pos.left)) return self; //nothing to do
          }
          self.lastposition = pos;
        } else {
          return self; //nothing to do
        }
      }

      if (self.page.maxh === 0) {
        self.hideRail();
        self.scrollvaluemax = 0;
        self.scroll.y = 0;
        self.scrollratio.y = 0;
        self.cursorheight = 0;
        self.setScrollTop(0);
        if (self.rail) self.rail.scrollable = false;
      } else {
        self.page.maxh -= (opt.railpadding.top + opt.railpadding.bottom);
        self.rail.scrollable = true;
      }

      if (self.page.maxw === 0) {
        self.hideRailHr();
        self.scrollvaluemaxw = 0;
        self.scroll.x = 0;
        self.scrollratio.x = 0;
        self.cursorwidth = 0;
        self.setScrollLeft(0);
        if (self.railh) {
          self.railh.scrollable = false;
        }
      } else {
        self.page.maxw -= (opt.railpadding.left + opt.railpadding.right);
        if (self.railh) self.railh.scrollable = (opt.horizrailenabled);
      }

      self.railslocked = (self.locked) || ((self.page.maxh === 0) && (self.page.maxw === 0));
      if (self.railslocked) {
        if (!self.ispage) self.updateScrollBar(self.view);
        return false;
      }

      if (!self.hidden) {
        if (!self.rail.visibility) self.showRail();
        if (self.railh && !self.railh.visibility) self.showRailHr();
      }

      if (self.istextarea && self.win.css('resize') && self.win.css('resize') != 'none') self.view.h -= 20;

      self.cursorheight = Math.min(self.view.h, Math.round(self.view.h * (self.view.h / self.page.h)));
      self.cursorheight = (opt.cursorfixedheight) ? opt.cursorfixedheight : Math.max(opt.cursorminheight, self.cursorheight);

      self.cursorwidth = Math.min(self.view.w, Math.round(self.view.w * (self.view.w / self.page.w)));
      self.cursorwidth = (opt.cursorfixedheight) ? opt.cursorfixedheight : Math.max(opt.cursorminheight, self.cursorwidth);

      self.scrollvaluemax = self.view.h - self.cursorheight - (opt.railpadding.top + opt.railpadding.bottom);
      if (!self.hasborderbox) self.scrollvaluemax -= self.cursor[0].offsetHeight - self.cursor[0].clientHeight;

      if (self.railh) {
        self.railh.width = (self.page.maxh > 0) ? (self.rail.width) : self.view.w;
        self.scrollvaluemaxw = self.railh.width - self.cursorwidth - (opt.railpadding.left + opt.railpadding.right);
      }

      if (!self.ispage) self.updateScrollBar(self.view);

      self.scrollratio = {
        x: (self.page.maxw / self.scrollvaluemaxw),
        y: (self.page.maxh / self.scrollvaluemax)
      };

      var sy = self.getScrollTop();
      if (sy > self.page.maxh) {
        self.doScrollTop(self.page.maxh);
      } else {
        self.scroll.y = (self.getScrollTop() / self.scrollratio.y) | 0;
        self.scroll.x = (self.getScrollLeft() / self.scrollratio.x) | 0;
        if (self.cursoractive) self.noticeCursor();
      }

      if (self.scroll.y && (self.getScrollTop() === 0)) self.doScrollTo((self.scroll.y * self.scrollratio.y)|0);

      return self;
    };

    this.resize = self.onResize;

    var hlazyresize = 0;

    this.onscreenresize = function(e) {
      clearTimeout(hlazyresize);

      var hiderails = (!self.ispage && !self.haswrapper);
      if (hiderails) self.hideRails();

      hlazyresize = setTimeout(function () {
        if (self) {
          if (hiderails) self.showRails();
          self.resize();
        }
        hlazyresize=0;
      }, 120);
    };

    this.lazyResize = function (tm) { // event debounce

      clearTimeout(hlazyresize);

      tm = isNaN(tm) ? 240 : tm;

      hlazyresize = setTimeout(function () {
        self && self.resize();
        hlazyresize=0;
      }, tm);

      return self;

    };

    // derived by MDN https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference/wheel
    function _modernWheelEvent(dom, name, fn, bubble) {
      self._bind(dom, name, function (e) {
        e = e || _win.event;
        var event = {
          original: e,
          target: e.target || e.srcElement,
          type: "wheel",
          deltaMode: e.type == "MozMousePixelScroll" ? 0 : 1,
          deltaX: 0,
          deltaZ: 0,
          preventDefault: function () {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            return false;
          },
          stopImmediatePropagation: function () {
            (e.stopImmediatePropagation) ? e.stopImmediatePropagation() : e.cancelBubble = true;
          }
        };

        if (name == "mousewheel") {
          e.wheelDeltaX && (event.deltaX = -1 / 40 * e.wheelDeltaX);
          e.wheelDeltaY && (event.deltaY = -1 / 40 * e.wheelDeltaY);
          !event.deltaY && !event.deltaX && (event.deltaY = -1 / 40 * e.wheelDelta);
        } else {
          event.deltaY = e.detail;
        }

        return fn.call(dom, event);
      }, bubble);
    }



    this.jqbind = function (dom, name, fn) { // use jquery bind for non-native events (mouseenter/mouseleave)
      self.events.push({
        e: dom,
        n: name,
        f: fn,
        q: true
      });
      $(dom).on(name, fn);
    };

    this.mousewheel = function (dom, fn, bubble) { // bind mousewheel
      var el = ("jquery" in dom) ? dom[0] : dom;
      if ("onwheel" in _doc.createElement("div")) { // Modern browsers support "wheel"
        self._bind(el, "wheel", fn, bubble || false);
      } else {
        var wname = (_doc.onmousewheel !== undefined) ? "mousewheel" : "DOMMouseScroll"; // older Webkit+IE support or older Firefox
        _modernWheelEvent(el, wname, fn, bubble || false);
        if (wname == "DOMMouseScroll") _modernWheelEvent(el, "MozMousePixelScroll", fn, bubble || false); // Firefox legacy
      }
    };

    var passiveSupported = false;

    if (cap.haseventlistener) {  // W3C standard event model

      // thanks to https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
      try { var options = Object.defineProperty({}, "passive", { get: function () { passiveSupported = !0; } }); _win.addEventListener("test", null, options); } catch (err) { }

      this.stopPropagation = function (e) {
        if (!e) return false;
        e = (e.original) ? e.original : e;
        e.stopPropagation();
        return false;
      };

      this.cancelEvent = function(e) {
        if (e.cancelable) e.preventDefault();
        e.stopImmediatePropagation();
        if (e.preventManipulation) e.preventManipulation();  // IE10+
        return false;
      };

    } else {

      // inspired from https://gist.github.com/jonathantneal/2415137

      Event.prototype.preventDefault = function () {
        this.returnValue = false;
      };

      Event.prototype.stopPropagation = function () {
        this.cancelBubble = true;
      };

      _win.constructor.prototype.addEventListener = _doc.constructor.prototype.addEventListener = Element.prototype.addEventListener = function (type, listener, useCapture) {
        this.attachEvent("on" + type, listener);
      };
      _win.constructor.prototype.removeEventListener = _doc.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function (type, listener, useCapture) {
        this.detachEvent("on" + type, listener);
      };

      // Thanks to http://www.switchonthecode.com !!
      this.cancelEvent = function (e) {
        e = e || _win.event;
        if (e) {
          e.cancelBubble = true;
          e.cancel = true;
          e.returnValue = false;
        }
        return false;
      };

      this.stopPropagation = function (e) {
        e = e || _win.event;
        if (e) e.cancelBubble = true;
        return false;
      };

    }

    this.delegate = function (dom, name, fn, bubble, active) {

      var de = delegatevents[name] || false;

      if (!de) {

        de = {
          a: [],
          l: [],
          f: function (e) {
            var lst = de.l, l = lst.length - 1;
            var r = false;
            for (var a = l; a >= 0; a--) {
              r = lst[a].call(e.target, e);
              if (r === false) return false;
            }
            return r;
          }
        };

        self.bind(dom, name, de.f, bubble, active);

        delegatevents[name] = de;

      }

      if (self.ispage) {
        de.a = [self.id].concat(de.a);
        de.l = [fn].concat(de.l);
      } else {
        de.a.push(self.id);
        de.l.push(fn);
      }

    };

    this.undelegate = function (dom, name, fn, bubble, active) {
      var de = delegatevents[name]||false;
      if (de&&de.l) {  // quick fix #683
        for (var a=0,l=de.l.length;a<l;a++) {
          if (de.a[a] === self.id) {
            de.a.splice(a);
            de.l.splice(a);
            if (de.a.length===0) {
              self._unbind(dom,name,de.l.f);
              delegatevents[name] = null;
            }
          }
        }
      }
    };

    this.bind = function (dom, name, fn, bubble, active) {
      var el = ("jquery" in dom) ? dom[0] : dom;
      self._bind(el, name, fn, bubble || false, active || false);
    };

    this._bind = function (el, name, fn, bubble, active) { // primitive bind

      self.events.push({
        e: el,
        n: name,
        f: fn,
        b: bubble,
        q: false
      });

    (passiveSupported && (active || el == window.document || el == window.document.body || el == window)) ? el.addEventListener(name, fn, { passive: false, capture: bubble }) : el.addEventListener(name, fn, bubble || false);
    };

    this._unbind = function (el, name, fn, bub) { // primitive unbind
      if (delegatevents[name]) self.undelegate(el, name, fn, bub);
      else el.removeEventListener(name, fn, bub);
    };

    this.unbindAll = function () {
      for (var a = 0; a < self.events.length; a++) {
        var r = self.events[a];
        (r.q) ? r.e.unbind(r.n, r.f) : self._unbind(r.e, r.n, r.f, r.b);
      }
    };

    this.showRails = function () {
      return self.showRail().showRailHr();
    };

    this.showRail = function () {
      if ((self.page.maxh !== 0) && (self.ispage || self.win.css('display') != 'none')) {
        //self.visibility = true;
        self.rail.visibility = true;
        self.rail.css('display', 'block');
      }
      return self;
    };

    this.showRailHr = function () {
      if (self.railh) {
        if ((self.page.maxw !== 0) && (self.ispage || self.win.css('display') != 'none')) {
          self.railh.visibility = true;
          self.railh.css('display', 'block');
        }
      }
      return self;
    };

    this.hideRails = function () {
      return self.hideRail().hideRailHr();
    };

    this.hideRail = function () {
      //self.visibility = false;
      self.rail.visibility = false;
      self.rail.css('display', 'none');
      return self;
    };

    this.hideRailHr = function () {
      if (self.railh) {
        self.railh.visibility = false;
        self.railh.css('display', 'none');
      }
      return self;
    };

    this.show = function () {
      self.hidden = false;
      self.railslocked = false;
      return self.showRails();
    };

    this.hide = function () {
      self.hidden = true;
      self.railslocked = true;
      return self.hideRails();
    };

    this.toggle = function () {
      return (self.hidden) ? self.show() : self.hide();
    };

    this.remove = function () {
      self.stop();
      if (self.cursortimeout) clearTimeout(self.cursortimeout);
      for (var n in self.delaylist) if (self.delaylist[n]) clearAnimationFrame(self.delaylist[n].h);
      self.doZoomOut();
      self.unbindAll();

      if (cap.isie9) self.win[0].detachEvent("onpropertychange", self.onAttributeChange); //IE9 DOMAttrModified bug

      if (self.observer !== false) self.observer.disconnect();
      if (self.observerremover !== false) self.observerremover.disconnect();
      if (self.observerbody !== false) self.observerbody.disconnect();

      self.events = null;

      if (self.cursor) {
        self.cursor.remove();
      }
      if (self.cursorh) {
        self.cursorh.remove();
      }
      if (self.rail) {
        self.rail.remove();
      }
      if (self.railh) {
        self.railh.remove();
      }
      if (self.zoom) {
        self.zoom.remove();
      }
      for (var a = 0; a < self.saved.css.length; a++) {
        var d = self.saved.css[a];
        d[0].css(d[1], (d[2] === undefined) ? '' : d[2]);
      }
      self.saved = false;
      self.me.data('__nicescroll', ''); //erase all traces

      // memory leak fixed by GianlucaGuarini - thanks a lot!
      // remove the current nicescroll from the $.nicescroll array & normalize array
      var lst = $.nicescroll;
      lst.each(function (i) {
        if (!this) return;
        if (this.id === self.id) {
          delete lst[i];
          for (var b = ++i; b < lst.length; b++ , i++) lst[i] = lst[b];
          lst.length--;
          if (lst.length) delete lst[lst.length];
        }
      });

      for (var i in self) {
        self[i] = null;
        delete self[i];
      }

      self = null;

    };

    this.scrollstart = function (fn) {
      this.onscrollstart = fn;
      return self;
    };
    this.scrollend = function (fn) {
      this.onscrollend = fn;
      return self;
    };
    this.scrollcancel = function (fn) {
      this.onscrollcancel = fn;
      return self;
    };

    this.zoomin = function (fn) {
      this.onzoomin = fn;
      return self;
    };
    this.zoomout = function (fn) {
      this.onzoomout = fn;
      return self;
    };

    this.isScrollable = function (e) {
      var dom = (e.target) ? e.target : e;
      if (dom.nodeName == 'OPTION') return true;
      while (dom && (dom.nodeType == 1) && (dom !== this.me[0]) && !(/^BODY|HTML/.test(dom.nodeName))) {
        var dd = $(dom);
        var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
        if (/scroll|auto/.test(ov)) return (dom.clientHeight != dom.scrollHeight);
        dom = (dom.parentNode) ? dom.parentNode : false;
      }
      return false;
    };

    this.getViewport = function (me) {
      var dom = (me && me.parentNode) ? me.parentNode : false;
      while (dom && (dom.nodeType == 1) && !(/^BODY|HTML/.test(dom.nodeName))) {
        var dd = $(dom);
        if (/fixed|absolute/.test(dd.css("position"))) return dd;
        var ov = dd.css('overflowY') || dd.css('overflowX') || dd.css('overflow') || '';
        if ((/scroll|auto/.test(ov)) && (dom.clientHeight != dom.scrollHeight)) return dd;
        if (dd.getNiceScroll().length > 0) return dd;
        dom = (dom.parentNode) ? dom.parentNode : false;
      }
      return false;
    };

    this.triggerScrollStart = function (cx, cy, rx, ry, ms) {

      if (self.onscrollstart) {
        var info = {
          type: "scrollstart",
          current: {
            x: cx,
            y: cy
          },
          request: {
            x: rx,
            y: ry
          },
          end: {
            x: self.newscrollx,
            y: self.newscrolly
          },
          speed: ms
        };
        self.onscrollstart.call(self, info);
      }

    };

    this.triggerScrollEnd = function () {
      if (self.onscrollend) {

        var px = self.getScrollLeft();
        var py = self.getScrollTop();

        var info = {
          type: "scrollend",
          current: {
            x: px,
            y: py
          },
          end: {
            x: px,
            y: py
          }
        };

        self.onscrollend.call(self, info);

      }

    };

    var scrolldiry = 0, scrolldirx = 0, scrolltmr = 0, scrollspd = 1;

    function doScrollRelative(px, py, chkscroll, iswheel) {

      if (!self.scrollrunning) {
        self.newscrolly = self.getScrollTop();
        self.newscrollx = self.getScrollLeft();
        scrolltmr = now();
      }

      var gap = (now() - scrolltmr);
      scrolltmr = now();

      if (gap > 350) {
        scrollspd = 1;
      } else {
        scrollspd += (2 - scrollspd) / 10;
      }

      px = px * scrollspd | 0;
      py = py * scrollspd | 0;

      if (px) {

        if (iswheel) { // mouse-only
          if (px < 0) {  // fix apple magic mouse swipe back/forward
            if (self.getScrollLeft() >= self.page.maxw) return true;
          } else {
            if (self.getScrollLeft() <= 0) return true;
          }
        }

        var dx = px > 0 ? 1 : -1;

        if (scrolldirx !== dx) {
          if (self.scrollmom) self.scrollmom.stop();
          self.newscrollx = self.getScrollLeft();
          scrolldirx = dx;
        }

        self.lastdeltax -= px;

      }

      if (py) {

        var chk = (function () {
          var top = self.getScrollTop();
          if (py < 0) {
            if (top >= self.page.maxh) return true;
          } else {
            if (top <= 0) return true;
          }
        })();

        if (chk) {
          if (opt.nativeparentscrolling && chkscroll && !self.ispage && !self.zoomactive) return true;
          var ny = self.view.h >> 1;
          if (self.newscrolly < -ny) { self.newscrolly = -ny; py = -1; }
          else if (self.newscrolly > self.page.maxh + ny) { self.newscrolly = self.page.maxh + ny; py = 1; }
          else py = 0;
        }

        var dy = py > 0 ? 1 : -1;

        if (scrolldiry !== dy) {
          if (self.scrollmom) self.scrollmom.stop();
          self.newscrolly = self.getScrollTop();
          scrolldiry = dy;
        }

        self.lastdeltay -= py;

      }

      if (py || px) {
        self.synched("relativexy", function () {

          var dty = self.lastdeltay + self.newscrolly;
          self.lastdeltay = 0;

          var dtx = self.lastdeltax + self.newscrollx;
          self.lastdeltax = 0;

          if (!self.rail.drag) self.doScrollPos(dtx, dty);

        });
      }

    }

    var hasparentscrollingphase = false;

    function execScrollWheel(e, hr, chkscroll) {
      var px, py;

      if (!chkscroll && hasparentscrollingphase) return true;

      if (e.deltaMode === 0) { // PIXEL
        px = -(e.deltaX * (opt.mousescrollstep / (18 * 3))) | 0;
        py = -(e.deltaY * (opt.mousescrollstep / (18 * 3))) | 0;
      } else if (e.deltaMode === 1) { // LINE
        px = -(e.deltaX * opt.mousescrollstep * 50 / 80) | 0;
        py = -(e.deltaY * opt.mousescrollstep * 50 / 80) | 0;
      }

      if (hr && opt.oneaxismousemode && (px === 0) && py) { // classic vertical-only mousewheel + browser with x/y support
        px = py;
        py = 0;

        if (chkscroll) {
          var hrend = (px < 0) ? (self.getScrollLeft() >= self.page.maxw) : (self.getScrollLeft() <= 0);
          if (hrend) {  // preserve vertical scrolling
            py = px;
            px = 0;
          }
        }

      }

      // invert horizontal direction for rtl mode
      if (self.isrtlmode) px = -px;

      var chk = doScrollRelative(px, py, chkscroll, true);

      if (chk) {
        if (chkscroll) hasparentscrollingphase = true;
      } else {
        hasparentscrollingphase = false;
        e.stopImmediatePropagation();
        return e.preventDefault();
      }

    }

    this.onmousewheel = function (e) {
      if (self.wheelprevented||self.locked) return false;
      if (self.railslocked) {
        self.debounced("checkunlock", self.resize, 250);
        return false;
      }
      if (self.rail.drag) return self.cancelEvent(e);

      if (opt.oneaxismousemode === "auto" && e.deltaX !== 0) opt.oneaxismousemode = false; // check two-axis mouse support (not very elegant)

      if (opt.oneaxismousemode && e.deltaX === 0) {
        if (!self.rail.scrollable) {
          if (self.railh && self.railh.scrollable) {
            return self.onmousewheelhr(e);
          } else {
            return true;
          }
        }
      }

      var nw = now();
      var chk = false;
      if (opt.preservenativescrolling && ((self.checkarea + 600) < nw)) {
        self.nativescrollingarea = self.isScrollable(e);
        chk = true;
      }
      self.checkarea = nw;
      if (self.nativescrollingarea) return true; // this isn't my business
      var ret = execScrollWheel(e, false, chk);
      if (ret) self.checkarea = 0;
      return ret;
    };

    this.onmousewheelhr = function (e) {
      if (self.wheelprevented) return;
      if (self.railslocked || !self.railh.scrollable) return true;
      if (self.rail.drag) return self.cancelEvent(e);

      var nw = now();
      var chk = false;
      if (opt.preservenativescrolling && ((self.checkarea + 600) < nw)) {
        self.nativescrollingarea = self.isScrollable(e);
        chk = true;
      }
      self.checkarea = nw;
      if (self.nativescrollingarea) return true; // this is not my business
      if (self.railslocked) return self.cancelEvent(e);

      return execScrollWheel(e, true, chk);
    };

    this.stop = function () {
      self.cancelScroll();
      if (self.scrollmon) self.scrollmon.stop();
      self.cursorfreezed = false;
      self.scroll.y = Math.round(self.getScrollTop() * (1 / self.scrollratio.y));
      self.noticeCursor();
      return self;
    };

    this.getTransitionSpeed = function (dif) {

      return 80 + (dif / 72) * opt.scrollspeed |0;

    };

    if (!opt.smoothscroll) {
      this.doScrollLeft = function (x, spd) { //direct
        var y = self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };
      this.doScrollTop = function (y, spd) { //direct
        var x = self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };
      this.doScrollPos = function (x, y, spd) { //direct
        var nx = (x > self.page.maxw) ? self.page.maxw : x;
        if (nx < 0) nx = 0;
        var ny = (y > self.page.maxh) ? self.page.maxh : y;
        if (ny < 0) ny = 0;
        self.synched('scroll', function () {
          self.setScrollTop(ny);
          self.setScrollLeft(nx);
        });
      };
      this.cancelScroll = function () { }; // direct

    } else if (self.ishwscroll && cap.hastransition && opt.usetransition && !!opt.smoothscroll) {

      var lasttransitionstyle = '';

      this.resetTransition = function () {
        lasttransitionstyle = '';
        self.doc.css(cap.prefixstyle + 'transition-duration', '0ms');
      };

      this.prepareTransition = function (dif, istime) {
        var ex = (istime) ? dif : self.getTransitionSpeed(dif);
        var trans = ex + 'ms';
        if (lasttransitionstyle !== trans) {
          lasttransitionstyle = trans;
          self.doc.css(cap.prefixstyle + 'transition-duration', trans);
        }
        return ex;
      };

      this.doScrollLeft = function (x, spd) { //trans
        var y = (self.scrollrunning) ? self.newscrolly : self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollTop = function (y, spd) { //trans
        var x = (self.scrollrunning) ? self.newscrollx : self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };

      this.cursorupdate = {
        running: false,
        start: function () {
          var m = this;

          if (m.running) return;
          m.running = true;

          var loop = function () {
            if (m.running) setAnimationFrame(loop);
            self.showCursor(self.getScrollTop(), self.getScrollLeft());
            self.notifyScrollEvent(self.win[0]);
          };

          setAnimationFrame(loop);
        },
        stop: function () {
          this.running = false;
        }
      };

      this.doScrollPos = function (x, y, spd) { //trans

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (((self.newscrolly - py) * (y - py) < 0) || ((self.newscrollx - px) * (x - px) < 0)) self.cancelScroll(); //inverted movement detection

        if (!opt.bouncescroll) {
          if (y < 0) y = 0;
          else if (y > self.page.maxh) y = self.page.maxh;
          if (x < 0) x = 0;
          else if (x > self.page.maxw) x = self.page.maxw;
        } else {
          if (y < 0) y = y / 2 | 0;
          else if (y > self.page.maxh) y = self.page.maxh + (y - self.page.maxh) / 2 | 0;
          if (x < 0) x = x / 2 | 0;
          else if (x > self.page.maxw) x = self.page.maxw + (x - self.page.maxw) / 2 | 0;
        }

        if (self.scrollrunning && x == self.newscrollx && y == self.newscrolly) return false;

        self.newscrolly = y;
        self.newscrollx = x;

        var top = self.getScrollTop();
        var lft = self.getScrollLeft();

        var dst = {};
        dst.x = x - lft;
        dst.y = y - top;

        var dd = Math.sqrt((dst.x * dst.x) + (dst.y * dst.y)) | 0;

        var ms = self.prepareTransition(dd);

        if (!self.scrollrunning) {
          self.scrollrunning = true;
          self.triggerScrollStart(lft, top, x, y, ms);
          self.cursorupdate.start();
        }

        self.scrollendtrapped = true;

        if (!cap.transitionend) {
          if (self.scrollendtrapped) clearTimeout(self.scrollendtrapped);
          self.scrollendtrapped = setTimeout(self.onScrollTransitionEnd, ms); // simulate transitionend event
        }

        self.setScrollTop(self.newscrolly);
        self.setScrollLeft(self.newscrollx);

      };

      this.cancelScroll = function () {
        if (!self.scrollendtrapped) return true;
        var py = self.getScrollTop();
        var px = self.getScrollLeft();
        self.scrollrunning = false;
        if (!cap.transitionend) clearTimeout(cap.transitionend);
        self.scrollendtrapped = false;
        self.resetTransition();
        self.setScrollTop(py); // fire event onscroll
        if (self.railh) self.setScrollLeft(px);
        if (self.timerscroll && self.timerscroll.tm) clearInterval(self.timerscroll.tm);
        self.timerscroll = false;

        self.cursorfreezed = false;

        self.cursorupdate.stop();
        self.showCursor(py, px);
        return self;
      };

      this.onScrollTransitionEnd = function () {

        if (!self.scrollendtrapped) return;

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (py < 0) py = 0;
        else if (py > self.page.maxh) py = self.page.maxh;
        if (px < 0) px = 0;
        else if (px > self.page.maxw) px = self.page.maxw;
        if ((py != self.newscrolly) || (px != self.newscrollx)) return self.doScrollPos(px, py, opt.snapbackspeed);

        if (self.scrollrunning) self.triggerScrollEnd();
        self.scrollrunning = false;

        self.scrollendtrapped = false;
        self.resetTransition();
        self.timerscroll = false;
        self.setScrollTop(py); // fire event onscroll
        if (self.railh) self.setScrollLeft(px); // fire event onscroll left

        self.cursorupdate.stop();
        self.noticeCursor(false, py, px);

        self.cursorfreezed = false;

      };

    } else {

      this.doScrollLeft = function (x, spd) { //no-trans
        var y = (self.scrollrunning) ? self.newscrolly : self.getScrollTop();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollTop = function (y, spd) { //no-trans
        var x = (self.scrollrunning) ? self.newscrollx : self.getScrollLeft();
        self.doScrollPos(x, y, spd);
      };

      this.doScrollPos = function (x, y, spd) { //no-trans

        var py = self.getScrollTop();
        var px = self.getScrollLeft();

        if (((self.newscrolly - py) * (y - py) < 0) || ((self.newscrollx - px) * (x - px) < 0)) self.cancelScroll(); //inverted movement detection

        var clipped = false;

        if (!self.bouncescroll || !self.rail.visibility) {
          if (y < 0) {
            y = 0;
            clipped = true;
          } else if (y > self.page.maxh) {
            y = self.page.maxh;
            clipped = true;
          }
        }
        if (!self.bouncescroll || !self.railh.visibility) {
          if (x < 0) {
            x = 0;
            clipped = true;
          } else if (x > self.page.maxw) {
            x = self.page.maxw;
            clipped = true;
          }
        }

        if (self.scrollrunning && (self.newscrolly === y) && (self.newscrollx === x)) return true;

        self.newscrolly = y;
        self.newscrollx = x;

        self.dst = {};
        self.dst.x = x - px;
        self.dst.y = y - py;
        self.dst.px = px;
        self.dst.py = py;

        var dd = Math.sqrt((self.dst.x * self.dst.x) + (self.dst.y * self.dst.y)) | 0;
        var ms = self.getTransitionSpeed(dd);

        self.bzscroll = {};

        var p3 = (clipped) ? 1 : 0.58;
        self.bzscroll.x = new BezierClass(px, self.newscrollx, ms, 0, 0, p3, 1);
        self.bzscroll.y = new BezierClass(py, self.newscrolly, ms, 0, 0, p3, 1);

        var loopid = now();

        var loop = function () {

          if (!self.scrollrunning) return;
          var x = self.bzscroll.y.getPos();

          self.setScrollLeft(self.bzscroll.x.getNow());
          self.setScrollTop(self.bzscroll.y.getNow());

          if (x <= 1) {
            self.timer = setAnimationFrame(loop);
          } else {
            self.scrollrunning = false;
            self.timer = 0;
            self.triggerScrollEnd();
          }

        };

        if (!self.scrollrunning) {
          self.triggerScrollStart(px, py, x, y, ms);
          self.scrollrunning = true;
          self.timer = setAnimationFrame(loop);
        }

      };

      this.cancelScroll = function () {
        if (self.timer) clearAnimationFrame(self.timer);
        self.timer = 0;
        self.bzscroll = false;
        self.scrollrunning = false;
        return self;
      };

    }

    this.doScrollBy = function (stp, relative) {
      doScrollRelative(0, stp);
    };

    this.doScrollLeftBy = function (stp, relative) {
      doScrollRelative(stp, 0);
    };

    this.doScrollTo = function (pos, relative) {
      var ny = (relative) ? Math.round(pos * self.scrollratio.y) : pos;
      if (ny < 0) ny = 0;
      else if (ny > self.page.maxh) ny = self.page.maxh;
      self.cursorfreezed = false;
      self.doScrollTop(pos);
    };

    this.checkContentSize = function () {
      var pg = self.getContentSize();
      if ((pg.h != self.page.h) || (pg.w != self.page.w)) self.resize(false, pg);
    };

    self.onscroll = function (e) {
      if (self.rail.drag) return;
      if (!self.cursorfreezed) {
        self.synched('scroll', function () {
          self.scroll.y = Math.round(self.getScrollTop() / self.scrollratio.y);
          if (self.railh) self.scroll.x = Math.round(self.getScrollLeft() / self.scrollratio.x);
          self.noticeCursor();
        });
      }
    };
    self.bind(self.docscroll, "scroll", self.onscroll);

    this.doZoomIn = function (e) {
      if (self.zoomactive) return;
      self.zoomactive = true;

      self.zoomrestore = {
        style: {}
      };
      var lst = ['position', 'top', 'left', 'zIndex', 'backgroundColor', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];
      var win = self.win[0].style;
      for (var a in lst) {
        var pp = lst[a];
        self.zoomrestore.style[pp] = (win[pp] !== undefined) ? win[pp] : '';
      }

      self.zoomrestore.style.width = self.win.css('width');
      self.zoomrestore.style.height = self.win.css('height');

      self.zoomrestore.padding = {
        w: self.win.outerWidth() - self.win.width(),
        h: self.win.outerHeight() - self.win.height()
      };

      if (cap.isios4) {
        self.zoomrestore.scrollTop = $window.scrollTop();
        $window.scrollTop(0);
      }

      self.win.css({
        position: (cap.isios4) ? "absolute" : "fixed",
        top: 0,
        left: 0,
        zIndex: globalmaxzindex + 100,
        margin: 0
      });
      var bkg = self.win.css("backgroundColor");
      if ("" === bkg || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(bkg)) self.win.css("backgroundColor", "#fff");
      self.rail.css({
        zIndex: globalmaxzindex + 101
      });
      self.zoom.css({
        zIndex: globalmaxzindex + 102
      });
      self.zoom.css('backgroundPosition', '0 -18px');
      self.resizeZoom();

      if (self.onzoomin) self.onzoomin.call(self);

      return self.cancelEvent(e);
    };

    this.doZoomOut = function (e) {
      if (!self.zoomactive) return;
      self.zoomactive = false;

      self.win.css("margin", "");
      self.win.css(self.zoomrestore.style);

      if (cap.isios4) {
        $window.scrollTop(self.zoomrestore.scrollTop);
      }

      self.rail.css({
        "z-index": self.zindex
      });
      self.zoom.css({
        "z-index": self.zindex
      });
      self.zoomrestore = false;
      self.zoom.css('backgroundPosition', '0 0');
      self.onResize();

      if (self.onzoomout) self.onzoomout.call(self);

      return self.cancelEvent(e);
    };

    this.doZoom = function (e) {
      return (self.zoomactive) ? self.doZoomOut(e) : self.doZoomIn(e);
    };

    this.resizeZoom = function () {
      if (!self.zoomactive) return;

      var py = self.getScrollTop(); //preserve scrolling position
      self.win.css({
        width: $window.width() - self.zoomrestore.padding.w + "px",
        height: $window.height() - self.zoomrestore.padding.h + "px"
      });
      self.onResize();

      self.setScrollTop(Math.min(self.page.maxh, py));
    };

    this.init();

    $.nicescroll.push(this);

  };

  // Inspired by the work of Kin Blas
  // http://webpro.host.adobe.com/people/jblas/momentum/includes/jquery.momentum.0.7.js
  var ScrollMomentumClass2D = function (nc) {
    var self = this;
    this.nc = nc;

    this.lastx = 0;
    this.lasty = 0;
    this.speedx = 0;
    this.speedy = 0;
    this.lasttime = 0;
    this.steptime = 0;
    this.snapx = false;
    this.snapy = false;
    this.demulx = 0;
    this.demuly = 0;

    this.lastscrollx = -1;
    this.lastscrolly = -1;

    this.chkx = 0;
    this.chky = 0;

    this.timer = 0;

    this.reset = function (px, py) {
      self.stop();
      self.steptime = 0;
      self.lasttime = now();
      self.speedx = 0;
      self.speedy = 0;
      self.lastx = px;
      self.lasty = py;
      self.lastscrollx = -1;
      self.lastscrolly = -1;
    };

    this.update = function (px, py) {
      var tm = now();
      self.steptime = tm - self.lasttime;
      self.lasttime = tm;
      var dy = py - self.lasty;
      var dx = px - self.lastx;
      var sy = self.nc.getScrollTop();
      var sx = self.nc.getScrollLeft();
      var newy = sy + dy;
      var newx = sx + dx;
      self.snapx = (newx < 0) || (newx > self.nc.page.maxw);
      self.snapy = (newy < 0) || (newy > self.nc.page.maxh);
      self.speedx = dx;
      self.speedy = dy;
      self.lastx = px;
      self.lasty = py;
    };

    this.stop = function () {
      self.nc.unsynched("domomentum2d");
      if (self.timer) clearTimeout(self.timer);
      self.timer = 0;
      self.lastscrollx = -1;
      self.lastscrolly = -1;
    };

    this.doSnapy = function (nx, ny) {
      var snap = false;

      if (ny < 0) {
        ny = 0;
        snap = true;
      } else if (ny > self.nc.page.maxh) {
        ny = self.nc.page.maxh;
        snap = true;
      }

      if (nx < 0) {
        nx = 0;
        snap = true;
      } else if (nx > self.nc.page.maxw) {
        nx = self.nc.page.maxw;
        snap = true;
      }

      (snap) ? self.nc.doScrollPos(nx, ny, self.nc.opt.snapbackspeed) : self.nc.triggerScrollEnd();
    };

    this.doMomentum = function (gp) {
      var t = now();
      var l = (gp) ? t + gp : self.lasttime;

      var sl = self.nc.getScrollLeft();
      var st = self.nc.getScrollTop();

      var pageh = self.nc.page.maxh;
      var pagew = self.nc.page.maxw;

      self.speedx = (pagew > 0) ? Math.min(60, self.speedx) : 0;
      self.speedy = (pageh > 0) ? Math.min(60, self.speedy) : 0;

      var chk = l && (t - l) <= 60;

      if ((st < 0) || (st > pageh) || (sl < 0) || (sl > pagew)) chk = false;

      var sy = (self.speedy && chk) ? self.speedy : false;
      var sx = (self.speedx && chk) ? self.speedx : false;

      if (sy || sx) {
        var tm = Math.max(16, self.steptime); //timeout granularity

        if (tm > 50) { // do smooth
          var xm = tm / 50;
          self.speedx *= xm;
          self.speedy *= xm;
          tm = 50;
        }

        self.demulxy = 0;

        self.lastscrollx = self.nc.getScrollLeft();
        self.chkx = self.lastscrollx;
        self.lastscrolly = self.nc.getScrollTop();
        self.chky = self.lastscrolly;

        var nx = self.lastscrollx;
        var ny = self.lastscrolly;

        var onscroll = function () {
          var df = ((now() - t) > 600) ? 0.04 : 0.02;

          if (self.speedx) {
            nx = Math.floor(self.lastscrollx - (self.speedx * (1 - self.demulxy)));
            self.lastscrollx = nx;
            if ((nx < 0) || (nx > pagew)) df = 0.10;
          }

          if (self.speedy) {
            ny = Math.floor(self.lastscrolly - (self.speedy * (1 - self.demulxy)));
            self.lastscrolly = ny;
            if ((ny < 0) || (ny > pageh)) df = 0.10;
          }

          self.demulxy = Math.min(1, self.demulxy + df);

          self.nc.synched("domomentum2d", function () {

            if (self.speedx) {
              var scx = self.nc.getScrollLeft();
              //              if (scx != self.chkx) self.stop();
              self.chkx = nx;
              self.nc.setScrollLeft(nx);
            }

            if (self.speedy) {
              var scy = self.nc.getScrollTop();
              //              if (scy != self.chky) self.stop();
              self.chky = ny;
              self.nc.setScrollTop(ny);
            }

            if (!self.timer) {
              self.nc.hideCursor();
              self.doSnapy(nx, ny);
            }

          });

          if (self.demulxy < 1) {
            self.timer = setTimeout(onscroll, tm);
          } else {
            self.stop();
            self.nc.hideCursor();
            self.doSnapy(nx, ny);
          }
        };

        onscroll();

      } else {
        self.doSnapy(self.nc.getScrollLeft(), self.nc.getScrollTop());
      }

    };

  };


  // override jQuery scrollTop
  var _scrollTop = jQuery.fn.scrollTop; // preserve original function

  jQuery.cssHooks.pageYOffset = {
    get: function (elem, computed, extra) {
      var nice = $.data(elem, '__nicescroll') || false;
      return (nice && nice.ishwscroll) ? nice.getScrollTop() : _scrollTop.call(elem);
    },
    set: function (elem, value) {
      var nice = $.data(elem, '__nicescroll') || false;
      (nice && nice.ishwscroll) ? nice.setScrollTop(parseInt(value)) : _scrollTop.call(elem, value);
      return this;
    }
  };

  jQuery.fn.scrollTop = function (value) {
    if (value === undefined) {
      var nice = (this[0]) ? $.data(this[0], '__nicescroll') || false : false;
      return (nice && nice.ishwscroll) ? nice.getScrollTop() : _scrollTop.call(this);
    } else {
      return this.each(function () {
        var nice = $.data(this, '__nicescroll') || false;
        (nice && nice.ishwscroll) ? nice.setScrollTop(parseInt(value)) : _scrollTop.call($(this), value);
      });
    }
  };

  // override jQuery scrollLeft
  var _scrollLeft = jQuery.fn.scrollLeft; // preserve original function

  $.cssHooks.pageXOffset = {
    get: function (elem, computed, extra) {
      var nice = $.data(elem, '__nicescroll') || false;
      return (nice && nice.ishwscroll) ? nice.getScrollLeft() : _scrollLeft.call(elem);
    },
    set: function (elem, value) {
      var nice = $.data(elem, '__nicescroll') || false;
      (nice && nice.ishwscroll) ? nice.setScrollLeft(parseInt(value)) : _scrollLeft.call(elem, value);
      return this;
    }
  };

  jQuery.fn.scrollLeft = function (value) {
    if (value === undefined) {
      var nice = (this[0]) ? $.data(this[0], '__nicescroll') || false : false;
      return (nice && nice.ishwscroll) ? nice.getScrollLeft() : _scrollLeft.call(this);
    } else {
      return this.each(function () {
        var nice = $.data(this, '__nicescroll') || false;
        (nice && nice.ishwscroll) ? nice.setScrollLeft(parseInt(value)) : _scrollLeft.call($(this), value);
      });
    }
  };

  var NiceScrollArray = function (doms) {
    var self = this;
    this.length = 0;
    this.name = "nicescrollarray";

    this.each = function (fn) {
      $.each(self, fn);
      return self;
    };

    this.push = function (nice) {
      self[self.length] = nice;
      self.length++;
    };

    this.eq = function (idx) {
      return self[idx];
    };

    if (doms) {
      for (var a = 0; a < doms.length; a++) {
        var nice = $.data(doms[a], '__nicescroll') || false;
        if (nice) {
          this[this.length] = nice;
          this.length++;
        }
      }
    }

    return this;
  };

  function mplex(el, lst, fn) {
    for (var a = 0, l = lst.length; a < l; a++) fn(el, lst[a]);
  }
  mplex(
    NiceScrollArray.prototype, ['show', 'hide', 'toggle', 'onResize', 'resize', 'remove', 'stop', 'doScrollPos'],
    function (e, n) {
      e[n] = function () {
        var args = arguments;
        return this.each(function () {
          this[n].apply(this, args);
        });
      };
    }
  );

  jQuery.fn.getNiceScroll = function (index) {
    if (index === undefined) {
      return new NiceScrollArray(this);
    } else {
      return this[index] && $.data(this[index], '__nicescroll') || false;
    }
  };

  var pseudos = jQuery.expr.pseudos || jQuery.expr[':'];  // jQuery 3 migration
  pseudos.nicescroll = function (a) {
    return $.data(a, '__nicescroll') !== undefined;
  };

  $.fn.niceScroll = function (wrapper, _opt) {
    if (_opt === undefined && typeof wrapper == "object" && !("jquery" in wrapper)) {
      _opt = wrapper;
      wrapper = false;
    }

    var ret = new NiceScrollArray();

    this.each(function () {
      var $this = $(this);

      var opt = $.extend({}, _opt); // cloning

      if (wrapper || false) {
        var wrp = $(wrapper);
        opt.doc = (wrp.length > 1) ? $(wrapper, $this) : wrp;
        opt.win = $this;
      }
      var docundef = !("doc" in opt);
      if (!docundef && !("win" in opt)) opt.win = $this;

      var nice = $this.data('__nicescroll') || false;
      if (!nice) {
        opt.doc = opt.doc || $this;
        nice = new NiceScrollClass(opt, $this);
        $this.data('__nicescroll', nice);
      }
      ret.push(nice);
    });

    return (ret.length === 1) ? ret[0] : ret;
  };

  _win.NiceScroll = {
    getjQuery: function () {
      return jQuery;
    }
  };

  if (!$.nicescroll) {
    $.nicescroll = new NiceScrollArray();
    $.nicescroll.options = _globaloptions;
  }

}));


/**
 * jquery.slimmenu.js
 * http://adnantopal.github.io/slimmenu/
 * Author: @adnantopal
 * Copyright 2013, Adnan Topal (atopal.com)
 * Licensed under the MIT license.
 */
;(function($,window,document,undefined){var pluginName="slimmenu",defaults={resizeWidth:'768',collapserTitle:'Main Menu',animSpeed:'medium',easingEffect:null,indentChildren:false,childrenIndenter:'&nbsp;&nbsp;'};function Plugin(element,options){this.element=element;this.$elem=$(this.element);this.options=$.extend({},defaults,options);this.init()}Plugin.prototype={init:function(){var $options=this.options,$menu=this.$elem,$collapser='<div class="menu-collapser">'+$options.collapserTitle+'<div class="collapse-button"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></div></div>',$menu_collapser;$menu.before($collapser);$menu_collapser=$menu.prev('.menu-collapser');$menu.on('click','.sub-collapser',function(e){e.preventDefault();e.stopPropagation();var $parent_li=$(this).closest('li');if($(this).hasClass('expanded')){$(this).removeClass('expanded');$(this).find('i').html('&#9660;');$parent_li.find('>ul').slideUp($options.animSpeed,$options.easingEffect)}else{$(this).addClass('expanded');$(this).find('i').html('&#9650;');$parent_li.find('>ul').slideDown($options.animSpeed,$options.easingEffect)}});$menu_collapser.on('click','.collapse-button',function(e){e.preventDefault();$menu.slideToggle($options.animSpeed,$options.easingEffect)});this.resizeMenu({data:{el:this.element,options:this.options}});$(window).on('resize',{el:this.element,options:this.options},this.resizeMenu)},resizeMenu:function(event){var $window=$(window),$options=event.data.options,$menu=$(event.data.el),$menu_collapser=$('body').find('.menu-collapser');$menu.find('li').each(function(){if($(this).has('ul').length){if($(this).has('.sub-collapser').length){$(this).children('.sub-collapser i').html('&#9660;')}else{$(this).append('<span class="sub-collapser"><i>&#9660;</i></span>')}}$(this).children('ul').hide();$(this).find('.sub-collapser').removeClass('expanded').children('i').html('&#9660;')});if($options.resizeWidth>=$window.width()){if($options.indentChildren){$menu.find('ul').each(function(){var $depth=$(this).parents('ul').length;if(!$(this).children('li').children('a').has('i').length){$(this).children('li').children('a').prepend(Plugin.prototype.indent($depth,$options))}})}$menu.find('li').has('ul').off('mouseenter mouseleave');$menu.addClass('collapsed').hide();$menu_collapser.show()}else{$menu.find('li').has('ul').on('mouseenter',function(){$(this).find('>ul').stop().slideDown($options.animSpeed,$options.easingEffect)}).on('mouseleave',function(){$(this).find('>ul').stop().slideUp($options.animSpeed,$options.easingEffect)});$menu.find('li > a > i').remove();$menu.removeClass('collapsed').show();$menu_collapser.hide()}},indent:function(num,options){var $indent='';for(var i=0;i<num;i++){$indent+=options.childrenIndenter}return'<i>'+$indent+'</i>'}};$.fn[pluginName]=function(options){return this.each(function(){if(!$.data(this,"plugin_"+pluginName)){$.data(this,"plugin_"+pluginName,new Plugin(this,options))}})}})(jQuery,window,document);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwbHVnaW5zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qXHJcbiAqIFRpcHBlciB2My4wLjIgLSAyMDE0LTAyLTEyXHJcbiAqIEEgalF1ZXJ5IHBsdWdpbiBmb3Igc2ltcGxlIHRvb2x0aXBzLiBQYXJ0IG9mIHRoZSBmb3Jtc3RvbmUgbGlicmFyeS5cclxuICogaHR0cDovL2Zvcm1zdG9uZS5pdC90aXBwZXIvXHJcbiAqXHJcbiAqIENvcHlyaWdodCAyMDE0IEJlbiBQbHVtOyBNSVQgTGljZW5zZWRcclxuICovXHJcblxyXG4hZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihiKXtyZXR1cm4gaC5mb3JtYXR0ZXI9ZCxhKHRoaXMpLm5vdChcIi50aXBwZXItYXR0YWNoZWRcIikuYWRkQ2xhc3MoXCJ0aXBwZXItYXR0YWNoZWRcIikub24oXCJtb3VzZWVudGVyLnRpcHBlclwiLGEuZXh0ZW5kKHt9LGgsYnx8e30pLGMpfWZ1bmN0aW9uIGMoYil7Zz1hKFwiYm9keVwiKTt2YXIgYz1hKHRoaXMpLGQ9YS5leHRlbmQoITAse30sYi5kYXRhLGMuZGF0YShcInRpcHBlci1vcHRpb25zXCIpKSxoPVwiXCI7aCs9JzxkaXYgY2xhc3M9XCJ0aXBwZXIgJytkLmRpcmVjdGlvbisnXCI+JyxoKz0nPGRpdiBjbGFzcz1cInRpcHBlci1jb250ZW50XCI+JyxoKz1kLmZvcm1hdHRlci5hcHBseShnLFtjXSksaCs9JzxzcGFuIGNsYXNzPVwidGlwcGVyLWNhcmV0XCI8L3NwYW4+JyxoKz1cIjwvZGl2PlwiLGgrPVwiPC9kaXY+XCIsZC4kdGFyZ2V0PWMsZC4kdGlwcGVyPWEoaCksZy5hcHBlbmQoZC4kdGlwcGVyKSxkLiRjb250ZW50PWQuJHRpcHBlci5maW5kKFwiLnRpcHBlci1jb250ZW50XCIpLGQuJGNhcmV0PWQuJHRpcHBlci5maW5kKFwiLnRpcHBlci1jYXJldFwiKSxkLm9mZnNldD1jLm9mZnNldCgpLGQuaGVpZ2h0PWMub3V0ZXJIZWlnaHQoKSxkLndpZHRoPWMub3V0ZXJXaWR0aCgpLGQudGlwcGVyUG9zPXt9LGQuY2FyZXRQb3M9e30sZC5jb250ZW50UG9zPXt9O3ZhciBpPWQuJGNhcmV0Lm91dGVySGVpZ2h0KCEwKSxqPWQuJGNhcmV0Lm91dGVyV2lkdGgoITApLGs9ZC4kY29udGVudC5vdXRlckhlaWdodCghMCksbD1kLiRjb250ZW50Lm91dGVyV2lkdGgoITApK2o7XCJyaWdodFwiPT09ZC5kaXJlY3Rpb258fFwibGVmdFwiPT09ZC5kaXJlY3Rpb24/KGQuY2FyZXRQb3MudG9wPShrLWkpLzIsZC5jb250ZW50UG9zLnRvcD0tay8yLFwicmlnaHRcIj09PWQuZGlyZWN0aW9uP2QuY29udGVudFBvcy5sZWZ0PWorZC5tYXJnaW46XCJsZWZ0XCI9PT1kLmRpcmVjdGlvbiYmKGQuY29udGVudFBvcy5sZWZ0PS0obCtkLm1hcmdpbikpKTooZC5jYXJldFBvcy5sZWZ0PShsLWopLzIsZC5jb250ZW50UG9zLmxlZnQ9LWwvMixcImJvdHRvbVwiPT09ZC5kaXJlY3Rpb24/ZC5jb250ZW50UG9zLnRvcD1kLm1hcmdpbjpcInRvcFwiPT09ZC5kaXJlY3Rpb24mJihkLmNvbnRlbnRQb3MudG9wPS0oaytkLm1hcmdpbikpKSxkLiRjb250ZW50LmNzcyhkLmNvbnRlbnRQb3MpLGQuJGNhcmV0LmNzcyhkLmNhcmV0UG9zKSxkLmZvbGxvdz9kLiR0YXJnZXQub24oXCJtb3VzZW1vdmUudGlwcGVyXCIsZCxlKS50cmlnZ2VyKFwibW91c2Vtb3ZlXCIpOihcInJpZ2h0XCI9PT1kLmRpcmVjdGlvbnx8XCJsZWZ0XCI9PT1kLmRpcmVjdGlvbj8oZC50aXBwZXJQb3MudG9wPWQub2Zmc2V0LnRvcCtkLmhlaWdodC8yLFwicmlnaHRcIj09PWQuZGlyZWN0aW9uP2QudGlwcGVyUG9zLmxlZnQ9ZC5vZmZzZXQubGVmdCtkLndpZHRoOlwibGVmdFwiPT09ZC5kaXJlY3Rpb24mJihkLnRpcHBlclBvcy5sZWZ0PWQub2Zmc2V0LmxlZnQpKTooZC50aXBwZXJQb3MubGVmdD1kLm9mZnNldC5sZWZ0K2Qud2lkdGgvMixcImJvdHRvbVwiPT09ZC5kaXJlY3Rpb24/ZC50aXBwZXJQb3MudG9wPWQub2Zmc2V0LnRvcCtkLmhlaWdodDpcInRvcFwiPT09ZC5kaXJlY3Rpb24mJihkLnRpcHBlclBvcy50b3A9ZC5vZmZzZXQudG9wKSksZC4kdGlwcGVyLmNzcyhkLnRpcHBlclBvcykpLGQuJHRhcmdldC5vbmUoXCJtb3VzZWxlYXZlLnRpcHBlclwiLGQsZil9ZnVuY3Rpb24gZChhKXtyZXR1cm4gYS5kYXRhKFwidGl0bGVcIil9ZnVuY3Rpb24gZShhKXt2YXIgYj1hLmRhdGE7Yi4kdGlwcGVyLmNzcyh7bGVmdDphLnBhZ2VYLHRvcDphLnBhZ2VZfSl9ZnVuY3Rpb24gZihhKXt2YXIgYj1hLmRhdGE7Yi4kdGlwcGVyLnJlbW92ZSgpLGIuJHRhcmdldC5vZmYoXCJtb3VzZW1vdmUudGlwcGVyIG1vdXNlbGVhdmUudGlwcGVyXCIpfXZhciBnLGg9e2RpcmVjdGlvbjpcInRvcFwiLGZvbGxvdzohMSxmb3JtYXR0ZXI6YS5ub29wLG1hcmdpbjoxNX0saT17ZGVmYXVsdHM6ZnVuY3Rpb24oYil7cmV0dXJuIGg9YS5leHRlbmQoaCxifHx7fSksYSh0aGlzKX0sZGVzdHJveTpmdW5jdGlvbigpe3JldHVybiBhKHRoaXMpLnRyaWdnZXIoXCJtb3VzZWxlYXZlLnRpcHBlclwiKS5vZmYoXCIudGlwcGVyXCIpLnJlbW92ZUNsYXNzKFwidGlwcGVyLWF0dGFjaGVkXCIpfX07YS5mbi50aXBwZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIGlbYV0/aVthXS5hcHBseSh0aGlzLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSk6XCJvYmplY3RcIiE9dHlwZW9mIGEmJmE/dGhpczpiLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0sYS50aXBwZXI9ZnVuY3Rpb24oYSl7XCJkZWZhdWx0c1wiPT09YSYmaS5kZWZhdWx0cy5hcHBseSh0aGlzLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSl9fShqUXVlcnkpO1xyXG5cclxuXHJcblxyXG4vKipcclxuICogSXNvdG9wZSB2MS41LjI1XHJcbiAqIEFuIGV4cXVpc2l0ZSBqUXVlcnkgcGx1Z2luIGZvciBtYWdpY2FsIGxheW91dHNcclxuICogaHR0cDovL2lzb3RvcGUubWV0YWZpenp5LmNvXHJcbiAqXHJcbiAqIENvbW1lcmNpYWwgdXNlIHJlcXVpcmVzIG9uZS10aW1lIGxpY2Vuc2UgZmVlXHJcbiAqIGh0dHA6Ly9tZXRhZml6enkuY28vI2xpY2Vuc2VzXHJcbiAqXHJcbiAqIENvcHlyaWdodCAyMDEyIERhdmlkIERlU2FuZHJvIC8gTWV0YWZpenp5XHJcbiAqL1xyXG4oZnVuY3Rpb24oYSxiLGMpe1widXNlIHN0cmljdFwiO3ZhciBkPWEuZG9jdW1lbnQsZT1hLk1vZGVybml6cixmPWZ1bmN0aW9uKGEpe3JldHVybiBhLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Euc2xpY2UoMSl9LGc9XCJNb3ogV2Via2l0IE8gTXNcIi5zcGxpdChcIiBcIiksaD1mdW5jdGlvbihhKXt2YXIgYj1kLmRvY3VtZW50RWxlbWVudC5zdHlsZSxjO2lmKHR5cGVvZiBiW2FdPT1cInN0cmluZ1wiKXJldHVybiBhO2E9ZihhKTtmb3IodmFyIGU9MCxoPWcubGVuZ3RoO2U8aDtlKyspe2M9Z1tlXSthO2lmKHR5cGVvZiBiW2NdPT1cInN0cmluZ1wiKXJldHVybiBjfX0saT1oKFwidHJhbnNmb3JtXCIpLGo9aChcInRyYW5zaXRpb25Qcm9wZXJ0eVwiKSxrPXtjc3N0cmFuc2Zvcm1zOmZ1bmN0aW9uKCl7cmV0dXJuISFpfSxjc3N0cmFuc2Zvcm1zM2Q6ZnVuY3Rpb24oKXt2YXIgYT0hIWgoXCJwZXJzcGVjdGl2ZVwiKTtpZihhKXt2YXIgYz1cIiAtby0gLW1vei0gLW1zLSAtd2Via2l0LSAta2h0bWwtIFwiLnNwbGl0KFwiIFwiKSxkPVwiQG1lZGlhIChcIitjLmpvaW4oXCJ0cmFuc2Zvcm0tM2QpLChcIikrXCJtb2Rlcm5penIpXCIsZT1iKFwiPHN0eWxlPlwiK2QrXCJ7I21vZGVybml6cntoZWlnaHQ6M3B4fX1cIitcIjwvc3R5bGU+XCIpLmFwcGVuZFRvKFwiaGVhZFwiKSxmPWIoJzxkaXYgaWQ9XCJtb2Rlcm5penJcIiAvPicpLmFwcGVuZFRvKFwiaHRtbFwiKTthPWYuaGVpZ2h0KCk9PT0zLGYucmVtb3ZlKCksZS5yZW1vdmUoKX1yZXR1cm4gYX0sY3NzdHJhbnNpdGlvbnM6ZnVuY3Rpb24oKXtyZXR1cm4hIWp9fSxsO2lmKGUpZm9yKGwgaW4gayllLmhhc093blByb3BlcnR5KGwpfHxlLmFkZFRlc3QobCxrW2xdKTtlbHNle2U9YS5Nb2Rlcm5penI9e192ZXJzaW9uOlwiMS42aXNoOiBtaW5pTW9kZXJuaXpyIGZvciBJc290b3BlXCJ9O3ZhciBtPVwiIFwiLG47Zm9yKGwgaW4gayluPWtbbF0oKSxlW2xdPW4sbSs9XCIgXCIrKG4/XCJcIjpcIm5vLVwiKStsO2IoXCJodG1sXCIpLmFkZENsYXNzKG0pfWlmKGUuY3NzdHJhbnNmb3Jtcyl7dmFyIG89ZS5jc3N0cmFuc2Zvcm1zM2Q/e3RyYW5zbGF0ZTpmdW5jdGlvbihhKXtyZXR1cm5cInRyYW5zbGF0ZTNkKFwiK2FbMF0rXCJweCwgXCIrYVsxXStcInB4LCAwKSBcIn0sc2NhbGU6ZnVuY3Rpb24oYSl7cmV0dXJuXCJzY2FsZTNkKFwiK2ErXCIsIFwiK2ErXCIsIDEpIFwifX06e3RyYW5zbGF0ZTpmdW5jdGlvbihhKXtyZXR1cm5cInRyYW5zbGF0ZShcIithWzBdK1wicHgsIFwiK2FbMV0rXCJweCkgXCJ9LHNjYWxlOmZ1bmN0aW9uKGEpe3JldHVyblwic2NhbGUoXCIrYStcIikgXCJ9fSxwPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1iLmRhdGEoYSxcImlzb1RyYW5zZm9ybVwiKXx8e30sZj17fSxnLGg9e30sajtmW2NdPWQsYi5leHRlbmQoZSxmKTtmb3IoZyBpbiBlKWo9ZVtnXSxoW2ddPW9bZ10oaik7dmFyIGs9aC50cmFuc2xhdGV8fFwiXCIsbD1oLnNjYWxlfHxcIlwiLG09aytsO2IuZGF0YShhLFwiaXNvVHJhbnNmb3JtXCIsZSksYS5zdHlsZVtpXT1tfTtiLmNzc051bWJlci5zY2FsZT0hMCxiLmNzc0hvb2tzLnNjYWxlPXtzZXQ6ZnVuY3Rpb24oYSxiKXtwKGEsXCJzY2FsZVwiLGIpfSxnZXQ6ZnVuY3Rpb24oYSxjKXt2YXIgZD1iLmRhdGEoYSxcImlzb1RyYW5zZm9ybVwiKTtyZXR1cm4gZCYmZC5zY2FsZT9kLnNjYWxlOjF9fSxiLmZ4LnN0ZXAuc2NhbGU9ZnVuY3Rpb24oYSl7Yi5jc3NIb29rcy5zY2FsZS5zZXQoYS5lbGVtLGEubm93K2EudW5pdCl9LGIuY3NzTnVtYmVyLnRyYW5zbGF0ZT0hMCxiLmNzc0hvb2tzLnRyYW5zbGF0ZT17c2V0OmZ1bmN0aW9uKGEsYil7cChhLFwidHJhbnNsYXRlXCIsYil9LGdldDpmdW5jdGlvbihhLGMpe3ZhciBkPWIuZGF0YShhLFwiaXNvVHJhbnNmb3JtXCIpO3JldHVybiBkJiZkLnRyYW5zbGF0ZT9kLnRyYW5zbGF0ZTpbMCwwXX19fXZhciBxLHI7ZS5jc3N0cmFuc2l0aW9ucyYmKHE9e1dlYmtpdFRyYW5zaXRpb25Qcm9wZXJ0eTpcIndlYmtpdFRyYW5zaXRpb25FbmRcIixNb3pUcmFuc2l0aW9uUHJvcGVydHk6XCJ0cmFuc2l0aW9uZW5kXCIsT1RyYW5zaXRpb25Qcm9wZXJ0eTpcIm9UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kXCIsdHJhbnNpdGlvblByb3BlcnR5OlwidHJhbnNpdGlvbmVuZFwifVtqXSxyPWgoXCJ0cmFuc2l0aW9uRHVyYXRpb25cIikpO3ZhciBzPWIuZXZlbnQsdD1iLmV2ZW50LmhhbmRsZT9cImhhbmRsZVwiOlwiZGlzcGF0Y2hcIix1O3Muc3BlY2lhbC5zbWFydHJlc2l6ZT17c2V0dXA6ZnVuY3Rpb24oKXtiKHRoaXMpLmJpbmQoXCJyZXNpemVcIixzLnNwZWNpYWwuc21hcnRyZXNpemUuaGFuZGxlcil9LHRlYXJkb3duOmZ1bmN0aW9uKCl7Yih0aGlzKS51bmJpbmQoXCJyZXNpemVcIixzLnNwZWNpYWwuc21hcnRyZXNpemUuaGFuZGxlcil9LGhhbmRsZXI6ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLGQ9YXJndW1lbnRzO2EudHlwZT1cInNtYXJ0cmVzaXplXCIsdSYmY2xlYXJUaW1lb3V0KHUpLHU9c2V0VGltZW91dChmdW5jdGlvbigpe3NbdF0uYXBwbHkoYyxkKX0sYj09PVwiZXhlY0FzYXBcIj8wOjEwMCl9fSxiLmZuLnNtYXJ0cmVzaXplPWZ1bmN0aW9uKGEpe3JldHVybiBhP3RoaXMuYmluZChcInNtYXJ0cmVzaXplXCIsYSk6dGhpcy50cmlnZ2VyKFwic21hcnRyZXNpemVcIixbXCJleGVjQXNhcFwiXSl9LGIuSXNvdG9wZT1mdW5jdGlvbihhLGMsZCl7dGhpcy5lbGVtZW50PWIoYyksdGhpcy5fY3JlYXRlKGEpLHRoaXMuX2luaXQoZCl9O3ZhciB2PVtcIndpZHRoXCIsXCJoZWlnaHRcIl0sdz1iKGEpO2IuSXNvdG9wZS5zZXR0aW5ncz17cmVzaXphYmxlOiEwLGxheW91dE1vZGU6XCJtYXNvbnJ5XCIsY29udGFpbmVyQ2xhc3M6XCJpc290b3BlXCIsaXRlbUNsYXNzOlwiaXNvdG9wZS1pdGVtXCIsaGlkZGVuQ2xhc3M6XCJpc290b3BlLWhpZGRlblwiLGhpZGRlblN0eWxlOntvcGFjaXR5OjAsc2NhbGU6LjAwMX0sdmlzaWJsZVN0eWxlOntvcGFjaXR5OjEsc2NhbGU6MX0sY29udGFpbmVyU3R5bGU6e3Bvc2l0aW9uOlwicmVsYXRpdmVcIixvdmVyZmxvdzpcImhpZGRlblwifSxhbmltYXRpb25FbmdpbmU6XCJiZXN0LWF2YWlsYWJsZVwiLGFuaW1hdGlvbk9wdGlvbnM6e3F1ZXVlOiExLGR1cmF0aW9uOjgwMH0sc29ydEJ5Olwib3JpZ2luYWwtb3JkZXJcIixzb3J0QXNjZW5kaW5nOiEwLHJlc2l6ZXNDb250YWluZXI6ITAsdHJhbnNmb3Jtc0VuYWJsZWQ6ITAsaXRlbVBvc2l0aW9uRGF0YUVuYWJsZWQ6ITF9LGIuSXNvdG9wZS5wcm90b3R5cGU9e19jcmVhdGU6ZnVuY3Rpb24oYSl7dGhpcy5vcHRpb25zPWIuZXh0ZW5kKHt9LGIuSXNvdG9wZS5zZXR0aW5ncyxhKSx0aGlzLnN0eWxlUXVldWU9W10sdGhpcy5lbGVtQ291bnQ9MDt2YXIgYz10aGlzLmVsZW1lbnRbMF0uc3R5bGU7dGhpcy5vcmlnaW5hbFN0eWxlPXt9O3ZhciBkPXYuc2xpY2UoMCk7Zm9yKHZhciBlIGluIHRoaXMub3B0aW9ucy5jb250YWluZXJTdHlsZSlkLnB1c2goZSk7Zm9yKHZhciBmPTAsZz1kLmxlbmd0aDtmPGc7ZisrKWU9ZFtmXSx0aGlzLm9yaWdpbmFsU3R5bGVbZV09Y1tlXXx8XCJcIjt0aGlzLmVsZW1lbnQuY3NzKHRoaXMub3B0aW9ucy5jb250YWluZXJTdHlsZSksdGhpcy5fdXBkYXRlQW5pbWF0aW9uRW5naW5lKCksdGhpcy5fdXBkYXRlVXNpbmdUcmFuc2Zvcm1zKCk7dmFyIGg9e1wib3JpZ2luYWwtb3JkZXJcIjpmdW5jdGlvbihhLGIpe3JldHVybiBiLmVsZW1Db3VudCsrLGIuZWxlbUNvdW50fSxyYW5kb206ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5yYW5kb20oKX19O3RoaXMub3B0aW9ucy5nZXRTb3J0RGF0YT1iLmV4dGVuZCh0aGlzLm9wdGlvbnMuZ2V0U29ydERhdGEsaCksdGhpcy5yZWxvYWRJdGVtcygpLHRoaXMub2Zmc2V0PXtsZWZ0OnBhcnNlSW50KHRoaXMuZWxlbWVudC5jc3MoXCJwYWRkaW5nLWxlZnRcIil8fDAsMTApLHRvcDpwYXJzZUludCh0aGlzLmVsZW1lbnQuY3NzKFwicGFkZGluZy10b3BcIil8fDAsMTApfTt2YXIgaT10aGlzO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtpLmVsZW1lbnQuYWRkQ2xhc3MoaS5vcHRpb25zLmNvbnRhaW5lckNsYXNzKX0sMCksdGhpcy5vcHRpb25zLnJlc2l6YWJsZSYmdy5iaW5kKFwic21hcnRyZXNpemUuaXNvdG9wZVwiLGZ1bmN0aW9uKCl7aS5yZXNpemUoKX0pLHRoaXMuZWxlbWVudC5kZWxlZ2F0ZShcIi5cIit0aGlzLm9wdGlvbnMuaGlkZGVuQ2xhc3MsXCJjbGlja1wiLGZ1bmN0aW9uKCl7cmV0dXJuITF9KX0sX2dldEF0b21zOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucy5pdGVtU2VsZWN0b3IsYz1iP2EuZmlsdGVyKGIpLmFkZChhLmZpbmQoYikpOmEsZD17cG9zaXRpb246XCJhYnNvbHV0ZVwifTtyZXR1cm4gYz1jLmZpbHRlcihmdW5jdGlvbihhLGIpe3JldHVybiBiLm5vZGVUeXBlPT09MX0pLHRoaXMudXNpbmdUcmFuc2Zvcm1zJiYoZC5sZWZ0PTAsZC50b3A9MCksYy5jc3MoZCkuYWRkQ2xhc3ModGhpcy5vcHRpb25zLml0ZW1DbGFzcyksdGhpcy51cGRhdGVTb3J0RGF0YShjLCEwKSxjfSxfaW5pdDpmdW5jdGlvbihhKXt0aGlzLiRmaWx0ZXJlZEF0b21zPXRoaXMuX2ZpbHRlcih0aGlzLiRhbGxBdG9tcyksdGhpcy5fc29ydCgpLHRoaXMucmVMYXlvdXQoYSl9LG9wdGlvbjpmdW5jdGlvbihhKXtpZihiLmlzUGxhaW5PYmplY3QoYSkpe3RoaXMub3B0aW9ucz1iLmV4dGVuZCghMCx0aGlzLm9wdGlvbnMsYSk7dmFyIGM7Zm9yKHZhciBkIGluIGEpYz1cIl91cGRhdGVcIitmKGQpLHRoaXNbY10mJnRoaXNbY10oKX19LF91cGRhdGVBbmltYXRpb25FbmdpbmU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLm9wdGlvbnMuYW5pbWF0aW9uRW5naW5lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWyBfXFwtXS9nLFwiXCIpLGI7c3dpdGNoKGEpe2Nhc2VcImNzc1wiOmNhc2VcIm5vbmVcIjpiPSExO2JyZWFrO2Nhc2VcImpxdWVyeVwiOmI9ITA7YnJlYWs7ZGVmYXVsdDpiPSFlLmNzc3RyYW5zaXRpb25zfXRoaXMuaXNVc2luZ0pRdWVyeUFuaW1hdGlvbj1iLHRoaXMuX3VwZGF0ZVVzaW5nVHJhbnNmb3JtcygpfSxfdXBkYXRlVHJhbnNmb3Jtc0VuYWJsZWQ6ZnVuY3Rpb24oKXt0aGlzLl91cGRhdGVVc2luZ1RyYW5zZm9ybXMoKX0sX3VwZGF0ZVVzaW5nVHJhbnNmb3JtczpmdW5jdGlvbigpe3ZhciBhPXRoaXMudXNpbmdUcmFuc2Zvcm1zPXRoaXMub3B0aW9ucy50cmFuc2Zvcm1zRW5hYmxlZCYmZS5jc3N0cmFuc2Zvcm1zJiZlLmNzc3RyYW5zaXRpb25zJiYhdGhpcy5pc1VzaW5nSlF1ZXJ5QW5pbWF0aW9uO2F8fChkZWxldGUgdGhpcy5vcHRpb25zLmhpZGRlblN0eWxlLnNjYWxlLGRlbGV0ZSB0aGlzLm9wdGlvbnMudmlzaWJsZVN0eWxlLnNjYWxlKSx0aGlzLmdldFBvc2l0aW9uU3R5bGVzPWE/dGhpcy5fdHJhbnNsYXRlOnRoaXMuX3Bvc2l0aW9uQWJzfSxfZmlsdGVyOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucy5maWx0ZXI9PT1cIlwiP1wiKlwiOnRoaXMub3B0aW9ucy5maWx0ZXI7aWYoIWIpcmV0dXJuIGE7dmFyIGM9dGhpcy5vcHRpb25zLmhpZGRlbkNsYXNzLGQ9XCIuXCIrYyxlPWEuZmlsdGVyKGQpLGY9ZTtpZihiIT09XCIqXCIpe2Y9ZS5maWx0ZXIoYik7dmFyIGc9YS5ub3QoZCkubm90KGIpLmFkZENsYXNzKGMpO3RoaXMuc3R5bGVRdWV1ZS5wdXNoKHskZWw6ZyxzdHlsZTp0aGlzLm9wdGlvbnMuaGlkZGVuU3R5bGV9KX1yZXR1cm4gdGhpcy5zdHlsZVF1ZXVlLnB1c2goeyRlbDpmLHN0eWxlOnRoaXMub3B0aW9ucy52aXNpYmxlU3R5bGV9KSxmLnJlbW92ZUNsYXNzKGMpLGEuZmlsdGVyKGIpfSx1cGRhdGVTb3J0RGF0YTpmdW5jdGlvbihhLGMpe3ZhciBkPXRoaXMsZT10aGlzLm9wdGlvbnMuZ2V0U29ydERhdGEsZixnO2EuZWFjaChmdW5jdGlvbigpe2Y9Yih0aGlzKSxnPXt9O2Zvcih2YXIgYSBpbiBlKSFjJiZhPT09XCJvcmlnaW5hbC1vcmRlclwiP2dbYV09Yi5kYXRhKHRoaXMsXCJpc290b3BlLXNvcnQtZGF0YVwiKVthXTpnW2FdPWVbYV0oZixkKTtiLmRhdGEodGhpcyxcImlzb3RvcGUtc29ydC1kYXRhXCIsZyl9KX0sX3NvcnQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLm9wdGlvbnMuc29ydEJ5LGI9dGhpcy5fZ2V0U29ydGVyLGM9dGhpcy5vcHRpb25zLnNvcnRBc2NlbmRpbmc/MTotMSxkPWZ1bmN0aW9uKGQsZSl7dmFyIGY9YihkLGEpLGc9YihlLGEpO3JldHVybiBmPT09ZyYmYSE9PVwib3JpZ2luYWwtb3JkZXJcIiYmKGY9YihkLFwib3JpZ2luYWwtb3JkZXJcIiksZz1iKGUsXCJvcmlnaW5hbC1vcmRlclwiKSksKGY+Zz8xOmY8Zz8tMTowKSpjfTt0aGlzLiRmaWx0ZXJlZEF0b21zLnNvcnQoZCl9LF9nZXRTb3J0ZXI6ZnVuY3Rpb24oYSxjKXtyZXR1cm4gYi5kYXRhKGEsXCJpc290b3BlLXNvcnQtZGF0YVwiKVtjXX0sX3RyYW5zbGF0ZTpmdW5jdGlvbihhLGIpe3JldHVybnt0cmFuc2xhdGU6W2EsYl19fSxfcG9zaXRpb25BYnM6ZnVuY3Rpb24oYSxiKXtyZXR1cm57bGVmdDphLHRvcDpifX0sX3B1c2hQb3NpdGlvbjpmdW5jdGlvbihhLGIsYyl7Yj1NYXRoLnJvdW5kKGIrdGhpcy5vZmZzZXQubGVmdCksYz1NYXRoLnJvdW5kKGMrdGhpcy5vZmZzZXQudG9wKTt2YXIgZD10aGlzLmdldFBvc2l0aW9uU3R5bGVzKGIsYyk7dGhpcy5zdHlsZVF1ZXVlLnB1c2goeyRlbDphLHN0eWxlOmR9KSx0aGlzLm9wdGlvbnMuaXRlbVBvc2l0aW9uRGF0YUVuYWJsZWQmJmEuZGF0YShcImlzb3RvcGUtaXRlbS1wb3NpdGlvblwiLHt4OmIseTpjfSl9LGxheW91dDpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMub3B0aW9ucy5sYXlvdXRNb2RlO3RoaXNbXCJfXCIrYytcIkxheW91dFwiXShhKTtpZih0aGlzLm9wdGlvbnMucmVzaXplc0NvbnRhaW5lcil7dmFyIGQ9dGhpc1tcIl9cIitjK1wiR2V0Q29udGFpbmVyU2l6ZVwiXSgpO3RoaXMuc3R5bGVRdWV1ZS5wdXNoKHskZWw6dGhpcy5lbGVtZW50LHN0eWxlOmR9KX10aGlzLl9wcm9jZXNzU3R5bGVRdWV1ZShhLGIpLHRoaXMuaXNMYWlkT3V0PSEwfSxfcHJvY2Vzc1N0eWxlUXVldWU6ZnVuY3Rpb24oYSxjKXt2YXIgZD10aGlzLmlzTGFpZE91dD90aGlzLmlzVXNpbmdKUXVlcnlBbmltYXRpb24/XCJhbmltYXRlXCI6XCJjc3NcIjpcImNzc1wiLGY9dGhpcy5vcHRpb25zLmFuaW1hdGlvbk9wdGlvbnMsZz10aGlzLm9wdGlvbnMub25MYXlvdXQsaCxpLGosaztpPWZ1bmN0aW9uKGEsYil7Yi4kZWxbZF0oYi5zdHlsZSxmKX07aWYodGhpcy5faXNJbnNlcnRpbmcmJnRoaXMuaXNVc2luZ0pRdWVyeUFuaW1hdGlvbilpPWZ1bmN0aW9uKGEsYil7aD1iLiRlbC5oYXNDbGFzcyhcIm5vLXRyYW5zaXRpb25cIik/XCJjc3NcIjpkLGIuJGVsW2hdKGIuc3R5bGUsZil9O2Vsc2UgaWYoY3x8Z3x8Zi5jb21wbGV0ZSl7dmFyIGw9ITEsbT1bYyxnLGYuY29tcGxldGVdLG49dGhpcztqPSEwLGs9ZnVuY3Rpb24oKXtpZihsKXJldHVybjt2YXIgYjtmb3IodmFyIGM9MCxkPW0ubGVuZ3RoO2M8ZDtjKyspYj1tW2NdLHR5cGVvZiBiPT1cImZ1bmN0aW9uXCImJmIuY2FsbChuLmVsZW1lbnQsYSxuKTtsPSEwfTtpZih0aGlzLmlzVXNpbmdKUXVlcnlBbmltYXRpb24mJmQ9PT1cImFuaW1hdGVcIilmLmNvbXBsZXRlPWssaj0hMTtlbHNlIGlmKGUuY3NzdHJhbnNpdGlvbnMpe3ZhciBvPTAscD10aGlzLnN0eWxlUXVldWVbMF0scz1wJiZwLiRlbCx0O3doaWxlKCFzfHwhcy5sZW5ndGgpe3Q9dGhpcy5zdHlsZVF1ZXVlW28rK107aWYoIXQpcmV0dXJuO3M9dC4kZWx9dmFyIHU9cGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKHNbMF0pW3JdKTt1PjAmJihpPWZ1bmN0aW9uKGEsYil7Yi4kZWxbZF0oYi5zdHlsZSxmKS5vbmUocSxrKX0saj0hMSl9fWIuZWFjaCh0aGlzLnN0eWxlUXVldWUsaSksaiYmaygpLHRoaXMuc3R5bGVRdWV1ZT1bXX0scmVzaXplOmZ1bmN0aW9uKCl7dGhpc1tcIl9cIit0aGlzLm9wdGlvbnMubGF5b3V0TW9kZStcIlJlc2l6ZUNoYW5nZWRcIl0oKSYmdGhpcy5yZUxheW91dCgpfSxyZUxheW91dDpmdW5jdGlvbihhKXt0aGlzW1wiX1wiK3RoaXMub3B0aW9ucy5sYXlvdXRNb2RlK1wiUmVzZXRcIl0oKSx0aGlzLmxheW91dCh0aGlzLiRmaWx0ZXJlZEF0b21zLGEpfSxhZGRJdGVtczpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMuX2dldEF0b21zKGEpO3RoaXMuJGFsbEF0b21zPXRoaXMuJGFsbEF0b21zLmFkZChjKSxiJiZiKGMpfSxpbnNlcnQ6ZnVuY3Rpb24oYSxiKXt0aGlzLmVsZW1lbnQuYXBwZW5kKGEpO3ZhciBjPXRoaXM7dGhpcy5hZGRJdGVtcyhhLGZ1bmN0aW9uKGEpe3ZhciBkPWMuX2ZpbHRlcihhKTtjLl9hZGRIaWRlQXBwZW5kZWQoZCksYy5fc29ydCgpLGMucmVMYXlvdXQoKSxjLl9yZXZlYWxBcHBlbmRlZChkLGIpfSl9LGFwcGVuZGVkOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpczt0aGlzLmFkZEl0ZW1zKGEsZnVuY3Rpb24oYSl7Yy5fYWRkSGlkZUFwcGVuZGVkKGEpLGMubGF5b3V0KGEpLGMuX3JldmVhbEFwcGVuZGVkKGEsYil9KX0sX2FkZEhpZGVBcHBlbmRlZDpmdW5jdGlvbihhKXt0aGlzLiRmaWx0ZXJlZEF0b21zPXRoaXMuJGZpbHRlcmVkQXRvbXMuYWRkKGEpLGEuYWRkQ2xhc3MoXCJuby10cmFuc2l0aW9uXCIpLHRoaXMuX2lzSW5zZXJ0aW5nPSEwLHRoaXMuc3R5bGVRdWV1ZS5wdXNoKHskZWw6YSxzdHlsZTp0aGlzLm9wdGlvbnMuaGlkZGVuU3R5bGV9KX0sX3JldmVhbEFwcGVuZGVkOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YS5yZW1vdmVDbGFzcyhcIm5vLXRyYW5zaXRpb25cIiksYy5zdHlsZVF1ZXVlLnB1c2goeyRlbDphLHN0eWxlOmMub3B0aW9ucy52aXNpYmxlU3R5bGV9KSxjLl9pc0luc2VydGluZz0hMSxjLl9wcm9jZXNzU3R5bGVRdWV1ZShhLGIpfSwxMCl9LHJlbG9hZEl0ZW1zOmZ1bmN0aW9uKCl7dGhpcy4kYWxsQXRvbXM9dGhpcy5fZ2V0QXRvbXModGhpcy5lbGVtZW50LmNoaWxkcmVuKCkpfSxyZW1vdmU6ZnVuY3Rpb24oYSxiKXt0aGlzLiRhbGxBdG9tcz10aGlzLiRhbGxBdG9tcy5ub3QoYSksdGhpcy4kZmlsdGVyZWRBdG9tcz10aGlzLiRmaWx0ZXJlZEF0b21zLm5vdChhKTt2YXIgYz10aGlzLGQ9ZnVuY3Rpb24oKXthLnJlbW92ZSgpLGImJmIuY2FsbChjLmVsZW1lbnQpfTthLmZpbHRlcihcIjpub3QoLlwiK3RoaXMub3B0aW9ucy5oaWRkZW5DbGFzcytcIilcIikubGVuZ3RoPyh0aGlzLnN0eWxlUXVldWUucHVzaCh7JGVsOmEsc3R5bGU6dGhpcy5vcHRpb25zLmhpZGRlblN0eWxlfSksdGhpcy5fc29ydCgpLHRoaXMucmVMYXlvdXQoZCkpOmQoKX0sc2h1ZmZsZTpmdW5jdGlvbihhKXt0aGlzLnVwZGF0ZVNvcnREYXRhKHRoaXMuJGFsbEF0b21zKSx0aGlzLm9wdGlvbnMuc29ydEJ5PVwicmFuZG9tXCIsdGhpcy5fc29ydCgpLHRoaXMucmVMYXlvdXQoYSl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnVzaW5nVHJhbnNmb3JtcyxiPXRoaXMub3B0aW9uczt0aGlzLiRhbGxBdG9tcy5yZW1vdmVDbGFzcyhiLmhpZGRlbkNsYXNzK1wiIFwiK2IuaXRlbUNsYXNzKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGI9dGhpcy5zdHlsZTtiLnBvc2l0aW9uPVwiXCIsYi50b3A9XCJcIixiLmxlZnQ9XCJcIixiLm9wYWNpdHk9XCJcIixhJiYoYltpXT1cIlwiKX0pO3ZhciBjPXRoaXMuZWxlbWVudFswXS5zdHlsZTtmb3IodmFyIGQgaW4gdGhpcy5vcmlnaW5hbFN0eWxlKWNbZF09dGhpcy5vcmlnaW5hbFN0eWxlW2RdO3RoaXMuZWxlbWVudC51bmJpbmQoXCIuaXNvdG9wZVwiKS51bmRlbGVnYXRlKFwiLlwiK2IuaGlkZGVuQ2xhc3MsXCJjbGlja1wiKS5yZW1vdmVDbGFzcyhiLmNvbnRhaW5lckNsYXNzKS5yZW1vdmVEYXRhKFwiaXNvdG9wZVwiKSx3LnVuYmluZChcIi5pc290b3BlXCIpfSxfZ2V0U2VnbWVudHM6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5vcHRpb25zLmxheW91dE1vZGUsYz1hP1wicm93SGVpZ2h0XCI6XCJjb2x1bW5XaWR0aFwiLGQ9YT9cImhlaWdodFwiOlwid2lkdGhcIixlPWE/XCJyb3dzXCI6XCJjb2xzXCIsZz10aGlzLmVsZW1lbnRbZF0oKSxoLGk9dGhpcy5vcHRpb25zW2JdJiZ0aGlzLm9wdGlvbnNbYl1bY118fHRoaXMuJGZpbHRlcmVkQXRvbXNbXCJvdXRlclwiK2YoZCldKCEwKXx8ZztoPU1hdGguZmxvb3IoZy9pKSxoPU1hdGgubWF4KGgsMSksdGhpc1tiXVtlXT1oLHRoaXNbYl1bY109aX0sX2NoZWNrSWZTZWdtZW50c0NoYW5nZWQ6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5vcHRpb25zLmxheW91dE1vZGUsYz1hP1wicm93c1wiOlwiY29sc1wiLGQ9dGhpc1tiXVtjXTtyZXR1cm4gdGhpcy5fZ2V0U2VnbWVudHMoYSksdGhpc1tiXVtjXSE9PWR9LF9tYXNvbnJ5UmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLm1hc29ucnk9e30sdGhpcy5fZ2V0U2VnbWVudHMoKTt2YXIgYT10aGlzLm1hc29ucnkuY29sczt0aGlzLm1hc29ucnkuY29sWXM9W107d2hpbGUoYS0tKXRoaXMubWFzb25yeS5jb2xZcy5wdXNoKDApfSxfbWFzb25yeUxheW91dDpmdW5jdGlvbihhKXt2YXIgYz10aGlzLGQ9Yy5tYXNvbnJ5O2EuZWFjaChmdW5jdGlvbigpe3ZhciBhPWIodGhpcyksZT1NYXRoLmNlaWwoYS5vdXRlcldpZHRoKCEwKS9kLmNvbHVtbldpZHRoKTtlPU1hdGgubWluKGUsZC5jb2xzKTtpZihlPT09MSljLl9tYXNvbnJ5UGxhY2VCcmljayhhLGQuY29sWXMpO2Vsc2V7dmFyIGY9ZC5jb2xzKzEtZSxnPVtdLGgsaTtmb3IoaT0wO2k8ZjtpKyspaD1kLmNvbFlzLnNsaWNlKGksaStlKSxnW2ldPU1hdGgubWF4LmFwcGx5KE1hdGgsaCk7Yy5fbWFzb25yeVBsYWNlQnJpY2soYSxnKX19KX0sX21hc29ucnlQbGFjZUJyaWNrOmZ1bmN0aW9uKGEsYil7dmFyIGM9TWF0aC5taW4uYXBwbHkoTWF0aCxiKSxkPTA7Zm9yKHZhciBlPTAsZj1iLmxlbmd0aDtlPGY7ZSsrKWlmKGJbZV09PT1jKXtkPWU7YnJlYWt9dmFyIGc9dGhpcy5tYXNvbnJ5LmNvbHVtbldpZHRoKmQsaD1jO3RoaXMuX3B1c2hQb3NpdGlvbihhLGcsaCk7dmFyIGk9YythLm91dGVySGVpZ2h0KCEwKSxqPXRoaXMubWFzb25yeS5jb2xzKzEtZjtmb3IoZT0wO2U8ajtlKyspdGhpcy5tYXNvbnJ5LmNvbFlzW2QrZV09aX0sX21hc29ucnlHZXRDb250YWluZXJTaXplOmZ1bmN0aW9uKCl7dmFyIGE9TWF0aC5tYXguYXBwbHkoTWF0aCx0aGlzLm1hc29ucnkuY29sWXMpO3JldHVybntoZWlnaHQ6YX19LF9tYXNvbnJ5UmVzaXplQ2hhbmdlZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9jaGVja0lmU2VnbWVudHNDaGFuZ2VkKCl9LF9maXRSb3dzUmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLmZpdFJvd3M9e3g6MCx5OjAsaGVpZ2h0OjB9fSxfZml0Um93c0xheW91dDpmdW5jdGlvbihhKXt2YXIgYz10aGlzLGQ9dGhpcy5lbGVtZW50LndpZHRoKCksZT10aGlzLmZpdFJvd3M7YS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGE9Yih0aGlzKSxmPWEub3V0ZXJXaWR0aCghMCksZz1hLm91dGVySGVpZ2h0KCEwKTtlLnghPT0wJiZmK2UueD5kJiYoZS54PTAsZS55PWUuaGVpZ2h0KSxjLl9wdXNoUG9zaXRpb24oYSxlLngsZS55KSxlLmhlaWdodD1NYXRoLm1heChlLnkrZyxlLmhlaWdodCksZS54Kz1mfSl9LF9maXRSb3dzR2V0Q29udGFpbmVyU2l6ZTpmdW5jdGlvbigpe3JldHVybntoZWlnaHQ6dGhpcy5maXRSb3dzLmhlaWdodH19LF9maXRSb3dzUmVzaXplQ2hhbmdlZDpmdW5jdGlvbigpe3JldHVybiEwfSxfY2VsbHNCeVJvd1Jlc2V0OmZ1bmN0aW9uKCl7dGhpcy5jZWxsc0J5Um93PXtpbmRleDowfSx0aGlzLl9nZXRTZWdtZW50cygpLHRoaXMuX2dldFNlZ21lbnRzKCEwKX0sX2NlbGxzQnlSb3dMYXlvdXQ6ZnVuY3Rpb24oYSl7dmFyIGM9dGhpcyxkPXRoaXMuY2VsbHNCeVJvdzthLmVhY2goZnVuY3Rpb24oKXt2YXIgYT1iKHRoaXMpLGU9ZC5pbmRleCVkLmNvbHMsZj1NYXRoLmZsb29yKGQuaW5kZXgvZC5jb2xzKSxnPShlKy41KSpkLmNvbHVtbldpZHRoLWEub3V0ZXJXaWR0aCghMCkvMixoPShmKy41KSpkLnJvd0hlaWdodC1hLm91dGVySGVpZ2h0KCEwKS8yO2MuX3B1c2hQb3NpdGlvbihhLGcsaCksZC5pbmRleCsrfSl9LF9jZWxsc0J5Um93R2V0Q29udGFpbmVyU2l6ZTpmdW5jdGlvbigpe3JldHVybntoZWlnaHQ6TWF0aC5jZWlsKHRoaXMuJGZpbHRlcmVkQXRvbXMubGVuZ3RoL3RoaXMuY2VsbHNCeVJvdy5jb2xzKSp0aGlzLmNlbGxzQnlSb3cucm93SGVpZ2h0K3RoaXMub2Zmc2V0LnRvcH19LF9jZWxsc0J5Um93UmVzaXplQ2hhbmdlZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9jaGVja0lmU2VnbWVudHNDaGFuZ2VkKCl9LF9zdHJhaWdodERvd25SZXNldDpmdW5jdGlvbigpe3RoaXMuc3RyYWlnaHREb3duPXt5OjB9fSxfc3RyYWlnaHREb3duTGF5b3V0OmZ1bmN0aW9uKGEpe3ZhciBjPXRoaXM7YS5lYWNoKGZ1bmN0aW9uKGEpe3ZhciBkPWIodGhpcyk7Yy5fcHVzaFBvc2l0aW9uKGQsMCxjLnN0cmFpZ2h0RG93bi55KSxjLnN0cmFpZ2h0RG93bi55Kz1kLm91dGVySGVpZ2h0KCEwKX0pfSxfc3RyYWlnaHREb3duR2V0Q29udGFpbmVyU2l6ZTpmdW5jdGlvbigpe3JldHVybntoZWlnaHQ6dGhpcy5zdHJhaWdodERvd24ueX19LF9zdHJhaWdodERvd25SZXNpemVDaGFuZ2VkOmZ1bmN0aW9uKCl7cmV0dXJuITB9LF9tYXNvbnJ5SG9yaXpvbnRhbFJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5tYXNvbnJ5SG9yaXpvbnRhbD17fSx0aGlzLl9nZXRTZWdtZW50cyghMCk7dmFyIGE9dGhpcy5tYXNvbnJ5SG9yaXpvbnRhbC5yb3dzO3RoaXMubWFzb25yeUhvcml6b250YWwucm93WHM9W107d2hpbGUoYS0tKXRoaXMubWFzb25yeUhvcml6b250YWwucm93WHMucHVzaCgwKX0sX21hc29ucnlIb3Jpem9udGFsTGF5b3V0OmZ1bmN0aW9uKGEpe3ZhciBjPXRoaXMsZD1jLm1hc29ucnlIb3Jpem9udGFsO2EuZWFjaChmdW5jdGlvbigpe3ZhciBhPWIodGhpcyksZT1NYXRoLmNlaWwoYS5vdXRlckhlaWdodCghMCkvZC5yb3dIZWlnaHQpO2U9TWF0aC5taW4oZSxkLnJvd3MpO2lmKGU9PT0xKWMuX21hc29ucnlIb3Jpem9udGFsUGxhY2VCcmljayhhLGQucm93WHMpO2Vsc2V7dmFyIGY9ZC5yb3dzKzEtZSxnPVtdLGgsaTtmb3IoaT0wO2k8ZjtpKyspaD1kLnJvd1hzLnNsaWNlKGksaStlKSxnW2ldPU1hdGgubWF4LmFwcGx5KE1hdGgsaCk7Yy5fbWFzb25yeUhvcml6b250YWxQbGFjZUJyaWNrKGEsZyl9fSl9LF9tYXNvbnJ5SG9yaXpvbnRhbFBsYWNlQnJpY2s6ZnVuY3Rpb24oYSxiKXt2YXIgYz1NYXRoLm1pbi5hcHBseShNYXRoLGIpLGQ9MDtmb3IodmFyIGU9MCxmPWIubGVuZ3RoO2U8ZjtlKyspaWYoYltlXT09PWMpe2Q9ZTticmVha312YXIgZz1jLGg9dGhpcy5tYXNvbnJ5SG9yaXpvbnRhbC5yb3dIZWlnaHQqZDt0aGlzLl9wdXNoUG9zaXRpb24oYSxnLGgpO3ZhciBpPWMrYS5vdXRlcldpZHRoKCEwKSxqPXRoaXMubWFzb25yeUhvcml6b250YWwucm93cysxLWY7Zm9yKGU9MDtlPGo7ZSsrKXRoaXMubWFzb25yeUhvcml6b250YWwucm93WHNbZCtlXT1pfSxfbWFzb25yeUhvcml6b250YWxHZXRDb250YWluZXJTaXplOmZ1bmN0aW9uKCl7dmFyIGE9TWF0aC5tYXguYXBwbHkoTWF0aCx0aGlzLm1hc29ucnlIb3Jpem9udGFsLnJvd1hzKTtyZXR1cm57d2lkdGg6YX19LF9tYXNvbnJ5SG9yaXpvbnRhbFJlc2l6ZUNoYW5nZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fY2hlY2tJZlNlZ21lbnRzQ2hhbmdlZCghMCl9LF9maXRDb2x1bW5zUmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLmZpdENvbHVtbnM9e3g6MCx5OjAsd2lkdGg6MH19LF9maXRDb2x1bW5zTGF5b3V0OmZ1bmN0aW9uKGEpe3ZhciBjPXRoaXMsZD10aGlzLmVsZW1lbnQuaGVpZ2h0KCksZT10aGlzLmZpdENvbHVtbnM7YS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGE9Yih0aGlzKSxmPWEub3V0ZXJXaWR0aCghMCksZz1hLm91dGVySGVpZ2h0KCEwKTtlLnkhPT0wJiZnK2UueT5kJiYoZS54PWUud2lkdGgsZS55PTApLGMuX3B1c2hQb3NpdGlvbihhLGUueCxlLnkpLGUud2lkdGg9TWF0aC5tYXgoZS54K2YsZS53aWR0aCksZS55Kz1nfSl9LF9maXRDb2x1bW5zR2V0Q29udGFpbmVyU2l6ZTpmdW5jdGlvbigpe3JldHVybnt3aWR0aDp0aGlzLmZpdENvbHVtbnMud2lkdGh9fSxfZml0Q29sdW1uc1Jlc2l6ZUNoYW5nZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hMH0sX2NlbGxzQnlDb2x1bW5SZXNldDpmdW5jdGlvbigpe3RoaXMuY2VsbHNCeUNvbHVtbj17aW5kZXg6MH0sdGhpcy5fZ2V0U2VnbWVudHMoKSx0aGlzLl9nZXRTZWdtZW50cyghMCl9LF9jZWxsc0J5Q29sdW1uTGF5b3V0OmZ1bmN0aW9uKGEpe3ZhciBjPXRoaXMsZD10aGlzLmNlbGxzQnlDb2x1bW47YS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGE9Yih0aGlzKSxlPU1hdGguZmxvb3IoZC5pbmRleC9kLnJvd3MpLGY9ZC5pbmRleCVkLnJvd3MsZz0oZSsuNSkqZC5jb2x1bW5XaWR0aC1hLm91dGVyV2lkdGgoITApLzIsaD0oZisuNSkqZC5yb3dIZWlnaHQtYS5vdXRlckhlaWdodCghMCkvMjtjLl9wdXNoUG9zaXRpb24oYSxnLGgpLGQuaW5kZXgrK30pfSxfY2VsbHNCeUNvbHVtbkdldENvbnRhaW5lclNpemU6ZnVuY3Rpb24oKXtyZXR1cm57d2lkdGg6TWF0aC5jZWlsKHRoaXMuJGZpbHRlcmVkQXRvbXMubGVuZ3RoL3RoaXMuY2VsbHNCeUNvbHVtbi5yb3dzKSp0aGlzLmNlbGxzQnlDb2x1bW4uY29sdW1uV2lkdGh9fSxfY2VsbHNCeUNvbHVtblJlc2l6ZUNoYW5nZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fY2hlY2tJZlNlZ21lbnRzQ2hhbmdlZCghMCl9LF9zdHJhaWdodEFjcm9zc1Jlc2V0OmZ1bmN0aW9uKCl7dGhpcy5zdHJhaWdodEFjcm9zcz17eDowfX0sX3N0cmFpZ2h0QWNyb3NzTGF5b3V0OmZ1bmN0aW9uKGEpe3ZhciBjPXRoaXM7YS5lYWNoKGZ1bmN0aW9uKGEpe3ZhciBkPWIodGhpcyk7Yy5fcHVzaFBvc2l0aW9uKGQsYy5zdHJhaWdodEFjcm9zcy54LDApLGMuc3RyYWlnaHRBY3Jvc3MueCs9ZC5vdXRlcldpZHRoKCEwKX0pfSxfc3RyYWlnaHRBY3Jvc3NHZXRDb250YWluZXJTaXplOmZ1bmN0aW9uKCl7cmV0dXJue3dpZHRoOnRoaXMuc3RyYWlnaHRBY3Jvc3MueH19LF9zdHJhaWdodEFjcm9zc1Jlc2l6ZUNoYW5nZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hMH19LGIuZm4uaW1hZ2VzTG9hZGVkPWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGgoKXthLmNhbGwoYyxkKX1mdW5jdGlvbiBpKGEpe3ZhciBjPWEudGFyZ2V0O2Muc3JjIT09ZiYmYi5pbkFycmF5KGMsZyk9PT0tMSYmKGcucHVzaChjKSwtLWU8PTAmJihzZXRUaW1lb3V0KGgpLGQudW5iaW5kKFwiLmltYWdlc0xvYWRlZFwiLGkpKSl9dmFyIGM9dGhpcyxkPWMuZmluZChcImltZ1wiKS5hZGQoYy5maWx0ZXIoXCJpbWdcIikpLGU9ZC5sZW5ndGgsZj1cImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veXdBQUFBQUFRQUJBQUFDQVV3QU93PT1cIixnPVtdO3JldHVybiBlfHxoKCksZC5iaW5kKFwibG9hZC5pbWFnZXNMb2FkZWQgZXJyb3IuaW1hZ2VzTG9hZGVkXCIsaSkuZWFjaChmdW5jdGlvbigpe3ZhciBhPXRoaXMuc3JjO3RoaXMuc3JjPWYsdGhpcy5zcmM9YX0pLGN9O3ZhciB4PWZ1bmN0aW9uKGIpe2EuY29uc29sZSYmYS5jb25zb2xlLmVycm9yKGIpfTtiLmZuLmlzb3RvcGU9ZnVuY3Rpb24oYSxjKXtpZih0eXBlb2YgYT09XCJzdHJpbmdcIil7dmFyIGQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO3RoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBjPWIuZGF0YSh0aGlzLFwiaXNvdG9wZVwiKTtpZighYyl7eChcImNhbm5vdCBjYWxsIG1ldGhvZHMgb24gaXNvdG9wZSBwcmlvciB0byBpbml0aWFsaXphdGlvbjsgYXR0ZW1wdGVkIHRvIGNhbGwgbWV0aG9kICdcIithK1wiJ1wiKTtyZXR1cm59aWYoIWIuaXNGdW5jdGlvbihjW2FdKXx8YS5jaGFyQXQoMCk9PT1cIl9cIil7eChcIm5vIHN1Y2ggbWV0aG9kICdcIithK1wiJyBmb3IgaXNvdG9wZSBpbnN0YW5jZVwiKTtyZXR1cm59Y1thXS5hcHBseShjLGQpfSl9ZWxzZSB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZD1iLmRhdGEodGhpcyxcImlzb3RvcGVcIik7ZD8oZC5vcHRpb24oYSksZC5faW5pdChjKSk6Yi5kYXRhKHRoaXMsXCJpc290b3BlXCIsbmV3IGIuSXNvdG9wZShhLHRoaXMsYykpfSk7cmV0dXJuIHRoaXN9fSkod2luZG93LGpRdWVyeSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuLyohXHJcbioganF1ZXJ5LmNvdW50ZXJ1cC5qcyAxLjBcclxuKlxyXG4qIENvcHlyaWdodCAyMDEzLCBCZW5qYW1pbiBJbnRhbCBodHRwOi8vZ2FtYml0LnBoIEBiZmludGFsXHJcbiogUmVsZWFzZWQgdW5kZXIgdGhlIEdQTCB2MiBMaWNlbnNlXHJcbipcclxuKiBEYXRlOiBOb3YgMjYsIDIwMTNcclxuKi8oZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZS5mbi5jb3VudGVyVXA9ZnVuY3Rpb24odCl7dmFyIG49ZS5leHRlbmQoe3RpbWU6NDAwLGRlbGF5OjEwfSx0KTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9ZSh0aGlzKSxyPW4saT1mdW5jdGlvbigpe3ZhciBlPVtdLG49ci50aW1lL3IuZGVsYXksaT10LnRleHQoKSxzPS9bMC05XSssWzAtOV0rLy50ZXN0KGkpO2k9aS5yZXBsYWNlKC8sL2csXCJcIik7dmFyIG89L15bMC05XSskLy50ZXN0KGkpLHU9L15bMC05XStcXC5bMC05XSskLy50ZXN0KGkpLGE9dT8oaS5zcGxpdChcIi5cIilbMV18fFtdKS5sZW5ndGg6MDtmb3IodmFyIGY9bjtmPj0xO2YtLSl7dmFyIGw9cGFyc2VJbnQoaS9uKmYpO3UmJihsPXBhcnNlRmxvYXQoaS9uKmYpLnRvRml4ZWQoYSkpO2lmKHMpd2hpbGUoLyhcXGQrKShcXGR7M30pLy50ZXN0KGwudG9TdHJpbmcoKSkpbD1sLnRvU3RyaW5nKCkucmVwbGFjZSgvKFxcZCspKFxcZHszfSkvLFwiJDEsJDJcIik7ZS51bnNoaWZ0KGwpfXQuZGF0YShcImNvdW50ZXJ1cC1udW1zXCIsZSk7dC50ZXh0KFwiMFwiKTt2YXIgYz1mdW5jdGlvbigpe3QudGV4dCh0LmRhdGEoXCJjb3VudGVydXAtbnVtc1wiKS5zaGlmdCgpKTtpZih0LmRhdGEoXCJjb3VudGVydXAtbnVtc1wiKS5sZW5ndGgpc2V0VGltZW91dCh0LmRhdGEoXCJjb3VudGVydXAtZnVuY1wiKSxyLmRlbGF5KTtlbHNle2RlbGV0ZSB0LmRhdGEoXCJjb3VudGVydXAtbnVtc1wiKTt0LmRhdGEoXCJjb3VudGVydXAtbnVtc1wiLG51bGwpO3QuZGF0YShcImNvdW50ZXJ1cC1mdW5jXCIsbnVsbCl9fTt0LmRhdGEoXCJjb3VudGVydXAtZnVuY1wiLGMpO3NldFRpbWVvdXQodC5kYXRhKFwiY291bnRlcnVwLWZ1bmNcIiksci5kZWxheSl9O3Qud2F5cG9pbnQoaSx7b2Zmc2V0OlwiMTAwJVwiLHRyaWdnZXJPbmNlOiEwfSl9KX19KShqUXVlcnkpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS42LjJcclxuLypcclxualF1ZXJ5IFdheXBvaW50cyAtIHYyLjAuM1xyXG5Db3B5cmlnaHQgKGMpIDIwMTEtMjAxMyBDYWxlYiBUcm91Z2h0b25cclxuRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgYW5kIEdQTCBsaWNlbnNlLlxyXG5odHRwczovL2dpdGh1Yi5jb20vaW1ha2V3ZWJ0aGluZ3MvanF1ZXJ5LXdheXBvaW50cy9ibG9iL21hc3Rlci9saWNlbnNlcy50eHRcclxuKi9cclxuKGZ1bmN0aW9uKCl7dmFyIHQ9W10uaW5kZXhPZnx8ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTAsbj10aGlzLmxlbmd0aDtlPG47ZSsrKXtpZihlIGluIHRoaXMmJnRoaXNbZV09PT10KXJldHVybiBlfXJldHVybi0xfSxlPVtdLnNsaWNlOyhmdW5jdGlvbih0LGUpe2lmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe3JldHVybiBkZWZpbmUoXCJ3YXlwb2ludHNcIixbXCJqcXVlcnlcIl0sZnVuY3Rpb24obil7cmV0dXJuIGUobix0KX0pfWVsc2V7cmV0dXJuIGUodC5qUXVlcnksdCl9fSkodGhpcyxmdW5jdGlvbihuLHIpe3ZhciBpLG8sbCxzLGYsdSxhLGMsaCxkLHAseSx2LHcsZyxtO2k9bihyKTtjPXQuY2FsbChyLFwib250b3VjaHN0YXJ0XCIpPj0wO3M9e2hvcml6b250YWw6e30sdmVydGljYWw6e319O2Y9MTthPXt9O3U9XCJ3YXlwb2ludHMtY29udGV4dC1pZFwiO3A9XCJyZXNpemUud2F5cG9pbnRzXCI7eT1cInNjcm9sbC53YXlwb2ludHNcIjt2PTE7dz1cIndheXBvaW50cy13YXlwb2ludC1pZHNcIjtnPVwid2F5cG9pbnRcIjttPVwid2F5cG9pbnRzXCI7bz1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCl7dmFyIGU9dGhpczt0aGlzLiRlbGVtZW50PXQ7dGhpcy5lbGVtZW50PXRbMF07dGhpcy5kaWRSZXNpemU9ZmFsc2U7dGhpcy5kaWRTY3JvbGw9ZmFsc2U7dGhpcy5pZD1cImNvbnRleHRcIitmKys7dGhpcy5vbGRTY3JvbGw9e3g6dC5zY3JvbGxMZWZ0KCkseTp0LnNjcm9sbFRvcCgpfTt0aGlzLndheXBvaW50cz17aG9yaXpvbnRhbDp7fSx2ZXJ0aWNhbDp7fX07dC5kYXRhKHUsdGhpcy5pZCk7YVt0aGlzLmlkXT10aGlzO3QuYmluZCh5LGZ1bmN0aW9uKCl7dmFyIHQ7aWYoIShlLmRpZFNjcm9sbHx8Yykpe2UuZGlkU2Nyb2xsPXRydWU7dD1mdW5jdGlvbigpe2UuZG9TY3JvbGwoKTtyZXR1cm4gZS5kaWRTY3JvbGw9ZmFsc2V9O3JldHVybiByLnNldFRpbWVvdXQodCxuW21dLnNldHRpbmdzLnNjcm9sbFRocm90dGxlKX19KTt0LmJpbmQocCxmdW5jdGlvbigpe3ZhciB0O2lmKCFlLmRpZFJlc2l6ZSl7ZS5kaWRSZXNpemU9dHJ1ZTt0PWZ1bmN0aW9uKCl7blttXShcInJlZnJlc2hcIik7cmV0dXJuIGUuZGlkUmVzaXplPWZhbHNlfTtyZXR1cm4gci5zZXRUaW1lb3V0KHQsblttXS5zZXR0aW5ncy5yZXNpemVUaHJvdHRsZSl9fSl9dC5wcm90b3R5cGUuZG9TY3JvbGw9ZnVuY3Rpb24oKXt2YXIgdCxlPXRoaXM7dD17aG9yaXpvbnRhbDp7bmV3U2Nyb2xsOnRoaXMuJGVsZW1lbnQuc2Nyb2xsTGVmdCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC54LGZvcndhcmQ6XCJyaWdodFwiLGJhY2t3YXJkOlwibGVmdFwifSx2ZXJ0aWNhbDp7bmV3U2Nyb2xsOnRoaXMuJGVsZW1lbnQuc2Nyb2xsVG9wKCksb2xkU2Nyb2xsOnRoaXMub2xkU2Nyb2xsLnksZm9yd2FyZDpcImRvd25cIixiYWNrd2FyZDpcInVwXCJ9fTtpZihjJiYoIXQudmVydGljYWwub2xkU2Nyb2xsfHwhdC52ZXJ0aWNhbC5uZXdTY3JvbGwpKXtuW21dKFwicmVmcmVzaFwiKX1uLmVhY2godCxmdW5jdGlvbih0LHIpe3ZhciBpLG8sbDtsPVtdO289ci5uZXdTY3JvbGw+ci5vbGRTY3JvbGw7aT1vP3IuZm9yd2FyZDpyLmJhY2t3YXJkO24uZWFjaChlLndheXBvaW50c1t0XSxmdW5jdGlvbih0LGUpe3ZhciBuLGk7aWYoci5vbGRTY3JvbGw8KG49ZS5vZmZzZXQpJiZuPD1yLm5ld1Njcm9sbCl7cmV0dXJuIGwucHVzaChlKX1lbHNlIGlmKHIubmV3U2Nyb2xsPChpPWUub2Zmc2V0KSYmaTw9ci5vbGRTY3JvbGwpe3JldHVybiBsLnB1c2goZSl9fSk7bC5zb3J0KGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQub2Zmc2V0LWUub2Zmc2V0fSk7aWYoIW8pe2wucmV2ZXJzZSgpfXJldHVybiBuLmVhY2gobCxmdW5jdGlvbih0LGUpe2lmKGUub3B0aW9ucy5jb250aW51b3VzfHx0PT09bC5sZW5ndGgtMSl7cmV0dXJuIGUudHJpZ2dlcihbaV0pfX0pfSk7cmV0dXJuIHRoaXMub2xkU2Nyb2xsPXt4OnQuaG9yaXpvbnRhbC5uZXdTY3JvbGwseTp0LnZlcnRpY2FsLm5ld1Njcm9sbH19O3QucHJvdG90eXBlLnJlZnJlc2g9ZnVuY3Rpb24oKXt2YXIgdCxlLHIsaT10aGlzO3I9bi5pc1dpbmRvdyh0aGlzLmVsZW1lbnQpO2U9dGhpcy4kZWxlbWVudC5vZmZzZXQoKTt0aGlzLmRvU2Nyb2xsKCk7dD17aG9yaXpvbnRhbDp7Y29udGV4dE9mZnNldDpyPzA6ZS5sZWZ0LGNvbnRleHRTY3JvbGw6cj8wOnRoaXMub2xkU2Nyb2xsLngsY29udGV4dERpbWVuc2lvbjp0aGlzLiRlbGVtZW50LndpZHRoKCksb2xkU2Nyb2xsOnRoaXMub2xkU2Nyb2xsLngsZm9yd2FyZDpcInJpZ2h0XCIsYmFja3dhcmQ6XCJsZWZ0XCIsb2Zmc2V0UHJvcDpcImxlZnRcIn0sdmVydGljYWw6e2NvbnRleHRPZmZzZXQ6cj8wOmUudG9wLGNvbnRleHRTY3JvbGw6cj8wOnRoaXMub2xkU2Nyb2xsLnksY29udGV4dERpbWVuc2lvbjpyP25bbV0oXCJ2aWV3cG9ydEhlaWdodFwiKTp0aGlzLiRlbGVtZW50LmhlaWdodCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC55LGZvcndhcmQ6XCJkb3duXCIsYmFja3dhcmQ6XCJ1cFwiLG9mZnNldFByb3A6XCJ0b3BcIn19O3JldHVybiBuLmVhY2godCxmdW5jdGlvbih0LGUpe3JldHVybiBuLmVhY2goaS53YXlwb2ludHNbdF0sZnVuY3Rpb24odCxyKXt2YXIgaSxvLGwscyxmO2k9ci5vcHRpb25zLm9mZnNldDtsPXIub2Zmc2V0O289bi5pc1dpbmRvdyhyLmVsZW1lbnQpPzA6ci4kZWxlbWVudC5vZmZzZXQoKVtlLm9mZnNldFByb3BdO2lmKG4uaXNGdW5jdGlvbihpKSl7aT1pLmFwcGx5KHIuZWxlbWVudCl9ZWxzZSBpZih0eXBlb2YgaT09PVwic3RyaW5nXCIpe2k9cGFyc2VGbG9hdChpKTtpZihyLm9wdGlvbnMub2Zmc2V0LmluZGV4T2YoXCIlXCIpPi0xKXtpPU1hdGguY2VpbChlLmNvbnRleHREaW1lbnNpb24qaS8xMDApfX1yLm9mZnNldD1vLWUuY29udGV4dE9mZnNldCtlLmNvbnRleHRTY3JvbGwtaTtpZihyLm9wdGlvbnMub25seU9uU2Nyb2xsJiZsIT1udWxsfHwhci5lbmFibGVkKXtyZXR1cm59aWYobCE9PW51bGwmJmw8KHM9ZS5vbGRTY3JvbGwpJiZzPD1yLm9mZnNldCl7cmV0dXJuIHIudHJpZ2dlcihbZS5iYWNrd2FyZF0pfWVsc2UgaWYobCE9PW51bGwmJmw+KGY9ZS5vbGRTY3JvbGwpJiZmPj1yLm9mZnNldCl7cmV0dXJuIHIudHJpZ2dlcihbZS5mb3J3YXJkXSl9ZWxzZSBpZihsPT09bnVsbCYmZS5vbGRTY3JvbGw+PXIub2Zmc2V0KXtyZXR1cm4gci50cmlnZ2VyKFtlLmZvcndhcmRdKX19KX0pfTt0LnByb3RvdHlwZS5jaGVja0VtcHR5PWZ1bmN0aW9uKCl7aWYobi5pc0VtcHR5T2JqZWN0KHRoaXMud2F5cG9pbnRzLmhvcml6b250YWwpJiZuLmlzRW1wdHlPYmplY3QodGhpcy53YXlwb2ludHMudmVydGljYWwpKXt0aGlzLiRlbGVtZW50LnVuYmluZChbcCx5XS5qb2luKFwiIFwiKSk7cmV0dXJuIGRlbGV0ZSBhW3RoaXMuaWRdfX07cmV0dXJuIHR9KCk7bD1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxlLHIpe3ZhciBpLG87cj1uLmV4dGVuZCh7fSxuLmZuW2ddLmRlZmF1bHRzLHIpO2lmKHIub2Zmc2V0PT09XCJib3R0b20taW4tdmlld1wiKXtyLm9mZnNldD1mdW5jdGlvbigpe3ZhciB0O3Q9blttXShcInZpZXdwb3J0SGVpZ2h0XCIpO2lmKCFuLmlzV2luZG93KGUuZWxlbWVudCkpe3Q9ZS4kZWxlbWVudC5oZWlnaHQoKX1yZXR1cm4gdC1uKHRoaXMpLm91dGVySGVpZ2h0KCl9fXRoaXMuJGVsZW1lbnQ9dDt0aGlzLmVsZW1lbnQ9dFswXTt0aGlzLmF4aXM9ci5ob3Jpem9udGFsP1wiaG9yaXpvbnRhbFwiOlwidmVydGljYWxcIjt0aGlzLmNhbGxiYWNrPXIuaGFuZGxlcjt0aGlzLmNvbnRleHQ9ZTt0aGlzLmVuYWJsZWQ9ci5lbmFibGVkO3RoaXMuaWQ9XCJ3YXlwb2ludHNcIit2Kys7dGhpcy5vZmZzZXQ9bnVsbDt0aGlzLm9wdGlvbnM9cjtlLndheXBvaW50c1t0aGlzLmF4aXNdW3RoaXMuaWRdPXRoaXM7c1t0aGlzLmF4aXNdW3RoaXMuaWRdPXRoaXM7aT0obz10LmRhdGEodykpIT1udWxsP286W107aS5wdXNoKHRoaXMuaWQpO3QuZGF0YSh3LGkpfXQucHJvdG90eXBlLnRyaWdnZXI9ZnVuY3Rpb24odCl7aWYoIXRoaXMuZW5hYmxlZCl7cmV0dXJufWlmKHRoaXMuY2FsbGJhY2shPW51bGwpe3RoaXMuY2FsbGJhY2suYXBwbHkodGhpcy5lbGVtZW50LHQpfWlmKHRoaXMub3B0aW9ucy50cmlnZ2VyT25jZSl7cmV0dXJuIHRoaXMuZGVzdHJveSgpfX07dC5wcm90b3R5cGUuZGlzYWJsZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVuYWJsZWQ9ZmFsc2V9O3QucHJvdG90eXBlLmVuYWJsZT1mdW5jdGlvbigpe3RoaXMuY29udGV4dC5yZWZyZXNoKCk7cmV0dXJuIHRoaXMuZW5hYmxlZD10cnVlfTt0LnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7ZGVsZXRlIHNbdGhpcy5heGlzXVt0aGlzLmlkXTtkZWxldGUgdGhpcy5jb250ZXh0LndheXBvaW50c1t0aGlzLmF4aXNdW3RoaXMuaWRdO3JldHVybiB0aGlzLmNvbnRleHQuY2hlY2tFbXB0eSgpfTt0LmdldFdheXBvaW50c0J5RWxlbWVudD1mdW5jdGlvbih0KXt2YXIgZSxyO3I9bih0KS5kYXRhKHcpO2lmKCFyKXtyZXR1cm5bXX1lPW4uZXh0ZW5kKHt9LHMuaG9yaXpvbnRhbCxzLnZlcnRpY2FsKTtyZXR1cm4gbi5tYXAocixmdW5jdGlvbih0KXtyZXR1cm4gZVt0XX0pfTtyZXR1cm4gdH0oKTtkPXtpbml0OmZ1bmN0aW9uKHQsZSl7dmFyIHI7aWYoZT09bnVsbCl7ZT17fX1pZigocj1lLmhhbmRsZXIpPT1udWxsKXtlLmhhbmRsZXI9dH10aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgdCxyLGksczt0PW4odGhpcyk7aT0ocz1lLmNvbnRleHQpIT1udWxsP3M6bi5mbltnXS5kZWZhdWx0cy5jb250ZXh0O2lmKCFuLmlzV2luZG93KGkpKXtpPXQuY2xvc2VzdChpKX1pPW4oaSk7cj1hW2kuZGF0YSh1KV07aWYoIXIpe3I9bmV3IG8oaSl9cmV0dXJuIG5ldyBsKHQscixlKX0pO25bbV0oXCJyZWZyZXNoXCIpO3JldHVybiB0aGlzfSxkaXNhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGQuX2ludm9rZSh0aGlzLFwiZGlzYWJsZVwiKX0sZW5hYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGQuX2ludm9rZSh0aGlzLFwiZW5hYmxlXCIpfSxkZXN0cm95OmZ1bmN0aW9uKCl7cmV0dXJuIGQuX2ludm9rZSh0aGlzLFwiZGVzdHJveVwiKX0scHJldjpmdW5jdGlvbih0LGUpe3JldHVybiBkLl90cmF2ZXJzZS5jYWxsKHRoaXMsdCxlLGZ1bmN0aW9uKHQsZSxuKXtpZihlPjApe3JldHVybiB0LnB1c2gobltlLTFdKX19KX0sbmV4dDpmdW5jdGlvbih0LGUpe3JldHVybiBkLl90cmF2ZXJzZS5jYWxsKHRoaXMsdCxlLGZ1bmN0aW9uKHQsZSxuKXtpZihlPG4ubGVuZ3RoLTEpe3JldHVybiB0LnB1c2gobltlKzFdKX19KX0sX3RyYXZlcnNlOmZ1bmN0aW9uKHQsZSxpKXt2YXIgbyxsO2lmKHQ9PW51bGwpe3Q9XCJ2ZXJ0aWNhbFwifWlmKGU9PW51bGwpe2U9cn1sPWguYWdncmVnYXRlKGUpO289W107dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU7ZT1uLmluQXJyYXkodGhpcyxsW3RdKTtyZXR1cm4gaShvLGUsbFt0XSl9KTtyZXR1cm4gdGhpcy5wdXNoU3RhY2sobyl9LF9pbnZva2U6ZnVuY3Rpb24odCxlKXt0LmVhY2goZnVuY3Rpb24oKXt2YXIgdDt0PWwuZ2V0V2F5cG9pbnRzQnlFbGVtZW50KHRoaXMpO3JldHVybiBuLmVhY2godCxmdW5jdGlvbih0LG4pe25bZV0oKTtyZXR1cm4gdHJ1ZX0pfSk7cmV0dXJuIHRoaXN9fTtuLmZuW2ddPWZ1bmN0aW9uKCl7dmFyIHQscjtyPWFyZ3VtZW50c1swXSx0PTI8PWFyZ3VtZW50cy5sZW5ndGg/ZS5jYWxsKGFyZ3VtZW50cywxKTpbXTtpZihkW3JdKXtyZXR1cm4gZFtyXS5hcHBseSh0aGlzLHQpfWVsc2UgaWYobi5pc0Z1bmN0aW9uKHIpKXtyZXR1cm4gZC5pbml0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX1lbHNlIGlmKG4uaXNQbGFpbk9iamVjdChyKSl7cmV0dXJuIGQuaW5pdC5hcHBseSh0aGlzLFtudWxsLHJdKX1lbHNlIGlmKCFyKXtyZXR1cm4gbi5lcnJvcihcImpRdWVyeSBXYXlwb2ludHMgbmVlZHMgYSBjYWxsYmFjayBmdW5jdGlvbiBvciBoYW5kbGVyIG9wdGlvbi5cIil9ZWxzZXtyZXR1cm4gbi5lcnJvcihcIlRoZSBcIityK1wiIG1ldGhvZCBkb2VzIG5vdCBleGlzdCBpbiBqUXVlcnkgV2F5cG9pbnRzLlwiKX19O24uZm5bZ10uZGVmYXVsdHM9e2NvbnRleHQ6cixjb250aW51b3VzOnRydWUsZW5hYmxlZDp0cnVlLGhvcml6b250YWw6ZmFsc2Usb2Zmc2V0OjAsdHJpZ2dlck9uY2U6ZmFsc2V9O2g9e3JlZnJlc2g6ZnVuY3Rpb24oKXtyZXR1cm4gbi5lYWNoKGEsZnVuY3Rpb24odCxlKXtyZXR1cm4gZS5yZWZyZXNoKCl9KX0sdmlld3BvcnRIZWlnaHQ6ZnVuY3Rpb24oKXt2YXIgdDtyZXR1cm4odD1yLmlubmVySGVpZ2h0KSE9bnVsbD90OmkuaGVpZ2h0KCl9LGFnZ3JlZ2F0ZTpmdW5jdGlvbih0KXt2YXIgZSxyLGk7ZT1zO2lmKHQpe2U9KGk9YVtuKHQpLmRhdGEodSldKSE9bnVsbD9pLndheXBvaW50czp2b2lkIDB9aWYoIWUpe3JldHVybltdfXI9e2hvcml6b250YWw6W10sdmVydGljYWw6W119O24uZWFjaChyLGZ1bmN0aW9uKHQsaSl7bi5lYWNoKGVbdF0sZnVuY3Rpb24odCxlKXtyZXR1cm4gaS5wdXNoKGUpfSk7aS5zb3J0KGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQub2Zmc2V0LWUub2Zmc2V0fSk7clt0XT1uLm1hcChpLGZ1bmN0aW9uKHQpe3JldHVybiB0LmVsZW1lbnR9KTtyZXR1cm4gclt0XT1uLnVuaXF1ZShyW3RdKX0pO3JldHVybiByfSxhYm92ZTpmdW5jdGlvbih0KXtpZih0PT1udWxsKXt0PXJ9cmV0dXJuIGguX2ZpbHRlcih0LFwidmVydGljYWxcIixmdW5jdGlvbih0LGUpe3JldHVybiBlLm9mZnNldDw9dC5vbGRTY3JvbGwueX0pfSxiZWxvdzpmdW5jdGlvbih0KXtpZih0PT1udWxsKXt0PXJ9cmV0dXJuIGguX2ZpbHRlcih0LFwidmVydGljYWxcIixmdW5jdGlvbih0LGUpe3JldHVybiBlLm9mZnNldD50Lm9sZFNjcm9sbC55fSl9LGxlZnQ6ZnVuY3Rpb24odCl7aWYodD09bnVsbCl7dD1yfXJldHVybiBoLl9maWx0ZXIodCxcImhvcml6b250YWxcIixmdW5jdGlvbih0LGUpe3JldHVybiBlLm9mZnNldDw9dC5vbGRTY3JvbGwueH0pfSxyaWdodDpmdW5jdGlvbih0KXtpZih0PT1udWxsKXt0PXJ9cmV0dXJuIGguX2ZpbHRlcih0LFwiaG9yaXpvbnRhbFwiLGZ1bmN0aW9uKHQsZSl7cmV0dXJuIGUub2Zmc2V0PnQub2xkU2Nyb2xsLnh9KX0sZW5hYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGguX2ludm9rZShcImVuYWJsZVwiKX0sZGlzYWJsZTpmdW5jdGlvbigpe3JldHVybiBoLl9pbnZva2UoXCJkaXNhYmxlXCIpfSxkZXN0cm95OmZ1bmN0aW9uKCl7cmV0dXJuIGguX2ludm9rZShcImRlc3Ryb3lcIil9LGV4dGVuZEZuOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIGRbdF09ZX0sX2ludm9rZTpmdW5jdGlvbih0KXt2YXIgZTtlPW4uZXh0ZW5kKHt9LHMudmVydGljYWwscy5ob3Jpem9udGFsKTtyZXR1cm4gbi5lYWNoKGUsZnVuY3Rpb24oZSxuKXtuW3RdKCk7cmV0dXJuIHRydWV9KX0sX2ZpbHRlcjpmdW5jdGlvbih0LGUscil7dmFyIGksbztpPWFbbih0KS5kYXRhKHUpXTtpZighaSl7cmV0dXJuW119bz1bXTtuLmVhY2goaS53YXlwb2ludHNbZV0sZnVuY3Rpb24odCxlKXtpZihyKGksZSkpe3JldHVybiBvLnB1c2goZSl9fSk7by5zb3J0KGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQub2Zmc2V0LWUub2Zmc2V0fSk7cmV0dXJuIG4ubWFwKG8sZnVuY3Rpb24odCl7cmV0dXJuIHQuZWxlbWVudH0pfX07blttXT1mdW5jdGlvbigpe3ZhciB0LG47bj1hcmd1bWVudHNbMF0sdD0yPD1hcmd1bWVudHMubGVuZ3RoP2UuY2FsbChhcmd1bWVudHMsMSk6W107aWYoaFtuXSl7cmV0dXJuIGhbbl0uYXBwbHkobnVsbCx0KX1lbHNle3JldHVybiBoLmFnZ3JlZ2F0ZS5jYWxsKG51bGwsbil9fTtuW21dLnNldHRpbmdzPXtyZXNpemVUaHJvdHRsZToxMDAsc2Nyb2xsVGhyb3R0bGU6MzB9O3JldHVybiBpLmxvYWQoZnVuY3Rpb24oKXtyZXR1cm4gblttXShcInJlZnJlc2hcIil9KX0pfSkuY2FsbCh0aGlzKTtcclxuXHJcblxyXG5cclxuLypcclxuICAgICAgICAgICAgICAgICAgICAgICBfIF8gX19fX18gICAgICAgICAgICAgICAgICAgICAgXyAgIF9cclxuICAgICAgICAgICAgICAgICAgICAgIHwgfCB8ICBfXyBcXCAgICAgICAgICAgICAgICAgICAgfCB8IChfKVxyXG4gICAgX19fICBfX18gXyBfXyBfX18gfCB8IHwgfF9fKSB8X19fX18gICBfX19fXyAgX18gX3wgfCAgXyBfX19cclxuICAgLyBfX3wvIF9ffCAnX18vIF8gXFx8IHwgfCAgXyAgLy8gXyBcXCBcXCAvIC8gXyBcXC8gX2AgfCB8IHwgLyBfX3xcclxuICAgXFxfXyBcXCAoX198IHwgfCAoXykgfCB8IHwgfCBcXCBcXCAgX18vXFwgViAvICBfXy8gKF98IHwgfF98IFxcX18gXFxcclxuICAgfF9fXy9cXF9fX3xffCAgXFxfX18vfF98X3xffCAgXFxfXFxfX198IFxcXy8gXFxfX198XFxfXyxffF8oXykgfF9fXy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLyB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8X18vXHJcblxyXG4gICAgXCJEZWNsYXJhdGl2ZSBvbi1zY3JvbGwgcmV2ZWFsIGFuaW1hdGlvbnMuXCJcclxuXHJcbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBzY3JvbGxSZXZlYWwuanMgaXMgaW5zcGlyZWQgYnkgY2JwU2Nyb2xsZXIuanMsIMKpIDIwMTQsIENvZHJvcHMuXHJcblxyXG4gICAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4gICAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHJcbiAgICBzY3JvbGxSZXZlYWwuanMsIMKpIDIwMTQgaHR0cHM6Ly90d2l0dGVyLmNvbS9qdWxpYW5sbG95ZFxyXG5cclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cclxuOyhmdW5jdGlvbih3aW5kb3cpeyd1c2Ugc3RyaWN0Jzt2YXIgZG9jRWxlbT13aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O2Z1bmN0aW9uIGdldFZpZXdwb3J0SCgpe3ZhciBjbGllbnQ9ZG9jRWxlbVsnY2xpZW50SGVpZ2h0J10saW5uZXI9d2luZG93Wydpbm5lckhlaWdodCddO3JldHVybihjbGllbnQ8aW5uZXIpP2lubmVyOmNsaWVudH1mdW5jdGlvbiBnZXRPZmZzZXQoZWwpe3ZhciBvZmZzZXRUb3A9MCxvZmZzZXRMZWZ0PTA7ZG97aWYoIWlzTmFOKGVsLm9mZnNldFRvcCkpe29mZnNldFRvcCs9ZWwub2Zmc2V0VG9wfWlmKCFpc05hTihlbC5vZmZzZXRMZWZ0KSl7b2Zmc2V0TGVmdCs9ZWwub2Zmc2V0TGVmdH19d2hpbGUoZWw9ZWwub2Zmc2V0UGFyZW50KXJldHVybnt0b3A6b2Zmc2V0VG9wLGxlZnQ6b2Zmc2V0TGVmdH19ZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydChlbCxoKXt2YXIgc2Nyb2xsZWQ9d2luZG93LnBhZ2VZT2Zmc2V0LHZpZXdlZD1zY3JvbGxlZCtnZXRWaWV3cG9ydEgoKSxlbEg9ZWwub2Zmc2V0SGVpZ2h0LGVsVG9wPWdldE9mZnNldChlbCkudG9wLGVsQm90dG9tPWVsVG9wK2VsSCxoPWh8fDA7cmV0dXJuKGVsVG9wK2VsSCpoKTw9dmlld2VkJiYoZWxCb3R0b20pPj1zY3JvbGxlZH1mdW5jdGlvbiBleHRlbmQoYSxiKXtmb3IodmFyIGtleSBpbiBiKXtpZihiLmhhc093blByb3BlcnR5KGtleSkpe2Fba2V5XT1iW2tleV19fXJldHVybiBhfWZ1bmN0aW9uIHNjcm9sbFJldmVhbChvcHRpb25zKXt0aGlzLm9wdGlvbnM9ZXh0ZW5kKHRoaXMuZGVmYXVsdHMsb3B0aW9ucyk7dGhpcy5faW5pdCgpfXNjcm9sbFJldmVhbC5wcm90b3R5cGU9e2RlZmF1bHRzOntheGlzOid5JyxkaXN0YW5jZTonMjVweCcsZHVyYXRpb246JzAuNjZzJyxkZWxheTonMHMnLHZpZXdwb3J0RmFjdG9yOjAuMzN9LF9pbml0OmZ1bmN0aW9uKCl7dmFyIHNlbGY9dGhpczt0aGlzLmVsZW1zPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY0VsZW0ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2Nyb2xsUmV2ZWFsXScpKTt0aGlzLnNjcm9sbGVkPWZhbHNlO3RoaXMuZWxlbXMuZm9yRWFjaChmdW5jdGlvbihlbCxpKXtzZWxmLmFuaW1hdGUoZWwpfSk7dmFyIHNjcm9sbEhhbmRsZXI9ZnVuY3Rpb24oKXtpZighc2VsZi5zY3JvbGxlZCl7c2VsZi5zY3JvbGxlZD10cnVlO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLl9zY3JvbGxQYWdlKCl9LDYwKX19O3ZhciByZXNpemVIYW5kbGVyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZGVsYXllZCgpe3NlbGYuX3Njcm9sbFBhZ2UoKTtzZWxmLnJlc2l6ZVRpbWVvdXQ9bnVsbH1pZihzZWxmLnJlc2l6ZVRpbWVvdXQpe2NsZWFyVGltZW91dChzZWxmLnJlc2l6ZVRpbWVvdXQpfXNlbGYucmVzaXplVGltZW91dD1zZXRUaW1lb3V0KGRlbGF5ZWQsMjAwKX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsc2Nyb2xsSGFuZGxlcixmYWxzZSk7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScscmVzaXplSGFuZGxlcixmYWxzZSl9LF9zY3JvbGxQYWdlOmZ1bmN0aW9uKCl7dmFyIHNlbGY9dGhpczt0aGlzLmVsZW1zLmZvckVhY2goZnVuY3Rpb24oZWwsaSl7aWYoaXNFbGVtZW50SW5WaWV3cG9ydChlbCxzZWxmLm9wdGlvbnMudmlld3BvcnRGYWN0b3IpKXtzZWxmLmFuaW1hdGUoZWwpfX0pO3RoaXMuc2Nyb2xsZWQ9ZmFsc2V9LHBhcnNlTGFuZ3VhZ2U6ZnVuY3Rpb24oZWwpe3ZhciB3b3Jkcz1lbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xscmV2ZWFsJykuc3BsaXQoL1ssIF0rLyksZW50ZXJGcm9tLHBhcnNlZD17fTtmdW5jdGlvbiBmaWx0ZXIod29yZHMpe3ZhciByZXQ9W10sYmxhY2tsaXN0PVtcImZyb21cIixcInRoZVwiLFwiYW5kXCIsXCJ0aGVuXCIsXCJidXRcIl07d29yZHMuZm9yRWFjaChmdW5jdGlvbih3b3JkLGkpe2lmKGJsYWNrbGlzdC5pbmRleE9mKHdvcmQpPi0xKXtyZXR1cm59cmV0LnB1c2god29yZCl9KTtyZXR1cm4gcmV0fXdvcmRzPWZpbHRlcih3b3Jkcyk7d29yZHMuZm9yRWFjaChmdW5jdGlvbih3b3JkLGkpe3N3aXRjaCh3b3JkKXtjYXNlXCJlbnRlclwiOmVudGVyRnJvbT13b3Jkc1tpKzFdO2lmKGVudGVyRnJvbT09XCJ0b3BcInx8ZW50ZXJGcm9tPT1cImJvdHRvbVwiKXtwYXJzZWQuYXhpcz1cInlcIn1pZihlbnRlckZyb209PVwibGVmdFwifHxlbnRlckZyb209PVwicmlnaHRcIil7cGFyc2VkLmF4aXM9XCJ4XCJ9cmV0dXJuO2Nhc2VcImFmdGVyXCI6cGFyc2VkLmRlbGF5PXdvcmRzW2krMV07cmV0dXJuO2Nhc2VcIndhaXRcIjpwYXJzZWQuZGVsYXk9d29yZHNbaSsxXTtyZXR1cm47Y2FzZVwibW92ZVwiOnBhcnNlZC5kaXN0YW5jZT13b3Jkc1tpKzFdO3JldHVybjtjYXNlXCJvdmVyXCI6cGFyc2VkLmR1cmF0aW9uPXdvcmRzW2krMV07cmV0dXJuO2Nhc2VcInRyaWdnZXJcIjpwYXJzZWQuZXZlbnROYW1lPXdvcmRzW2krMV07cmV0dXJuO2RlZmF1bHQ6cmV0dXJufX0pO2lmKGVudGVyRnJvbT09XCJ0b3BcInx8ZW50ZXJGcm9tPT1cImxlZnRcIil7aWYoIXR5cGVvZiBwYXJzZWQuZGlzdGFuY2U9PVwidW5kZWZpbmVkXCIpe3BhcnNlZC5kaXN0YW5jZT1cIi1cIitwYXJzZWQuZGlzdGFuY2V9ZWxzZXtwYXJzZWQuZGlzdGFuY2U9XCItXCIrdGhpcy5vcHRpb25zLmRpc3RhbmNlfX1yZXR1cm4gcGFyc2VkfSxnZW5DU1M6ZnVuY3Rpb24oZWwsYXhpcyl7dmFyIHBhcnNlZD10aGlzLnBhcnNlTGFuZ3VhZ2UoZWwpO3ZhciBkaXN0PXBhcnNlZC5kaXN0YW5jZXx8dGhpcy5vcHRpb25zLmRpc3RhbmNlLGR1cj1wYXJzZWQuZHVyYXRpb258fHRoaXMub3B0aW9ucy5kdXJhdGlvbixkZWxheT1wYXJzZWQuZGVsYXl8fHRoaXMub3B0aW9ucy5kZWxheSxheGlzPXBhcnNlZC5heGlzfHx0aGlzLm9wdGlvbnMuYXhpczt2YXIgdHJhbnNpdGlvbj1cIi13ZWJraXQtdHJhbnNpdGlvbjogYWxsIFwiK2R1citcIiBlYXNlIFwiK2RlbGF5K1wiO1wiK1wiLW1vei10cmFuc2l0aW9uOiBhbGwgXCIrZHVyK1wiIGVhc2UgXCIrZGVsYXkrXCI7XCIrXCItby10cmFuc2l0aW9uOiBhbGwgXCIrZHVyK1wiIGVhc2UgXCIrZGVsYXkrXCI7XCIrXCJ0cmFuc2l0aW9uOiBhbGwgXCIrZHVyK1wiIGVhc2UgXCIrZGVsYXkrXCI7XCI7dmFyIGluaXRpYWw9XCItd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlXCIrYXhpcytcIihcIitkaXN0K1wiKTtcIitcIi1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVcIitheGlzK1wiKFwiK2Rpc3QrXCIpO1wiK1widHJhbnNmb3JtOiB0cmFuc2xhdGVcIitheGlzK1wiKFwiK2Rpc3QrXCIpO1wiK1wib3BhY2l0eTogMDtcIjt2YXIgdGFyZ2V0PVwiLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVwiK2F4aXMrXCIoMCk7XCIrXCItbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlXCIrYXhpcytcIigwKTtcIitcInRyYW5zZm9ybTogdHJhbnNsYXRlXCIrYXhpcytcIigwKTtcIitcIm9wYWNpdHk6IDE7XCI7cmV0dXJue3RyYW5zaXRpb246dHJhbnNpdGlvbixpbml0aWFsOmluaXRpYWwsdGFyZ2V0OnRhcmdldCx0b3RhbER1cmF0aW9uOigocGFyc2VGbG9hdChkdXIpK3BhcnNlRmxvYXQoZGVsYXkpKSoxMDAwKX19LGFuaW1hdGU6ZnVuY3Rpb24oZWwpe3ZhciBjc3M9dGhpcy5nZW5DU1MoZWwpO2lmKCFlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3ItaW5pdCcpKXtlbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJyxjc3MuaW5pdGlhbCk7ZWwuc2V0QXR0cmlidXRlKCdkYXRhLXNyLWluaXQnLHRydWUpfWlmKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zci1jb21wbGV0ZScpKXtyZXR1cm59aWYoaXNFbGVtZW50SW5WaWV3cG9ydChlbCx0aGlzLm9wdGlvbnMudmlld3BvcnRGYWN0b3IpKXtlbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJyxjc3MudGFyZ2V0K2Nzcy50cmFuc2l0aW9uKTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO2VsLnNldEF0dHJpYnV0ZSgnZGF0YS1zci1jb21wbGV0ZScsdHJ1ZSl9LGNzcy50b3RhbER1cmF0aW9uKX19fTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKGV2dCl7d2luZG93LnNjcm9sbFJldmVhbD1uZXcgc2Nyb2xsUmV2ZWFsKCl9KX0pKHdpbmRvdyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XHJcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbm9ueW1vdXMgbW9kdWxlLlxyXG4gICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAvLyBOb2RlL0NvbW1vbkpTLlxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gQnJvd3NlciBnbG9iYWxzLlxyXG4gICAgZmFjdG9yeShqUXVlcnkpO1xyXG4gIH1cclxufShmdW5jdGlvbiAoalF1ZXJ5KSB7XHJcblxyXG4gIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAvLyBnbG9iYWxzXHJcbiAgdmFyIGRvbWZvY3VzID0gZmFsc2UsXHJcbiAgICBtb3VzZWZvY3VzID0gZmFsc2UsXHJcbiAgICB0YWJpbmRleGNvdW50ZXIgPSAwLFxyXG4gICAgYXNjcmFpbGNvdW50ZXIgPSAyMDAwLFxyXG4gICAgZ2xvYmFsbWF4emluZGV4ID0gMDtcclxuXHJcbiAgdmFyICQgPSBqUXVlcnksICAgICAgIC8vIHNhbmRib3hcclxuICAgIF9kb2MgPSBkb2N1bWVudCxcclxuICAgIF93aW4gPSB3aW5kb3csXHJcbiAgICAkd2luZG93ID0gJChfd2luKTtcclxuXHJcbiAgdmFyIGRlbGVnYXRldmVudHMgPSBbXTtcclxuXHJcbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMTYxMTU5L2dldC1zY3JpcHQtcGF0aFxyXG4gIGZ1bmN0aW9uIGdldFNjcmlwdFBhdGgoKSB7XHJcbiAgICB2YXIgc2NyaXB0cyA9IF9kb2MuY3VycmVudFNjcmlwdCB8fCAoZnVuY3Rpb24gKCkgeyB2YXIgcyA9IF9kb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpOyByZXR1cm4gKHMubGVuZ3RoKSA/IHNbcy5sZW5ndGggLSAxXSA6IGZhbHNlOyB9KSgpO1xyXG4gICAgdmFyIHBhdGggPSBzY3JpcHRzID8gc2NyaXB0cy5zcmMuc3BsaXQoJz8nKVswXSA6ICcnO1xyXG4gICAgcmV0dXJuIChwYXRoLnNwbGl0KCcvJykubGVuZ3RoID4gMCkgPyBwYXRoLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmpvaW4oJy8nKSArICcvJyA6ICcnO1xyXG4gIH1cclxuXHJcbiAgLy8gYmFzZWQgb24gY29kZSBieSBQYXVsIElyaXNoIGh0dHBzOi8vd3d3LnBhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cclxuICB2YXIgc2V0QW5pbWF0aW9uRnJhbWUgPSBfd2luLnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBfd2luLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBfd2luLm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBmYWxzZTtcclxuICB2YXIgY2xlYXJBbmltYXRpb25GcmFtZSA9IF93aW4uY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgX3dpbi53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBfd2luLm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IGZhbHNlO1xyXG5cclxuICBpZiAoIXNldEFuaW1hdGlvbkZyYW1lKSB7XHJcbiAgICB2YXIgYW5pbGFzdHRpbWUgPSAwO1xyXG4gICAgc2V0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGVsZW1lbnQpIHtcclxuICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBhbmlsYXN0dGltZSkpO1xyXG4gICAgICB2YXIgaWQgPSBfd2luLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpOyB9LFxyXG4gICAgICAgIHRpbWVUb0NhbGwpO1xyXG4gICAgICBhbmlsYXN0dGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcclxuICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfTtcclxuICAgIGNsZWFyQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgX3dpbi5jbGVhclRpbWVvdXQoaWQpO1xyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKCFfd2luLmNhbmNlbEFuaW1hdGlvbkZyYW1lKSBjbGVhckFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGlkKSB7IH07XHJcbiAgfVxyXG5cclxuICB2YXIgQ2xzTXV0YXRpb25PYnNlcnZlciA9IF93aW4uTXV0YXRpb25PYnNlcnZlciB8fCBfd2luLldlYktpdE11dGF0aW9uT2JzZXJ2ZXIgfHwgZmFsc2U7XHJcblxyXG4gIHZhciBub3cgPSBEYXRlLm5vdyB8fCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgfTtcclxuXHJcbiAgdmFyIF9nbG9iYWxvcHRpb25zID0ge1xyXG4gICAgemluZGV4OiBcImF1dG9cIixcclxuICAgIGN1cnNvcm9wYWNpdHltaW46IDAsXHJcbiAgICBjdXJzb3JvcGFjaXR5bWF4OiAxLFxyXG4gICAgY3Vyc29yY29sb3I6IFwiIzQyNDI0MlwiLFxyXG4gICAgY3Vyc29yd2lkdGg6IFwiNnB4XCIsXHJcbiAgICBjdXJzb3Jib3JkZXI6IFwiMXB4IHNvbGlkICNmZmZcIixcclxuICAgIGN1cnNvcmJvcmRlcnJhZGl1czogXCI1cHhcIixcclxuICAgIHNjcm9sbHNwZWVkOiA0MCxcclxuICAgIG1vdXNlc2Nyb2xsc3RlcDogOSAqIDMsXHJcbiAgICB0b3VjaGJlaGF2aW9yOiBmYWxzZSwgICAvLyBkZXByZWNhdGVkXHJcbiAgICBlbXVsYXRldG91Y2g6IGZhbHNlLCAgICAvLyByZXBsYWNpbmcgdG91Y2hiZWhhdmlvclxyXG4gICAgaHdhY2NlbGVyYXRpb246IHRydWUsXHJcbiAgICB1c2V0cmFuc2l0aW9uOiB0cnVlLFxyXG4gICAgYm94em9vbTogZmFsc2UsXHJcbiAgICBkYmxjbGlja3pvb206IHRydWUsXHJcbiAgICBnZXN0dXJlem9vbTogdHJ1ZSxcclxuICAgIGdyYWJjdXJzb3JlbmFibGVkOiB0cnVlLFxyXG4gICAgYXV0b2hpZGVtb2RlOiB0cnVlLFxyXG4gICAgYmFja2dyb3VuZDogXCJcIixcclxuICAgIGlmcmFtZWF1dG9yZXNpemU6IHRydWUsXHJcbiAgICBjdXJzb3JtaW5oZWlnaHQ6IDMyLFxyXG4gICAgcHJlc2VydmVuYXRpdmVzY3JvbGxpbmc6IHRydWUsXHJcbiAgICByYWlsb2Zmc2V0OiBmYWxzZSxcclxuICAgIHJhaWxob2Zmc2V0OiBmYWxzZSxcclxuICAgIGJvdW5jZXNjcm9sbDogdHJ1ZSxcclxuICAgIHNwYWNlYmFyZW5hYmxlZDogdHJ1ZSxcclxuICAgIHJhaWxwYWRkaW5nOiB7XHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIGJvdHRvbTogMFxyXG4gICAgfSxcclxuICAgIGRpc2FibGVvdXRsaW5lOiB0cnVlLFxyXG4gICAgaG9yaXpyYWlsZW5hYmxlZDogdHJ1ZSxcclxuICAgIHJhaWxhbGlnbjogXCJyaWdodFwiLFxyXG4gICAgcmFpbHZhbGlnbjogXCJib3R0b21cIixcclxuICAgIGVuYWJsZXRyYW5zbGF0ZTNkOiB0cnVlLFxyXG4gICAgZW5hYmxlbW91c2V3aGVlbDogdHJ1ZSxcclxuICAgIGVuYWJsZWtleWJvYXJkOiB0cnVlLFxyXG4gICAgc21vb3Roc2Nyb2xsOiB0cnVlLFxyXG4gICAgc2Vuc2l0aXZlcmFpbDogdHJ1ZSxcclxuICAgIGVuYWJsZW1vdXNlbG9ja2FwaTogdHJ1ZSxcclxuICAgIC8vICAgICAgY3Vyc29ybWF4aGVpZ2h0OmZhbHNlLFxyXG4gICAgY3Vyc29yZml4ZWRoZWlnaHQ6IGZhbHNlLFxyXG4gICAgZGlyZWN0aW9ubG9ja2RlYWR6b25lOiA2LFxyXG4gICAgaGlkZWN1cnNvcmRlbGF5OiA0MDAsXHJcbiAgICBuYXRpdmVwYXJlbnRzY3JvbGxpbmc6IHRydWUsXHJcbiAgICBlbmFibGVzY3JvbGxvbnNlbGVjdGlvbjogdHJ1ZSxcclxuICAgIG92ZXJmbG93eDogdHJ1ZSxcclxuICAgIG92ZXJmbG93eTogdHJ1ZSxcclxuICAgIGN1cnNvcmRyYWdzcGVlZDogMC4zLFxyXG4gICAgcnRsbW9kZTogXCJhdXRvXCIsXHJcbiAgICBjdXJzb3JkcmFnb250b3VjaDogZmFsc2UsXHJcbiAgICBvbmVheGlzbW91c2Vtb2RlOiBcImF1dG9cIixcclxuICAgIHNjcmlwdHBhdGg6IGdldFNjcmlwdFBhdGgoKSxcclxuICAgIHByZXZlbnRtdWx0aXRvdWNoc2Nyb2xsaW5nOiB0cnVlLFxyXG4gICAgZGlzYWJsZW11dGF0aW9ub2JzZXJ2ZXI6IGZhbHNlLFxyXG4gICAgZW5hYmxlb2JzZXJ2ZXI6IHRydWUsXHJcbiAgICBzY3JvbGxiYXJpZDogZmFsc2VcclxuICB9O1xyXG5cclxuICB2YXIgYnJvd3NlcmRldGVjdGVkID0gZmFsc2U7XHJcblxyXG4gIHZhciBnZXRCcm93c2VyRGV0ZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGlmIChicm93c2VyZGV0ZWN0ZWQpIHJldHVybiBicm93c2VyZGV0ZWN0ZWQ7XHJcblxyXG4gICAgdmFyIF9lbCA9IF9kb2MuY3JlYXRlRWxlbWVudCgnRElWJyksXHJcbiAgICAgIF9zdHlsZSA9IF9lbC5zdHlsZSxcclxuICAgICAgX2FnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgX3BsYXRmb3JtID0gbmF2aWdhdG9yLnBsYXRmb3JtLFxyXG4gICAgICBkID0ge307XHJcblxyXG4gICAgZC5oYXNwb2ludGVybG9jayA9IFwicG9pbnRlckxvY2tFbGVtZW50XCIgaW4gX2RvYyB8fCBcIndlYmtpdFBvaW50ZXJMb2NrRWxlbWVudFwiIGluIF9kb2MgfHwgXCJtb3pQb2ludGVyTG9ja0VsZW1lbnRcIiBpbiBfZG9jO1xyXG5cclxuICAgIGQuaXNvcGVyYSA9IChcIm9wZXJhXCIgaW4gX3dpbik7IC8vIDEyLVxyXG4gICAgZC5pc29wZXJhMTIgPSAoZC5pc29wZXJhICYmIChcImdldFVzZXJNZWRpYVwiIGluIG5hdmlnYXRvcikpO1xyXG4gICAgZC5pc29wZXJhbWluaSA9IChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoX3dpbi5vcGVyYW1pbmkpID09PSBcIltvYmplY3QgT3BlcmFNaW5pXVwiKTtcclxuXHJcbiAgICBkLmlzaWUgPSAoKFwiYWxsXCIgaW4gX2RvYykgJiYgKFwiYXR0YWNoRXZlbnRcIiBpbiBfZWwpICYmICFkLmlzb3BlcmEpOyAvL0lFMTAtXHJcbiAgICBkLmlzaWVvbGQgPSAoZC5pc2llICYmICEoXCJtc0ludGVycG9sYXRpb25Nb2RlXCIgaW4gX3N0eWxlKSk7IC8vIElFNiBhbmQgb2xkZXJcclxuICAgIGQuaXNpZTcgPSBkLmlzaWUgJiYgIWQuaXNpZW9sZCAmJiAoIShcImRvY3VtZW50TW9kZVwiIGluIF9kb2MpIHx8IChfZG9jLmRvY3VtZW50TW9kZSA9PT0gNykpO1xyXG4gICAgZC5pc2llOCA9IGQuaXNpZSAmJiAoXCJkb2N1bWVudE1vZGVcIiBpbiBfZG9jKSAmJiAoX2RvYy5kb2N1bWVudE1vZGUgPT09IDgpO1xyXG4gICAgZC5pc2llOSA9IGQuaXNpZSAmJiAoXCJwZXJmb3JtYW5jZVwiIGluIF93aW4pICYmIChfZG9jLmRvY3VtZW50TW9kZSA9PT0gOSk7XHJcbiAgICBkLmlzaWUxMCA9IGQuaXNpZSAmJiAoXCJwZXJmb3JtYW5jZVwiIGluIF93aW4pICYmIChfZG9jLmRvY3VtZW50TW9kZSA9PT0gMTApO1xyXG4gICAgZC5pc2llMTEgPSAoXCJtc1JlcXVlc3RGdWxsc2NyZWVuXCIgaW4gX2VsKSAmJiAoX2RvYy5kb2N1bWVudE1vZGUgPj0gMTEpOyAvLyBJRTExK1xyXG5cclxuICAgIGQuaXNtc2VkZ2UgPSAoXCJtc0NyZWRlbnRpYWxzXCIgaW4gX3dpbik7ICAvLyBNUyBFZGdlIDE0K1xyXG5cclxuICAgIGQuaXNtb3ppbGxhID0gKFwiTW96QXBwZWFyYW5jZVwiIGluIF9zdHlsZSk7XHJcblxyXG4gICAgZC5pc3dlYmtpdCA9ICFkLmlzbXNlZGdlICYmIChcIldlYmtpdEFwcGVhcmFuY2VcIiBpbiBfc3R5bGUpO1xyXG5cclxuICAgIGQuaXNjaHJvbWUgPSBkLmlzd2Via2l0ICYmIChcImNocm9tZVwiIGluIF93aW4pO1xyXG4gICAgZC5pc2Nocm9tZTM4ID0gKGQuaXNjaHJvbWUgJiYgKFwidG91Y2hBY3Rpb25cIiBpbiBfc3R5bGUpKTsgLy8gYmVoYXZpb3IgY2hhbmdlZCBpbiB0b3VjaCBlbXVsYXRpb25cclxuICAgIGQuaXNjaHJvbWUyMiA9ICghZC5pc2Nocm9tZTM4KSAmJiAoZC5pc2Nocm9tZSAmJiBkLmhhc3BvaW50ZXJsb2NrKTtcclxuICAgIGQuaXNjaHJvbWUyNiA9ICghZC5pc2Nocm9tZTM4KSAmJiAoZC5pc2Nocm9tZSAmJiAoXCJ0cmFuc2l0aW9uXCIgaW4gX3N0eWxlKSk7IC8vIGlzc3VlIHdpdGggdHJhbnNmb3JtIGRldGVjdGlvbiAobWFpbnRhaW4gcHJlZml4KVxyXG5cclxuICAgIGQuY2FudG91Y2ggPSAoXCJvbnRvdWNoc3RhcnRcIiBpbiBfZG9jLmRvY3VtZW50RWxlbWVudCkgfHwgKFwib250b3VjaHN0YXJ0XCIgaW4gX3dpbik7IC8vIHdpdGggZGV0ZWN0aW9uIGZvciBDaHJvbWUgVG91Y2ggRW11bGF0aW9uXHJcbiAgICBkLmhhc3czY3RvdWNoID0gKF93aW4uUG9pbnRlckV2ZW50IHx8IGZhbHNlKSAmJiAoKG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDApIHx8IChuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyA+IDApKTsgLy9JRTExIHBvaW50ZXIgZXZlbnRzLCBmb2xsb3dpbmcgVzNDIFBvaW50ZXIgRXZlbnRzIHNwZWNcclxuICAgIGQuaGFzbXN0b3VjaCA9ICghZC5oYXN3M2N0b3VjaCkgJiYgKF93aW4uTVNQb2ludGVyRXZlbnQgfHwgZmFsc2UpOyAvLyBJRTEwIHBvaW50ZXIgZXZlbnRzXHJcblxyXG4gICAgZC5pc21hYyA9IC9ebWFjJC9pLnRlc3QoX3BsYXRmb3JtKTtcclxuXHJcbiAgICBkLmlzaW9zID0gZC5jYW50b3VjaCAmJiAvaXBob25lfGlwYWR8aXBvZC9pLnRlc3QoX3BsYXRmb3JtKTtcclxuICAgIGQuaXNpb3M0ID0gZC5pc2lvcyAmJiAhKFwic2VhbFwiIGluIE9iamVjdCk7XHJcbiAgICBkLmlzaW9zNyA9IGQuaXNpb3MgJiYgKFwid2Via2l0SGlkZGVuXCIgaW4gX2RvYyk7ICAvL2lPUyA3K1xyXG4gICAgZC5pc2lvczggPSBkLmlzaW9zICYmIChcImhpZGRlblwiIGluIF9kb2MpOyAgLy9pT1MgOCtcclxuICAgIGQuaXNpb3MxMCA9IGQuaXNpb3MgJiYgX3dpbi5Qcm94eTsgIC8vaU9TIDEwK1xyXG5cclxuICAgIGQuaXNhbmRyb2lkID0gKC9hbmRyb2lkL2kudGVzdChfYWdlbnQpKTtcclxuXHJcbiAgICBkLmhhc2V2ZW50bGlzdGVuZXIgPSAoXCJhZGRFdmVudExpc3RlbmVyXCIgaW4gX2VsKTtcclxuXHJcbiAgICBkLnRyc3R5bGUgPSBmYWxzZTtcclxuICAgIGQuaGFzdHJhbnNmb3JtID0gZmFsc2U7XHJcbiAgICBkLmhhc3RyYW5zbGF0ZTNkID0gZmFsc2U7XHJcbiAgICBkLnRyYW5zaXRpb25zdHlsZSA9IGZhbHNlO1xyXG4gICAgZC5oYXN0cmFuc2l0aW9uID0gZmFsc2U7XHJcbiAgICBkLnRyYW5zaXRpb25lbmQgPSBmYWxzZTtcclxuXHJcbiAgICBkLnRyc3R5bGUgPSBcInRyYW5zZm9ybVwiO1xyXG4gICAgZC5oYXN0cmFuc2Zvcm0gPSAoXCJ0cmFuc2Zvcm1cIiBpbiBfc3R5bGUpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBjaGVjayA9IFsnbXNUcmFuc2Zvcm0nLCAnd2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJ107XHJcbiAgICAgIGZvciAodmFyIGEgPSAwLCBjID0gY2hlY2subGVuZ3RoOyBhIDwgYzsgYSsrKSB7XHJcbiAgICAgICAgaWYgKF9zdHlsZVtjaGVja1thXV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgZC50cnN0eWxlID0gY2hlY2tbYV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZC5oYXN0cmFuc2Zvcm0gPSAoISFkLnRyc3R5bGUpO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBpZiAoZC5oYXN0cmFuc2Zvcm0pIHtcclxuICAgICAgX3N0eWxlW2QudHJzdHlsZV0gPSBcInRyYW5zbGF0ZTNkKDFweCwycHgsM3B4KVwiO1xyXG4gICAgICBkLmhhc3RyYW5zbGF0ZTNkID0gL3RyYW5zbGF0ZTNkLy50ZXN0KF9zdHlsZVtkLnRyc3R5bGVdKTtcclxuICAgIH1cclxuXHJcbiAgICBkLnRyYW5zaXRpb25zdHlsZSA9IFwidHJhbnNpdGlvblwiO1xyXG4gICAgZC5wcmVmaXhzdHlsZSA9ICcnO1xyXG4gICAgZC50cmFuc2l0aW9uZW5kID0gXCJ0cmFuc2l0aW9uZW5kXCI7XHJcblxyXG4gICAgZC5oYXN0cmFuc2l0aW9uID0gKFwidHJhbnNpdGlvblwiIGluIF9zdHlsZSkgfHwgKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIGQudHJhbnNpdGlvbmVuZCA9IGZhbHNlO1xyXG4gICAgICB2YXIgY2hlY2sgPSBbJ3dlYmtpdFRyYW5zaXRpb24nLCAnbXNUcmFuc2l0aW9uJywgJ01velRyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nLCAnS2h0bWxUcmFuc2l0aW9uJ107XHJcbiAgICAgIHZhciBwcmVmaXggPSBbJy13ZWJraXQtJywgJy1tcy0nLCAnLW1vei0nLCAnLW8tJywgJy1vJywgJy1raHRtbC0nXTtcclxuICAgICAgdmFyIGV2cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICdtc1RyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCcsICdvdHJhbnNpdGlvbmVuZCcsICdvVHJhbnNpdGlvbkVuZCcsICdLaHRtbFRyYW5zaXRpb25FbmQnXTtcclxuICAgICAgZm9yICh2YXIgYSA9IDAsIGMgPSBjaGVjay5sZW5ndGg7IGEgPCBjOyBhKyspIHtcclxuICAgICAgICBpZiAoY2hlY2tbYV0gaW4gX3N0eWxlKSB7XHJcbiAgICAgICAgICBkLnRyYW5zaXRpb25zdHlsZSA9IGNoZWNrW2FdO1xyXG4gICAgICAgICAgZC5wcmVmaXhzdHlsZSA9IHByZWZpeFthXTtcclxuICAgICAgICAgIGQudHJhbnNpdGlvbmVuZCA9IGV2c1thXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoZC5pc2Nocm9tZTI2KSBkLnByZWZpeHN0eWxlID0gcHJlZml4WzFdOyAgLy8gYWx3YXlzIHVzZSBwcmVmaXhcclxuXHJcbiAgICAgIGQuaGFzdHJhbnNpdGlvbiA9IChkLnRyYW5zaXRpb25zdHlsZSk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBkZXRlY3RDdXJzb3JHcmFiKCkge1xyXG4gICAgICB2YXIgbHN0ID0gWydncmFiJywgJy13ZWJraXQtZ3JhYicsICctbW96LWdyYWInXTtcclxuICAgICAgaWYgKChkLmlzY2hyb21lICYmICFkLmlzY2hyb21lMzgpIHx8IGQuaXNpZSkgbHN0ID0gW107IC8vIGZvcmNlIHNldHRpbmcgZm9yIElFIHJldHVybnMgZmFsc2UgcG9zaXRpdmUgYW5kIGNocm9tZSBjdXJzb3IgYnVnXHJcbiAgICAgIGZvciAodmFyIGEgPSAwLCBsID0gbHN0Lmxlbmd0aDsgYSA8IGw7IGErKykge1xyXG4gICAgICAgIHZhciBwID0gbHN0W2FdO1xyXG4gICAgICAgIF9zdHlsZS5jdXJzb3IgPSBwO1xyXG4gICAgICAgIGlmIChfc3R5bGUuY3Vyc29yID09IHApIHJldHVybiBwO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAndXJsKGh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NsaWRlci1wcm8vMS4zLjAvY3NzL2ltYWdlcy9vcGVuaGFuZC5jdXIpLG4tcmVzaXplJzsgLy8gdGhhbmtzIHRvIGh0dHBzOi8vY2RuanMuY29tLyBmb3IgdGhlIG9wZW5oYW5kIGN1cnNvciFcclxuICAgIH1cclxuICAgIGQuY3Vyc29yZ3JhYnZhbHVlID0gZGV0ZWN0Q3Vyc29yR3JhYigpO1xyXG5cclxuICAgIGQuaGFzbW91c2VjYXB0dXJlID0gKFwic2V0Q2FwdHVyZVwiIGluIF9lbCk7XHJcblxyXG4gICAgZC5oYXNNdXRhdGlvbk9ic2VydmVyID0gKENsc011dGF0aW9uT2JzZXJ2ZXIgIT09IGZhbHNlKTtcclxuXHJcbiAgICBfZWwgPSBudWxsOyAvL21lbW9yeSByZWxlYXNlZFxyXG5cclxuICAgIGJyb3dzZXJkZXRlY3RlZCA9IGQ7XHJcblxyXG4gICAgcmV0dXJuIGQ7XHJcbiAgfTtcclxuXHJcbiAgdmFyIE5pY2VTY3JvbGxDbGFzcyA9IGZ1bmN0aW9uIChteW9wdCwgbWUpIHtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy52ZXJzaW9uID0gJzMuNy42JztcclxuICAgIHRoaXMubmFtZSA9ICduaWNlc2Nyb2xsJztcclxuXHJcbiAgICB0aGlzLm1lID0gbWU7XHJcblxyXG4gICAgdmFyICRib2R5ID0gJChcImJvZHlcIik7XHJcblxyXG4gICAgdmFyIG9wdCA9IHRoaXMub3B0ID0ge1xyXG4gICAgICBkb2M6ICRib2R5LFxyXG4gICAgICB3aW46IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgICQuZXh0ZW5kKG9wdCwgX2dsb2JhbG9wdGlvbnMpOyAgLy8gY2xvbmUgb3B0c1xyXG5cclxuICAgIC8vIE9wdGlvbnMgZm9yIGludGVybmFsIHVzZVxyXG4gICAgb3B0LnNuYXBiYWNrc3BlZWQgPSA4MDtcclxuXHJcbiAgICBpZiAobXlvcHQgfHwgZmFsc2UpIHtcclxuICAgICAgZm9yICh2YXIgYSBpbiBvcHQpIHtcclxuICAgICAgICBpZiAobXlvcHRbYV0gIT09IHVuZGVmaW5lZCkgb3B0W2FdID0gbXlvcHRbYV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0LmRpc2FibGVtdXRhdGlvbm9ic2VydmVyKSBDbHNNdXRhdGlvbk9ic2VydmVyID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5kb2MgPSBvcHQuZG9jO1xyXG4gICAgdGhpcy5pZGRvYyA9ICh0aGlzLmRvYyAmJiB0aGlzLmRvY1swXSkgPyB0aGlzLmRvY1swXS5pZCB8fCAnJyA6ICcnO1xyXG4gICAgdGhpcy5pc3BhZ2UgPSAvXkJPRFl8SFRNTC8udGVzdCgob3B0LndpbikgPyBvcHQud2luWzBdLm5vZGVOYW1lIDogdGhpcy5kb2NbMF0ubm9kZU5hbWUpO1xyXG4gICAgdGhpcy5oYXN3cmFwcGVyID0gKG9wdC53aW4gIT09IGZhbHNlKTtcclxuICAgIHRoaXMud2luID0gb3B0LndpbiB8fCAodGhpcy5pc3BhZ2UgPyAkd2luZG93IDogdGhpcy5kb2MpO1xyXG4gICAgdGhpcy5kb2NzY3JvbGwgPSAodGhpcy5pc3BhZ2UgJiYgIXRoaXMuaGFzd3JhcHBlcikgPyAkd2luZG93IDogdGhpcy53aW47XHJcbiAgICB0aGlzLmJvZHkgPSAkYm9keTtcclxuICAgIHRoaXMudmlld3BvcnQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmlzZml4ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmlmcmFtZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc2lmcmFtZSA9ICgodGhpcy5kb2NbMF0ubm9kZU5hbWUgPT0gJ0lGUkFNRScpICYmICh0aGlzLndpblswXS5ub2RlTmFtZSA9PSAnSUZSQU1FJykpO1xyXG5cclxuICAgIHRoaXMuaXN0ZXh0YXJlYSA9ICh0aGlzLndpblswXS5ub2RlTmFtZSA9PSAnVEVYVEFSRUEnKTtcclxuXHJcbiAgICB0aGlzLmZvcmNlc2NyZWVuID0gZmFsc2U7IC8vZm9yY2UgdG8gdXNlIHNjcmVlbiBwb3NpdGlvbiBvbiBldmVudHNcclxuXHJcbiAgICB0aGlzLmNhbnNob3dvbm1vdXNlZXZlbnQgPSAob3B0LmF1dG9oaWRlbW9kZSAhPSBcInNjcm9sbFwiKTtcclxuXHJcbiAgICAvLyBFdmVudHMganVtcCB0YWJsZVxyXG4gICAgdGhpcy5vbm1vdXNlZG93biA9IGZhbHNlO1xyXG4gICAgdGhpcy5vbm1vdXNldXAgPSBmYWxzZTtcclxuICAgIHRoaXMub25tb3VzZW1vdmUgPSBmYWxzZTtcclxuICAgIHRoaXMub25tb3VzZXdoZWVsID0gZmFsc2U7XHJcbiAgICB0aGlzLm9ua2V5cHJlc3MgPSBmYWxzZTtcclxuICAgIHRoaXMub25nZXN0dXJlem9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5vbmNsaWNrID0gZmFsc2U7XHJcblxyXG4gICAgLy8gTmljZXNjcm9sbCBjdXN0b20gZXZlbnRzXHJcbiAgICB0aGlzLm9uc2Nyb2xsc3RhcnQgPSBmYWxzZTtcclxuICAgIHRoaXMub25zY3JvbGxlbmQgPSBmYWxzZTtcclxuICAgIHRoaXMub25zY3JvbGxjYW5jZWwgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLm9uem9vbWluID0gZmFsc2U7XHJcbiAgICB0aGlzLm9uem9vbW91dCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIExldCdzIHN0YXJ0IVxyXG4gICAgdGhpcy52aWV3ID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhZ2UgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbCA9IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfTtcclxuICAgIHRoaXMuc2Nyb2xscmF0aW8gPSB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH07XHJcbiAgICB0aGlzLmN1cnNvcmhlaWdodCA9IDIwO1xyXG4gICAgdGhpcy5zY3JvbGx2YWx1ZW1heCA9IDA7XHJcblxyXG4gICAgLy8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLXdyaXRpbmctbW9kZXMtMy8jbG9naWNhbC10by1waHlzaWNhbFxyXG4gICAgLy8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLXdyaXRpbmctbW9kZXMtMy8jc3ZnLXdyaXRpbmctbW9kZVxyXG4gICAgaWYgKG9wdC5ydGxtb2RlID09IFwiYXV0b1wiKSB7XHJcbiAgICAgIHZhciB0YXJnZXQgPSB0aGlzLndpblswXSA9PSBfd2luID8gdGhpcy5ib2R5IDogdGhpcy53aW47XHJcbiAgICAgIHZhciB3cml0aW5nTW9kZSA9IHRhcmdldC5jc3MoXCJ3cml0aW5nLW1vZGVcIikgfHwgdGFyZ2V0LmNzcyhcIi13ZWJraXQtd3JpdGluZy1tb2RlXCIpIHx8IHRhcmdldC5jc3MoXCItbXMtd3JpdGluZy1tb2RlXCIpIHx8IHRhcmdldC5jc3MoXCItbW96LXdyaXRpbmctbW9kZVwiKTtcclxuXHJcbiAgICAgIGlmICh3cml0aW5nTW9kZSA9PSBcImhvcml6b250YWwtdGJcIiB8fCB3cml0aW5nTW9kZSA9PSBcImxyLXRiXCIgfHwgd3JpdGluZ01vZGUgPT09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLmlzcnRsbW9kZSA9ICh0YXJnZXQuY3NzKFwiZGlyZWN0aW9uXCIpID09IFwicnRsXCIpO1xyXG4gICAgICAgIHRoaXMuaXN2ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaXNydGxtb2RlID0gKHdyaXRpbmdNb2RlID09IFwidmVydGljYWwtcmxcIiB8fCB3cml0aW5nTW9kZSA9PSBcInRiXCIgfHwgd3JpdGluZ01vZGUgPT0gXCJ0Yi1ybFwiIHx8IHdyaXRpbmdNb2RlID09IFwicmwtdGJcIik7XHJcbiAgICAgICAgdGhpcy5pc3ZlcnRpY2FsID0gKHdyaXRpbmdNb2RlID09IFwidmVydGljYWwtcmxcIiB8fCB3cml0aW5nTW9kZSA9PSBcInRiXCIgfHwgd3JpdGluZ01vZGUgPT0gXCJ0Yi1ybFwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc3J0bG1vZGUgPSAob3B0LnJ0bG1vZGUgPT09IHRydWUpO1xyXG4gICAgICB0aGlzLmlzdmVydGljYWwgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vICAgIHRoaXMuY2hlY2tydGxtb2RlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5zY3JvbGxtb20gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLm9ic2VydmVyID0gZmFsc2U7ICAvLyBvYnNlcnZlciBkaXYgY2hhbmdlc1xyXG4gICAgdGhpcy5vYnNlcnZlcnJlbW92ZXIgPSBmYWxzZTsgIC8vIG9ic2VydmVyIG9uIHBhcmVudCBmb3IgcmVtb3ZlIGRldGVjdGlvblxyXG4gICAgdGhpcy5vYnNlcnZlcmJvZHkgPSBmYWxzZTsgIC8vIG9ic2VydmVyIG9uIGJvZHkgZm9yIHBvc2l0aW9uIGNoYW5nZVxyXG5cclxuICAgIGlmIChvcHQuc2Nyb2xsYmFyaWQgIT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuaWQgPSBvcHQuc2Nyb2xsYmFyaWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgdGhpcy5pZCA9IFwiYXNjcmFpbFwiICsgKGFzY3JhaWxjb3VudGVyKyspO1xyXG4gICAgICB9IHdoaWxlIChfZG9jLmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJhaWwgPSBmYWxzZTtcclxuICAgIHRoaXMuY3Vyc29yID0gZmFsc2U7XHJcbiAgICB0aGlzLmN1cnNvcmZyZWV6ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0aW9uZHJhZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuem9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy56b29tYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5oYXNmb2N1cyA9IGZhbHNlO1xyXG4gICAgdGhpcy5oYXNtb3VzZWZvY3VzID0gZmFsc2U7XHJcblxyXG4gICAgLy90aGlzLnZpc2liaWxpdHkgPSB0cnVlO1xyXG4gICAgdGhpcy5yYWlsc2xvY2tlZCA9IGZhbHNlOyAgLy8gbG9ja2VkIGJ5IHJlc2l6ZVxyXG4gICAgdGhpcy5sb2NrZWQgPSBmYWxzZTsgIC8vIHByZXZlbnQgbG9zdCBvZiBsb2NrZWQgc3RhdHVzIHNldHMgYnkgdXNlclxyXG4gICAgdGhpcy5oaWRkZW4gPSBmYWxzZTsgLy8gcmFpbHMgYWx3YXlzIGhpZGRlblxyXG4gICAgdGhpcy5jdXJzb3JhY3RpdmUgPSB0cnVlOyAvLyB1c2VyIGNhbiBpbnRlcmFjdCB3aXRoIGN1cnNvcnNcclxuXHJcbiAgICB0aGlzLndoZWVscHJldmVudGVkID0gZmFsc2U7IC8vcHJldmVudCBtb3VzZXdoZWVsIGV2ZW50XHJcblxyXG4gICAgdGhpcy5vdmVyZmxvd3ggPSBvcHQub3ZlcmZsb3d4O1xyXG4gICAgdGhpcy5vdmVyZmxvd3kgPSBvcHQub3ZlcmZsb3d5O1xyXG5cclxuICAgIHRoaXMubmF0aXZlc2Nyb2xsaW5nYXJlYSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jaGVja2FyZWEgPSAwO1xyXG5cclxuICAgIHRoaXMuZXZlbnRzID0gW107IC8vIGV2ZW50IGxpc3QgZm9yIHVuYmluZFxyXG5cclxuICAgIHRoaXMuc2F2ZWQgPSB7fTsgIC8vIHN0eWxlIHNhdmVkXHJcblxyXG4gICAgdGhpcy5kZWxheWxpc3QgPSB7fTtcclxuICAgIHRoaXMuc3luY2xpc3QgPSB7fTtcclxuXHJcbiAgICB0aGlzLmxhc3RkZWx0YXggPSAwO1xyXG4gICAgdGhpcy5sYXN0ZGVsdGF5ID0gMDtcclxuXHJcbiAgICB0aGlzLmRldGVjdGVkID0gZ2V0QnJvd3NlckRldGVjdGlvbigpO1xyXG5cclxuICAgIHZhciBjYXAgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZXRlY3RlZCk7XHJcblxyXG4gICAgdGhpcy5jYW5od3Njcm9sbCA9IChjYXAuaGFzdHJhbnNmb3JtICYmIG9wdC5od2FjY2VsZXJhdGlvbik7XHJcbiAgICB0aGlzLmlzaHdzY3JvbGwgPSAodGhpcy5jYW5od3Njcm9sbCAmJiBzZWxmLmhhc3dyYXBwZXIpO1xyXG5cclxuICAgIGlmICghdGhpcy5pc3J0bG1vZGUpIHtcclxuICAgICAgdGhpcy5oYXNyZXZlcnNlaHIgPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc3ZlcnRpY2FsKSB7IC8vIFJUTCBtb2RlIHdpdGggcmV2ZXJzZSBob3Jpem9udGFsIGF4aXNcclxuICAgICAgdGhpcy5oYXNyZXZlcnNlaHIgPSAhKGNhcC5pc3dlYmtpdCB8fCBjYXAuaXNpZSB8fCBjYXAuaXNpZTExKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzcmV2ZXJzZWhyID0gIShjYXAuaXN3ZWJraXQgfHwgKGNhcC5pc2llICYmICFjYXAuaXNpZTEwICYmICFjYXAuaXNpZTExKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc3RvdWNoY2FwYWJsZSA9IGZhbHNlOyAvLyBkZXNrdG9wIGRldmljZXMgd2l0aCB0b3VjaCBzY3JlZW4gc3VwcG9ydFxyXG5cclxuICAgIC8vIyMgQ2hlY2sgV2ViS2l0LWJhc2VkIGRlc2t0b3Agd2l0aCB0b3VjaCBzdXBwb3J0XHJcbiAgICAvLyMjICsgRmlyZWZveCAxOCBuaWdodGx5IGJ1aWxkIChkZXNrdG9wKSBmYWxzZSBwb3NpdGl2ZSAob3IgZGVza3RvcCB3aXRoIHRvdWNoIHN1cHBvcnQpXHJcblxyXG4gICAgaWYgKCFjYXAuY2FudG91Y2ggJiYgKGNhcC5oYXN3M2N0b3VjaCB8fCBjYXAuaGFzbXN0b3VjaCkpIHsgIC8vIGRlc2t0b3AgZGV2aWNlIHdpdGggbXVsdGlwbGUgaW5wdXRcclxuICAgICAgdGhpcy5pc3RvdWNoY2FwYWJsZSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKGNhcC5jYW50b3VjaCAmJiAhY2FwLmlzaW9zICYmICFjYXAuaXNhbmRyb2lkICYmIChjYXAuaXN3ZWJraXQgfHwgY2FwLmlzbW96aWxsYSkpIHtcclxuICAgICAgdGhpcy5pc3RvdWNoY2FwYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jIyBkaXNhYmxlIE1vdXNlTG9jayBBUEkgb24gdXNlciByZXF1ZXN0XHJcbiAgICBpZiAoIW9wdC5lbmFibGVtb3VzZWxvY2thcGkpIHtcclxuICAgICAgY2FwLmhhc21vdXNlY2FwdHVyZSA9IGZhbHNlO1xyXG4gICAgICBjYXAuaGFzcG9pbnRlcmxvY2sgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlYm91bmNlZCA9IGZ1bmN0aW9uIChuYW1lLCBmbiwgdG0pIHtcclxuICAgICAgaWYgKCFzZWxmKSByZXR1cm47XHJcbiAgICAgIHZhciBkZCA9IHNlbGYuZGVsYXlsaXN0W25hbWVdIHx8IGZhbHNlO1xyXG4gICAgICBpZiAoIWRkKSB7XHJcbiAgICAgICAgc2VsZi5kZWxheWxpc3RbbmFtZV0gPSB7XHJcbiAgICAgICAgICBoOiBzZXRBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGVsYXlsaXN0W25hbWVdLmZuLmNhbGwoc2VsZik7XHJcbiAgICAgICAgICAgIHNlbGYuZGVsYXlsaXN0W25hbWVdID0gZmFsc2U7XHJcbiAgICAgICAgICB9LCB0bSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZuLmNhbGwoc2VsZik7XHJcbiAgICAgIH1cclxuICAgICAgc2VsZi5kZWxheWxpc3RbbmFtZV0uZm4gPSBmbjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoaXMuc3luY2hlZCA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xyXG4gICAgICBpZiAoc2VsZi5zeW5jbGlzdFtuYW1lXSkgc2VsZi5zeW5jbGlzdFtuYW1lXSA9IGZuO1xyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBzZWxmLnN5bmNsaXN0W25hbWVdID0gZm47XHJcbiAgICAgICAgc2V0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgaWYgKCFzZWxmKSByZXR1cm47XHJcbiAgICAgICAgICBzZWxmLnN5bmNsaXN0W25hbWVdICYmIHNlbGYuc3luY2xpc3RbbmFtZV0uY2FsbChzZWxmKTtcclxuICAgICAgICAgIHNlbGYuc3luY2xpc3RbbmFtZV0gPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudW5zeW5jaGVkID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgaWYgKHNlbGYuc3luY2xpc3RbbmFtZV0pIHNlbGYuc3luY2xpc3RbbmFtZV0gPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jc3MgPSBmdW5jdGlvbiAoZWwsIHBhcnMpIHsgLy8gc2F2ZSAmIHNldFxyXG4gICAgICBmb3IgKHZhciBuIGluIHBhcnMpIHtcclxuICAgICAgICBzZWxmLnNhdmVkLmNzcy5wdXNoKFtlbCwgbiwgZWwuY3NzKG4pXSk7XHJcbiAgICAgICAgZWwuY3NzKG4sIHBhcnNbbl0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsVG9wID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICByZXR1cm4gKHZhbCA9PT0gdW5kZWZpbmVkKSA/IHNlbGYuZ2V0U2Nyb2xsVG9wKCkgOiBzZWxmLnNldFNjcm9sbFRvcCh2YWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbExlZnQgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIHJldHVybiAodmFsID09PSB1bmRlZmluZWQpID8gc2VsZi5nZXRTY3JvbGxMZWZ0KCkgOiBzZWxmLnNldFNjcm9sbExlZnQodmFsKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gZGVyaXZlZCBieSBieSBEYW4gUHVwaXVzIHd3dy5wdXBpdXMubmV0XHJcbiAgICB2YXIgQmV6aWVyQ2xhc3MgPSBmdW5jdGlvbiAoc3QsIGVkLCBzcGQsIHAxLCBwMiwgcDMsIHA0KSB7XHJcblxyXG4gICAgICB0aGlzLnN0ID0gc3Q7XHJcbiAgICAgIHRoaXMuZWQgPSBlZDtcclxuICAgICAgdGhpcy5zcGQgPSBzcGQ7XHJcblxyXG4gICAgICB0aGlzLnAxID0gcDEgfHwgMDtcclxuICAgICAgdGhpcy5wMiA9IHAyIHx8IDE7XHJcbiAgICAgIHRoaXMucDMgPSBwMyB8fCAwO1xyXG4gICAgICB0aGlzLnA0ID0gcDQgfHwgMTtcclxuXHJcbiAgICAgIHRoaXMudHMgPSBub3coKTtcclxuICAgICAgdGhpcy5kZiA9IGVkIC0gc3Q7XHJcbiAgICB9O1xyXG4gICAgQmV6aWVyQ2xhc3MucHJvdG90eXBlID0ge1xyXG4gICAgICBCMjogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICByZXR1cm4gMyAqICgxIC0gdCkgKiAoMSAtIHQpICogdDtcclxuICAgICAgfSxcclxuICAgICAgQjM6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgcmV0dXJuIDMgKiAoMSAtIHQpICogdCAqIHQ7XHJcbiAgICAgIH0sXHJcbiAgICAgIEI0OiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHJldHVybiB0ICogdCAqIHQ7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFBvczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAobm93KCkgLSB0aGlzLnRzKSAvIHRoaXMuc3BkO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXROb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcGMgPSAobm93KCkgLSB0aGlzLnRzKSAvIHRoaXMuc3BkO1xyXG4gICAgICAgIHZhciBieiA9IHRoaXMuQjIocGMpICsgdGhpcy5CMyhwYykgKyB0aGlzLkI0KHBjKTtcclxuICAgICAgICByZXR1cm4gKHBjID49IDEpID8gdGhpcy5lZCA6IHRoaXMuc3QgKyAodGhpcy5kZiAqIGJ6KSB8IDA7XHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVkLCBzcGQpIHtcclxuICAgICAgICB0aGlzLnN0ID0gdGhpcy5nZXROb3coKTtcclxuICAgICAgICB0aGlzLmVkID0gZWQ7XHJcbiAgICAgICAgdGhpcy5zcGQgPSBzcGQ7XHJcbiAgICAgICAgdGhpcy50cyA9IG5vdygpO1xyXG4gICAgICAgIHRoaXMuZGYgPSB0aGlzLmVkIC0gdGhpcy5zdDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2Rlcml2ZWQgZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExMjM2MDkwL1xyXG4gICAgZnVuY3Rpb24gZ2V0TWF0cml4VmFsdWVzKCkge1xyXG4gICAgICB2YXIgdHIgPSBzZWxmLmRvYy5jc3MoY2FwLnRyc3R5bGUpO1xyXG4gICAgICBpZiAodHIgJiYgKHRyLnN1YnN0cigwLCA2KSA9PSBcIm1hdHJpeFwiKSkge1xyXG4gICAgICAgIHJldHVybiB0ci5yZXBsYWNlKC9eLipcXCgoLiopXFwpJC9nLCBcIiQxXCIpLnJlcGxhY2UoL3B4L2csICcnKS5zcGxpdCgvLCArLyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzaHdzY3JvbGwpIHsgICAgLy8gaHcgYWNjZWxlcmF0ZWQgc2Nyb2xsXHJcblxyXG4gICAgICB0aGlzLmRvYy50cmFuc2xhdGUgPSB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwLFxyXG4gICAgICAgIHR4OiBcIjBweFwiLFxyXG4gICAgICAgIHR5OiBcIjBweFwiXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvL3RoaXMgb25lIGNhbiBoZWxwIHRvIGVuYWJsZSBodyBhY2NlbCBvbiBpb3M2IGh0dHA6Ly9pbmRpZWdhbXIuY29tL2lvczYtaHRtbC1oYXJkd2FyZS1hY2NlbGVyYXRpb24tY2hhbmdlcy1hbmQtaG93LXRvLWZpeC10aGVtL1xyXG4gICAgICBpZiAoY2FwLmhhc3RyYW5zbGF0ZTNkICYmIGNhcC5pc2lvcykgdGhpcy5kb2MuY3NzKFwiLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpOyAvLyBwcmV2ZW50IGZsaWNrZXJpbmcgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDYxNDQxL1xyXG5cclxuICAgICAgdGhpcy5nZXRTY3JvbGxUb3AgPSBmdW5jdGlvbiAobGFzdCkge1xyXG4gICAgICAgIGlmICghbGFzdCkge1xyXG4gICAgICAgICAgdmFyIG10eCA9IGdldE1hdHJpeFZhbHVlcygpO1xyXG4gICAgICAgICAgaWYgKG10eCkgcmV0dXJuIChtdHgubGVuZ3RoID09IDE2KSA/IC1tdHhbMTNdIDogLW10eFs1XTsgLy9tYXRyaXgzZCAxNiBvbiBJRTEwXHJcbiAgICAgICAgICBpZiAoc2VsZi50aW1lcnNjcm9sbCAmJiBzZWxmLnRpbWVyc2Nyb2xsLmJ6KSByZXR1cm4gc2VsZi50aW1lcnNjcm9sbC5iei5nZXROb3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGYuZG9jLnRyYW5zbGF0ZS55O1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5nZXRTY3JvbGxMZWZ0ID0gZnVuY3Rpb24gKGxhc3QpIHtcclxuICAgICAgICBpZiAoIWxhc3QpIHtcclxuICAgICAgICAgIHZhciBtdHggPSBnZXRNYXRyaXhWYWx1ZXMoKTtcclxuICAgICAgICAgIGlmIChtdHgpIHJldHVybiAobXR4Lmxlbmd0aCA9PSAxNikgPyAtbXR4WzEyXSA6IC1tdHhbNF07IC8vbWF0cml4M2QgMTYgb24gSUUxMFxyXG4gICAgICAgICAgaWYgKHNlbGYudGltZXJzY3JvbGwgJiYgc2VsZi50aW1lcnNjcm9sbC5iaCkgcmV0dXJuIHNlbGYudGltZXJzY3JvbGwuYmguZ2V0Tm93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxmLmRvYy50cmFuc2xhdGUueDtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMubm90aWZ5U2Nyb2xsRXZlbnQgPSBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICB2YXIgZSA9IF9kb2MuY3JlYXRlRXZlbnQoXCJVSUV2ZW50c1wiKTtcclxuICAgICAgICBlLmluaXRVSUV2ZW50KFwic2Nyb2xsXCIsIGZhbHNlLCBmYWxzZSwgX3dpbiwgMSk7XHJcbiAgICAgICAgZS5uaWNlZXZlbnQgPSB0cnVlO1xyXG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgY3hzY3JvbGxsZWZ0ID0gKHRoaXMuaXNydGxtb2RlKSA/IDEgOiAtMTtcclxuXHJcbiAgICAgIGlmIChjYXAuaGFzdHJhbnNsYXRlM2QgJiYgb3B0LmVuYWJsZXRyYW5zbGF0ZTNkKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTY3JvbGxUb3AgPSBmdW5jdGlvbiAodmFsLCBzaWxlbnQpIHtcclxuICAgICAgICAgIHNlbGYuZG9jLnRyYW5zbGF0ZS55ID0gdmFsO1xyXG4gICAgICAgICAgc2VsZi5kb2MudHJhbnNsYXRlLnR5ID0gKHZhbCAqIC0xKSArIFwicHhcIjtcclxuICAgICAgICAgIHNlbGYuZG9jLmNzcyhjYXAudHJzdHlsZSwgXCJ0cmFuc2xhdGUzZChcIiArIHNlbGYuZG9jLnRyYW5zbGF0ZS50eCArIFwiLFwiICsgc2VsZi5kb2MudHJhbnNsYXRlLnR5ICsgXCIsMClcIik7XHJcbiAgICAgICAgICBpZiAoIXNpbGVudCkgc2VsZi5ub3RpZnlTY3JvbGxFdmVudChzZWxmLndpblswXSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNldFNjcm9sbExlZnQgPSBmdW5jdGlvbiAodmFsLCBzaWxlbnQpIHtcclxuICAgICAgICAgIHNlbGYuZG9jLnRyYW5zbGF0ZS54ID0gdmFsO1xyXG4gICAgICAgICAgc2VsZi5kb2MudHJhbnNsYXRlLnR4ID0gKHZhbCAqIGN4c2Nyb2xsbGVmdCkgKyBcInB4XCI7XHJcbiAgICAgICAgICBzZWxmLmRvYy5jc3MoY2FwLnRyc3R5bGUsIFwidHJhbnNsYXRlM2QoXCIgKyBzZWxmLmRvYy50cmFuc2xhdGUudHggKyBcIixcIiArIHNlbGYuZG9jLnRyYW5zbGF0ZS50eSArIFwiLDApXCIpO1xyXG4gICAgICAgICAgaWYgKCFzaWxlbnQpIHNlbGYubm90aWZ5U2Nyb2xsRXZlbnQoc2VsZi53aW5bMF0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXRTY3JvbGxUb3AgPSBmdW5jdGlvbiAodmFsLCBzaWxlbnQpIHtcclxuICAgICAgICAgIHNlbGYuZG9jLnRyYW5zbGF0ZS55ID0gdmFsO1xyXG4gICAgICAgICAgc2VsZi5kb2MudHJhbnNsYXRlLnR5ID0gKHZhbCAqIC0xKSArIFwicHhcIjtcclxuICAgICAgICAgIHNlbGYuZG9jLmNzcyhjYXAudHJzdHlsZSwgXCJ0cmFuc2xhdGUoXCIgKyBzZWxmLmRvYy50cmFuc2xhdGUudHggKyBcIixcIiArIHNlbGYuZG9jLnRyYW5zbGF0ZS50eSArIFwiKVwiKTtcclxuICAgICAgICAgIGlmICghc2lsZW50KSBzZWxmLm5vdGlmeVNjcm9sbEV2ZW50KHNlbGYud2luWzBdKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2V0U2Nyb2xsTGVmdCA9IGZ1bmN0aW9uICh2YWwsIHNpbGVudCkge1xyXG4gICAgICAgICAgc2VsZi5kb2MudHJhbnNsYXRlLnggPSB2YWw7XHJcbiAgICAgICAgICBzZWxmLmRvYy50cmFuc2xhdGUudHggPSAodmFsICogY3hzY3JvbGxsZWZ0KSArIFwicHhcIjtcclxuICAgICAgICAgIHNlbGYuZG9jLmNzcyhjYXAudHJzdHlsZSwgXCJ0cmFuc2xhdGUoXCIgKyBzZWxmLmRvYy50cmFuc2xhdGUudHggKyBcIixcIiArIHNlbGYuZG9jLnRyYW5zbGF0ZS50eSArIFwiKVwiKTtcclxuICAgICAgICAgIGlmICghc2lsZW50KSBzZWxmLm5vdGlmeVNjcm9sbEV2ZW50KHNlbGYud2luWzBdKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgeyAgICAvLyBuYXRpdmUgc2Nyb2xsXHJcblxyXG4gICAgICB0aGlzLmdldFNjcm9sbFRvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gc2VsZi5kb2NzY3JvbGwuc2Nyb2xsVG9wKCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuc2V0U2Nyb2xsVG9wID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgIHNlbGYuZG9jc2Nyb2xsLnNjcm9sbFRvcCh2YWwpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5nZXRTY3JvbGxMZWZ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2YWw7XHJcbiAgICAgICAgaWYgKCFzZWxmLmhhc3JldmVyc2Vocikge1xyXG4gICAgICAgICAgdmFsID0gc2VsZi5kb2NzY3JvbGwuc2Nyb2xsTGVmdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZi5kZXRlY3RlZC5pc21vemlsbGEpIHtcclxuICAgICAgICAgIHZhbCA9IHNlbGYucGFnZS5tYXh3IC0gTWF0aC5hYnMoc2VsZi5kb2NzY3JvbGwuc2Nyb2xsTGVmdCgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFsID0gc2VsZi5wYWdlLm1heHcgLSBzZWxmLmRvY3Njcm9sbC5zY3JvbGxMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuc2V0U2Nyb2xsTGVmdCA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBpZiAoIXNlbGYpIHJldHVybjtcclxuICAgICAgICAgIGlmIChzZWxmLmhhc3JldmVyc2Vocikge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5kZXRlY3RlZC5pc21vemlsbGEpIHtcclxuICAgICAgICAgICAgICB2YWwgPSAtKHNlbGYucGFnZS5tYXh3IC0gdmFsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YWwgPSBzZWxmLnBhZ2UubWF4dyAtIHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHNlbGYuZG9jc2Nyb2xsLnNjcm9sbExlZnQodmFsKTtcclxuICAgICAgICB9LCAxKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldFRhcmdldCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGlmICghZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoZS50YXJnZXQpIHJldHVybiBlLnRhcmdldDtcclxuICAgICAgaWYgKGUuc3JjRWxlbWVudCkgcmV0dXJuIGUuc3JjRWxlbWVudDtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmhhc1BhcmVudCA9IGZ1bmN0aW9uIChlLCBpZCkge1xyXG4gICAgICBpZiAoIWUpIHJldHVybiBmYWxzZTtcclxuICAgICAgdmFyIGVsID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50IHx8IGUgfHwgZmFsc2U7XHJcbiAgICAgIHdoaWxlIChlbCAmJiBlbC5pZCAhPSBpZCkge1xyXG4gICAgICAgIGVsID0gZWwucGFyZW50Tm9kZSB8fCBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKGVsICE9PSBmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFpJbmRleCgpIHtcclxuICAgICAgdmFyIGRvbSA9IHNlbGYud2luO1xyXG4gICAgICBpZiAoXCJ6SW5kZXhcIiBpbiBkb20pIHJldHVybiBkb20uekluZGV4KCk7IC8vIHVzZSBqUXVlcnkgVUkgbWV0aG9kIHdoZW4gYXZhaWxhYmxlXHJcbiAgICAgIHdoaWxlIChkb20ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmIChkb21bMF0ubm9kZVR5cGUgPT0gOSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciB6aSA9IGRvbS5jc3MoJ3pJbmRleCcpO1xyXG4gICAgICAgIGlmICghaXNOYU4oemkpICYmIHppICE9PSAwKSByZXR1cm4gcGFyc2VJbnQoemkpO1xyXG4gICAgICAgIGRvbSA9IGRvbS5wYXJlbnQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9pbnNwaXJlZCBieSBodHRwOi8vZm9ydW0uanF1ZXJ5LmNvbS90b3BpYy93aWR0aC1pbmNsdWRlcy1ib3JkZXItd2lkdGgtd2hlbi1zZXQtdG8tdGhpbi1tZWRpdW0tdGhpY2staW4taWVcclxuICAgIHZhciBfY29udmVydEJvcmRlcldpZHRoID0ge1xyXG4gICAgICBcInRoaW5cIjogMSxcclxuICAgICAgXCJtZWRpdW1cIjogMyxcclxuICAgICAgXCJ0aGlja1wiOiA1XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFdpZHRoVG9QaXhlbChkb20sIHByb3AsIGNoa2hlaWdodCkge1xyXG4gICAgICB2YXIgd2QgPSBkb20uY3NzKHByb3ApO1xyXG4gICAgICB2YXIgcHggPSBwYXJzZUZsb2F0KHdkKTtcclxuICAgICAgaWYgKGlzTmFOKHB4KSkge1xyXG4gICAgICAgIHB4ID0gX2NvbnZlcnRCb3JkZXJXaWR0aFt3ZF0gfHwgMDtcclxuICAgICAgICB2YXIgYnJkID0gKHB4ID09IDMpID8gKChjaGtoZWlnaHQpID8gKHNlbGYud2luLm91dGVySGVpZ2h0KCkgLSBzZWxmLndpbi5pbm5lckhlaWdodCgpKSA6IChzZWxmLndpbi5vdXRlcldpZHRoKCkgLSBzZWxmLndpbi5pbm5lcldpZHRoKCkpKSA6IDE7IC8vRE9OJ1QgVFJVU1QgQ1NTXHJcbiAgICAgICAgaWYgKHNlbGYuaXNpZTggJiYgcHgpIHB4ICs9IDE7XHJcbiAgICAgICAgcmV0dXJuIChicmQpID8gcHggOiAwO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBweDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdldERvY3VtZW50U2Nyb2xsT2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvcDogX3dpbi5wYWdlWU9mZnNldCB8fCBfZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXHJcbiAgICAgICAgbGVmdDogX3dpbi5wYWdlWE9mZnNldCB8fCBfZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0XHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoc2VsZi5pc2ZpeGVkKSB7XHJcbiAgICAgICAgdmFyIG9mcyA9IHNlbGYud2luLm9mZnNldCgpOyAgLy8gZml4IENocm9tZSBhdXRvIGlzc3VlICh3aGVuIHJpZ2h0L2JvdHRvbSBwcm9wcyBvbmx5KVxyXG4gICAgICAgIHZhciBzY3JsID0gc2VsZi5nZXREb2N1bWVudFNjcm9sbE9mZnNldCgpO1xyXG4gICAgICAgIG9mcy50b3AgLT0gc2NybC50b3A7XHJcbiAgICAgICAgb2ZzLmxlZnQgLT0gc2NybC5sZWZ0O1xyXG4gICAgICAgIHJldHVybiBvZnM7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHd3ID0gc2VsZi53aW4ub2Zmc2V0KCk7XHJcbiAgICAgIGlmICghc2VsZi52aWV3cG9ydCkgcmV0dXJuIHd3O1xyXG4gICAgICB2YXIgdnAgPSBzZWxmLnZpZXdwb3J0Lm9mZnNldCgpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvcDogd3cudG9wIC0gdnAudG9wLFxyXG4gICAgICAgIGxlZnQ6IHd3LmxlZnQgLSB2cC5sZWZ0XHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudXBkYXRlU2Nyb2xsQmFyID0gZnVuY3Rpb24gKGxlbikge1xyXG4gICAgICB2YXIgcG9zLCBvZmY7XHJcbiAgICAgIGlmIChzZWxmLmlzaHdzY3JvbGwpIHtcclxuICAgICAgICBzZWxmLnJhaWwuY3NzKHtcclxuICAgICAgICAgIGhlaWdodDogc2VsZi53aW4uaW5uZXJIZWlnaHQoKSAtIChvcHQucmFpbHBhZGRpbmcudG9wICsgb3B0LnJhaWxwYWRkaW5nLmJvdHRvbSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoc2VsZi5yYWlsaCkgc2VsZi5yYWlsaC5jc3Moe1xyXG4gICAgICAgICAgd2lkdGg6IHNlbGYud2luLmlubmVyV2lkdGgoKSAtIChvcHQucmFpbHBhZGRpbmcubGVmdCArIG9wdC5yYWlscGFkZGluZy5yaWdodClcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgd3BvcyA9IHNlbGYuZ2V0T2Zmc2V0KCk7XHJcbiAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgdG9wOiB3cG9zLnRvcCxcclxuICAgICAgICAgIGxlZnQ6IHdwb3MubGVmdCAtIChvcHQucmFpbHBhZGRpbmcubGVmdCArIG9wdC5yYWlscGFkZGluZy5yaWdodClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBvcy50b3AgKz0gZ2V0V2lkdGhUb1BpeGVsKHNlbGYud2luLCAnYm9yZGVyLXRvcC13aWR0aCcsIHRydWUpO1xyXG4gICAgICAgIHBvcy5sZWZ0ICs9IChzZWxmLnJhaWwuYWxpZ24pID8gc2VsZi53aW4ub3V0ZXJXaWR0aCgpIC0gZ2V0V2lkdGhUb1BpeGVsKHNlbGYud2luLCAnYm9yZGVyLXJpZ2h0LXdpZHRoJykgLSBzZWxmLnJhaWwud2lkdGggOiBnZXRXaWR0aFRvUGl4ZWwoc2VsZi53aW4sICdib3JkZXItbGVmdC13aWR0aCcpO1xyXG5cclxuICAgICAgICBvZmYgPSBvcHQucmFpbG9mZnNldDtcclxuICAgICAgICBpZiAob2ZmKSB7XHJcbiAgICAgICAgICBpZiAob2ZmLnRvcCkgcG9zLnRvcCArPSBvZmYudG9wO1xyXG4gICAgICAgICAgaWYgKG9mZi5sZWZ0KSBwb3MubGVmdCArPSBvZmYubGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc2VsZi5yYWlsc2xvY2tlZCkgc2VsZi5yYWlsLmNzcyh7XHJcbiAgICAgICAgICB0b3A6IHBvcy50b3AsXHJcbiAgICAgICAgICBsZWZ0OiBwb3MubGVmdCxcclxuICAgICAgICAgIGhlaWdodDogKChsZW4pID8gbGVuLmggOiBzZWxmLndpbi5pbm5lckhlaWdodCgpKSAtIChvcHQucmFpbHBhZGRpbmcudG9wICsgb3B0LnJhaWxwYWRkaW5nLmJvdHRvbSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuem9vbSkge1xyXG4gICAgICAgICAgc2VsZi56b29tLmNzcyh7XHJcbiAgICAgICAgICAgIHRvcDogcG9zLnRvcCArIDEsXHJcbiAgICAgICAgICAgIGxlZnQ6IChzZWxmLnJhaWwuYWxpZ24gPT0gMSkgPyBwb3MubGVmdCAtIDIwIDogcG9zLmxlZnQgKyBzZWxmLnJhaWwud2lkdGggKyA0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWxmLnJhaWxoICYmICFzZWxmLnJhaWxzbG9ja2VkKSB7XHJcbiAgICAgICAgICBwb3MgPSB7XHJcbiAgICAgICAgICAgIHRvcDogd3Bvcy50b3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHdwb3MubGVmdFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIG9mZiA9IG9wdC5yYWlsaG9mZnNldDtcclxuICAgICAgICAgIGlmIChvZmYpIHtcclxuICAgICAgICAgICAgaWYgKG9mZi50b3ApIHBvcy50b3AgKz0gb2ZmLnRvcDtcclxuICAgICAgICAgICAgaWYgKG9mZi5sZWZ0KSBwb3MubGVmdCArPSBvZmYubGVmdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciB5ID0gKHNlbGYucmFpbGguYWxpZ24pID8gcG9zLnRvcCArIGdldFdpZHRoVG9QaXhlbChzZWxmLndpbiwgJ2JvcmRlci10b3Atd2lkdGgnLCB0cnVlKSArIHNlbGYud2luLmlubmVySGVpZ2h0KCkgLSBzZWxmLnJhaWxoLmhlaWdodCA6IHBvcy50b3AgKyBnZXRXaWR0aFRvUGl4ZWwoc2VsZi53aW4sICdib3JkZXItdG9wLXdpZHRoJywgdHJ1ZSk7XHJcbiAgICAgICAgICB2YXIgeCA9IHBvcy5sZWZ0ICsgZ2V0V2lkdGhUb1BpeGVsKHNlbGYud2luLCAnYm9yZGVyLWxlZnQtd2lkdGgnKTtcclxuICAgICAgICAgIHNlbGYucmFpbGguY3NzKHtcclxuICAgICAgICAgICAgdG9wOiB5IC0gKG9wdC5yYWlscGFkZGluZy50b3AgKyBvcHQucmFpbHBhZGRpbmcuYm90dG9tKSxcclxuICAgICAgICAgICAgbGVmdDogeCxcclxuICAgICAgICAgICAgd2lkdGg6IHNlbGYucmFpbGgud2lkdGhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kb1JhaWxDbGljayA9IGZ1bmN0aW9uIChlLCBkYmwsIGhyKSB7XHJcbiAgICAgIHZhciBmbiwgcGcsIGN1ciwgcG9zO1xyXG5cclxuICAgICAgaWYgKHNlbGYucmFpbHNsb2NrZWQpIHJldHVybjtcclxuXHJcbiAgICAgIHNlbGYuY2FuY2VsRXZlbnQoZSk7XHJcblxyXG4gICAgICBpZiAoIShcInBhZ2VZXCIgaW4gZSkpIHtcclxuICAgICAgICBlLnBhZ2VYID0gZS5jbGllbnRYICsgX2RvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuICAgICAgICBlLnBhZ2VZID0gZS5jbGllbnRZICsgX2RvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGJsKSB7XHJcbiAgICAgICAgZm4gPSAoaHIpID8gc2VsZi5kb1Njcm9sbExlZnQgOiBzZWxmLmRvU2Nyb2xsVG9wO1xyXG4gICAgICAgIGN1ciA9IChocikgPyAoKGUucGFnZVggLSBzZWxmLnJhaWxoLm9mZnNldCgpLmxlZnQgLSAoc2VsZi5jdXJzb3J3aWR0aCAvIDIpKSAqIHNlbGYuc2Nyb2xscmF0aW8ueCkgOiAoKGUucGFnZVkgLSBzZWxmLnJhaWwub2Zmc2V0KCkudG9wIC0gKHNlbGYuY3Vyc29yaGVpZ2h0IC8gMikpICogc2VsZi5zY3JvbGxyYXRpby55KTtcclxuICAgICAgICBzZWxmLnVuc3luY2hlZChcInJlbGF0aXZleHlcIik7XHJcbiAgICAgICAgZm4oY3VyfDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZuID0gKGhyKSA/IHNlbGYuZG9TY3JvbGxMZWZ0QnkgOiBzZWxmLmRvU2Nyb2xsQnk7XHJcbiAgICAgICAgY3VyID0gKGhyKSA/IHNlbGYuc2Nyb2xsLnggOiBzZWxmLnNjcm9sbC55O1xyXG4gICAgICAgIHBvcyA9IChocikgPyBlLnBhZ2VYIC0gc2VsZi5yYWlsaC5vZmZzZXQoKS5sZWZ0IDogZS5wYWdlWSAtIHNlbGYucmFpbC5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgcGcgPSAoaHIpID8gc2VsZi52aWV3LncgOiBzZWxmLnZpZXcuaDtcclxuICAgICAgICBmbigoY3VyID49IHBvcykgPyBwZyA6IC1wZyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYubmV3c2Nyb2xseSA9IHNlbGYubmV3c2Nyb2xseCA9IDA7XHJcblxyXG4gICAgc2VsZi5oYXNhbmltYXRpb25mcmFtZSA9IChcInJlcXVlc3RBbmltYXRpb25GcmFtZVwiIGluIF93aW4pO1xyXG4gICAgc2VsZi5oYXNjYW5jZWxhbmltYXRpb25mcmFtZSA9IChcImNhbmNlbEFuaW1hdGlvbkZyYW1lXCIgaW4gX3dpbik7XHJcblxyXG4gICAgc2VsZi5oYXNib3JkZXJib3ggPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBzZWxmLnNhdmVkLmNzcyA9IFtdO1xyXG5cclxuICAgICAgaWYgKGNhcC5pc29wZXJhbWluaSkgcmV0dXJuIHRydWU7IC8vIFNPUlJZLCBETyBOT1QgV09SSyFcclxuICAgICAgaWYgKGNhcC5pc2FuZHJvaWQgJiYgIShcImhpZGRlblwiIGluIF9kb2MpKSByZXR1cm4gdHJ1ZTsgLy8gQW5kcm9pZCAzLSBTT1JSWSwgRE8gTk9UIFdPUkshXHJcblxyXG4gICAgICBvcHQuZW11bGF0ZXRvdWNoID0gb3B0LmVtdWxhdGV0b3VjaCB8fCBvcHQudG91Y2hiZWhhdmlvcjsgIC8vIG1hbnRhaW4gY29tcGF0aWJpbGl0eSB3aXRoIFwidG91Y2hiZWhhdmlvclwiXHJcblxyXG4gICAgICBzZWxmLmhhc2JvcmRlcmJveCA9IF93aW4uZ2V0Q29tcHV0ZWRTdHlsZSAmJiAoX3dpbi5nZXRDb21wdXRlZFN0eWxlKF9kb2MuYm9keSlbJ2JveC1zaXppbmcnXSA9PT0gXCJib3JkZXItYm94XCIpO1xyXG5cclxuICAgICAgdmFyIF9zY3JvbGx5aGlkZGVuID0geyAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nIH07XHJcbiAgICAgIGlmIChjYXAuaXNpZTExIHx8IGNhcC5pc2llMTApIF9zY3JvbGx5aGlkZGVuWyctbXMtb3ZlcmZsb3ctc3R5bGUnXSA9ICdub25lJzsgIC8vIElFIDEwICYgMTEgaXMgYWx3YXlzIGEgd29ybGQgYXBhcnQhXHJcblxyXG4gICAgICBpZiAoc2VsZi5pc2h3c2Nyb2xsKSB7XHJcbiAgICAgICAgdGhpcy5kb2MuY3NzKGNhcC50cmFuc2l0aW9uc3R5bGUsIGNhcC5wcmVmaXhzdHlsZSArICd0cmFuc2Zvcm0gMG1zIGVhc2Utb3V0Jyk7XHJcbiAgICAgICAgaWYgKGNhcC50cmFuc2l0aW9uZW5kKSBzZWxmLmJpbmQoc2VsZi5kb2MsIGNhcC50cmFuc2l0aW9uZW5kLCBzZWxmLm9uU2Nyb2xsVHJhbnNpdGlvbkVuZCwgZmFsc2UpOyAvL0kgaGF2ZSBnb3QgdG8gZG8gc29tZXRoaW5nIHVzZWZ1bGwhIVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLnppbmRleCA9IFwiYXV0b1wiO1xyXG4gICAgICBpZiAoIXNlbGYuaXNwYWdlICYmIG9wdC56aW5kZXggPT0gXCJhdXRvXCIpIHtcclxuICAgICAgICBzZWxmLnppbmRleCA9IGdldFpJbmRleCgpIHx8IFwiYXV0b1wiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbGYuemluZGV4ID0gb3B0LnppbmRleDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzZWxmLmlzcGFnZSAmJiBzZWxmLnppbmRleCAhPSBcImF1dG9cIiAmJiBzZWxmLnppbmRleCA+IGdsb2JhbG1heHppbmRleCkge1xyXG4gICAgICAgIGdsb2JhbG1heHppbmRleCA9IHNlbGYuemluZGV4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2VsZi5pc2llICYmIHNlbGYuemluZGV4ID09PSAwICYmIG9wdC56aW5kZXggPT0gXCJhdXRvXCIpIHsgLy8gZml4IElFIGF1dG8gPT0gMFxyXG4gICAgICAgIHNlbGYuemluZGV4ID0gXCJhdXRvXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghc2VsZi5pc3BhZ2UgfHwgIWNhcC5pc2llb2xkKSB7XHJcblxyXG4gICAgICAgIHZhciBjb250ID0gc2VsZi5kb2NzY3JvbGw7XHJcbiAgICAgICAgaWYgKHNlbGYuaXNwYWdlKSBjb250ID0gKHNlbGYuaGFzd3JhcHBlcikgPyBzZWxmLndpbiA6IHNlbGYuZG9jO1xyXG5cclxuICAgICAgICBzZWxmLmNzcyhjb250LCBfc2Nyb2xseWhpZGRlbik7XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmlzcGFnZSAmJiAoY2FwLmlzaWUxMSB8fCBjYXAuaXNpZSkpIHsgLy8gSUUgNy0xMVxyXG4gICAgICAgICAgc2VsZi5jc3MoJChcImh0bWxcIiksIF9zY3JvbGx5aGlkZGVuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYXAuaXNpb3MgJiYgIXNlbGYuaXNwYWdlICYmICFzZWxmLmhhc3dyYXBwZXIpIHNlbGYuY3NzKCRib2R5LCB7XHJcbiAgICAgICAgICBcIi13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nXCI6IFwidG91Y2hcIlxyXG4gICAgICAgIH0pOyAvL2ZvcmNlIGh3IGFjY2VsZXJhdGlvblxyXG5cclxuICAgICAgICB2YXIgY3Vyc29yID0gJChfZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcclxuICAgICAgICBjdXJzb3IuY3NzKHtcclxuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXHJcbiAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICBcImZsb2F0XCI6IFwicmlnaHRcIixcclxuICAgICAgICAgIHdpZHRoOiBvcHQuY3Vyc29yd2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IG9wdC5jdXJzb3Jjb2xvcixcclxuICAgICAgICAgIGJvcmRlcjogb3B0LmN1cnNvcmJvcmRlcixcclxuICAgICAgICAgICdiYWNrZ3JvdW5kLWNsaXAnOiAncGFkZGluZy1ib3gnLFxyXG4gICAgICAgICAgJy13ZWJraXQtYm9yZGVyLXJhZGl1cyc6IG9wdC5jdXJzb3Jib3JkZXJyYWRpdXMsXHJcbiAgICAgICAgICAnLW1vei1ib3JkZXItcmFkaXVzJzogb3B0LmN1cnNvcmJvcmRlcnJhZGl1cyxcclxuICAgICAgICAgICdib3JkZXItcmFkaXVzJzogb3B0LmN1cnNvcmJvcmRlcnJhZGl1c1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjdXJzb3IuYWRkQ2xhc3MoJ25pY2VzY3JvbGwtY3Vyc29ycycpO1xyXG5cclxuICAgICAgICBzZWxmLmN1cnNvciA9IGN1cnNvcjtcclxuXHJcbiAgICAgICAgdmFyIHJhaWwgPSAkKF9kb2MuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xyXG4gICAgICAgIHJhaWwuYXR0cignaWQnLCBzZWxmLmlkKTtcclxuICAgICAgICByYWlsLmFkZENsYXNzKCduaWNlc2Nyb2xsLXJhaWxzIG5pY2VzY3JvbGwtcmFpbHMtdnInKTtcclxuXHJcbiAgICAgICAgdmFyIHYsIGEsIGtwID0gW1wibGVmdFwiLCBcInJpZ2h0XCIsIFwidG9wXCIsIFwiYm90dG9tXCJdOyAgLy8qKlxyXG4gICAgICAgIGZvciAodmFyIG4gaW4ga3ApIHtcclxuICAgICAgICAgIGEgPSBrcFtuXTtcclxuICAgICAgICAgIHYgPSBvcHQucmFpbHBhZGRpbmdbYV0gfHwgMDtcclxuICAgICAgICAgIHYgJiYgcmFpbC5jc3MoXCJwYWRkaW5nLVwiICsgYSwgdiArIFwicHhcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYWlsLmFwcGVuZChjdXJzb3IpO1xyXG5cclxuICAgICAgICByYWlsLndpZHRoID0gTWF0aC5tYXgocGFyc2VGbG9hdChvcHQuY3Vyc29yd2lkdGgpLCBjdXJzb3Iub3V0ZXJXaWR0aCgpKTtcclxuICAgICAgICByYWlsLmNzcyh7XHJcbiAgICAgICAgICB3aWR0aDogcmFpbC53aWR0aCArIFwicHhcIixcclxuICAgICAgICAgIHpJbmRleDogc2VsZi56aW5kZXgsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBvcHQuYmFja2dyb3VuZCxcclxuICAgICAgICAgIGN1cnNvcjogXCJkZWZhdWx0XCJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmFpbC52aXNpYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICByYWlsLnNjcm9sbGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICByYWlsLmFsaWduID0gKG9wdC5yYWlsYWxpZ24gPT0gXCJsZWZ0XCIpID8gMCA6IDE7XHJcblxyXG4gICAgICAgIHNlbGYucmFpbCA9IHJhaWw7XHJcblxyXG4gICAgICAgIHNlbGYucmFpbC5kcmFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZhciB6b29tID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9wdC5ib3h6b29tICYmICFzZWxmLmlzcGFnZSAmJiAhY2FwLmlzaWVvbGQpIHtcclxuICAgICAgICAgIHpvb20gPSBfZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICAgIHNlbGYuYmluZCh6b29tLCBcImNsaWNrXCIsIHNlbGYuZG9ab29tKTtcclxuICAgICAgICAgIHNlbGYuYmluZCh6b29tLCBcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLnpvb20uY3NzKCdvcGFjaXR5Jywgb3B0LmN1cnNvcm9wYWNpdHltYXgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZWxmLmJpbmQoem9vbSwgXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi56b29tLmNzcygnb3BhY2l0eScsIG9wdC5jdXJzb3JvcGFjaXR5bWluKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHNlbGYuem9vbSA9ICQoem9vbSk7XHJcbiAgICAgICAgICBzZWxmLnpvb20uY3NzKHtcclxuICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcclxuICAgICAgICAgICAgekluZGV4OiBzZWxmLnppbmRleCxcclxuICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyBvcHQuc2NyaXB0cGF0aCArICd6b29taWNvLnBuZyknLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDE4LFxyXG4gICAgICAgICAgICB3aWR0aDogMTgsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJzAgMCdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKG9wdC5kYmxjbGlja3pvb20pIHNlbGYuYmluZChzZWxmLndpbiwgXCJkYmxjbGlja1wiLCBzZWxmLmRvWm9vbSk7XHJcbiAgICAgICAgICBpZiAoY2FwLmNhbnRvdWNoICYmIG9wdC5nZXN0dXJlem9vbSkge1xyXG4gICAgICAgICAgICBzZWxmLm9uZ2VzdHVyZXpvb20gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgIGlmIChlLnNjYWxlID4gMS41KSBzZWxmLmRvWm9vbUluKGUpO1xyXG4gICAgICAgICAgICAgIGlmIChlLnNjYWxlIDwgMC44KSBzZWxmLmRvWm9vbU91dChlKTtcclxuICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jYW5jZWxFdmVudChlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5iaW5kKHNlbGYud2luLCBcImdlc3R1cmVlbmRcIiwgc2VsZi5vbmdlc3R1cmV6b29tKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGluaXQgSE9SSVpcclxuXHJcbiAgICAgICAgc2VsZi5yYWlsaCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciByYWlsaDtcclxuXHJcbiAgICAgICAgaWYgKG9wdC5ob3JpenJhaWxlbmFibGVkKSB7XHJcblxyXG4gICAgICAgICAgc2VsZi5jc3MoY29udCwge1xyXG4gICAgICAgICAgICBvdmVyZmxvd1g6ICdoaWRkZW4nXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBjdXJzb3IgPSAkKF9kb2MuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xyXG4gICAgICAgICAgY3Vyc29yLmNzcyh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXHJcbiAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBvcHQuY3Vyc29yd2lkdGgsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG9wdC5jdXJzb3Jjb2xvcixcclxuICAgICAgICAgICAgYm9yZGVyOiBvcHQuY3Vyc29yYm9yZGVyLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ2xpcDogJ3BhZGRpbmctYm94JyxcclxuICAgICAgICAgICAgJy13ZWJraXQtYm9yZGVyLXJhZGl1cyc6IG9wdC5jdXJzb3Jib3JkZXJyYWRpdXMsXHJcbiAgICAgICAgICAgICctbW96LWJvcmRlci1yYWRpdXMnOiBvcHQuY3Vyc29yYm9yZGVycmFkaXVzLFxyXG4gICAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IG9wdC5jdXJzb3Jib3JkZXJyYWRpdXNcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChjYXAuaXNpZW9sZCkgY3Vyc29yLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7ICAvL0lFNiBob3JpeiBzY3JvbGxiYXIgaXNzdWVcclxuXHJcbiAgICAgICAgICBjdXJzb3IuYWRkQ2xhc3MoJ25pY2VzY3JvbGwtY3Vyc29ycycpO1xyXG5cclxuICAgICAgICAgIHNlbGYuY3Vyc29yaCA9IGN1cnNvcjtcclxuXHJcbiAgICAgICAgICByYWlsaCA9ICQoX2RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XHJcbiAgICAgICAgICByYWlsaC5hdHRyKCdpZCcsIHNlbGYuaWQgKyAnLWhyJyk7XHJcbiAgICAgICAgICByYWlsaC5hZGRDbGFzcygnbmljZXNjcm9sbC1yYWlscyBuaWNlc2Nyb2xsLXJhaWxzLWhyJyk7XHJcbiAgICAgICAgICByYWlsaC5oZWlnaHQgPSBNYXRoLm1heChwYXJzZUZsb2F0KG9wdC5jdXJzb3J3aWR0aCksIGN1cnNvci5vdXRlckhlaWdodCgpKTtcclxuICAgICAgICAgIHJhaWxoLmNzcyh7XHJcbiAgICAgICAgICAgIGhlaWdodDogcmFpbGguaGVpZ2h0ICsgXCJweFwiLFxyXG4gICAgICAgICAgICAnekluZGV4Jzogc2VsZi56aW5kZXgsXHJcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBvcHQuYmFja2dyb3VuZFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgcmFpbGguYXBwZW5kKGN1cnNvcik7XHJcblxyXG4gICAgICAgICAgcmFpbGgudmlzaWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICByYWlsaC5zY3JvbGxhYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICByYWlsaC5hbGlnbiA9IChvcHQucmFpbHZhbGlnbiA9PSBcInRvcFwiKSA/IDAgOiAxO1xyXG5cclxuICAgICAgICAgIHNlbGYucmFpbGggPSByYWlsaDtcclxuXHJcbiAgICAgICAgICBzZWxmLnJhaWxoLmRyYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZi5pc3BhZ2UpIHtcclxuXHJcbiAgICAgICAgICByYWlsLmNzcyh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIlxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgcmFpbC5jc3MoKHJhaWwuYWxpZ24pID8geyByaWdodDogMCB9IDogeyBsZWZ0OiAwIH0pO1xyXG5cclxuICAgICAgICAgIHNlbGYuYm9keS5hcHBlbmQocmFpbCk7XHJcbiAgICAgICAgICBpZiAoc2VsZi5yYWlsaCkge1xyXG4gICAgICAgICAgICByYWlsaC5jc3Moe1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByYWlsaC5jc3MoKHJhaWxoLmFsaWduKSA/IHsgYm90dG9tOiAwIH0gOiB7IHRvcDogMCB9KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuYm9keS5hcHBlbmQocmFpbGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoc2VsZi5pc2h3c2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLndpbi5jc3MoJ3Bvc2l0aW9uJykgPT0gJ3N0YXRpYycpIHNlbGYuY3NzKHNlbGYud2luLCB7ICdwb3NpdGlvbic6ICdyZWxhdGl2ZScgfSk7XHJcbiAgICAgICAgICAgIHZhciBiZCA9IChzZWxmLndpblswXS5ub2RlTmFtZSA9PSAnSFRNTCcpID8gc2VsZi5ib2R5IDogc2VsZi53aW47XHJcbiAgICAgICAgICAgICQoYmQpLnNjcm9sbFRvcCgwKS5zY3JvbGxMZWZ0KDApOyAgLy8gZml4IHJhaWwgcG9zaXRpb24gaWYgY29udGVudCBhbHJlYWR5IHNjcm9sbGVkXHJcbiAgICAgICAgICAgIGlmIChzZWxmLnpvb20pIHtcclxuICAgICAgICAgICAgICBzZWxmLnpvb20uY3NzKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXHJcbiAgICAgICAgICAgICAgICB0b3A6IDEsXHJcbiAgICAgICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXJpZ2h0XCI6IHJhaWwud2lkdGggKyA0XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgYmQuYXBwZW5kKHNlbGYuem9vbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmFpbC5jc3Moe1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXHJcbiAgICAgICAgICAgICAgdG9wOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByYWlsLmNzcygocmFpbC5hbGlnbikgPyB7IHJpZ2h0OiAwIH0gOiB7IGxlZnQ6IDAgfSk7XHJcbiAgICAgICAgICAgIGJkLmFwcGVuZChyYWlsKTtcclxuICAgICAgICAgICAgaWYgKHJhaWxoKSB7XHJcbiAgICAgICAgICAgICAgcmFpbGguY3NzKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiAwXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgcmFpbGguY3NzKChyYWlsaC5hbGlnbikgPyB7IGJvdHRvbTogMCB9IDogeyB0b3A6IDAgfSk7XHJcbiAgICAgICAgICAgICAgYmQuYXBwZW5kKHJhaWxoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5pc2ZpeGVkID0gKHNlbGYud2luLmNzcyhcInBvc2l0aW9uXCIpID09IFwiZml4ZWRcIik7XHJcbiAgICAgICAgICAgIHZhciBybHBvcyA9IChzZWxmLmlzZml4ZWQpID8gXCJmaXhlZFwiIDogXCJhYnNvbHV0ZVwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzZWxmLmlzZml4ZWQpIHNlbGYudmlld3BvcnQgPSBzZWxmLmdldFZpZXdwb3J0KHNlbGYud2luWzBdKTtcclxuICAgICAgICAgICAgaWYgKHNlbGYudmlld3BvcnQpIHtcclxuICAgICAgICAgICAgICBzZWxmLmJvZHkgPSBzZWxmLnZpZXdwb3J0O1xyXG4gICAgICAgICAgICAgIGlmICghKC9maXhlZHxhYnNvbHV0ZS8udGVzdChzZWxmLnZpZXdwb3J0LmNzcyhcInBvc2l0aW9uXCIpKSkpIHNlbGYuY3NzKHNlbGYudmlld3BvcnQsIHtcclxuICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJhaWwuY3NzKHtcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogcmxwb3NcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLnpvb20pIHNlbGYuem9vbS5jc3Moe1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiBybHBvc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi51cGRhdGVTY3JvbGxCYXIoKTtcclxuICAgICAgICAgICAgc2VsZi5ib2R5LmFwcGVuZChyYWlsKTtcclxuICAgICAgICAgICAgaWYgKHNlbGYuem9vbSkgc2VsZi5ib2R5LmFwcGVuZChzZWxmLnpvb20pO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5yYWlsaCkge1xyXG4gICAgICAgICAgICAgIHJhaWxoLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmxwb3NcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBzZWxmLmJvZHkuYXBwZW5kKHJhaWxoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjYXAuaXNpb3MpIHNlbGYuY3NzKHNlbGYud2luLCB7XHJcbiAgICAgICAgICAgICctd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3InOiAncmdiYSgwLDAsMCwwKScsXHJcbiAgICAgICAgICAgICctd2Via2l0LXRvdWNoLWNhbGxvdXQnOiAnbm9uZSdcclxuICAgICAgICAgIH0pOyAvLyBwcmV2ZW50IGdyZXkgbGF5ZXIgb24gY2xpY2tcclxuXHJcbiAgICAgICAgICBpZiAob3B0LmRpc2FibGVvdXRsaW5lKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXAuaXNpZSkgc2VsZi53aW4uYXR0cihcImhpZGVGb2N1c1wiLCBcInRydWVcIik7IC8vIElFLCBwcmV2ZW50IGRvdHRlZCByZWN0YW5nbGUgb24gZm9jdXNlZCBkaXZcclxuICAgICAgICAgICAgaWYgKGNhcC5pc3dlYmtpdCkgc2VsZi53aW4uY3NzKCdvdXRsaW5lJywgJ25vbmUnKTsgIC8vIFdlYmtpdCBvdXRsaW5lXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdC5hdXRvaGlkZW1vZGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBzZWxmLmF1dG9oaWRlZG9tID0gZmFsc2U7XHJcbiAgICAgICAgICBzZWxmLnJhaWwuY3NzKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogb3B0LmN1cnNvcm9wYWNpdHltYXhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKHNlbGYucmFpbGgpIHNlbGYucmFpbGguY3NzKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogb3B0LmN1cnNvcm9wYWNpdHltYXhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKG9wdC5hdXRvaGlkZW1vZGUgPT09IHRydWUpIHx8IChvcHQuYXV0b2hpZGVtb2RlID09PSBcImxlYXZlXCIpKSB7XHJcbiAgICAgICAgICBzZWxmLmF1dG9oaWRlZG9tID0gJCgpLmFkZChzZWxmLnJhaWwpO1xyXG4gICAgICAgICAgaWYgKGNhcC5pc2llOCkgc2VsZi5hdXRvaGlkZWRvbSA9IHNlbGYuYXV0b2hpZGVkb20uYWRkKHNlbGYuY3Vyc29yKTtcclxuICAgICAgICAgIGlmIChzZWxmLnJhaWxoKSBzZWxmLmF1dG9oaWRlZG9tID0gc2VsZi5hdXRvaGlkZWRvbS5hZGQoc2VsZi5yYWlsaCk7XHJcbiAgICAgICAgICBpZiAoc2VsZi5yYWlsaCAmJiBjYXAuaXNpZTgpIHNlbGYuYXV0b2hpZGVkb20gPSBzZWxmLmF1dG9oaWRlZG9tLmFkZChzZWxmLmN1cnNvcmgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3B0LmF1dG9oaWRlbW9kZSA9PSBcInNjcm9sbFwiKSB7XHJcbiAgICAgICAgICBzZWxmLmF1dG9oaWRlZG9tID0gJCgpLmFkZChzZWxmLnJhaWwpO1xyXG4gICAgICAgICAgaWYgKHNlbGYucmFpbGgpIHNlbGYuYXV0b2hpZGVkb20gPSBzZWxmLmF1dG9oaWRlZG9tLmFkZChzZWxmLnJhaWxoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG9wdC5hdXRvaGlkZW1vZGUgPT0gXCJjdXJzb3JcIikge1xyXG4gICAgICAgICAgc2VsZi5hdXRvaGlkZWRvbSA9ICQoKS5hZGQoc2VsZi5jdXJzb3IpO1xyXG4gICAgICAgICAgaWYgKHNlbGYucmFpbGgpIHNlbGYuYXV0b2hpZGVkb20gPSBzZWxmLmF1dG9oaWRlZG9tLmFkZChzZWxmLmN1cnNvcmgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3B0LmF1dG9oaWRlbW9kZSA9PSBcImhpZGRlblwiKSB7XHJcbiAgICAgICAgICBzZWxmLmF1dG9oaWRlZG9tID0gZmFsc2U7XHJcbiAgICAgICAgICBzZWxmLmhpZGUoKTtcclxuICAgICAgICAgIHNlbGYucmFpbHNsb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYXAuY2FudG91Y2ggfHwgc2VsZi5pc3RvdWNoY2FwYWJsZSB8fCBvcHQuZW11bGF0ZXRvdWNoIHx8IGNhcC5oYXNtc3RvdWNoKSB7XHJcblxyXG4gICAgICAgICAgc2VsZi5zY3JvbGxtb20gPSBuZXcgU2Nyb2xsTW9tZW50dW1DbGFzczJEKHNlbGYpO1xyXG5cclxuICAgICAgICAgIHZhciBkZWxheWVkY2xpY2sgPSBudWxsO1xyXG5cclxuICAgICAgICAgIHNlbGYub250b3VjaHN0YXJ0ID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmxvY2tlZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy9pZiAoZS5wb2ludGVyVHlwZSAmJiBlLnBvaW50ZXJUeXBlICE9IDIgJiYgZS5wb2ludGVyVHlwZSAhPSBcInRvdWNoXCIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGUucG9pbnRlclR5cGUgJiYgKGUucG9pbnRlclR5cGUgPT09ICdtb3VzZScgfHwgZS5wb2ludGVyVHlwZSA9PT0gZS5NU1BPSU5URVJfVFlQRV9NT1VTRSkpIHJldHVybiBmYWxzZTsgIC8vIG5lZWQgdGVzdCBvbiBzdXJmYWNlISFcclxuXHJcbiAgICAgICAgICAgIHNlbGYuaGFzbW92aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5zY3JvbGxtb20udGltZXIpIHtcclxuICAgICAgICAgICAgICBzZWxmLnRyaWdnZXJTY3JvbGxFbmQoKTtcclxuICAgICAgICAgICAgICBzZWxmLnNjcm9sbG1vbS5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghc2VsZi5yYWlsc2xvY2tlZCkge1xyXG4gICAgICAgICAgICAgIHZhciB0ZyA9IHNlbGYuZ2V0VGFyZ2V0KGUpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAodGcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBza3AgPSAoL0lOUFVUL2kudGVzdCh0Zy5ub2RlTmFtZSkpICYmICgvcmFuZ2UvaS50ZXN0KHRnLnR5cGUpKTtcclxuICAgICAgICAgICAgICAgIGlmIChza3ApIHJldHVybiBzZWxmLnN0b3BQcm9wYWdhdGlvbihlKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHZhciBpc21vdXNlID0gKGUudHlwZSA9PT0gXCJtb3VzZWRvd25cIik7XHJcblxyXG4gICAgICAgICAgICAgIGlmICghKFwiY2xpZW50WFwiIGluIGUpICYmIChcImNoYW5nZWRUb3VjaGVzXCIgaW4gZSkpIHtcclxuICAgICAgICAgICAgICAgIGUuY2xpZW50WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmIChzZWxmLmZvcmNlc2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGUgPSBlO1xyXG4gICAgICAgICAgICAgICAgZSA9IHtcclxuICAgICAgICAgICAgICAgICAgXCJvcmlnaW5hbFwiOiAoZS5vcmlnaW5hbCkgPyBlLm9yaWdpbmFsIDogZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGUuY2xpZW50WCA9IGxlLnNjcmVlblg7XHJcbiAgICAgICAgICAgICAgICBlLmNsaWVudFkgPSBsZS5zY3JlZW5ZO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgc2VsZi5yYWlsLmRyYWcgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBlLmNsaWVudFgsXHJcbiAgICAgICAgICAgICAgICB5OiBlLmNsaWVudFksXHJcbiAgICAgICAgICAgICAgICBzeDogc2VsZi5zY3JvbGwueCxcclxuICAgICAgICAgICAgICAgIHN5OiBzZWxmLnNjcm9sbC55LFxyXG4gICAgICAgICAgICAgICAgc3Q6IHNlbGYuZ2V0U2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICAgICAgICBzbDogc2VsZi5nZXRTY3JvbGxMZWZ0KCksXHJcbiAgICAgICAgICAgICAgICBwdDogMixcclxuICAgICAgICAgICAgICAgIGRsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRnOiB0Z1xyXG4gICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgIGlmIChzZWxmLmlzcGFnZSB8fCAhb3B0LmRpcmVjdGlvbmxvY2tkZWFkem9uZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYucmFpbC5kcmFnLmRsID0gXCJmXCI7XHJcblxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSB7XHJcbiAgICAgICAgICAgICAgICAgIHc6ICR3aW5kb3cud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgaDogJHdpbmRvdy5oZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGFnZSA9IHNlbGYuZ2V0Q29udGVudFNpemUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbWF4aCA9IHBhZ2UuaCAtIHZpZXcuaDtcclxuICAgICAgICAgICAgICAgIHZhciBtYXh3ID0gcGFnZS53IC0gdmlldy53O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnJhaWwuc2Nyb2xsYWJsZSAmJiAhc2VsZi5yYWlsaC5zY3JvbGxhYmxlKSBzZWxmLnJhaWwuZHJhZy5jayA9IChtYXhoID4gMCkgPyBcInZcIiA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIXNlbGYucmFpbC5zY3JvbGxhYmxlICYmIHNlbGYucmFpbGguc2Nyb2xsYWJsZSkgc2VsZi5yYWlsLmRyYWcuY2sgPSAobWF4dyA+IDApID8gXCJoXCIgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2Ugc2VsZi5yYWlsLmRyYWcuY2sgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAob3B0LmVtdWxhdGV0b3VjaCAmJiBzZWxmLmlzaWZyYW1lICYmIGNhcC5pc2llKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd3AgPSBzZWxmLndpbi5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yYWlsLmRyYWcueCArPSB3cC5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yYWlsLmRyYWcueSArPSB3cC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBzZWxmLmhhc21vdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHNlbGYubGFzdG1vdXNldXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICBzZWxmLnNjcm9sbG1vbS5yZXNldChlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcblxyXG4gICAgICAgICAgICAgIGlmICh0ZyYmaXNtb3VzZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpcCA9IC9JTlBVVHxTRUxFQ1R8QlVUVE9OfFRFWFRBUkVBL2kudGVzdCh0Zy5ub2RlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChjYXAuaGFzbW91c2VjYXB0dXJlKSB0Zy5zZXRDYXB0dXJlKCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChvcHQuZW11bGF0ZXRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRnLm9uY2xpY2sgJiYgISh0Zy5fb25jbGljayB8fCBmYWxzZSkpIHsgLy8gaW50ZXJjZXB0IERPTTAgb25jbGljayBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGcuX29uY2xpY2sgPSB0Zy5vbmNsaWNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGcub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmhhc21vdmluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Zy5fb25jbGljay5jYWxsKHRoaXMsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY2FuY2VsRXZlbnQoZSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuc3RvcFByb3BhZ2F0aW9uKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgvU1VCTUlUfENBTkNFTHxCVVRUT04vaS50ZXN0KCQodGcpLmF0dHIoJ3R5cGUnKSkpIHtcclxuICAgICAgICAgICAgICAgICAgc2VsZi5wcmV2ZW50Y2xpY2sgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0Z1wiOiB0ZyxcclxuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgc2VsZi5vbnRvdWNoZW5kID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghc2VsZi5yYWlsLmRyYWcpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYucmFpbC5kcmFnLnB0ID09IDIpIHtcclxuICAgICAgICAgICAgICAvL2lmIChlLnBvaW50ZXJUeXBlICYmIGUucG9pbnRlclR5cGUgIT0gMiAmJiBlLnBvaW50ZXJUeXBlICE9IFwidG91Y2hcIikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChlLnBvaW50ZXJUeXBlICYmIChlLnBvaW50ZXJUeXBlID09PSAnbW91c2UnIHx8IGUucG9pbnRlclR5cGUgPT09IGUuTVNQT0lOVEVSX1RZUEVfTU9VU0UpKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgIHNlbGYucmFpbC5kcmFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgIHZhciBpc21vdXNlID0gKGUudHlwZSA9PT0gXCJtb3VzZXVwXCIpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoc2VsZi5oYXNtb3ZpbmcpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsbW9tLmRvTW9tZW50dW0oKTtcclxuICAgICAgICAgICAgICAgIHNlbGYubGFzdG1vdXNldXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlQ3Vyc29yKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FwLmhhc21vdXNlY2FwdHVyZSkgX2RvYy5yZWxlYXNlQ2FwdHVyZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzbW91c2UpIHJldHVybiBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5yYWlsLmRyYWcucHQgPT0gMSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBzZWxmLm9ubW91c2V1cChlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgdmFyIG1vdmVuZWVkb2Zmc2V0ID0gKG9wdC5lbXVsYXRldG91Y2ggJiYgc2VsZi5pc2lmcmFtZSAmJiAhY2FwLmhhc21vdXNlY2FwdHVyZSk7XHJcblxyXG4gICAgICAgICAgdmFyIGxvY2t0b2xsZXJhbmNlID0gb3B0LmRpcmVjdGlvbmxvY2tkZWFkem9uZSAqIDAuMyB8IDA7XHJcblxyXG4gICAgICAgICAgc2VsZi5vbnRvdWNobW92ZSA9IGZ1bmN0aW9uIChlLCBieWlmcmFtZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzZWxmLnJhaWwuZHJhZykgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIG9wdC5wcmV2ZW50bXVsdGl0b3VjaHNjcm9sbGluZykge1xyXG4gICAgICAgICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMubGVuZ3RoID4gMSkgcmV0dXJuIHRydWU7IC8vIG11bHRpdG91Y2hcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9pZiAoZS5wb2ludGVyVHlwZSAmJiBlLnBvaW50ZXJUeXBlICE9IDIgJiYgZS5wb2ludGVyVHlwZSAhPSBcInRvdWNoXCIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGUucG9pbnRlclR5cGUgJiYgKGUucG9pbnRlclR5cGUgPT09ICdtb3VzZScgfHwgZS5wb2ludGVyVHlwZSA9PT0gZS5NU1BPSU5URVJfVFlQRV9NT1VTRSkpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYucmFpbC5kcmFnLnB0ID09IDIpIHtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKChcImNoYW5nZWRUb3VjaGVzXCIgaW4gZSkpIHtcclxuICAgICAgICAgICAgICAgIGUuY2xpZW50WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHZhciBvZnksIG9meDtcclxuICAgICAgICAgICAgICBvZnggPSBvZnkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICBpZiAobW92ZW5lZWRvZmZzZXQgJiYgIWJ5aWZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd3AgPSBzZWxmLndpbi5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgb2Z4ID0gLXdwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBvZnkgPSAtd3AudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgdmFyIGZ5ID0gZS5jbGllbnRZICsgb2Z5O1xyXG4gICAgICAgICAgICAgIHZhciBteSA9IChmeSAtIHNlbGYucmFpbC5kcmFnLnkpO1xyXG4gICAgICAgICAgICAgIHZhciBmeCA9IGUuY2xpZW50WCArIG9meDtcclxuICAgICAgICAgICAgICB2YXIgbXggPSAoZnggLSBzZWxmLnJhaWwuZHJhZy54KTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIG55ID0gc2VsZi5yYWlsLmRyYWcuc3QgLSBteTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYuaXNod3Njcm9sbCAmJiBvcHQuYm91bmNlc2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobnkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIG55ID0gTWF0aC5yb3VuZChueSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChueSA+IHNlbGYucGFnZS5tYXhoKSB7XHJcbiAgICAgICAgICAgICAgICAgIG55ID0gc2VsZi5wYWdlLm1heGggKyBNYXRoLnJvdW5kKChueSAtIHNlbGYucGFnZS5tYXhoKSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobnkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIG55ID0gMDtcclxuICAgICAgICAgICAgICAgICAgZnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobnkgPiBzZWxmLnBhZ2UubWF4aCkge1xyXG4gICAgICAgICAgICAgICAgICBueSA9IHNlbGYucGFnZS5tYXhoO1xyXG4gICAgICAgICAgICAgICAgICBmeSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZnkgPT09IDAgJiYgIXNlbGYuaGFzbW92aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5pc3BhZ2UpIHNlbGYucmFpbC5kcmFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgdmFyIG54ID0gc2VsZi5nZXRTY3JvbGxMZWZ0KCk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChzZWxmLnJhaWxoICYmIHNlbGYucmFpbGguc2Nyb2xsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgbnggPSAoc2VsZi5pc3J0bG1vZGUpID8gbXggLSBzZWxmLnJhaWwuZHJhZy5zbCA6IHNlbGYucmFpbC5kcmFnLnNsIC0gbXg7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuaXNod3Njcm9sbCAmJiBvcHQuYm91bmNlc2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChueCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBueCA9IE1hdGgucm91bmQobnggLyAyKTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChueCA+IHNlbGYucGFnZS5tYXh3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnggPSBzZWxmLnBhZ2UubWF4dyArIE1hdGgucm91bmQoKG54IC0gc2VsZi5wYWdlLm1heHcpIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChueCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBueCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZnggPSAwO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGlmIChueCA+IHNlbGYucGFnZS5tYXh3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnggPSBzZWxmLnBhZ2UubWF4dztcclxuICAgICAgICAgICAgICAgICAgICBmeCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgaWYgKCFzZWxmLmhhc21vdmluZykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnJhaWwuZHJhZy55ID09PSBlLmNsaWVudFkgJiYgc2VsZi5yYWlsLmRyYWcueCA9PT0gZS5jbGllbnRYKSByZXR1cm4gc2VsZi5jYW5jZWxFdmVudChlKTsgIC8vIHByZXZlbnQgZmlyc3QgdXNlbGVzcyBtb3ZlIGV2ZW50XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGF5ID0gTWF0aC5hYnMobXkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGF4ID0gTWF0aC5hYnMobXgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGR6ID0gb3B0LmRpcmVjdGlvbmxvY2tkZWFkem9uZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYucmFpbC5kcmFnLmNrKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChheSA+IGR6ICYmIGF4ID4gZHopIHNlbGYucmFpbC5kcmFnLmRsID0gXCJmXCI7XHJcbiAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF5ID4gZHopIHNlbGYucmFpbC5kcmFnLmRsID0gKGF4ID4gbG9ja3RvbGxlcmFuY2UpID8gXCJmXCIgOiBcInZcIjtcclxuICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXggPiBkeikgc2VsZi5yYWlsLmRyYWcuZGwgPSAoYXkgPiBsb2NrdG9sbGVyYW5jZSkgPyBcImZcIiA6IFwiaFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5yYWlsLmRyYWcuY2sgPT0gXCJ2XCIpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKGF4ID4gZHogJiYgYXkgPD0gbG9ja3RvbGxlcmFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJhaWwuZHJhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF5ID4gZHopIHNlbGYucmFpbC5kcmFnLmRsID0gXCJ2XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5yYWlsLmRyYWcuY2sgPT0gXCJoXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChheSA+IGR6ICYmIGF4IDw9IGxvY2t0b2xsZXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yYWlsLmRyYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBlbHNlIGlmIChheCA+IGR6KSBzZWxmLnJhaWwuZHJhZy5kbCA9IFwiaFwiO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYucmFpbC5kcmFnLmRsKSByZXR1cm4gc2VsZi5jYW5jZWxFdmVudChlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXJTY3JvbGxTdGFydChlLmNsaWVudFgsIGUuY2xpZW50WSwgMCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmhhc21vdmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAoc2VsZi5wcmV2ZW50Y2xpY2sgJiYgIXNlbGYucHJldmVudGNsaWNrLmNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnByZXZlbnRjbGljay5jbGljayA9IHNlbGYucHJldmVudGNsaWNrLnRnLm9uY2xpY2sgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnByZXZlbnRjbGljay50Zy5vbmNsaWNrID0gc2VsZi5vbnByZXZlbnRjbGljaztcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmIChzZWxmLnJhaWwuZHJhZy5kbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucmFpbC5kcmFnLmRsID09IFwidlwiKSBueCA9IHNlbGYucmFpbC5kcmFnLnNsO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5yYWlsLmRyYWcuZGwgPT0gXCJoXCIpIG55ID0gc2VsZi5yYWlsLmRyYWcuc3Q7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBzZWxmLnN5bmNoZWQoXCJ0b3VjaG1vdmVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucmFpbC5kcmFnICYmIChzZWxmLnJhaWwuZHJhZy5wdCA9PSAyKSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoc2VsZi5wcmVwYXJlVHJhbnNpdGlvbikgc2VsZi5yZXNldFRyYW5zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgaWYgKHNlbGYucmFpbC5zY3JvbGxhYmxlKSBzZWxmLnNldFNjcm9sbFRvcChueSk7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsbW9tLnVwZGF0ZShmeCwgZnkpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoc2VsZi5yYWlsaCAmJiBzZWxmLnJhaWxoLnNjcm9sbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFNjcm9sbExlZnQobngpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0N1cnNvcihueSwgbngpO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0N1cnNvcihueSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgaWYgKGNhcC5pc2llMTApIF9kb2Muc2VsZWN0aW9uLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzZWxmLnJhaWwuZHJhZy5wdCA9PSAxKSB7IC8vIGRyYWcgb24gY3Vyc29yXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHNlbGYub25tb3VzZW1vdmUoZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIHNlbGYub250b3VjaHN0YXJ0Q3Vyc29yID0gZnVuY3Rpb24gKGUsIGhyb25seSkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5yYWlsLmRyYWcgJiYgc2VsZi5yYWlsLmRyYWcucHQgIT0gMykgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5sb2NrZWQpIHJldHVybiBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG4gICAgICAgICAgICBzZWxmLmNhbmNlbFNjcm9sbCgpO1xyXG4gICAgICAgICAgICBzZWxmLnJhaWwuZHJhZyA9IHtcclxuICAgICAgICAgICAgICB4OiBlLnRvdWNoZXNbMF0uY2xpZW50WCxcclxuICAgICAgICAgICAgICB5OiBlLnRvdWNoZXNbMF0uY2xpZW50WSxcclxuICAgICAgICAgICAgICBzeDogc2VsZi5zY3JvbGwueCxcclxuICAgICAgICAgICAgICBzeTogc2VsZi5zY3JvbGwueSxcclxuICAgICAgICAgICAgICBwdDogMyxcclxuICAgICAgICAgICAgICBocjogKCEhaHJvbmx5KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgdGcgPSBzZWxmLmdldFRhcmdldChlKTtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLmlzcGFnZSAmJiBjYXAuaGFzbW91c2VjYXB0dXJlKSB0Zy5zZXRDYXB0dXJlKCk7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmlzaWZyYW1lICYmICFjYXAuaGFzbW91c2VjYXB0dXJlKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5zYXZlZC5jc3Nwb2ludGVyZXZlbnRzID0gc2VsZi5kb2MuY3NzKFwicG9pbnRlci1ldmVudHNcIik7XHJcbiAgICAgICAgICAgICAgc2VsZi5jc3Moc2VsZi5kb2MsIHsgXCJwb2ludGVyLWV2ZW50c1wiOiBcIm5vbmVcIiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5jYW5jZWxFdmVudChlKTtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgc2VsZi5vbnRvdWNoZW5kQ3Vyc29yID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYucmFpbC5kcmFnKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNhcC5oYXNtb3VzZWNhcHR1cmUpIF9kb2MucmVsZWFzZUNhcHR1cmUoKTtcclxuICAgICAgICAgICAgICBpZiAoc2VsZi5pc2lmcmFtZSAmJiAhY2FwLmhhc21vdXNlY2FwdHVyZSkgc2VsZi5kb2MuY3NzKFwicG9pbnRlci1ldmVudHNcIiwgc2VsZi5zYXZlZC5jc3Nwb2ludGVyZXZlbnRzKTtcclxuICAgICAgICAgICAgICBpZiAoc2VsZi5yYWlsLmRyYWcucHQgIT0gMykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIHNlbGYucmFpbC5kcmFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY2FuY2VsRXZlbnQoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgc2VsZi5vbnRvdWNobW92ZUN1cnNvciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLnJhaWwuZHJhZykge1xyXG4gICAgICAgICAgICAgIGlmIChzZWxmLnJhaWwuZHJhZy5wdCAhPSAzKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgIHNlbGYuY3Vyc29yZnJlZXplZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChzZWxmLnJhaWwuZHJhZy5ocikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zY3JvbGwueCA9IHNlbGYucmFpbC5kcmFnLnN4ICsgKGUudG91Y2hlc1swXS5jbGllbnRYIC0gc2VsZi5yYWlsLmRyYWcueCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zY3JvbGwueCA8IDApIHNlbGYuc2Nyb2xsLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIG13ID0gc2VsZi5zY3JvbGx2YWx1ZW1heHc7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zY3JvbGwueCA+IG13KSBzZWxmLnNjcm9sbC54ID0gbXc7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsLnkgPSBzZWxmLnJhaWwuZHJhZy5zeSArIChlLnRvdWNoZXNbMF0uY2xpZW50WSAtIHNlbGYucmFpbC5kcmFnLnkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2Nyb2xsLnkgPCAwKSBzZWxmLnNjcm9sbC55ID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBteSA9IHNlbGYuc2Nyb2xsdmFsdWVtYXg7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zY3JvbGwueSA+IG15KSBzZWxmLnNjcm9sbC55ID0gbXk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBzZWxmLnN5bmNoZWQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnJhaWwuZHJhZyAmJiAoc2VsZi5yYWlsLmRyYWcucHQgPT0gMykpIHtcclxuICAgICAgICAgICAgICAgICAgc2VsZi5zaG93Q3Vyc29yKCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnJhaWwuZHJhZy5ocikgc2VsZi5kb1Njcm9sbExlZnQoTWF0aC5yb3VuZChzZWxmLnNjcm9sbC54ICogc2VsZi5zY3JvbGxyYXRpby54KSwgb3B0LmN1cnNvcmRyYWdzcGVlZCk7XHJcbiAgICAgICAgICAgICAgICAgIGVsc2Ugc2VsZi5kb1Njcm9sbFRvcChNYXRoLnJvdW5kKHNlbGYuc2Nyb2xsLnkgKiBzZWxmLnNjcm9sbHJhdGlvLnkpLCBvcHQuY3Vyc29yZHJhZ3NwZWVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuY2FuY2VsRXZlbnQoZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoZSwgaHJvbmx5KSB7XHJcbiAgICAgICAgICBpZiAoc2VsZi5yYWlsLmRyYWcgJiYgc2VsZi5yYWlsLmRyYWcucHQgIT0gMSkgcmV0dXJuO1xyXG4gICAgICAgICAgaWYgKHNlbGYucmFpbHNsb2NrZWQpIHJldHVybiBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG4gICAgICAgICAgc2VsZi5jYW5jZWxTY3JvbGwoKTtcclxuICAgICAgICAgIHNlbGYucmFpbC5kcmFnID0ge1xyXG4gICAgICAgICAgICB4OiBlLmNsaWVudFgsXHJcbiAgICAgICAgICAgIHk6IGUuY2xpZW50WSxcclxuICAgICAgICAgICAgc3g6IHNlbGYuc2Nyb2xsLngsXHJcbiAgICAgICAgICAgIHN5OiBzZWxmLnNjcm9sbC55LFxyXG4gICAgICAgICAgICBwdDogMSxcclxuICAgICAgICAgICAgaHI6IGhyb25seSB8fCBmYWxzZVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHZhciB0ZyA9IHNlbGYuZ2V0VGFyZ2V0KGUpO1xyXG5cclxuICAgICAgICAgIGlmIChjYXAuaGFzbW91c2VjYXB0dXJlKSB0Zy5zZXRDYXB0dXJlKCk7XHJcbiAgICAgICAgICBpZiAoc2VsZi5pc2lmcmFtZSAmJiAhY2FwLmhhc21vdXNlY2FwdHVyZSkge1xyXG4gICAgICAgICAgICBzZWxmLnNhdmVkLmNzc3BvaW50ZXJldmVudHMgPSBzZWxmLmRvYy5jc3MoXCJwb2ludGVyLWV2ZW50c1wiKTtcclxuICAgICAgICAgICAgc2VsZi5jc3Moc2VsZi5kb2MsIHtcclxuICAgICAgICAgICAgICBcInBvaW50ZXItZXZlbnRzXCI6IFwibm9uZVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2VsZi5oYXNtb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHJldHVybiBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNlbGYub25tb3VzZXVwID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIGlmIChzZWxmLnJhaWwuZHJhZykge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5yYWlsLmRyYWcucHQgIT0gMSkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FwLmhhc21vdXNlY2FwdHVyZSkgX2RvYy5yZWxlYXNlQ2FwdHVyZSgpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5pc2lmcmFtZSAmJiAhY2FwLmhhc21vdXNlY2FwdHVyZSkgc2VsZi5kb2MuY3NzKFwicG9pbnRlci1ldmVudHNcIiwgc2VsZi5zYXZlZC5jc3Nwb2ludGVyZXZlbnRzKTtcclxuICAgICAgICAgICAgc2VsZi5yYWlsLmRyYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2VsZi5jdXJzb3JmcmVlemVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmhhc21vdmluZykgc2VsZi50cmlnZ2VyU2Nyb2xsRW5kKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNlbGYub25tb3VzZW1vdmUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgaWYgKHNlbGYucmFpbC5kcmFnKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLnJhaWwuZHJhZy5wdCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNhcC5pc2Nocm9tZSAmJiBlLndoaWNoID09PSAwKSByZXR1cm4gc2VsZi5vbm1vdXNldXAoZSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmN1cnNvcmZyZWV6ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzZWxmLmhhc21vdmluZykgc2VsZi50cmlnZ2VyU2Nyb2xsU3RhcnQoZS5jbGllbnRYLCBlLmNsaWVudFksIDAsIDAsIDApO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5oYXNtb3ZpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYucmFpbC5kcmFnLmhyKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5zY3JvbGwueCA9IHNlbGYucmFpbC5kcmFnLnN4ICsgKGUuY2xpZW50WCAtIHNlbGYucmFpbC5kcmFnLngpO1xyXG4gICAgICAgICAgICAgIGlmIChzZWxmLnNjcm9sbC54IDwgMCkgc2VsZi5zY3JvbGwueCA9IDA7XHJcbiAgICAgICAgICAgICAgdmFyIG13ID0gc2VsZi5zY3JvbGx2YWx1ZW1heHc7XHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc2Nyb2xsLnggPiBtdykgc2VsZi5zY3JvbGwueCA9IG13O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHNlbGYuc2Nyb2xsLnkgPSBzZWxmLnJhaWwuZHJhZy5zeSArIChlLmNsaWVudFkgLSBzZWxmLnJhaWwuZHJhZy55KTtcclxuICAgICAgICAgICAgICBpZiAoc2VsZi5zY3JvbGwueSA8IDApIHNlbGYuc2Nyb2xsLnkgPSAwO1xyXG4gICAgICAgICAgICAgIHZhciBteSA9IHNlbGYuc2Nyb2xsdmFsdWVtYXg7XHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc2Nyb2xsLnkgPiBteSkgc2VsZi5zY3JvbGwueSA9IG15O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLnN5bmNoZWQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY3Vyc29yZnJlZXplZCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zaG93Q3Vyc29yKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucmFpbC5kcmFnLmhyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsTGVmdChNYXRoLnJvdW5kKHNlbGYuc2Nyb2xsLnggKiBzZWxmLnNjcm9sbHJhdGlvLngpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsVG9wKE1hdGgucm91bmQoc2VsZi5zY3JvbGwueSAqIHNlbGYuc2Nyb2xscmF0aW8ueSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuY2FuY2VsRXZlbnQoZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5jaGVja2FyZWEgPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChjYXAuY2FudG91Y2ggfHwgb3B0LmVtdWxhdGV0b3VjaCkge1xyXG5cclxuICAgICAgICAgIHNlbGYub25wcmV2ZW50Y2xpY2sgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5wcmV2ZW50Y2xpY2spIHtcclxuICAgICAgICAgICAgICBzZWxmLnByZXZlbnRjbGljay50Zy5vbmNsaWNrID0gc2VsZi5wcmV2ZW50Y2xpY2suY2xpY2s7XHJcbiAgICAgICAgICAgICAgc2VsZi5wcmV2ZW50Y2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jYW5jZWxFdmVudChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICBzZWxmLm9uY2xpY2sgPSAoY2FwLmlzaW9zKSA/IGZhbHNlIDogZnVuY3Rpb24gKGUpIHsgIC8vIGl0IG5lZWRzIHRvIGNoZWNrIElFMTEgPz8/XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmxhc3Rtb3VzZXVwKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5sYXN0bW91c2V1cCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHJldHVybiBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIGlmIChvcHQuZ3JhYmN1cnNvcmVuYWJsZWQgJiYgY2FwLmN1cnNvcmdyYWJ2YWx1ZSkge1xyXG4gICAgICAgICAgICBzZWxmLmNzcygoc2VsZi5pc3BhZ2UpID8gc2VsZi5kb2MgOiBzZWxmLndpbiwge1xyXG4gICAgICAgICAgICAgICdjdXJzb3InOiBjYXAuY3Vyc29yZ3JhYnZhbHVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLmNzcyhzZWxmLnJhaWwsIHtcclxuICAgICAgICAgICAgICAnY3Vyc29yJzogY2FwLmN1cnNvcmdyYWJ2YWx1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICB2YXIgY2hlY2tTZWxlY3Rpb25TY3JvbGwgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuc2VsZWN0aW9uZHJhZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKGUpIHtcclxuICAgICAgICAgICAgICB2YXIgd3cgPSBzZWxmLndpbi5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgIHZhciBkZiA9IChlLnBhZ2VZIC0gc2VsZi5zZWxlY3Rpb25kcmFnLnRvcCk7XHJcbiAgICAgICAgICAgICAgaWYgKGRmID4gMCAmJiBkZiA8IHd3KSBkZiA9IDA7XHJcbiAgICAgICAgICAgICAgaWYgKGRmID49IHd3KSBkZiAtPSB3dztcclxuICAgICAgICAgICAgICBzZWxmLnNlbGVjdGlvbmRyYWcuZGYgPSBkZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3Rpb25kcmFnLmRmID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgcnQgPSAtKHNlbGYuc2VsZWN0aW9uZHJhZy5kZioyLzYpfDA7XHJcbiAgICAgICAgICAgIHNlbGYuZG9TY3JvbGxCeShydCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmRlYm91bmNlZChcImRvc2VsZWN0aW9uc2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBjaGVja1NlbGVjdGlvblNjcm9sbCgpO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIGlmIChcImdldFNlbGVjdGlvblwiIGluIF9kb2MpIHsgLy8gQSBncmFkZSAtIE1ham9yIGJyb3dzZXJzXHJcbiAgICAgICAgICAgIHNlbGYuaGFzVGV4dFNlbGVjdGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoX2RvYy5nZXRTZWxlY3Rpb24oKS5yYW5nZUNvdW50ID4gMCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKFwic2VsZWN0aW9uXCIgaW4gX2RvYykgeyAvL0lFOS1cclxuICAgICAgICAgICAgc2VsZi5oYXNUZXh0U2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChfZG9jLnNlbGVjdGlvbi50eXBlICE9IFwiTm9uZVwiKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuaGFzVGV4dFNlbGVjdGVkID0gZnVuY3Rpb24gKCkgeyAvLyBubyBzdXBwb3J0XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNlbGYub25zZWxlY3Rpb25zdGFydCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vICBNb3JlIHRlc3RpbmcgLSBzZXZlcmUgY2hyb21lIGlzc3Vlc1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5oYXN3cmFwcGVyJiYoZS53aGljaCYmZS53aGljaD09MikpIHsgIC8vIGZvb2wgYnJvd3NlciB0byBtYW5hZ2UgbWlkZGxlIGJ1dHRvbiBzY3JvbGxpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luLmNzcyh7J292ZXJmbG93JzonYXV0byd9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW4uY3NzKHsnb3ZlcmZsb3cnOidoaWRkZW4nfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKHNlbGYuaXNwYWdlKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0aW9uZHJhZyA9IHNlbGYud2luLm9mZnNldCgpO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICBzZWxmLm9uc2VsZWN0aW9uZW5kID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3Rpb25kcmFnID0gZmFsc2U7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgc2VsZi5vbnNlbGVjdGlvbmRyYWcgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuc2VsZWN0aW9uZHJhZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5oYXNUZXh0U2VsZWN0ZWQoKSkgc2VsZi5kZWJvdW5jZWQoXCJzZWxlY3Rpb25zY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGNoZWNrU2VsZWN0aW9uU2Nyb2xsKGUpO1xyXG4gICAgICAgICAgICB9LCAyNTApO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYXAuaGFzdzNjdG91Y2gpIHsgLy9JRTExK1xyXG4gICAgICAgICAgc2VsZi5jc3MoKHNlbGYuaXNwYWdlKSA/ICQoXCJodG1sXCIpIDogc2VsZi53aW4sIHsgJ3RvdWNoLWFjdGlvbic6ICdub25lJyB9KTtcclxuICAgICAgICAgIHNlbGYuY3NzKHNlbGYucmFpbCwge1xyXG4gICAgICAgICAgICAndG91Y2gtYWN0aW9uJzogJ25vbmUnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbGYuY3NzKHNlbGYuY3Vyc29yLCB7XHJcbiAgICAgICAgICAgICd0b3VjaC1hY3Rpb24nOiAnbm9uZSdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VsZi5iaW5kKHNlbGYud2luLCBcInBvaW50ZXJkb3duXCIsIHNlbGYub250b3VjaHN0YXJ0KTtcclxuICAgICAgICAgIHNlbGYuYmluZChfZG9jLCBcInBvaW50ZXJ1cFwiLCBzZWxmLm9udG91Y2hlbmQpO1xyXG4gICAgICAgICAgc2VsZi5kZWxlZ2F0ZShfZG9jLCBcInBvaW50ZXJtb3ZlXCIsIHNlbGYub250b3VjaG1vdmUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2FwLmhhc21zdG91Y2gpIHsgLy9JRTEwXHJcbiAgICAgICAgICBzZWxmLmNzcygoc2VsZi5pc3BhZ2UpID8gJChcImh0bWxcIikgOiBzZWxmLndpbiwgeyAnLW1zLXRvdWNoLWFjdGlvbic6ICdub25lJyB9KTtcclxuICAgICAgICAgIHNlbGYuY3NzKHNlbGYucmFpbCwge1xyXG4gICAgICAgICAgICAnLW1zLXRvdWNoLWFjdGlvbic6ICdub25lJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZWxmLmNzcyhzZWxmLmN1cnNvciwge1xyXG4gICAgICAgICAgICAnLW1zLXRvdWNoLWFjdGlvbic6ICdub25lJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZWxmLmJpbmQoc2VsZi53aW4sIFwiTVNQb2ludGVyRG93blwiLCBzZWxmLm9udG91Y2hzdGFydCk7XHJcbiAgICAgICAgICBzZWxmLmJpbmQoX2RvYywgXCJNU1BvaW50ZXJVcFwiLCBzZWxmLm9udG91Y2hlbmQpO1xyXG4gICAgICAgICAgc2VsZi5kZWxlZ2F0ZShfZG9jLCBcIk1TUG9pbnRlck1vdmVcIiwgc2VsZi5vbnRvdWNobW92ZSk7XHJcbiAgICAgICAgICBzZWxmLmJpbmQoc2VsZi5jdXJzb3IsIFwiTVNHZXN0dXJlSG9sZFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbGYuYmluZChzZWxmLmN1cnNvciwgXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNhcC5jYW50b3VjaCkgeyAvLyBzbWFydHBob25lcy90b3VjaCBkZXZpY2VzXHJcbiAgICAgICAgICBzZWxmLmJpbmQoc2VsZi53aW4sIFwidG91Y2hzdGFydFwiLCBzZWxmLm9udG91Y2hzdGFydCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgc2VsZi5iaW5kKF9kb2MsIFwidG91Y2hlbmRcIiwgc2VsZi5vbnRvdWNoZW5kLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICBzZWxmLmJpbmQoX2RvYywgXCJ0b3VjaGNhbmNlbFwiLCBzZWxmLm9udG91Y2hlbmQsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgIHNlbGYuZGVsZWdhdGUoX2RvYywgXCJ0b3VjaG1vdmVcIiwgc2VsZi5vbnRvdWNobW92ZSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdC5lbXVsYXRldG91Y2gpIHtcclxuICAgICAgICAgIHNlbGYuYmluZChzZWxmLndpbiwgXCJtb3VzZWRvd25cIiwgc2VsZi5vbnRvdWNoc3RhcnQsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgIHNlbGYuYmluZChfZG9jLCBcIm1vdXNldXBcIiwgc2VsZi5vbnRvdWNoZW5kLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICBzZWxmLmJpbmQoX2RvYywgXCJtb3VzZW1vdmVcIiwgc2VsZi5vbnRvdWNobW92ZSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdC5jdXJzb3JkcmFnb250b3VjaCB8fCAoIWNhcC5jYW50b3VjaCAmJiAhb3B0LmVtdWxhdGV0b3VjaCkpIHtcclxuXHJcbiAgICAgICAgICBzZWxmLnJhaWwuY3NzKHtcclxuICAgICAgICAgICAgY3Vyc29yOiBcImRlZmF1bHRcIlxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZWxmLnJhaWxoICYmIHNlbGYucmFpbGguY3NzKHtcclxuICAgICAgICAgICAgY3Vyc29yOiBcImRlZmF1bHRcIlxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgc2VsZi5qcWJpbmQoc2VsZi5yYWlsLCBcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuaXNwYWdlICYmICFzZWxmLndpbi5pcyhcIjp2aXNpYmxlXCIpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmNhbnNob3dvbm1vdXNlZXZlbnQpIHNlbGYuc2hvd0N1cnNvcigpO1xyXG4gICAgICAgICAgICBzZWxmLnJhaWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VsZi5qcWJpbmQoc2VsZi5yYWlsLCBcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLnJhaWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5yYWlsLmRyYWcpIHNlbGYuaGlkZUN1cnNvcigpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKG9wdC5zZW5zaXRpdmVyYWlsKSB7XHJcbiAgICAgICAgICAgIHNlbGYuYmluZChzZWxmLnJhaWwsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICBzZWxmLmRvUmFpbENsaWNrKGUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLmJpbmQoc2VsZi5yYWlsLCBcImRibGNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5kb1JhaWxDbGljayhlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLmJpbmQoc2VsZi5jdXJzb3IsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5iaW5kKHNlbGYuY3Vyc29yLCBcImRibGNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5jYW5jZWxFdmVudChlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHNlbGYucmFpbGgpIHtcclxuICAgICAgICAgICAgc2VsZi5qcWJpbmQoc2VsZi5yYWlsaCwgXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBpZiAoIXNlbGYuaXNwYWdlICYmICFzZWxmLndpbi5pcyhcIjp2aXNpYmxlXCIpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2Fuc2hvd29ubW91c2VldmVudCkgc2VsZi5zaG93Q3Vyc29yKCk7XHJcbiAgICAgICAgICAgICAgc2VsZi5yYWlsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLmpxYmluZChzZWxmLnJhaWxoLCBcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIHNlbGYucmFpbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAoIXNlbGYucmFpbC5kcmFnKSBzZWxmLmhpZGVDdXJzb3IoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LnNlbnNpdGl2ZXJhaWwpIHtcclxuICAgICAgICAgICAgICBzZWxmLmJpbmQoc2VsZi5yYWlsaCwgXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kb1JhaWxDbGljayhlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgc2VsZi5iaW5kKHNlbGYucmFpbGgsIFwiZGJsY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZG9SYWlsQ2xpY2soZSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgc2VsZi5iaW5kKHNlbGYuY3Vyc29yaCwgXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jYW5jZWxFdmVudChlKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBzZWxmLmJpbmQoc2VsZi5jdXJzb3JoLCBcImRibGNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHQuY3Vyc29yZHJhZ29udG91Y2ggJiYgKHRoaXMuaXN0b3VjaGNhcGFibGUgfHwgY2FwLmNhbnRvdWNoKSkge1xyXG4gICAgICAgICAgc2VsZi5iaW5kKHNlbGYuY3Vyc29yLCBcInRvdWNoc3RhcnRcIiwgc2VsZi5vbnRvdWNoc3RhcnRDdXJzb3IpO1xyXG4gICAgICAgICAgc2VsZi5iaW5kKHNlbGYuY3Vyc29yLCBcInRvdWNobW92ZVwiLCBzZWxmLm9udG91Y2htb3ZlQ3Vyc29yKTtcclxuICAgICAgICAgIHNlbGYuYmluZChzZWxmLmN1cnNvciwgXCJ0b3VjaGVuZFwiLCBzZWxmLm9udG91Y2hlbmRDdXJzb3IpO1xyXG4gICAgICAgICAgc2VsZi5jdXJzb3JoICYmIHNlbGYuYmluZChzZWxmLmN1cnNvcmgsIFwidG91Y2hzdGFydFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBzZWxmLm9udG91Y2hzdGFydEN1cnNvcihlLCB0cnVlKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VsZi5jdXJzb3JoICYmIHNlbGYuYmluZChzZWxmLmN1cnNvcmgsIFwidG91Y2htb3ZlXCIsIHNlbGYub250b3VjaG1vdmVDdXJzb3IpO1xyXG4gICAgICAgICAgc2VsZi5jdXJzb3JoICYmIHNlbGYuYmluZChzZWxmLmN1cnNvcmgsIFwidG91Y2hlbmRcIiwgc2VsZi5vbnRvdWNoZW5kQ3Vyc29yKTtcclxuICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgaWYgKCFjYXAuY2FudG91Y2ggJiYgIW9wdC5lbXVsYXRldG91Y2gpIHtcclxuICAgICAgICBpZiAoIW9wdC5lbXVsYXRldG91Y2ggJiYgIWNhcC5pc2FuZHJvaWQgJiYgIWNhcC5pc2lvcykge1xyXG5cclxuICAgICAgICAgIHNlbGYuYmluZCgoY2FwLmhhc21vdXNlY2FwdHVyZSkgPyBzZWxmLndpbiA6IF9kb2MsIFwibW91c2V1cFwiLCBzZWxmLm9ubW91c2V1cCk7XHJcbiAgICAgICAgICBzZWxmLmJpbmQoX2RvYywgXCJtb3VzZW1vdmVcIiwgc2VsZi5vbm1vdXNlbW92ZSk7XHJcbiAgICAgICAgICBpZiAoc2VsZi5vbmNsaWNrKSBzZWxmLmJpbmQoX2RvYywgXCJjbGlja1wiLCBzZWxmLm9uY2xpY2spO1xyXG5cclxuICAgICAgICAgIHNlbGYuYmluZChzZWxmLmN1cnNvciwgXCJtb3VzZWRvd25cIiwgc2VsZi5vbm1vdXNlZG93bik7XHJcbiAgICAgICAgICBzZWxmLmJpbmQoc2VsZi5jdXJzb3IsIFwibW91c2V1cFwiLCBzZWxmLm9ubW91c2V1cCk7XHJcblxyXG4gICAgICAgICAgaWYgKHNlbGYucmFpbGgpIHtcclxuICAgICAgICAgICAgc2VsZi5iaW5kKHNlbGYuY3Vyc29yaCwgXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICBzZWxmLm9ubW91c2Vkb3duKGUsIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5iaW5kKHNlbGYuY3Vyc29yaCwgXCJtb3VzZXVwXCIsIHNlbGYub25tb3VzZXVwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoIXNlbGYuaXNwYWdlICYmIG9wdC5lbmFibGVzY3JvbGxvbnNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBzZWxmLmJpbmQoc2VsZi53aW5bMF0sIFwibW91c2Vkb3duXCIsIHNlbGYub25zZWxlY3Rpb25zdGFydCk7XHJcbiAgICAgICAgICAgIHNlbGYuYmluZChfZG9jLCBcIm1vdXNldXBcIiwgc2VsZi5vbnNlbGVjdGlvbmVuZCk7XHJcbiAgICAgICAgICAgIHNlbGYuYmluZChzZWxmLmN1cnNvciwgXCJtb3VzZXVwXCIsIHNlbGYub25zZWxlY3Rpb25lbmQpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5jdXJzb3JoKSBzZWxmLmJpbmQoc2VsZi5jdXJzb3JoLCBcIm1vdXNldXBcIiwgc2VsZi5vbnNlbGVjdGlvbmVuZCk7XHJcbiAgICAgICAgICAgIHNlbGYuYmluZChfZG9jLCBcIm1vdXNlbW92ZVwiLCBzZWxmLm9uc2VsZWN0aW9uZHJhZyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHNlbGYuem9vbSkge1xyXG4gICAgICAgICAgICBzZWxmLmpxYmluZChzZWxmLnpvb20sIFwibW91c2VlbnRlclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYuY2Fuc2hvd29ubW91c2VldmVudCkgc2VsZi5zaG93Q3Vyc29yKCk7XHJcbiAgICAgICAgICAgICAgc2VsZi5yYWlsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLmpxYmluZChzZWxmLnpvb20sIFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5yYWlsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmICghc2VsZi5yYWlsLmRyYWcpIHNlbGYuaGlkZUN1cnNvcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICBzZWxmLmJpbmQoKGNhcC5oYXNtb3VzZWNhcHR1cmUpID8gc2VsZi53aW4gOiBfZG9jLCBcIm1vdXNldXBcIiwgc2VsZi5vbnRvdWNoZW5kKTtcclxuICAgICAgICAgIGlmIChzZWxmLm9uY2xpY2spIHNlbGYuYmluZChfZG9jLCBcImNsaWNrXCIsIHNlbGYub25jbGljayk7XHJcblxyXG4gICAgICAgICAgaWYgKG9wdC5jdXJzb3JkcmFnb250b3VjaCkge1xyXG4gICAgICAgICAgICBzZWxmLmJpbmQoc2VsZi5jdXJzb3IsIFwibW91c2Vkb3duXCIsIHNlbGYub25tb3VzZWRvd24pO1xyXG4gICAgICAgICAgICBzZWxmLmJpbmQoc2VsZi5jdXJzb3IsIFwibW91c2V1cFwiLCBzZWxmLm9ubW91c2V1cCk7XHJcbiAgICAgICAgICAgIHNlbGYuY3Vyc29yaCAmJiBzZWxmLmJpbmQoc2VsZi5jdXJzb3JoLCBcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgIHNlbGYub25tb3VzZWRvd24oZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLmN1cnNvcmggJiYgc2VsZi5iaW5kKHNlbGYuY3Vyc29yaCwgXCJtb3VzZXVwXCIsIHNlbGYub25tb3VzZXVwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuYmluZChzZWxmLnJhaWwsIFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfSk7ICAvLyBwcmV2ZW50IHRleHQgc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIHNlbGYucmFpbGggJiYgc2VsZi5iaW5kKHNlbGYucmFpbGgsIFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChvcHQuZW5hYmxlbW91c2V3aGVlbCkge1xyXG4gICAgICAgICAgaWYgKCFzZWxmLmlzaWZyYW1lKSBzZWxmLm1vdXNld2hlZWwoKGNhcC5pc2llICYmIHNlbGYuaXNwYWdlKSA/IF9kb2MgOiBzZWxmLndpbiwgc2VsZi5vbm1vdXNld2hlZWwpO1xyXG4gICAgICAgICAgc2VsZi5tb3VzZXdoZWVsKHNlbGYucmFpbCwgc2VsZi5vbm1vdXNld2hlZWwpO1xyXG4gICAgICAgICAgaWYgKHNlbGYucmFpbGgpIHNlbGYubW91c2V3aGVlbChzZWxmLnJhaWxoLCBzZWxmLm9ubW91c2V3aGVlbGhyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc2VsZi5pc3BhZ2UgJiYgIWNhcC5jYW50b3VjaCAmJiAhKC9IVE1MfF5CT0RZLy50ZXN0KHNlbGYud2luWzBdLm5vZGVOYW1lKSkpIHtcclxuICAgICAgICAgIGlmICghc2VsZi53aW4uYXR0cihcInRhYmluZGV4XCIpKSBzZWxmLndpbi5hdHRyKHtcclxuICAgICAgICAgICAgXCJ0YWJpbmRleFwiOiArK3RhYmluZGV4Y291bnRlclxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgc2VsZi5iaW5kKHNlbGYud2luLCBcImZvY3VzXCIsIGZ1bmN0aW9uIChlKSB7ICAvLyBiZXR0ZXIgdXNpbmcgbmF0aXZlIGV2ZW50c1xyXG4gICAgICAgICAgICBkb21mb2N1cyA9IChzZWxmLmdldFRhcmdldChlKSkuaWQgfHwgc2VsZi5nZXRUYXJnZXQoZSkgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuaGFzZm9jdXMgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5jYW5zaG93b25tb3VzZWV2ZW50KSBzZWxmLm5vdGljZUN1cnNvcigpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZWxmLmJpbmQoc2VsZi53aW4sIFwiYmx1clwiLCBmdW5jdGlvbiAoZSkgeyAgLy8gKlxyXG4gICAgICAgICAgICBkb21mb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLmhhc2ZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBzZWxmLmJpbmQoc2VsZi53aW4sIFwibW91c2VlbnRlclwiLCBmdW5jdGlvbiAoZSkgeyAgIC8vICpcclxuICAgICAgICAgICAgbW91c2Vmb2N1cyA9IChzZWxmLmdldFRhcmdldChlKSkuaWQgfHwgc2VsZi5nZXRUYXJnZXQoZSkgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuaGFzbW91c2Vmb2N1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmNhbnNob3dvbm1vdXNlZXZlbnQpIHNlbGYubm90aWNlQ3Vyc29yKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbGYuYmluZChzZWxmLndpbiwgXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uIChlKSB7ICAgLy8gKlxyXG4gICAgICAgICAgICBtb3VzZWZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuaGFzbW91c2Vmb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYucmFpbC5kcmFnKSBzZWxmLmhpZGVDdXJzb3IoKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL1RoYW5rcyB0byBodHRwOi8vd3d3LnF1aXJrc21vZGUub3JnICEhXHJcbiAgICAgICAgc2VsZi5vbmtleXByZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIGlmIChzZWxmLnJhaWxzbG9ja2VkICYmIHNlbGYucGFnZS5tYXhoID09PSAwKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBlID0gZSB8fCBfd2luLmV2ZW50O1xyXG4gICAgICAgICAgdmFyIHRnID0gc2VsZi5nZXRUYXJnZXQoZSk7XHJcbiAgICAgICAgICBpZiAodGcgJiYgL0lOUFVUfFRFWFRBUkVBfFNFTEVDVHxPUFRJT04vLnRlc3QodGcubm9kZU5hbWUpKSB7XHJcbiAgICAgICAgICAgIHZhciB0cCA9IHRnLmdldEF0dHJpYnV0ZSgndHlwZScpIHx8IHRnLnR5cGUgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICgoIXRwKSB8fCAhKC9zdWJtaXR8YnV0dG9ufGNhbmNlbC9pLnRwKSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKCQodGcpLmF0dHIoJ2NvbnRlbnRlZGl0YWJsZScpKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBpZiAoc2VsZi5oYXNmb2N1cyB8fCAoc2VsZi5oYXNtb3VzZWZvY3VzICYmICFkb21mb2N1cykgfHwgKHNlbGYuaXNwYWdlICYmICFkb21mb2N1cyAmJiAhbW91c2Vmb2N1cykpIHtcclxuICAgICAgICAgICAgdmFyIGtleSA9IGUua2V5Q29kZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLnJhaWxzbG9ja2VkICYmIGtleSAhPSAyNykgcmV0dXJuIHNlbGYuY2FuY2VsRXZlbnQoZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3RybCA9IGUuY3RybEtleSB8fCBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHNoaWZ0ID0gZS5zaGlmdEtleSB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICAgIGNhc2UgNjMyMzM6IC8vc2FmYXJpXHJcbiAgICAgICAgICAgICAgICBzZWxmLmRvU2Nyb2xsQnkoMjQgKiAzKTtcclxuICAgICAgICAgICAgICAgIHJldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICAgIGNhc2UgNjMyMzU6IC8vc2FmYXJpXHJcbiAgICAgICAgICAgICAgICBzZWxmLmRvU2Nyb2xsQnkoLTI0ICogMyk7XHJcbiAgICAgICAgICAgICAgICByZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICBjYXNlIDYzMjMyOiAvL3NhZmFyaVxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucmFpbGgpIHtcclxuICAgICAgICAgICAgICAgICAgKGN0cmwpID8gc2VsZi5kb1Njcm9sbExlZnQoMCkgOiBzZWxmLmRvU2Nyb2xsTGVmdEJ5KDI0ICogMyk7XHJcbiAgICAgICAgICAgICAgICAgIHJldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICAgIGNhc2UgNjMyMzQ6IC8vc2FmYXJpXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5yYWlsaCkge1xyXG4gICAgICAgICAgICAgICAgICAoY3RybCkgPyBzZWxmLmRvU2Nyb2xsTGVmdChzZWxmLnBhZ2UubWF4dykgOiBzZWxmLmRvU2Nyb2xsTGVmdEJ5KC0yNCAqIDMpO1xyXG4gICAgICAgICAgICAgICAgICByZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAzMzpcclxuICAgICAgICAgICAgICBjYXNlIDYzMjc2OiAvLyBzYWZhcmlcclxuICAgICAgICAgICAgICAgIHNlbGYuZG9TY3JvbGxCeShzZWxmLnZpZXcuaCk7XHJcbiAgICAgICAgICAgICAgICByZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAzNDpcclxuICAgICAgICAgICAgICBjYXNlIDYzMjc3OiAvLyBzYWZhcmlcclxuICAgICAgICAgICAgICAgIHNlbGYuZG9TY3JvbGxCeSgtc2VsZi52aWV3LmgpO1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgMzY6XHJcbiAgICAgICAgICAgICAgY2FzZSA2MzI3MzogLy8gc2FmYXJpXHJcbiAgICAgICAgICAgICAgICAoc2VsZi5yYWlsaCAmJiBjdHJsKSA/IHNlbGYuZG9TY3JvbGxQb3MoMCwgMCkgOiBzZWxmLmRvU2Nyb2xsVG8oMCk7XHJcbiAgICAgICAgICAgICAgICByZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAzNTpcclxuICAgICAgICAgICAgICBjYXNlIDYzMjc1OiAvLyBzYWZhcmlcclxuICAgICAgICAgICAgICAgIChzZWxmLnJhaWxoICYmIGN0cmwpID8gc2VsZi5kb1Njcm9sbFBvcyhzZWxmLnBhZ2UubWF4dywgc2VsZi5wYWdlLm1heGgpIDogc2VsZi5kb1Njcm9sbFRvKHNlbGYucGFnZS5tYXhoKTtcclxuICAgICAgICAgICAgICAgIHJldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIDMyOlxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdC5zcGFjZWJhcmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgKHNoaWZ0KSA/IHNlbGYuZG9TY3JvbGxCeShzZWxmLnZpZXcuaCkgOiBzZWxmLmRvU2Nyb2xsQnkoLXNlbGYudmlldy5oKTtcclxuICAgICAgICAgICAgICAgICAgcmV0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgMjc6IC8vIEVTQ1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuem9vbWFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICBzZWxmLmRvWm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgICByZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJldCkgcmV0dXJuIHNlbGYuY2FuY2VsRXZlbnQoZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKG9wdC5lbmFibGVrZXlib2FyZCkgc2VsZi5iaW5kKF9kb2MsIChjYXAuaXNvcGVyYSAmJiAhY2FwLmlzb3BlcmExMikgPyBcImtleXByZXNzXCIgOiBcImtleWRvd25cIiwgc2VsZi5vbmtleXByZXNzKTtcclxuXHJcbiAgICAgICAgc2VsZi5iaW5kKF9kb2MsIFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgdmFyIGN0cmwgPSBlLmN0cmxLZXkgfHwgZmFsc2U7XHJcbiAgICAgICAgICBpZiAoY3RybCkgc2VsZi53aGVlbHByZXZlbnRlZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5iaW5kKF9kb2MsIFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIHZhciBjdHJsID0gZS5jdHJsS2V5IHx8IGZhbHNlO1xyXG4gICAgICAgICAgaWYgKCFjdHJsKSBzZWxmLndoZWVscHJldmVudGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5iaW5kKF93aW4sIFwiYmx1clwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgc2VsZi53aGVlbHByZXZlbnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZWxmLmJpbmQoX3dpbiwgJ3Jlc2l6ZScsIHNlbGYub25zY3JlZW5yZXNpemUpO1xyXG4gICAgICAgIHNlbGYuYmluZChfd2luLCAnb3JpZW50YXRpb25jaGFuZ2UnLCBzZWxmLm9uc2NyZWVucmVzaXplKTtcclxuXHJcbiAgICAgICAgc2VsZi5iaW5kKF93aW4sIFwibG9hZFwiLCBzZWxmLmxhenlSZXNpemUpO1xyXG5cclxuICAgICAgICBpZiAoY2FwLmlzY2hyb21lICYmICFzZWxmLmlzcGFnZSAmJiAhc2VsZi5oYXN3cmFwcGVyKSB7IC8vY2hyb21lIHZvaWQgc2Nyb2xsYmFyIGJ1ZyAtIGl0IHBlcnNpc3RzIGluIHZlcnNpb24gMjZcclxuICAgICAgICAgIHZhciB0bXAgPSBzZWxmLndpbi5hdHRyKFwic3R5bGVcIik7XHJcbiAgICAgICAgICB2YXIgd3cgPSBwYXJzZUZsb2F0KHNlbGYud2luLmNzcyhcIndpZHRoXCIpKSArIDE7XHJcbiAgICAgICAgICBzZWxmLndpbi5jc3MoJ3dpZHRoJywgd3cpO1xyXG4gICAgICAgICAgc2VsZi5zeW5jaGVkKFwiY2hyb21lZml4XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi53aW4uYXR0cihcInN0eWxlXCIsIHRtcCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBUcnlpbmcgYSBjcm9zcy1icm93c2VyIGltcGxlbWVudGF0aW9uIC0gZ29vZCBsdWNrIVxyXG5cclxuICAgICAgICBzZWxmLm9uQXR0cmlidXRlQ2hhbmdlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIHNlbGYubGF6eVJlc2l6ZShzZWxmLmlzaWVvbGQgPyAyNTAgOiAzMCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKG9wdC5lbmFibGVvYnNlcnZlcikge1xyXG5cclxuICAgICAgICAgIGlmICgoIXNlbGYuaXNpZTExKSAmJiAoQ2xzTXV0YXRpb25PYnNlcnZlciAhPT0gZmFsc2UpKSB7ICAvLyBJRTExIGNyYXNoZXMgICM1NjhcclxuICAgICAgICAgICAgc2VsZi5vYnNlcnZlcmJvZHkgPSBuZXcgQ2xzTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG11dC50eXBlID09IFwiYXR0cmlidXRlc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoJGJvZHkuaGFzQ2xhc3MoXCJtb2RhbC1vcGVuXCIpICYmICRib2R5Lmhhc0NsYXNzKFwibW9kYWwtZGlhbG9nXCIpICYmICEkLmNvbnRhaW5zKCQoJy5tb2RhbC1kaWFsb2cnKVswXSwgc2VsZi5kb2NbMF0pKSA/IHNlbGYuaGlkZSgpIDogc2VsZi5zaG93KCk7ICAvLyBTdXBwb3J0IGZvciBCb290c3RyYXAgbW9kYWw7IEFkZGVkIGNoZWNrIGlmIHRoZSBuaWNlIHNjcm9sbCBlbGVtZW50IGlzIGluc2lkZSBhIG1vZGFsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYubWUuY2xpZW50V2lkdGggIT0gc2VsZi5wYWdlLndpZHRoIHx8IHNlbGYubWUuY2xpZW50SGVpZ2h0ICE9IHNlbGYucGFnZS5oZWlnaHQpIHJldHVybiBzZWxmLmxhenlSZXNpemUoMzApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5vYnNlcnZlcmJvZHkub2JzZXJ2ZShfZG9jLmJvZHksIHtcclxuICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydjbGFzcyddXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICghc2VsZi5pc3BhZ2UgJiYgIXNlbGYuaGFzd3JhcHBlcikge1xyXG5cclxuICAgICAgICAgICAgdmFyIF9kb20gPSBzZWxmLndpblswXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlZGVzaWduZWQgTXV0YXRpb25PYnNlcnZlciBmb3IgQ2hyb21lMTgrL0ZpcmVmb3gxNCsvaU9TNisgd2l0aCBzdXBwb3J0IGZvcjogcmVtb3ZlIGRpdiwgYWRkL3JlbW92ZSBjb250ZW50XHJcbiAgICAgICAgICAgIGlmIChDbHNNdXRhdGlvbk9ic2VydmVyICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIHNlbGYub2JzZXJ2ZXIgPSBuZXcgQ2xzTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChzZWxmLm9uQXR0cmlidXRlQ2hhbmdlKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBzZWxmLm9ic2VydmVyLm9ic2VydmUoX2RvbSwge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogZmFsc2VcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBzZWxmLm9ic2VydmVycmVtb3ZlciA9IG5ldyBDbHNNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtbykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAobW8ucmVtb3ZlZE5vZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBkZCBpbiBtby5yZW1vdmVkTm9kZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICghIXNlbGYgJiYgKG1vLnJlbW92ZWROb2Rlc1tkZF0gPT09IF9kb20pKSByZXR1cm4gc2VsZi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHNlbGYub2JzZXJ2ZXJyZW1vdmVyLm9ic2VydmUoX2RvbS5wYXJlbnROb2RlLCB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogZmFsc2VcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzZWxmLmJpbmQoX2RvbSwgKGNhcC5pc2llICYmICFjYXAuaXNpZTkpID8gXCJwcm9wZXJ0eWNoYW5nZVwiIDogXCJET01BdHRyTW9kaWZpZWRcIiwgc2VsZi5vbkF0dHJpYnV0ZUNoYW5nZSk7XHJcbiAgICAgICAgICAgICAgaWYgKGNhcC5pc2llOSkgX2RvbS5hdHRhY2hFdmVudChcIm9ucHJvcGVydHljaGFuZ2VcIiwgc2VsZi5vbkF0dHJpYnV0ZUNoYW5nZSk7IC8vSUU5IERPTUF0dHJNb2RpZmllZCBidWdcclxuICAgICAgICAgICAgICBzZWxmLmJpbmQoX2RvbSwgXCJET01Ob2RlUmVtb3ZlZFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBfZG9tKSBzZWxmLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgaWYgKCFzZWxmLmlzcGFnZSAmJiBvcHQuYm94em9vbSkgc2VsZi5iaW5kKF93aW4sIFwicmVzaXplXCIsIHNlbGYucmVzaXplWm9vbSk7XHJcbiAgICAgICAgaWYgKHNlbGYuaXN0ZXh0YXJlYSkge1xyXG4gICAgICAgICAgc2VsZi5iaW5kKHNlbGYud2luLCBcImtleWRvd25cIiwgc2VsZi5sYXp5UmVzaXplKTtcclxuICAgICAgICAgIHNlbGYuYmluZChzZWxmLndpbiwgXCJtb3VzZXVwXCIsIHNlbGYubGF6eVJlc2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmxhenlSZXNpemUoMzApO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuZG9jWzBdLm5vZGVOYW1lID09ICdJRlJBTUUnKSB7XHJcbiAgICAgICAgdmFyIG9uaWZyYW1lbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuaWZyYW1leGQgPSBmYWxzZTtcclxuICAgICAgICAgIHZhciBkb2M7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkb2MgPSAnY29udGVudERvY3VtZW50JyBpbiB0aGlzID8gdGhpcy5jb250ZW50RG9jdW1lbnQgOiB0aGlzLmNvbnRlbnRXaW5kb3cuX2RvYztcclxuICAgICAgICAgICAgdmFyIGEgPSBkb2MuZG9tYWluO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBzZWxmLmlmcmFtZXhkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZG9jID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHNlbGYuaWZyYW1leGQpIHtcclxuICAgICAgICAgICAgaWYgKFwiY29uc29sZVwiIGluIF93aW4pIGNvbnNvbGUubG9nKCdOaWNlU2Nyb2xsIGVycm9yOiBwb2xpY3kgcmVzdHJpY2VkIGlmcmFtZScpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy9jcm9zcy1kb21haW4gLSBJIGNhbid0IG1hbmFnZSB0aGlzXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2VsZi5mb3JjZXNjcmVlbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgaWYgKHNlbGYuaXNpZnJhbWUpIHtcclxuICAgICAgICAgICAgc2VsZi5pZnJhbWUgPSB7XHJcbiAgICAgICAgICAgICAgXCJkb2NcIjogJChkb2MpLFxyXG4gICAgICAgICAgICAgIFwiaHRtbFwiOiBzZWxmLmRvYy5jb250ZW50cygpLmZpbmQoJ2h0bWwnKVswXSxcclxuICAgICAgICAgICAgICBcImJvZHlcIjogc2VsZi5kb2MuY29udGVudHMoKS5maW5kKCdib2R5JylbMF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5nZXRDb250ZW50U2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdzogTWF0aC5tYXgoc2VsZi5pZnJhbWUuaHRtbC5zY3JvbGxXaWR0aCwgc2VsZi5pZnJhbWUuYm9keS5zY3JvbGxXaWR0aCksXHJcbiAgICAgICAgICAgICAgICBoOiBNYXRoLm1heChzZWxmLmlmcmFtZS5odG1sLnNjcm9sbEhlaWdodCwgc2VsZi5pZnJhbWUuYm9keS5zY3JvbGxIZWlnaHQpXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5kb2NzY3JvbGwgPSAkKHNlbGYuaWZyYW1lLmJvZHkpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICghY2FwLmlzaW9zICYmIG9wdC5pZnJhbWVhdXRvcmVzaXplICYmICFzZWxmLmlzaWZyYW1lKSB7XHJcbiAgICAgICAgICAgIHNlbGYud2luLnNjcm9sbFRvcCgwKTsgLy8gcmVzZXQgcG9zaXRpb25cclxuICAgICAgICAgICAgc2VsZi5kb2MuaGVpZ2h0KFwiXCIpOyAvL3Jlc2V0IGhlaWdodCB0byBmaXggYnJvd3NlciBidWdcclxuICAgICAgICAgICAgdmFyIGhoID0gTWF0aC5tYXgoZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsSGVpZ2h0LCBkb2MuYm9keS5zY3JvbGxIZWlnaHQpO1xyXG4gICAgICAgICAgICBzZWxmLmRvYy5oZWlnaHQoaGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2VsZi5sYXp5UmVzaXplKDMwKTtcclxuXHJcbiAgICAgICAgICBzZWxmLmNzcygkKHNlbGYuaWZyYW1lLmJvZHkpLCBfc2Nyb2xseWhpZGRlbik7XHJcblxyXG4gICAgICAgICAgaWYgKGNhcC5pc2lvcyAmJiBzZWxmLmhhc3dyYXBwZXIpIHtcclxuICAgICAgICAgICAgc2VsZi5jc3MoJChkb2MuYm9keSksIHtcclxuICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoMCwwLDApJ1xyXG4gICAgICAgICAgICB9KTsgLy8gYXZvaWQgaUZyYW1lIGNvbnRlbnQgY2xpcHBpbmcgLSB0aGFua3MgdG8gaHR0cDovL2Jsb2cuZGVycmFhYi5jb20vMjAxMi8wNC8wMi9hdm9pZC1pZnJhbWUtY29udGVudC1jbGlwcGluZy13aXRoLWNzcy10cmFuc2Zvcm0tb24taW9zL1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICgnY29udGVudFdpbmRvdycgaW4gdGhpcykge1xyXG4gICAgICAgICAgICBzZWxmLmJpbmQodGhpcy5jb250ZW50V2luZG93LCBcInNjcm9sbFwiLCBzZWxmLm9uc2Nyb2xsKTsgLy9JRTggJiBtaW5vclxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5iaW5kKGRvYywgXCJzY3JvbGxcIiwgc2VsZi5vbnNjcm9sbCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKG9wdC5lbmFibGVtb3VzZXdoZWVsKSB7XHJcbiAgICAgICAgICAgIHNlbGYubW91c2V3aGVlbChkb2MsIHNlbGYub25tb3VzZXdoZWVsKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAob3B0LmVuYWJsZWtleWJvYXJkKSBzZWxmLmJpbmQoZG9jLCAoY2FwLmlzb3BlcmEpID8gXCJrZXlwcmVzc1wiIDogXCJrZXlkb3duXCIsIHNlbGYub25rZXlwcmVzcyk7XHJcblxyXG4gICAgICAgICAgaWYgKGNhcC5jYW50b3VjaCkge1xyXG4gICAgICAgICAgICBzZWxmLmJpbmQoZG9jLCBcInRvdWNoc3RhcnRcIiwgc2VsZi5vbnRvdWNoc3RhcnQpO1xyXG4gICAgICAgICAgICBzZWxmLmJpbmQoZG9jLCBcInRvdWNobW92ZVwiLCBzZWxmLm9udG91Y2htb3ZlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgaWYgKG9wdC5lbXVsYXRldG91Y2gpIHtcclxuICAgICAgICAgICAgc2VsZi5iaW5kKGRvYywgXCJtb3VzZWRvd25cIiwgc2VsZi5vbnRvdWNoc3RhcnQpO1xyXG4gICAgICAgICAgICBzZWxmLmJpbmQoZG9jLCBcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBzZWxmLm9udG91Y2htb3ZlKGUsIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKG9wdC5ncmFiY3Vyc29yZW5hYmxlZCAmJiBjYXAuY3Vyc29yZ3JhYnZhbHVlKSBzZWxmLmNzcygkKGRvYy5ib2R5KSwge1xyXG4gICAgICAgICAgICAgICdjdXJzb3InOiBjYXAuY3Vyc29yZ3JhYnZhbHVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNlbGYuYmluZChkb2MsIFwibW91c2V1cFwiLCBzZWxmLm9udG91Y2hlbmQpO1xyXG5cclxuICAgICAgICAgIGlmIChzZWxmLnpvb20pIHtcclxuICAgICAgICAgICAgaWYgKG9wdC5kYmxjbGlja3pvb20pIHNlbGYuYmluZChkb2MsICdkYmxjbGljaycsIHNlbGYuZG9ab29tKTtcclxuICAgICAgICAgICAgaWYgKHNlbGYub25nZXN0dXJlem9vbSkgc2VsZi5iaW5kKGRvYywgXCJnZXN0dXJlZW5kXCIsIHNlbGYub25nZXN0dXJlem9vbSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZG9jWzBdLnJlYWR5U3RhdGUgJiYgdGhpcy5kb2NbMF0ucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb25pZnJhbWVsb2FkLmNhbGwoc2VsZi5kb2NbMF0sIGZhbHNlKTtcclxuICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuYmluZCh0aGlzLmRvYywgXCJsb2FkXCIsIG9uaWZyYW1lbG9hZCk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNob3dDdXJzb3IgPSBmdW5jdGlvbiAocHksIHB4KSB7XHJcbiAgICAgIGlmIChzZWxmLmN1cnNvcnRpbWVvdXQpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoc2VsZi5jdXJzb3J0aW1lb3V0KTtcclxuICAgICAgICBzZWxmLmN1cnNvcnRpbWVvdXQgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghc2VsZi5yYWlsKSByZXR1cm47XHJcbiAgICAgIGlmIChzZWxmLmF1dG9oaWRlZG9tKSB7XHJcbiAgICAgICAgc2VsZi5hdXRvaGlkZWRvbS5zdG9wKCkuY3NzKHtcclxuICAgICAgICAgIG9wYWNpdHk6IG9wdC5jdXJzb3JvcGFjaXR5bWF4XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5jdXJzb3JhY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNlbGYucmFpbC5kcmFnIHx8IHNlbGYucmFpbC5kcmFnLnB0ICE9IDEpIHtcclxuICAgICAgICBpZiAocHkgIT09IHVuZGVmaW5lZCAmJiBweSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgIHNlbGYuc2Nyb2xsLnkgPSAocHkgLyBzZWxmLnNjcm9sbHJhdGlvLnkpIHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHB4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHNlbGYuc2Nyb2xsLnggPSAocHggLyBzZWxmLnNjcm9sbHJhdGlvLngpIHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYuY3Vyc29yLmNzcyh7XHJcbiAgICAgICAgaGVpZ2h0OiBzZWxmLmN1cnNvcmhlaWdodCxcclxuICAgICAgICB0b3A6IHNlbGYuc2Nyb2xsLnlcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChzZWxmLmN1cnNvcmgpIHtcclxuICAgICAgICB2YXIgbHggPSAoc2VsZi5oYXNyZXZlcnNlaHIpID8gc2VsZi5zY3JvbGx2YWx1ZW1heHcgLSBzZWxmLnNjcm9sbC54IDogc2VsZi5zY3JvbGwueDtcclxuICAgICAgICBzZWxmLmN1cnNvcmguY3NzKHtcclxuICAgICAgICAgIHdpZHRoOiBzZWxmLmN1cnNvcndpZHRoLFxyXG4gICAgICAgICAgbGVmdDogKCFzZWxmLnJhaWwuYWxpZ24gJiYgc2VsZi5yYWlsLnZpc2liaWxpdHkpID8gbHggKyBzZWxmLnJhaWwud2lkdGggOiBseFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYuY3Vyc29yYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNlbGYuem9vbSkgc2VsZi56b29tLnN0b3AoKS5jc3Moe1xyXG4gICAgICAgIG9wYWNpdHk6IG9wdC5jdXJzb3JvcGFjaXR5bWF4XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmhpZGVDdXJzb3IgPSBmdW5jdGlvbiAodG0pIHtcclxuICAgICAgaWYgKHNlbGYuY3Vyc29ydGltZW91dCkgcmV0dXJuO1xyXG4gICAgICBpZiAoIXNlbGYucmFpbCkgcmV0dXJuO1xyXG4gICAgICBpZiAoIXNlbGYuYXV0b2hpZGVkb20pIHJldHVybjtcclxuXHJcbiAgICAgIGlmIChzZWxmLmhhc21vdXNlZm9jdXMgJiYgb3B0LmF1dG9oaWRlbW9kZSA9PT0gXCJsZWF2ZVwiKSByZXR1cm47XHJcbiAgICAgIHNlbGYuY3Vyc29ydGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghc2VsZi5yYWlsLmFjdGl2ZSB8fCAhc2VsZi5zaG93b25tb3VzZWV2ZW50KSB7XHJcbiAgICAgICAgICBzZWxmLmF1dG9oaWRlZG9tLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogb3B0LmN1cnNvcm9wYWNpdHltaW5cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKHNlbGYuem9vbSkgc2VsZi56b29tLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogb3B0LmN1cnNvcm9wYWNpdHltaW5cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VsZi5jdXJzb3JhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5jdXJzb3J0aW1lb3V0ID0gMDtcclxuICAgICAgfSwgdG0gfHwgb3B0LmhpZGVjdXJzb3JkZWxheSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubm90aWNlQ3Vyc29yID0gZnVuY3Rpb24gKHRtLCBweSwgcHgpIHtcclxuICAgICAgc2VsZi5zaG93Q3Vyc29yKHB5LCBweCk7XHJcbiAgICAgIGlmICghc2VsZi5yYWlsLmFjdGl2ZSkgc2VsZi5oaWRlQ3Vyc29yKHRtKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5nZXRDb250ZW50U2l6ZSA9XHJcbiAgICAgIChzZWxmLmlzcGFnZSkgP1xyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHc6IE1hdGgubWF4KF9kb2MuYm9keS5zY3JvbGxXaWR0aCwgX2RvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgpLFxyXG4gICAgICAgICAgICBoOiBNYXRoLm1heChfZG9jLmJvZHkuc2Nyb2xsSGVpZ2h0LCBfZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQpXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gOiAoc2VsZi5oYXN3cmFwcGVyKSA/XHJcbiAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgdzogc2VsZi5kb2NbMF0ub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgICAgICAgaDogc2VsZi5kb2NbMF0ub2Zmc2V0SGVpZ2h0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9IDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIHc6IHNlbGYuZG9jc2Nyb2xsWzBdLnNjcm9sbFdpZHRoLFxyXG4gICAgICAgICAgICAgIGg6IHNlbGYuZG9jc2Nyb2xsWzBdLnNjcm9sbEhlaWdodFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICB0aGlzLm9uUmVzaXplID0gZnVuY3Rpb24gKGUsIHBhZ2UpIHtcclxuXHJcbiAgICAgIGlmICghc2VsZiB8fCAhc2VsZi53aW4pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIHZhciBwcmVtYXhoID0gc2VsZi5wYWdlLm1heGgsXHJcbiAgICAgICAgICBwcmVtYXh3ID0gc2VsZi5wYWdlLm1heHcsXHJcbiAgICAgICAgICBwcmV2aWV3aCA9IHNlbGYudmlldy5oLFxyXG4gICAgICAgICAgcHJldmlld3cgPSBzZWxmLnZpZXcudztcclxuXHJcbiAgICAgIHNlbGYudmlldyA9IHtcclxuICAgICAgICB3OiAoc2VsZi5pc3BhZ2UpID8gc2VsZi53aW4ud2lkdGgoKSA6IHNlbGYud2luWzBdLmNsaWVudFdpZHRoLFxyXG4gICAgICAgIGg6IChzZWxmLmlzcGFnZSkgPyBzZWxmLndpbi5oZWlnaHQoKSA6IHNlbGYud2luWzBdLmNsaWVudEhlaWdodFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgc2VsZi5wYWdlID0gKHBhZ2UpID8gcGFnZSA6IHNlbGYuZ2V0Q29udGVudFNpemUoKTtcclxuXHJcbiAgICAgIHNlbGYucGFnZS5tYXhoID0gTWF0aC5tYXgoMCwgc2VsZi5wYWdlLmggLSBzZWxmLnZpZXcuaCk7XHJcbiAgICAgIHNlbGYucGFnZS5tYXh3ID0gTWF0aC5tYXgoMCwgc2VsZi5wYWdlLncgLSBzZWxmLnZpZXcudyk7XHJcblxyXG4gICAgICBpZiAoKHNlbGYucGFnZS5tYXhoID09IHByZW1heGgpICYmIChzZWxmLnBhZ2UubWF4dyA9PSBwcmVtYXh3KSAmJiAoc2VsZi52aWV3LncgPT0gcHJldmlld3cpICYmIChzZWxmLnZpZXcuaCA9PSBwcmV2aWV3aCkpIHtcclxuICAgICAgICAvLyB0ZXN0IHBvc2l0aW9uXHJcbiAgICAgICAgaWYgKCFzZWxmLmlzcGFnZSkge1xyXG4gICAgICAgICAgdmFyIHBvcyA9IHNlbGYud2luLm9mZnNldCgpO1xyXG4gICAgICAgICAgaWYgKHNlbGYubGFzdHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBsc3QgPSBzZWxmLmxhc3Rwb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKChsc3QudG9wID09IHBvcy50b3ApICYmIChsc3QubGVmdCA9PSBwb3MubGVmdCkpIHJldHVybiBzZWxmOyAvL25vdGhpbmcgdG8gZG9cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNlbGYubGFzdHBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gc2VsZjsgLy9ub3RoaW5nIHRvIGRvXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2VsZi5wYWdlLm1heGggPT09IDApIHtcclxuICAgICAgICBzZWxmLmhpZGVSYWlsKCk7XHJcbiAgICAgICAgc2VsZi5zY3JvbGx2YWx1ZW1heCA9IDA7XHJcbiAgICAgICAgc2VsZi5zY3JvbGwueSA9IDA7XHJcbiAgICAgICAgc2VsZi5zY3JvbGxyYXRpby55ID0gMDtcclxuICAgICAgICBzZWxmLmN1cnNvcmhlaWdodCA9IDA7XHJcbiAgICAgICAgc2VsZi5zZXRTY3JvbGxUb3AoMCk7XHJcbiAgICAgICAgaWYgKHNlbGYucmFpbCkgc2VsZi5yYWlsLnNjcm9sbGFibGUgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxmLnBhZ2UubWF4aCAtPSAob3B0LnJhaWxwYWRkaW5nLnRvcCArIG9wdC5yYWlscGFkZGluZy5ib3R0b20pO1xyXG4gICAgICAgIHNlbGYucmFpbC5zY3JvbGxhYmxlID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNlbGYucGFnZS5tYXh3ID09PSAwKSB7XHJcbiAgICAgICAgc2VsZi5oaWRlUmFpbEhyKCk7XHJcbiAgICAgICAgc2VsZi5zY3JvbGx2YWx1ZW1heHcgPSAwO1xyXG4gICAgICAgIHNlbGYuc2Nyb2xsLnggPSAwO1xyXG4gICAgICAgIHNlbGYuc2Nyb2xscmF0aW8ueCA9IDA7XHJcbiAgICAgICAgc2VsZi5jdXJzb3J3aWR0aCA9IDA7XHJcbiAgICAgICAgc2VsZi5zZXRTY3JvbGxMZWZ0KDApO1xyXG4gICAgICAgIGlmIChzZWxmLnJhaWxoKSB7XHJcbiAgICAgICAgICBzZWxmLnJhaWxoLnNjcm9sbGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZi5wYWdlLm1heHcgLT0gKG9wdC5yYWlscGFkZGluZy5sZWZ0ICsgb3B0LnJhaWxwYWRkaW5nLnJpZ2h0KTtcclxuICAgICAgICBpZiAoc2VsZi5yYWlsaCkgc2VsZi5yYWlsaC5zY3JvbGxhYmxlID0gKG9wdC5ob3JpenJhaWxlbmFibGVkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5yYWlsc2xvY2tlZCA9IChzZWxmLmxvY2tlZCkgfHwgKChzZWxmLnBhZ2UubWF4aCA9PT0gMCkgJiYgKHNlbGYucGFnZS5tYXh3ID09PSAwKSk7XHJcbiAgICAgIGlmIChzZWxmLnJhaWxzbG9ja2VkKSB7XHJcbiAgICAgICAgaWYgKCFzZWxmLmlzcGFnZSkgc2VsZi51cGRhdGVTY3JvbGxCYXIoc2VsZi52aWV3KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghc2VsZi5oaWRkZW4pIHtcclxuICAgICAgICBpZiAoIXNlbGYucmFpbC52aXNpYmlsaXR5KSBzZWxmLnNob3dSYWlsKCk7XHJcbiAgICAgICAgaWYgKHNlbGYucmFpbGggJiYgIXNlbGYucmFpbGgudmlzaWJpbGl0eSkgc2VsZi5zaG93UmFpbEhyKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzZWxmLmlzdGV4dGFyZWEgJiYgc2VsZi53aW4uY3NzKCdyZXNpemUnKSAmJiBzZWxmLndpbi5jc3MoJ3Jlc2l6ZScpICE9ICdub25lJykgc2VsZi52aWV3LmggLT0gMjA7XHJcblxyXG4gICAgICBzZWxmLmN1cnNvcmhlaWdodCA9IE1hdGgubWluKHNlbGYudmlldy5oLCBNYXRoLnJvdW5kKHNlbGYudmlldy5oICogKHNlbGYudmlldy5oIC8gc2VsZi5wYWdlLmgpKSk7XHJcbiAgICAgIHNlbGYuY3Vyc29yaGVpZ2h0ID0gKG9wdC5jdXJzb3JmaXhlZGhlaWdodCkgPyBvcHQuY3Vyc29yZml4ZWRoZWlnaHQgOiBNYXRoLm1heChvcHQuY3Vyc29ybWluaGVpZ2h0LCBzZWxmLmN1cnNvcmhlaWdodCk7XHJcblxyXG4gICAgICBzZWxmLmN1cnNvcndpZHRoID0gTWF0aC5taW4oc2VsZi52aWV3LncsIE1hdGgucm91bmQoc2VsZi52aWV3LncgKiAoc2VsZi52aWV3LncgLyBzZWxmLnBhZ2UudykpKTtcclxuICAgICAgc2VsZi5jdXJzb3J3aWR0aCA9IChvcHQuY3Vyc29yZml4ZWRoZWlnaHQpID8gb3B0LmN1cnNvcmZpeGVkaGVpZ2h0IDogTWF0aC5tYXgob3B0LmN1cnNvcm1pbmhlaWdodCwgc2VsZi5jdXJzb3J3aWR0aCk7XHJcblxyXG4gICAgICBzZWxmLnNjcm9sbHZhbHVlbWF4ID0gc2VsZi52aWV3LmggLSBzZWxmLmN1cnNvcmhlaWdodCAtIChvcHQucmFpbHBhZGRpbmcudG9wICsgb3B0LnJhaWxwYWRkaW5nLmJvdHRvbSk7XHJcbiAgICAgIGlmICghc2VsZi5oYXNib3JkZXJib3gpIHNlbGYuc2Nyb2xsdmFsdWVtYXggLT0gc2VsZi5jdXJzb3JbMF0ub2Zmc2V0SGVpZ2h0IC0gc2VsZi5jdXJzb3JbMF0uY2xpZW50SGVpZ2h0O1xyXG5cclxuICAgICAgaWYgKHNlbGYucmFpbGgpIHtcclxuICAgICAgICBzZWxmLnJhaWxoLndpZHRoID0gKHNlbGYucGFnZS5tYXhoID4gMCkgPyAoc2VsZi5yYWlsLndpZHRoKSA6IHNlbGYudmlldy53O1xyXG4gICAgICAgIHNlbGYuc2Nyb2xsdmFsdWVtYXh3ID0gc2VsZi5yYWlsaC53aWR0aCAtIHNlbGYuY3Vyc29yd2lkdGggLSAob3B0LnJhaWxwYWRkaW5nLmxlZnQgKyBvcHQucmFpbHBhZGRpbmcucmlnaHQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNlbGYuaXNwYWdlKSBzZWxmLnVwZGF0ZVNjcm9sbEJhcihzZWxmLnZpZXcpO1xyXG5cclxuICAgICAgc2VsZi5zY3JvbGxyYXRpbyA9IHtcclxuICAgICAgICB4OiAoc2VsZi5wYWdlLm1heHcgLyBzZWxmLnNjcm9sbHZhbHVlbWF4dyksXHJcbiAgICAgICAgeTogKHNlbGYucGFnZS5tYXhoIC8gc2VsZi5zY3JvbGx2YWx1ZW1heClcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHZhciBzeSA9IHNlbGYuZ2V0U2Nyb2xsVG9wKCk7XHJcbiAgICAgIGlmIChzeSA+IHNlbGYucGFnZS5tYXhoKSB7XHJcbiAgICAgICAgc2VsZi5kb1Njcm9sbFRvcChzZWxmLnBhZ2UubWF4aCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZi5zY3JvbGwueSA9IChzZWxmLmdldFNjcm9sbFRvcCgpIC8gc2VsZi5zY3JvbGxyYXRpby55KSB8IDA7XHJcbiAgICAgICAgc2VsZi5zY3JvbGwueCA9IChzZWxmLmdldFNjcm9sbExlZnQoKSAvIHNlbGYuc2Nyb2xscmF0aW8ueCkgfCAwO1xyXG4gICAgICAgIGlmIChzZWxmLmN1cnNvcmFjdGl2ZSkgc2VsZi5ub3RpY2VDdXJzb3IoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNlbGYuc2Nyb2xsLnkgJiYgKHNlbGYuZ2V0U2Nyb2xsVG9wKCkgPT09IDApKSBzZWxmLmRvU2Nyb2xsVG8oKHNlbGYuc2Nyb2xsLnkgKiBzZWxmLnNjcm9sbHJhdGlvLnkpfDApO1xyXG5cclxuICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVzaXplID0gc2VsZi5vblJlc2l6ZTtcclxuXHJcbiAgICB2YXIgaGxhenlyZXNpemUgPSAwO1xyXG5cclxuICAgIHRoaXMub25zY3JlZW5yZXNpemUgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChobGF6eXJlc2l6ZSk7XHJcblxyXG4gICAgICB2YXIgaGlkZXJhaWxzID0gKCFzZWxmLmlzcGFnZSAmJiAhc2VsZi5oYXN3cmFwcGVyKTtcclxuICAgICAgaWYgKGhpZGVyYWlscykgc2VsZi5oaWRlUmFpbHMoKTtcclxuXHJcbiAgICAgIGhsYXp5cmVzaXplID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYpIHtcclxuICAgICAgICAgIGlmIChoaWRlcmFpbHMpIHNlbGYuc2hvd1JhaWxzKCk7XHJcbiAgICAgICAgICBzZWxmLnJlc2l6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBobGF6eXJlc2l6ZT0wO1xyXG4gICAgICB9LCAxMjApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmxhenlSZXNpemUgPSBmdW5jdGlvbiAodG0pIHsgLy8gZXZlbnQgZGVib3VuY2VcclxuXHJcbiAgICAgIGNsZWFyVGltZW91dChobGF6eXJlc2l6ZSk7XHJcblxyXG4gICAgICB0bSA9IGlzTmFOKHRtKSA/IDI0MCA6IHRtO1xyXG5cclxuICAgICAgaGxhenlyZXNpemUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmICYmIHNlbGYucmVzaXplKCk7XHJcbiAgICAgICAgaGxhenlyZXNpemU9MDtcclxuICAgICAgfSwgdG0pO1xyXG5cclxuICAgICAgcmV0dXJuIHNlbGY7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBkZXJpdmVkIGJ5IE1ETiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0RPTS9Nb3ppbGxhX2V2ZW50X3JlZmVyZW5jZS93aGVlbFxyXG4gICAgZnVuY3Rpb24gX21vZGVybldoZWVsRXZlbnQoZG9tLCBuYW1lLCBmbiwgYnViYmxlKSB7XHJcbiAgICAgIHNlbGYuX2JpbmQoZG9tLCBuYW1lLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUgPSBlIHx8IF93aW4uZXZlbnQ7XHJcbiAgICAgICAgdmFyIGV2ZW50ID0ge1xyXG4gICAgICAgICAgb3JpZ2luYWw6IGUsXHJcbiAgICAgICAgICB0YXJnZXQ6IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCxcclxuICAgICAgICAgIHR5cGU6IFwid2hlZWxcIixcclxuICAgICAgICAgIGRlbHRhTW9kZTogZS50eXBlID09IFwiTW96TW91c2VQaXhlbFNjcm9sbFwiID8gMCA6IDEsXHJcbiAgICAgICAgICBkZWx0YVg6IDAsXHJcbiAgICAgICAgICBkZWx0YVo6IDAsXHJcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0ID8gZS5wcmV2ZW50RGVmYXVsdCgpIDogZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIChlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikgPyBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIDogZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChuYW1lID09IFwibW91c2V3aGVlbFwiKSB7XHJcbiAgICAgICAgICBlLndoZWVsRGVsdGFYICYmIChldmVudC5kZWx0YVggPSAtMSAvIDQwICogZS53aGVlbERlbHRhWCk7XHJcbiAgICAgICAgICBlLndoZWVsRGVsdGFZICYmIChldmVudC5kZWx0YVkgPSAtMSAvIDQwICogZS53aGVlbERlbHRhWSk7XHJcbiAgICAgICAgICAhZXZlbnQuZGVsdGFZICYmICFldmVudC5kZWx0YVggJiYgKGV2ZW50LmRlbHRhWSA9IC0xIC8gNDAgKiBlLndoZWVsRGVsdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBldmVudC5kZWx0YVkgPSBlLmRldGFpbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmbi5jYWxsKGRvbSwgZXZlbnQpO1xyXG4gICAgICB9LCBidWJibGUpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgdGhpcy5qcWJpbmQgPSBmdW5jdGlvbiAoZG9tLCBuYW1lLCBmbikgeyAvLyB1c2UganF1ZXJ5IGJpbmQgZm9yIG5vbi1uYXRpdmUgZXZlbnRzIChtb3VzZWVudGVyL21vdXNlbGVhdmUpXHJcbiAgICAgIHNlbGYuZXZlbnRzLnB1c2goe1xyXG4gICAgICAgIGU6IGRvbSxcclxuICAgICAgICBuOiBuYW1lLFxyXG4gICAgICAgIGY6IGZuLFxyXG4gICAgICAgIHE6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICAgICQoZG9tKS5vbihuYW1lLCBmbik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubW91c2V3aGVlbCA9IGZ1bmN0aW9uIChkb20sIGZuLCBidWJibGUpIHsgLy8gYmluZCBtb3VzZXdoZWVsXHJcbiAgICAgIHZhciBlbCA9IChcImpxdWVyeVwiIGluIGRvbSkgPyBkb21bMF0gOiBkb207XHJcbiAgICAgIGlmIChcIm9ud2hlZWxcIiBpbiBfZG9jLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpIHsgLy8gTW9kZXJuIGJyb3dzZXJzIHN1cHBvcnQgXCJ3aGVlbFwiXHJcbiAgICAgICAgc2VsZi5fYmluZChlbCwgXCJ3aGVlbFwiLCBmbiwgYnViYmxlIHx8IGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgd25hbWUgPSAoX2RvYy5vbm1vdXNld2hlZWwgIT09IHVuZGVmaW5lZCkgPyBcIm1vdXNld2hlZWxcIiA6IFwiRE9NTW91c2VTY3JvbGxcIjsgLy8gb2xkZXIgV2Via2l0K0lFIHN1cHBvcnQgb3Igb2xkZXIgRmlyZWZveFxyXG4gICAgICAgIF9tb2Rlcm5XaGVlbEV2ZW50KGVsLCB3bmFtZSwgZm4sIGJ1YmJsZSB8fCBmYWxzZSk7XHJcbiAgICAgICAgaWYgKHduYW1lID09IFwiRE9NTW91c2VTY3JvbGxcIikgX21vZGVybldoZWVsRXZlbnQoZWwsIFwiTW96TW91c2VQaXhlbFNjcm9sbFwiLCBmbiwgYnViYmxlIHx8IGZhbHNlKTsgLy8gRmlyZWZveCBsZWdhY3lcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcGFzc2l2ZVN1cHBvcnRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChjYXAuaGFzZXZlbnRsaXN0ZW5lcikgeyAgLy8gVzNDIHN0YW5kYXJkIGV2ZW50IG1vZGVsXHJcblxyXG4gICAgICAvLyB0aGFua3MgdG8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXJcclxuICAgICAgdHJ5IHsgdmFyIG9wdGlvbnMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIFwicGFzc2l2ZVwiLCB7IGdldDogZnVuY3Rpb24gKCkgeyBwYXNzaXZlU3VwcG9ydGVkID0gITA7IH0gfSk7IF93aW4uYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgb3B0aW9ucyk7IH0gY2F0Y2ggKGVycikgeyB9XHJcblxyXG4gICAgICB0aGlzLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCFlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZSA9IChlLm9yaWdpbmFsKSA/IGUub3JpZ2luYWwgOiBlO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5jYW5jZWxFdmVudCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5jYW5jZWxhYmxlKSBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBpZiAoZS5wcmV2ZW50TWFuaXB1bGF0aW9uKSBlLnByZXZlbnRNYW5pcHVsYXRpb24oKTsgIC8vIElFMTArXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBpbnNwaXJlZCBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2pvbmF0aGFudG5lYWwvMjQxNTEzN1xyXG5cclxuICAgICAgRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIEV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgX3dpbi5jb25zdHJ1Y3Rvci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IF9kb2MuY29uc3RydWN0b3IucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBsaXN0ZW5lcik7XHJcbiAgICAgIH07XHJcbiAgICAgIF93aW4uY29uc3RydWN0b3IucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBfZG9jLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xyXG4gICAgICAgIHRoaXMuZGV0YWNoRXZlbnQoXCJvblwiICsgdHlwZSwgbGlzdGVuZXIpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gVGhhbmtzIHRvIGh0dHA6Ly93d3cuc3dpdGNob250aGVjb2RlLmNvbSAhIVxyXG4gICAgICB0aGlzLmNhbmNlbEV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlID0gZSB8fCBfd2luLmV2ZW50O1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICBlLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlID0gZSB8fCBfd2luLmV2ZW50O1xyXG4gICAgICAgIGlmIChlKSBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlbGVnYXRlID0gZnVuY3Rpb24gKGRvbSwgbmFtZSwgZm4sIGJ1YmJsZSwgYWN0aXZlKSB7XHJcblxyXG4gICAgICB2YXIgZGUgPSBkZWxlZ2F0ZXZlbnRzW25hbWVdIHx8IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKCFkZSkge1xyXG5cclxuICAgICAgICBkZSA9IHtcclxuICAgICAgICAgIGE6IFtdLFxyXG4gICAgICAgICAgbDogW10sXHJcbiAgICAgICAgICBmOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgbHN0ID0gZGUubCwgbCA9IGxzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB2YXIgciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhID0gbDsgYSA+PSAwOyBhLS0pIHtcclxuICAgICAgICAgICAgICByID0gbHN0W2FdLmNhbGwoZS50YXJnZXQsIGUpO1xyXG4gICAgICAgICAgICAgIGlmIChyID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNlbGYuYmluZChkb20sIG5hbWUsIGRlLmYsIGJ1YmJsZSwgYWN0aXZlKTtcclxuXHJcbiAgICAgICAgZGVsZWdhdGV2ZW50c1tuYW1lXSA9IGRlO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNlbGYuaXNwYWdlKSB7XHJcbiAgICAgICAgZGUuYSA9IFtzZWxmLmlkXS5jb25jYXQoZGUuYSk7XHJcbiAgICAgICAgZGUubCA9IFtmbl0uY29uY2F0KGRlLmwpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlLmEucHVzaChzZWxmLmlkKTtcclxuICAgICAgICBkZS5sLnB1c2goZm4pO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnVuZGVsZWdhdGUgPSBmdW5jdGlvbiAoZG9tLCBuYW1lLCBmbiwgYnViYmxlLCBhY3RpdmUpIHtcclxuICAgICAgdmFyIGRlID0gZGVsZWdhdGV2ZW50c1tuYW1lXXx8ZmFsc2U7XHJcbiAgICAgIGlmIChkZSYmZGUubCkgeyAgLy8gcXVpY2sgZml4ICM2ODNcclxuICAgICAgICBmb3IgKHZhciBhPTAsbD1kZS5sLmxlbmd0aDthPGw7YSsrKSB7XHJcbiAgICAgICAgICBpZiAoZGUuYVthXSA9PT0gc2VsZi5pZCkge1xyXG4gICAgICAgICAgICBkZS5hLnNwbGljZShhKTtcclxuICAgICAgICAgICAgZGUubC5zcGxpY2UoYSk7XHJcbiAgICAgICAgICAgIGlmIChkZS5hLmxlbmd0aD09PTApIHtcclxuICAgICAgICAgICAgICBzZWxmLl91bmJpbmQoZG9tLG5hbWUsZGUubC5mKTtcclxuICAgICAgICAgICAgICBkZWxlZ2F0ZXZlbnRzW25hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmJpbmQgPSBmdW5jdGlvbiAoZG9tLCBuYW1lLCBmbiwgYnViYmxlLCBhY3RpdmUpIHtcclxuICAgICAgdmFyIGVsID0gKFwianF1ZXJ5XCIgaW4gZG9tKSA/IGRvbVswXSA6IGRvbTtcclxuICAgICAgc2VsZi5fYmluZChlbCwgbmFtZSwgZm4sIGJ1YmJsZSB8fCBmYWxzZSwgYWN0aXZlIHx8IGZhbHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fYmluZCA9IGZ1bmN0aW9uIChlbCwgbmFtZSwgZm4sIGJ1YmJsZSwgYWN0aXZlKSB7IC8vIHByaW1pdGl2ZSBiaW5kXHJcblxyXG4gICAgICBzZWxmLmV2ZW50cy5wdXNoKHtcclxuICAgICAgICBlOiBlbCxcclxuICAgICAgICBuOiBuYW1lLFxyXG4gICAgICAgIGY6IGZuLFxyXG4gICAgICAgIGI6IGJ1YmJsZSxcclxuICAgICAgICBxOiBmYWxzZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAocGFzc2l2ZVN1cHBvcnRlZCAmJiAoYWN0aXZlIHx8IGVsID09IHdpbmRvdy5kb2N1bWVudCB8fCBlbCA9PSB3aW5kb3cuZG9jdW1lbnQuYm9keSB8fCBlbCA9PSB3aW5kb3cpKSA/IGVsLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZm4sIHsgcGFzc2l2ZTogZmFsc2UsIGNhcHR1cmU6IGJ1YmJsZSB9KSA6IGVsLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZm4sIGJ1YmJsZSB8fCBmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX3VuYmluZCA9IGZ1bmN0aW9uIChlbCwgbmFtZSwgZm4sIGJ1YikgeyAvLyBwcmltaXRpdmUgdW5iaW5kXHJcbiAgICAgIGlmIChkZWxlZ2F0ZXZlbnRzW25hbWVdKSBzZWxmLnVuZGVsZWdhdGUoZWwsIG5hbWUsIGZuLCBidWIpO1xyXG4gICAgICBlbHNlIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgZm4sIGJ1Yik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudW5iaW5kQWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHNlbGYuZXZlbnRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgdmFyIHIgPSBzZWxmLmV2ZW50c1thXTtcclxuICAgICAgICAoci5xKSA/IHIuZS51bmJpbmQoci5uLCByLmYpIDogc2VsZi5fdW5iaW5kKHIuZSwgci5uLCByLmYsIHIuYik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zaG93UmFpbHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLnNob3dSYWlsKCkuc2hvd1JhaWxIcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNob3dSYWlsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoKHNlbGYucGFnZS5tYXhoICE9PSAwKSAmJiAoc2VsZi5pc3BhZ2UgfHwgc2VsZi53aW4uY3NzKCdkaXNwbGF5JykgIT0gJ25vbmUnKSkge1xyXG4gICAgICAgIC8vc2VsZi52aXNpYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLnJhaWwudmlzaWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgc2VsZi5yYWlsLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNob3dSYWlsSHIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChzZWxmLnJhaWxoKSB7XHJcbiAgICAgICAgaWYgKChzZWxmLnBhZ2UubWF4dyAhPT0gMCkgJiYgKHNlbGYuaXNwYWdlIHx8IHNlbGYud2luLmNzcygnZGlzcGxheScpICE9ICdub25lJykpIHtcclxuICAgICAgICAgIHNlbGYucmFpbGgudmlzaWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICBzZWxmLnJhaWxoLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5oaWRlUmFpbHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLmhpZGVSYWlsKCkuaGlkZVJhaWxIcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmhpZGVSYWlsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAvL3NlbGYudmlzaWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICBzZWxmLnJhaWwudmlzaWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICBzZWxmLnJhaWwuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaGlkZVJhaWxIciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHNlbGYucmFpbGgpIHtcclxuICAgICAgICBzZWxmLnJhaWxoLnZpc2liaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLnJhaWxoLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2VsZi5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgc2VsZi5yYWlsc2xvY2tlZCA9IGZhbHNlO1xyXG4gICAgICByZXR1cm4gc2VsZi5zaG93UmFpbHMoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBzZWxmLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgIHNlbGYucmFpbHNsb2NrZWQgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gc2VsZi5oaWRlUmFpbHMoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAoc2VsZi5oaWRkZW4pID8gc2VsZi5zaG93KCkgOiBzZWxmLmhpZGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNlbGYuc3RvcCgpO1xyXG4gICAgICBpZiAoc2VsZi5jdXJzb3J0aW1lb3V0KSBjbGVhclRpbWVvdXQoc2VsZi5jdXJzb3J0aW1lb3V0KTtcclxuICAgICAgZm9yICh2YXIgbiBpbiBzZWxmLmRlbGF5bGlzdCkgaWYgKHNlbGYuZGVsYXlsaXN0W25dKSBjbGVhckFuaW1hdGlvbkZyYW1lKHNlbGYuZGVsYXlsaXN0W25dLmgpO1xyXG4gICAgICBzZWxmLmRvWm9vbU91dCgpO1xyXG4gICAgICBzZWxmLnVuYmluZEFsbCgpO1xyXG5cclxuICAgICAgaWYgKGNhcC5pc2llOSkgc2VsZi53aW5bMF0uZGV0YWNoRXZlbnQoXCJvbnByb3BlcnR5Y2hhbmdlXCIsIHNlbGYub25BdHRyaWJ1dGVDaGFuZ2UpOyAvL0lFOSBET01BdHRyTW9kaWZpZWQgYnVnXHJcblxyXG4gICAgICBpZiAoc2VsZi5vYnNlcnZlciAhPT0gZmFsc2UpIHNlbGYub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICBpZiAoc2VsZi5vYnNlcnZlcnJlbW92ZXIgIT09IGZhbHNlKSBzZWxmLm9ic2VydmVycmVtb3Zlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgIGlmIChzZWxmLm9ic2VydmVyYm9keSAhPT0gZmFsc2UpIHNlbGYub2JzZXJ2ZXJib2R5LmRpc2Nvbm5lY3QoKTtcclxuXHJcbiAgICAgIHNlbGYuZXZlbnRzID0gbnVsbDtcclxuXHJcbiAgICAgIGlmIChzZWxmLmN1cnNvcikge1xyXG4gICAgICAgIHNlbGYuY3Vyc29yLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzZWxmLmN1cnNvcmgpIHtcclxuICAgICAgICBzZWxmLmN1cnNvcmgucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNlbGYucmFpbCkge1xyXG4gICAgICAgIHNlbGYucmFpbC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc2VsZi5yYWlsaCkge1xyXG4gICAgICAgIHNlbGYucmFpbGgucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNlbGYuem9vbSkge1xyXG4gICAgICAgIHNlbGYuem9vbS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKHZhciBhID0gMDsgYSA8IHNlbGYuc2F2ZWQuY3NzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgdmFyIGQgPSBzZWxmLnNhdmVkLmNzc1thXTtcclxuICAgICAgICBkWzBdLmNzcyhkWzFdLCAoZFsyXSA9PT0gdW5kZWZpbmVkKSA/ICcnIDogZFsyXSk7XHJcbiAgICAgIH1cclxuICAgICAgc2VsZi5zYXZlZCA9IGZhbHNlO1xyXG4gICAgICBzZWxmLm1lLmRhdGEoJ19fbmljZXNjcm9sbCcsICcnKTsgLy9lcmFzZSBhbGwgdHJhY2VzXHJcblxyXG4gICAgICAvLyBtZW1vcnkgbGVhayBmaXhlZCBieSBHaWFubHVjYUd1YXJpbmkgLSB0aGFua3MgYSBsb3QhXHJcbiAgICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBuaWNlc2Nyb2xsIGZyb20gdGhlICQubmljZXNjcm9sbCBhcnJheSAmIG5vcm1hbGl6ZSBhcnJheVxyXG4gICAgICB2YXIgbHN0ID0gJC5uaWNlc2Nyb2xsO1xyXG4gICAgICBsc3QuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIGlmICghdGhpcykgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLmlkID09PSBzZWxmLmlkKSB7XHJcbiAgICAgICAgICBkZWxldGUgbHN0W2ldO1xyXG4gICAgICAgICAgZm9yICh2YXIgYiA9ICsraTsgYiA8IGxzdC5sZW5ndGg7IGIrKyAsIGkrKykgbHN0W2ldID0gbHN0W2JdO1xyXG4gICAgICAgICAgbHN0Lmxlbmd0aC0tO1xyXG4gICAgICAgICAgaWYgKGxzdC5sZW5ndGgpIGRlbGV0ZSBsc3RbbHN0Lmxlbmd0aF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgaW4gc2VsZikge1xyXG4gICAgICAgIHNlbGZbaV0gPSBudWxsO1xyXG4gICAgICAgIGRlbGV0ZSBzZWxmW2ldO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmID0gbnVsbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsc3RhcnQgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgdGhpcy5vbnNjcm9sbHN0YXJ0ID0gZm47XHJcbiAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfTtcclxuICAgIHRoaXMuc2Nyb2xsZW5kID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgIHRoaXMub25zY3JvbGxlbmQgPSBmbjtcclxuICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5zY3JvbGxjYW5jZWwgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgdGhpcy5vbnNjcm9sbGNhbmNlbCA9IGZuO1xyXG4gICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy56b29taW4gPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgdGhpcy5vbnpvb21pbiA9IGZuO1xyXG4gICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcbiAgICB0aGlzLnpvb21vdXQgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgdGhpcy5vbnpvb21vdXQgPSBmbjtcclxuICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaXNTY3JvbGxhYmxlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdmFyIGRvbSA9IChlLnRhcmdldCkgPyBlLnRhcmdldCA6IGU7XHJcbiAgICAgIGlmIChkb20ubm9kZU5hbWUgPT0gJ09QVElPTicpIHJldHVybiB0cnVlO1xyXG4gICAgICB3aGlsZSAoZG9tICYmIChkb20ubm9kZVR5cGUgPT0gMSkgJiYgKGRvbSAhPT0gdGhpcy5tZVswXSkgJiYgISgvXkJPRFl8SFRNTC8udGVzdChkb20ubm9kZU5hbWUpKSkge1xyXG4gICAgICAgIHZhciBkZCA9ICQoZG9tKTtcclxuICAgICAgICB2YXIgb3YgPSBkZC5jc3MoJ292ZXJmbG93WScpIHx8IGRkLmNzcygnb3ZlcmZsb3dYJykgfHwgZGQuY3NzKCdvdmVyZmxvdycpIHx8ICcnO1xyXG4gICAgICAgIGlmICgvc2Nyb2xsfGF1dG8vLnRlc3Qob3YpKSByZXR1cm4gKGRvbS5jbGllbnRIZWlnaHQgIT0gZG9tLnNjcm9sbEhlaWdodCk7XHJcbiAgICAgICAgZG9tID0gKGRvbS5wYXJlbnROb2RlKSA/IGRvbS5wYXJlbnROb2RlIDogZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldFZpZXdwb3J0ID0gZnVuY3Rpb24gKG1lKSB7XHJcbiAgICAgIHZhciBkb20gPSAobWUgJiYgbWUucGFyZW50Tm9kZSkgPyBtZS5wYXJlbnROb2RlIDogZmFsc2U7XHJcbiAgICAgIHdoaWxlIChkb20gJiYgKGRvbS5ub2RlVHlwZSA9PSAxKSAmJiAhKC9eQk9EWXxIVE1MLy50ZXN0KGRvbS5ub2RlTmFtZSkpKSB7XHJcbiAgICAgICAgdmFyIGRkID0gJChkb20pO1xyXG4gICAgICAgIGlmICgvZml4ZWR8YWJzb2x1dGUvLnRlc3QoZGQuY3NzKFwicG9zaXRpb25cIikpKSByZXR1cm4gZGQ7XHJcbiAgICAgICAgdmFyIG92ID0gZGQuY3NzKCdvdmVyZmxvd1knKSB8fCBkZC5jc3MoJ292ZXJmbG93WCcpIHx8IGRkLmNzcygnb3ZlcmZsb3cnKSB8fCAnJztcclxuICAgICAgICBpZiAoKC9zY3JvbGx8YXV0by8udGVzdChvdikpICYmIChkb20uY2xpZW50SGVpZ2h0ICE9IGRvbS5zY3JvbGxIZWlnaHQpKSByZXR1cm4gZGQ7XHJcbiAgICAgICAgaWYgKGRkLmdldE5pY2VTY3JvbGwoKS5sZW5ndGggPiAwKSByZXR1cm4gZGQ7XHJcbiAgICAgICAgZG9tID0gKGRvbS5wYXJlbnROb2RlKSA/IGRvbS5wYXJlbnROb2RlIDogZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnRyaWdnZXJTY3JvbGxTdGFydCA9IGZ1bmN0aW9uIChjeCwgY3ksIHJ4LCByeSwgbXMpIHtcclxuXHJcbiAgICAgIGlmIChzZWxmLm9uc2Nyb2xsc3RhcnQpIHtcclxuICAgICAgICB2YXIgaW5mbyA9IHtcclxuICAgICAgICAgIHR5cGU6IFwic2Nyb2xsc3RhcnRcIixcclxuICAgICAgICAgIGN1cnJlbnQ6IHtcclxuICAgICAgICAgICAgeDogY3gsXHJcbiAgICAgICAgICAgIHk6IGN5XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVxdWVzdDoge1xyXG4gICAgICAgICAgICB4OiByeCxcclxuICAgICAgICAgICAgeTogcnlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgeDogc2VsZi5uZXdzY3JvbGx4LFxyXG4gICAgICAgICAgICB5OiBzZWxmLm5ld3Njcm9sbHlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzcGVlZDogbXNcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYub25zY3JvbGxzdGFydC5jYWxsKHNlbGYsIGluZm8pO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnRyaWdnZXJTY3JvbGxFbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChzZWxmLm9uc2Nyb2xsZW5kKSB7XHJcblxyXG4gICAgICAgIHZhciBweCA9IHNlbGYuZ2V0U2Nyb2xsTGVmdCgpO1xyXG4gICAgICAgIHZhciBweSA9IHNlbGYuZ2V0U2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIHZhciBpbmZvID0ge1xyXG4gICAgICAgICAgdHlwZTogXCJzY3JvbGxlbmRcIixcclxuICAgICAgICAgIGN1cnJlbnQ6IHtcclxuICAgICAgICAgICAgeDogcHgsXHJcbiAgICAgICAgICAgIHk6IHB5XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICAgIHg6IHB4LFxyXG4gICAgICAgICAgICB5OiBweVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNlbGYub25zY3JvbGxlbmQuY2FsbChzZWxmLCBpbmZvKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBzY3JvbGxkaXJ5ID0gMCwgc2Nyb2xsZGlyeCA9IDAsIHNjcm9sbHRtciA9IDAsIHNjcm9sbHNwZCA9IDE7XHJcblxyXG4gICAgZnVuY3Rpb24gZG9TY3JvbGxSZWxhdGl2ZShweCwgcHksIGNoa3Njcm9sbCwgaXN3aGVlbCkge1xyXG5cclxuICAgICAgaWYgKCFzZWxmLnNjcm9sbHJ1bm5pbmcpIHtcclxuICAgICAgICBzZWxmLm5ld3Njcm9sbHkgPSBzZWxmLmdldFNjcm9sbFRvcCgpO1xyXG4gICAgICAgIHNlbGYubmV3c2Nyb2xseCA9IHNlbGYuZ2V0U2Nyb2xsTGVmdCgpO1xyXG4gICAgICAgIHNjcm9sbHRtciA9IG5vdygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZ2FwID0gKG5vdygpIC0gc2Nyb2xsdG1yKTtcclxuICAgICAgc2Nyb2xsdG1yID0gbm93KCk7XHJcblxyXG4gICAgICBpZiAoZ2FwID4gMzUwKSB7XHJcbiAgICAgICAgc2Nyb2xsc3BkID0gMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzY3JvbGxzcGQgKz0gKDIgLSBzY3JvbGxzcGQpIC8gMTA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHB4ID0gcHggKiBzY3JvbGxzcGQgfCAwO1xyXG4gICAgICBweSA9IHB5ICogc2Nyb2xsc3BkIHwgMDtcclxuXHJcbiAgICAgIGlmIChweCkge1xyXG5cclxuICAgICAgICBpZiAoaXN3aGVlbCkgeyAvLyBtb3VzZS1vbmx5XHJcbiAgICAgICAgICBpZiAocHggPCAwKSB7ICAvLyBmaXggYXBwbGUgbWFnaWMgbW91c2Ugc3dpcGUgYmFjay9mb3J3YXJkXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmdldFNjcm9sbExlZnQoKSA+PSBzZWxmLnBhZ2UubWF4dykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5nZXRTY3JvbGxMZWZ0KCkgPD0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZHggPSBweCA+IDAgPyAxIDogLTE7XHJcblxyXG4gICAgICAgIGlmIChzY3JvbGxkaXJ4ICE9PSBkeCkge1xyXG4gICAgICAgICAgaWYgKHNlbGYuc2Nyb2xsbW9tKSBzZWxmLnNjcm9sbG1vbS5zdG9wKCk7XHJcbiAgICAgICAgICBzZWxmLm5ld3Njcm9sbHggPSBzZWxmLmdldFNjcm9sbExlZnQoKTtcclxuICAgICAgICAgIHNjcm9sbGRpcnggPSBkeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYubGFzdGRlbHRheCAtPSBweDtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChweSkge1xyXG5cclxuICAgICAgICB2YXIgY2hrID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHZhciB0b3AgPSBzZWxmLmdldFNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgaWYgKHB5IDwgMCkge1xyXG4gICAgICAgICAgICBpZiAodG9wID49IHNlbGYucGFnZS5tYXhoKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0b3AgPD0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgaWYgKGNoaykge1xyXG4gICAgICAgICAgaWYgKG9wdC5uYXRpdmVwYXJlbnRzY3JvbGxpbmcgJiYgY2hrc2Nyb2xsICYmICFzZWxmLmlzcGFnZSAmJiAhc2VsZi56b29tYWN0aXZlKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIHZhciBueSA9IHNlbGYudmlldy5oID4+IDE7XHJcbiAgICAgICAgICBpZiAoc2VsZi5uZXdzY3JvbGx5IDwgLW55KSB7IHNlbGYubmV3c2Nyb2xseSA9IC1ueTsgcHkgPSAtMTsgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoc2VsZi5uZXdzY3JvbGx5ID4gc2VsZi5wYWdlLm1heGggKyBueSkgeyBzZWxmLm5ld3Njcm9sbHkgPSBzZWxmLnBhZ2UubWF4aCArIG55OyBweSA9IDE7IH1cclxuICAgICAgICAgIGVsc2UgcHkgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGR5ID0gcHkgPiAwID8gMSA6IC0xO1xyXG5cclxuICAgICAgICBpZiAoc2Nyb2xsZGlyeSAhPT0gZHkpIHtcclxuICAgICAgICAgIGlmIChzZWxmLnNjcm9sbG1vbSkgc2VsZi5zY3JvbGxtb20uc3RvcCgpO1xyXG4gICAgICAgICAgc2VsZi5uZXdzY3JvbGx5ID0gc2VsZi5nZXRTY3JvbGxUb3AoKTtcclxuICAgICAgICAgIHNjcm9sbGRpcnkgPSBkeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYubGFzdGRlbHRheSAtPSBweTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChweSB8fCBweCkge1xyXG4gICAgICAgIHNlbGYuc3luY2hlZChcInJlbGF0aXZleHlcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgIHZhciBkdHkgPSBzZWxmLmxhc3RkZWx0YXkgKyBzZWxmLm5ld3Njcm9sbHk7XHJcbiAgICAgICAgICBzZWxmLmxhc3RkZWx0YXkgPSAwO1xyXG5cclxuICAgICAgICAgIHZhciBkdHggPSBzZWxmLmxhc3RkZWx0YXggKyBzZWxmLm5ld3Njcm9sbHg7XHJcbiAgICAgICAgICBzZWxmLmxhc3RkZWx0YXggPSAwO1xyXG5cclxuICAgICAgICAgIGlmICghc2VsZi5yYWlsLmRyYWcpIHNlbGYuZG9TY3JvbGxQb3MoZHR4LCBkdHkpO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB2YXIgaGFzcGFyZW50c2Nyb2xsaW5ncGhhc2UgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBleGVjU2Nyb2xsV2hlZWwoZSwgaHIsIGNoa3Njcm9sbCkge1xyXG4gICAgICB2YXIgcHgsIHB5O1xyXG5cclxuICAgICAgaWYgKCFjaGtzY3JvbGwgJiYgaGFzcGFyZW50c2Nyb2xsaW5ncGhhc2UpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgaWYgKGUuZGVsdGFNb2RlID09PSAwKSB7IC8vIFBJWEVMXHJcbiAgICAgICAgcHggPSAtKGUuZGVsdGFYICogKG9wdC5tb3VzZXNjcm9sbHN0ZXAgLyAoMTggKiAzKSkpIHwgMDtcclxuICAgICAgICBweSA9IC0oZS5kZWx0YVkgKiAob3B0Lm1vdXNlc2Nyb2xsc3RlcCAvICgxOCAqIDMpKSkgfCAwO1xyXG4gICAgICB9IGVsc2UgaWYgKGUuZGVsdGFNb2RlID09PSAxKSB7IC8vIExJTkVcclxuICAgICAgICBweCA9IC0oZS5kZWx0YVggKiBvcHQubW91c2VzY3JvbGxzdGVwICogNTAgLyA4MCkgfCAwO1xyXG4gICAgICAgIHB5ID0gLShlLmRlbHRhWSAqIG9wdC5tb3VzZXNjcm9sbHN0ZXAgKiA1MCAvIDgwKSB8IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChociAmJiBvcHQub25lYXhpc21vdXNlbW9kZSAmJiAocHggPT09IDApICYmIHB5KSB7IC8vIGNsYXNzaWMgdmVydGljYWwtb25seSBtb3VzZXdoZWVsICsgYnJvd3NlciB3aXRoIHgveSBzdXBwb3J0XHJcbiAgICAgICAgcHggPSBweTtcclxuICAgICAgICBweSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChjaGtzY3JvbGwpIHtcclxuICAgICAgICAgIHZhciBocmVuZCA9IChweCA8IDApID8gKHNlbGYuZ2V0U2Nyb2xsTGVmdCgpID49IHNlbGYucGFnZS5tYXh3KSA6IChzZWxmLmdldFNjcm9sbExlZnQoKSA8PSAwKTtcclxuICAgICAgICAgIGlmIChocmVuZCkgeyAgLy8gcHJlc2VydmUgdmVydGljYWwgc2Nyb2xsaW5nXHJcbiAgICAgICAgICAgIHB5ID0gcHg7XHJcbiAgICAgICAgICAgIHB4ID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpbnZlcnQgaG9yaXpvbnRhbCBkaXJlY3Rpb24gZm9yIHJ0bCBtb2RlXHJcbiAgICAgIGlmIChzZWxmLmlzcnRsbW9kZSkgcHggPSAtcHg7XHJcblxyXG4gICAgICB2YXIgY2hrID0gZG9TY3JvbGxSZWxhdGl2ZShweCwgcHksIGNoa3Njcm9sbCwgdHJ1ZSk7XHJcblxyXG4gICAgICBpZiAoY2hrKSB7XHJcbiAgICAgICAgaWYgKGNoa3Njcm9sbCkgaGFzcGFyZW50c2Nyb2xsaW5ncGhhc2UgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhhc3BhcmVudHNjcm9sbGluZ3BoYXNlID0gZmFsc2U7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub25tb3VzZXdoZWVsID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgaWYgKHNlbGYud2hlZWxwcmV2ZW50ZWR8fHNlbGYubG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChzZWxmLnJhaWxzbG9ja2VkKSB7XHJcbiAgICAgICAgc2VsZi5kZWJvdW5jZWQoXCJjaGVja3VubG9ja1wiLCBzZWxmLnJlc2l6ZSwgMjUwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNlbGYucmFpbC5kcmFnKSByZXR1cm4gc2VsZi5jYW5jZWxFdmVudChlKTtcclxuXHJcbiAgICAgIGlmIChvcHQub25lYXhpc21vdXNlbW9kZSA9PT0gXCJhdXRvXCIgJiYgZS5kZWx0YVggIT09IDApIG9wdC5vbmVheGlzbW91c2Vtb2RlID0gZmFsc2U7IC8vIGNoZWNrIHR3by1heGlzIG1vdXNlIHN1cHBvcnQgKG5vdCB2ZXJ5IGVsZWdhbnQpXHJcblxyXG4gICAgICBpZiAob3B0Lm9uZWF4aXNtb3VzZW1vZGUgJiYgZS5kZWx0YVggPT09IDApIHtcclxuICAgICAgICBpZiAoIXNlbGYucmFpbC5zY3JvbGxhYmxlKSB7XHJcbiAgICAgICAgICBpZiAoc2VsZi5yYWlsaCAmJiBzZWxmLnJhaWxoLnNjcm9sbGFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYub25tb3VzZXdoZWVsaHIoZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBudyA9IG5vdygpO1xyXG4gICAgICB2YXIgY2hrID0gZmFsc2U7XHJcbiAgICAgIGlmIChvcHQucHJlc2VydmVuYXRpdmVzY3JvbGxpbmcgJiYgKChzZWxmLmNoZWNrYXJlYSArIDYwMCkgPCBudykpIHtcclxuICAgICAgICBzZWxmLm5hdGl2ZXNjcm9sbGluZ2FyZWEgPSBzZWxmLmlzU2Nyb2xsYWJsZShlKTtcclxuICAgICAgICBjaGsgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHNlbGYuY2hlY2thcmVhID0gbnc7XHJcbiAgICAgIGlmIChzZWxmLm5hdGl2ZXNjcm9sbGluZ2FyZWEpIHJldHVybiB0cnVlOyAvLyB0aGlzIGlzbid0IG15IGJ1c2luZXNzXHJcbiAgICAgIHZhciByZXQgPSBleGVjU2Nyb2xsV2hlZWwoZSwgZmFsc2UsIGNoayk7XHJcbiAgICAgIGlmIChyZXQpIHNlbGYuY2hlY2thcmVhID0gMDtcclxuICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5vbm1vdXNld2hlZWxociA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGlmIChzZWxmLndoZWVscHJldmVudGVkKSByZXR1cm47XHJcbiAgICAgIGlmIChzZWxmLnJhaWxzbG9ja2VkIHx8ICFzZWxmLnJhaWxoLnNjcm9sbGFibGUpIHJldHVybiB0cnVlO1xyXG4gICAgICBpZiAoc2VsZi5yYWlsLmRyYWcpIHJldHVybiBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG5cclxuICAgICAgdmFyIG53ID0gbm93KCk7XHJcbiAgICAgIHZhciBjaGsgPSBmYWxzZTtcclxuICAgICAgaWYgKG9wdC5wcmVzZXJ2ZW5hdGl2ZXNjcm9sbGluZyAmJiAoKHNlbGYuY2hlY2thcmVhICsgNjAwKSA8IG53KSkge1xyXG4gICAgICAgIHNlbGYubmF0aXZlc2Nyb2xsaW5nYXJlYSA9IHNlbGYuaXNTY3JvbGxhYmxlKGUpO1xyXG4gICAgICAgIGNoayA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgc2VsZi5jaGVja2FyZWEgPSBudztcclxuICAgICAgaWYgKHNlbGYubmF0aXZlc2Nyb2xsaW5nYXJlYSkgcmV0dXJuIHRydWU7IC8vIHRoaXMgaXMgbm90IG15IGJ1c2luZXNzXHJcbiAgICAgIGlmIChzZWxmLnJhaWxzbG9ja2VkKSByZXR1cm4gc2VsZi5jYW5jZWxFdmVudChlKTtcclxuXHJcbiAgICAgIHJldHVybiBleGVjU2Nyb2xsV2hlZWwoZSwgdHJ1ZSwgY2hrKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zdG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBzZWxmLmNhbmNlbFNjcm9sbCgpO1xyXG4gICAgICBpZiAoc2VsZi5zY3JvbGxtb24pIHNlbGYuc2Nyb2xsbW9uLnN0b3AoKTtcclxuICAgICAgc2VsZi5jdXJzb3JmcmVlemVkID0gZmFsc2U7XHJcbiAgICAgIHNlbGYuc2Nyb2xsLnkgPSBNYXRoLnJvdW5kKHNlbGYuZ2V0U2Nyb2xsVG9wKCkgKiAoMSAvIHNlbGYuc2Nyb2xscmF0aW8ueSkpO1xyXG4gICAgICBzZWxmLm5vdGljZUN1cnNvcigpO1xyXG4gICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5nZXRUcmFuc2l0aW9uU3BlZWQgPSBmdW5jdGlvbiAoZGlmKSB7XHJcblxyXG4gICAgICByZXR1cm4gODAgKyAoZGlmIC8gNzIpICogb3B0LnNjcm9sbHNwZWVkIHwwO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFvcHQuc21vb3Roc2Nyb2xsKSB7XHJcbiAgICAgIHRoaXMuZG9TY3JvbGxMZWZ0ID0gZnVuY3Rpb24gKHgsIHNwZCkgeyAvL2RpcmVjdFxyXG4gICAgICAgIHZhciB5ID0gc2VsZi5nZXRTY3JvbGxUb3AoKTtcclxuICAgICAgICBzZWxmLmRvU2Nyb2xsUG9zKHgsIHksIHNwZCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuZG9TY3JvbGxUb3AgPSBmdW5jdGlvbiAoeSwgc3BkKSB7IC8vZGlyZWN0XHJcbiAgICAgICAgdmFyIHggPSBzZWxmLmdldFNjcm9sbExlZnQoKTtcclxuICAgICAgICBzZWxmLmRvU2Nyb2xsUG9zKHgsIHksIHNwZCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuZG9TY3JvbGxQb3MgPSBmdW5jdGlvbiAoeCwgeSwgc3BkKSB7IC8vZGlyZWN0XHJcbiAgICAgICAgdmFyIG54ID0gKHggPiBzZWxmLnBhZ2UubWF4dykgPyBzZWxmLnBhZ2UubWF4dyA6IHg7XHJcbiAgICAgICAgaWYgKG54IDwgMCkgbnggPSAwO1xyXG4gICAgICAgIHZhciBueSA9ICh5ID4gc2VsZi5wYWdlLm1heGgpID8gc2VsZi5wYWdlLm1heGggOiB5O1xyXG4gICAgICAgIGlmIChueSA8IDApIG55ID0gMDtcclxuICAgICAgICBzZWxmLnN5bmNoZWQoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuc2V0U2Nyb2xsVG9wKG55KTtcclxuICAgICAgICAgIHNlbGYuc2V0U2Nyb2xsTGVmdChueCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY2FuY2VsU2Nyb2xsID0gZnVuY3Rpb24gKCkgeyB9OyAvLyBkaXJlY3RcclxuXHJcbiAgICB9IGVsc2UgaWYgKHNlbGYuaXNod3Njcm9sbCAmJiBjYXAuaGFzdHJhbnNpdGlvbiAmJiBvcHQudXNldHJhbnNpdGlvbiAmJiAhIW9wdC5zbW9vdGhzY3JvbGwpIHtcclxuXHJcbiAgICAgIHZhciBsYXN0dHJhbnNpdGlvbnN0eWxlID0gJyc7XHJcblxyXG4gICAgICB0aGlzLnJlc2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsYXN0dHJhbnNpdGlvbnN0eWxlID0gJyc7XHJcbiAgICAgICAgc2VsZi5kb2MuY3NzKGNhcC5wcmVmaXhzdHlsZSArICd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJzBtcycpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5wcmVwYXJlVHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChkaWYsIGlzdGltZSkge1xyXG4gICAgICAgIHZhciBleCA9IChpc3RpbWUpID8gZGlmIDogc2VsZi5nZXRUcmFuc2l0aW9uU3BlZWQoZGlmKTtcclxuICAgICAgICB2YXIgdHJhbnMgPSBleCArICdtcyc7XHJcbiAgICAgICAgaWYgKGxhc3R0cmFuc2l0aW9uc3R5bGUgIT09IHRyYW5zKSB7XHJcbiAgICAgICAgICBsYXN0dHJhbnNpdGlvbnN0eWxlID0gdHJhbnM7XHJcbiAgICAgICAgICBzZWxmLmRvYy5jc3MoY2FwLnByZWZpeHN0eWxlICsgJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0cmFucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleDtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuZG9TY3JvbGxMZWZ0ID0gZnVuY3Rpb24gKHgsIHNwZCkgeyAvL3RyYW5zXHJcbiAgICAgICAgdmFyIHkgPSAoc2VsZi5zY3JvbGxydW5uaW5nKSA/IHNlbGYubmV3c2Nyb2xseSA6IHNlbGYuZ2V0U2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgc2VsZi5kb1Njcm9sbFBvcyh4LCB5LCBzcGQpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5kb1Njcm9sbFRvcCA9IGZ1bmN0aW9uICh5LCBzcGQpIHsgLy90cmFuc1xyXG4gICAgICAgIHZhciB4ID0gKHNlbGYuc2Nyb2xscnVubmluZykgPyBzZWxmLm5ld3Njcm9sbHggOiBzZWxmLmdldFNjcm9sbExlZnQoKTtcclxuICAgICAgICBzZWxmLmRvU2Nyb2xsUG9zKHgsIHksIHNwZCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLmN1cnNvcnVwZGF0ZSA9IHtcclxuICAgICAgICBydW5uaW5nOiBmYWxzZSxcclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIG0gPSB0aGlzO1xyXG5cclxuICAgICAgICAgIGlmIChtLnJ1bm5pbmcpIHJldHVybjtcclxuICAgICAgICAgIG0ucnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChtLnJ1bm5pbmcpIHNldEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgICAgICBzZWxmLnNob3dDdXJzb3Ioc2VsZi5nZXRTY3JvbGxUb3AoKSwgc2VsZi5nZXRTY3JvbGxMZWZ0KCkpO1xyXG4gICAgICAgICAgICBzZWxmLm5vdGlmeVNjcm9sbEV2ZW50KHNlbGYud2luWzBdKTtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgc2V0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLmRvU2Nyb2xsUG9zID0gZnVuY3Rpb24gKHgsIHksIHNwZCkgeyAvL3RyYW5zXHJcblxyXG4gICAgICAgIHZhciBweSA9IHNlbGYuZ2V0U2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgdmFyIHB4ID0gc2VsZi5nZXRTY3JvbGxMZWZ0KCk7XHJcblxyXG4gICAgICAgIGlmICgoKHNlbGYubmV3c2Nyb2xseSAtIHB5KSAqICh5IC0gcHkpIDwgMCkgfHwgKChzZWxmLm5ld3Njcm9sbHggLSBweCkgKiAoeCAtIHB4KSA8IDApKSBzZWxmLmNhbmNlbFNjcm9sbCgpOyAvL2ludmVydGVkIG1vdmVtZW50IGRldGVjdGlvblxyXG5cclxuICAgICAgICBpZiAoIW9wdC5ib3VuY2VzY3JvbGwpIHtcclxuICAgICAgICAgIGlmICh5IDwgMCkgeSA9IDA7XHJcbiAgICAgICAgICBlbHNlIGlmICh5ID4gc2VsZi5wYWdlLm1heGgpIHkgPSBzZWxmLnBhZ2UubWF4aDtcclxuICAgICAgICAgIGlmICh4IDwgMCkgeCA9IDA7XHJcbiAgICAgICAgICBlbHNlIGlmICh4ID4gc2VsZi5wYWdlLm1heHcpIHggPSBzZWxmLnBhZ2UubWF4dztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKHkgPCAwKSB5ID0geSAvIDIgfCAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoeSA+IHNlbGYucGFnZS5tYXhoKSB5ID0gc2VsZi5wYWdlLm1heGggKyAoeSAtIHNlbGYucGFnZS5tYXhoKSAvIDIgfCAwO1xyXG4gICAgICAgICAgaWYgKHggPCAwKSB4ID0geCAvIDIgfCAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoeCA+IHNlbGYucGFnZS5tYXh3KSB4ID0gc2VsZi5wYWdlLm1heHcgKyAoeCAtIHNlbGYucGFnZS5tYXh3KSAvIDIgfCAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlbGYuc2Nyb2xscnVubmluZyAmJiB4ID09IHNlbGYubmV3c2Nyb2xseCAmJiB5ID09IHNlbGYubmV3c2Nyb2xseSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBzZWxmLm5ld3Njcm9sbHkgPSB5O1xyXG4gICAgICAgIHNlbGYubmV3c2Nyb2xseCA9IHg7XHJcblxyXG4gICAgICAgIHZhciB0b3AgPSBzZWxmLmdldFNjcm9sbFRvcCgpO1xyXG4gICAgICAgIHZhciBsZnQgPSBzZWxmLmdldFNjcm9sbExlZnQoKTtcclxuXHJcbiAgICAgICAgdmFyIGRzdCA9IHt9O1xyXG4gICAgICAgIGRzdC54ID0geCAtIGxmdDtcclxuICAgICAgICBkc3QueSA9IHkgLSB0b3A7XHJcblxyXG4gICAgICAgIHZhciBkZCA9IE1hdGguc3FydCgoZHN0LnggKiBkc3QueCkgKyAoZHN0LnkgKiBkc3QueSkpIHwgMDtcclxuXHJcbiAgICAgICAgdmFyIG1zID0gc2VsZi5wcmVwYXJlVHJhbnNpdGlvbihkZCk7XHJcblxyXG4gICAgICAgIGlmICghc2VsZi5zY3JvbGxydW5uaW5nKSB7XHJcbiAgICAgICAgICBzZWxmLnNjcm9sbHJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgc2VsZi50cmlnZ2VyU2Nyb2xsU3RhcnQobGZ0LCB0b3AsIHgsIHksIG1zKTtcclxuICAgICAgICAgIHNlbGYuY3Vyc29ydXBkYXRlLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLnNjcm9sbGVuZHRyYXBwZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIWNhcC50cmFuc2l0aW9uZW5kKSB7XHJcbiAgICAgICAgICBpZiAoc2VsZi5zY3JvbGxlbmR0cmFwcGVkKSBjbGVhclRpbWVvdXQoc2VsZi5zY3JvbGxlbmR0cmFwcGVkKTtcclxuICAgICAgICAgIHNlbGYuc2Nyb2xsZW5kdHJhcHBlZCA9IHNldFRpbWVvdXQoc2VsZi5vblNjcm9sbFRyYW5zaXRpb25FbmQsIG1zKTsgLy8gc2ltdWxhdGUgdHJhbnNpdGlvbmVuZCBldmVudFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5zZXRTY3JvbGxUb3Aoc2VsZi5uZXdzY3JvbGx5KTtcclxuICAgICAgICBzZWxmLnNldFNjcm9sbExlZnQoc2VsZi5uZXdzY3JvbGx4KTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLmNhbmNlbFNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXNlbGYuc2Nyb2xsZW5kdHJhcHBlZCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgdmFyIHB5ID0gc2VsZi5nZXRTY3JvbGxUb3AoKTtcclxuICAgICAgICB2YXIgcHggPSBzZWxmLmdldFNjcm9sbExlZnQoKTtcclxuICAgICAgICBzZWxmLnNjcm9sbHJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIWNhcC50cmFuc2l0aW9uZW5kKSBjbGVhclRpbWVvdXQoY2FwLnRyYW5zaXRpb25lbmQpO1xyXG4gICAgICAgIHNlbGYuc2Nyb2xsZW5kdHJhcHBlZCA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYucmVzZXRUcmFuc2l0aW9uKCk7XHJcbiAgICAgICAgc2VsZi5zZXRTY3JvbGxUb3AocHkpOyAvLyBmaXJlIGV2ZW50IG9uc2Nyb2xsXHJcbiAgICAgICAgaWYgKHNlbGYucmFpbGgpIHNlbGYuc2V0U2Nyb2xsTGVmdChweCk7XHJcbiAgICAgICAgaWYgKHNlbGYudGltZXJzY3JvbGwgJiYgc2VsZi50aW1lcnNjcm9sbC50bSkgY2xlYXJJbnRlcnZhbChzZWxmLnRpbWVyc2Nyb2xsLnRtKTtcclxuICAgICAgICBzZWxmLnRpbWVyc2Nyb2xsID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHNlbGYuY3Vyc29yZnJlZXplZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzZWxmLmN1cnNvcnVwZGF0ZS5zdG9wKCk7XHJcbiAgICAgICAgc2VsZi5zaG93Q3Vyc29yKHB5LCBweCk7XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLm9uU2Nyb2xsVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxmLnNjcm9sbGVuZHRyYXBwZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIHB5ID0gc2VsZi5nZXRTY3JvbGxUb3AoKTtcclxuICAgICAgICB2YXIgcHggPSBzZWxmLmdldFNjcm9sbExlZnQoKTtcclxuXHJcbiAgICAgICAgaWYgKHB5IDwgMCkgcHkgPSAwO1xyXG4gICAgICAgIGVsc2UgaWYgKHB5ID4gc2VsZi5wYWdlLm1heGgpIHB5ID0gc2VsZi5wYWdlLm1heGg7XHJcbiAgICAgICAgaWYgKHB4IDwgMCkgcHggPSAwO1xyXG4gICAgICAgIGVsc2UgaWYgKHB4ID4gc2VsZi5wYWdlLm1heHcpIHB4ID0gc2VsZi5wYWdlLm1heHc7XHJcbiAgICAgICAgaWYgKChweSAhPSBzZWxmLm5ld3Njcm9sbHkpIHx8IChweCAhPSBzZWxmLm5ld3Njcm9sbHgpKSByZXR1cm4gc2VsZi5kb1Njcm9sbFBvcyhweCwgcHksIG9wdC5zbmFwYmFja3NwZWVkKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuc2Nyb2xscnVubmluZykgc2VsZi50cmlnZ2VyU2Nyb2xsRW5kKCk7XHJcbiAgICAgICAgc2VsZi5zY3JvbGxydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHNlbGYuc2Nyb2xsZW5kdHJhcHBlZCA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYucmVzZXRUcmFuc2l0aW9uKCk7XHJcbiAgICAgICAgc2VsZi50aW1lcnNjcm9sbCA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuc2V0U2Nyb2xsVG9wKHB5KTsgLy8gZmlyZSBldmVudCBvbnNjcm9sbFxyXG4gICAgICAgIGlmIChzZWxmLnJhaWxoKSBzZWxmLnNldFNjcm9sbExlZnQocHgpOyAvLyBmaXJlIGV2ZW50IG9uc2Nyb2xsIGxlZnRcclxuXHJcbiAgICAgICAgc2VsZi5jdXJzb3J1cGRhdGUuc3RvcCgpO1xyXG4gICAgICAgIHNlbGYubm90aWNlQ3Vyc29yKGZhbHNlLCBweSwgcHgpO1xyXG5cclxuICAgICAgICBzZWxmLmN1cnNvcmZyZWV6ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHRoaXMuZG9TY3JvbGxMZWZ0ID0gZnVuY3Rpb24gKHgsIHNwZCkgeyAvL25vLXRyYW5zXHJcbiAgICAgICAgdmFyIHkgPSAoc2VsZi5zY3JvbGxydW5uaW5nKSA/IHNlbGYubmV3c2Nyb2xseSA6IHNlbGYuZ2V0U2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgc2VsZi5kb1Njcm9sbFBvcyh4LCB5LCBzcGQpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5kb1Njcm9sbFRvcCA9IGZ1bmN0aW9uICh5LCBzcGQpIHsgLy9uby10cmFuc1xyXG4gICAgICAgIHZhciB4ID0gKHNlbGYuc2Nyb2xscnVubmluZykgPyBzZWxmLm5ld3Njcm9sbHggOiBzZWxmLmdldFNjcm9sbExlZnQoKTtcclxuICAgICAgICBzZWxmLmRvU2Nyb2xsUG9zKHgsIHksIHNwZCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLmRvU2Nyb2xsUG9zID0gZnVuY3Rpb24gKHgsIHksIHNwZCkgeyAvL25vLXRyYW5zXHJcblxyXG4gICAgICAgIHZhciBweSA9IHNlbGYuZ2V0U2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgdmFyIHB4ID0gc2VsZi5nZXRTY3JvbGxMZWZ0KCk7XHJcblxyXG4gICAgICAgIGlmICgoKHNlbGYubmV3c2Nyb2xseSAtIHB5KSAqICh5IC0gcHkpIDwgMCkgfHwgKChzZWxmLm5ld3Njcm9sbHggLSBweCkgKiAoeCAtIHB4KSA8IDApKSBzZWxmLmNhbmNlbFNjcm9sbCgpOyAvL2ludmVydGVkIG1vdmVtZW50IGRldGVjdGlvblxyXG5cclxuICAgICAgICB2YXIgY2xpcHBlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGYuYm91bmNlc2Nyb2xsIHx8ICFzZWxmLnJhaWwudmlzaWJpbGl0eSkge1xyXG4gICAgICAgICAgaWYgKHkgPCAwKSB7XHJcbiAgICAgICAgICAgIHkgPSAwO1xyXG4gICAgICAgICAgICBjbGlwcGVkID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoeSA+IHNlbGYucGFnZS5tYXhoKSB7XHJcbiAgICAgICAgICAgIHkgPSBzZWxmLnBhZ2UubWF4aDtcclxuICAgICAgICAgICAgY2xpcHBlZCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2VsZi5ib3VuY2VzY3JvbGwgfHwgIXNlbGYucmFpbGgudmlzaWJpbGl0eSkge1xyXG4gICAgICAgICAgaWYgKHggPCAwKSB7XHJcbiAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgICAgICBjbGlwcGVkID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoeCA+IHNlbGYucGFnZS5tYXh3KSB7XHJcbiAgICAgICAgICAgIHggPSBzZWxmLnBhZ2UubWF4dztcclxuICAgICAgICAgICAgY2xpcHBlZCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZi5zY3JvbGxydW5uaW5nICYmIChzZWxmLm5ld3Njcm9sbHkgPT09IHkpICYmIChzZWxmLm5ld3Njcm9sbHggPT09IHgpKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgc2VsZi5uZXdzY3JvbGx5ID0geTtcclxuICAgICAgICBzZWxmLm5ld3Njcm9sbHggPSB4O1xyXG5cclxuICAgICAgICBzZWxmLmRzdCA9IHt9O1xyXG4gICAgICAgIHNlbGYuZHN0LnggPSB4IC0gcHg7XHJcbiAgICAgICAgc2VsZi5kc3QueSA9IHkgLSBweTtcclxuICAgICAgICBzZWxmLmRzdC5weCA9IHB4O1xyXG4gICAgICAgIHNlbGYuZHN0LnB5ID0gcHk7XHJcblxyXG4gICAgICAgIHZhciBkZCA9IE1hdGguc3FydCgoc2VsZi5kc3QueCAqIHNlbGYuZHN0LngpICsgKHNlbGYuZHN0LnkgKiBzZWxmLmRzdC55KSkgfCAwO1xyXG4gICAgICAgIHZhciBtcyA9IHNlbGYuZ2V0VHJhbnNpdGlvblNwZWVkKGRkKTtcclxuXHJcbiAgICAgICAgc2VsZi5ienNjcm9sbCA9IHt9O1xyXG5cclxuICAgICAgICB2YXIgcDMgPSAoY2xpcHBlZCkgPyAxIDogMC41ODtcclxuICAgICAgICBzZWxmLmJ6c2Nyb2xsLnggPSBuZXcgQmV6aWVyQ2xhc3MocHgsIHNlbGYubmV3c2Nyb2xseCwgbXMsIDAsIDAsIHAzLCAxKTtcclxuICAgICAgICBzZWxmLmJ6c2Nyb2xsLnkgPSBuZXcgQmV6aWVyQ2xhc3MocHksIHNlbGYubmV3c2Nyb2xseSwgbXMsIDAsIDAsIHAzLCAxKTtcclxuXHJcbiAgICAgICAgdmFyIGxvb3BpZCA9IG5vdygpO1xyXG5cclxuICAgICAgICB2YXIgbG9vcCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICBpZiAoIXNlbGYuc2Nyb2xscnVubmluZykgcmV0dXJuO1xyXG4gICAgICAgICAgdmFyIHggPSBzZWxmLmJ6c2Nyb2xsLnkuZ2V0UG9zKCk7XHJcblxyXG4gICAgICAgICAgc2VsZi5zZXRTY3JvbGxMZWZ0KHNlbGYuYnpzY3JvbGwueC5nZXROb3coKSk7XHJcbiAgICAgICAgICBzZWxmLnNldFNjcm9sbFRvcChzZWxmLmJ6c2Nyb2xsLnkuZ2V0Tm93KCkpO1xyXG5cclxuICAgICAgICAgIGlmICh4IDw9IDEpIHtcclxuICAgICAgICAgICAgc2VsZi50aW1lciA9IHNldEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5zY3JvbGxydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYudGltZXIgPSAwO1xyXG4gICAgICAgICAgICBzZWxmLnRyaWdnZXJTY3JvbGxFbmQoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxmLnNjcm9sbHJ1bm5pbmcpIHtcclxuICAgICAgICAgIHNlbGYudHJpZ2dlclNjcm9sbFN0YXJ0KHB4LCBweSwgeCwgeSwgbXMpO1xyXG4gICAgICAgICAgc2VsZi5zY3JvbGxydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgIHNlbGYudGltZXIgPSBzZXRBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5jYW5jZWxTY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYudGltZXIpIGNsZWFyQW5pbWF0aW9uRnJhbWUoc2VsZi50aW1lcik7XHJcbiAgICAgICAgc2VsZi50aW1lciA9IDA7XHJcbiAgICAgICAgc2VsZi5ienNjcm9sbCA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuc2Nyb2xscnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRvU2Nyb2xsQnkgPSBmdW5jdGlvbiAoc3RwLCByZWxhdGl2ZSkge1xyXG4gICAgICBkb1Njcm9sbFJlbGF0aXZlKDAsIHN0cCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZG9TY3JvbGxMZWZ0QnkgPSBmdW5jdGlvbiAoc3RwLCByZWxhdGl2ZSkge1xyXG4gICAgICBkb1Njcm9sbFJlbGF0aXZlKHN0cCwgMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZG9TY3JvbGxUbyA9IGZ1bmN0aW9uIChwb3MsIHJlbGF0aXZlKSB7XHJcbiAgICAgIHZhciBueSA9IChyZWxhdGl2ZSkgPyBNYXRoLnJvdW5kKHBvcyAqIHNlbGYuc2Nyb2xscmF0aW8ueSkgOiBwb3M7XHJcbiAgICAgIGlmIChueSA8IDApIG55ID0gMDtcclxuICAgICAgZWxzZSBpZiAobnkgPiBzZWxmLnBhZ2UubWF4aCkgbnkgPSBzZWxmLnBhZ2UubWF4aDtcclxuICAgICAgc2VsZi5jdXJzb3JmcmVlemVkID0gZmFsc2U7XHJcbiAgICAgIHNlbGYuZG9TY3JvbGxUb3AocG9zKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jaGVja0NvbnRlbnRTaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgcGcgPSBzZWxmLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgIGlmICgocGcuaCAhPSBzZWxmLnBhZ2UuaCkgfHwgKHBnLncgIT0gc2VsZi5wYWdlLncpKSBzZWxmLnJlc2l6ZShmYWxzZSwgcGcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLm9uc2Nyb2xsID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgaWYgKHNlbGYucmFpbC5kcmFnKSByZXR1cm47XHJcbiAgICAgIGlmICghc2VsZi5jdXJzb3JmcmVlemVkKSB7XHJcbiAgICAgICAgc2VsZi5zeW5jaGVkKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLnNjcm9sbC55ID0gTWF0aC5yb3VuZChzZWxmLmdldFNjcm9sbFRvcCgpIC8gc2VsZi5zY3JvbGxyYXRpby55KTtcclxuICAgICAgICAgIGlmIChzZWxmLnJhaWxoKSBzZWxmLnNjcm9sbC54ID0gTWF0aC5yb3VuZChzZWxmLmdldFNjcm9sbExlZnQoKSAvIHNlbGYuc2Nyb2xscmF0aW8ueCk7XHJcbiAgICAgICAgICBzZWxmLm5vdGljZUN1cnNvcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgc2VsZi5iaW5kKHNlbGYuZG9jc2Nyb2xsLCBcInNjcm9sbFwiLCBzZWxmLm9uc2Nyb2xsKTtcclxuXHJcbiAgICB0aGlzLmRvWm9vbUluID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgaWYgKHNlbGYuem9vbWFjdGl2ZSkgcmV0dXJuO1xyXG4gICAgICBzZWxmLnpvb21hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgc2VsZi56b29tcmVzdG9yZSA9IHtcclxuICAgICAgICBzdHlsZToge31cclxuICAgICAgfTtcclxuICAgICAgdmFyIGxzdCA9IFsncG9zaXRpb24nLCAndG9wJywgJ2xlZnQnLCAnekluZGV4JywgJ2JhY2tncm91bmRDb2xvcicsICdtYXJnaW5Ub3AnLCAnbWFyZ2luQm90dG9tJywgJ21hcmdpbkxlZnQnLCAnbWFyZ2luUmlnaHQnXTtcclxuICAgICAgdmFyIHdpbiA9IHNlbGYud2luWzBdLnN0eWxlO1xyXG4gICAgICBmb3IgKHZhciBhIGluIGxzdCkge1xyXG4gICAgICAgIHZhciBwcCA9IGxzdFthXTtcclxuICAgICAgICBzZWxmLnpvb21yZXN0b3JlLnN0eWxlW3BwXSA9ICh3aW5bcHBdICE9PSB1bmRlZmluZWQpID8gd2luW3BwXSA6ICcnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLnpvb21yZXN0b3JlLnN0eWxlLndpZHRoID0gc2VsZi53aW4uY3NzKCd3aWR0aCcpO1xyXG4gICAgICBzZWxmLnpvb21yZXN0b3JlLnN0eWxlLmhlaWdodCA9IHNlbGYud2luLmNzcygnaGVpZ2h0Jyk7XHJcblxyXG4gICAgICBzZWxmLnpvb21yZXN0b3JlLnBhZGRpbmcgPSB7XHJcbiAgICAgICAgdzogc2VsZi53aW4ub3V0ZXJXaWR0aCgpIC0gc2VsZi53aW4ud2lkdGgoKSxcclxuICAgICAgICBoOiBzZWxmLndpbi5vdXRlckhlaWdodCgpIC0gc2VsZi53aW4uaGVpZ2h0KClcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChjYXAuaXNpb3M0KSB7XHJcbiAgICAgICAgc2VsZi56b29tcmVzdG9yZS5zY3JvbGxUb3AgPSAkd2luZG93LnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICR3aW5kb3cuc2Nyb2xsVG9wKDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLndpbi5jc3Moe1xyXG4gICAgICAgIHBvc2l0aW9uOiAoY2FwLmlzaW9zNCkgPyBcImFic29sdXRlXCIgOiBcImZpeGVkXCIsXHJcbiAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgekluZGV4OiBnbG9iYWxtYXh6aW5kZXggKyAxMDAsXHJcbiAgICAgICAgbWFyZ2luOiAwXHJcbiAgICAgIH0pO1xyXG4gICAgICB2YXIgYmtnID0gc2VsZi53aW4uY3NzKFwiYmFja2dyb3VuZENvbG9yXCIpO1xyXG4gICAgICBpZiAoXCJcIiA9PT0gYmtnIHx8IC90cmFuc3BhcmVudHxyZ2JhXFwoMCwgMCwgMCwgMFxcKXxyZ2JhXFwoMCwwLDAsMFxcKS8udGVzdChia2cpKSBzZWxmLndpbi5jc3MoXCJiYWNrZ3JvdW5kQ29sb3JcIiwgXCIjZmZmXCIpO1xyXG4gICAgICBzZWxmLnJhaWwuY3NzKHtcclxuICAgICAgICB6SW5kZXg6IGdsb2JhbG1heHppbmRleCArIDEwMVxyXG4gICAgICB9KTtcclxuICAgICAgc2VsZi56b29tLmNzcyh7XHJcbiAgICAgICAgekluZGV4OiBnbG9iYWxtYXh6aW5kZXggKyAxMDJcclxuICAgICAgfSk7XHJcbiAgICAgIHNlbGYuem9vbS5jc3MoJ2JhY2tncm91bmRQb3NpdGlvbicsICcwIC0xOHB4Jyk7XHJcbiAgICAgIHNlbGYucmVzaXplWm9vbSgpO1xyXG5cclxuICAgICAgaWYgKHNlbGYub256b29taW4pIHNlbGYub256b29taW4uY2FsbChzZWxmKTtcclxuXHJcbiAgICAgIHJldHVybiBzZWxmLmNhbmNlbEV2ZW50KGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRvWm9vbU91dCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGlmICghc2VsZi56b29tYWN0aXZlKSByZXR1cm47XHJcbiAgICAgIHNlbGYuem9vbWFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgc2VsZi53aW4uY3NzKFwibWFyZ2luXCIsIFwiXCIpO1xyXG4gICAgICBzZWxmLndpbi5jc3Moc2VsZi56b29tcmVzdG9yZS5zdHlsZSk7XHJcblxyXG4gICAgICBpZiAoY2FwLmlzaW9zNCkge1xyXG4gICAgICAgICR3aW5kb3cuc2Nyb2xsVG9wKHNlbGYuem9vbXJlc3RvcmUuc2Nyb2xsVG9wKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5yYWlsLmNzcyh7XHJcbiAgICAgICAgXCJ6LWluZGV4XCI6IHNlbGYuemluZGV4XHJcbiAgICAgIH0pO1xyXG4gICAgICBzZWxmLnpvb20uY3NzKHtcclxuICAgICAgICBcInotaW5kZXhcIjogc2VsZi56aW5kZXhcclxuICAgICAgfSk7XHJcbiAgICAgIHNlbGYuem9vbXJlc3RvcmUgPSBmYWxzZTtcclxuICAgICAgc2VsZi56b29tLmNzcygnYmFja2dyb3VuZFBvc2l0aW9uJywgJzAgMCcpO1xyXG4gICAgICBzZWxmLm9uUmVzaXplKCk7XHJcblxyXG4gICAgICBpZiAoc2VsZi5vbnpvb21vdXQpIHNlbGYub256b29tb3V0LmNhbGwoc2VsZik7XHJcblxyXG4gICAgICByZXR1cm4gc2VsZi5jYW5jZWxFdmVudChlKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kb1pvb20gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICByZXR1cm4gKHNlbGYuem9vbWFjdGl2ZSkgPyBzZWxmLmRvWm9vbU91dChlKSA6IHNlbGYuZG9ab29tSW4oZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVzaXplWm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCFzZWxmLnpvb21hY3RpdmUpIHJldHVybjtcclxuXHJcbiAgICAgIHZhciBweSA9IHNlbGYuZ2V0U2Nyb2xsVG9wKCk7IC8vcHJlc2VydmUgc2Nyb2xsaW5nIHBvc2l0aW9uXHJcbiAgICAgIHNlbGYud2luLmNzcyh7XHJcbiAgICAgICAgd2lkdGg6ICR3aW5kb3cud2lkdGgoKSAtIHNlbGYuem9vbXJlc3RvcmUucGFkZGluZy53ICsgXCJweFwiLFxyXG4gICAgICAgIGhlaWdodDogJHdpbmRvdy5oZWlnaHQoKSAtIHNlbGYuem9vbXJlc3RvcmUucGFkZGluZy5oICsgXCJweFwiXHJcbiAgICAgIH0pO1xyXG4gICAgICBzZWxmLm9uUmVzaXplKCk7XHJcblxyXG4gICAgICBzZWxmLnNldFNjcm9sbFRvcChNYXRoLm1pbihzZWxmLnBhZ2UubWF4aCwgcHkpKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgJC5uaWNlc2Nyb2xsLnB1c2godGhpcyk7XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIEluc3BpcmVkIGJ5IHRoZSB3b3JrIG9mIEtpbiBCbGFzXHJcbiAgLy8gaHR0cDovL3dlYnByby5ob3N0LmFkb2JlLmNvbS9wZW9wbGUvamJsYXMvbW9tZW50dW0vaW5jbHVkZXMvanF1ZXJ5Lm1vbWVudHVtLjAuNy5qc1xyXG4gIHZhciBTY3JvbGxNb21lbnR1bUNsYXNzMkQgPSBmdW5jdGlvbiAobmMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMubmMgPSBuYztcclxuXHJcbiAgICB0aGlzLmxhc3R4ID0gMDtcclxuICAgIHRoaXMubGFzdHkgPSAwO1xyXG4gICAgdGhpcy5zcGVlZHggPSAwO1xyXG4gICAgdGhpcy5zcGVlZHkgPSAwO1xyXG4gICAgdGhpcy5sYXN0dGltZSA9IDA7XHJcbiAgICB0aGlzLnN0ZXB0aW1lID0gMDtcclxuICAgIHRoaXMuc25hcHggPSBmYWxzZTtcclxuICAgIHRoaXMuc25hcHkgPSBmYWxzZTtcclxuICAgIHRoaXMuZGVtdWx4ID0gMDtcclxuICAgIHRoaXMuZGVtdWx5ID0gMDtcclxuXHJcbiAgICB0aGlzLmxhc3RzY3JvbGx4ID0gLTE7XHJcbiAgICB0aGlzLmxhc3RzY3JvbGx5ID0gLTE7XHJcblxyXG4gICAgdGhpcy5jaGt4ID0gMDtcclxuICAgIHRoaXMuY2hreSA9IDA7XHJcblxyXG4gICAgdGhpcy50aW1lciA9IDA7XHJcblxyXG4gICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uIChweCwgcHkpIHtcclxuICAgICAgc2VsZi5zdG9wKCk7XHJcbiAgICAgIHNlbGYuc3RlcHRpbWUgPSAwO1xyXG4gICAgICBzZWxmLmxhc3R0aW1lID0gbm93KCk7XHJcbiAgICAgIHNlbGYuc3BlZWR4ID0gMDtcclxuICAgICAgc2VsZi5zcGVlZHkgPSAwO1xyXG4gICAgICBzZWxmLmxhc3R4ID0gcHg7XHJcbiAgICAgIHNlbGYubGFzdHkgPSBweTtcclxuICAgICAgc2VsZi5sYXN0c2Nyb2xseCA9IC0xO1xyXG4gICAgICBzZWxmLmxhc3RzY3JvbGx5ID0gLTE7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKHB4LCBweSkge1xyXG4gICAgICB2YXIgdG0gPSBub3coKTtcclxuICAgICAgc2VsZi5zdGVwdGltZSA9IHRtIC0gc2VsZi5sYXN0dGltZTtcclxuICAgICAgc2VsZi5sYXN0dGltZSA9IHRtO1xyXG4gICAgICB2YXIgZHkgPSBweSAtIHNlbGYubGFzdHk7XHJcbiAgICAgIHZhciBkeCA9IHB4IC0gc2VsZi5sYXN0eDtcclxuICAgICAgdmFyIHN5ID0gc2VsZi5uYy5nZXRTY3JvbGxUb3AoKTtcclxuICAgICAgdmFyIHN4ID0gc2VsZi5uYy5nZXRTY3JvbGxMZWZ0KCk7XHJcbiAgICAgIHZhciBuZXd5ID0gc3kgKyBkeTtcclxuICAgICAgdmFyIG5ld3ggPSBzeCArIGR4O1xyXG4gICAgICBzZWxmLnNuYXB4ID0gKG5ld3ggPCAwKSB8fCAobmV3eCA+IHNlbGYubmMucGFnZS5tYXh3KTtcclxuICAgICAgc2VsZi5zbmFweSA9IChuZXd5IDwgMCkgfHwgKG5ld3kgPiBzZWxmLm5jLnBhZ2UubWF4aCk7XHJcbiAgICAgIHNlbGYuc3BlZWR4ID0gZHg7XHJcbiAgICAgIHNlbGYuc3BlZWR5ID0gZHk7XHJcbiAgICAgIHNlbGYubGFzdHggPSBweDtcclxuICAgICAgc2VsZi5sYXN0eSA9IHB5O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNlbGYubmMudW5zeW5jaGVkKFwiZG9tb21lbnR1bTJkXCIpO1xyXG4gICAgICBpZiAoc2VsZi50aW1lcikgY2xlYXJUaW1lb3V0KHNlbGYudGltZXIpO1xyXG4gICAgICBzZWxmLnRpbWVyID0gMDtcclxuICAgICAgc2VsZi5sYXN0c2Nyb2xseCA9IC0xO1xyXG4gICAgICBzZWxmLmxhc3RzY3JvbGx5ID0gLTE7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZG9TbmFweSA9IGZ1bmN0aW9uIChueCwgbnkpIHtcclxuICAgICAgdmFyIHNuYXAgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChueSA8IDApIHtcclxuICAgICAgICBueSA9IDA7XHJcbiAgICAgICAgc25hcCA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAobnkgPiBzZWxmLm5jLnBhZ2UubWF4aCkge1xyXG4gICAgICAgIG55ID0gc2VsZi5uYy5wYWdlLm1heGg7XHJcbiAgICAgICAgc25hcCA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChueCA8IDApIHtcclxuICAgICAgICBueCA9IDA7XHJcbiAgICAgICAgc25hcCA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAobnggPiBzZWxmLm5jLnBhZ2UubWF4dykge1xyXG4gICAgICAgIG54ID0gc2VsZi5uYy5wYWdlLm1heHc7XHJcbiAgICAgICAgc25hcCA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIChzbmFwKSA/IHNlbGYubmMuZG9TY3JvbGxQb3MobngsIG55LCBzZWxmLm5jLm9wdC5zbmFwYmFja3NwZWVkKSA6IHNlbGYubmMudHJpZ2dlclNjcm9sbEVuZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRvTW9tZW50dW0gPSBmdW5jdGlvbiAoZ3ApIHtcclxuICAgICAgdmFyIHQgPSBub3coKTtcclxuICAgICAgdmFyIGwgPSAoZ3ApID8gdCArIGdwIDogc2VsZi5sYXN0dGltZTtcclxuXHJcbiAgICAgIHZhciBzbCA9IHNlbGYubmMuZ2V0U2Nyb2xsTGVmdCgpO1xyXG4gICAgICB2YXIgc3QgPSBzZWxmLm5jLmdldFNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgdmFyIHBhZ2VoID0gc2VsZi5uYy5wYWdlLm1heGg7XHJcbiAgICAgIHZhciBwYWdldyA9IHNlbGYubmMucGFnZS5tYXh3O1xyXG5cclxuICAgICAgc2VsZi5zcGVlZHggPSAocGFnZXcgPiAwKSA/IE1hdGgubWluKDYwLCBzZWxmLnNwZWVkeCkgOiAwO1xyXG4gICAgICBzZWxmLnNwZWVkeSA9IChwYWdlaCA+IDApID8gTWF0aC5taW4oNjAsIHNlbGYuc3BlZWR5KSA6IDA7XHJcblxyXG4gICAgICB2YXIgY2hrID0gbCAmJiAodCAtIGwpIDw9IDYwO1xyXG5cclxuICAgICAgaWYgKChzdCA8IDApIHx8IChzdCA+IHBhZ2VoKSB8fCAoc2wgPCAwKSB8fCAoc2wgPiBwYWdldykpIGNoayA9IGZhbHNlO1xyXG5cclxuICAgICAgdmFyIHN5ID0gKHNlbGYuc3BlZWR5ICYmIGNoaykgPyBzZWxmLnNwZWVkeSA6IGZhbHNlO1xyXG4gICAgICB2YXIgc3ggPSAoc2VsZi5zcGVlZHggJiYgY2hrKSA/IHNlbGYuc3BlZWR4IDogZmFsc2U7XHJcblxyXG4gICAgICBpZiAoc3kgfHwgc3gpIHtcclxuICAgICAgICB2YXIgdG0gPSBNYXRoLm1heCgxNiwgc2VsZi5zdGVwdGltZSk7IC8vdGltZW91dCBncmFudWxhcml0eVxyXG5cclxuICAgICAgICBpZiAodG0gPiA1MCkgeyAvLyBkbyBzbW9vdGhcclxuICAgICAgICAgIHZhciB4bSA9IHRtIC8gNTA7XHJcbiAgICAgICAgICBzZWxmLnNwZWVkeCAqPSB4bTtcclxuICAgICAgICAgIHNlbGYuc3BlZWR5ICo9IHhtO1xyXG4gICAgICAgICAgdG0gPSA1MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuZGVtdWx4eSA9IDA7XHJcblxyXG4gICAgICAgIHNlbGYubGFzdHNjcm9sbHggPSBzZWxmLm5jLmdldFNjcm9sbExlZnQoKTtcclxuICAgICAgICBzZWxmLmNoa3ggPSBzZWxmLmxhc3RzY3JvbGx4O1xyXG4gICAgICAgIHNlbGYubGFzdHNjcm9sbHkgPSBzZWxmLm5jLmdldFNjcm9sbFRvcCgpO1xyXG4gICAgICAgIHNlbGYuY2hreSA9IHNlbGYubGFzdHNjcm9sbHk7XHJcblxyXG4gICAgICAgIHZhciBueCA9IHNlbGYubGFzdHNjcm9sbHg7XHJcbiAgICAgICAgdmFyIG55ID0gc2VsZi5sYXN0c2Nyb2xseTtcclxuXHJcbiAgICAgICAgdmFyIG9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIGRmID0gKChub3coKSAtIHQpID4gNjAwKSA/IDAuMDQgOiAwLjAyO1xyXG5cclxuICAgICAgICAgIGlmIChzZWxmLnNwZWVkeCkge1xyXG4gICAgICAgICAgICBueCA9IE1hdGguZmxvb3Ioc2VsZi5sYXN0c2Nyb2xseCAtIChzZWxmLnNwZWVkeCAqICgxIC0gc2VsZi5kZW11bHh5KSkpO1xyXG4gICAgICAgICAgICBzZWxmLmxhc3RzY3JvbGx4ID0gbng7XHJcbiAgICAgICAgICAgIGlmICgobnggPCAwKSB8fCAobnggPiBwYWdldykpIGRmID0gMC4xMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoc2VsZi5zcGVlZHkpIHtcclxuICAgICAgICAgICAgbnkgPSBNYXRoLmZsb29yKHNlbGYubGFzdHNjcm9sbHkgLSAoc2VsZi5zcGVlZHkgKiAoMSAtIHNlbGYuZGVtdWx4eSkpKTtcclxuICAgICAgICAgICAgc2VsZi5sYXN0c2Nyb2xseSA9IG55O1xyXG4gICAgICAgICAgICBpZiAoKG55IDwgMCkgfHwgKG55ID4gcGFnZWgpKSBkZiA9IDAuMTA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2VsZi5kZW11bHh5ID0gTWF0aC5taW4oMSwgc2VsZi5kZW11bHh5ICsgZGYpO1xyXG5cclxuICAgICAgICAgIHNlbGYubmMuc3luY2hlZChcImRvbW9tZW50dW0yZFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5zcGVlZHgpIHtcclxuICAgICAgICAgICAgICB2YXIgc2N4ID0gc2VsZi5uYy5nZXRTY3JvbGxMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgIGlmIChzY3ggIT0gc2VsZi5jaGt4KSBzZWxmLnN0b3AoKTtcclxuICAgICAgICAgICAgICBzZWxmLmNoa3ggPSBueDtcclxuICAgICAgICAgICAgICBzZWxmLm5jLnNldFNjcm9sbExlZnQobngpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5zcGVlZHkpIHtcclxuICAgICAgICAgICAgICB2YXIgc2N5ID0gc2VsZi5uYy5nZXRTY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgaWYgKHNjeSAhPSBzZWxmLmNoa3kpIHNlbGYuc3RvcCgpO1xyXG4gICAgICAgICAgICAgIHNlbGYuY2hreSA9IG55O1xyXG4gICAgICAgICAgICAgIHNlbGYubmMuc2V0U2Nyb2xsVG9wKG55KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFzZWxmLnRpbWVyKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5uYy5oaWRlQ3Vyc29yKCk7XHJcbiAgICAgICAgICAgICAgc2VsZi5kb1NuYXB5KG54LCBueSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAoc2VsZi5kZW11bHh5IDwgMSkge1xyXG4gICAgICAgICAgICBzZWxmLnRpbWVyID0gc2V0VGltZW91dChvbnNjcm9sbCwgdG0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5zdG9wKCk7XHJcbiAgICAgICAgICAgIHNlbGYubmMuaGlkZUN1cnNvcigpO1xyXG4gICAgICAgICAgICBzZWxmLmRvU25hcHkobngsIG55KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvbnNjcm9sbCgpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxmLmRvU25hcHkoc2VsZi5uYy5nZXRTY3JvbGxMZWZ0KCksIHNlbGYubmMuZ2V0U2Nyb2xsVG9wKCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIG92ZXJyaWRlIGpRdWVyeSBzY3JvbGxUb3BcclxuICB2YXIgX3Njcm9sbFRvcCA9IGpRdWVyeS5mbi5zY3JvbGxUb3A7IC8vIHByZXNlcnZlIG9yaWdpbmFsIGZ1bmN0aW9uXHJcblxyXG4gIGpRdWVyeS5jc3NIb29rcy5wYWdlWU9mZnNldCA9IHtcclxuICAgIGdldDogZnVuY3Rpb24gKGVsZW0sIGNvbXB1dGVkLCBleHRyYSkge1xyXG4gICAgICB2YXIgbmljZSA9ICQuZGF0YShlbGVtLCAnX19uaWNlc2Nyb2xsJykgfHwgZmFsc2U7XHJcbiAgICAgIHJldHVybiAobmljZSAmJiBuaWNlLmlzaHdzY3JvbGwpID8gbmljZS5nZXRTY3JvbGxUb3AoKSA6IF9zY3JvbGxUb3AuY2FsbChlbGVtKTtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSkge1xyXG4gICAgICB2YXIgbmljZSA9ICQuZGF0YShlbGVtLCAnX19uaWNlc2Nyb2xsJykgfHwgZmFsc2U7XHJcbiAgICAgIChuaWNlICYmIG5pY2UuaXNod3Njcm9sbCkgPyBuaWNlLnNldFNjcm9sbFRvcChwYXJzZUludCh2YWx1ZSkpIDogX3Njcm9sbFRvcC5jYWxsKGVsZW0sIHZhbHVlKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgalF1ZXJ5LmZuLnNjcm9sbFRvcCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdmFyIG5pY2UgPSAodGhpc1swXSkgPyAkLmRhdGEodGhpc1swXSwgJ19fbmljZXNjcm9sbCcpIHx8IGZhbHNlIDogZmFsc2U7XHJcbiAgICAgIHJldHVybiAobmljZSAmJiBuaWNlLmlzaHdzY3JvbGwpID8gbmljZS5nZXRTY3JvbGxUb3AoKSA6IF9zY3JvbGxUb3AuY2FsbCh0aGlzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuaWNlID0gJC5kYXRhKHRoaXMsICdfX25pY2VzY3JvbGwnKSB8fCBmYWxzZTtcclxuICAgICAgICAobmljZSAmJiBuaWNlLmlzaHdzY3JvbGwpID8gbmljZS5zZXRTY3JvbGxUb3AocGFyc2VJbnQodmFsdWUpKSA6IF9zY3JvbGxUb3AuY2FsbCgkKHRoaXMpLCB2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIG92ZXJyaWRlIGpRdWVyeSBzY3JvbGxMZWZ0XHJcbiAgdmFyIF9zY3JvbGxMZWZ0ID0galF1ZXJ5LmZuLnNjcm9sbExlZnQ7IC8vIHByZXNlcnZlIG9yaWdpbmFsIGZ1bmN0aW9uXHJcblxyXG4gICQuY3NzSG9va3MucGFnZVhPZmZzZXQgPSB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uIChlbGVtLCBjb21wdXRlZCwgZXh0cmEpIHtcclxuICAgICAgdmFyIG5pY2UgPSAkLmRhdGEoZWxlbSwgJ19fbmljZXNjcm9sbCcpIHx8IGZhbHNlO1xyXG4gICAgICByZXR1cm4gKG5pY2UgJiYgbmljZS5pc2h3c2Nyb2xsKSA/IG5pY2UuZ2V0U2Nyb2xsTGVmdCgpIDogX3Njcm9sbExlZnQuY2FsbChlbGVtKTtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSkge1xyXG4gICAgICB2YXIgbmljZSA9ICQuZGF0YShlbGVtLCAnX19uaWNlc2Nyb2xsJykgfHwgZmFsc2U7XHJcbiAgICAgIChuaWNlICYmIG5pY2UuaXNod3Njcm9sbCkgPyBuaWNlLnNldFNjcm9sbExlZnQocGFyc2VJbnQodmFsdWUpKSA6IF9zY3JvbGxMZWZ0LmNhbGwoZWxlbSwgdmFsdWUpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBqUXVlcnkuZm4uc2Nyb2xsTGVmdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdmFyIG5pY2UgPSAodGhpc1swXSkgPyAkLmRhdGEodGhpc1swXSwgJ19fbmljZXNjcm9sbCcpIHx8IGZhbHNlIDogZmFsc2U7XHJcbiAgICAgIHJldHVybiAobmljZSAmJiBuaWNlLmlzaHdzY3JvbGwpID8gbmljZS5nZXRTY3JvbGxMZWZ0KCkgOiBfc2Nyb2xsTGVmdC5jYWxsKHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5pY2UgPSAkLmRhdGEodGhpcywgJ19fbmljZXNjcm9sbCcpIHx8IGZhbHNlO1xyXG4gICAgICAgIChuaWNlICYmIG5pY2UuaXNod3Njcm9sbCkgPyBuaWNlLnNldFNjcm9sbExlZnQocGFyc2VJbnQodmFsdWUpKSA6IF9zY3JvbGxMZWZ0LmNhbGwoJCh0aGlzKSwgdmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgTmljZVNjcm9sbEFycmF5ID0gZnVuY3Rpb24gKGRvbXMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMubGVuZ3RoID0gMDtcclxuICAgIHRoaXMubmFtZSA9IFwibmljZXNjcm9sbGFycmF5XCI7XHJcblxyXG4gICAgdGhpcy5lYWNoID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICQuZWFjaChzZWxmLCBmbik7XHJcbiAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnB1c2ggPSBmdW5jdGlvbiAobmljZSkge1xyXG4gICAgICBzZWxmW3NlbGYubGVuZ3RoXSA9IG5pY2U7XHJcbiAgICAgIHNlbGYubGVuZ3RoKys7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZXEgPSBmdW5jdGlvbiAoaWR4KSB7XHJcbiAgICAgIHJldHVybiBzZWxmW2lkeF07XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChkb21zKSB7XHJcbiAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgZG9tcy5sZW5ndGg7IGErKykge1xyXG4gICAgICAgIHZhciBuaWNlID0gJC5kYXRhKGRvbXNbYV0sICdfX25pY2VzY3JvbGwnKSB8fCBmYWxzZTtcclxuICAgICAgICBpZiAobmljZSkge1xyXG4gICAgICAgICAgdGhpc1t0aGlzLmxlbmd0aF0gPSBuaWNlO1xyXG4gICAgICAgICAgdGhpcy5sZW5ndGgrKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBtcGxleChlbCwgbHN0LCBmbikge1xyXG4gICAgZm9yICh2YXIgYSA9IDAsIGwgPSBsc3QubGVuZ3RoOyBhIDwgbDsgYSsrKSBmbihlbCwgbHN0W2FdKTtcclxuICB9XHJcbiAgbXBsZXgoXHJcbiAgICBOaWNlU2Nyb2xsQXJyYXkucHJvdG90eXBlLCBbJ3Nob3cnLCAnaGlkZScsICd0b2dnbGUnLCAnb25SZXNpemUnLCAncmVzaXplJywgJ3JlbW92ZScsICdzdG9wJywgJ2RvU2Nyb2xsUG9zJ10sXHJcbiAgICBmdW5jdGlvbiAoZSwgbikge1xyXG4gICAgICBlW25dID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdGhpc1tuXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICApO1xyXG5cclxuICBqUXVlcnkuZm4uZ2V0TmljZVNjcm9sbCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBOaWNlU2Nyb2xsQXJyYXkodGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpc1tpbmRleF0gJiYgJC5kYXRhKHRoaXNbaW5kZXhdLCAnX19uaWNlc2Nyb2xsJykgfHwgZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdmFyIHBzZXVkb3MgPSBqUXVlcnkuZXhwci5wc2V1ZG9zIHx8IGpRdWVyeS5leHByWyc6J107ICAvLyBqUXVlcnkgMyBtaWdyYXRpb25cclxuICBwc2V1ZG9zLm5pY2VzY3JvbGwgPSBmdW5jdGlvbiAoYSkge1xyXG4gICAgcmV0dXJuICQuZGF0YShhLCAnX19uaWNlc2Nyb2xsJykgIT09IHVuZGVmaW5lZDtcclxuICB9O1xyXG5cclxuICAkLmZuLm5pY2VTY3JvbGwgPSBmdW5jdGlvbiAod3JhcHBlciwgX29wdCkge1xyXG4gICAgaWYgKF9vcHQgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygd3JhcHBlciA9PSBcIm9iamVjdFwiICYmICEoXCJqcXVlcnlcIiBpbiB3cmFwcGVyKSkge1xyXG4gICAgICBfb3B0ID0gd3JhcHBlcjtcclxuICAgICAgd3JhcHBlciA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciByZXQgPSBuZXcgTmljZVNjcm9sbEFycmF5KCk7XHJcblxyXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgIHZhciBvcHQgPSAkLmV4dGVuZCh7fSwgX29wdCk7IC8vIGNsb25pbmdcclxuXHJcbiAgICAgIGlmICh3cmFwcGVyIHx8IGZhbHNlKSB7XHJcbiAgICAgICAgdmFyIHdycCA9ICQod3JhcHBlcik7XHJcbiAgICAgICAgb3B0LmRvYyA9ICh3cnAubGVuZ3RoID4gMSkgPyAkKHdyYXBwZXIsICR0aGlzKSA6IHdycDtcclxuICAgICAgICBvcHQud2luID0gJHRoaXM7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGRvY3VuZGVmID0gIShcImRvY1wiIGluIG9wdCk7XHJcbiAgICAgIGlmICghZG9jdW5kZWYgJiYgIShcIndpblwiIGluIG9wdCkpIG9wdC53aW4gPSAkdGhpcztcclxuXHJcbiAgICAgIHZhciBuaWNlID0gJHRoaXMuZGF0YSgnX19uaWNlc2Nyb2xsJykgfHwgZmFsc2U7XHJcbiAgICAgIGlmICghbmljZSkge1xyXG4gICAgICAgIG9wdC5kb2MgPSBvcHQuZG9jIHx8ICR0aGlzO1xyXG4gICAgICAgIG5pY2UgPSBuZXcgTmljZVNjcm9sbENsYXNzKG9wdCwgJHRoaXMpO1xyXG4gICAgICAgICR0aGlzLmRhdGEoJ19fbmljZXNjcm9sbCcsIG5pY2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldC5wdXNoKG5pY2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIChyZXQubGVuZ3RoID09PSAxKSA/IHJldFswXSA6IHJldDtcclxuICB9O1xyXG5cclxuICBfd2luLk5pY2VTY3JvbGwgPSB7XHJcbiAgICBnZXRqUXVlcnk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIGpRdWVyeTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBpZiAoISQubmljZXNjcm9sbCkge1xyXG4gICAgJC5uaWNlc2Nyb2xsID0gbmV3IE5pY2VTY3JvbGxBcnJheSgpO1xyXG4gICAgJC5uaWNlc2Nyb2xsLm9wdGlvbnMgPSBfZ2xvYmFsb3B0aW9ucztcclxuICB9XHJcblxyXG59KSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIGpxdWVyeS5zbGltbWVudS5qc1xyXG4gKiBodHRwOi8vYWRuYW50b3BhbC5naXRodWIuaW8vc2xpbW1lbnUvXHJcbiAqIEF1dGhvcjogQGFkbmFudG9wYWxcclxuICogQ29weXJpZ2h0IDIwMTMsIEFkbmFuIFRvcGFsIChhdG9wYWwuY29tKVxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiAqL1xyXG47KGZ1bmN0aW9uKCQsd2luZG93LGRvY3VtZW50LHVuZGVmaW5lZCl7dmFyIHBsdWdpbk5hbWU9XCJzbGltbWVudVwiLGRlZmF1bHRzPXtyZXNpemVXaWR0aDonNzY4Jyxjb2xsYXBzZXJUaXRsZTonTWFpbiBNZW51JyxhbmltU3BlZWQ6J21lZGl1bScsZWFzaW5nRWZmZWN0Om51bGwsaW5kZW50Q2hpbGRyZW46ZmFsc2UsY2hpbGRyZW5JbmRlbnRlcjonJm5ic3A7Jm5ic3A7J307ZnVuY3Rpb24gUGx1Z2luKGVsZW1lbnQsb3B0aW9ucyl7dGhpcy5lbGVtZW50PWVsZW1lbnQ7dGhpcy4kZWxlbT0kKHRoaXMuZWxlbWVudCk7dGhpcy5vcHRpb25zPSQuZXh0ZW5kKHt9LGRlZmF1bHRzLG9wdGlvbnMpO3RoaXMuaW5pdCgpfVBsdWdpbi5wcm90b3R5cGU9e2luaXQ6ZnVuY3Rpb24oKXt2YXIgJG9wdGlvbnM9dGhpcy5vcHRpb25zLCRtZW51PXRoaXMuJGVsZW0sJGNvbGxhcHNlcj0nPGRpdiBjbGFzcz1cIm1lbnUtY29sbGFwc2VyXCI+Jyskb3B0aW9ucy5jb2xsYXBzZXJUaXRsZSsnPGRpdiBjbGFzcz1cImNvbGxhcHNlLWJ1dHRvblwiPjxzcGFuIGNsYXNzPVwiaWNvbi1iYXJcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJpY29uLWJhclwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cImljb24tYmFyXCI+PC9zcGFuPjwvZGl2PjwvZGl2PicsJG1lbnVfY29sbGFwc2VyOyRtZW51LmJlZm9yZSgkY29sbGFwc2VyKTskbWVudV9jb2xsYXBzZXI9JG1lbnUucHJldignLm1lbnUtY29sbGFwc2VyJyk7JG1lbnUub24oJ2NsaWNrJywnLnN1Yi1jb2xsYXBzZXInLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTtlLnN0b3BQcm9wYWdhdGlvbigpO3ZhciAkcGFyZW50X2xpPSQodGhpcykuY2xvc2VzdCgnbGknKTtpZigkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKXskKHRoaXMpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpOyQodGhpcykuZmluZCgnaScpLmh0bWwoJyYjOTY2MDsnKTskcGFyZW50X2xpLmZpbmQoJz51bCcpLnNsaWRlVXAoJG9wdGlvbnMuYW5pbVNwZWVkLCRvcHRpb25zLmVhc2luZ0VmZmVjdCl9ZWxzZXskKHRoaXMpLmFkZENsYXNzKCdleHBhbmRlZCcpOyQodGhpcykuZmluZCgnaScpLmh0bWwoJyYjOTY1MDsnKTskcGFyZW50X2xpLmZpbmQoJz51bCcpLnNsaWRlRG93bigkb3B0aW9ucy5hbmltU3BlZWQsJG9wdGlvbnMuZWFzaW5nRWZmZWN0KX19KTskbWVudV9jb2xsYXBzZXIub24oJ2NsaWNrJywnLmNvbGxhcHNlLWJ1dHRvbicsZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpOyRtZW51LnNsaWRlVG9nZ2xlKCRvcHRpb25zLmFuaW1TcGVlZCwkb3B0aW9ucy5lYXNpbmdFZmZlY3QpfSk7dGhpcy5yZXNpemVNZW51KHtkYXRhOntlbDp0aGlzLmVsZW1lbnQsb3B0aW9uczp0aGlzLm9wdGlvbnN9fSk7JCh3aW5kb3cpLm9uKCdyZXNpemUnLHtlbDp0aGlzLmVsZW1lbnQsb3B0aW9uczp0aGlzLm9wdGlvbnN9LHRoaXMucmVzaXplTWVudSl9LHJlc2l6ZU1lbnU6ZnVuY3Rpb24oZXZlbnQpe3ZhciAkd2luZG93PSQod2luZG93KSwkb3B0aW9ucz1ldmVudC5kYXRhLm9wdGlvbnMsJG1lbnU9JChldmVudC5kYXRhLmVsKSwkbWVudV9jb2xsYXBzZXI9JCgnYm9keScpLmZpbmQoJy5tZW51LWNvbGxhcHNlcicpOyRtZW51LmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbigpe2lmKCQodGhpcykuaGFzKCd1bCcpLmxlbmd0aCl7aWYoJCh0aGlzKS5oYXMoJy5zdWItY29sbGFwc2VyJykubGVuZ3RoKXskKHRoaXMpLmNoaWxkcmVuKCcuc3ViLWNvbGxhcHNlciBpJykuaHRtbCgnJiM5NjYwOycpfWVsc2V7JCh0aGlzKS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwic3ViLWNvbGxhcHNlclwiPjxpPiYjOTY2MDs8L2k+PC9zcGFuPicpfX0kKHRoaXMpLmNoaWxkcmVuKCd1bCcpLmhpZGUoKTskKHRoaXMpLmZpbmQoJy5zdWItY29sbGFwc2VyJykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJykuY2hpbGRyZW4oJ2knKS5odG1sKCcmIzk2NjA7Jyl9KTtpZigkb3B0aW9ucy5yZXNpemVXaWR0aD49JHdpbmRvdy53aWR0aCgpKXtpZigkb3B0aW9ucy5pbmRlbnRDaGlsZHJlbil7JG1lbnUuZmluZCgndWwnKS5lYWNoKGZ1bmN0aW9uKCl7dmFyICRkZXB0aD0kKHRoaXMpLnBhcmVudHMoJ3VsJykubGVuZ3RoO2lmKCEkKHRoaXMpLmNoaWxkcmVuKCdsaScpLmNoaWxkcmVuKCdhJykuaGFzKCdpJykubGVuZ3RoKXskKHRoaXMpLmNoaWxkcmVuKCdsaScpLmNoaWxkcmVuKCdhJykucHJlcGVuZChQbHVnaW4ucHJvdG90eXBlLmluZGVudCgkZGVwdGgsJG9wdGlvbnMpKX19KX0kbWVudS5maW5kKCdsaScpLmhhcygndWwnKS5vZmYoJ21vdXNlZW50ZXIgbW91c2VsZWF2ZScpOyRtZW51LmFkZENsYXNzKCdjb2xsYXBzZWQnKS5oaWRlKCk7JG1lbnVfY29sbGFwc2VyLnNob3coKX1lbHNleyRtZW51LmZpbmQoJ2xpJykuaGFzKCd1bCcpLm9uKCdtb3VzZWVudGVyJyxmdW5jdGlvbigpeyQodGhpcykuZmluZCgnPnVsJykuc3RvcCgpLnNsaWRlRG93bigkb3B0aW9ucy5hbmltU3BlZWQsJG9wdGlvbnMuZWFzaW5nRWZmZWN0KX0pLm9uKCdtb3VzZWxlYXZlJyxmdW5jdGlvbigpeyQodGhpcykuZmluZCgnPnVsJykuc3RvcCgpLnNsaWRlVXAoJG9wdGlvbnMuYW5pbVNwZWVkLCRvcHRpb25zLmVhc2luZ0VmZmVjdCl9KTskbWVudS5maW5kKCdsaSA+IGEgPiBpJykucmVtb3ZlKCk7JG1lbnUucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpLnNob3coKTskbWVudV9jb2xsYXBzZXIuaGlkZSgpfX0saW5kZW50OmZ1bmN0aW9uKG51bSxvcHRpb25zKXt2YXIgJGluZGVudD0nJztmb3IodmFyIGk9MDtpPG51bTtpKyspeyRpbmRlbnQrPW9wdGlvbnMuY2hpbGRyZW5JbmRlbnRlcn1yZXR1cm4nPGk+JyskaW5kZW50Kyc8L2k+J319OyQuZm5bcGx1Z2luTmFtZV09ZnVuY3Rpb24ob3B0aW9ucyl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe2lmKCEkLmRhdGEodGhpcyxcInBsdWdpbl9cIitwbHVnaW5OYW1lKSl7JC5kYXRhKHRoaXMsXCJwbHVnaW5fXCIrcGx1Z2luTmFtZSxuZXcgUGx1Z2luKHRoaXMsb3B0aW9ucykpfX0pfX0pKGpRdWVyeSx3aW5kb3csZG9jdW1lbnQpO1xyXG4iXSwiZmlsZSI6InBsdWdpbnMuanMifQ==
