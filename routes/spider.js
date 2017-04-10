const express = require('express')
const router = express.Router()
const http = require('http')
const superagent = require('superagent')
const cheerio = require('cheerio')

// find user
router.get('/', (req, res) => {
  res.render('index', {title: 'mini spider'})
})

/**
 * @swagger
 * /:
 *   get:
 *     description: 爬取指定mini链接
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 返回类目图片
 */
router.get('/spider', (req, res, next) => {
  superagent
    .get(req.query.link)
    .end((err, result) => {
      if (err) return next(err)
      let $ = cheerio.load(result.text)
      let items, img , property = []

      // 处理内容
      $('.list').find('li').each((idx, element) => {
        let url = $(this).find('img').attr('src')
        // console.log(url)
        let uniqueUrl = url.substring(url.lastIndexOf('/') + 1)
        http.get(url, (res) => {
          let imgData = ''

          res.setEncoding('binary')
          res.on('data', (chunk) => {
            imgData += chunk
          })

          let Rand = Math.random()
          let save_url = config.savePath + uniqueUrl
          img.push(save_url)
          res.on('end', () => {
            fs.writeFile(save_url, imgData, 'binary', (err) => {
              if (err) return next(err)
            })
          })
        })

        items.push({
          image_id: idx,
          image_url: '/images/crawler_image/' + uniqueUrl,
          image_title: $(this).find('img').attr('title')
        })
      })

      $('.specTitle').find('tr').each((idx, element) => {
        property.push({
          pro: $(element).find('th').text(),
          value: $(element).find('td').text()
        })
      })

      title = $('.prod-info-title').find('h1').text()
      let allItems = {
        title: title.substring(0, title.indexOf('#')),
        img: items,
        property: property
      }
      res.send(allItems)
    })
})

module.exports = router
