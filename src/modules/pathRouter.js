
import { whenData } from './defineComponent'
import customEvent from './customEvent'

// вызывает обработчик события для маршрута
function dispatchPaht (frag, paths) {
  // определить полный адрес маршрута без значения "origin"
  const fullPath = location.href.replace(location.origin, '')

  // перебрать объект путей маршрутизатора
  Object.keys(paths).forEach(key => {
    // сохранить результат проверки совпадения свойства и адреса маршрута
    const result = paths[key].exec(fullPath)

    // если имеется совпадение
    if (result) {
      // определить новое пользовательское событие
      const event = new CustomEvent(key)

      // добавить событию свойство "url" из класса URL
      event.url = new URL(location.href)

      // добавить событию свойство содержащее параметры
      event.params = result.groups
      
      // вызывать событие маршрута для фрагмента
      frag.dispatchEvent(event)
    }
  })
}

// шаблон поиска параметров в путях маршрутов
const regPars = /:(\w+)/g

// шаблон поиска файлов в путях маршрутов
const regFile = /\.\w+$/


export default async function (elem, events, props = {}) {
  // определить переменные из объекта свойств маршрутизатора
  const { once, capture, passive, when, start = true } = props

  // определить фрагмент для работы с событиями маршрутов
  const frag = new customEvent()

  // определить объект путей маршрутизатора
  const paths = {}

  // перебрать свойства из объекта обработчиков
  for (const key in events) {
    // добавить фрагменту обработчик маршрута
    frag.addEventListener(key, events[key])
    
    // добавить объекту регулярное выражение для маршрута
    paths[key] = new RegExp(`^${key.replace(regPars, (_, par) => `(?<${par}>\\w+)`)}/?$`)
  }

  // добавить элементу window обработчик события "popstate"
  window.addEventListener('popstate', () => {
    dispatchPaht(frag, paths) // вызвать функцию "dispatchPaht"
  })
  
  // добавить элементу обработчик события "click"
  elem.addEventListener('click', event => {
    // получить целевой элемент на котором произошло событие
    const target = event.composedPath()[0]

    // получить атрибут "href" целевого элемента
    const href = target.getAttribute('href')

    // если атрибут "href" отсутствует или маршрут указывает на другой сайт или внешний файл
    if (!href || target.origin !== location.origin || regFile.test(href)) {
      return // выйти из обработчика
    }

    // приостановить действие обработчика по умолчанию
    event.preventDefault()

    // добавить в историю браузера текущий маршрут
    history.pushState(null, '', href)

    dispatchPaht(frag, paths) // вызвать функцию "dispatchPaht"

  }, { once, capture, passive })

  // если параметр "when" содержит значение
  if (when) {
    // дождаться разрешения промиса готовности данных компонента
    await whenData(when)
  }

  // если параметр "start" является Истиной
  if (start) {
    dispatchPaht(frag, paths) // вызвать функцию "dispatchPaht"
  }
}