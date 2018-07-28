import { StoreState } from "../types"
import { AuthAction } from "../actions"
import * as constants from "../constants"

export default function(state: StoreState = {}, action: AuthAction) {
  switch (action.type) {
    case constants.FETCH_USER:
      return action.payload || false
      break
    default:
      return state
  }
}
