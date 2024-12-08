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

1. [Quick start](#quick-start)
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

<h2 id="quick-start">Quick start</h2>

<br>

Classes are used to create components. Classes can be either built into the main script or imported from an external module. Create a new working directory, for example named *app*, and download the [rtn.global.js](https://raw.githubusercontent.com/reacton-js/reacton/main/rtn.global.js) file into this directory.

Add an *index.html* file to the directory with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- connect Hello component to the document -->
  <w-hello></w-hello>

  <script src="rtn.global.js"></script>

  <script>
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

    // pass the class of the Hello component to the Rtn function
    Rtn(WHello)
  </script>
</body>
</html>
```

To ensure there are no naming conflicts between standard and custom HTML elements, the component name must contain a dash «-», for example, "my-element" and "super-button" are valid names, but "myelement" is not.

In most of the examples in this guide, the prefix will consist of a single letter «w-». that is, the Hello component will be called "w-hello".

When defining a component class, its prefix and name must begin with a capital letter. WHello is the correct class name, but wHello is not.

When you open the *index.html* file in the browser, the screen will display the message created in the Hello component:

<h1 style="color: orangered;">Hello, Reacton!</h1>

<br>

The components can be placed in separate modules. In this case, the Hello component file would look like the following:

```js
export default class WHello {
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

To work with external components, you will need any development server, such as [lite-server](https://www.npmjs.com/package/lite-server).

You can install this server using the command in the terminal:

```
npm install --global lite-server
```

The server is started from the directory where the application is located using a command in the terminal:

```
lite-server
```

<br>

In addition, the framework supports single-file components that can be used along with modular ones when creating a project in the [webpack](https://webpack.js.org/) build system.

An example of a simple single-file component is shown below:

```html
<h1>Hello, {{ message }}!</h1>
      
<style>
  h1 {
    color: {{ color }};
  }
</style>

<script>
  exports = class WHello {
    // initializing the properties of a state object
    message = 'Reacton'
    color = 'orangered'

    static mode = 'open' // add Shadow DOM
  }
</script>
```

A single-file component must assign its class to the **exports** variable. This variable will be automatically declared during the creation of the component structure in the project's build system.

In single-file components, you can use the [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) instruction, for example:

```html
<script>
  // import default object from module
  import obj from './module.js'

  exports = class WHello {
    // initializing the properties of a state object
    message = obj.message
    color = obj.color

    static mode = 'open' // add Shadow DOM
  }
</script>
```

<br>

Single-file components allow you to separate HTML markup from component logic. However, such components cannot work directly in the browser. They require a special handler that connects to the *webpack*.

To be able to work in the browser with components in which logic is separated from HTML content, there are built-in components.

An example of a simple embedded component is shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- connect Hello component to the document -->
  <w-hello></w-hello>

  <!-- define the template of the Hello component -->
  <template id="tempHello">
    <h1>Hello, {{ message }}!</h1>
          
    <style>
      h1 {
        color: {{ this.color }};
      }
    </style>

    <script>
      return class WHello {
        // initializing the properties of a state object
        message = 'Reacton'
        color = 'orangered'

        static mode = 'open' // add Shadow DOM
      }
    </script>
  </template>

  <script src="rtn.global.js"></script>

  <script>
    // pass the template of the Hello component to the Rtn function
    Rtn(tempHello)
  </script>
</body>
</html>
```

The embedded component should return its class, and the contents of its  &lt;script&gt; tag can be considered as a function. However, embedded components are not suitable for server-side rendering and, in addition, they cannot use the **import** instruction, but it is allowed to use the expression [import()](https://javascript.info/modules-dynamic-imports#the-import-expression), for example:

```html
<script>
  // import a module and save its object in a variable
  let obj = await import('./module.js')

  return class WHello {
    // initializing the properties of a state object
    message = obj.message
    color = obj.color

    static mode = 'open' // add Shadow DOM
  }
</script>
```

<br>

For quick access to the component, it is enough to add an identifier to the element that connects the component to the document, as shown below:

```html
<!-- connect Hello component to the document -->
<w-hello id="hello"></w-hello>
```

Now open the browser console and enter the commands sequentially:

```
hello.$state.message = 'Web Components'
hello.$state.color = 'blue'
```

The color and content of the header will change:

<h1 style="color: blue;">Hello, Web Components!</h1>

<br>
<br>