import axios from "axios"
import * as constants from "../constants"
import { Action, Dispatch } from "redux"
import { Token } from "react-stripe-checkout"
import { SurveyFormData } from "../components/surveys/formFields"
import * as H from "history"
import { ISurvey } from "../../../shared/src/models/Survey"

export type AuthAction = LoginAction | FetchUserAction

export interface UserModel {
  _id: string
  googleId: string
}

export interface LoginAction extends Action {
  type: constants.LOGIN
}

export interface FetchUserAction extends Action {
  type: constants.FETCH_USER
  payload: UserModel | string
}

export const fetchUser = () => async (dispatch: Dispatch) => {
  const res = await axios.get("/api/current_user")

  dispatch({
    type: constants.FETCH_USER,
    payload: res.data,
  })
}

export const handleToken = (token: Token) => async (dispatch: Dispatch) => {
  const res = await axios.post("/api/stripe", token)

  dispatch({
    type: constants.FETCH_USER,
    payload: res.data,
  })
}

export type SurveyAction = SubmitSurveyAction | FetchSurveysAction

export interface SubmitSurveyAction extends Action {
  type: constants.SUBMIT_SURVEY
}

export const submitSurvey = (values: SurveyFormData, history: H.History) => async (dispatch: Dispatch) => {
  const res = await axios.post("/api/surveys", values)

  history.push("/surveys")
  dispatch({
    type: constants.FETCH_USER,
    payload: res.data,
  })
}

export interface FetchSurveysAction extends Action {
  type: constants.FETCH_SURVEYS
  payload: ISurvey[]
}

export const fetchSurveys = () => async (dispatch: Dispatch<FetchSurveysAction>) => {
  const res = await axios.get("/api/surveys")

  dispatch({
    type: constants.FETCH_SURVEYS,
    payload: res.data as ISurvey[],
  })
}
