import Router from "koa-router";
import { mainProcess, syncWebinfos } from "../crowller/main";
const router = new Router();

router
  .get("/allWebinfos", async (ctx, next) => {
    let data = "";
    try {
      data = "开始爬取所有文章";
      mainProcess();
      await next();
    } catch (error) {
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
      syncWebinfos();
      await next();
    } catch (error) {
      data = "err";
    }
    ctx.response.body = {
      data,
    };
  });

export default router;
