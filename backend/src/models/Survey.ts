import mongoose from "mongoose"
import RecipientSchema from "./Recipient"

const { Schema } = mongoose

export interface IRecipient {
  email: string
  responded: boolean
}

// See https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
// for combining mongoose and TS client / server models
export interface ISurvey {
  _user: mongoose.Types.ObjectId
  title: string
  subject: string
  body: string
  recipients: IRecipient[]
  yes: number
  no: number
  dateSent: Date
  lastResponded: Date
}

export interface ISurveyModel extends ISurvey, mongoose.Document { }

const surveySchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  dateSent: Date,
  lastResponded: Date,
})

export const Survey = mongoose.model<ISurveyModel>("surveys", surveySchema)
