import { SERVICE } from './defineComponent'
import Hooks from './classHooks'

export default function addObserver (obj, dep) {
  // определить для объекта наблюдаемый прокси
  const observed = new Proxy(obj, new Hooks(SERVICE.get(this), dep))

  // добавить наблюдаемый прокси в хранилище
  SERVICE.get(this).values.set(obj, observed)

  // вернуть наблюдаемый прокси
  return observed
}