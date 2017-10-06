const Crawler = require('crawler');

const crawler = new Crawler({
    maxConnections: 2
});
import {BaseApi} from './baseApi';

export function npmCallBack(query: string) {

    console.log(query);
}
export class NpmApi extends BaseApi {
    constructor() {
        super();
    }

    async run() {

    }

    async keyword({query,pageNo}: any) {


        return new Promise((resolve: any, reject: any) => {

            this.crawler.queue([{
                uri: `https://www.npmjs.com/search?q=${query}&page=1&ranking=optimal`,
                callback: function (error: any, res: any, done: any) {
                    let needData: any[] = [];
                    if (error) {
                        reject(error);
                    } else {

                        let $ = res.$;
                        let listObj = $('.package-details');

                        listObj.each(function (idx: number, ele: any) {

                            let url = ele.children[0].children[0].attribs.href;
                            let title = ele.children[0].children[0].children[0].data ? ele.children[0].children[0].children[0].data : '';

                            let arg = ele.children[2].children[1].children[0].data;

                            if (url && title && arg) {
                                needData.push({url, title, arg});
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