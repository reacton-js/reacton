const express = require("express")
const hbs = require("hbs")
const { readFile } = require('fs/promises')
const { JSDOM } = require("jsdom")
const DB = require('./DB.json')
const port = process.env.PORT || 3000

const app = express()
app.use(express.static(__dirname + "/public"))

app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")

/* строка агента бота для тестирования
  bot agent string to test */
const botAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

/* список ботов
  bot list */
const botList = [
  'yandex', 'google', 'bot', 'Accoona', 'ia_archiver', 'Ask Jeeves', 'W3C_Validator', 'WebAlta', 'YahooFeedSeeker',
  'Yahoo!', 'Ezooms', 'SiteStatus', 'Nigma.ru', 'Baiduspider', 'SISTRIX', 'findlinks', 'proximic', 'OpenindexSpider',
  'statdom.ru', 'Spider', 'Snoopy', 'heritrix', 'Yeti', 'DomainVader', 'StackRambler'
]

/* поиск ботов в строке
  search for bots in a string */
const regBots = new RegExp('(\\b' + botList.join('\\b)|(\\b') + '\\b)' , 'i')

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

/* вернуть категорию работников из базы данных
  return the category of workers from the database */
app.post('/categories/:category', (req, res) => {
  const category = DB.filter(item => item.category == req.params.category)
  res.send(category)
})

/* вернуть id работника из базы данных
  return employee id from database */
app.post('/categories/\\w+/:id', (req, res) => {
  const user = DB.find(item => item.id == req.params.id)
  res.send(user)
})

app.use(async (req, res) => {
  /* получить строку агента
    get agent string */
  const userAgent = (process.argv[2] == 'bot') ? botAgent : req.get('User-Agent')
  
  /* если запрос идёт от поискового бота
    if the request comes from a search bot */
  if (regBots.test(userAgent)) {
    /* получить полный адрес запроса
      get full request address */
    const fullURL = req.protocol + "://" + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

    const HTML = await readFile(__dirname + '/views/partials/Body.hbs')
      .then(async data => {
        /* определить новый JSDOM с параметрами
          define a new JSDOM with parameters */
        const dom = new JSDOM(data.toString(), {
          url: fullURL,
          runScripts: "dangerously",
          resources: "usable"
        })
        
        /* вернуть отрендеренное HTML-содержимое элемента BODY
          return the rendered HTML content of the BODY element */
        return await new Promise(done => {
          dom.window.onload = () => dom.window.Reacton.render(dom.window.document.body).then(done)
        })
      })

    /* передать свойство HTML в представление Main
      pass HTML property to Main view */
    res.render("Main.hbs", { HTML })
  }

  /* иначе, если запрос идёт от пользователя
    otherwise, if the request comes from the user */
  else {
    /* вернуть частичное представление Body из представления Main
      return partial view of Body from view of Main */
    res.render("Main.hbs")
  }
})

app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))