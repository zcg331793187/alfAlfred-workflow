const alfredWorkflowNodejs = require('alfred-workflow-nodejs');
const Crawler = require('crawler');
export class BaseApi {
    alfredNode: { actionHandler: any, workflow: { feedback: any, addItem: any }, Item: any, run: any } = alfredWorkflowNodejs;
    crawler = new Crawler({});


    protected async run(tag: string, query: any) {

        let that: any = this;
        let Item = this.alfredNode.Item;
        let data: any[] = await that[tag](query);

        await this.done(data);


    }

    constructor() {

    }

    async  done(data: any[]) {

        let Item = this.alfredNode.Item;
        if (data.length == 0) {
            let item1 = new Item({
                title: '暂无搜索结果，不如换个关键词试试..',
            });
            this.alfredNode.workflow.addItem(item1);

        }


        data.forEach((item, index) => {


            let item1 = new Item({
                uid: index,
                title: item.title || '',
                arg: item.url,
                subtitle: item.url,
                valid: true
            });
            this.alfredNode.workflow.addItem(item1);

        });
        this.alfredNode.workflow.feedback();


    }

    getName() {
        return this.constructor.name;
    }

}
