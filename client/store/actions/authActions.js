import axios from 'axios'

import actions from './index'


export const saveToken = (payload) => async dispatch => {
  return dispatch({ type: actions.SAVE_TOKEN, payload })
}

export const getUser = () => async dispatch => {
  try {
    const user = await axios.get(`/api/users/token`)
    return dispatch({ type: actions.GET_USER, user: user.data })
  } catch (e) {
    return dispatch({ type: actions.GET_USER_FAIL })
  }
}


export const logout = () => async dispatch => {
  try {
    const user = await axios.get(`/api/user/logout`)
    return dispatch({ type: actions.GET_USER, user: user.data })
  } catch (e) {
    return dispatch({ type: actions.GET_USER_FAIL })
  }
}
