<br>

[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

![reacton](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Reacton⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.min.js)

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
2. [Component class](#component-class)
3. [Special properties](#special-properties)
4. [General methods](#general-methods)
5. [Cycles](#cycles)
6. [Styles](#styles)
7. [Slots](#slots)
8. ~~[Events](#events)~~
9. ~~[Routes](#routes)~~
10. ~~[SSR](#ssr)~~

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
    <h1>Hello, ${ this.message }!</h1>
    
    <style>
      h1 {
        color: ${ this.color };
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
        color: ${ this.color };
      }
    </style>
  `
}
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

The static methods **before()** and **after()** are called *Before* and *After* updating the component's DOM, using the special **$update()** method, for example:

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
          age: 28,
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