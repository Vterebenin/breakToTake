import 'antd/dist/antd.css'
import React from 'react'
import { Provider } from 'react-redux'
import App, { AppContext } from 'next/app'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { RootState } from 'store/reducers/authReducer'
import { makeStore } from 'store/index'


class MyApp extends App<ReduxWrapperAppProps<RootState>> {
	static async getInitialProps ({ Component, ctx}: AppContext) {
		// We can dispatch from here too
		ctx.store.dispatch({type: 'FOO', payload: 'foo'})

		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

		return {pageProps}
	}

	render() {
		const {Component, pageProps, store} = this.props
		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		)
	}
}

export default withRedux(makeStore)(MyApp)
