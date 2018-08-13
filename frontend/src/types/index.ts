import { FormStateMap } from "redux-form"
import { ISurvey } from "../../../shared/src/models/Survey"

/**
 * The complete state definition
 */
export interface IApplicationState {
  auth: any
  form: FormStateMap
  surveys: ISurvey[]
}
