import actions from '../actions'
import Cookie from 'js-cookie'

export const reducer = (state = {
  user: null,
  tokenType: Cookie.get('token_type'),
  accessToken: Cookie.get('access_token'),
}, action) => {
  switch (action.type) {
    case actions.SAVE_TOKEN:
      const { accessToken, tokenType, expiresIn } = action.payload
      const expires = new Date(expiresIn)
      Cookie.set('token_type', tokenType, { expires })
      Cookie.set('access_token', accessToken, { expires })
      return { ...state, accessToken, tokenType };
    case actions.GET_USER:
      const { user } = action
      return { ...state, user };
    case actions.GET_USER_FAIL:
      Cookie.remove('token_type')
      Cookie.remove('access_token')
      return { ...state, tokenType: null, accessToken: null };
    case actions.LOGOUT:
      Cookie.remove('token_type')
      Cookie.remove('access_token')
      return { ...state, tokenType: null, accessToken: null, user: null };
    default:
      return state;
  }
};