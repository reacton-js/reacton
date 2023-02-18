[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

![rigl](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Reacton⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/dist/reacton.js)

<br>

Reacton - это JavaScript-библиотека для создания приложений на основе реактивных [Веб-компонентов](https://learn.javascript.ru/web-components) с возможностью рендеринга на стороне сервера. Reacton является открытой библиотекой и распространяется под лицензией [MIT](https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_MIT). Библиотека содержит [Маршрутизатор](https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F) и предоставляет [Наблюдателя](https://ru.wikipedia.org/wiki/%D0%9D%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для взаимодействия между различными компонентами приложения. Осуществляет поддержку однофайловых компонентов и многоуровневых циклов.

*Вторая версия библиотеки была полностью переписана и поэтому не может правильно взаимодействовать с компонентами, написанными для первой. В ней исправлены ошибки, обновлены атрибуты и переработаны проблемные моменты кода из предыдущей версии.*

Ниже представлен пример простого однофайлового компонента:

```html
<r-hello>
  <h1>Привет, {{ message }}!</h1>

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

1. [Быстрый старт](#quick-start)
2. [Объект компонента](#component-object)
3. ~~[Привязка данных](#data-binding)~~
4. ~~[Циклы](#cycles)~~
5. ~~[Отображения](#displays)~~
6. ~~[Дочерние компоненты](#child-components)~~
7. ~~[Наблюдатель](#observer)~~
8. ~~[Маршрутизатор](#router)~~
9. ~~[Рендеринг](#rendering)~~

<br>
<hr>
<br>

<h2 id="quick-start">Быстрый старт</h2>

<br>

Reacton позволяет создавать компоненты нескольких типов: Встроенные, Модульные, Шаблонные и Однофайловые компоненты. Мы начнём со Встроенных компонентов. Создайте новый рабочий каталог, например, с названием *app*, и скачайте в этот каталог файл [reacton.js](https://raw.githubusercontent.com/reacton-js/reacton/main/dist/reacton.js).

Добавьте в каталог файл *index.html* со следующим содержимым:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент Hello -->
  <r-hello></r-hello>
  
  <!-- подключить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // создать объект компонента Hello
    const Hello = {
      name: 'r-hello',
      data() {
        return {
          message: 'Reacton'
        }
      },
      html: `
        <h1>Привет, {{ message }}!</h1>
      `
    }

    // передать объект компонента Hello в библиотеку Reacton
    Reacton(Hello)
  </script>
</body>
</html>
```

Чтобы гарантировать отсутствие конфликтов имён между стандартными и пользовательскими HTML-элементами, имя компонента должно содержать дефис "-", например, my-element и super-button – это правильные имена, а myelement – нет.

Открыв файл *index.html* в браузере, на экране отобразится созданное в компоненте Hello сообщение:

> <h1>Привет, Reacton!</h1>

<br>

В этом примере был создан простой, встроенный в общий скрипт компонент. Давайте теперь вынесем этот компонент в отдельный модуль. 

Создайте в каталоге *app* файл *Hello.js* со следующим содержимым:

```js
// экспортировать объект компонента Hello
export const Hello = {
  name: 'r-hello',
  data() {
    return {
      message: 'Reacton'
    }
  },
  html: `
    <h1>Привет, {{ message }}!</h1>
  `
}
```

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент Hello -->
  <r-hello></r-hello>
  
  <!-- подключить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script type="module">
    // импортировать объект компонента Hello
    import { Hello } from './Hello.js'

    // передать объект компонента Hello в библиотеку Reacton
    Reacton(Hello)
  </script>
</body>
</html>
```

Для работы с Модульными и Однофайловыми компонентами, нам потребуется любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server).

Установите данный сервер с помощью команды в терминале:

```
npm install --global lite-server
```

Теперь перейдите в каталог *app* с помощью терминала или откройте терминал в этом каталоге, и в терминале введите команду:

```
lite-server
```

После этого откроется окно браузера по умолчанию, в котором будет отображаться показанное выше приветственное сообщение:

> <h1>Привет, Reacton!</h1>

<br>

Ещё один тип компонентов, который мы сейчас рассмотрим, позволяет определять компоненты во внешних файлах с расширением *.htm*. Однофайловые компоненты используют для своего описания простой HTML-синтаксис.

Создайте в каталоге *app* файл *Hello.htm* со следующим содержимым:

```html
<r-hello>
  <h1>Привет, {{ message }}!</h1>

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

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент Hello -->
  <r-hello></r-hello>
  
  <!-- подключить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // передать путь к файлу компонента Hello в библиотеку Reacton
    Reacton('Hello.htm')
  </script>
</body>
</html>
```

Перейдите в каталог *app* с помощью терминала или откройте терминал в этом каталоге, и в терминале введите команду:

```
lite-server
```

Снова откроется окно браузера по умолчанию, в котором будет отображаться приветственное сообщение:

> <h1>Привет, Reacton!</h1>

<br>

В функцию Reacton можно передавать любое количество аргументов, представляющих собой разные типы компонентов. Например, создайте в файле *index.html* встроенный компонент Bye:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент Hello -->
  <r-hello></r-hello>

  <!-- монтировать компонент Bye -->
  <r-bye></r-bye>
  
  <!-- подключить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // создать объект компонента Bye
    const Bye = {
      name: 'r-bye',
      html: `
        <p>Пока, простые Веб-компоненты...</p>
      `
    }

    // передать путь к файлу компонента Hello и объект компонента Bye
    Reacton('Hello.htm', Bye)
  </script>
</body>
</html>
```

<br>

Шаблонный тип компонентов позволяет сочетать простоту синтаксиса HTML и отсутствие в необходимости запускать приложение через сервер. Шаблонные компоненты определяются в элементе TEMPLATE с необязательным атрибутом ***name***.

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент Hello -->
  <r-hello></r-hello>

  <!-- шаблон компонента Hello -->
  <template name="r-hello">
    <h1>Привет, {{ message }}!</h1>

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
  
  <!-- подключить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // передать шаблон компонента Hello в библиотеку Reacton
    Reacton(document.querySelector('template[name="r-hello"]'))
  </script>
</body>
</html>
```

Название Шаблонного компонента можно передать не в атрибуте, а в свойстве **name** его экспортируемого объекта, как это делается для Встроенных компонентов, например:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
</head>
<body>
  <!-- монтировать компонент Hello -->
  <r-hello></r-hello>

  <!-- шаблон компонента Hello -->
  <template>
    <h1>Привет, {{ message }}!</h1>

    <script>
      exports = {
        name: 'r-hello', // название компонента
        data() {
          return {
            message: 'Reacton'
          }
        }
      }
    </script>
  </template>
  
  <!-- подключить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // передать шаблон компонента Hello в библиотеку Reacton
    Reacton(document.querySelector('template'))
  </script>
</body>
</html>
```

<br>

Независимо от типа, все компоненты в Reacton являются реактивными. В этом легко убедиться, если изменить значение пользовательского свойства **message** компонента Hello в консоли браузера. Для доступа к любым пользовательским данным компонента, применяется специальное свойство **$data**.

Чтобы получить доступ к этому свойству, вначале необходимо выбрать элемент компонента. Для упрощения поставленной задачи, назначим тегу монтирования компонента Hello атрибут ***id*** со значением "hello", как показано ниже:

```html
<!-- монтировать компонент Hello -->
<r-hello id="hello"></r-hello>
```

Теперь откройте консоль браузера, обычно это делается сочетанием клавиш Ctrl + Shift + I, и введите следующую команду:

```
hello.$data.message = 'Реактивные компоненты'
```

После нажатия клавиши Enter, старое сообщение в браузере изменится на новый приветственный заголовок:

> <h1>Привет, Реактивные компоненты!</h1>

<br>
<br>
<h2 id="component-object">Объект компонента</h2>

<br>

Каждый объект Встроенного и Модульного компонента, должен содержать обязательное свойство **name**, которое определяет название компонента, как показано ниже:

```js
const Hello = {
  name: 'r-hello'
}
```

В Шаблонных компонентах, вместо свойства **name** можно использовать одноимённый атрибут:

```html
<template name="r-hello">
```

а в Однофайловых, имя компонента определяется по названию элемента, в который заключён компонент:

```html
<r-hello>
```

<br>

Метод **data()** должен возвращать объект с пользовательскими данными (свойствами и методами) компонента:

```js
data() {
  return {
    message: 'Reacton',
    printHello() {
      return 'Привет, Мир!'
    }
  }
}
```

Этот метод может быть асинхронным. В примере ниже, для пользовательского свойства **message** имитируется получение данных от сервера:

```js
async data() {
  const message = await new Promise(ok => setTimeout(() => ok('Reacton'), 1000))

  return {
    message
  }
}
```

<br>

Для Встроенных и Модульных компонентов, свойство **html** содержит HTML-содержимое компонента в виде строки:

```js
html: `
  <h1>Привет, {{ message }}!</h1>
`
```

HTML-cодержимое Шаблонных и Однофайловых компонентов, определяется их внутренней разметкой:

```html
<h1>Привет, {{ message }}!</h1>
```

<br>

По умолчанию, все компоненты создаются без [Теневого DOM](https://learn.javascript.ru/shadow-dom). Свойство **mode** определяет [уровень инкапсуляции](https://learn.javascript.ru/shadow-dom#tenevoe-derevo) компонента для использования [локальных стилей](https://learn.javascript.ru/shadow-dom-style) и может иметь значение либо "open", либо значение "closed":

```js
mode: 'open'
```

В Шаблонных и Однофайловых компонентах, данное свойство может быть заменено атрибутом ***mode***:

```html
<r-hello mode="closed">
```

<br>

Свойство **extends** позволяет [монтировать компонент](https://learn.javascript.ru/custom-elements#modifitsirovannye-vstroennye-elementy) в стандартный HTML-элемент:

```js
extends: 'header'
```

В Шаблонных и Однофайловых компонентах, данное свойство может быть заменено атрибутом ***extends***:

```html
<r-hello extends="header">
```

Элемент, в который монтируется компонент, должен содержать атрибут ***is*** со значением, соответствующим названию компонента, который в него монтируется:

```html
<header is="r-hello"></header>
```

<br>

Свойство **attributes** содержит массив с названиями атрибутов при изменении которых, будет вызываться метод **changed()**, например:

```js
attributes: ['title'],

changed(name, oldValue, newValue) {
  console.log(name, oldValue, newValue)
}
```

Отслеживаемые атрибуты являются технологией Веб-компонентов, а метод **changed()** - сокращённым аналогом метода [attributeChangedCallback()](https://learn.javascript.ru/custom-elements).

Добавьте атрибут ***title*** к элементу монтирования компонента Hello в файле *index.html*, как показано ниже:

```html
<r-hello id="hello" title="Привет"></r-hello>
```

Теперь введите в консоли браузера команду:

```
hello.title = 'Пока'
```

После нажатия клавиши Enter, метод **changed()** выведет на консоль следующую строку:

```
title Привет Пока
```

<br>

Методы **connected()**, **disconnected()** и **adopted()** - являются сокращёнными аналогами методов [connectedCallback(), disconnectedCallback() и adoptedCallback()](https://learn.javascript.ru/custom-elements).

Они вызываются при добавлении компонента в документ - метод **connected()**; удалении компонента из документа - метод **disconnected()**; и при перемещении компонента в новый документ - метод **adopted()**.

К наиболее часто применяемым методам, можно отнести метод **connected()**, который позволяет обратиться к HTML-содержимому компонента, после добавления в него реактивных связей и вывода этого содержимого на экран браузера:

```js
connected() {
  console.log(this.$('h1'))
}
```

В данном примере, на консоль браузера выводится выбранный элемент H1 с помощью вспомогательного метода **$()**, который доступен в методе **connected()** через ключевое слово *this*. Этот метод является сокращённым аналогом метода [querySelector()](https://learn.javascript.ru/searching-elements-dom#querySelector).

Второй вспомогательный метод называется **$$()** и является сокращённым аналогом метода [querySelectorAll()](https://learn.javascript.ru/searching-elements-dom#querySelectorAll), как показано ниже:

```js
connected() {
  console.log(this.$$('h1')[0])
}
```

Для доступа к пользовательским данным, внутри методов объекта компонента применяется ключевое слово *this*, поскольку все эти методы выполняются в контексте объекта данных компонента. Кроме этого, все рассмотренные выше методы могут быть асинхронными. 

В примере ниже, пользовательскому свойству **message** присваивается новое значение через одну секунду после добавления компонента в документ:

```js
async connected() {
  this.message = await new Promise(ok => setTimeout(() => ok('Реактивные компоненты'), 1000))
}
```

<br>

Методы **before()** и **after()** вызываются *Перед* и *После* изменения значений пользовательских данных компонента, например:

```js
before() {
  console.time('Update')
},

after() {
  console.timeEnd('Update')
}
```

Если теперь ввести в консоли браузера команду:

```
hello.$data.message = 'Реактивные компоненты'
```

то после нажатия клавиши Enter, на консоль будет выведено время, за которое обновилось значение пользовательского свойства **message**:

```
Update: 0.215087890625 ms
```

<br>

Последнее свойство, которое можно определить в объекте любого компонента, называется **mixins** и позволяет создавать общие для всех одноимённых компонентов свойства и методы:

```js
mixins: {
  printMessage() {
    return this.message
  }
}
```

Теперь метод **printMessage()** будет доступен всем компонентам Hello. Для обращения к свойствам и методам примеси, внути разметки компонента применяется специальное свойство **$mixins**, после которого, через точку указывается название запрашиваемого метода или свойства:

```html
<h1>Привет, {{ $mixins.printMessage() }}!</h1>
```

Примеси работают следующим образом. Сначала свойства запрашиваются в локальном объекте **mixins**, который мы создали выше, затем, свойство запрашивается в глобальном объекте примесей, который мы создадим далее, и в конце, свойство запрашивается в объекте данных компонента.

По этой причине, внутри метода **printMessage()** мы смогли получить доступ к пользовательскому свойству **message** через ключевое слово *this*, как показано ниже:

```js
printMessage() {
  return this.message
}
```

Чтобы создаваемые методы и свойства были доступны всем компонента, а не только одноимённым, необходимо определить для них глобальную примесь через функцию Reacton и её свойство **mixins**.

Это необходимо сделать до того, как компоненты будут переданы в эту функцию для их определения в приложении:

```js
// глобальная примесь
Reacton.mixins = {
  printMessage() {
    return this.message
  }
}

// передать компоненты Hello и Bye в библиотеку Reacton
Reacton(Hello, Bye)
```

Независимо от типа создаваемой примеси, все определяемые в ней методы и свойства не являются реактивными, в отличие от объекта данных компонента.

<br>
<br>