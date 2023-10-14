(()=>{var e={522:(e,t,n)=>{n(404)},404:()=>{"use strict";!function(){const e=/[A-Z]/g,t=new WeakMap,n=document.implementation.createHTMLDocument(),s={get:(e,t)=>e.hasOwnProperty(t)?e[t].value:e[t],set:(e,t,n)=>(e[t].value=n,!0)},o=Symbol(),a=new Set,r=new customEvent,i=new CustomEvent("init-event",{bubbles:!0,composed:!0});function createComponent(n){const c=(n.mode||"").toLowerCase(),l=(n.extends||"").toLowerCase(),d=n.name.replace(e,((e,t)=>(t>0?"-":"")+e.toLowerCase())),u=l?Object.getPrototypeOf(document.createElement(l)).constructor:HTMLElement;customElements.define(d,class extends u{constructor(){super(),a.add(this);const e=c?this.attachShadow({mode:c}):this,i=new WeakMap,l=new WeakMap,d=new WeakMap,u=new WeakMap,h={},m=new Proxy(this.attributes,s),f={},p=e.host,$=t=>e.querySelector(t),$$=t=>e.querySelectorAll(t),g=new n(m),v=new Proxy(g,{get:(e,t,n)=>{if(t===o)return this;const s=Reflect.get(e,t,n);if(e.hasOwnProperty(t))return b.node&&(h[t]||(h[t]=new Set),h[t].add(b.node)),w._nodes=h[t],b.obsers.has(s)?b.obsers.get(s):s&&"object"==typeof s?getObserver.call(this,s,w):s;switch(t){case"$state":return v;case"$props":return m;case"$refs":return f;case"$host":return p;case"$":return $;case"$$":return $$}return"symbol"==typeof t||t in e?s:this[t]},set:(e,t,s,o)=>!!Reflect.set(e,t,s,o)&&(h[t]&&nodeHandler.call(this,h[t],n),!0)});Object.defineProperties(this,{$state:{get(){if("closed"!==c)return v}},$props:{get(){if("closed"!==c)return m}},$refs:{get(){if("closed"!==c)return f}},$host:{get(){if("closed"!==c)return p}},$:{get(){if("closed"!==c)return $}},$$:{get(){if("closed"!==c)return $$}},$light:{value:e===this||!1},$shadow:{value:this.shadowRoot},$event:{value:customEvent},$route:{value:routeEvent}});const b={root:e,funcs:i,obsers:l,bools:d,events:u,object:g,state:v,refs:f};t.set(this,b),b.exec=getExec.call(this);const w=new Hooks(n,l);w[o]=this,this.addEventListener("init-event",(e=>{a.delete(e.detail),0===a.size&&(e.stopPropagation(),customEvent(r,"ok"))}))}async connectedCallback(){const e=t.get(this),s=document.createElement("template");"string"==typeof n.template||void 0===n.template?s.innerHTML=n.template||"":"function"==typeof n.template?s.innerHTML=await n.template.call(e.state)||"":n.template instanceof DocumentFragment&&s.content.append(n.template.cloneNode(!0)),defineReact.call(this,s.content),e.root.append(s.content),await(!n.connected||n.connected.call(e.state)),setTimeout((()=>{i.detail=this,this.dispatchEvent(i)}),0)}async disconnectedCallback(){await(!n.disconnected||n.disconnected.call(t.get(this).state))}async adoptedCallback(){await(!n.adopted||n.adopted.call(t.get(this).state))}attributeChangedCallback(...e){setTimeout((()=>!n.changed||n.changed.apply(t.get(this).state,e)),0)}static get observedAttributes(){if(Array.isArray(n.attributes))return n.attributes}$entities(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}},l?{extends:l}:null)}Object.defineProperty(i,"detail",{writable:!0});const c=new Set(["push","pop","shift","unshift","splice","sort","reverse"]);class Hooks{constructor(e,t){this._init=e,this._obsers=t}deleteProperty(e,t){return Array.isArray(e)?e.splice(t,1):delete e[t],this._nodes&&nodeHandler.call(this[o],this._nodes,this._init),!0}apply(e,t,n){return"toString"===e.name?JSON.stringify(t,null," "):c.has(e.name)?(e.apply(this._target,n),this._nodes&&nodeHandler.call(this[o],this._nodes,this._init),t):e.apply(t,n)}get(e,t,n){this._target=e;const s=Reflect.get(e,t,n);return this._obsers.has(s)?this._obsers.get(s):e.hasOwnProperty(t)?s&&"object"==typeof s?getObserver.call(this[o],s,this):s:"toString"===t||Array.isArray(e)&&c.has(t)?getObserver.call(this[o],s,this):s}set(e,t,n,s){return!!Reflect.set(e,t,n,s)&&(this._nodes&&nodeHandler.call(this[o],this._nodes,this._init),!0)}}function getObserver(e,n){const s=new Proxy(e,n);return t.get(this).obsers.set(e,s),s}const l=/(['"`])[^]*?\1/,d=/;|\b(?:of)|(?:in)\b/,u=/\b[A-Za-z_]\w*?\b/g;const h="$state, $props, $refs, $host, $, $$, $light, $shadow, $event, $route, $entities";function getExec(){return new Function(`{ ${h} } = this`,"return function() { with (this) return eval(arguments[0]) }.bind(this)").call(t.get(this).state)}const m=/{{([^{}]*?)}}/;function defineReact(e,n){if(8===e.nodeType)return e.remove();if(3===e.nodeType)if(e.data.trim()){const s=m.exec(e.data);if(s)if(0===s.index){const o=t.get(this),a=o.exec(`() => ${s[1]}`);e.splitText(s[0].length),o.funcs.set(e,a),n||(o.node=e,e.data=a(),delete o.node)}else e.splitText(s.index)}else-1!==e.data.indexOf("\n")?e.data="\n":e.data.length&&(e.data=" ");else{if(2===e.nodeType&&(":"===e.nodeName[0]||"$"===e.nodeName[0]||"#"===e.nodeName[0])){const s=t.get(this),o=e.ownerElement;if(o.removeAttribute(e.nodeName),"#"===e.nodeName[0])return s.refs[e.nodeName.slice(1)]=o,null;if("$for"===e.nodeName){n||(s.node=o);const t=new DocumentFragment;for(;o.firstChild;)t.append(o.firstChild);const a=s.exec(function getCycle(e){return`(function*() { arguments[0] = yield function() { return eval(arguments[0]) }; while (true) { yield; for (var ${e}) arguments[0]() } })()`}(e.value)),r=a.next().value.bind(this.$state);a.next((()=>runCycle.call(this,t,h)));let i=function getVars(e){return e.replace(l,"").split(d)[0].match(u).join()}(e.value);n&&(i+=`,${n}`);const c=s.exec;s.exec=r,defineReact.call(this,t,i),s.exec=c;const h={executor:r,iterator:a,length:t.childNodes.length};s.funcs.set(o,h),n||callExec.call(this,o,s.funcs.get(o))}else{const t=e.nodeName.slice(1),a=document.createAttribute(t);if(n||(s.node=a),"on"===a.name.substring(0,2)){let r,i=e.value.trim();"function"==typeof s.object[i]&&(i+="(event)"),n?(r=s.exec(`() => ((${n}) => event => ${i})(${n})`),s.funcs.set(a,r),o.setAttributeNode(a),r._on=t):(r=s.exec(`event => ${i}`),o[`on${a.name.slice(2)}`]=r),o.hasAttribute(":is")&&(s.events.has(o)||s.events.set(o,{}),s.events.get(o)[t]=r)}else{const r=s.exec(`() => ${e.value}`);if(s.funcs.set(a,r),"boolean"==typeof o[t])n?(o.setAttributeNode(a),r._name=t):r()?o.setAttributeNode(a):o.removeAttribute(t),o.hasAttribute(":is")&&(s.bools.has(o)||s.bools.set(o,{}),s.bools.get(o)[t]=r),r._owner=o;else if(n||(a.value=r()),o.setAttributeNode(a),"is"===a.name)if(n){const e=document.createElement("template");e.content.append(...o.childNodes),r._childs=e.content}else{for(let e=0;e<o.childNodes.length;e++)defineReact.call(this,o.childNodes[e])||e--;r._childs=[...o.childNodes],callExec.call(this,a,s.funcs.get(a))}}}return n||delete s.node,null}if(e.attributes)for(let t=0;t<e.attributes.length;t++)defineReact.call(this,e.attributes[t],n)||t--;for(let t=0;t<e.childNodes.length;t++)defineReact.call(this,e.childNodes[t],n)||t--}return e}function nodeHandler(e,n){const s=t.get(this);!n.before||n.before.call(s.state),e.forEach((e=>callExec.call(this,e,s.funcs.get(e)))),!n.after||n.after.call(s.state)}const f=document.createElement("template");function callExec(e,n,s){if(n._on)e[n._on]=n();else if(n.iterator){const s=t.get(this),o=s.exec;s.exec=n.executor,n.index=0,n.owner=e,n.iterator.next();const a=n.index;for(let t=e.childNodes.length;t>a;t--)e.lastChild.remove();s.exec=o}else if("is"===e.name){const o=n();e.value=o;const a=e.ownerElement;f.innerHTML=`<${a.nodeName} is="${o}" />`;const r=f.content.firstElementChild;for(;a.attributes.length;)r.setAttributeNode(a.removeAttributeNode(a.attributes[0]));const i=t.get(this),c=i.bools.get(a);if(c){for(const e in c)c[e]._owner=r;i.bools.delete(a),i.bools.set(r,c)}const l=i.events.get(s||a);if(l){for(const e in l)r[e]=s?l[e]():l[e];i.events.delete(a),i.events.set(r,l)}if(n._childs instanceof DocumentFragment){const e=n._childs.cloneNode(!0);defineReact.call(this,e),r.append(e)}else r.append(...n._childs);a.replaceWith(r)}else n._owner?n()?n._name?n._owner.setAttribute(n._name,""):n._owner.setAttributeNode(e):n._owner.removeAttribute(e.nodeName):e.nodeValue=n()}function updateDOM(e,n){const s=t.get(this).funcs.get(n);if(s){if(s._on&&e.ownerElement){const t=e.ownerElement;t.removeAttribute(s._on),e=t}else s._owner&&(s._owner=e.ownerElement||e);callExec.call(this,e,s,n.ownerElement)}if(n.attributes)for(let t of n.attributes)updateDOM.call(this,e.attributes[t.name]||e,t);for(let t=0;t<n.childNodes.length;t++)updateDOM.call(this,e.childNodes[t],n.childNodes[t])}function runCycle(e,t){if(t.owner.childNodes[t.index])for(let n=0;n<t.length;n++)updateDOM.call(this,t.owner.childNodes[t.index+n],e.childNodes[n]);else{const n=e.cloneNode(!0);updateDOM.call(this,n,e),t.owner.append(n)}t.index+=t.length}function customEvent(e,...t){if(new.target)return new DocumentFragment;e.dispatchEvent(new CustomEvent(...t))}const p=/:(\w+)/g,g=new WeakSet;function routeEvent(e,t,n=null){if(new.target){const e={};return new class extends DocumentFragment{addEventListener(...t){e[t[0]]=new RegExp(`^${t[0].replace(p,((e,t)=>`(?<${t}>\\w+)`))}/?$`),document.addEventListener.call(this,...t)}getEventRegs(){return e}}}if(g.has(e)||(g.add(e),window.addEventListener("popstate",(t=>{callRoute(e,location.href.replace(location.origin,""),t.state)}))),!t)return;const s=t.replace(location.origin,"");history.pushState(n,"",s),callRoute(e,s,n)}function callRoute(e,t,n){const s=e.getEventRegs();for(const o in s){const a=s[o].exec(t);if(a){const t=new CustomEvent(o);t.url=new URL(location.href),t.params=a.groups,e.dispatchEvent(t,n)}}}function renderDOM(e,t,s=0){if(renderDOM.clean&&("STYLE"===e.nodeName||"SCRIPT"===e.nodeName||"TEMPLATE"===e.nodeName||8===e.nodeType))return!1;let o,a;if(e.$state){o=n.createElement(e.nodeName);for(const t of e.attributes)o.setAttribute(t.name,t.value)}else o=e.cloneNode(!1);t.append(o),"SLOT"===o.nodeName?(a=e.assignedNodes({flatten:!0}),renderDOM.slots.push(o)):a=(e.$shadow||e).childNodes;for(let e=0,n=0;e<a.length;e++,n++)renderDOM(a[e],t.childNodes[s],n)||n--;return!0}function convertArgument(e){if("string"==typeof e){const t=document.createElement("template");t.innerHTML=e;const n=t.content.children[0];t.classList.add(n.nodeName.toLowerCase()),n.replaceWith(...n.childNodes),e=t}if(e instanceof HTMLTemplateElement){const t=e.content,n=[...t.querySelectorAll("script")].map((e=>t.removeChild(e).innerHTML)).join(""),s=new Function("exports",`${n}\n return exports`)()||class{};Object.defineProperties(s,{name:{value:s.name&&"exports"!==s.name?s.name:e.classList[0]},template:{value:t}}),createComponent(s)}else"function"!=typeof e||createComponent(e)}window.Reacton=(...e)=>e.forEach(convertArgument),window.Reacton.event=customEvent,window.Reacton.route=routeEvent,window.Reacton.ssr=function ssr({node:e,slots:t,clean:n=!0}={}){return new Promise((s=>r.addEventListener("ok",(()=>{const o=document.createElement("template");renderDOM.clean=n,renderDOM.slots=[],renderDOM(e||document.children[0],o.content),t||renderDOM.slots.forEach((e=>e.replaceWith(...e.childNodes))),s(e?o.innerHTML:`<!DOCTYPE html>\n${o.innerHTML}`)}))))}}()}},t={};function __webpack_require__(n){var s=t[n];if(void 0!==s)return s.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,__webpack_require__),o.exports}(()=>{"use strict";__webpack_require__(522);let e=class{};e=class{static extends="div";static mode="open"},Object.defineProperties(e,{name:{value:"my-home"},template:{value:String.fromCodePoint(60,104,50,62,72,111,109,101,60,47,104,50,62)}});const t=e;let n=class{};n=class{static extends="div";static mode="open"},Object.defineProperties(n,{name:{value:"my-about"},template:{value:String.fromCodePoint(60,104,50,62,65,98,111,117,116,60,47,104,50,62)}});const s=n;let o=class{};o=class{static extends="div";static mode="open"},Object.defineProperties(o,{name:{value:"my-contacts"},template:{value:String.fromCodePoint(60,104,50,62,67,111,110,116,97,99,116,115,60,47,104,50,62)}});const a=o;let r=class{};r=class{static extends="div";static mode="open"},Object.defineProperties(r,{name:{value:"my-users"},template:{value:String.fromCodePoint(60,115,108,111,116,32,110,97,109,101,61,34,117,115,101,114,34,62,60,47,115,108,111,116,62,10,32,32,60,115,108,111,116,32,110,97,109,101,61,34,97,103,101,34,62,60,47,115,108,111,116,62)}});const i=r;var c=new Reacton.route;let l=class{};l=class{static connected(){this.$refs.nav.addEventListener("click",(e=>{e.preventDefault(),this.$route(c,e.target.href)}))}},Object.defineProperties(l,{name:{value:"my-menu"},template:{value:String.fromCodePoint(60,110,97,118,32,35,110,97,118,62,10,32,32,32,32,60,97,32,104,114,101,102,61,34,47,34,62,72,111,109,101,60,47,97,62,10,32,32,32,32,60,97,32,104,114,101,102,61,34,47,97,98,111,117,116,34,62,65,98,111,117,116,60,47,97,62,10,32,32,32,32,60,97,32,104,114,101,102,61,34,47,99,111,110,116,97,99,116,115,34,62,67,111,110,116,97,99,116,115,60,47,97,62,10,32,32,32,32,60,97,32,104,114,101,102,61,34,47,106,111,104,110,47,51,50,34,62,74,111,104,110,60,47,97,62,10,32,32,32,32,60,97,32,104,114,101,102,61,34,47,106,111,104,110,63,97,103,101,61,51,50,34,62,65,103,101,60,47,97,62,10,32,32,60,47,110,97,118,62)}});const d=l;let u=class{};u=class{page="my-home";user="";age="";static connected(){c.addEventListener("/",(()=>{this.page="my-home"})),c.addEventListener("/about",(()=>{this.page="my-about"})),c.addEventListener("/contacts",(()=>{this.page="my-contacts"})),c.addEventListener("/:user/:age",(e=>{this.page="my-users",this.user=e.params.user,this.age=e.params.age})),c.addEventListener("/:user\\?age=32",(e=>{this.page="my-users",this.user=e.params.user,this.age=e.url.searchParams.get("age")})),this.$route(c,location.href)}},Object.defineProperties(u,{name:{value:"my-content"},template:{value:String.fromCodePoint(60,100,105,118,32,58,105,115,61,34,112,97,103,101,34,62,10,32,32,32,32,60,112,32,115,108,111,116,61,34,117,115,101,114,34,62,123,123,32,117,115,101,114,32,125,125,60,47,112,62,10,32,32,32,32,60,112,32,115,108,111,116,61,34,97,103,101,34,62,123,123,32,97,103,101,32,125,125,60,47,112,62,10,32,32,60,47,100,105,118,62)}});Reacton(t,s,a,i,d,u)})()})();