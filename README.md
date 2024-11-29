<br>

[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

<h3>Reactive Web Components</h3>

<br>

![reacton](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [GitVerse](https://gitverse.ru/awc/reacton) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Download⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/rtn.global.min.js)

<br>

Reacton (short Rtn) is a JavaScript framework for quickly creating reactive [Web Components](https://javascript.info/web-components). It supports all the methods and properties that are provided by standard Web components. In addition, the framework contains a number of additional methods and implements server-side rendering of Web components.

<br>

Below is an example of creating a simple component:

```js
class WHello {
  // initializing the properties of a state object
  message = 'Reacton'
  color = 'orangered'

  static mode = 'open' // add Shadow DOM

  // return the HTML markup of the component
  static template = `
    <h1>Hello, {{ message }}!</h1>
    
    <style>
      h1 {
        color: {{ color }};
      }
    </style>
  `
}
```

<br>

1. ~~[Quick start](#quick-start)~~
2. ~~[Component state](#component-state)~~
3. ~~[Reactive properties](#reactive-properties)~~
4. ~~[Cycles](#cycles)~~
5. ~~[Mixins](#mixins)~~
6. ~~[Static properties](#static-properties)~~
7. ~~[Special methods](#special-methods)~~
8. ~~[Event Emitter](#event-emitter)~~
9. ~~[Router](#router)~~
10. ~~[Server-side rendering](#server-rendering)~~

<br>
<hr>
<br>

***The process of writing documentation for a project...***

<br>
<br>