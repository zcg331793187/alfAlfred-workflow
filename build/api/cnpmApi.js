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
class CnpmApi extends baseApi_1.BaseApi {
    constructor() {
        super();
    }
    keyword({ query, pageNo }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.crawler.queue([{
                        uri: `http://www.runoob.com/?s=${query}`,
                        callback: function (error, res, done) {
                            let needData = [];
                            if (error) {
                                reject(error);
                            }
                            else {
                                let $ = res.$;
                                let listObj = $('.archive-list-item a');
                                // console.log(listObj);
                                // let list = listObj.children;
                                listObj.each(function (idx, ele) {
                                    let url = ele.attribs.href;
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
exports.CnpmApi = CnpmApi;
