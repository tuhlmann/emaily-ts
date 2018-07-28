import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import mongoose from "mongoose"
import keys from "../../config/keys"

const User = mongoose.model("users")

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser < any,
  any >
    ((id, done) => {
      User.findById(id).then(user => done(null, user))
    })

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser) {
        return done(null, existingUser)
      }

      const user = await new User({ googleId: profile.id }).save()
      done(null, user)
    },
  ),
)
