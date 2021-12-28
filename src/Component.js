const ComponentState = require('./enums/ComponentState')

class Component {
  constructor () {
    if (new.target === Component) {
      throw new TypeError('Unable to constuct Component instances directly')
    }
    this.children = []
    this.componentState = ComponentState.disabled
    this.initialized = false
  }

  add (element) {
    if (this.canAdd(element)) {
      const index = this.children.length
      this.children[index] = element
      return true
    }
    return false
  }

  canAdd (element) {
    this.children.filter(child => {
      if (child.uuid) {
        if (child.uuid === element.uuid) {
          return false
        }
      }
      return false
    })
    return true
  }

  removeAt (index) {
    this.children.removeAt(index)
  }

  update (deltaTime) {
    if (this.isActive()) {
      this.children.forEach(child => {
        child.update(deltaTime)
      })
    }
  }

  render (context, deltaTime) {
    if (this.isActive()) {
      this.children.forEach(child => {
        child.render(context, deltaTime)
      })
    }
  }

  /**
   * @returns ComponentState
   */
  getState() {
    return this.componentState;
  }

  /**
   * @returns boolean
   */
  isActive() {
    return this.getState() === ComponentState.active
  }

  deactivate() {
    this.componentState = ComponentState.disabled
  }

  activate() {
    this.componentState = ComponentState.active
  }

  init() {
    this.initialized = true
  }
  
  reset() {
    this.initialized = false
  }

  getInitialized() {
    return this.initialized
  }
}

module.exports = Component