import {BaseApi} from './baseApi';
export class AcfunApi extends BaseApi {
    constructor() {
        super();
    }

    async keyword({query, pageNo}: any): Promise<any> {


        return new Promise((resolve: any, reject: any) => {


                this.crawler.queue([{
                    'Content-Type': 'application/json; charset=UTF-8',
                    jQuery: false,
                    uri: `http://search.aixifan.com/search?q=${query}&isArticle=1&pageNo=${pageNo}`,
                    callback: function (error: any, res: any, done: any) {

                        // console.log(res);
                        let needData: any[] = [];
                        if (error) {
                            reject(error);
                        }
                        else {


                            let obj: any = JSON.parse(res.body);
                            let list: any[] = obj.data.page.list;

                            list.forEach((item, index) => {
                                let url = `http://www.acfun.cn/v/${item.contentId}`;
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


}