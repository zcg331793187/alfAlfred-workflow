let AlfredNode = require('alfred-workflow-nodejs');
let actionHandler = AlfredNode.actionHandler;
let workflow = AlfredNode.workflow;
let Crawler = require('crawler');
let crawler = new Crawler({
    maxConnections: 2
});
export function isNullData(data: any[]) {
    let Item = AlfredNode.Item;
    if (data.length == 0) {
        let item1 = new Item({
            title: '暂无搜索结果，不如换个关键词试试..',
        });
        workflow.addItem(item1);

    }
}


(function main() {
    actionHandler.onAction("keyword", function (query: string) {
        let Item = AlfredNode.Item;
        crawler.queue([{
            uri: `https://www.npmjs.com/search?q=${query}&page=1&ranking=optimal`,
            callback: function (error: any, res: any, done: any) {

                if (error) {
                    console.log(error);
                } else {

                    let $ = res.$;
                    let listObj = $('.package-details');
                    let needData: any[] = [];
                    listObj.each(function (idx: number, ele: any) {

                        let url = ele.children[0].children[0].attribs.href;
                        let title = ele.children[0].children[0].children[0].data ? ele.children[0].children[0].children[0].data : '';
                        let arg = ele.children[2].children[1].children[0].data;

                        if (url && title && arg) {
                            needData.push({url, title, arg});
                        }


                    });
                    needData.forEach((value: any, index: number) => {

                        let item1 = new Item({
                            uid: index,
                            title: 'V' + value.arg + ',' + value.title,
                            arg: value.url,
                            subtitle: value.url,
                            valid: true
                        });
                        workflow.addItem(item1);

                    });


                    isNullData(needData);

                    workflow.feedback();
                }
                done();
            }
        }]);


    });


    AlfredNode.run();
})();