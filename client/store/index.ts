import { createStore, applyMiddleware, compose } from 'redux'
import { MakeStore } from 'next-redux-wrapper'
import thunk from 'redux-thunk'

import reducer from './reducers'
import { AuthAction, AuthState, RootState } from 'store/reducers/authReducer'

const enhancers = compose(
	applyMiddleware(thunk),
)

interface InitialState {
	authReducer: AuthState
}

export const makeStore: MakeStore = (initialState: any) => {
	return createStore(reducer, initialState, enhancers)
};
