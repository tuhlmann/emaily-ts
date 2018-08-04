import * as React from "react"
import * as ReactDOM from "react-dom"
import "./index.css"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import axios from "axios"

(window as any).axios = axios

import "materialize-css/dist/css/materialize.css"

import { AppContainer } from "react-hot-loader"

import App from "./components/App"
import reducers from "./reducers"

import registerServiceWorker from "./registerServiceWorker"

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

const rootEl = document.getElementById("root") as HTMLElement

// Wrap the rendering in a function:
// const render = (component: React.Component<any,  any>) => {
//   ReactDOM.render(
//     // Wrap App inside AppContainer
//     <AppContainer>
//       <App />
//     </AppContainer>,
//     rootEl,
//   )
// }

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootEl,
)

registerServiceWorker()

// render(App)

// if (module.hot) {
//   module.hot.accept("./components/App", () => {
//     import("./components/App").then( app => {
//       const NextApp = app.default
//       ReactDOM.render(
//         <Provider store={store}>
//           <NextApp />
//         </Provider>,
//         rootEl,
//       )
//     })
//   })
// }

if (module.hot) {
  module.hot.accept("./components/App", () => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContainer>,
      rootEl,
    )
  })
}

console.log("STRIPE_KEY is", process.env.REACT_APP_STRIPE_KEY)
console.log("Environment is", process.env.NODE_ENV)
