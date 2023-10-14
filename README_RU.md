<br>

[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

![reacton](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Loader🔄](https://www.npmjs.com/package/reacton-loader) | [Reacton⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.min.js)

<br>

Reacton - это плагин JavaScript для быстрого создания реактивных [Веб-компонентов](https://learn.javascript.ru/web-components). Плагин поддерживает все технологии, методы и свойства, такие, например, как [слоты](https://learn.javascript.ru/slots-composition) и [Теневой DOM](https://learn.javascript.ru/shadow-dom), которые предоставляются стандартными Веб-компонентами.

*- [Добавлен](https://github.com/reacton-js/reacton/tree/main/webpack-example-routes) пример сборки [Webpack](https://webpack.js.org/) для [маршрутов](#routes).*

*- [Добавлен](https://github.com/reacton-js/reacton/tree/main/webpack-example-events) пример сборки [Webpack](https://webpack.js.org/) для [событий](#events).*

*- Обновление [сборки](https://github.com/reacton-js/reacton/tree/main/webpack) для [Webpack](https://webpack.js.org/).*

*- Обновление раздела [реактивные атрибуты](#reactive-attributes).*

*- В версии 3.4.0 была исправлена ошибка доступа к [специальным свойствам](#special-properties) в статических методах закрытых компонентов и добавлены [ссылочные атрибуты](#reference-attributes) для быстрого доступа к элементам.*

*- Добавлен [загрузчик](https://www.npmjs.com/package/reacton-loader) однофайловых компонентов для [Webpack](https://webpack.js.org/).*

<br>

Ниже представлен пример простого компонента:

```html
<!-- монтировать компонент MyComponent -->
<my-component color="red"></my-component>

<!-- создать шаблон компонента MyComponent -->
<template class="MyComponent">
  <h1>Привет, {{ message }}!</h1>
        
  <style>
    h1 {
      color: {{ color }};
    }
  </style>

  <script>
    exports = class {
      // инициализация объекта состояния в конструкторе
      constructor(props) {
        this.message = 'Reacton'
        this.color = props.color
      }

      static mode = 'open' // добавить Теневой DOM
    }
  </script>
</template>
```

<br>

1. [Быстрый старт](#quick-start)
2. [Класс компонента](#component-class)
3. [Специальные свойства](#special-properties)
4. [Общие методы](#general-methods)
5. [Реактивные атрибуты](#reactive-attributes)
6. [Ссылочные атрибуты](#reference-attributes)
7. [Дочерние компоненты](#child-components)
8. [Циклы](#cycles)
9. [Стили](#styles)
10. [Слоты](#slots)
11. [События](#events)
12. [Маршруты](#routes)
13. [SSR](#ssr)

<br>
<hr>
<br>

<h2 id="quick-start">Быстрый старт</h2>

<br>

Для создания компонентов применяются классы. Классы могут быть как встроенными в основной скрипт, так и импортированы из внешнего модуля. Создайте новый рабочий каталог, например, с названием *app*, и скачайте в этот каталог файл [reacton.min.js](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.min.js).

Добавьте в каталог файл *index.html* со следующим содержимым:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component></my-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      static template = `
        <h1>Привет, {{ message }}!</h1>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // передать класс компонента MyComponent в плагин Reacton
    Reacton(MyComponent)
  </script>
</body>
</html>
```

Чтобы гарантировать отсутствие конфликтов имён между стандартными и пользовательскими HTML-элементами, имя компонента должно содержать дефис «-», например, my-element и super-button – это правильные имена, а myelement – нет.

Открыв файл *index.html* в браузере, на экране отобразится созданное в компоненте MyComponent сообщение:

<h1 style="color: red;">Привет, Reacton!</h1>

<br>

В этом примере был создан простой, встроенный в общий скрипт компонент. Давайте теперь вынесем этот компонент в отдельный модуль. 

Создайте в каталоге *app* файл *MyComponent.js* со следующим содержимым:

```js
// экспортировать класс компонента MyComponent
export default class MyComponent {
  message = 'Reacton'
  color = 'red'

  static template = `
    <h1>Привет, {{ message }}!</h1>
    
    <style>
      h1 {
        color: {{ color }};
      }
    </style>
  `
}
```

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component></my-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script type="module">
    // импортировать класс компонента MyComponent
    import MyComponent from './MyComponent.js'

    // передать класс компонента MyComponent в плагин Reacton
    Reacton(MyComponent)
  </script>
</body>
</html>
```

Для работы с внешними компонентами, нам потребуется любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server).

Установите данный сервер с помощью команды в терминале:

```
npm install --global lite-server
```

Теперь перейдите в каталог *app* с помощью терминала или откройте терминал в этом каталоге, и в терминале введите команду:

```
lite-server
```

После этого откроется окно браузера по умолчанию, в котором будет отображаться показанное выше приветственное сообщение.

<br>

Для быстрого доступа к компоненту в консоли браузера, добавьте его элементу монтирования идентификатор "mycomp", как показано ниже:

```html
<!-- монтировать компонент MyComponent -->
<my-component id="mycomp"></my-component>
```

Теперь откройте консоль браузера и введите две команды:

```
mycomp.$state.message = 'Веб-компоненты'
mycomp.$state.color = 'green'
```

Цвет и сообщение заголовка сразу же изменятся:

<h1 style="color: green;">Привет, Веб-компоненты!</h1>

<br>

Reacton предоставляет более удобный способ создания компонентов в тегах [&lt;template&gt;](https://learn.javascript.ru/template-element).

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent">
    <h1>Привет, {{ message }}!</h1>
          
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

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать шаблон компонента MyComponent в плагин Reacton
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

В данном примере, название класса компонента определяется из названия первого класса шаблона.

<br>

Компоненты можно создавать во внешних файлах, что особенно удобно при использовании систем сборки. Вы можете настроить свою или [скачать](https://github.com/reacton-js/reacton/tree/main/webpack) уже готовую систему сборки на основе [Webpack](https://webpack.js.org/).

Создайте в каталоге *app* файл *MyComponent.htm* со следующим содержимым:

```html
<my-component>
  <h1>Привет, {{ message }}!</h1>
          
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

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script type="module">
    // запросить файл MyComponent.htm
    const response = await fetch('MyComponent.htm')
    // получить текстовое содержимое файла
    const MyComponent = await response.text()

    // передать содержимое файла компонента MyComponent в плагин Reacton
    Reacton(MyComponent)
  </script>
</body>
</html>
```

Для работы с внешними компонентами, нам потребуется любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server).

Установите данный сервер с помощью команды в терминале:

```
npm install --global lite-server
```

Теперь перейдите в каталог *app* с помощью терминала или откройте терминал в этом каталоге, и в терминале введите команду:

```
lite-server
```

После этого откроется окно браузера по умолчанию, в котором будет отображаться показанное выше приветственное сообщение.

<br>
<br>
<h2 id="component-class">Класс компонента</h2>

<br>

Название класса компонента определяет название элемента компонента в DOM. Например, класс MyComponent или myComponent, будет соответствовать названию *my-component* в DOM. Каждый класс компонента, может содержать необязательное статическое свойство **name**, которое определяет название этого класса.

Данное свойство необходимо указывать, например, при передачи анонимного класса напрямую в плагин:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать анонимный класс в плагин Reacton
    Reacton(class {
      message = 'Reacton'
      color = 'red'

      static name = 'MyComponent' // название компонента

      static template = `
        <h1>Привет, {{ message }}!</h1>
        
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

Название класса может быть указано в верблюжьей, как в примере выше, или в шашлычной нотации:

```js
static name = 'my-component'
```

<br>

Состояние компонента определяется в виде свойств экземпляра класса компонента. В примере выше, имеется два состояния: 

```js
message = 'Reacton'
color = 'red'
```

Это новый способ определения свойств для объектов. Вы можете использовать и старый способ, указывая конструктор:

```js
constructor() {
  this.message = 'Reacton'
  this.color = 'red'
}
```

<br>

Кроме состояния, объекты классов могут иметь и методы, например:

```js
class MyComponent {
  message = 'Reacton'
  color = 'red'

  // метод объекта класса
  printHello() {
    return `Привет, ${ this.message }!`
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

В данном примере был определён метод **printHello()** объекта класса MyComponent, который просто выводит приветственное сообщение.

<br>

Для вывода HTML-содержимого компонента, класс должен иметь статическое свойство **template**, которое определяет строку. Из этой строки будет создана HTML-разметка будущего компонента:

```js
static template = `
  <h1>Привет, {{ message }}!</h1>
  
  <style>
    h1 {
      color: {{ color }};
    }
  </style>
`
```

Для вывода свойств объекта состояния или любых других выражений, используются двойные фигурные скобки.

Статическое свойство **template** можеть быть методом, который выполняется в контексте объекта состояния компонента, что позволяет ссылаться на свойства этого объекта с помощью ключевого слова *this* и используя [шаблонные строки](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals), например:

```js
static template() {
  const message = this.message
  const color = this.color

  return `
    <h1>Привет, ${message}!</h1>
    
    <style>
      h1 {
        color: ${color};
      }
    </style>
  `
}
```

Внутри шаблонных строк можно использовать [подстановки](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals#%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BF%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D1%8F_%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9) для выставки любых выражений:

```js
${ 5 + 6 }
```

Однако, при таком способе указания значений, теряется реактивность указанных свойств объекта состояния. Реактивные состояния определяются только внутри двойных фигурных скобок или внутри [реактивных атрибутов](#reactive-attributes).

Метод **template()**, как и все рассмотренные далее статические методы класса компонента, может быть асинхронным. В примере ниже, имитируется загрузка данных с сервера:

```js
static async template() {
  // получить данные через одну секунду после вызова метода
  const message = await new Promise(ok => setTimeout(() => ok('Веб-компоненты'), 1000))

  return `
    <h1>Привет, ${ message }!</h1>
    
    <style>
      h1 {
        color: {{ color }};
      }
    </style>
  `
}
```

Если компонент создаётся в тегах &lt;template&gt;, то статическое свойство **template** не указывается. HTML-содержимое компонента, определяется содержимым этого тега:

```html
<!-- создать шаблон компонента MyComponent -->
<template class="MyComponent">
  <h1>Привет, {{ message }}!</h1>
        
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

По умолчанию, все компоненты создаются без [Теневого DOM](https://learn.javascript.ru/shadow-dom). Это означает, что используемые в них стили влияют на DOM всего [документа](https://developer.mozilla.org/ru/docs/Web/API/Document), а не конкретного компонента. 

Статическое свойство **mode** определяет [уровень инкапсуляции](https://learn.javascript.ru/shadow-dom#tenevoe-derevo) компонента для использования [локальных стилей](https://learn.javascript.ru/shadow-dom-style) и может иметь значение либо "open", либо значение "closed":

```js
static mode = 'open'
```

В примере ниже, создаётся компонент с закрытым Теневым DOM:

```js
class MyComponent {
  message = 'Reacton'
  color = 'red'

  static mode = 'closed' // добавить закрытый Теневой DOM

  static template = `
    <h1>Привет, {{ message }}!</h1>
    
    <style>
      h1 {
        color: {{ color }};
      }
    </style>
  `
}
```

Данный тип компонентов является наиболее защищённым, поскольку доступ к состоянию и DOM такого компонента, возможен только из статических методов или внутри двойных фигурных скобок содержимого компонента.

<br>

Статическое свойство **extends** позволяет [монтировать компонент](https://learn.javascript.ru/custom-elements#modifitsirovannye-vstroennye-elementy) в стандартный HTML-элемент, например:

```js
static extends = 'header'
```

Элемент, в который монтируется компонент, должен содержать атрибут [*is*](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/is) со значением, соответствующим названию компонента, который в него монтируется:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent в элемент Header -->
  <header is="my-component"></header>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      static extends = 'header' // монтировать компонент в элемент Header

      static template = `
        <h1>Привет, {{ message }}!</h1>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // передать класс компонента MyComponent в плагин Reacton
    Reacton(MyComponent)
  </script>
</body>
</html>
```

<br>

Статическое свойство **attributes** содержит массив с названиями атрибутов при изменении которых, будет вызываться статический метод **changed()**, например:

```js
static attributes = ['title'] // отслеживаемые атрибуты

// вызывается при изменении отслеживаемого атрибута
static changed(name, oldValue, newValue) {
  console.log(name, oldValue, newValue)
}
```

Отслеживаемые атрибуты являются технологией Веб-компонентов, а метод **changed()** - сокращённым аналогом метода [attributeChangedCallback()](https://learn.javascript.ru/custom-elements).

Добавьте атрибуты ***id*** и ***title*** к элементу монтирования компонента MyComponent в файле *index.html*, как показано ниже:

```html
<!-- монтировать компонент MyComponent -->
<my-component id="mycomp" title="Reacton"></my-component>
```

Атрибут ***id*** используется для быстрого доступа к компоненту в консоли браузера. Теперь откройте эту консоль и введите команду:

```
mycomp.title = 'Веб-компоненты'
```

После нажатия клавиши Enter, метод **changed()** выведет на консоль следующую строку:

```
title Reacton Веб-компоненты
```

<br>

Отслеживаемые атрибуты можно использовать для определения состояния в компоненте, без необходимости определять состояние в классе, например:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp" message="Reacton" color="red"></my-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      static attributes = ['message', 'color'] // отслеживаемые атрибуты

      // вызывается при изменении отслеживаемого атрибута
      static changed(name, oldValue, newValue) {
        // обновить HTML-содержимое компонента на основе нового состояния
        this[name] = newValue
      }

      static template = `
        <h1>Привет, {{ message }}!</h1>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // передать класс компонента MyComponent в плагин Reacton
    Reacton(MyComponent)
  </script>
</body>
</html>
```

Как видно из этого примера, в нём нет определения состояния в классе:

```js
message = 'Reacton'
color = 'red'
```

Начальные значения состояния определяются в отслеживаемых атрибутах ***message*** и ***color***, как показано ниже:

```html
<!-- монтировать компонент MyComponent -->
<my-component id="mycomp" message="Reacton" color="red"></my-component>
```

Назначение этих значений свойствам объекта состояния присходит в методе **changed()**, который вызывается каждый раз, при Назначении/Изменении значений отслеживаемым атрибутам:

```js
// вызывается при изменении отслеживаемого атрибута
static changed(name, oldValue, newValue) {
  // обновить HTML-содержимое компонента на основе нового состояния
  this[name] = newValue
}
```

Данный метод вызывается в контексте объекта состояния компонента, и внутри него, с помощью ключевого слова *this* происходит назначение новых свойств объекту состояния.

Теперь откройте консоль браузера и введите две команды:

```
mycomp.$state.message = 'Веб-компоненты'
mycomp.$state.color = 'green'
```

Цвет и сообщение заголовка сразу же изменятся:

<h1 style="color: green;">Привет, Веб-компоненты!</h1>

Второй способ обновить HTML-содержимое компонента на основе нового значения состояния, это использование специального свойства **$props**, которое применяется для быстрого доступа ко всем атрибутам компонента.

Введите в консоли браузера команду:

```
mycomp.$props.color = 'blue'
```

Цвет заголовка сразу же изменится:

<h1 style="color: blue;">Привет, Веб-компоненты!</h1>

Специальные методы и свойства будут рассмотрены в следующем разделе. Все они начинаются со знака доллара и определяются на внутреннем уровне компонента.

<br>

Статические методы **connected()**, **disconnected()** и **adopted()** - являются сокращёнными аналогами методов [connectedCallback(), disconnectedCallback() и adoptedCallback()](https://learn.javascript.ru/custom-elements).

Они вызываются при добавлении компонента в документ - метод **connected()**; удалении компонента из документа - метод **disconnected()**; и при перемещении компонента в новый документ - метод **adopted()**.

К наиболее часто применяемым методам, можно отнести метод **connected()**, который позволяет обратиться к HTML-содержимому компонента, после его добавления в [DOM](https://learn.javascript.ru/dom-nodes), например, добавить элементу событие:

```js
// вызывается при добавлении компонента в документ
static connected() {
  // вывести в консоль элемент породивший событие
  this.$('h1').addEventListener('click', event => console.log(event.target))
}
```

<br>

Статические методы **before()** и **after()** вызываются *Перед* и *После* обновления DOM компонента, например:

```js
static before() {
  console.time('Update')
}

static after() {
  console.timeEnd('Update')
}
```

Данный пример показывает, за сколько времени обновляется DOM компонента.

Другим наглядным примером является использование метода **before()** для проверки типа нового значения состояния:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      name = 'Иван'
      age = 32

      // вызывается перед обновлением DOM компонента
      static before() {
        // если значение не является числом, то сгенерировать ошибку
        if (typeof this.age !== 'number') {
          throw new Error('Значение должно быть числом...')
        }
      }

      static template = `
        <p>Имя: {{ name }}</p>
        <p>Возраст: {{ age }}</p>
      `
    }

    // передать класс компонента MyComponent в плагин Reacton
    Reacton(MyComponent)
  </script>
</body>
</html>
```

Если ввести в консоли браузера команду:

```
mycomp.$state.age = 'тридцать пять'
```

то будет получено сообщение об ошибке:

```
Error: Значение должно быть числом...
```

<br>
<br>
<h2 id="special-properties">Специальные свойства</h2>

<br>

В отличие от методов и свойств определяемых пользователем в классе компонента, специальные методы и свойства определяются на внутреннем уровне компонента и всегда начинаются со знака доллара. Не рекомендуется давать состояниям имена, совпадающие с именами специальных свойств. *Это может приводить к ошибкам!*

Свойство **$shadow** возвращает [Теневой DOM](https://learn.javascript.ru/shadow-dom) компонента, который создаётся если было определено статическое свойство **mode** в классе компонента:

```js
static mode = 'open' // добавить Теневой DOM
```

Однако, если компонент имеет закрытый Теневой DOM:

```js
static mode = 'closed' // добавить закрытый Теневой DOM
```

то свойство **$shadow** возвращает значение «null», как показано ниже:

```
mycomp.$shadow
null
```

<br>

Свойство **$light** возвращает значение Истина, если компонент не содержит [Теневой DOM](https://learn.javascript.ru/shadow-dom), иначе оно возвращает значение Ложь, например:

```
mycomp.$light
true
```

<br>

Свойство **$host** возвращает ссылку на сам компонент, если компонент имеет открытый Теневой DOM. Если компонент имеет закрытый Теневой DOM или создаётся без него, то данное свойство возвращает значение «undefined», как показано ниже:

```
mycomp.$host
undefined
```

<br>

Свойство **$props** позволяет быстро устанавливать и получать значения атрибутов компонента. Для закрытых компонентов, вызов этого свойства извне статических методов, возвращает значение «undefined».

Добавьте компоненту атрибут ***title***, как показано ниже:

```html
<!-- монтировать компонент MyComponent -->
<my-component id="mycomp" title="Reacton"></my-component>
```

Чтобы получить значение атрибута ***title***, введите в консоли браузера команду:

```
mycomp.$props.title
```

Чтобы установить новое значение этому атрибуту, введите команду:

```
mycomp.$props.title = 'Веб-компоненты'
```

Для инициализации состояния компонента с помощью атрибутов передаваемых в его элемент монтирования, в конструкторе компонента используется параметр **props**, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component message="Reacton" color="red"></my-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent">
    <h1>Привет, {{ message }}!</h1>
          
    <style>
      h1 {
        color: {{ color }};
      }
    </style>

    <script>
      exports = class {
        // инициализация состояния значениями из атрибутов
        constructor(props) {
          this.message = props.message
          this.color = props.color
        }
      }
    </script>
  </template>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать шаблон компонента MyComponent в плагин Reacton
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

<br>

Свойство **$state** позволяет Получить/Установить значение любого свойства состояния. Для закрытых компонентов, вызов этого свойства извне статических методов, возвращает значение «undefined».

Чтобы получить значение состояния **message**, введите в консоли браузера команду:

```
mycomp.$state.message
```

Чтобы изменить это состояние, введите команду:

```
mycomp.$state.message = 'Веб-компоненты'
```

<br>

Все рассмотренные ранее пользовательские и статические методы класса компонента, выполняются в контексте объекта состояния, на который ссылается свойство **$state**. Данный объект представляет собой [прокси](https://learn.javascript.ru/proxy). Это означает, что если запрашиваемого состояния нет в данном объекте, то происходит поиск запрашиваемого свойства в самом компоненте. Однако, запись нового значения, всегда происходит в объект состояния.

Благодаря этому, из объекта состояния можно получить доступ к любому свойству компонента, такому, например, как свойство [attributes](https://developer.mozilla.org/ru/docs/Web/API/Element/attributes):


```
mycomp.$state.attributes['id'].value
```

Внутри двойных фигурных скобок, доступ к свойствам компонента, а не состояния, например, к свойству [attributes](https://developer.mozilla.org/ru/docs/Web/API/Element/attributes), осуществляется только с помощью ключевого слова *this*:

```js
{{ this.attributes['id'].value.toUpperCase() }}
```

Как показано в примере ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent">
    <h1>Привет, {{ message }} 
      от компонента {{ this.attributes['id'].value.toUpperCase() }}!</h1>
          
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

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать шаблон компонента MyComponent в плагин Reacton
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

<br>

Метод **$()**  является сокращённым аналогом метода [querySelector()](https://learn.javascript.ru/searching-elements-dom#querySelector) и применяется для быстрого доступа к элементу DOM компонента. Для закрытых компонентов, вызов этого метода извне статических методов, возвращает значение «undefined».

Этот метод используется, например, для назначения слушателя события:

```js
// вызывается при добавлении компонента в документ
static connected() {
  // вывести в консоль элемент породивший событие
  this.$('h1').addEventListener('click', event => console.log(event.target))
}
```

Метод **$$()**  является сокращённым аналогом метода [querySelectorAll()](https://learn.javascript.ru/searching-elements-dom#querySelectorAll) и применяется для быстрого доступа к элементу DOM компонента. Для закрытых компонентов, вызов этого метода извне статических методов, возвращает значение «undefined».

Этот метод используется, например, для перебора коллекции элементов:

```js
// вызывается при добавлении компонента в документ
static connected() {
  // вывести в консоль все элементы параграфов
  this.$$('p').forEach(elem => console.log(elem))
}
```

<br>

Метод **$entities()** позволяет [обезвредить](https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/) данные, полученные из ненадёжных источников:

```js
static async template() {
  // обезвредить данные, полученные из ненадёжного источника
  const message = this.$entities(await new Promise(ok => setTimeout(() => ok('<em>небезопасный код</em>'), 1000)))

  return `
    <h1>Привет, ${ message }!</h1>
    
    <style>
      h1 {
        color: {{ color }};
      }
    </style>
  `
}
```

<br>

Метод **$event()** применяется для создания пользовательских событий, позволяющих различным компонентам взаимодействовать между собой, а метод **\$route()** используется для построения маршрутизации. Свойство **\$refs** позволяет обращаться к элементам с помощью ссылочных атрибутов. Они будут рассмотрены позже, поскольку требуют для своего пояснения отдельных глав.

<br>
<br>
<h2 id="general-methods">Общие методы</h2>

<br>

Кроме состояния, объекты классов могут иметь и методы, например:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp1"></my-component>

  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp2"></my-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      // метод объекта класса
      printHello() {
        return `Привет, ${ this.message }!`
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

    // передать класс компонента MyComponent в плагин Reacton
    Reacton(MyComponent)
  </script>
</body>
</html>
```

В данном примере был определён метод **printHello()** объекта класса MyComponent, который просто выводит приветственное сообщение для всех компонентов этого типа.

Чтобы не создавать для разного типа компонентов одинаковые методы, можно создать для общих методов отдельный класс, а затем, наследовать классы компонентов от этого класса методов, как показано ниже: 

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- монтировать компонент NewComponent -->
  <new-component id="newcomp"></new-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать класс Methods для хранения общих методов
    class Methods {
      printHello() {
        return `Привет, ${ this.message }!`
      }
    }

    // наследовать класс MyComponent от класса Methods
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

    // наследовать класс NewComponent от класса Methods
    class NewComponent extends Methods {
      message = 'NewComponent'

      static template = `
        <h2>{{ printHello() }}</h2>
      `
    }

    // передать классы компонентов в плагин Reacton
    Reacton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

Данный способ применяется и при определении компонентов в тегах &lt;template&gt;, например:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- монтировать компонент NewComponent -->
  <new-component id="newcomp"></new-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent">
    <h1>{{ printHello() }}</h1>
          
    <style>
      h1 {
        color: {{ color }};
      }
    </style>

    <script>
      // наследовать класс MyComponent от класса Methods
      exports = class extends Methods {
        message = 'Reacton'
        color = 'red'
      }
    </script>
  </template>

  <!-- создать шаблон компонента NewComponent -->
  <template class="NewComponent">
    <h2>{{ printHello() }}</h2>

    <script>
      // наследовать класс NewComponent от класса Methods
      exports = class extends Methods {
        message = 'NewComponent'
      }
    </script>
  </template>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать класс Methods для хранения общих методов
    class Methods {
      printHello() {
        return `Привет, ${ this.message }!`
      }
    }

    // передать шаблоны компонентов в плагин Reacton
    Reacton(...document.querySelectorAll('template'))
  </script>
</body>
</html>
```

При определении компонентов в тегах &lt;template&gt;, суперкласс:

```js
// создать класс Methods для хранения общих методов
class Methods {
  printHello() {
    return `Привет, ${ this.message }!`
  }
}
```

должен быть доступен [глобально](https://learn.javascript.ru/global-object).

<br>
<br>
<h2 id="reactive-attributes">Реактивные атрибуты</h2>

<br>

Для создания реактивных атрибутов, перед их именем необходимо указать символ двоеточия «:». Все реактивные атрибуты выполняются в контексте объекта состояния. Выражения в реактивных атрибутах указываются без использования двойных фигурных скобок, в отличие от HTML-содержимого, например:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent">
    <h1 :title="message" :hidden="hide">Привет, {{ message }}!</h1>
    <button :onclick="changeMessage">Изменить сообщение</button>
    <button :onclick="color = 'green'">Изменить цвет</button>
    <button :onclick="hide = !hide">Скрыть/Показать</button>
          
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
          this.message = 'Веб-компоненты'
        }
      }
    </script>
  </template>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать шаблон компонента MyComponent в плагин Reacton
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

Как видно из этого примера, реактивными могут быть не только простые, но также атрибуты событий и логические атрибуты.

<br>

Все атрибуты событий получают неявный параметр [event](https://learn.javascript.ru/introduction-browser-events#obekt-sobytiya), что позволяет обращаться с его помощью к елементам, на которых сработало событие, например, к полям ввода:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent">
    <h3>Имя: {{ name }}</h3>
    <h3>Возраст: {{ age }}</h3>
      
    <p>Имя: <input type="text" :value="name" :oninput="changeName"></p>
    <p>Возраст: <input type="number" min="0" max="120" :value="age" :oninput="age = event.target.value"></p>

    <script>
      exports = class {
        name = 'Иван'
        age = 32

        changeName(event) {
          this.name = event.target.value
        }
      }
    </script>
  </template>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать шаблон компонента MyComponent в плагин Reacton
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

<br>

Атрибут [*is*](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/is) используется для монтирования компонентов в стандартные HTML-элементы. Этот атрибут можно сделать реактивным:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent">
    <!-- элемент монтирования компонентов -->
    <div :is="view"></div>

    <button :onclick="view = 'component-a'">Компонент-А</button>
    <button :onclick="view = 'component-b'">Компонент-Б</button>

    <script>
      exports = class {
        view = 'component-a' // начальное значение
      }
    </script>
  </template>

  <!-- создать шаблон компонента ComponentA -->
  <template class="ComponentA">
    <h1>Компонент-А</h1>

    <script>
      exports = class {
        static extends = 'div' // элемент монтирования
      }
    </script>
  </template>

  <!-- создать шаблон компонента ComponentB -->
  <template class="ComponentB">
    <h1>Компонент-Б</h1>

    <script>
      exports = class {
        static extends = 'div' // элемент монтирования
      }
    </script>
  </template>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать шаблоны компонентов в плагин Reacton
    Reacton(...document.querySelectorAll('template'))
  </script>
</body>
</html>
```

Монтируемые компоненты должны содержать статическое свойство **extends** со значением, соответствующим имени элемента, в который они монтируются:

```js
exports = class {
  static extends = 'div' // элемент монтирования
}
```

Кроме этого, если элемент, в который монтируются компоненты содержит другие реактивные атрибуты, то все они должны указываться перед атрибутом ***is***, например:

```html
<!-- элемент монтирования компонентов -->
<div :title="view" :onclick="console.log(view)" :is="view"></div>
```

<br>
<br>
<h2 id="reference-attributes">Ссылочные атрибуты</h2>

<br>

Для быстрого доступа к элементам внутри компонента, можно использовать ссылочные атрибуты, которые начинаются с символа «#», за которым следует название ссылочного атрибута без значения, например:

```html
<h1 #hello>Привет, {{ message }}!</h1>
```

Для закрытых компонентов, вызов этого свойства извне статических методов, возвращает значение «undefined».

В этом примере, элементу H1 был назначен ссылочный атрибут ***hello***. Для получения элемента, которому был назначен атрибут, используется специальное свойство **$refs**, которое является объектом, содержащим все ссылочные атрибуты компонента и элементы, на которые они ссылаются.

Это можно использовать, например, для назначения собственных обработчиков событий для элементов:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent">
    <h1 #hello>Привет, {{ message }}!</h1>
          
    <style>
      h1 {
        color: {{ color }};
      }
    </style>

    <script>
      exports = class {
        message = 'Reacton'
        color = 'red'

        // вызывается при добавлении компонента в документ
        static connected() {
          // вывести в консоль элемент породивший событие
          this.$refs.hello.addEventListener('click', event => console.log(event.target))
        }
      }
    </script>
  </template>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать шаблон компонента MyComponent в плагин Reacton
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="child-components">Дочерние компоненты</h2>

<br>

Для передачи данных из родительских компонентов в дочерние, можно использовать [слоты](https://learn.javascript.ru/slots-composition), [атрибуты](https://learn.javascript.ru/dom-attributes-and-properties#html-atributy) и [события](#events). Слоты и атрибуты позволяют передавать лишь текстовые данные, а с помощью событий, можно обмениваться любыми данными между любыми компонентами, а не только дочерними.

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent template">
    <!-- монтировать компонент SubComponent -->
    <sub-component :color="color">
      <h1>Привет, {{ message }}!</h1>
    </sub-component>

    <script>
      exports = class {
        message = 'Reacton'
        color = 'red'
      }
    </script>
  </template>

  <!-- создать шаблон компонента SubComponent -->
  <template class="SubComponent template">
    <slot></slot>
          
    <style>
      ::slotted(h1) {
        color: {{ $props.color }};
      }
    </style>

    <script>
      exports = class {
        static mode = 'open' // добавить Теневой DOM
      }
    </script>
  </template>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать шаблоны компонентов в плагин Reacton
    Reacton(...document.querySelectorAll('.template'))
  </script>
</body>
</html>
```

В этом примере, значение состояния свойства **color** из родительского компонента MyComponent, передаётся в атрибут ***color*** дочернего компонента SubComponent, а значение свойства состояния **message**, передаётся в слот дочернего компонента:

```html
<!-- монтировать компонент SubComponent -->
<sub-component :color="color">
  <h1>Привет, {{ message }}!</h1>
</sub-component>
```

Внутри этого компонента, доступ к значению атрибута можно получить с помощью специального свойства **$props**, как показано ниже:

```html
<style>
  ::slotted(h1) {
    color: {{ $props.color }};
  }
</style>
```

Для стилизации передаваемых в слоты элементов, используется псевдокласс [::slotted](https://learn.javascript.ru/shadow-dom-style#primenenie-stiley-k-soderzhimomu-slotov). Кроме этого, в дочернем компоненте SubComponent используется элемент [&lt;slot&gt;](https://learn.javascript.ru/slots-composition#slot-po-umolchaniyu-pervyy-bez-imeni), являющийся слотом по умолчанию:

```html
<slot></slot>
```

в который будет вставлен заголовок из родительского компонента MyComponent:

```html
<h1>Привет, {{ message }}!</h1>
```

При изменении зачения свойства состояния **message** родительского компонента, будет изменяться и содержимое слота в дочернем. Например, введите в консоли браузера команду:

```
mycomp.$state.message = 'Веб-компоненты'
```

Но при изменении значения свойства состояния передаваемого через атрибуты, в дочернем компоненте изменения происходит не будут:

```
mycomp.$state.color = 'green'
```

Кроме этого, через слоты и атрибуты можно передавать в дочерние компоненты лишь текстовые данные, а не объекты. Но все эти проблемы решаются с помощью [событий](#events), которые будут рассмотрены позже.

<br>
<br>
<h2 id="cycles">Циклы</h2>

<br>

Reacton поддерживает три вида циклов *«for»*, которые реализованы в  JavaScript. Все они определяются с помощью специального атрибута ***$for*** и выводят содержимое своих HTML-элементов столько раз, сколько предусмотрено условием цикла.

В примере ниже, цикл *«for»* выводит 10 параграфов с числами от 0 до 9:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent">
    <!-- вывести 10 параграфов -->
    <div $for="i = 0; i < 10; i++">
      <p>Число: {{ i }}</p>
    </div>
  </template>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать шаблон компонента MyComponent в плагин Reacton
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

В специальном атрибуте ***$for*** нельзя использовать операторы определения переменных: *var*, *let* и *const* соответственно. Это приведёт к ошибке:

```html
<!-- вывести 10 параграфов -->
<div $for="var i = 0; i < 10; i++">
  <p>Число: {{ i }}</p>
</div>
```

<br>

Цикл *«for-in»* используется для вывода содержимого объектов, как показано ниже:

```html
<!-- создать шаблон компонента MyComponent -->
<template class="MyComponent">
  <!-- вывести содержимое объекта -->
  <ul $for="prop in user">
    <li>
      <b>{{ prop }}</b>: {{ user[prop] }}
    </li>
  </ul>

  <script>
    exports = class {
      user = {
        name: 'Иван',
        age: 32
      }
    }
  </script>
</template>
```

<br>

Цикл *«for-of»* предназначен для работы с массивами:

```html
<!-- создать шаблон компонента MyComponent -->
<template class="MyComponent">
  <!-- вывести содержимое массива -->
  <ul $for="col of colors">
    <li>{{ col }}</li>
  </ul>

  <script>
    exports = class {
      colors = ['красный', 'зелёный', 'синий']
    }
  </script>
</template>
```

<br>

Атрибуты событий HTML-элементов цикла можно привязывать к его переменным:

```html
<!-- вывести содержимое массива -->
<ul $for="col of colors">
  <li :onclick="console.log(col)">{{ col }}</li>
</ul>
```

События всегда будут использовать актуальное значение переменной цикла для своей фазы итерации, даже после модификации массива:

```html
<!-- создать шаблон компонента MyComponent -->
<template class="MyComponent">
  <!-- кнопка обращения массива -->
  <button :onclick="colors.reverse()">Обратить массив</button>

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

В Reacton можно применять циклы с любой глубиной вложенности:

```html
<!-- создать шаблон компонента MyComponent -->
<template class="MyComponent">
  <!-- вывести массив объектов -->
  <div $for="user of users">
    <div>
      <p>
        <b>Имя</b>: {{ user.name }}
      </p>
      <p>
        <b>Возраст</b>: {{ user.age }}
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
          name: 'Иван',
          age: 32,
          skills: {
            frontend: ['HTML', 'CSS'],
            backend: ['Ruby', 'PHP', 'MySQL']
          }
        },
        {
          name: 'Ольга',
          age: 25,
          skills: {
            frontend: ['HTML', 'JavaScript'],
            backend: ['PHP']
          }
        },
        {
          name: 'Максим',
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
<h2 id="styles">Стили</h2>

<br>

Для создания [локальных стилей](https://learn.javascript.ru/shadow-dom-style), компоненту необходимо добавить [Теневой DOM](https://learn.javascript.ru/shadow-dom) с помощью статического свойства **mode**, как показано ниже:

```js
class MyComponent {
  message = 'Reacton'
  color = 'red'

  static mode = 'open' // добавить Теневой DOM

  static template = `
    <h1>Привет, {{ message }}!</h1>
    
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
<h2 id="slots">Слоты</h2>

<br>

Для работы со [слотами](https://learn.javascript.ru/slots-composition), компоненту необходимо добавить [Теневой DOM](https://learn.javascript.ru/shadow-dom) с помощью статического свойства **mode**, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component>
    <span slot="username">Иван</span>
    <span slot="age">32</span>
    <span>Трудолюбивый</span>
  </my-component>

  <!-- создать шаблон компонента MyComponent -->
  <template class="MyComponent">
    <div>
      Имя: <slot name="username"></slot>
    </div>
    <div>
      Возраст: <slot name="age"></slot>
    </div>
    <div>
      Характер: <slot><slot>
    </div>

    <script>
      exports = class {
        static mode = 'open' // добавить Теневой DOM
      }
    </script>
  </template>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // передать шаблон компонента MyComponent в плагин Reacton
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="events">События</h2>

<br>

Для взаимодействия между различными компонентами, применяется усовершенствованный механизм [пользовательских событий](https://learn.javascript.ru/dispatch-events). Этот механизм подразумевает использование метода **event()** плагина Reacton и специального метода **$event()**, который доступен в каждом компоненте.

Когда метод **event()** плагина Reacton вызывается как конструктор, то он возвращает новый [фрагмент документа](https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment), который является источником и получателем пользовательских событий. А когда этот метод вызывается не как конструктор, то он работает аналогично специальному методу **$event()**. Это позволяет связывать компоненты не только между собой, но и с любым внешним кодом.

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- монтировать компонент NewComponent -->
  <new-component id="newcomp"></new-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать элемент события myEvent
    const myEvent = new Reacton.event()

    // создать класс компонента NewComponent
    class NewComponent {
      colors = ['красный', 'зелёный', 'синий']

      static template = `
        <ul $for="col of colors">
          <li>{{ col }}</li>
        </ul>
      `

      static connected() {
        // добавить элементу myEvent обработчик события "reverse"
        myEvent.addEventListener('reverse', () => {
          this.colors.reverse() // обратить массив
        })
      }
    }

    // создать класс компонента MyComponent
    class MyComponent {
      static template = `
        <button id="btn-reverse">Обратить массив</button>
      `

      static connected() {
        // добавить для кнопки обработчик события "click"
        this.$('#btn-reverse').addEventListener('click', () => {
          // вызвать событие "reverse" для элемента myEvent
          this.$event(myEvent, 'reverse')
        })
      }
    }

    // передать классы компонентов в плагин Reacton
    Reacton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

В данном примере, вначале создаётся новый элемент события myEvent:

```js
// создать элемент события myEvent
const myEvent = new Reacton.event()
```

Этому элементу будут назначаться обработчики пользовательских событий в одних компонентах и вызываться в других.

В статическом методе **connected()** класса компонента NewComponent, происходит назначение элементу myEvent обработчика для пользовательского события *"reverse"*. Внутри этого обработчика происходит обращение массива и обновление DOM компонента:

```js
static connected() {
  // добавить элементу myEvent обработчик события "reverse"
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // обратить массив
  })
}
```

В статическом методе **connected()** класса компонента MyComponent, кнопке добавляется обработчик события *"click"*, внутри которого, происходит вызов события *"reverse"* для элемента myEvent, как показано ниже:

```js
static connected() {
  // добавить для кнопки обработчик события "click"
  this.$('#btn-reverse').addEventListener('click', () => {
    // вызвать событие "reverse" для элемента myEvent
    this.$event(myEvent, 'reverse')
  })
}
```

В первом аргументе специального метода **$event()** передаётся элемент события myEvent, а во втором, название вызываемого события:

```js
this.$event(myEvent, 'reverse')
```

Метод **$event()** может получать и третий аргумент, в котором можно передать параметры, полностью соответствующие параметрам конструктора [CustomEvent](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya). Например, можно передать свойство **detail**, которое позволяет обмениваться данными между компонентами.

<br>

Добавьте в статический метод **connected()** компонента NewComponent новый обработчик события *"new-colors"*, как показано ниже:

```js
static connected() {
  // добавить элементу myEvent обработчик события "reverse"
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // обратить массив
  })

  // добавить элементу myEvent обработчик события "new-colors"
  myEvent.addEventListener('new-colors', event => {
    this.colors = event.detail // присвоить новый массив
  })
}
```

Обратите внимание, что в обработчике этого события появился параметр **event**, через который можно получить доступ к свойству **detail**. Кроме этого, в названия пользовательских событий рекомендуется добавлять дефис, чтобы они не пересекались с названиями стандартных событий.

Теперь внесите изменения в разметку компонента MyComponent, добавив ему новую кнопку:

```js
static template = `
  <button id="btn-reverse">Обратить массив</button>
  <button id="btn-new">Новый массив</button>
`
```

и обработчик события *"click"*, внутри которого, в обработчик события *"new-colors"* передаётся новый массив цветов:

```js
static connected() {
  // добавить для кнопки обработчик события "click"
  this.$('#btn-reverse').addEventListener('click', () => {
    // вызвать событие "reverse" для элемента myEvent
    this.$event(myEvent, 'reverse')
  })

  // добавить для кнопки обработчик события "click"
  this.$('#btn-new').addEventListener('click', () => {
    // вызвать событие "new-colors" для элемента myEvent
    this.$event(myEvent, 'new-colors', {
      // передать в обработчик события новый массив
      detail: ['синий', 'оранжевый', 'фиолетовый', 'золотой']
    })
  })
}
```

Таким образом, можно легко обмениваться данными между различными компонентами.

<br>

Для демонстрации взаимодействия компонентов с внешним кодом, добавьте в разметку файла *index.html* кнопку для очистки массива:

```html
<!-- монтировать компонент MyComponent -->
<my-component id="mycomp"></my-component>

<!-- монтировать компонент NewComponent -->
<new-component id="newcomp"></new-component>

<!-- кнопка очистки массива -->
<button id="btn-clear">Очистить массив</button>
```

Добавьте в статический метод **connected()** компонента NewComponent новый обработчик события *"clear-colors"*, как показано ниже:

```js
static connected() {
  // добавить элементу myEvent обработчик события "reverse"
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // обратить массив
  })

  // добавить элементу myEvent обработчик события "new-colors"
  myEvent.addEventListener('new-colors', event => {
    this.colors = event.detail // присвоить новый массив
  })

  // добавить элементу myEvent обработчик события "clear-colors"
  myEvent.addEventListener('clear-colors', event => {
    this.colors.length = 0 //  очистить массив
  })
}
```

и обработчик события *"click"* для новой кнопки в конец скрипта:

```js
// добавить для кнопки обработчик события "click"
document.querySelector('#btn-clear').addEventListener('click', () => {
  // вызвать событие "clear-colors" для элемента myEvent
  Reacton.event(myEvent, 'clear-colors')
})

// передать классы компонентов в плагин Reacton
Reacton(MyComponent, NewComponent)
```

Внутри этого обработчика, событие *"clear-colors"* для элемента myEvent вызывается с помощью метода **event()** самого плагина:

```js
// вызвать событие "clear-colors" для элемента myEvent
Reacton.event(myEvent, 'clear-colors')
```

а не специального метода **$event()**, который доступен только в компонентах, но по своей сути, просто является ссылкой на метод **event()** плагина Reacton.

Ниже представлено полное содержимое файла *index.html*:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- монтировать компонент NewComponent -->
  <new-component id="newcomp"></new-component>

  <!-- кнопка очистки массива -->
  <button id="btn-clear">Очистить массив</button>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать элемент события myEvent
    const myEvent = new Reacton.event()

    // создать класс компонента NewComponent
    class NewComponent {
      colors = ['красный', 'зелёный', 'синий']

      static template = `
        <ul $for="col of colors">
          <li>{{ col }}</li>
        </ul>
      `

      static connected() {
        // добавить элементу myEvent обработчик события "reverse"
        myEvent.addEventListener('reverse', () => {
          this.colors.reverse() // обратить массив
        })

        // добавить элементу myEvent обработчик события "new-colors"
        myEvent.addEventListener('new-colors', event => {
          this.colors = event.detail // присвоить новый массив
        })

        // добавить элементу myEvent обработчик события "clear-colors"
        myEvent.addEventListener('clear-colors', event => {
          this.colors.length = 0 //  очистить массив
        })
      }
    }

    // создать класс компонента MyComponent
    class MyComponent {
      static template = `
        <button id="btn-reverse">Обратить массив</button>
        <button id="btn-new">Новый массив</button>
      `

      static connected() {
        // добавить для кнопки обработчик события "click"
        this.$('#btn-reverse').addEventListener('click', () => {
          // вызвать событие "reverse" для элемента myEvent
          this.$event(myEvent, 'reverse')
        })

        // добавить для кнопки обработчик события "click"
        this.$('#btn-new').addEventListener('click', () => {
          // вызвать событие "new-colors" для элемента myEvent
          this.$event(myEvent, 'new-colors', {
            // передать в обработчик события новый массив
            detail: ['синий', 'оранжевый', 'фиолетовый', 'золотой']
          })
        })
      }
    }

    // добавить для кнопки обработчик события "click"
    document.querySelector('#btn-clear').addEventListener('click', () => {
      // вызвать событие "clear-colors" для элемента myEvent
      Reacton.event(myEvent, 'clear-colors')
    })

    // передать классы компонентов в плагин Reacton
    Reacton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="routes">Маршруты</h2>

<br>

Для создания маршрутизации, применяется усовершенствованный механизм [пользовательских событий](https://learn.javascript.ru/dispatch-events). Этот механизм подразумевает использование метода **route()** плагина Reacton и специального метода **$route()**, который доступен в каждом компоненте.

Когда метод **route()** плагина Reacton вызывается как конструктор, то он возвращает новый [фрагмент документа](https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment), который является источником и получателем пользовательских событий. А когда этот метод вызывается не как конструктор, то он работает аналогично специальному методу **$route()**. Это позволяет связывать компоненты участвующие в маршрутизации не только между собой, но и с любым внешним кодом.

В отличие от метода **event()**, вызываемый как конструктор метод **route()** возвращает фрагменты документа с усовершенствованным методом [addEventListener()](https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener), что позволяет в названиях событий использовать символы регулярных выражений.

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyMenu -->
  <my-menu></my-menu>

  <!-- монтировать компонент MyContent -->
  <my-content></my-content>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать элемент события myRoute
    const myRoute = new Reacton.route()

    // создать класс компонента MyHome
    class MyHome {
      static extends = 'div' // элемент монтирования
      static template = '<h2>Главная</h2>'
    }

    // создать класс компонента MyAbout
    class MyAbout {
      static extends = 'div' // элемент монтирования
      static template = '<h2>О нас</h2>'
    }

    // создать класс компонента MyContacts
    class MyContacts {
      static extends = 'div' // элемент монтирования
      static template = '<h2>Контакты</h2>'
    }

    // создать класс компонента MyMenu
    class MyMenu {
      static template = `
        <nav>
          <a href="/">Главная</a>
          <a href="/about">О нас</a>
          <a href="/contacts">Контакты</a>
        </nav>
      `

      static connected() {
        // добавить для элемента NAV обработчик события "click"
        this.$('nav').addEventListener('click', event => {
          // отменить переход по ссылке
          event.preventDefault()

          // вызвать событие адреса ссылки для элемента myRoute
          this.$route(myRoute, event.target.href)
        })
      }
    }

    // создать класс компонента MyContent
    class MyContent {
      page = 'my-home' // начальное значение состояния

      // элемент монтирования компонентов
      static template = '<div :is="page"></div>'

      static connected() {
        // добавить элементу myRoute обработчик события "/"
        myRoute.addEventListener('/', () => {
          this.page = 'my-home' // присвоить значение
        })

        // добавить элементу myRoute обработчик события "/about"
        myRoute.addEventListener('/about', () => {
          this.page = 'my-about' // присвоить значение
        })

        // добавить элементу myRoute обработчик события "/contacts"
        myRoute.addEventListener('/contacts', () => {
          this.page = 'my-contacts' // присвоить значение
        })
      }
    }

    // передать классы компонентов в плагин Reacton
    Reacton(MyHome, MyAbout, MyContacts, MyMenu, MyContent)
  </script>
</body>
</html>
```

Для работы с маршрутизацией, нам потребуется любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server).

Установите данный сервер с помощью команды в терминале:

```
npm install --global lite-server
```

Теперь перейдите в каталог *app* с помощью терминала или откройте терминал в этом каталоге, и в терминале введите команду:

```
lite-server
```

После этого откроется окно браузера по умолчанию, в котором будет отображаться созданное выше приложение.

<br>

В данном примере, вначале создаётся новый элемент события myRoute:

```js
// создать элемент события myRoute
const myRoute = new Reacton.route()
```

Этому элементу будут назначаться обработчики адресных событий в одних компонентах и вызываться в других.

Затем у нас происходит определение трёх компонентов страниц:

```js
// создать класс компонента MyHome
class MyHome {
  static extends = 'div' // элемент монтирования
  static template = '<h2>Главная</h2>'
}

// создать класс компонента MyAbout
class MyAbout {
  static extends = 'div' // элемент монтирования
  static template = '<h2>О нас</h2>'
}

// создать класс компонента MyContacts
class MyContacts {
  static extends = 'div' // элемент монтирования
  static template = '<h2>Контакты</h2>'
}
```

После создания компонентов страниц, создаётся компонент главного меню:

```js
// создать класс компонента MyMenu
class MyMenu {
  static template = `
    <nav>
      <a href="/">Главная</a>
      <a href="/about">О нас</a>
      <a href="/contacts">Контакты</a>
    </nav>
  `

  static connected() {
    // добавить для элемента NAV обработчик события "click"
    this.$('nav').addEventListener('click', event => {
      // отменить переход по ссылке
      event.preventDefault()

      // вызвать событие адреса ссылки для элемента myRoute
      this.$route(myRoute, event.target.href)
    })
  }
}
```

Этот компонент монтируется первым в приложении:

```html
<!-- монтировать компонент MyMenu -->
<my-menu></my-menu>
```

В статическом методе **connected()** класса компонента MyMenu, элементу NAV добавляется обработчик события *"click"*, внутри которого, приостанавливается переход по ссылке и вызывается адресное событие для элемента myRoute, как показано ниже:

```js
static connected() {
  // добавить для элемента NAV обработчик события "click"
  this.$('nav').addEventListener('click', event => {
    // отменить переход по ссылке
    event.preventDefault()

    // вызвать событие адреса ссылки для элемента myRoute
    this.$route(myRoute, event.target.href)
  })
}
```

В качестве названия адресного события, во втором аргументе метода **$route()** передаётся содержимое атрибута ***href*** ссылки, по которой был произведён щелчок:

```js
// вызвать событие адреса ссылки для элемента myRoute
this.$route(myRoute, event.target.href)
```

Как и при работе с пользовательскими событиями, методу **$route()** можно передать в третьем аргументе объект со свойством **detail**, в котором обработчикам передаются какие-то данные, например:

```js
// вызвать событие адреса ссылки для элемента myRoute
this.$route(myRoute, event.target.href, {
  // передать в обработчик события новый массив
  detail: ['синий', 'оранжевый', 'фиолетовый', 'золотой']
})
```

Важным отличием от пользовательских событий является то, что передаваемые в адресные события данные должны поддаваться сериализации и их размер не должен превышать 16 MiB. Т.е. эти данные должны соответствовать параметру **state** метода [pushState()](https://developer.mozilla.org/ru/docs/Web/API/History/pushState).

<br>

Последним в приложении определяется компонент для вывода страниц: 

```js
// создать класс компонента MyContent
class MyContent {
  page = 'my-home' // начальное значение состояния

  // элемент монтирования компонентов
  static template = '<div :is="page"></div>'

  static connected() {
    // добавить элементу myRoute обработчик события "/"
    myRoute.addEventListener('/', () => {
      this.page = 'my-home' // присвоить значение
    })

    // добавить элементу myRoute обработчик события "/about"
    myRoute.addEventListener('/about', () => {
      this.page = 'my-about' // присвоить значение
    })

    // добавить элементу myRoute обработчик события "/contacts"
    myRoute.addEventListener('/contacts', () => {
      this.page = 'my-contacts' // присвоить значение
    })
  }
}
```

Этот компонент монтируется последним в приложении:

```html
<!-- монтировать компонент MyContent -->
<my-content></my-content>
```

В самом начале класса этого компонента, определяется начальное значение состояния **page**, как показано ниже:

```js
page = 'my-home' // начальное значение состояния
```

Оно соответствует названию компонента страницы MyHome:

```js
// создать класс компонента MyHome
class MyHome {
  static extends = 'div' // элемент монтирования
  static template = '<h2>Главная</h2>'
}
```

В HTML-разметке компонента MyContent происходит создание компонента MyHome с помощью реактивного атрибута ***is***:

```js
// элемент монтирования компонентов
static template = '<div :is="page"></div>'
```

В статическом методе **connected()** компонента MyContent происходит назначение трёх обработчиков для элемента myRoute, как показано ниже:

```js
static connected() {
  // добавить элементу myRoute обработчик события "/"
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // присвоить значение
  })

  // добавить элементу myRoute обработчик события "/about"
  myRoute.addEventListener('/about', () => {
    this.page = 'my-about' // присвоить значение
  })

  // добавить элементу myRoute обработчик события "/contacts"
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // присвоить значение
  })
}
```

Внутри каждого обработчика происходит присвоение состоянию **page** нового значения, соответствующего адресу страницы, на котором сработал данный обработчик, например:

```js
this.page = 'my-about' // присвоить значение
```

Этот обработчик сработает, если адрес страницы соответствует */about*.

Если начальное значение состояния **page** не будет соответствовать названию компонента, например:

```js
page = '' // начальное значение состояния
```

или если предполагается открытие приложения не с главной страницы, а, например, со страницы */about* или любой другой, то рекомендуется добавить в конец статического метода **connected()** компонента MyContent, вызов адресного события для элемента myRoute. Таким образом, маршрутизация будет срабатывать сразу после подключения компонента.

При этом, во втором аргументе методу **$route()** передаётся свойство **href** объекта [location](https://developer.mozilla.org/ru/docs/Web/API/Location), как показано ниже:


```js
static connected() {
  // добавить элементу myRoute обработчик события "/"
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // присвоить значение
  })

  // добавить элементу myRoute обработчик события "/about"
  myRoute.addEventListener('/about', () => {
    this.page = 'my-about' // присвоить значение
  })

  // добавить элементу myRoute обработчик события "/contacts"
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // присвоить значение
  })

  // вызвать событие адреса страницы для элемента myRoute
  this.$route(myRoute, location.href)
}
```

<br>

Для элементов событий, созданных с помощью метода **route()** плагина Reacton, допускается использование символов [регулярных выражений](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp) в названии событий создаваемых методом **addEventListener()**, например:

```js
// добавить элементу myRoute обработчик события "/abo\\w+"
myRoute.addEventListener('/abo\\w+', () => {
  this.page = 'my-about' // присвоить значение
})
```

В данном примере, обработчик будет вызываться для всех страниц, которые начинаются с */abo*.

Важной особенностью создания регулярных выражений в строке является то, что специальные символы необходимо экранировать дважды:

```js
'/abo\\w+'
```

вместо:

```js
'/abo\w+'
```

На внутреннем уровне, такая строка преобразуется в регулярное выражение следующего вида:

```js
/\/abo\w+/
```

<br>

Все обработчики поддерживают [параметры маршрутов](https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs/routes#%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B_%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%BE%D0%B2). Добавьте в HTML-разметку компонента MyMenu новую ссылку:

```js
static template = `
  <nav>
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
    <a href="/contacts">Контакты</a>
    <a href="/ivan/32">Иван</a>
  </nav>
`
```

Создайте новый компонент страницы MyUsers:

```js
// создать класс компонента MyUsers
class MyUsers {
  static extends = 'div' // элемент монтирования
  static mode = 'open' // добавить Теневой DOM

  static template = `
    <slot name="user"></slot>
    <slot name="age"></slot>
  `
}
```

Поскольку этот компонент будет получать в [слоты](https://learn.javascript.ru/slots-composition) HTML-содержимое извне, необходимо было добавить ему [Теневой DOM](https://learn.javascript.ru/shadow-dom), как показано ниже:

```js
static mode = 'open' // добавить Теневой DOM
```

Кроме этого, Теневой DOM необходимо добавить и всем остальным компонентам страниц, чтобы передаваемое через слоты HTML-содержимое в компонент MyUsers, в них не отображалось:

```js
// создать класс компонента MyHome
class MyHome {
  static extends = 'div' // элемент монтирования
  static mode = 'open' // добавить Теневой DOM
  static template = '<h2>Главная</h2>'
}

// создать класс компонента MyAbout
class MyAbout {
  static extends = 'div' // элемент монтирования
  static mode = 'open' // добавить Теневой DOM
  static template = '<h2>О нас</h2>'
}

// создать класс компонента MyContacts
class MyContacts {
  static extends = 'div' // элемент монтирования
  static mode = 'open' // добавить Теневой DOM
  static template = '<h2>Контакты</h2>'
}
```

Передайте класс нового компонента в плагин Reacton:

```js
// передать классы компонентов в плагин Reacton
Reacton(MyHome, MyAbout, MyContacts, MyUsers, MyMenu, MyContent)
```

Внесите изменения в разметку компонента MyContent, добавив вывод HTML-содержимого в именованные слоты с помощью атрибута [slot](https://learn.javascript.ru/slots-composition#imenovannye-sloty), как показано ниже:

```js
// элемент монтирования компонентов
static template = `
  <div :is="page">
    <p slot="user">{{ user }}</p>
    <p slot="age">{{ age }}</p>
  </div>
`
```

Добавьте два новых состояния **user** и **age** для компонента MyContent:

```js
page = 'my-home' // начальное значение состояния
user = ''
age = ''
```

Осталось добавить обработчик для этого адресного события в конце статического метода **connected()** компонента MyContent:

```js
static connected() {
  // добавить элементу myRoute обработчик события "/"
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // присвоить значение
  })

  // добавить элементу myRoute обработчик события "/about"
  myRoute.addEventListener('/abo\\w+', () => {
    this.page = 'my-about' // присвоить значение
  })

  // добавить элементу myRoute обработчик события "/contacts"
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // присвоить значение
  })

  // добавить элементу myRoute обработчик события "/:user/:age"
  myRoute.addEventListener('/:user/:age', event => {
    this.page = 'my-users' // название компонента
    this.user = event.params.user // имя пользователя
    this.age = event.params.age // возраст пользователя
  })
}
```

Параметры задаются в названии обрабатываемого события с помощью символа «:». В примере выше, было задано два параметра: ***:user*** и ***:age***. Они доступны внутри обработчика через свойство **params** объекта [event](https://learn.javascript.ru/introduction-browser-events#obekt-sobytiya), как показано ниже:

```js
this.user = event.params.user // имя пользователя
this.age = event.params.age // возраст пользователя
```

<br>

Кроме параметров маршрутов, обработчики позволяют работать и с параметрами запросов. Добавьте в HTML-разметку компонента MyMenu новую ссылку:

```js
static template = `
  <nav>
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
    <a href="/contacts">Контакты</a>
    <a href="/ivan/32">Иван</a>
    <a href="/ivan?age=32">Возраст</a>
  </nav>
`
```

Добавьте последний обработчик для этого адресного события в конце статического метода **connected()** компонента MyContent:

```js
static connected() {
  // добавить элементу myRoute обработчик события "/"
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // присвоить значение
  })

  // добавить элементу myRoute обработчик события "/about"
  myRoute.addEventListener('/abo\\w+', () => {
    this.page = 'my-about' // присвоить значение
  })

  // добавить элементу myRoute обработчик события "/contacts"
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // присвоить значение
  })

  // добавить элементу myRoute обработчик события "/:user/:age"
  myRoute.addEventListener('/:user/:age', event => {
    this.page = 'my-users' // название компонента
    this.user = event.params.user // имя пользователя
    this.age = event.params.age // возраст пользователя
  })

  // добавить элементу myRoute обработчик события "/:user\\?age=32"
  myRoute.addEventListener('/:user\\?age=32', event => {
    this.page = 'my-users' // название компонента
    this.user = event.params.user // имя пользователя
    this.age = event.url.searchParams.get('age') // возраст пользователя
  })
}
```

Для доступа к параметрам запроса, используется свойство [url](https://learn.javascript.ru/url) объекта [event](https://learn.javascript.ru/introduction-browser-events#obekt-sobytiya). Оно содержит свойство [searchParams](https://learn.javascript.ru/url#searchparams), которое предоставляет удобные методы для работы с параметрами запросов, одним из которых является метод **get()**, как показано ниже:

```js
this.age = event.url.searchParams.get('age') // возраст пользователя
```

<br>

Для демонстрации взаимодействия обработчиков адресных событий с внешним кодом, вместо компонента MyMenu добавьте в разметку файла *index.html* элемент NAV главного меню:

```html
<!-- Главное меню -->
<nav id="mymenu">
  <a href="/">Главная</a>
  <a href="/about">О нас</a>
  <a href="/contacts">Контакты</a>
  <a href="/ivan/32">Иван</a>
  <a href="/ivan?age=32">Возраст</a>
</nav>

<!-- монтировать компонент MyContent -->
<my-content></my-content>
```

Добавьте обработчик события *"click"* для этого меню в конце скрипта:

```js
// добавить для элемента NAV обработчик события "click"
document.querySelector('#mymenu').addEventListener('click', () => {
  // отменить переход по ссылке
  event.preventDefault()

  // вызвать событие адреса ссылки для элемента myRoute
  Reacton.route(myRoute, event.target.href)
})

// передать классы компонентов в плагин Reacton
Reacton(MyHome, MyAbout, MyContacts, MyUsers, MyContent)
```

Внутри этого обработчика, адресное событие для элемента myRoute вызывается с помощью метода **route()** самого плагина:

```js
// вызвать событие адреса ссылки для элемента myRoute
Reacton.route(myRoute, event.target.href)
```

а не специального метода **$route()**, который доступен только в компонентах, но по своей сути, просто является ссылкой на метод **route()** плагина Reacton.

Ниже представлено полное содержимое файла *index.html*:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- Главное меню -->
  <nav id="mymenu">
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
    <a href="/contacts">Контакты</a>
    <a href="/ivan/32">Иван</a>
    <a href="/ivan?age=32">Возраст</a>
  </nav>

  <!-- монтировать компонент MyContent -->
  <my-content></my-content>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script>
    // создать элемент события myRoute
    const myRoute = new Reacton.route()

    // создать класс компонента MyHome
    class MyHome {
      static extends = 'div' // элемент монтирования
      static mode = 'open' // добавить Теневой DOM
      static template = '<h2>Главная</h2>'
    }

    // создать класс компонента MyAbout
    class MyAbout {
      static extends = 'div' // элемент монтирования
      static mode = 'open' // добавить Теневой DOM
      static template = '<h2>О нас</h2>'
    }

    // создать класс компонента MyContacts
    class MyContacts {
      static extends = 'div' // элемент монтирования
      static mode = 'open' // добавить Теневой DOM
      static template = '<h2>Контакты</h2>'
    }

    // создать класс компонента MyUsers
    class MyUsers {
      static extends = 'div' // элемент монтирования
      static mode = 'open' // добавить Теневой DOM

      static template = `
        <slot name="user"></slot>
        <slot name="age"></slot>
      `
    }

    // создать класс компонента MyContent
    class MyContent {
      page = 'my-home' // начальное значение состояния
      user = ''
      age = ''

      // элемент монтирования компонентов
      static template = `
        <div :is="page">
          <p slot="user">{{ user }}</p>
          <p slot="age">{{ age }}</p>
        </div>
      `

      static connected() {
        // добавить элементу myRoute обработчик события "/"
        myRoute.addEventListener('/', () => {
          this.page = 'my-home' // присвоить значение
        })

        // добавить элементу myRoute обработчик события "/about"
        myRoute.addEventListener('/about', () => {
          this.page = 'my-about' // присвоить значение
        })

        // добавить элементу myRoute обработчик события "/contacts"
        myRoute.addEventListener('/contacts', () => {
          this.page = 'my-contacts' // присвоить значение
        })

        // добавить элементу myRoute обработчик события "/:user/:age"
        myRoute.addEventListener('/:user/:age', event => {
          this.page = 'my-users' // название компонента
          this.user = event.params.user // имя пользователя
          this.age = event.params.age // возраст пользователя
        })

        // добавить элементу myRoute обработчик события "/:user\\?age=32"
        myRoute.addEventListener('/:user\\?age=32', event => {
          this.page = 'my-users' // название компонента
          this.user = event.params.user // имя пользователя
          this.age = event.url.searchParams.get('age') // возраст пользователя
        })

        // вызвать событие адреса страницы для элемента myRoute
        this.$route(myRoute, location.href)
      }
    }

    // добавить для элемента NAV обработчик события "click"
    document.querySelector('#mymenu').addEventListener('click', () => {
      // отменить переход по ссылке
      event.preventDefault()

      // вызвать событие адреса ссылки для элемента myRoute
      Reacton.route(myRoute, event.target.href)
    })

    // передать классы компонентов в плагин Reacton
    Reacton(MyHome, MyAbout, MyContacts, MyUsers, MyContent)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="ssr">SSR</h2>

<br>

[SSR](https://academy.yandex.com/journal/server-side-rendering) - это метод отрисовки веб-страницы на сервере, а не в браузере. Для реализации рендеринга Веб-компонентов, используется пакет [jsdom](https://github.com/jsdom/jsdom) - виртуализации DOM в JavaScript.

Перед тем, как переходить к рендерингу на сервере, давайте ознакомимся в браузере с функцией, которая за него отвечает.

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component>
    <p>Веб-компоненты - это просто!</p>
  </my-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script type="module">
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      static mode = 'open' // добавить Теневой DOM

      static template = `
        <h1>Привет, {{ message }}!</h1>
        <slot></slot>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // передать класс компонента MyComponent в плагин Reacton
    Reacton(MyComponent)

    // выполнить рендеринг HTML-содержимого страницы
    const html = await Reacton.ssr()

    // вывести отрендеренное содержимое в консоль
    console.log(html)
  </script>
</body>
</html>
```

Метод **ssr()** плагина Reacton выполняет рендеринг HTML-содержимого страницы. Он возвращает промис, значением которого является строка, содержащая отрендеренное HTML-содержимое:

```js
// выполнить рендеринг HTML-содержимого страницы
const html = await Reacton.ssr()
```

которое будет выведено в консоль браузера:

```
<!DOCTYPE html>
<html lang="ru"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>

  
  <my-component>
          <h1>Привет, Reacton!</h1>
          
    <p>Веб-компоненты - это просто!</p>
  
          
          
        </my-component>

  
  

</body></html>
```

<br>

По умолчанию, метод **ssr()** удаляет все скрипты, стили, комментарии и теги &lt;template&gt; в возвращаемом HTML-содержимом.

Метод **ssr()** принимает один параметр - объект с тремя опциональными свойствами. Добавление свойства **clean** со значением "false":

```js
const html = await Reacton.ssr({ clean: false })
```

отменяет очистку по умолчанию, и всё содержимое выводится как есть:

```
<!DOCTYPE html>
<html lang="ru"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component>
          <h1>Привет, Reacton!</h1>
          
    <p>Веб-компоненты - это просто!</p>
  
          
          <style>
            h1 {
              color: red;
            }
          </style>
        </my-component>

  <!-- подключить плагин Reacton -->
  <script src="reacton.min.js"></script>

  <script type="module">
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Reacton'
      color = 'red'

      static mode = 'open' // добавить Теневой DOM

      static template = `
        <h1>Привет, {{ message }}!</h1>
        <slot></slot>
        
        <style>
          h1 {
            color: {{ color }};
          }
        </style>
      `
    }

    // передать класс компонента MyComponent в плагин Reacton
    Reacton(MyComponent)

    // выполнить рендеринг HTML-содержимого страницы
    const html = await Reacton.ssr({ clean: false })

    // вывести отрендеренное содержимое в консоль
    console.log(html)
  </script>

</body></html>
```

<br>

По умолчанию, метод **ssr()** удаляет все [слоты](https://learn.javascript.ru/slots-composition). Но если добавить свойство **slots** со значением "true":

```js
const html = await Reacton.ssr({ slots: true })
```

то слоты будут выводиться в содержимое :

```
<h1>Привет, Reacton!</h1>
          <slot>
    <p>Веб-компоненты - это просто!</p>
  </slot>
```

<br>

По умолчанию, метод **ssr()** рендерит всю страницу целиком. Но ему можно добавить свойство **node** со значением равным узлу, с которого должен начинаться рендеринг:

```js
const html = await Reacton.ssr({ node: document.body })
```

Тогда в отрендеренное содержимое попадёт только этот узел и всё, что в нём находится:

```
<body>

  
  <my-component>
          <h1>Привет, Reacton!</h1>
          
    <p>Веб-компоненты - это просто!</p>
  
          
          
        </my-component>

  
  

</body>
```

<br>

Теперь можно переходить к теме рендеринга на сервере. Скачайте каталог [server](https://github.com/reacton-js/reacton/tree/main/server) и давайте рассмотрим его содержимое:

Подкаталог *public* содержит все статические файлы сервера, такие как стили, шрифты, изображения, скрипты и т. д.

В файле *bots.js* содержится массив с названиями известных ботов. Этот массив можно изменять по своему усмотрению:

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

Файл *index.html* из каталога *server* является главным файлом приложения:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- монтировать компонент MyMenu -->
  <my-menu></my-menu>

  <!-- элемент Header -->
  <header>
    <img src="img/logo.jpg" alt="logo">
  </header>

  <!-- монтировать компонент MyContent -->
  <my-content></my-content>

  <!-- подключить плагин Reacton -->
  <script src="js/reacton.min.js"></script>

  <script>
    // создать элемент события myRoute
    const myRoute = new Reacton.route()

    // создать класс компонента myHome
    class myHome {
      static extends = 'div' // элемент монтирования
      static mode = 'open' // добавить Теневой DOM
      static template = `<h2>Главная</h2>`
    }

    // создать класс компонента myAbout
    class myAbout {
      static extends = 'div' // элемент монтирования
      static mode = 'open' // добавить Теневой DOM

      static async template() {
        // получить данные через одну секунду после вызова метода
        const message = await new Promise(ok => setTimeout(() => ok('О нас'), 1000))

        return `<h2>${message}</h2>`
      }
    }

    // создать класс компонента myContacts
    class myContacts {
      static extends = 'div' // элемент монтирования
      static mode = 'open' // добавить Теневой DOM
      static template = `<h2>Контакты</h2>`
    }

    // создать класс компонента MyMenu
    class MyMenu {
      static mode = 'open' // добавить Теневой DOM

      static template = `
        <nav>
          <a href="/">Главная</a>
          <a href="/about">О нас</a>
          <a href="/contacts">Контакты</a>
        </nav>
      `

      static connected() {
        // добавить для элемента NAV обработчик события "click"
        this.$('nav').addEventListener('click', event => {
          // отменить переход по ссылке
          event.preventDefault()

          // вызвать событие адреса ссылки для элемента myRoute
          this.$route(myRoute, event.target.href)
        })
      }
    }

    // создать класс компонента MyContent
    class MyContent {
      page = 'my-home' // начальное значение состояния

      static mode = 'open' // добавить Теневой DOM

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
        // добавить элементу myRoute обработчик события "/"
        myRoute.addEventListener('/', () => {
          this.page = 'my-home' // присвоить значение
        })

        // добавить элементу myRoute обработчик события "/about"
        myRoute.addEventListener('/about', () => {
          this.page = 'my-about' // присвоить значение
        })

        // добавить элементу myRoute обработчик события "/contacts"
        myRoute.addEventListener('/contacts', () => {
          this.page = 'my-contacts' // присвоить значение
        })

        // вызвать событие адреса страницы для элемента myRoute
        this.$route(myRoute, location.href)
      }
    }

    // передать классы компонентов в плагин Reacton
    Reacton(myHome, myAbout, myContacts, MyMenu, MyContent)
  </script>
</body>
</html>
```

Этот файл представляет собой немного изменённый маршрутизатор из прошлой главы. Все компоненты имеют открытый [Теневой DOM](https://learn.javascript.ru/shadow-dom), поскольку компоненты с закрытым Теневым DOM не рендерятся.

Компонент MyContent имеет селектор [:host](https://learn.javascript.ru/shadow-dom-style#host) для стилизации элемента компонента:

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

Кроме этого, компонент myAbout имитирует загрузку данных с сервера через одну секунду:

```js
static async template() {
  // получить данные через одну секунду после вызова метода
  const message = await new Promise(ok => setTimeout(() => ok('О нас'), 1000))

  return `<h2>${message}</h2>`
}
```

<br>

*Если вы планируете в будущем использовать асинхронные скрипты с типом [module](https://learn.javascript.ru/modules-intro) на странице своего приложения, то обратитесь к [руководству](https://github.com/jsdom/jsdom#asynchronous-script-loading) по jsdom.*

*Используйте в скриптах и компонентах для запросов объект [XMLHttpRequest](https://learn.javascript.ru/xmlhttprequest) вместо метода [fetch()](https://learn.javascript.ru/fetch), поскольку последний приводит к ошибкам при рендеринге.*

```js
// вместо метода fetch()
const response = await fetch('file.txt')
const file = await response.text()

// используйте объект XMLHttpRequest
const xhr = new XMLHttpRequest()
xhr.open('GET', 'file.txt')
xhr.send()
const file = await new Promise(ok => xhr.onload = () => ok(xhr.response))
```

<br>

Самым главным файлом для сервера из каталога *server*, является файл *server.js*, который представляет собой обычное приложение [Express](https://expressjs.com/ru/), как показано ниже:

```js
const express = require('express')
const { readFile } = require('fs/promises')
const jsdom = require('jsdom')
const { JSDOM } = require('jsdom')
const port = process.env.PORT || 3000

// создать объект приложения Express
const app = express()

// определить каталог для статических файлов
app.use(express.static(__dirname + '/public'))

// получить массив названий ботов из внешнего файла
const arrBots = require('./bots.js')

// определить строку агента бота для тестирования
const botAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

// определить регулярное выражение для поиска названий ботов в строке
const regBots = new RegExp(`(${arrBots.join(')|(')})`, 'i')

// поиск расширений файлов скриптов
const regJS = /\.m?js$/

// загружает только скрипты и игнорирует все остальные ресурсы
class CustomResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    return regJS.test(url) ? super.fetch(url, options) : null
  }
}

// обработать фавикон
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

// обработать все остальные запросы
app.use(async (req, res) => {
  // определить пользовательского агента
  const userAgent = (process.argv[2] == 'bot') ? botAgent : req.get('User-Agent')
  
  // если запрос исходит от бота
  if (regBots.test(userAgent)) {
    // определить полный URL запроса
    const fullURL = req.protocol + '://' + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

    // загрузить файл главной страницы приложения
    const file = await readFile(__dirname + '/index.html')

    // определить новый объект JSDOM с параметрами
    const dom = new JSDOM(file.toString(), {
      url: fullURL, // установить URL страницы
      resources: new CustomResourceLoader(), // загрузка только скриптов
      runScripts: 'dangerously', // разрешить выполнять скрипты страницы
    })

    // получить отрендеренное HTML-содержимое страницы
    const html = await new Promise(ok => dom.window.onload = () => dom.window.Reacton.ssr().then(ok))

    // вернуть отрендеренное HTML-содержимое
    res.send(html)
  }

  // иначе, если запрос исходит от пользователя
  else {
    // вернуть файл главной страницы приложения
    res.sendFile(__dirname + '/index.html')
  }
})

// запустить сервер
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))
```

<br>

Все запросы в нём обрабатываются в методе **use()**. Сначала идёт определение пользовательского агента:

```js
// определить пользовательского агента
const userAgent = (process.argv[2] == 'bot') ? botAgent : req.get('User-Agent')
```

Это позволяет протестировать сервер в режиме бота. Затем, если запрос происходит от бота, то выполняется следующий блок кода:

```js
// если запрос исходит от бота
if (regBots.test(userAgent)) {
  // определить полный URL запроса
  const fullURL = req.protocol + '://' + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

  // загрузить файл главной страницы приложения
  const file = await readFile(__dirname + '/index.html')

  // определить новый объект JSDOM с параметрами
  const dom = new JSDOM(file.toString(), {
    url: fullURL, // установить URL страницы
    resources: new CustomResourceLoader(), // загрузка только скриптов
    runScripts: 'dangerously', // разрешить выполнять скрипты страницы
  })

  // получить отрендеренное HTML-содержимое страницы
  const html = await new Promise(ok => dom.window.onload = () => dom.window.Reacton.ssr().then(ok))

  // вернуть отрендеренное HTML-содержимое
  res.send(html)
}
```

<br>

В нём определяется полный URL запроса, загружается файл главной страницы приложения и формируется новый объект jsdom:

```js
// определить полный URL запроса
const fullURL = req.protocol + '://' + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

// загрузить файл главной страницы приложения
const file = await readFile(__dirname + '/index.html')

// определить новый объект JSDOM с параметрами
const dom = new JSDOM(file.toString(), {
  url: fullURL, // установить URL страницы
  resources: new CustomResourceLoader(), // загрузка только скриптов
  runScripts: 'dangerously', // разрешить выполнять скрипты страницы
})
```

<br>

После этого, в виртуальном DOM созданного объекта запускается метод **ssr()** плагина Reacton, который возвращает промис, значением которого является отрендеренное HTML-содержимое страницы в виде строки:

```js
// получить отрендеренное HTML-содержимое страницы
const html = await new Promise(ok => dom.window.onload = () => dom.window.Reacton.ssr().then(ok))
```

Эта строка отдаётся боту:

```js
// вернуть отрендеренное HTML-содержимое
res.send(html)
```

<br>

Если запрос исходит от пользователя, а не от бота, то ему просто возвращается главный файл приложения:

```js
// иначе, если запрос исходит от пользователя
else {
  // вернуть файл главной страницы приложения
  res.sendFile(__dirname + '/index.html')
}
```

<br>

Теперь перейдите в каталог *server* с помощью терминала или откройте терминал в этом каталоге, и в терминале введите команду:

```
npm i
```

Это установит все зависимости. Для запуска приложения, введите команду:

```
node server
```

Это запустит сервер в обычном режиме. Чтобы протестировать сервер в режиме бота, введите команду:

```
node server bot
```

Для просмотра отрендеренного содержимого, перейдите в режим исходного кода в браузере с помощью комбинации клавиш Ctrl + U.

<br>
<br>