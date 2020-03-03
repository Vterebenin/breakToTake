import Cookie from 'js-cookie'
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
	dispatch?: any;
}

export const useCookieToken = (props: Props) => {
	const accessToken = Cookie.get('access_token')
	if (accessToken && !props.user) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + 2)
		props.dispatch!(saveToken({accessToken, expiresIn}))
		props.dispatch!(getUser())
	}
	return !!props.user

}