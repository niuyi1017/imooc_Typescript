import cheerio  from 'cheerio'
import moment from "moment"
import { Analyzer } from "./crowller"

interface Course{
  id: string,
  title: string
}


export default class WebAnalyzer implements Analyzer {
  
  private static instance: Analyzer
  static getInstance(){
    if(!WebAnalyzer.instance){
      WebAnalyzer.instance = new WebAnalyzer()
    }
    return WebAnalyzer.instance
  }

  
  public getWebinfo(html: string){
    const $ = cheerio.load(html)
    let webInfo = {
      userId: "1083197870498279426",
      title: $(".area .readtitle").text(),
      webModelNode: ["01"],
      // ...this._parseAuthor($(".area .readinfo").text()),
      // imgs: this._parseImg($(".area .read table img")),
      // files: this._parseFile($('#file_list a')),
      content: this._parseContent(html)
    }
    // console.log(webInfo)
    return webInfo
  }
  // 解析作者、发布时间等基础信息
  private _parseAuthor(authorText: string){
    let authorArr = authorText.split(" ")

    return {
      author: authorArr[0].split(":")[1],
      authorDept: authorArr[1].split(":")[1],
      postAt: moment( `${authorArr[2].split("：")[1]} ${authorArr[3]}`).unix() * 1000,
      pv: authorArr[4].split("：")[1] ,

    }
  }
  // 解析图片
  private _parseImg(node: any){
    let nodeArr:any[] = []
    node.map((key: any ,value: any) => {
      nodeArr.push(value)
    })
    let result = nodeArr.map(item =>  item.attribs.src)
    return result
  }
  // 解析附件
  private _parseFile(node: any){
    let nodeArr:any[] = []
    node.map((key: any ,value: any) => {
      nodeArr.push(value)
    })
    let result = nodeArr.map(item =>  item.attribs.href)
    return result
  }
  private _parseContent(html:string){
    const $ = cheerio.load(html)
    let res =  ($(".read").html()?.split("<!--EndFragment-->")[0].toLowerCase().replace("\n", "") + '</div>').replace("\n", "")
    return res

  }

  public analyze(html: string){
    const webInfo = this.getWebinfo(html)
    return webInfo
    // return JSON.stringify(webInfo)
  }
  private constructor(){
    
  }
}