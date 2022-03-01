/*
Ascensor.js 
version: 1.8.0 (2014-02-16)
description: Ascensor is a jquery plugin which aims to train and adapt content according to an elevator system
repository: https://github.com/kirkas/Ascensor.js
license: BSD
author: Léo Galley <contact@kirkas.ch>
*/
!function($, window, document, undefined) {
    /*
    Create plugin instance
  */
    function Plugin(element, options) {
        this.element = element, this.options = $.extend({}, defaults, options), this._defaults = defaults, 
        this._name = pluginName, this.init();
    }
    var pluginName = "ascensor", defaults = {
        ascensorFloorName: null,
        childType: "div",
        windowsOn: 0,
        direction: "y",
        loop: !1,
        width: "100%",
        height: "100%",
        time: 800,
        easing: "easeInSine",
        keyNavigation: !1,
        touchSwipeIntegration: !1,
        queued: !1,
        jump: !1,
        ready: !1
    };
    Plugin.prototype.init = function() {
        // From https://gist.github.com/lorenzopolidori/3794226
        function has3d() {
            var support3D, el = document.createElement("p"), transforms = {
                webkitTransform: "-webkit-transform",
                OTransform: "-o-transform",
                msTransform: "-ms-transform",
                MozTransform: "-moz-transform",
                transform: "transform"
            };
            // Add it to the body to get the computed style
            document.body.insertBefore(el, null);
            for (var t in transforms) el.style[t] !== undefined && (el.style[t] = "translate3d(1px,1px,1px)", 
            support3D = window.getComputedStyle(el).getPropertyValue(transforms[t]));
            return document.body.removeChild(el), support3D !== undefined && support3D.length > 0 && "none" !== support3D;
        }
        function getCss(index, property) {
            var parentCss, css;
            if ("top" == property ? (parentCss = NH, css = {
                top: index * parentCss
            }) : (parentCss = NW, css = {
                left: index * parentCss
            }), self.supportTransform) {
                var transformAxis = "translateX";
                "top" == property && (transformAxis = "translateY"), css = {
                    transform: transformAxis + "(" + 100 * index + "%)"
                };
            }
            return css;
        }
        function resize() {
            NW = node.width(), NH = node.height(), "y" === self.options.direction && (node.stop().scrollTop(floorActive * NH), 
            nodeChildren.each(function(index) {
                $(this).css(getCss(index, "top"));
            })), "x" === self.options.direction && (node.stop().scrollLeft(floorActive * NW), 
            nodeChildren.each(function(index) {
                $(this).css(getCss(index, "left"));
            })), chocolate && (node.stop().scrollLeft(self.options.direction[floorActive][1] * NW).scrollTop(self.options.direction[floorActive][0] * NH), 
            nodeChildren.each(function(index) {
                var css = {
                    left: self.options.direction[index][1] * NW,
                    top: self.options.direction[index][0] * NH
                };
                self.supportTransform && (css = {
                    transform: "translateX(" + 100 * self.options.direction[index][1] + "%) translateY(" + 100 * self.options.direction[index][0] + "%)"
                }), $(this).css(css);
            }));
        }
        function generateFloorMap() {
            function getClosestFloor(floor, floorCollection, axis, direction) {
                var goal = floor[axis], closest = !1;
                return $.each(floorCollection, function() {
                    (("right" == direction || "down" == direction) && this[axis] > floor[axis] || ("left" == direction || "up" == direction) && this[axis] < floor[axis]) && (!closest || Math.abs(this[axis] - goal) < Math.abs(closest[axis] - goal)) && (closest = this);
                }), closest && -1 !== directionArray.indexOf(closest) ? directionArray.indexOf(closest) : !1;
            }
            function getfurthestFloor(floor, floorCollection, axis) {
                var goal = floor[axis], furthest = !1;
                return $.each(floorCollection, function() {
                    (!furthest || Math.abs(this[axis] - goal) > Math.abs(furthest[axis] - goal)) && (furthest = this);
                }), furthest && -1 !== directionArray.indexOf(furthest) ? directionArray.indexOf(furthest) : !1;
            }
            function getIncrementedFloor(floorCollection, axis) {
                var goal = 0, floor = !1;
                return $.each(floorCollection, function() {
                    (!floor || Math.abs(this[axis] - goal) > Math.abs(floor[axis] - goal)) && (floor = this);
                }), floor && -1 !== directionArray.indexOf(floor) ? directionArray.indexOf(floor) : !1;
            }
            function getDecrementedFloor(floorCollection, axis) {
                var goal = 0, floor = !1;
                return $.each(floorCollection, function() {
                    (!floor || Math.abs(this[axis] - goal) > Math.abs(floor[axis] - goal)) && (floor = this);
                }), floor && -1 !== directionArray.indexOf(floor) ? directionArray.indexOf(floor) : !1;
            }
            function getFloor(x, y, floorOne, floorTwo) {
                return floorOne[0] + x == floorTwo[0] && floorOne[1] + y == floorTwo[1] ? directionArray.indexOf(floorTwo) : !1;
            }
            function getFurtherFloorOnAxis(floorArray, axis) {
                var furtherFloor = !1;
                return jQuery.each(floorArray, function(index, directionArray) {
                    (furtherFloor === !1 || furtherFloor[axis] < directionArray[axis]) && (furtherFloor = directionArray);
                }), furtherFloor;
            }
            function getClosestFloorOnAxis(floorArray, axis) {
                var furtherFloor = !1;
                return jQuery.each(floorArray, function(index, directionArray) {
                    (furtherFloor === !1 || furtherFloor[axis] > directionArray[axis]) && (furtherFloor = directionArray);
                }), furtherFloor;
            }
            function getSameAxisFloor(floorItem, axis) {
                return jQuery.grep(directionArray, function(directionArray) {
                    var isOnSameAxis = directionArray[axis] == floorItem[axis];
                    return isOnSameAxis;
                });
            }
            /* Use only array if chilren is present on stage */
            var directionArray = jQuery.grep(self.options.direction, function(directionArray, index) {
                return node.children().length > index;
            }), approximateFurtherX = getFurtherFloorOnAxis(directionArray, 1), sameAxisXFurthest = getSameAxisFloor(approximateFurtherX, 1), furtherY = getFurtherFloorOnAxis(sameAxisXFurthest, 0), approximateFurtherY = getFurtherFloorOnAxis(directionArray, 0), sameAxisYFurthest = getSameAxisFloor(approximateFurtherY, 0), furtherX = getFurtherFloorOnAxis(sameAxisYFurthest, 1);
            floorMap.furthest_x = directionArray.indexOf(furtherX), floorMap.furthest_y = directionArray.indexOf(furtherY);
            var approximateClosestX = getClosestFloorOnAxis(directionArray, 1), sameAxisXClosest = getSameAxisFloor(approximateClosestX, 1), closestY = getClosestFloorOnAxis(sameAxisXClosest, 0), approximateClosestY = getClosestFloorOnAxis(directionArray, 0), sameAxisYClosest = getSameAxisFloor(approximateClosestY, 0), closestX = getClosestFloorOnAxis(sameAxisYClosest, 1);
            floorMap.closest_x = directionArray.indexOf(closestX), floorMap.closest_y = directionArray.indexOf(closestY), 
            $.each(directionArray, function(index, floorItem) {
                var axisXfloor = jQuery.grep(directionArray, function(directionArray) {
                    var isOnSameAxis = directionArray[0] == floorItem[0], isCurrentFloor = floorItem == directionArray;
                    return isOnSameAxis && !isCurrentFloor;
                }), axisYfloor = jQuery.grep(directionArray, function(directionArray) {
                    var isOnSameAxis = directionArray[1] == floorItem[1], isCurrentFloor = floorItem == directionArray;
                    return isOnSameAxis && !isCurrentFloor;
                }), directNextXAxis = jQuery.grep(directionArray, function(directionArray) {
                    var isOnSameAxis = directionArray[0] == floorItem[0] + 1;
                    return isOnSameAxis;
                }), directPreviousXAxis = jQuery.grep(directionArray, function(directionArray) {
                    var isOnSameAxis = directionArray[0] == floorItem[0] - 1;
                    return isOnSameAxis;
                }), directNextYAxis = jQuery.grep(directionArray, function(directionArray) {
                    var isOnSameAxis = directionArray[1] == floorItem[1] + 1;
                    return isOnSameAxis;
                }), directPreviousYAxis = jQuery.grep(directionArray, function(directionArray) {
                    var isOnSameAxis = directionArray[1] == floorItem[1] - 1;
                    return isOnSameAxis;
                });
                floorMap[index] = {
                    down: !1,
                    up: !1,
                    right: !1,
                    left: !1,
                    increment: {
                        down: getIncrementedFloor(directNextYAxis, 1),
                        up: getDecrementedFloor(directPreviousYAxis, 0),
                        right: getIncrementedFloor(directNextXAxis, 0),
                        left: getDecrementedFloor(directPreviousXAxis, 1)
                    },
                    closest: {
                        down: getClosestFloor(floorItem, axisYfloor, 0, "down"),
                        up: getClosestFloor(floorItem, axisYfloor, 0, "up"),
                        right: getClosestFloor(floorItem, axisXfloor, 1, "right"),
                        left: getClosestFloor(floorItem, axisXfloor, 1, "left")
                    },
                    furthest: {
                        down: getfurthestFloor(floorItem, axisYfloor, 0, "down"),
                        up: getfurthestFloor(floorItem, axisYfloor, 0, "up"),
                        right: getfurthestFloor(floorItem, axisXfloor, 1, "right"),
                        left: getfurthestFloor(floorItem, axisXfloor, 1, "left")
                    }
                }, $.each(directionArray, function(indexSecond, floorItemSecond) {
                    floorMap[index].down === !1 && (floorMap[index].down = getFloor(1, 0, floorItem, floorItemSecond)), 
                    floorMap[index].up === !1 && (floorMap[index].up = getFloor(-1, 0, floorItem, floorItemSecond)), 
                    floorMap[index].right === !1 && (floorMap[index].right = getFloor(0, 1, floorItem, floorItemSecond)), 
                    floorMap[index].left === !1 && (floorMap[index].left = getFloor(0, -1, floorItem, floorItemSecond));
                });
            });
        }
        function handleDirection(direction) {
            if ("y" == self.options.direction) {
                if ("left" == direction) return;
                "down" == direction ? self.next() : "up" == direction && self.prev();
            } else if ("x" == self.options.direction) {
                if ("up" == direction) return;
                "left" == direction ? self.prev() : "right" == direction && self.next();
            } else if (chocolate) {
                var targetId;
                /* If existing, use direct depending floor */
                if (floorMap[floorActive][direction] !== !1) targetId = floorMap[floorActive][direction]; else if (self.options.jump === !0 && floorMap[floorActive].closest[direction] !== !1) targetId = floorMap[floorActive].closest[direction]; else if (self.options.loop === !0) targetId = floorMap[floorActive].furthest[direction]; else if ("loop-x" != self.options.loop || "right" != direction && "left" != direction || floorMap[floorActive].furthest[direction] === !1) if ("loop-y" != self.options.loop || "down" != direction && "up" != direction || floorMap[floorActive].furthest[direction] === !1) {
                    if ("string" == typeof self.options.loop) {
                        var correctYDirection = ("down" == direction || "up" == direction) && "increment-y" == self.options.loop, correctXDirection = ("right" == direction || "left" == direction) && "increment-x" == self.options.loop;
                        /* if a increment is possible */
                        if (floorMap[floorActive].increment[direction] !== !1) (correctYDirection || correctXDirection || "increment" == self.options.loop) && (targetId = floorMap[floorActive].increment[direction]); else if ("right" == direction || "left" == direction) {
                            if ("increment-y" == self.options.loop) return;
                            floorActive == floorMap.furthest_x ? targetId = floorMap.closest_x : floorActive == floorMap.closest_x && (targetId = floorMap.furthest_x);
                        } else if ("down" == direction || "up" == direction) {
                            if ("increment-x" == self.options.loop) return;
                            floorActive == floorMap.furthest_y ? targetId = floorMap.closest_y : floorActive == floorMap.closest_y && (targetId = floorMap.furthest_y);
                        }
                    }
                } else targetId = floorMap[floorActive].furthest[direction]; else targetId = floorMap[floorActive].furthest[direction];
                "number" == typeof targetId && scrollToStage(targetId, self.options.time);
            }
        }
        function getFloorFromHash() {
            if (window.location.hash) {
                hash = window.location.hash.split("#").pop();
                var floor = !1;
                return self.options.ascensorFloorName && $.each(self.options.ascensorFloorName, function(index) {
                    hash === self.options.ascensorFloorName[index] && (floor = index);
                }), floor;
            }
        }
        function scrollToStage(floor, time, firstrun) {
            firstrun = firstrun || !1, scrollStart(floorActive, floor);
            var animationParams = {
                time: time || self.options.time,
                easing: self.options.easing,
                callback: function() {
                    scrollEnd(floorActive, floor);
                }
            };
            if ("y" === self.options.direction) animationParams.property = {
                scrollTop: floor * NH
            }; else if ("x" === self.options.direction) animationParams.property = {
                scrollLeft: floor * NW
            }; else if (chocolate && (animationParams.property = {
                scrollLeft: self.options.direction[floor][1] * NW,
                scrollTop: self.options.direction[floor][0] * NH
            }, self.options.queued)) {
                var sameXposition = node.scrollLeft() === self.options.direction[floor][1] * NW, sameYposition = node.scrollTop() === self.options.direction[floor][0] * NH;
                "x" === self.options.queued ? sameXposition ? animationParams.property = {
                    scrollTop: self.options.direction[floor][0] * NH
                } : (animationParams.property = {
                    scrollLeft: self.options.direction[floor][1] * NW
                }, animationParams.callback = function() {
                    node.stop().animate({
                        scrollTop: self.options.direction[floor][0] * NH
                    }, time, self.options.easing, function() {
                        scrollEnd(floorActive, floor);
                    });
                }) : "y" === self.options.queued && (sameYposition ? animationParams.property = {
                    scrollLeft: self.options.direction[floor][1] * NW
                } : (animationParams.property = {
                    scrollTop: self.options.direction[floor][0] * NH
                }, animationParams.callback = function() {
                    node.stop().animate({
                        scrollLeft: self.options.direction[floor][1] * NW
                    }, time, self.options.easing, function() {
                        scrollEnd(floorActive, floor);
                    });
                }));
            }
            node.stop().animate(animationParams.property, time, self.options.easing, animationParams.callback), 
            firstrun && "function" == typeof self.options.ready && self.options.ready(), self.options.ascensorFloorName && window.location.replace(("" + window.location).split("#")[0] + "#" + self.options.ascensorFloorName[floor]), 
            floorActive = floor, node.data("current-floor", floorActive);
        }
        function scrollStart(from, to) {
            var floor = {
                from: from,
                to: to
            };
            node.trigger("scrollStart", floor);
        }
        function scrollEnd(from, to) {
            var floor = {
                from: from,
                to: to
            };
            node.trigger("scrollEnd", floor);
        }
        function checkKey(e) {
            var key = e.which;
            if (!$("input, textarea, button").is(":focus")) switch (key) {
              case 40:
              case 83:
                if ("x" == self.options.direction) return;
                node.trigger("scrollToDirection", "down");
                break;

              case 38:
              case 87:
                if ("x" == self.options.direction) return;
                node.trigger("scrollToDirection", "up");
                break;

              case 37:
              case 65:
                if ("y" == self.options.direction) return;
                node.trigger("scrollToDirection", "left");
                break;

              case 39:
              case 68:
                if ("y" == self.options.direction) return;
                node.trigger("scrollToDirection", "right");
            }
        }
        var //height/width settings
        NH, NW, //hash 
        hash, self = this, node = $(this.element), nodeChildren = node.children(self.options.childType), //floor counter settings
        floorActive = self.options.windowsOn, floorCounter = -1, $document = (self.options.direction, 
        $(document)), $window = $(window), chocolate = "object" == typeof self.options.direction;
        Array.prototype.indexOf || (Array.prototype.indexOf = function(elt) {
            var len = this.length >>> 0, from = Number(arguments[1]) || 0;
            for (from = 0 > from ? Math.ceil(from) : Math.floor(from), 0 > from && (from += len); len > from; from++) if (from in this && this[from] === elt) return from;
            return -1;
        }), self.supportTransform = has3d();
        var floorMap = [];
        if (this.prev = function() {
            var prevFloor = floorActive - 1;
            if (0 > prevFloor) {
                if (!self.options.loop) return;
                prevFloor = floorCounter;
            }
            scrollToStage(prevFloor, self.options.time);
        }, this.next = function() {
            var nextFloor = floorActive + 1;
            if (nextFloor > floorCounter) {
                if (!self.options.loop) return;
                nextFloor = 0;
            }
            scrollToStage(nextFloor, self.options.time);
        }, node.on("scrollToDirection", function(event, direction) {
            handleDirection(direction);
        }), node.on("scrollToStage", function(event, floor) {
            if ("string" == typeof floor) {
                var floorId = $.inArray(floor, self.options.ascensorFloorName);
                -1 !== floorId && scrollToStage(floorId, self.options.time);
            } else if ("number" == typeof floor) {
                if (floor > floorCounter) return;
                scrollToStage(floor, self.options.time);
            }
        }), node.on("next", function() {
            self.next();
        }), node.on("prev", function() {
            self.prev();
        }), node.on("refresh", function() {
            (node.children().length > nodeChildren.length || node.children().length < nodeChildren.length) && (nodeChildren = node.children(self.options.childType), 
            nodeChildren.css({
                position: "absolute",
                overflow: "auto",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%"
            }), floorCounter = -1, nodeChildren.each(function() {
                floorCounter += 1;
            }), childrenLenght = node.children().length, node.trigger("refresh"), resize(), 
            generateFloorMap());
        }), nodeChildren.each(function() {
            floorCounter += 1;
        }), node.css({
            position: "absolute",
            overflow: "hidden",
            top: "0",
            left: "0",
            width: self.options.width,
            height: self.options.height
        }), nodeChildren.css({
            position: "absolute",
            overflow: "auto",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%"
        }), NH = node.width(), NW = node.height(), chocolate && generateFloorMap(), node.data("current-floor", floorActive), 
        self.options.keyNavigation && $document.keydown(checkKey), self.options.ascensorFloorName && window.location.hash) {
            var hashFloor = getFloorFromHash();
            hashFloor && (floorActive = hashFloor);
        }
        self.options.touchSwipeIntegration && node.swipe({
            swipe: function(event, direction) {
                node.trigger("scrollToDirection", direction);
            },
            threshold: 70
        }), $(window).on("hashchange", function() {
            var hashFloor = getFloorFromHash();
            hashFloor && !node.is(":animated") && scrollToStage(hashFloor, self.options.time);
        }), $window.resize(function() {
            resize();
        }).load(function() {
            resize();
        }).resize(), window.DeviceOrientationEvent && $window.bind("orientationchange", function() {
            resize();
        }), scrollToStage(floorActive, 1, !0);
    }, $.fn[pluginName] = function(options) {
        return this.each(function() {
            $.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        });
    };
}(jQuery, window, document);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkuYXNjZW5zb3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbkFzY2Vuc29yLmpzIFxudmVyc2lvbjogMS44LjAgKDIwMTQtMDItMTYpXG5kZXNjcmlwdGlvbjogQXNjZW5zb3IgaXMgYSBqcXVlcnkgcGx1Z2luIHdoaWNoIGFpbXMgdG8gdHJhaW4gYW5kIGFkYXB0IGNvbnRlbnQgYWNjb3JkaW5nIHRvIGFuIGVsZXZhdG9yIHN5c3RlbVxucmVwb3NpdG9yeTogaHR0cHM6Ly9naXRodWIuY29tL2tpcmthcy9Bc2NlbnNvci5qc1xubGljZW5zZTogQlNEXG5hdXRob3I6IEzDqW8gR2FsbGV5IDxjb250YWN0QGtpcmthcy5jaD5cbiovXG4hZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICAgLypcbiAgICBDcmVhdGUgcGx1Z2luIGluc3RhbmNlXG4gICovXG4gICAgZnVuY3Rpb24gUGx1Z2luKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudCwgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKSwgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cywgXG4gICAgICAgIHRoaXMuX25hbWUgPSBwbHVnaW5OYW1lLCB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBcImFzY2Vuc29yXCIsIGRlZmF1bHRzID0ge1xuICAgICAgICBhc2NlbnNvckZsb29yTmFtZTogbnVsbCxcbiAgICAgICAgY2hpbGRUeXBlOiBcImRpdlwiLFxuICAgICAgICB3aW5kb3dzT246IDAsXG4gICAgICAgIGRpcmVjdGlvbjogXCJ5XCIsXG4gICAgICAgIGxvb3A6ICExLFxuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgIHRpbWU6IDgwMCxcbiAgICAgICAgZWFzaW5nOiBcImVhc2VJblNpbmVcIixcbiAgICAgICAga2V5TmF2aWdhdGlvbjogITEsXG4gICAgICAgIHRvdWNoU3dpcGVJbnRlZ3JhdGlvbjogITEsXG4gICAgICAgIHF1ZXVlZDogITEsXG4gICAgICAgIGp1bXA6ICExLFxuICAgICAgICByZWFkeTogITFcbiAgICB9O1xuICAgIFBsdWdpbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBGcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2xvcmVuem9wb2xpZG9yaS8zNzk0MjI2XG4gICAgICAgIGZ1bmN0aW9uIGhhczNkKCkge1xuICAgICAgICAgICAgdmFyIHN1cHBvcnQzRCwgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSwgdHJhbnNmb3JtcyA9IHtcbiAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2Zvcm06IFwiLXdlYmtpdC10cmFuc2Zvcm1cIixcbiAgICAgICAgICAgICAgICBPVHJhbnNmb3JtOiBcIi1vLXRyYW5zZm9ybVwiLFxuICAgICAgICAgICAgICAgIG1zVHJhbnNmb3JtOiBcIi1tcy10cmFuc2Zvcm1cIixcbiAgICAgICAgICAgICAgICBNb3pUcmFuc2Zvcm06IFwiLW1vei10cmFuc2Zvcm1cIixcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNmb3JtXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBBZGQgaXQgdG8gdGhlIGJvZHkgdG8gZ2V0IHRoZSBjb21wdXRlZCBzdHlsZVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoZWwsIG51bGwpO1xuICAgICAgICAgICAgZm9yICh2YXIgdCBpbiB0cmFuc2Zvcm1zKSBlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkICYmIChlbC5zdHlsZVt0XSA9IFwidHJhbnNsYXRlM2QoMXB4LDFweCwxcHgpXCIsIFxuICAgICAgICAgICAgc3VwcG9ydDNEID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUodHJhbnNmb3Jtc1t0XSkpO1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWwpLCBzdXBwb3J0M0QgIT09IHVuZGVmaW5lZCAmJiBzdXBwb3J0M0QubGVuZ3RoID4gMCAmJiBcIm5vbmVcIiAhPT0gc3VwcG9ydDNEO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldENzcyhpbmRleCwgcHJvcGVydHkpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRDc3MsIGNzcztcbiAgICAgICAgICAgIGlmIChcInRvcFwiID09IHByb3BlcnR5ID8gKHBhcmVudENzcyA9IE5ILCBjc3MgPSB7XG4gICAgICAgICAgICAgICAgdG9wOiBpbmRleCAqIHBhcmVudENzc1xuICAgICAgICAgICAgfSkgOiAocGFyZW50Q3NzID0gTlcsIGNzcyA9IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiBpbmRleCAqIHBhcmVudENzc1xuICAgICAgICAgICAgfSksIHNlbGYuc3VwcG9ydFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1BeGlzID0gXCJ0cmFuc2xhdGVYXCI7XG4gICAgICAgICAgICAgICAgXCJ0b3BcIiA9PSBwcm9wZXJ0eSAmJiAodHJhbnNmb3JtQXhpcyA9IFwidHJhbnNsYXRlWVwiKSwgY3NzID0ge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybUF4aXMgKyBcIihcIiArIDEwMCAqIGluZGV4ICsgXCIlKVwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjc3M7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICAgICAgTlcgPSBub2RlLndpZHRoKCksIE5IID0gbm9kZS5oZWlnaHQoKSwgXCJ5XCIgPT09IHNlbGYub3B0aW9ucy5kaXJlY3Rpb24gJiYgKG5vZGUuc3RvcCgpLnNjcm9sbFRvcChmbG9vckFjdGl2ZSAqIE5IKSwgXG4gICAgICAgICAgICBub2RlQ2hpbGRyZW4uZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKGdldENzcyhpbmRleCwgXCJ0b3BcIikpO1xuICAgICAgICAgICAgfSkpLCBcInhcIiA9PT0gc2VsZi5vcHRpb25zLmRpcmVjdGlvbiAmJiAobm9kZS5zdG9wKCkuc2Nyb2xsTGVmdChmbG9vckFjdGl2ZSAqIE5XKSwgXG4gICAgICAgICAgICBub2RlQ2hpbGRyZW4uZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKGdldENzcyhpbmRleCwgXCJsZWZ0XCIpKTtcbiAgICAgICAgICAgIH0pKSwgY2hvY29sYXRlICYmIChub2RlLnN0b3AoKS5zY3JvbGxMZWZ0KHNlbGYub3B0aW9ucy5kaXJlY3Rpb25bZmxvb3JBY3RpdmVdWzFdICogTlcpLnNjcm9sbFRvcChzZWxmLm9wdGlvbnMuZGlyZWN0aW9uW2Zsb29yQWN0aXZlXVswXSAqIE5IKSwgXG4gICAgICAgICAgICBub2RlQ2hpbGRyZW4uZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBjc3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHNlbGYub3B0aW9ucy5kaXJlY3Rpb25baW5kZXhdWzFdICogTlcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogc2VsZi5vcHRpb25zLmRpcmVjdGlvbltpbmRleF1bMF0gKiBOSFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgc2VsZi5zdXBwb3J0VHJhbnNmb3JtICYmIChjc3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGVYKFwiICsgMTAwICogc2VsZi5vcHRpb25zLmRpcmVjdGlvbltpbmRleF1bMV0gKyBcIiUpIHRyYW5zbGF0ZVkoXCIgKyAxMDAgKiBzZWxmLm9wdGlvbnMuZGlyZWN0aW9uW2luZGV4XVswXSArIFwiJSlcIlxuICAgICAgICAgICAgICAgIH0pLCAkKHRoaXMpLmNzcyhjc3MpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlRmxvb3JNYXAoKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRDbG9zZXN0Rmxvb3IoZmxvb3IsIGZsb29yQ29sbGVjdGlvbiwgYXhpcywgZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdvYWwgPSBmbG9vcltheGlzXSwgY2xvc2VzdCA9ICExO1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmVhY2goZmxvb3JDb2xsZWN0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgKChcInJpZ2h0XCIgPT0gZGlyZWN0aW9uIHx8IFwiZG93blwiID09IGRpcmVjdGlvbikgJiYgdGhpc1theGlzXSA+IGZsb29yW2F4aXNdIHx8IChcImxlZnRcIiA9PSBkaXJlY3Rpb24gfHwgXCJ1cFwiID09IGRpcmVjdGlvbikgJiYgdGhpc1theGlzXSA8IGZsb29yW2F4aXNdKSAmJiAoIWNsb3Nlc3QgfHwgTWF0aC5hYnModGhpc1theGlzXSAtIGdvYWwpIDwgTWF0aC5hYnMoY2xvc2VzdFtheGlzXSAtIGdvYWwpKSAmJiAoY2xvc2VzdCA9IHRoaXMpO1xuICAgICAgICAgICAgICAgIH0pLCBjbG9zZXN0ICYmIC0xICE9PSBkaXJlY3Rpb25BcnJheS5pbmRleE9mKGNsb3Nlc3QpID8gZGlyZWN0aW9uQXJyYXkuaW5kZXhPZihjbG9zZXN0KSA6ICExO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0ZnVydGhlc3RGbG9vcihmbG9vciwgZmxvb3JDb2xsZWN0aW9uLCBheGlzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdvYWwgPSBmbG9vcltheGlzXSwgZnVydGhlc3QgPSAhMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5lYWNoKGZsb29yQ29sbGVjdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICghZnVydGhlc3QgfHwgTWF0aC5hYnModGhpc1theGlzXSAtIGdvYWwpID4gTWF0aC5hYnMoZnVydGhlc3RbYXhpc10gLSBnb2FsKSkgJiYgKGZ1cnRoZXN0ID0gdGhpcyk7XG4gICAgICAgICAgICAgICAgfSksIGZ1cnRoZXN0ICYmIC0xICE9PSBkaXJlY3Rpb25BcnJheS5pbmRleE9mKGZ1cnRoZXN0KSA/IGRpcmVjdGlvbkFycmF5LmluZGV4T2YoZnVydGhlc3QpIDogITE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRJbmNyZW1lbnRlZEZsb29yKGZsb29yQ29sbGVjdGlvbiwgYXhpcykge1xuICAgICAgICAgICAgICAgIHZhciBnb2FsID0gMCwgZmxvb3IgPSAhMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5lYWNoKGZsb29yQ29sbGVjdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICghZmxvb3IgfHwgTWF0aC5hYnModGhpc1theGlzXSAtIGdvYWwpID4gTWF0aC5hYnMoZmxvb3JbYXhpc10gLSBnb2FsKSkgJiYgKGZsb29yID0gdGhpcyk7XG4gICAgICAgICAgICAgICAgfSksIGZsb29yICYmIC0xICE9PSBkaXJlY3Rpb25BcnJheS5pbmRleE9mKGZsb29yKSA/IGRpcmVjdGlvbkFycmF5LmluZGV4T2YoZmxvb3IpIDogITE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREZWNyZW1lbnRlZEZsb29yKGZsb29yQ29sbGVjdGlvbiwgYXhpcykge1xuICAgICAgICAgICAgICAgIHZhciBnb2FsID0gMCwgZmxvb3IgPSAhMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5lYWNoKGZsb29yQ29sbGVjdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICghZmxvb3IgfHwgTWF0aC5hYnModGhpc1theGlzXSAtIGdvYWwpID4gTWF0aC5hYnMoZmxvb3JbYXhpc10gLSBnb2FsKSkgJiYgKGZsb29yID0gdGhpcyk7XG4gICAgICAgICAgICAgICAgfSksIGZsb29yICYmIC0xICE9PSBkaXJlY3Rpb25BcnJheS5pbmRleE9mKGZsb29yKSA/IGRpcmVjdGlvbkFycmF5LmluZGV4T2YoZmxvb3IpIDogITE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRGbG9vcih4LCB5LCBmbG9vck9uZSwgZmxvb3JUd28pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxvb3JPbmVbMF0gKyB4ID09IGZsb29yVHdvWzBdICYmIGZsb29yT25lWzFdICsgeSA9PSBmbG9vclR3b1sxXSA/IGRpcmVjdGlvbkFycmF5LmluZGV4T2YoZmxvb3JUd28pIDogITE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRGdXJ0aGVyRmxvb3JPbkF4aXMoZmxvb3JBcnJheSwgYXhpcykge1xuICAgICAgICAgICAgICAgIHZhciBmdXJ0aGVyRmxvb3IgPSAhMTtcbiAgICAgICAgICAgICAgICByZXR1cm4galF1ZXJ5LmVhY2goZmxvb3JBcnJheSwgZnVuY3Rpb24oaW5kZXgsIGRpcmVjdGlvbkFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIChmdXJ0aGVyRmxvb3IgPT09ICExIHx8IGZ1cnRoZXJGbG9vcltheGlzXSA8IGRpcmVjdGlvbkFycmF5W2F4aXNdKSAmJiAoZnVydGhlckZsb29yID0gZGlyZWN0aW9uQXJyYXkpO1xuICAgICAgICAgICAgICAgIH0pLCBmdXJ0aGVyRmxvb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRDbG9zZXN0Rmxvb3JPbkF4aXMoZmxvb3JBcnJheSwgYXhpcykge1xuICAgICAgICAgICAgICAgIHZhciBmdXJ0aGVyRmxvb3IgPSAhMTtcbiAgICAgICAgICAgICAgICByZXR1cm4galF1ZXJ5LmVhY2goZmxvb3JBcnJheSwgZnVuY3Rpb24oaW5kZXgsIGRpcmVjdGlvbkFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIChmdXJ0aGVyRmxvb3IgPT09ICExIHx8IGZ1cnRoZXJGbG9vcltheGlzXSA+IGRpcmVjdGlvbkFycmF5W2F4aXNdKSAmJiAoZnVydGhlckZsb29yID0gZGlyZWN0aW9uQXJyYXkpO1xuICAgICAgICAgICAgICAgIH0pLCBmdXJ0aGVyRmxvb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRTYW1lQXhpc0Zsb29yKGZsb29ySXRlbSwgYXhpcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZ3JlcChkaXJlY3Rpb25BcnJheSwgZnVuY3Rpb24oZGlyZWN0aW9uQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzT25TYW1lQXhpcyA9IGRpcmVjdGlvbkFycmF5W2F4aXNdID09IGZsb29ySXRlbVtheGlzXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzT25TYW1lQXhpcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIFVzZSBvbmx5IGFycmF5IGlmIGNoaWxyZW4gaXMgcHJlc2VudCBvbiBzdGFnZSAqL1xuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbkFycmF5ID0galF1ZXJ5LmdyZXAoc2VsZi5vcHRpb25zLmRpcmVjdGlvbiwgZnVuY3Rpb24oZGlyZWN0aW9uQXJyYXksIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuY2hpbGRyZW4oKS5sZW5ndGggPiBpbmRleDtcbiAgICAgICAgICAgIH0pLCBhcHByb3hpbWF0ZUZ1cnRoZXJYID0gZ2V0RnVydGhlckZsb29yT25BeGlzKGRpcmVjdGlvbkFycmF5LCAxKSwgc2FtZUF4aXNYRnVydGhlc3QgPSBnZXRTYW1lQXhpc0Zsb29yKGFwcHJveGltYXRlRnVydGhlclgsIDEpLCBmdXJ0aGVyWSA9IGdldEZ1cnRoZXJGbG9vck9uQXhpcyhzYW1lQXhpc1hGdXJ0aGVzdCwgMCksIGFwcHJveGltYXRlRnVydGhlclkgPSBnZXRGdXJ0aGVyRmxvb3JPbkF4aXMoZGlyZWN0aW9uQXJyYXksIDApLCBzYW1lQXhpc1lGdXJ0aGVzdCA9IGdldFNhbWVBeGlzRmxvb3IoYXBwcm94aW1hdGVGdXJ0aGVyWSwgMCksIGZ1cnRoZXJYID0gZ2V0RnVydGhlckZsb29yT25BeGlzKHNhbWVBeGlzWUZ1cnRoZXN0LCAxKTtcbiAgICAgICAgICAgIGZsb29yTWFwLmZ1cnRoZXN0X3ggPSBkaXJlY3Rpb25BcnJheS5pbmRleE9mKGZ1cnRoZXJYKSwgZmxvb3JNYXAuZnVydGhlc3RfeSA9IGRpcmVjdGlvbkFycmF5LmluZGV4T2YoZnVydGhlclkpO1xuICAgICAgICAgICAgdmFyIGFwcHJveGltYXRlQ2xvc2VzdFggPSBnZXRDbG9zZXN0Rmxvb3JPbkF4aXMoZGlyZWN0aW9uQXJyYXksIDEpLCBzYW1lQXhpc1hDbG9zZXN0ID0gZ2V0U2FtZUF4aXNGbG9vcihhcHByb3hpbWF0ZUNsb3Nlc3RYLCAxKSwgY2xvc2VzdFkgPSBnZXRDbG9zZXN0Rmxvb3JPbkF4aXMoc2FtZUF4aXNYQ2xvc2VzdCwgMCksIGFwcHJveGltYXRlQ2xvc2VzdFkgPSBnZXRDbG9zZXN0Rmxvb3JPbkF4aXMoZGlyZWN0aW9uQXJyYXksIDApLCBzYW1lQXhpc1lDbG9zZXN0ID0gZ2V0U2FtZUF4aXNGbG9vcihhcHByb3hpbWF0ZUNsb3Nlc3RZLCAwKSwgY2xvc2VzdFggPSBnZXRDbG9zZXN0Rmxvb3JPbkF4aXMoc2FtZUF4aXNZQ2xvc2VzdCwgMSk7XG4gICAgICAgICAgICBmbG9vck1hcC5jbG9zZXN0X3ggPSBkaXJlY3Rpb25BcnJheS5pbmRleE9mKGNsb3Nlc3RYKSwgZmxvb3JNYXAuY2xvc2VzdF95ID0gZGlyZWN0aW9uQXJyYXkuaW5kZXhPZihjbG9zZXN0WSksIFxuICAgICAgICAgICAgJC5lYWNoKGRpcmVjdGlvbkFycmF5LCBmdW5jdGlvbihpbmRleCwgZmxvb3JJdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF4aXNYZmxvb3IgPSBqUXVlcnkuZ3JlcChkaXJlY3Rpb25BcnJheSwgZnVuY3Rpb24oZGlyZWN0aW9uQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzT25TYW1lQXhpcyA9IGRpcmVjdGlvbkFycmF5WzBdID09IGZsb29ySXRlbVswXSwgaXNDdXJyZW50Rmxvb3IgPSBmbG9vckl0ZW0gPT0gZGlyZWN0aW9uQXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpc09uU2FtZUF4aXMgJiYgIWlzQ3VycmVudEZsb29yO1xuICAgICAgICAgICAgICAgIH0pLCBheGlzWWZsb29yID0galF1ZXJ5LmdyZXAoZGlyZWN0aW9uQXJyYXksIGZ1bmN0aW9uKGRpcmVjdGlvbkFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc09uU2FtZUF4aXMgPSBkaXJlY3Rpb25BcnJheVsxXSA9PSBmbG9vckl0ZW1bMV0sIGlzQ3VycmVudEZsb29yID0gZmxvb3JJdGVtID09IGRpcmVjdGlvbkFycmF5O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNPblNhbWVBeGlzICYmICFpc0N1cnJlbnRGbG9vcjtcbiAgICAgICAgICAgICAgICB9KSwgZGlyZWN0TmV4dFhBeGlzID0galF1ZXJ5LmdyZXAoZGlyZWN0aW9uQXJyYXksIGZ1bmN0aW9uKGRpcmVjdGlvbkFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc09uU2FtZUF4aXMgPSBkaXJlY3Rpb25BcnJheVswXSA9PSBmbG9vckl0ZW1bMF0gKyAxO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNPblNhbWVBeGlzO1xuICAgICAgICAgICAgICAgIH0pLCBkaXJlY3RQcmV2aW91c1hBeGlzID0galF1ZXJ5LmdyZXAoZGlyZWN0aW9uQXJyYXksIGZ1bmN0aW9uKGRpcmVjdGlvbkFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc09uU2FtZUF4aXMgPSBkaXJlY3Rpb25BcnJheVswXSA9PSBmbG9vckl0ZW1bMF0gLSAxO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNPblNhbWVBeGlzO1xuICAgICAgICAgICAgICAgIH0pLCBkaXJlY3ROZXh0WUF4aXMgPSBqUXVlcnkuZ3JlcChkaXJlY3Rpb25BcnJheSwgZnVuY3Rpb24oZGlyZWN0aW9uQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzT25TYW1lQXhpcyA9IGRpcmVjdGlvbkFycmF5WzFdID09IGZsb29ySXRlbVsxXSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpc09uU2FtZUF4aXM7XG4gICAgICAgICAgICAgICAgfSksIGRpcmVjdFByZXZpb3VzWUF4aXMgPSBqUXVlcnkuZ3JlcChkaXJlY3Rpb25BcnJheSwgZnVuY3Rpb24oZGlyZWN0aW9uQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzT25TYW1lQXhpcyA9IGRpcmVjdGlvbkFycmF5WzFdID09IGZsb29ySXRlbVsxXSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpc09uU2FtZUF4aXM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZmxvb3JNYXBbaW5kZXhdID0ge1xuICAgICAgICAgICAgICAgICAgICBkb3duOiAhMSxcbiAgICAgICAgICAgICAgICAgICAgdXA6ICExLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogITEsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICExLFxuICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvd246IGdldEluY3JlbWVudGVkRmxvb3IoZGlyZWN0TmV4dFlBeGlzLCAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwOiBnZXREZWNyZW1lbnRlZEZsb29yKGRpcmVjdFByZXZpb3VzWUF4aXMsIDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IGdldEluY3JlbWVudGVkRmxvb3IoZGlyZWN0TmV4dFhBeGlzLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGdldERlY3JlbWVudGVkRmxvb3IoZGlyZWN0UHJldmlvdXNYQXhpcywgMSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG93bjogZ2V0Q2xvc2VzdEZsb29yKGZsb29ySXRlbSwgYXhpc1lmbG9vciwgMCwgXCJkb3duXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXA6IGdldENsb3Nlc3RGbG9vcihmbG9vckl0ZW0sIGF4aXNZZmxvb3IsIDAsIFwidXBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogZ2V0Q2xvc2VzdEZsb29yKGZsb29ySXRlbSwgYXhpc1hmbG9vciwgMSwgXCJyaWdodFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGdldENsb3Nlc3RGbG9vcihmbG9vckl0ZW0sIGF4aXNYZmxvb3IsIDEsIFwibGVmdFwiKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmdXJ0aGVzdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG93bjogZ2V0ZnVydGhlc3RGbG9vcihmbG9vckl0ZW0sIGF4aXNZZmxvb3IsIDAsIFwiZG93blwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwOiBnZXRmdXJ0aGVzdEZsb29yKGZsb29ySXRlbSwgYXhpc1lmbG9vciwgMCwgXCJ1cFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBnZXRmdXJ0aGVzdEZsb29yKGZsb29ySXRlbSwgYXhpc1hmbG9vciwgMSwgXCJyaWdodFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGdldGZ1cnRoZXN0Rmxvb3IoZmxvb3JJdGVtLCBheGlzWGZsb29yLCAxLCBcImxlZnRcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sICQuZWFjaChkaXJlY3Rpb25BcnJheSwgZnVuY3Rpb24oaW5kZXhTZWNvbmQsIGZsb29ySXRlbVNlY29uZCkge1xuICAgICAgICAgICAgICAgICAgICBmbG9vck1hcFtpbmRleF0uZG93biA9PT0gITEgJiYgKGZsb29yTWFwW2luZGV4XS5kb3duID0gZ2V0Rmxvb3IoMSwgMCwgZmxvb3JJdGVtLCBmbG9vckl0ZW1TZWNvbmQpKSwgXG4gICAgICAgICAgICAgICAgICAgIGZsb29yTWFwW2luZGV4XS51cCA9PT0gITEgJiYgKGZsb29yTWFwW2luZGV4XS51cCA9IGdldEZsb29yKC0xLCAwLCBmbG9vckl0ZW0sIGZsb29ySXRlbVNlY29uZCkpLCBcbiAgICAgICAgICAgICAgICAgICAgZmxvb3JNYXBbaW5kZXhdLnJpZ2h0ID09PSAhMSAmJiAoZmxvb3JNYXBbaW5kZXhdLnJpZ2h0ID0gZ2V0Rmxvb3IoMCwgMSwgZmxvb3JJdGVtLCBmbG9vckl0ZW1TZWNvbmQpKSwgXG4gICAgICAgICAgICAgICAgICAgIGZsb29yTWFwW2luZGV4XS5sZWZ0ID09PSAhMSAmJiAoZmxvb3JNYXBbaW5kZXhdLmxlZnQgPSBnZXRGbG9vcigwLCAtMSwgZmxvb3JJdGVtLCBmbG9vckl0ZW1TZWNvbmQpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZURpcmVjdGlvbihkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChcInlcIiA9PSBzZWxmLm9wdGlvbnMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKFwibGVmdFwiID09IGRpcmVjdGlvbikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIFwiZG93blwiID09IGRpcmVjdGlvbiA/IHNlbGYubmV4dCgpIDogXCJ1cFwiID09IGRpcmVjdGlvbiAmJiBzZWxmLnByZXYoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJ4XCIgPT0gc2VsZi5vcHRpb25zLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChcInVwXCIgPT0gZGlyZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICAgICAgXCJsZWZ0XCIgPT0gZGlyZWN0aW9uID8gc2VsZi5wcmV2KCkgOiBcInJpZ2h0XCIgPT0gZGlyZWN0aW9uICYmIHNlbGYubmV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjaG9jb2xhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SWQ7XG4gICAgICAgICAgICAgICAgLyogSWYgZXhpc3RpbmcsIHVzZSBkaXJlY3QgZGVwZW5kaW5nIGZsb29yICovXG4gICAgICAgICAgICAgICAgaWYgKGZsb29yTWFwW2Zsb29yQWN0aXZlXVtkaXJlY3Rpb25dICE9PSAhMSkgdGFyZ2V0SWQgPSBmbG9vck1hcFtmbG9vckFjdGl2ZV1bZGlyZWN0aW9uXTsgZWxzZSBpZiAoc2VsZi5vcHRpb25zLmp1bXAgPT09ICEwICYmIGZsb29yTWFwW2Zsb29yQWN0aXZlXS5jbG9zZXN0W2RpcmVjdGlvbl0gIT09ICExKSB0YXJnZXRJZCA9IGZsb29yTWFwW2Zsb29yQWN0aXZlXS5jbG9zZXN0W2RpcmVjdGlvbl07IGVsc2UgaWYgKHNlbGYub3B0aW9ucy5sb29wID09PSAhMCkgdGFyZ2V0SWQgPSBmbG9vck1hcFtmbG9vckFjdGl2ZV0uZnVydGhlc3RbZGlyZWN0aW9uXTsgZWxzZSBpZiAoXCJsb29wLXhcIiAhPSBzZWxmLm9wdGlvbnMubG9vcCB8fCBcInJpZ2h0XCIgIT0gZGlyZWN0aW9uICYmIFwibGVmdFwiICE9IGRpcmVjdGlvbiB8fCBmbG9vck1hcFtmbG9vckFjdGl2ZV0uZnVydGhlc3RbZGlyZWN0aW9uXSA9PT0gITEpIGlmIChcImxvb3AteVwiICE9IHNlbGYub3B0aW9ucy5sb29wIHx8IFwiZG93blwiICE9IGRpcmVjdGlvbiAmJiBcInVwXCIgIT0gZGlyZWN0aW9uIHx8IGZsb29yTWFwW2Zsb29yQWN0aXZlXS5mdXJ0aGVzdFtkaXJlY3Rpb25dID09PSAhMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2Ygc2VsZi5vcHRpb25zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3JyZWN0WURpcmVjdGlvbiA9IChcImRvd25cIiA9PSBkaXJlY3Rpb24gfHwgXCJ1cFwiID09IGRpcmVjdGlvbikgJiYgXCJpbmNyZW1lbnQteVwiID09IHNlbGYub3B0aW9ucy5sb29wLCBjb3JyZWN0WERpcmVjdGlvbiA9IChcInJpZ2h0XCIgPT0gZGlyZWN0aW9uIHx8IFwibGVmdFwiID09IGRpcmVjdGlvbikgJiYgXCJpbmNyZW1lbnQteFwiID09IHNlbGYub3B0aW9ucy5sb29wO1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogaWYgYSBpbmNyZW1lbnQgaXMgcG9zc2libGUgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmbG9vck1hcFtmbG9vckFjdGl2ZV0uaW5jcmVtZW50W2RpcmVjdGlvbl0gIT09ICExKSAoY29ycmVjdFlEaXJlY3Rpb24gfHwgY29ycmVjdFhEaXJlY3Rpb24gfHwgXCJpbmNyZW1lbnRcIiA9PSBzZWxmLm9wdGlvbnMubG9vcCkgJiYgKHRhcmdldElkID0gZmxvb3JNYXBbZmxvb3JBY3RpdmVdLmluY3JlbWVudFtkaXJlY3Rpb25dKTsgZWxzZSBpZiAoXCJyaWdodFwiID09IGRpcmVjdGlvbiB8fCBcImxlZnRcIiA9PSBkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJpbmNyZW1lbnQteVwiID09IHNlbGYub3B0aW9ucy5sb29wKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxvb3JBY3RpdmUgPT0gZmxvb3JNYXAuZnVydGhlc3RfeCA/IHRhcmdldElkID0gZmxvb3JNYXAuY2xvc2VzdF94IDogZmxvb3JBY3RpdmUgPT0gZmxvb3JNYXAuY2xvc2VzdF94ICYmICh0YXJnZXRJZCA9IGZsb29yTWFwLmZ1cnRoZXN0X3gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcImRvd25cIiA9PSBkaXJlY3Rpb24gfHwgXCJ1cFwiID09IGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcImluY3JlbWVudC14XCIgPT0gc2VsZi5vcHRpb25zLmxvb3ApIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbG9vckFjdGl2ZSA9PSBmbG9vck1hcC5mdXJ0aGVzdF95ID8gdGFyZ2V0SWQgPSBmbG9vck1hcC5jbG9zZXN0X3kgOiBmbG9vckFjdGl2ZSA9PSBmbG9vck1hcC5jbG9zZXN0X3kgJiYgKHRhcmdldElkID0gZmxvb3JNYXAuZnVydGhlc3RfeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgdGFyZ2V0SWQgPSBmbG9vck1hcFtmbG9vckFjdGl2ZV0uZnVydGhlc3RbZGlyZWN0aW9uXTsgZWxzZSB0YXJnZXRJZCA9IGZsb29yTWFwW2Zsb29yQWN0aXZlXS5mdXJ0aGVzdFtkaXJlY3Rpb25dO1xuICAgICAgICAgICAgICAgIFwibnVtYmVyXCIgPT0gdHlwZW9mIHRhcmdldElkICYmIHNjcm9sbFRvU3RhZ2UodGFyZ2V0SWQsIHNlbGYub3B0aW9ucy50aW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRGbG9vckZyb21IYXNoKCkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgICAgICAgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KFwiI1wiKS5wb3AoKTtcbiAgICAgICAgICAgICAgICB2YXIgZmxvb3IgPSAhMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5vcHRpb25zLmFzY2Vuc29yRmxvb3JOYW1lICYmICQuZWFjaChzZWxmLm9wdGlvbnMuYXNjZW5zb3JGbG9vck5hbWUsIGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc2ggPT09IHNlbGYub3B0aW9ucy5hc2NlbnNvckZsb29yTmFtZVtpbmRleF0gJiYgKGZsb29yID0gaW5kZXgpO1xuICAgICAgICAgICAgICAgIH0pLCBmbG9vcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzY3JvbGxUb1N0YWdlKGZsb29yLCB0aW1lLCBmaXJzdHJ1bikge1xuICAgICAgICAgICAgZmlyc3RydW4gPSBmaXJzdHJ1biB8fCAhMSwgc2Nyb2xsU3RhcnQoZmxvb3JBY3RpdmUsIGZsb29yKTtcbiAgICAgICAgICAgIHZhciBhbmltYXRpb25QYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgdGltZTogdGltZSB8fCBzZWxmLm9wdGlvbnMudGltZSxcbiAgICAgICAgICAgICAgICBlYXNpbmc6IHNlbGYub3B0aW9ucy5lYXNpbmcsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxFbmQoZmxvb3JBY3RpdmUsIGZsb29yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKFwieVwiID09PSBzZWxmLm9wdGlvbnMuZGlyZWN0aW9uKSBhbmltYXRpb25QYXJhbXMucHJvcGVydHkgPSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBmbG9vciAqIE5IXG4gICAgICAgICAgICB9OyBlbHNlIGlmIChcInhcIiA9PT0gc2VsZi5vcHRpb25zLmRpcmVjdGlvbikgYW5pbWF0aW9uUGFyYW1zLnByb3BlcnR5ID0ge1xuICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IGZsb29yICogTldcbiAgICAgICAgICAgIH07IGVsc2UgaWYgKGNob2NvbGF0ZSAmJiAoYW5pbWF0aW9uUGFyYW1zLnByb3BlcnR5ID0ge1xuICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IHNlbGYub3B0aW9ucy5kaXJlY3Rpb25bZmxvb3JdWzFdICogTlcsXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBzZWxmLm9wdGlvbnMuZGlyZWN0aW9uW2Zsb29yXVswXSAqIE5IXG4gICAgICAgICAgICB9LCBzZWxmLm9wdGlvbnMucXVldWVkKSkge1xuICAgICAgICAgICAgICAgIHZhciBzYW1lWHBvc2l0aW9uID0gbm9kZS5zY3JvbGxMZWZ0KCkgPT09IHNlbGYub3B0aW9ucy5kaXJlY3Rpb25bZmxvb3JdWzFdICogTlcsIHNhbWVZcG9zaXRpb24gPSBub2RlLnNjcm9sbFRvcCgpID09PSBzZWxmLm9wdGlvbnMuZGlyZWN0aW9uW2Zsb29yXVswXSAqIE5IO1xuICAgICAgICAgICAgICAgIFwieFwiID09PSBzZWxmLm9wdGlvbnMucXVldWVkID8gc2FtZVhwb3NpdGlvbiA/IGFuaW1hdGlvblBhcmFtcy5wcm9wZXJ0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBzZWxmLm9wdGlvbnMuZGlyZWN0aW9uW2Zsb29yXVswXSAqIE5IXG4gICAgICAgICAgICAgICAgfSA6IChhbmltYXRpb25QYXJhbXMucHJvcGVydHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IHNlbGYub3B0aW9ucy5kaXJlY3Rpb25bZmxvb3JdWzFdICogTldcbiAgICAgICAgICAgICAgICB9LCBhbmltYXRpb25QYXJhbXMuY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHNlbGYub3B0aW9ucy5kaXJlY3Rpb25bZmxvb3JdWzBdICogTkhcbiAgICAgICAgICAgICAgICAgICAgfSwgdGltZSwgc2VsZi5vcHRpb25zLmVhc2luZywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxFbmQoZmxvb3JBY3RpdmUsIGZsb29yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkgOiBcInlcIiA9PT0gc2VsZi5vcHRpb25zLnF1ZXVlZCAmJiAoc2FtZVlwb3NpdGlvbiA/IGFuaW1hdGlvblBhcmFtcy5wcm9wZXJ0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTGVmdDogc2VsZi5vcHRpb25zLmRpcmVjdGlvbltmbG9vcl1bMV0gKiBOV1xuICAgICAgICAgICAgICAgIH0gOiAoYW5pbWF0aW9uUGFyYW1zLnByb3BlcnR5ID0ge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHNlbGYub3B0aW9ucy5kaXJlY3Rpb25bZmxvb3JdWzBdICogTkhcbiAgICAgICAgICAgICAgICB9LCBhbmltYXRpb25QYXJhbXMuY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBzZWxmLm9wdGlvbnMuZGlyZWN0aW9uW2Zsb29yXVsxXSAqIE5XXG4gICAgICAgICAgICAgICAgICAgIH0sIHRpbWUsIHNlbGYub3B0aW9ucy5lYXNpbmcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsRW5kKGZsb29yQWN0aXZlLCBmbG9vcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUuc3RvcCgpLmFuaW1hdGUoYW5pbWF0aW9uUGFyYW1zLnByb3BlcnR5LCB0aW1lLCBzZWxmLm9wdGlvbnMuZWFzaW5nLCBhbmltYXRpb25QYXJhbXMuY2FsbGJhY2spLCBcbiAgICAgICAgICAgIGZpcnN0cnVuICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2Ygc2VsZi5vcHRpb25zLnJlYWR5ICYmIHNlbGYub3B0aW9ucy5yZWFkeSgpLCBzZWxmLm9wdGlvbnMuYXNjZW5zb3JGbG9vck5hbWUgJiYgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoKFwiXCIgKyB3aW5kb3cubG9jYXRpb24pLnNwbGl0KFwiI1wiKVswXSArIFwiI1wiICsgc2VsZi5vcHRpb25zLmFzY2Vuc29yRmxvb3JOYW1lW2Zsb29yXSksIFxuICAgICAgICAgICAgZmxvb3JBY3RpdmUgPSBmbG9vciwgbm9kZS5kYXRhKFwiY3VycmVudC1mbG9vclwiLCBmbG9vckFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc2Nyb2xsU3RhcnQoZnJvbSwgdG8pIHtcbiAgICAgICAgICAgIHZhciBmbG9vciA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxuICAgICAgICAgICAgICAgIHRvOiB0b1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5vZGUudHJpZ2dlcihcInNjcm9sbFN0YXJ0XCIsIGZsb29yKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzY3JvbGxFbmQoZnJvbSwgdG8pIHtcbiAgICAgICAgICAgIHZhciBmbG9vciA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxuICAgICAgICAgICAgICAgIHRvOiB0b1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5vZGUudHJpZ2dlcihcInNjcm9sbEVuZFwiLCBmbG9vcik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tLZXkoZSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IGUud2hpY2g7XG4gICAgICAgICAgICBpZiAoISQoXCJpbnB1dCwgdGV4dGFyZWEsIGJ1dHRvblwiKS5pcyhcIjpmb2N1c1wiKSkgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgY2FzZSA4MzpcbiAgICAgICAgICAgICAgICBpZiAoXCJ4XCIgPT0gc2VsZi5vcHRpb25zLmRpcmVjdGlvbikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIG5vZGUudHJpZ2dlcihcInNjcm9sbFRvRGlyZWN0aW9uXCIsIFwiZG93blwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICBjYXNlIDg3OlxuICAgICAgICAgICAgICAgIGlmIChcInhcIiA9PSBzZWxmLm9wdGlvbnMuZGlyZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICAgICAgbm9kZS50cmlnZ2VyKFwic2Nyb2xsVG9EaXJlY3Rpb25cIiwgXCJ1cFwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgIGlmIChcInlcIiA9PSBzZWxmLm9wdGlvbnMuZGlyZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICAgICAgbm9kZS50cmlnZ2VyKFwic2Nyb2xsVG9EaXJlY3Rpb25cIiwgXCJsZWZ0XCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgaWYgKFwieVwiID09IHNlbGYub3B0aW9ucy5kaXJlY3Rpb24pIHJldHVybjtcbiAgICAgICAgICAgICAgICBub2RlLnRyaWdnZXIoXCJzY3JvbGxUb0RpcmVjdGlvblwiLCBcInJpZ2h0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciAvL2hlaWdodC93aWR0aCBzZXR0aW5nc1xuICAgICAgICBOSCwgTlcsIC8vaGFzaCBcbiAgICAgICAgaGFzaCwgc2VsZiA9IHRoaXMsIG5vZGUgPSAkKHRoaXMuZWxlbWVudCksIG5vZGVDaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4oc2VsZi5vcHRpb25zLmNoaWxkVHlwZSksIC8vZmxvb3IgY291bnRlciBzZXR0aW5nc1xuICAgICAgICBmbG9vckFjdGl2ZSA9IHNlbGYub3B0aW9ucy53aW5kb3dzT24sIGZsb29yQ291bnRlciA9IC0xLCAkZG9jdW1lbnQgPSAoc2VsZi5vcHRpb25zLmRpcmVjdGlvbiwgXG4gICAgICAgICQoZG9jdW1lbnQpKSwgJHdpbmRvdyA9ICQod2luZG93KSwgY2hvY29sYXRlID0gXCJvYmplY3RcIiA9PSB0eXBlb2Ygc2VsZi5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgfHwgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24oZWx0KSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5sZW5ndGggPj4+IDAsIGZyb20gPSBOdW1iZXIoYXJndW1lbnRzWzFdKSB8fCAwO1xuICAgICAgICAgICAgZm9yIChmcm9tID0gMCA+IGZyb20gPyBNYXRoLmNlaWwoZnJvbSkgOiBNYXRoLmZsb29yKGZyb20pLCAwID4gZnJvbSAmJiAoZnJvbSArPSBsZW4pOyBsZW4gPiBmcm9tOyBmcm9tKyspIGlmIChmcm9tIGluIHRoaXMgJiYgdGhpc1tmcm9tXSA9PT0gZWx0KSByZXR1cm4gZnJvbTtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSksIHNlbGYuc3VwcG9ydFRyYW5zZm9ybSA9IGhhczNkKCk7XG4gICAgICAgIHZhciBmbG9vck1hcCA9IFtdO1xuICAgICAgICBpZiAodGhpcy5wcmV2ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJldkZsb29yID0gZmxvb3JBY3RpdmUgLSAxO1xuICAgICAgICAgICAgaWYgKDAgPiBwcmV2Rmxvb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYub3B0aW9ucy5sb29wKSByZXR1cm47XG4gICAgICAgICAgICAgICAgcHJldkZsb29yID0gZmxvb3JDb3VudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Nyb2xsVG9TdGFnZShwcmV2Rmxvb3IsIHNlbGYub3B0aW9ucy50aW1lKTtcbiAgICAgICAgfSwgdGhpcy5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbmV4dEZsb29yID0gZmxvb3JBY3RpdmUgKyAxO1xuICAgICAgICAgICAgaWYgKG5leHRGbG9vciA+IGZsb29yQ291bnRlcikge1xuICAgICAgICAgICAgICAgIGlmICghc2VsZi5vcHRpb25zLmxvb3ApIHJldHVybjtcbiAgICAgICAgICAgICAgICBuZXh0Rmxvb3IgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Nyb2xsVG9TdGFnZShuZXh0Rmxvb3IsIHNlbGYub3B0aW9ucy50aW1lKTtcbiAgICAgICAgfSwgbm9kZS5vbihcInNjcm9sbFRvRGlyZWN0aW9uXCIsIGZ1bmN0aW9uKGV2ZW50LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGhhbmRsZURpcmVjdGlvbihkaXJlY3Rpb24pO1xuICAgICAgICB9KSwgbm9kZS5vbihcInNjcm9sbFRvU3RhZ2VcIiwgZnVuY3Rpb24oZXZlbnQsIGZsb29yKSB7XG4gICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgZmxvb3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxvb3JJZCA9ICQuaW5BcnJheShmbG9vciwgc2VsZi5vcHRpb25zLmFzY2Vuc29yRmxvb3JOYW1lKTtcbiAgICAgICAgICAgICAgICAtMSAhPT0gZmxvb3JJZCAmJiBzY3JvbGxUb1N0YWdlKGZsb29ySWQsIHNlbGYub3B0aW9ucy50aW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJudW1iZXJcIiA9PSB0eXBlb2YgZmxvb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmxvb3IgPiBmbG9vckNvdW50ZXIpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb1N0YWdlKGZsb29yLCBzZWxmLm9wdGlvbnMudGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCBub2RlLm9uKFwibmV4dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYubmV4dCgpO1xuICAgICAgICB9KSwgbm9kZS5vbihcInByZXZcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnByZXYoKTtcbiAgICAgICAgfSksIG5vZGUub24oXCJyZWZyZXNoXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgKG5vZGUuY2hpbGRyZW4oKS5sZW5ndGggPiBub2RlQ2hpbGRyZW4ubGVuZ3RoIHx8IG5vZGUuY2hpbGRyZW4oKS5sZW5ndGggPCBub2RlQ2hpbGRyZW4ubGVuZ3RoKSAmJiAobm9kZUNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbihzZWxmLm9wdGlvbnMuY2hpbGRUeXBlKSwgXG4gICAgICAgICAgICBub2RlQ2hpbGRyZW4uY3NzKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICB0b3A6IFwiMFwiLFxuICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiXG4gICAgICAgICAgICB9KSwgZmxvb3JDb3VudGVyID0gLTEsIG5vZGVDaGlsZHJlbi5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZsb29yQ291bnRlciArPSAxO1xuICAgICAgICAgICAgfSksIGNoaWxkcmVuTGVuZ2h0ID0gbm9kZS5jaGlsZHJlbigpLmxlbmd0aCwgbm9kZS50cmlnZ2VyKFwicmVmcmVzaFwiKSwgcmVzaXplKCksIFxuICAgICAgICAgICAgZ2VuZXJhdGVGbG9vck1hcCgpKTtcbiAgICAgICAgfSksIG5vZGVDaGlsZHJlbi5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZmxvb3JDb3VudGVyICs9IDE7XG4gICAgICAgIH0pLCBub2RlLmNzcyh7XG4gICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgb3ZlcmZsb3c6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICB0b3A6IFwiMFwiLFxuICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICB3aWR0aDogc2VsZi5vcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBzZWxmLm9wdGlvbnMuaGVpZ2h0XG4gICAgICAgIH0pLCBub2RlQ2hpbGRyZW4uY3NzKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICBvdmVyZmxvdzogXCJhdXRvXCIsXG4gICAgICAgICAgICB0b3A6IFwiMFwiLFxuICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiXG4gICAgICAgIH0pLCBOSCA9IG5vZGUud2lkdGgoKSwgTlcgPSBub2RlLmhlaWdodCgpLCBjaG9jb2xhdGUgJiYgZ2VuZXJhdGVGbG9vck1hcCgpLCBub2RlLmRhdGEoXCJjdXJyZW50LWZsb29yXCIsIGZsb29yQWN0aXZlKSwgXG4gICAgICAgIHNlbGYub3B0aW9ucy5rZXlOYXZpZ2F0aW9uICYmICRkb2N1bWVudC5rZXlkb3duKGNoZWNrS2V5KSwgc2VsZi5vcHRpb25zLmFzY2Vuc29yRmxvb3JOYW1lICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgICB2YXIgaGFzaEZsb29yID0gZ2V0Rmxvb3JGcm9tSGFzaCgpO1xuICAgICAgICAgICAgaGFzaEZsb29yICYmIChmbG9vckFjdGl2ZSA9IGhhc2hGbG9vcik7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5vcHRpb25zLnRvdWNoU3dpcGVJbnRlZ3JhdGlvbiAmJiBub2RlLnN3aXBlKHtcbiAgICAgICAgICAgIHN3aXBlOiBmdW5jdGlvbihldmVudCwgZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgbm9kZS50cmlnZ2VyKFwic2Nyb2xsVG9EaXJlY3Rpb25cIiwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDcwXG4gICAgICAgIH0pLCAkKHdpbmRvdykub24oXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhhc2hGbG9vciA9IGdldEZsb29yRnJvbUhhc2goKTtcbiAgICAgICAgICAgIGhhc2hGbG9vciAmJiAhbm9kZS5pcyhcIjphbmltYXRlZFwiKSAmJiBzY3JvbGxUb1N0YWdlKGhhc2hGbG9vciwgc2VsZi5vcHRpb25zLnRpbWUpO1xuICAgICAgICB9KSwgJHdpbmRvdy5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXNpemUoKTtcbiAgICAgICAgfSkubG9hZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlc2l6ZSgpO1xuICAgICAgICB9KS5yZXNpemUoKSwgd2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQgJiYgJHdpbmRvdy5iaW5kKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXNpemUoKTtcbiAgICAgICAgfSksIHNjcm9sbFRvU3RhZ2UoZmxvb3JBY3RpdmUsIDEsICEwKTtcbiAgICB9LCAkLmZuW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJC5kYXRhKHRoaXMsIFwicGx1Z2luX1wiICsgcGx1Z2luTmFtZSkgfHwgJC5kYXRhKHRoaXMsIFwicGx1Z2luX1wiICsgcGx1Z2luTmFtZSwgbmV3IFBsdWdpbih0aGlzLCBvcHRpb25zKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59KGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7Il0sImZpbGUiOiJqcXVlcnkuYXNjZW5zb3IuanMifQ==
