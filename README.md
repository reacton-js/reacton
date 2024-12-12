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
7. [Static properties](#static-properties)
8. [Special methods](#special-methods)
9. [Event Emitter](#event-emitter)
10. [Router](#router)
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
<h2 id="static-properties">Static properties</h2>

<br>

**alias** – this static property allows you to add an alias for the ***this*** keyword, i.e. for the context of the state object:

```js
class WHello {
  // initializing the property of a state object
  message = 'Reacton'

  static alias = 'o' // add alias for "this"

  // return the HTML markup of the component
  static template = `<h1>Hello, {{ o.message }}!</h1>`
}
```

*By default, there is no need to add the ***this*** keyword before the state object property names. However, if an alias is added, then either the alias or this keyword must be used before the property and method names.*

<br>

**time** – this static property allows you to add a component refresh timer if you set it to "true" as shown below:

```js
class WHello {
  // initializing the property of a state object
  message = 'Reacton'

  static time = true // add refresh timer

  // return the HTML markup of the component
  static template = `<h1>Hello, {{ message }}!</h1>`
}
```

*The component update time in milliseconds is displayed in the console after each change to any property of the state object.*

<br>

**name** – this static property used, for example, when an anonymous class is passed to the Rtn function, as shown below:

```js
// pass the anonymous class of the Hello component to the Rtn function
Rtn(class {
  // initializing the property of a state object
  message = 'Reacton'

  static name = 'w-hello' // name of the component

  // return the HTML markup of the component
  static template = `<h1>Hello, {{ message }}!</h1>`
})
```

<br>

**mode** – this static property responsible for adding a [Shadow DOM](https://javascript.info/shadow-dom) to the component. It can contain two values: "open" or "closed". In the latter case, when the component is closed, it is impossible to access the properties of its state object, methods for selecting elements and updating the content from the console.

Access to the properties of the state object, methods for selecting and updating the content of the component, in closed components is possible only from static methods, for example:

```js
class WHello {
  static mode = 'closed' // add a closed Shadow DOM

  // it is performed at the end of connecting the component to the document
  static connected() {
    // get an element using the sampling method
    const elem = this.$('h1')

    // add an event handler to the element
    elem.addEventListener('click', e => console.log(e.target))
  }

  // initializing the property of a state object
  message = 'Reacton'

  // return the HTML markup of the component
  static template = `<h1>Hello, {{ message }}!</h1>`
}
```

*Only components with a Shadow DOM can contain [local styles](https://javascript.info/shadow-dom-style).*

<br>

**extends** – this static property responsible for creating [customized components](https://javascript.info/custom-elements#customized-built-in-elements), i.e. those that are embedded in standard HTML elements, for example:

```html
<body>
  <!-- embed the Hello component in the header element -->
  <header is="w-hello"></header>

  <script src="rtn.global.js"></script>

  <script>
    class WHello {
      // initializing the property of a state object
      message = 'Reacton'

      static extends = 'header' // the name of the embedded element

      // return the HTML markup of the component
      static template = `<h1>Hello, {{ message }}!</h1>`
    }

    // pass the class of the Hello component to the Rtn function
    Rtn(WHello)
  </script>
</body>
```

*The property must contain the name of the embedded element, and the embedded element itself must contain the [is](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is) attribute with a value equal to the name of the component embedded in it.*

<br>

**serializable** – this static property responsible for [serializing](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/serializable) the Shadow DOM of the component using the [getHTML()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getHTML) method. By default, it has the value "false".

<br>

**template()** – this static property returns the future HTML content of the component as a string:

```js
// return the HTML markup of the component
static template = `
  <h1>Hello, {{ message }}!</h1>
  
  <style>
    h1 {
      color: {{ color }};
    }
  </style>
`
```

<br>

**startConnect()** – this static method is executed at the very beginning of connecting the component to the document, before generating the HTML content of the component and calling the static *connected()* method, but after creating the component state object.

In it, you can initialize the properties of the state object with the existing values:

```js
class WHello {
  // it is performed at the beginning of connecting the component to the document
  static startConnect() {
    // initializing the property of a state object
    this.message = 'Reacton'
  }

  // return the HTML markup of the component
  static template = `<h1>Hello, {{ message }}!</h1>`
}
```

or get data from the server to initialize their. But in this case, the method must be asynchronous:

```js
class WHello {
  // it is performed at the beginning of connecting the component to the document
  static async startConnect() {
    // initializing the state object property with data from a conditional server
    this.message = await new Promise(ok => setTimeout(() => ok('Reacton'), 1000))
  }

  // return the HTML markup of the component
  static template = `<h1>Hello, {{ message }}!</h1>`
}
```

*This is the only static method that can be asynchronous.*

<br>

**connected()** – this static method is executed at the very end of connecting the component to the document, after generating the HTML content of the component and calling the static *startConnect()* method.

In it, you can add event handlers to the internal elements of the component:

```js
class WHello {
  // initializing the property of a state object
  message = 'Reacton'

  // it is performed at the end of connecting the component to the document
  static connected() {
    // get an element using the sampling method
    const elem = this.$('h1')

    // add an event handler to the element
    elem.addEventListener('click', e => console.log(e.target))
  }

  // return the HTML markup of the component
  static template = `<h1>Hello, {{ message }}!</h1>`
}
```

*This and all subsequent static methods are abbreviations of the [standard static](https://javascript.info/custom-elements) methods of the component.*

<br>

**disconnected()** – this static method is executed when a component is removed from a document.

**adopted()** – this static method is executed when the component is moved to a new document.

**changed()** – this static method is executed when one of the monitored attributes is changed.

**attributes** – this static array contains the names of the monitored attributes, for example:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello data-message="Reacton"></w-hello>

  <script src="rtn.global.js"></script>

  <script>
    class WHello {
      // it is performed at the beginning of connecting the component to the document
      static startConnect() {
        // initializing the property of a state object
        this.message = this.$data.message
      }
      
      // it is performed at the end of connecting the component to the document
      static connected() {
        // get an element using the sampling method
        const elem = this.$('h1')

        // add an event handler to the element
        elem.addEventListener('click', e => this.$data.message = 'Web components')
      }

      // it is executed when one of the monitored attributes is changed
      static changed(name, oldValue, newValue) {
        // if the new attribute value is not equal to the old value 
        if (newValue !== oldValue) {
          // change the value of a state object property
          this.message = newValue
        }
      }

      // contains the names of the monitored attributes
      static attributes = ['data-message']

      // return the HTML markup of the component
      static template = `<h1>Hello, {{ message }}!</h1>`
    }

    // pass the class of the Hello component to the Rtn function
    Rtn(WHello)
  </script>
</body>
```

<br>

All static methods are called in the context of the [proxy](https://javascript.info/proxy) of the component state object. This means that if the required property is not found in the state object, then the search takes place in the component itself.

In the example below, the **id** property does not exist in the component state object. Therefore, it is requested from the component itself:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello id="hello"></w-hello>

  <script src="rtn.global.js"></script>

  <script>
    class WHello {
      // return the HTML markup of the component
      static template = `<h1>Hello, the component with the ID {{ id }}!</h1>`
    }

    // pass the class of the Hello component to the Rtn function
    Rtn(WHello)
  </script>
</body>
```

<br>
<br>
<h2 id="special-methods">Special methods</h2>

<br>

All special methods and properties start with the dollar symbol «$» followed by the name of the method or property.

**\$()** – this special method selects an element from the component content by the specified selector, for example, to add an event handler to the element:

```js
// it is performed at the end of connecting the component to the document
static connected() {
  // get an element using the sampling method
  const elem = this.$('h1')

  // add an event handler to the element
  elem.addEventListener('click', e => console.log(e.target))
}
```

*This method fetches the contents of private components only if it is called from static methods of the component class.*

<br>

**\$$()** – this special method selects all elements from the component content by the specified selector, for example, to add event handlers to the elements when iterating through them in a loop:

```js
// it is performed at the end of connecting the component to the document
static connected() {
  // get all elements using the sampling method
  const elems = this.$$('h1')

  // iterate through a collection of elements in a loop
  for (const elem of elems) {
    // add an event handler to the element
    elem.addEventListener('click', e => console.log(e.target))
  }
}
```

*This method fetches the contents of private components only if it is called from static methods of the component class.*

<br>

**\$entities()** – this special method neutralizes a string containing HTML content obtained from unreliable sources. By default, the ampersand character «&amp;» is escaped, characters less than «&lt;» and more than «&gt;», double «&quot;» and single quotes «&#39;», for example:

```js
class WHello {
  // it is performed at the beginning of connecting the component to the document
  static async startConnect() {
    // getting HTML content from a conditional server
    const html = await new Promise(ok => setTimeout(() => ok('<script>dangerous code<\/script>'), 1000))

    // initialization of a state object property with neutralized HTML content
    this.message = this.$entities(html)
  }

  // return the HTML markup of the component
  static template = `{{ message }}`
}
```

In addition to the above characters, you can escape any characters by passing an array in the second and subsequent arguments of the form: [regular expression, replacement string], for example:

```js
this.$entities(html, [/\(/g, '&lpar;'], [/\)/g, '&rpar;'])
```

*This method is available as a property of the Rtn function, as shown below:*

```js
Rtn.entities(html)
```

*or [named import](https://javascript.info/import-export#import) when using the modular version of the framework:*

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello></w-hello>

  <script type="module">
    import Rtn, { Entities } from "./rtn.esm.js"

    class WHello {
      // return the HTML markup of the component
      static template = `${ Entities('<script>dangerous code<\/script>') }`
    }

    // pass the class of the Hello component to the Rtn function
    Rtn(WHello)
  </script>
</body>
```

<br>

The special methods: *\$event()*, *\$router()* and *\$render()* will be discussed in the following sections. As with the *\$entities()* method, they also have their own named imports:

```js
import Rtn, { Tag, Event, Router, Render } from "./rtn.esm.js"
```

*The Rtn function is always imported by default.*

<br>

**\$state** – this special property refers to the [proxy](https://javascript.info/proxy) of the component's state object. This means that if the required property is not found in the state object, the search occurs in the component itself.

In the example below, the **id** property does not exist in the component state object. Therefore, it is requested from the component itself:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello id="hello"></w-hello>

  <script src="rtn.global.js"></script>

  <script>
    class WHello {
      // return the HTML markup of the component
      static template = `<h1>Hello, component with ID {{ id }}!</h1>`
    }

    // pass the class of the Hello component to the Rtn function
    Rtn(WHello)
  </script>
</body>
```

<br>

**\$host** – this special property refers to the element that connects the component to the document, i.e. the component element. This can be useful if properties with the same name are present in both the state object and the component..

The proxy of the state object initially looks for a property in the state object itself, which means that to get the property of the same name from the component element, you must use the special property *$host*, as shown below:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello id="hello"></w-hello>

  <script src="rtn.global.js"></script>

  <script>
    class WHello {
      // initializing the property of a state object
      id = 'Reacton'

      // return the HTML markup of the component
      static template = `
        <h1>Hello, the ID property with the value {{ id }}!</h1>
        <h2>Hello, component with ID {{ $host.id }}!</h2>
      `
    }

    // pass the class of the Hello component to the Rtn function
    Rtn(WHello)
  </script>
</body>
```

<br>

**\$shadow** – this special property refers to the [Shadow DOM](https://javascript.info/shadow-dom) of the component:

```
hello.$shadow
```

*For closed components and components without a Shadow DOM, this property returns "null".*

<br>

**\$data** – this special property refers to the component's [dataset](https://javascript.info/dom-attributes-and-properties#non-standard-attributes-dataset) object, which is used to access [custom attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes), for example:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello data-message="Reacton"></w-hello>

  <script src="rtn.global.js"></script>

  <script>
    class WHello {
      // return the HTML markup of the component
      static template = `<h1>Hello, {{ $data.message }}!</h1>`
    }

    // pass the class of the Hello component to the Rtn function
    Rtn(WHello)
  </script>
</body>
```

<br>

**\$props** – this special property refers to the state object of the parent component when the special attribute ***\$props*** without a value is passed to the child component:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello></w-hello>

  <script src="rtn.global.js"></script>

  <script>
    // parent component Hello
    class WHello {
       // initializing the properties of a state object
      message = 'Reacton'
      color = 'orangered'

      // return the HTML markup of the component
      static template = `<w-inner $props></w-inner>`
    }

    // child component Inner
    class WInner {
      static mode = 'open' // add Shadow DOM

      // return the HTML markup of the component
      static template = `
        <h1>Hello, {{ $props.message }}!</h1>
        
        <style>
          h1 {
            color: {{ $props.color }};
          }
        </style>
      `
    }

    // pass the Hello and Inner component classes to the Rtn function
    Rtn(WHello, WInner)
  </script>
</body>
```

*The special attribute ***\$props*** is specified here without any value:*

```js
// return the HTML markup of the component
static template = `<w-inner $props></w-inner>`
```

To access the properties of the parent component's state object in the child component's HTML markup, a special property **\$props** is used, as shown below:

```js
// return the HTML markup of the component
static template = `
  <h1>Hello, {{ $props.message }}!</h1>
  
  <style>
    h1 {
      color: {{ $props.color }};
    }
  </style>
`
```

If it is necessary to transfer only some properties from the parent component, and not the entire state object, then the special attribute ***\$props*** must contain a value in which the names of the properties to be transferred are specified, separated by commas:

```js
// return the HTML markup of the component
static template = `<w-inner $props="message, color"></w-inner>`
```

You can change the state of external components via the special property **\$props** of internal ones, but not vice versa. Because here we use one-way communication between components:

```js
// parent component Hello
class WHello {
  // initializing the property of a state object
  message = 'Reacton'

  // return the HTML markup of the component
  static template = `
    <h1>Hello, {{ message }}!</h1>
    <w-inner $props="message"></w-inner>
  `
}

// child component Inner
class WInner {
  // return the HTML markup of the component
  static template = `<button @click="$props.message='Web Components'">Change</button>`
}
```

*In order for any components to be able to change data in any other components, custom events are used, which will be discussed further.*

<br>
<br>
<h2 id="event-emitter">Event Emitter</h2>

<br>

To enable components to interact with each other and exchange data, [custom events](https://javascript.info/dispatch-events#custom-events) are used. To create custom events, a special *$event()* method is used, which is available as a property of the Rtn function.

If the method is called as a constructor, it returns a new emitter object that will generate and track user events, for example:

```js
const emit = new Rtn.event()
```

An ordinary [fragment of a document](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) acts as an emitter. You can create as many new emitters as you want, and each emitter can generate and track as many new user events as you want.

When the *$event()* method is called as a regular function, it receives an emitter in the first argument, the name of the user event is passed in the second, and any data can be passed in the third argument:

```js
this.$event(emit, 'new-array', ['Orange', 'Violet'])
```

This data will then be available in the custom event handler as the **detail** property of the [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object, as shown below:

```js
emit.addEventListener('new-array', event => {
  this.rgb = event.detail
})
```

*In the [webpack](https://webpack.js.org/) build system, the emitter can be exported from a separate module, for example, from a file Events.js:*

```js
import { Event } from 'reacton-js'
export const Emit = new Event()
```

*for the subsequent import of the emitter in the files of the components that will use it:*


```js
import { Emit } from './Events'
```

<br>

In the example below, a "click" event handler is added to each button from the Hello component, inside which the corresponding user event of the emitter object is triggered.

To track user events, the emitter is assigned the appropriate handlers in the Colors component. In the last handler, through the **detail** property of the Event object, a new array is assigned to the state property:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello></w-hello>

   <!-- connect Colors component to the document -->
  <w-colors></w-colors>

  <script src="rtn.global.js"></script>

  <script>
    // create a new emitter object
    const emit = new Rtn.event()

    class WHello {
      // return the HTML markup of the component
      static template = `
        <button id="reverse">Reverse an array</button>
        <button id="new-array">New array</button>
      `

      // it is performed at the end of connecting the component to the document
      static connected() {
        // add an event handler to the "Reverse an array" button
        this.$('#reverse').addEventListener('click', () => {
          // initiate the "reverse" event
          this.$event(emit, 'reverse')
        })

        // add an event handler to the "New array" button
        this.$('#new-array').addEventListener('click', () => {
          // initiate the "new-array" event
          this.$event(emit, 'new-array', ['Orange', 'Violet'])
        })
      }
    }

    class WColors {
      // initializing the property of a state object
      rgb = ['Red', 'Green', 'Blue']

      // return the HTML markup of the component
      static template = `
        <ul $for="col of rgb">
          <li>{{ col }}</li>
        </ul>
      `

      // it is performed at the end of connecting the component to the document
      static connected() {
        // add a "reverse" event handler to the emitter
        emit.addEventListener('reverse', () => {
          this.rgb.reverse() // reverse an array
        })

        // add a "new-array" event handler to the emitter
        emit.addEventListener('new-array', event => {
          this.rgb = event.detail // assign a new array to the property
        })
      }
    }

    // pass the Hello and Colors component classes to the Rtn function
    Rtn(WHello, WColors)
  </script>
</body>
```

<br>
<br>
<h2 id="router">Router</h2>

<br>

The [router](https://expressjs.com/en/guide/routing.html) is based on user events. To create route events, a special method *$router()* is used, which is available as a property of the Rtn function.

If the method is called as a constructor, it returns a new emitter object with the redefined [addEventListener()](https://javascript.info/introduction-browser-events#addeventlistener) method, which will generate and track route events, for example:

```js
const emitRouter = new Rtn.router()
```

When the *$router()* method is called as a regular function, it receives an emitter in the first argument, the name of the route event is passed in the second, and any data can be passed in the third argument:

```js
this.$router(emitRouter, '/about', ['Orange', 'Violet'])
```

In a real application, the name of the route event is not specified directly, as in the example above, but is taken from the value of the **href** attribute of the link that was clicked, for example:

```js
this.$router(emitRouter, event.target.href, ['Orange', 'Violet'])
```

<br>

The user data passed in the last argument of the *$router()* method will be available in the route event handler as the **detail** property of the [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object, as shown below:

```js
emitRouter.addEventListener('/about', event => {
  const arr = event.detail
  ...
})
```

The initial slash «/» in the name of the route event is optional:

```js
emitRouter.addEventListener('about', event => {
  const arr = event.detail
  ...
})
```

The rest of the name of the route event, except for the initial slash, must completely match the value of the **href** attribute of the link, after clicking on which the handler corresponding to this value will be triggered:

```html
<a href="/about">About</a>
```

<br>

The difference between user-defined and route events is that the string specified in the route event handler is converted to a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) and can contain [special](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#using_special_characters) regular expression characters, as shown below:

```js
emitRouter.addEventListener('/abou\\w', event => {
  ...
})
```

In order not to have to use the backslash character twice in a regular string to escape special characters of regular expressions, you can use the tagged function [raw()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw) of the built-in [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) object by enclosing the name of the route event in a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), for example:


```js
emitRouter.addEventListener(String.raw`/abou\w`, event => {
  ...
})
```

or so:

```js
const raw = String.raw
emitRouter.addEventListener(raw`/abou\w`, event => {
  ...
})
```

<br>

In addition to the **detail** property, the Event object has an additional **params** property to get [route parameters](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#route_parameters), as shown below:

```js
emitRouter.addEventListener('/categories/:catId/products/:prodId', event => {
  const catId = event.params["catId"]
  const prodId = event.params["prodId"]
  ...
})
```

This handler will be executed for all links of the form:

```html
<a href="/categories/5/products/7">Product</a>
```

then **catId** will have the value 5 and **prodId** will have the value 7.

To support query parameters, the Event object has an additional **search** property, which is a short reference to the [searchParams](https://javascript.info/url#searchparams) property of the built-in [URL](https://javascript.info/url) class, for example:

```js
const raw = String.raw
emitRouter.addEventListener(raw`/categories\?catId=\d&prodId=\d`, event => {
  const catId = event.search.get("catId")
  const prodId = event.search.get("prodId")
  ...
})
```

This handler will be executed for all links of the form:

```html
<a href="/categories?catId=5&prodId=7">Product</a>
```

then **catId** will have the value 5 and **prodId** will have the value 7.

The last addition property of the Event object is called **url**, which is an object of the built-in [URL](https://javascript.info/url) class and helps parse the request into parts:

```js
emitRouter.addEventListener('/about', event => {
  const hostname = event.url.hostname
  const origin = event.url.origin
  ...
})
```

<br>

Below is an example of creating a simple router with three components for pages:

```html
<body>
   <!-- connect Menu component to the document -->
  <w-menu></w-menu>

   <!-- connect Content component to the document -->
  <w-content></w-content>

  <script src="rtn.global.js"></script>

  <script>
    class WHome {
      // return the HTML markup of the component
      static template = `<h1>Home</h1>`
    }
    class WAbout {
      // return the HTML markup of the component
      static template = `<h1>About</h1>`
    }
    class WContacts {
      // return the HTML markup of the component
      static template = `<h1>Contacts</h1>`
    }

    // create a new emitter object for the router
    const emitRouter = new Rtn.router()

    class WMenu {
      // it is performed at the end of connecting the component to the document
      static connected() {
        // add a "click" event handler for the NAV element
        this.$('nav').addEventListener('click', event => {
          event.preventDefault() // undo the default action
          // initiate an event for the "href" value of the current link
          this.$router(emitRouter, event.target.href)
        })
      }
    
      // return the HTML markup of the component
      static template = `
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contacts">Contacts</a>
        </nav>
      `
    }

    class WContent {
      // it is performed at the beginning of connecting the component to the document
      static startConnect() {
        // add an event handler to the emitter with an optional route parameter
        emitRouter.addEventListener(`(:page)?`, event => {
          // assign a page component name to the property
          this.page = `w-${event.params.page || 'home'}` 
        })
        
        // initiate an event for the "href" value of the current page
        this.$router(emitRouter, location.href)
      }

      // return the HTML markup of the component
      static template = `<div $view="page"></<div>`
    }

    // pass component classes to the Rtn function
    Rtn(WHome, WAbout, WContacts, WMenu, WContent)
  </script>
</body>
```

To handle the routes of these pages, the router emitter is assigned a handler with an optional route parameter in the Content component:

```js
// add an event handler to the emitter with an optional route parameter
emitRouter.addEventListener(`(:page)?`, event => {
  // assign a page component name to the property
  this.page = `w-${event.params.page || 'home'}` 
})
```

In order for this handler to fire immediately when opening the application and connect the page component corresponding to the route, at the end of the *connected()* static method, an event is triggered for the address of the current route from the **href** property of the [location](https://developer.mozilla.org/en-US/docs/Web/API/Location) object:

```js
// initiate an event for the "href" value of the current page
this.$router(emitRouter, location.href)
```

The rest of the pages components are loaded when you click on the corresponding link in the Menu component:

```js
// add a "click" event handler for the NAV element
this.$('nav').addEventListener('click', event => {
  event.preventDefault() // undo the default action
  // initiate an event for the "href" value of the current link
  this.$router(emitRouter, event.target.href)
})
```

<br>
<br>