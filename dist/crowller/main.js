"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainProcess = exports.syncWebinfos = void 0;
const col_1 = require("./col");
const crowller_1 = require("./crowller");
const webAnalyzer_1 = __importDefault(require("./webAnalyzer"));
const webListAnalyzer_1 = __importDefault(require("./webListAnalyzer"));
const axios_1 = __importDefault(require("axios"));
const crowller = crowller_1.Crowller.getInstance();
const webListanalyzer = webListAnalyzer_1.default.getInstance();
const webanalyzer = webAnalyzer_1.default.getInstance();
let currentCol = {
    key: "",
    value: "",
};
let currentPage = 1;
let currentUrl = "";
let currentTitle = "";
let totalCount = 0;
let getDetailSucessCount = 0;
let postSucessCount = 0;
// main()
async function syncWebinfos(during = 1000 * 60 * 10) {
    // setInterval(async () => {
    mainProcess(true);
    // }, during)
}
exports.syncWebinfos = syncWebinfos;
async function mainProcess(isSync = false) {
    let startTime = new Date().getTime();
    for (let i = 0; i < 1; i++) {
        try {
            currentCol = col_1.cols[i];
            console.log(`===================${col_1.cols[i].value}(id=${col_1.cols[i].key})开始爬取入库 ======================`);
            let colStartTime = new Date().getTime();
            await getList(col_1.cols[i].key, isSync);
            let colEndTime = new Date().getTime();
            let colDuring = (colEndTime - colStartTime) / 1000;
            console.log(`==================${col_1.cols[i].value}(id=${col_1.cols[i].key})已爬取并入库完成, 共耗时${colDuring}s==============`);
        }
        catch (err) {
            console.error(`==================${col_1.cols[i].value}(id=${col_1.cols[i].key})爬取出错==============================`);
            console.error(err);
        }
    }
    let endTime = new Date().getTime();
    let during = (endTime - startTime) / 1000;
    console.log(`爬取${getDetailSucessCount}篇文章, 成功入库${postSucessCount}篇文章`);
    console.log(`总共花费${during}秒`);
}
exports.mainProcess = mainProcess;
async function getList(colcode, isSync = false) {
    // 获取列表第一页、总页数
    let url = "http://127.0.0.1:5500/list.html";
    // let url = `http://56.23.8.58/ggjtinfo/main2017/channel.jsp?colcode=${colcode}`;
    // let { list, totalPage } = await crowller.initSpiderProcess(
    //   url,
    //   webListanalyzer
    // );
    // 如果不是新旧网站同步模式 且 不只一页，则爬取所有页的列表数据
    // if (!isSync && totalPage > 1) {
    //   for (let i = 2; i < totalPage + 1; i++) {
    //     let res = await crowller.initSpiderProcess(url, webListanalyzer);
    //     list.push(...res.list);
    //     // console.log(`page${i}`);
    //   }
    // }
    for (let i = 0; i < 2; i++) {
        await getDetail("");
    }
    // console.log(
    //   `${currentCol.value}(id=${currentCol.key}) 共计${totalPage}页， ${list.length}篇文章`
    // );
}
async function getDetail(url) {
    // url = "http://127.0.0.1:5500/info.html";
    url = `http://56.23.8.58/ggjtinfo/main2017/read.jsp?colcode=01&id=22105`;
    // url = "http://127.0.0.1:5500/infogb2312.html";
    currentUrl = url;
    try {
        let res = await crowller.initSpiderProcess(url, webanalyzer);
        getDetailSucessCount++;
        currentTitle = res.title;
        if (currentTitle) {
            console.log(`${currentTitle}  爬取成功   url:${currentUrl}`);
        }
        await postWebinfo(res);
    }
    catch (err) {
        console.error(`url:${currentUrl} 爬取失败 , 状态码:`, err.response.status);
    }
}
async function postWebinfo(data) {
    let config = {
        headers: {
            accessToken: "123",
            refreshToken: "123",
            sibat_logid: "1627026227412",
            systemId: "1388006584858951682",
            userId: "1083197870498279426",
        },
        data: Object.assign({}, data),
    };
    try {
        const res = await axios_1.default(Object.assign({ method: "POST", 
            // url: "http://192.168.233.143:8078/jinan-system-oa/operation/importWebInfo",
            url: "http://56.18.10.20/jinan-system-oa/operation/importWebInfo" }, config));
        postSucessCount++;
        console.log(`${currentTitle}  入库成功  url:${currentUrl} `);
        console.log(res.data);
    }
    catch (err) {
        console.error(`${currentTitle}  入库失败   url:${currentUrl}`, err.response.status, err.response.statusText);
    }
}
