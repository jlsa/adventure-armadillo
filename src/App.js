const Layer = require("./Layer")
const AppState = require('./enums/AppState')
const Grid = require('./Grid')

class App {
  constructor() {
    this.state = AppState.uninitialized
    this.lastUpdate = Date.now()
    this.elapsedTimeBeforeNextStep = 0
    this.loop = this.loop.bind(this)
    this.settings = {
      bounds: { w: 1000, h: 1000 }
    }
    this.layers = []
    this.grid = new Grid({ w: 20, h: 20 },  { w: 10, h: 10 })
    this.fixedStep = 1000
    
    this.init()
  }

  init () {
    const parentNode = document.getElementById('layers')
    parentNode.style.width = this.settings.bounds.w
    parentNode.style.height = this.settings.bounds.h

    const layerNames = ['board', 'ui']
    layerNames.forEach(layerName => {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('width', this.settings.bounds.w)
      canvas.setAttribute('height', this.settings.bounds.h)
      canvas.classList.add('layer')

      parentNode.appendChild(canvas)
      canvas.offscreenCanvas = document.createElement('canvas')
      canvas.offscreenCanvas.width = canvas.getAttribute('width')
      canvas.offscreenCanvas.height = canvas.getAttribute('height')

      const context = canvas.getContext('2d')

      this.layers[this.layers.length] = new Layer(canvas, context)
    })

    // this.layers[0].addChild(this.)
    this.state = AppState.initialized

    this.grid.init()
    this.layers[0].addChild(this.grid)
  }

  start () {
    requestAnimationFrame(this.loop)
  }

  set LastUpdate (lastUpdate) {
    this.lastUpdate = lastUpdate
  }

  get LastUpdate () {
    return this.lastUpdate
  }

  setSpeed (speed) {
    this.fixedStep = speed
  }

  loop () {
    const now = Date.now()
    const deltaTime = now - this.lastUpdate
    this.LastUpdate = now
    this.elapsedTimeBeforeNextStep += deltaTime
    if (this.elapsedTimeBeforeNextStep >= this.fixedStep) {
      this.elapsedTimeBeforeNextStep = 0
      this.render(deltaTime)
      this.update(deltaTime)
    }

    requestAnimationFrame(this.loop)
  }

  update (deltaTime) {
    this.layers.forEach(layer => {
      layer.update(deltaTime)
    })
  }

  render (deltaTime) {
    this.layers.forEach(layer => {
      layer.context.clearRect(0, 0, this.settings.bounds.w, this.settings.bounds.h)
      layer.render(deltaTime)
    })
  }
}

module.exports = App