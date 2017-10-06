import {apis} from './api/index';
let AlfredNode = require('alfred-workflow-nodejs');
let actionHandler = AlfredNode.actionHandler;

function tool() {
    let argv = process.argv[2];
    let argvQuery = String(process.argv[3]).split('|') || [];
    let queryString, pageNo;
    let query = encodeURI(argvQuery[0]);

    if (argvQuery[1]) {
        pageNo = Number(argvQuery[1]);
    } else {
        pageNo = 1
    }


    // argv = 'AcfunApi:keyword';
    // query = '%E9%BB%91%E5%8F%91';
    // pageNo = '1';

    let newArgv = argv.split(':');


    let apiName = newArgv[0];
    let action = newArgv[1];

    if (!apiName || !action) {
        throw 'need two argv';
    }


    return {apiName, action, query, pageNo, argv}
}


(async function main() {


    let {apiName, action, query, argv, pageNo} = tool();
    let api = new apis[apiName]();

    if (!api[action]) {
        throw 'error need action';
    }

    actionHandler.onAction(argv, await api.run(action, {query, pageNo}));


    AlfredNode.run();
})();