import Cookie from 'js-cookie'
import { Dispatch, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
	saveToken,
	getUser
} from 'store/actions/authActions'

interface Props {
	user?: {
		email: string;
	};
	accessToken?: string;
	userAgent?: string;
	dispatch?: Dispatch;
}

export const useCookieToken = (props: Props) => {
	const accessToken = Cookie.get('access_token')
	if (accessToken && !props.user) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + 2)
		props.dispatch!(saveToken<AnyAction[]>({ accessToken, expiresIn }))
		props.dispatch!(getUser<AnyAction[]>())
	}
	return !!props.user

}