import defineComponent, { defineNames } from './modules/defineComponent'
import convertElement from './modules/convertElement'
import renderDocument from './modules/renderDocument'
import requestFile from './modules/requestFile'
import customEvent from './modules/customEvent'
import pathRouter from './modules/pathRouter'

// шаблон поиска файлов компонентов
const regFile = /\.html?$/

// массив подготовленных объектов компонентов
export const arrayComponents = []

// определить главную функцию библиотеки
const Reacton = async (...args) => {
  // обнулить массив подготовленных объектов компонентов
  arrayComponents.length = 0

  // перебрать аргументы и подготовить объекты компонентов
  for (const arg of args) {
    // если аргумент ссылается на файла компонента
    if (typeof arg === 'string' && regFile.test(arg)) {
      arrayComponents.push(...(await requestFile(arg)).map(elem => new Promise(ok => defineComponent(convertElement(elem), ok))))
    }
    // иначе, если аргумент является массивом элементов
    else if (Array.isArray(arg)) {
      const template = document.createElement('template')
      template.innerHTML = arg.join('')
      arrayComponents.push(...[...template.content.children].map(elem => new Promise(ok => defineComponent(convertElement(elem), ok))))
    }
    // иначе, если аргумент является HTML-элементом
    else if (arg instanceof HTMLElement) {
      arrayComponents.push(new Promise(ok => defineComponent(convertElement(arg), ok)))
    }
    // иначе, если аргумент является объектом
    else if (typeof arg === 'object') {
      arrayComponents.push(new Promise(ok => defineComponent(arg, ok)))
    }
  }

  // дождаться завершения промисов определённых компонентов
  await Promise.all(arrayComponents)

  // вернуть массив названий определённых компонентов
  return [...defineNames]
}

// определить для главной функции метод "render"
Reacton.render = renderDocument

// определить для главной функции метод "event"
Reacton.event = customEvent

// определить для главной функции метод "router"
Reacton.router = pathRouter

// определить глобальную переменную главной функции
window.Reacton = Reacton