// ---------------------------------- Reacton ----------------------------------

const arrayObjects = []
const STORE = new WeakMap()
const storeParams = new WeakMap()
const customNames = new Set()
const GFunction = Function('return function*(){}')().constructor
const regFile = /\.html?$/
const propNames = '$data,$root,$host,$,$$,$when,$mixins,$params,$event,$router'
const hook = {
  get(target, key, receiver) {
    return target.$data.hasOwnProperty(key) ? Reflect.get(target.$data, key, receiver) : Reflect.get(target, key)
  }
}

export default window.Reacton = async function Reacton(...args) {
  arrayObjects.splice(0)

  args.forEach(object => arrayObjects.push(new Promise(async ready => {

    if (object instanceof HTMLElement) object = await convert(object)
    else if (typeof object === 'string') {
      if (regFile.test(object)) {
        const array = await load(object)
        return ready(array)
      }
      const wrapper = document.createElement('template')
      wrapper.innerHTML = object.trim()
      object = await convert(wrapper.content.removeChild(wrapper.content.firstChild))
    }

    const { name, data, dataset, html = '', mode, extends:extend = '',
      connected, disconnected, adopted, attributes, changed, before, after } = object,
      SUPERElement = extend ? Object.getPrototypeOf(document.createElement(extend)).constructor : HTMLElement

    const template = document.createElement('template')
    template.innerHTML = html
    clear(template.content)
    
    class Component extends SUPERElement {
      #root
      
      constructor() {
        super()
        this.$data = {}
        this.$host = this
        const store = {}
        store.values = new WeakMap()
        store.depends = new WeakMap()
        store.handlers = new WeakMap()
        store.listeners = new WeakMap()
        if (this.dataset.Params) {
          const params = storeParams.get(this.attributes['data--params'])
          this.$params = params.proxy
          store.nodes = params.nodes
          store.callbacks = params.callbacks
        }
        else {
          store.nodes = []
          store.callbacks = new WeakMap()
        }
        if (Reacton.hasOwnProperty('mixins')) {
          this.$mixins = Reacton.mixins
        }
        for (const key in dataset) {
          this.dataset[key] = dataset[key]
        }
        if (typeof before === 'function') {
          store.before = before
        }
        if (typeof after === 'function') {
          store.after = after
        }
        STORE.set(this, store)
        customNames.add(name.toUpperCase())
      }

      get $root() {
        return this.shadowRoot
      }

      async connectedCallback() {
        let isDada = false
        if (typeof data === 'function') {
          this.$data = observable.call(this, Object.assign(this.$data, await data.call(this)), getHandlers.call(this))
          isDada = true
        }
        STORE.get(this).iterator = GFunction(`{${propNames}}=this`, `with(this.$data)while(true)arguments[0]=yield eval(arguments[0])`)
          .call(new Proxy(this, hook))
        
        STORE.get(this).iterator.next()
        this.#root = react.call(this, template.content.cloneNode(true))
        if (typeof connected === 'function') {
          await connected.call(this)
        }
        const root = mode ? this.attachShadow({ mode }) : this
        root.append(this.#root)
        this.#root = root
        if (!isDada) {
          delete this.$data
        }
        ready(this)
      }
      
      async disconnectedCallback() {
        if (typeof disconnected === 'function') {
          await disconnected.call(this)
        }
      }

      async adoptedCallback() {
        if (typeof adopted === 'function') {
          await adopted.call(this)
        }
      }

      static get observedAttributes() {
        if (Array.isArray(attributes)) {
          return attributes
        }
      }

      async attributeChangedCallback(...args) {
        if (typeof changed === 'function') {
          await changed.call(this, ...args)
        }
      }

      $(selector) {
        return mode !== 'closed' ? this.#root.querySelector(selector) : null
      }
      
      $$(selector) {
        return mode !== 'closed' ? this.#root.querySelectorAll(selector) : null
      }

      $event(name, props) {
        (this || document).dispatchEvent(new CustomEvent(name, props))
      }

      $when(name) {
        return customElements.whenDefined(name)
      }

      $router(...args) {
        router.call(this, ...args)
      }
    }
    
    customElements.define(name, Component, extend ? { extends: extend } : null)
    setTimeout(() => customElements.whenDefined(name).then(() => !customNames.has(name.toUpperCase()) ? ready() : null), 0)
  })))

  const array = await Promise.all(arrayObjects)
  return array.flat().filter(Boolean)
}


// ---------------------------------- Load ----------------------------------

export function load(str) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', str)
  xhr.send()
  return new Promise(ready => xhr.onload = () => {
    const templates = document.createElement('template')
    templates.innerHTML = xhr.response
    ready(Reacton(...templates.content.children))
  })
}


// ---------------------------------- Convert ----------------------------------

async function convert(node) {
  const content = node.content || node
  const scripts = [...content.querySelectorAll('script')].map(script => content.removeChild(script).innerHTML).join('')
  const exports = Function(`var exports\n${scripts}\nreturn exports`)()
  const html = node.innerHTML
  const dataset = {}
  for (const key in node.dataset) {
    dataset[key] = node.dataset[key]
  }
  return Object.assign({
    name: node.getAttribute('name') || node.nodeName.toLowerCase(),
    mode: node.getAttribute('mode') || undefined,
    extends: node.getAttribute('extends') || undefined,
    dataset,
    html
  }, exports)
}


// ---------------------------------- handler ----------------------------------

function* updateCycle(fragment, vars) {
  const length = fragment.childNodes.length
  while (true) {
    const parent = fragment.parent
    if (!parent.childNodes[fragment.index]) {
      parent.append(react.call(this, fragment.cloneNode(true), fragment, vars))
    }
    else for (var i = 0; i < length; i++) {
      changeCycle.call(this, parent.childNodes[fragment.index + i], fragment.childNodes[i])
    }
    fragment.index += length
    yield
  }
}

function changeCycle(node, frag) {
  if (node.nodeValue) {
    if (node.nodeName.startsWith('data--on')) {
      handler.call(this, node)
    }
    else if (STORE.get(this).callbacks.has(frag)) {
      if (!node.nodeName.startsWith('data--')) {
        node.nodeValue = STORE.get(this).callbacks.get(frag)()
      }
      else {
        handler.call(this, node, frag)
      }
    }
  }
  else {
    if (node.attributes) {
      for (var i = 0; i < node.attributes.length; i++) {
        changeCycle.call(this, node.attributes[i], frag.attributes[i])
      }
      if (node.attributes['data--for']) {
        return node
      }
    }
    for (var i = 0; i < node.childNodes.length; i++) {
      changeCycle.call(this, node.childNodes[i], frag.childNodes[i])
    }
  }
}

function handler(node, frag) {
  const result = STORE.get(this).callbacks.get(frag || node)
  if (node.nodeName === 'data--for') {
    if (STORE.get(this).iterator !== result.iterator) {
      const saveIterator = STORE.get(this).iterator
      const { environment, iterator, fragment } = result
      const parent = node.ownerElement
      STORE.get(this).iterator = iterator
      fragment.parent = parent
      fragment.index = 0
      environment.next()
      for (var i = parent.childNodes.length; i > fragment.index; i--) {
        parent.lastChild.remove()
      }
      STORE.get(this).iterator = saveIterator
    }
  }
  else if (node.nodeName.startsWith('data--on')) {
    let { name, closure, opts } = result
    node.ownerElement.removeEventListener(name, STORE.get(this).listeners.get(node), opts)
    const listener = closure()
    STORE.get(this).listeners.set(node, listener)
    node.ownerElement.addEventListener(name, listener, opts)
  }
  else if (node.nodeName === 'data--view') {
    const view = result()
    if (view) {
      const { name = view, content = '' } = view
      const parent = node.ownerElement
      parent.removeAttribute('is')
      const tag = parent.nodeName
      const wrapper = document.createElement('template')
      wrapper.innerHTML = `<${tag} is="${name}">${content}</${tag}>`
      const element = wrapper.content.firstChild
      for (var i = 0; i < parent.attributes.length; i++) {
        element.setAttributeNode(parent.removeAttributeNode(parent.attributes[i--]))
      }
      parent.replaceWith(element)
    }
  }
  else if (node.nodeName.startsWith('data--')) {
    result() ? node.ownerElement.setAttribute(node.nodeName.slice(6), '') : node.ownerElement.removeAttribute(node.nodeName.slice(6))
  }
  else {
    node.nodeValue = result()
  }
}


// ---------------------------------- React ----------------------------------

const regFix = /{{([^{}]*?)}}/g
const regBQuote = /(\\*?)`/g
const regLeft = /;|\bof\b|\bin\b/
const regVars = /\b[A-Za-z_]\w*?\b/g

function setCallback(node, frag, value) {
  if (typeof value === 'object') {
    STORE.get(this).callbacks.set(frag || node, value)
  }
  else {
    STORE.get(this).callbacks.set(frag || node, STORE.get(this).iterator.next(`event=>${value}`).value)
  }
  STORE.get(this).nodes.push(node)
  handler.call(this, node, frag)
  STORE.get(this).nodes.pop()
}

function react(node, frag, vars) {
  if (node.nodeName.startsWith('data--for')) {
    const fragment = new DocumentFragment()
    while (node.ownerElement.firstChild) {
      fragment.append(node.ownerElement.firstChild)
    }
    const environment = STORE.get(this).iterator.next('(function*(){arguments[0]=yield function*(){while(true)arguments[0]=yield eval(arguments[0])};' + 
      `while(true){yield;for(var ${node.value})arguments[0].next()}})`).value()
      
    const iterator = environment.next().value.call(this.$data)
    iterator.next()
    environment.next(updateCycle.call(this, fragment, node.nodeValue.split(regLeft)[0].match(regVars).join()))
    setCallback.call(this, node, frag, { environment, iterator, fragment })
  }
  else if (node.nodeName.startsWith('data--on')) {
    const array = node.nodeName.split('.')
    const name = array.shift().slice(8)
    const opts = array.reduce((obj, prop) => {
      obj[prop] = true
      return obj
    }, {})
    if (vars) {
      const closure = STORE.get(this).iterator.next(`()=>((${vars})=>event=>${node.nodeValue})(${vars})`).value
      STORE.get(this).callbacks.set(node, { name, closure, opts })
      handler.call(this, node)
    }
    else {
      const listener = STORE.get(this).iterator.next(`event=>${node.nodeValue}`).value
      node.ownerElement.addEventListener(name, listener, opts)
    }
  }
  else if (node.nodeName.startsWith('data--params')) {
    const setNames = new Set()
    for (let name of node.value.split(',')) {
      setNames.add(name.trim())
    }
    storeParams.set(node, {
      proxy: new Proxy(this.$data, {
        get (target, key, receiver) {
          return setNames.has(key) ? Reflect.get(target, key, receiver) : undefined
        },
        set (target, key, value, receiver) {
          return setNames.has(key) ? Reflect.set(target, key, value, receiver) : false
        }
      }),
      nodes: STORE.get(this).nodes,
      callbacks: STORE.get(this).callbacks
    })
  }
  else if (node.nodeName.startsWith('data--')) {
    setCallback.call(this, node, frag, node.nodeValue)
  }
  else if (node.nodeValue && regFix.test(node.nodeValue)) {
    if (node.nodeType === 2) {
      const value = node.value.replace(regBQuote, (match, fix) => {
        return fix.length % 2 ? match : `\\${match}`
      }).replace(regFix, (_, fix) => {
        return `\${${fix}}`
      })
      setCallback.call(this, node, frag, `\`${value}\``)
    }
    else if (node.nodeType === 3) {
      setCallback.call(this, node, frag, node.data.replace(regFix, (_, fix) => fix))
    }
  }
  else {
    if (node.attributes) {
      for (var i = 0; i < node.attributes.length; i++) {
        react.call(this, node.attributes[i], frag ? frag.attributes[i] : null, vars)
      }
      if (node.attributes['data--for']) {
        return node
      }
    }
    for (var i = 0; i < node.childNodes.length; i++) {
      react.call(this, node.childNodes[i], frag ? frag.childNodes[i] : null, vars)
    }
  }
  return node
}


// ---------------------------------- Clear ----------------------------------

function clear(node) {
  if (node.nodeType === 8 || node.nodeType === 3 && !node.data.trim()) {
    return node.remove()
  }
  else if (node.nodeName[0] === '$' || node.nodeName[0] === '@') {     
    const attr = document.createAttribute(`data--${node.nodeName[0] === '@' ? 'on' : ''}${node.nodeName.slice(1)}`)
    attr.value = node.value
    node.ownerElement.setAttributeNode(attr)
    return node.ownerElement.removeAttribute(node.nodeName)
  }
  else if (node.nodeType === 3) {
    const objReg = regFix.exec(node.data)
    if (objReg) {
      node.splitText(objReg.index || objReg[0].length)
    }
    regFix.lastIndex = 0
  }
  else {
    if (node.attributes) for (var i = 0; i < node.attributes.length; i++) {
      clear(node.attributes[i]) || i--
    }
    for (var i = 0; i < node.childNodes.length; i++) {
      clear(node.childNodes[i]) || i--
    }
  }
  return node
}


// ---------------------------------- Observe ----------------------------------

const methodNames = new Set(['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'])

function notify(deps) {
  if (STORE.get(this).before) {
    STORE.get(this).before()
  }
  for (var node of deps) {
    handler.call(this, node)
  }
  if (STORE.get(this).after) {
    STORE.get(this).after()
  }
}

class Handlers {
  #env
  #rely
  #array
  #store
  constructor(env, rely, array) {
    this.#env = env
    this.#rely = rely
    this.#array = array
    this.#store = STORE.get(this.#env)
  }
  apply(target, thisArg, args) {
    if (target.name === 'toString') {
      return JSON.stringify(thisArg, null, ' ')
    }
    target.apply(this.#array, args)
    if (this.#rely) { 
      notify.call(this.#env, this.#rely)
    }
    return thisArg
  }
  get(target, key, receiver) {
    const value = Reflect.get(target, key, receiver)
    if (this.#store.values.has(value)) {
      return this.#store.values.get(value)
    }
    if (Array.isArray(target) && methodNames.has(key) || key === 'toString') {
      if (this.#store.handlers.has(target)) {
        return new Proxy(value, this.#store.handlers.get(target))
      }
      const handler = getHandlers.call(this.#env, this.#rely, target)
      this.#store.handlers.set(target, handler)
      return new Proxy(value, handler)
    }
    if (!target.hasOwnProperty(key)) {
      return value
    }
    if (this.#store.nodes.length) {
      const node = this.#store.nodes[0]
      if (this.#rely) {
        this.#rely.add(node)
      }
      let deps = this.#store.depends.get(target)
      if (!deps) {
        deps = {}
        this.#store.depends.set(target, deps)
      }
      var dep = deps[key]
      if (!dep) {
        dep = deps[key] = new Set()
      }
      dep.add(node)
    }
    if (!value || typeof value !== 'object') {
      return value
    }
    return observable.call(this.#env, value, getHandlers.call(this.#env, dep))
  }
  set(target, key, value, receiver) {
    if (!Reflect.set(target, key, value, receiver)) {
      return false
    }
    const deps = this.#store.depends.get(target)
    if (!deps) {
      return true
    }
    const dep = deps[key] || this.#rely
    if (dep) {
      notify.call(this.#env, dep)
    }
    return true
  }
}

function getHandlers(rely, array) {
  return new Handlers(this, rely, array)
}

function observable(obj, handlers) {
  const observed = new Proxy(obj, handlers)
  STORE.get(this).values.set(obj, observed)
  return observed
}


// ---------------------------------- Render ----------------------------------

function addNode(outNode, inNode, slots, index = 0) {
  if (inNode.nodeName === 'STYLE') {
    return false
  }
  else if (inNode.shadowRoot) {
    const node = addNode.document.createElement(inNode.nodeName)
    for (const attr of inNode.attributes) {
      node.setAttribute(attr.name, attr.value)
    }
    outNode.append(node)
  }
  else if (outNode.content) {
    outNode.content.append(inNode.cloneNode())
  }
  else {
    outNode.append(inNode.cloneNode())
    if (outNode.lastChild.nodeName === 'SLOT') {
      slots.add(outNode.lastChild)
    }
  }
  const outRoot = (outNode.content || outNode).childNodes[index]
  const childInNodes = inNode.nodeName === 'SLOT' ? inNode.assignedNodes({ flatten: true })
    : (inNode.shadowRoot || inNode.content || inNode).childNodes || inNode

  for (var i = 0, y = 0; i < childInNodes.length; i++, y++) {
    addNode(outRoot, childInNodes[i], slots, y) || y--
  }
  return true
}

export async function render(inNode = document.children[0]) {
  await Promise.all(arrayObjects)
  const outNode = document.createElement('template')
  if (!addNode.document) {
    addNode.document = document.implementation.createHTMLDocument()
  }
  const slots = new Set()
  addNode(outNode.content, inNode, slots)
  slots.forEach(slot => slot.replaceWith(...slot.childNodes))
  return inNode === document.children[0] ? `<!DOCTYPE html>\n${outNode.innerHTML}` : outNode.innerHTML
}

Reacton.render = render


// ---------------------------------- Router ----------------------------------

const regParams = /:(\w+)/g

function dispatch(element, paths, bubbles, cancelable, composed, detail) {
  const fullpath = location.href.replace(location.origin, '')
  Object.keys(paths).forEach(key => {
    const result = paths[key].exec(fullpath)
    if (result) {
      const event = new CustomEvent(key, { bubbles, cancelable, composed, detail })
      event.url = new URL(location.href)
      event.params = result.groups
      element.dispatchEvent(event)
    }
  })
}

export function router(element, events, props = {}) {
  const { once, capture, passive, bubbles, cancelable, composed, detail } = props
  const paths = {}

  for (const key in events) {
    element.addEventListener(key, events[key], { once, capture, passive })
    paths[key] = new RegExp(`^${key.replace(regParams, (_, param) => `(?<${param}>\\w+)`)}/?$`)
  }

  window.addEventListener('popstate', () => {
    dispatch(element, paths, bubbles, cancelable, composed, detail)
  }, { once, capture, passive })
  
  element.addEventListener('click', event => {
    const target = event.composedPath()[0]
    const href = target.getAttribute('href')

    if (!href || target.origin !== location.origin || /\.\w+$/.test(href)) return

    event.preventDefault()
    history.pushState(null, '', href)
    
    dispatch(element, paths, bubbles, cancelable, composed, detail)
  }, { once, capture, passive })
  
  dispatch(element, paths, bubbles, cancelable, composed, detail)
}