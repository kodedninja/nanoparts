var Component = require('nanocomponent')

module.exports = nanoparts

function nanoparts () {
  return function nanopartStore (state, emitter) {
    state.events.RENDER_PART = 'renderPart'

    // (str, fn, bool) -> Node
    state.nanopart = function (id, renderer, opts) {
      return state.cache(Nanopart, id, renderer, opts).render(state, emitter.emit)
    }

    emitter.on(state.events.RENDER_PART, function (id) {
      var cached = state.cache(Nanopart, id)
      if (!cached.element) {
        throw new Error('nanoparts: no part was rendered with id ' + id)
      }
      cached.rerender()
    })
  }
}

class Nanopart extends Component {
  constructor (id, state, emit, renderer, opts) {
    super(id)
    opts = opts || {}

    this.renderer = renderer
    this.shouldUpdate = opts.shouldUpdate !== undefined ? opts.shouldUpdate : true
  }

  createElement (state, emit) {
    return this.renderer(state, emit)
  }

  update () {
    return this.shouldUpdate
  }
}
