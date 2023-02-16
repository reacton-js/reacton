import { SERVICE } from './defineComponent'
import handlerCallback from './handlerCallback'

// переопределяет владельца и ноду булевого атрибута
function rebool (node, temp, cb) {
  // если нода не является атрибутом
  if (node.nodeType !== 2) {
    // установить нового владельца атрибута
    cb.owner = node

    // вернуть клонированную ноду атрибута
    return temp.cloneNode()
  }
  // иначе,
  else {
    // установить нового владельца атрибута
    cb.owner = node.ownerElement
  }

  return node // вернуть ноду
}

// обновляет содержимое узлов цикла компонента
function update (node, temp) {
  // получить обратный вызов для шаблонной ноды
  const cb = SERVICE.get(this).callbacks.get(temp)

  // если обратный вызов получен
  if (cb) {
    // если обрабатывается атрибут монтирования
    if (temp.name === 'is') {
      return [node, cb] // вернуть атрибут и обратный вызов
    }

    // вызвать обработчик для узла компонента
    return handlerCallback.call(this, cb.type === 'boolean' ? rebool(node, temp, cb) : node, cb)
  }

  // содержит данные для элемента монтирования
  let mount = null

  // если имеется коллекция атрибутов
  if (temp.attributes) {
    // вызвать для атрибутов функцию обновления содержимого
    for (var attr of temp.attributes) {
      mount = update.call(this, node.attributes[attr.name] || node, attr) || mount
    }
  }

  // если нода является элементом монтирования
  if (mount) {
    // вызвать обработчик для атрибута монтирования
    handlerCallback.call(this, ...mount)

    // определить новый элемент монтирования
    node = mount[0].ownerElement
  }

  // вызвать для дочерних узлов функцию обновления содержимого
  for (var i = 0; i < temp.childNodes.length; i++) {
    update.call(this, node.childNodes[i], temp.childNodes[i])
  }
}


export default function* (temp) {
  // определить количество дочерних элементов в шаблоне цикла компонента
  const length = temp.childNodes.length

  while (true) {
    // определить элемент цикла компонента
    const $parent = temp.node
    
    // если родительский элемент цикла не имеет дочернего узла с таким индексом
    if (!$parent.childNodes[temp.index]) {
      // клонировать содержимое шаблона цикла
      const node = temp.cloneNode(true)

      // вызывать для клонированного содержимого функцию обновления
      update.call(this, node, temp)

      // добавить клонированное содержимое в родительский элемент
      $parent.append(node)
    }

    // иначе, обновить дочерние узлы родительского элемента
    else for (var i = 0; i < length; i++) {
      update.call(this, $parent.childNodes[temp.index + i], temp.childNodes[i])
    }

    // увеличить индекс дочерних элементов на количество узлов в шаблоне
    yield temp.index += length
  }
}