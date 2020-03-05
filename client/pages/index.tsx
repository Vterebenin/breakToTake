import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { baseUrl } from 'plugins/settings'
import { useRouter } from 'next/router'
import { Button, Layout } from 'antd'
import Sidebar from 'components/ui/sidebar'
import MainFooter from 'components/ui/footer'
import { NextPage } from 'next'
import {
	saveToken,
	getUser,
	logout
} from 'store/actions/authActions'
import { useCookieToken } from 'hooks/index'

const { Header, Content } = Layout

const Page: NextPage = () => {
	const date = new Date().getFullYear()

	const router = useRouter()
	const dispatch = useDispatch()
	const [user, loggedIn] = useCookieToken()

	if (router.query.token && !user) {
		const { token: accessToken, expiresIn } = router.query
		dispatch(saveToken({ accessToken, expiresIn }))
		dispatch(getUser())
	}

	const loggingOut = async (): Promise<void> => {
		await router.push('/')
		dispatch(logout())
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ color: 'white' }} >
					<NavItem>
            Break To Take
					</NavItem>
					{user &&
						<>
							<NavItem>
								({user.email})
							</NavItem>
							<NavItem>
								<Button onClick={loggingOut}>logout</Button>
							</NavItem>
						</>
					}
					{!loggedIn &&
						<NavItem>
							<Button href={`${baseUrl}/login/google-oauth2`}>log in with google</Button>
						</NavItem>
					}
				</Header>
				<Content style={{ margin: '0 16px' }}>
					<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
					</div>
				</Content>
				<MainFooter>Break to take © {date} Created by Valentine Terebenin</MainFooter>
			</Layout>
			<Sidebar />
		</Layout>
	)
}

const NavItem = styled.span`
  margin: 0 10px
`

export default Page as React.FunctionComponent

