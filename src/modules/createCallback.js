import { SERVICE } from './defineComponent'
import { symReact } from './clearContent'
import handlerCallback from './handlerCallback'
import updateCycle from './updateCycle'
import addCallback from './addCallback'

// шаблон поиска кавычек в выражении цикла
const regQuote = /('|"|`)[^]*?\1/g

// шаблон поиска левой части в выражении цикла
const regLeft = /;|\b(?:of|in)\b/

// шаблон поиска переменных в выражении цикла
const regVars = /\b[A-Za-z_]\w*?\b/g

// возвращает строку с названиями переменных цикла компонента
const getVars = str => str.replace(regQuote, '').split(regLeft)[0].match(regVars).join() 

// возвращает строковое представление цикла компонента
const getCycle = val => `(function*() {
  arguments[0] = yield function*() {
    while (true) {
      arguments[0] = yield eval(arguments[0])
    }
  }
  while (true) {
    yield; for (var ${val}) arguments[0].next()
  }
})()`


export default function (node, temp, vars) {
  // если узел является элементом монтирования
  if (temp[symReact] === 'is') {
    // получить атрибут монтирования элемента
    var attr = node.attributes['is']

    // определить обратный вызов для атрибута
    var cb = SERVICE.get(this).exec.next(`() => ${temp.attributes['is'].value}`).value

    // сохранить в свойстве тип обратного вызова
    cb.type = temp[symReact]

    // определить контейнер для создания элемента монтирования
    cb.mount = document.createElement('template')

    // если узел содержит дочерние узлы
    if (temp.childNodes.length) {
      // вызвать для дочерних узлов функцию добавления обратного вызова
      for (var i = 0; i < temp.childNodes.length; i++) {
        addCallback.call(this, node.childNodes[i], temp.childNodes[i], vars)
      }

      // сохранить в свойстве массив с дочерними узлами
      cb.childs = [...node.childNodes]
    }

    // сохранить обратный вызов в хранилище
    SERVICE.get(this).callbacks.set(attr, cb)
  }

  // иначе, если узел является элементом цикла
  else if (temp.nodeType === 1) {
    // определить итератор цикла компонента
    const cb = SERVICE.get(this).exec.next(`() => ${getCycle(temp[symReact])}`).value()
    
    // определить генератор исполняющей функции
    const generator = cb.next().value

    // определить итератор исполняющей функции
    const iterator = generator.call(this.$data)

    // перейти к бесконечному циклу итератора
    iterator.next()

    // определить переменные из выражения цикла
    const _vars = (vars ? `${vars},` : '') + getVars(temp[symReact])

    // сохранить текущую исполняющую функцию
    const execute = SERVICE.get(this).exec

    // определить новую исполняющую функцию
    SERVICE.get(this).exec = iterator

    // вызвать для дочерних узлов функцию добавления обратного вызова
    for (var i = 0; i < temp.childNodes.length; i++) {
      addCallback.call(this, node.childNodes[i], temp.childNodes[i], _vars)
    }

    // восстановить текущую исполняющую функцию
    SERVICE.get(this).exec = execute

    // определить фрагмент для хранения содержимого цикла
    const fragment = new DocumentFragment()
    
    // перенести содержимое элемента цикла в фрагмент
    while (node.firstChild) {
      fragment.append(node.firstChild)
    }

    // определить вызываемый в цикле итератор обновлений
    cb.next(updateCycle.call(this, fragment))
    
    // сохранить в свойстве тип обратного вызова
    cb.type = 'for'

    // определить свойство доступа к индексу фрагмента
    Object.defineProperty(cb, 'index', {
      get: () => fragment.index,
      set: newVal => fragment.index = newVal
    })

    // определить свойство доступа к элементу цикла
    Object.defineProperty(cb, 'node', {
      set: newVal => fragment.node = newVal
    })

    // сохранить объект с итераторами в хранилище
    SERVICE.get(this).callbacks.set(node, cb)
  }

  // иначе,
  else {
    // определить обратный вызов для узла компонента
    var cb = temp[symReact] !== 'on' ? SERVICE.get(this).exec.next(`() => ${temp.nodeValue}`).value
      : SERVICE.get(this).exec.next(vars ? `() => ((${vars}) => event => ${temp.nodeValue})(${vars})` : `() => event => ${temp.nodeValue}`).value

    // сохранить в свойстве тип обратного вызова
    cb.type = temp[symReact]

    // если узел является булевым атрибутом
    if (temp[symReact] === 'boolean') {
      // сохранить владельца атрибута в свойстве обратного вызова
      cb.owner = node.ownerElement

      // если владелец атрибута будет использоваться как элемент монтирования
      if (temp.ownerElement[symReact] === 'is') {
        // получить атрибут монтирования элемента
        const attr = node.ownerElement.attributes['is']

        // определить множество для хранения обратных вызовов булевых атрибутов
        const bool = SERVICE.get(this).booleans.get(attr) || SERVICE.get(this).booleans.set(attr, new Set()).get(attr) 

        // добавить во множество обратный вызов атрибута
        bool.add(cb)
      }

      // очистить значение атрибута
      node.value = ''
    }

    // сохранить обратный вызов в хранилище
    SERVICE.get(this).callbacks.set(node, cb)
  }

  // вызвать обработчик для узла компонента
  vars || handlerCallback.call(this, attr || node, cb)
}