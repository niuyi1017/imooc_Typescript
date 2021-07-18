import axios from "axios"
import ImoocAnalyzer from "./imoocAnalyzer"

export interface Analyzer{
  analyze: (html: string) => string
}

class Crowller {
  
  async getRawHtml(){
    const response =  await axios.get(this.url)
    return response.data
  }

  async initSpiderProcess(){
    const html = await this.getRawHtml()
    const courseInfo  = this.analyzer.analyze(html)
    console.log(courseInfo)
  }
  constructor(private url: string, private analyzer: Analyzer){
    this.initSpiderProcess()
  }
}

const url  = "https://www.imooc.com/"
const analyzer = ImoocAnalyzer.getInstance()

const crowller = new Crowller(url, analyzer)
