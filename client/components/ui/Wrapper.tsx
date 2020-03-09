import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { baseUrl } from 'plugins/settings'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PageHeader, Layout } from 'antd'
import Button from 'components/ui/button'
import {
	saveToken,
	getUser
} from 'store/actions/authActions'
import { useCookieToken } from 'hooks/index'
import { Props } from 'types/index'
import {
	BG_COLOR,
	BG_DARK_THEME,
	PRIMARY_COLOR,
	SPECIAL_BG_COLOR,
	TEXT_COLOR_DARK_THEME
} from 'global/variables'
import UserDropDown from 'components/ui/UserDropDown'

const { Content } = Layout

const Wrapper = (props: Props): React.ReactElement => {
	const date = new Date().getFullYear()

	const router = useRouter()
	const dispatch = useDispatch()
	const [user, loggedIn] = useCookieToken()

	if (router.query.token && !user) {
		const { token: accessToken, expiresIn } = router.query
		dispatch(saveToken({ accessToken, expiresIn }))
		dispatch(getUser())
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Layout className="site-layout">
				<SPageHeader
					className="site-layout-background"
					style={{ color: 'white' }}
					ghost={false}
					title={<Link href="/"><STitle>Break to take</STitle></Link>}
					extra={[
						<UserDropDown key={1}>{user?.username}</UserDropDown>,
						!loggedIn && <Button headerButton key={2} href={`${baseUrl}/login/google-oauth2`}>log in with google</Button>
					]}>
				</SPageHeader>
				<SContent>
					{props.children}
				</SContent>
				<SMainFooter>Break to take © {date} Created by Valentine Terebenin</SMainFooter>
			</Layout>
			{/*<Sidebar />*/}
		</Layout>
	)
}

const SMainFooter = styled.footer`
	padding: 10px;
	text-align: right;
	background: ${BG_DARK_THEME};
	color: ${TEXT_COLOR_DARK_THEME};
	
`
const SContent = styled(Content)`
	background-color: ${BG_COLOR};
  padding: 0 16px
`
const SPageHeader = styled(PageHeader)`
	background-color: ${SPECIAL_BG_COLOR};
`
const STitle = styled.a`
	color: ${PRIMARY_COLOR};
	&:hover {
		color: ${PRIMARY_COLOR};
	}
`

export default Wrapper as React.FunctionComponent

