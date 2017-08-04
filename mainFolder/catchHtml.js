let http = require("http"),
  url = require("url"),
  superagent = require("superagent"),
  cheerio = require("cheerio"),
  async = require("async"),
  eventproxy = require('eventproxy')
  var ep = new eventproxy(),
  urlsArray = [], //  存放爬取网址
  pageUrls = [], // 存放收集文章页面网站
  pageNum = 200 // 要爬取文章的页数
// 主start程序
module.exports =function start (pageUrlList) {
  pageUrlList.forEach(function(pageUrl) {
    superagent.get(pageUrl)
      .end(function(err, pres) {
        if (err) {
          console.log(err)
          throw err
        }
        // pres.text 里面存储着请求返回的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是利用$ 使用 jquery 的语法了
        let $ = cheerio.load(pres.text)
        let curPageUrls = $('.titlelnk')
        for (let i = 0; i < curPageUrls.length; i++) {
          let articleUrl = curPageUrls.eq(i).attr('href')
          console.log(articleUrl)
          urlsArray.push(articleUrl);
          // 相当于一个计数器
          ep.emit('BlogArticleHtml', articleUrl);
        }
      })
  })

  ep.after('BlogArticleHtml', pageUrlList.length*20 ,function(articleUrls){
  // 当所有 'BlogArticleHtml' 事件完成后的回调触发下面事件
  // ...
  console.log("====  ",articleUrls)
  });


}
