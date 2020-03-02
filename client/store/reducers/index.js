import { combineReducers } from 'redux'

import { reducer } from './authReducer'
const authReducer = reducer

export default combineReducers({
	authReducer
})