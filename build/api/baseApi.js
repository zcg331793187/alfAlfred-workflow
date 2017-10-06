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
const alfredWorkflowNodejs = require('alfred-workflow-nodejs');
const Crawler = require('crawler');
class BaseApi {
    constructor() {
        this.alfredNode = alfredWorkflowNodejs;
        this.crawler = new Crawler({});
    }
    run(tag, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            let Item = this.alfredNode.Item;
            let data = yield that[tag](query);
            yield this.done(data);
        });
    }
    done(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let Item = this.alfredNode.Item;
            if (data.length == 0) {
                let item1 = new Item({
                    title: '暂无搜索结果，不如换个关键词试试..',
                });
                this.alfredNode.workflow.addItem(item1);
            }
            data.forEach((item, index) => {
                let item1 = new Item({
                    uid: index,
                    title: item.title || '',
                    arg: item.url,
                    subtitle: item.url,
                    valid: true
                });
                this.alfredNode.workflow.addItem(item1);
            });
            this.alfredNode.workflow.feedback();
        });
    }
    getName() {
        return this.constructor.name;
    }
}
exports.BaseApi = BaseApi;
