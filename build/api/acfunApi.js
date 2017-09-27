"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseApi_1 = require("./baseApi");
class AcfunApi extends baseApi_1.BaseApi {
    constructor() {
        super();
    }
    keyword(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.crawler.queue([{
                        'Content-Type': 'application/json; charset=UTF-8',
                        jQuery: false,
                        uri: `http://search.aixifan.com/search?q=${query}`,
                        callback: function (error, res, done) {
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
    run(tag, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            let Item = this.alfredNode.Item;
            let data = yield that[tag](query);
            yield this.done(data);
        });
    }
}
exports.AcfunApi = AcfunApi;
