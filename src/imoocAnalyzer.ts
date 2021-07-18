import cheerio  from 'cheerio'
import { Analyzer } from "./crowller"

interface Course{
  id: string,
  title: string
}

export default class ImoocAnalyzer implements Analyzer {
  
  private static instance: Analyzer
  static getInstance(){
    if(!ImoocAnalyzer.instance){
      ImoocAnalyzer.instance = new ImoocAnalyzer()
    }
    return ImoocAnalyzer.instance
  }

  public getCourseInfo(html: string){
    const $ = cheerio.load(html)
    const courses = $('.new-course .show .item')
    const courseArr: any[] = []
    courses.map((key,val) => {
      courseArr.push(val)
    })
    const courseInfo:Course[] = courseArr.map(item => {
      return {
        id: item.attribs["data-cid"],
        title: item.attribs['data-title']
      }
    })
    return courseInfo
  }
  public analyze(html: string){
    const courseInfo = this.getCourseInfo(html)
    return JSON.stringify(courseInfo)
  }
  private constructor(){
    
  }
}