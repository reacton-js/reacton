<br>

[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

![reacton](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Reacton⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/app/reacton.min.js)

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
2. ~~[Класс компонента](#component-class)~~
3. ~~[Специальные свойства](#special-properties)~~
4. ~~[Общие методы](#general-methods)~~
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

Для создания компонентов применяются классы. Классы могут быть как встроенными в основной скрипт, так и импортированы из внешнего модуля. Создайте новый рабочий каталог, например, с названием *app*, и скачайте в этот каталог файл [reacton.min.js](https://raw.githubusercontent.com/reacton-js/reacton/main/app/reacton.min.js).

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