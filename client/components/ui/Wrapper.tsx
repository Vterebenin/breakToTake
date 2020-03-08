import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { baseUrl } from 'plugins/settings'
import { useRouter } from 'next/router'
import { PageHeader, Layout } from 'antd'
import Sidebar from 'components/ui/sidebar'
import MainFooter from 'components/ui/footer'
import Button from 'components/ui/button'
import {
	saveToken,
	getUser,
	logout
} from 'store/actions/authActions'
import { useCookieToken } from 'hooks/index'
import { Props } from 'types/index'
import {PRIMARY_COLOR, SPECIAL_BG_COLOR, TEXT_COLOR} from "global/variables";

const { Content } = Layout

const Wrapper = (props: Props) => {
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
				<SPageHeader
					className="site-layout-background"
					style={{ color: 'white' }}
					ghost={false}
					title={<STitle> Break to take</STitle>}
					extra={[
						user && <SUserWrapper key={1}> {user.username} </SUserWrapper>,
						user && <Button key={2} onClick={loggingOut}>logout </Button>,
						!loggedIn && <Button key={3} href={`${baseUrl}/login/google-oauth2`}>log in with google</Button>
					]}>
				</SPageHeader>
				<SContent>
					{props.children}
				</SContent>
				<MainFooter>Break to take © {date} Created by Valentine Terebenin</MainFooter>
			</Layout>
			{/*<Sidebar />*/}
		</Layout>
	)
}

const NavItem = styled.span`
  margin: 0 10px;
  color: red;
`
const SContent = styled(Content)`
	background-color: red;
  margin: 0 16px
`
const SPageHeader = styled(PageHeader)`
	background-color: ${SPECIAL_BG_COLOR};
`
const STitle = styled.div`
	color: ${PRIMARY_COLOR};
`
const SUserWrapper = styled.span`
	color: ${PRIMARY_COLOR};
	font-size: 16px
`

export default Wrapper as React.FunctionComponent

