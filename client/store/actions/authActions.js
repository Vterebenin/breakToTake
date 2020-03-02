import axios from 'plugins/axiosConfig'
import Cookie from 'js-cookie'
import actions from './index'


export const saveToken = (payload) => async dispatch => {
	return dispatch({ type: actions.SAVE_TOKEN, payload })
}

export const getUser = () => async dispatch => {
	try {
		const token = Cookie.get('access_token')
		const { data: user } = await axios.post('core/user/get_user_by_token/', { token })
		return dispatch({ type: actions.GET_USER, user })
	} catch (e) {
		return dispatch({ type: actions.GET_USER_FAIL })
	}
}


export const logout = () => async dispatch => {
	console.log('123qwe')
	return dispatch({ type: actions.LOGOUT })
}
