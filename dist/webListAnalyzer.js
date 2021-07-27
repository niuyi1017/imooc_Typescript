"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
class WebListAnalyzer {
    constructor() {
    }
    static getInstance() {
        if (!WebListAnalyzer.instance) {
            WebListAnalyzer.instance = new WebListAnalyzer();
        }
        return WebListAnalyzer.instance;
    }
    getWebinfo(html) {
        let webInfo = Object.assign({ userId: "1083197870498279426" }, this.parsePage(html));
        return webInfo;
    }
    parsePage(html) {
        const $ = cheerio_1.default.load(html);
        // 解析列表
        let list = [];
        $(".channellist li a").each((index, ele) => {
            let _data = {
                href: ele.attribs.href,
                title: ele.attribs.title
            };
            list.push(_data);
        });
        // 解析总页数
        let totalPage = Number($("table strong").text().split("/")[1]);
        return {
            list,
            totalPage
        };
        // let res
    }
    analyze(html) {
        const webInfo = this.getWebinfo(html);
        return webInfo;
    }
}
exports.default = WebListAnalyzer;
