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

<br>

1. [Quick start](#quick-start)
2. ~~[Component object](#component-object)~~
3. ~~[Data binding](#data-binding)~~
4. ~~[Mixins](#mixins)~~
5. ~~[Cycles](#cycles)~~
6. ~~[Displays](#displays)~~
7. ~~[Child components](#child-components)~~
8. ~~[Observer](#observer)~~
9. ~~[Router](#router)~~
10. ~~[Rendering](#rendering)~~

<br>
<hr>

<h2 id="quick-start">Quick start</h2>

<br>

Reacton allows you to create several types of components: Inline, Modular, Template and Single File components. We'll start with Inline Components. Create a new working directory, for example named *app*, and download the [reacton.js](https://raw.githubusercontent.com/reacton-js/reacton/main/dist/reacton.js) file into this directory.

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

You can pass any number of arguments to a Reacton function, representing different types of components. For example, create an inline Bye component in the *index.html* file:

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

The name of a Template component can be passed not in an attribute, but in the **name** property of its exported object, as is done for Inline components, for example:

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