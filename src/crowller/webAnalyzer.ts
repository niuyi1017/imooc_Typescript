import cheerio from "cheerio";
import moment from "moment";
import { Analyzer } from "./crowller";
import { cols } from "./col";

interface Course {
  id: string;
  title: string;
}

export default class WebAnalyzer implements Analyzer {
  private static instance: Analyzer;
  static getInstance() {
    if (!WebAnalyzer.instance) {
      WebAnalyzer.instance = new WebAnalyzer();
    }
    return WebAnalyzer.instance;
  }

  public getWebinfo(html: string) {
    const $ = cheerio.load(html);
    let webInfo = {
      userId: "1083197870498279426",
      title: $(".area .readtitle").text(),
      moduleId: this._parsewebModelNode($(".dqwz").text()),
      ...this._parseAuthor($(".area .readinfo").text()),
      images: this._parseImg($(".area .read table img")),
      attachments: this._parseFile($("script")[3]),
      sort: 0,
      content: this._parseContent(html),
    };
    // console.log(webInfo);
    return webInfo;
  }
  // 解析所属板块
  private _parsewebModelNode(text: string) {
    let arr = text.split(" >> ");
    let colName = arr[arr.length - 1].trim();

    let result = cols.find((item) => item.value == colName);
    return result?.key;
  }
  // 解析作者、发布时间等基础信息
  private _parseAuthor(authorText: string) {
    let authorArr = authorText.split("   ");
    return {
      releaseUser: authorArr[0].split(":")[1],
      releaseOrg: authorArr[1].split(":")[1],
      releaseTime:
        moment(`${authorArr[2].split("：")[1]}`).unix() * 1000,
      pv: Number( authorArr[3].split("：")[1].split(" ")[0])|| '0',
    };
  }
  // 解析图片
  private _parseImg(node: any) {
    let prefix = "http://56.23.8.58";
    let nodeArr: any[] = [];
    node.map((key: any, value: any) => {
      nodeArr.push(value);
    });
    let result = nodeArr.map((item) => {
      return {
        status: "success",
        name: item.attribs.src,
        size: 47540,
        percentage: 100,
        uid: 1627026170218,
        raw: { uid: 1627026170218, percent: 100 },
        url: prefix + item.attribs.src,
        response: {
          uid: 1627026170218,
          name: item.attribs.src,
          fid: "7,018f8804d7d6b9",
          fileName: item.attribs.src,
          fileUrl: prefix + item.attribs.src,
          originUrl: prefix + item.attribs.src,
          size: "47540",
        },
      };
    });
    return result;
  }
  // 解析附件
  private _parseFile(node: any) {
    let nodeArr: any[] = [];
    try{
      nodeArr = `${node.children[0].data.split("[[")[1].split("]]")[0]}`.split("],[") 
    }catch(err){
      nodeArr = []
    }
    
    let result = nodeArr.map((item) => {
      item = item.split(",")
      return {
        status: "success",
        name: item[1].split("'")[1],
        size: 47540,
        percentage: 100,
        uid: 1627026177527,
        raw: { uid: 1627026177527, percent: 100 },
        response: {
          uid: 1627026177527,
          name: item[1].split("'")[1],
          fid: "5,018f8deda94c01",
          fileUrl: "http://56.18.10.20" + item[2].split("'")[1],
          fileName:  item[1].split("'")[1],
          originUrl: "http://56.18.10.20" + item[2].split("'")[1],
          size: "47540",
        },
      };
    });
    return result;
  }
  // 解析正文
  private _parseContent(html: string) {
    const $ = cheerio.load(html);
    // let res =  ($(".read").html()?.split("<!--EndFragment-->")[0].toLowerCase().replace("\n", "") + '</div>').replace("\n", "")
    $(".read div").remove();
    $(".read table").remove();
    $("#file_list ").remove();
    let res = $(".read").html();
    return res;
  }

  public analyze(html: string) {
    const webInfo = this.getWebinfo(html);
    return webInfo;
  }
  private constructor() {}
}
