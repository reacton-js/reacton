(()=>{var r={609:(r,o,i)=>{var c=i(425).default;function _regeneratorRuntime(){"use strict";r.exports=_regeneratorRuntime=function _regeneratorRuntime(){return o},r.exports.__esModule=!0,r.exports.default=r.exports;var o={},i=Object.prototype,l=i.hasOwnProperty,u=Object.defineProperty||function(r,o,i){r[o]=i.value},p="function"==typeof Symbol?Symbol:{},d=p.iterator||"@@iterator",h=p.asyncIterator||"@@asyncIterator",y=p.toStringTag||"@@toStringTag";function define(r,o,i){return Object.defineProperty(r,o,{value:i,enumerable:!0,configurable:!0,writable:!0}),r[o]}try{define({},"")}catch(r){define=function define(r,o,i){return r[o]=i}}function wrap(r,o,i,c){var l=o&&o.prototype instanceof Generator?o:Generator,p=Object.create(l.prototype),d=new Context(c||[]);return u(p,"_invoke",{value:makeInvokeMethod(r,i,d)}),p}function tryCatch(r,o,i){try{return{type:"normal",arg:r.call(o,i)}}catch(r){return{type:"throw",arg:r}}}o.wrap=wrap;var v={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var m={};define(m,d,(function(){return this}));var g=Object.getPrototypeOf,x=g&&g(g(values([])));x&&x!==i&&l.call(x,d)&&(m=x);var k=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(m);function defineIteratorMethods(r){["next","throw","return"].forEach((function(o){define(r,o,(function(r){return this._invoke(o,r)}))}))}function AsyncIterator(r,o){function invoke(i,u,p,d){var h=tryCatch(r[i],r,u);if("throw"!==h.type){var y=h.arg,v=y.value;return v&&"object"==c(v)&&l.call(v,"__await")?o.resolve(v.__await).then((function(r){invoke("next",r,p,d)}),(function(r){invoke("throw",r,p,d)})):o.resolve(v).then((function(r){y.value=r,p(y)}),(function(r){return invoke("throw",r,p,d)}))}d(h.arg)}var i;u(this,"_invoke",{value:function value(r,c){function callInvokeWithMethodAndArg(){return new o((function(o,i){invoke(r,c,o,i)}))}return i=i?i.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(r,o,i){var c="suspendedStart";return function(l,u){if("executing"===c)throw new Error("Generator is already running");if("completed"===c){if("throw"===l)throw u;return doneResult()}for(i.method=l,i.arg=u;;){var p=i.delegate;if(p){var d=maybeInvokeDelegate(p,i);if(d){if(d===v)continue;return d}}if("next"===i.method)i.sent=i._sent=i.arg;else if("throw"===i.method){if("suspendedStart"===c)throw c="completed",i.arg;i.dispatchException(i.arg)}else"return"===i.method&&i.abrupt("return",i.arg);c="executing";var h=tryCatch(r,o,i);if("normal"===h.type){if(c=i.done?"completed":"suspendedYield",h.arg===v)continue;return{value:h.arg,done:i.done}}"throw"===h.type&&(c="completed",i.method="throw",i.arg=h.arg)}}}function maybeInvokeDelegate(r,o){var i=o.method,c=r.iterator[i];if(void 0===c)return o.delegate=null,"throw"===i&&r.iterator.return&&(o.method="return",o.arg=void 0,maybeInvokeDelegate(r,o),"throw"===o.method)||"return"!==i&&(o.method="throw",o.arg=new TypeError("The iterator does not provide a '"+i+"' method")),v;var l=tryCatch(c,r.iterator,o.arg);if("throw"===l.type)return o.method="throw",o.arg=l.arg,o.delegate=null,v;var u=l.arg;return u?u.done?(o[r.resultName]=u.value,o.next=r.nextLoc,"return"!==o.method&&(o.method="next",o.arg=void 0),o.delegate=null,v):u:(o.method="throw",o.arg=new TypeError("iterator result is not an object"),o.delegate=null,v)}function pushTryEntry(r){var o={tryLoc:r[0]};1 in r&&(o.catchLoc=r[1]),2 in r&&(o.finallyLoc=r[2],o.afterLoc=r[3]),this.tryEntries.push(o)}function resetTryEntry(r){var o=r.completion||{};o.type="normal",delete o.arg,r.completion=o}function Context(r){this.tryEntries=[{tryLoc:"root"}],r.forEach(pushTryEntry,this),this.reset(!0)}function values(r){if(r){var o=r[d];if(o)return o.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var i=-1,c=function next(){for(;++i<r.length;)if(l.call(r,i))return next.value=r[i],next.done=!1,next;return next.value=void 0,next.done=!0,next};return c.next=c}}return{next:doneResult}}function doneResult(){return{value:void 0,done:!0}}return GeneratorFunction.prototype=GeneratorFunctionPrototype,u(k,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),u(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,y,"GeneratorFunction"),o.isGeneratorFunction=function(r){var o="function"==typeof r&&r.constructor;return!!o&&(o===GeneratorFunction||"GeneratorFunction"===(o.displayName||o.name))},o.mark=function(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,GeneratorFunctionPrototype):(r.__proto__=GeneratorFunctionPrototype,define(r,y,"GeneratorFunction")),r.prototype=Object.create(k),r},o.awrap=function(r){return{__await:r}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,h,(function(){return this})),o.AsyncIterator=AsyncIterator,o.async=function(r,i,c,l,u){void 0===u&&(u=Promise);var p=new AsyncIterator(wrap(r,i,c,l),u);return o.isGeneratorFunction(i)?p:p.next().then((function(r){return r.done?r.value:p.next()}))},defineIteratorMethods(k),define(k,y,"Generator"),define(k,d,(function(){return this})),define(k,"toString",(function(){return"[object Generator]"})),o.keys=function(r){var o=Object(r),i=[];for(var c in o)i.push(c);return i.reverse(),function next(){for(;i.length;){var r=i.pop();if(r in o)return next.value=r,next.done=!1,next}return next.done=!0,next}},o.values=values,Context.prototype={constructor:Context,reset:function reset(r){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(resetTryEntry),!r)for(var o in this)"t"===o.charAt(0)&&l.call(this,o)&&!isNaN(+o.slice(1))&&(this[o]=void 0)},stop:function stop(){this.done=!0;var r=this.tryEntries[0].completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function dispatchException(r){if(this.done)throw r;var o=this;function handle(i,c){return u.type="throw",u.arg=r,o.next=i,c&&(o.method="next",o.arg=void 0),!!c}for(var i=this.tryEntries.length-1;i>=0;--i){var c=this.tryEntries[i],u=c.completion;if("root"===c.tryLoc)return handle("end");if(c.tryLoc<=this.prev){var p=l.call(c,"catchLoc"),d=l.call(c,"finallyLoc");if(p&&d){if(this.prev<c.catchLoc)return handle(c.catchLoc,!0);if(this.prev<c.finallyLoc)return handle(c.finallyLoc)}else if(p){if(this.prev<c.catchLoc)return handle(c.catchLoc,!0)}else{if(!d)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return handle(c.finallyLoc)}}}},abrupt:function abrupt(r,o){for(var i=this.tryEntries.length-1;i>=0;--i){var c=this.tryEntries[i];if(c.tryLoc<=this.prev&&l.call(c,"finallyLoc")&&this.prev<c.finallyLoc){var u=c;break}}u&&("break"===r||"continue"===r)&&u.tryLoc<=o&&o<=u.finallyLoc&&(u=null);var p=u?u.completion:{};return p.type=r,p.arg=o,u?(this.method="next",this.next=u.finallyLoc,v):this.complete(p)},complete:function complete(r,o){if("throw"===r.type)throw r.arg;return"break"===r.type||"continue"===r.type?this.next=r.arg:"return"===r.type?(this.rval=this.arg=r.arg,this.method="return",this.next="end"):"normal"===r.type&&o&&(this.next=o),v},finish:function finish(r){for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o];if(i.finallyLoc===r)return this.complete(i.completion,i.afterLoc),resetTryEntry(i),v}},catch:function _catch(r){for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o];if(i.tryLoc===r){var c=i.completion;if("throw"===c.type){var l=c.arg;resetTryEntry(i)}return l}}throw new Error("illegal catch attempt")},delegateYield:function delegateYield(r,o,i){return this.delegate={iterator:values(r),resultName:o,nextLoc:i},"next"===this.method&&(this.arg=void 0),v}},o}r.exports=_regeneratorRuntime,r.exports.__esModule=!0,r.exports.default=r.exports},425:r=>{function _typeof(o){return r.exports=_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},r.exports.__esModule=!0,r.exports.default=r.exports,_typeof(o)}r.exports=_typeof,r.exports.__esModule=!0,r.exports.default=r.exports},841:(r,o,i)=>{var c=i(609)();r.exports=c;try{regeneratorRuntime=c}catch(r){"object"==typeof globalThis?globalThis.regeneratorRuntime=c:Function("r","regeneratorRuntime = r")(c)}}},o={};function __webpack_require__(i){var c=o[i];if(void 0!==c)return c.exports;var l=o[i]={exports:{}};return r[i](l,l.exports,__webpack_require__),l.exports}__webpack_require__.n=r=>{var o=r&&r.__esModule?()=>r.default:()=>r;return __webpack_require__.d(o,{a:o}),o},__webpack_require__.d=(r,o)=>{for(var i in o)__webpack_require__.o(o,i)&&!__webpack_require__.o(r,i)&&Object.defineProperty(r,i,{enumerable:!0,get:o[i]})},__webpack_require__.o=(r,o)=>Object.prototype.hasOwnProperty.call(r,o),(()=>{"use strict";function _getPrototypeOf(r){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(r){return r.__proto__||Object.getPrototypeOf(r)},_getPrototypeOf(r)}function _setPrototypeOf(r,o){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function _setPrototypeOf(r,o){return r.__proto__=o,r},_setPrototypeOf(r,o)}function _construct(r,o,i){return _construct=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(r){return!1}}()?Reflect.construct.bind():function _construct(r,o,i){var c=[null];c.push.apply(c,o);var l=new(Function.bind.apply(r,c));return i&&_setPrototypeOf(l,i.prototype),l},_construct.apply(null,arguments)}function _wrapNativeSuper(r){var o="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function _wrapNativeSuper(r){if(null===r||!function _isNativeFunction(r){return-1!==Function.toString.call(r).indexOf("[native code]")}(r))return r;if("function"!=typeof r)throw new TypeError("Super expression must either be null or a function");if(void 0!==o){if(o.has(r))return o.get(r);o.set(r,Wrapper)}function Wrapper(){return _construct(r,arguments,_getPrototypeOf(this).constructor)}return Wrapper.prototype=Object.create(r.prototype,{constructor:{value:Wrapper,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(Wrapper,r)},_wrapNativeSuper(r)}function _arrayLikeToArray(r,o){(null==o||o>r.length)&&(o=r.length);for(var i=0,c=new Array(o);i<o;i++)c[i]=r[i];return c}function _toConsumableArray(r){return function _arrayWithoutHoles(r){if(Array.isArray(r))return _arrayLikeToArray(r)}(r)||function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||function _unsupportedIterableToArray(r,o){if(r){if("string"==typeof r)return _arrayLikeToArray(r,o);var i=Object.prototype.toString.call(r).slice(8,-1);return"Object"===i&&r.constructor&&(i=r.constructor.name),"Map"===i||"Set"===i?Array.from(r):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(r,o):void 0}}(r)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function asyncGeneratorStep(r,o,i,c,l,u,p){try{var d=r[u](p),h=d.value}catch(r){return void i(r)}d.done?o(h):Promise.resolve(h).then(c,l)}function _asyncToGenerator(r){return function(){var o=this,i=arguments;return new Promise((function(c,l){var u=r.apply(o,i);function _next(r){asyncGeneratorStep(u,c,l,_next,_throw,"next",r)}function _throw(r){asyncGeneratorStep(u,c,l,_next,_throw,"throw",r)}_next(void 0)}))}}function _typeof(r){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},_typeof(r)}function _classCallCheck(r,o){if(!(r instanceof o))throw new TypeError("Cannot call a class as a function")}function _toPropertyKey(r){var o=function _toPrimitive(r,o){if("object"!==_typeof(r)||null===r)return r;var i=r[Symbol.toPrimitive];if(void 0!==i){var c=i.call(r,o||"default");if("object"!==_typeof(c))return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===o?String:Number)(r)}(r,"string");return"symbol"===_typeof(o)?o:String(o)}function _defineProperties(r,o){for(var i=0;i<o.length;i++){var c=o[i];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(r,_toPropertyKey(c.key),c)}}function _createClass(r,o,i){return o&&_defineProperties(r.prototype,o),i&&_defineProperties(r,i),Object.defineProperty(r,"prototype",{writable:!1}),r}function _assertThisInitialized(r){if(void 0===r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function _inherits(r,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(o&&o.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),Object.defineProperty(r,"prototype",{writable:!1}),o&&_setPrototypeOf(r,o)}var r=__webpack_require__(841),o=__webpack_require__.n(r);function _createForOfIteratorHelper(r,o){var i="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!i){if(Array.isArray(r)||(i=function reacton_min_unsupportedIterableToArray(r,o){if(!r)return;if("string"==typeof r)return reacton_min_arrayLikeToArray(r,o);var i=Object.prototype.toString.call(r).slice(8,-1);"Object"===i&&r.constructor&&(i=r.constructor.name);if("Map"===i||"Set"===i)return Array.from(r);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return reacton_min_arrayLikeToArray(r,o)}(r))||o&&r&&"number"==typeof r.length){i&&(r=i);var c=0,l=function F(){};return{s:l,n:function n(){return c>=r.length?{done:!0}:{done:!1,value:r[c++]}},e:function e(r){throw r},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,p=!0,d=!1;return{s:function s(){i=i.call(r)},n:function n(){var r=i.next();return p=r.done,r},e:function e(r){d=!0,u=r},f:function f(){try{p||null==i.return||i.return()}finally{if(d)throw u}}}}function reacton_min_arrayLikeToArray(r,o){(null==o||o>r.length)&&(o=r.length);for(var i=0,c=new Array(o);i<o;i++)c[i]=r[i];return c}function _createSuper(r){var o=function reacton_min_isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(r){return!1}}();return function _createSuperInternal(){var i,c=_getPrototypeOf(r);if(o){var l=_getPrototypeOf(this).constructor;i=Reflect.construct(c,arguments,l)}else i=c.apply(this,arguments);return function _possibleConstructorReturn(r,o){if(o&&("object"===_typeof(o)||"function"==typeof o))return o;if(void 0!==o)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(r)}(this,i)}}!function(){var r=/[A-Z]/g,i=new WeakMap,c=document.implementation.createHTMLDocument(),l={get:function get(r,o){return r.hasOwnProperty(o)?r[o].value:r[o]},set:function set(r,o,i){return r[o].value=i,!0}},u=Symbol(),p=new Set,d=new A,h=new CustomEvent("init",{bubbles:!0,composed:!0});function a(c){var y=(c.mode||"").toLowerCase(),m=(c.extends||"").toLowerCase(),g=c.name.replace(r,(function(r,o){return(0<o?"-":"")+r.toLowerCase()})),x=m?Object.getPrototypeOf(document.createElement(m)).constructor:HTMLElement;customElements.define(g,function(r){_inherits(_class,r);var m,g,x,O,P=_createSuper(_class);function _class(){var r;_classCallCheck(this,_class),r=P.call(this),p.add(_assertThisInitialized(r));var o=y?r.attachShadow({mode:y}):_assertThisInitialized(r),h=new WeakMap,m=new WeakMap,g=new WeakMap,x=new WeakMap,O=new Proxy(r.attributes,l),S={},j=new Proxy(new c,{get:function get(o,i,c){return i===u?_assertThisInitialized(r):o.hasOwnProperty(i)?(I.node&&(S[i]||(S[i]=new Set),S[i].add(I.node)),R._nodes=S[i],I.obsers.has(o[i])?I.obsers.get(o[i]):o[i]&&"object"==_typeof(o[i])?b.call(_assertThisInitialized(r),o[i],R):o[i]):(o=o.__proto__||Object.getPrototypeOf(o),"symbol"==_typeof(i)||i in o?Reflect.get(o,i,c):r[i])},set:function set(o,i,l,u){return!!Reflect.set(o,i,l,u)&&(S[i]&&_.call(_assertThisInitialized(r),S[i],c),!0)}}),I=(Object.defineProperties(_assertThisInitialized(r),{$state:{get:function get(){if("closed"!==y)return j}},$props:{get:function get(){if("closed"!==y)return O}},$host:{get:function get(){if("closed"!==y)return o.host}},$light:{value:o===_assertThisInitialized(r)||!1},$shadow:{value:r.shadowRoot},$event:{value:A},$route:{value:L}}),{root:o,funcs:h,obsers:m,bools:g,events:x,state:j}),R=(i.set(_assertThisInitialized(r),I),I.exec=function(){return new Function("{ ".concat(k," } = this"),"return function() { with (this) return eval(arguments[0]) }").call(this).bind(i.get(this).state)}.call(_assertThisInitialized(r)),new v(c,m));return(R[u]=_assertThisInitialized(r)).addEventListener("init",(function(r){p.delete(r.detail),0===p.size&&(r.stopPropagation(),A(d,"ok"))})),r}return _createClass(_class,[{key:"connectedCallback",value:(O=_asyncToGenerator(o().mark((function _callee(){var r,l,u=this;return o().wrap((function _callee$(o){for(;;)switch(o.prev=o.next){case 0:if(r=i.get(this),l=document.createElement("template"),"string"!=typeof c.template&&void 0!==c.template){o.next=5;break}l.innerHTML=c.template||"",o.next=15;break;case 5:if("function"!=typeof c.template){o.next=14;break}return o.next=8,c.template.call(r.state);case 8:if(o.t0=o.sent,o.t0){o.next=11;break}o.t0="";case 11:l.innerHTML=o.t0,o.next=15;break;case 14:c.template instanceof DocumentFragment&&l.content.append(c.template.cloneNode(!0));case 15:return N.call(this,l.content),r.root.append(l.content),o.next=19,!c.connected||c.connected.call(r.state);case 19:setTimeout((function(){(h.detail=u).dispatchEvent(h)}),0);case 20:case"end":return o.stop()}}),_callee,this)}))),function connectedCallback(){return O.apply(this,arguments)})},{key:"disconnectedCallback",value:(x=_asyncToGenerator(o().mark((function _callee2(){return o().wrap((function _callee2$(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,!c.disconnected||c.disconnected.call(i.get(this).state);case 2:case"end":return r.stop()}}),_callee2,this)}))),function disconnectedCallback(){return x.apply(this,arguments)})},{key:"adoptedCallback",value:(g=_asyncToGenerator(o().mark((function _callee3(){return o().wrap((function _callee3$(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,!c.adopted||c.adopted.call(i.get(this).state);case 2:case"end":return r.stop()}}),_callee3,this)}))),function adoptedCallback(){return g.apply(this,arguments)})},{key:"attributeChangedCallback",value:(m=_asyncToGenerator(o().mark((function _callee4(){var r,l,u,p=arguments;return o().wrap((function _callee4$(o){for(;;)switch(o.prev=o.next){case 0:for(r=p.length,l=new Array(r),u=0;u<r;u++)l[u]=p[u];return o.next=3,!c.changed||c.changed.apply(i.get(this).state,l);case 3:case"end":return o.stop()}}),_callee4,this)}))),function attributeChangedCallback(){return m.apply(this,arguments)})},{key:"$",value:function $(r){return"closed"!==y||this[u]?i.get(this[u]||this).root.querySelector(r):null}},{key:"$$",value:function $$(r){return"closed"!==y||this[u]?i.get(this[u]||this).root.querySelectorAll(r):null}}],[{key:"observedAttributes",get:function get(){if(Array.isArray(c.attributes))return c.attributes}}]),_class}(x),m?{extends:m}:null)}Object.defineProperty(h,"detail",{writable:!0});var y=new Set(["push","pop","shift","unshift","splice","sort","reverse"]),v=function(){function w(r,o){_classCallCheck(this,w),this._init=r,this._obsers=o}return _createClass(w,[{key:"deleteProperty",value:function deleteProperty(r,o){return Array.isArray(r)?r.splice(o,1):delete r[o],this._nodes&&_.call(this[u],this._nodes,this._init),!0}},{key:"apply",value:function apply(r,o,i){return"toString"===r.name?JSON.stringify(o,null," "):y.has(r.name)?(r.apply(this._target,i),this._nodes&&_.call(this[u],this._nodes,this._init),o):r.apply(o,i)}},{key:"get",value:function get(r,o,i){return this._target=r,i=Reflect.get(r,o,i),this._obsers.has(i)?this._obsers.get(i):r.hasOwnProperty(o)?i&&"object"==_typeof(i)?b.call(this[u],i,this):i:"toString"===o||Array.isArray(r)&&y.has(o)?b.call(this[u],i,this):i}},{key:"set",value:function set(r,o,i,c){return!!Reflect.set(r,o,i,c)&&(this._nodes&&_.call(this[u],this._nodes,this._init),!0)}}]),w}();function b(r,o){return o=new Proxy(r,o),i.get(this).obsers.set(r,o),o}var m=/(['"`])[^]*?\1/,g=/;|\b(?:of)|(?:in)\b/,x=/\b[A-Za-z_]\w*?\b/g,k="$state, $props, $host, $light, $shadow, $event, $route, $, $$",O=/{{([^{}]*?)}}/;function N(r,o){var c=this;if(8===r.nodeType)return r.remove();if(3===r.nodeType)r.data.trim()?(h=O.exec(r.data))&&(0===h.index?(l=(d=i.get(this)).exec("() => "+h[1]),r.splitText(h[0].length),d.funcs.set(r,l),o||((d.node=r).data=l(),delete d.node)):r.splitText(h.index)):-1!==r.data.indexOf("\n")?r.data="\n":r.data.length&&(r.data=" ");else{if(":"===r.nodeName[0]||"$"===r.nodeName[0]){var l=i.get(this),u=r.ownerElement;if(u.removeAttribute(r.nodeName),"$for"===r.nodeName){o||(l.node=u);for(var p=new DocumentFragment;u.firstChild;)p.append(u.firstChild);var d=l.exec("(function*() { arguments[0] = yield function() { return eval(arguments[0]) }; while (true) { yield; for (var ".concat(r.value,") arguments[0]() } })()")),h=d.next().value.bind(this.$state);d.next((function(){return function(r,o){if(o.owner.childNodes[o.index])for(var i=0;i<o.length;i++)$.call(this,o.owner.childNodes[o.index+i],r.childNodes[i]);else{var c=r.cloneNode(!0);$.call(this,c,r),o.owner.append(c)}o.index+=o.length}.call(c,p,k)}));var y=r.value.replace(m,"").split(g)[0].match(x).join();o&&(y+=","+o);var v=l.exec;l.exec=h,N.call(this,p,y),l.exec=v;var k={executor:h,iterator:d,length:p.childNodes.length};l.funcs.set(u,k),o||E.call(this,u,l.funcs.get(u))}else{var P;if(v=r.nodeName.slice(1),h=document.createAttribute(v),o||(l.node=h),"on"===h.name.substring(0,2))o?(P=l.exec("() => ((".concat(o,") => () => ").concat(r.nodeValue,")(").concat(o,")")),l.funcs.set(h,P),u.setAttributeNode(h),P._on=v):(P=l.exec("() => "+r.value),u["on"+h.name.slice(2)]=P),u.hasAttribute(":is")&&(l.events.has(u)||l.events.set(u,{}),l.events.get(u)[v]=P);else if(d=l.exec("() => "+r.value),l.funcs.set(h,d),"boolean"==typeof u[v])o?(u.setAttributeNode(h),d._name=v):d()?u.setAttributeNode(h):u.removeAttribute(v),u.hasAttribute(":is")&&(l.bools.has(u)||l.bools.set(u,{}),l.bools.get(u)[v]=d),d._owner=u;else if(o||(h.value=d()),u.setAttributeNode(h),"is"===h.name)if(o){var S;(S=(v=document.createElement("template")).content).append.apply(S,_toConsumableArray(u.childNodes)),d._childs=v.content}else{for(var j=0;j<u.childNodes.length;j++)N.call(this,u.childNodes[j])||j--;d._childs=_toConsumableArray(u.childNodes),E.call(this,h,l.funcs.get(h))}}return o||delete l.node,null}if(r.attributes)for(var I=0;I<r.attributes.length;I++)N.call(this,r.attributes[I],o)||I--;for(var R=0;R<r.childNodes.length;R++)N.call(this,r.childNodes[R],o)||R--}return r}function _(r,o){var c=this,l=i.get(this);o.before&&o.before.call(l.state),r.forEach((function(r){return E.call(c,r,l.funcs.get(r))})),o.after&&o.after.call(l.state)}var P=document.createElement("template");function E(r,o,c){if(o._on)r[o._on]=o();else if(o.iterator){for(var l=(d=i.get(this)).exec,u=(d.exec=o.executor,o.index=0,o.owner=r,o.iterator.next(),o.index),p=r.childNodes.length;p>u;p--)r.lastChild.remove();d.exec=l}else if("is"===r.name){for(var d=o(),h=(r.value=d,r.ownerElement),y=(P.innerHTML="<".concat(h.nodeName,' is="').concat(d,'" />'),P.content.firstElementChild);h.attributes.length;)y.setAttributeNode(h.removeAttributeNode(h.attributes[0]));var v=(l=i.get(this)).bools.get(h);if(v){for(var m in v)v[m]._owner=y;l.bools.delete(h),l.bools.set(y,v)}var g=l.events.get(c||h);if(g){for(var x in g)y[x]=c?g[x]():g[x];l.events.delete(h),l.events.set(y,g)}o._childs instanceof DocumentFragment?(d=o._childs.cloneNode(!0),N.call(this,d),y.append(d)):y.append.apply(y,_toConsumableArray(o._childs)),h.replaceWith(y)}else o._owner?o()?o._name?o._owner.setAttribute(o._name,""):o._owner.setAttributeNode(r):o._owner.removeAttribute(r.nodeName):r.nodeValue=o()}function $(r,o){var c,l=i.get(this).funcs.get(o);if(l&&(l._on&&r.ownerElement?((c=r.ownerElement).removeAttribute(l._on),r=c):l._owner&&(l._owner=r.ownerElement||r),E.call(this,r,l,o.ownerElement)),o.attributes){var u,p=_createForOfIteratorHelper(o.attributes);try{for(p.s();!(u=p.n()).done;){var d=u.value;$.call(this,r.attributes[d.name]||r,d)}}catch(r){p.e(r)}finally{p.f()}}for(var h=0;h<o.childNodes.length;h++)$.call(this,r.childNodes[h],o.childNodes[h])}function A(r){if(this instanceof A?this.constructor:void 0)return new DocumentFragment;for(var o=arguments.length,i=new Array(o>1?o-1:0),c=1;c<o;c++)i[c-1]=arguments[c];r.dispatchEvent(_construct(CustomEvent,i))}var S=/:(\w+)/g,j=new WeakSet;function L(r,o){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(this instanceof L?this.constructor:void 0){var c={};return new(function(r){_inherits(_class2,r);var o=_createSuper(_class2);function _class2(){return _classCallCheck(this,_class2),o.apply(this,arguments)}return _createClass(_class2,[{key:"addEventListener",value:function addEventListener(){for(var r,o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l];c[i[0]]=new RegExp("^".concat(i[0].replace(S,(function(r,o){return"(?<".concat(o,">\\w+)")})),"/?$")),(r=document.addEventListener).call.apply(r,[this].concat(i))}},{key:"getEventRegs",value:function getEventRegs(){return c}}]),_class2}(_wrapNativeSuper(DocumentFragment)))}j.has(r)||(j.add(r),window.addEventListener("popstate",(function(o){T(r,location.href.replace(location.origin,""),o.state)}))),o&&(o=o.replace(location.origin,""),history.pushState(i,"",o),T(r,o,i))}function T(r,o,i){var c=r.getEventRegs();for(var l in c){var u,p=c[l].exec(o);p&&((u=new CustomEvent(l)).url=new URL(location.href),u.params=p.groups,r.dispatchEvent(u,i))}}function C(r,o){var i,l,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(C.clean&&("STYLE"===r.nodeName||"SCRIPT"===r.nodeName||"TEMPLATE"===r.nodeName||8===r.nodeType))return!1;if(r.$state){i=c.createElement(r.nodeName);var p,d=_createForOfIteratorHelper(r.attributes);try{for(d.s();!(p=d.n()).done;){var h=p.value;i.setAttribute(h.name,h.value)}}catch(r){d.e(r)}finally{d.f()}}else i=r.cloneNode(!1);o.append(i),"SLOT"===i.nodeName?(l=r.assignedNodes({flatten:!0}),C.slots.push(i)):l=(r.$shadow||r).childNodes;for(var y=0,v=0;y<l.length;y++,v++)C(l[y],o.childNodes[u],v)||v--;return!0}function t(r){var o;if("string"==typeof r&&((l=document.createElement("template")).innerHTML=r,c=l.content.children[0],l.classList.add(c.nodeName.toLowerCase()),(o=c).replaceWith.apply(o,_toConsumableArray(c.childNodes)),r=l),r instanceof HTMLTemplateElement){var i=r.content,c=_toConsumableArray(i.querySelectorAll("script")).map((function(r){return i.removeChild(r).innerHTML})).join(""),l=new Function("exports",c+"\n return exports")()||function(){return _createClass((function _class3(){_classCallCheck(this,_class3)}))}();Object.defineProperties(l,{name:{value:r.classList[0]},template:{value:i}}),a(l)}else"function"==typeof r&&a(r)}window.Reacton=function(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return o.forEach(t)},window.Reacton.event=A,window.Reacton.route=L,window.Reacton.ssr=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=r.node,i=r.slots,c=r.clean,l=void 0===c||c;return new Promise((function(r){return d.addEventListener("ok",(function(){var c=document.createElement("template");C.clean=l,C.slots=[],C(o||document.children[0],c.content),i||C.slots.forEach((function(r){return r.replaceWith.apply(r,_toConsumableArray(r.childNodes))})),r(o?c.innerHTML:"<!DOCTYPE html>\n"+c.innerHTML)}))}))}}();Reacton('<my-header>\n  <img src="img/logo.jpg" alt="logo">\n</my-header>',"<my-component>\n  <h1>Hello, {{ message }}!</h1>\n        \n  <style>\n    h1 {\n      color: {{ color }};\n    }\n  </style>\n\n  <script>\n    exports = class {\n      message = 'Reacton'\n      color = 'red'\n\n      static mode = 'open' // add Shadow DOM\n    }\n  <\/script>\n</my-component>")})()})();