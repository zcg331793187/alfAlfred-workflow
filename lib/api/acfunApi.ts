import {BaseApi} from './baseApi';
export class BilibiliApi extends BaseApi {
    constructor() {
        super();
    }

    async top(query: string): Promise<any> {


        return new Promise((resolve: any, reject: any) => {


                this.crawler.queue([{
                    'Content-Type': 'application/json; charset=UTF-8',
                    jQuery: false,
                    uri: `https://www.bilibili.com/index/rank/all-3-0.json`,
                    callback: function (error: any, res: any, done: any) {

                        let needData: any[] = [];
                        if (error) {
                            reject(error);
                        }
                        else {

                            let obj: any = JSON.parse(res.body);
                            let list: any[] = obj.rank.list;

                            list.forEach((item, index) => {
                                let url = `https://www.bilibili.com/video/av${item.aid}`;
                                let title = `${item.title}`;
                                if (url && title) {
                                    needData.push({url, title});
                                }


                            });

                        }
                        done();
                        resolve(needData)
                    }
                }]);

            }
        );


    }

    async keyword(query: string): Promise<any> {


        return new Promise((resolve: any, reject: any) => {


                this.crawler.queue([{
                    // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
                    // referer: 'https://search.bilibili.com/',
                    uri: `https://search.bilibili.com/all?keyword=${encodeURI(query)}`,
                    callback: function (error: any, res: any, done: any) {

                        let needData: any[] = [];
                        if (error) {
                            reject(error);
                        }
                        else {
                            let $ = res.$;
                            let listObj = $('.video .info a');

                            // console.log(listObj);
                            // let list = listObj.children;
                            listObj.each(function (idx: number, ele: any) {
                                let url = ele.attribs.href.replace(/(^\/\/*)/, 'https://');
                                let title = ele.attribs.title;
                                if (url && title) {
                                    needData.push({url, title});
                                }
                            });

                        }
                        done();
                        resolve(needData)
                    }
                }]);

            }
        );


    }

    async run(tag: string, query: string) {

        let that: any = this;
        let Item = this.alfredNode.Item;
        let data: any[] = await that[tag](query);

        await this.done(data);


    }


}