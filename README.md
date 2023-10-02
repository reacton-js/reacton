<br>

[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

![reacton](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Reacton⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.min.js)

<br>

Reacton is a JavaScript plugin for quickly building reactive [Web Components](https://javascript.info/web-components). The plugin supports all technologies, methods and properties such as [slots](https://javascript.info/slots-composition) and [Shadow DOM](https://javascript.info/shadow-dom) that are provided by standard Web Components.

*- In version 3.4.0, a bug in accessing special properties in static methods of closed components was fixed and reference attributes were added for quick access to elements.*

*- Added a [loader](https://www.npmjs.com/package/reacton-loader) of single-file components for [Webpack](https://webpack.js.org/).*

<br>

Below is an example of a simple component:

```html
<!-- mount the MyComponent component -->
<my-component color="red"></my-component>

<!-- create component template MyComponent -->
<template class="MyComponent">
  <h1>Hello, {{ message }}!</h1>
        
  <style>
    h1 {
      color: {{ color }};
    }
  </style>

  <script>
    exports = class {
      // initializing the state object in the constructor
      constructor(props) {
        this.message = 'Reacton'
        this.color = props.color
      }

      static mode = 'open' // add Shadow DOM
    }
  </script>
</template>
```

<br>

1. [Quick start](#quick-start)
2. [Component class](#component-class)
3. [Special properties](#special-properties)
4. [General methods](#general-methods)
5. [Reactive attributes](#reactive-attributes)
6. [Reference attributes](#reference-attributes)
7. [Cycles](#cycles)
8. [Styles](#styles)
9. [Slots](#slots)
10. [Events](#events)
11. [Routes](#routes)
12. [SSR](#ssr)

<br>
<hr>
<br>

<h2 id="quick-start">Quick start</h2>

<br>

Classes are used to create components. Classes can be either built into the main script or imported from an external module. Create a new working directory, for example named *app*, and download the [reacton.min.js](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.min.js) file into this directory.

Add an *index.html* file to the directory with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component></my-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      static template = `
        <h1>Hello, {{ message }}!</h1>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // pass component class MyComponent to Reacton plugin
    Reacton(MyComponent)
  </script>
</body>
</html>
```

To ensure there are no naming conflicts between standard and custom HTML elements, the component name must contain a dash «-», for example, my-element and super-button are valid names, but myelement is not.

When you open the *index.html* file in the browser, the screen will display the message created in the MyComponent component:

<h1 style="color: red;">Hello, Reacton!</h1>

<br>

In this example, a simple component has been created that is embedded in a common script. Let's now move this component into a separate module.

Create a *MyComponent.js* file in the *app* directory with the following content:

```js
// export the MyComponent component class
export default class MyComponent {
  message = 'Reacton'
  color = 'red'

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

Make changes to the *index.html* file, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component></my-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script type="module">
    // import the MyComponent component class
    import MyComponent from './MyComponent.js'

    // pass component class MyComponent to Reacton plugin
    Reacton(MyComponent)
  </script>
</body>
</html>
```

To work with external components, we need any development server, such as, for example, [lite-server](https://www.npmjs.com/package/lite-server).

Install this server using the command in the terminal:

```
npm install --global lite-server
```

Now navigate to the *app* directory using a terminal or open a terminal in that directory and in the terminal enter the command:

```
lite-server
```

This will open a default browser window displaying the welcome message shown above.

<br>

To quickly access a component in the browser console, add the identifier "mycomp" to its mount element, as shown below:

```html
<!-- mount the MyComponent component -->
<my-component id="mycomp"></my-component>
```

Now open the browser console and enter two commands:

```
mycomp.$state.message = 'Web Components'
mycomp.$state.color = 'green'
```

The title color and message will change immediately:

<h1 style="color: green;">Hello, Web Components!</h1>

<br>

Reacton provides a more convenient way to create components in [&lt;template&gt;](https://javascript.info/template-element) tags.

Make changes to the *index.html* file, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- create component template MyComponent -->
  <template class="MyComponent">
    <h1>Hello, {{ message }}!</h1>
          
    <style>
      h1 {
        color: {{ color }};
      }
    </style>

    <script>
      exports = class {
        message = 'Reacton'
        color = 'red'
      }
    </script>
  </template>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // pass component template MyComponent to Reaction plugin
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

In this example, the name of the component class is determined from the name of the first template class.

<br>

Components can be created in external files, which is especially useful when using build systems. You can customize your own or [download](https://github.com/reacton-js/reacton/tree/main/webpack) a ready-made build system based on [webpack](https://webpack.js.org/).

Create a *MyComponent.htm* file in the *app* directory with the following content:

```html
<my-component>
  <h1>Hello, {{ message }}!</h1>
          
  <style>
    h1 {
      color: {{ color }};
    }
  </style>

  <script>
    exports = class {
      message = 'Reacton'
      color = 'red'
    }
  </script>
</my-component>
```

Make changes to the *index.html* file, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script type="module">
    // request MyComponent.htm file
    const response = await fetch('MyComponent.htm')
    // get the text content of a file
    const MyComponent = await response.text()

    // pass contents of MyComponent component file to Reaction plugin
    Reacton(MyComponent)
  </script>
</body>
</html>
```

To work with external components, we need any development server, such as, for example, [lite-server](https://www.npmjs.com/package/lite-server).

Install this server using the command in the terminal:

```
npm install --global lite-server
```

Now navigate to the *app* directory using a terminal or open a terminal in that directory and in the terminal enter the command:

```
lite-server
```

<br>
<br>
<h2 id="component-class">Component class</h2>

<br>

The name of the component class defines the name of the component in the DOM. For example, the class MyComponent or myComponent will match the name *my-component* in the DOM. Each component class may contain an optional static property **name** that defines the name of this class.

This property must be specified, for example, when passing an anonymous class directly to a plugin:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // pass anonymous class to Reacton plugin
    Reacton(class {
      message = 'Reacton'
      color = 'red'

      static name = 'MyComponent' // component name

      static template = `
        <h1>Hello, {{ message }}!</h1>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    })
  </script>
</body>
</html>
```

The class name can be specified in camel case, as in the example above, or kebab notation:

```js
static name = 'my-component'
```

<br>

The state of a component is defined as properties of an instance of the component's class. In the example above, there are two states:

```js
message = 'Reacton'
color = 'red'
```

This is a new way of defining properties for objects. You can also use the old way, by specifying a constructor:

```js
constructor() {
  this.message = 'Reacton'
  this.color = 'red'
}
```

<br>

In addition to state, class objects can also have methods, for example:

```js
class MyComponent {
  message = 'Reacton'
  color = 'red'

  // class object method
  printHello() {
    return `Hello, ${ this.message }!`
  }

  static template =  `
    <h1>{{ printHello() }}</h1>
    
    <style>
      h1 {
        color: {{ color }};
      }
    </style>
  `
}
```

In this example, the **printHello()** method of the MyComponent class object has been defined, which simply prints out a hello message.

<br>

To render the component's HTML content, the class must have a **template** static property that defines a string. From this line, the HTML markup of the future component will be created:

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

To display the properties of the state object, or any other expression, double curly braces are used.

The **template** static property can be a method that executes in the context of the component's state object, which allows you to refer to the properties of that object using the *this* keyword and using template literals, for example:

```js
static template() {
  return `
    <h1>Hello, {{ message }}!</h1>
    
    <style>
      h1 {
        color: {{ color }};
      }
    </style>
  `
}
```

Inside template literals, you can use [substitutions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#string_interpolation) to expose any expressions:

```js
${ 5 + 6 }
```

The **template()** method, like all the static methods of the component class discussed below, can be asynchronous. The example below simulates downloading data from the server:

```js
static async template() {
  // get data one second after method call
  const message = await new Promise(ok => setTimeout(() => ok('Web components'), 1000))

  return `
    <h1>Hello, ${ message }!</h1>
    
    <style>
      h1 {
        color: {{ color }};
      }
    </style>
  `
}
```

If the component is created in the &lt;template&gt; tags, then the static property **template** is not specified. The HTML content of the component is determined by the content of this tag:

```html
<!-- create component template MyComponent -->
<template class="MyComponent">
  <h1>Hello, {{ message }}!</h1>
        
  <style>
    h1 {
      color: {{ color }};
    }
  </style>

  <script>
    exports = class {
      message = 'Reacton'
      color = 'red'
    }
  </script>
</template>
```

<br>

By default, all components are created without [Shadow DOM](https://javascript.info/shadow-dom). This means that the styles they use affect the DOM of the entire [document](https://developer.mozilla.org/en-US/docs/Web/API/Document), not a specific component.

The static **mode** property determines the [level of encapsulation](https://javascript.info/shadow-dom#shadow-tree) for the component to use [local styles](https://javascript.info/shadow-dom-style) and can be either "open" or "closed":

```js
static mode = 'open'
```

The example below creates a component with a closed Shadow DOM:

```js
class MyComponent {
  message = 'Reacton'
  color = 'red'

  static mode = 'closed' // add closed Shadow DOM

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

This type of component is the most secure, since access to the state and DOM of such a component is possible only from static methods or a class template.

<br>

The **extends** static property allows [mount the component](https://javascript.info/custom-elements#customized-built-in-elements) into a standard HTML element, for example:

```js
static extends = 'header'
```

The element into which the component is mounted must contain the [*is*](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is) attribute with a value corresponding to the name of the component that is mounted into it:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component to the Header element -->
  <header is="my-component"></header>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      static extends = 'header' // mount the component to the Header element

      static template = `
        <h1>Hello, {{ message }}!</h1>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // pass component class MyComponent to Reacton plugin
    Reacton(MyComponent)
  </script>
</body>
</html>
```

<br>

The static property **attributes** contains an array with the names of attributes, when changing which, the static method **changed()** will be called, for example:

```js
static attributes = ['title'] // tracked attributes

// called when the tracked attribute changes
static changed(name, oldValue, newValue) {
  console.log(name, oldValue, newValue)
}
```

Tracked attributes are a Web Component technology, and the **changed()** method is a shorthand for the [attributeChangedCallback()](https://javascript.info/custom-elements) method.

Add the ***id*** and ***title*** attributes to the MyComponent component's mount element in the *index.html* file as shown below:

```html
<!-- mount the MyComponent component -->
<my-component id="mycomp" title="Reacton"></my-component>
```

The ***id*** attribute is used for quick access to the component in the browser console. Now open this console and enter the command:

```
mycomp.title = 'Web Components'
```

After pressing the Enter key, the **changed()** method will print the following line to the console:

```
title Reacton Web Components
```

<br>

Tracked attributes can be used to determine the state in a component, without having to define the state in a class, for example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp" message="Reacton" color="red"></my-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      static attributes = ['message', 'color'] // tracked attributes

      // called when the tracked attribute changes
      static changed(name, oldValue, newValue) {
        // update the HTML content of the component based on the new state
        this[name] = newValue
      }

      static template = `
        <h1>Hello, {{ message }}!</h1>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // pass component class MyComponent to Reacton plugin
    Reacton(MyComponent)
  </script>
</body>
</html>
```

As you can see from this example, there is no state definition in the class:

```js
message = 'Reacton'
color = 'red'
```

The initial state values are defined in the tracked attributes ***message*** and ***color*** as shown below:

```html
<!-- mount the MyComponent component -->
<my-component id="mycomp" message="Reacton" color="red"></my-component>
```

The assignment of these values to properties of the state object occurs in the **changed()** method, which is called every time values are assigned/changed to tracked attributes:

```js
// called when the tracked attribute changes
static changed(name, oldValue, newValue) {
  // update the HTML content of the component based on the new state
  this[name] = newValue
}
```

This method is called in the context of the component's state object, and inside it, using the *this* keyword, new properties are assigned to the state object.

Now open the browser console and enter two commands:

```
mycomp.$state.message = 'Web Components'
mycomp.$state.color = 'green'
```

The title color and message will change immediately:

<h1 style="color: green;">Hello, Web Components!</h1>

The second way to update the component's HTML content based on the new state value is to use the **$props** special property, which is used to quickly access all of the component's attributes.

Enter the command in the browser console:

```
mycomp.$props.color = 'blue'
```

The title color will change immediately:

<h1 style="color: blue;">Hello, Web Components!</h1>

Special methods and properties will be discussed in the next section. They all begin with a dollar sign and are defined internally by the component.

<br>

The static methods **connected()**, **disconnected()** and **adopted()** are shorthand analogs of the [connectedCallback(), disconnectedCallback() and adoptedCallback()](https://javascript.info/custom-elements) methods.

They are called when a component is added to the document - the **connected()** method; removing a component from a document - the **disconnected()** method; and when moving the component to a new document - the **adopted()** method.

The most commonly used methods include the **connected()** method, which allows you to access the HTML content of the component after it has been added to the [DOM](https://javascript.info/dom-nodes), for example , add an event to the element:

```js
// called when the component is added to the document
static connected() {
  // output the element that generated the event to the console
  this.$('h1').addEventListener('click', event => console.log(event.target))
}
```

<br>

The static methods **before()** and **after()** are called *Before* and *After* updating the component's DOM, for example:

```js
static before() {
  console.time('Update')
}

static after() {
  console.timeEnd('Update')
}
```

This example shows how long it takes for a component's DOM to update.

Another good example is using the **before()** method to check the type of a new state value:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      name = 'John'
      age = 32

      // called before updating the component's DOM
      static before() {
        // if the value is not a number, then generate an error
        if (typeof this.age !== 'number') {
          throw new Error('Value must be a number...')
        }
      }

      static template = `
        <p>Name: {{ name }}</p>
        <p>Age: {{ age }}</p>
      `
    }

    // pass component class MyComponent to Reacton plugin
    Reacton(MyComponent)
  </script>
</body>
</html>
```

If you enter the command in the browser console:

```
mycomp.$state.age = 'thirty five'
```

then you will receive an error message:

```
Error: Value must be a number...
```

<br>
<br>
<h2 id="special-properties">Special properties</h2>

<br>

Unlike methods and properties defined by the user in the component class, special methods and properties are defined at the internal level of the component and always start with a dollar sign. It is not recommended to give states names that are the same as special property names. This may lead to errors.

The **$shadow** property returns the [Shadow DOM](https://javascript.info/shadow-dom) of the component, which is created if the **mode** static property was defined in the component class:

```js
static mode = 'open' // add Shadow DOM
```

However, if the component has a closed Shadow DOM:

```js
static mode = 'closed' // add closed Shadow DOM
```

then the **$shadow** property returns «null», as shown below:

```
mycomp.$shadow
null
```

<br>

The **$light** property returns True if the component does not contain a [Shadow DOM](https://javascript.info/shadow-dom), otherwise it returns False, for example:

```
mycomp.$light
true
```

<br>

The **$host** property returns a reference to the component itself if the component has an open Shadow DOM. If the component has a closed Shadow DOM or is created without one, then this property returns «undefined», as shown below:

```
mycomp.$host
undefined
```

<br>

The **$props** property allows you to quickly set and get component attribute values. For closed components, calling this property from outside of static methods returns «undefined».

Add the ***title*** attribute to the component, as shown below:

```html
<!-- mount the MyComponent component -->
<my-component id="mycomp" title="Reacton"></my-component>
```

To get the value of the ***title*** attribute, enter the command in the browser console:

```
mycomp.$props.title
```

To set a new value for this attribute, enter the command:

```
mycomp.$props.title = 'Web Components'
```

To initialize the state of a component using attributes passed to its mount element, the component's constructor uses the **props** parameter, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component message="Reacton" color="red"></my-component>

  <!-- create component template MyComponent -->
  <template class="MyComponent">
    <h1>Hello, {{ message }}!</h1>
          
    <style>
      h1 {
        color: {{ color }};
      }
    </style>

    <script>
      exports = class {
        // initializing state with values from attributes
        constructor(props) {
          this.message = props.message
          this.color = props.color
        }
      }
    </script>
  </template>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // pass component template MyComponent to Reaction plugin
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

<br>

The **$state** property allows you to get/set the value of any state directly. For closed components, calling this property from outside of static methods returns «undefined».

To get the state value of **message**, enter the command in the browser console:

```
mycomp.$state.message
```

To change this state, issue the command:

```
mycomp.$state.message = 'Web Components'
```

<br>

All of the custom and static methods of the bean class discussed earlier are executed in the context of the state object referenced by the **$state** property. This object is a [proxy](https://javascript.info/proxy). This means that if the requested state does not exist in the given object, then the requested property is searched for in the component itself. However, writing a new value always occurs in the state object.

Thanks to this, any property of the component can be accessed from the state object, such as the [attributes](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes) property:


```
mycomp.$state.attributes['id'].value
```

Inside the string of the static property **template**, access to the properties of the component, and not the state, for example, to the property [attributes](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes), is carried out using the keyword *this*, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      static template = `
        <h1>Hello, {{ message }} 
          from the {{ this.attributes['id'].value.toUpperCase() }} component!</h1>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // pass component class MyComponent to Reacton plugin
    Reacton(MyComponent)
  </script>
</body>
</html>
```

<br>

The **$()** method is a shorthand analog of the [querySelector()](https://javascript.info/searching-elements-dom#querySelector) method and is used for quick access to a component's DOM element. For closed components, calling this method from outside of static methods returns «null».

For example, to assign an event listener:

```js
// called when the component is added to the document
static connected() {
  // output the element that generated the event to the console
  this.$('h1').addEventListener('click', event => console.log(event.target))
}
```

The **$$()** method is a shorthand analog of the [querySelectorAll()](https://javascript.info/searching-elements-dom#querySelectorAll) method and is used for quick access to a component's DOM element. For closed components, calling this method from outside of static methods returns «null».

For example, to iterate over a collection of elements:

```js
// called when the component is added to the document
static connected() {
  // output all paragraph elements to the console
  this.$$('p').forEach(elem => console.log(elem))
}
```

<br>

The **$entities()** method allows you to [render harmless](https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/) data received from unreliable sources:

```js
static async template() {
  // render harmless data received from an unreliable source
  const message = this.$entities(await new Promise(ok => setTimeout(() => ok('<em>unsafe code</em>'), 1000)))

  return `
    <h1>Hello, ${ message }!</h1>
    
    <style>
      h1 {
        color: {{ color }};
      }
    </style>
  `
}
```

<br>

The **$event()** method is used to create custom events that allow different components to interact with each other, and the **\$route()** method is used to build routing. They will be considered later, since they require separate chapters for their explanation.

<br>
<br>
<h2 id="general-methods">General methods</h2>

<br>

In addition to state, class objects can also have methods, for example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp1"></my-component>

  <!-- mount the MyComponent component -->
  <my-component id="mycomp2"></my-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      // class object method
      printHello() {
        return `Hello, ${ this.message }!`
      }

      static template = `
        <h1>{{ printHello() }}</h1>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // pass component class MyComponent to Reacton plugin
    Reacton(MyComponent)
  </script>
</body>
</html>
```

In this example, the **printHello()** method of the MyComponent class object has been defined, which simply prints out a hello message for all components of this type.

In order not to create the same methods for different types of components, you can create a separate class for common methods, and then, inherit component classes from this method class, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- mount the NewComponent component -->
  <new-component id="newcomp"></new-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create a Methods class to store common methods
    class Methods {
      printHello() {
        return `Hello, ${ this.message }!`
      }
    }

    // inherit the MyComponent class from the Methods class
    class MyComponent extends Methods {
      message = 'Reacton'
      color = 'red'

      static template = `
        <h1>{{ printHello() }}</h1>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // inherit the NewComponent class from the Methods class
    class NewComponent extends Methods {
      message = 'NewComponent'

      static template = `
        <h2>{{ printHello() }}</h2>
      `
    }

    // pass component classes to Reacton plugin
    Reacton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

This method is also used when defining components in &lt;template&gt; tags, for example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- mount the NewComponent component -->
  <new-component id="newcomp"></new-component>

  <!-- create component template MyComponent -->
  <template class="MyComponent">
    <h1>{{ printHello() }}</h1>
          
    <style>
      h1 {
        color: {{ color }};
      }
    </style>

    <script>
      // inherit the MyComponent class from the Methods class
      exports = class extends Methods {
        message = 'Reacton'
        color = 'red'
      }
    </script>
  </template>

  <!-- create component template NewComponent -->
  <template class="NewComponent">
    <h2>{{ printHello() }}</h2>

    <script>
      // inherit the NewComponent class from the Methods class
      exports = class extends Methods {
        message = 'NewComponent'
      }
    </script>
  </template>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create a Methods class to store common methods
    class Methods {
      printHello() {
        return `Hello, ${ this.message }!`
      }
    }

    // pass component templates to Reacton plugin
    Reacton(...document.querySelectorAll('template'))
  </script>
</body>
</html>
```

When defining components in &lt;template&gt; tags, the super class must be globally accessible:

```js
// create a Methods class to store common methods
class Methods {
  printHello() {
    return `Hello, ${ this.message }!`
  }
}
```

<br>
<br>
<h2 id="reactive-attributes">Reactive attributes</h2>

<br>

To create reactive attributes, precede their name with a colon character «:». Expressions in reactive attributes are specified without the use of double curly braces, as opposed to HTML content, for example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- create component template MyComponent -->
  <template class="MyComponent">
    <h1 :title="message" :hidden="hide">Hello, {{ message }}!</h1>
    <button :onclick="changeMessage">Change message</button>
    <button :onclick="color = 'green'">Change color</button>
    <button :onclick="hide = !hide">Hide/Show</button>
          
    <style>
      h1 {
        color: {{ color }};
      }
    </style>

    <script>
      exports = class {
        message = 'Reacton'
        color = 'red'
        hide = false

        changeMessage() {
          return this.message = 'Web Components'
        }
      }
    </script>
  </template>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // pass component template MyComponent to Reaction plugin
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

As you can see from this example, not only simple, but also event attributes and boolean attributes can be reactive.

<br>

All event attributes receive an implicit [event](https://javascript.info/introduction-browser-events#event-object) parameter, which allows you to use it to access the elements on which the event was triggered, for example, input fields:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- create component template MyComponent -->
  <template class="MyComponent">
    <h3>Name: {{ name }}</h3>
    <h3>Age: {{ age }}</h3>
      
    <p>Name: <input type="text" :value="name" :oninput="changeName"></p>
    <p>Age: <input type="number" min="0" max="120" :value="age" :oninput="this.age = event.target.value"></p>

    <script>
      exports = class {
        name = 'John'
        age = 32

        changeName(event) {
          this.name = event.target.value
        }
      }
    </script>
  </template>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // pass component template MyComponent to Reaction plugin
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

<br>

The [*is*](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is) attribute is used to mount components into standard HTML elements. This attribute can be made reactive:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- create component template MyComponent -->
  <template class="MyComponent">
    <!-- components mount element -->
    <div :is="view"></div>

    <button :onclick="view = 'component-a'">Component-A</button>
    <button :onclick="view = 'component-b'">Component-B</button>

    <script>
      exports = class {
        view = 'component-a' // initial value
      }
    </script>
  </template>

  <!-- create component template ComponentA -->
  <template class="ComponentA">
    <h1>Component-A</h1>

    <script>
      exports = class {
        static extends = 'div' // mounting element
      }
    </script>
  </template>

  <!-- create component template ComponentB -->
  <template class="ComponentB">
    <h1>Component-B</h1>

    <script>
      exports = class {
        static extends = 'div' // mounting element
      }
    </script>
  </template>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // pass component templates to Reacton plugin
    Reacton(...document.querySelectorAll('template'))
  </script>
</body>
</html>
```

Mounted components must contain a static property **extends** with a value corresponding to the name of the element in which they are mounted:

```js
exports = class {
  static extends = 'div' // mounting element
}
```

In addition, if the element in which the components are mounted contains other reactive attributes, then all of them must be specified before the ***is*** attribute, for example:

```html
<!-- components mount element -->
<div :title="view" :onclick="console.log(view)" :is="view"></div>
```

<br>
<br>
<h2 id="reference-attributes">Reference attributes</h2>

<br>

To quickly access elements within a component, you can use reference attributes that begin with a «#» character followed by the name of the reference attribute without a value, for example:

```html
<h1 #hello>Hello, {{ message }}!</h1>
```

In this example, the H1 element has been assigned the link attribute ***hello***. To get the element to which the attribute has been assigned, the special property **$refs** is used, which is an object containing all the reference attributes of the component and the elements they refer to.

This can be used, for example, to assign custom event handlers to elements:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- create component template MyComponent -->
  <template class="MyComponent">
    <h1 #hello>Hello, {{ message }}!</h1>
          
    <style>
      h1 {
        color: {{ color }};
      }
    </style>

    <script>
      exports = class {
        message = 'Reacton'
        color = 'red'

        // called when the component is added to the document
        static connected() {
          // output the element that generated the event to the console
          this.$refs.hello.addEventListener('click', event => console.log(event.target))
        }
      }
    </script>
  </template>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // pass component template MyComponent to Reaction plugin
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="cycles">Cycles</h2>

<br>

Reacton supports three kinds of *"for"* loops that are implemented in JavaScript. They are all defined with a special ***$for*** attribute and output the contents of their HTML elements as many times as required by the loop condition.

In the example below, the *"for"* loop outputs 10 paragraphs with numbers from 0 to 9:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- create component template MyComponent -->
  <template class="MyComponent">
    <!-- output 10 paragraphs -->
    <div $for="i = 0; i < 10; i++">
      <p>Number: {{ i }}</p>
    </div>
  </template>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // pass component template MyComponent to Reaction plugin
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

The ***$for*** special attribute cannot use variable definition operators: *var*, *let*, and *const*, respectively. This will result in an error:

```html
<!-- output 10 paragraphs -->
<div $for="var i = 0; i < 10; i++">
  <p>Number: {{ i }}</p>
</div>
```

<br>

The *"for-in"* loop is used to output the contents of objects, as shown below:

```html
<!-- create component template MyComponent -->
<template class="MyComponent">
  <!-- output the contents of object -->
  <ul $for="prop in user">
    <li>
      <b>{{ prop }}</b>: {{ user[prop] }}
    </li>
  </ul>

  <script>
    exports = class {
      user = {
        name: 'John',
        age: 32
      }
    }
  </script>
</template>
```

<br>

The *"for-of"* loop is designed to work with arrays:

```html
<!-- create component template MyComponent -->
<template class="MyComponent">
  <!-- output the contents of the array -->
  <ul $for="col of colors">
    <li>{{ col }}</li>
  </ul>

  <script>
    exports = class {
      colors = ['red', 'green', 'blue']
    }
  </script>
</template>
```

<br>

Event attributes of loop HTML elements can be bound to loop variables:

```html
<!-- output the contents of the array -->
<ul $for="col of colors">
  <li :onclick="console.log(col)">{{ col }}</li>
</ul>
```

Events will always use the current value of the loop variable for their iteration phase, even after the array has been modified:

```html
<!-- create component template MyComponent -->
<template class="MyComponent">
  <!-- array reversal button -->
  <button :onclick="colors.reverse()">Reverse array</button>

  <!-- output the contents of the array -->
  <ul $for="col of colors">
    <li :onclick="console.log(col)">{{ col }}</li>
  </ul>

  <script>
    exports = class {
      colors = ['red', 'green', 'blue']
    }
  </script>
</template>
```

<br>

You can use loops with any nesting depth in Reacton:

```html
<!-- create component template MyComponent -->
<template class="MyComponent">
  <!-- output an array of objects -->
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

  <script>
    exports = class {
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
    }
  </script>
</template>
```

<br>
<br>
<h2 id="styles">Styles</h2>

<br>

To create [local styles](https://javascript.info/shadow-dom-style), the component needs to add a [Shadow DOM](https://javascript.info/shadow-dom) using the static property **mode**, as shown below:

```js
class MyComponent {
  message = 'Reacton'
  color = 'red'

  static mode = 'open' // add Shadow DOM

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
<br>
<h2 id="slots">Slots</h2>

<br>

To work with [slots](https://javascript.info/slots-composition), the component needs to add a [Shadow DOM](https://javascript.info/shadow-dom) using the static property **mode**, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component>
    <span slot="username">John</span>
    <span slot="age">32</span>
    <span>Hardworking</span>
  </my-component>

  <!-- create component template MyComponent -->
  <template class="MyComponent">
    <div>
      Name: <slot name="username"></slot>
    </div>
    <div>
      Age: <slot name="age"></slot>
    </div>
    <div>
      Character: <slot><slot>
    </div>

    <script>
      exports = class {
        static mode = 'open' // add Shadow DOM
      }
    </script>
  </template>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // pass component template MyComponent to Reaction plugin
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="events">Events</h2>

<br>

For interaction between different components, an improved mechanism of [custom events](https://javascript.info/dispatch-events) is used. This mechanism involves the use of the **event()** method of the Reacton plugin and the special **$event()** method that is available in every component.

When the Reacton plugin's **event()** method is called as a constructor, it returns a new [document fragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) that is the source and receiver of custom events. And when this method is not called as a constructor, it works similarly to the special method **$event()**. This allows you to link components not only to each other, but also to any external code.

Make changes to the *index.html* file as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- mount the NewComponent component -->
  <new-component id="newcomp"></new-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create event element myEvent
    const myEvent = new Reacton.event()

    // create component class NewComponent
    class NewComponent {
      colors = ['red', 'green', 'blue']

      static template = `
        <ul $for="col of colors">
          <li>{{ col }}</li>
        </ul>
      `

      static connected() {
        // add a "reverse" event handler to the myEvent element
        myEvent.addEventListener('reverse', () => {
          this.colors.reverse() // reverse array
        })
      }
    }

    // create component class MyComponent
    class MyComponent {
      static template = `
        <button id="btn-reverse">Reverse array</button>
      `

      static connected() {
        // add a "click" event handler for the button
        this.$('#btn-reverse').addEventListener('click', () => {
          // trigger "reverse" event on element myEvent
          this.$event(myEvent, 'reverse')
        })
      }
    }

    // pass component classes to Reacton plugin
    Reacton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

In this example, a new event element myEvent is first created:

```js
// create event element myEvent
const myEvent = new Reacton.event()
```

This element will be assigned custom event handlers in some components and invoked in others.

In the static method **connected()** of the NewComponent component class, the handler for the custom event *"reverse"* is assigned to the myEvent element. Inside this handler, the array is reverse and the DOM of the component is updated:

```js
static connected() {
  // add a "reverse" event handler to the myEvent element
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // reverse array
  })
}
```

In the static method **connected()** of the MyComponent component class, a *"click"* event handler is added to the button, inside which the *"reverse"* event is called for the myEvent element, as shown below:

```js
static connected() {
  // add a "click" event handler for the button
  this.$('#btn-reverse').addEventListener('click', () => {
    // trigger "reverse" event on element myEvent
    this.$event(myEvent, 'reverse')
  })
}
```

The first argument of the special **$event()** method is the event element myEvent, and the second argument is the name of the event to be called:

```js
this.$event(myEvent, 'reverse')
```

The **$event()** method can also receive a third argument, in which you can pass parameters that fully correspond to the parameters of the [CustomEvent](https://javascript.info/dispatch-events#custom-events) constructor. For example, you can pass the **detail** property, which allows you to share data between components.

<br>

Add a new *"new-colors"* event handler to the static **connected()** method of the NewComponent component, as shown below:

```js
static connected() {
  // add a "reverse" event handler to the myEvent element
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // reverse array
  })

  // add a "new-colors" event handler to the myEvent element
  myEvent.addEventListener('new-colors', event => {
    this.colors = event.detail // assign new array
  })
}
```

Note that the event handler now has an **event** parameter through which you can access the **detail** property. In addition, it is recommended to add a hyphen to the names of custom events so that they do not overlap with the names of standard events.

Now modify the markup of the MyComponent component by adding a new button to it:

```js
static template = `
  <button id="btn-reverse">Reverse array</button>
  <button id="btn-new">New array</button>
`
```

and the *"click"* event handler, inside which a new array of colors is passed to the *"new-colors"* event handler:

```js
static connected() {
  // add a "click" event handler for the button
  this.$('#btn-reverse').addEventListener('click', () => {
    // trigger "reverse" event on element myEvent
    this.$event(myEvent, 'reverse')
  })

  // add a "click" event handler for the button
  this.$('#btn-new').addEventListener('click', () => {
    // trigger "new-colors" event on element myEvent
    this.$event(myEvent, 'new-colors', {
      // pass a new array to the event handler
      detail: ['blue', 'orange', 'purple', 'gold']
    })
  })
}
```

In this way, data can be easily exchanged between different components.

<br>

To demonstrate the interaction of components with external code, add a button to clear the array in the markup of the *index.html* file:

```html
<!-- mount the MyComponent component -->
<my-component id="mycomp"></my-component>

<!-- mount the NewComponent component -->
<new-component id="newcomp"></new-component>

<!-- clear array button -->
<button id="btn-clear">Clear array</button>
```

Add a new *"clear-colors"* event handler to the static **connected()** method of the NewComponent component, as shown below:

```js
static connected() {
  // add a "reverse" event handler to the myEvent element
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // reverse array
  })

  // add a "new-colors" event handler to the myEvent element
  myEvent.addEventListener('new-colors', event => {
    this.colors = event.detail // assign new array
  })

  // add a "clear-colors" event handler to the myEvent element
  myEvent.addEventListener('clear-colors', event => {
    this.colors.length = 0 //  clear array
  })
}
```

and the *"click"* event handler for the new button at the end of the script:

```js
// add a "click" event handler for the button
document.querySelector('#btn-clear').addEventListener('click', () => {
  // trigger "clear-colors" event on element myEvent
  Reacton.event(myEvent, 'clear-colors')
})

// pass component classes to Reacton plugin
Reacton(MyComponent, NewComponent)
```

Inside this handler, the *"clear-colors"* event for the myEvent element is called using the **event()** method of the plugin itself:

```js
// trigger "clear-colors" event on element myEvent
Reacton.event(myEvent, 'clear-colors')
```

rather than using the special **$event()** method, which is only available in components, but is essentially just a reference to the **event()** method of the Reacton plugin.

Below is the full content of the *index.html* file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- mount the NewComponent component -->
  <new-component id="newcomp"></new-component>

  <!-- clear array button -->
  <button id="btn-clear">Clear array</button>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create event element myEvent
    const myEvent = new Reacton.event()

    // create component class NewComponent
    class NewComponent {
      colors = ['red', 'green', 'blue']

      static template = `
        <ul $for="col of colors">
          <li>{{ col }}</li>
        </ul>
      `

      static connected() {
        // add a "reverse" event handler to the myEvent element
        myEvent.addEventListener('reverse', () => {
          this.colors.reverse() // reverse array
        })

        // add a "new-colors" event handler to the myEvent element
        myEvent.addEventListener('new-colors', event => {
          this.colors = event.detail // assign new array
        })

        // add a "clear-colors" event handler to the myEvent element
        myEvent.addEventListener('clear-colors', event => {
          this.colors.length = 0 //  clear array
        })
      }
    }

    // create component class MyComponent
    class MyComponent {
      static template = `
        <button id="btn-reverse">Reverse array</button>
        <button id="btn-new">New array</button>
      `

      static connected() {
        // add a "click" event handler for the button
        this.$('#btn-reverse').addEventListener('click', () => {
          // trigger "reverse" event on element myEvent
          this.$event(myEvent, 'reverse')
        })

        // add a "click" event handler for the button
        this.$('#btn-new').addEventListener('click', () => {
          // trigger "new-colors" event on element myEvent
          this.$event(myEvent, 'new-colors', {
            // pass a new array to the event handler
            detail: ['blue', 'orange', 'purple', 'gold']
          })
        })
      }
    }

    // add a "click" event handler for the button
    document.querySelector('#btn-clear').addEventListener('click', () => {
      // trigger "clear-colors" event on element myEvent
      Reacton.event(myEvent, 'clear-colors')
    })

    // pass component classes to Reacton plugin
    Reacton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="routes">Routes</h2>

<br>

To create routing, an improved [custom events](https://javascript.info/dispatch-events) mechanism is used. This mechanism involves the use of the **route()** method of the Reacton plugin and the special **$route()** method that is available in every component.

When the Reacton plugin's **route()** method is called as a constructor, it returns a new [document fragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) that is the source and receiver of custom events. And when this method is not called as a constructor, it works similarly to the special method **$route()**. This allows you to connect the components involved in routing not only among themselves, but also with any external code.

Unlike the **event()** method, the **route()** method, called as a constructor, returns document fragments with an improved [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) method, which allows regular expression characters to be used in event names.

Make changes to the *index.html* file as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyMenu component -->
  <my-menu></my-menu>

  <!-- mount the MyContent component -->
  <my-content></my-content>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create event element myRoute
    const myRoute = new Reacton.route()

    // create component class myHome
    class myHome {
      static extends = 'div' // mounting element
      static template = '<h2>Home</h2>'
    }

    // create component class myAbout
    class myAbout {
      static extends = 'div' // mounting element
      static template = '<h2>About</h2>'
    }

    // create component class myContacts
    class myContacts {
      static extends = 'div' // mounting element
      static template = '<h2>Contacts</h2>'
    }

    // create component class MyMenu
    class MyMenu {
      static template = `
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contacts">Contacts</a>
        </nav>
      `

      static connected() {
        // add a "click" event handler to the NAV element
        this.$('nav').addEventListener('click', event => {
          // cancel clicking on the link
          event.preventDefault()

          // trigger a link address event on myRoute element
          this.$route(myRoute, event.target.href)
        })
      }
    }

    // create component class MyContent
    class MyContent {
      page = 'my-home' // initial state value

      // components mount element
      static template = '<div :is="page"></div>'

      static connected() {
        // add a "/" event handler to the myRoute element
        myRoute.addEventListener('/', () => {
          this.page = 'my-home' // assign a value
        })

        // add a "/about" event handler to the myRoute element
        myRoute.addEventListener('/about', () => {
          this.page = 'my-about' // assign a value
        })

        // add a "/contacts" event handler to the myRoute element
        myRoute.addEventListener('/contacts', () => {
          this.page = 'my-contacts' // assign a value
        })
      }
    }

    // pass component classes to Reacton plugin
    Reacton(myHome, myAbout, myContacts, MyMenu, MyContent)
  </script>
</body>
</html>
```

To work with routing, we need any development server, such as, for example, [lite-server](https://www.npmjs.com/package/lite-server).

Install this server using the command in the terminal:

```
npm install --global lite-server
```

Now navigate to the *app* directory using a terminal or open a terminal in that directory and in the terminal enter the command:

```
lite-server
```

This will open a default browser window displaying the application created above.

<br>

In this example, a new event element myRoute is first created:

```js
// create event element myRoute
const myRoute = new Reacton.route()
```

This element will be assigned address event handlers in some components and called in others.

Then we have the definition of the three components of the pages:

```js
// create component class myHome
class myHome {
  static extends = 'div' // mounting element
  static template = '<h2>Home</h2>'
}

// create component class myAbout
class myAbout {
  static extends = 'div' // mounting element
  static template = '<h2>About</h2>'
}

// create component class myContacts
class myContacts {
  static extends = 'div' // mounting element
  static template = '<h2>Contacts</h2>'
}
```

After creating the pages components, the main menu component is created:

```js
// create component class MyMenu
class MyMenu {
  static template = `
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contacts">Contacts</a>
    </nav>
  `

  static connected() {
    // add a "click" event handler to the NAV element
    this.$('nav').addEventListener('click', event => {
      // cancel clicking on the link
      event.preventDefault()

      // trigger a link address event on myRoute element
      this.$route(myRoute, event.target.href)
    })
  }
}
```

This component is the first one mounted in the application:

```html
<!-- mount the MyMenu component -->
<my-menu></my-menu>
```

In the static method **connected()** of the MyMenu component class, the NAV element is added a *"click"* event handler, inside which the link is paused and the address event is raised for the myRoute element, as shown below:

```js
static connected() {
  // add a "click" event handler to the NAV element
  this.$('nav').addEventListener('click', event => {
    // cancel clicking on the link
    event.preventDefault()

    // trigger a link address event on myRoute element
    this.$route(myRoute, event.target.href)
  })
}
```

As the name of the address event, in the second argument of the **$route()** method, the content of the ***href*** attribute of the link that was clicked is passed:

```js
// trigger a link address event on myRoute element
this.$route(myRoute, event.target.href)
```

As when working with user events, the **$route()** method can be passed an object with the **detail** property in the third argument, in which some data is passed to handlers, for example:

```js
// trigger a link address event on myRoute element
this.$route(myRoute, event.target.href, {
  // pass a new array to the event handler
  detail: ['blue', 'orange', 'purple', 'gold']
})
```

An important difference from custom events is that the data passed to address events must be serializable and their size must not exceed 16 MiB. Those. this data must match the **state** parameter of the [pushState()](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) method.

<br>

The last component in the application is defined for the output of pages:

```js
// create component class MyContent
class MyContent {
  page = 'my-home' // initial state value

  // components mount element
  static template = '<div :is="page"></div>'

  static connected() {
    // add a "/" event handler to the myRoute element
    myRoute.addEventListener('/', () => {
      this.page = 'my-home' // assign a value
    })

    // add a "/about" event handler to the myRoute element
    myRoute.addEventListener('/about', () => {
      this.page = 'my-about' // assign a value
    })

    // add a "/contacts" event handler to the myRoute element
    myRoute.addEventListener('/contacts', () => {
      this.page = 'my-contacts' // assign a value
    })
  }
}
```

This component is the last one mounted in the application:

```html
<!-- mount the MyContent component -->
<my-content></my-content>
```

At the very beginning of this component's class, an initial state value of **page** is defined, as shown below:

```js
page = 'my-home' // initial state value
```

It matches the name of the myHome page component:

```js
// create component class myHome
class myHome {
  static extends = 'div' // mounting element
  static template = '<h2>Home</h2>'
}
```

In the HTML markup of the MyContent component, the myHome component is created using the ***is*** reactive attribute:

```js
// components mount element
static template = '<div :is="page"></div>'
```

In the static method **connected()** of the MyContent component, three handlers are assigned to the myRoute element, as shown below:

```js
static connected() {
  // add a "/" event handler to the myRoute element
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // assign a value
  })

  // add a "/about" event handler to the myRoute element
  myRoute.addEventListener('/about', () => {
    this.page = 'my-about' // assign a value
  })

  // add a "/contacts" event handler to the myRoute element
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // assign a value
  })
}
```

Inside each handler, the **page** state is assigned a new value corresponding to the address of the page on which the handler fired, for example:

```js
this.page = 'my-about' // assign a value
```

This handler will work if the page address matches */about*.

If the initial state value **page** does not match the name of the component, for example:

```js
page = '' // initial state value
```

or if the application is supposed to be opened not from the main page, but, for example, from the page */about* or any other, then it is recommended to add to the end of the static method **connected()** of the MyContent component, calling the address event for the myRoute element. Thus, routing will be triggered immediately after the component is connected.

The second argument to the **$route()** method is the **href** property of the [location](https://developer.mozilla.org/en-US/docs/Web/API/Location) object, as shown below:


```js
static connected() {
  // add a "/" event handler to the myRoute element
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // assign a value
  })

  // add a "/about" event handler to the myRoute element
  myRoute.addEventListener('/about', () => {
    this.page = 'my-about' // assign a value
  })

  // add a "/contacts" event handler to the myRoute element
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // assign a value
  })

  // trigger page address event on myRoute element
  this.$route(myRoute, location.href)
}
```

<br>

For event elements created using the **route()** method of the Reacton plugin, it is allowed to use [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) characters in the name of events created by the **addEventListener()** method, for example:

```js
// add a "/abo\\w+" event handler to the myRoute element
myRoute.addEventListener('/abo\\w+', () => {
  this.page = 'my-about' // assign a value
})
```

In this example, the handler will be called for all pages that start with */abo*.

An important feature of creating regular expressions in a string is that special characters must be escaped twice:

```js
'/abo\\w+'
```

instead of:

```js
'/abo\w+'
```

At the internal level, such a string is converted to a regular expression of the following form:

```js
/\/abo\w+/
```

<br>

All handlers support [routes parameters](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#route_parameters). Add a new link to the HTML markup of the MyMenu component:

```js
static template = `
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contacts">Contacts</a>
    <a href="/john/32">John</a>
  </nav>
`
```

Create a new page component myUsers:

```js
// create component class myUsers
class myUsers {
  static extends = 'div' // mounting element
  static mode = 'open' // add Shadow DOM

  static template = `
    <slot name="user"></slot>
    <slot name="age"></slot>
  `
}
```

Since this component will receive HTML content from the outside in the [slots](https://javascript.info/slots-composition), it was necessary to add a [Shadow DOM](https://javascript.info/shadow-dom) to it, as shown below:

```js
static mode = 'open' // add Shadow DOM
```

In addition, the Shadow DOM must be added to all other pages components so that the HTML content passed through the slots to the myUsers component is not displayed in them:

```js
// create component class myHome
class myHome {
  static extends = 'div' // mounting element
  static mode = 'open' // add Shadow DOM
  static template = '<h2>Home</h2>'
}

// create component class myAbout
class myAbout {
  static extends = 'div' // mounting element
  static mode = 'open' // add Shadow DOM
  static template = '<h2>About</h2>'
}

// create component class myContacts
class myContacts {
  static extends = 'div' // mounting element
  static mode = 'open' // add Shadow DOM
  static template = '<h2>Contacts</h2>'
}
```

Pass the class of the new component to the Reacton plugin:

```js
// pass component classes to Reacton plugin
Reacton(myHome, myAbout, myContacts, MyMenu, MyContent, myUsers)
```

Modify the markup of the MyContent component by adding HTML output to named slots using the [slot](https://javascript.info/slots-composition#named-slots) attribute, as shown below:

```js
// components mount element
static template = `
  <div :is="page">
    <p slot="user">{{ user }}</p>
    <p slot="age">{{ age }}</p>
  </div>
`
```

Add two new states **user** and **age** for the MyContent component:

```js
page = 'my-home' // initial state value
user = ''
age = ''
```

It remains to add a handler for this address event at the end of the static method **connected()** of the MyContent component:

```js
static connected() {
  // add a "/" event handler to the myRoute element
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // assign a value
  })

  // add a "/abo\\w+" event handler to the myRoute element
  myRoute.addEventListener('/abo\\w+', () => {
    this.page = 'my-about' // assign a value
  })

  // add a "/contacts" event handler to the myRoute element
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // assign a value
  })

  // add a "/:user/:age" event handler to the myRoute element
  myRoute.addEventListener('/:user/:age', event => {
    this.page = 'my-users' // component name
    this.user = event.params.user // username
    this.age = event.params.age // user age
  })
}
```

Parameters are specified in the name of the processed event using the ":" symbol. In the example above, two parameters were given: ***:user*** and ***:age***. They are available inside the handler through the **params** property of the [event](https://javascript.info/introduction-browser-events#event-object) object, as shown below:

```js
this.user = event.params.user // username
this.age = event.params.age // user age
```

<br>

In addition to routes parameters, handlers allow you to work with query parameters. Add a new link to the HTML markup of the MyMenu component:

```js
static template = `
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contacts">Contacts</a>
    <a href="/john/32">John</a>
    <a href="/john?age=32">Age</a>
  </nav>
`
```

Add a final handler for this address event at the end of the MyContent component's static **connected()** method:

```js
static connected() {
  // add a "/" event handler to the myRoute element
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // assign a value
  })

  // add a "/abo\\w+" event handler to the myRoute element
  myRoute.addEventListener('/abo\\w+', () => {
    this.page = 'my-about' // assign a value
  })

  // add a "/contacts" event handler to the myRoute element
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // assign a value
  })

  // add a "/:user/:age" event handler to the myRoute element
  myRoute.addEventListener('/:user/:age', event => {
    this.page = 'my-users' // component name
    this.user = event.params.user // username
    this.age = event.params.age // user age
  })

   // add a "/:user\\?age=32" event handler to the myRoute element
  myRoute.addEventListener('/:user\\?age=32', event => {
    this.page = 'my-users' // component name
    this.user = event.params.user // username
    this.age = event.url.searchParams.get('age') // user age
  })
}
```

To access query parameters, use the [url](https://javascript.info/url) property of the [event](https://javascript.info/introduction-browser-events#event-object) object. It contains the [searchParams](https://javascript.info/url#searchparams) property, which provides convenience methods for working with query parameters, one of which is the **get()** method, as shown below:

```js
this.age = event.url.searchParams.get('age') // user age
```

<br>

To demonstrate the interaction of address event handlers with external code, instead of the MyMenu component, add the NAV element of the main menu to the markup of the *index.html* file:

```html
<!-- Main menu -->
<nav id="mymenu">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contacts">Contacts</a>
  <a href="/john/32">John</a>
  <a href="/john?age=32">Age</a>
</nav>

<!-- mount the MyContent component -->
<my-content></my-content>
```

Add a *"click"* event handler for this menu at the end of the script:

```js
// add a "click" event handler to the NAV element
document.querySelector('#mymenu').addEventListener('click', () => {
  // cancel clicking on the link
  event.preventDefault()

  // trigger a link address event on myRoute element
  Reacton.route(myRoute, event.target.href)
})

// pass component classes to Reacton plugin
Reacton(myHome, myAbout, myContacts, MyContent, myUsers)
```

Inside this handler, the address event for the myRoute element is called using the **route()** method of the plugin itself:

```js
// trigger a link address event on myRoute element
Reacton.route(myRoute, event.target.href)
```

rather than using the special **$route()** method, which is only available in components, but is essentially just a reference to the **route()** method of the Reacton plugin.

Below is the full content of the *index.html* file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- Main menu -->
  <nav id="mymenu">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contacts">Contacts</a>
    <a href="/john/32">John</a>
    <a href="/john?age=32">Age</a>
  </nav>

  <!-- mount the MyContent component -->
  <my-content></my-content>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script>
    // create event element myRoute
    const myRoute = new Reacton.route()

    // create component class myHome
    class myHome {
      static extends = 'div' // mounting element
      static mode = 'open' // add Shadow DOM
      static template = '<h2>Home</h2>'
    }

    // create component class myAbout
    class myAbout {
      static extends = 'div' // mounting element
      static mode = 'open' // add Shadow DOM
      static template = '<h2>About</h2>'
    }

    // create component class myContacts
    class myContacts {
      static extends = 'div' // mounting element
      static mode = 'open' // add Shadow DOM
      static template = '<h2>Contacts</h2>'
    }

    // create component class myUsers
    class myUsers {
      static extends = 'div' // mounting element
      static mode = 'open' // add Shadow DOM

      static template = `
        <slot name="user"></slot>
        <slot name="age"></slot>
      `
    }

    // create component class MyContent
    class MyContent {
      page = 'my-home' // initial state value
      user = ''
      age = ''

      // components mount element
      static template = `
        <div :is="page">
          <p slot="user">{{ user }}</p>
          <p slot="age">{{ age }}</p>
        </div>
      `

      static connected() {
        // add a "/" event handler to the myRoute element
        myRoute.addEventListener('/', () => {
          this.page = 'my-home' // assign a value
        })

        // add a "/abo\\w+" event handler to the myRoute element
        myRoute.addEventListener('/abo\\w+', () => {
          this.page = 'my-about' // assign a value
        })

        // add a "/contacts" event handler to the myRoute element
        myRoute.addEventListener('/contacts', () => {
          this.page = 'my-contacts' // assign a value
        })

        // add a "/:user/:age" event handler to the myRoute element
        myRoute.addEventListener('/:user/:age', event => {
          this.page = 'my-users' // component name
          this.user = event.params.user // username
          this.age = event.params.age // user age
        })

        // add a "/:user\\?age=32" event handler to the myRoute element
        myRoute.addEventListener('/:user\\?age=32', event => {
          this.page = 'my-users' // component name
          this.user = event.params.user // username
          this.age = event.url.searchParams.get('age') // user age
        })
      }
    }

    // add a "click" event handler to the NAV element
    document.querySelector('#mymenu').addEventListener('click', () => {
      // cancel clicking on the link
      event.preventDefault()

      // trigger a link address event on myRoute element
      Reacton.route(myRoute, event.target.href)
    })

    // pass component classes to Reacton plugin
    Reacton(myHome, myAbout, myContacts, MyContent, myUsers)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="ssr">SSR</h2>

<br>

[SSR](https://www.patterns.dev/posts/server-side-rendering) is a method of rendering a web page on the server, not in the browser. To implement the rendering of Web components, the [jsdom](https://github.com/jsdom/jsdom) package is used - DOM virtualization in JavaScript.

Before moving on to rendering on the server, let's get acquainted in the browser with the function that is responsible for it.

Make changes to the index.html file as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component>
    <p>Web Components made easy!</p>
  </my-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script type="module">
    // create component class MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      static mode = 'open' // add Shadow DOM
      
      static template = `
        <h1>Hello, {{ message }}!</h1>
        <slot></slot>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // pass component class MyComponent to Reacton plugin
    Reacton(MyComponent)

    // execute render the HTML content of the page
    const html = await Reacton.ssr()

    // print rendered content to console
    console.log(html)
  </script>
</body>
</html>
```

The **ssr()** method of the Reacton plugin renders the HTML content of the page. It returns a promise whose value is a string containing the rendered HTML content:

```js
// execute render the HTML content of the page
const html = await Reacton.ssr()
```

which will be displayed in the browser console:

```
<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>

  
  <my-component>
          <h1>Hello, Reacton!</h1>
          
    <p>Web Components made easy!</p>
  
          
          
        </my-component>

  
  

</body></html>
```

<br>

By default, the **ssr()** method removes all scripts, styles, comments, and &lt;template&gt; in the returned HTML content.

The **ssr()** method takes one parameter, an object with three optional properties. Adding a **clean** property with a value of "false":

```js
const html = await Reacton.ssr({ clean: false })
```

cancels the default cleanup, and all content is output as is:

```
<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component>
          <h1>Hello, Reacton!</h1>
          
    <p>Web Components made easy!</p>
  
          
          <style>
            h1 {
              color: red;
            }
          </style>
        </my-component>

  <!-- include Reacton plugin -->
  <script src="reacton.min.js"></script>

  <script type="module">
    // create component class MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      static mode = 'open' // add Shadow DOM

      static template = `
        <h1>Hello, {{ message }}!</h1>
        <slot></slot>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // pass component class MyComponent to Reacton plugin
    Reacton(MyComponent)

    // execute render the HTML content of the page
    const html = await Reacton.ssr({ clean: false })

    // print rendered content to console
    console.log(html)
  </script>

</body></html>
```

<br>

By default, the **ssr()** method removes all [slots](https://javascript.info/slots-composition). But if you add the **slots** property with the value "true":

```js
const html = await Reacton.ssr({ slots: true })
```

then the slots will be output to the content:

```
<h1>Hello, Reacton!</h1>
          <slot>
    <p>Web Components made easy!</p>
  </slot>
```

<br>

By default, the **ssr()** method renders the entire page. But you can add a **node** property to it with a value equal to the node from which rendering should begin:

```js
const html = await Reacton.ssr({ node: document.body })
```

Then only this node and everything in it will get into the rendered content:

```
<body>

  
  <my-component>
          <h1>Hello, Reacton!</h1>
          
    <p>Web Components made easy!</p>
  
          
          
        </my-component>

  
  

</body>
```

<br>

Now we can move on to the topic of rendering on the server. Download the [server](https://github.com/reacton-js/reacton/tree/main/server) directory and let's take a look at its contents:

The *public* subdirectory contains all the server's static files such as styles, fonts, images, scripts, etc.

The *bots.js* file contains an array with the names of known bots. This array can be modified to your liking:

```js
module.exports = [
  // Yandex
  'YandexBot', 'YandexAccessibilityBot', 'YandexMobileBot', 'YandexDirectDyn',

  // Google
  'Googlebot', 'Googlebot-Image', 'Mediapartners-Google', 'AdsBot-Google', 'APIs-Google',
  'AdsBot-Google-Mobile',

  // Other
  'Mail.RU_Bot', 'bingbot', 'Accoona', 'Lighthouse', 'ia_archiver', 'Ask Jeeves', 'OmniExplorer_Bot', 'W3C_Validator',
]
```

<br>

The *index.html* file in the *server* directory is the main application file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- mount the MyMenu component -->
  <my-menu></my-menu>

  <!-- Header element -->
  <header>
    <img src="img/logo.jpg" alt="logo">
  </header>

  <!-- mount the MyContent component -->
  <my-content></my-content>

  <!-- include Reacton plugin -->
  <script src="js/reacton.min.js"></script>

  <script>
    // create event element myRoute
    const myRoute = new Reacton.route()

    // create component class myHome
    class myHome {
      static extends = 'div' // expandable element
      static mode = 'open' // add Shadow DOM
      static template = `<h2>Home</h2>`
    }

    // create component class myAbout
    class myAbout {
      static extends = 'div' // expandable element
      static mode = 'open' // add Shadow DOM

      static async template() {
        // get data one second after method call
        const message = await new Promise(ok => setTimeout(() => ok('About'), 1000))

        return `<h2>${message}</h2>`
      }
    }

    // create component class myContacts
    class myContacts {
      static extends = 'div' // expandable element
      static mode = 'open' // add Shadow DOM
      static template = `<h2>Contacts</h2>`
    }

    // create component class MyMenu
    class MyMenu {
      static mode = 'open' // add Shadow DOM

      static template = `
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contacts">Contacts</a>
        </nav>
      `

      static connected() {
        // add a "click" event handler to the NAV element
        this.$('nav').addEventListener('click', event => {
          // cancel clicking on the link
          event.preventDefault()

          // trigger a link address event on myRoute element
          this.$route(myRoute, event.target.href)
        })
      }
    }

    // create component class MyContent
    class MyContent {
      page = '' // initial state value

      static mode = 'open' // add Shadow DOM

      static template = `
        <div :is="page"></div>

        <style>
          :host {
            display: block;
            margin-top: 30px;
          }
        </style>
      `

      static connected() {
        // add a "/" event handler to the myRoute element
        myRoute.addEventListener('/', () => {
          this.page = 'my-home' // assign a value
        })

        // add a "/about" event handler to the myRoute element
        myRoute.addEventListener('/about', () => {
          this.page = 'my-about' // assign a value
        })

        // add a "/contacts" event handler to the myRoute element
        myRoute.addEventListener('/contacts', () => {
          this.page = 'my-contacts' // assign a value
        })

        // trigger page address event on myRoute element
        this.$route(myRoute, location.href)
      }
    }

    // pass component classes to Reacton plugin
    Reacton(myHome, myAbout, myContacts, MyMenu, MyContent)
  </script>
</body>
</html>
```

This file is a slightly modified router from the last chapter. All components have an open [Shadow DOM](https://javascript.info/shadow-dom), since components with a closed Shadow DOM are not rendered.

The MyContent component has a [:host](https://javascript.info/shadow-dom-style#host) selector to style the component element and checks for the existence of the requested page component:

```js
static template = `
  <div :is="page"></div>

  <style>
    :host {
      display: block;
      margin-top: 30px;
    }
  </style>
`
```

In addition, the myAbout component simulates loading data from the server in one second:

```js
static async template() {
  // get data one second after method call
  const message = await new Promise(ok => setTimeout(() => ok('About'), 1000))

  return `<h2>${message}</h2>`
}
```

<br>

*If you plan to use asynchronous scripts with the [module](https://javascript.info/modules-intro) type on your application page in the future, then refer to the [guide](https://github.com/jsdom/jsdom#asynchronous-script-loading) by jsdom.*

*Use the [XMLHttpRequest](https://javascript.info/xmlhttprequest) object for requests in scripts and components instead of the [fetch()](https://javascript.info/fetch) method, as the latter causes rendering errors.*

```js
// instead of the fetch() method
const response = await fetch('file.txt')
const file = await response.text()

// use the XMLHttpRequest object
const xhr = new XMLHttpRequest()
xhr.open('GET', 'file.txt')
xhr.send()
const file = await new Promise(ok => xhr.onload = () => ok(xhr.response))
```

<br>

The most important server file in the *server* directory is the *server.js* file, which is a normal [Express](https://expressjs.com/) application, as shown below:

```js
const express = require('express')
const { readFile } = require('fs/promises')
const jsdom = require('jsdom')
const { JSDOM } = require('jsdom')
const port = process.env.PORT || 3000

// create an Express application object
const app = express()

// define directory for static files
app.use(express.static(__dirname + '/public'))

// get an array of bot names from an external file
const arrBots = require('./bots.js')

// define the bot agent string to test
const botAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

// define a regular expression to search for bot names in a string
const regBots = new RegExp(`(${arrBots.join(')|(')})`, 'i')

// search for script file extensions
const regJS = /\.m?js$/

// loads only scripts and ignores all other resources
class CustomResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    return regJS.test(url) ? super.fetch(url, options) : null
  }
}

// process favicon
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

// process all other requests
app.use(async (req, res) => {
  // define user agent
  const userAgent = (process.argv[2] == 'bot') ? botAgent : req.get('User-Agent')
  
  // if the request comes from a bot
  if (regBots.test(userAgent)) {
    // determine the full URL of the request
    const fullURL = req.protocol + '://' + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

    // load the main page file of the application
    const file = await readFile(__dirname + '/index.html')

    // define a new JSDOM object with parameters
    const dom = new JSDOM(file.toString(), {
      url: fullURL, // set page url
      resources: new CustomResourceLoader(), // loading only scripts
      runScripts: 'dangerously', // allow page scripts to execute
    })

    // get the rendered HTML content of the page
    const html = await new Promise(ok => dom.window.onload = () => dom.window.Reacton.ssr().then(ok))

    // return rendered HTML content
    res.send(html)
  }
  
  // otherwise, if the request comes from a user
  else {
    // return the main page file of the application
    res.sendFile(__dirname + '/index.html')
  }
})

// start the server
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))
```

<br>

All requests in it are processed in the **use()** method. First comes the definition of the user agent:

```js
// define user agent
const userAgent = (process.argv[2] == 'bot') ? botAgent : req.get('User-Agent')
```

This allows you to test the server in bot mode. Then, if the request comes from a bot, then the following block of code is executed:

```js
// if the request comes from a bot
if (regBots.test(userAgent)) {
  // determine the full URL of the request
  const fullURL = req.protocol + '://' + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

  // load the main page file of the application
  const file = await readFile(__dirname + '/index.html')

  // define a new JSDOM object with parameters
  const dom = new JSDOM(file.toString(), {
    url: fullURL, // set page url
    resources: new CustomResourceLoader(), // loading only scripts
    runScripts: 'dangerously', // allow page scripts to execute
  })

  // get the rendered HTML content of the page
  const html = await new Promise(ok => dom.window.onload = () => dom.window.Reacton.ssr().then(ok))

  // return rendered HTML content
  res.send(html)
}
```

<br>

It defines the full URL of the request, loads the application's main page file, and forms a new jsdom object:

```js
// determine the full URL of the request
const fullURL = req.protocol + '://' + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

// load the main page file of the application
const file = await readFile(__dirname + '/index.html')

// define a new JSDOM object with parameters
const dom = new JSDOM(file.toString(), {
  url: fullURL, // set page url
  resources: new CustomResourceLoader(), // loading only scripts
  runScripts: 'dangerously', // allow page scripts to execute
})
```

<br>

After that, in the virtual DOM of the created object, the **ssr()** method of the Reacton plugin is launched, which returns a promise, the value of which is the rendered HTML content of the page as a string:

```js
// get the rendered HTML content of the page
const html = await new Promise(ok => dom.window.onload = () => dom.window.Reacton.ssr().then(ok))
```

This line is given to the bot:

```js
// return rendered HTML content
res.send(html)
```

<br>

If the request comes from a user and not from a bot, then the main application file is simply returned to him:

```js
// otherwise, if the request comes from a user
else {
  // return the main page file of the application
  res.sendFile(__dirname + '/index.html')
}
```

<br>

Now navigate to the *server* directory using a terminal, or open a terminal in this directory, and in the terminal enter the command:

```
npm i
```

This will install all dependencies. To run the application, enter the command:

```
node server
```

This will start the server normally. To test the server in bot mode, enter the command:

```
node server bot
```

To view the rendered content, switch to source code mode in the browser using the keyboard shortcut Ctrl + U.

<br>
<br>