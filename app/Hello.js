// экспортировать объект компонента Hello
export const Hello = {
  name: 'r-hello',
  data() {
    return {
      message: 'Reacton'
    }
  },
  html: `
    <h1>Привет, {{ message }}!</h1>
  `
}