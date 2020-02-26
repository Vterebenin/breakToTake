import axios from 'axios'

import actions from "./index";

export const getUser = id => async dispatch => {
  const user = await axios.get(`/api/users/info${id}`)
  return dispatch({ type: actions.GET_USER, user: user.data })
}