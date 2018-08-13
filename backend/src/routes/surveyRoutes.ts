import _ from "lodash"
import { Path } from "path-parser"
import { URL } from "url"
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

export interface WebhookEvent {
  email: string
  surveyId: string
  choice: string
}

export type Option<T> = T | null

export default (app: express.Application) => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!")
  })

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false })
      .sort({ dateSent: -1 })
      .exec()

    res.send(surveys)
  })

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
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
  })

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice")
    const reduced: Map<string, WebhookEvent> = (req.body as any[]).reduce((accu, { email, url }: any) => {
      const match: Option<Partial<WebhookEvent>> = url ? p.test(new URL(url).pathname) : null
      if (match) {
        accu.set(`${match.surveyId}_${match.email}`, { email, ...match })
      }

      return accu
    }, new Map<string, WebhookEvent>())

    for (const { surveyId, email, choice } of reduced.values()) {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: {
            "recipients.$.responded": true,
            lastResponded: new Date(),
          },
        },
      ).exec()
    }

    const events = Array.from(reduced.values())
    console.log("unique events: ", events)

    res.send({})
  })
}
