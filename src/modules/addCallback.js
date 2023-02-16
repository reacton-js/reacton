import { symReact } from './clearContent'
import createCallback from './createCallback'

export default function addCallback (node, temp, vars) {
  // если имеется коллекция атрибутов
  if (temp.attributes) {
    // вызвать для атрибутов функцию добавления обратного вызова
    for (var attr of temp.attributes) {
      addCallback.call(this, node.attributes[attr.name], attr, vars)
    }
  }

  // если нода шаблона имеет символьное свойство
  if (temp[symReact]) {
    // вызвать для узла функцию создания обратного вызова
    createCallback.call(this, node, temp, vars)
  }

  // иначе, вызвать для дочерних узлов функцию добавления обратного вызова
  else for (var i = 0; i < temp.childNodes.length; i++) {
    addCallback.call(this, node.childNodes[i], temp.childNodes[i], vars)
  }
}