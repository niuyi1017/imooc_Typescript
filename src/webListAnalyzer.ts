import cheerio  from 'cheerio'
// import moment from "moment"
import { Analyzer } from "./crowller"


export default class WebListAnalyzer implements Analyzer {
  
  private static instance: Analyzer
  static getInstance(){
    if(!WebListAnalyzer.instance){
      WebListAnalyzer.instance = new WebListAnalyzer()
    }
    return WebListAnalyzer.instance
  }

  
  public getWebinfo(html: string){
   
    let webInfo = {
      userId: "1083197870498279426",
      ...this.parsePage(html),
    }
    return webInfo
  }
  public parsePage(html:string){
    const $ = cheerio.load(html)
    // 解析列表
    let list: { href: string; title: string }[] = []
    $(".channellist li a").each((index, ele) => {
      let _data = {
        href: ele.attribs.href,
        title: ele.attribs.title
      }
      list.push(_data)
    })
    // 解析总页数
    let totalPage = Number($("table strong").text().split("/")[1])

    return {
      list,
      totalPage
    }
    
    // let res
  }
  

  public analyze(html: string){
    const webInfo = this.getWebinfo(html)
    return webInfo
  }
  private constructor(){
    
  }
}