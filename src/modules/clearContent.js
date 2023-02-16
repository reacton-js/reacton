// шаблон поиска подстановок в текстовых узлах
const regSet = /{{([^{}]*?)}}/

// шаблон поиска специальных атрибутов в элементах
const regAttr = /:|\$/

// определяет свойство реактивности узла шаблона
export const symReact = Symbol()


export default function clearContent (node) {
  // если нода является комментарием
  if (node.nodeType === 8) {
    return node.remove() // удалить ноду
  }

  // иначе, если нода является специальным атрибутом
  else if (node.nodeType === 2 && regAttr.test(node.nodeName[0])) {
    // определить имя атрибута без префикса
    const name = node.nodeName.slice(1)

    // сохранить значение старого атрибута
    const value = node.value.trim() || "''"

    // если атрибут является циклом элемента
    if (name === 'for') {
      // сохранить значение в символьном свойстве элемента
      node.ownerElement[symReact] = value
    }

    // иначе,
    else {
      // создать новый атрибут для элемента
      const attr = document.createAttribute(name)

      // сохранить значение в новом атрибуте
      attr.value = value

      // если нода является атрибутом монтирования
      if (name === 'is') {
        // сохранить тип в символьном свойстве элемента
        node.ownerElement[symReact] = name
      }
      // иначе,
      else {
        // сохранить тип в символьном свойстве атрибута
        attr[symReact] = typeof node.ownerElement[name] === 'boolean' ? 'boolean' : name.startsWith('on') ? 'on' : 'text'
      }

      // добавить элементу новый атрибут
      node.ownerElement.setAttributeNode(attr)
    }
    
    // удалить старый атрибут из элемента
    return node.ownerElement.removeAttribute(node.nodeName)
  }

  // если нода является текстовым узлом
  else if (node.nodeType === 3) {
    // если нода является пустым узлом
    if (!node.data.trim()) {
      // если нода находится между ссылками
      if (node.previousSibling?.nodeName === 'A' && node.nextSibling?.nodeName === 'A') {
        // заменить её значение символом переноса
        node.data = '\n'
      }

      // иначе, удалить ноду
      else return node.remove()
    }

    // иначе,
    else {
      // найти подстановку в содержимом
      const arr = regSet.exec(node.nodeValue)

      // если имеется подстановка
      if (arr) {
        // если подстановка находится в начале содержимого
        if (arr.index === 0) {
          // разделить ноду по длине подстановки
          node.splitText(arr[0].length)

          // сохранить в ноде выражение подстановки
          node.data = arr[1].trim() || "''"

          // сохранить тип в символьном свойстве узла
          node[symReact] = 'text'
        }

        // иначе,
        else {
          // разделить ноду по индексу нахождения подстановки
          node.splitText(arr.index)
        }
      }
    }
  }
  
  // иначе,
  else {
    // если имеется коллекция атрибутов
    if (node.attributes) {
      // вызвать для атрибутов функцию очистки содержимого
      for (var i = 0; i < node.attributes.length; i++) {
        clearContent.call(this, node.attributes[i]) || i--
      }
    }

    // вызвать для дочерних узлов функцию очистки содержимого
    for (var i = 0; i < node.childNodes.length; i++) {
      clearContent.call(this, node.childNodes[i]) || i--
    }
  }

  return true // вернуть Истину
}