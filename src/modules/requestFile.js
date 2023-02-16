export default function (path) {
  // выполнить запрос к файлу компонента
  const xhr = new XMLHttpRequest()
  xhr.open('GET', path)
  xhr.send()
  
  return new Promise(ok => {
    xhr.onload = () => {
      // шаблон для содержимого файла компонента
      const template = document.createElement('template')
  
      // добавить содержимое файла в шаблон
      template.innerHTML = xhr.response
  
      // вернуть массив дочерних элементов из шаблона
      ok([...template.content.children])
    }
  })
}