import mongoose from "mongoose"
import express from "express"
import passport from "passport"
import requireLogin from "../middlewares/requireLogin"
import requireCredits from "../middlewares/requireCredits"
import { Mailer } from "../services/Mailer"
import surveyTemplate from "../services/emailTemplates/surveyTemplate"
// import logger from "../utils/logger"

import { Survey } from "../models/Survey"
// const Survey = mongoose.model("surveys")

export interface SurveyPostBody {
  title: string
  subject: string
  body: string
  recipients: string
}

export default (app: express.Application) => {

  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!")
  })

  app.post(
    "/api/surveys",
    requireLogin,
    requireCredits,
    async (req, res) => {
      const { title, subject, body, recipients } = req.body as SurveyPostBody
      const recipientRecs = recipients.split(",").map(s => ({ email: s.trim() }))
      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipientRecs,
        _user: req.user.id,
        dateSent: Date.now(),
      })

      const mailer = new Mailer(survey, surveyTemplate(survey))
      try {
        await mailer.send()
        await survey.save()
        req.user.credits -= 1
        const user = await req.user.save()
        res.send(user)
      } catch (err) {
        res.status(422).send(err)
      }
    },
  )

  app.get("/api/surveys", requireLogin, (req, res) => {
    res.redirect("/surveys")
  })

}
