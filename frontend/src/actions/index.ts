import axios from "axios"
import * as constants from "../constants"
import { Action, Dispatch } from "redux"
import { Token } from "react-stripe-checkout"

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
