import callHandler from './callHandler'
import addObserver from './addObserver'

// список игнорируемых методов массива
const ignoredMethods = new Set(['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'])


export default class Hooks {
  #SERVICE
  #deps

  // содержит целевой объект для методов массива
  static target = null

  // содержит зависимости родительского объекта для методов массива
  static deps = null
  

  constructor(service, deps) {
    // содержит хранилище сервисных свойств компонента
    this.#SERVICE = service

    // содержит зависимости родительского объекта
    this.#deps = deps
  }


  // выполняется при вызове функции из наблюдаемого объекта
  apply(method, proxy, args) {
    // если вызывается метод "toString", то вернуть JSON-представление объекта
    if (method.name === 'toString') {
      return JSON.stringify(proxy, null, ' ')
    }

    // иначе, если вызывается один из игнорируемых методов массива
    else if (ignoredMethods.has(method.name) && !Hooks.target.hasOwnProperty(method.name)) {
      // выполнить метод в контексте исходного массива
      method.apply(Hooks.target, args)

      // если имеются зависимости для родительского объекта
      if (Hooks.deps) {
        // вызвать обработчик для зависимостей
        callHandler.call(this.#SERVICE.host, Hooks.deps)
      }

      return proxy // вернуть проксированный массив
    }
    
    // вызвать пользовательский метод и вернуть его значение
    return method.apply(proxy, args)
  }


  // выполняется при использовании оператора "delete"
  deleteProperty(target, key) {
    // получить наблюдаемый прокси удаляемого значения
    const proxy = this.#SERVICE.values.get(target)

    // если прокси является массивом
    if (Array.isArray(proxy)) {
      // удалить элемент из массива
      proxy.splice(key, 1)
    }
    // иначе,
    else {
      // присвоить элементу значение "undefined"
      proxy[key] = undefined
    }

    return true // вернуть Истину
  }


  // выполняется при доступе к свойству наблюдаемого объекта
  get(target, key, receiver) {
    // сохранить целевой объект в статическом свойстве
    Hooks.target = target

    // сохранить родительские зависимости в статическом свойстве
    if (this.#deps) Hooks.deps = this.#deps

    // получить значение свойства
    const value = Reflect.get(target, key, receiver)

    // если полученное значение уже является наблюдаемым
    if (this.#SERVICE.values.has(value)) {
      // вернуть наблюдаемый прокси запрашиваемого значения
      return this.#SERVICE.values.get(value)
    }

    // иначе, если запрашиваемое свойство не является собственным
    else if (!target.hasOwnProperty(key)) {
      // если запрашивается метод "toString" или один из игнорируемых методов массива
      if (key === 'toString' || (Array.isArray(target) && ignoredMethods.has(key))) {
        // создать наблюдаемый прокси запрашиваемого метода
        return addObserver.call(this.#SERVICE.host, value)
      }

      // иначе, вернуть значение свойства
      return value
    }

    // если обрабатываются узлы компонента
    if (this.#SERVICE.nodes.length) {
      // сохранить самый верхний обрабатываемый узел
      const node = this.#SERVICE.nodes[0]

      // если имеются зависимости для родительского объекта
      if (this.#deps) {
        // добавить узел во множество зависимостей
        this.#deps.add(node)
      }

      // получить объект зависимостей для целевого объекта
      let deps = this.#SERVICE.dependencies.get(target)

      // если объект зависимостей отсутствует
      if (!deps) {
        // определить новый объект для зависимостей
        deps = {}

        // добавить его в хранилище зависимостей целевого объекта
        this.#SERVICE.dependencies.set(target, deps)
      }
      
      // получить зависимости для свойства объекта
      var dep = deps[key]

      // если зависимости отсутствует
      if (!dep) {
        // определить множество для хранения зависимостей
        dep = deps[key] = new Set()
      }

      // добавить обрабатываемый узел во множество
      dep.add(node)
    }

    // если значение Ложно и не является объектом или функцией
    if (!value || typeof value !== 'object' && typeof value !== 'function') {
      return value // вернуть значение свойства
    }

    // создать из значения свойства наблюдаемый прокси
    return addObserver.call(this.#SERVICE.host, value, dep)
  }


  // выполняется при установке значения свойству наблюдаемого объекта
  set(target, key, value, receiver) {
    // сохранить старое значение свойства
    const oldValue = Reflect.get(target, key, receiver)

    // если не удалось установить новое значение
    if (!Reflect.set(target, key, value, receiver)) {
      return false // вернуть Ложь
    }

    // удалить зависимости для старого значения
    this.#SERVICE.dependencies.delete(oldValue)

    // удалить наблюдаемый прокси для старого значения
    this.#SERVICE.values.delete(oldValue)

    // получить объект зависимостей для целевого объекта
    const deps = this.#SERVICE.dependencies.get(target)
    
    // если объект зависимостей отсутствует
    if (!deps) {
      return true // вернуть Истину
    }

    // получить зависимости для свойства объекта
    const dep = deps[key] || this.#deps
    
    // если имеются зависимости
    if (dep) {
      // вызвать обработчик для зависимостей
      callHandler.call(this.#SERVICE.host, dep)
    }

    return true // вернуть Истину
  }
}