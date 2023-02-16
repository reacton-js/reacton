import { arrayComponents } from '../index'

// определить документ для создания клонов компонентов 
const HTMLDocument = document.implementation.createHTMLDocument()

// добавляет клонированное HTML-содержимое документа в контейнер
function render (inNode, outNode, index = 0) {
  // если входная нода является стилем, скриптом, тегом TEMPLATE или комментарием
  if (inNode.nodeName === 'STYLE' || inNode.nodeName === 'SCRIPT' || inNode.nodeName === 'TEMPLATE' || inNode.nodeType === 8) {
    return false // вернуть Ложь
  }

  // определить переменную для хранения ноды контейнера
  let newNode = null

  // если входная нода является компонентом
  if (inNode.$root) {
    // создать новый элемент компонента без содержимого
    newNode = HTMLDocument.createElement(inNode.nodeName)

    // определить в элементе атрибуты аналогичные входному компоненту
    for (const attr of inNode.attributes) {
      newNode.setAttribute(attr.name, attr.value)
    }
  }

  // иначе,
  else {
    // клонировать входную ноду без содержимого
    newNode = inNode.cloneNode()
  }

  // добавить новую ноду в содержимое контейнера
  outNode.append(newNode)
  
  // определить коллекцию дочерних узлов входной ноды
  const childs = inNode.nodeName === 'SLOT' ? inNode.assignedNodes({ flatten: true }) : (inNode.$root || inNode).childNodes

  // вызвать для дочерних узлов функцию рендеринга содержимого
  for (var i = 0, y = 0; i < childs.length; i++, y++) {
    render(childs[i], outNode.childNodes[index], y) || y--
  }

  // если новая нода является слотом, то заменить её дочерними узлами
  if (newNode.nodeName === 'SLOT') {
    newNode.replaceWith(...newNode.childNodes)
  }

  return true // вернуть Истину
}


export default async inNode => {
  // дождаться завершения промисов определённых компонентов
  await Promise.all(arrayComponents)

  // создать контейнер для вывода HTML-содержимого документа
  const outNode = document.createElement('template')

  // вызвать функцию рендеринга HTML-содержимого
  render(inNode || document.children[0], outNode.content)

  // вернуть HTML-содержимое документа
  return inNode ? outNode.innerHTML : `<!DOCTYPE html>\n${outNode.innerHTML}`
}