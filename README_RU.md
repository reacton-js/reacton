<br>

[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

![reacton](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Reacton⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.min.js)

<br>

Reacton - это плагин JavaScript для быстрого создания реактивных [Веб-компонентов](https://learn.javascript.ru/web-components). Плагин поддерживает все технологии, методы и свойства, такие, например, как [слоты](https://learn.javascript.ru/slots-composition) и [Теневой DOM](https://learn.javascript.ru/shadow-dom), которые предоставляются стандартными Веб-компонентами.

Ниже представлен пример простого компонента:

```html
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

1. [Быстрый старт](#quick-start)
2. [Класс компонента](#component-class)
3. [Специальные свойства](#special-properties)
4. [Общие методы](#general-methods)
5. ~~[Циклы](#cycles)~~
6. ~~[Стили](#styles)~~
7. ~~[Слоты](#slots)~~
8. ~~[События](#events)~~
9. ~~[Маршруты](#routes)~~
10. ~~[SSR](#ssr)~~

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
    // передать шаблон компонента MyComponent в плагин Reaction
    Reacton(document.querySelector('.MyComponent'))
  </script>
</body>
</html>
```

В данном примере, название класса компонента определяется из названия первого класса шаблона.

<br>

Компоненты можно создавать во внешних файлах, что особенно удобно при использовании систем сборки. Вы можете настроить свою или [скачать](https://github.com/reacton-js/reacton/tree/main/webpack) уже готовую систему сборки на основе [webpack](https://webpack.js.org/).

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

    // передать содержимое файла компонента MyComponent в плагин Reaction
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

<br>
<br>
<h2 id="component-class">Класс компонента</h2>

<br>

Название класса компонента определяет название компонента в DOM. Например, класс MyComponent или myComponent, будет соответствовать названию *my-component* в DOM. Каждый класс компонента, может содержать не обязательное статическое свойство **name**, которое определяет название этого класса.

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

Название класса может быть указано в верблюжьей, как в примере выше, или шашлычной нотации:

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

Статическое свойство **template** можеть быть методом, который выполняется в контексте объекта состояния компонента, что позволяет ссылаться на свойства этого объекта с помощью ключевого слова *this* и используя шаблонные строки, например:

```js
static template() {
  return `
    <h1>Привет, ${ this.message }!</h1>
    
    <style>
      h1 {
        color: ${ this.color };
      }
    </style>
  `
}
```

Внутри шаблонных строк можно использовать [подстановки](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals#%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BF%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D1%8F_%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9) для выставки любых выражений:

```js
${ 5 + 6 }
```

Метод **template()**, как и все рассмотренные далее статические методы класса компонента, может быть асинхронным. В примере ниже, имитируется загрузка данных с сервера:

```js
static async template() {
  // получить данные через одну секунду после вызова метода
  const message = await new Promise(ok => setTimeout(() => ok('Веб-компоненты'), 1000))

  return `
    <h1>Привет, ${ message }!</h1>
    
    <style>
      h1 {
        color: ${ this.color };
      }
    </style>
  `
}
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

Данный тип компонентов является наиболее защищённым, поскольку доступ к состоянию и DOM такого компонента, возможен только из статических методов или шаблона класса.

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

Назначение этих значений свойствам объекта состояния присходит в методе **changed()**, который вызывается каждый раз, при назначении/изменении значений отслеживаемым атрибутам:

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

Статические методы **before()** и **after()** вызываются *Перед* и *После* обновления DOM компонента, с помощью специального метода **$update()**, например:

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

В отличие от методов и свойств определяемых пользователем в классе компонента, специальные методы и свойства определяются на внутреннем уровне компонента и всегда начинаются со знака доллара. Не рекомендуется давать состояниям имена, совпадающие с именами специальных свойств. Это может приводить к ошибкам.

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

<br>

Свойство **$state** позволяет получить/установить значение любого состояния напрямую. Для закрытых компонентов, вызов этого свойства извне статических методов, возвращает значение «undefined».

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

Внутри строки статического свойства **template**, доступ к свойствам компонента, а не состояния, например, к свойству [attributes](https://developer.mozilla.org/ru/docs/Web/API/Element/attributes), осуществляется с помощью ключевого слова *this*, как показано ниже:

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
      message = 'Reacton'
      color = 'red'

      static template = `
        <h1>Привет, {{ message }} 
          от компонента {{ this.attributes['id'].value.toUpperCase() }}!</h1>
        
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

Метод **$()**  является сокращённым аналогом метода [querySelector()](https://learn.javascript.ru/searching-elements-dom#querySelector) и применяется для быстрого доступа к элементу DOM компонента. Для закрытых компонентов, вызов этого метода извне статических методов, возвращает значение «null».

Например, для назначения слушателя события:

```js
// вызывается при добавлении компонента в документ
static connected() {
  // вывести в консоль элемент породивший событие
  this.$('h1').addEventListener('click', event => console.log(event.target))
}
```

Метод **$$()**  является сокращённым аналогом метода [querySelectorAll()](https://learn.javascript.ru/searching-elements-dom#querySelectorAll) и применяется для быстрого доступа к элементу DOM компонента. Для закрытых компонентов, вызов этого метода извне статических методов, возвращает значение «null».

Например, для перебора коллекции элементов:

```js
// вызывается при добавлении компонента в документ
static connected() {
  // вывести в консоль все элементы параграфов
  this.$$('p').forEach(elem => console.log(elem))
}
```

<br>

Метод **$event()** применяется для создания пользовательских событий, позволяющих различным компонентам взаимодействовать между собой, а метод **\$route()** используется для построения маршрутизации. Они будут рассмотрены позже, поскольку требуют для своего пояснения отдельных глав.

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

<br>
<br>