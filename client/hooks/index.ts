import Cookie from 'js-cookie'
import {
	saveToken,
	getUser
} from 'store/actions/authActions'
import { useSelector, useDispatch } from 'react-redux'
import { IState, User } from 'types'

interface Props {
	user?: {
		email: string;
	};
	accessToken?: string;
	userAgent?: string;
	dispatch?: Function;
}

export const useCookieToken = (): [User | undefined, boolean] => {
	const accessToken: string | undefined = Cookie.get('access_token')
	const user: User | undefined = useSelector((state: IState) => state.authReducer.user)
	const dispatch: Function = useDispatch()
	if (accessToken && !user) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + 2)
		dispatch(saveToken({ accessToken, expiresIn }))
		dispatch(getUser())
	}
	return [user, !!user]
}