// Import everything from express and assign it to the express variable
import express from "express"
import * as path from "path" // normalize the paths : http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
import mongoose from "mongoose"
import morgan from "morgan"
import cookieSession from "cookie-session"
import passport from "passport"
import bodyParser from "body-parser"
import logger from "./utils/logger"

import keys from "../config/keys"

logger.info("Keys are: ", keys)

// order is important. First require model classes, then the code that uses them
import "./models/User"

import "./services/passport"

import authRoutes from "./routes/authRoutes"
import billingRoutes from "./routes/billingRoutes"

// Import WelcomeController from controllers entry point
import { WelcomeController } from "./controllers"

mongoose.connect(
  keys.mongoUri,
  { useNewUrlParser: true },
)

// Create a new express application instance
const app: express.Application = express()

const rootPath: string = process.env.PWD || process.cwd()

const p = path.join(rootPath, "frontend/build")
logger.info(`PATH IS ${rootPath}, ${p}`)

app.use(bodyParser.json())
app.use(
  cookieSession({
    name: "session",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
)

app.use(morgan("dev"))  // log every request to the console

app.use(passport.initialize())
app.use(passport.session())

authRoutes(app)
billingRoutes(app)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(rootPath, "frontend", "build"), { maxAge: "7d" }))

  app.get("*", (req, res) => {
    logger.info("Serving fallback route for request ", req.baseUrl)
    res.sendFile(path.resolve(rootPath, "frontend", "build", "index.html"))
  })
}

// Mount the WelcomeController at the /welcome route
// app.use("/welcome", WelcomeController)

// The port the express app will listen on
const port: string | number = process.env.PORT || 5000

// Serve the application at the given port
app.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`)
})
