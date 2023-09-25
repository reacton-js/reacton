/*!
 * Reacton.js v3.2.0
 * (c) 2022-2023 | github.com/reacton-js
 * Released under the MIT License.
 */
'use strict'

!function () {
  // определить шаблон поиска заглавных букв
  const regUpper = /[A-Z]/g

  // определить хранилище для служебных свойств компонентов
  const SERVICE = new WeakMap()

  // определить документ для создания независимых элементов компонентов
  const HTMLDocument = document.implementation.createHTMLDocument()

  // определить ловушки для прокси атрибутов компонентов
  const attrHooks = {
    get(target, key) {
      return target.hasOwnProperty(key) ? target[key].value : target[key]
    },
    set(target, key, val) {
      target[key].value = val
      return true
    }
  }

  // определить символ для получения элемента компонентов
  const getThis = Symbol()

  // определить множество для хранения определяемых компонентов
  const setDefs = new Set()

  // определить элемент события готовности компонентов
  const okEvent = new customEvent()

  // определить событие инициализации компонента
  const initEvent = new CustomEvent('init', { bubbles: true, composed: true })

  // определить дескриптор для свойства "detail" с возможностью записи 
  Object.defineProperty(initEvent, 'detail', { writable: true })


  // определить функцию создания компонентов
  function createComponent (INITClass) {
    // определить уровень инкапсуляции компонента
    const mode = (INITClass.mode || '').toLowerCase()

    // определить для компонента название расширяемого элемента
    const extend = (INITClass.extends || '').toLowerCase()

    // определить имя компонента в шашлычной нотации
    const name = INITClass.name.replace(regUpper, (str, pos) => (pos > 0 ? '-' : '') + str.toLowerCase())

    // определить для компонента класс расширяемого элемента
    const SUPERElement = extend ? Object.getPrototypeOf(document.createElement(extend)).constructor : HTMLElement

    // выполнить определение нового компонента
    customElements.define(name, class extends SUPERElement {
      constructor() {
        super()

        // добавить определяемый компонент во множество
        setDefs.add(this)

        // определить ссылку на теневой DOM или корневой элемент компонента
        const root = mode ? this.attachShadow({ mode }) : this

        // определить хранилище исполнителей для реактивных узлов
        const funcs = new WeakMap()

        // определить хранилище наблюдателей для объектов
        const obsers = new WeakMap()

        // определить хранилище логических атрибутов для отображений
        const bools = new WeakMap()

        // определить хранилище атрибутов событий для отображений
        const events = new WeakMap()

        // определить прокси для атрибутов компонента
        const attrs = new Proxy(this.attributes, attrHooks)

        // определить объект для ключей состояния
        const keys = {}

        // определить объект с методом доступа к состоянию или свойству компонента
        const state = new Proxy(new INITClass(), {
          // вернуть значение свойства объекта состояния или компонента
          get: (target, key, receiver) => {
            // если запрашивается символ, то вернуть элемент компонента
            if (key === getThis) return this

            // если запрашивается собственное свойство состояния
            if (target.hasOwnProperty(key)) {
              // если обрабатывается узел компонента
              if (service.node) {
                // если в объекте нет ключа состояния
                if (!keys[key]) {
                  // добавить ключу состояния новое множество
                  keys[key] = new Set()
                }
                // добавить узел во множество ключа состояния
                keys[key].add(service.node)
              }

              // установить перехватчику множество зависимых узлов
              hooks._nodes = keys[key]

              // если значение состояния имеет наблюдателя
              if (service.obsers.has(target[key])) {
                // вернуть наблюдателя для значения
                return service.obsers.get(target[key])
              }

              // если значение состояния не является объектом
              if (!target[key] || typeof target[key] !== 'object') {
                return target[key] // вернуть значение
              }

              // создать наблюдателя для значения состояния
              return getObserver.call(this, target[key], hooks)
            }

            // получить прототип объекта состояния компонента
            const proto = target.__proto__ || Object.getPrototypeOf(target)
            
            // вернуть значение свойства из прототипа объекта состояния или компонента
            return (typeof key === 'symbol' || key in proto) ? Reflect.get(proto, key, receiver) : this[key]
          },

          // установить значение свойства объекта состояния
          set: (target, key, value, receiver) => {
            // если не удалось установить новое значение
            if (!Reflect.set(target, key, value, receiver)) {
              return false // вернуть Ложь
            }

            // если имеются зависимые узлы для состояния
            if (keys[key]) {
              // передать зависимые узлы состояния исполнителю
              nodeHandler.call(this, keys[key], INITClass)
            }

            return true // вернуть Истину
          }
        })

        // определить специальные свойства для элемента компонента
        Object.defineProperties(this, {
          // возвращает объект состояния компонента
          $state: { get() { if (mode !== 'closed') return state }},
          // возвращает прокси атрибутов компонента
          $props: { get() { if (mode !== 'closed') return attrs }},
          // возвращает хозяина теневого DOM компонента
          $host: { get() { if (mode !== 'closed') return root.host }},
          // возвращает Истину, если компонент не содержит теневой DOM
          $light: { value: root === this || false },
          // возвращает теневой DOM компонента
          $shadow: { value: this.shadowRoot },
          // возвращает функцию создания пользовательских событий
          $event: { value: customEvent },
          // возвращает функцию создания маршрутных событий
          $route: { value: routeEvent },
        })

        // определить объект со служебными свойствами
        const service = { root, funcs, obsers, bools, events, state }

        // добавить объект служебных свойств в главное хранилище
        SERVICE.set(this, service)
        
        // определить функцию для создания исполнителей реактивных узлов
        service.exec = getExec.call(this)

        // определить объект перехватчиков для наблюдателя
        const hooks = new Hooks(INITClass, obsers)

        // добавить перехватчику ссылку на элемент компонента
        hooks[getThis] = this

        // добавить компоненту обработчик события инициализации
        this.addEventListener('init', event => {
          // удалить передаваемый компонент из множества
          setDefs.delete(event.detail)

          // если множество определяемых компонентов пусто
          if (setDefs.size === 0) {
            // остановить всплытие события инициализации
            event.stopPropagation()
            
            // вызвать событие готовности компонентов
            customEvent(okEvent, 'ok')
          }
        })
      }

      
      // вызывается при добавлении компонента в документ
      async connectedCallback() {
        // получить объект со служебными свойствами
        const service = SERVICE.get(this)

        // определить шаблон компонента
        const template = document.createElement('template')

        // если HTML-содержимое компонента является строкой или неопределённым значением
        if (typeof INITClass.template === 'string' || INITClass.template === undefined) {
          // добавить содержимое в шаблон
          template.innerHTML = INITClass.template || ''
        }
        // иначе, если HTML-содержимое компонента является функцией
        else if (typeof INITClass.template === 'function') {
          // добавить результат функции в шаблон
          template.innerHTML = await INITClass.template.call(service.state) || ''
        }
        // иначе, если HTML-содержимое компонента является фрагментом документа
        else if (INITClass.template instanceof DocumentFragment) {
          // клонировать содержимое фрагмента в шаблон
          template.content.append(INITClass.template.cloneNode(true))
        }

        // определить реактивные узлы и добавить им исполнителя
        defineReact.call(this, template.content)

        // перенести содержимое шаблона в компонент
        service.root.append(template.content)

        // если была определена статическая функция "connected"
        await (!INITClass.connected || INITClass.connected.call(service.state))

        // перейти к следующей итерации цикла событий
        setTimeout(() => {
          // определить передаваемый во множество компонент
          initEvent.detail = this
          
          // вызвать обработчик события инициализации компонента
          this.dispatchEvent(initEvent)
        }, 0)
      }

      // вызывается при удалении компонента из документа
      async disconnectedCallback() {
        // если была определена статическая функция "disconnected"
        await (!INITClass.disconnected || INITClass.disconnected.call(SERVICE.get(this).state))
      }

      // вызывается при перемещении компонента в новый документ
      async adoptedCallback() {
        // если была определена статическая функция "adopted"
        await (!INITClass.adopted || INITClass.adopted.call(SERVICE.get(this).state))
      }

      // вызывается при изменении одного из отслеживаемых атрибутов
      async attributeChangedCallback(...args) {
        // если была определена статическая функция "changed"
        await (!INITClass.changed || INITClass.changed.apply(SERVICE.get(this).state, args))
      }

      // массив имён атрибутов для отслеживания их изменений
      static get observedAttributes() {
        // если был определён статический массив "attributes"
        if (Array.isArray(INITClass.attributes)) {
          return INITClass.attributes
        }
      }
      
      
      // поиск элемента по заданному селектору
      $(selector) {
        if (mode !== 'closed' || this[getThis]) {
          return SERVICE.get(this[getThis] || this).root.querySelector(selector)
        }
        return null
      }

      // поиск всех элементов по заданному селектору
      $$(selector) {
        if (mode !== 'closed' || this[getThis]) {
          return SERVICE.get(this[getThis] || this).root.querySelectorAll(selector)
        }
        return null
      }

      // определить для компонента расширяемый элемент
    }, extend ? { extends: extend } : null)
  }


  // список перехватываемых методов массива
  const hookMethods = new Set(['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'])

  // определить класс перехватчиков для наблюдателя
  class Hooks {
    constructor(init, obsers) {
      // определить ссылку на класс инициализации компонента
      this._init = init

      // определить ссылку на хранилище наблюдателей
      this._obsers = obsers
    }

    // выполняется при использовании оператора "delete"
    deleteProperty(target, key) {
      // если целевой объект является массивом
      if (Array.isArray(target)) {
        // удалить элемент из массива
        target.splice(key, 1)
      }
      // иначе,
      else {
        // удалить свойство из целевого объекта
        delete target[key]
      }

      // если имеются зависимые узлы для состояния
      if (this._nodes) {
        // передать зависимые узлы состояния исполнителю
        nodeHandler.call(this[getThis], this._nodes, this._init)
      }

      return true // вернуть Истину
    }

    // выполняется при вызове функции из наблюдаемого объекта
    apply(target, thisArg, args) {
      // если вызывается метод "toString"
      if (target.name === 'toString') {
        // вернуть JSON-представление объекта
        return JSON.stringify(thisArg, null, ' ')
      }
      // иначе, если вызывается перехватываемый метод массива
      else if (hookMethods.has(target.name)) {
        // выполнить метод в контексте целевого объекта
        target.apply(this._target, args)
        
        // если имеются зависимые узлы для состояния
        if (this._nodes) {
          // передать зависимые узлы состояния исполнителю
          nodeHandler.call(this[getThis], this._nodes, this._init)
        }

        return thisArg // вернуть наблюдаемый массив
      }
      
      // вызвать метод и вернуть его значение
      return target.apply(thisArg, args)
    }

    // выполняется при доступе к свойству наблюдаемого объекта
    get(target, key, receiver) {
      // установить целевой объект для перехватчика
      this._target = target

      // получить значение свойства
      const value = Reflect.get(target, key, receiver)

      // если полученное значение имеет наблюдателя
      if (this._obsers.has(value)) {
        // вернуть наблюдателя для значения
        return this._obsers.get(value)
      }

      // если запрашиваемое свойство не является собственным
      if (!target.hasOwnProperty(key)) {
        // если запрашивается метод "toString" или перехватываемый метод массива
        if (key === 'toString' || (Array.isArray(target) && hookMethods.has(key))) {
          // вернуть новый прокси для перехвата
          return getObserver.call(this[getThis], value, this)
        }

        // иначе, вернуть значение свойства
        return value
      }

      // если значение свойства не является объектом
      if (!value || typeof value !== 'object') {
        return value // вернуть значение
      }

      // создать наблюдателя для значения
      return getObserver.call(this[getThis], value, this)
    }

    // выполняется при установке значения свойству наблюдаемого объекта
    set(target, key, value, receiver) {
      // если не удалось установить новое значение
      if (!Reflect.set(target, key, value, receiver)) {
        return false // вернуть Ложь
      }

      // если имеются зависимые узлы для состояния
      if (this._nodes) {
        // передать зависимые узлы состояния исполнителю
        nodeHandler.call(this[getThis], this._nodes, this._init)
      }

      return true // вернуть Истину
    }
  }


  // создаёт и возвращает наблюдателя для объекта
  function getObserver (obj, hooks) {
    // определить для объекта наблюдаемый прокси
    const observed = new Proxy(obj, hooks)

    // добавить наблюдателя в хранилище
    SERVICE.get(this).obsers.set(obj, observed)
    
    // вернуть наблюдателя
    return observed
  }


  // удаление содержимого в кавычках из выражения цикла
  const regDel = /(['"`])[^]*?\1/

  // поиск левой части выражения цикла
  const regLeft = /;|\b(?:of)|(?:in)\b/

  // поиск переменных в левой части выражения
  const regVars = /\b[A-Za-z_]\w*?\b/g

  // возвращает строку с названиями переменных цикла
  function getVars (str) {
    return str.replace(regDel, '').split(regLeft)[0].match(regVars).join()
  }


  // список названий специальных свойств компонента
  const specNames = '$state, $props, $host, $light, $shadow, $event, $route, $, $$'

  // возвращает функцию для создания исполнителей реактивных узлов
  function getExec () {
    return new Function(`{ ${specNames} } = this`,
      `return function() { with (this) return eval(arguments[0]) }`).call(this).bind(SERVICE.get(this).state)
  }


  // возвращает функцию для создания исполнителей в циклах
  function getCycle (val) {
    return `(function*() { arguments[0] = yield function() { return eval(arguments[0]) }; while (true) { yield; for (var ${val}) arguments[0]() } })()`
  }


  // определить шаблон поиска подстановок
  const regSub = /{{([^{}]*?)}}/

  // определяет реактивные узлы и добавляет им функцию исполнения
  function defineReact (node, vars) {
    // если нода является комментарием
    if (node.nodeType === 8) {
      return node.remove() // удалить ноду
    }
    
    // иначе, если нода является текстовым узлом
    else if (node.nodeType === 3) {
      // если нода является пустым узлом
      if (!node.data.trim()) {
        // если нода содержит символ переноса
        if (node.data.indexOf('\n') !== -1) {
          node.data = '\n' // присвоить ноде символ переноса
        }
        // иначе, если длина строки ноды больше нуля
        else if (node.data.length) {
          node.data = ' ' // присвоить ноде пробел
        }
      }
      // иначе,
      else {
        // найти подстановку в содержимом текстового узла
        const arrSub = regSub.exec(node.data)

        // если нода содержит подстановку
        if (arrSub) {
          // если подстановка находится в начале содержимого
          if (arrSub.index === 0) {
            // получить объект со служебными свойствами
            const service = SERVICE.get(this)

            // определить функцию исполнения для реактивного узла
            const callback = service.exec(`() => ${arrSub[1]}`)

            // разделить ноду по длине подстановки
            node.splitText(arrSub[0].length)

            // добавить функцию исполнения в хранилище
            service.funcs.set(node, callback)

            // если обрабатывается не шаблон цикла
            if (!vars) {
              // получить ссылку на текстовый узел
              service.node = node

              // установить значение для текстового узла
              node.data = callback()

              // удалить ссылку на текстовый узел
              delete service.node
            }
          }
          // иначе, разделить ноду по индексу нахождения подстановки
          else {
            node.splitText(arrSub.index)
          }
        }
      }
    }

    // иначе, если нода является реактивным атрибутом
    else if (node.nodeName[0] === ':' || node.nodeName[0] === '$') {
      // получить объект со служебными свойствами
      const service = SERVICE.get(this)

      // определить владельца атрибута
      const owner = node.ownerElement

      // удалить старый атрибут из шаблона компонента
      owner.removeAttribute(node.nodeName)

      // если атрибут является циклом
      if (node.nodeName === '$for') {
        // если обрабатывается не шаблон цикла
        if (!vars) {
          // получить ссылку на владельца атрибута
          service.node = owner
        }

        // определить шаблон для хранения содержимого цикла
        const template = new DocumentFragment()

        // перенести содержимое цикла в шаблон
        while (owner.firstChild) {
          template.append(owner.firstChild)
        }

        // определить итератор выполнения цикла
        const iterator = service.exec(getCycle(node.value))

        // определить функцию для создания исполнителей реактивных узлов в цикле
        const executor = iterator.next().value.bind(this.$state)

        // передать в генератор цикла функцию, которая выполняется на каждой итерации 
        iterator.next(() => runCycle.call(this, template, props))

        // определить переменные цикла
        let _vars = getVars(node.value)

        // если имеются переменные внешних циклов
        if (vars) {
          // добавить их к списку собственных переменных
          _vars += `,${vars}`
        }

        // сохранить функцию создания исполнителей реактивных узлов
        const exec = service.exec

        // определить новую функцию создания исполнителей реактивных узлов
        service.exec = executor

        // определить реактивные узлы в шаблоне и добавить им исполнителя
        defineReact.call(this, template, _vars)

        // восстановить функцию создания исполнителей реактивных узлов
        service.exec = exec

        // определить объект специальных свойств цикла
        const props = { executor, iterator, length: template.childNodes.length }

        // добавить объект свойств в хранилище
        service.funcs.set(owner, props)
        
        // если обрабатывается не шаблон цикла
        if (!vars) {
          // передать цикл исполнителю
          callExec.call(this, owner, service.funcs.get(owner))
        }
      }
      // иначе,
      else {
        // определить имя атрибута без префикса
        const name = node.nodeName.slice(1)

        // создать новый реактивный атрибут для элемента
        const attr = document.createAttribute(name)

        // если обрабатывается не шаблон цикла
        if (!vars) {
          // получить ссылку на новый атрибут
          service.node = attr
        }

        // если новый атрибут является событием
        if (attr.name.substring(0, 2) === 'on') {
          let callback // содержит исполнителя

          // определить значение атрибута без пробелов
          let value = node.value.trim()

          // если значение ссылается на функцию 
          if (typeof this.$state[value] === 'function') {
            value += '()' // добавить оператор вызова функции
          }

          // если обрабатывается не шаблон цикла
          if (!vars) {
            // определить функцию исполнения для реактивного атрибута
            callback = service.exec(`() => ${value}`)

            // установить исполнителя для владельца атрибута
            owner[`on${attr.name.slice(2)}`] = callback
          }
          // иначе,
          else {
            // определить функцию исполнения для реактивного атрибута в цикле
            callback = service.exec(`() => ((${vars}) => () => ${value})(${vars})`)

            // добавить функцию исполнения в хранилище
            service.funcs.set(attr, callback)

            // добавить владельцу в шаблоне атрибут события
            owner.setAttributeNode(attr)

            // добавить название события в свойство исполнителя
            callback._on = name
          }

          // если владелец является отображением
          if (owner.hasAttribute(':is')) {
            // определить объект для хранения атрибутов событий
            service.events.has(owner) || service.events.set(owner, {})

            // добавить в объект исполнителя для атрибута
            service.events.get(owner)[name] = callback
          }
        }
        // иначе,
        else {
          // определить функцию исполнения для реактивного атрибута
          const callback = service.exec(`() => ${node.value}`)

          // добавить функцию исполнения в хранилище
          service.funcs.set(attr, callback)

          // если новый атрибут является логическим
          if (typeof owner[name] === 'boolean') {
            // если обрабатывается не шаблон цикла
            if (!vars) {
              // добавить/удалить владельцу логический атрибут
              callback() ? owner.setAttributeNode(attr) : owner.removeAttribute(name)
            }
            // иначе,
            else {
              // добавить владельцу в шаблоне логический атрибут
              owner.setAttributeNode(attr)

              // добавить название атрибута в свойство исполнителя
              callback._name = name
            }

            // если владелец является отображением
            if (owner.hasAttribute(':is')) {
              // определить объект для хранения логических атрибутов
              service.bools.has(owner) || service.bools.set(owner, {})

              // добавить в объект исполнителя для атрибута
              service.bools.get(owner)[name] = callback
            }
            
            // добавить владельца атрибута в свойство исполнителя
            callback._owner = owner
          }
          // иначе,
          else {
            // если обрабатывается не шаблон цикла
            if (!vars) {
              // установить значение для нового атрибута
              attr.value = callback()
            }

            // установить владельцу новый реактивный атрибут
            owner.setAttributeNode(attr)

            // если новый атрибут является отображением
            if (attr.name === 'is') {
              // если обрабатывается не шаблон цикла
              if (!vars) {
                // вызвать для потомков владельца атрибута функцию определения
                for (let i = 0; i < owner.childNodes.length; i++) {
                  defineReact.call(this, owner.childNodes[i]) || i--
                }

                // сохранить дочерние узлы владельца в свойстве исполнителя
                callback._childs = [...owner.childNodes]

                // передать атрибут исполнителю
                callExec.call(this, attr, service.funcs.get(attr))
              }
              // иначе,
              else {
                // создать шаблон для хранения дочерних узлов владельца
                const template = document.createElement('template')

                // перенести в шаблон дочерние узлы владельца
                template.content.append(...owner.childNodes)

                // сохранить шаблон в свойстве исполнителя
                callback._childs = template.content
              }
            }
          }
        }
      }

      // если обрабатывается не шаблон цикла
      if (!vars) {
        // удалить ссылку на реактивный узел
        delete service.node
      }

      return null // вернуть null
    }

    // иначе,
    else {
      // если у ноды имеются атрибуты
      if (node.attributes) {
        // вызвать для атрибутов функцию определения реактивных узлов
        for (let i = 0; i < node.attributes.length; i++) {
          defineReact.call(this, node.attributes[i], vars) || i--
        }
      }

      // вызвать для потомков функцию определения реактивных узлов
      for (let i = 0; i < node.childNodes.length; i++) {
        defineReact.call(this, node.childNodes[i], vars) || i--
      }
    }
    
    return node // вернуть узел
  }


  // обрабатывает реактивные узлы компонента
  function nodeHandler (nodes, INITClass) {
    // получить объект со служебными свойствами
    const service = SERVICE.get(this)

    // если была определена статическая функция "before"
    !INITClass.before || INITClass.before.call(service.state)

    // вызвать исполнителя для реактивного узла компонента
    nodes.forEach(node => callExec.call(this, node, service.funcs.get(node)))

    // если была определена статическая функция "after"
    !INITClass.after || INITClass.after.call(service.state)
  }


  // определить шаблон для создания образцов элементов
  const sample = document.createElement('template')

  // вызывает исполнителя для реактивных узлов компонента
  function callExec (node, callback, template) {
    // если нода является атрибутом события
    if (callback._on) {
      // установить исполнителя для владельца атрибута
      node[callback._on] = callback()
    }
    // иначе, если нода является элементом цикла
    else if (callback.iterator) {
      // получить объект со служебными свойствами
      const service = SERVICE.get(this)

      // сохранить функцию создания исполнителей реактивных узлов
      const exec = service.exec

      // определить новую функцию создания исполнителей реактивных узлов
      service.exec = callback.executor

      // установить индекс для шаблона цикла
      callback.index = 0

      // установить владельца цикла
      callback.owner = node
      
      // выполнить цикл
      callback.iterator.next()

      // сохранить значение индекса цикла
      const index = callback.index

      // перебрать дочерние узлы элемента цикла
      for (let i = node.childNodes.length; i > index; i--) {
        node.lastChild.remove() // удалить последний узел
      }

      // восстановить функцию создания исполнителей реактивных узлов
      service.exec = exec
    }
    // иначе, если нода является атрибутом отображения
    else if (node.name === 'is') {
      // определить значение исполняющей функции
      const value = callback()

      // установить для атрибута новое значение
      node.value = value

      // определить владельца атрибута
      const owner = node.ownerElement

      // создать образец владельца атрибута
      sample.innerHTML = `<${owner.nodeName} is="${value}" />`

      // получить ссылку на образец владельца
      const first = sample.content.firstElementChild

      // перебрать коллекцию атрибутов старого владельца
      while (owner.attributes.length) {
        // перенести атрибут из старого владельца в новый
        first.setAttributeNode(owner.removeAttributeNode(owner.attributes[0]))
      }

      // получить объект со служебными свойствами
      const service = SERVICE.get(this)

      // получить объект с логическими атрибутами для владельца
      const bools = service.bools.get(owner)

      // если объект получен
      if (bools) {
        // перебрать объект с логическими атрибутами
        for (const key in bools) {
          // определить нового владельца для атрибута
          bools[key]._owner = first
        }

        // удалить старого владельца из хранилища
        service.bools.delete(owner)
        
        // добавить нового владельца в хранилище
        service.bools.set(first, bools)
      }

      // получить объект с атрибутами событий для владельца
      const events = service.events.get(template || owner)

      // если объект получен
      if (events) {
        // перебрать объект с атрибутами событий
        for (const key in events) {
          // назначить исполнителя для нового владельца
          first[key] = template ? events[key]() : events[key]
        }

        // удалить старого владельца из хранилища
        service.events.delete(owner)
        
        // добавить нового владельца в хранилище
        service.events.set(first, events)
      }

      // если дочерние узлы находятся в шаблоне
      if (callback._childs instanceof DocumentFragment) {
        // клонировать дочерние узлы из шаблона
        const clone = callback._childs.cloneNode(true)

        // вызвать для клонированных узлов функцию определения
        defineReact.call(this, clone)

        // добавить клонированные узлы в новый образец
        first.append(clone)
      }
      // иначе,
      else {
        // добавить дочерние узлы в новый образец
        first.append(...callback._childs)
      }

      // заменить старого владельца новым
      owner.replaceWith(first)
    }
    // если нода является логическим атрибутом
    else if (callback._owner) {
      // если значение исполняющей функции Истина
      if (callback()) {
        // если обрабатывается шаблонная нода
        if (callback._name) {
          // добавить владельцу новый логический атрибут
          callback._owner.setAttribute(callback._name, '')
        }
        // иначе,
        else {
          // добавить владельцу текущий логический атрибут
          callback._owner.setAttributeNode(node)
        }
      }
      // иначе,
      else {
        // удалить у владельца логический атрибут
        callback._owner.removeAttribute(node.nodeName)
      }
    }
    // иначе,
    else {
      // установить для ноды значение исполняющей функции
      node.nodeValue = callback()
    }
  }


  // обновляет HTML-содержимое цикла компонента
  function updateDOM (clone, template) {
    // получить исполнителя для узла шаблона
    const callback = SERVICE.get(this).funcs.get(template)

    // если узел является реактивным
    if (callback) {
      // если узел является атрибутом события
      if (callback._on && clone.ownerElement) {
        // сохранить ссылку на владельца атрибута
        const owner = clone.ownerElement

        // удалить атрибут события у владельца
        owner.removeAttribute(callback._on)

        // переопределить обрабатываемый узел
        clone = owner
      }
      // иначе, если узел является элементом цикла
      else if (callback._owner) {
        // установить исполнителю нового владельца
        callback._owner = clone.ownerElement || clone
      }

      // вызвать исполнителя для узла компонента
      callExec.call(this, clone, callback, template.ownerElement)
    }

    // если у шаблона имеются атрибуты
    if (template.attributes) {
      for (let attr of template.attributes) {
        // вызвать функцию обновления для атрибутов
        updateDOM.call(this, clone.attributes[attr.name] || clone, attr)
      }
    }

    // вызвать функцию обновления для дочерних узлов
    for (let i = 0; i < template.childNodes.length; i++) {
      updateDOM.call(this, clone.childNodes[i], template.childNodes[i])
    }
  }


  // запускает выполнение цикла компонента
  function runCycle (template, props) {
    // если элемент цикла не имеет дочернего узла с указанным индексом
    if (!props.owner.childNodes[props.index]) {
      // клонировать содержимое шаблона цикла
      const clone = template.cloneNode(true)

      // вызвать для клонированного содержимого функцию обновления
      updateDOM.call(this, clone, template)

      // добавить клонированное содержимое в элемент цикла
      props.owner.append(clone)
    }
    // иначе,
    else for (let i = 0; i < props.length; i++) {
      // обновить дочерние узлы родительского элемента
      updateDOM.call(this, props.owner.childNodes[props.index + i], template.childNodes[i])
    }

    // увеличить индекс на количество дочерних узлов в шаблоне
    props.index += props.length
  }


  // определить функцию для работы с пользовательскими событиями
  function customEvent (elem, ...args) {
    // если функция была вызвана как конструктор
    if (new.target) {
      // вернуть новый элемент пользовательских событий
      return new DocumentFragment
    }
    
    // вызвать пользовательское событие для элемента
    elem.dispatchEvent(new CustomEvent(...args))
  }


  // определить шаблон поиска параметров
  const regParams = /:(\w+)/g

  // определить множество для хранения элементов событий
  const setElems = new WeakSet()

  // определить функцию для работы с маршрутными событиями
  function routeEvent (elem, href, props = null) {
    // если функция была вызвана как конструктор
    if (new.target) {
      // определить объект для регулярных выражений маршрутных событий
      const eventRegs = {}
      
      // вернуть новый элемент маршрутных событий
      return new (class extends DocumentFragment {
        addEventListener(...args) {
          // добавить в объект регулярное выражение для маршрутного события
          eventRegs[args[0]] = new RegExp(`^${args[0].replace(regParams, (_, fix) => `(?<${fix}>\\w+)`)}/?$`)

          // добавить обработчик для элемента маршрутных событий
          document.addEventListener.call(this, ...args)
        }
        getEventRegs() {
          return eventRegs // вернуть объект
        }
      })
    }

    // если во множестве нет элемента маршрутных событий
    if (!setElems.has(elem)) {
      // добавить элемент события во множество
      setElems.add(elem)

      // добавить элементу Window обработчик события "popstate"
      window.addEventListener('popstate', event => {
        // вызвать маршрутное событие для элемента
        callRoute(elem, location.href.replace(location.origin, ''), event.state)
      })
    }

    // если маршрут не передан, то выйти из функции
    if (!href) return

    // определить маршрут без значения "origin"
    const path = href.replace(location.origin, '')

    // добавить в историю браузера текущий маршрут
    history.pushState(props, '', path)

    // вызвать маршрутное событие для элемента
    callRoute(elem, path, props)
  }


  // определить функцию для вызова маршрутных событий
  function callRoute (elem, path, props) {
    // получить объект регулярных выражений маршрутных событий
    const eventRegs = elem.getEventRegs()

    // перебрать регулярные выражения маршрутных событий
    for (const key in eventRegs) {
      // определить результат проверки совпадения пути с регулярным выражением
      const obj = eventRegs[key].exec(path)

      // если имеется совпадение
      if (obj) {
        // определить новое пользовательское событие
        const event = new CustomEvent(key)

        // добавить событию свойство "url" из класса URL
        event.url = new URL(location.href)

        // добавить событию свойство содержащее параметры
        event.params = obj.groups

        // вызвать маршрутное событие для элемента
        elem.dispatchEvent(event, props)
      }
    }
  }


  // возвращает промис для рендеринга содержимого документа
  function ssr ({ node, slots, clean = true } = {}) {
    return new Promise(ready => okEvent.addEventListener('ok', () => {
      // определить хранилище для вывода отрендеренного содержимого
      const outNode = document.createElement('template')

      // установить датчик очистки от мусорного содержимого
      renderDOM.clean = clean

      // определить массив для хранения слотов
      renderDOM.slots = []
  
      // вызвать функцию рендеринга документа
      renderDOM(node || document.children[0], outNode.content)

      // если в отрендеренном содержимом слоты не нужны
      if (!slots) {
        // заменить слоты их дочерними узлами
        renderDOM.slots.forEach(slot => slot.replaceWith(...slot.childNodes))
      }
  
      // вернуть отрендеренное содержимое документа
      ready(node ? outNode.innerHTML : `<!DOCTYPE html>\n${outNode.innerHTML}`)
    }))
  }


  // выполняет рендеринг содержимого документа
  function renderDOM (inNode, outNode, index = 0) {
    // если установлен датчик очистки и нода является мусорным узлом
    if (renderDOM.clean && (inNode.nodeName === 'STYLE' || inNode.nodeName === 'SCRIPT'
      || inNode.nodeName === 'TEMPLATE' || inNode.nodeType === 8)) {
        return false // вернуть Ложь
    }

    /* определить переменные для хранения новой ноды
      и дочерних узлов входной ноды */
    let newNode, inChildNodes

    // если входная нода является компонентом
    if (inNode.$state) {
      // создать пустой элемент компонента
      newNode = HTMLDocument.createElement(inNode.nodeName)

      // добавить элементу атрибуты входной ноды
      for (const attr of inNode.attributes) {
        newNode.setAttribute(attr.name, attr.value)
      }
    }
    // иначе, клонировать входную ноду без содержимого
    else {
      newNode = inNode.cloneNode(false)
    }

    // добавить новую ноду в отрендеренное содержимое
    outNode.append(newNode)
    
    // если новая нода является слотом
    if (newNode.nodeName === 'SLOT') {
      // вернуть последовательность узлов назначенных входному слоту
      inChildNodes = inNode.assignedNodes({ flatten: true })
      // добавить новую ноду в массив
      renderDOM.slots.push(newNode)
    }
    // иначе, вернуть коллекцию дочерних узлов входной ноды
    else {
      inChildNodes = (inNode.$shadow || inNode).childNodes
    }

    // вызвать функцию рендеринга для дочерних узлов входной и выходной ноды
    for (let i = 0, y = 0; i < inChildNodes.length; i++, y++) {
      renderDOM(inChildNodes[i], outNode.childNodes[index], y) || y--
    }

    return true // вернуть Истину
  }


  // выполняет конвертирование аргументов в класс компонента
  function convertArgument (arg) {
    // если аргумент является строкой
    if (typeof arg === 'string') {
      // определить шаблон компонента
      const template = document.createElement('template')

      // перенести содержимое строки в шаблон
      template.innerHTML = arg

      // получить ссылку на первый дочерний элемент в шаблоне
      const elem = template.content.children[0]

      // добавить шаблону название класса компонента
      template.classList.add(elem.nodeName.toLowerCase())

      // заменить дочерний элемент из шаблона его содержимым
      elem.replaceWith(...elem.childNodes)

      // переопределить аргумент на шаблон компонента
      arg = template
    }

    // если аргумент является элементом Template
    if (arg instanceof HTMLTemplateElement) {
      // получить HTML-содержимое элемента
      const content = arg.content

      // получить содержимое скриптов элемента
      const scripts = [...content.querySelectorAll('script')].map(script => content.removeChild(script).innerHTML).join('')

      // выполнить скрипты и получить класс компонента
      const _class = new Function('exports', `${scripts}\n return exports`)() || class {}

      Object.defineProperties(_class, {
        // добавить классу название компонента
        name: { value: arg.classList[0] },
        // добавить классу HTML-содержимое компонента
        template: { value: content },
      })

      // передать класс в функцию создания компонентов
      createComponent(_class)
    }

    // иначе,
    else {
      // передать аргумент в функцию создания компонентов
      typeof arg !== 'function' || createComponent(arg)
    }
  }


  // определить главную функцию в глобальной переменной
  window.Reacton = (...args) => args.forEach(convertArgument)

  // определить для главной функции метод "event"
  window.Reacton.event = customEvent

  // определить для главной функции метод "route"
  window.Reacton.route = routeEvent

  // определить для главной функции метод "ssr"
  window.Reacton.ssr = ssr
}();