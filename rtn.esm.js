/**
* Reacton v4.0.1
* (c) 2022-2024 | github.com/reacton-js
* Released under the MIT License.
**/
const regUpName = /[A-Z]/g;
const regParams = /:(\w+)/g;
const regSubtins = /{{([^{}]*?)}}/;
const regFile = /\.\w+$/;
const SERVICE = new WeakMap();
const newDocument = new DOMParser().parseFromString('', 'text/html');
const regEntities = [[/&/g, '&amp;'], [/</g, '&lt;'], [/>/g, '&gt;'], [/"/g, '&quot;'], [/'/g, '&#39;']];
const globKeys = 'window,location,history,document,navigation,screen';
const mainKeys = '$host,$shadow,$data,$state,$event,$router,$,$$,$entities';
const methNames = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse', 'toString', 'add', 'set', 'delete', 'clear'];
const methProxy = methNames.reduce((obj, prop) => (obj[prop] = true, obj), {});
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const getNameKebab = (char, pos) => (pos > 0 ? '-' : '') + char;
const loadEvent = new DocumentFragment();
const rootStorage = new Set();
const propService = Symbol();
const propRouter = Symbol();
const propDeps = Symbol();
const getTarget = Symbol();
const getAlias = Symbol();
const getOwner = Symbol();
const getBools = Symbol();
const getDeps = Symbol();
const getRoot = Symbol();
const getObs = Symbol();
const hasRoot = Symbol();
const isObject = Symbol();
const isLight = Symbol();
const configMutations = {
  childList: true,
  subtree: true
};
async function _rtn(...args) {
  for (let arg of args) {
    if (arg instanceof HTMLTemplateElement) {
      const content = arg.content;
      const scripts = [...content.querySelectorAll('script')].map(script => content.removeChild(script).innerHTML).join('');
      const _class = await (scripts ? new AsyncFunction(scripts)() : null);
      if (typeof _class !== 'function') {
        console.error(`Error: return value "${_class}" is not a class`);
        continue;
      }
      _class.template = arg.innerHTML;
      arg = _class;
    } else if (typeof arg !== 'function') {
      console.error(`Error: argument "${arg}" is not a class or <template> element`);
      continue;
    }
    const name = arg.name.replace(regUpName, getNameKebab).toLocaleLowerCase();
    const mode = arg.mode ? arg.mode.toLocaleLowerCase() : arg.mode;
    const extend = arg.extends ? arg.extends.toLocaleLowerCase() : arg.extends;
    const serializable = arg.hasOwnProperty('serializable') ? arg.serializable : false;
    const SUPERElement = extend ? Object.getPrototypeOf(document.createElement(extend)).constructor : HTMLElement;
    const alias = arg.alias;
    customElements.define(name, class extends SUPERElement {
      constructor() {
        super();
        rootStorage.add(this);
        const target = new arg();
        const root = mode ? this.attachShadow({
          mode,
          serializable
        }) : this;
        const temp = new DOMParser().parseFromString('', 'text/html').body;
        const service = {
          funs: new WeakMap(),
          deps: new WeakMap(),
          obrs: new WeakMap(),
          nodes: [],
          target,
          root,
          temp
        };
        SERVICE.set(this, service);
        const state = new Proxy(getObserver(target, service), {
          get: (target, prop) => {
            if (prop === getRoot) {
              return root;
            } else if (prop === getAlias) {
              return alias;
            } else if (prop in target) {
              return target[prop];
            }
            return this[prop];
          }
        });
        Object.defineProperties(this, {
          $host: {
            value: this
          },
          $shadow: {
            value: this.shadowRoot
          },
          $data: {
            value: this.dataset
          },
          $state: {
            value: new Proxy(state, {
              get: (target, prop) => {
                if (mode !== 'closed') {
                  return target[prop];
                }
              },
              set: (target, prop, value) => {
                if (mode === 'closed') {
                  throw new Error('cannot change the state of a closed component');
                }
                target[prop] = value;
                return true;
              }
            })
          },
          [isLight]: {
            value: root === this
          }
        });
        service.state = state;
      }
      async connectedCallback() {
        const {
          funs,
          root,
          temp,
          state
        } = SERVICE.get(this);
        if (typeof arg.startConnect === 'function') {
          await arg.startConnect.call(state);
        }
        if (typeof arg.template === 'string') {
          temp.innerHTML = arg.template;
          prepareTemplate.call(this, temp);
          root.append(...temp.childNodes);
          new MutationObserver(records => {
            for (var rec of records) {
              for (var node of rec.removedNodes) {
                removeCallbacks(node, funs);
              }
            }
          }).observe(root, configMutations);
        }
        if (typeof arg.connected === 'function') {
          arg.connected.call(state);
        }
        setTimeout(() => {
          rootStorage.delete(this);
          if (rootStorage.size === 0) {
            loadEvent.dispatchEvent(new CustomEvent('load'));
          }
        }, 1);
      }
      disconnectedCallback() {
        if (typeof arg.disconnected === 'function') {
          arg.disconnected.call(SERVICE.get(this).state);
        }
      }
      adoptedCallback() {
        if (typeof arg.adopted === 'function') {
          arg.adopted.call(SERVICE.get(this).state);
        }
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if (typeof arg.changed === 'function') {
          if (oldValue !== null) {
            arg.changed.call(SERVICE.get(this).state, name, oldValue, newValue);
          }
        }
      }
      static get observedAttributes() {
        if (Array.isArray(arg.attributes)) {
          return arg.attributes;
        }
      }
      get $event() {
        return _rtn.event;
      }
      get $router() {
        return _rtn.router;
      }
      get [hasRoot]() {
        return true;
      }
      $(sel) {
        return (this[getRoot] || this.$shadow || this).querySelector(sel);
      }
      $$(sel) {
        return (this[getRoot] || this.$shadow || this).querySelectorAll(sel);
      }
      $entities(...args) {
        return _rtn.entities(...args);
      }
    }, extend ? {
      extends: extend
    } : null);
  }
}
function prepareTemplate(node) {
  if (node.nodeType === 8) {
    return node.remove();
  } else if (node.nodeType === 3) {
    const arr = regSubtins.exec(node.data);
    if (arr) {
      if (arr.index === 0) {
        node.splitText(arr[0].length);
        const {
          state,
          funs,
          nodes
        } = SERVICE.get(this);
        const cb = getCallback(state, arr[1].trim());
        funs.set(node, cb);
        nodes.push(node);
        node.data = cb();
        nodes.pop();
      } else {
        node.splitText(arr.index);
      }
    }
  } else if (node.nodeType === 2 && (node.nodeName[0] === ':' || node.nodeName[0] === '@')) {
    const owner = node.ownerElement;
    const name = node.nodeName.slice(1);
    const {
      state,
      funs,
      nodes
    } = SERVICE.get(this);
    const cb = getCallback(state, node.value.trim());
    if (node.nodeName[0] === ':') {
      if (typeof owner[name] === 'boolean') {
        const obj = {
          [getOwner]: owner,
          name
        };
        funs.set(obj, cb);
        nodes.push(obj);
        if (cb()) {
          owner[name] = true;
        }
        nodes.pop();
        let bools = owner[getBools];
        if (!bools) {
          bools = new Set();
          Object.defineProperty(owner, getBools, {
            value: bools
          });
        }
        bools.add(obj);
      } else {
        owner.setAttribute(name, '');
        const attr = owner.attributes[name];
        funs.set(attr, cb);
        nodes.push(attr);
        attr.value = cb();
        nodes.pop();
      }
    } else {
      const arr = name.split('.');
      const props = arr.slice(1).reduce((obj, key) => (obj[key] = true, obj), {});
      owner.addEventListener(arr[0], cb, props);
    }
    return owner.removeAttribute(node.nodeName);
  } else {
    if (node.attributes) {
      for (var i = 0; i < node.attributes.length; i++) {
        prepareTemplate.call(this, node.attributes[i]) || i--;
      }
    }
    for (var i = 0; i < node.childNodes.length; i++) {
      prepareTemplate.call(this, node.childNodes[i]) || i--;
    }
  }
  return true;
}
const removeCallbacks = (node, funs) => {
  if (node.nodeType === 1) {
    const bools = node[getBools];
    if (bools) {
      for (var bool of bools) {
        funs.delete(bool);
      }
      bools.clear();
    }
  } else {
    funs.delete(node);
  }
  if (node.attributes) {
    for (var i = 0; i < node.attributes.length; i++) {
      removeCallbacks(node.attributes[i], funs);
    }
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    removeCallbacks(node.childNodes[i], funs);
  }
};
const getCallback = (state, str, value = state[str]) => {
  return typeof value === 'function' ? event => value.call(state, event) : Function(globKeys, `const{${mainKeys}}=this${state[getAlias] ? ',' + state[getAlias] + '=this\n' : '\nwith($host)with(this)'}return event=>{'use strict'\nreturn ${str}}`).call(state);
};
const getObserver = (obj, service, deps) => {
  const proxy = new Proxy(obj, new Hooks(service, deps));
  service.obrs.set(obj, proxy);
  return proxy;
};
const callHandler = (dep, funs, nodes) => {
  for (var node of dep) {
    if (nodes) {
      nodes.push(node);
    }
    if (node[getOwner]) {
      funs.get(node)() ? node[getOwner][node.name] = true : node[getOwner][node.name] = false;
    } else {
      node.nodeValue = funs.get(node)();
    }
    if (nodes) {
      nodes.pop();
    }
  }
};
class Hooks {
  constructor(service, deps) {
    this[propService] = service;
    this[propDeps] = deps;
  }
  get(target, prop) {
    if (target.hasOwnProperty(prop) || methProxy[prop]) {
      this[getObs] = this[propService].obrs.get(target[prop]);
      if (this[getObs]) {
        return this[getObs];
      } else if (this[propService].nodes.length) {
        this[isObject] = typeof target[prop] === 'object' && target[prop] !== null;
        if (this[isObject] || target === this[propService].target) {
          let deps = this[propService].deps.get(target),
            dep;
          if (!deps) {
            deps = methProxy[prop] ? {
              [prop]: null
            } : {};
            this[propService].deps.set(target, deps);
          }
          dep = deps[prop];
          if (!dep) {
            dep = deps[prop] = new Set();
          }
          dep.add(this[propService].nodes[0]);
          if (this[isObject]) {
            return getObserver(target[prop], this[propService], dep);
          }
        }
      }
      if (methProxy[prop]) {
        this[getTarget] = target;
        return new Proxy(target[prop], this);
      }
    }
    return target[prop];
  }
  set(target, prop, value) {
    this[getDeps] = this[propService].deps.get(target);
    this[getDeps] = this[getDeps] && this[getDeps][prop] || this[propDeps];
    if (this[getDeps]) {
      if (typeof target[prop] === 'object' && target[prop] !== null) {
        this[propService].obrs.delete(target[prop]);
      }
      if (target[prop] === undefined && Array.isArray(target)) {
        target.splice(prop, 0, value);
      } else {
        target[prop] = value;
      }
      if (!this[propService].nodes.length) {
        callHandler(this[getDeps], this[propService].funs, this[propService].nodes);
      }
    } else {
      target[prop] = value;
    }
    return true;
  }
  apply(target, thisArg, args) {
    if (target.name === 'toString') {
      const type = this[getTarget] instanceof Map ? 'Map' : this[getTarget] instanceof Set ? 'Set' : '';
      return JSON.stringify(type ? {
        [type]: [...this[getTarget]]
      } : thisArg, null, ' ');
    } else if (methProxy[target.name]) {
      target.apply(this[getTarget], args);
      if (this[propDeps]) {
        if (!this[propService].nodes.length) {
          callHandler(this[propDeps], this[propService].funs, this[propService].nodes);
        }
      }
      return thisArg;
    }
    return target.apply(thisArg, args);
  }
  deleteProperty(target, prop) {
    this[getDeps] = this[propService].deps.get(target);
    this[getDeps] = this[getDeps] && this[getDeps][prop] || this[propDeps];
    if (this[getDeps]) {
      if (typeof target[prop] === 'object' && target[prop] !== null) {
        this[propService].obrs.delete(target[prop]);
      }
      const inv = Array.isArray(target) ? !!target.splice(prop, 1).length : !(target[prop] = undefined);
      if (!this[propService].nodes.length) {
        callHandler(this[getDeps], this[propService].funs, this[propService].nodes);
      }
      return inv;
    } else {
      return delete target[prop];
    }
  }
}
_rtn.entities = function (str, ...args) {
  return (args.length ? [...regEntities, ...args] : regEntities).reduce((prev, item) => prev.replace(...item), str);
};
_rtn.event = function (elem, name, detail = null) {
  if (new.target) {
    return new DocumentFragment();
  }
  elem.dispatchEvent(new CustomEvent(name, {
    detail
  }));
};
_rtn.router = function (elem, href, detail = null) {
  if (new.target) {
    const vals = {},
      regs = new Map();
    const elem = new class extends DocumentFragment {
      addEventListener(...args) {
        regs.set(new RegExp(`^/?${args[0].replace(regParams, (_, par) => `(?<${par}>\\w+)`)}/?$`), args[0]);
        document.addEventListener.call(this, ...args);
      }
    }();
    elem[propRouter] = {
      idx: 0,
      vals,
      regs
    };
    window.addEventListener('popstate', event => {
      routerCallback(elem, location.href, vals[event.state]);
    });
    return elem;
  }
  if (!href || !href.startsWith(location.origin) || regFile.test(href)) {
    return;
  }
  const props = elem[propRouter];
  history.pushState(props.idx, '', href);
  props.vals[props.idx++] = detail;
  routerCallback(elem, href, detail);
};
function routerCallback(elem, href, detail) {
  const regs = elem[propRouter].regs;
  const path = href.replace(location.origin, '');
  for (const [reg, name] of regs) {
    const result = reg.exec(path);
    if (result) {
      const event = new CustomEvent(name, {
        detail
      });
      event.url = new URL(href);
      event.params = result.groups;
      event.search = event.url.searchParams;
      elem.dispatchEvent(event);
    }
  }
}
_rtn.render = async function ({
  parent = document.children[0],
  slots = false,
  clean = true
} = {}) {
  await new Promise(ok => loadEvent.addEventListener('load', ok));
  const template = document.createElement('template');
  renderCallback(parent, template.content, slots, clean);
  return parent === document.children[0] ? `<!DOCTYPE html>\n${template.innerHTML}` : template.innerHTML;
};
function renderCallback(inNode, outNode, slots, clean) {
  if (clean && (inNode.nodeName === 'STYLE' || inNode.nodeName === 'SCRIPT' || inNode.nodeName === 'TEMPLATE' || inNode.nodeType === 8)) return;
  let cloneNode;
  if (inNode.nodeName === 'SLOT' && !slots) {
    cloneNode = new DocumentFragment();
  } else if (inNode[hasRoot]) {
    cloneNode = newDocument.createElement(inNode.nodeName);
    for (var attr of inNode.attributes) {
      cloneNode.setAttribute(attr.name, attr.value);
    }
    if (!inNode[isLight]) {
      inNode = SERVICE.get(inNode).root;
    }
  } else {
    cloneNode = inNode.cloneNode(false);
  }
  const childs = inNode.assignedNodes ? inNode.assignedNodes({
    flatten: false
  }) : (inNode.content || inNode).childNodes;
  if (childs) {
    for (var i = 0; i < childs.length; i++) {
      renderCallback(childs[i], cloneNode.content || cloneNode, slots, clean);
    }
  }
  outNode.append(cloneNode);
}
export default _rtn;
export const Event = _rtn.event;
export const Router = _rtn.router;
export const Render = _rtn.render;
export const Entities = _rtn.entities;