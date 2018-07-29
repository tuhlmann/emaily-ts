import express from "express"
import passport from "passport"
import logger from "../utils/logger"

export default (app: express.Application) => {
  app.get(
    "/auth/google",
    (req, res) => {
      logger.info("about to authenticate")
      passport.authenticate("google", {
        scope: ["profile", "email"],
        failureFlash: true,
        successFlash: "Welcome!",
      }, (error, user, info) => {
        logger.error("authenticate returned", error, user, info)
      })(req, res)
    },
  )

  app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("/surveys")
  })

  app.get("/api/logout", (req, res) => {
    req.logout()
    res.redirect("/")
  })

  app.get("/api/current_user", (req, res) => {
    res.send(req.user)
  })
}

// comment
