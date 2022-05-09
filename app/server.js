const express = require("express")
const hbs = require("hbs")
const { readFile } = require('fs/promises')
const { JSDOM } = require("jsdom")
const port = process.env.PORT || 3000

const Datastore = require('nedb')
const db = new Datastore({ filename : 'nedb/users', autoload: true })

const app = express()
app.use(express.static(__dirname + "/public"))

app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")

const bots = [
  'yandex', 'google', 'bot', 'Accoona', 'ia_archiver', 'Ask Jeeves', 'W3C_Validator', 'WebAlta', 'YahooFeedSeeker',
  'Yahoo!', 'Ezooms', 'SiteStatus', 'Nigma.ru', 'Baiduspider', 'SISTRIX', 'findlinks', 'proximic', 'OpenindexSpider',
  'statdom.ru', 'Spider', 'Snoopy', 'heritrix', 'Yeti', 'DomainVader', 'StackRambler'
]

const regBots = new RegExp(bots.join('|'), 'i')

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.post('/workers/:category', (req, res) => {
  const category = req.params.category
  db.find({ category }, (err, docs) => res.send(docs))
})

app.post('/workers/\\w+/:id', (req, res) => {
  const id = +req.params.id
  db.findOne({ id }, (err, doc) => res.send(doc))
})

app.use(async (req, res) => {
  // const userAgent = 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)'
  // const userAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
  const userAgent = req.get('User-Agent')
  
  if (regBots.test(userAgent)) {
    const fullURL = req.protocol + "://" + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

    const body = await readFile(__dirname + '/views/partials/body.hbs').then(async data => {
      const dom = new JSDOM(data.toString(), {
        url: fullURL,
        runScripts: "dangerously",
        resources: "usable"
      })
      
      return await new Promise(done => {
        dom.window.onload = () => {
          dom.window.Reacton.render(dom.window.document.body).then(done)
        }
      })
    })

    res.render("main.hbs", { body })
  }
  else {
    res.render("main.hbs")
  }
})

app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))