<br>

[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

![rigl](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Reacton⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/dist/reacton.js)

<br>

Reacton is a JavaScript library for building applications based on reactive [Web Components](https://javascript.info/web-components) with server-side rendering capabilities. Reacton is an open source library and distributed under the [MIT](https://en.wikipedia.org/wiki/MIT_License) license. The library contains a [Router](https://en.wikipedia.org/wiki/Routing) and provides an [Observer](https://en.wikipedia.org/wiki/Observer_pattern) for communication between various application components. Provides support for single-file components and multilevel loops.

*The second version of the library has been completely rewritten and therefore cannot properly interact with the components written for the first one. It has fixed bugs, updated attributes and reworked problematic code points from the previous version.*

Below is an example of a simple single-file component:

```html
<r-hello>
  <h1>Hello, {{ message }}!</h1>

  <style>
    h1 {
      color: {{ mainColor }};
    }
  </style>

  <script>
    exports = {
      data() {
        return {
          message: 'Reacton',
          mainColor: 'red'
        }
      }
    }
  </script>
</r-hello>
```

<br>

1. [Quick start](#quick-start)
2. [Component object](#component-object)
3. [Data binding](#data-binding)
4. ~~[Cycles](#cycles)~~
5. ~~[Displays](#displays)~~
6. ~~[Child components](#child-components)~~
7. ~~[Observer](#observer)~~
8. ~~[Router](#router)~~
9. ~~[Rendering](#rendering)~~

<br>
<hr>
<br>

<h2 id="quick-start">Quick start</h2>

<br>

Reacton allows you to create several types of components: Embedded, Modular, Template and Single File components. We'll start with Embedded Components. Create a new working directory, for example named *app*, and download the [reacton.js](https://raw.githubusercontent.com/reacton-js/reacton/main/dist/reacton.js) file into this directory.

Add an *index.html* file to the directory with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello></r-hello>
  
  <!-- include Reacton library -->
  <script src="reacton.js"></script>

  <script>
    // create a Hello component object
    const Hello = {
      name: 'r-hello',
      data() {
        return {
          message: 'Reacton'
        }
      },
      html: `
        <h1>Hello, {{ message }}!</h1>
      `
    }

    // pass Hello component object to Reacton library
    Reacton(Hello)
  </script>
</body>
</html>
```

To ensure there are no naming conflicts between standard and custom HTML elements, the component name must contain a dash "-", for example, my-element and super-button are valid names, but myelement is not.

When you open the *index.html* file in the browser, the screen will display the message created in the Hello component:

> <h1>Hello, Reacton!</h1>

<br>

In this example, a simple component has been created that is embedded in a common script. Let's now move this component into a separate module.

Create a *Hello.js* file in the *app* directory with the following content:

```js
// export the Hello component object
export const Hello = {
  name: 'r-hello',
  data() {
    return {
      message: 'Reacton'
    }
  },
  html: `
    <h1>Hello, {{ message }}!</h1>
  `
}
```

Make changes to the *index.html* file as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello></r-hello>
  
  <!-- include Reacton library -->
  <script src="reacton.js"></script>

  <script type="module">
    // import Hello component object
    import { Hello } from './Hello.js'

    // pass Hello component object to Reacton library
    Reacton(Hello)
  </script>
</body>
</html>
```

To work with Modular and Single File components, we need any development server, such as, for example, [lite-server](https://www.npmjs.com/package/lite-server).

Install this server using the command in the terminal:

```
npm install --global lite-server
```

Now navigate to the *app* directory using a terminal or open a terminal in that directory and in the terminal enter the command:

```
lite-server
```

This will open a default browser window displaying the welcome message shown above:

> <h1>Hello, Reacton!</h1>

<br>

Another type of component, which we will now consider, allows you to define components in external files with the *.htm* extension. Single-file components use simple HTML syntax for their description.

Create a *Hello.htm* file in the app directory with the following content:

```html
<r-hello>
  <h1>Hello, {{ message }}!</h1>

  <script>
    exports = {
      data() {
        return {
          message: 'Reacton'
        }
      }
    }
  </script>
</r-hello>
```

Make changes to the *index.html* file as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello></r-hello>
  
  <!-- include Reacton library -->
  <script src="reacton.js"></script>

  <script>
    // pass file path of Hello component to Reacton library
    Reacton('Hello.htm')
  </script>
</body>
</html>
```

Navigate to the *app* directory using a terminal, or open a terminal in that directory, and in the terminal enter the command:

```
lite-server
```

The default browser window will open again, displaying the welcome message:

> <h1>Hello, Reacton!</h1>

<br>

You can pass any number of arguments to a Reacton function, representing different types of components. For example, create an embedded Bye component in the *index.html* file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello></r-hello>

  <!-- mount the Bye component -->
  <r-bye></r-bye>
  
  <!-- include Reacton library -->
  <script src="reacton.js"></script>

  <script>
    // create Bye component object
    const Bye = {
      name: 'r-bye',
      html: `
        <p>Bye, simple Web Components...</p>
      `
    }

    // pass the path to the Hello component file and the Bye component object
    Reacton('Hello.htm', Bye)
  </script>
</body>
</html>
```

<br>

The template type of components allows you to combine the simplicity of HTML syntax and the absence of the need to run the application through the server. Template components are defined in a TEMPLATE element with an optional ***name*** attribute.

Make changes to the *index.html* file as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello></r-hello>

  <!-- Hello component template -->
  <template name="r-hello">
    <h1>Hello, {{ message }}!</h1>

    <script>
      exports = {
        data() {
          return {
            message: 'Reacton'
          }
        }
      }
    </script>
  </template>
  
  <!-- include Reacton library -->
  <script src="reacton.js"></script>

  <script>
    // pass the Hello component template to the Reaction library
    Reacton(document.querySelector('template[name="r-hello"]'))
  </script>
</body>
</html>
```

The name of a Template component can be passed not in an attribute, but in the **name** property of its exported object, as is done for Embedded components, for example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello></r-hello>

  <!-- Hello component template -->
  <template>
    <h1>Hello, {{ message }}!</h1>

    <script>
      exports = {
        name: 'r-hello', // component name
        data() {
          return {
            message: 'Reacton'
          }
        }
      }
    </script>
  </template>
  
  <!-- include Reacton library -->
  <script src="reacton.js"></script>

  <script>
    // pass the Hello component template to the Reaction library
    Reacton(document.querySelector('template'))
  </script>
</body>
</html>
```

<br>

Regardless of the type, all components in Reacton are reactive. You can easily see this if you change the value of the custom **message** property of the Hello component in the browser console. To access any custom component data, the special **$data** property is used.

To access this property, you must first select a component element. To make things easier, let's assign an ***id*** attribute with the value "hello" to the Hello component's mount tag, as shown below:

```html
<!-- mount the Hello component -->
<r-hello id="hello"></r-hello>
```

Now open the browser console, usually done with the keyboard shortcut Ctrl + Shift + I, and enter the following command:

```
hello.$data.message = 'Reactive Components'
```

After pressing the Enter key, the old message in the browser will change to the new welcome title:

> <h1>Hello, Reactive Components!</h1>

<br>
<br>
<h2 id="component-object">Component object</h2>

<br>

Each Embedded and Modular component object must contain a required name property that defines the **name** of the component, as shown below:

```js
const Hello = {
  name: 'r-hello'
}
```

In Template components, instead of the **name** property, you can use the attribute of the same name:

```html
<template name="r-hello">
```

and in Single-file, the name of the component is determined by the name of the element in which the component is enclosed:

```html
<r-hello>
```

<br>

The **data()** method must return an object with user data (properties and methods) of the component:

```js
data() {
  return {
    message: 'Reacton',
    printHello() {
      return 'Hello, World!'
    }
  }
}
```

This method can be asynchronous. In the example below, the **message** custom property simulates receiving data from the server:

```js
async data() {
  const message = await new Promise(ok => setTimeout(() => ok('Reacton'), 1000))

  return {
    message
  }
}
```

<br>

For Embedded and Modular components, the **html** property contains the component's HTML content as a string:

```js
html: `
  <h1>Hello, {{ message }}!</h1>
`
```

The HTML content of Template and Single-File components is defined by their internal markup:

```html
<h1>Hello, {{ message }}!</h1>
```

<br>

By default, all components are created without [Shadow DOM](https://javascript.info/shadow-dom). The mode property determines the [level of encapsulation](https://javascript.info/shadow-dom#shadow-tree) for the component to use [local styles](https://javascript.info/shadow-dom-style) and can be either "open" or "closed":

```js
mode: 'open'
```

In Template and Single-File components, this property can be replaced by the ***mode*** attribute:

```html
<r-hello mode="closed">
```

<br>

The **extends** property allows you to [mount the component](https://javascript.info/custom-elements#customized-built-in-elements) into a standard HTML element:

```js
extends: 'header'
```

In Template and Single-File components, this property can be replaced by the ***extends*** attribute:

```html
<r-hello extends="header">
```

The element into which the component is mounted must contain the ***is*** attribute with a value corresponding to the name of the component that is mounted into it:

```html
<header is="r-hello"></header>
```

<br>

The **attributes** property contains an array with attribute names, when changed, the **changed()** method will be called, for example:

```js
attributes: ['title'],

changed(name, oldValue, newValue) {
  console.log(name, oldValue, newValue)
}
```

Tracked attributes are a Web Component technology, and the **changed()** method is a shorthand for the [attributeChangedCallback()](https://javascript.info/custom-elements) method.

Add a ***title*** attribute to the Hello component's mount element in the *index.html* file, as shown below:

```html
<r-hello id="hello" title="Hello"></r-hello>
```

Now enter the command in the browser console:

```
hello.title = 'Bye'
```

After pressing the Enter key, the **changed()** method will print the following line to the console:

```
title Hello Bye
```

<br>

The **connected()**, **disconnected()** and **adopted()** methods are shorthand analogs of the [connectedCallback(), disconnectedCallback() and adoptedCallback()](https://javascript.info/custom-elements) methods.

They are called when a component is added to the document - the **connected()** method; removing a component from a document - the **disconnected()** method; and when moving the component to a new document, the **adopted()** method.

The most commonly used methods include the **connected()** method, which allows you to access the HTML content of the component after adding reactive links to it and displaying this content on the browser screen:

```js
connected() {
  console.log(this.$('h1'))
}
```

In this example, the selected H1 element is displayed on the browser console using the **$()** helper method, which is available in the **connected()** method through the *this* keyword. This method is a shorthand analog of the [querySelector()](https://javascript.info/searching-elements-dom#querySelector) method.

The second helper method is called **$$()** and is shorthand for the [querySelectorAll()](https://javascript.info/searching-elements-dom#querySelectorAll) method, as shown below:

```js
connected() {
  console.log(this.$$('h1')[0])
}
```

To access user data, the *this* keyword is used within the methods of the component object, since all of these methods are executed in the context of the component's data object. In addition, all the methods discussed above can be asynchronous.

In the example below, the **message** custom property is set to a new value one second after the component is added to the document:

```js
async connected() {
  this.message = await new Promise(ok => setTimeout(() => ok('Reactive Components'), 1000))
}
```

<br>

The **before()** and **after()** methods are called *Before* and *After* the component's user data values change, for example:

```js
before() {
  console.time('Update')
},

after() {
  console.timeEnd('Update')
}
```

Now if you enter the command in the browser console:

```
hello.$data.message = 'Reactive Components'
```

then after pressing the Enter key, the console will display the time for which the value of the **message** custom property was updated:

```
Update: 0.215087890625 ms
```

<br>

The last property that can be defined in the object of any component is called **mixins** and allows you to create properties and methods common to all components of the same name:

```js
mixins: {
  printMessage() {
    return this.message
  }
}
```

Now the **printMessage()** method will be available to all Hello components. To access the properties and methods of a mixin, a special **$mixins** property is used inside the component markup, after which, through a dot, the name of the requested method or property is indicated:

```html
<h1>Hello, {{ $mixins.printMessage() }}!</h1>
```

Impurities work in the following way. First, the properties are queried on the local **mixins** object we created above, then the property is queried on the global mixins object that we will create next, and finally, the property is queried on the component's data object.

For this reason, inside the **printMessage()** method, we were able to access the **message** custom property via the *this* keyword, as shown below:

```js
printMessage() {
  return this.message
}
```

In order for the created methods and properties to be available to all the component, and not just the ones of the same name, it is necessary to define a global mixin for them through the Reacton function and its **mixins** property.

This must be done before components are passed to this function to define them in the application:

```js
// global admixture
Reacton.mixins = {
  printMessage() {
    return this.message
  }
}

// pass Hello and Bye components to Reacton library
Reacton(Hello, Bye)
```

Regardless of the type of mixin you create, all methods and properties defined in it are non-reactive, unlike the component's data object.

<br>
<br>
<h2 id="data-binding">Data binding</h2>

<br>

To bind a component's user data to its HTML content, except for attributes, double curly braces are used inside which are JavaScript expressions, as shown below:

```html
<r-hello>
  <h1>Hello, {{ message.toUpperCase() }}!</h1>
  <p>Outdoor temperature {{ 5 + 17 - 3 }} degrees...</p>

  <style>
    h1 {
      color: {{ mainColor }};
    }
  </style>

  <script>
    exports = {
      data() {
        return {
          message: 'Reacton',
          mainColor: 'red'
        }
      }
    }
  </script>
</r-hello>
```

In Reacton, you can bind anything to data. Add a custom **tag** property to the component's data object:

```js
data() {
  return {
    tag: 'h1', // style selector
    message: 'Reacton',
    mainColor: 'red'
  }
}
```

Now modify the content of the STYLE tag inside the Hello component:

```html
<style>
  {{ tag }} {
    color: {{ mainColor }};
  }
</style>
```

You can read more about working with Web Components styles in their [application guide](https://javascript.info/shadow-dom-style).

<br>

To bind attributes to data, you must precede the attribute name with a colon character:

```html
<h1 :title="message">Hello, {{ message }}!</h1>
```

When using bound event attributes, the *this* keyword points to the component's data object. To get the element on which the event occurred, you must use the *event* keyword with the **target** property, for example:

```html
<h1 :onclick="console.log(event.target)">Hello, {{ message }}!</h1>
```

You can associate any attributes with data, including Boolean ones. Add a custom **hide** property to the component's data object:

```js
ata() {
  return {
    message: 'Reacton',
    mainColor: 'red',
    hide: false // component invisibility
  }
}
```

Now bind the ***hidden*** attribute to this property:

```html
<h1 :hidden="hide">Hello, {{ message }}!</h1>
```

Add an ***id*** attribute to the Hello component's mount element to quickly access this component in the console:

```html
<r-hello id="hello"></r-hello>
```

Enter the following command in the console:

```
hello.$data.hide = true
```

After pressing the Enter key, the H1 element will hide on the browser screen. To make the element appear again, enter the command:

```
hello.$data.hide = false
```

<br>
<br>