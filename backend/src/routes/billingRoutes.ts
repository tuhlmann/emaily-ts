import express from "express"
import passport from "passport"
import Stripe from "stripe"
import keys from "../../config/keys"
import requireLogin from "../middlewares/requireLogin"

const stripe = new Stripe(keys.stripeSecretKey)

export default (app: express.Application) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "Emaily: $5 for 5 credits",
      source: req.body.id,
    })

    req.user.credits += 5
    const user = await req.user.save()
    res.send(user)
  })
}
