import { useCookieToken } from 'hooks'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { base_url } from 'plugins/settings'
import { withRouter, SingletonRouter } from 'next/router'
import { useRouter } from 'next/router'
import {
	saveToken,
	getUser,
	logout
} from 'store/actions/authActions'
import { Button, Layout } from 'antd'
import Sidebar from 'components/ui/sidebar'
import MainFooter from 'components/ui/footer'
import {NextPage} from 'next'

const { Header, Content } = Layout

interface Props {
  user?: {
    email: string;
  };
  accessToken?: string;
  userAgent?: string;
  router?: SingletonRouter;
  dispatch?: any;
}

const saveAndGetUser = (props: Props) => {
	const { token: accessToken, expiresIn } = props.router!.query!
  props.dispatch!(saveToken({ accessToken, expiresIn }))
  props.dispatch!(getUser())
}

const Page: NextPage<Props> = (props) => {
	const router = useRouter()
	// const loggedIn = true
	const loggedIn = useCookieToken(props)

	const date = new Date().getFullYear()

	if (props.router!.query!.token && !props.user) {
		saveAndGetUser(props)
	}

	const loggingOut = async () => {
		await router.push('/')
		props.dispatch(logout())
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar />
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ color: 'white' }} >
					<NavItem>
            Break To Take

					</NavItem>
					<NavItem>
						{loggedIn &&
              (props.user!.email)
						}
					</NavItem>
					<NavItem>
						{!loggedIn &&
              (<Button href={`${base_url}/login/google-oauth2`}>log in with google</Button>)
						}
					</NavItem>
					<NavItem>
						{loggedIn &&
              (<Button onClick={() => loggingOut}>logout</Button>)
						}
					</NavItem>
				</Header>
				<Content style={{ margin: '0 16px' }}>
					<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
					</div>
				</Content>
				<MainFooter>Break to take © {date} Created by Valentine Terebenin</MainFooter>
			</Layout>
		</Layout>
	)
}


Page.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
	return { userAgent }
}


const mapStateToProps = (state: any) => {
	const { accessToken, user } = state.authReducer
	return { accessToken, user }
}
const mapDispatchToProps = (dispatch: any) => {
	return { dispatch }
}

const NavItem = styled.span`
  margin: 0 10px
`

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page) as any)

