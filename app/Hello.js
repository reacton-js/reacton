// экспортировать объект компонента Hello
export const Hello = {
  name: 'r-hello',
  async data() {
    const message = await new Promise(ok => setTimeout(() => ok('Reacton'), 1000))

    return {
      message
    }
  },
  html: `
    <h1>Привет, {{ message }}!</h1>
  `
}