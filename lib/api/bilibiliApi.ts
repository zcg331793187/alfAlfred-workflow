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
                    uri: `https://search.bilibili.com/all?keyword=${query}`,
                    callback: function (error: any, res: any, done: any) {

                        let needData: any[] = [];
                        if (error) {
                            reject(error);
                        }
                        else {
                            let $ = res.$;
                            let listObj = $('.video .info a');
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





}