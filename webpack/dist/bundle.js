(()=>{var r={609:(r,o,i)=>{var c=i(425).default;function _regeneratorRuntime(){"use strict";r.exports=_regeneratorRuntime=function _regeneratorRuntime(){return i},r.exports.__esModule=!0,r.exports.default=r.exports;var o,i={},l=Object.prototype,u=l.hasOwnProperty,p=Object.defineProperty||function(r,o,i){r[o]=i.value},h="function"==typeof Symbol?Symbol:{},d=h.iterator||"@@iterator",y=h.asyncIterator||"@@asyncIterator",v=h.toStringTag||"@@toStringTag";function define(r,o,i){return Object.defineProperty(r,o,{value:i,enumerable:!0,configurable:!0,writable:!0}),r[o]}try{define({},"")}catch(o){define=function define(r,o,i){return r[o]=i}}function wrap(r,o,i,c){var l=o&&o.prototype instanceof Generator?o:Generator,u=Object.create(l.prototype),h=new Context(c||[]);return p(u,"_invoke",{value:makeInvokeMethod(r,i,h)}),u}function tryCatch(r,o,i){try{return{type:"normal",arg:r.call(o,i)}}catch(r){return{type:"throw",arg:r}}}i.wrap=wrap;var m="suspendedStart",g="suspendedYield",x="executing",k="completed",O={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var P={};define(P,d,(function(){return this}));var S=Object.getPrototypeOf,I=S&&S(S(values([])));I&&I!==l&&u.call(I,d)&&(P=I);var j=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(P);function defineIteratorMethods(r){["next","throw","return"].forEach((function(o){define(r,o,(function(r){return this._invoke(o,r)}))}))}function AsyncIterator(r,o){function invoke(i,l,p,h){var d=tryCatch(r[i],r,l);if("throw"!==d.type){var y=d.arg,v=y.value;return v&&"object"==c(v)&&u.call(v,"__await")?o.resolve(v.__await).then((function(r){invoke("next",r,p,h)}),(function(r){invoke("throw",r,p,h)})):o.resolve(v).then((function(r){y.value=r,p(y)}),(function(r){return invoke("throw",r,p,h)}))}h(d.arg)}var i;p(this,"_invoke",{value:function value(r,c){function callInvokeWithMethodAndArg(){return new o((function(o,i){invoke(r,c,o,i)}))}return i=i?i.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(r,i,c){var l=m;return function(u,p){if(l===x)throw new Error("Generator is already running");if(l===k){if("throw"===u)throw p;return{value:o,done:!0}}for(c.method=u,c.arg=p;;){var h=c.delegate;if(h){var d=maybeInvokeDelegate(h,c);if(d){if(d===O)continue;return d}}if("next"===c.method)c.sent=c._sent=c.arg;else if("throw"===c.method){if(l===m)throw l=k,c.arg;c.dispatchException(c.arg)}else"return"===c.method&&c.abrupt("return",c.arg);l=x;var y=tryCatch(r,i,c);if("normal"===y.type){if(l=c.done?k:g,y.arg===O)continue;return{value:y.arg,done:c.done}}"throw"===y.type&&(l=k,c.method="throw",c.arg=y.arg)}}}function maybeInvokeDelegate(r,i){var c=i.method,l=r.iterator[c];if(l===o)return i.delegate=null,"throw"===c&&r.iterator.return&&(i.method="return",i.arg=o,maybeInvokeDelegate(r,i),"throw"===i.method)||"return"!==c&&(i.method="throw",i.arg=new TypeError("The iterator does not provide a '"+c+"' method")),O;var u=tryCatch(l,r.iterator,i.arg);if("throw"===u.type)return i.method="throw",i.arg=u.arg,i.delegate=null,O;var p=u.arg;return p?p.done?(i[r.resultName]=p.value,i.next=r.nextLoc,"return"!==i.method&&(i.method="next",i.arg=o),i.delegate=null,O):p:(i.method="throw",i.arg=new TypeError("iterator result is not an object"),i.delegate=null,O)}function pushTryEntry(r){var o={tryLoc:r[0]};1 in r&&(o.catchLoc=r[1]),2 in r&&(o.finallyLoc=r[2],o.afterLoc=r[3]),this.tryEntries.push(o)}function resetTryEntry(r){var o=r.completion||{};o.type="normal",delete o.arg,r.completion=o}function Context(r){this.tryEntries=[{tryLoc:"root"}],r.forEach(pushTryEntry,this),this.reset(!0)}function values(r){if(r||""===r){var i=r[d];if(i)return i.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var l=-1,p=function next(){for(;++l<r.length;)if(u.call(r,l))return next.value=r[l],next.done=!1,next;return next.value=o,next.done=!0,next};return p.next=p}}throw new TypeError(c(r)+" is not iterable")}return GeneratorFunction.prototype=GeneratorFunctionPrototype,p(j,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),p(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,v,"GeneratorFunction"),i.isGeneratorFunction=function(r){var o="function"==typeof r&&r.constructor;return!!o&&(o===GeneratorFunction||"GeneratorFunction"===(o.displayName||o.name))},i.mark=function(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,GeneratorFunctionPrototype):(r.__proto__=GeneratorFunctionPrototype,define(r,v,"GeneratorFunction")),r.prototype=Object.create(j),r},i.awrap=function(r){return{__await:r}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,y,(function(){return this})),i.AsyncIterator=AsyncIterator,i.async=function(r,o,c,l,u){void 0===u&&(u=Promise);var p=new AsyncIterator(wrap(r,o,c,l),u);return i.isGeneratorFunction(o)?p:p.next().then((function(r){return r.done?r.value:p.next()}))},defineIteratorMethods(j),define(j,v,"Generator"),define(j,d,(function(){return this})),define(j,"toString",(function(){return"[object Generator]"})),i.keys=function(r){var o=Object(r),i=[];for(var c in o)i.push(c);return i.reverse(),function next(){for(;i.length;){var r=i.pop();if(r in o)return next.value=r,next.done=!1,next}return next.done=!0,next}},i.values=values,Context.prototype={constructor:Context,reset:function reset(r){if(this.prev=0,this.next=0,this.sent=this._sent=o,this.done=!1,this.delegate=null,this.method="next",this.arg=o,this.tryEntries.forEach(resetTryEntry),!r)for(var i in this)"t"===i.charAt(0)&&u.call(this,i)&&!isNaN(+i.slice(1))&&(this[i]=o)},stop:function stop(){this.done=!0;var r=this.tryEntries[0].completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function dispatchException(r){if(this.done)throw r;var i=this;function handle(c,l){return p.type="throw",p.arg=r,i.next=c,l&&(i.method="next",i.arg=o),!!l}for(var c=this.tryEntries.length-1;c>=0;--c){var l=this.tryEntries[c],p=l.completion;if("root"===l.tryLoc)return handle("end");if(l.tryLoc<=this.prev){var h=u.call(l,"catchLoc"),d=u.call(l,"finallyLoc");if(h&&d){if(this.prev<l.catchLoc)return handle(l.catchLoc,!0);if(this.prev<l.finallyLoc)return handle(l.finallyLoc)}else if(h){if(this.prev<l.catchLoc)return handle(l.catchLoc,!0)}else{if(!d)throw new Error("try statement without catch or finally");if(this.prev<l.finallyLoc)return handle(l.finallyLoc)}}}},abrupt:function abrupt(r,o){for(var i=this.tryEntries.length-1;i>=0;--i){var c=this.tryEntries[i];if(c.tryLoc<=this.prev&&u.call(c,"finallyLoc")&&this.prev<c.finallyLoc){var l=c;break}}l&&("break"===r||"continue"===r)&&l.tryLoc<=o&&o<=l.finallyLoc&&(l=null);var p=l?l.completion:{};return p.type=r,p.arg=o,l?(this.method="next",this.next=l.finallyLoc,O):this.complete(p)},complete:function complete(r,o){if("throw"===r.type)throw r.arg;return"break"===r.type||"continue"===r.type?this.next=r.arg:"return"===r.type?(this.rval=this.arg=r.arg,this.method="return",this.next="end"):"normal"===r.type&&o&&(this.next=o),O},finish:function finish(r){for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o];if(i.finallyLoc===r)return this.complete(i.completion,i.afterLoc),resetTryEntry(i),O}},catch:function _catch(r){for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o];if(i.tryLoc===r){var c=i.completion;if("throw"===c.type){var l=c.arg;resetTryEntry(i)}return l}}throw new Error("illegal catch attempt")},delegateYield:function delegateYield(r,i,c){return this.delegate={iterator:values(r),resultName:i,nextLoc:c},"next"===this.method&&(this.arg=o),O}},i}r.exports=_regeneratorRuntime,r.exports.__esModule=!0,r.exports.default=r.exports},425:r=>{function _typeof(o){return r.exports=_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},r.exports.__esModule=!0,r.exports.default=r.exports,_typeof(o)}r.exports=_typeof,r.exports.__esModule=!0,r.exports.default=r.exports},841:(r,o,i)=>{var c=i(609)();r.exports=c;try{regeneratorRuntime=c}catch(r){"object"==typeof globalThis?globalThis.regeneratorRuntime=c:Function("r","regeneratorRuntime = r")(c)}}},o={};function __webpack_require__(i){var c=o[i];if(void 0!==c)return c.exports;var l=o[i]={exports:{}};return r[i](l,l.exports,__webpack_require__),l.exports}__webpack_require__.n=r=>{var o=r&&r.__esModule?()=>r.default:()=>r;return __webpack_require__.d(o,{a:o}),o},__webpack_require__.d=(r,o)=>{for(var i in o)__webpack_require__.o(o,i)&&!__webpack_require__.o(r,i)&&Object.defineProperty(r,i,{enumerable:!0,get:o[i]})},__webpack_require__.o=(r,o)=>Object.prototype.hasOwnProperty.call(r,o),(()=>{"use strict";function _getPrototypeOf(r){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(r){return r.__proto__||Object.getPrototypeOf(r)},_getPrototypeOf(r)}function _setPrototypeOf(r,o){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function _setPrototypeOf(r,o){return r.__proto__=o,r},_setPrototypeOf(r,o)}function _construct(r,o,i){return _construct=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(r){return!1}}()?Reflect.construct.bind():function _construct(r,o,i){var c=[null];c.push.apply(c,o);var l=new(Function.bind.apply(r,c));return i&&_setPrototypeOf(l,i.prototype),l},_construct.apply(null,arguments)}function _wrapNativeSuper(r){var o="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function _wrapNativeSuper(r){if(null===r||!function _isNativeFunction(r){return-1!==Function.toString.call(r).indexOf("[native code]")}(r))return r;if("function"!=typeof r)throw new TypeError("Super expression must either be null or a function");if(void 0!==o){if(o.has(r))return o.get(r);o.set(r,Wrapper)}function Wrapper(){return _construct(r,arguments,_getPrototypeOf(this).constructor)}return Wrapper.prototype=Object.create(r.prototype,{constructor:{value:Wrapper,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(Wrapper,r)},_wrapNativeSuper(r)}function _arrayLikeToArray(r,o){(null==o||o>r.length)&&(o=r.length);for(var i=0,c=new Array(o);i<o;i++)c[i]=r[i];return c}function _toConsumableArray(r){return function _arrayWithoutHoles(r){if(Array.isArray(r))return _arrayLikeToArray(r)}(r)||function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||function _unsupportedIterableToArray(r,o){if(r){if("string"==typeof r)return _arrayLikeToArray(r,o);var i=Object.prototype.toString.call(r).slice(8,-1);return"Object"===i&&r.constructor&&(i=r.constructor.name),"Map"===i||"Set"===i?Array.from(r):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(r,o):void 0}}(r)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function asyncGeneratorStep(r,o,i,c,l,u,p){try{var h=r[u](p),d=h.value}catch(r){return void i(r)}h.done?o(d):Promise.resolve(d).then(c,l)}function _asyncToGenerator(r){return function(){var o=this,i=arguments;return new Promise((function(c,l){var u=r.apply(o,i);function _next(r){asyncGeneratorStep(u,c,l,_next,_throw,"next",r)}function _throw(r){asyncGeneratorStep(u,c,l,_next,_throw,"throw",r)}_next(void 0)}))}}function _typeof(r){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},_typeof(r)}function _classCallCheck(r,o){if(!(r instanceof o))throw new TypeError("Cannot call a class as a function")}function _toPropertyKey(r){var o=function _toPrimitive(r,o){if("object"!==_typeof(r)||null===r)return r;var i=r[Symbol.toPrimitive];if(void 0!==i){var c=i.call(r,o||"default");if("object"!==_typeof(c))return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===o?String:Number)(r)}(r,"string");return"symbol"===_typeof(o)?o:String(o)}function _defineProperties(r,o){for(var i=0;i<o.length;i++){var c=o[i];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(r,_toPropertyKey(c.key),c)}}function _createClass(r,o,i){return o&&_defineProperties(r.prototype,o),i&&_defineProperties(r,i),Object.defineProperty(r,"prototype",{writable:!1}),r}function _assertThisInitialized(r){if(void 0===r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function _inherits(r,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(o&&o.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),Object.defineProperty(r,"prototype",{writable:!1}),o&&_setPrototypeOf(r,o)}var r=__webpack_require__(841),o=__webpack_require__.n(r);function _createForOfIteratorHelper(r,o){var i="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!i){if(Array.isArray(r)||(i=function reacton_min_unsupportedIterableToArray(r,o){if(!r)return;if("string"==typeof r)return reacton_min_arrayLikeToArray(r,o);var i=Object.prototype.toString.call(r).slice(8,-1);"Object"===i&&r.constructor&&(i=r.constructor.name);if("Map"===i||"Set"===i)return Array.from(r);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return reacton_min_arrayLikeToArray(r,o)}(r))||o&&r&&"number"==typeof r.length){i&&(r=i);var c=0,l=function F(){};return{s:l,n:function n(){return c>=r.length?{done:!0}:{done:!1,value:r[c++]}},e:function e(r){throw r},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,p=!0,h=!1;return{s:function s(){i=i.call(r)},n:function n(){var r=i.next();return p=r.done,r},e:function e(r){h=!0,u=r},f:function f(){try{p||null==i.return||i.return()}finally{if(h)throw u}}}}function reacton_min_arrayLikeToArray(r,o){(null==o||o>r.length)&&(o=r.length);for(var i=0,c=new Array(o);i<o;i++)c[i]=r[i];return c}function _createSuper(r){var o=function reacton_min_isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(r){return!1}}();return function _createSuperInternal(){var i,c=_getPrototypeOf(r);if(o){var l=_getPrototypeOf(this).constructor;i=Reflect.construct(c,arguments,l)}else i=c.apply(this,arguments);return function _possibleConstructorReturn(r,o){if(o&&("object"===_typeof(o)||"function"==typeof o))return o;if(void 0!==o)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(r)}(this,i)}}!function(){var r=/[A-Z]/g,i=new WeakMap,c=document.implementation.createHTMLDocument(),l={get:function get(r,o){return r.hasOwnProperty(o)?r[o].value:r[o]},set:function set(r,o,i){return r[o].value=i,!0}},u=Symbol(),p=new Set,h=new A,d=new CustomEvent("init",{bubbles:!0,composed:!0});function a(c){var y=(c.mode||"").toLowerCase(),m=(c.extends||"").toLowerCase(),g=c.name.replace(r,(function(r,o){return(0<o?"-":"")+r.toLowerCase()})),x=m?Object.getPrototypeOf(document.createElement(m)).constructor:HTMLElement;customElements.define(g,function(r){_inherits(_class,r);var m,g,x,O,P=_createSuper(_class);function _class(){var r;_classCallCheck(this,_class),r=P.call(this),p.add(_assertThisInitialized(r));var o=y?r.attachShadow({mode:y}):_assertThisInitialized(r),d=new WeakMap,m=new WeakMap,g=new WeakMap,x=new WeakMap,O=new Proxy(r.attributes,l),S={},I=new Proxy(new c,{get:function get(o,i,c){return i===u?_assertThisInitialized(r):o.hasOwnProperty(i)?(j.node&&(S[i]||(S[i]=new Set),S[i].add(j.node)),R._nodes=S[i],j.obsers.has(o[i])?j.obsers.get(o[i]):o[i]&&"object"==_typeof(o[i])?b.call(_assertThisInitialized(r),o[i],R):o[i]):(o=o.__proto__||Object.getPrototypeOf(o),"symbol"==_typeof(i)||i in o?Reflect.get(o,i,c):r[i])},set:function set(o,i,l,u){return!!Reflect.set(o,i,l,u)&&(S[i]&&_.call(_assertThisInitialized(r),S[i],c),!0)}}),j=(Object.defineProperties(_assertThisInitialized(r),{$state:{get:function get(){if("closed"!==y)return I}},$props:{get:function get(){if("closed"!==y)return O}},$host:{get:function get(){if("closed"!==y)return o.host}},$light:{value:o===_assertThisInitialized(r)||!1},$shadow:{value:r.shadowRoot},$event:{value:A},$route:{value:L}}),{root:o,funcs:d,obsers:m,bools:g,events:x,state:I}),R=(i.set(_assertThisInitialized(r),j),j.exec=function(){return new Function("{ ".concat(k," } = this"),"return function() { with (this) return eval(arguments[0]) }").call(this).bind(i.get(this).state)}.call(_assertThisInitialized(r)),new v(c,m));return(R[u]=_assertThisInitialized(r)).addEventListener("init",(function(r){p.delete(r.detail),0===p.size&&(r.stopPropagation(),A(h,"ok"))})),r}return _createClass(_class,[{key:"connectedCallback",value:(O=_asyncToGenerator(o().mark((function _callee(){var r,l,u=this;return o().wrap((function _callee$(o){for(;;)switch(o.prev=o.next){case 0:if(r=i.get(this),l=document.createElement("template"),"string"!=typeof c.template&&void 0!==c.template){o.next=5;break}l.innerHTML=c.template||"",o.next=15;break;case 5:if("function"!=typeof c.template){o.next=14;break}return o.next=8,c.template.call(r.state);case 8:if(o.t0=o.sent,o.t0){o.next=11;break}o.t0="";case 11:l.innerHTML=o.t0,o.next=15;break;case 14:c.template instanceof DocumentFragment&&l.content.append(c.template.cloneNode(!0));case 15:return N.call(this,l.content),r.root.append(l.content),o.next=19,!c.connected||c.connected.call(r.state);case 19:setTimeout((function(){(d.detail=u).dispatchEvent(d)}),0);case 20:case"end":return o.stop()}}),_callee,this)}))),function connectedCallback(){return O.apply(this,arguments)})},{key:"disconnectedCallback",value:(x=_asyncToGenerator(o().mark((function _callee2(){return o().wrap((function _callee2$(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,!c.disconnected||c.disconnected.call(i.get(this).state);case 2:case"end":return r.stop()}}),_callee2,this)}))),function disconnectedCallback(){return x.apply(this,arguments)})},{key:"adoptedCallback",value:(g=_asyncToGenerator(o().mark((function _callee3(){return o().wrap((function _callee3$(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,!c.adopted||c.adopted.call(i.get(this).state);case 2:case"end":return r.stop()}}),_callee3,this)}))),function adoptedCallback(){return g.apply(this,arguments)})},{key:"attributeChangedCallback",value:(m=_asyncToGenerator(o().mark((function _callee4(){var r,l,u,p=arguments;return o().wrap((function _callee4$(o){for(;;)switch(o.prev=o.next){case 0:for(r=p.length,l=new Array(r),u=0;u<r;u++)l[u]=p[u];return o.next=3,!c.changed||c.changed.apply(i.get(this).state,l);case 3:case"end":return o.stop()}}),_callee4,this)}))),function attributeChangedCallback(){return m.apply(this,arguments)})},{key:"$",value:function $(r){return"closed"!==y||this[u]?i.get(this[u]||this).root.querySelector(r):null}},{key:"$$",value:function $$(r){return"closed"!==y||this[u]?i.get(this[u]||this).root.querySelectorAll(r):null}},{key:"$entities",value:function $entities(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}],[{key:"observedAttributes",get:function get(){if(Array.isArray(c.attributes))return c.attributes}}]),_class}(x),m?{extends:m}:null)}Object.defineProperty(d,"detail",{writable:!0});var y=new Set(["push","pop","shift","unshift","splice","sort","reverse"]),v=function(){function w(r,o){_classCallCheck(this,w),this._init=r,this._obsers=o}return _createClass(w,[{key:"deleteProperty",value:function deleteProperty(r,o){return Array.isArray(r)?r.splice(o,1):delete r[o],this._nodes&&_.call(this[u],this._nodes,this._init),!0}},{key:"apply",value:function apply(r,o,i){return"toString"===r.name?JSON.stringify(o,null," "):y.has(r.name)?(r.apply(this._target,i),this._nodes&&_.call(this[u],this._nodes,this._init),o):r.apply(o,i)}},{key:"get",value:function get(r,o,i){return this._target=r,i=Reflect.get(r,o,i),this._obsers.has(i)?this._obsers.get(i):r.hasOwnProperty(o)?i&&"object"==_typeof(i)?b.call(this[u],i,this):i:"toString"===o||Array.isArray(r)&&y.has(o)?b.call(this[u],i,this):i}},{key:"set",value:function set(r,o,i,c){return!!Reflect.set(r,o,i,c)&&(this._nodes&&_.call(this[u],this._nodes,this._init),!0)}}]),w}();function b(r,o){return o=new Proxy(r,o),i.get(this).obsers.set(r,o),o}var m=/(['"`])[^]*?\1/,g=/;|\b(?:of)|(?:in)\b/,x=/\b[A-Za-z_]\w*?\b/g,k="$state, $props, $host, $light, $shadow, $event, $route, $, $$",O=/{{([^{}]*?)}}/;function N(r,o){var c=this;if(8===r.nodeType)return r.remove();if(3===r.nodeType)r.data.trim()?(d=O.exec(r.data))&&(0===d.index?(l=(h=i.get(this)).exec("() => "+d[1]),r.splitText(d[0].length),h.funcs.set(r,l),o||((h.node=r).data=l(),delete h.node)):r.splitText(d.index)):-1!==r.data.indexOf("\n")?r.data="\n":r.data.length&&(r.data=" ");else{if(":"===r.nodeName[0]||"$"===r.nodeName[0]){var l=i.get(this),u=r.ownerElement;if(u.removeAttribute(r.nodeName),"$for"===r.nodeName){o||(l.node=u);for(var p=new DocumentFragment;u.firstChild;)p.append(u.firstChild);var h=l.exec("(function*() { arguments[0] = yield function() { return eval(arguments[0]) }; while (true) { yield; for (var ".concat(r.value,") arguments[0]() } })()")),d=h.next().value.bind(this.$state);h.next((function(){return function(r,o){if(o.owner.childNodes[o.index])for(var i=0;i<o.length;i++)$.call(this,o.owner.childNodes[o.index+i],r.childNodes[i]);else{var c=r.cloneNode(!0);$.call(this,c,r),o.owner.append(c)}o.index+=o.length}.call(c,p,k)}));var y=r.value.replace(m,"").split(g)[0].match(x).join();o&&(y+=","+o);var v=l.exec;l.exec=d,N.call(this,p,y),l.exec=v;var k={executor:d,iterator:h,length:p.childNodes.length};l.funcs.set(u,k),o||E.call(this,u,l.funcs.get(u))}else if(v=r.nodeName.slice(1),d=document.createAttribute(v),o||(l.node=d),"on"===d.name.substring(0,2)){var P,S=r.value.trim();"function"==typeof this.$state[S]&&(S+="()"),o?(P=l.exec("() => ((".concat(o,") => () => ").concat(S,")(").concat(o,")")),l.funcs.set(d,P),u.setAttributeNode(d),P._on=v):(P=l.exec("() => "+S),u["on"+d.name.slice(2)]=P),u.hasAttribute(":is")&&(l.events.has(u)||l.events.set(u,{}),l.events.get(u)[v]=P)}else if(h=l.exec("() => "+r.value),l.funcs.set(d,h),"boolean"==typeof u[v])o?(u.setAttributeNode(d),h._name=v):h()?u.setAttributeNode(d):u.removeAttribute(v),u.hasAttribute(":is")&&(l.bools.has(u)||l.bools.set(u,{}),l.bools.get(u)[v]=h),h._owner=u;else if(o||(d.value=h()),u.setAttributeNode(d),"is"===d.name)if(o){var I;(I=(v=document.createElement("template")).content).append.apply(I,_toConsumableArray(u.childNodes)),h._childs=v.content}else{for(var j=0;j<u.childNodes.length;j++)N.call(this,u.childNodes[j])||j--;h._childs=_toConsumableArray(u.childNodes),E.call(this,d,l.funcs.get(d))}return o||delete l.node,null}if(r.attributes)for(var R=0;R<r.attributes.length;R++)N.call(this,r.attributes[R],o)||R--;for(var M=0;M<r.childNodes.length;M++)N.call(this,r.childNodes[M],o)||M--}return r}function _(r,o){var c=this,l=i.get(this);o.before&&o.before.call(l.state),r.forEach((function(r){return E.call(c,r,l.funcs.get(r))})),o.after&&o.after.call(l.state)}var P=document.createElement("template");function E(r,o,c){if(o._on)r[o._on]=o();else if(o.iterator){for(var l=(h=i.get(this)).exec,u=(h.exec=o.executor,o.index=0,o.owner=r,o.iterator.next(),o.index),p=r.childNodes.length;p>u;p--)r.lastChild.remove();h.exec=l}else if("is"===r.name){for(var h=o(),d=(r.value=h,r.ownerElement),y=(P.innerHTML="<".concat(d.nodeName,' is="').concat(h,'" />'),P.content.firstElementChild);d.attributes.length;)y.setAttributeNode(d.removeAttributeNode(d.attributes[0]));var v=(l=i.get(this)).bools.get(d);if(v){for(var m in v)v[m]._owner=y;l.bools.delete(d),l.bools.set(y,v)}var g=l.events.get(c||d);if(g){for(var x in g)y[x]=c?g[x]():g[x];l.events.delete(d),l.events.set(y,g)}o._childs instanceof DocumentFragment?(h=o._childs.cloneNode(!0),N.call(this,h),y.append(h)):y.append.apply(y,_toConsumableArray(o._childs)),d.replaceWith(y)}else o._owner?o()?o._name?o._owner.setAttribute(o._name,""):o._owner.setAttributeNode(r):o._owner.removeAttribute(r.nodeName):r.nodeValue=o()}function $(r,o){var c,l=i.get(this).funcs.get(o);if(l&&(l._on&&r.ownerElement?((c=r.ownerElement).removeAttribute(l._on),r=c):l._owner&&(l._owner=r.ownerElement||r),E.call(this,r,l,o.ownerElement)),o.attributes){var u,p=_createForOfIteratorHelper(o.attributes);try{for(p.s();!(u=p.n()).done;){var h=u.value;$.call(this,r.attributes[h.name]||r,h)}}catch(r){p.e(r)}finally{p.f()}}for(var d=0;d<o.childNodes.length;d++)$.call(this,r.childNodes[d],o.childNodes[d])}function A(r){if(this instanceof A?this.constructor:void 0)return new DocumentFragment;for(var o=arguments.length,i=new Array(o>1?o-1:0),c=1;c<o;c++)i[c-1]=arguments[c];r.dispatchEvent(_construct(CustomEvent,i))}var S=/:(\w+)/g,I=new WeakSet;function L(r,o){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(this instanceof L?this.constructor:void 0){var c={};return new(function(r){_inherits(_class2,r);var o=_createSuper(_class2);function _class2(){return _classCallCheck(this,_class2),o.apply(this,arguments)}return _createClass(_class2,[{key:"addEventListener",value:function addEventListener(){for(var r,o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l];c[i[0]]=new RegExp("^".concat(i[0].replace(S,(function(r,o){return"(?<".concat(o,">\\w+)")})),"/?$")),(r=document.addEventListener).call.apply(r,[this].concat(i))}},{key:"getEventRegs",value:function getEventRegs(){return c}}]),_class2}(_wrapNativeSuper(DocumentFragment)))}I.has(r)||(I.add(r),window.addEventListener("popstate",(function(o){T(r,location.href.replace(location.origin,""),o.state)}))),o&&(o=o.replace(location.origin,""),history.pushState(i,"",o),T(r,o,i))}function T(r,o,i){var c=r.getEventRegs();for(var l in c){var u,p=c[l].exec(o);p&&((u=new CustomEvent(l)).url=new URL(location.href),u.params=p.groups,r.dispatchEvent(u,i))}}function C(r,o){var i,l,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(C.clean&&("STYLE"===r.nodeName||"SCRIPT"===r.nodeName||"TEMPLATE"===r.nodeName||8===r.nodeType))return!1;if(r.$state){i=c.createElement(r.nodeName);var p,h=_createForOfIteratorHelper(r.attributes);try{for(h.s();!(p=h.n()).done;){var d=p.value;i.setAttribute(d.name,d.value)}}catch(r){h.e(r)}finally{h.f()}}else i=r.cloneNode(!1);o.append(i),"SLOT"===i.nodeName?(l=r.assignedNodes({flatten:!0}),C.slots.push(i)):l=(r.$shadow||r).childNodes;for(var y=0,v=0;y<l.length;y++,v++)C(l[y],o.childNodes[u],v)||v--;return!0}function t(r){var o;if("string"==typeof r&&((l=document.createElement("template")).innerHTML=r,c=l.content.children[0],l.classList.add(c.nodeName.toLowerCase()),(o=c).replaceWith.apply(o,_toConsumableArray(c.childNodes)),r=l),r instanceof HTMLTemplateElement){var i=r.content,c=_toConsumableArray(i.querySelectorAll("script")).map((function(r){return i.removeChild(r).innerHTML})).join(""),l=new Function("exports",c+"\n return exports")()||function(){return _createClass((function _class3(){_classCallCheck(this,_class3)}))}();Object.defineProperties(l,{name:{value:l.name&&"exports"!==l.name?l.name:r.classList[0]},template:{value:i}}),a(l)}else"function"==typeof r&&a(r)}window.Reacton=function(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return o.forEach(t)},window.Reacton.event=A,window.Reacton.route=L,window.Reacton.ssr=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=r.node,i=r.slots,c=r.clean,l=void 0===c||c;return new Promise((function(r){return h.addEventListener("ok",(function(){var c=document.createElement("template");C.clean=l,C.slots=[],C(o||document.children[0],c.content),i||C.slots.forEach((function(r){return r.replaceWith.apply(r,_toConsumableArray(r.childNodes))})),r(o?c.innerHTML:"<!DOCTYPE html>\n"+c.innerHTML)}))}))}}();var i=function(){function _default(){_classCallCheck(this,_default)}return _createClass(_default,[{key:"getStringInUpperCase",value:function getStringInUpperCase(r){return r.toLocaleUpperCase()}}]),_default}();Reacton(class{static name="my-header";static template='<img src="img/logo.jpg" alt="logo">'},class extends i{message="Reacton";color="red";static mode="open";static name="my-component";static template="<h1>Hello, {{ getStringInUpperCase(message) }}!</h1>\n        \n  <style>\n    h1 {\n      color: {{ color }};\n    }\n  </style>"})})()})();