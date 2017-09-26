import {apis} from './api/index';
let AlfredNode = require('alfred-workflow-nodejs');
let actionHandler = AlfredNode.actionHandler;

function tool() {
    let argv = process.argv[2];
    let query = process.argv[3];
    // argv = 'CnpmApi:keyword';
    // query = 'ajax';
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
    // await api[action]()
    // console.log();
    if (!api[action]) {
        throw 'error need action';
    }

    actionHandler.onAction(argv, await api.run(action, query));


    AlfredNode.run();
})();