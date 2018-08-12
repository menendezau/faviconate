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
    var ui;
    (function (ui) {
        var DateTime = latte_1.latte.DateTime;
        var PropertyTarget = latte_1.latte.PropertyTarget;
        var Any = latte_1.latte.Any;
        var LanguageDirection;
        (function (LanguageDirection) {
            LanguageDirection[LanguageDirection["AUTO"] = 0] = "AUTO";
            LanguageDirection[LanguageDirection["RTL"] = 1] = "RTL";
            LanguageDirection[LanguageDirection["LTR"] = 2] = "LTR";
        })(LanguageDirection = ui.LanguageDirection || (ui.LanguageDirection = {}));
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
                        a.setPropertyValue('running', false, Boolean);
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
                this.updateStartDate();
                Animation.stack.push(this);
                if (!Animation.loopActive)
                    Animation.loop();
            };
            Animation.prototype.updateStartDate = function () {
                this.setPropertyValue('startTime', this.nowSupplier(), DateTime);
            };
            Object.defineProperty(Animation.prototype, "currentValue", {
                get: function () {
                    return this.getValueForSecond((this.nowSupplier()).subtractDate(this.startTime).totalSeconds);
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
                    return this.getPropertyValue('duration', Number, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "endValue", {
                get: function () {
                    return this.getPropertyValue('endValue', Number, 0);
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
            Object.defineProperty(Animation.prototype, "nowSupplier", {
                get: function () {
                    return this.getPropertyValue('nowSupplier', Any, function () { return DateTime.now; });
                },
                set: function (value) {
                    this.setPropertyValue('nowSupplier', value, Any);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "running", {
                get: function () {
                    return this.getPropertyValue('running', Boolean, false);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "startValue", {
                get: function () {
                    return this.getPropertyValue('startValue', Number, undefined);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "startTime", {
                get: function () {
                    return this.getPropertyValue('startTime', DateTime, null);
                },
                set: function (value) {
                    this.setPropertyValue('startTime', value, DateTime);
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
                    return this.getPropertyValue('tag', Any, undefined);
                },
                set: function (value) {
                    this.setPropertyValue('tag', value, Any);
                },
                enumerable: true,
                configurable: true
            });
            Animation.stack = [];
            Animation.loopActive = false;
            return Animation;
        }(PropertyTarget));
        ui.Animation = Animation;
        var Element = (function (_super) {
            __extends(Element, _super);
            function Element(raw) {
                var _this = _super.call(this) || this;
                _this.animations = [];
                if (!raw) {
                    throw "HTMLElement Needed";
                }
                _this.setPropertyValue('raw', raw, HTMLElement);
                return _this;
            }
            Element.of = function (tagName) {
                var raw = document.createElement(tagName);
                return new Element(raw);
            };
            Element.prototype.getCssNumericValue = function (property) {
                return parseFloat(this.raw.style[property] || '0');
            };
            Element.prototype.setCssNumericValue = function (property, value) {
                if (property == 'opacity') {
                    this.raw.style[property] = String(value);
                }
                else {
                    this.raw.style[property] = value + 'px';
                }
            };
            Element.prototype.addClass = function (name) {
                var _this = this;
                if (name.indexOf(' ') > 0) {
                    name.split(' ').forEach(function (token) { return _this.raw.classList.add(token); });
                }
                else {
                    this.raw.classList.add(name);
                }
                return this;
            };
            Element.prototype.add = function (e) {
                var _this = this;
                if (e instanceof HTMLElement) {
                    this.raw.appendChild(e);
                }
                else if (e instanceof Element) {
                    this.add(e.raw);
                    e.raise('attach');
                }
                else if (e instanceof Array) {
                    e.forEach(function (piece) { return _this.add(piece); });
                }
                return this;
            };
            Element.prototype.animateFrom = function (startProperties, endProperties, duration, callback) {
                var _this = this;
                if (duration === void 0) { duration = 0.1; }
                if (callback === void 0) { callback = null; }
                var animations = [];
                var setValue = function (p, value) {
                    if (!_this.hasPropertyValue(p)) {
                        _this.setCssNumericValue(p, value);
                    }
                    else {
                        _this.setPropertyValue(p, value, Any);
                    }
                };
                for (var p in startProperties) {
                    var a = new Animation(startProperties[p], endProperties[p], duration, null);
                    a.tag = p;
                    animations.push(a);
                }
                if (animations.length > 0) {
                    var leader_1 = animations[0];
                    leader_1.on('update', function () {
                        for (var i = 0; i < animations.length; i++) {
                            var a = animations[i];
                            setValue(a.tag, leader_1.running ? a.currentValue : a.endValue);
                        }
                    });
                    leader_1.on('ended', function () {
                        _this.setPropertyValue('isBeingAnimated', false, Boolean);
                    });
                    if (callback) {
                        leader_1.on('ended', callback);
                    }
                    this.setPropertyValue('isBeingAnimated', true, Boolean);
                    leader_1.start();
                    animations.forEach(function (a) { return a.startTime = DateTime.now; });
                    return this;
                }
                this.animations = this.animations.concat(animations);
                this.animations = this.animations.filter(function (a) { return a.running; });
            };
            Element.prototype.animate = function (properties, duration, callback) {
                var _this = this;
                if (duration === void 0) { duration = 0.1; }
                if (callback === void 0) { callback = null; }
                var starts = {};
                var getValue = function (p) {
                    if (!_this.hasPropertyValue(p)) {
                        return _this.getCssNumericValue(p);
                    }
                    else {
                        return _this.getPropertyValue(p, Any, undefined);
                    }
                };
                for (var p in properties) {
                    starts[p] = getValue(p);
                }
                this.animateFrom(starts, properties, duration, callback);
                return this;
            };
            Element.prototype.attachTo = function (e) {
                if (e instanceof Element) {
                    e.raw.appendChild(this.raw);
                }
                else {
                    e.appendChild(this.raw);
                }
                this.raise('attach');
                return this;
            };
            Element.prototype.addEventListener = function (name, listener) {
                this.raw.addEventListener(name, listener);
                return this;
            };
            Element.prototype.ensureClass = function (className, present) {
                if (present === void 0) { present = true; }
                if (present) {
                    this.addClass(className);
                }
                else {
                    this.removeClass(className);
                }
                return this;
            };
            Element.prototype.getAtt = function (name) {
                return this.raw.getAttribute(name);
            };
            Element.prototype.hasClass = function (className) {
                return this.raw.classList.contains(className);
            };
            Element.prototype.setAtt = function (name, value) {
                this.raw.setAttribute(name, value);
                return this;
            };
            Element.prototype.setAtts = function (keyValueMap) {
                for (var key in keyValueMap)
                    this.setAtt(key, String(keyValueMap[key]));
                return this;
            };
            Element.prototype.removeClass = function (name) {
                this.raw.classList.remove(name);
                return this;
            };
            Element.prototype.removeFromParent = function () {
                this.raw.remove();
                this.raise('detach');
            };
            Object.defineProperty(Element.prototype, "html", {
                get: function () {
                    return this.raw.innerHTML;
                },
                set: function (value) {
                    this.raw.innerHTML = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Element.prototype, "raw", {
                get: function () {
                    return this.getPropertyValue('raw', HTMLElement, undefined);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Element.prototype, "isBeingAnimated", {
                get: function () {
                    return this.getPropertyValue('isBeingAnimated', Boolean, false);
                },
                enumerable: true,
                configurable: true
            });
            return Element;
        }(PropertyTarget));
        ui.Element = Element;
        var AnyElement = (function (_super) {
            __extends(AnyElement, _super);
            function AnyElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AnyElement;
        }(Element));
        ui.AnyElement = AnyElement;
        var UiElement = (function (_super) {
            __extends(UiElement, _super);
            function UiElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UiElement.prototype.didSet = function (e) {
                _super.prototype.didSet.call(this, e);
                if (e.property == 'langDirection') {
                    switch (this.langDirection) {
                        case LanguageDirection.AUTO:
                            this.setAtt('dir', 'auto');
                            break;
                        case LanguageDirection.LTR:
                            this.setAtt('dir', 'ltr');
                            break;
                        case LanguageDirection.RTL:
                            this.setAtt('dir', 'rtl');
                            break;
                    }
                }
            };
            Object.defineProperty(UiElement.prototype, "langDirection", {
                get: function () {
                    return this.getPropertyValue('langDirection', Any, LanguageDirection.AUTO);
                },
                set: function (value) {
                    this.setPropertyValue('langDirection', value, Any);
                },
                enumerable: true,
                configurable: true
            });
            return UiElement;
        }(Element));
        ui.UiElement = UiElement;
        var DivElement = (function (_super) {
            __extends(DivElement, _super);
            function DivElement(e) {
                if (e === void 0) { e = null; }
                var _this = _super.call(this, e instanceof HTMLDivElement ? e : document.createElement('div')) || this;
                if ("string" === typeof e) {
                    _this.addClass(e);
                }
                return _this;
            }
            DivElement.withClass = function (name) {
                var d = new DivElement();
                d.addClass(name);
                return d;
            };
            return DivElement;
        }(UiElement));
        ui.DivElement = DivElement;
        var InputElement = (function (_super) {
            __extends(InputElement, _super);
            function InputElement(e) {
                if (e === void 0) { e = null; }
                return _super.call(this, e || document.createElement('input')) || this;
            }
            return InputElement;
        }(UiElement));
        ui.InputElement = InputElement;
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label() {
                return _super.call(this, 'label') || this;
            }
            Label.prototype.didSet = function (e) {
                _super.prototype.didSet.call(this, e);
                if (e.property == 'text') {
                    this.divText.html = this.text;
                }
            };
            Object.defineProperty(Label.prototype, "text", {
                get: function () {
                    return this.getPropertyValue('text', String, null);
                },
                set: function (value) {
                    this.setPropertyValue('text', value, String);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Label.prototype, "divDescription", {
                get: function () {
                    return this.getLazyProperty('divDescription', DivElement, function () {
                        return new DivElement('description');
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Label.prototype, "divText", {
                get: function () {
                    return this.getLazyProperty('divText', DivElement, function () {
                        return new DivElement('text');
                    });
                },
                enumerable: true,
                configurable: true
            });
            return Label;
        }(DivElement));
        ui.Label = Label;
        var Clickable = (function (_super) {
            __extends(Clickable, _super);
            function Clickable() {
                return _super.call(this) || this;
            }
            return Clickable;
        }(DivElement));
        ui.Clickable = Clickable;
        var Selectable = (function (_super) {
            __extends(Selectable, _super);
            function Selectable() {
                return _super.call(this, 'selectable') || this;
            }
            Selectable.prototype.didSet = function (e) {
                _super.prototype.didSet.call(this, e);
                if (e.property == 'selected') {
                    this.ensureClass('selected', this.selected);
                }
            };
            Object.defineProperty(Selectable.prototype, "selected", {
                get: function () {
                    return this.getPropertyValue('selected', Boolean, null);
                },
                set: function (value) {
                    this.setPropertyValue('selected', value, Boolean);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Selectable.prototype, "divLabel", {
                get: function () {
                    return this.getLazyProperty('divLabel', Label, function () {
                        return new Label();
                    });
                },
                enumerable: true,
                configurable: true
            });
            return Selectable;
        }(DivElement));
        ui.Selectable = Selectable;
        var ListView = (function (_super) {
            __extends(ListView, _super);
            function ListView() {
                return _super.call(this, 'list') || this;
            }
            return ListView;
        }(DivElement));
        ui.ListView = ListView;
    })(ui = exports.ui || (exports.ui = {}));
});
