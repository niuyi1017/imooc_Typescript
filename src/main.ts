import { mainModule } from 'process'
import {cols} from "./col"
import {Crowller} from "./crowller"
import WebAnalyzer from "./webAnalyzer"
import WebListAnalyzer from "./webListAnalyzer"





// for(let i = 0; i < cols.length; i++ ){
//   try {
//     getList(cols[i].key)
//     console.log(`${cols[i].value}已爬取完成`)
//   } catch(err){
//     console.log(err)
//   }

  
// }
let titles = []
// getList("01")

async function main(){
  let startTime = new Date().getTime()
  for(let i = 0; i < 1; i++ ){
    try {
      await getList(cols[i].key)
      console.log(`${cols[i].value}模块已爬取完成`)
    } catch(err){
      console.log(err)
    }
  }
  let endTime = new Date().getTime()
  let during = (endTime-startTime)/1000
  console.log(`总共花费${during}秒`)
}

async function getList(colcode:string) {
  // 获取列表第一页、总页数
  let url = "http://127.0.0.1:5500/list.html"
  const webListanalyzer = WebListAnalyzer.getInstance()

  

  let listFirstPageCrowller = new Crowller(url, webListanalyzer)
  let {list, totalPage} = await listFirstPageCrowller.initSpiderProcess()

  // console.log(list, totalPage)
  // 如果不只一页，则爬取所有页的列表数据
  if(totalPage > 1){
    for(let i = 2; i < totalPage; i++ ){
      console.log(`page${i}`)
      let res = await new Crowller(url, webListanalyzer).initSpiderProcess()
      // console.log("finished")
      list.push(...res.list)
    }
  }
  // console.log(list.length)

  for(let i = 0; i < list.length; i++  ){
    await getDetail("")
  }  
  // console.log(titles.length)
}

async function getDetail(url:string) {
  url = "http://127.0.0.1:5500/index.html"
  const webanalyzer = WebAnalyzer.getInstance()

  let res = await new Crowller(url, webanalyzer).initSpiderProcess()
  console.log("res.ttile:", res.title)
  titles.push(res.title)
}
main()