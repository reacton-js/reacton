export default function (elem) {
  // определить содержимое элемента
  const content = elem.content || elem

  // получить скрипты из содержимого
  const script = [...content.querySelectorAll('script')].map(script => content.removeChild(script).innerHTML).join('')

  // выполнить скрипты и создать объект компонента
  const exports = Function('exports', `${script}\n return exports`)() || {}

  // если элемент является экземпляром Template
  if (elem instanceof HTMLTemplateElement) {
    // если элемент содержит атрибут "name"
    if (elem.hasAttribute('name')) {
      exports.name = elem.getAttribute('name')
    }
  }
  
  // иначе, если элемент является экземпляром HTML
  else if (elem instanceof HTMLElement) {
    exports.name = elem.nodeName.toLowerCase()
  }
  
  // если элемент содержит атрибут "mode"
  if (elem.hasAttribute('mode')) {
    exports.mode = elem.getAttribute('mode')
  }
  
  // если элемент содержит атрибут "extends"
  if (elem.hasAttribute('extends')) {
    exports.extends = elem.getAttribute('extends')
  }
  
  // получить содержимое элемента для компонента
  exports.html = elem.innerHTML
  
  // вернуть объект компонента
  return exports
}