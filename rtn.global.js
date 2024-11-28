/**
* Reacton v4.0.10
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
  const globKeys = 'window,location,history,document,navigation,screen,arguments';
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
  const propAnchor = Symbol();
  const propRouter = Symbol();
  const propState = Symbol();
  const propCycle = Symbol();
  const propOwner = Symbol();
  const propView = Symbol();
  const propFunc = Symbol();
  const propDeps = Symbol();
  const getTarget = Symbol();
  const getEvents = Symbol();
  const getAlias = Symbol();
  const getBools = Symbol();
  const getProps = Symbol();
  const getObser = Symbol();
  const getDeps = Symbol();
  const getRoot = Symbol();
  const hasRoot = Symbol();
  const isObject = Symbol();
  const isLight = Symbol();
  class propHooks {
    constructor(state) {
      this[propState] = state;
    }
    get(_, prop) {
      return this[propState][prop];
    }
    set(_, prop, value) {
      this[propState][prop] = value;
      return true;
    }
  }
  const stateHooks = {
    get: (target, prop) => target[prop],
    set: (target, prop, value) => (target[prop] = value, true)
  };
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
          const body = new DOMParser().parseFromString('', 'text/html').body;
          const service = {
            funs: new WeakMap(),
            evns: new WeakMap(),
            deps: new WeakMap(),
            obrs: new WeakMap(),
            bools: new WeakMap(),
            exec: null,
            nodes: [],
            target,
            root,
            body,
            time,
            mode
          };
          SERVICE.set(this, service);
          const state = new Proxy(getObserver(target, service), {
            get: (target, prop) => {
              if (prop === getRoot) {
                return root;
              } else if (prop === getAlias) {
                return alias;
              } else if (prop === '$state') {
                return state;
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
              value: mode !== 'closed' ? new Proxy(state, stateHooks) : undefined
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
              evns,
              bools,
              root,
              body,
              state,
              mode
            } = service;
          if (this[getProps]) {
            Object.defineProperty(this, '$props', {
              value: mode !== 'closed' ? this[getProps] : undefined
            });
            delete this[getProps];
          }
          if (typeof arg.startConnect === 'function') {
            await arg.startConnect.call(state);
          }
          if (typeof arg.template === 'string') {
            body.innerHTML = arg.template;
            prepareTemplate(service, body);
            root.append(...body.childNodes);
            new MutationObserver(records => {
              let rec, node;
              for (rec of records) {
                for (node of rec.removedNodes) {
                  removeCallbacks(node, funs, evns, bools);
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
          if (vars) {
            node[propFunc] = cb;
            node.data = '';
          } else {
            funs.set(node, cb);
            nodes.push(node);
            node.data = cb();
            nodes.pop();
          }
        } else {
          node.splitText(arr.index);
        }
      }
    } else if (node.nodeType === 2 && (node.nodeName[0] === ':' || node.nodeName[0] === '@' || node.nodeName[0] === '$')) {
      const {
        state,
        funs,
        evns,
        bools,
        exec,
        nodes
      } = service;
      const owner = node.ownerElement,
        name = node.nodeName.slice(1);
      if (node.nodeName === '$for') {
        const value = node.value.trim();
        const strVars = vars ? vars + `,${getVars(value)}` : getVars(value);
        const iter = getCycle(state, value, exec);
        const saveExec = service.exec;
        service.exec = iter.next().value;
        let i = 0;
        for (; i < owner.childNodes.length; i++) {
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
        if (!vars) {
          funs.set(owner, obj);
          nodes.push(owner);
          while (!iter.next().value) {
            owner.append(updateDOM(evns, frag.cloneNode(true), frag));
          }
          nodes.pop();
        } else {
          owner[propCycle] = obj;
        }
      } else if (node.nodeName[0] === '@') {
        const arr = name.split('.');
        const props = arr.slice(1).reduce((obj, key) => (obj[key] = true, obj), {});
        if (vars) {
          const fun = `() => ((${vars}) => event => ${node.value.trim()})(${vars})`;
          const cb = exec.call(state, fun, true);
          let deps = owner[getEvents];
          if (!deps) {
            deps = new Set();
            owner[getEvents] = deps;
          }
          deps.add({
            name: arr[0],
            cb,
            props
          });
        } else {
          owner.addEventListener(arr[0], getCallback(state, node.value.trim()), props);
        }
      } else {
        const cb = vars ? exec.call(state, node.value.trim()) : getCallback(state, node.value.trim());
        if (node.nodeName === '$view') {
          let childs;
          if (owner.childNodes.length) {
            childs = new DocumentFragment();
            childs.append(...owner.childNodes);
          }
          if (vars) {
            owner[propView] = childs ? {
              cb,
              service,
              childs
            } : {
              cb
            };
          } else {
            owner.removeAttribute('$view');
            const obj = childs ? {
              service,
              childs
            } : {};
            funs.set(obj, cb);
            nodes.push(obj);
            const elem = document.createElement(cb());
            obj[propAnchor] = elem;
            if (childs) {
              elem.append(childs.cloneNode(true));
            }
            if (owner[getProps]) {
              elem[getProps] = owner[getProps];
            }
            let i = 0,
              attrs = owner.attributes;
            for (; i < attrs.length; i++) {
              elem.setAttributeNode(owner.removeAttributeNode(attrs[i])), i--;
            }
            prepareTemplate(service, elem, vars);
            owner.replaceWith(elem);
            return nodes.pop();
          }
        } else {
          if (node.nodeName[0] === ':') {
            if (typeof owner[name] === 'boolean') {
              let deps, obj;
              if (vars) {
                obj = {
                  name,
                  cb
                };
                deps = owner[getBools];
                if (!deps) {
                  deps = new Set();
                  owner[getBools] = deps;
                }
              } else {
                obj = {
                  [propOwner]: owner,
                  name
                };
                funs.set(obj, cb);
                deps = bools.get(owner);
                if (!deps) {
                  deps = new Set();
                  bools.set(owner, deps);
                }
                nodes.push(obj);
                if (cb()) {
                  owner[name] = true;
                }
                nodes.pop();
              }
              deps.add(obj);
            } else {
              owner.setAttribute(name, '');
              const attr = owner.attributes[name];
              if (vars) {
                attr[propFunc] = cb;
                attr.value = '';
              } else {
                funs.set(attr, cb);
                nodes.push(attr);
                attr.value = cb();
                nodes.pop();
              }
            }
          }
        }
      }
      return owner.removeAttribute(node.nodeName);
    } else {
      let isCycle;
      if (node.attributes) {
        const attrs = node.attributes;
        if (attrs['$props']) {
          if (service.mode !== 'closed') {
            const $props = attrs['$props'],
              {
                state
              } = service;
            if ($props.value) {
              let prop,
                obj = {},
                props = $props.value.split(',');
              for (prop of props) {
                prop = prop.trim();
                obj[prop] = state[prop];
              }
              node[getProps] = new Proxy(obj, new propHooks(state));
            } else {
              node[getProps] = state;
            }
          }
          node.removeAttribute('$props');
        }
        if (attrs['$view']) {
          node.removeAttribute('$for');
          return prepareTemplate(service, attrs['$view'], vars);
        } else if (attrs['$for']) {
          isCycle = true;
        }
        let i = 0;
        for (; i < attrs.length; i++) {
          prepareTemplate(service, attrs[i], vars) || i--;
        }
      }
      if (!isCycle && node.nodeType !== 2 && !node[isLight]) {
        let i = 0,
          childs = node.childNodes;
        for (; i < childs.length; i++) {
          prepareTemplate(service, childs[i], vars) || i--;
        }
      }
    }
    return node;
  };
  const removeCallbacks = (node, funs, evns, bools) => {
    funs.delete(node);
    if (node.nodeType === 1) {
      const deps = bools.get(node);
      if (deps) {
        let obj;
        for (obj of deps) {
          funs.delete(obj);
        }
        deps.clear();
        bools.delete(node);
      }
      evns.delete(node);
    }
    if (node.attributes) {
      let i = 0;
      for (; i < node.attributes.length; i++) {
        removeCallbacks(node.attributes[i], funs);
      }
    }
    let i = 0;
    for (; i < node.childNodes.length; i++) {
      removeCallbacks(node.childNodes[i], funs, evns, bools);
    }
  };
  const getCallback = (state, str) => typeof state[str] === 'function' ? event => state[str].call(state, event) : Function(globKeys, `const {${mainKeys}} = this${state[getAlias] ? `,${state[getAlias]} = this\n` : '\nwith ($host) with (this)'} return event => {'use strict'\nreturn ${str}}`).call(state);
  const getGenerator = str => `(function*(){ yield function(){ return eval(arguments[1] ? arguments[0] : 'event => ' + arguments[0]) }\nwhile (true){ for (var ${str}) yield; yield true }})`;
  const getCycle = (state, str, exec) => (exec ? exec.call(state, getGenerator(str))() : getCallback(state, getGenerator(str))()).call(state);
  const updateCycle = (evns, node, cb) => {
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
        let i = 0;
        for (; i < len; i++) {
          wrap.childNodes[i] = childs[i + idx];
        }
        updateDOM(evns, wrap, frag);
      } else {
        node.append(updateDOM(evns, frag.cloneNode(true), frag));
      }
      idx += len;
    }
    if (idx < childs.length) {
      let i = childs.length;
      for (; i > idx; i--) {
        node.lastChild.remove();
      }
    }
    wrap.childNodes.length = 0;
  };
  const updateDOM = (evns, node, frag) => {
    if (frag[propFunc]) {
      node.nodeValue = frag[propFunc]();
    } else {
      if (frag.attributes) {
        let i = 0,
          attrs = node.attributes;
        for (; i < frag.attributes.length; i++) {
          if (attrs[i]) {
            updateDOM(null, attrs[i], frag.attributes[i]);
          }
        }
        if (frag[getBools]) {
          for (let {
            name,
            cb
          } of frag[getBools]) {
            node[name] = cb() ? true : false;
          }
        }
        if (frag[getEvents]) {
          let obj;
          for (obj of frag[getEvents]) {
            const {
                name,
                cb,
                props
              } = obj,
              fun = cb(),
              old = evns.get(node);
            if (old) {
              node.removeEventListener(name, old, props);
            }
            node.addEventListener(name, fun, props);
            evns.set(node, fun);
          }
        }
      }
      if (frag[propView]) {
        const elem = document.createElement(frag[propView].cb());
        if (frag[getProps]) {
          elem[getProps] = frag[getProps];
        }
        if (!elem[isLight] && frag[propView].childs) {
          elem.append(prepareTemplate(frag[propView].service, frag[propView].childs.cloneNode(true)));
        }
        let i = 0,
          attrs = node.attributes;
        for (; i < attrs.length; i++) {
          elem.setAttributeNode(node.removeAttributeNode(attrs[i])), i--;
        }
        node.replaceWith(elem);
      } else if (frag[propCycle]) {
        updateCycle(evns, node, frag[propCycle]);
      } else {
        let i = 0;
        for (; i < frag.childNodes.length; i++) {
          updateDOM(evns, node.childNodes[i], frag.childNodes[i]);
        }
      }
    }
    return node;
  };
  const callHandler = (dep, {
    funs,
    evns,
    nodes,
    time
  }) => {
    let start;
    if (time) {
      start = performance.now();
    }
    let node, cb;
    for (node of dep) {
      cb = funs.get(node);
      if (cb) {
        if (nodes) {
          nodes.push(node);
        }
        if (node.nodeType === 1) {
          updateCycle(evns, node, cb);
        } else if (node[propAnchor]) {
          const owner = node[propAnchor],
            attrs = owner.attributes;
          const elem = document.createElement(cb());
          node[propAnchor] = elem;
          if (owner.$props) {
            elem[getProps] = owner.$props;
          }
          if (!elem[isLight] && node.childs) {
            elem.append(prepareTemplate(node.service, node.childs.cloneNode(true)));
          }
          let i = 0;
          for (; i < attrs.length; i++) {
            elem.setAttributeNode(owner.removeAttributeNode(attrs[i])), i--;
          }
          owner.replaceWith(elem);
        } else if (node[propOwner]) {
          node[propOwner][node.name] = cb() ? true : false;
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
        if (this[getObser] = this[propService].obrs.get(target[prop])) {
          return this[getObser];
        } else if (this[propService].nodes.length) {
          if ((this[isObject] = typeof target[prop] === 'object' && target[prop] !== null) || target === this[propService].target) {
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
      let attr;
      for (attr of inNode.attributes) {
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
      let i = 0;
      for (; i < childs.length; i++) {
        renderCallback(childs[i], cloneNode.content || cloneNode, slots, clean);
      }
    }
    outNode.append(cloneNode);
  }
  return _rtn;
}();