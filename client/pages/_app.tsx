import 'antd/dist/antd.css'
import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import App, { AppContext, AppInitialProps } from 'next/app'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { RootState } from 'store/reducers/authReducer'
import { makeStore } from 'store/index'
import 'global/global.css'
import styled from 'styled-components'
import Wrapper from 'components/ui/Wrapper'

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
				<SWrapper>
					<Component {...pageProps} />
				</SWrapper>
			</Provider>
		)
	}
}
const SWrapper = styled(Wrapper)`
`

export default withRedux(makeStore)(MyApp)
