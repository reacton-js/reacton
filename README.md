![rigl](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[github](https://github.com/reacton-js/reacton) | 
[npmjs](https://www.npmjs.com/package/reacton-js)

<br>

Reacton - это JavaScript-библиотека для создания приложений на основе реактивных [Веб-компонентов](https://learn.javascript.ru/web-components) с возможностью [рендеринга](https://zen.yandex.ru/media/nuancesprog/rendering-na-storone-servera-protiv-staticheskoi-generacii-saita-605e29c796354e3b8aa16a9e) на стороне сервера. Reacton является открытой библиотекой и распространяется под лицензией [MIT](https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_MIT). Реактивность Веб-компонентов достигается за счёт использования объектов [Прокси](https://learn.javascript.ru/proxy) и позволяет отслеживать состояние любых пользовательских данных, обновляя содержимое страницы при их изменении. 

Библиотека Reacton содержит маршрутизатор, который по своей функциональности напоминает маршрутизатор в [Express](https://expressjs.com/ru/guide/routing.html) и предоставляет [Наблюдателя](https://ru.wikipedia.org/wiki/%D0%9D%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для взаимодействия между различными компонентами приложения.

Кроме добавления компонентам реактивного поведения, библиотека Reacton предоставляет поддержку однофайловых компонентов и многоуровневых циклов. Ниже показан фрагмент типичного однофайлового компонента, с трёхуровневым циклом вывода информации о пользователе:

```html
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
```

<br>

1. [Быстрый старт](#quick-start)
2. [Объект компонента](#component-object)
    - [name](#name)
    - [data](#data)
    - [dataset](#dataset)
    - [html](#html)
    - [extends](#extends)
    - [mode](#mode)
    - [attributes](#attributes)
    - [changed](#changed)
    - [connected](#connected-disconnected-adopted)
    - [disconnected](#connected-disconnected-adopted)
    - [adopted](#connected-disconnected-adopted)
    - [before](#before-after)
    - [after](#before-after)
    - [async](#async)
3. [Встроенные компоненты](#embedded-components)
4. [Внешние компоненты](#external-components)
    - [Модульные](#modular)
    - [Однофайловые](#single-file)
5. [Специальные свойства](#special-properties)
    - [$data](#spec-data)
    - [$root](#root)
    - [$](#one-element)
    - [$$](#all-elements)
    - [$when](#when)
6. [Выражения](#expressions)
7. [Параметры](#parameters)
8. ~~[Примеси](#mixins)~~
9. ~~[Слоты](#slots)~~
10. ~~[Циклы](#cycles)~~
11. ~~[События](#events)~~
12. ~~[Виды](#views)~~
13. ~~[Наблюдатель](#observer)~~
14. ~~[Маршрутизатор](#router)~~
15. ~~[Создание приложения](#application-creation)~~
16. ~~[Серверный рендеринг](#ssr)~~

<br>
<hr>
<br>

<h2 id="quick-start"># Быстрый старт</h2>

<br>

Reacton позволяет создавать компоненты несколькими различными способами. Изначально будут рассмотрены те способы, которые позволяют обходиться без разработочного сервера и могут использоваться в качестве демонстрационных примеров или быстрого создания дополнений для проектов. Самым простым таким дополнением, может являться калькулятор для расчёта стоимости на сайте.

Создайте новый рабочий каталог, например, с названием *new* и скачайте в этот каталог файл [reacton.js](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.js). Затем создайте в каталоге файл *index.html* со следующим содержимым:

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
  <!-- монтировать компонент Hello в приложение -->
  <app-hello></app-hello>

  <!-- загрузить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // создать объект компонента Hello
    const Hello = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton'
        }
      },
      html: `
        <h1>Привет, {{ message }}!</h1>
      `
    }

    // подключить компонент Hello к библиотеке Reacton
    Reacton(Hello)
  </script>
</body>
</html>
```

Открыв файл *index.html* в браузере, на экране отобразится созданное в компоненте Hello сообщение:

> <h1>Привет, Reacton!</h1>

Все компоненты созданные в Reacton являются реактивными. В этом легко убедиться, если изменить значение свойства **message** компонента Hello. Для доступа к пользовательским свойствам компонента, используется специальное свойство **$data**. Чтобы получить доступ к этому специальному свойству, вначале необходимо выбрать сам компонент.

Для упрощения этой задачи, назначим тегу монтироввания компонента Hello атрибут ***id*** со значением "hello", как показано ниже:

```html
<!-- монтировать компонент Hello в приложение -->
<app-hello id="hello"></app-hello>
```

Теперь откройте консоль браузера, обычно это делается сочетанием клавиш Ctrl + Shift + I, и введите следующую команду:

```
hello.$data.message = 'Мир'
```

Сообщение на экране браузера сразу же изменится:

> <h1>Привет, Мир!</h1>

<br>
<br>
<h2 id="component-object"># Объект компонента</h2>

<br>

В этом разделе будут представлены все свойства, которые может содержать объект компонента. С некоторыми из таких свойств мы уже познакомились.

<br>

<h3 id="name"># name</h3>

Свойство **name** определяет название компонента:

```js
name: 'app-hello'
```

Данное название используется для тега монтирования при подключении компонента к приложению:

```html
<app-hello></app-hello>
```

Название компонента и, соответственно, его тега монтирования, должно содержать как минимум один дефис. Это является обязательным требованием при создании всех пользовательских элементов в HTML5, чтобы предотвратить конфликт имён со стандартными HTML-элементами.

В качестве префикса можно использовать любое сочетание букв, например, сочетание ***app***, что означает приложение. Можно использовать и одну букву, как показано в примере ниже:

```html
<r-hello></r-hello>
```

Главное, чтобы название тега монтирования совпадало с названием компонента и наоборот:

```js
name: 'r-hello'
```

<br>

<h3 id="data"># data</h3>

Следующее свойство называется **data** и является методом компонента:

```js
data() {
  return {
    message: 'Reacton'
  }
}
```

Данный метод должен возвращать объект, содержащий все пользовательские свойства и методы компонента. В примере выше, возвращаемый объект содержит всего одно пользовательское свойство **message**.

<br>

<h3 id="dataset"># dataset</h3>

Cвойство **dataset** определяет ***data-\**** атрибуты компонента. Ниже показан пример добавления компоненту атрибута ***data-year***, со значением текущего года:

```js
dataset: {
  year: (new Date).getFullYear()
}
```

<br>

<h3 id="html"># html</h3>

Свойство **html** определяет HTML-разметку компонента:

```js
html: `
  <h1>Привет, {{ message }}!</h1>
`
```

Разметка передаётся в это свойство в виде строки. При создании многострочной разметки используются обратные кавычки, но для примера выше, можно было бы использовать и простые одинарные или двойные:

```js
html: "<h1>Привет, {{ message }}!</h1>"
```

Однако, если этот пример разбить на три строки, то необходимо будет использовать только обратные кавычки:

```js
html: `
  <h1>
    Привет, {{ message }}!
  </h1>
`
```

<br>

<h3 id="extends"># extends</h3>

Свойство **extends** позволяет [модифицировать](https://learn.javascript.ru/custom-elements#modifitsirovannye-vstroennye-elementy) компонет таким образом, чтобы при его монтировании можно было использовать стандартный HTML-элемент, например:

```js
extends: 'header'
```

 При этом, такой элемент обязательно должен содержать атрибут ***is*** со значением, соответствующем названию компонента:

 ```html
<header is="app-hello"></header>
```

<br>

<h3 id="mode"># mode</h3>

Свойство **mode** добавляет компоненту [Теневой DOM](https://learn.javascript.ru/shadow-dom#tenevoe-derevo), который изолирует внутренние стили компонента от всего приложения и определяет уровень его инкапсуляции:

```js
mode: 'open'
```

 Это свойство может иметь значение "open" или "closed" и, кроме этого, его нельзя использовать с модифицированными при помощи свойства **extends** компонентами, это приведёт к ошибке:

```js
// Ошибка! Свойство extends здесь недопустимо
extends: 'header',
mode: 'open'
```

<br>

<h3 id="attributes"># attributes</h3>

Свойство **attributes** содержит массив с названиями наблюдаемых атрибутов и аналогично статическому геттеру [observedAttributes](https://learn.javascript.ru/custom-elements#nablyudenie-za-atributami), стандартного Веб-компонента:

```js
attributes: ['title']
```

<br>

<h3 id="changed"># changed</h3>

Метод **changed** вызывается при изменении одного из указанных в массиве выше атрибутов. Он является сокращённым аналогом стандартного метода **attributeChangedCallback** компонента:

```js
changed(name, oldValue, newValue) {
  console.log(name, oldValue, newValue)
}
```

<br>

<h3 id="connected-disconnected-adopted"># connected | disconnected | adopted</h3>

Методы **connected**, **disconnected** и **adopted** являются сокращёнными аналогами таких [стандартных методов](https://learn.javascript.ru/custom-elements) компонента, как **connectedCallback**, **disconnectedCallback** и **adoptedCallback**, и вызываются при их срабатывании:

```js
// вызывается при добавлении компонента в документ
connected() {
  console.log('Компонент добавлен')
},
// вызывается при удаление компонента из документа
disconnected() {
  console.log('Компонент удалён')
},
// вызывается при перемещении компонента в новый документ
adopted() {
  console.log('Компонент перемещён')
}
```

<br>

<h3 id="before-after"># before | after</h3>

Методы **before** и **after** являются частью библиотеки Reacton и вызываются перед и после обновления компонента:

```js
// вызывается перед обновлением компонента
before() {
  console.time('Update')
},
// вызывается после обновления компонента
after() {
  console.timeEnd('Update')
}
```

<br>

<h3 id="async"># async</h3>

Все рассмотренные выше методы, могут быть асинхронными. Например, давайте сымитируем загрузку данных с сервера, через одну секунду после подключения компонента:

```js
async data() {
  return {
    message: await new Promise(ready => setTimeout(() => ready('Reacton'), 1000))
  }
}
```

<br>
<br>
<h2 id="embedded-components"># Встроенные компоненты</h2>

<br>

Создавать HTML-разметку компонента в виде текста, не всегда бывает удобно. Гораздо легче сделать это в HTML-элементе, таком, например, как элемент Template. Внесите изменения в файл *index.html*, как показано ниже:

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
  <!-- монтировать компонент Hello в приложение -->
  <app-hello id="hello"></app-hello>

  <!-- загрузить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <!-- создать встроенный компонент Hello -->
  <template name="app-hello">
    <h1>Привет, {{ message }}!</h1>

    <script>
      // экспортировать объект компонента
      exports = {
        data() {
          return {
            message: 'Reacton'
          }
        }
      }
    </script>
  </template>

  <script>
    // выбрать встроенный компонент Hello
    const Hello = document.querySelector('template[name="app-hello"]')

    // подключить компонент Hello к библиотеке Reacton
    Reacton(Hello)
  </script>
</body>
</html>
```

Все рассмотренные выше свойства объекта компонента, кроме методов и свойства **attributes**, можно передавать через атрибуты элемента Template. В качестве примера, модифицируем этот компонент и добавим ему Теневой DOM с открытым уровнем инкапсуляции:

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
  <!-- монтировать компонент Hello в приложение -->
  <header is="app-hello"></header>

  <!-- загрузить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <!-- создать встроенный модифицированный компонент Hello -->
  <template name="app-hello" extends="header" mode="open">
    <h1>Привет, {{ message }}!</h1>

    <script>
      // экспортировать объект компонента
      exports = {
        data() {
          return {
            message: 'Reacton'
          }
        }
      }
    </script>
  </template>

  <script>
    // выбрать встроенный компонент Hello
    const Hello = document.querySelector('template[name="app-hello"]')

    // подключить компонент Hello к библиотеке Reacton
    Reacton(Hello)
  </script>
</body>
</html>
```

Однако, свойства, которые экспортируются через объект **exports**, переопределяют свойства задаваемые в атрибутах элемента Template. В примере ниже, мы изменили свойство **name**, которое отвечает за наименование компонента:

```js
// экспортировать объект компонента
exports = {
  name: 'no-hello',
  data() {
    return {
      message: 'Reacton'
    }
  }
}
```

И поэтому данный компонент не будет отображаться в браузере, когда мы попытаемся примонтировать компонент Hello:

```html
<!-- монтировать компонент Hello в приложение -->
<header is="app-hello"></header>
```

Последнее, на что стоит обратить внимание, что для передачи встроенного компонента библиотеке Reacton, его необходимо прежде выбрать любым удобным способом, например, используя стандартный метод [querySelector](https://learn.javascript.ru/searching-elements-dom#querySelector) объекта **document**, как показано ниже:

```js
// выбрать встроенный компонент Hello
const Hello = document.querySelector('template[name="app-hello"]')

// подключить компонент Hello к библиотеке Reacton
Reacton(Hello)
```

<br>
<br>
<h2 id="external-components"># Внешние компоненты</h2>

<br>

Reacton поддерживает два типа внешних компонентов. Первый тип - это модульные компоненты. Они создаются в виде обычных [модулей](https://learn.javascript.ru/modules-intro) JavaScript и, как правило, имеют расширение *.mjs*. Второй тип внешних компонетов в Reacton - это однофайловые компоненты, которые пишутся на чистом HTML и имеют расширение *.htm*. После ознакомления с модульными компонентами, все дальнейшие примеры данного руководства, будут показаны в виде однофайловых компонентов.

<br>

<h3 id="modular"># Модульные</h3>

Для работы с модульными  компонентами, необходимо использовать модульную версию библиотеки Reacton. Скачайте файл [reacton.mjs](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.mjs) в свой рабочий каталог и внесите изменения в файл *index.html*, как показано ниже:

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
  <!-- монтировать компонент Hello в приложение -->
  <app-hello></app-hello>

  <script type="module">
    // импортировать библиотеку Reacton
    import Reacton from './reacton.mjs'
    // импортировать компонент Hello  
    import Hello from './Hello.mjs'

    // подключить компонент Hello к библиотеке Reacton
    Reacton(Hello)
  </script>
</body>
</html>
```

Поскольку мы теперь работаем с модульным JavaScript, то атрибут ***type*** у тега Script имеет значение "module". Вначале мы импортируем модульную версию библиотеки Reacton, затем, мы импортируем компонент Hello, и в самом конце скрипта, мы как обычно подключаем компонент к библиотеке.

Давайте создадим модульный компонент Hello. Все внешние компоненты, как модульные так и однофайловые, будут начинаться с заглавной буквы. Это не является обязательным требованием, но так часто применяется на практике.

Создайте в своём рабочем каталоге файл *Hello.mjs*, со следующим содержимым:

```js
// экспортировать объект компонента
export default {
  name: 'app-hello',
  data() {
    return {
      message: 'Reacton'
    }
  },
  html: `<h1>Привет, {{ message }}!</h1>`
}
```

Как видно из примера выше, модульные компоненты по своей структуре представляют обычный экспорт по умолчанию объекта компонента, с которым мы познакомились в самом начале. Исключением является лишь специальный синтаксис [export default](https://learn.javascript.ru/import-export#eksport-po-umolchaniyu), который экспортирует данный объект.

Для работы с модулям JavaScript, потребуется любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server). Кроме этого, данный сервер обеспечивает автоматическую перезагрузку страницы, при любом изменении содержимого каталога, из которого он запущен.

Установите [Node](https://nodejs.org/ru/), если он у вас ещё не установлен. Затем откройте терминал и установите lite-server глобально:

```
npm i -g lite-server
```

Перейдите из терминала в свой рабочий каталог и введите команду: 

```
lite-server
```

После этого откроется окно вашего браузера по умолчанию, в котором будет отображаться уже знакомое нам сообщение:

> <h1>Привет, Reacton!</h1>

<br>

<h3 id="single-file"># Однофайловые</h3>

Для работы с однофайловыми компонентами, как, в прочем, и со всеми, что мы уже рассмотрели, можно использовать как модульную версию библиотеки Reacton, так и сжатую, специально оптимизированную для браузеров, что мы применяли в самом начале. Вернёмся к первой версии, которая содержится в файле [reacton.js](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.js).

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
  <!-- монтировать компонент Hello в приложение -->
  <app-hello></app-hello>
  
  <!-- загрузить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // подключить компонент Hello к библиотеке Reacton
    Reacton('Hello.htm')
  </script>
</body>
</html>
```

Самым заметным изменением в этом файле, является содержимое тега Script:

```js
// подключить компонент Hello к библиотеке Reacton
Reacton('Hello.htm')
```

Библиотека Reacton способна принимать в своих аргументах как объекты и выбранные HTML-элементы, так и обычные строки, которые ссылаются на внешние файлы компонентов, но не модули.

Создайте в своём рабочем каталоге файл *Hello.htm* и внесите в него следующее содержимое:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <script>
    // экспортировать объект компонента
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton'
        }
      }
    }
  </script>
</app-hello>
```

Однофайловые компоненты по своей природе напоминают [встроенные](#embedded-components). Единственным исключенем является тот факт, что однофайловым компонентам не требуется атрибут ***name*** содержащий название компонента, так как данное название определяется именем корневого тега, в котором содержится компонет.

Однако, однофайловым компонентам, как и модульным, так же требуется разработочный сервер, который мы уже установили выше и который запускается открытием терминала в папке проекта, и вводом в него команды:

```
lite-server
```

Кроме этого, в одном файле может содержаться любое количество компонентов. Библиотека Reacton выберет все корневые элементы из файла и создаст из них компоненты.

Внесите изменения в файл *Hello.htm*, как показано ниже:

```html
<!-- определить компонент Hello  -->
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <script>
    // экспортировать объект компонента
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton'
        }
      }
    }
  </script>
</app-hello>


<!-- определить компонент Bye  -->
<app-bye>
  <p>Пока...</p>

  <style>
    p {
      color: green;
    }
  </style>
</app-bye>
```

Подключите компонет Bye в файле *index.html*, добавив тег монтирования в  содержимое этого файла:

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
  <!-- монтировать компонент Hello в приложение -->
  <app-hello></app-hello>

  <!-- монтировать компонент Bye в приложение -->
  <app-bye></app-bye>

  <!-- загрузить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // подключить компонент Hello к библиотеке Reacton
    Reacton('Hello.htm')
  </script>
</body>
</html>
```

Во всём же остальном, однофайловые компоненты идентичны встроенным. Давайте для примера снова определим модифицированный компонент с Теневым DOM и открытым уровнем инкапсуляции:

```html
<!-- определить модифицированный компонент Hello  -->
<app-hello extends="header" mode="open">
  <h1>Привет, {{ message }}!</h1>

  <script>
    // экспортировать объект компонента
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton'
        }
      }
    }
  </script>
</app-hello>
```

Не забудьте внести изменения в файл *index.html*, как показано ниже:

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
  <!-- монтировать компонент Hello в приложение -->
  <header is="app-hello"></header>

  <!-- загрузить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // подключить компонент Hello к библиотеке Reacton
    Reacton('Hello.htm')
  </script>
</body>
</html>
```

После всех проделанных экспериментов, давайте вернёмся к исходной версии однофайлового компонента Hello:

```html
<!-- определить компонент Hello  -->
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <script>
    // экспортировать объект компонента
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton'
        }
      }
    }
  </script>
</app-hello>
```

И главной страницы нашего приложения, добавив тегу монтирования компонента атрибут ***id*** со значением "hello", для быстрого доступа к его специальным свойствам и методам:

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
  <!-- монтировать компонент Hello в приложение -->
  <app-hello id="hello"></app-hello>

  <!-- загрузить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // подключить компонент Hello к библиотеке Reacton
    Reacton('Hello.htm')
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="special-properties"># Специальные свойства</h2>

<br>

Библиотека Reacton предоставляет несколько специальных методов и свойств для взаимодействия с компонентом. Все специальные методы и свойства начинаются со знака **$**, это необходимо для предотвращения конфликта имён со стандартными свойствами и методами компонента.

<br>

<h3 id="spec-data"># $data</h3>

Мы уже познакомились с одним таким свойством, оно называется **$data**, и предоставляет доступ ко всем пользовательским свойствам и методам компонента. Давайте ещё раз вспомним, как это свойство работает.

В предыдущем разделе мы создали однофайловый компонент Hello и, как мы помним, для запуска приложения мы теперь используем разработочный сервер. Перейдите из терминала в свой рабочий каталог и введите команду: 

```
lite-server
```

Через пару секунд у вас откроется окно браузера с приветственным сообщением:

> <h1>Привет, Reacton!</h1>

Кроме этого, в файле *index.html* мы добавили атрибут ***id*** со значением "hello", тегу монтирования компонента Hello, для быстрого доступа к компоненту:

```html
<app-hello id="hello"></app-hello>
```

Теперь откройте консоль браузера, обычно это делается сочетанием клавиш Ctrl + Shift + I, и введите следующую команду:

```
hello.$data.message = 'Мир'
```

Сообщение на экране браузера сразу же изменится:

> <h1>Привет, Мир!</h1>

Но для доступа к компоненту, мы можем использовать не только консоль браузера. Это можно сделать из любого метода, описанного в разделе [Объект компонента](#component-object), например, внесите изменения в файл *Hello.htm*, как показано ниже:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <script>
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton'
        }
      },
      // вызывается при добавлении компонента в документ
      connected() {
        // изменить значение свойства message через 1 секунду
        setTimeout(() => this.$data.message = 'Мир', 1000)
      }
    }
  </script>
</app-hello>
```

Все методы этого объекта выполняются в контексте компонента. Это означает, что для доступа к компоненту, в этих методах используется ключевое слово **this**. В примере выше, мы изменяем значение пользовательского свойства **message** через одну секунду, после добавления компонента в документ:

```js
setTimeout(() => this.$data.message = 'Мир', 1000)
```

Обратите внимание, что вся процедура происходит внутри метода **connected**, который является сокращённым аналогом стандартного метода [connectedCallback](https://learn.javascript.ru/custom-elements) любого Веб-компонента.

Забегая немного вперёд, стоить отметить, что всё это можно делать и при помощи событий. Давайте добавим событие *click* элементу H1 компонента Hello, как показано ниже:

```html
<app-hello>
  <!-- добавить событие click элементу H1 -->
  <h1 @click="message = 'Мир'">Привет, {{ message }}!</h1>

  <script>
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton'
        }
      }
    }
  </script>
</app-hello>
```

Заметьте, что для доступа к пользовательским свойствам и методам компонента, таким, например, как свойство **message**, в атрибуте события, равно как и в выражении заключенном между двойными фигурными скобками:

```
Привет, {{ message }}!
```

элемента H1, не требуется добавлять ни ключевое слово **this**, ни следующее после него специальное свойство **$data**. 

События задаются через специальный атрибут, который начинается с символа ***@***, за которым следует название события. Обо всём этом будет подробно рассказано в дальнейших разделах этого руководства. Но вернёмся к специальным свойствам, для проверки работы которых, вы можете воспользоваться любым из рассмотренных ранее способов.

<br>

<h3 id="root"># $root</h3>

Специальное свойство **$root** является сокращённым аналогом стандартного свойства [shadowRoot](https://learn.javascript.ru/shadow-dom#tenevoe-derevo) Веб-компонента. Оно возвращает ссылку на его [Теневой DOM](https://learn.javascript.ru/shadow-dom), если он был добавлем с помощью свойства **mode** объекта компонента:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <script>
    exports = {
      name: 'app-hello',
      // добавить компоненту открытый Теневой DOM
      mode: 'open',
      data() {
        return {
          message: 'Reacton'
        }
      }
    }
  </script>
</app-hello>
```

Для компонента с закрытым уровнем инкапсуляции, свойство **$root** возвратит null:

```js
// добавить компоненту закрытый Теневой DOM
mode: 'closed'
```

<br>

<h3 id="one-element"># $</h3>

Специальный метод **$** является сокращённым аналогом стандартного метода [querySelector](https://learn.javascript.ru/searching-elements-dom#querySelector) элемента. Данный метод возвращает первый элемент, соответствующий указанному CSS-селектору. Откройте консоль браузера и введите команду:

```
hello.$('h1')
```

<br>

<h3 id="all-elements"># $$</h3>

Специальный метод **$$** является сокращённым аналогом стандартного метода [querySelectorAll](https://learn.javascript.ru/searching-elements-dom#querySelectorAll) элемента. Данный метод возвращает все элементы, соответствующие указанному CSS-селектору. Откройте консоль браузера и введите команду:

```
hello.$$('h1')
```

<br>

<h3 id="when"># $when</h3>

Специальный метод **$when** является сокращённым аналогом стандартного метода [whenDefined](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined) Веб-компонента. Данный метод возвращает [Промис](https://learn.javascript.ru/promise-basics), который разрешается при определении компонента, название которого передаётся в этот метод в виде строки.

Для понимания работы этого метода, нам придётся временно создать второй компонент в файле *Hello.htm*, как мы это делали в предыдушем разделе:

```html
<!-- определить компонент Bye  -->
<app-bye>
  <p>Пока...</p>

  <script>
    exports = {
      connected() {
        // вывести в консоль сообщение, после определения компонента Hello
        this.$when('app-hello').then(() => console.log('Компонент Hello определён'))
      }
    }
  </script>
</app-bye>
```

Не забудьте примонтировать компонент Bye в файле *index.html*, как показано ниже:

```html
<!-- монтировать компонент Bye в приложение -->
<app-bye></app-bye>
```

Остальные служебные свойства, к числу которых относятся **$mixins**, **$params**, и служебные методы **$event** и **$router**, будут рассмотрены в соответствующих разделах данного руководства.

<br>
<br>
<h2 id="expressions"># Выражения</h2>

<br>

Для вычисления выражений в резметке компонента, в библиотеке Reacton применяется синтаксис шаблонизатора [Mustache](http://websketches.ru/plugins/mustache). Выражения размещаются между двойными фигурными скобками, как показано ниже:

```
{{ выражение }}
```

Выражения в разметке  можно использовать везде, где требуется вывод значений. Давайте добавим выражение, которое определяет случайный цвет элемента H1 и выводит его в [шестнадцатеричном](https://puzzleweb.ru/css/css_colors.php#a3) формате:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <style>
    h1 {
      /* возвращает случайный цвет для элемента H1 в шестнадцатеричном формате */
      color: #{{ Math.round(Math.random() * 0xffffff).toString(16) }}
    }
  </style>

  <script>
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton'
        }
      }
    }
  </script>
</app-hello>
```

Данный пример можно переписать и с использованием свойства, например, добавим свойство **color** в объект данных компонента:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <style>
    h1 {
      /* возвращает значение свойства color */
      color: #{{ color }}
    }
  </style>

  <script>
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton',
          /* определяет случайный цвет для элемента H1 в шестнадцатеричном формате */
          color: Math.round(Math.random() * 0xffffff).toString(16)
        }
      }
    }
  </script>
</app-hello>
```

Мы можем размещать выражения и в атрибутах:

```html
<app-hello>
  <!-- вывести значение свойства color в содержимое атрибута title -->
  <h1 title="{{ color }}">Привет, {{ message }}!</h1>

  <style>
    h1 {
      /* возвращает значение свойства color */
      color: #{{ color }}
    }
  </style>

  <script>
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton',
          /* определяет случайный цвет для элемента H1 в шестнадцатеричном формате */
          color: Math.round(Math.random() * 0xffffff).toString(16)
        }
      }
    }
  </script>
</app-hello>
```

и везде, где этого требует логика разметки:

```html
<app-hello>
  <!-- вывести значение свойства color в содержимое атрибута title
   и в содержимое заголовка H1 -->
  <h1 title="{{ color }}">Привет, {{ message }}! | Цвет: {{ color }}</h1>

  <!-- вывести значение свойства color в содержимое параграфа -->
  <p>Цвет: {{ color }}</p>

  <style>
    h1 {
      /* возвращает значение свойства color */
      color: #{{ color }}
    }
  </style>

  <script>
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton',
          /* определяет случайный цвет для элемента H1 в шестнадцатеричном формате */
          color: Math.round(Math.random() * 0xffffff).toString(16)
        }
      }
    }
  </script>
</app-hello>
```

Все текстовые [узлы](https://developer.mozilla.org/ru/docs/Web/API/Document_Object_Model/Introduction) и узлы атрибутов, где встречаются выражения, становятся реактивными узлами в Reacton. Допускается добавлять ключевое слово **this**, перед пользовательским свойством в выражении:

```html
<app-hello>
  <!-- вывести значение свойства color в содержимое атрибута title -->
  <h1 title="{{ this.color }}">Привет, {{ this.message }}!</h1>

  <!-- вывести значение свойства color в содержимое параграфа -->
  <p>Цвет: {{ this.color }}</p>

  <style>
    h1 {
      /* возвращает значение свойства color */
      color: #{{ this.color }}
    }
  </style>

  <script>
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton',
          /* определяет случайный цвет для элемента H1 в шестнадцатеричном формате */
          color: Math.round(Math.random() * 0xffffff).toString(16)
        }
      }
    }
  </script>
</app-hello>
```

Для пользовательских свойств нет необходимости добавлять ключевое слово **this**, однако, для доступа к свойствам самого компонента в разметке, оно является обязательным в выражении. Давайте получим значение атрибута ***id*** компонента Hello и выведем его в параграфе, как показано ниже:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <!-- вывести в параграфе значение атрибута id  -->
  <p>ID: {{ this.attributes.id.value }}</p>

  <script>
    exports = {
      name: 'app-hello',
      data() {
        return {
          message: 'Reacton'
        }
      }
    }
  </script>
</app-hello>
```

Ключевое слово **this** здесь является обязательным, поскольку у нас не существует пользовательского свойства **attributes**, являющегося объектом, к свойствам которого мы пытаемся получить доступ. [Прокси](https://learn.javascript.ru/proxy), в контексте которого исполняется функция отвечающая за обработку выражений, сначала проверяет свойство записанное с использованием ключевого слова **this** в объекте данных компонента, и если там его не находит, то возвращает значение данного свойства самого компонента.

<br>
<br>
<h2 id="parameters"># Параметры</h2>

<br>

Раздел в разработке...

<br>
<br>