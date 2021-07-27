"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
class ImoocAnalyzer {
    constructor() {
    }
    static getInstance() {
        if (!ImoocAnalyzer.instance) {
            ImoocAnalyzer.instance = new ImoocAnalyzer();
        }
        return ImoocAnalyzer.instance;
    }
    getCourseInfo(html) {
        const $ = cheerio_1.default.load(html);
        const courses = $('.new-course .show .item');
        const courseArr = [];
        courses.map((key, val) => {
            courseArr.push(val);
        });
        const courseInfo = courseArr.map(item => {
            return {
                id: item.attribs["data-cid"],
                title: item.attribs['data-title']
            };
        });
        return courseInfo;
    }
    analyze(html) {
        const courseInfo = this.getCourseInfo(html);
        return JSON.stringify(courseInfo);
    }
}
exports.default = ImoocAnalyzer;
