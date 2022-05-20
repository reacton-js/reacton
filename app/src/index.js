// импортировать библиотеку Reacton
import Reacton from './reacton.mjs'

// импортировать компоненты приложения
import App from './components/App.htm'
import Header from './components/Header.htm'
import Menu from './components/Menu.htm'
import Footer from './components/Footer.htm'
import Home from './components/pages/Home.htm'
import List from './components/pages/List.htm'
import User from './components/pages/User.htm'
import Workers from './components/pages/Workers.htm'

// определить примеси для всех компонентов
Reacton.mixins = {
  // глоссарий для сегментов пути запроса
  glossary: {
    managers: 'Менеджеры',
    designers: 'Дизайнеры'
  },
  // коллатор для интернационализации строк
  collator: new Intl.Collator(),
  // метод для запроса к базе данных
  fetch(path) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', path)
    xhr.responseType = 'json'
    xhr.send()
    return new Promise(done => xhr.onload = () => done(xhr.response))
  },
  // динамически импортировать базу данных
  // DB: import('./db')
}

// передать компоненты в библиотеку Reacton
Reacton(App, Header, Menu, Footer, Home, List, User, Workers)