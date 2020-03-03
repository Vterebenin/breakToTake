import actions from '../actions'
import Cookie from 'js-cookie'
import { Action, Reducer } from 'redux'

export interface AuthAction extends Action {
	payload?: {
		accessToken: string | string[];
		expiresIn: Date;
	};
	user?: object;
}
export interface AuthState {
	accessToken?: string | string[] | undefined | null;
	user?: object | null
}
// state: { accessToken: string | undefined; user: null }, action
export const reducer = (state = {
	user: null,
	accessToken: Cookie.get('access_token'),
}, action: AuthAction) => {
	switch (action.type) {
		case actions.SAVE_TOKEN: {
			const { accessToken, expiresIn } = action.payload!
			const expires = new Date(expiresIn)
			Cookie.set('access_token', accessToken, { expires })
			return { ...state, accessToken }
		}
		case actions.GET_USER: {
			const { user } = action
			return { ...state, user }
		}
		case actions.GET_USER_FAIL: {
			Cookie.remove('access_token')
			return { ...state, accessToken: null }
		}
		case actions.LOGOUT: {
			Cookie.remove('access_token')
			return { ...state, accessToken: null, user: null }
		}
		default: {
			return state
		}
	}
}

export type RootState = ReturnType<typeof reducer>
