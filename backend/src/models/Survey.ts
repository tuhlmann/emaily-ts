import mongoose from "mongoose"
import RecipientSchema from "./Recipient"
import { ISurvey } from "../../../shared/src/models/Survey"

const { Schema } = mongoose

export interface ISurveyModel extends ISurvey, mongoose.Document {}

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
