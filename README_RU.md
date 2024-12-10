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
3. [Циклы](#cycles)
4. [Примеси](#mixins)
5. [Виды](#views)
6. [Реактивные свойства](#reactive-properties)
7. ~~[Статические свойства](#static-properties)~~
8. ~~[Специальные методы](#special-methods)~~
9. ~~[Эмиттер событий](#event-emitter)~~
10. ~~[Маршрутизатор](#router)~~
11. ~~[Серверный рендеринг](#server-rendering)~~

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
  // инициализация свойства объекта состояния
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
  // инициализация свойства объекта состояния
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
<h2 id="cycles">Циклы</h2>

<br>

Reacton поддерживает три вида циклов *«for»*, которые реализованы в  JavaScript. Все они определяются с помощью специального атрибута ***$for*** и выводят содержимое своих HTML-элементов столько раз, сколько предусмотрено условием цикла.

*В скомпилированном компоненте, данный атрибут отображаться не будет.*

В примере ниже, цикл *«for»* выводит 10 параграфов с числами от 0 до 9:

```js
class WHello {
  // вернуть HTML-разметку компонента
  static template = `
    <div $for="i = 0; i < 10; i++">
      <p>Число: {{ i }}</p>
    </div>
  `
}
```

В специальном атрибуте ***$for*** нельзя использовать операторы определения переменных: *var*, *let* и *const* соответственно. Это приведёт к ошибке:

```js
static template = `
  <div $for="let i = 0; i < 10; i++">
    <p>Число: {{ i }}</p>
  </div>
`
```

<br>

Цикл *«for-in»* используется для вывода содержимого объектов, как показано ниже:

```js
class WHello {
  // инициализация свойства объекта состояния
  user = {
    name: 'Иван',
    age: 32
  }

  // вернуть HTML-разметку компонента
  static template = `
    <ul $for="prop in user">
      <li>
        <b>{{ prop }}</b>: {{ user[prop] }}
      </li>
    </ul>
  `
}
```

<br>

Цикл *«for-of»* предназначен для работы с массивами:

```js
class WHello {
  // инициализация свойства объекта состояния
  colors = ['красный', 'зелёный', 'синий']

  // вернуть HTML-разметку компонента
  static template = `
    <ul $for="col of colors">
      <li>{{ col }}</li>
    </ul>
  `
}
```

<br>

При использовании событий в циклах с помощью специального атрибута ***@event***, они будут использовать актуальное значение переменной цикла для своей фазы итерации:

```js
static template = `
  <ul $for="col of colors">
    <li @click="console.log(col)">{{ col }}</li>
  </ul>
`
```

*Подробнее об этих событиях и других специальных атрибутах, будет рассказано далее в руководстве.*

<br>

Можно применять циклы с любой глубиной вложенности:

```js
class WHello {
  // инициализация свойства объекта состояния
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

  // вернуть HTML-разметку компонента
  static template = `
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
  `
}
```

<br>
<br>
<h2 id="mixins">Примеси</h2>

<br>

Примесь – общий термин в объектно-ориентированном программировании: класс, который содержит в себе методы для других классов. Эти методы могут использовать разные компоненты, что позволяет не создавать методы с одинаковым функционалом для каждого компонента отдельно.

В примере ниже, метод *printName()* из примеси используют компоненты Hello и Goodbye:

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

  <!-- подключить компонент Goodbye к документу -->
  <w-goodbye></w-goodbye>

  <script src="rtn.global.js"></script>

  <script>
    // определить класс Mixin для общих методов
    class Mixin {
      printName() {
        return this.userName
      }
    }

    // расширить класс компонента Hello от класса Mixin
    class WHello extends Mixin {
      // инициализация свойства объекта состояния
      userName = 'Анна'

      // вернуть HTML-разметку компонента
      static template = `<h1>Привет, {{ printName() }}!</h1>`
    }

    // расширить класс компонента Goodbye от класса Mixin
    class WGoodbye extends Mixin {
      // инициализация свойства объекта состояния
      userName = 'Иван'

      // вернуть HTML-разметку компонента
      static template = `<p>До свидания, {{ printName() }}...</p>`
    }
    
    // передать классы компонентов Hello и Goodbye функции Rtn
    Rtn(WHello, WGoodbye)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="views">Виды</h2>

<br>

Для отображения различных компонентов, используется специальный атрибут ***$view***. Этот атрибут может быть назначен любому элементу, но обычно используется элемент DIV. Содержащий атрибут элемент заменяется на компонент, название которого содержится в значении этого атрибута, например:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- подключить компонент WContent к документу -->
  <w-content></w-content>

  <script src="rtn.global.js"></script>

  <script>
    class WContent {
      // инициализация свойства объекта состояния
      compName = 'w-hello'

      // определить метод объекта состояния
      changeView() {
        this.compName = this.compName === 'w-hello' ? 'w-goodbye' : 'w-hello'
      }
      
      // вернуть HTML-разметку компонента
      static template = `
        <div $view="compName"></div>
        <button @click="changeView">Переключить</button>
      `
    }

    class WHello {
      // инициализация свойства объекта состояния
      userName = 'Анна'

      // вернуть HTML-разметку компонента
      static template = `<h1>Привет, {{ userName }}!</h1>`
    }

    class WGoodbye {
      // инициализация свойства объекта состояния
      userName = 'Иван'

      // вернуть HTML-разметку компонента
      static template = `<p>До свидания, {{ userName }}...</p>`
    }
    
    // передать классы компонентов функции Rtn
    Rtn(WContent, WHello, WGoodbye)
  </script>
</body>
</html>
```

Атрибут ***$view*** нельзя использовать вместе с циклами. Пример ниже приведёт к ошибке:

```js
static template = `
  <div $view="compName" $for="i = 0; i < 10; i++">
    <p>Число: {{ i }}</p>
  </div>
`
```

<br>
<br>
<h2 id="reactive-properties">Реактивные свойства</h2>

<br>

Все используемые свойства объекта состояния в компоненте являются реактивными. Это означает, что при изменении их значения, изменяются и значения во всех местах HTML-разметки компонента, где эти свойства используются.

Для вставки реактивных свойств в [текстовые узлы](https://learn.javascript.ru/dom-nodes), применяются двойные фигурные скобки:

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

Чтобы вставить реактивное свойство в атрибут, перед его именем необходимо поставить символ двоеточия:

```js
static template = `<h1 :title="message">Привет, Reacton!</h1>`
```

В примере ниже, реактивное свойство добавляется логическому атрибуту:

```js
class WHello {
  // инициализация свойства объекта состояния
  hide = true

  // вернуть HTML-разметку компонента
  static template = `<h1 :hidden="hide">Привет, Reacton!</h1>`
}
```

*Двоеточие перед названием атрибута используется лишь в HTML-разметке шаблона компонента, для указания на то, что этот атрибут принимает реактивное свойство. После компиляции, в итоговой разметке компонента будут отображаться названия атрибутов без двоеточий.*

<br>

Для атрибутов событий, перед названием атрибута указывается символ ***@***, за которым следует название события без префика ***on***, как показано ниже:

```js
class WHello {
  // инициализация свойства объекта состояния
  hide = true

  // вернуть HTML-разметку компонента
  static template = `
    <h1 :hidden="hide">Привет, Reacton!</h1>
    <button @click="hide = !hide">Скрыть/Показать</button>
  `
}
```

Вместо непосредственного изменения реактивного свойства в атрибуте события, в него можно передать название метода, который изменяет реактивное свойство, например:

```js
class WHello {
  // инициализация свойства объекта состояния
  hide = true

  // определить метод объекта состояния
  changeHide() {
    this.hide = !this.hide
  }

  // вернуть HTML-разметку компонента
  static template = `
    <h1 :hidden="hide">Привет, Reacton!</h1>
    <button @click="changeHide">Скрыть/Показать</button>
  `
}
```

<br>

В атрибутах событий доступен объект [event](https://learn.javascript.ru/introduction-browser-events#obekt-sobytiya), с помощью свойства [target](https://learn.javascript.ru/bubbling-and-capturing#event-target) которого, можно получить ссылку на элемент, на котором произошло событие:

```js
static template = `<button @click="console.log(event.target)">Показать в консоли</button>`
```

Атрибуты событий могут иметь такие же параметры, что передаются в третьем аргументе методу [addEventListener](https://learn.javascript.ru/introduction-browser-events#addeventlistener). Эти параметры указываются через точку, после названия события:

```js
@click.once.capture.passive
```

В примере ниже, вызывающий событие элемент будет показан в консоли только один раз:

```js
static template = `<button @click.once="console.log(event.target)">Показать в консоли</button>`
```

<br>
<br>