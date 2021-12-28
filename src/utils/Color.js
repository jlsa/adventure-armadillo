// Inspired by https://css-tricks.com/converting-color-spaces-in-javascript/
class Color {
    constructor (hue = 0, saturation = 0, lightness = 0) {
      this.toString.bind(this)
      this.hue = hue
      this.saturation = saturation
      this.lightness = lightness
    }
  
    hsl () {
      return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`
    }
  
    rgb () {
      // Must be fractions of 1
      const h = this.hue
      const s = this.saturation / 100
      const l = this.lightness / 100
  
      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c - (1 - Math.abs((this.hue / 60) % 2 - 1))
      const m = l - c / 2
  
      let r = 0
      let g = 0
      let b = 0
  
      if (h >= 0 && h < 60) {
        r = c; g = x; b = 0
      } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0
      } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x
      } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c
      } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c
      } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x
      }
  
      r = Math.round((r + m) * 255)
      g = Math.round((g + m) * 255)
      b = Math.round((b + m) * 255)
  
      return `rgb(${r}, ${g}, ${b})`
    }
  }
  
  module.exports = Color
  