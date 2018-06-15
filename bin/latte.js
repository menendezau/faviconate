"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var latte;
(function (latte) {
    latte.deprecatedWarns = {};
    latte.includedPlugins = {};
    function _equalObjects(a, b) {
        if (!_isObject(a) || !_isObject(b))
            throw 'No objects';
        var p;
        for (p in a) {
            if (typeof (b[p]) == 'undefined') {
                return false;
            }
        }
        for (p in a) {
            if (a[p]) {
                switch (typeof (a[p])) {
                    case 'object':
                        if (!a[p].equals(b[p])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof (b[p]) == 'undefined' ||
                            (p != 'equals' && a[p].toString() != b[p].toString()))
                            return false;
                        break;
                    default:
                        if (a[p] != b[p]) {
                            return false;
                        }
                }
            }
            else {
                if (b[p])
                    return false;
            }
        }
        for (p in b) {
            if (typeof (a[p]) == 'undefined') {
                return false;
            }
        }
        return true;
    }
    latte._equalObjects = _equalObjects;
    ;
    function _isNumber(param) { return typeof param == 'number'; }
    latte._isNumber = _isNumber;
    ;
    function _isBoolean(param) { return typeof param == 'boolean'; }
    latte._isBoolean = _isBoolean;
    ;
    function _isString(param) { return typeof param == 'string'; }
    latte._isString = _isString;
    ;
    function _isArray(param, minLength) {
        if (minLength === void 0) { minLength = 0; }
        return (param instanceof Array) && param.length >= minLength;
    }
    latte._isArray = _isArray;
    ;
    function _isFunction(param) { return typeof param == 'function'; }
    latte._isFunction = _isFunction;
    ;
    function _isObject(param) { return typeof param == 'object'; }
    latte._isObject = _isObject;
    ;
    function _isNumeric(param) {
        var allowed = "1234567890.";
        if (!_isString(param))
            param = String(param);
        if (param.length == 0) {
            return false;
        }
        else {
            for (var i = 0; i < param.length; i++)
                if (allowed.indexOf(param.charAt(i)) < 0)
                    return false;
            return true;
        }
    }
    latte._isNumeric = _isNumeric;
    function _empty(object) {
        if (!object)
            return true;
        for (var i in object) {
            return false;
        }
        return true;
    }
    latte._empty = _empty;
    function _undef(param) { return typeof param == 'undefined'; }
    latte._undef = _undef;
    ;
    function log() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        if (!_undef(console) && !_undef(console.log)) {
            if (arguments['length'] == 1) {
                console.log(arguments[0]);
            }
            else {
                console.log(sprintf.apply(this, arguments));
            }
        }
    }
    latte.log = log;
    ;
    function _merge(a, b) {
        for (var i in a) {
            b[i] = a[i];
        }
        return b;
    }
    latte._merge = _merge;
    function sprintf() {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i] = arguments[_i];
        }
        var arg = 1, format = arguments[0], cur, next, result = [];
        for (var i = 0; i < format.length; i++) {
            cur = format.substr(i, 1);
            next = i == format.length - 1 ? '' : format.substr(i + 1, 1);
            if (cur == '%' && next == 's') {
                result.push(arguments[arg++]);
                i++;
            }
            else {
                result.push(cur);
            }
        }
        return result.join('');
    }
    latte.sprintf = sprintf;
    ;
    function warnDeprecated(code, alternateUse) {
        if (_undef(latte.deprecatedWarns[code]) && console && console.warn) {
            latte.deprecatedWarns[code] = true;
            console.warn(sprintf("latte: %s is deprecated. Please use %s instead", code, alternateUse));
        }
    }
    latte.warnDeprecated = warnDeprecated;
    var BindValueType;
    (function (BindValueType) {
        BindValueType[BindValueType["ANY"] = 0] = "ANY";
        BindValueType[BindValueType["NUMBER"] = 1] = "NUMBER";
        BindValueType[BindValueType["BOOLEAN"] = 2] = "BOOLEAN";
        BindValueType[BindValueType["STRING"] = 3] = "STRING";
        BindValueType[BindValueType["DATETIME"] = 4] = "DATETIME";
        BindValueType[BindValueType["TIMESPAN"] = 5] = "TIMESPAN";
    })(BindValueType = latte.BindValueType || (latte.BindValueType = {}));
    var CancellableCallbackEvent = (function () {
        function CancellableCallbackEvent() {
            this._callback = null;
        }
        Object.defineProperty(CancellableCallbackEvent.prototype, "callback", {
            get: function () {
                return this._callback;
            },
            set: function (value) {
                this._callback = value;
            },
            enumerable: true,
            configurable: true
        });
        return CancellableCallbackEvent;
    }());
    latte.CancellableCallbackEvent = CancellableCallbackEvent;
    var Collection = (function () {
        function Collection(addCallback, removeCallback, context) {
            if (addCallback === void 0) { addCallback = null; }
            if (removeCallback === void 0) { removeCallback = null; }
            if (context === void 0) { context = null; }
            this.pointer = 0;
            this._context = null;
            this._length = 0;
            if (addCallback) {
                this.addItem.add(addCallback, context);
            }
            if (removeCallback) {
                this.removeItem.add(removeCallback, context);
            }
            this.context = context;
        }
        Collection.prototype.add = function (element, raiseEvent) {
            if (raiseEvent === void 0) { raiseEvent = true; }
            var e = new CollectionEvent(element, this.length, true);
            if (e.cancel) {
                return null;
            }
            this[this._length++] = element;
            if (raiseEvent) {
                this.onAddItem(element, this.length);
            }
            return element;
        };
        Collection.prototype.addArray = function (elements, raiseEvent) {
            var _this = this;
            if (raiseEvent === void 0) { raiseEvent = true; }
            if (_isArray(elements)) {
                elements.forEach(function (e) { return _this.add(e); });
            }
            return elements;
        };
        Collection.prototype.addCollection = function (collection, raiseEvent) {
            if (raiseEvent === void 0) { raiseEvent = true; }
            for (var i = 0; i < collection.length; i++) {
                this.add(collection[i]);
            }
        };
        Collection.prototype.clear = function () {
            while (this.length > 0) {
                this.removeAt(0);
            }
        };
        Collection.prototype.contains = function (element) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == element)
                    return true;
            }
            return false;
        };
        Collection.prototype.correctItems = function (elements) {
            for (var i = 0; i < this.length; i++)
                delete this[i];
            for (var i = 0; i < elements.length; i++)
                this[i] = elements[i];
            this._length = elements.length;
        };
        Collection.prototype.each = function (handler) {
            for (var i = 0; i < this.count; i++) {
                handler.call(this.context, this[i], i);
            }
        };
        Collection.prototype.eachBut = function (exclude, handler) {
            for (var i = 0; i < this.count; i++) {
                if (this[i] != exclude)
                    handler.call(this.context, this[i], i);
            }
        };
        Collection.prototype.indexOf = function (item) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === item) {
                    return i;
                }
            }
            return -1;
        };
        Collection.prototype.item = function (index) {
            return this[index];
        };
        Collection.prototype.next = function () {
            if (this.pointer >= this.length) {
                this.pointer = 0;
                return null;
            }
            var elem = this[this.pointer];
            this.pointer++;
            return elem;
        };
        Collection.prototype.onAddItem = function (item, index) {
            if (this._addItem) {
                this._addItem.raise(item, index);
            }
        };
        Collection.prototype.onRemoveItem = function (item, index) {
            if (this._removeItem) {
                this._removeItem.raise(item, index);
            }
        };
        Collection.prototype.onRemovingItem = function (e) {
            if (this._removingItem) {
                this._removingItem.raise(e);
            }
        };
        Collection.prototype.remove = function (item, raiseEvent) {
            if (raiseEvent === void 0) { raiseEvent = true; }
            var e = new CollectionEvent(item, -1, true);
            this.onRemovingItem(e);
            if (e.cancel) {
                return null;
            }
            var buffer = [];
            var index = -1;
            var result;
            for (var i = 0; i < this.length; i++) {
                var t = this[i];
                delete this[i];
                if (t === item) {
                    result = item;
                    index = i;
                }
                else {
                    buffer.push(t);
                }
            }
            for (var i = 0; i < buffer.length; i++) {
                this[i] = buffer[i];
            }
            this._length = buffer.length;
            if (index >= 0) {
                if (raiseEvent) {
                    this.onRemoveItem(item, index);
                }
            }
            return result;
        };
        Collection.prototype.removeAt = function (index, raiseEvent) {
            if (raiseEvent === void 0) { raiseEvent = true; }
            this.remove(this[index], raiseEvent);
        };
        Collection.prototype.resetPointer = function () {
            this.pointer = 0;
        };
        Collection.prototype.toArray = function () {
            var a = [];
            this.each(function (i) { return a.push(i); });
            return a;
        };
        Object.defineProperty(Collection.prototype, "addingItem", {
            get: function () {
                if (!this._addingItem) {
                    this._addingItem = new LatteEvent(this);
                }
                return this._addingItem;
            },
            enumerable: true,
            configurable: true
        });
        Collection.prototype.onAddingItem = function (e) {
            if (this._addingItem) {
                this._addingItem.raise(e);
            }
        };
        Object.defineProperty(Collection.prototype, "addItem", {
            get: function () {
                if (!this._addItem) {
                    this._addItem = new LatteEvent(this);
                    this._addItem.context = this.context;
                }
                return this._addItem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "removeItem", {
            get: function () {
                if (!this._removeItem) {
                    this._removeItem = new LatteEvent(this);
                    this._addItem.context = this.context;
                }
                return this._removeItem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "removingItem", {
            get: function () {
                if (!this._removingItem) {
                    this._removingItem = new LatteEvent(this);
                }
                return this._removingItem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "context", {
            get: function () {
                return this._context;
            },
            set: function (value) {
                this._context = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "count", {
            get: function () {
                return this.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "first", {
            get: function () {
                return this.length > 0 ? this[0] : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "last", {
            get: function () {
                return (this.length > 0 ? this[this.length - 1] : null);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "length", {
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        return Collection;
    }());
    latte.Collection = Collection;
    var CollectionEvent = (function () {
        function CollectionEvent(item, itemIndex, cancellable) {
            if (itemIndex === void 0) { itemIndex = -1; }
            if (cancellable === void 0) { cancellable = false; }
            this._cancel = null;
            this._item = item;
            this._cancellable = cancellable;
            this._itemIndex = itemIndex;
        }
        Object.defineProperty(CollectionEvent.prototype, "cancel", {
            get: function () {
                return this._cancel;
            },
            set: function (value) {
                this._cancel = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CollectionEvent.prototype, "cancellable", {
            get: function () {
                return this._cancellable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CollectionEvent.prototype, "item", {
            get: function () {
                return this._item;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CollectionEvent.prototype, "itemIndex", {
            get: function () {
                return this._itemIndex;
            },
            enumerable: true,
            configurable: true
        });
        return CollectionEvent;
    }());
    latte.CollectionEvent = CollectionEvent;
    var Ajax = (function () {
        function Ajax() {
        }
        Ajax.get = function (url, success, error) {
            if (success === void 0) { success = null; }
            if (error === void 0) { error = null; }
            var xmlhttp;
            if ('XMLHttpRequest' in window) {
                xmlhttp = new XMLHttpRequest();
            }
            else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        if (_isFunction(success))
                            success(xmlhttp.responseText);
                    }
                    else {
                        if (_isFunction(error))
                            error(sprintf("Error %s: %s", xmlhttp.status, url));
                    }
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        };
        Ajax.post = function (url, data, success, error) {
            if (success === void 0) { success = null; }
            if (error === void 0) { error = null; }
            var req;
            var params = [];
            var query = null;
            if ('XMLHttpRequest' in window) {
                req = new XMLHttpRequest();
            }
            else {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            }
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        if (_isFunction(success))
                            success(req.responseText);
                    }
                    else {
                        if (_isFunction(error))
                            error(sprintf("Error %s: %s", req.status, url));
                    }
                }
            };
            var fdata = new FormData();
            for (var i in data) {
                fdata.append(i, data[i]);
            }
            req.open("POST", url);
            try {
                req.send(fdata);
            }
            catch (e) { }
        };
        return Ajax;
    }());
    latte.Ajax = Ajax;
})(latte = exports.latte || (exports.latte = {}));
