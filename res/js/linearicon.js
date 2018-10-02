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
define(["require", "exports", "./ui"], function (require, exports, ui_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var linearicon;
    (function (linearicon) {
        var IconItem = ui_1.ui.IconItem;
        var LinearIcon = (function (_super) {
            __extends(LinearIcon, _super);
            function LinearIcon(className) {
                var _this = _super.call(this) || this;
                _this.addClass("lnr");
                _this.addClass("lnr-" + className);
                return _this;
            }
            LinearIcon.makeFrom = function (className) {
                return new LinearIcon(className);
            };
            Object.defineProperty(LinearIcon, "home", {
                get: function () { return this.makeFrom("home"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "apartment", {
                get: function () { return this.makeFrom("apartment"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "pencil", {
                get: function () { return this.makeFrom("pencil"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "magicWand", {
                get: function () { return this.makeFrom("magic-wand"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "drop", {
                get: function () { return this.makeFrom("drop"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "lighter", {
                get: function () { return this.makeFrom("lighter"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "poop", {
                get: function () { return this.makeFrom("poop"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "sun", {
                get: function () { return this.makeFrom("sun"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "moon", {
                get: function () { return this.makeFrom("moon"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "cloud", {
                get: function () { return this.makeFrom("cloud"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "cloudUpload", {
                get: function () { return this.makeFrom("cloud-upload"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "cloudDownload", {
                get: function () { return this.makeFrom("cloud-download"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "cloudSync", {
                get: function () { return this.makeFrom("cloud-sync"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "cloudCheck", {
                get: function () { return this.makeFrom("cloud-check"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "database", {
                get: function () { return this.makeFrom("database"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "lock", {
                get: function () { return this.makeFrom("lock"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "cog", {
                get: function () { return this.makeFrom("cog"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "trash", {
                get: function () { return this.makeFrom("trash"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "dice", {
                get: function () { return this.makeFrom("dice"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "heart", {
                get: function () { return this.makeFrom("heart"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "star", {
                get: function () { return this.makeFrom("star"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "starHalf", {
                get: function () { return this.makeFrom("star-half"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "starEmpty", {
                get: function () { return this.makeFrom("star-empty"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "flag", {
                get: function () { return this.makeFrom("flag"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "envelope", {
                get: function () { return this.makeFrom("envelope"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "paperclip", {
                get: function () { return this.makeFrom("paperclip"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "inbox", {
                get: function () { return this.makeFrom("inbox"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "eye", {
                get: function () { return this.makeFrom("eye"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "printer", {
                get: function () { return this.makeFrom("printer"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "fileEmpty", {
                get: function () { return this.makeFrom("file-empty"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "fileAdd", {
                get: function () { return this.makeFrom("file-add"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "enter", {
                get: function () { return this.makeFrom("enter"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "exit", {
                get: function () { return this.makeFrom("exit"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "graduationHat", {
                get: function () { return this.makeFrom("graduation-hat"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "license", {
                get: function () { return this.makeFrom("license"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "musicNote", {
                get: function () { return this.makeFrom("music-note"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "filmPlay", {
                get: function () { return this.makeFrom("film-play"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "cameraVideo", {
                get: function () { return this.makeFrom("camera-video"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "camera", {
                get: function () { return this.makeFrom("camera"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "picture", {
                get: function () { return this.makeFrom("picture"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "book", {
                get: function () { return this.makeFrom("book"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "bookmark", {
                get: function () { return this.makeFrom("bookmark"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "user", {
                get: function () { return this.makeFrom("user"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "users", {
                get: function () { return this.makeFrom("users"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "shirt", {
                get: function () { return this.makeFrom("shirt"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "store", {
                get: function () { return this.makeFrom("store"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "cart", {
                get: function () { return this.makeFrom("cart"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "tag", {
                get: function () { return this.makeFrom("tag"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "phoneHandset", {
                get: function () { return this.makeFrom("phone-handset"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "phone", {
                get: function () { return this.makeFrom("phone"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "pushpin", {
                get: function () { return this.makeFrom("pushpin"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "mapMarker", {
                get: function () { return this.makeFrom("map-marker"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "map", {
                get: function () { return this.makeFrom("map"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "location", {
                get: function () { return this.makeFrom("location"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "calendarFull", {
                get: function () { return this.makeFrom("calendar-full"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "keyboard", {
                get: function () { return this.makeFrom("keyboard"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "spellCheck", {
                get: function () { return this.makeFrom("spell-check"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "screen", {
                get: function () { return this.makeFrom("screen"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "smartphone", {
                get: function () { return this.makeFrom("smartphone"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "tablet", {
                get: function () { return this.makeFrom("tablet"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "laptop", {
                get: function () { return this.makeFrom("laptop"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "laptopPhone", {
                get: function () { return this.makeFrom("laptop-phone"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "powerSwitch", {
                get: function () { return this.makeFrom("power-switch"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "bubble", {
                get: function () { return this.makeFrom("bubble"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "heartPulse", {
                get: function () { return this.makeFrom("heart-pulse"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "construction", {
                get: function () { return this.makeFrom("construction"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "pieChart", {
                get: function () { return this.makeFrom("pie-chart"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "chartBars", {
                get: function () { return this.makeFrom("chart-bars"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "gift", {
                get: function () { return this.makeFrom("gift"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "diamond", {
                get: function () { return this.makeFrom("diamond"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "linearicons", {
                get: function () { return this.makeFrom("linearicons"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "dinner", {
                get: function () { return this.makeFrom("dinner"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "coffeeCup", {
                get: function () { return this.makeFrom("coffee-cup"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "leaf", {
                get: function () { return this.makeFrom("leaf"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "paw", {
                get: function () { return this.makeFrom("paw"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "rocket", {
                get: function () { return this.makeFrom("rocket"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "briefcase", {
                get: function () { return this.makeFrom("briefcase"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "bus", {
                get: function () { return this.makeFrom("bus"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "car", {
                get: function () { return this.makeFrom("car"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "train", {
                get: function () { return this.makeFrom("train"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "bicycle", {
                get: function () { return this.makeFrom("bicycle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "wheelchair", {
                get: function () { return this.makeFrom("wheelchair"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "select", {
                get: function () { return this.makeFrom("select"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "earth", {
                get: function () { return this.makeFrom("earth"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "smile", {
                get: function () { return this.makeFrom("smile"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "sad", {
                get: function () { return this.makeFrom("sad"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "neutral", {
                get: function () { return this.makeFrom("neutral"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "mustache", {
                get: function () { return this.makeFrom("mustache"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "alarm", {
                get: function () { return this.makeFrom("alarm"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "bullhorn", {
                get: function () { return this.makeFrom("bullhorn"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "volumeHigh", {
                get: function () { return this.makeFrom("volume-high"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "volumeMedium", {
                get: function () { return this.makeFrom("volume-medium"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "volumeLow", {
                get: function () { return this.makeFrom("volume-low"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "volume", {
                get: function () { return this.makeFrom("volume"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "mic", {
                get: function () { return this.makeFrom("mic"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "hourglass", {
                get: function () { return this.makeFrom("hourglass"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "undo", {
                get: function () { return this.makeFrom("undo"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "redo", {
                get: function () { return this.makeFrom("redo"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "sync", {
                get: function () { return this.makeFrom("sync"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "history", {
                get: function () { return this.makeFrom("history"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "clock", {
                get: function () { return this.makeFrom("clock"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "download", {
                get: function () { return this.makeFrom("download"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "upload", {
                get: function () { return this.makeFrom("upload"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "enterDown", {
                get: function () { return this.makeFrom("enter-down"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "exitUp", {
                get: function () { return this.makeFrom("exit-up"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "bug", {
                get: function () { return this.makeFrom("bug"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "code", {
                get: function () { return this.makeFrom("code"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "link", {
                get: function () { return this.makeFrom("link"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "unlink", {
                get: function () { return this.makeFrom("unlink"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "thumbsUp", {
                get: function () { return this.makeFrom("thumbs-up"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "thumbsDown", {
                get: function () { return this.makeFrom("thumbs-down"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "magnifier", {
                get: function () { return this.makeFrom("magnifier"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "cross", {
                get: function () { return this.makeFrom("cross"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "menu", {
                get: function () { return this.makeFrom("menu"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "list", {
                get: function () { return this.makeFrom("list"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "chevronUp", {
                get: function () { return this.makeFrom("chevron-up"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "chevronDown", {
                get: function () { return this.makeFrom("chevron-down"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "chevronLeft", {
                get: function () { return this.makeFrom("chevron-left"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "chevronRight", {
                get: function () { return this.makeFrom("chevron-right"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "arrowUp", {
                get: function () { return this.makeFrom("arrow-up"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "arrowDown", {
                get: function () { return this.makeFrom("arrow-down"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "arrowLeft", {
                get: function () { return this.makeFrom("arrow-left"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "arrowRight", {
                get: function () { return this.makeFrom("arrow-right"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "move", {
                get: function () { return this.makeFrom("move"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "warning", {
                get: function () { return this.makeFrom("warning"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "questionCircle", {
                get: function () { return this.makeFrom("question-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "menuCircle", {
                get: function () { return this.makeFrom("menu-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "checkmarkCircle", {
                get: function () { return this.makeFrom("checkmark-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "crossCircle", {
                get: function () { return this.makeFrom("cross-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "plusCircle", {
                get: function () { return this.makeFrom("plus-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "circleMinus", {
                get: function () { return this.makeFrom("circle-minus"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "arrowUpCircle", {
                get: function () { return this.makeFrom("arrow-up-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "arrowDownCircle", {
                get: function () { return this.makeFrom("arrow-down-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "arrowLeftCircle", {
                get: function () { return this.makeFrom("arrow-left-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "arrowRightCircle", {
                get: function () { return this.makeFrom("arrow-right-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "chevronUpCircle", {
                get: function () { return this.makeFrom("chevron-up-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "chevronDownCircle", {
                get: function () { return this.makeFrom("chevron-down-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "chevronLeftCircle", {
                get: function () { return this.makeFrom("chevron-left-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "chevronRightCircle", {
                get: function () { return this.makeFrom("chevron-right-circle"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "crop", {
                get: function () { return this.makeFrom("crop"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "frameExpand", {
                get: function () { return this.makeFrom("frame-expand"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "frameContract", {
                get: function () { return this.makeFrom("frame-contract"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "layers", {
                get: function () { return this.makeFrom("layers"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "funnel", {
                get: function () { return this.makeFrom("funnel"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "textFormat", {
                get: function () { return this.makeFrom("text-format"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "textFormatRemove", {
                get: function () { return this.makeFrom("text-format-remove"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "textSize", {
                get: function () { return this.makeFrom("text-size"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "bold", {
                get: function () { return this.makeFrom("bold"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "italic", {
                get: function () { return this.makeFrom("italic"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "underline", {
                get: function () { return this.makeFrom("underline"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "strikethrough", {
                get: function () { return this.makeFrom("strikethrough"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "highlight", {
                get: function () { return this.makeFrom("highlight"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "textAlignLeft", {
                get: function () { return this.makeFrom("text-align-left"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "textAlignCenter", {
                get: function () { return this.makeFrom("text-align-center"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "textAlignRight", {
                get: function () { return this.makeFrom("text-align-right"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "textAlignJustify", {
                get: function () { return this.makeFrom("text-align-justify"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "lineSpacing", {
                get: function () { return this.makeFrom("line-spacing"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "indentIncrease", {
                get: function () { return this.makeFrom("indent-increase"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "indentDecrease", {
                get: function () { return this.makeFrom("indent-decrease"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "pilcrow", {
                get: function () { return this.makeFrom("pilcrow"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "directionLtr", {
                get: function () { return this.makeFrom("direction-ltr"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "directionRtl", {
                get: function () { return this.makeFrom("direction-rtl"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "pageBreak", {
                get: function () { return this.makeFrom("page-break"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "sortAlphaAsc", {
                get: function () { return this.makeFrom("sort-alpha-asc"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "sortAmountAsc", {
                get: function () { return this.makeFrom("sort-amount-asc"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "hand", {
                get: function () { return this.makeFrom("hand"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "pointerUp", {
                get: function () { return this.makeFrom("pointer-up"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "pointerRight", {
                get: function () { return this.makeFrom("pointer-right"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "pointerDown", {
                get: function () { return this.makeFrom("pointer-down"); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearIcon, "pointerLeft", {
                get: function () { return this.makeFrom("pointer-left"); },
                enumerable: true,
                configurable: true
            });
            return LinearIcon;
        }(IconItem));
        linearicon.LinearIcon = LinearIcon;
    })(linearicon = exports.linearicon || (exports.linearicon = {}));
});
