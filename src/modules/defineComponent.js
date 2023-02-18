import clearContent from './clearContent'
import addCallback from './addCallback'
import addObserver from './addObserver'
import customEvent from './customEvent'
import pathRouter from './pathRouter'

// конструктор исполняющей функции-генератора
const GFunction = Function('return function*(){}')().constructor

// список специальных свойств компонента
const specialProperties = '$, $$, $root, $host, $data, $parent, $when, $event, $router, $mixins'

// пустой объект для прокси примесей компонента
const emptyObject = {}

// возвращает промис готовности данных компонента
export const whenData = name => new Promise(ok => eventData.addEventListener(name, ok, { once: true }))

// объект событий готовности данных компонентов
export const eventData = new customEvent()

// множество имён определённых компонентов
export const defineNames = new Set()

// хранилище сервисных свойств компонента
export const SERVICE = new WeakMap()


export default function (obj, ok) {
  // определить переменные из свойств объекта компонента
  const { name, extends:extend, mode, data, html = '', attributes, changed, mixins,
    before, after, connected, disconnected, adopted } = obj

  // определить для компонента Суперэлемент
  const SUPERElement = extend ? Object.getPrototypeOf(document.createElement(extend)).constructor : HTMLElement

  // определить шаблон для содержимого компонента
  const template = document.createElement('template')

  // добавить содержимое в шаблон
  template.innerHTML = html

  // очистить содержимое шаблона
  clearContent(template.content)

  // определить множество дочерних компонентов
  const childs = new Set()

  // определить счётчик компонентов
  let count = 0

  // определить компонент из Суперэлемента
  customElements.define(name, class extends SUPERElement {
    constructor() {
      super()

      // увеличить на единицу счётчик компонента
      count++

      // добавить компонент в хранилище сервисных свойств
      SERVICE.set(this, {
        nodes: [],
        host: this,
        values: new WeakMap(),
        callbacks: new WeakMap(),
        dependencies: new WeakMap(),
        booleans: new WeakMap(),
        childs,
        before,
        after,
      })

      // получить родительский элемент компонента
      let parent = this.parentNode.host || this.parentNode

      // войти в цикл, если родительский элемент получен
      while (parent) {
        // если родительский элемент является компонентом, то выйти
        if (parent.$root) break

        // определить следующий родительский элемент
        parent = parent.parentNode?.host || parent.parentNode
      }

      // если у компонента имеется родитель
      if (parent) {
        // добавить текущий компонент в родительское множество дочерних
        SERVICE.get(parent).childs.add(this)
      }

      // определить специальные свойства компонента
      Object.defineProperties(this, {
        $root: { value: mode ? this.attachShadow({ mode }) : this },
        $host: { value: this },
        $parent: { value: parent?.$data },
        $mixins: { value: new Proxy(emptyObject, { get: (_, key) => mixins?.[key] ?? Reacton.mixins?.[key] ?? this.$data[key] }) },
      })

      // добавить обработчик инициализации компонента
      this.addEventListener('__INIT__', () => {
        // если у компонента имеется родитель
        if (parent) {
          // удалить текущий компонент из родительского множества дочерних
          SERVICE.get(parent).childs.delete(this)
          
          // вызвать обработчик инициализации родителького компонента
          this.$event(parent, '__INIT__')
        }
        
        // если счётчик компонента и множество дочерних равны нулю
        if (count === 0 && childs.size === 0) {
          // добавить название компонента во множество
          defineNames.add(name)
          
          ok() // разрешить промис компонента
        }
      })
    }


    // вызывается при добавлении компонента в документ
    async connectedCallback() {
      // определить объект данных компонента
      Object.defineProperty(this, '$data', {
        value: new Proxy(typeof data === 'function' ? addObserver.call(this, await data.call(this)) : {}, {
          get: (target, key, receiver) => {
            // вернуть значение свойства объекта данных или компонента
            return target.hasOwnProperty(key) ? Reflect.get(target, key, receiver) : this[key]
          }
        })
      })

      // вызвать событие готовности данных компонента
      this.$event(eventData, name)

      // определить генератор исполняющей функции
      const generator = GFunction(`{ ${specialProperties} } = this`, 'with (this) while (true) arguments[0] = yield eval(arguments[0])')

      // определить итератор исполняющей функции
      const iterator = generator.call(this.$data)

      // перейти к бесконечному циклу итератора
      iterator.next()

      // сохранить итератор в сервисном свойстве
      SERVICE.get(this).exec = iterator

      // определить хранилище для содержимого компонента
      const content = new DocumentFragment()

      // клонировать в хранилище содержимое шаблона
      content.append(template.content.cloneNode(true))

      // добавить обратные вызовы узлам содержимого компонента
      addCallback.call(this, content, template.content)

      // перенести содержимое в компонент
      this.$root.append(content)
      
      // если в объекте компонента была определена функция "connected"
      if (typeof connected === 'function') {
        await connected.call(this.$data) // вызвать эту функцию
      }

      // уменьшить на единицу счётчик компонента
      count--

      // вызвать событие инициализации компонента
      this.$event(null, '__INIT__')
    }


    // вызывается при удалении компонента из документа
    async disconnectedCallback() {
      // если в объекте компонента была определена функция "disconnected"
      if (typeof disconnected === 'function') {
        await disconnected.call(this.$data) // вызвать эту функцию
      }
    }

    // вызывается при перемещении компонента в новый документ
    async adoptedCallback() {
       // если в объекте компонента была определена функция "adopted"
      if (typeof adopted === 'function') {
        await adopted.call(this.$data) // вызвать эту функцию
      }
    }

    // массив имён атрибутов для отслеживания их изменений
    static get observedAttributes() {
      // если в объекте компонента был определён массив "attributes"
      if (Array.isArray(attributes)) {
        return attributes // вернуть этот массив
      }
    }

    // вызывается при изменении одного из отслеживаемых атрибутов
    async attributeChangedCallback(...args) {
      // если в объекте компонента была определена функция "changed"
      if (typeof changed === 'function') {
        await changed.apply(this.$data, args) // вызвать эту функцию
      }
    }

    // поиск элемента по заданному селектору
    $(sel) {
      return this.$root.querySelector(sel)
    }

    // поиск всех элементов по заданному селектору
    $$(sel) {
      return this.$root.querySelectorAll(sel)
    }

    // возвращает функцию промиса готовности данных компонента
    get $when() {
      return whenData
    }

    // возвращает функцию создания пользовательских событий
    get $event() {
      return customEvent
    }

    // возвращает функцию создания маршрутизатора путей
    get $router() {
      return pathRouter
    }
  
    // определить для компонента расширяемый элемент
  }, extend ? { extends: extend } : null)
  
  // разрешить промис неопределённого компонента
  customElements.whenDefined(name).then(() => count || ok())
}