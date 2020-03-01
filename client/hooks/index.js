import Cookie from 'js-cookie'
import {
  saveToken,
  getUser
// @ts-ignore
} from 'store/actions/authActions'

export const useCookieToken = (props) => {
  const accessToken = Cookie.get('access_token')
  console.log(accessToken)
  if (accessToken && !props.user) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + 2)
    props.dispatch(saveToken({ accessToken, expiresIn }))
    props.dispatch(getUser())
  }
}