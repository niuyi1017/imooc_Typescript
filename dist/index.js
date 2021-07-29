"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
// import logger  from 'koa-logger'
const router_1 = __importDefault(require("./router/router"));
const app = new koa_1.default();
app.use(router_1.default.routes());
app.listen(3000, () => {
    console.log("server is running at http://localhost:3000");
});
