const Color = require("./utils/Color")
const PM_PRNG = require('./utils/math/PM_PRNG')
const Component = require('./Component')
const Layer = require('./Layer')

class Grid extends Component {
    constructor (dimensions = { w: 10, h: 10}, tileSize = { w: 10, h: 10 }) {
        super()
        this.dimensions = dimensions
        this.tileSize = tileSize
        this.grid = []
        this.rand = new PM_PRNG(21354523)
    }

    reset () {
        this.grid.splice(0, this.grid.length)
        for (let x = 0; x < this.dimensions.w; x++) {
            for (let y = 0; y < this.dimensions.h; y++) {
                this.grid[this.grid.length] = null
            }
        }
        super.reset()
    }

    init () {
        if (this.getInitialized()) {
            return false;
        }
        
        for (let x = 0; x < this.dimensions.w; x++) {
            for (let y = 0; y < this.dimensions.h; y++) {
                this.grid[this.grid.length] = null
            }
        }
        this.fill()
        super.init()
    }

    fill() {
        for (let x = 0; x < this.dimensions.w; x++) {
            for (let y = 0; y < this.dimensions.h; y++) {
                const color = this.rand.nextIntRange(1, 255)
                this.grid[x + this.dimensions.w * y] = `rgb(${color}, ${color}, ${color})`
            }
        }
    }

    onGrid(x, y) {
        if (x >= 0 && x <= this.dimensions.w)
        return false;
    }

    smoothFill() {
        for (let x = 0; x < this.dimensions.w; x++) {
            for (let y = 0; y < this.dimensions.h; y++) {
                const color = this.rand.nextIntRange(1, 255)
                this.grid[x + this.dimensions.w * y] = `rgb(${color}, ${color}, ${color})`
            }
        }
    }

    render (context, deltaTime) {
        // super.render(context, deltaTime)
        const padding = 0.5
        for (let x = 0; x < this.dimensions.w; x++) {
            for (let y = 0; y < this.dimensions.h; y++) {
                const xx = padding + x * this.tileSize.w
                const yy = padding + y * this.tileSize.h

                context.fillStyle = this.grid[x + this.dimensions.w * y]
                context.fillRect(xx, yy, this.tileSize.w, this.tileSize.h)
            }
        }
    }

    update (deltaTime) {
        super.update(deltaTime)
        // this.fill()
        this.smoothFill()
    }
}

module.exports = Grid