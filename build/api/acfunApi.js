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
class AcfunApi extends baseApi_1.BaseApi {
    constructor() {
        super();
    }
    keyword({ query, pageNo }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.crawler.queue([{
                        'Content-Type': 'application/json; charset=UTF-8',
                        jQuery: false,
                        uri: `http://search.aixifan.com/search?q=${query}&isArticle=1&pageNo=${pageNo}`,
                        callback: function (error, res, done) {
                            // console.log(res);
                            let needData = [];
                            if (error) {
                                reject(error);
                            }
                            else {
                                let obj = JSON.parse(res.body);
                                let list = obj.data.page.list;
                                list.forEach((item, index) => {
                                    let url = `http://www.acfun.cn/v/${item.contentId}`;
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
}
exports.AcfunApi = AcfunApi;
