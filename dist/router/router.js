"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const main_1 = require("../crowller/main");
const router = new koa_router_1.default();
router
    .get("/allWebinfos", async (ctx, next) => {
    let data = "";
    try {
        data = "开始爬取所有文章";
        main_1.mainProcess();
        await next();
    }
    catch (error) {
        data = "err";
    }
    ctx.response.body = {
        data,
    };
})
    .get("/startSyncWebinfos", async (ctx, next) => {
    let data = "";
    try {
        data = "开始同步文章，同步间隔10min";
        main_1.syncWebinfos();
        await next();
    }
    catch (error) {
        data = "err";
    }
    ctx.response.body = {
        data,
    };
});
exports.default = router;
