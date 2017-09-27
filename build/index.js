"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const index_1 = require("./api/index");
let AlfredNode = require('alfred-workflow-nodejs');
let actionHandler = AlfredNode.actionHandler;
function tool() {
    let argv = process.argv[2];
    let query = encodeURI(process.argv[3]);
    // argv = 'AcfunApi:keyword';
    // query = '%E9%BB%91%E5%8F%91';
    let newArgv = argv.split(':');
    let apiName = newArgv[0];
    let action = newArgv[1];
    if (!apiName || !action) {
        throw 'need two argv';
    }
    return { apiName, action, query, argv };
}
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let { apiName, action, query, argv } = tool();
        let api = new index_1.apis[apiName]();
        if (!api[action]) {
            throw 'error need action';
        }
        actionHandler.onAction(argv, yield api.run(action, query));
        AlfredNode.run();
    });
})();
