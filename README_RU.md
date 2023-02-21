<br>

[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

![rigl](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Reacton⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/dist/reacton.js)

<br>

Reacton - это JavaScript-библиотека для создания приложений на основе реактивных [Веб-компонентов](https://learn.javascript.ru/web-components), с возможностью рендеринга на стороне сервера. Reacton является открытой библиотекой и распространяется под лицензией [MIT](https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_MIT). Библиотека содержит [Маршрутизатор](https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F) и предоставляет [Наблюдателя](https://ru.wikipedia.org/wiki/%D0%9D%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для взаимодействия между различными компонентами приложения. Осуществляет поддержку однофайловых компонентов и многоуровневых циклов.

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
3. [Привязка данных](#data-binding)
4. [Циклы](#cycles)
5. [Реактивное монтирование](#reactive-mount)
6. [Дочерние компоненты](#child-components)
7. [Пользовательские события](#custom-events)
8. [Особенности работы](#features-work)
9. ~~[Маршрутизатор](#router)~~
10. ~~[Рендеринг](#rendering)~~

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

Чтобы получить доступ к этому свойству, вначале необходимо выбрать элемент компонента. Для упрощения поставленной задачи, назначим элементу монтирования компонента Hello атрибут ***id*** со значением "hello", как показано ниже:

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

Для доступа к пользовательским данным, внутри методов объекта компонента применяется ключевое слово *this*, поскольку все эти методы выполняются в контексте объекта данных компонента.

Если необходимо получить доступ к самому компоненту, то применяется специальное свойство **$host**, которое ссылается на элемент монтирования компонента:

```js
connected() {
  console.log(this.$host)
}
```

Кроме этого, все рассмотренные выше методы могут быть асинхронными. 

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
<h2 id="data-binding">Привязка данных</h2>

<br>

Для связывания пользовательских данных компонента с его HTML-содержимым, везде, кроме атрибутов, применяются двойные фигурные скобки, внутри которых располагаются выражения JavaScript, как показано ниже:

```html
<r-hello>
  <h1>Привет, {{ message.toUpperCase() }}!</h1>
  <p>Температура на улице {{ 5 + 17 - 3 }} градусов...</p>

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

В Reacton можно связывать с данными что угодно. Добавьте пользовательское свойство **tag** в объект данных компонента:

```js
data() {
  return {
    tag: 'h1', // селектор стилей
    message: 'Reacton',
    mainColor: 'red'
  }
}
```

Теперь внесите изменения в содержимое тега STYLE внутри компонента Hello:

```html
<style>
  {{ tag }} {
    color: {{ mainColor }};
  }
</style>
```

Подробнее о работе со стилями Веб-компонентов, можно прочитать в [руководстве](https://learn.javascript.ru/shadow-dom-style) по их применению.

<br>

Для связывания атрибутов с данными, необходимо перед именем атрибута поставить символ двоеточия:

```html
<h1 :title="message">Привет, {{ message }}!</h1>
```

При использовании связанных атрибутов событий, ключевое слово *this* указывает на объект данных компонента. Чтобы получить элемент, на котором произошло событие, необходимо использовать ключевое слово *event* со свойством **target**, например:

```html
<h1 :onclick="console.log(event.target)">Привет, {{ message }}!</h1>
```

Можно связывать с данными любые атрибуты, в том числе и булевы. Добавьте в объект данных компонента пользовательское свойство **hide**:

```js
data() {
  return {
    message: 'Reacton',
    mainColor: 'red',
    hide: false // невидимость элемента
  }
}
```

Теперь свяжите с этим свойством атрибут ***hidden***:

```html
<h1 :hidden="hide">Привет, {{ message }}!</h1>
```

Добавьте элементу монтирования компонента Hello атрибут ***id***, для быстрого доступа к этому компоненту в консоли:

```html
<r-hello id="hello"></r-hello>
```

Введите в консоли браузера следующую команду:

```
hello.$data.hide = true
```

После нажатия клавиши Enter, элемент H1 скроется на экране браузера. Чтобы элемент снова появился, введите команду:

```
hello.$data.hide = false
```

Чтобы не изменять свойство **hide** в консоли, добавьте в содержимое компонента Hello кнопку с привязанным к этому свойству атрибутом ***onclick***, как показано ниже:

```html
<button :onclick="hide = !hide">Скрыть / Показать</button>
```

<br>
<br>
<h2 id="cycles">Циклы</h2>

<br>

Reacton поддерживает три вида циклов *"for"*, которые реализованы в  JavaScript. Все они определяются с помощью специального атрибута ***$for*** и выводят содержимое своих HTML-элементов столько раз, сколько предусмотрено условием цикла.

В примере ниже, цикл *"for"* выводит 10 параграфов с числами от 0 до 9:

```html
<r-hello>
  <div $for="i = 0; i < 10; i++">
    <p>Число: {{ i }}</p>
  </div>
</r-hello>
```

В специальном атрибуте ***$for*** нельзя использовать операторы определения переменных: *var*, *let* и *const* соответственно. Это приведёт к ошибке:

```html
<div $for="var i = 0; i < 10; i++">
  <p>Число: {{ i }}</p>
</div>
```

<br>

Цикл *"for-in"* используется для вывода содержимого объектов, как показано ниже:

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
            name: 'Дмитрий Петров',
            age: 28
          }
        }
      }
    }
  </script>
</r-hello>
```

<br>

Цикл *"for-of"* предназначен для работы с массивами:

```html
<r-hello>
  <ul $for="col of colors">
    <li>{{ col }}</li>
  </ul>

  <script>
    exports = {
      data() {
        return {
          colors: ['красный', 'зелёный', 'синий']
        }
      }
    }
  </script>
</r-hello>
```

<br>

Атрибуты событий HTML-элементов цикла можно привязывать к его переменным:

```html
<r-hello>
  <ul $for="col of colors">
    <li :onclick="console.log(col)">{{ col }}</li>
  </ul>

  <script>
    exports = {
      data() {
        return {
          colors: ['красный', 'зелёный', 'синий']
        }
      }
    }
  </script>
</r-hello>
```

События всегда будут использовать актуальное значение переменной цикла для своей фазы итерации, даже после модификации массива:

```html
<r-hello>
  <button :onclick="colors.reverse()">Обратить массив</button>
  
  <ul $for="col of colors">
    <li :onclick="console.log(col)">{{ col }}</li>
  </ul>

  <script>
    exports = {
      data() {
        return {
          colors: ['красный', 'зелёный', 'синий']
        }
      }
    }
  </script>
</r-hello>
```

<br>

В Reacton можно применять циклы с любой глубиной вложенности:

```html
<r-hello>
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
    exports = {
      data() {
        return {
          users: [
            {
              name: 'Дмитрий Петров',
              age: 28,
              skills: {
                frontend: ['HTML', 'CSS'],
                backend: ['Ruby', 'PHP', 'MySQL']
              }
            },
            {
              name: 'Ольга Иванова',
              age: 25,
              skills: {
                frontend: ['HTML', 'JavaScript'],
                backend: ['PHP']
              }
            },
            {
              name: 'Максим Степанов',
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
<h2 id="reactive-mount">Реактивное монтирование</h2>

<br>

Чтобы компоненты можно было [монтировать](https://learn.javascript.ru/custom-elements#modifitsirovannye-vstroennye-elementy) в стандартные HTML-элементы, необходимо использовать свойство **extends** объекта компонента и атрибут ***is*** элемента, в который монтируется компонент. При этом, атрибут ***is*** является статическим, т.е. после изменения его значения, в элемент, которому он принадлежит, другой компонент не сможет примонтироваться.

Эту проблему можно обойти, если связать атрибут ***is*** с пользовательскими данными.

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
  <!-- монтировать компонент Content -->
  <r-content></r-content>

  <!-- шаблон компонента Content -->
  <template name="r-content">
    <button :onclick="page = 'r-home'">Главная</button>
    <button :onclick="page = 'r-about'">О нас</button>

    <!-- элемент монтирования компонентов -->
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
  
  <!-- шаблон компонента Home -->
  <template name="r-home" extends="article">
    <h2>Главная</h2>
  </template>

  <!-- шаблон компонента About -->
  <template name="r-about" extends="article">
    <h2>О нас</h2>
  </template>
  
  <!-- подключить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // передать шаблоны компонентов в библиотеку Reacton
    Reacton(...document.querySelectorAll('template[name]'))
  </script>
</body>
</html>
```

В этом примере созданы три компонента. Компонент Content содержит внути себя элемент монтирования ARTICLE, с привязанным к свойству **page** атрибутом ***:is***:

```html
<article :is="page"></article>
```

В этот элемент будут монтироваться компоненты Home и About при нажатии соответствующей кнопки:

```html
<button :onclick="page = 'r-home'">Главная</button>
<button :onclick="page = 'r-about'">О нас</button>
```

Для передачи всех шаблонов компонентов с атрибутом ***name*** в функцию Reacton, задействуется метод [querySelectorAll()](https://learn.javascript.ru/searching-elements-dom#querySelectorAll) и [оператор расширения](https://learn.javascript.ru/rest-parameters-spread-operator#spread-operator):

```js
Reacton(...document.querySelectorAll('template[name]'))
```

<br>

Элемент монтирования может включать в себя некое содержимое, которое передаётся в [слоты](https://learn.javascript.ru/slots-composition) монтируемых в него компонентов.

Внесите изменения в компоненты Home и About, добавив им открытый [Теневой DOM](https://learn.javascript.ru/shadow-dom#tenevoe-derevo) с помощью атрибута ***mode*** и два слота, как показано ниже:

```html
<!-- шаблон компонента Home -->
<template name="r-home" extends="article" mode="open">
  <!-- слот для именованного содержимого -->
  <slot name="home"></slot>

  <!-- слот для содержимого по умолчанию -->
  <slot></slot>
</template>

<!-- шаблон компонента About -->
<template name="r-about" extends="article" mode="open">
  <!-- слот для именованного содержимого -->
  <slot name="about"></slot>

  <!-- слот для содержимого по умолчанию -->
  <slot></slot>
</template>
```

Теперь внесите изменения в содержимое элемента монтирования:

```html
<!-- элемент монтирования компонентов -->
<article :is="page">
  <h2 slot="home">Главная</h2>
  <h2 slot="about">О нас</h2>
  <p>Содержимое по умолчанию для всех монтируемых компонентов...</p>
</article>
```

Элемент монтирования не может быть одновременно циклом. Пример ниже приведёт к ошибке:

```html
<article $for="i = 0; i < 10; i++" :is="page">
  <h2 slot="home">Главная</h2>
  <h2 slot="about">О нас</h2>
  <p>Содержимое {{ i }} по умолчанию для всех монтируемых компонентов...</p>
</article>
```

<br>
<br>
<h2 id="child-components">Дочерние компоненты</h2>

<br>

Для доступа к пользовательским данным родительских компонентов, в дочерних компонентах применяется специальное свойство **$parent**, которое ссылается на объект данных родительского компонента.

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
  <!-- монтировать компонент Upper -->
  <r-upper id="upper"></r-upper>

  <!-- шаблон компонента Upper -->
  <template name="r-upper">
    <h1>{{ name }}</h1>

    <!-- монтировать компонент Middle -->
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

  <!-- шаблон компонента Middle -->
  <template name="r-middle">
    <h2>{{ $parent.name }} > {{ name }}</h2>

    <!-- монтировать компонент Lower -->
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
  
  <!-- шаблон компонента Lower -->
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
  
  <!-- подключить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // передать шаблоны компонентов в библиотеку Reacton
    Reacton(...document.querySelectorAll('template[name]'))
  </script>
</body>
</html>
```

Как видно из примера выше, в компоненте Lower свойство **$parent** применяется дважды:

```html
<h3>{{ $parent.$parent.name }} > {{ $parent.name }} > {{ name }}</h3>
```

Первый раз это свойство ссылается на объект данных компонента Middle, внутри которого находится компонент Lower, а второй раз, на объект данных компонента Upper, внутри которого находится компонент Middle.

При изменении свойства в родительском компоненте, эти изменения отразятся и на дочерних компонентах.

Введите в консоли браузера команду:

```
upper.$data.name = 'Wrapper'
```

Чтобы изменить пользовательское свойство родительского компонента из дочернего, необходимо снова использовать специальное свойство **$parent**, как показано ниже:

```
middle.$parent.name = 'Wrapper'
```

```
lower.$parent.$parent.name = 'Wrapper'
```

Однако, если в первом родительском компоненте нет соответствующего свойства, то свойство **$parent** будет искать его в следующем, т.е. в родителе родительского компонента. Что позволяет избежать длинной цепочки написания методов **\$parent**.

Внесите изменения в шаблон компонента Upper, добавив ему массив цветов с именем **colors**, как показано ниже:

```html
<!-- шаблон компонента Upper -->
<template name="r-upper">
  <h1>{{ name }}</h1>

  <!-- вывести в цикле массив цветов -->
  <ul $for="col of colors">
    <li>{{ col }}</li>
  </ul>

  <!-- монтировать компонент Middle -->
  <r-middle id="middle"></r-middle>

  <script>
    exports = {
      data() {
        return {
          name: 'Upper',
          colors: ['красный', 'зелёный', 'синий']
        }
      }
    }
  </script>
</template>
```

Теперь внесите изменения в шаблон компонента Lower, добавив в него вывод этого массива и кнопку для его обращения:

```html
<!-- шаблон компонента Lower -->
<template name="r-lower">
  <h3>{{ $parent.$parent.name }} > {{ $parent.name }} > {{ name }}</h3>

  <!-- обратить массив цветов в компоненте Upper -->
  <button :onclick="$parent.colors.reverse()">Обратить массив</button>

  <!-- вывести в цикле массив цветов из компонента Upper -->
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

Как видно из этого примера, свойство **$parent** здесь применяется всего один раз. Это связано с тем, что в компоненте Middle нет пользовательского свойства с именем **colors** и поиск продолжится в компоненте Upper.

<br>
<br>
<h2 id="custom-events">Пользовательские события</h2>

<br>

Для взаимодействия между различными компонентами, а не только дочерними, применяется усовершенствованный механиз [пользовательских событий](https://learn.javascript.ru/dispatch-events). Этот механизм подразумевает использование метода **event()** функции Reacton и специального метода **$event()**, который доступен в каждом компоненте.

Создайте в каталоге *app* файл *Events.js*, со следующим содержимым:

```js
// экспортировать елемент события eventReverse
export const eventReverse = new Reacton.event()
```

Когда метод **event()** функции Reacton вызывается как конструктор, то он возвращает новый [фрагмент документа](https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment), который является источником и получателем пользовательских событий.


Теперь внесите изменения в файл *index.html*, как показано ниже:

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
  <!-- монтировать компонент Upper -->
  <r-upper id="upper"></r-upper>

  <!-- монтировать компонент Lower -->
  <r-lower id="lower"></r-lower>

  <!-- шаблон компонента Upper -->
  <template name="r-upper">
    <h1>{{ name }}</h1>

    <!-- вывести в цикле массив цветов -->
    <ul $for="col of colors">
      <li>{{ col }}</li>
    </ul>

    <script>
      exports = {
        data() {
          return {
            name: 'Upper',
            colors: ['красный', 'зелёный', 'синий']
          }
        },
        async connected() {
          // импортировать елемент события eventReverse
          const { eventReverse } = await import('./Events.js')

          // добавить элементу eventReverse обработчик события "reverse-colors"
          eventReverse.addEventListener('reverse-colors', () => {
            this.colors.reverse() // обратить массив
          })
        }
      }
    </script>
  </template>
  
  <!-- шаблон компонента Lower -->
  <template name="r-lower">
    <h3>{{ name }}</h3>

    <button :onclick="reverseArray()">Обратить массив</button>

    <script>
      exports = {
        async data() {
          // импортировать елемент события eventReverse
          const { eventReverse } = await import('./Events.js')

          return {
            name: 'Lower',
            reverseArray() {
              // вызвать событие "reverse-colors" для элемента eventReverse
              this.$event(eventReverse, 'reverse-colors')
            }
          }
        }
      }
    </script>
  </template>
  
  <!-- подключить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // передать шаблоны компонентов в библиотеку Reacton
    Reacton(...document.querySelectorAll('template[name]'))
  </script>
</body>
</html>
```

В данном примере, в шаблоне компонента Upper создаётся асинхронный метод **connected()**. Внутри этого метода происходит импортирование созданного на прошлом шаге элемента события из внешнего файла и назначение ему обработчика:

```js
async connected() {
  // импортировать елемент события eventReverse
  const { eventReverse } = await import('./Events.js')

  // добавить элементу eventReverse обработчик события "reverse-colors"
  eventReverse.addEventListener('reverse-colors', () => {
    this.colors.reverse() // обратить массив
  })
}
```

<br>

Внутри шаблона компонента Lower, метод **data()** тоже является асинхронным, чтобы можно было импортировать внешний элемент события:

```js
async data() {
  // импортировать елемент события eventReverse
  const { eventReverse } = await import('./Events.js')

  return {
    name: 'Lower',
    reverseArray() {
      // вызвать событие "reverse-colors" для элемента eventReverse
      this.$event(eventReverse, 'reverse-colors')
    }
  }
}
```

Кроме этого, компоненту Lower добавлен пользовательский метод **reverseArray()**, внутри которого, с помощью специального метода **$event()** происходит вызов события *"reverse-colors"* для импортируемого элемента при нажатии на кнопку, как показано ниже:

```html
<button :onclick="reverseArray()">Обратить массив</button>
```

В первом аргументе специального метода **$event()** передаётся элемент события eventReverse, а во втором, название вызываемого события:

```js
 this.$event(eventReverse, 'reverse-colors')
```

Метод **$event()** может получать и третий аргумент, в котором можно передать параметры, полностью соответствующие параметрам конструктора [CustomEvent](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya). Например, можно передать свойство **detail**, которое позволяет обмениваться данными между компонентами.

Когда метод **event()** функции Reacton вызывается не как конструктор, то он работает аналогично специальному методу **$event()**.

<br>

Добавьте в метод **connected()** компонента Upper новый обработчик события *"new-colors"*, как показано ниже:

```js
async connected() {
  // импортировать елемент события eventReverse
  const { eventReverse } = await import('./Events.js')

  // добавить элементу eventReverse обработчик события "reverse-colors"
  eventReverse.addEventListener('reverse-colors', () => {
    this.colors.reverse() // обратить массив
  })

  // добавить элементу eventReverse обработчик события "new-colors"
  eventReverse.addEventListener('new-colors', event => {
    this.colors = event.detail // новый массив
  })
}
```

Обратите внимание, что в обработчике этого события появился параметр **event**, через который можно получить доступ к свойству **detail**.

Теперь внесите изменения в содержимое шаблона компонента Lower, добавив ему новую кнопку и пользовательский метод **newArray()**, который передаёт в обработчик события *"new-colors"* новый массив цветов:

```html
<template name="r-lower">
  <h3>{{ name }}</h3>

  <button :onclick="reverseArray()">Обратить массив</button>

  <button :onclick="newArray()">Новый массив</button>

  <script>
    exports = {
      async data() {
        // импортировать елемент события eventReverse
        const { eventReverse } = await import('./Events.js')

        return {
          name: 'Lower',
          reverseArray() {
            // вызвать событие "reverse-colors" для элемента eventReverse
            this.$event(eventReverse, 'reverse-colors')
          },
          newArray() {
            // вызвать событие "new-colors" для элемента eventReverse
            this.$event(eventReverse, 'new-colors', {
              // передать в обработчик события новый массив
              detail: ['синий', 'оранжевый', 'фиолетовый', 'золотой']
            })
          }
        }
      }
    }
  </script>
</template>
```

Таким образом, можно легко обмениваться данными между различными компонентами.

<br>

Чтобы не импортировать элемент события в каждый отдельный компонент, можно прибегнуть к созданию элемента события в глобальной примеси, перед передачей компонентов в функцию Reacton:

```js
Reacton.mixins = {
  // создать елемент события eventReverse
  eventReverse: new Reacton.event()
}

// передать шаблоны компонентов в библиотеку Reacton
Reacton(...document.querySelectorAll('template[name]'))
```

Тогда вместо импорта элемента события из внешнего файла:

```js
// импортировать елемент события eventReverse
const { eventReverse } = await import('./Events.js')
```

необходимо получить элемент события из глобальной примеси:

```js
// получить елемент события eventReverse
const eventReverse = this.$mixins.eventReverse
```

<br>
<br>
<h2 id="features-work">Особенности работы</h2>

<br>

Все методы и выражения компонента, кроме метода **data()**, выполняются в контексте объекта данных компонента. Метод **data()** объекта компонента, выполняется в контексте самого компонента.

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
  <r-hello id="hello" data-title="Hello"></r-hello>

  <!-- шаблон компонента Hello -->
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
  
  <!-- подключить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // передать шаблон компонента Hello в библиотеку Reacton
    Reacton(document.querySelector('template[name="r-hello"]'))
  </script>
</body>
</html>
```

Как видно из этого примера, что для получения значения атрибутов ***id*** и ***data-title*** элемента монтирования компонента, в выражениях применяется специальное свойство **$host**:

```html
<h1>{{ $host.id }}</h1>
<h1>{{ $host.dataset.title }}</h1>
```

Однако, доступ к значению атрибута ***data-title*** в методе **printTitle()**, происходит без использования специального свойства **$host**. Вместо этого, применяется стандартное свойство HTML-элементов [dataset](https://learn.javascript.ru/dom-attributes-and-properties#nestandartnye-atributy-dataset):

```js
printTitle() {
  console.log('printTitle: ', this)
  return this.dataset.title
}
```

Но свойства **dataset** нет в определении пользовательских свойств объекта данных компонента. У объекта данных имеется всего одно свойство **id** и три метода:

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

Объект данных компонента является [прокси](https://learn.javascript.ru/proxy) и работает следующим образом: сначала свойство ищется в объекте данных компонента и если такого свойства там нет, то поиск продолжается в самом компоненте. Если и в компоненте нет искомого свойства, то просматривается объект данных родительского компонента, если таковой имеется.

По этой причине, метод:

```js
printIdData() {
  console.log('printIdData: ', this)
  return this.id
}
```

и выражение:

```html
<h1>{{ id }}</h1>
```

вернут значение "ok" пользовательского свойства **id**.

Для получения доступа к атрибуту ***id*** элемента монтирования компонента, применяется специальное свойство **$host**, которое всегда ссылается на компонент:

```js
printIdAttr() {
  console.log('printIdAttr: ', this)
  return this.$host.id
}
```

```html
<h1>{{ $host.id }}</h1>
```

Если бы у компонента не было пользовательского свойства **id**, совпадающего с названием атрибута, то для получения значения этого атрибута, можно было бы обойтесь без специального свойства **$host**:

```js
printIdAttr() {
  console.log('printIdAttr: ', this)
  return this.id
}
```

Именно это и происходит в методе:

```js
printTitle() {
  console.log('printTitle: ', this)
  return this.dataset.title
}
```

Поскольку у объекта данных компонента отсутствует пользовательское свойство **dataset**, то поиск происходит в самом компоненте, у которого такое свойство имеется.

Однако, в выражении:

```html
<h1>{{ $host.dataset.title }}</h1>
```

свойство **$host** по-прежнему применяется:

Его можно заменить на ключевое слово *this*:

```html
<h1>{{ this.dataset.title }}</h1>
```

и результат не изменится.

Но пример ниже приведёт к ошибке:

```html
<h1>{{ dataset.title }}</h1>
```

Поскольку быстрый доступ, т.е. без ключевого слова *this*, имеют только все специальные и пользовательские, свойства и методы компонента.

<br>
<br>