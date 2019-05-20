var choo = require('choo')
var html = require('choo/html')
var nanoparts = require('..')

var app = choo()

app.use(nanoparts())
app.use(function (state, emitter) {
  state.count = 0

  setInterval(function () {
    state.count++
  }, 500)

  emitter.on('update', function (id) {
    if (id) {
      emitter.emit(state.events.RENDER_PART, id)
    } else {
      emitter.emit(state.events.RENDER)
    }
  })
})

app.route('*', mainView)
app.mount('body')

function mainView (state, emit) {
  return html`
    <body>
      ${state.nanopart('header', renderHeader, { shouldUpdate: false })}
      <div>
        body ${state.count}
      </div>
      ${state.nanopart('footer', () => html`
        <div>
          footer ${state.count}
        </div>
      `)}
      <div>
        <button onclick="${() => emit('update', 'header')}">
          header
        </button>
        <button onclick="${() => emit('update', 'footer')}">
          footer
        </button>
        <button onclick="${() => emit('update')}">
          full
        </button>
      </div>
    </body>
  `
}

function renderHeader (state, emit) {
  return html`
    <div>
      header ${state.count}
    </div>
  `
}
