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
3. [Встроенные компоненты](#embedded-components)
4. [Внешние компоненты](#external-components)
    - [Модульные](#modular)
    - [Однофайловые](#single-file)
5. [Специальные свойства](#special-properties)
6. ~~[События компонента](#component-events)~~
7. ~~[Циклы компонента](#component-cycles)~~
8. ~~[Состояние компонента](#component-state)~~
9. ~~[Маршрутизация](#routing)~~
10. ~~[Создание приложения](#application-creation)~~

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

Теперь откройте консоль браузера и введите следующую команду:

```
hello.$data.message = 'Мир'
```

Сообщение на экране браузера сразу же изменится:

> <h1>Привет, Мир!</h1>

<br>
<br>
<h2 id="component-object"># Объект компонента</h2>

<br>

В этом разделе будут представлены все свойства, которые может содержать объект компонента. С тремя из таких свойств мы уже познакомились, это свойство **name**, которое определяет название компонента:

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

Свойство **extends** позволяет [модифицировать](https://learn.javascript.ru/custom-elements#modifitsirovannye-vstroennye-elementy) компонет таким образом, чтобы при его монтировании можно было использовать стандартный HTML-элемент, например:

```js
extends: 'header'
```

 При этом, такой элемент обязательно должен содержать атрибут ***is*** со значением, соответствующем названию компонента:

 ```html
<header is="app-hello"></header>
```

<br>

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

Свойство **attributes** содержит массив с названиями наблюдаемых атрибутов и аналогично статическому геттеру [observedAttributes](https://learn.javascript.ru/custom-elements#nablyudenie-za-atributami), стандартного Веб-компонента:

```js
attributes: ['title']
```

<br>

Метод **changed** вызывается при изменении одного из указанных в массиве выше атрибутов. Он является сокращённым аналогом стандартного метода **attributeChangedCallback** компонента:

```js
changed(name, oldValue, newValue) {
  console.log(name, oldValue, newValue)
}
```

<br>

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

Создайте в своём рабочем кателоге файл *Hello.mjs*, со следующим содержимым:

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

Раздел в разработке...

<br>
<br>