import { SurveyAction } from "../actions"
import * as constants from "../constants"
import { ISurvey } from "../../../shared/src/models/Survey"

export default function(state: ISurvey[] = [], action: SurveyAction) {
  switch (action.type) {
    case constants.FETCH_SURVEYS:
      return action.payload || false
      break
    default:
      return state
  }
}
