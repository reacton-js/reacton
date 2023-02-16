import { SERVICE } from './defineComponent'

export default function (node, cb) {
  // если обратный вызов не передавался
  if (!cb) {
    // получить обратный вызов для узла компонента
    cb = SERVICE.get(this).callbacks.get(node)
  }

  // добавить ноду в массив обрабатываемых узлов
  SERVICE.get(this).nodes.push(node)

  // если обрабатывается простой атрибут или текстовый узел
  if (cb.type === 'text') {
    node.nodeValue = cb() // присвоить значение узлу
  }

  // иначе, если обрабатывается атрибут события
  else if (cb.type === 'on') {
    // назначить обработчик элементу атрибута
    node.ownerElement[node.nodeName] = cb()
  }

  // иначе, если обрабатывается атрибут монтирования
  else if (cb.type === 'is') {
    // получить название монтируемого компонента
    const name = cb()

    // если название получено
    if (name) {
      // присвоить название значению атрибута
      node.value = name

      // сохранить ссылку на старый элемент монтирования
      const oldElement = node.ownerElement

      // создать новый элемент монтирования компонента
      cb.mount.innerHTML = `<${oldElement.nodeName} is="${name}"></${oldElement.nodeName}>`

      // получить ссылку на новый элемент монтирования
      const newElement = cb.mount.content.firstElementChild

      // сохранить ссылку на коллекцию атрибутов старого элемента
      const oldAttributes = oldElement.attributes

      // перебрать коллекцию атрибутов старого элемента
      while (oldAttributes.length) {
        // получить первый атрибут элемента
        var attr = oldAttributes[0]

        // получить событие из старого элемента
        var onevent = attr.name.startsWith('on') ? oldElement[attr.name] : null

        // перенести атрибут из старого в новый элемент монтирования
        newElement.setAttributeNode(oldElement.removeAttributeNode(attr))

        // если событие получено, то присвоить его новому элементу
        if (onevent) newElement[attr.name] = onevent
      }

      // получить множество для хранения обратных вызовов булевых атрибутов
      const bool = SERVICE.get(this).booleans.get(node)

      // если множество получено
      if (bool) {
        // определить переменную для хранения обратных вызовов
        let cb = null

        // перебрать множество обратных вызовов
        for (cb of bool) {
          // поменять владельца атрибута в свойстве обратного вызова
          cb.owner = newElement
        }
      }

      // перенести содержимое старого в новый элемент монтирования
      while (oldElement.firstChild) {
        newElement.append(oldElement.firstChild)
      }

      // заменить старый новым элементом монтирования
      oldElement.replaceWith(newElement)
    }
  }

  // иначе, если обрабатывается атрибут цикла
  else if (cb.type === 'for') {
    // если датчик выполнения цикла не установлен
    if (!cb.isExec) {
      // сбросить значение индекса цикла
      cb.index = 0

      // установить элемент цикла
      cb.node = node

      // установить датчик выполнения цикла
      cb.isExec = true
      
      // выполнить итератор цикла
      cb.next()

      // удалить датчик выполнения цикла
      delete cb.isExec

      // сохранить значение индекса цикла
      const index = cb.index

      // перебрать дочерние узлы элемента цикла
      for (var i = node.childNodes.length; i > index; i--) {
        node.lastChild.remove() // удалить последний узел цикла
      }
    }
  }

  // иначе, если обрабатывается булев атрибут
  else if (cb.type === 'boolean') {
    // добавить или удалить элементу булев атрибут
    cb() ? cb.owner.setAttributeNode(node) : cb.owner.removeAttribute(node.nodeName)
  }

  // удалить ноду из массива обрабатываемых узлов
  SERVICE.get(this).nodes.pop()
}