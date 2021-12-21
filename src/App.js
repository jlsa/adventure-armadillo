const Layer = require("./Layer")

const AppState = Object.freeze({
  uninitialized: 0,
  initialized: 1
})

class App {
  constructor() {
    this.state = AppState.uninitialized

    this.settings = {
      bounds: { w: 1000, h: 1000 }
    }
    this.layers = []
    // this.init()
  }

  init () {
    const parentNode = document.getElementById('layers')
    parentNode.style.width = this.settings.bounds.w
    parentNode.style.height = this.settings.bounds.h

    const layerNames = ['board', 'ui']
    layerNames.forEach(layerNames => {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('width', this.settings.bounds.w)
      canvas.setAttribute('height', this.settings.bounds.h)
      canvas.classList.add('layer')

      parentNode.appendChild(canvas)
      canvas.offscreenCanvas = document.createElement('canvas')
      canvas.offscreenCanvas.width = canvas.getAttribute('width')
      canvas.offscreenCanvas.height = canvas.getAttribute('height')

      const context = canvas.getContext('2d')

      this.layer[this.layers.length] = new Layer(canvas, context)
    })

    // this.layers[0].addChild(this.)
    this.state = AppState.initialized
  }
}

module.exports = App