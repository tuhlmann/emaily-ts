import axios from "axios"
import * as constants from "../constants"
import * as redux from "redux"

export type AuthAction = LoginAction | FetchUserAction

export interface UserModel {
  _id: string
  googleId: string
}

export interface LoginAction {
  type: constants.LOGIN
}

export interface FetchUserAction {
  type: constants.FETCH_USER
  payload: UserModel | string
}

export const fetchUser = () => async (dispatch: redux.Dispatch<any>) => {
  const res = await axios.get("/api/current_user")
  dispatch({
    type: constants.FETCH_USER,
    payload: res.data,
  })
}
