import actions from '../actions'
import Cookie from 'js-cookie'

export default (state = {
  user: null,
  tokenType: Cookie.get('tokenType'),
  accessToken: Cookie.get('accessToken'),
}, action) => {
  switch (action.type) {
    case actions.SAVE_TOKEN:
      const { accessToken, tokenType, expiresIn } = action.payload
      Cookies.set('token_type', tokenType, { expires: expiresIn })
      Cookies.set('access_token', accessToken, { expires: expiresIn })
      return { ...state, accessToken, tokenType };
    case actions.GET_USER:
      return { ...state, user: action.user };
    case actions.GET_USER_FAIL:
      Cookie.remove('tokenType')
      Cookie.remove('accessToken')
      return { ...state, tokenType: null, accessToken: null };
    case actions.LOGOUT:
      Cookie.remove('tokenType')
      Cookie.remove('accessToken')
      return { ...state, tokenType: null, accessToken: null, user: null };
    default:
      return state;
  }
};