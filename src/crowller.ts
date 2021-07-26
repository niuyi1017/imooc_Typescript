import axios from "axios"
// import WebAnalyzer from "./webAnalyzer"
import WebListAnalyzer from "./webListAnalyzer"

export interface Analyzer{
  analyze: (html: string) => any
}

export class Crowller {
  public webInfo:any

  async getRawHtml(){
    const response =  await axios.get(this.url)
    return response.data
  }
  async postNewWebInfo(data:any){
    let config = {
      headers: {
        "accessToken": "123",
        "refreshToken": "123",
        "sibat_logid": "1627026227412",
        "systemId": "1388006584858951682",
        "userId": "1083197870498279426",
      },
      data:{...data},
    }
    try{
      const res = await axios({
        method: "POST",
        url: "http://192.168.233.143:8078/jinan-system-oa/operation/importWebInfo",
        ...config

     })
     console.log(res.data)
     
    }catch (err) {
      console.log(err.response.data)
    }    
    
    // return res
  }

  async initSpiderProcess(){
    const html = await this.getRawHtml()
    const webInfo  = this.analyzer.analyze(html)
    this.webInfo =  webInfo
    return webInfo
    
    
  }
  constructor(private url: string, private analyzer: Analyzer){
    // this.initSpiderProcess()
  }
}

// const url  = "http://127.0.0.1:5500/list.html"
// const analyzer = WebListAnalyzer.getInstance()

// const crowller = new Crowller(url, analyzer)
