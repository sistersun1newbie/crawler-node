
//  ctrl+b+alt 整理代码
// const cheerio = require('cheerio')
// const $ = cheerio.load('<h2 class="title">Hello world</h2>')
// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')
// console.log($.html())

// let a = (a) => {
//   console.log(a)
// }
// 一些依赖库

let startFunction = require("./catchHtml")
let pageUrls = []
for (var i = 1; i <= 2; i++) {
  pageUrls.push('http://www.cnblogs.com/?CategoryId=808&CategoryType=%22SiteHome%22&ItemListActionName=%22PostList%22&PageIndex=' + i + '&ParentCategoryId=0');
}
startFunction(pageUrls)
