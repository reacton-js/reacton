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

1. [Быстрый старт](#quick-start)
2. [Состояние компонента](#component-state)
3. ~~[Реактивные свойства](#reactive-properties)~~
4. ~~[Циклы](#cycles)~~
5. ~~[Примеси](#mixins)~~
6. ~~[Статические свойства](#static-properties)~~
7. ~~[Специальные методы](#special-methods)~~
8. ~~[Эмиттер событий](#event-emitter)~~
9. ~~[Маршрутизатор](#router)~~
10. ~~[Серверный рендеринг](#server-rendering)~~

<br>
<hr>
<br>

<h2 id="quick-start">Быстрый старт</h2>

<br>

Для создания компонентов применяются классы. Классы могут быть как встроенными в основной скрипт, так и импортированы из внешнего модуля. Создайте новый рабочий каталог, например, с названием *app*, и скачайте в этот каталог файл [rtn.global.js](https://raw.githubusercontent.com/reacton-js/reacton/main/rtn.global.js).

Добавьте в каталог файл *index.html* со следующим содержимым:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello></w-hello>

  <script src="rtn.global.js"></script>

  <script>
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

    // передать класс компонента Hello функции Rtn
    Rtn(WHello)
  </script>
</body>
</html>
```

Чтобы гарантировать отсутствие конфликтов имён между стандартными и пользовательскими HTML-элементами, имя компонента должно содержать дефис «-», например, "my-element" и "super-button" – это правильные имена, а "myelement" – нет.

В большинстве примеров этого руководства, префикс будет состоять из одной буквы «w-». т.е. компонент Hello будет называться "w-hello".

При определении класса компонента, его префикс и имя должны начинаться с заглавной буквы. WHello – это правильное название класса, а wHello – нет.

Открыв файл *index.html* в браузере, на экране отобразится созданное в компоненте Hello сообщение:

<h1 style="color: orangered;">Привет, Reacton!</h1>

<br>

Компоненты можно выносить в отдельные модули. В этом случае, файл компонента Hello выглядел бы как показано ниже:

```js
export default class WHello {
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

Для работы с внешними компонентами, вам потребуется любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server).

Установить данный сервер можно с помощью команды в терминале:

```
npm install --global lite-server
```

Запуск сервера из каталога, в котором находится приложение, осуществляется с помощью команды в терминале:

```
lite-server
```

<br>

Кроме этого, фреймворк поддерживает однофайловые компоненты, которые могут быть использованы наравне с модульными, при создании проекта в системе сборки [webpack](https://webpack.js.org/).

Ниже показан пример простого однофайлового компонента:

```html
<h1>Привет, {{ message }}!</h1>
      
<style>
  h1 {
    color: {{ color }};
  }
</style>

<script>
  exports = class WHello {
    // инициализация свойств объекта состояния
    message = 'Reacton'
    color = 'orangered'

    static mode = 'open' // добавить Теневой DOM
  }
</script>
```

Однофайловый компонент должен присваивать свой класс переменной **exports**. Эта переменная будет автоматически объявлена во время создания структуры компонента в системе сборки проекта.

В однофайловых компонентах можно использовать инструкцию [import](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/import), например:

```html
<script>
  // импортировать из модуля объект по умолчанию
  import obj from './module.js'

  exports = class WHello {
    // инициализация свойств объекта состояния
    message = obj.message
    color = obj.color

    static mode = 'open' // добавить Теневой DOM
  }
</script>
```

<br>

Однофайловые компоненты позволяют выделить HTML-разметку из логики компонента. Однако, такие компоненты не могут работать в браузере напрямую. Они требуют специального обработчика, который подключается в *webpack*.

Чтобы иметь возможность работать в браузере с компонентами, в которых логика отделена от HTML-содержимого, существуют встроенные компоненты.

Ниже показан пример простого встроенного компонента:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello></w-hello>

  <!-- определить шаблон компонента Hello -->
  <template id="tempHello">
    <h1>Привет, {{ message }}!</h1>
        
    <style>
      h1 {
        color: {{ color }};
      }
    </style>

    <script>
      return class WHello {
        // инициализация свойств объекта состояния
        message = 'Reacton'
        color = 'orangered'

        static mode = 'open' // добавить Теневой DOM
      }
    </script>
  </template>

  <script src="rtn.global.js"></script>

  <script>
    // передать шаблон компонента Hello функции Rtn
    Rtn(tempHello)
  </script>
</body>
</html>
```

Встроенный компонент должен возвращать свой класс, а содержимое его тега &lt;script&gt; можно рассматривать как функцию. Однако, встроенные компоненты не подходят для рендеринга на стороне сервера и, кроме этого, в них нельзя использовать инструкцию **import**, но допускается использование выражения [import()](https://learn.javascript.ru/modules-dynamic-imports#vyrazhenie-import), например:

```html
<script>
  // импортировать модуль и сохранить его объект в переменной
  let obj = await import('./module.js')

  return class WHello {
    // инициализация свойств объекта состояния
    message = obj.message
    color = obj.color

    static mode = 'open' // добавить Теневой DOM
  }
</script>
```

<br>

Для быстрого доступа к компоненту, достаточно добавить идентификатор к элементу, который подключает компонент к документу, как показано ниже:

```html
<!-- подключить компонент Hello к документу -->
<w-hello id="hello"></w-hello>
```

Теперь откройте консоль браузера и последовательно введите команды:

```
hello.$state.message = 'Веб-компоненты'
hello.$state.color = 'blue'
```

Цвет и содержимое заголовка изменятся:

<h1 style="color: blue;">Привет, Веб-компоненты!</h1>

<br>
<br>
<h2 id="component-state">Состояние компонента</h2>

<br>

Каждый компонент может содержать изменяющиеся данные, которые называются состоянием. Состояние можно определить в конструкторе класса компонента:

```js
class WHello {
  constructor() {
    // инициализация свойств объекта состояния
    this.message = 'Reacton'
    this.color = 'orangered'
  }
  ...
}
```

В качестве альтернативы, используя новый синтаксис, можно определить состояние непосредственно в самом классе:

```js
class WHello {
  // инициализация свойств объекта состояния
  message = 'Reacton'
  color = 'orangered'
  ...
}
```

<br>

Методы компонента не являются состоянием. Они предназначены для выполнения действий с состоянием компонента и хранятся в прототипе объекта состояния:

```js
class WHello {
  // инициализация свойств объекта состояния
  message = 'Reacton'

  // определить метод объекта состояния
  printStr(str) {
    return this.message
  }

  // вернуть HTML-разметку компонента
  static template = `<h1>Привет, {{ printStr() }}!</h1>`
}
```

<br>

Для доступа к объекту состояния, применяется специальное свойство *$state*. С помощью этого свойства, можно получить или присвоить новое значение состоянию, как показано ниже:

```
hello.$state.message = 'Веб-компоненты'
```

Обновление содержимого компонента на основе нового состояния происходит автоматически.

<br>

Когда содержимое компонента обновляется, то его старый DOM не удаляется. Это означает, что обработчики, назначенные элементам внутри компонента, сохраняются, поскольку старый элемент не заменяется новым элементом.

В примере ниже, обработчик элемента &lt;h1&gt; будет работать и после обновления состояния компонента. Поскольку обновление изменит только старое значение его атрибута и текстового содержимого:

```js
class WHello {
  // инициализация свойств объекта состояния
  message = 'Reacton'

  /* этот метод выполняется после подключения компонента к документу
    когда для компонента уже создан DOM, из которого можно выбирать элементы */
  static connected() {
    this.$('h1').addEventListener('click', e => console.log(e.target))
  }

  // вернуть HTML-разметку компонента
  static template = `<h1 :title="message">Привет, {{ message }}!</h1>`
}
```

<br>
<br>