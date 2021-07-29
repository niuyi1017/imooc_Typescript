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
      // console.log(iconv.encodingExists("utf8"));
      let str = iconv.decode(Buffer.from(response.data), "gb2312");
      let html = iconv.encode(str, "utf8").toString();

      // console.log(str);
      // console.log(html);
      return html;
    } catch (err) {
      console.log(err);
      console.log("获取html失败", url);
      return "false";
    }

    // const response =  {data: "false"}
  }
  async postNewWebInfo(data: any) {
    let config = {
      headers: {
        accessToken: "123",
        refreshToken: "123",
        sibat_logid: "1627026227412",
        systemId: "1388006584858951682",
        userId: "1083197870498279426",
      },
      data: { ...data },
    };
    try {
      const res = await axios({
        method: "POST",
        url: "http://192.168.233.143:8078/jinan-system-oa/operation/importWebInfo",
        ...config,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
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
        err.response.status,
        err.response.statusText
      );
      // throw new Error(err)
      return false;
    }
  }
  constructor() {}
}
