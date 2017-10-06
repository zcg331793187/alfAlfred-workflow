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
const baseApi_1 = require("./baseApi");
class BilibiliApi extends baseApi_1.BaseApi {
    constructor() {
        super();
    }
    top(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.crawler.queue([{
                        'Content-Type': 'application/json; charset=UTF-8',
                        jQuery: false,
                        uri: `https://www.bilibili.com/index/rank/all-3-0.json`,
                        callback: function (error, res, done) {
                            let needData = [];
                            if (error) {
                                reject(error);
                            }
                            else {
                                let obj = JSON.parse(res.body);
                                let list = obj.rank.list;
                                list.forEach((item, index) => {
                                    let url = `https://www.bilibili.com/video/av${item.aid}`;
                                    let title = `${item.title}`;
                                    if (url && title) {
                                        needData.push({ url, title });
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
    keyword({ query, pageNo }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.crawler.queue([{
                        uri: `https://search.bilibili.com/all?keyword=${query}`,
                        callback: function (error, res, done) {
                            let needData = [];
                            if (error) {
                                reject(error);
                            }
                            else {
                                let $ = res.$;
                                let listObj = $('.video .info a');
                                listObj.each(function (idx, ele) {
                                    let url = ele.attribs.href.replace(/(^\/\/*)/, 'https://');
                                    let title = ele.attribs.title;
                                    if (url && title) {
                                        needData.push({ url, title });
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
exports.BilibiliApi = BilibiliApi;
