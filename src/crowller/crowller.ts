import axios from "axios";
import iconv from "iconv-lite";

export interface Analyzer {
  analyze: (html: string) => any;
}

export class Crowller {
  private static instance: any;

  static getInstance() {
    if (!Crowller.instance) {
      Crowller.instance = new Crowller();
    }
    return Crowller.instance;
  }

  async getRawHtml(url: string) {
    try {
      // const response = await axios.get(url);
      const response = await axios({
        method: "GET",
        responseType: "arraybuffer",
        url,
      });
      let str = iconv.decode(Buffer.from(response.data), "gb2312");
      let html = iconv.encode(str, "utf8").toString();
      return html;
    } catch (err) {
      console.log(err);
      console.log("获取html失败", url);
      return "false";
    }
  }
  

  async initSpiderProcess(url: string, analyzer: Analyzer) {
    try {
      const html = await this.getRawHtml(url);
      const webInfo = analyzer.analyze(html);
      return webInfo;
    } catch (err) {
      console.error(
        `${url} 爬取出错`,
        err.response.status||"",
        err.response.statusText||""
      );
      return false;
    }
  }
  constructor() {}
}
