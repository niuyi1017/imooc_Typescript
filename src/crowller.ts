import axios from "axios"

import WebAnalyzer from "./webAnalyzer"

export interface Analyzer{
  analyze: (html: string) => any
}

class Crowller {
  
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
        url: "http://192.168.233.143/jinan-system-oa/web/addOrUpdateWebInfo",
        ...config

     })
     
    }catch (err) {
      console.log(err.response.data)
    }    
    
    // return res
  }

  async initSpiderProcess(){
    const html = await this.getRawHtml()
    const webInfo  = this.analyzer.analyze(html)
    const res =  await this.postNewWebInfo(webInfo)
    // console.log("res")
    // console.log(res)
  }
  constructor(private url: string, private analyzer: Analyzer){
    this.initSpiderProcess()
  }
}

const url  = "http://127.0.0.1:5500/info.html"
const analyzer = WebAnalyzer.getInstance()

const crowller = new Crowller(url, analyzer)
