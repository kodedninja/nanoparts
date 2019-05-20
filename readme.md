# nanoparts
<a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
  <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="Stability"/>
</a>
<a href="https://www.npmjs.com/package/nanoparts">
  <img src="https://img.shields.io/npm/v/nanoparts.svg?style=flat-square" alt="NPM version"/>
</a>

Emit render for specific parts of the DOM.

Gives you more control over what to re-render on `emit('render')` with `emit('renderPart', 'somePart')`, so the update can be done faster.

Basically, it just connects `emit('renderPart', id)` to `state.cache(Nanopart, id)`, giving a quick way to use simple [`Nanocomponents`](https://github.com/choojs/nanocomponent). _It lives somewhere between a render function and a stateful component._

## Installation

```
npm i nanoparts
```

## Usage

```javascript
var choo = require('choo')
var html = require('choo/html')
var nanoparts = require('nanoparts')

var app = choo()

app.use(nanoparts())

app.route('*', function (state, emit) {
  return html`
    <body>
      ${state.nanopart('header', () => html`
        <div>
          header ${state.count}
        </div>
      `)}
      <div>
        body ${state.count}
      </div>
    </body>
  `
})
```

Then later call `emitter.emit(state.events.RENDER_PART, 'header')` to re-render only the header.

## API

#### `nanoparts()`
Initializes the store and applies events. Adds the `nanopart` function to the `state`.

#### `state.nanopart(id, renderer, opts)`
Renders and caches a new part with `id` and returns `renderer(state, emit)`. Pass `shouldUpdate: false` in the options to don't update the part on normal DOM updates.

#### `emitter.emit('renderPart', id)`
Triggers the re-render of part `id`.
