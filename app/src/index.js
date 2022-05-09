// import DB from './db'
import Reacton from './reacton.mjs'
import App from './components/App.htm'
import Header from './components/Header.htm'
import Menu from './components/Menu.htm'
import Footer from './components/Footer.htm'
import Home from './components/pages/Home.htm'
import List from './components/pages/List.htm'
import User from './components/pages/User.htm'
import Workers from './components/pages/Workers.htm'

Reacton.mixins = {
  glossary: {
    managers: 'Менеджеры',
    designers: 'Дизайнеры'
  },
  collator: new Intl.Collator(),
  fetch(path) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', path)
    xhr.responseType = 'json'
    xhr.send()
    return new Promise(done => xhr.onload = () => done(xhr.response))
  },
  // DB
}

Reacton(App, Header, Menu, Footer, Home, List, User, Workers)