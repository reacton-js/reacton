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
2. [Component state](#component-state)
3. [Cycles](#cycles)
4. [Mixins](#mixins)
5. [Views](#views)
6. [Reactive properties](#reactive-properties)
7. ~~[Static properties](#static-properties)~~
8. ~~[Special methods](#special-methods)~~
9. ~~[Event Emitter](#event-emitter)~~
10. ~~[Router](#router)~~
11. ~~[Server-side rendering](#server-rendering)~~

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
        color: {{ color }};
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
<h2 id="component-state">Component state</h2>

<br>

Each component can contain changing data, which is called a state. The state can be defined in the constructor of the component class:

```js
class WHello {
  constructor() {
    // initializing the properties of a state object
    this.message = 'Reacton'
    this.color = 'orangered'
  }
  ...
}
```

Alternatively, using the new syntax, you can define the state directly in the class itself:

```js
class WHello {
  // initializing the properties of a state object
  message = 'Reacton'
  color = 'orangered'
  ...
}
```

<br>

The methods of a component are not a state. They are designed to perform actions with the state of the component and are stored in the prototype of the state object:

```js
class WHello {
  // initializing the property of a state object
  message = 'Reacton'

  // define the method of the state object
  printStr(str) {
    return this.message
  }

  // return the HTML markup of the component
  static template = `<h1>Hello, {{ printStr() }}!</h1>`
}
```

<br>

The special property *$state* is used to access the state object. Using this property, you can get or assign a new value to the state, as shown below:

```
hello.$state.message = 'Web Components'
```

The component content is updated automatically based on the new state.

<br>

When the content of a component is updated, its old DOM is not deleted. This means that the handlers assigned to the elements inside the component are preserved, since the old element is not replaced by a new element.

In the example below, the handler for the &lt;h1&gt; element will still work after the component state is updated. Because the update will only change the old value of its attribute and text content:

```js
class WHello {
  // initializing the property of a state object
  message = 'Reacton'

  /* this method is performed after connecting the component to the document
    when the DOM has already been created for the component from which you can select elements */
  static connected() {
    this.$('h1').addEventListener('click', e => console.log(e.target))
  }

  // return the HTML markup of the component
  static template = `<h1 :title="message">Hello, {{ message }}!</h1>`
}
```

<br>
<br>
<h2 id="cycles">Cycles</h2>

<br>

Reacton supports three kinds of *«for»* loops that are implemented in JavaScript. They are all defined with a special ***$for*** attribute and output the contents of their HTML elements as many times as required by the loop condition.

*This attribute will not be displayed in the compiled component.*

In the example below, the *«for»* loop outputs 10 paragraphs with numbers from 0 to 9:

```js
class WHello {
  // return the HTML markup of the component
  static template = `
    <div $for="i = 0; i < 10; i++">
      <p>Number: {{ i }}</p>
    </div>
  `
}
```

In the special attribute ***$for*** you cannot use variable definition operators: *var*, *let* and *const* respectively. This will result in an error:

```js
static template = `
  <div $for="let i = 0; i < 10; i++">
    <p>Number: {{ i }}</p>
  </div>
`
```

<br>

The *«for-in»* loop is used to output the contents of objects, as shown below:

```js
class WHello {
  // initializing the property of a state object
  user = {
    name: 'John',
    age: 32
  }

  // return the HTML markup of the component
  static template = `
    <ul $for="prop in user">
      <li>
        <b>{{ prop }}</b>: {{ user[prop] }}
      </li>
    </ul>
  `
}
```

<br>

The *«for-of»* loop is designed to work with arrays:

```js
class WHello {
  // initializing the property of a state object
  colors = ['red', 'green', 'blue']

  // return the HTML markup of the component
  static template = `
    <ul $for="col of colors">
      <li>{{ col }}</li>
    </ul>
  `
}
```

<br>

When using events in loops using the special ***@event*** attribute, they will use the current value of the loop variable for their iteration phase:

```js
static template = `
  <ul $for="col of colors">
    <li @click="console.log(col)">{{ col }}</li>
  </ul>
`
```

*More details about these events and other special attributes will be discussed later in the guide.*

<br>

You can use loops with any nesting depth:

```js
class WHello {
  // initializing the property of a state object
  users = [
    {
      name: 'John',
      age: 32,
      skills: {
        frontend: ['HTML', 'CSS'],
        backend: ['Ruby', 'PHP', 'MySQL']
      }
    },
    {
      name: 'Clementine',
      age: 25,
      skills: {
        frontend: ['HTML', 'JavaScript'],
        backend: ['PHP']
      }
    },
    {
      name: 'Chelsey',
      age: 30,
      skills: {
        frontend: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
        backend: ['Ruby', 'MySQL']
      }
    }
  ]

  // return the HTML markup of the component
  static template = `
    <div $for="user of users">
      <div>
        <p>
          <b>Name</b>: {{ user.name }}
        </p>
        <p>
          <b>Age</b>: {{ user.age }}
        </p>
        <div $for="category in user.skills">
          <b>{{ category[0].toUpperCase() + category.slice(1) }}</b>:
          <ol $for="item of user.skills[category]">
            <li>{{ item }}</li>
          </ol>
        </div>
      </div>
      <hr>
    </div>
  `
}
```

<br>
<br>
<h2 id="mixins">Mixins</h2>

<br>

Mixin is a general term in object-oriented programming: a class that contains methods for other classes. These methods can use different components, which eliminates the need to create methods with the same functionality for each component separately.

In the example below, the mixin's *printName()* method is used by the Hello and Goodbye components:

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

   <!-- connect Goodbye component to the document -->
  <w-goodbye></w-goodbye>

  <script src="rtn.global.js"></script>

  <script>
    // define a Mixin class for common methods
    class Mixin {
      printName() {
        return this.userName
      }
    }

    // extend the Hello component class from the Mixin class
    class WHello extends Mixin {
      // initializing the property of a state object
      userName = 'Anna'

      // return the HTML markup of the component
      static template = `<h1>Hello, {{ printName() }}!</h1>`
    }

    // extend the Goodbye component class from the Mixin class
    class WGoodbye extends Mixin {
      // initializing the property of a state object
      userName = 'John'

      // return the HTML markup of the component
      static template = `<p>Goodbye, {{ printName() }}...</p>`
    }

    // pass the Hello and Goodbye component classes to the Rtn function
    Rtn(WHello, WGoodbye)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="views">Views</h2>

<br>

To display various components, a special attribute ***$view*** is used. This attribute can be assigned to any element, but usually the DIV element is used. The element containing the attribute is replaced by the component whose name is contained in the value of this attribute, for example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
   <!-- connect WContent component to the document -->
  <w-content></w-content>

  <script src="rtn.global.js"></script>

  <script>
    class WContent {
      // initializing the property of a state object
      compName = 'w-hello'

      // define the method of the state object
      changeView() {
        this.compName = this.compName === 'w-hello' ? 'w-goodbye' : 'w-hello'
      }
      
      // return the HTML markup of the component
      static template = `
        <div $view="compName"></div>
        <button @click="changeView">Switch</button>
      `
    }

    class WHello {
      // initializing the property of a state object
      userName = 'Anna'

      // return the HTML markup of the component
      static template = `<h1>Hello, {{ userName }}!</h1>`
    }

    class WGoodbye {
      // initializing the property of a state object
      userName = 'John'

      // return the HTML markup of the component
      static template = `<p>Goodbye, {{ userName }}...</p>`
    }
    
    // pass component classes to Rtn function
    Rtn(WContent, WHello, WGoodbye)
  </script>
</body>
</html>
```

The ***$view*** attribute cannot be used with loops. The example below will result in an error:

```js
static template = `
  <div $view="compName" $for="i = 0; i < 10; i++">
    <p>Number: {{ i }}</p>
  </div>
`
```

<br>
<br>
<h2 id="reactive-properties">Reactive properties</h2>

<br>

All state object properties used in a component are reactive, meaning that when their value changes, the values ​​in all places in the component's HTML markup where these properties are used also change.

To insert reactive properties into [text nodes](https://javascript.info/dom-nodes), use double curly braces:

```js
static template = `
  <h1>Hello, {{ message }}!</h1>
  
  <style>
    h1 {
      color: {{ color }};
    }
  </style>
`
```

To insert a reactive property into an attribute, you must precede its name with a colon:

```js
static template = `<h1 :title="message">Hello, Reacton!</h1>`
```

In the example below, a reactive property is added to a boolean attribute:

```js
class WHello {
  // initializing the property of a state object
  hide = true

  // return the HTML markup of the component
  static template = `<h1 :hidden="hide">Hello, Reacton!</h1>`
}
```

*The colon before the attribute name is used only in the component template HTML markup to indicate that the attribute accepts a reactive property. After compilation, the resulting component markup will display the attribute names without the colons.*

<br>

For event attributes, the attribute name is preceded by the ***@*** symbol, followed by the event name without the ***on*** prefix, as shown below:

```js
class WHello {
  // initializing the property of a state object
  hide = true

  // return the HTML markup of the component
  static template = `
    <h1 :hidden="hide">Hello, Reacton!</h1>
    <button @click="hide = !hide">Hide/Show</button>
  `
}
```

Instead of directly changing the reactive property in the event attribute, you can pass the name of a method that changes the reactive property, for example:

```js
class WHello {
  // initializing the property of a state object
  hide = true

  // define the method of the state object
  changeHide() {
    this.hide = !this.hide
  }

  // return the HTML markup of the component
  static template = `
    <h1 :hidden="hide">Hello, Reacton!</h1>
    <button @click="changeHide">Hide/Show</button>
  `
}
```

<br>

The event attributes contain an [event](https://javascript.info/introduction-browser-events#event-object) object, using the [target](https://javascript.info/bubbling-and-capturing#event-target) property of which you can get a reference to the element on which the event occurred:

```js
static template = `<button @click="console.log(event.target)">Show in console</button>`
```

Event attributes can have the same parameters that are passed in the third argument to the [addEventListener](https://javascript.info/introduction-browser-events#addeventlistener) method. These parameters are specified separated by a dot after the event name:

```js
@click.once.capture.passive
```

In the example below, the element that triggers the event will only be shown in the console once:

```js
static template = `<button @click.once="console.log(event.target)">Show in console</button>`
```

<br>
<br>