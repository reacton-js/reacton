export default function (elem, ...args) {
  // если функция была вызвана как конструктор
  if (new.target) {
    return new DocumentFragment // вернуть новый элемент событий
  }
  
  // вызвать пользовательское событие для элемента
  (elem || this).dispatchEvent(new CustomEvent(...args))
}