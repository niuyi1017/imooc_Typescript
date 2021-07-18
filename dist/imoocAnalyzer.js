"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var ImoocAnalyzer = /** @class */ (function () {
    function ImoocAnalyzer() {
    }
    ImoocAnalyzer.getInstance = function () {
        if (!ImoocAnalyzer.instance) {
            ImoocAnalyzer.instance = new ImoocAnalyzer();
        }
        return ImoocAnalyzer.instance;
    };
    ImoocAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courses = $('.new-course .show .item');
        var courseArr = [];
        courses.map(function (key, val) {
            courseArr.push(val);
        });
        var courseInfo = courseArr.map(function (item) {
            return {
                id: item.attribs["data-cid"],
                title: item.attribs['data-title']
            };
        });
        return courseInfo;
    };
    ImoocAnalyzer.prototype.analyze = function (html) {
        var courseInfo = this.getCourseInfo(html);
        return JSON.stringify(courseInfo);
    };
    return ImoocAnalyzer;
}());
exports.default = ImoocAnalyzer;
