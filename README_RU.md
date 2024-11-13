<br>

[EN](https://github.com/reacton-js/reacton/blob/main/README.md) / [RU](https://github.com/reacton-js/reacton/blob/main/README_RU.md)

<h3>Реактивные Веб-компоненты</h3>

<br>

![reacton](https://raw.githubusercontent.com/reacton-js/reacton/main/logo.png)

[GitHub](https://github.com/reacton-js/reacton) | [GitFlic](https://gitflic.ru/project/reacton/reacton-js) | [GitVerse](https://gitverse.ru/awc/reacton) | [NpmJS](https://www.npmjs.com/package/reacton-js) | [Скачать⤵️](https://raw.githubusercontent.com/reacton-js/reacton/main/rtn.global.min.js)

<br>

Reacton (сокр. Rtn) – это фреймворк JavaScript для быстрого создания реактивных [Веб-компонентов](https://learn.javascript.ru/web-components). Он поддерживает все методы и свойства, которые предоставляются стандартными Веб-компонентами. Кроме этого, фреймворк содержит ряд дополнительных методов и реализует рендеринг Веб-компонентов на стороне сервера.

<br>

Ниже представлен пример создания простого компонента:

```js
class WHello {
  // инициализация свойств объекта состояния
  message = 'Reacton'
  color = 'orangered'

  static mode = 'open' // добавить Теневой DOM

  // вернуть HTML-разметку компонента
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

***Проект находится в разработке...***

<br>
<br>