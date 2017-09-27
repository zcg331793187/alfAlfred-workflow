"use strict";
const cnpmApi_1 = require("./cnpmApi");
const runoobApi_1 = require("./runoobApi");
const npmApi_1 = require("./npmApi");
const bilibiliApi_1 = require("./bilibiliApi");
const acfunApi_1 = require("./acfunApi");
const _apis = [cnpmApi_1.CnpmApi, runoobApi_1.RunoobApi, npmApi_1.NpmApi, bilibiliApi_1.BilibiliApi, acfunApi_1.AcfunApi];
exports.apis = _apis.reduce((hash, item) => {
    hash[item.name] = item;
    return hash;
}, {});
