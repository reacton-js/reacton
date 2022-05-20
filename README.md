![rigl](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[github](https://github.com/reacton-js/reacton) | 
[gitflic](https://gitflic.ru/project/reacton/reacton-js) | 
[npmjs](https://www.npmjs.com/package/reacton-js) | 
[telegram](https://t.me/reactonjs) | 
[script](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.js) | 
[module](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.mjs)

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
    - [$host](#host)
    - [$](#one-element)
    - [$$](#all-elements)
    - [$when](#when)
6. [Выражения](#expressions)
7. [Параметры](#parameters)
    - [attributes](#observable-attributes)
    - [$params](#params)
8. [Примеси](#mixins)
9. [Слоты](#slots)
10. [Циклы](#cycles)
    - [for](#for)
    - [for-in](#for-in)
    - [for-of](#for-of)
11. [События](#events)
12. [Булевы атрибуты](#boolean)
    - [$hidden](#hidden)
    - [$disabled](#disabled)
13. [Виды](#views)
14. [Наблюдатель](#observer)
15. [Маршрутизатор](#router)
16. [Создание приложения](#application-creation)
17. [Серверный рендеринг](#ssr)

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
    // экспортировать объект компонента
    exports = {
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
    // экспортировать объект компонента
    exports = {
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
    // экспортировать объект компонента
    exports = {
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

<h3 id="host"># $host</h3>

Специальное свойство **$host** ссылается на сам компонент. Это может пригодиться при работе с выражениями, о чём будет рассказано далее. Откройте консоль браузера и введите команду:

```
hello.$host === hello
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
    // экспортировать объект компонента
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
    // экспортировать объект компонента
    exports = {
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
    // экспортировать объект компонента
    exports = {
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
    // экспортировать объект компонента
    exports = {
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
    // экспортировать объект компонента
    exports = {
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
    // экспортировать объект компонента
    exports = {
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
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          message: 'Reacton'
        }
      }
    }
  </script>
</app-hello>
```

Ключевое слово **this** здесь является обязательным и его отсутствие приведёт к ошибке, поскольку у нас не существует пользовательского свойства **attributes**, являющегося объектом, к свойствам которого мы пытаемся получить доступ:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <!-- Ошибка! Не существует пользовательского свойства attributes  -->
  <p>ID: {{ attributes.id.value }}</p>

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
</app-hello>
```

Однако, для доступа к атрибуту ***id***, можно было бы использовать и более короткую запись, поскольку данный атрибут, одовременно является и свойством компонента:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <!-- вывести в параграфе значение атрибута id  -->
  <p>ID: {{ this.id }}</p>

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
</app-hello>
```

Но это не сработает так, как мы ожидаем, если мы добавим пользовательское свойство с аналогичным именем:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <!-- вывести в параграфе значение атрибута id  -->
  <p>ID: {{ this.id }}</p>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          message: 'Reacton',
          // добавить пользовательское свойство id
          id: '1'
        }
      }
    }
  </script>
</app-hello>
```

Вместо значения "hello", будет выведено значение "1". [Прокси](https://learn.javascript.ru/proxy), в контексте которого исполняется функция отвечающая за обработку выражений, сначала проверяет свойство записанное с использованием ключевого слова **this** в объекте данных компонента, и если там его не находит, то возвращает значение данного свойства самого компонента.

Но это легко исправить, добавив в выражение специальное свойство [$host](#host), как показано ниже:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <!-- вывести в параграфе значение атрибута id  -->
  <p>ID: {{ $host.id }}</p>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          message: 'Reacton',
          // добавить пользовательское свойство id
          id: '1'
        }
      }
    }
  </script>
</app-hello>
```

Свойство **$host** всегда ссылается на компонент. Как показывает пример выше, специальные свойства, как и пользовательские, не требуют добавления перед ними ключевого слова **this** в выражениях.


<br>
<br>
<h2 id="parameters"># Параметры</h2>

<br>

Параметры необходимы для передачи любых данных в дочерние компоненты, т.е. такие, которые монтируются в другие компоненты. Перед тем, как рассматривать параметры, давайте посмотрим как можно передавать текстовые значения через атрибуты в дочерниние компоненты.

Для этого нам снова потребуется создать компонент Bye в файле *Hello.htm*, как показано ниже:

```html
<!-- определить компонент Bye  -->
<app-bye>
  <!-- получить содержимое атрибута data-message компонента -->
  <p>Пока, {{ this.dataset.message }}...</p>
</app-bye>
```

В компоненте Bye, мы просто получаем значение его атрибута ***data-message***, который мы ему создадим, при подключении его в компоненте Hello.

Внесите изменения в данный компонент:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <!-- монтировать компонент Bye в приложение
    и передать ему значение свойства message, через атрибут data-message -->
  <app-bye data-message="{{ message }}"></app-bye>

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
</app-hello>
```

При запуске приложения, на экране брауза будут отображаться два сообщения:

> <h1>Привет, Reacton!</h1><p>Пока, Reacton...</p>

В этом примере нет ничего сложного, но при попытке изменить значение свойства **message** компонента Hello в консоли браузера:

```
hello.$data.message = 'Веб-компоненты'
```

изменения не затронут дочерний компонент:

> <h1>Привет, Веб-компоненты!</h1><p>Пока, Reacton...</p>

<br>

<h3 id="observable-attributes"># attributes</h3>

Для решения этой задачи, во-первых, можно воспользоваться [наблюдаемыми атрибутами](https://learn.javascript.ru/custom-elements#nablyudenie-za-atributami), предлагаемыми технологией самих Веб-компонентов. Давайте этим и воспользуемся, задействуя свойство [attributes](#attributes) и метод [changed](#changed), объекта компонента Bye, как показано ниже:

```html
<app-bye>
  <!-- вывести значение свойства message -->
  <p>Пока, {{ message }}...</p>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // получить содержимое атрибута data-message компонента
          message: this.dataset.message
        }
      },

      // наблюдать за атрибутом data-message
      attributes: ['data-message'],
      
      // выполняется при изменении наблюдаемого атрибута
      changed(name, oldValue, newValue) {
        // присвоить свойству message новое значение атрибута
        this.$data.message = newValue
      }
    }
  </script>
</app-bye>
```

Вместо прямого вывода значения атрибута ***data-message*** в выражении, мы присваиваем это значение новому свойству **message** в объекте компонента Bye:

```js
// получить содержимое атрибута data-message компонента
message: this.dataset.message
```

Затем, мы делаем атрибут ***data-message*** наблюдаемым, добавляя его название в свойство **attributes** объекта компонента:

```js
// наблюдать за атрибутом data-message
attributes: ['data-message']
```

И в конце экспортируемого объекта, мы используем метод **changed**, который вызывается при изменении любого наблюдаемого атрибута, в котором мы просто присваиваем пользователькому свойству **message** новое значение:

```js
// присвоить свойству message новое значение атрибута
this.$data.message = newValue
```

Теперь при изменении в консоли браузера значения свойства **message** компонента Hello:

```
hello.$data.message = 'Веб-компоненты'
```

изменится и значение одноимённого свойства в компоненте Bye:

> <h1>Привет, Веб-компоненты!</h1><p>Пока, Веб-компоненты...</p>

Но через атрибуты можно передавать лишь текстовые значения. Не получится передать, например, объекты или массивы. Для этого используются параметры.

<br>

<h3 id="params"># $params</h3>

Параметры являются технологией предоставляемой библиотекой Reacton и определяются специальным атрибутом ***$params*** в родительском компоненте, и одноимённом свойством в дочернем.

Здесь стоит немного пояснить, что из себя представляют специальные атрибуты. В Reacton, кроме специальных свойств, имеются ещё и специальные атрибуты. Все они начинаются со знака доллара ***$*** или собачки ***@***. Они нужны для указания Reacton на выполнение связанных с ними специальных операций.

Во всех специальных атрибутах, выражения указываются без обрамляющих двойных фигурных скобок:

```
выражение
```

Пример ниже приведёт к ошибке:

```
{{ выражение }}
```

Кроме этого, специальные атрибуты не попадают в итоговую разметку в таком виде. После конвертации исходной разметки компонента, Reacton преобразует их в специальные ***data--название*** атрибуты. Обратите внимание на двойное тире **--** между ***data*** и ***название*** атрибута. Символы ***$*** и ***@*** из названия удаляются.

Другими словами, атрибут ***$params*** в исходной разметке, после конвертации, в финальной будет выглядеть как ***data--params***. Доступ к таким атрибутам через [dataset](https://learn.javascript.ru/dom-attributes-and-properties#nestandartnye-atributy-dataset), всегда будет начинаться с заглавной буквы:

```js
element.dataset.Params
```

и почти все специальные атрибуты являются реактивными, но не атрибут ***$params***, который мы сейчас и рассмотрим.

В атрибуте ***$params*** передаются через запятую названия пользовательских свойств родительского компонента, которые будут доступны в дочернем. Давайте снова попробуем повторить пример выше, но теперь задействуя для этого параметры.

Внесите изменения в файл компонента Hello, как показано ниже:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <!-- монтировать компонент Bye в приложение
    и передать ему название пользовательского свойства через параметр -->
  <app-bye $params="message"></app-bye>

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
</app-hello>
```

В этом примере нет ничего сложного. Мы просто передаём в тег монтирования компонета Bye атрибут ***$params***, который содержит название пользовательского свойства **message** из компонента Hello.

Для доступа к пользовательским свойствам родительских компонентов, которые были указаны в атрибуте ***$params***, в дочерних компонентах применяется одноимённое специальное свойство **$params**.

Исправьте содержимое компонента Bye:

```html
<app-bye>
  <!-- вывести значение параметра message -->
  <p>Пока, {{ $params.message }}...</p>
</app-bye>
```

Cпециальное свойство **$params** является [прокси](https://learn.javascript.ru/proxy)-объектом. Доступ к значениям пользовательских свойст родительского компонента, осуществляется через точечную нотацию.


На экране мы увидим уже знакомое нам сообщение:

> <h1>Привет, Reacton!</h1><p>Пока, Reacton...</p>

Кроме получения значений пользовательских свойств из родительских компонентов, мы можем с помощью специального свойства **$params** изменять эти значения, внутри дочерних компонентов.

Внесите изменения в содержимое компонента Bye:

```html
<app-bye>
  <!-- вывести значение параметра message -->
  <p>Пока, {{ $params.message }}...</p>

  <!-- изменить значение свойства message -->
  <button @click="$params.message = 'Веб-компоненты'">Изменить</button>
</app-bye>
```

После нажатия на кнопку Изменить, сообщение на экране браузера сразу же изменится:

> <h1>Привет, Веб-компоненты!</h1><p>Пока, Веб-компоненты...</p>

Кроме простых пользовательских свойств содержащих текстовые значения, мы можем передавать в дочерние компоненты любые свойства, содержащие как объекты, так и массивы.

Внесите изменения в содержимое компонента Hello:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <!-- монтировать компонент Bye в приложение
    и передать ему названия пользовательских свойств через параметр -->
  <app-bye $params="message, colors, user"></app-bye>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          message: 'Reacton',
          // создать массив цветов RGB
          colors: ['красный', 'зелёный', 'синий'],
          // создать объект пользователя
          user: {
            name: 'Иван Васильевич',
            age: 36
          }
        }
      }
    }
  </script>
</app-hello>
```

Давайте выведем массив и объект из родительского компонента, в дочернем компоненте Bye:

```html
<app-bye>
  <!-- вывести значение параметра message -->
  <p>Пока, {{ $params.message }}...</p>

  <!-- вывести значение параметра colors -->
  RGB
  <pre>{{ $params.colors }}</pre>

  <!-- вывести значение параметра user -->
  Пользователь
  <pre>{{ $params.user }}</pre>ы
</app-bye>
```

Здесь для вывода использовались элементы [PRE](https://developer.mozilla.org/ru/docs/Web/HTML/Element/pre), которые сохраняют форматирование, добавляемое Reacton всем объектам и массивам при выводе:

```
RGB
[
 "красный",
 "зелёный",
 "синий"
]

Пользователь
{
 "name": "Иван Васильевич",
 "age": 36
}
```

Теперь давайте внутри дочернего компонента Bye, обратим массив **colors** и изменим значение свойства **name** объекта **user**, которые мы получили из родительского, используя для этого пользовательский метод **changeProps**, как показано ниже:

```html
<app-bye>
  <!-- вывести значение параметра message -->
  <p>Пока, {{ $params.message }}...</p>

  <!-- вывести значение параметра colors -->
  RGB
  <pre>{{ $params.colors }}</pre>

  <!-- вывести значение параметра user -->
  Пользователь
  <pre>{{ $params.user }}</pre>

  <!-- вызвать пользовательский метод changeProps -->
  <button @click="changeProps()">Изменить</button>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // создать пользовательский метод changeProps
          changeProps: () => {
            // изменить значение свойства message
            this.$params.message = 'Веб-компоненты'

            // обратить массив colors
            this.$params.colors.reverse()

            // изменить значение name объекта user
            this.$params.user.name = 'Ольга Ивановна'
          }
        }
      }
    }
  </script>
</app-bye>
```

После нажатия на кнопку Изменить, элементы массива **colors** поменяют порядок и свойство **name** пользователя объекта **user** тоже изменится:

```
RGB
[
 "синий",
 "зелёный",
 "красный"
]
Пользователь
{
 "name": "Ольга Ивановна",
 "age": 36
}
```

Обратите внимание, что для создания пользовательского метода **changeProps** использовалась [стрелочная функция](https://learn.javascript.ru/arrow-functions-basics), а не обычная:

```js
// создать пользовательский метод changeProps
changeProps: () => {
  // изменить значение свойства message
  this.$params.message = 'Веб-компоненты'

  // обратить массив colors
  this.$params.colors.reverse()

  // изменить значение name объекта user
  this.$params.user.name = 'Ольга Ивановна'
}
```

Это связано с тем, что внутри этой функции нам было необходимо получить доступ к специальному свойству **$params**, которое доступно через ключевое слово **this**. Метод **data** объекта компонента, который возвращает объект с пользовательскими свойствами и методами, выполняется в контексте компонента, а стрелочные функции, получают значение ключевого слова **this** на месте их определения.

<br>
<br>
<h2 id="mixins"># Примеси</h2>

<br>

Примеси позволяют определять значения для всех компонентов сразу. Например, в примеси можно определить функцию, которая будет доступна во всех компонентах. Примеси определяются с помощью назначения объекта свойству **mixins**, главной функции библиотеки Reacton.

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
  <app-hello id="hello"></app-hello>

  <!-- монтировать компонент Bye в приложение -->
  <app-bye></app-bye>

  <!-- загрузить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // определить примесь для главной функции с помощью свойства mixins
    Reacton.mixins = {
      // добавить метод, который будет доступен во всех компонентах
      print() {
        return 'Reacton'
      }
    }

    // передать название файла с компонентами библиотеке Reacton
    Reacton('Hello.htm')
  </script>
</body>
</html>
```

Теперь давайте вызовем функцию **print** в компонентах Hello и Bye. Для этого используется специальное свойство **$mixins**. Внесите изменения в файл *Hello.htm*, в котором содержатся эти два компонента:

```html
<!-- определить компонент Hello  -->
<app-hello>
  <!-- вызвать метод print из примеси -->
  <h1>Привет, {{ $mixins.print() }}!</h1>
</app-hello>


<!-- определить компонент Bye  -->
<app-bye>
  <!-- вызвать метод print из примеси -->
  <p>Пока, {{ $mixins.print() }}...</p>
</app-bye>
```

Вот, собственно и всё, что касается механизма примесей в Reacton. На экране мы увидим уже знакомые нам сообщения:

> <h1>Привет, Reacton!</h1><p>Пока, Reacton...</p>

<br>
<br>
<h2 id="slots"># Слоты</h2>

<br>

Библиотека Reacton основана на [Веб-компонентах](https://learn.javascript.ru/web-components) и она поддерживает всё, что предоставляет данная технология, включая и [слоты](https://learn.javascript.ru/slots-composition). Переносить сюда руководство по описанию слотов не имеет смысла. Вы можете ознакомиться с ним по ссылке выше. Но стоит обратить внимание на то, что слоты могут иметь только компоненты, которым был задан [Теневой DOM](https://learn.javascript.ru/shadow-dom) с открытым или закрытым уровнем инкапсуляции.

В Reacton это делается с помощью определения свойства [mode](#mode) в эспортируемом объекте компонента. Данное свойство может иметь значение "open" или "closed" и, кроме этого, его нельзя использовать с модифицированными при помощи свойства [extends](#extends) компонентами.

В качестве примера, мы снова воспользуемся нашим двумя компонентами Hello и Bye. Но прежде, вернём файлу *index.html* его исходный вид:

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
    // передать название файла с компонентами библиотеке Reacton
    Reacton('Hello.htm')
  </script>
</body>
</html>
```

Теперь внесите изменения в файл *Hello.htm*, как показано ниже:

```html
<!-- определить компонент Hello  -->
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <app-bye>
    <!-- передать содержимое в слот по умолчанию компонента Bye -->
    {{ message }}
  </app-bye>

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
</app-hello>


<!-- определить компонент Bye  -->
<app-bye>
  <!-- вывести содержимое из компонента Hello в элемент SLOT -->
  <p>Пока, <slot></slot>...</p>

  <script>
    // экспортировать объект компонента
    exports = {
      // определить Теневой DOM с открытым уровнем инкапсуляции
      mode: 'open'
    }
  </script>
</app-bye>
```

Обратите внимание на свойство **mode** в экспортируемом объекте компонента Bye, которое задаёт ему Теневой DOM с открытым уровнем инкапсуляции:

```js
exports = {
  // определить Теневой DOM с открытым уровнем инкапсуляции
  mode: 'open'
}
```

Без этого свойства, содержимое из родительского компонента Hello не будет передано в элемент SLOT дочернего компонента Bye.

Аналогичным образом, можно передавать содержимое и в именованные слоты, как показано ниже:

```html
<!-- определить компонент Hello  -->
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <app-bye>
    <!-- передать содержимое в слот по умолчанию компонента Bye -->
    {{ message }}

    <!-- передать содержимое массива цветов
      в именованный слот colors компонента Bye -->
    <pre slot="colors">{{ colors }}</pre>
  </app-bye>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          message: 'Reacton',
          // создать массив цветов RGB
          colors: ['красный', 'зелёный', 'синий']
        }
      }
    }
  </script>
</app-hello>


<!-- определить компонент Bye  -->
<app-bye>
  <!-- вывести содержимое из компонента Hello в элемент SLOT -->
  <p>Пока, <slot></slot>...</p>

  RGB
  <!-- cоздать именованный слот colors для получения
    элемента PRE с массивом цветов из компонента Hello -->
  <slot name="colors"></slot>

  <script>
    // экспортировать объект компонента
    exports = {
      // определить Теневой DOM с открытым уровнем инкапсуляции
      mode: 'open'
    }
  </script>
</app-bye>
```

Кроме этого, при использовании компонентов с Теневым DOM, рекомендуется ознакомиться и со способами их [стилизации](https://learn.javascript.ru/shadow-dom-style), и с реализацией в таких компонентах [событий](https://learn.javascript.ru/shadow-dom-events).

<br>
<br>
<h2 id="cycles"># Циклы</h2>

<br>

Reacton поддерживает три вида циклов **for**, которые реализованы в  JavaScript. Это циклы: *for*, *for-in* и *for-of* соответственно. Все они определяются с помощью специального атрибута ***$for*** и выводят содержимое элементов в которых используется данный атрибут столько раз, сколько предусмотрено условием цикла.

<br>

<h3 id="for"># for</h3>

Давайте начнём с самого просто цикла *for*. Внесите изменения в компонет Hello, как показано ниже:

```html
<app-hello>
  <!-- определить цикл for для элемента DIV -->
  <div $for="i = 0; i <= 10; i++">
    <!-- содержимое, которое будет выводиться в цикле -->
    <p>Число: {{ i }}</p>
  </div>
</app-hello>
```

Данный цикл выведет 11 параграфов с числами от 0 до 10. Обратите внимание, что в атрибуте ***$for*** нельзя использовать операторы определения переменных *var*, *let* и *const* соответственно.

Пример ниже приведёт к ошибке:

```html
<app-hello>
  <!-- Ошибка! В атрибуте $for нельзя использовать операторы определения переменных -->
  <div $for="var i = 0; i <= 10; i++">
    <!-- содержимое, которое будет выводиться в цикле -->
    <p>Число: {{ i }}</p>
  </div>
</app-hello>
```

<br>

<h3 id="for-in"># for-in</h3>

Теперь давайте выведем содержимое объекта с помощью цикла *for-in*, как показано ниже:

```html
<app-hello>
  <!-- определить цикл for-in для элемента UL -->
  <ul $for="prop in user">
    <li>
      <!-- выводит название свойства и его значение -->
      <b>{{ prop }}</b> = {{ user[prop] }}
    </li>
  </ul>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // создать объект пользователя
          user: {
            name: 'Иван Васильевич',
            age: 36
          }
        }
      }
    }
  </script>
</app-hello>
```

Данный цикл покажет название каждого свойства объекта и его значение:

> <b>name</b> = Иван Васильевич<br><b>age</b> = 36

<br>

<h3 id="for-of"># for-of</h3>

Для ознакомления с последним циклом *for-of*, давайте создадим массив с цветами RGB:

```html
<app-hello>
  <!-- определить цикл for-of для элемента UL -->
  <ul $for="col of colors">
    <li>
      <!-- выводит значение элемента массива -->
      {{ col }}
    </li>
  </ul>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // создать массив цветов RGB
          colors: ['красный', 'зелёный', 'синий']
        }
      }
    }
  </script>
</app-hello>
```

Данный цикл просто отобразит цвета в формате RGB:

> красный<br>зелёный<br>синий

Кроме этого, элементы цикла могут иметь события, которые мы подробно рассмотрим в следующем разделе, а пока, давайте добавим событие *click*, каждому элементу LI в цикле:

```html
<app-hello>
  <!-- определить цикл for-of для элемента UL -->
  <ul $for="col of colors">
    <!-- добавить событие click элементу LI -->
    <li @click="console.log(col)">
      <!-- выводит значение элемента массива -->
      {{ col }}
    </li>
  </ul>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // создать массив цветов RGB
          colors: ['красный', 'зелёный', 'синий']
        }
      }
    }
  </script>
</app-hello>
```

<span id="actual">Здесь</span> стоит отдельно обратить внимание на актуальное взаимодействие событий и переменных циклов компонента. Даже после обращения массива, для чего введите в консоли браузера команду:

```
hello.$data.colors.reverse()
```

событие всегда будет использовать актуальное значение переменной для элемента, в котором данное событие используется.

В Reacton можно использовать циклы с любой глубиной вложенности:

```html
<app-hello>
  <!-- определить цикл for-of для элемента DIV -->
  <div $for="user of users">
    <div>
      <p>
        <b>Имя</b>: {{ user.name }}
      </p>
      <p>
        <b>Возраст</b>: {{ user.age }}
      </p>
      <!-- определить цикл for-in для элемента DIV -->
      <div $for="category in user.skills">
        <b>{{ category[0].toUpperCase() + category.slice(1) }}</b>:
        <!-- определить цикл for-of для элемента OL -->
        <ol $for="item of user.skills[category]">
          <li>{{ item }}</li>
        </ol>
      </div>
    </div>
    <hr>
  </div>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // создать массив пользователей
          users: [
            {
              name: 'Дмитрий',
              age: 28,
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
      }
    }
  </script>
</app-hello>
```

Трёхуровневый цикл выше, выводит детальную информацию о каждом пользователе из массива **users**, задействуя для этого два внутренних цикла.

<br>
<br>
<h2 id="events"># События</h2>

<br>

Все специальные атрибуты событий, начинаются в Reacton с символа ***@***, за которым следует название события. Давайте создадим событие *click* для элемента H1, которое будет изменять значение свойства **message**, как показано ниже:

```html
<app-hello>
  <!-- определить событие click для элемента H1 -->
  <h1 @click="message = 'Веб-компоненты'">Привет, {{ message }}!</h1>

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
</app-hello>
```
Внутри атрибута событий нет необходимости использовать двойные фигурные скобки. Кроме этого, все атрибуты событий могут иметь параметры, которые задаются через точечную нотацию и соответствуют названиям объекта параметров, передаваемого в третьем аргументе методу [addEventListener](https://learn.javascript.ru/introduction-browser-events#addeventlistener).

В качестве примера, зададим параметр **once** событию *click*, который означает, что событие сработает всего один раз:

```html
<app-hello>
  <!-- определить событие click и параметр once для элемента H1 -->
  <h1 @click.once="console.log(Math.random())">Привет, {{ message }}!</h1>

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
</app-hello>
```

Однако, ничто не мешает передать в событие сразу все параметры, используя для этого точечную нотацию:

```html
<app-hello>
  <!-- определить событие click и параметры once, capture и passive, для элемента H1 -->
  <h1 @click.once.capture.passive="console.log(Math.random())">Привет, {{ message }}!</h1>

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
</app-hello>
```

Как уже было сказано [ранее](#actual), все события в циклах используют актуальные значения его переменных, даже после различных манипуляций с ними.

Давайте добавим кнопку для обращения массива и убедимся в том, что после нажания на эту кнопку, цвета выводимые событиями, будут актуальны цветам элементов, в которых они используются:

```html
<app-hello>
  <!-- добавить событие click элементу BUTTON -->
  <button @click="colors.reverse()">Обратить массив</button>

  <ul $for="col of colors">
    <!-- добавить событие click элементу LI -->
    <li @click="console.log(col)">{{ col }}</li>
  </ul>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // создать массив цветов RGB
          colors: ['красный', 'зелёный', 'синий']
        }
      }
    }
  </script>
</app-hello>
```

В качестве последнего примера, давайте создадим калькулятор реального времени для расчёта площади, используя для этого событие *input* элемента INPUT, как показано ниже:

```html
<app-hello>
  <!-- добавить событие input элементу INPUT -->
  Длина: <input type="number" @input="length = event.target.value">

  <!-- добавить событие input элементу INPUT -->
  Ширина: <input type="number" @input="width = event.target.value">

  = <span>{{ length * width }}</span>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          length: 0,
          width: 0
        }
      }
    }
  </script>
</app-hello>
```

Обратите внимание, что для доступа к целевому элементу события, т.е. к элементу INPUT, чтобы получить вводимое значение, внутри атрибута события используется команда:

```js
event.target.value
```

Данный пример можно немного улучшить, добавив ему небольшую визуализацию:

```html
<app-hello>
  <!-- добавить событие input элементу INPUT -->
  Длина: <input type="number" value="{{ length }}" @input="length = event.target.value">

  <!-- добавить событие input элементу INPUT -->
  Ширина: <input type="number" value="{{ width }}" @input="width = event.target.value">

  = <span>{{ length * width }}</span>px

  <!-- визуально отображает размеры -->
  <div></div>

  <style>
    div {
      margin-top: 15px;
      height: {{ length }}px;
      width: {{ width }}px;
      background: green;
    }
  </style>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          length: 120,
          width: 120
        }
      }
    }
  </script>
</app-hello>
```

Все события без исключения, имеют объект события [event](https://learn.javascript.ru/introduction-browser-events#obekt-sobytiya), свойство [target](https://learn.javascript.ru/bubbling-and-capturing#event-target) которого, всегда ссылается на элемент, на котором это событие и произошло.

<br>
<br>
<h2 id="boolean"># Булевы атрибуты</h2>

<br>

Булевы или [логические](http://htmlbook.ru/samouchitel-html5/atributy) атрибуты, определяются в Reacton с помощью уже знакомого нам символа доллара ***$*** и следующего за ним названия логического атрибута. Все специальные атрибуты, которые начинаются со знака доллара, кроме атрибутов циклов и видов, о которых будет рассказано в следующем разделе, воспринимаются в Reacton как логические.

На практике это означает, что если атрибут начинается со знака доллара, но не является ни циклом, ни видом, то это специальный логический атрибут. При этом, если его значение вычисляется как Истина, то в HTML-элемент, которому он принадлежит, добавляется стандартный логический атрибут. И наоборот, в случае значения Ложь специального логического атрибута, стандартный логический атрибут удаляется из его HTML-элемента.

<br>

<h3 id="hidden"># $hidden</h3>

В качестве примера, давайте попробуем скрыть/показать заголовок компонента Hello, в который добавлен специальный логический атрибут ***$hidden***, как показано ниже:

```html
<app-hello>
   <!-- добавить событие click элементу BUTTON -->
  <button @click="hide = !hide">Скрыть/Показать</button>

  <!-- добавить специальный логический атрибут hidden элементу H1 -->
  <h1 $hidden="hide">Привет, Reacton!</h1>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          hide: false
        }
      }
    }
  </script>
</app-hello>
```

При нажатии на кнопку Скрыть/Показать, значение пользовательского свойства **hide** будет инвертироваться и, соответственно, заголовок компонента будет скрываться/отображаться на экране. Т.е. ему будет добавляться/удаляться стандартный логический атрибут [hidden](http://htmlbook.ru/html/attr/hidden).

<br>

<h3 id="disabled"># $disabled</h3>

Можно добавлять любые логические атрибуты элементам, которые содержатся в компонентах. Например, добавим специальный логический атрибут ***$disabled***, который добавляет/удаляет стандартный логический атрибут [disabled](http://htmlbook.ru/html/input/disabled) полю ввода:

```html
<app-hello>
   <!-- добавить событие click элементу BUTTON -->
  <button @click="freeze = !freeze">Заморозить/Разморозить</button>

  <!-- добавить специальный логический атрибут disabled элементу INPUT -->
  <input $disabled="freeze">

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          freeze: false
        }
      }
    }
  </script>
</app-hello>
```

Аналогичным образом, можно создавать специальные логические атрибуты для любых стандартных логических атрибутов, которые допускаются для элемента в HTML.

<br>
<br>
<h2 id="views"># Виды</h2>

<br>

Мы уже познакомились со свойством объекта компонента [extends](#extends), которое позволяет модифицировать компонет таким образом, чтобы при его монтировании можно было использовать стандартный HTML-элемент. Одним из существенных недостатков атрибута [is](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/is), который используется при модификации компонентов, представляется тот факт, что он является статическим, а не динамическим. Это означает, что после монтирования, при изменении значения данного атрибута, например, на название другого компонента, содержимое элемента, в который монтируется компонент, не изменится. Данную проблему решают т.н. виды, которые определяются с помощью специального атрибута ***$view***.

Для примера нам потребуются несколько простых компонентов. Добавьте в файл *Hello.htm* три компонента, как показано ниже:

```html
<!-- определить компонент A  -->
<app-a extends="main">
  <h1>Компонент A</h1>
</app-a>

<!-- определить компонент B  -->
<app-b extends="main">
  <h1>Компонент B</h1>
</app-b>

<!-- определить компонент C  -->
<app-c extends="main">
  <h1>Компонент C</h1>
</app-c>
```

Обратите внимание на использование во всех трёх компонентах атрибута ***extends*** со значением "main". Все три компонента будут монтироваться в стандартный HTML-элемент MAIN.

Теперь изменим сам компонент HELLO, который находится в этом же файле:

```html
<!-- определить компонент Hello  -->
<app-hello>

  <!-- переключают виды элемента MAIN -->
  <button @click="view = 'app-a'">Компонент A</button>
  <button @click="view = 'app-b'">Компонент B</button>
  <button @click="view = 'app-c'">Компонент C</button>

  <!-- добавить элементу MAIN специальный атрибут $view -->
  <main $view="view"></main>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // начальное значение вида
          view: 'app-a'
        }
      }
    }
  </script>
</app-hello>
```

При нажатии на каждую кнопку будет срабатывать событие *click*, что приведёт к изменению значения пользовательского свойства **view**, которое используется в специальном атрибуте ***$view*** и, следовательно, содержимое элемента MAIN тоже будет меняться.

В данном примере, пользовательское свойство **view** содержит текстовое значение, которое представляет название модифицируемого компонента. Но данное свойство может содержать и объект, который содержит обязательное свойство **name**, содержащее название компонента, и необязательное свойство **content**, содержащее HTML-содержимое, передаваемое в слот модифицируемого компонента.

Давайте переопределим второй компонент B, как показано ниже:

```html
<!-- определить компонент B  -->
<app-b extends="main">
  <h1>Компонент B</h1>

  <!-- слот по умолчанию -->
  <slot></slot>

  <!-- именованный слот -->
  <slot name="color"></slot>

  <script>
    // экспортировать объект компонента
    exports = {
      /* добавить компоненту Теневой DOM
        с открытым уровнем инкапсуляции */
      mode: 'open'
    }
  </script>
</app-b>
```

Не забудьте добавить компоненту содержащему слоты Теневой DOM и любой из двух уровней инкапсуляции.

Теперь внесём изменения в компонент Hello:

```html
<!-- определить компонент Hello  -->
<app-hello>

  <!-- переключить вид элемента MAIN на компонент A -->
  <button @click="view = 'app-a'">Компонент A</button>
  
  <!-- присвоить пользовательскому свойству view объект вида,
    чтобы переключить вид элемента MAIN на компонент B -->
  <button @click="view = obj">Компонент B</button>
  
  <!-- переключить вид элемента MAIN на компонент C -->
  <button @click="view = 'app-c'">Компонент C</button>

  <!-- добавить элементу MAIN специальный атрибут $view -->
  <main $view="view"></main>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // начальное значение вида
          view: 'app-a',
          // определить объект для вида компонента B
          obj: {
            name: 'app-b',
            content: `
              <p>Содержимое слота по умолчанию</p>
              <span slot="color">Красный</span>
            `
          }
        }
      }
    }
  </script>
</app-hello>
```

В этом примере мы определили объект для вида компонента B. Данный объект содержит название компонента и HTML-содержимое в свойстве **content**, которое добавляется в слоты компонента B, при переключении его вида. 

Кроме этого, все модифицируемые компоненты имеют доступ к атрибутам элемента, в который они монтируются. Давайте добавим элементу MAIN атрибут ***title***, содержащий простое информационное сообщение:

```html
<main title="элемент монтирования" $view="view"></main>
```

и выведем это значение в компоненте C, как показано ниже:

```html
<!-- определить компонент C  -->
<app-c extends="main">
  <h1>Компонент C</h1>

  <!-- вывести значение атрибута title из элемента MAIN -->
  <p>{{ this.title }}</p>
</app-c>
```

Таким образом, виды предоставляют мощный механизм переключения между различными компонентами, используя для этого всего один элемент монтирования, такой, например, как элемент MAIN или любой другой, наиболее подходящий для логики разметки приложения.

<br>
<br>
<h2 id="observer"># Наблюдатель</h2>

<br>

Мы плавно подходим к завершению руководства по Reacton, осталось рассмотреть две последние темы, и можно будет приступать к созданию полноценного приложения и последующему за ним, серверному рендерингу.

[Наблюдатель](https://ru.wikipedia.org/wiki/%D0%9D%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)) необходим для обмена информацией между различными компонентами приложения, посредством [пользовательских](https://learn.javascript.ru/dispatch-events) событий. Наблюдатель отличается от [параметров](#parameters) тем, что позволяет взаимодействовать не только между родительскими и дочерними компонентами, но и между любыми компонентами, никак не связанными друг с другом иерархическими связями главный-подчинённый.

Например, кнопка из компонента Footer, в самом низу сайта, может изменить цвет заголовка в компоненте Header, что находится в самом его верху. В иерархии эти два компонента считаются соседними, поэтому использовать параметры, применяемые лишь для взаимодействия между родительскими и дочерними компонентами, в этом случае не получится.

Здесь на помощь приходит реализованная в Reacton технология Наблюдателя. На самом деле, [технология](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya) пользовательских событий реализована в самом JavaScript, а Reacton лишь немного делает её лучше.

Давайте рассмотрим работу пользовательских событий, пока на примере одного компонента Hello. Внесите в него изменения, как показано ниже:

```html
<app-hello>
  <h1>Привет, {{ message }}!</h1>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          message: 'Reacton'
        }
      },
      connected() {
        // добавить обработчик для пользовательского события my-hello
        this.addEventListener('my-hello', () => {
          // изменить значение пользовательского свойства message
          this.$data.message = 'Веб-компоненты'
        })

        // запустить событие my-hello через 1 секунду
        setTimeout(() => this.$event('my-hello'), 1000)
      }
    }
  </script>
</app-hello>
```

Здесь всё очень просто и почти ничем не отличается от [стандартной](https://learn.javascript.ru/dispatch-events) реализации. Сначала мы назначаем обработчик события для всего компонента, а затем, через секунду, мы вызываем пользовательское событие, используя для этого специальный метод **$event**. В первом аргументе этого метода, ему передаётся название события в виде строки.

Кроме этого, во втором аргументе данного метода, ему можно передать все те же самые параметры, в виде объекта, которые передаются конструктору [Event](https://learn.javascript.ru/dispatch-events#konstruktor-event) и, соответственно, конструктору [CustomEvent](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya), включая и свойство **detail**, в котором можно указывать информацию для передачи в событие.

Давайте перепишем предыдущий пример, используя для этого свойство **detail**, чтобы передать в событие массив для его обращения:

```html
<app-hello>
  <!-- выводит массив цветов в виде отформатированного JSON -->
  <pre>{{ colors }}</pre>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // создать массив цветов RGB
          colors: ['красный', 'зелёный', 'синий']
        }
      },
      connected() {
        // добавить обработчик для пользовательского события arr-reverse
        this.addEventListener('arr-reverse', event => {
          // обратить массив цветов из полученного свойства detail
          event.detail.reverse()
        })

        /* запустить событие arr-reverse и передать ему массив цветов
          с помощью свойства detail, через 1 секунду после монтирования компонента */
        setTimeout(() => this.$event('arr-reverse', {
          detail: this.$data.colors
        }), 1000)
      }
    }
  </script>
</app-hello>
```

Доступ к свойству **detail** внутри обработчика события, осуществляется через объект события [event](https://learn.javascript.ru/introduction-browser-events#obekt-sobytiya), как показано ниже:

```js
this.addEventListener('arr-reverse', event => {
  // обратить массив цветов из полученного свойства detail
  event.detail.reverse()
})
```

В этом примере нет ничего необычного, однако, перед тем, как переходить к теме взаимодействия пользовательских событий между различными компонентами, необходимо пояснить, как мы задавали обработчик и вызывали пользовательское событие.

Обратите внимание, что и перед обработчиком, т.е. перед стандартным методом **addEventListener** и перед специальным **$event**, использовалось ключевое слово **this**, как показано ниже:

```js
connected() {
  // добавить обработчик для пользовательского события arr-reverse
  this.addEventListener('arr-reverse', event => {
    // обратить массив цветов из полученного свойства detail
    event.detail.reverse()
  })

  /* запустить событие arr-reverse и передать ему массив цветов
    с помощью свойства detail, через 1 секунду после монтирования компонента */
  setTimeout(() => this.$event('arr-reverse', {
    detail: this.$data.colors
  }), 1000)
}
```

Во всех методах объекта компонента, таких, например, как **connected**, ключевое слово **this** всегда ссылается на сам компонент. Это означает, что мы задавали обработчик события компоненту Hello, и вызывали для него пользовательское событие *arr-reverse*.

Для взаимодействия между различными компонентами, необходим какой-то глобальный общий объект. И таким объектом является объект [document](https://developer.mozilla.org/ru/docs/Web/API/Document).

Перепишем предыдущий пример, задействуя этот глобальный объект. Для этого достаточно лишь заменить ключевое слово **this**, на ключевое слово **document** в обработчике:

```js
document.addEventListener('arr-reverse', event => {
  // обратить массив цветов из полученного свойства detail
  event.detail.reverse()
})
```

и вызвать специальный метод **$event** с помощью функции [call](https://learn.javascript.ru/call-apply-decorators#primenenie-func-call-dlya-peredachi-konteksta), которая принудительно устанавливает контекст вызывающей функции, передав ей в качестве контекста в первом аргументе, всё тот же объект **document**, как показано ниже:

```js
setTimeout(() => this.$event.call(document, 'arr-reverse', {
  detail: this.$data.colors
}), 1000)
```

Поскольку теперь мы испольузем глобальный объект **document** в качестве источника событий, мы можем легко наладить взаимодействие между различными компонентами. Но перед этим, давай рассмотрим ещё один пример с использованием события *click* для кнопки, и вызова из него специального метода **$event** в контексте объекта **document**.

Внесите изменения в компонент HELLO, как показано ниже:

```html
<app-hello>
  <!--  запустить событие arr-reverse и передать ему массив цветов
    с помощью свойства detail, используя событие click элемента BUTTON -->
  <button @click="$event('arr-reverse', { detail: colors })">Обратить массив</button>

  <!-- выводит массив цветов в виде отформатированного JSON -->
  <pre>{{ colors }}</pre>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // создать массив цветов RGB
          colors: ['красный', 'зелёный', 'синий']
        }
      },
      connected() {
        // добавить обработчик для пользовательского события arr-reverse
        document.addEventListener('arr-reverse', event => {
          // обратить массив цветов из полученного свойства detail
          event.detail.reverse()
        })
      }
    }
  </script>
</app-hello>
```

При вызове метода **$event** без контекста, ему автоматически устанавливается контекст объекта **document**, как в нашем случае:

```html
<button @click="$event('arr-reverse', { detail: colors })">Обратить массив</button>
```

Теперь давайте создадим второй компонент, назовём его, например, ARRAY, в который мы будем передавать массив из компонента HELLO, используя рассмотренное выше свойство **detail**. 

Добавьте новый компонент в файл *Hello.htm*:

```html
<!-- определить компонент Array  -->
<app-array>
  <!-- выводит значение пользовательского свойства array
    в виде отформатированного JSON -->
  <pre>{{ array }}</pre>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // создать пользовательское свойство array
          array: null
        }
      },
      connected() {
        // добавить обработчик для пользовательского события arr-reverse
        document.addEventListener('arr-reverse', event => {
          /* получить массив цветов из компонента HELLO с помощью свойства detail
            и присвоить его значение пользовательскому свойству array */
          this.$data.array = event.detail
          
          // обратить полученный массив
          this.$data.array.reverse()
        })
      }
    }
  </script>
</app-array>
```

Внутри обработчика пользовательского события *arr-reverse*, мы получаем массив из компонента HELLO, присваиваем его пользовательскому свойству **array** и, затем, мы этот массив обращаем.

Давайте добавим тег монтирования нового компонента в файл *index.html*:

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
  
  <!-- монтировать компонент Array в приложение -->
  <app-array></app-array>

  <!-- загрузить библиотеку Reacton -->
  <script src="reacton.js"></script>

  <script>
    // передать название файла с компонентами библиотеке Reacton
    Reacton('Hello.htm')
  </script>
</body>
</html>
```

Внесите изменения в содержимое компонента HELLO, как показано ниже:

```html
<!-- определить компонент Hello  -->
<app-hello>
  <!--  запустить событие arr-reverse и передать ему массив цветов
    с помощью свойства detail, используя событие click элемента BUTTON -->
  <button @click="$event('arr-reverse', { detail: colors })">Передать массив</button>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // создать массив цветов RGB
          colors: ['красный', 'зелёный', 'синий']
        }
      }
    }
  </script>
</app-hello>
```

Здесь тоже всё очень просто. При нажатии на кнопку, пользовательское свойство **colors**, т.е. массив цветов, передаётся в событие  *arr-reverse* глобального объекта **document**, во втором аргументе метода **$event**, используя для передачи свойство **detail**.

В следующем разделе мы познакомимся с маршрутизатором, в основе которого, тоже лежат рассмотренные здесь пользовательские события.

<br>
<br>
<h2 id="router"># Маршрутизатор</h2>

<br>

Здесь мы рассмотрим маршрутизатор, предоставляемый библиотекой Reacton. Данный маршрутизатор имеет некоторую схожесть с маршрутизатором, который предлагает [Express](https://expressjs.com/ru/guide/routing.html). В основе маршрутизатора Reacton лежат рассмотренные ранее [пользовательские события](#observer), но с некоторыми улучшениями, например, как и в Express, название события может представлять собой строку [регулярного выражения](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp). Кроме этого, поддерживаются и [параметры маршрута](https://metanit.com/web/nodejs/4.15.php).

Для объяснения работы маршрутизатора, нам потребуются три простых компонента, которые будут представлять из себя три страницы приложения.

Добавьте эти компоненты в файл *Hello.htm*, как показано ниже:

```html
<!-- определить компонент Home  -->
<app-home extends="main">
  <h1>Главная страница</h1>
</app-home>

<!-- определить компонент About  -->
<app-about extends="main">
  <h1>О нас</h1>
</app-about>

<!-- определить компонент Contacts  -->
<app-contacts extends="main">
  <h1>Контакты</h1>
</app-contacts>
```

Обратите внимание, что все три компонента имеют атрибут ***extends*** со значением "main". Эти компоненты будут модифицированы для стандартного HTML-элемента MAIN. Маршрутизация в Reacton активно использует [виды](#views).

Теперь добавим меню для этих страниц в компонент Hello, который находится в том же файле:

```html
<app-hello>
  <!-- меню для компонентов страниц -->
  <nav>
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
    <a href="/contacts">Контакты</a>
  </nav>
</app-hello>
```

Затем, мы добавим HTML-элемент MAIN с атриутом ***$view*** для создания [вида](#views), в котором они будут отображаться:

```html
<app-hello>
  <!-- меню для компонентов страниц -->
  <nav>
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
    <a href="/contacts">Контакты</a>
  </nav>

  <!-- вид для отображения компонентов страниц -->
  <main $view="page"></main>
</app-hello>
```

и пользовательское свойство **page**, которое будет менять значение этого вида:

```html
<app-hello>
  <!-- меню для компонентов страниц -->
  <nav>
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
    <a href="/contacts">Контакты</a>
  </nav>

  <!-- вид для отображения компонентов страниц -->
  <main $view="page"></main>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // содержит значение вида
          page: ''
        }
      }
    }
  </script>
</app-hello>
```

Для создания маршрутизатора, используется специальный метод **$router**, в первом аргументе которого, ему передаётся HTML-элемент для отслеживания всех событий-маршрутов или по-другому, - просто путей.

Все шелчки мышью вне этого HTML-элемента игнорируются маршрутизатором. Кроме этого, игнорируются и все щелчки не по ссылкам, внутри данного элемента, равно как и ссылки, ведущие на [другие источники](https://learn.javascript.ru/cross-window-communication#same-origin), т.е. такие, у которых значение свойства **origin**, отличается от значения свойства [location.origin](https://developer.mozilla.org/en-US/docs/Web/API/Location/origin). Точно так же игнорируются и ссылки на все файлы, внутри элемента маршрутизатора.

Давайте добавим маршрутизатор для HTML-элемента NAV нашего компонента Hello, как показано ниже:

```html
<app-hello>
  <!-- меню для компонентов страниц -->
  <nav>
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
    <a href="/contacts">Контакты</a>
  </nav>

  <!-- вид для отображения компонентов страниц -->
  <main $view="page"></main>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // содержит значение вида
          page: ''
        }
      },
      connected() {
        // добавить маршрутизатор для элемента NAV
        this.$router(this.$('nav'))
      }
    }
  </script>
</app-hello>
```

Процедура добавления маршрутизатора, обычно, выполняется в методе [connected](#connected-disconnected-adopted).


Во втором аргументе специального метода **$router**, ему передаётся объект с методами, названия которых, представляют пути для остлеживания, а значения, являются обработчиками, выполняемыми при совпадении пути (т.е. названия метода) и свойства [location.href](https://developer.mozilla.org/en-US/docs/Web/API/Location/href).

Добавьте три метода-обработчика для отслеживания событий-маршрутов:

```html
<app-hello>
  <!-- меню для компонентов страниц -->
  <nav>
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
    <a href="/contacts">Контакты</a>
  </nav>

  <!-- вид для отображения компонентов страниц -->
  <main $view="page"></main>

  <script>
    // экспортировать объект компонента
    exports = {
      data() {
        return {
          // содержит значение вида
          page: ''
        }
      },
      connected() {
        // добавить маршрутизатор для элемента NAV
        this.$router(this.$('nav'), {
          // обработчик для маршрута '/'
          '/': () => this.$data.page = 'app-home',
          // обработчик для маршрута '/about'
          '/about': () => this.$data.page = 'app-about',
          // обработчик для маршрута '/contacts'
          '/contacts': () => this.$data.page = 'app-contacts'
        })
      }
    }
  </script>
</app-hello>
```

Маршрутизатор начинает срабатывать сразу же при подключении компонента к документу. Он сравнивает текущее значение свойства [location.href](https://developer.mozilla.org/en-US/docs/Web/API/Location/href), со всеми названиями методов, которые мы передали ему во втором аргументе, как показано выше.

Как только машрутизатор найдёт совпадение значения свойства **location.href** с названием метода, то будет выполнен соответствующий обработчик. Внутри такого обработчика, мы просто присваиваем пользовательскому свойству **page** название компонента представляющего страницу, а дальше, вступают в работу уже рассмотренные ранее [виды](#views). Когда мы щёлкаем по ссылкам в меню, вся эта процедура повторяется заново: Поиск-Совпадение-Вид.

Обратите внимание, что для обработчиков маршрутов, были использованы стрелочные функции, чтобы ключевое слово **this** внутри них, всегда ссылалось на компонент. С помощью этого ключевого слова, мы получаем доступ к объекту данных компонента, внутри которого находится свойство **page**.

Как уже было сказано ранее, пути маршрутов можно задавать в виде регулярных выражений в строке. Давайте изменим последний маршрут, как показано ниже:

```js
// обработчик для маршрута '/contacts' или '/communication'
'/contacts|communication': () => this.$data.page = 'app-contacts'
```

и значение ссылки в меню:

```html
<a href="/communication">Контакты</a>
```

При щелчке по этой ссылке, компонент Contacts будет отображаться в виде HTML-элемента MAIN. Кроме этого, можно указать на необязательность некоторых символов в маршруте, например:

```js
// обработчик для маршрута '/about' или '/about-us'
'/about(-us)?': () => this.$data.page = 'app-about'
```

Это сработает как для ссылки:

```html
<a href="/about">О нас</a>
```

так и для:

```html
<a href="/about-us">О нас</a>
```

Подробнее о регулярных выражениях можно почитать [здесь](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp). Важно лишь помнить, что при использование символа обратного слэша (\\) в строке маршрута, его необходимо экранировать дважды.

Добавьте новый путь для вывода ID пользователя на консоль:

```js
// обработчик для маршрута '/users/\?id=\d'
'/users/\\?id=\\d': event => console.log(event.url.searchParams.get('id'))
```

и новую ссылку в меню:

```html
<a href="/users/?id=1">ID</a>
```

Маршрутизатор преобразует этот путь в регулярное выражение вида:

```js
/^\/users\/\?id=\d\/?$/
```

и сравнит его со значением ссылки:

```js
"/users/?id=1"
```

Сравнение происходит по схеме: [location.href](https://developer.mozilla.org/en-US/docs/Web/API/Location/href) минус [location.origin](https://developer.mozilla.org/en-US/docs/Web/API/Location/origin), затем, оставшаяся после удаления **origin** часть **href**, сравнивается со значением ссылки, начиная с первого его символа и заканчивая последним, с возможным добавлением слэша (/) в конце, но не являющегося обязательным.

Другими словами, обе ссылки:

```html
<a href="/about">Контакты</a>
<a href="/about/">Контакты</a>
```

одинаково сработают для маршрута:

```js
// обработчик для маршрута '/about'
'/about': () => this.$data.page = 'app-about'
```

Обратите внимание на предпоследний пример с ID пользователя:

```js
// обработчик для маршрута '/users/\?id=\d'
'/users/\\?id=\\d': event => console.log(event.url.searchParams.get('id'))
```

Для получения доступа к параметра запроса (не путать с параметрами маршрута), в объект **event** обработчика события маршрута, добавляется свойство [url](https://learn.javascript.ru/url), которое содержит свойство [searchParams](https://learn.javascript.ru/url#searchparams) для работы с параметрами, например, метод **get**.


Последнее, что осталось рассмотреть, это как рабоатать с [параметрами маршрута](https://metanit.com/web/nodejs/4.15.php), которые не стоит путать с параметрами запроса рассмотренного выше.

Добавьте две новые ссылки в меню:

```html
<a href="/phones">Телефоны</a>
<a href="/tablets">Планшеты</a>
```

и два новых компонента в файл *Hello.htm*, как показано ниже:

```html
<!-- определить компонент Phones  -->
<app-phones extends="main">
  <h1>Телефоны</h1>
</app-phones>

<!-- определить компонент Tablets  -->
<app-tablets extends="main">
  <h1>Планшеты</h1>
</app-tablets>
```

<span id="route-parameters">Параметры маршрута</span> представляют именованные сегменты URL-адреса. Для получения сегмента в обеих ссылках идущего после начального слэша (/), применяются параметры, которые позволяют задать такому сегменту имя, предваряя его символом двоеточия.

Добавьте обработчик для параметра *:category*, как показано ниже:

```js
// обработчик для параметра :category
'/:category': event => this.$data.page = `app-${event.params.category}`
```

Чтобы получить значение параметра в обработчике, в объекте **event** имеется свойство **params**, являющееся тоже объектом, который содержит все названия параметров и, соответствующие им значения сегментов.

Другими словами, при нажатии на ссылку:

```html
<a href="/phones">Телефоны</a>
```

значение параметра будет равняться "phones", а при щелчке по ссылке:

```html
<a href="/tablets">Планшеты</a>
```

параметр *:category* будет иметь значение "tablets". Кроме этого, можно задавать любое количество параметров в пути запроса.

Измените значение атрибута ***href*** ссылок, что мы использовали выше:

```html
<a href="/phones/3">Телефоны</a>
<a href="/tablets/5">Планшеты</a>
```

Внесите изменения в компоненты Phones и Tablets:

```html
<!-- определить компонент Phones  -->
<app-phones extends="main">
  <h1>Телефоны</h1>
  ID <slot></slot>

  <script>
    // экспортировать объект компонента
    exports = {
      // добавить компоненту открытый Теневой DOM
      mode: 'open'
    }
  </script>
</app-phones>

<!-- определить компонент Tablets  -->
<app-tablets extends="main">
  <h1>Планшеты</h1>
  ID <slot></slot>

  <script>
    // экспортировать объект компонента
    exports = {
      // добавить компоненту открытый Теневой DOM
      mode: 'open'
    }
  </script>
</app-tablets>
```

Здесь мы просто добавляем в компоненты [слоты](https://learn.javascript.ru/slots-composition) и [Теневой DOM](https://learn.javascript.ru/shadow-dom), для работы с этими слотами.

Теперь создадим новый обработчик для двух параметров:

```js
// обработчик для параметров :category и :id
'/:category/:id': event => {
  this.$data.page = {
    name: `app-${event.params.category}`,
    content: event.params.id
  }
}
```

Данный обработчик сработает при щелчке по любой из ссылок выше. Внутри него, мы присваиваем пользовательскому свойству **page** объект с двумя свойствами. Как мы помним, в [виды](#views) можно передавать объекты. Свойство **name** объекта вида, содержит название компонента, которое определяется из приставки *app-* и значения параметра *:category*.
В свою очередь, свойство объекта вида **content**, передаёт в слот компонента значение параметра *:id*.

Последний аргумент, который можно передать методу **$router**, является объектом и может содержать до семи свойств. Это свойства: **once**, **capture**, **passive**, **bubbles**, **cancelable**, **composed** и **detail**.

Первые три свойства добавляются HTML-элементу, к которому привязан маршрутизатор. Они аналогичны параметрам метода [addEventListener](https://learn.javascript.ru/introduction-browser-events#addeventlistener).

Например, пусть наш маршрутизатор сработает всего один раз:

```js
// добавить одноразовый маршрутизатор для элемента NAV
this.$router(this.$('nav'), {
  // обработчик для маршрута '/'
  '/': () => this.$data.page = 'app-home',
  // обработчик для маршрута '/about'
  '/about': () => this.$data.page = 'app-about',
  // обработчик для маршрута '/contacts'
  '/contacts': () => this.$data.page = 'app-contacts'
}, {
  once: true
})
```

Оставшиеся четыре, соответствуют параметрам конструктора [CustomEvent](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya) и передаются объектам событий, в том числе, и уже знакомое нам свойство **detail**, которое в этих примерах не было задействовано, ввиду отсутствия необходимости передавать в обработчики маршрутов пользовательские данные.

<br>
<br>
<h2 id="application-creation"># Создание приложения</h2>

<br>

В этом разделе мы создадим полноценное приложение, используя для этого систему сборки модулей [webpack](https://webpack.js.org/). Выходной файл будет называться *bundle.js* и содержать код всех компонентов и самой библиотеки Reacton. Само приложение будет выводить список пользователей разных категорий, с возможностью его сортировки и просмотра данных отдельного пользователя.

Создайте новый каталог, например, назовите его *app*. Откройте терминал из этого каталога, или перейдите в каталог из терминала, и инициируйте новый проект командой:

```
npm init -y
```

Эта команда создаст файл *package.json* с названием, описанием и другими данными проекта. Кроме этого, данный файл необходим для добавления зависимостей нашего проекта от других пакетов, таких, например, как webpack, с помощью которого мы будем собирать наш проект. Помимо сборщика модулей, нам потребуются и другие пакеты, в том числе, и для серверного рендеринга, который будет рассмотрен в следующем разделе.

Ниже представлено содержимое готового файла *package.json*. Скопируейте его и вставьте в свой файл:

```js
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "webpack serve",
    "build": "webpack --mode=production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.17.10",
    "@babel/plugin-transform-runtime": "^7.17.10",
    "@babel/preset-env": "^7.17.10",
    "babel-loader": "^8.2.5",
    "html-loader": "^3.1.0",
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.0"
  },
  "dependencies": {
    "express": "^4.18.1",
    "hbs": "^4.2.0",
    "jsdom": "^19.0.0",
    "nedb": "^1.8.0"
  }
}
```

Чтобы установить все пакеты за один раз, введите в терминале команду:

```
npm i
```

После выполнения этой команды, в каталоге *app* появится папка *node_modules* со всеми небходимыми для работы нашего приложения пакетами. Следующим шагом, будет создание файла конфигурации webpack.

Для этого, создайте в каталоге *app* файл webpack.config.js, как показано ниже:

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.html?$/, // выбрать файлы .html и .htm
        loader: "html-loader",
        options: {
          sources: false
        }
      },
      {
        test: /\.m?js$/, // выбрать файлы .js и .mjs
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: []
}

module.exports = (env, argv) => {
  config.mode = argv.mode === 'production' ? 'production' : 'development'

  // добавить плагин HtmlWebpackPlugin только для режима разработки
  if (config.mode === 'development') {
    config.plugins.push(new HtmlWebpackPlugin({
      template: './src/index.html'
    }))
  }

  return config
}
```

Плагин [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) здесь добавляется только для режима разработки. В режиме итоговой сборки, т.е. в режиме продакшен, он создаёт реальный файл *index.html*, который нам не потребуется, поскольку, для финального приложения, мы будем использовать фреймворк [Express](https://expressjs.com/ru/) и шаблонизатор [Handlebars](https://handlebarsjs.com/).

Теперь давайте создадим папку *src* внутри каталога *app*. В этой папке будет находиться всё исходное содержимое нашего проекта. Первое, что мы туда добавим, будет файл *index.html*, являющийся главным файлом создаваемого нами приложения.

Создайте файл *index.html* внутри папки *src*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
  <!-- подключить нормализацию стилей -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
</head>
<!-- монтировать главный компонент в элемент BODY -->
<body is="app-reacton"></body>
</html>
```

Здесь всё предельно просто, в теге LINK мы подключаем [нормализацию стилей](https://necolas.github.io/normalize.css/), а само приложение, т.е. главный компонент нашего приложения, будет модифицирован для его монтирования в элемент BODY.

Добавьте в папку *src* файл [reacton.mjs](https://raw.githubusercontent.com/reacton-js/reacton/main/reacton.mjs), являющийся модульной версией библиотеки Reacton.

Теперь мы создадим точку входа для сборщика модулей webpack. Такой точкой у нас будет файл *index.js*, который тоже располагается в папке *src*, вместе со всем остальным исходным содержимым для проекта.

Создайте этот файл, как показано ниже:

```js
// импортировать библиотеку Reacton
import Reacton from './reacton.mjs'

// импортировать компоненты приложения
import App from './components/App.htm'
import Header from './components/Header.htm'
import Menu from './components/Menu.htm'
import Footer from './components/Footer.htm'
import Home from './components/pages/Home.htm'
import List from './components/pages/List.htm'
import User from './components/pages/User.htm'
import Workers from './components/pages/Workers.htm'

// определить примеси для всех компонентов
Reacton.mixins = {
  // глоссарий для сегментов пути запроса
  glossary: {
    managers: 'Менеджеры',
    designers: 'Дизайнеры'
  },
  // коллатор для интернационализации строк
  collator: new Intl.Collator(),
  // метод для запроса к базе данных
  fetch(path) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', path)
    xhr.responseType = 'json'
    xhr.send()
    return new Promise(done => xhr.onload = () => done(xhr.response))
  },
  // динамически импортировать базу данных
  DB: import('./db')
}

// передать компоненты в библиотеку Reacton
Reacton(App, Header, Menu, Footer, Home, List, User, Workers)
```

В самом начале файла *index.js*, мы импортируем модульную версию библиотеки Reacton, затем, происходит импорт однофайловых компонентов, которые мы вскоре создадим.

Дальше у нас идёт определение примесей для всех компонентов нашего приложения. Первая примесь представляет собой глоссарий:

```js
// глоссарий для сегментов пути запроса
glossary: {
  managers: 'Менеджеры',
  designers: 'Дизайнеры'
}
```

для сопоставления сегментов пути запроса и вывода русскоязычного значения, соответствующего текущему значению пути.

Следующей примесью является коллатор:

```js
// коллатор для интернационализации строк
collator: new Intl.Collator()
```

который необходим для [интернационализации](https://learn.javascript.ru/intl) строк, например, при их сортировке, как будте покано далее.

После коллатора идёт метод для запроса к реальной базе данных:

```js
// метод для запроса к базе данных
fetch(path) {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', path)
  xhr.responseType = 'json'
  xhr.send()
  return new Promise(done => xhr.onload = () => done(xhr.response))
}
```

Данный метод будет применяться в компонентах нашего приложения, когда мы будем запускать наше приложение на условно-реальном сервере.

Необходимость в создании своего метода **fetch**, вместо использования [стандартного](https://learn.javascript.ru/fetch), обусловлена тем, что библиотека [jsdom](https://github.com/jsdom/jsdom), которая лежит в основе серверного рендеринга в Reacton, пока не поддерживает стандартный метод **fetch**, но отлично работает с объектом [XMLHttpRequest](https://learn.javascript.ru/xmlhttprequest).

Последней примесью является [динамически импортированная](https://learn.javascript.ru/modules-dynamic-imports) тестовая база данных:

```js
// динамически импортировать базу данных
DB: import('./db')
```

В режиме итоговой сборки, т.е. в режиме продакшена, когда происходит создание файла *bundle.js*, эта база данных в него не попадёт. Мы просто закомментируем данную строку, поскольку для готового приложения будет использоваться реальная база данных, а не тестовая.

Давайте создадим эту тестовую базу данных в папке *src* нашего приложения. Файл тестовой базы данных будет называться *db.js*, создайте этот файл, как показано ниже:

```js
export default [
  {
    id: 1,
    name: 'Иван',
    age: 28,
    category: 'managers'
  },
  {
    id: 2,
    name: 'Ольга',
    age: 32,
    category: 'designers'
  },
  {
    id: 3,
    name: 'Максим',
    age: 41,
    category: 'designers'
  },
  {
    id: 4,
    name: 'Олег',
    age: 36,
    category: 'managers'
  },
  {
    id: 5,
    name: 'Александр',
    age: 26,
    category: 'designers'
  },
  {
    id: 6,
    name: 'Наталья',
    age: 24,
    category: 'managers'
  },
  {
    id: 7,
    name: 'Анатолий',
    age: 31,
    category: 'managers'
  }
]
```

Эта база даннных представляет собой массив пользоватей двух категорий: дизайнеры и менеджеры.

Теперь пришло время заняться созданием компонентов. Все наши компоненты будут находиться внутри каталога *components*, расположенного внутри папки *src*. Создайте этот каталог.

Внутри каталога *components*, создайте файл главного компонента нашего приложения, который будет называться *App.htm*, и внесите в него следующее содержимое:

```html
<app-reacton mode="open" extends="body">
  <header is="app-header"></header>
  <main id="main" $params="category, id" $view="view"></main>
  <footer is="app-footer"></footer>

  <style>
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    main {
      margin: 20px;
    }
    footer {
      margin-top: auto;
    }
  </style>

  <script>
    exports = {
      data() {
        return {
          view: '',
          category: '',
          id: ''
        }
      },
      connected() {
        // определить маршрутизатор для главного компонента
        this.$router(this, {
          '/': ()=> {
            this.$data.view = 'page-home'
          },
          '/workers': () => {
            this.$data.view = 'page-workers'
          },
          '/workers/:category/:id?': event => {
            if (event.params.id) {
              this.$data.category = event.params.category
              this.$data.id = event.params.id
              this.$data.view = 'page-user'
            }
            else {
              this.$data.category = event.params.category
              this.$data.view = 'page-list'
            }
          }
        })
      }
    }
  </script>
</app-reacton>
```

Главный компонент имеет открытый уровень инкапсуляции и модифицирован для его монтирования в элемент BODY:

```html
<app-reacton mode="open" extends="body">
```

Далее идёт основная разметка приложения:

```html
<header is="app-header"></header>
<main id="main" $params="category, id" $view="view"></main>
<footer is="app-footer"></footer>
```

Все эти три элемента, будут монтировать в себя соответствующие им компоненты. Кроме этого, элемент MAIN содержит [параметры](#parameters) для передачи в дочерние компоненты пользовательских данных, и является [видом](#views).

Затем, мы добавили небольшую стилизацию для главного компонента:

```html
<style>
  :host {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  main {
    margin: 20px;
  }
  footer {
    margin-top: auto;
  }
</style>
```

Обратите внимание на селектор [:host](https://learn.javascript.ru/shadow-dom-style#host), который служит для выбора элемента-хозяина компонента или, другими словами, его тега монтирования.

Завершается главный компонент тегом SCRIPT, в котором содержится маршрутизатор, назначенный для всего главного компонента:

```html
<script>
  exports = {
    data() {
      return {
        view: '',
        category: '',
        id: ''
      }
    },
    connected() {
      // определить маршрутизатор для главного компонента
      this.$router(this, {
        '/': ()=> {
          this.$data.view = 'page-home'
        },
        '/workers': () => {
          this.$data.view = 'page-workers'
        },
        '/workers/:category/:id?': event => {
          if (event.params.id) {
            this.$data.category = event.params.category
            this.$data.id = event.params.id
            this.$data.view = 'page-user'
          }
          else {
            this.$data.category = event.params.category
            this.$data.view = 'page-list'
          }
        }
      })
    }
  }
</script>
```

Кроме этого, компонент имеет три пользовательских свойства: **view**, **category** и **id**. Последние два передаются в параметры вида с помощью атрибута ***$params***, как показано ниже:

```html
<main id="main" $params="category, id" $view="view"></main>
```

В зависимости от запроса, маршрутизатор будет присваивать этим пользовательским свойствам соответствующие значения:

```js
// определить маршрутизатор для главного компонента
this.$router(this, {
  '/': ()=> {
    this.$data.view = 'page-home'
  },
  '/workers': () => {
    this.$data.view = 'page-workers'
  },
  '/workers/:category/:id?': event => {
    if (event.params.id) {
      this.$data.category = event.params.category
      this.$data.id = event.params.id
      this.$data.view = 'page-user'
    }
    else {
      this.$data.category = event.params.category
      this.$data.view = 'page-list'
    }
  }
})
```

Последний обработчик содержит [параметры маршрута](#route-parameters) для категории и идентификатора пользователя:

```js
'/workers/:category/:id?': event => {
  if (event.params.id) {
    this.$data.category = event.params.category
    this.$data.id = event.params.id
    this.$data.view = 'page-user'
  }
  else {
    this.$data.category = event.params.category
    this.$data.view = 'page-list'
  }
}
```

Значения параметров маршрута присваиваются пользовательским свойствам, которые, в свою очередь, доступны в дочерних компонентах, благодаря использованию специального атрибута [$params](#params) в элементе MAIN.

Теперь давайте добавим три простых компонента в папку *components*. Это будут компоненты: Header, Menu и Footer. Создайте три файла в этой папке, как показано ниже.

Файл Header.htm:

```html
<app-header mode="open" extends="header">
  <nav is="app-menu"></nav>
  <img src="/img/logo.png" alt="logo">

  <style>
    nav {
      margin: 20px;
    }
    img {
      width: 100%;
      max-width: 400px;
      margin-left: 20px;
    }
  </style>
</app-header>
```

Файл Menu.htm:

```html
<app-menu mode="open" extends="nav">
  <a href="/">Главная</a>
  <a href="/workers/">Сотрудники</a>

  <style>
    a + a {
      margin-left: 10px;
    }
    a:hover {
      color: red;
    }
  </style>
</app-menu>
```

Файл Footer.htm:

```html
<app-footer mode="open" extends="footer">
  <p>Copyright © {{ new Date().getFullYear() }}</p>

  <style>
    :host {
      padding: 0 20px;
      border-top: 1px solid #222;
    }
  </style>
</app-footer>
```

В этих компонентах нет ничего сложного, поэтому, детально мы их рассматривать не будем. Обратите лишь внимание на то, что в компоненте Header, мы используем элемент NAV для монтирования в него компонента Menu и, кроме этого, здесь имеется ссылка на статическое изображение логотипа:

```html
<nav is="app-menu"></nav>
<img src="/img/logo.png" alt="logo">
```

Для хранения статических файлов, таких, например, как статические изображения или шрифты, используется папка *public*, которую вам надо будет создать в каталоге *app*. Затем, в папке *public*, создайте ещё одну папку *img*, в которой сохраните логотип библиотеки Reacton под именем [logo.png](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png), что представлен ниже:

![rigl](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

Кроме изображений и шрифтов, в папку *public* будет выводиться и скомпонованный файл нашего приложения, который будет называться *bundle.js*.

До первого запуска нашего проекта, осталось совсем немного. Необходимо будет создать ещё четыре компонента, которые будут являться страницами нашего приложения.

Итак, внутри папки *components*, создайте папку *pages*. В этой папке будут располагаться все компоненты, представляющие страницы приложения. Кроме этого, всем компонентам страниц, мы будем задавать в имени приставку *page-*, вместо *app-*, как мы делали это для обычных компонентов.

Создайте в папке *pages* компонент Home, который будет отвечать за содержимое главной страницы и располагаться в файле *Home.htm*, как показано ниже:

```html
<page-home mode="open" extends="main">
  <h2>Главная</h2>
  <p>Рекламная информация о компании</p>
</page-home>
```

Все компоненты страниц будут иметь открытый уровень инкапсуляции, благодаря атрибуту ***mode***, и модифицированы для элемента MAIN, с помощью атрибута ***extends***. 

Второй компонент будет называться Workers и отвечать за страницу вывода категорий работников. У нас их всего две, это менеджеры и дизайнеры.

Создайте в папке *pages* файл *Workers.htm* и внесите в него следующее содержимое:

```html
<page-workers mode="open" extends="main">
  <h2>Сотрудники</h2>
  <ul>
    <li>
      <a href="managers/">Менеджеры</a>
    </li>
    <li>
      <a href="designers/">Дизайнеры</a>
    </li>
  </ul>

  <style>
    li + li {
      margin-top: 5px;
    }
  </style>
</page-workers>
```

Следующие два компонента мы рассмотрим подробнее. Это будут компоненты List и User. Первый отвечает за вывод списка пользователей из выбранной категории в компоненте Workers, а второй, за вывод информации о конкретном пользователе, выбранном в компоненте List.

С этого компонента мы и продолжим. Добавьте в папку *pages* файл *List.htm*, как показано ниже:

```html
<page-list mode="open" extends="main">
  <h2>{{ $mixins.glossary[$params.category] }}</h2>

  Сортировать по:
  <select>
    <option value="id">ID</option>
    <option value="name">Имя</option>
    <option value="age">Возраст</option>
  </select>

  <button class="{{ ascending ? 'active' : '' }}" @click="ascending = !ascending" title="по возрастанию">↓</button>
  <button class="{{ !ascending ? 'active' : '' }}" @click="ascending = !ascending" title="по убыванию">↑</button>

  <ul $for="user of sort()">
    <li>
      ID: <a href="{{ user.id }}">{{ user.id }}</a><br>
      Имя: {{ user.name }}<br>
      Возраст: {{ user.age }}
    </li>
  </ul>

  <style>
    select {
      margin-right: 5px;
    }
    li + li {
      margin-top: 10px;
    }
    .active {
      background: #222;
      color: #fff;
    }
  </style>

  <script>
    exports = {
      async data() {
        const collator = this.$mixins.collator
        
        const users = this.$mixins.DB ? (await this.$mixins.DB).default.filter(user => user.category === this.$params.category)
          : await this.$mixins.fetch(`/workers/${this.$params.category}`)
        
        return {
          users,
          ascending: true,
          group: 'id',
          sort() {
            return this.users.sort((a, b) => this.ascending ? collator.compare(a[this.group], b[this.group])
              : collator.compare(b[this.group], a[this.group]))
          }
        }
      },
      connected() {
        this.$('select').addEventListener('change', event => {
          this.$data.group = event.target.value
        })
      }
    }
  </script>
</page-list>
```

В самом начале компонента, мы создаём заголовок второго уровня, в котором присутствует значение параметра **category**, который передаётся в компонент List из маршрутизатора главного компонента:

```html
<h2>{{ $mixins.glossary[$params.category] }}</h2>
```

За это отвечает блок кода *else*, в маршрутизаторе главного компонента:

```js
'/workers/:category/:id?': event => {
  if (event.params.id) {
    this.$data.category = event.params.category
    this.$data.id = event.params.id
    this.$data.view = 'page-user'
  }
  else {
    this.$data.category = event.params.category
    this.$data.view = 'page-list'
  }
}
```

В свою очередь, блок кода *if* отвечает за работу компонента User.

Полученное в параметре значение:

```js
$mixins.glossary[$params.category]
```

это значение "managers" или "designers", сопоставляется со значением примеси:

```js
// глоссарий для сегментов пути запроса
glossary: {
  managers: 'Менеджеры',
  designers: 'Дизайнеры'
}
```

и в результате, мы получаем русскоязычное содержимое заголовка.

Далее, у нас идёт список сортировки:

```html
Сортировать по:
<select>
  <option value="id">ID</option>
  <option value="name">Имя</option>
  <option value="age">Возраст</option>
</select>
```

Здесь мы можем выбрать сортировку по ID, Имени или Возрасту сотрудников.

После списка сортировки, располагаются кнопки *По возрастанию* и *По убыванию*, с соответствующими значками:

```html
<button class="{{ ascending ? 'active' : '' }}" @click="ascending = !ascending" title="по возрастанию">↓</button>
<button class="{{ !ascending ? 'active' : '' }}" @click="ascending = !ascending" title="по убыванию">↑</button>
```

В событии *click* каждой кнопки, происходит инвертирование пользовательского свойства **ascending** которое отвечает за порядок сортировки:

```js
@click="ascending = !ascending"
```

В случае его значения Истина, кнопке *По возрастанию* добавляется класс *active*:

```js
class="{{ ascending ? 'active' : '' }}"
```

И наборот, в случае значения Ложь, данный класс добавляется кнопке *По убыванию*:

```js
class="{{ !ascending ? 'active' : '' }}"
```

За вывод массива пользователей из выбранное категории, отвечает цикл [for-of](#for-of) и метод **sort**, который будет рассмотрен далее:

```html
<ul $for="user of sort()">
  <li>
    ID: <a href="{{ user.id }}">{{ user.id }}</a><br>
    Имя: {{ user.name }}<br>
    Возраст: {{ user.age }}
  </li>
</ul>
```

После этого, у нас идёт небольшая стилизация компонента:

```html
<style>
  select {
    margin-right: 5px;
  }
  li + li {
    margin-top: 10px;
  }
  .active {
    background: #222;
    color: #fff;
  }
</style>
```

И в конце, тело компонента заканчивается элементом SCRIPT, в котором экспортируется объект компонента:

```html
<script>
  exports = {
    async data() {
      const collator = this.$mixins.collator
      
      const users = this.$mixins.DB ? (await this.$mixins.DB).default.filter(user => user.category === this.$params.category)
        : await this.$mixins.fetch(`/workers/${this.$params.category}`)
      
      return {
        users,
        ascending: true,
        group: 'id',
        sort() {
          return this.users.sort((a, b) => this.ascending ? collator.compare(a[this.group], b[this.group])
            : collator.compare(b[this.group], a[this.group]))
        }
      }
    },
    connected() {
      this.$('select').addEventListener('change', event => {
        this.$data.group = event.target.value
      })
    }
  }
</script>
```

Внутри асинхронного метода **data**, мы получаем коллатор из примеси, который необходим для правильной сортировки русскоязычных строк:

```js
const collator = this.$mixins.collator
```

Затем, идёт определение пользовательского свойства **users**, которое, в зависимости от наличия промиса **DB**, как показано ниже:

```js
const users = this.$mixins.DB ? (await this.$mixins.DB).default.filter(user => user.category === this.$params.category)
  : await this.$mixins.fetch(`/workers/${this.$params.category}`)
```

будет содержать информацию либо из тестовой базы данных, либо из реальной, которую мы создадим в следующем разделе.

Поскольку тестовая база данных у нас содержится в [промисе](https://learn.javascript.ru/promise-basics), который возвращается выражением [import](https://learn.javascript.ru/modules-dynamic-imports#vyrazhenie-import):

```js
// динамически импортировать базу данных
DB: import('./db')
```

то нам небходимо внутри [асинхронного](https://learn.javascript.ru/async-await) метода **data**, использовать ключевое слово [await](https://learn.javascript.ru/async-await#await):

```js
(await this.$mixins.DB).default.filter....
```

В конце метода **data**, мы возвращаем объект с пользовательскими свойствами:

```js
return {
  users,
  ascending: true,
  group: 'id',
  sort() {
    return this.users.sort((a, b) => this.ascending ? collator.compare(a[this.group], b[this.group])
      : collator.compare(b[this.group], a[this.group]))
  }
}
```

среди которых, нас больше всего интересует метод **sort**. Если значение пользовательского свойства **ascending** является Истиной, то происходит интернациональная сортировка по возрастанию, с учётом выбранной группы, которая содержится в пользовательском свойстве **group**, как показано ниже:

```js
collator.compare(a[this.group], b[this.group])
```

иначе, выполняется сортировка по убыванию:

```js
collator.compare(b[this.group], a[this.group])
```

В самом низу экспортируего объекта, внутри метода **connected**, мы добавляем обработчик события для списка сортировки:

```js
this.$('select').addEventListener('change', event => {
  this.$data.group = event.target.value
})
```

Который, в зависимости от выбранного значения в списке, присваивает его пользовательскому свойству **group**, используемом в методе **sort**, как было показано выше.

Давайте создадим последний компонент User. Для этого, добавьте в папку *pages* файл *User.htm*, как показано ниже:

```html
<page-user mode="open" extends="main">
  <h2>{{ $mixins.glossary[$params.category].slice(0, -1) }}</h2>
  ID: {{ user.id }}<br>
  Имя: {{ user.name }}<br>
  Возраст: {{ user.age }}

  <script>
    exports = {
      async data() {
        const user = this.$mixins.DB ? (await this.$mixins.DB).default.find(user => user.id == this.$params.id)
          : await this.$mixins.fetch(`/workers/${this.$params.category}/${this.$params.id}`)

        return {
          user
        }
      }
    }
  </script>
</page-user>
```

В самом начале этого компонента, мы снова, используя параметр **category**, получаем значение из глоссария, за вычетом последней буквы "ы" из названия:

```html
<h2>{{ $mixins.glossary[$params.category].slice(0, -1) }}</h2>
```

чтобы заголовок содержал значение "Менеджер" или "Дизайнер". После которого, у нас выводится детальная информация о пользователе:

```html
ID: {{ user.id }}<br>
Имя: {{ user.name }}<br>
Возраст: {{ user.age }}
```

В самом конце разметки, мы снова экспортируем объект компонента, который содержит асинхронных метод **data**, внутри которого, мы определяем пользовательськое свойство **user**, как показано ниже:

```js
async data() {
  const user = this.$mixins.DB ? (await this.$mixins.DB).default.find(user => user.id == this.$params.id)
    : await this.$mixins.fetch(`/workers/${this.$params.category}/${this.$params.id}`)

  return {
    user
  }
}
```

Здесь опять же, в зависимости от наличия примиси **DB**, свойство **user** получит данные либо из тестовой базы данных, либо же из реальной.

Пришло время проверить наше приложение. Для запуска проекта в режиме разработки, перейдите из терминала в рабочий каталог *app* и введите команду:

```
npm start
```

Откройте окно браузера по адресу [http://localhost:8080/](http://localhost:8080/), в котором будет отображаться наше приложение. При любом изменении в компонентах, браузер будет автоматически перезагружать страницу.

После того, как мы внесли все необходимые изменения в режиме разработки, перед переносом на сервер, проект неоходимо будет запустить в режиме продакшена.

Для этого применяется команда:

```
npm run build
```

которая добавляет в папку *public* скомпонованный файл *bundle.js*, содержащий код библиотеки Reacton и всех компонентов, что мы использовали в проекте. При этом, сервер по адресу [http://localhost:8080/](http://localhost:8080/) в режиме продакшена не работает. Этот режим только создаёт готовый файл *bundle.js* и не предназначен для разработки.

 Но пред этим, закомментируйте тестовую базу данных из примеси в файле *index.js*, как показано ниже:

```js
// динамически импортировать базу данных
// DB: import('./db')
```

Эта база данных используется только для режима разработки, а после того, как наш проект будет скомпонован в режиме продакшена, он уже будет использовать реальную базу данных, которую мы создадим в последнем разделе этого руководства.

<br>
<br>
<h2 id="ssr"># Серверный рендеринг</h2>

<br>

После того, как мы протестировали приложение на клиенте и запустили его в режиме продашкена с помощью webpack, который создал скомпонованный файл *bundle.js* в папке *public*, перед переносом приложения на реальный [хостинг Node.js](https://habr.com/ru/company/ruvds/blog/423701/), нам необходимо будет протестировать его на условно-реальном сервере.

Для создания такого сервера, мы будем использовать фреймворк [Express](https://metanit.com/web/nodejs/4.1.php) и шаблонизатор [Handlebars](https://metanit.com/web/nodejs/4.7.php), с которого мы и начнём.

Создайте в рабочем каталоге *app*, папку *views*. В этой папке будет располагаться представление Main, содержимое которого, будет находиться в файле *main.hbs*, как показано ниже:

```hbs
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reacton</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
</head>
  {{#if body}}
    {{{body}}}
  {{else}}
    {{> body}}
  {{/if}}
</html>
```

Если в представление Main был передан объект со свойством **body**, то выполняется инструкция *if*. Свойство **body** содержит отрендеренное содержимое приложения в виде текста, который вставляется вместо:

```
{{{body}}}
```

Это происходит при обращение к серверу поискового бота. В противном случае, когда происходит обращение пользователя, выполняется инструкция *else*, которая выводит [частичное представление](https://metanit.com/web/nodejs/4.8.php), называемое так же body:

```
{{> body}}
```

Давайте добавим это частичное представление. В папке *views* создайте подпапку *partials*, а в ней, файл частичного представления *body.hbs*, как показано ниже:

```hbs
<body is="app-reacton">
  <script src="/bundle.js"></script>
</body>
```

На этом, работа с шаблонизатором завершена. Нам осталось создать базу данных, в качестве которой, была выбрана [NeDB](https://habr.com/ru/post/301916/).

Мы не будем изучать работу с этой базой данных, вы сможете это сделать самостоятельно по ссылке выше. Здесь будет представлен уже готовый файл этой базы данных, который содержит всю ту же самую информацию, что и наша тестовая база данных из прошлого раздела.

Создайте в каталоге *app* папку *nedb*, а в ней, файл базы данных *users* без расширения:

```js
{"id":1,"name":"Иван","age":28,"category":"managers","_id":"3RH5QS5kPmx0sjXj"}
{"id":7,"name":"Анатолий","age":31,"category":"managers","_id":"4Iy46DCucIG2sXAt"}
{"id":4,"name":"Олег","age":36,"category":"managers","_id":"8ba6tqoWJvVb9h6Q"}
{"id":3,"name":"Максим","age":41,"category":"designers","_id":"CkV4EMSVboevA0mb"}
{"id":6,"name":"Наталья","age":24,"category":"managers","_id":"X8aR8xRjpQBydX8C"}
{"id":5,"name":"Александр","age":26,"category":"designers","_id":"o1xmiHa2Camli6UY"}
{"id":2,"name":"Ольга","age":32,"category":"designers","_id":"rJvXsEwHWR0Ii3LD"}
{"$$indexCreated":{"fieldName":"id","unique":true,"sparse":false}}
```

Нам осталось создать файл *server.js* в каталоге *app*, который будет содержать всю логику работы нашего сервера.

Создайте этот файл со следующим содержимым:

```js
const express = require("express")
const hbs = require("hbs")
const { readFile } = require('fs/promises')
const { JSDOM } = require("jsdom")
const port = process.env.PORT || 3000

const Datastore = require('nedb')
const db = new Datastore({ filename : 'nedb/users', autoload: true })

const app = express()
app.use(express.static(__dirname + "/public"))

app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")

const bots = [
  'yandex', 'google', 'bot', 'Accoona', 'ia_archiver', 'Ask Jeeves', 'W3C_Validator', 'WebAlta', 'YahooFeedSeeker',
  'Yahoo!', 'Ezooms', 'SiteStatus', 'Nigma.ru', 'Baiduspider', 'SISTRIX', 'findlinks', 'proximic', 'OpenindexSpider',
  'statdom.ru', 'Spider', 'Snoopy', 'heritrix', 'Yeti', 'DomainVader', 'StackRambler'
]

const regBots = new RegExp(bots.join('|'), 'i')

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.post('/workers/:category', (req, res) => {
  const category = req.params.category
  db.find({ category }, (err, docs) => res.send(docs))
})

app.post('/workers/\\w+/:id', (req, res) => {
  const id = +req.params.id
  db.findOne({ id }, (err, doc) => res.send(doc))
})

app.use(async (req, res) => {

  const userAgent = process.argv[2] === 'bot' ? 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    : req.get('User-Agent')
  
  if (regBots.test(userAgent)) {
    
    const fullURL = req.protocol + "://" + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

    const body = await readFile(__dirname + '/views/partials/body.hbs').then(async data => {
      const dom = new JSDOM(data.toString(), {
        url: fullURL,
        runScripts: "dangerously",
        resources: "usable"
      })
      
      return await new Promise(done => {
        dom.window.onload = () => {
          // отрендерить содержимое элемента BODY
          dom.window.Reacton.render(dom.window.document.body).then(done)
        }
      })
    })

    // передать свойство body в представление Main
    res.render("main.hbs", { body })
  }
  else {
    // или вернуть частичное представление
    res.render("main.hbs")
  }
})

app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))
```

Мы не будем подробно его разбирать, обратим лишь внимание на главные моменты. Во-первых, ниже представлен список основных ботов:

```js
const bots = [
  'yandex', 'google', 'bot', 'Accoona', 'ia_archiver', 'Ask Jeeves', 'W3C_Validator', 'WebAlta', 'YahooFeedSeeker',
  'Yahoo!', 'Ezooms', 'SiteStatus', 'Nigma.ru', 'Baiduspider', 'SISTRIX', 'findlinks', 'proximic', 'OpenindexSpider',
  'statdom.ru', 'Spider', 'Snoopy', 'heritrix', 'Yeti', 'DomainVader', 'StackRambler'
]
```

При желании, сюда можно добавить и других ботов. Во-вторых, при обращении бота, т.е. когда идентификационная строка [User-Agent](https://ru.wikipedia.org/wiki/User_agent) клиентского запроса содержит любое значение из этого списка, то приложение рендерится в блоке кода:

```js
return await new Promise(done => {
  dom.window.onload = () => {
    // отрендерить содержимое элемента BODY
    dom.window.Reacton.render(dom.window.document.body).then(done)
  }
})
```

После этого, константа *body*, содержащая текстовое содержимое элемента BODY нашего приложения, передаётся в виде свойства **body** в представление Main:

```js
// передать свойство body в представление Main
res.render("main.hbs", { body })
```

Во всех остальных случаях, когда запрос выполняется не ботом, то возвращается частичное представление:

```js
// или вернуть частичное представление
res.render("main.hbs")
```

Для проверки работы нашего приложения на сервере в режиме бота, используется команда:

```
node server bot
```

которая запускается из терминала, открытого в каталоге *app*. В этом режиме происходит рендеринг всех компонентов, включая и тех, что имеют [Теневой DOM](https://learn.javascript.ru/shadow-dom), с учётом задержки на получение данных от сервера. 

Это легко проверить, если добавить задержку, например, в одну секунду, в любой из компонентов делающих запрос к серверу, таких как List или User, как показано ниже:

```html
<page-user mode="open" extends="main">
  <h2>{{ $mixins.glossary[$params.category].slice(0, -1) }}</h2>
  ID: {{ user.id }}<br>
  Имя: {{ user.name }}<br>
  Возраст: {{ user.age }}

  <script>
    exports = {
      async data() {
        // добавить задержку в одну секунду
        await new Promise(ready => setTimeout(ready, 1000))

        const user = this.$mixins.DB ? (await this.$mixins.DB).default.find(user => user.id == this.$params.id)
          : await this.$mixins.fetch(`/workers/${this.$params.category}/${this.$params.id}`)

        return {
          user
        }
      }
    }
  </script>
</page-user>
```

Отрендеренное содержимое не содержит элементов STYLE, т.е. стилей компонентов. Они удаляются во время рендеринга, поскольку не содержат для ботов никакой полезной информации.

Чтобы проверить, как всё это выглядит "глазами" бота, перейдите в любую категорию пользователей по ссылкам Менеджеры или Дизайнеры, или щёлкните по ID любого пользователя, и откройте исходный код страницы, нажав комбинацию клавиш Ctrl + U в браузере.

Для работы сервера в нормальном режиме, используется команда:

```
node server
```

Сервер сам определяет, когда к нему обращается бот и отдаёт ему отрендеренное содержимое. В всех других случаях, он отдаёт содержимое частичного представления.

<br>
<br>