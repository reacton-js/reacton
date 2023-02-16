import { SERVICE } from './defineComponent'
import handlerCallback from './handlerCallback'

export default function (deps) {
  // выполнить функцию перед обновлением
  SERVICE.get(this).before?.call(this)

  // вызвать обработчик для каждой ноды из зависимости
  for (var node of deps) {
    handlerCallback.call(this, node)
  }
  
  // выполнить функцию после обновления
  SERVICE.get(this).after?.call(this)
}