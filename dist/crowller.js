"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crowller = void 0;
const axios_1 = __importDefault(require("axios"));
class Crowller {
    constructor() {
    }
    static getInstance() {
        if (!Crowller.instance) {
            Crowller.instance = new Crowller();
        }
        return Crowller.instance;
    }
    async getRawHtml(url) {
        const response = await axios_1.default.get(url);
        // const response =  {data: "false"}
        return response.data;
    }
    async postNewWebInfo(data) {
        let config = {
            headers: {
                "accessToken": "123",
                "refreshToken": "123",
                "sibat_logid": "1627026227412",
                "systemId": "1388006584858951682",
                "userId": "1083197870498279426",
            },
            data: Object.assign({}, data),
        };
        try {
            const res = await axios_1.default(Object.assign({ method: "POST", url: "http://192.168.233.143:8078/jinan-system-oa/operation/importWebInfo" }, config));
            console.log(res.data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    }
    async initSpiderProcess(url, analyzer) {
        try {
            const html = await this.getRawHtml(url);
            const webInfo = analyzer.analyze(html);
            return webInfo;
        }
        catch (err) {
            console.error(`${url} 爬取出错`, err.response.status, err.response.statusText);
            // throw new Error(err)
            return false;
        }
    }
}
exports.Crowller = Crowller;
