/**
* Reacton v4.0.3
* (c) 2022-2024 | github.com/reacton-js
* Released under the MIT License.
**/
var Rtn = function () {
  'use strict';

  const regFile = /\.\w+$/;
  const regUpName = /[A-Z]/g;
  const regParams = /:(\w+)/g;
  const regSubtins = /{{([^{}]*?)}}/;
  const regQuote = /('|"|`)[^]*?\1/g;
  const regLeft = /;|\bof\b|\bin\b/;
  const regVars = /\b[A-Za-z_]\w*?\b/g;
  const SERVICE = new WeakMap();
  const newDocument = new DOMParser().parseFromString('', 'text/html');
  const globKeys = 'window,location,history,document,navigation,screen';
  const mainKeys = '$host,$shadow,$data,$state,$event,$router,$,$$,$entities';
  const getVars = str => str.replace(regQuote, '').split(regLeft)[0].match(regVars).join();
  const regEntities = [[/&/g, '&amp;'], [/</g, '&lt;'], [/>/g, '&gt;'], [/"/g, '&quot;'], [/'/g, '&#39;']];
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
  const getBools = Symbol();
  const getOwner = Symbol();
  const getDeps = Symbol();
  const getRoot = Symbol();
  const getObs = Symbol();
  const hasRoot = Symbol();
  const isLight = Symbol();
  const isFrag = Symbol();
  const isObj = Symbol();
  const isFor = Symbol();
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
      const time = arg.time;
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
            bools: new WeakMap(),
            exec: null,
            nodes: [],
            target,
            root,
            temp,
            time
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
          const service = SERVICE.get(this),
            {
              funs,
              bools,
              root,
              temp,
              state
            } = service;
          if (typeof arg.startConnect === 'function') {
            await arg.startConnect.call(state);
          }
          if (typeof arg.template === 'string') {
            temp.innerHTML = arg.template;
            prepareTemplate(service, temp);
            root.append(...temp.childNodes);
            new MutationObserver(records => {
              for (var rec of records) {
                for (var node of rec.removedNodes) {
                  removeCallbacks(node, funs, bools);
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
  const prepareTemplate = (service, node, vars) => {
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
            exec,
            nodes
          } = service;
          const cb = exec ? exec.call(state, arr[1].trim()) : getCallback(state, arr[1].trim());
          funs.set(node, cb);
          nodes.push(node);
          if (vars) {
            node[isFrag] = true;
            node.data = '';
            cb();
          } else {
            node.data = cb();
          }
          nodes.pop();
        } else {
          node.splitText(arr.index);
        }
      }
    } else if (node.nodeType === 2 && (node.nodeName[0] === ':' || node.nodeName[0] === '@' || node.nodeName === '$for')) {
      const {
        state,
        funs,
        bools,
        exec,
        nodes
      } = service;
      const owner = node.ownerElement,
        name = node.nodeName.slice(1);
      if (node.nodeName[0] === '$') {
        const value = node.value.trim(),
          iter = getCycle(state, value, exec);
        const strVars = vars ? vars + `,${getVars(value)}` : getVars(value);
        const saveExec = service.exec;
        service.exec = iter.next().value;
        for (var i = 0; i < owner.childNodes.length; i++) {
          prepareTemplate(service, owner.childNodes[i], strVars) || i--;
        }
        service.exec = saveExec;
        const frag = new DocumentFragment();
        frag.append(...owner.childNodes);
        let obj = {
          iter,
          frag,
          wrap: {
            childNodes: []
          },
          len: frag.childNodes.length
        };
        funs.set(owner, obj);
        nodes.push(owner);
        if (!vars) {
          while (!iter.next().value) {
            owner.append(updateDOM(funs, frag.cloneNode(true), frag));
          }
        } else {
          owner[isFor] = true;
        }
        nodes.pop();
      } else {
        const cb = exec ? exec.call(state, node.value.trim()) : getCallback(state, node.value.trim());
        if (node.nodeName[0] === ':') {
          if (name === 'is') {
            // ------------------------ code ------------------------
          } else if (typeof owner[name] === 'boolean') {
            let deps,
              obj = {
                [getOwner]: owner,
                name
              };
            funs.set(obj, cb);
            nodes.push(obj);
            if (vars) {
              deps = owner[getBools];
              if (!deps) {
                deps = new Set();
                owner[getBools] = deps;
              }
              cb();
            } else {
              deps = bools.get(owner);
              if (!deps) {
                deps = new Set();
                bools.set(owner, deps);
              }
              if (cb()) {
                owner[name] = true;
              }
            }
            deps.add(obj);
            nodes.pop();
          } else {
            owner.setAttribute(name, '');
            const attr = owner.attributes[name];
            funs.set(attr, cb);
            nodes.push(attr);
            if (vars) {
              attr[isFrag] = true;
              attr.value = '';
              cb();
            } else {
              attr.value = cb();
            }
            nodes.pop();
          }
        } else {
          const arr = name.split('.');
          const props = arr.slice(1).reduce((obj, key) => (obj[key] = true, obj), {});
          owner.addEventListener(arr[0], cb, props);
        }
      }
      return owner.removeAttribute(node.nodeName);
    } else {
      if (node.attributes) {
        for (var i = 0, attrs = node.attributes, hasAttr = attrs['$for']; i < attrs.length; i++) {
          prepareTemplate(service, attrs[i], vars) || i--;
        }
      }
      if (!hasAttr) {
        for (var i = 0, childs = node.childNodes; i < childs.length; i++) {
          prepareTemplate(service, childs[i], vars) || i--;
        }
      }
    }
    return node;
  };
  const removeCallbacks = (node, funs, bools) => {
    funs.delete(node);
    if (node.nodeType === 1) {
      const deps = bools.get(node);
      if (deps) {
        for (var bool of deps) {
          funs.delete(bool);
        }
        deps.clear();
        bools.delete(node);
      }
    }
    if (node.attributes) {
      for (var i = 0; i < node.attributes.length; i++) {
        removeCallbacks(node.attributes[i], funs);
      }
    }
    for (var i = 0; i < node.childNodes.length; i++) {
      removeCallbacks(node.childNodes[i], funs, bools);
    }
  };
  const getCallback = (state, str) => typeof state[str] === 'function' ? event => state[str].call(state, event) : Function(globKeys, `const {${mainKeys}} = this${state[getAlias] ? `,${state[getAlias]} = this\n` : '\nwith ($host) with (this)'} return event => {'use strict'\nreturn ${str}}`).call(state);
  const getGenerator = str => `(function*(){ yield function(){ return eval('event => ' + arguments[0]) }\nwhile (true){ for (var ${str}) yield; yield true }})`;
  const getCycle = (state, str, exec) => (exec ? exec.call(state, getGenerator(str))() : getCallback(state, getGenerator(str))()).call(state);
  const updateCycle = (funs, node, cb) => {
    let idx = 0,
      {
        iter,
        frag,
        wrap,
        len
      } = cb,
      childs = node.childNodes;
    while (!iter.next().value) {
      if (childs[idx]) {
        for (var i = 0; i < len; i++) {
          wrap.childNodes[i] = childs[i + idx];
        }
        updateDOM(funs, wrap, frag);
      } else {
        node.append(updateDOM(funs, frag.cloneNode(true), frag));
      }
      idx += len;
    }
    if (idx < childs.length) {
      for (var i = childs.length; i > idx; i--) {
        node.lastChild.remove();
      }
    }
    wrap.childNodes.length = 0;
  };
  const updateDOM = (funs, node, frag) => {
    if (frag[isFrag]) {
      node.nodeValue = funs.get(frag)();
    } else {
      if (frag.attributes) {
        for (var i = 0; i < frag.attributes.length; i++) {
          updateDOM(funs, node.attributes[i], frag.attributes[i]);
        }
        if (frag[getBools]) {
          for (var bool of frag[getBools]) {
            node[bool.name] = funs.get(bool)() ? true : false;
          }
        }
      }
      if (frag[isFor]) {
        updateCycle(funs, node, funs.get(frag));
      } else {
        for (var i = 0; i < frag.childNodes.length; i++) {
          updateDOM(funs, node.childNodes[i], frag.childNodes[i]);
        }
      }
    }
    return node;
  };
  const callHandler = (dep, {
    funs,
    nodes,
    time
  }) => {
    if (time) {
      var start = performance.now();
    }
    for (var node of dep) {
      var cb = funs.get(node);
      if (cb) {
        if (nodes) {
          nodes.push(node);
        }
        if (node.nodeType === 1) {
          updateCycle(funs, node, cb);
        } else if (node[getOwner]) {
          node[getOwner][node.name] = cb() ? true : false;
        } else {
          node.nodeValue = cb();
        }
        if (nodes) {
          nodes.pop();
        }
      } else {
        dep.delete(node);
      }
    }
    if (time) {
      console.log(performance.now() - start + ' ms');
    }
  };
  const getObserver = (obj, service, deps) => {
    const proxy = new Proxy(obj, new Hooks(service, deps));
    service.obrs.set(obj, proxy);
    return proxy;
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
          if ((this[isObj] = typeof target[prop] === 'object' && target[prop] !== null) || target === this[propService].target) {
            let dep,
              deps = this[propService].deps.get(target);
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
            if (this[isObj]) {
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
      if (this[getDeps] = this[getDeps] && this[getDeps][prop] || this[propDeps]) {
        if (typeof target[prop] === 'object' && target[prop] !== null) {
          this[propService].obrs.delete(target[prop]);
        }
        if (target[prop] === undefined && Array.isArray(target)) {
          target.splice(prop, 0, value);
        } else {
          target[prop] = value;
        }
        if (!this[propService].nodes.length) {
          callHandler(this[getDeps], this[propService]);
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
            callHandler(this[propDeps], this[propService]);
          }
        }
        return thisArg;
      }
      return target.apply(thisArg, args);
    }
    deleteProperty(target, prop) {
      this[getDeps] = this[propService].deps.get(target);
      if (this[getDeps] = this[getDeps] && this[getDeps][prop] || this[propDeps]) {
        if (typeof target[prop] === 'object' && target[prop] !== null) {
          this[propService].obrs.delete(target[prop]);
        }
        const inv = Array.isArray(target) ? !!target.splice(prop, 1).length : !(target[prop] = undefined);
        if (!this[propService].nodes.length) {
          callHandler(this[getDeps], this[propService]);
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
  return _rtn;
}();