import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { baseUrl } from 'plugins/settings'
import { useRouter } from 'next/router'
import { PageHeader, Button, Layout } from 'antd'
import Sidebar from 'components/ui/sidebar'
import MainFooter from 'components/ui/footer'
import { NextPage } from 'next'
import {
	saveToken,
	getUser,
	logout
} from 'store/actions/authActions'
import { useCookieToken } from 'hooks/index'

const { Content } = Layout

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
				<PageHeader
					className="site-layout-background"
					style={{ color: 'white' }}
					ghost={false}
					title={'Break to take'}
					extra={[
						<NavItem key={1}> Break To Take </NavItem>,
						user && <NavItem key={2}> ({user.email}) </NavItem>,
						user && <NavItem key={3}> <span onClick={loggingOut}>logout</span> </NavItem>,
						!loggedIn && <NavItem key={4}><Button href={`${baseUrl}/login/google-oauth2`}>log in with google</Button></NavItem>
					]}>
				</PageHeader>
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
  margin: 0 10px;
  color: red;
`

export default Page as React.FunctionComponent

