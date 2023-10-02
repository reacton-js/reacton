(()=>{var e={522:(e,t,n)=>{n(404)},404:()=>{"use strict";!function(){const e=/[A-Z]/g,t=new WeakMap,n=document.implementation.createHTMLDocument(),o={get:(e,t)=>e.hasOwnProperty(t)?e[t].value:e[t],set:(e,t,n)=>(e[t].value=n,!0)},s=Symbol(),r=new Set,i=new customEvent,a=new CustomEvent("init-event",{bubbles:!0,composed:!0});function createComponent(n){const c=(n.mode||"").toLowerCase(),l=(n.extends||"").toLowerCase(),d=n.name.replace(e,((e,t)=>(t>0?"-":"")+e.toLowerCase())),u=l?Object.getPrototypeOf(document.createElement(l)).constructor:HTMLElement;customElements.define(d,class extends u{constructor(){super(),r.add(this);const e=c?this.attachShadow({mode:c}):this,a=new WeakMap,l=new WeakMap,d=new WeakMap,u=new WeakMap,f={},h=new Proxy(this.attributes,o),p={},m=e.host,$=t=>e.querySelector(t),$$=t=>e.querySelectorAll(t),g=new n(h),b=new Proxy(g,{get:(e,t,n)=>{if(t===s)return this;const o=Reflect.get(e,t,n);if(e.hasOwnProperty(t))return v.node&&(f[t]||(f[t]=new Set),f[t].add(v.node)),w._nodes=f[t],v.obsers.has(o)?v.obsers.get(o):o&&"object"==typeof o?getObserver.call(this,o,w):o;switch(t){case"$state":return b;case"$props":return h;case"$refs":return p;case"$host":return m;case"$":return $;case"$$":return $$}return"symbol"==typeof t||t in e?o:this[t]},set:(e,t,o,s)=>!!Reflect.set(e,t,o,s)&&(f[t]&&nodeHandler.call(this,f[t],n),!0)});Object.defineProperties(this,{$state:{get(){if("closed"!==c)return b}},$props:{get(){if("closed"!==c)return h}},$refs:{get(){if("closed"!==c)return p}},$host:{get(){if("closed"!==c)return m}},$:{get(){if("closed"!==c)return $}},$$:{get(){if("closed"!==c)return $$}},$light:{value:e===this||!1},$shadow:{value:this.shadowRoot},$event:{value:customEvent},$route:{value:routeEvent}});const v={root:e,funcs:a,obsers:l,bools:d,events:u,object:g,state:b,refs:p};t.set(this,v),v.exec=getExec.call(this);const w=new Hooks(n,l);w[s]=this,this.addEventListener("init-event",(e=>{r.delete(e.detail),0===r.size&&(e.stopPropagation(),customEvent(i,"ok"))}))}async connectedCallback(){const e=t.get(this),o=document.createElement("template");"string"==typeof n.template||void 0===n.template?o.innerHTML=n.template||"":"function"==typeof n.template?o.innerHTML=await n.template.call(e.state)||"":n.template instanceof DocumentFragment&&o.content.append(n.template.cloneNode(!0)),defineReact.call(this,o.content),e.root.append(o.content),await(!n.connected||n.connected.call(e.state)),setTimeout((()=>{a.detail=this,this.dispatchEvent(a)}),0)}async disconnectedCallback(){await(!n.disconnected||n.disconnected.call(t.get(this).state))}async adoptedCallback(){await(!n.adopted||n.adopted.call(t.get(this).state))}async attributeChangedCallback(...e){await(!n.changed||n.changed.apply(t.get(this).state,e))}static get observedAttributes(){if(Array.isArray(n.attributes))return n.attributes}$entities(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}},l?{extends:l}:null)}Object.defineProperty(a,"detail",{writable:!0});const c=new Set(["push","pop","shift","unshift","splice","sort","reverse"]);class Hooks{constructor(e,t){this._init=e,this._obsers=t}deleteProperty(e,t){return Array.isArray(e)?e.splice(t,1):delete e[t],this._nodes&&nodeHandler.call(this[s],this._nodes,this._init),!0}apply(e,t,n){return"toString"===e.name?JSON.stringify(t,null," "):c.has(e.name)?(e.apply(this._target,n),this._nodes&&nodeHandler.call(this[s],this._nodes,this._init),t):e.apply(t,n)}get(e,t,n){this._target=e;const o=Reflect.get(e,t,n);return this._obsers.has(o)?this._obsers.get(o):e.hasOwnProperty(t)?o&&"object"==typeof o?getObserver.call(this[s],o,this):o:"toString"===t||Array.isArray(e)&&c.has(t)?getObserver.call(this[s],o,this):o}set(e,t,n,o){return!!Reflect.set(e,t,n,o)&&(this._nodes&&nodeHandler.call(this[s],this._nodes,this._init),!0)}}function getObserver(e,n){const o=new Proxy(e,n);return t.get(this).obsers.set(e,o),o}const l=/(['"`])[^]*?\1/,d=/;|\b(?:of)|(?:in)\b/,u=/\b[A-Za-z_]\w*?\b/g;const f="$state, $props, $refs, $host, $, $$, $light, $shadow, $event, $route, $entities";function getExec(){return new Function(`{ ${f} } = this`,"return function() { with (this) return eval(arguments[0]) }.bind(this)").call(t.get(this).state)}const h=/{{([^{}]*?)}}/;function defineReact(e,n){if(8===e.nodeType)return e.remove();if(3===e.nodeType)if(e.data.trim()){const o=h.exec(e.data);if(o)if(0===o.index){const s=t.get(this),r=s.exec(`() => ${o[1]}`);e.splitText(o[0].length),s.funcs.set(e,r),n||(s.node=e,e.data=r(),delete s.node)}else e.splitText(o.index)}else-1!==e.data.indexOf("\n")?e.data="\n":e.data.length&&(e.data=" ");else{if(2===e.nodeType&&(":"===e.nodeName[0]||"$"===e.nodeName[0]||"#"===e.nodeName[0])){const o=t.get(this),s=e.ownerElement;if(s.removeAttribute(e.nodeName),"#"===e.nodeName[0])return o.refs[e.nodeName.slice(1)]=s,null;if("$for"===e.nodeName){n||(o.node=s);const t=new DocumentFragment;for(;s.firstChild;)t.append(s.firstChild);const r=o.exec(function getCycle(e){return`(function*() { arguments[0] = yield function() { return eval(arguments[0]) }; while (true) { yield; for (var ${e}) arguments[0]() } })()`}(e.value)),i=r.next().value.bind(this.$state);r.next((()=>runCycle.call(this,t,f)));let a=function getVars(e){return e.replace(l,"").split(d)[0].match(u).join()}(e.value);n&&(a+=`,${n}`);const c=o.exec;o.exec=i,defineReact.call(this,t,a),o.exec=c;const f={executor:i,iterator:r,length:t.childNodes.length};o.funcs.set(s,f),n||callExec.call(this,s,o.funcs.get(s))}else{const t=e.nodeName.slice(1),r=document.createAttribute(t);if(n||(o.node=r),"on"===r.name.substring(0,2)){let i,a=e.value.trim();"function"==typeof o.object[a]&&(a+="(event)"),n?(i=o.exec(`() => ((${n}) => event => ${a})(${n})`),o.funcs.set(r,i),s.setAttributeNode(r),i._on=t):(i=o.exec(`event => ${a}`),s[`on${r.name.slice(2)}`]=i),s.hasAttribute(":is")&&(o.events.has(s)||o.events.set(s,{}),o.events.get(s)[t]=i)}else{const i=o.exec(`() => ${e.value}`);if(o.funcs.set(r,i),"boolean"==typeof s[t])n?(s.setAttributeNode(r),i._name=t):i()?s.setAttributeNode(r):s.removeAttribute(t),s.hasAttribute(":is")&&(o.bools.has(s)||o.bools.set(s,{}),o.bools.get(s)[t]=i),i._owner=s;else if(n||(r.value=i()),s.setAttributeNode(r),"is"===r.name)if(n){const e=document.createElement("template");e.content.append(...s.childNodes),i._childs=e.content}else{for(let e=0;e<s.childNodes.length;e++)defineReact.call(this,s.childNodes[e])||e--;i._childs=[...s.childNodes],callExec.call(this,r,o.funcs.get(r))}}}return n||delete o.node,null}if(e.attributes)for(let t=0;t<e.attributes.length;t++)defineReact.call(this,e.attributes[t],n)||t--;for(let t=0;t<e.childNodes.length;t++)defineReact.call(this,e.childNodes[t],n)||t--}return e}function nodeHandler(e,n){const o=t.get(this);!n.before||n.before.call(o.state),e.forEach((e=>callExec.call(this,e,o.funcs.get(e)))),!n.after||n.after.call(o.state)}const p=document.createElement("template");function callExec(e,n,o){if(n._on)e[n._on]=n();else if(n.iterator){const o=t.get(this),s=o.exec;o.exec=n.executor,n.index=0,n.owner=e,n.iterator.next();const r=n.index;for(let t=e.childNodes.length;t>r;t--)e.lastChild.remove();o.exec=s}else if("is"===e.name){const s=n();e.value=s;const r=e.ownerElement;p.innerHTML=`<${r.nodeName} is="${s}" />`;const i=p.content.firstElementChild;for(;r.attributes.length;)i.setAttributeNode(r.removeAttributeNode(r.attributes[0]));const a=t.get(this),c=a.bools.get(r);if(c){for(const e in c)c[e]._owner=i;a.bools.delete(r),a.bools.set(i,c)}const l=a.events.get(o||r);if(l){for(const e in l)i[e]=o?l[e]():l[e];a.events.delete(r),a.events.set(i,l)}if(n._childs instanceof DocumentFragment){const e=n._childs.cloneNode(!0);defineReact.call(this,e),i.append(e)}else i.append(...n._childs);r.replaceWith(i)}else n._owner?n()?n._name?n._owner.setAttribute(n._name,""):n._owner.setAttributeNode(e):n._owner.removeAttribute(e.nodeName):e.nodeValue=n()}function updateDOM(e,n){const o=t.get(this).funcs.get(n);if(o){if(o._on&&e.ownerElement){const t=e.ownerElement;t.removeAttribute(o._on),e=t}else o._owner&&(o._owner=e.ownerElement||e);callExec.call(this,e,o,n.ownerElement)}if(n.attributes)for(let t of n.attributes)updateDOM.call(this,e.attributes[t.name]||e,t);for(let t=0;t<n.childNodes.length;t++)updateDOM.call(this,e.childNodes[t],n.childNodes[t])}function runCycle(e,t){if(t.owner.childNodes[t.index])for(let n=0;n<t.length;n++)updateDOM.call(this,t.owner.childNodes[t.index+n],e.childNodes[n]);else{const n=e.cloneNode(!0);updateDOM.call(this,n,e),t.owner.append(n)}t.index+=t.length}function customEvent(e,...t){if(new.target)return new DocumentFragment;e.dispatchEvent(new CustomEvent(...t))}const m=/:(\w+)/g,g=new WeakSet;function routeEvent(e,t,n=null){if(new.target){const e={};return new class extends DocumentFragment{addEventListener(...t){e[t[0]]=new RegExp(`^${t[0].replace(m,((e,t)=>`(?<${t}>\\w+)`))}/?$`),document.addEventListener.call(this,...t)}getEventRegs(){return e}}}if(g.has(e)||(g.add(e),window.addEventListener("popstate",(t=>{callRoute(e,location.href.replace(location.origin,""),t.state)}))),!t)return;const o=t.replace(location.origin,"");history.pushState(n,"",o),callRoute(e,o,n)}function callRoute(e,t,n){const o=e.getEventRegs();for(const s in o){const r=o[s].exec(t);if(r){const t=new CustomEvent(s);t.url=new URL(location.href),t.params=r.groups,e.dispatchEvent(t,n)}}}function renderDOM(e,t,o=0){if(renderDOM.clean&&("STYLE"===e.nodeName||"SCRIPT"===e.nodeName||"TEMPLATE"===e.nodeName||8===e.nodeType))return!1;let s,r;if(e.$state){s=n.createElement(e.nodeName);for(const t of e.attributes)s.setAttribute(t.name,t.value)}else s=e.cloneNode(!1);t.append(s),"SLOT"===s.nodeName?(r=e.assignedNodes({flatten:!0}),renderDOM.slots.push(s)):r=(e.$shadow||e).childNodes;for(let e=0,n=0;e<r.length;e++,n++)renderDOM(r[e],t.childNodes[o],n)||n--;return!0}function convertArgument(e){if("string"==typeof e){const t=document.createElement("template");t.innerHTML=e;const n=t.content.children[0];t.classList.add(n.nodeName.toLowerCase()),n.replaceWith(...n.childNodes),e=t}if(e instanceof HTMLTemplateElement){const t=e.content,n=[...t.querySelectorAll("script")].map((e=>t.removeChild(e).innerHTML)).join(""),o=new Function("exports",`${n}\n return exports`)()||class{};Object.defineProperties(o,{name:{value:o.name&&"exports"!==o.name?o.name:e.classList[0]},template:{value:t}}),createComponent(o)}else"function"!=typeof e||createComponent(e)}window.Reacton=(...e)=>e.forEach(convertArgument),window.Reacton.event=customEvent,window.Reacton.route=routeEvent,window.Reacton.ssr=function ssr({node:e,slots:t,clean:n=!0}={}){return new Promise((o=>i.addEventListener("ok",(()=>{const s=document.createElement("template");renderDOM.clean=n,renderDOM.slots=[],renderDOM(e||document.children[0],s.content),t||renderDOM.slots.forEach((e=>e.replaceWith(...e.childNodes))),o(e?s.innerHTML:`<!DOCTYPE html>\n${s.innerHTML}`)}))))}}()}},t={};function __webpack_require__(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,__webpack_require__),s.exports}(()=>{"use strict";__webpack_require__(522);let e=class{};Object.defineProperties(e,{name:{value:"my-header"},template:{value:String.fromCodePoint(60,105,109,103,32,115,114,99,61,34,105,109,103,47,108,111,103,111,46,106,112,103,34,32,97,108,116,61,34,108,111,103,111,34,62)}});const t=e;function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _toPropertyKey(e){var t=function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,t||"default");if("object"!==_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,_toPropertyKey(o.key),o)}}var n=function(){function _default(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,_default)}return function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}(_default,[{key:"getStringInUpperCase",value:function getStringInUpperCase(e){return e.toLocaleUpperCase()}}]),_default}();let o=class{};o=class extends n{constructor(e){super(),this.message="Reacton",this.color=e.color}static mode="open"},Object.defineProperties(o,{name:{value:"my-component"},template:{value:String.fromCodePoint(60,104,49,62,72,101,108,108,111,44,32,123,123,32,103,101,116,83,116,114,105,110,103,73,110,85,112,112,101,114,67,97,115,101,40,109,101,115,115,97,103,101,41,32,125,125,33,60,47,104,49,62,10,32,32,32,32,32,32,32,32,10,32,32,60,115,116,121,108,101,62,10,32,32,32,32,104,49,32,123,10,32,32,32,32,32,32,99,111,108,111,114,58,32,123,123,32,99,111,108,111,114,32,125,125,59,10,32,32,32,32,125,10,32,32,60,47,115,116,121,108,101,62)}});Reacton(t,o)})()})();