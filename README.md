<br>

[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

![reacton](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Reacton⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/app/reacton.min.js)

<br>

Reacton is a JavaScript plugin for quickly building reactive [Web Components](https://javascript.info/web-components). The plugin supports all technologies, methods and properties such as [slots](https://javascript.info/slots-composition) and [Shadow DOM](https://javascript.info/shadow-dom) that are provided by standard Web Components.

Below is an example of a simple component:

```html
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

1. [Quick start](#quick-start)
2. ~~[Component class](#component-class)~~
3. ~~[Special properties](#special-properties)~~
4. ~~[General methods](#general-methods)~~
5. ~~[Cycles](#cycles)~~
6. ~~[Styles](#styles)~~
7. ~~[Slots](#slots)~~
8. ~~[Events](#events)~~
9. ~~[Routes](#routes)~~
10. ~~[SSR](#ssr)~~

<br>
<hr>
<br>

<h2 id="quick-start">Quick start</h2>

<br>

Classes are used to create components. Classes can be either built into the main script or imported from an external module. Create a new working directory, for example named *app*, and download the [reacton.min.js](https://raw.githubusercontent.com/reacton-js/reacton/main/app/reacton.min.js) file into this directory.

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