"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cnpmApi_1 = require("./cnpmApi");
const runoobApi_1 = require("./runoobApi");
const npmApi_1 = require("./npmApi");
const _apis = [cnpmApi_1.CnpmApi, runoobApi_1.RunoobApi, npmApi_1.NpmApi];
exports.apis = _apis.reduce((hash, item) => {
    hash[item.name] = item;
    return hash;
}, {});
//# sourceMappingURL=index.js.map