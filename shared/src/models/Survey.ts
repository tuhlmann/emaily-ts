import { Types as MongoTypes } from "mongoose"

export interface DocumentWithId {
  _id: any
}

export interface IRecipient {
  email: string
  responded: boolean
}

// See https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
// for combining mongoose and TS client / server models
export interface ISurvey extends DocumentWithId {
  _user: MongoTypes.ObjectId
  title: string
  subject: string
  body: string
  recipients: IRecipient[]
  yes: number
  no: number
  dateSent: Date
  lastResponded: Date
}
