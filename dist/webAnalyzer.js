"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var moment_1 = __importDefault(require("moment"));
var WebAnalyzer = /** @class */ (function () {
    function WebAnalyzer() {
    }
    WebAnalyzer.getInstance = function () {
        if (!WebAnalyzer.instance) {
            WebAnalyzer.instance = new WebAnalyzer();
        }
        return WebAnalyzer.instance;
    };
    WebAnalyzer.prototype.getWebinfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var webInfo = {
            userId: "1083197870498279426",
            title: $(".area .readtitle").text(),
            webModelNode: ["01"],
            // ...this._parseAuthor($(".area .readinfo").text()),
            // imgs: this._parseImg($(".area .read table img")),
            // files: this._parseFile($('#file_list a')),
            content: this._parseContent(html)
        };
        // console.log(webInfo)
        return webInfo;
    };
    // 解析作者、发布时间等基础信息
    WebAnalyzer.prototype._parseAuthor = function (authorText) {
        var authorArr = authorText.split(" ");
        return {
            author: authorArr[0].split(":")[1],
            authorDept: authorArr[1].split(":")[1],
            postAt: moment_1.default(authorArr[2].split("：")[1] + " " + authorArr[3]).unix() * 1000,
            pv: authorArr[4].split("：")[1],
        };
    };
    // 解析图片
    WebAnalyzer.prototype._parseImg = function (node) {
        var nodeArr = [];
        node.map(function (key, value) {
            nodeArr.push(value);
        });
        var result = nodeArr.map(function (item) { return item.attribs.src; });
        return result;
    };
    // 解析附件
    WebAnalyzer.prototype._parseFile = function (node) {
        var nodeArr = [];
        node.map(function (key, value) {
            nodeArr.push(value);
        });
        var result = nodeArr.map(function (item) { return item.attribs.href; });
        return result;
    };
    WebAnalyzer.prototype._parseContent = function (html) {
        var _a;
        var $ = cheerio_1.default.load(html);
        var res = (((_a = $(".read").html()) === null || _a === void 0 ? void 0 : _a.split("<!--EndFragment-->")[0].toLowerCase().replace("\n", "")) + '</div>').replace("\n", "");
        return res;
    };
    WebAnalyzer.prototype.analyze = function (html) {
        var webInfo = this.getWebinfo(html);
        return webInfo;
        // return JSON.stringify(webInfo)
    };
    return WebAnalyzer;
}());
exports.default = WebAnalyzer;
