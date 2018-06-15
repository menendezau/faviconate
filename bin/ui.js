"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var ui;
(function (ui) {
    var Element = (function () {
        function Element(raw) {
            this._raw = null;
            if (!raw) {
                throw "HTMLElement Needed";
            }
        }
        Object.defineProperty(Element.prototype, "raw", {
            get: function () {
                return this._raw;
            },
            enumerable: true,
            configurable: true
        });
        return Element;
    }());
    ui.Element = Element;
    var GenericElement = (function (_super) {
        __extends(GenericElement, _super);
        function GenericElement(e) {
            if (e === void 0) { e = null; }
            return _super.call(this, e || document.createElement('div')) || this;
        }
        return GenericElement;
    }(Element));
    ui.GenericElement = GenericElement;
})(ui = exports.ui || (exports.ui = {}));
