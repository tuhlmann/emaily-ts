// FIXME: test out dotenv instead of JS solution

export interface IConfigKeys {
  googleClientID: string
  googleClientSecret: string
  mongoUri: string
  cookieKey: string
  stripePublishableKey: string
  stripeSecretKey: string
  sendGridKey: string
  redirectDomain: string
}

// tslint:disable no-var-requires no-require-imports
// keys.js - figure out what set of credentials to return
const config: IConfigKeys = process.env.NODE_ENV === "production" ? require("./prod") : require("./dev")
export default config

// tslint:enable no-var-requires no-require-imports
