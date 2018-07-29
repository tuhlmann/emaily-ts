// FIXME: test out dotenv instead of JS solution

// tslint:disable no-var-requires no-require-imports
// keys.js - figure out what set of credentials to return
export default process.env.NODE_ENV === "production" ? require("./prod") : require("./dev")

// tslint:enable no-var-requires no-require-imports
