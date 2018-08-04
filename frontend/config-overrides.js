/* tslint:disable */
// const rewireReactHotLoader = require("react-app-rewire-hot-loader")

// module.exports = function override(config, env) {
//   config = rewireReactHotLoader(config, env)
//   return config
// }

const rewireTypescript = require("react-app-rewire-typescript")

module.exports = function override(config, env) {
  config = rewireTypescript(config, env)
  return config
}

/* tslint:enable */
