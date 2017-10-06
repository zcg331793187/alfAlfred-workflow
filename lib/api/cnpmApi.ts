import {BaseApi} from './baseApi';
export class CnpmApi extends BaseApi {
    constructor() {
        super();
    }

    async keyword({query,pageNo}: any) {


        return new Promise((resolve: any, reject: any) => {

            this.crawler.queue([{
                uri: `http://www.runoob.com/?s=${query}`,
                callback: function (error: any, res: any, done: any) {
                    let needData: any[] = [];
                    if (error) {
                        reject(error);
                    }
                    else {
                        let $ = res.$;
                        let listObj = $('.archive-list-item a');

                        // console.log(listObj);
                        // let list = listObj.children;
                        listObj.each(function (idx: number, ele: any) {
                            let url = ele.attribs.href;
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

        });


    }


}