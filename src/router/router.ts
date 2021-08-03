import Router from "koa-router";
import { mainProcess, syncWebinfos, getWebInfosByColcode } from "../crowller/main";
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
  })
  .get("/getWebInfosByColcode", async (ctx, next) => {
    let data = ctx.request.query.colcode 
    if(data){
      
      getWebInfosByColcode(`${data}`)
      ctx.response.body = {
        data: `正在爬取 colcode 为 ${data}  的模块的全部数据`,
      };

    }else{
      ctx.response.body = {
        data: `colcode 为 ${data},请检查colcode`,
      };
    }
    

  })

export default router;
