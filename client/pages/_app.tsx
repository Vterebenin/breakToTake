import 'antd/dist/antd.css'
import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import App, { AppContext, AppInitialProps } from 'next/app'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { RootState } from 'store/reducers/authReducer'
import { makeStore } from 'store/index'
import Wrapper from 'components/ui/Wrapper'
import styled from 'styled-components'

class MyApp extends App<ReduxWrapperAppProps<RootState>> {
	static async getInitialProps ({ Component, ctx}: AppContext): Promise<AppInitialProps> {
		// We can dispatch from here too
		ctx.store.dispatch({type: 'FOO', payload: 'foo'})

		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

		return {pageProps}
	}

	render (): ReactElement {
		const {Component, pageProps, store} = this.props
		return (
			<Provider store={store}>
				<Wrapper>
					<Component {...pageProps} />
				</Wrapper>
			</Provider>
		)
	}
}

export default withRedux(makeStore)(MyApp)
