import { DefaultRootState } from 'react-redux'

export interface IState extends DefaultRootState {
	authReducer: {
		accessToken?: string
		user?: {
			email?: string
		}
	}
}
export interface User {
		email?: string | undefined
}
