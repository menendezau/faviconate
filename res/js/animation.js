var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./latte"], function (require, exports, latte_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var animation;
    (function (animation) {
        var DateTime = latte_1.latte.DateTime;
        var PropertyTarget = latte_1.latte.PropertyTarget;
        var Animation = (function (_super) {
            __extends(Animation, _super);
            function Animation(startValue, endValue, duration, updateHandler, endHandler) {
                if (updateHandler === void 0) { updateHandler = null; }
                if (endHandler === void 0) { endHandler = null; }
                var _this = _super.call(this) || this;
                _this.setPropertyValues({
                    duration: duration,
                    startValue: startValue,
                    endValue: endValue
                });
                if (updateHandler) {
                    _this.on('update', updateHandler);
                }
                if (endHandler) {
                    _this.on('ended', endHandler);
                }
                return _this;
            }
            Object.defineProperty(Animation, "requestAnimationFrame", {
                get: function () {
                    return window.requestAnimationFrame || (function () {
                        var timeLast = 0;
                        return window['webkitRequestAnimationFrame'] || function (callback) {
                            var timeCurrent = (new Date()).getTime(), timeDelta;
                            timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
                            timeLast = timeCurrent + timeDelta;
                            return setTimeout(function () { callback(timeCurrent + timeDelta); }, timeDelta);
                        };
                    })();
                },
                enumerable: true,
                configurable: true
            });
            Animation.loop = function () {
                Animation.loopActive = true;
                var now = DateTime.now;
                var runningAnimations = 0;
                for (var i = 0; i < Animation.stack.length; i++) {
                    var a = Animation.stack[i];
                    if (!a || !a.running)
                        continue;
                    var value = a.currentValue;
                    if (now.compareTo(a.endTime) > 0 || value >= a.endValue) {
                        a.setPropertyValue('running', false);
                        a.raise('update', a.endValue);
                        a.raise('ended');
                    }
                    else {
                        a.raise('update', a.endValue);
                        runningAnimations++;
                    }
                }
                if (runningAnimations > 0) {
                    var rq = Animation.requestAnimationFrame;
                    rq(Animation.loop);
                }
                else {
                    Animation.stack = [];
                    Animation.loopActive = false;
                }
            };
            Animation.prototype.getValueForSecond = function (s) {
                return this.startValue + (this.speed * s);
            };
            Animation.prototype.start = function () {
                this.setPropertyValues({
                    startTime: DateTime.now,
                    running: true
                });
                Animation.stack.push(this);
                if (!Animation.loopActive)
                    Animation.loop();
            };
            Object.defineProperty(Animation.prototype, "currentValue", {
                get: function () {
                    return this.getValueForSecond(DateTime.now.subtractDate(this.startTime).totalSeconds);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "distance", {
                get: function () {
                    return this.endValue - this.startValue;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "duration", {
                get: function () {
                    return this.getPropertyValue('duration', 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "endValue", {
                get: function () {
                    return this.getPropertyValue('endValue', 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "endTime", {
                get: function () {
                    return this.startTime.addSeconds(this.duration);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "running", {
                get: function () {
                    return this.getPropertyValue('running', false);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "startValue", {
                get: function () {
                    return this._startValue;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "startTime", {
                get: function () {
                    return this.getPropertyValue('startTime', null);
                },
                set: function (value) {
                    this.setPropertyValue('startTime', value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "speed", {
                get: function () {
                    return this.distance / this.duration;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "tag", {
                get: function () {
                    return this.getPropertyValue('tag', undefined);
                },
                set: function (value) {
                    this.setPropertyValue('tag', value);
                },
                enumerable: true,
                configurable: true
            });
            Animation.stack = [];
            Animation.loopActive = false;
            return Animation;
        }(PropertyTarget));
        animation.Animation = Animation;
    })(animation = exports.animation || (exports.animation = {}));
});
