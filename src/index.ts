import Koa from "koa";
// import logger  from 'koa-logger'
import router from "./router/router";
const app = new Koa();
app.use(router.routes());

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
