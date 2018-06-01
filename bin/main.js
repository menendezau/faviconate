"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
exports.run = function () {
    var p = new models_1.models.Person("John");
    console.log(p.name);
};
