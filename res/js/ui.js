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
define(["require", "exports", "./latte", "./animation"], function (require, exports, latte_1, animation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ui;
    (function (ui) {
        var Animation = animation_1.animation.Animation;
        var DateTime = latte_1.latte.DateTime;
        var PropertyTarget = latte_1.latte.PropertyTarget;
        var LanguageDirection;
        (function (LanguageDirection) {
            LanguageDirection[LanguageDirection["AUTO"] = 0] = "AUTO";
            LanguageDirection[LanguageDirection["RTL"] = 1] = "RTL";
            LanguageDirection[LanguageDirection["LTR"] = 2] = "LTR";
        })(LanguageDirection = ui.LanguageDirection || (ui.LanguageDirection = {}));
        var Element = (function (_super) {
            __extends(Element, _super);
            function Element(raw) {
                var _this = _super.call(this) || this;
                _this._isBeingAnimated = false;
                if (!raw) {
                    throw "HTMLElement Needed";
                }
                _this.setPropertyValue('raw', raw);
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
                        _this.setPropertyValue(p, value);
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
                        _this._isBeingAnimated = false;
                    });
                    if (callback) {
                        leader_1.on('ended', callback);
                    }
                    this._isBeingAnimated = true;
                    leader_1.start();
                    for (var i = 1; i < animations.length; i++)
                        animations[i].startTime = DateTime.now;
                    return this;
                }
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
                        return _this.getPropertyValue(p);
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
                    return this.getPropertyValue('raw', undefined);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Element.prototype, "isBeingAnimated", {
                get: function () {
                    return this._isBeingAnimated;
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
            Object.defineProperty(UiElement.prototype, "langDirection", {
                get: function () {
                    return this.getPropertyValue('langDirection', LanguageDirection.AUTO);
                },
                set: function (value) {
                    this.setPropertyValue('langDirection', value);
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
                    return this.getPropertyValue('text', null);
                },
                set: function (value) {
                    this.setPropertyValue('text', value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Label.prototype, "divDescription", {
                get: function () {
                    return this.getLazyProperty('divDescription', function () {
                        return new DivElement('description');
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Label.prototype, "divText", {
                get: function () {
                    return this.getLazyProperty('divText', function () {
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
                    return this.getPropertyValue('selected', null);
                },
                set: function (value) {
                    this.setPropertyValue('selected', value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Selectable.prototype, "divLabel", {
                get: function () {
                    return this.getLazyProperty('divLabel', function () {
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
