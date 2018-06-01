define(["require", "exports", "./models"], function (require, exports, models_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.run = function () {
        var p = new models_1.models.Person("John");
        console.log(p.name);
    };
});
