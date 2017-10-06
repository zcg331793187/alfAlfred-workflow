"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Crawler = require('crawler');
const crawler = new Crawler({
    maxConnections: 2
});
const baseApi_1 = require("./baseApi");
function npmCallBack(query) {
    console.log(query);
}
exports.npmCallBack = npmCallBack;
class NpmApi extends baseApi_1.BaseApi {
    constructor() {
        super();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    keyword({ query, pageNo }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.crawler.queue([{
                        uri: `https://www.npmjs.com/search?q=${query}&page=1&ranking=optimal`,
                        callback: function (error, res, done) {
                            let needData = [];
                            if (error) {
                                reject(error);
                            }
                            else {
                                let $ = res.$;
                                let listObj = $('.package-details');
                                listObj.each(function (idx, ele) {
                                    let url = ele.children[0].children[0].attribs.href;
                                    let title = ele.children[0].children[0].children[0].data ? ele.children[0].children[0].children[0].data : '';
                                    let arg = ele.children[2].children[1].children[0].data;
                                    if (url && title && arg) {
                                        needData.push({ url, title, arg });
                                    }
                                });
                            }
                            done();
                            resolve(needData);
                        }
                    }]);
            });
        });
    }
}
exports.NpmApi = NpmApi;
