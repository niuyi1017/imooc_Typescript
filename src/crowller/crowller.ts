import axios from "axios"


export interface Analyzer{
  analyze: (html: string) => any
}

export class Crowller {
  private static instance: any

  static getInstance(){
    if(!Crowller.instance){
      Crowller.instance = new Crowller()
    }
    return Crowller.instance
  }
  
  async getRawHtml(url:string){
    const response =  await axios.get(url)
    // const response =  {data: "false"}
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
    
  }

  async initSpiderProcess(url:string, analyzer: Analyzer){
    try {
      const html = await this.getRawHtml(url)
      const webInfo  = analyzer.analyze(html)
      return webInfo
    }catch(err){
      console.error(`${url} 爬取出错`, err.response.status, err.response.statusText)
      // throw new Error(err)
      return false;
    }
   
  }
  constructor( ){
  }
}

