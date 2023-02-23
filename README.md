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
8. [Features work](#features-work)
9. [Router](#router)
10. [Rendering](#rendering)

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

To ensure there are no naming conflicts between standard and custom HTML elements, the component name must contain a dash «-», for example, my-element and super-button are valid names, but myelement is not.

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

To bind attributes to data, precede the attribute name with a colon character «:», as shown below:

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
<h2 id="features-work">Features work</h2>

<br>

All methods and expressions of a component, except for the **data()** method, are executed in the context of the component's data object. The **data()** method of the component object is executed in the context of the component itself.

Make changes to the index.html file, as shown below:

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
  <r-hello id="hello" data-title="Hello"></r-hello>

  <!-- Hello component template -->
  <template name="r-hello">
    <h1>{{ id }}</h1>
    <h1>{{ $host.id }}</h1>
    <h1>{{ $host.dataset.title }}</h1>

    <h2>{{ printIdData() }}</h2>
    <h2>{{ printIdAttr() }}</h2>
    <h2>{{ printTitle() }}</h2>

    <script>
      exports = {
        data() {
          console.log('data: ', this)

          return {
            id: 'ok',
            printIdData() {
              console.log('printIdData: ', this)
              return this.id
            },
            printIdAttr() {
              console.log('printIdAttr: ', this)
              return this.$host.id
            },
            printTitle() {
              console.log('printTitle: ', this)
              return this.dataset.title
            }
          }
        },
        connected() {
          console.log('connected: ', this)
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

As you can see from this example, the **$host** special property is used in the expressions to get the value of the ***id*** and ***data-title*** attributes of the component's mount element:

```html
<h1>{{ $host.id }}</h1>
<h1>{{ $host.dataset.title }}</h1>
```

However, accessing the value of the ***data-title*** attribute in the **printTitle()** method occurs without using the **$host** special property. Instead, the standard property of HTML [dataset](https://javascript.info/dom-attributes-and-properties#non-standard-attributes-dataset) elements is applied:

```js
printTitle() {
  console.log('printTitle: ', this)
  return this.dataset.title
}
```

But the **dataset** property is not in the custom properties definition of the component's data object. The data object has only one **id** property and three methods:

```js
return {
  id: 'ok',
  printIdData() {
    console.log('printIdData: ', this)
    return this.id
  },
  printIdAttr() {
    console.log('printIdAttr: ', this)
    return this.$host.id
  },
  printTitle() {
    console.log('printTitle: ', this)
    return this.dataset.title
  }
}
```

The component's data object is a [proxy](https://javascript.info/proxy) and works as follows: first, the property is looked up in the component's data object, and if there is no such property, then the search continues in the component itself. If the component does not have the required property, then the data object of the parent component, if any, is looked up.

For this reason, the method:

```js
printIdData() {
  console.log('printIdData: ', this)
  return this.id
}
```

and expression:

```html
<h1>{{ id }}</h1>
```

will return the value "ok" of the custom **id** property.

To access the ***id*** attribute of a component's mount element, use the special **$host** property, which always refers to the component:

```js
printIdAttr() {
  console.log('printIdAttr: ', this)
  return this.$host.id
}
```

```html
<h1>{{ $host.id }}</h1>
```

If the component did not have a custom **id** property that matches the name of the attribute, then to get the value of this attribute, one could do without the special **$host** property:

```js
printIdAttr() {
  console.log('printIdAttr: ', this)
  return this.id
}
```

This is exactly what happens in the method:

```js
printTitle() {
  console.log('printTitle: ', this)
  return this.dataset.title
}
```

Since the component data object does not have a custom **dataset** property, the search occurs in the component itself, which has such a property.

However, in the expression:

```html
<h1>{{ $host.dataset.title }}</h1>
```

the **$host** property still applies:

It can be replaced with the *this* keyword:

```html
<h1>{{ this.dataset.title }}</h1>
```

and the result will not change.

But the example below will result in an error:

```html
<h1>{{ dataset.title }}</h1>
```

Since quick access, i.e. without the *this* keyword, have only all the special and custom properties and methods of the component.

<br>
<br>
<h2 id="router">Router</h2>

<br>

The router in Reacton provides the basic required functionality for navigation to interact with application components. This functionality includes: query parameters, route parameters, regular expressions in route handler paths.

The router is very easy to create.

Make changes to the index.html file, as shown below:

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
  <!-- mount the Router component -->
  <r-router></r-router>

  <!-- Router component template -->
  <template name="r-router">
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contacts">Contacts</a>
    </nav>

    <!-- component mount element -->
    <article :is="page"></article>

    <script>
      exports = {
        data() {
          return {
            page: '' // component name
          }
        },
        connected() {
          // create a router for the NAV element
          this.$router(this.$('nav'), {
            '/': () => this.page = 'r-home',
            '/about': () => this.page = 'r-about',
            '/contacts': () => this.page = 'r-contacts'
          })
        }
      }
    </script>
  </template>

  <!-- Home component template -->
  <template name="r-home" extends="article">
    <h1>Home</h1>
  </template>

  <!-- About component template -->
  <template name="r-about" extends="article">
    <h1>About</h1>
  </template>

  <!-- Contacts component template -->
  <template name="r-contacts" extends="article">
    <h1>Contacts</h1>
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

There are four component templates defined here. Router is the main component in which the router is created and which contains the mount element of the other three components:

```html
<!-- component mount element -->
<article :is="page"></article>
```

The other three component templates represent the application's Home, About, and Contacts pages:

```html
<!-- Home component template -->
<template name="r-home" extends="article">
  <h1>Home</h1>
</template>

<!-- About component template -->
<template name="r-about" extends="article">
  <h1>About</h1>
</template>

<!-- Contacts component template -->
<template name="r-contacts" extends="article">
  <h1>Contacts</h1>
</template>
```

<br>

The router is created in the **connected()** method so that it can bind to an HTML element such as the NAV element, as shown in the example below:

```js
connected() {
  // create a router for the NAV element
  this.$router(this.$('nav'), {
    '/': () => this.page = 'r-home',
    '/about': () => this.page = 'r-about',
    '/contacts': () => this.page = 'r-contacts'
  })
}
```

The router cannot be created in the **data()** method, because at the time of its execution, the component does not yet have any HTML markup.

The example below will result in an error:

```js
data() {
  // create a router for the NAV element
  this.$router(this.$('nav'), {
    '/': () => this.page = 'r-home',
    '/about': () => this.page = 'r-about',
    '/contacts': () => this.page = 'r-contacts'
  })
  
  return {
    page: '' // component name
  }
}
```

<br>

The router is created using the special **$router()** method, the first argument is the router binding HTML element:

```js
this.$('nav')
```

Such an element here is the NAV HTML element containing the links. It is selected using the special **$()** method. This method is passed an element selection selector. This method is a shorthand analog of the [querySelector()](https://javascript.info/searching-elements-dom#querySelector) method.

The second argument to the **$router()** method is an object of paths and route handlers:

```js
{
  '/': () => this.page = 'r-home',
  '/about': () => this.page = 'r-about',
  '/contacts': () => this.page = 'r-contacts'
}
```

The names of the properties of this object are the tracked paths, and the values are the handlers of those paths. Inside the handlers, the **page** custom property is assigned the names of the components corresponding to the route being processed.

The property names are strings that the router converts into [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp). This allows you to use regular expression characters in the names of these properties.

For example, the property name is below:

```js
'/about(-us)?': () => this.page = 'r-about'
```

will call the handler as for the route:

```html
<a href="/about">About</a>
```

and for the route:

```html
<a href="/about-us">About</a>
```

In this case, it is necessary to follow the rules for escaping in strings, i.e. precede special characters with a backslash «\».

Add a new User component template to the *index.html* file:

```html
<!-- User component template -->
<template name="r-user" extends="article">
  <h1>User</h1>
</template>
```

Remove the old links from the NAV element and add three new ones:

```html
<nav>
  <a href="/users?id=1">User 1</a>
  <a href="/users?id=2">User 2</a>
  <a href="/users?id=3">User 3</a>
</nav>
```

Delete the old handler properties and add a new handler property for their paths:

```js
this.$router(this.$('nav'), {
  '/users\\?id=\\d': () => this.page = 'r-user'
})
```

Clicking on any of the three links above will connect the User component.

In the name of the handler property, before the special characters of the regular expression «?» and «d», two backslash characters «\» are specified instead of one, since we are dealing with strings, not regular expression literals.

A regular expression literal would look like this:

```js
/users\?id=\d/
```

The router converts the property name into a regular expression by adding the border start symbol «^» to the beginning of this expression, and the characters of the optional last slash «/?» and the border end «$» to the end.

The regular expression above, in the router, takes the following form:

```js
/^\/users\?id=\d\/?$/
```

The characters of the optional last slash «/?», allow you to use or omit the last slash in the link paths.

The two links below are considered equivalent:

```html
<a href="/about">About</a>
<a href="/about/">About</a>
```

<br>

To access query parameters, such as the user **id** parameter, the router uses an object of the built-in [URL](https://javascript.info/url) class, which is available as a **url** property, from the *event* handler parameter.

Add this parameter to the path handler:

```js
this.$router(this.$('nav'), {
  '/users\\?id=\\d': event => {
    this.page = 'r-user'
    // set the "id" property to the value of the request parameter
    this.id = event.url.searchParams.get('id')
  }
})
```

The [searchParams](https://javascript.info/url#searchparams) property and the **get()** method are provided by the URL class itself. An instance of it is simply added to the *event* parameter. There are other methods for working with parameters.

In order to pass the user **id** to the User component, you need to add a [Shadow DOM](https://javascript.info/shadow-dom) to that component using the ***mode*** attribute in its template, and a [SLOT](https://javascript.info/slots-composition) element, as shown below:

```html
<!-- User component template -->
<template name="r-user" extends="article" mode="open">
  <h1>User</h1>
  <slot></slot>
</template>
```

In the Router component, add a new custom **id** property:

```js
data() {
  return {
    page: '', // component name
    id: '' // user id
  }
}
```

The last thing left to do is add this property to the component mount element expression:

```html
<!-- component mount element -->
<article :is="page">
  {{ id }}
</article>
```

Now the request parameter will be assigned to this property in the path handler:

```js
this.id = event.url.searchParams.get('id')
```

and passed to the slot of the User component:

```html
<slot></slot>
```

<br>

In addition to the request parameters that we discussed above, the router provides the ability to work with [route parameters](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#route_parameters).


Modify the User component template by adding two named slots to it:

```html
<!-- User component template -->
<template name="r-user" extends="article" mode="open">
  <h1>
    <slot name="user"></slot>
    <slot name="id"></slot>
  </h1>
</template>
```

Add a new user property **user** to the data object of the Router component:

```js
data() {
  return {
    page: '', // component name
    user: '', // user
    id: '' // user id
  }
}
```

Make changes to the component mount element:

```html
<!-- component mount element -->
<article :is="page">
  <span slot="user">{{ user }}</span>
  <span slot="id">{{ id }}</span>
</article>
```

Delete the old ones and add two new links in the NAV element:

```html
<nav>
  <a href="/designer/1">Designer 1</a>
  <a href="/programmer/2">Programmer 2</a>
</nav>
```

Create a new path handler for these links:

```js
this.$router(this.$('nav'), {
  '/:user/:id': event => {
    this.page = 'r-user'

    // set the "user" property to the value of the route parameter
    switch (event.params.user) {
      case 'designer':
        this.user = 'Designer'
        break;
      case 'programmer':
        this.user = 'Programmer'
        break;
      default:
        this.user = 'In search'
        break;
    }

    // set the "id" property to the value of the route parameter
    this.id = event.params.id
  }
})
```
Route parameters are defined in the name of the handler property using a colon character «:» followed by characters: A-Za-z0-9_

In the example above, we have defined two route parameters: **user** and **id**, as shown below:

```js
'/:user/:id'
```

which are assigned to custom properties of the same name in the handler.

These parameters can be accessed using the **params** property, the path handler's [event](https://javascript.info/introduction-browser-events#event-object) object:

```js
'/:user/:id': event => {...
  this.id = event.params.id
```

In the component mount element, two SPAN elements are created with ***slot*** attributes:

```html
<span slot="user">{{ user }}</span>
<span slot="id">{{ id }}</span>
```

which contain the names of the named slots in the User component:

```html
<slot name="user"></slot>
<slot name="id"></slot>
```

These slots will be passed expressions containing custom properties **user** and **id** from the mount element of the Router component:

```html
{{ user }}
{{ id }}
```

<br>

In the last argument of the **$router()** method, an additional object with five parameters can be passed to the router.

The **once**, **capture**, and **passive** parameters will be passed to the [addEventListener()](https://javascript.info/introduction-browser-events#addeventlistener) method, which assigns the NAV element (or any other HTML element that the router binds to) a *"click"* event handler, like so:

```js
this.$router(this.$('nav'), {
  '/': () => this.page = 'r-home',
  '/about': () => this.page = 'r-about',
  '/contacts': () => this.page = 'r-contacts'
}, {
  // remove the "click" event handler after the first execution
  once: true,
  // handle the "click" event in the dive phase
  capture: true,
  // handler will never call preventDefault()
  passive: true
})
```

The next parameter is called **start** and allows you to pause automatic path processing when the router starts. The router will start processing them only after following the links.

By default, this parameter is set to True, but this can be easily changed:

```js
{
  // do not parse paths when starting the router
  start: false
}
```

The last parameter transmitted is called **when**. It can be assigned the name of the component, before connecting to the document of which, the router will not process paths.

This option is used when the router and the mount element are in different components.

<br>

Let's modify the original example and place the router and mount element on separate components.

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
  <!-- mount the Router component -->
  <r-router></r-router>

  <!-- mount the Content component -->
  <r-content></r-content>

  <!-- Router component template -->
  <template name="r-router">
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contacts">Contacts</a>
    </nav>

    <script>
      exports = {
        connected() {
          // get event element eventPage
          const eventPage = this.$mixins.eventPage

          // create a router for the NAV element
          this.$router(this.$('nav'), {
            // trigger "change-page" event on element eventPage
            '/': () => this.$event(eventPage, 'change-page', { detail: 'r-home' }),
            '/about': () => this.$event(eventPage, 'change-page', { detail: 'r-about' }),
            '/contacts': () => this.$event(eventPage, 'change-page', { detail: 'r-contacts' })
          }, {
            // wait for the connection of the Content component
            when: 'r-content'
          })
        }
      }
    </script>
  </template>

  <!-- Content component template -->
  <template name="r-content">
    <!-- component mount element -->
    <article :is="page"></article>

    <script>
      exports = {
        data() {
          return {
            page: '' // component name
          }
        },
        connected() {
          // get event element eventPage
          const eventPage = this.$mixins.eventPage

          // add the "change-page" event handler to the eventPage element
          eventPage.addEventListener('change-page', event => this.page = event.detail)
        }
      }
    </script>
  </template>

  <!-- Home component template -->
  <template name="r-home" extends="article">
    <h1>Home</h1>
  </template>

  <!-- About component template -->
  <template name="r-about" extends="article">
    <h1>About</h1>
  </template>

  <!-- Contacts component template -->
  <template name="r-contacts" extends="article">
    <h1>Contacts</h1>
  </template>
  
  <!-- include Reacton library -->
  <script src="reacton.js"></script>

  <script>
    Reacton.mixins = {
      // create event element eventPage
      eventPage: new Reacton.event()
    }

    // pass the component templates to Reaction library
    Reacton(...document.querySelectorAll('template[name]'))
  </script>
</body>
</html>
```

Here, a new Content component has been added, inside which is the component mount element:

```html
<!-- Content component template -->
<template name="r-content">
  <!-- component mount element -->
  <article :is="page"></article>

  <script>
    exports = {
      data() {
        return {
          page: '' // component name
        }
      },
      connected() {
        // get event element eventPage
        const eventPage = this.$mixins.eventPage

        // add the "change-page" event handler to the eventPage element
        eventPage.addEventListener('change-page', event => this.page = event.detail)
      }
    }
  </script>
</template>
```

Changing the value of the custom **page** property occurs in the **connected()** method, as shown below:

```js
connected() {
  // get event element eventPage
  const eventPage = this.$mixins.eventPage

  // add the "change-page" event handler to the eventPage element
  eventPage.addEventListener('change-page', event => this.page = event.detail)
}
```

[Custom events](#custom-events) are used to communicate between different components.

The Router component object also uses the **connected()** method:

```js
exports = {
  connected() {
    // get event element eventPage
    const eventPage = this.$mixins.eventPage

    // create a router for the NAV element
    this.$router(this.$('nav'), {
      // trigger "change-page" event on element eventPage
      '/': () => this.$event(eventPage, 'change-page', { detail: 'r-home' }),
      '/about': () => this.$event(eventPage, 'change-page', { detail: 'r-about' }),
      '/contacts': () => this.$event(eventPage, 'change-page', { detail: 'r-contacts' })
    }, {
      // wait for the connection of the Content component
      when: 'r-content'
    })
  }
}
```

which, like the Content component, get event element eventPage:

```js
// get event element eventPage
const eventPage = this.$mixins.eventPage
```

from global mixin:

```js
Reacton.mixins = {
  // create event element eventPage
  eventPage: new Reacton.event()
}
```

When any path changes, one of the handlers is triggered:

```js
// trigger "change-page" event on element eventPage
'/': () => this.$event(eventPage, 'change-page', { detail: 'r-home' }),
'/about': () => this.$event(eventPage, 'change-page', { detail: 'r-about' }),
'/contacts': () => this.$event(eventPage, 'change-page', { detail: 'r-contacts' })
```

which passes to the custom event handler *"change-page"* of the event element eventPage, the **detail** property with the name of the mounted component.

In the Content component, the *"change-page"* custom event handler sets this value to the **page** custom property, as shown below:

```js
// add the "change-page" event handler to the eventPage element
eventPage.addEventListener('change-page', event => this.page = event.detail)
```

Pay attention to the **when** parameter of the router in the Router component:

```js
{
  // wait for the connection of the Content component
  when: 'r-content'
}
```

If you do not pass this parameter, then the component will not be mounted when the browser is opened, and the router will start processing paths only after following the links.

This is because the router in the Router component fires the *"change-page"* event before a handler is added for it in the Content component, because the Router component connects to the document before the Content component.

In order for the router to wait for the connection of some component, it needs to pass this parameter in the third argument as a property of the object, with the name of the expected component:

```js
when: 'r-content'
```

Instead of the **when** parameter, you can use the special **$when()** method. The **connected()** method must be asynchronous, as shown below:

```js
async connected() {
  // get event element eventPage
  const eventPage = this.$mixins.eventPage

  // wait for the connection of the Content component
  await this.$when('r-content')

  // create a router for the NAV element
  this.$router(this.$('nav'), {
    // trigger "change-page" event on element eventPage
    '/': () => this.$event(eventPage, 'change-page', { detail: 'r-home' }),
    '/about': () => this.$event(eventPage, 'change-page', { detail: 'r-about' }),
    '/contacts': () => this.$event(eventPage, 'change-page', { detail: 'r-contacts' })
  })
}
```

Then there is no need to pass the **when** parameter to the router.

In any case, both the **when** parameter and the **$when()** special method only wait for the first component with the name passed to it to be connected to the document.

If we had ten Content components, then the router would only fire after the first component with the name "r-content" connected to the document, and not after each with that name.

To create most applications, one event firing is enough, after connecting a single main component containing the main content to the document.

<br>
<br>
<h2 id="rendering">Rendering</h2>

<br>

Download the directory with the working [server](https://github.com/reacton-js/reacton/tree/main/server). This directory contains configuration files for the [Webpack](https://webpack.js.org/) module builder and [Express](https://expressjs.com/), a web application framework for [Node.js](https://nodejs.org/en/).

You need to have an understanding of how these technologies work, as their discussion is beyond the scope of this guide.

To install all dependencies, use the command:

```
npm i
```

To develop a project in Webpack, use the command:

```
npm start
```

To build a project in Webpack, use the command:

```
npm run build
```

To start the server in working mode, use the command:

```
node server
```

To start the server in bot mode, use the command:

```
node server bot
```

<br>

When Webpack is launched to develop an application, the Express server is also launched at the same time, allowing you to make requests to the real server during development.

In the *webpack.config.js* configuration file, the **proxy** property is used for this, as shown below:

```js
devServer: {
  ...
  proxy: {
    '/': `http://localhost:${process.env.PORT || 3000}`,
  },
},
```

<br>

The database is located in the *DB.json* file and contains a list of users:

```js
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "age": 28,
    "category": "managers",
    "email": "Sincere@april.biz",
    "city": "Gwenborough"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "age": 32,
    "category": "designers",
    "email": "Shanna@melissa.tv",
    "city": "Wisokyburgh"
  },
  ...
]
```

<br>

The list of bots is located in the *bots.js* file and can be updated with new bots:

```js
module.exports = [
  // Yandex
  'YandexBot', 'YandexAccessibilityBot', 'YandexMobileBot',...
  // Google
  'Googlebot', 'Googlebot-Image', 'Mediapartners-Google',...
  // Other
  'Mail.RU_Bot', 'bingbot', 'Accoona', 'Lighthouse',...
]
```

<br>

The server configuration file is located in the *server.js* file:

```js
const express = require("express")
const hbs = require("hbs")
const { readFile } = require('fs/promises')
const { JSDOM } = require("jsdom")
...
```

<br>

To render the application content, the server uses the [JSDOM](https://www.npmjs.com/package/jsdom) implementation and the **render()** method of the Reacton library, as shown below:

```js
/* вернуть отрендеренное HTML-содержимое элемента BODY
  return the rendered HTML content of the BODY element */
return await new Promise(done => {
  dom.window.onload = () => dom.window.Reacton.render(dom.window.document.body).then(done)
})
```

This method can take one argument, which is the topmost element of the document from which to render application content. By default, when no argument is passed, the entire document is rendered.

In the example above, rendering starts from the BODY element, which corresponds to the content rendering logic in the [Hbs](https://github.com/pillarjs/hbs) engine [view templates](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website):

```js
/* если запрос идёт от поискового бота
  if the request comes from a search bot */
if (regBots.test(userAgent)) {
  /* получить полный адрес запроса
    get full request address */
  const fullURL = req.protocol + "://" + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

  const HTML = await readFile(__dirname + '/views/partials/Body.hbs')
    .then(async data => {
      /* определить новый JSDOM с параметрами
        define a new JSDOM with parameters */
      const dom = new JSDOM(data.toString(), {
        url: fullURL,
        runScripts: "dangerously",
        resources: "usable"
      })
      
      /* вернуть отрендеренное HTML-содержимое элемента BODY
        return the rendered HTML content of the BODY element */
      return await new Promise(done => {
        dom.window.onload = () => dom.window.Reacton.render(dom.window.document.body).then(done)
      })
    })

  /* передать свойство HTML в представление Main
    pass HTML property to Main view */
  res.render("Main.hbs", { HTML })
}

/* иначе, если запрос идёт от пользователя
  otherwise, if the request comes from the user */
else {
  /* вернуть частичное представление Body из представления Main
    return partial view of Body from view of Main */
  res.render("Main.hbs")
}
```

<br>

When accessing the site of any bot from the list in the *bots.js* file, the server will return the document content rendered using the **render()** method to the **HTML** property of the Main view:

```hbs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
  <link rel="stylesheet" href="/styles.css">
</head>
  {{#if HTML}}
    {{{HTML}}}
  {{else}}
    {{> Body}}
  {{/if}}
</html>
```

In all other cases, i.e. when the user accesses the site, the Main view returns a partial Body view:

```hbs
<body>
  <header is="r-header"></header>
  <main is="r-main"></main>
  <footer is="r-footer"></footer>

  <script src="/bundle.js"></script>
</body>
```

The content rendered for bots does not contain comments, styles, scripts and TEMPLATE elements.

You can check the server in bot mode using the command:

```
node server bot
```

and you can see the content that the bot receives from the server by opening the page using the key combination Ctrl + U

<br>

The *public* folder inside the *server* directory is used to store static files: images, styles, fonts, etc.

The finished project will be assembled into this folder in the form of a *bundle.js* file when the command is executed:

```
npm run build
```

<br>

The project itself is located in the *src* folder and is launched for development by the command:

```
npm start
```

<br>

The project is a simple application that displays a list of users by profession and an individual user, with additional information about him.

The main project file is named *index.js*:

```js
import './reacton.js'
import Header from './components/Header.htm'
import Main from './components/Main.htm'
import Home from './components/pages/Home.htm'
import Categories from './components/pages/Categories.htm'
import List from './components/pages/List.htm'
import Worker from './components/pages/Worker.htm'
import Footer from './components/Footer.htm'

const routeEvents = new Reacton.event()

Reacton.mixins = {
  routeEvents,
  getJSON(path) {
    return new Promise(done => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', path)
      xhr.responseType = 'json'
      xhr.send()
      xhr.onload = () => done(xhr.response)
    })
  }
}

Reacton.router(document, {
  '/': () => {
    Reacton.event(routeEvents, 'page-change', { detail: { page: 'r-home' } })
  },
  '/categories': () => {
    Reacton.event(routeEvents, 'page-change', { detail: { page: 'r-categories' } })
  },
  '/categories/:category/:id?': event => {
    if (event.params.id) {
      Reacton.event(routeEvents, 'page-change', {
        detail: {
          category: event.params.category,
          id: event.params.id,
          page: 'r-worker'
        }
      })
    }
    else {
      Reacton.event(routeEvents, 'page-change', {
        detail: {
          category: event.params.category,
          page: 'r-list'
        }
      })
    }
  }
}, {
  when: 'r-main'
})

Reacton([Header, Main, Home, Categories, List, Worker, Footer])
```

<br>

At the very beginning of this file, the Reacton library and the files of all components used in the project are connected:

```js
import './reacton.js'
import Header from './components/Header.htm'
import Main from './components/Main.htm'
import Home from './components/pages/Home.htm'
import Categories from './components/pages/Categories.htm'
import List from './components/pages/List.htm'
import Worker from './components/pages/Worker.htm'
import Footer from './components/Footer.htm'
```

Note that the components are passed to the Reacton function in an array:

```js
Reacton([Header, Main, Home, Categories, List, Worker, Footer])
```

This feature was specifically added to Reacton to get text components when building apps with Webpack.

<br>

Then the routeEvents event element and the **getJSON()** method are defined and passed to the global mixin:

```js
const routeEvents = new Reacton.event()

Reacton.mixins = {
  routeEvents,
  getJSON(path) {
    return new Promise(done => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', path)
      xhr.responseType = 'json'
      xhr.send()
      xhr.onload = () => done(xhr.response)
    })
  }
}
```

At the moment, the [Fetch](https://javascript.info/fetch) method does not work in JSDOM. Therefore, the **getJSON()** helper method is used with an [XMLHttpRequest](https://javascript.info/xmlhttprequest) object.

<br>

This method makes a request to the server and returns various data.

If the request was made from a List component:

```js
exports = {
  async data() {
    const users = await this.$mixins.getJSON(`/categories/${this.$parent.category}`)

    const collator = new Intl.Collator()

    const userSort = function (ascending, group) {
      this.users.sort((a, b) => ascending ? collator.compare(a[group], b[group]) : collator.compare(b[group], a[group]))
    }
    
    return {
      users,
      group: 'id',
      ascending: true,
      userSort
    }
  }
}
```

then the server will return users with a certain category:

```js
/* вернуть категорию работников из базы данных
  return the category of workers from the database */
app.post('/categories/:category', (req, res) => {
  const category = DB.filter(item => item.category == req.params.category)
  res.send(category)
})
```

If the request was made from a Worker component:

```js
exports = {
  async data() {
    return {
      user: await this.$mixins.getJSON(`/categories/${this.$parent.category}/${this.$parent.id}`)
    }
  }
}
```

then the server returns the data of a specific user:

```js
/* вернуть id работника из базы данных
  return employee id from database */
app.post('/categories/\\w+/:id', (req, res) => {
  const user = DB.find(item => item.id == req.params.id)
  res.send(user)
})
```

<br>

Next comes the router definition, bound to the [document](https://developer.mozilla.org/en-US/docs/Web/API/Document) object, as shown below:

```js
Reacton.router(document, {
  '/': () => {
    Reacton.event(routeEvents, 'page-change', { detail: { page: 'r-home' } })
  },
  '/categories': () => {
    Reacton.event(routeEvents, 'page-change', { detail: { page: 'r-categories' } })
  },
  '/categories/:category/:id?': event => {
    if (event.params.id) {
      Reacton.event(routeEvents, 'page-change', {
        detail: {
          category: event.params.category,
          id: event.params.id,
          page: 'r-worker'
        }
      })
    }
    else {
      Reacton.event(routeEvents, 'page-change', {
        detail: {
          category: event.params.category,
          page: 'r-list'
        }
      })
    }
  }
}, {
  when: 'r-main'
})
```

This allows you to create any number of menus in any component, and handle path events in one place.

In the application, the main menu is located in the Header component:

```html
<nav>
  <a href="/">Home</a>
  <a href="/categories/">Categories</a>
</nav>
```

But due to the fact that the router was bound to the *document* object, this menu could be placed both in the footer and in any other component.

In addition, the router has a **when** parameter with the value "r-main". This forces it to wait for the Main component to connect to the document, and only after that, the router will start executing the handlers corresponding to the current path, i.e. the address where the application is opened.

<br>

All page components: Home, Categories, Worker and List, are mounted in the Main component using a mount element with the ***is*** attribute, which is bound to the **page** custom property:

```html
<article :is="page"></article>
```

To pass data from the router to the Main component, use the routeEvents event element, with a custom *"page-change"* event, as shown below:

```js
exports = {
  data() {
    return {
      page: '',
      category: '',
      id: ''
    }
  },
  connected() {
    const routeEvents = this.$mixins.routeEvents

    routeEvents.addEventListener('page-change', event => {
      if (event.detail.category) {
        this.category = event.detail.category
      }
      if (event.detail.id) {
        this.id = event.detail.id
      }
      this.page = event.detail.page
    })
  }
}
```

All other components are simple and do not require further explanation.

<br>
<br>