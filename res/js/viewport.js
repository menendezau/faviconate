define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var viewport;
    (function (viewport) {
        function onResize(e, callback) {
            window.addEventListener('resize', callback);
            e.on('detach', function () { return window.removeEventListener('resize', callback); });
        }
        viewport.onResize = onResize;
    })(viewport = exports.viewport || (exports.viewport = {}));
});
