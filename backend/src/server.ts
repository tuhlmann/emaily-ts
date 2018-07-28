// Import everything from express and assign it to the express variable
import express from "express"
import mongoose from "mongoose"
import cookieSession from "cookie-session"
import passport from "passport"
import logger from "./utils/logger"

import keys from "../config/keys"

logger.info("Keys are: ", keys)

// order is important. First require model classes, then the code that uses them
import "./models/User"

import "./services/passport"

import authRoutes from "./routes/authRoutes"

// Import WelcomeController from controllers entry point
import { WelcomeController } from "./controllers"

mongoose.connect(
  keys.mongoUri,
  { useNewUrlParser: true },
)

// Create a new express application instance
const app: express.Application = express()

app.use(
  cookieSession({
    name: "session",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
)

app.use(passport.initialize())
app.use(passport.session())

authRoutes(app)

// Mount the WelcomeController at the /welcome route
app.use("/welcome", WelcomeController)

// The port the express app will listen on
const port: string | number = process.env.PORT || 5000

// Serve the application at the given port
app.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`)
})
