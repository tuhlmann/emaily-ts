import { AuthAction } from "../actions"
import * as constants from "../constants"

export interface IApplicationAuthState {
  auth?: any
}

export default function(state: IApplicationAuthState = {}, action: AuthAction) {
  switch (action.type) {
    case constants.FETCH_USER:
      return action.payload || false
      break
    default:
      return state
  }
}
