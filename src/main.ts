import {cols} from "./col"
import {Crowller} from "./crowller"
import WebAnalyzer from "./webAnalyzer"
import WebListAnalyzer from "./webListAnalyzer"

import axios from "axios"



const crowller = Crowller.getInstance()
const webListanalyzer = WebListAnalyzer.getInstance()
const webanalyzer = WebAnalyzer.getInstance()

let currentCol = {
  key: "",
  value: ""
}
let currentPage = 1
let currentUrl = ""
let currentTitle = ""
let totalCount = 0
let getDetailSucessCount = 0
let postSucessCount = 0

main()

async function main(){
  let startTime = new Date().getTime()
  for(let i = 0; i < 1; i++ ){
    try {
      currentCol = cols[i]
      console.log(`===================${cols[i].value}(id=${cols[i].key})开始爬取入库 ======================`)
      let colStartTime = new Date().getTime()
      await getList(cols[i].key)
      let colEndTime = new Date().getTime()
      let colDuring = (colEndTime-colStartTime)/1000
      console.log(`==================${cols[i].value}(id=${cols[i].key})已爬取并入库完成, 共耗时${colDuring}s==============`)
    } catch(err){
      console.error(`==================${cols[i].value}(id=${cols[i].key})爬取出错==============================`)
      console.error(err)
    }
  }
  let endTime = new Date().getTime()
  let during = (endTime-startTime)/1000
  console.log(`爬取${getDetailSucessCount}篇文章, 成功入库${postSucessCount}篇文章`)
  console.log(`总共花费${during}秒`)
}

async function getList(colcode:string) {
  // 获取列表第一页、总页数
  let url = "http://127.0.0.1:5500/list.html"
  let {list, totalPage} = await crowller.initSpiderProcess(url, webListanalyzer)

  // 如果不只一页，则爬取所有页的列表数据
  if(totalPage > 1){
    for(let i = 2; i < totalPage+1; i++ ){
     
      let res = await crowller.initSpiderProcess(url, webListanalyzer)
      list.push(...res.list)
      // console.log(`page${i}`)
    }
  }

  for(let i = 0; i < 3; i++  ){
    await getDetail("")
  }  
  console.log(`${currentCol.value}(id=${currentCol.key}) 共计${totalPage}页， ${list.length}篇文章`)
}

async function getDetail(url:string) {
  url = "http://127.0.0.1:5500/info.html"
  currentUrl = url
  try{
    let res = await crowller.initSpiderProcess(url, webanalyzer)
    getDetailSucessCount ++
    currentTitle = res.title
    if(currentTitle){
      console.log(`${currentTitle}  爬取成功   url:${currentUrl}`)
    }
    await postWebinfo(res)
  }catch(err){
    console.error(`url:${currentUrl} 爬取失败 , 状态码:`,err.response.status)
  }
  
  
}
async function postWebinfo(data:any) {
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
    postSucessCount ++
    console.log(`${currentTitle}  入库成功  url:${currentUrl} `)
    console.log(res.data)
    
  }catch (err) {
    console.error(`${currentTitle}  入库失败   url:${currentUrl}`, err.response.status, err.response.statusText )
  }    
  
}


