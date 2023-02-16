import './reacton.js'
import Header from './components/Header.htm'
import Main from './components/Main.htm'
import Home from './components/pages/Home.htm'
import Categories from './components/pages/Categories.htm'
import List from './components/pages/List.htm'
import Worker from './components/pages/Worker.htm'
import Footer from './components/Footer.htm'

const routeEvents = new Reacton.event()

Reacton.mixins = {
  routeEvents,
  getJSON(path) {
    return new Promise(done => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', path)
      xhr.responseType = 'json'
      xhr.send()
      xhr.onload = () => done(xhr.response)
    })
  }
}

Reacton.router(document, {
  '/': () => {
    Reacton.event(routeEvents, 'page-change', { detail: { page: 'r-home' } })
  },
  '/categories': () => {
    Reacton.event(routeEvents, 'page-change', { detail: { page: 'r-categories' } })
  },
  '/categories/:category/:id?': event => {
    if (event.params.id) {
      Reacton.event(routeEvents, 'page-change', {
        detail: {
          category: event.params.category,
          id: event.params.id,
          page: 'r-worker'
        }
      })
    }
    else {
      Reacton.event(routeEvents, 'page-change', {
        detail: {
          category: event.params.category,
          page: 'r-list'
        }
      })
    }
  }
}, {
  when: 'r-main'
})

Reacton([Header, Main, Home, Categories, List, Worker, Footer])