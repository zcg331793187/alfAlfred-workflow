"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let AlfredNode = require('alfred-workflow-nodejs');
let actionHandler = AlfredNode.actionHandler;
let workflow = AlfredNode.workflow;
let Crawler = require('crawler');
let crawler = new Crawler({
    maxConnections: 2
});
function isNullData(data) {
    let Item = AlfredNode.Item;
    if (data.length == 0) {
        let item1 = new Item({
            title: '暂无搜索结果，不如换个关键词试试..',
        });
        workflow.addItem(item1);
    }
}
exports.isNullData = isNullData;
(function main() {
    actionHandler.onAction("keyword", function (query) {
        let Item = AlfredNode.Item;
        crawler.queue([{
                uri: `http://www.runoob.com/?s=${query}`,
                callback: function (error, res, done) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        let $ = res.$;
                        let listObj = $('.archive-list-item a');
                        let needData = [];
                        // console.log(listObj);
                        // let list = listObj.children;
                        listObj.each(function (idx, ele) {
                            let url = ele.attribs.href;
                            let title = ele.attribs.title;
                            if (url && title) {
                                needData.push({ url, title });
                            }
                        });
                        needData.forEach((value, index) => {
                            let item1 = new Item({
                                uid: index,
                                title: value.title,
                                arg: value.url,
                                subtitle: value.url,
                                valid: true
                            });
                            workflow.addItem(item1);
                        });
                        isNullData(needData);
                        // console.log($('.post_weidaopic_title a'));
                        workflow.feedback();
                    }
                    done();
                }
            }]);
    });
    AlfredNode.run();
})();
//# sourceMappingURL=runoob.js.map