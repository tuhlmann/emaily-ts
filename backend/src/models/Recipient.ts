import mongoose from "mongoose"

const { Schema } = mongoose

export default new Schema({
  email: String,
  responded: { type: Boolean, default: false },
})
