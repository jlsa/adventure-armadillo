// const App = require('./App')
const ThemeSwitcher = require('./ThemeSwitcher')
const PM_PRNG = require('./utils/math/PM_PRNG')

new ThemeSwitcher()

// const app = new App()

const rnd = new PM_PRNG()
console.log(rnd.nextIntRange(1, 1000))
// console.log(rnd.nextInt())
// app.start()