import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
  googleId: { type: String, index: true },
})

mongoose.model("users", userSchema)
