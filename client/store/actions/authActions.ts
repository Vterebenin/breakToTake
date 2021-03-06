import axios from 'plugins/axiosConfig'
import { Dispatch } from 'redux'
import Cookie from 'js-cookie'
import actions from './index'

interface TokenPayload {
	accessToken: string;
	expiresIn: string;
	user: object;
}

export const saveToken = (payload: { expiresIn: any; accessToken: any }) => async (dispatch: Dispatch) => {
	return dispatch({ type: actions.SAVE_TOKEN, payload })
}

export const getUser = () => async (dispatch: Dispatch) => {
	try {
		const token = Cookie.get('access_token')
		const { data: user } = await axios.post('core/user/get_user_by_token/', { token })
		return dispatch({ type: actions.GET_USER, user })
	} catch (e) {
		return dispatch({ type: actions.GET_USER_FAIL })
	}
}

export const logout = () => async (dispatch: Dispatch) => {
	return dispatch({ type: actions.LOGOUT })
}
