(()=>{var t={135:(t,e,n)=>{t.exports=n(248)},248:t=>{var e=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var a=e&&e.prototype instanceof m?e:m,o=Object.create(a.prototype),i=new O(r||[]);return o._invoke=function(t,e,n){var r=f;return function(a,o){if(r===p)throw new Error("Generator is already running");if(r===d){if("throw"===a)throw o;return S()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var s=N(i,n);if(s){if(s===v)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var c=l(t,e,n);if("normal"===c.type){if(r=n.done?d:h,c.arg===v)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=d,n.method="throw",n.arg=c.arg)}}}(t,n,i),o}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f="suspendedStart",h="suspendedYield",p="executing",d="completed",v={};function m(){}function y(){}function g(){}var w={};c(w,o,(function(){return this}));var b=Object.getPrototypeOf,x=b&&b(b(T([])));x&&x!==n&&r.call(x,o)&&(w=x);var k=g.prototype=m.prototype=Object.create(w);function E(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function $(t,e){function n(a,o,i,s){var c=l(t[a],t,o);if("throw"!==c.type){var u=c.arg,f=u.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,i,s)}),(function(t){n("throw",t,i,s)})):e.resolve(f).then((function(t){u.value=t,i(u)}),(function(t){return n("throw",t,i,s)}))}s(c.arg)}var a;this._invoke=function(t,r){function o(){return new e((function(e,a){n(t,r,e,a)}))}return a=a?a.then(o,o):o()}}function N(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,N(t,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var a=l(r,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,v;var o=a.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,v):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function T(t){if(t){var n=t[o];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function n(){for(;++a<t.length;)if(r.call(t,a))return n.value=t[a],n.done=!1,n;return n.value=e,n.done=!0,n};return i.next=i}}return{next:S}}function S(){return{value:e,done:!0}}return y.prototype=g,c(k,"constructor",g),c(g,"constructor",y),y.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},E($.prototype),c($.prototype,i,(function(){return this})),t.AsyncIterator=$,t.async=function(e,n,r,a,o){void 0===o&&(o=Promise);var i=new $(u(e,n,r,a),o);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(k),c(k,s,"Generator"),c(k,o,(function(){return this})),c(k,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=T,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(A),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function a(r,a){return s.type="throw",s.arg=t,n.next=r,a&&(n.method="next",n.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),A(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;A(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:T(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}}},e={};function n(r){var a=e[r];if(void 0!==a)return a.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function r(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function c(t,e){return c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},c(t,e)}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&c(t,e)}function l(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return s(e)}function f(t){return f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},f(t)}function h(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)}function p(t,e){return function(t,e){return e.get?e.get.call(t):e.value}(t,h(t,e,"get"))}function d(t,e,n){return function(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}(t,h(t,e,"set"),n),n}function v(t,e,n,r,a,o,i){try{var s=t[o](i),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,a)}function m(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){v(o,r,a,i,s,"next",t)}function s(t){v(o,r,a,i,s,"throw",t)}i(void 0)}))}}var y=n(135);function g(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return w(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?w(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return i=t.done,t},e:function(t){s=!0,o=t},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw o}}}}function w(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var b=y.mark(R);function x(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=f(t);if(e){var a=f(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return l(this,n)}}function k(t,e,n){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.set(t,n)}var E=[],$=new WeakMap,N=new WeakMap,L=new Set,A=Function("return function*(){}")().constructor,O=/\.html?$/,T="$data,$root,$host,$,$$,$when,$mixins,$params,$event,$router",S={get:function(t,e,n){return t.$data.hasOwnProperty(e)?Reflect.get(t.$data,e,n):Reflect.get(t,e)}};const j=window.Reacton=function(){var t=m(y.mark((function t(){var n,r,o,c,l=arguments;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(E.splice(0),n=l.length,r=new Array(n),o=0;o<n;o++)r[o]=l[o];return r.forEach((function(t){return E.push(new Promise(function(){var n=m(y.mark((function n(r){var o,c,l,f,h,v,g,w,b,E,j,C,R,_,W,H,I,D,F,U,q;return y.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!(t instanceof HTMLElement)){n.next=6;break}return n.next=3,M(t);case 3:t=n.sent,n.next=17;break;case 6:if("string"!=typeof t){n.next=17;break}if(!O.test(t)){n.next=12;break}return n.next=10,P(t);case 10:return o=n.sent,n.abrupt("return",r(o));case 12:return(c=document.createElement("template")).innerHTML=t.trim(),n.next=16,M(c.content.removeChild(c.content.firstChild));case 16:t=n.sent;case 17:f=(l=t).name,h=l.data,v=l.dataset,g=l.html,w=void 0===g?"":g,b=l.mode,E=l.extends,j=void 0===E?"":E,C=l.connected,R=l.disconnected,_=l.adopted,W=l.attributes,H=l.changed,I=l.before,D=l.after,(F=document.createElement("template")).innerHTML=w,V(F.content),U=new WeakMap,q=function(t){u(w,t);var n,o,c,l,g=x(w);function w(){var t;a(this,w),k(s(t=g.call(this)),U,{writable:!0,value:void 0}),t.$data={},t.$host=s(t);var n={};if(n.values=new WeakMap,n.depends=new WeakMap,n.handlers=new WeakMap,n.listeners=new WeakMap,t.dataset.Params){var r=N.get(t.attributes["data--params"]);t.$params=r.proxy,n.nodes=r.nodes,n.callbacks=r.callbacks}else n.nodes=[],n.callbacks=new WeakMap;for(var o in e.hasOwnProperty("mixins")&&(t.$mixins=e.mixins),v)t.dataset[o]=v[o];return"function"==typeof I&&(n.before=I),"function"==typeof D&&(n.after=D),$.set(s(t),n),L.add(f.toUpperCase()),t}return i(w,[{key:"$root",get:function(){return this.shadowRoot}},{key:"connectedCallback",value:(l=m(y.mark((function t(){var e,n;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=!1,"function"!=typeof h){t.next=13;break}return t.t0=K,t.t1=this,t.t2=Object,t.t3=this.$data,t.next=8,h.call(this);case 8:t.t4=t.sent,t.t5=t.t2.assign.call(t.t2,t.t3,t.t4),t.t6=Z.call(this),this.$data=t.t0.call.call(t.t0,t.t1,t.t5,t.t6),e=!0;case 13:if($.get(this).iterator=A("{".concat(T,"}=this"),"with(this.$data)while(true)arguments[0]=yield eval(arguments[0])").call(new Proxy(this,S)),$.get(this).iterator.next(),d(this,U,G.call(this,F.content.cloneNode(!0))),"function"!=typeof C){t.next=19;break}return t.next=19,C.call(this);case 19:(n=b?this.attachShadow({mode:b}):this).append(p(this,U)),d(this,U,n),e||delete this.$data,r(this);case 24:case"end":return t.stop()}}),t,this)}))),function(){return l.apply(this,arguments)})},{key:"disconnectedCallback",value:(c=m(y.mark((function t(){return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("function"!=typeof R){t.next=3;break}return t.next=3,R.call(this);case 3:case"end":return t.stop()}}),t,this)}))),function(){return c.apply(this,arguments)})},{key:"adoptedCallback",value:(o=m(y.mark((function t(){return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("function"!=typeof _){t.next=3;break}return t.next=3,_.call(this);case 3:case"end":return t.stop()}}),t,this)}))),function(){return o.apply(this,arguments)})},{key:"attributeChangedCallback",value:(n=m(y.mark((function t(){var e,n,r,a=arguments;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("function"!=typeof H){t.next=4;break}for(e=a.length,n=new Array(e),r=0;r<e;r++)n[r]=a[r];return t.next=4,H.call.apply(H,[this].concat(n));case 4:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)})},{key:"$",value:function(t){return"closed"!==b?p(this,U).querySelector(t):null}},{key:"$$",value:function(t){return"closed"!==b?p(this,U).querySelectorAll(t):null}},{key:"$event",value:function(t,e){(this||document).dispatchEvent(new CustomEvent(t,e))}},{key:"$when",value:function(t){return customElements.whenDefined(t)}},{key:"$router",value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];rt.call.apply(rt,[this].concat(e))}}],[{key:"observedAttributes",get:function(){if(Array.isArray(W))return W}}]),w}(window["HTML".concat(j.charAt(0).toUpperCase()+j.slice(1),"Element")]||HTMLElement),customElements.define(f,q,j?{extends:j}:null),setTimeout((function(){return customElements.whenDefined(f).then((function(){return L.has(f.toUpperCase())?null:r()}))}),0);case 25:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()))})),t.next=5,Promise.all(E);case 5:return c=t.sent,t.abrupt("return",c.flat().filter(Boolean));case 7:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}();function P(t){var e=new XMLHttpRequest;return e.open("GET",t),e.send(),new Promise((function(t){return e.onload=function(){var n=document.createElement("template");n.innerHTML=e.response,t(Reacton.apply(void 0,r(n.content.children)))}}))}function M(t){return C.apply(this,arguments)}function C(){return(C=m(y.mark((function t(e){var n,a,o,i,s,c;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(c in n=e.content||e,a=r(n.querySelectorAll("script")).map((function(t){return n.removeChild(t).innerHTML})).join(""),o=Function("var exports\n".concat(a,"\nreturn exports"))(),i=e.innerHTML,s={},e.dataset)s[c]=e.dataset[c];return t.abrupt("return",Object.assign({name:e.getAttribute("name")||e.nodeName.toLowerCase(),mode:e.getAttribute("mode")||void 0,extends:e.getAttribute("extends")||void 0,dataset:s,html:i},o));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function R(t,e){var n,r,a;return y.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:n=t.childNodes.length;case 1:if((r=t.parent).childNodes[t.index])for(a=0;a<n;a++)_.call(this,r.childNodes[t.index+a],t.childNodes[a]);else r.append(G.call(this,t.cloneNode(!0),t,e));return t.index+=n,void(o.next=7);case 7:o.next=1;break;case 9:case"end":return o.stop()}}),b,this)}function _(t,e){if(t.nodeValue)t.nodeName.startsWith("data--on")?W.call(this,t):$.get(this).callbacks.has(e)&&(t.nodeName.startsWith("data--")?W.call(this,t,e):t.nodeValue=$.get(this).callbacks.get(e)());else{if(t.attributes){for(var n=0;n<t.attributes.length;n++)_.call(this,t.attributes[n],e.attributes[n]);if(t.attributes["data--for"])return t}for(n=0;n<t.childNodes.length;n++)_.call(this,t.childNodes[n],e.childNodes[n])}}function W(t,e){var n=$.get(this).callbacks.get(e||t);if("data--for"===t.nodeName){if($.get(this).iterator!==n.iterator){var r=$.get(this).iterator,a=n.environment,o=n.iterator,i=n.fragment,s=t.ownerElement;$.get(this).iterator=o,i.parent=s,i.index=0,a.next();for(var c=s.childNodes.length;c>i.index;c--)s.lastChild.remove();$.get(this).iterator=r}}else if(t.nodeName.startsWith("data--on")){var u=n.name,l=n.closure,f=n.opts;t.ownerElement.removeEventListener(u,$.get(this).listeners.get(t),f);var h=l();$.get(this).listeners.set(t,h),t.ownerElement.addEventListener(u,h,f)}else if("data--view"===t.nodeName){var p=n();if(p){var d=p.name,v=void 0===d?p:d,m=p.content,y=void 0===m?"":m,g=t.ownerElement;g.removeAttribute("is");var w=g.nodeName,b=document.createElement("template");b.innerHTML="<".concat(w,' is="').concat(v,'">').concat(y,"</").concat(w,">");var x=b.content.firstChild;for(c=0;c<g.attributes.length;c++)x.setAttributeNode(g.removeAttributeNode(g.attributes[c--]));g.replaceWith(x)}}else t.nodeName.startsWith("data--")?n()?t.ownerElement.setAttribute(t.nodeName.slice(6),""):t.ownerElement.removeAttribute(t.nodeName.slice(6)):t.nodeValue=n()}var H=/{{([^]*?)}}/,I=/;|\bof\b|\bin\b/,D=/\b[A-Za-z_]\w*?\b/g;function F(e,n,r){"object"===t(r)?$.get(this).callbacks.set(n||e,r):$.get(this).callbacks.set(n||e,$.get(this).iterator.next("event=>".concat(r)).value),$.get(this).nodes.push(e),W.call(this,e,n),$.get(this).nodes.pop()}function G(t,e,n){var r=this;if(t.nodeName.startsWith("data--for")){for(var a=new DocumentFragment;t.ownerElement.firstChild;)a.append(t.ownerElement.firstChild);var o=$.get(this).iterator.next("(function*(){arguments[0]=yield function*(){while(true)arguments[0]=yield eval(arguments[0])};"+"while(true){yield;for(var ".concat(t.value,")arguments[0].next()}})")).value(),i=o.next().value.call(this.$data);i.next(),o.next(R.call(this,a,t.nodeValue.split(I)[0].match(D).join())),F.call(this,t,e,{environment:o,iterator:i,fragment:a})}else if(t.nodeName.startsWith("data--on")){var s=t.nodeName.split("."),c=s.shift().slice(8),u=s.reduce((function(t,e){return t[e]=!0,t}),{});if(n){var l=$.get(this).iterator.next("()=>((".concat(n,")=>event=>").concat(t.nodeValue,")(").concat(n,")")).value;$.get(this).callbacks.set(t,{name:c,closure:l,opts:u}),W.call(this,t)}else{var f=$.get(this).iterator.next("event=>".concat(t.nodeValue)).value;t.ownerElement.addEventListener(c,f,u)}}else if(t.nodeName.startsWith("data--params")){var h,p=new Set,d=g(t.value.split(","));try{for(d.s();!(h=d.n()).done;){var v=h.value;p.add(v.trim())}}catch(t){d.e(t)}finally{d.f()}N.set(t,{proxy:new Proxy(this.$data,{get:function(t,e,n){return p.has(e)?Reflect.get(t,e,n):void 0},set:function(t,e,n,r){return!!p.has(e)&&Reflect.set(t,e,n,r)}}),nodes:$.get(this).nodes,callbacks:$.get(this).callbacks})}else if(t.nodeName.startsWith("data--"))F.call(this,t,e,t.nodeValue);else if(t.nodeValue)t.nodeValue.replace(H,(function(n,a){return F.call(r,t,e,a)}));else{if(t.attributes){for(var m=0;m<t.attributes.length;m++)G.call(this,t.attributes[m],e?e.attributes[m]:null,n);if(t.attributes["data--for"])return t}for(m=0;m<t.childNodes.length;m++)G.call(this,t.childNodes[m],e?e.childNodes[m]:null,n)}return t}function V(t){if(8===t.nodeType||3===t.nodeType&&!t.data.trim())return t.remove();if("$"===t.nodeName[0]||"@"===t.nodeName[0]){var e=document.createAttribute("data--".concat("@"===t.nodeName[0]?"on":"").concat(t.nodeName.slice(1)));return e.value=t.value,t.ownerElement.setAttributeNode(e),t.ownerElement.removeAttribute(t.nodeName)}if(3===t.nodeType)t.data.replace(H,(function(e,n,r){r>0?t.splitText(r):t.splitText(r+e.length)}));else{if(t.attributes)for(var n=0;n<t.attributes.length;n++)V(t.attributes[n])||n--;for(n=0;n<t.childNodes.length;n++)V(t.childNodes[n])||n--}return t}var U=new Set(["push","pop","shift","unshift","splice","sort","reverse"]);function q(t){$.get(this).before&&$.get(this).before();var e,n=g(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;W.call(this,r)}}catch(t){n.e(t)}finally{n.f()}$.get(this).after&&$.get(this).after()}var Y=new WeakMap,B=new WeakMap,z=new WeakMap,X=new WeakMap,J=function(){function e(t,n,r){a(this,e),k(this,Y,{writable:!0,value:void 0}),k(this,B,{writable:!0,value:void 0}),k(this,z,{writable:!0,value:void 0}),k(this,X,{writable:!0,value:void 0}),d(this,Y,t),d(this,B,n),d(this,z,r),d(this,X,$.get(p(this,Y)))}return i(e,[{key:"apply",value:function(t,e,n){return"toString"===t.name?JSON.stringify(e,null," "):(t.apply(p(this,z),n),p(this,B)&&q.call(p(this,Y),p(this,B)),e)}},{key:"get",value:function(e,n,r){var a=Reflect.get(e,n,r);if(p(this,X).values.has(a))return p(this,X).values.get(a);if(Array.isArray(e)&&U.has(n)||"toString"===n){if(p(this,X).handlers.has(e))return new Proxy(a,p(this,X).handlers.get(e));var o=Z.call(p(this,Y),p(this,B),e);return p(this,X).handlers.set(e,o),new Proxy(a,o)}if(!e.hasOwnProperty(n))return a;if(p(this,X).nodes.length){var i=p(this,X).nodes[0];p(this,B)&&p(this,B).add(i);var s=p(this,X).depends.get(e);s||(s={},p(this,X).depends.set(e,s));var c=s[n];c||(c=s[n]=new Set),c.add(i)}return a&&"object"===t(a)?K.call(p(this,Y),a,Z.call(p(this,Y),c)):a}},{key:"set",value:function(t,e,n,r){if(!Reflect.set(t,e,n,r))return!1;var a=p(this,X).depends.get(t);if(!a)return!0;var o=a[e]||p(this,B);return o&&q.call(p(this,Y),o),!0}}]),e}();function Z(t,e){return new J(this,t,e)}function K(t,e){var n=new Proxy(t,e);return $.get(this).values.set(t,n),n}function Q(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if("STYLE"===e.nodeName)return!1;if(e.shadowRoot){var a,o=Q.document.createElement(e.nodeName),i=g(e.attributes);try{for(i.s();!(a=i.n()).done;){var s=a.value;o.setAttribute(s.name,s.value)}}catch(t){i.e(t)}finally{i.f()}t.append(o)}else t.content?t.content.append(e.cloneNode()):(t.append(e.cloneNode()),"SLOT"===t.lastChild.nodeName&&n.add(t.lastChild));for(var c=(t.content||t).childNodes[r],u="SLOT"===e.nodeName?e.assignedNodes({flatten:!0}):(e.shadowRoot||e.content||e).childNodes||e,l=0,f=0;l<u.length;l++,f++)Q(c,u[l],n,f)||f--;return!0}function tt(){return tt=m(y.mark((function t(){var e,n,a,o=arguments;return y.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=o.length>0&&void 0!==o[0]?o[0]:document.children[0],t.next=3,Promise.all(E);case 3:return n=document.createElement("template"),Q.document||(Q.document=document.implementation.createHTMLDocument()),a=new Set,Q(n.content,e,a),a.forEach((function(t){return t.replaceWith.apply(t,r(t.childNodes))})),t.abrupt("return",e===document.children[0]?"<!DOCTYPE html>\n".concat(n.innerHTML):n.innerHTML);case 9:case"end":return t.stop()}}),t)}))),tt.apply(this,arguments)}Reacton.render=function(){return tt.apply(this,arguments)};var et=/:(\w+)/g;function nt(t,e,n,r,a,o){var i=location.href.replace(location.origin,"");Object.keys(e).forEach((function(s){var c=e[s].exec(i);if(c){var u=new CustomEvent(s,{bubbles:n,cancelable:r,composed:a,detail:o});u.url=new URL(location.href),u.params=c.groups,t.dispatchEvent(u)}}))}function rt(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.once,a=n.capture,o=n.passive,i=n.bubbles,s=n.cancelable,c=n.composed,u=n.detail,l={};for(var f in e)t.addEventListener(f,e[f],{once:r,capture:a,passive:o}),l[f]=new RegExp("^".concat(f.replace(et,(function(t,e){return"(?<".concat(e,">\\w+)")})),"/?$"));window.addEventListener("popstate",(function(){nt(t,l,i,s,c,u)}),{once:r,capture:a,passive:o}),t.addEventListener("click",(function(e){var n=e.composedPath()[0],r=n.getAttribute("href");r&&n.origin===location.origin&&!/\.\w+$/.test(r)&&(e.preventDefault(),history.pushState(null,"",r),nt(t,l,i,s,c,u))}),{once:r,capture:a,passive:o}),nt(t,l,i,s,c,u)}j.mixins={glossary:{managers:"Менеджеры",designers:"Дизайнеры"},collator:new Intl.Collator,fetch:function(t){var e=new XMLHttpRequest;return e.open("POST",t),e.responseType="json",e.send(),new Promise((function(t){return e.onload=function(){return t(e.response)}}))}},j('<app-reacton mode="open" extends="body"> <header is="app-header"></header> <main id="main" $params="category, id" $view="view"></main> <footer is="app-footer"></footer> <style>:host{min-height:100vh;display:flex;flex-direction:column}main{margin:20px}footer{margin-top:auto}</style> <script>exports={data:()=>({view:"",category:"",id:""}),connected(){this.$router(this,{"/":()=>{this.$data.view="page-home"},"/workers":()=>{this.$data.view="page-workers"},"/workers/:category/:id?":a=>{a.params.id?(this.$data.category=a.params.category,this.$data.id=a.params.id,this.$data.view="page-user"):(this.$data.category=a.params.category,this.$data.view="page-list")}})}}<\/script> </app-reacton>','<app-header mode="open" extends="header"> <nav is="app-menu"></nav> <img src="/img/logo.png" alt="logo"> <style>nav{margin:20px}img{width:100%;max-width:400px;margin-left:20px}</style> </app-header>','<app-menu mode="open" extends="nav"> <a href="/">Главная</a> <a href="/workers/">Сотрудники</a> <style>a+a{margin-left:10px}a:hover{color:red}</style> </app-menu>','<app-footer mode="open" extends="footer"> <p>Copyright © {{ new Date().getFullYear() }}</p> <style>:host{padding:0 20px;border-top:1px solid #222}</style> </app-footer>','<page-home mode="open" extends="main"> <h2>Главная</h2> <p>Рекламная информация о компании</p> </page-home>','<page-list mode="open" extends="main"> <h2>{{ $mixins.glossary[$params.category] }}</h2> Сортировать по: <select> <option value="id">ID</option> <option value="name">Имя</option> <option value="age">Возраст</option> </select> <button class="{{ ascending ? \'active\' : \'\' }}" @click="ascending = !ascending" title="по возрастанию">↓</button> <button class="{{ !ascending ? \'active\' : \'\' }}" @click="ascending = !ascending" title="по убыванию">↑</button> <ul $for="user of sort()"> <li> ID: <a href="{{ user.id }}">{{ user.id }}</a><br> Имя: {{ user.name }}<br> Возраст: {{ user.age }} </li> </ul> <style>select{margin-right:5px}li+li{margin-top:10px}button.active{background:#222;color:#fff}</style> <script>exports={async data(){const t=this.$mixins.collator;return{users:await this.$mixins.fetch(`/workers/${this.$params.category}`),ascending:!0,group:"id",sort(){return this.users.sort(((s,r)=>this.ascending?t.compare(s[this.group],r[this.group]):t.compare(r[this.group],s[this.group])))}}},connected(){this.$("select").addEventListener("change",(t=>{this.$data.group=t.target.value}))}}<\/script> </page-list>','<page-user mode="open" extends="main"> <h2>{{ $mixins.glossary[$params.category].slice(0, -1) }}</h2> ID: {{ user.id }}<br> Имя: {{ user.name }}<br> Возраст: {{ user.age }} <script>exports={async data(){return{user:await this.$mixins.fetch(`/workers/${this.$params.category}/${this.$params.id}`)}}}<\/script> </page-user>','<page-workers mode="open" extends="main"> <h2>Сотрудники</h2> <ul> <li> <a href="managers/">Менеджеры</a> </li> <li> <a href="designers/">Дизайнеры</a> </li> </ul> <style>li+li{margin-top:5px}</style> </page-workers>')})()})();