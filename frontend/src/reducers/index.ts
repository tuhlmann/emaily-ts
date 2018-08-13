import { combineReducers } from "redux"
import authReducer from "./authReducer"
import surveysReducer from "./surveysReducer"
import { reducer as reduxForm } from "redux-form"
import { IApplicationState } from "../types"

export default combineReducers<IApplicationState>({
  auth: authReducer,
  surveys: surveysReducer,
  form: reduxForm,
})
