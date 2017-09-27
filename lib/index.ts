import {apis} from './api/index';
let AlfredNode = require('alfred-workflow-nodejs');
let actionHandler = AlfredNode.actionHandler;

function tool() {
    let argv = process.argv[2];
    let query = encodeURI(process.argv[3]);
    argv = 'AcfunApi:keyword';
    query = '%E9%BB%91%E5%8F%91';
    let newArgv = argv.split(':');


    let apiName = newArgv[0];
    let action = newArgv[1];

    if (!apiName || !action) {
        throw 'need two argv';
    }


    return {apiName, action, query, argv}
}


(async function main() {


    let {apiName, action, query, argv} = tool();
    let api = new apis[apiName]();

    if (!api[action]) {
        throw 'error need action';
    }

    actionHandler.onAction(argv, await api.run(action, query));


    AlfredNode.run();
})();