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
4. [Cycles](#cycles)
5. [Reactive mount](#reactive-mount)
6. [Child components](#child-components)
7. [Custom events](#custom-events)
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

Make changes to the *index.html* file, as shown below:

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

Make changes to the *index.html* file, as shown below:

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

Make changes to the *index.html* file, as shown below:

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

To access this property, you must first select the component element. To simplify the task, assign the ***id*** attribute with the value "hello" to the mount element of the Hello component, as shown below:

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

To access user data, the *this* keyword is used within the methods of the component object, since all of these methods are executed in the context of the component's data object.

If you need to access the component itself, then the special **$host** property is used, which refers to the component's mount element:

```js
connected() {
  console.log(this.$host)
}
```

In addition, all the methods discussed above can be asynchronous.

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
data() {
  return {
    message: 'Reacton',
    mainColor: 'red',
    hide: false // element invisibility
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

Enter the following command in the browser console:

```
hello.$data.hide = true
```

After pressing the Enter key, the H1 element will hide on the browser screen. To make the element appear again, enter the command:

```
hello.$data.hide = false
```

To avoid changing the **hide** property in the console, add a button to the content of the Hello component with an ***onclick*** attribute bound to this property, as shown below:

```html
<button :onclick="hide = !hide">Hide / Show</button>
```

<br>
<br>
<h2 id="cycles">Cycles</h2>

<br>

Reacton supports three kinds of *"for"* loops that are implemented in JavaScript. They are all defined with a special ***$for*** attribute and output the contents of their HTML elements as many times as required by the loop condition.

In the example below, the *"for"* loop outputs 10 paragraphs with numbers from 0 to 9:

```html
<r-hello>
  <div $for="i = 0; i < 10; i++">
    <p>Number: {{ i }}</p>
  </div>
</r-hello>
```

The ***$for*** special attribute cannot use variable definition operators: *var*, *let*, and *const*, respectively. This will result in an error:

```html
<div $for="var i = 0; i < 10; i++">
  <p>Number: {{ i }}</p>
</div>
```

<br>

The *"for-in"* loop is used to output the contents of objects, as shown below:

```html
<r-hello>
  <ul $for="prop in user">
    <li>
      <b>{{ prop }}</b>: {{ user[prop] }}
    </li>
  </ul>

  <script>
    exports = {
      data() {
        return {
          user: {
            name: 'Leanne Graham',
            age: 28
          }
        }
      }
    }
  </script>
</r-hello>
```

<br>

The *"for-of"* loop is designed to work with arrays:

```html
<r-hello>
  <ul $for="col of colors">
    <li>{{ col }}</li>
  </ul>

  <script>
    exports = {
      data() {
        return {
          colors: ['red', 'green', 'blue']
        }
      }
    }
  </script>
</r-hello>
```

<br>

Event attributes of loop HTML elements can be bound to loop variables:

```html
<r-hello>
  <ul $for="col of colors">
    <li :onclick="console.log(col)">{{ col }}</li>
  </ul>

  <script>
    exports = {
      data() {
        return {
          colors: ['red', 'green', 'blue']
        }
      }
    }
  </script>
</r-hello>
```

Events will always use the current value of the loop variable for their iteration phase, even after the array has been modified:

```html
<r-hello>
  <button :onclick="colors.reverse()">Reverse array</button>
  
  <ul $for="col of colors">
    <li :onclick="console.log(col)">{{ col }}</li>
  </ul>

  <script>
    exports = {
      data() {
        return {
          colors: ['red', 'green', 'blue']
        }
      }
    }
  </script>
</r-hello>
```

<br>

You can use loops with any nesting depth in Reacton:

```html
<r-hello>
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
    exports = {
      data() {
        return {
          users: [
            {
              name: 'Leanne Graham',
              age: 28,
              skills: {
                frontend: ['HTML', 'CSS'],
                backend: ['Ruby', 'PHP', 'MySQL']
              }
            },
            {
              name: 'Clementine Bauch',
              age: 25,
              skills: {
                frontend: ['HTML', 'JavaScript'],
                backend: ['PHP']
              }
            },
            {
              name: 'Chelsey Dietrich',
              age: 30,
              skills: {
                frontend: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
                backend: ['Ruby', 'MySQL']
              }
            }
          ]
        }
      }
    }
  </script>
</r-hello>
```

<br>
<br>
<h2 id="reactive-mount">Reactive mount</h2>

<br>

In order for components to be [mounted](https://javascript.info/custom-elements#customized-built-in-elements) into standard HTML elements, you must use the **extends** property of the component object and the ***is*** attribute of the element into which the component is mounted. At the same time, the ***is*** attribute is static, i.e. after changing its value, another component will not be able to mount to the element to which it belongs.

This problem can be circumvented by associating the ***is*** attribute with user data.

Make changes to the *index.html* file, as shown below:

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
  <!-- mount the Content component -->
  <r-content></r-content>

  <!-- Content component template -->
  <template name="r-content">
    <button :onclick="page = 'r-home'">Home</button>
    <button :onclick="page = 'r-about'">About</button>

    <!-- component mount element -->
    <article :is="page"></article>

    <script>
      exports = {
        data() {
          return {
            page: 'r-home'
          }
        }
      }
    </script>
  </template>
  
  <!-- Home component template -->
  <template name="r-home" extends="article">
    <h2>Home</h2>
  </template>

  <!-- About component template -->
  <template name="r-about" extends="article">
    <h2>About</h2>
  </template>
  
  <!-- include Reacton library -->
  <script src="reacton.js"></script>

  <script>
    // pass the component templates to Reaction library
    Reacton(...document.querySelectorAll('template[name]'))
  </script>
</body>
</html>
```

In this example, three components are created. The Content component contains an ARTICLE mount element inside it, with the ***:is*** attribute bound to the **page** property:

```html
<article :is="page"></article>
```

The Home and About components will be mounted into this element when the corresponding button is pressed:

```html
<button :onclick="page = 'r-home'">Home</button>
<button :onclick="page = 'r-about'">About</button>
```

To pass all component templates with a ***name*** attribute to the Reacton function, the [querySelectorAll()](https://javascript.info/searching-elements-dom#querySelectorAll) method and the [spread syntax](https://javascript.info/rest-parameters-spread#spread-syntax) are used:

```js
Reacton(...document.querySelectorAll('template[name]'))
```

<br>

A mount element can include some content that is passed to the [slots](https://javascript.info/slots-composition) of the components it mounts.

Modify the Home and About components by giving them an open [Shadow DOM](https://javascript.info/shadow-dom#shadow-tree) with the ***mode*** attribute and two slots, as shown below:

```html
<!-- Home component template -->
<template name="r-home" extends="article" mode="open">
  <!-- named content slot -->
  <slot name="home"></slot>

  <!-- default content slot -->
  <slot></slot>
</template>

<!-- About component template -->
<template name="r-about" extends="article" mode="open">
  <!-- named content slot -->
  <slot name="about"></slot>

  <!-- default content slot -->
  <slot></slot>
</template>
```

Now make changes to the contents of the mount element:

```html
<!-- component mount element -->
<article :is="page">
  <h2 slot="home">Home</h2>
  <h2 slot="about">About</h2>
  <p>Default content for all mounted components...</p>
</article>
```

A mount element cannot be a loop at the same time. The example below will result in an error:

```html
<article $for="i = 0; i < 10; i++" :is="page">
  <h2 slot="home">Home</h2>
  <h2 slot="about">About</h2>
  <p>Default content {{ i }} for all mounted components...</p>
</article>
```

<br>
<br>
<h2 id="child-components">Child components</h2>

<br>

To access the user data of the parent components, the child components use a special property **$parent**, which refers to the data object of the parent component.

Make changes to the *index.html* file, as shown below:

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
  <!-- mount the Upper component -->
  <r-upper id="upper"></r-upper>

  <!-- Upper component template -->
  <template name="r-upper">
    <h1>{{ name }}</h1>

    <!-- mount the Middle component -->
    <r-middle id="middle"></r-middle>

    <script>
      exports = {
        data() {
          return {
            name: 'Upper'
          }
        }
      }
    </script>
  </template>

  <!-- Middle component template -->
  <template name="r-middle">
    <h2>{{ $parent.name }} > {{ name }}</h2>

    <!-- mount the Lower component -->
    <r-lower id="lower"></r-lower>

    <script>
      exports = {
        data() {
          return {
            name: 'Middle'
          }
        }
      }
    </script>
  </template>
  
  <!-- Lower component template -->
  <template name="r-lower">
    <h3>{{ $parent.$parent.name }} > {{ $parent.name }} > {{ name }}</h3>

    <script>
      exports = {
        data() {
          return {
            name: 'Lower'
          }
        }
      }
    </script>
  </template>
  
  <!-- include Reacton library -->
  <script src="reacton.js"></script>

  <script>
    // pass the component templates to Reaction library
    Reacton(...document.querySelectorAll('template[name]'))
  </script>
</body>
</html>
```

As you can see from the example above, in the Lower component, the **$parent** property is applied twice:

```html
<h3>{{ $parent.$parent.name }} > {{ $parent.name }} > {{ name }}</h3>
```

The first time this property refers to the data object of the Middle component, inside which the Lower component is located, and the second time, to the data object of the Upper component, inside which the Middle component is located.

If a property is changed in the parent component, these changes will be reflected in the child components.

Enter the command in the browser console:

```
upper.$data.name = 'Wrapper'
```

To change the custom property of a parent component from a child component, you need to use the special **$parent** property again, as shown below:

```
middle.$parent.name = 'Wrapper'
```

```
lower.$parent.$parent.name = 'Wrapper'
```

However, if there is no corresponding property in the first parent component, this **$parent** property will look for it in the next one, i.e. in the parent of the parent component. Which avoids a long chain of writing **\$parent** methods.

Make changes to the Upper component template by adding an array of colors named **colors** to it, as shown below:

```html
<!-- Upper component template -->
<template name="r-upper">
  <h1>{{ name }}</h1>

  <!-- display an array of colors in the cycle -->
  <ul $for="col of colors">
    <li>{{ col }}</li>
  </ul>

  <!-- mount the Middle component -->
  <r-middle id="middle"></r-middle>

  <script>
    exports = {
      data() {
        return {
          name: 'Upper',
          colors: ['red', 'green', 'blue']
        }
      }
    }
  </script>
</template>
```

Now make changes to the Lower component template by adding to it the display of this array and a button for its reverse:

```html
<!-- Lower component template -->
<template name="r-lower">
  <h3>{{ $parent.$parent.name }} > {{ $parent.name }} > {{ name }}</h3>

  <!-- reverse an array of colors in the Upper component -->
  <button :onclick="$parent.colors.reverse()">Reverse array</button>

  <!-- display an array of colors from the component Upper in the cycle -->
  <ul $for="col of $parent.colors">
    <li>{{ col }}</li>
  </ul>

  <script>
    exports = {
      data() {
        return {
          name: 'Lower'
        }
      }
    }
  </script>
</template>
```

As you can see from this example, the **$parent** property is applied here only once. This is due to the fact that there is no custom property named **colors** in the Middle component and the search will continue in the Upper component.

<br>
<br>
<h2 id="custom-events">Custom events</h2>

<br>

For interaction between various components, and not just child ones, an improved mechanism of [custom events](https://javascript.info/dispatch-events) is used. This mechanism involves using the **event()** method of the Reacton function and the special **$event()** method that is available in every component.

Create an *Events.js* file in the *app* directory with the following content:

```js
// export event element eventReverse
export const eventReverse = new Reacton.event()
```

When the **event()** method of the Reaction function is called as a constructor, it returns a new [fragment of the document](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment), which is the source and recipient of user events.


Now make changes to the *index.html* file, as shown below:

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
  <!-- mount the Upper component -->
  <r-upper id="upper"></r-upper>

  <!-- mount the Lower component -->
  <r-lower id="lower"></r-lower>

  <!-- Upper component template -->
  <template name="r-upper">
    <h1>{{ name }}</h1>

    <!-- display an array of colors in the cycle -->
    <ul $for="col of colors">
      <li>{{ col }}</li>
    </ul>

    <script>
      exports = {
        data() {
          return {
            name: 'Upper',
            colors: ['red', 'green', 'blue']
          }
        },
        async connected() {
          // import event element eventReverse
          const { eventReverse } = await import('./Events.js')

          // add the "reverse-colors" event handler to the eventReverse element
          eventReverse.addEventListener('reverse-colors', () => {
            this.colors.reverse() // reverse array
          })
        }
      }
    </script>
  </template>
  
  <!-- Lower component template -->
  <template name="r-lower">
    <h3>{{ name }}</h3>

    <button :onclick="reverseArray()">Reverse array</button>

    <script>
      exports = {
        async data() {
          // import event element eventReverse
          const { eventReverse } = await import('./Events.js')

          return {
            name: 'Lower',
            reverseArray() {
              // trigger "reverse-colors" event on element eventReverse
              this.$event(eventReverse, 'reverse-colors')
            }
          }
        }
      }
    </script>
  </template>
  
  <!-- include Reacton library -->
  <script src="reacton.js"></script>

  <script>
    // pass the component templates to Reaction library
    Reacton(...document.querySelectorAll('template[name]'))
  </script>
</body>
</html>
```

In this example, an asynchronous **connected()** method is created in the Upper component template. Inside this method, the event element created at the previous step is imported from an external file and a handler is assigned to it:

```js
async connected() {
  // import event element eventReverse
  const { eventReverse } = await import('./Events.js')

  // add the "reverse-colors" event handler to the eventReverse element
  eventReverse.addEventListener('reverse-colors', () => {
    this.colors.reverse() // reverse array
  })
}
```

<br>

Inside the Lower component template, the **data()** method is also asynchronous so that the outer event element can be imported:

```js
async data() {
  // import event element eventReverse
  const { eventReverse } = await import('./Events.js')

  return {
    name: 'Lower',
    reverseArray() {
      // trigger "reverse-colors" event on element eventReverse
      this.$event(eventReverse, 'reverse-colors')
    }
  }
}
```

In addition, a custom **reverseArray()** method has been added to the Lower component, inside which, using the special **$event()** method, the *"reverse-colors"* event is called for the imported element when the button is clicked, as shown below:

```html
<button :onclick="reverseArray()">Reverse array</button>
```

The first argument of the special **$event()** method is the event element eventReverse, and the second argument is the name of the event to be called:

```js
 this.$event(eventReverse, 'reverse-colors')
```

The **$event()** method can also receive a third argument, in which you can pass parameters that fully correspond to the parameters of the [CustomEvent](https://javascript.info/dispatch-events#custom-events) constructor. For example, you can pass the **detail** property, which allows you to share data between components.

When the **event()** method of the Reaction function is called not as a constructor, it works similarly to the special **$event()** method.

<br>

Add a new *"new-colors"* event handler to the **connected()** method of the Upper component, as shown below:

```js
async connected() {
  // import event element eventReverse
  const { eventReverse } = await import('./Events.js')

  // add the "reverse-colors" event handler to the eventReverse element
  eventReverse.addEventListener('reverse-colors', () => {
    this.colors.reverse() // reverse array
  })

  // add the "new-colors" event handler to the eventReverse element
  eventReverse.addEventListener('new-colors', event => {
    this.colors = event.detail // new array
  })
}
```

Note that the event handler now has an **event** parameter through which you can access the **detail** property.

Now modify the contents of the Lower component's template by adding a new button to it and a **newArray()** custom method that passes a new array of colors to the *"new-colors"* event handler:

```html
<template name="r-lower">
  <h3>{{ name }}</h3>

  <button :onclick="reverseArray()">Reverse array</button>

  <button :onclick="newArray()">New array</button>

  <script>
    exports = {
      async data() {
        // import event element eventReverse
        const { eventReverse } = await import('./Events.js')

        return {
          name: 'Lower',
          reverseArray() {
            // trigger "reverse-colors" event on element eventReverse
            this.$event(eventReverse, 'reverse-colors')
          },
          newArray() {
            // trigger "new-colors" event on element eventReverse
            this.$event(eventReverse, 'new-colors', {
              // pass a new array to the event handler
              detail: ['blue', 'orange', 'purple', 'gold']
            })
          }
        }
      }
    }
  </script>
</template>
```

Thus, data can be easily exchanged between different components.

<br>

To avoid having to import the event element into each individual component, you can resort to creating the event element in a global mixin before passing the components to the Reacton function:

```js
Reacton.mixins = {
  // create event element eventReverse
  eventReverse: new Reacton.event()
}

// pass the component templates to Reaction library
Reacton(...document.querySelectorAll('template[name]'))
```

Then instead of importing the event element from an external file:

```js
// import event element eventReverse
const { eventReverse } = await import('./Events.js')
```

you need to get the event element from the global mixin:

```js
// get event element eventReverse
const eventReverse = this.$mixins.eventReverse
```

<br>
<br>