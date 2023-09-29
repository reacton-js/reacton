(()=>{var e={522:(e,t,n)=>{n(404)},404:()=>{"use strict";!function(){const e=/[A-Z]/g,t=new WeakMap,n=document.implementation.createHTMLDocument(),o={get:(e,t)=>e.hasOwnProperty(t)?e[t].value:e[t],set:(e,t,n)=>(e[t].value=n,!0)},s=Symbol(),i=new Set,r=new _,a=new CustomEvent("init",{bubbles:!0,composed:!0});function l(n){const l=(n.mode||"").toLowerCase(),c=(n.extends||"").toLowerCase(),h=n.name.replace(e,((e,t)=>(t>0?"-":"")+e.toLowerCase())),f=c?Object.getPrototypeOf(document.createElement(c)).constructor:HTMLElement;customElements.define(h,class extends f{constructor(){super(),i.add(this);const e=l?this.attachShadow({mode:l}):this,a=new WeakMap,c=new WeakMap,h=new WeakMap,f=new WeakMap,p=new Proxy(this.attributes,o),m={},b=new Proxy(new n,{get:(e,t,n)=>{if(t===s)return this;if(e.hasOwnProperty(t))return w.node&&(m[t]||(m[t]=new Set),m[t].add(w.node)),y._nodes=m[t],w.obsers.has(e[t])?w.obsers.get(e[t]):e[t]&&"object"==typeof e[t]?u.call(this,e[t],y):e[t];const o=e.__proto__||Object.getPrototypeOf(e);return"symbol"==typeof t||t in o?Reflect.get(o,t,n):this[t]},set:(e,t,o,s)=>!!Reflect.set(e,t,o,s)&&(m[t]&&v.call(this,m[t],n),!0)});Object.defineProperties(this,{$state:{get(){if("closed"!==l)return b}},$props:{get(){if("closed"!==l)return p}},$host:{get(){if("closed"!==l)return e.host}},$light:{value:e===this||!1},$shadow:{value:this.shadowRoot},$event:{value:_},$route:{value:S}});const w={root:e,funcs:a,obsers:c,bools:h,events:f,state:b};t.set(this,w),w.exec=g.call(this);const y=new d(n,c);y[s]=this,this.addEventListener("init",(e=>{i.delete(e.detail),0===i.size&&(e.stopPropagation(),_(r,"ok"))}))}async connectedCallback(){const e=t.get(this),o=document.createElement("template");"string"==typeof n.template||void 0===n.template?o.innerHTML=n.template||"":"function"==typeof n.template?o.innerHTML=await n.template.call(e.state)||"":n.template instanceof DocumentFragment&&o.content.append(n.template.cloneNode(!0)),w.call(this,o.content),e.root.append(o.content),await(!n.connected||n.connected.call(e.state)),setTimeout((()=>{a.detail=this,this.dispatchEvent(a)}),0)}async disconnectedCallback(){await(!n.disconnected||n.disconnected.call(t.get(this).state))}async adoptedCallback(){await(!n.adopted||n.adopted.call(t.get(this).state))}async attributeChangedCallback(...e){await(!n.changed||n.changed.apply(t.get(this).state,e))}static get observedAttributes(){if(Array.isArray(n.attributes))return n.attributes}$(e){return"closed"!==l||this[s]?t.get(this[s]||this).root.querySelector(e):null}$$(e){return"closed"!==l||this[s]?t.get(this[s]||this).root.querySelectorAll(e):null}$entities(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}},c?{extends:c}:null)}Object.defineProperty(a,"detail",{writable:!0});const c=new Set(["push","pop","shift","unshift","splice","sort","reverse"]);class d{constructor(e,t){this._init=e,this._obsers=t}deleteProperty(e,t){return Array.isArray(e)?e.splice(t,1):delete e[t],this._nodes&&v.call(this[s],this._nodes,this._init),!0}apply(e,t,n){return"toString"===e.name?JSON.stringify(t,null," "):c.has(e.name)?(e.apply(this._target,n),this._nodes&&v.call(this[s],this._nodes,this._init),t):e.apply(t,n)}get(e,t,n){this._target=e;const o=Reflect.get(e,t,n);return this._obsers.has(o)?this._obsers.get(o):e.hasOwnProperty(t)?o&&"object"==typeof o?u.call(this[s],o,this):o:"toString"===t||Array.isArray(e)&&c.has(t)?u.call(this[s],o,this):o}set(e,t,n,o){return!!Reflect.set(e,t,n,o)&&(this._nodes&&v.call(this[s],this._nodes,this._init),!0)}}function u(e,n){const o=new Proxy(e,n);return t.get(this).obsers.set(e,o),o}const h=/(['"`])[^]*?\1/,f=/;|\b(?:of)|(?:in)\b/,p=/\b[A-Za-z_]\w*?\b/g;const m="$state, $props, $host, $light, $shadow, $event, $route, $, $$";function g(){return new Function(`{ ${m} } = this`,"return function() { with (this) return eval(arguments[0]) }").call(this).bind(t.get(this).state)}const b=/{{([^{}]*?)}}/;function w(e,n){if(8===e.nodeType)return e.remove();if(3===e.nodeType)if(e.data.trim()){const o=b.exec(e.data);if(o)if(0===o.index){const s=t.get(this),i=s.exec(`() => ${o[1]}`);e.splitText(o[0].length),s.funcs.set(e,i),n||(s.node=e,e.data=i(),delete s.node)}else e.splitText(o.index)}else-1!==e.data.indexOf("\n")?e.data="\n":e.data.length&&(e.data=" ");else{if(":"===e.nodeName[0]||"$"===e.nodeName[0]){const o=t.get(this),s=e.ownerElement;if(s.removeAttribute(e.nodeName),"$for"===e.nodeName){n||(o.node=s);const t=new DocumentFragment;for(;s.firstChild;)t.append(s.firstChild);const i=o.exec(`(function*() { arguments[0] = yield function() { return eval(arguments[0]) }; while (true) { yield; for (var ${e.value}) arguments[0]() } })()`),r=i.next().value.bind(this.$state);i.next((()=>$.call(this,t,c)));let a=e.value.replace(h,"").split(f)[0].match(p).join();n&&(a+=`,${n}`);const l=o.exec;o.exec=r,w.call(this,t,a),o.exec=l;const c={executor:r,iterator:i,length:t.childNodes.length};o.funcs.set(s,c),n||x.call(this,s,o.funcs.get(s))}else{const t=e.nodeName.slice(1),i=document.createAttribute(t);if(n||(o.node=i),"on"===i.name.substring(0,2)){let r,a=e.value.trim();"function"==typeof this.$state[a]&&(a+="()"),n?(r=o.exec(`() => ((${n}) => () => ${a})(${n})`),o.funcs.set(i,r),s.setAttributeNode(i),r._on=t):(r=o.exec(`() => ${a}`),s[`on${i.name.slice(2)}`]=r),s.hasAttribute(":is")&&(o.events.has(s)||o.events.set(s,{}),o.events.get(s)[t]=r)}else{const r=o.exec(`() => ${e.value}`);if(o.funcs.set(i,r),"boolean"==typeof s[t])n?(s.setAttributeNode(i),r._name=t):r()?s.setAttributeNode(i):s.removeAttribute(t),s.hasAttribute(":is")&&(o.bools.has(s)||o.bools.set(s,{}),o.bools.get(s)[t]=r),r._owner=s;else if(n||(i.value=r()),s.setAttributeNode(i),"is"===i.name)if(n){const e=document.createElement("template");e.content.append(...s.childNodes),r._childs=e.content}else{for(let e=0;e<s.childNodes.length;e++)w.call(this,s.childNodes[e])||e--;r._childs=[...s.childNodes],x.call(this,i,o.funcs.get(i))}}}return n||delete o.node,null}if(e.attributes)for(let t=0;t<e.attributes.length;t++)w.call(this,e.attributes[t],n)||t--;for(let t=0;t<e.childNodes.length;t++)w.call(this,e.childNodes[t],n)||t--}return e}function v(e,n){const o=t.get(this);!n.before||n.before.call(o.state),e.forEach((e=>x.call(this,e,o.funcs.get(e)))),!n.after||n.after.call(o.state)}const y=document.createElement("template");function x(e,n,o){if(n._on)e[n._on]=n();else if(n.iterator){const o=t.get(this),s=o.exec;o.exec=n.executor,n.index=0,n.owner=e,n.iterator.next();const i=n.index;for(let t=e.childNodes.length;t>i;t--)e.lastChild.remove();o.exec=s}else if("is"===e.name){const s=n();e.value=s;const i=e.ownerElement;y.innerHTML=`<${i.nodeName} is="${s}" />`;const r=y.content.firstElementChild;for(;i.attributes.length;)r.setAttributeNode(i.removeAttributeNode(i.attributes[0]));const a=t.get(this),l=a.bools.get(i);if(l){for(const e in l)l[e]._owner=r;a.bools.delete(i),a.bools.set(r,l)}const c=a.events.get(o||i);if(c){for(const e in c)r[e]=o?c[e]():c[e];a.events.delete(i),a.events.set(r,c)}if(n._childs instanceof DocumentFragment){const e=n._childs.cloneNode(!0);w.call(this,e),r.append(e)}else r.append(...n._childs);i.replaceWith(r)}else n._owner?n()?n._name?n._owner.setAttribute(n._name,""):n._owner.setAttributeNode(e):n._owner.removeAttribute(e.nodeName):e.nodeValue=n()}function N(e,n){const o=t.get(this).funcs.get(n);if(o){if(o._on&&e.ownerElement){const t=e.ownerElement;t.removeAttribute(o._on),e=t}else o._owner&&(o._owner=e.ownerElement||e);x.call(this,e,o,n.ownerElement)}if(n.attributes)for(let t of n.attributes)N.call(this,e.attributes[t.name]||e,t);for(let t=0;t<n.childNodes.length;t++)N.call(this,e.childNodes[t],n.childNodes[t])}function $(e,t){if(t.owner.childNodes[t.index])for(let n=0;n<t.length;n++)N.call(this,t.owner.childNodes[t.index+n],e.childNodes[n]);else{const n=e.cloneNode(!0);N.call(this,n,e),t.owner.append(n)}t.index+=t.length}function _(e,...t){if(new.target)return new DocumentFragment;e.dispatchEvent(new CustomEvent(...t))}const E=/:(\w+)/g,A=new WeakSet;function S(e,t,n=null){if(new.target){const e={};return new class extends DocumentFragment{addEventListener(...t){e[t[0]]=new RegExp(`^${t[0].replace(E,((e,t)=>`(?<${t}>\\w+)`))}/?$`),document.addEventListener.call(this,...t)}getEventRegs(){return e}}}if(A.has(e)||(A.add(e),window.addEventListener("popstate",(t=>{L(e,location.href.replace(location.origin,""),t.state)}))),!t)return;const o=t.replace(location.origin,"");history.pushState(n,"",o),L(e,o,n)}function L(e,t,n){const o=e.getEventRegs();for(const s in o){const i=o[s].exec(t);if(i){const t=new CustomEvent(s);t.url=new URL(location.href),t.params=i.groups,e.dispatchEvent(t,n)}}}function T(e,t,o=0){if(T.clean&&("STYLE"===e.nodeName||"SCRIPT"===e.nodeName||"TEMPLATE"===e.nodeName||8===e.nodeType))return!1;let s,i;if(e.$state){s=n.createElement(e.nodeName);for(const t of e.attributes)s.setAttribute(t.name,t.value)}else s=e.cloneNode(!1);t.append(s),"SLOT"===s.nodeName?(i=e.assignedNodes({flatten:!0}),T.slots.push(s)):i=(e.$shadow||e).childNodes;for(let e=0,n=0;e<i.length;e++,n++)T(i[e],t.childNodes[o],n)||n--;return!0}function C(e){if("string"==typeof e){const t=document.createElement("template");t.innerHTML=e;const n=t.content.children[0];t.classList.add(n.nodeName.toLowerCase()),n.replaceWith(...n.childNodes),e=t}if(e instanceof HTMLTemplateElement){const t=e.content,n=[...t.querySelectorAll("script")].map((e=>t.removeChild(e).innerHTML)).join(""),o=new Function("exports",`${n}\n return exports`)()||class{};Object.defineProperties(o,{name:{value:o.name&&"exports"!==o.name?o.name:e.classList[0]},template:{value:t}}),l(o)}else"function"!=typeof e||l(e)}window.Reacton=(...e)=>e.forEach(C),window.Reacton.event=_,window.Reacton.route=S,window.Reacton.ssr=function({node:e,slots:t,clean:n=!0}={}){return new Promise((o=>r.addEventListener("ok",(()=>{const s=document.createElement("template");T.clean=n,T.slots=[],T(e||document.children[0],s.content),t||T.slots.forEach((e=>e.replaceWith(...e.childNodes))),o(e?s.innerHTML:`<!DOCTYPE html>\n${s.innerHTML}`)}))))}}()}},t={};function n(o){var s=t[o];if(void 0!==s)return s.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}(()=>{"use strict";n(522);let e=class{};Object.defineProperties(e,{name:{value:"my-header"},template:{value:'<img src="img/logo.jpg" alt="logo">'}});const t=e;function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function s(e){var t=function(e,t){if("object"!==o(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var s=n.call(e,t||"default");if("object"!==o(s))return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===o(t)?t:String(t)}function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,s(o.key),o)}}var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,o;return t=e,(n=[{key:"getStringInUpperCase",value:function(e){return e.toLocaleUpperCase()}}])&&i(t.prototype,n),o&&i(t,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();let a=class{};a=class extends r{message="Reacton";color="red";static mode="open"},Object.defineProperties(a,{name:{value:"my-component"},template:{value:"<h1>Hello, {{ getStringInUpperCase(message) }}!</h1>\n        \n  <style>\n    h1 {\n      color: {{ color }};\n    }\n  </style>"}});Reacton(t,a)})()})();