import React from 'react'
import { Menu, Dropdown } from 'antd'
import { LogoutOutlined, SettingOutlined, CaretDownOutlined, FundOutlined } from '@ant-design/icons'
import { Props } from 'types'
import styled from 'styled-components'
import {BG_DARK_THEME, TEXT_COLOR_DARK_THEME} from 'global/variables'
import { logout } from 'store/actions/authActions'
import { useRouter, NextRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Button from 'components/ui/button'


const SMenu = styled(Menu)`
	background: ${BG_DARK_THEME};
`

const SMenuItem = styled(Menu.Item)`
	color: ${TEXT_COLOR_DARK_THEME};
	background: ${BG_DARK_THEME};
	font-size: 14px;
	transition: 0.25s opacity ease-in-out;
	&:hover {
		color: ${TEXT_COLOR_DARK_THEME};
		background: ${BG_DARK_THEME};
		opacity: 0.55;
	}
`

const DDMenu = (dispatch: Function, router: NextRouter): React.ReactElement => {

	const loggingOut = async (): Promise<void> => {
		await router.push('/')
		dispatch(logout())
	}

	return (
		<SMenu>
			<SMenuItem key="1" onClick={async (): Promise<boolean> => await router.replace("/user/dashboard")}>
				<FundOutlined />
				Dashboard
			</SMenuItem>
			<SMenuItem key="2" onClick={async (): Promise<boolean> => await router.replace("/user/settings")}>
				<SettingOutlined />
				Settings
			</SMenuItem>
			<Menu.Divider />
			<SMenuItem onClick={(): Promise<void> => loggingOut()} key="3">
				<LogoutOutlined />
				Logout
			</SMenuItem>
		</SMenu>
	)
}


const UserDropDown = (props: Props): React.ReactElement => {

	const dispatch: Function = useDispatch()
	const router: NextRouter = useRouter()


	return (
		<Dropdown overlay={DDMenu(dispatch, router)} trigger={['click']} placement="bottomRight">
			<span>
				<Button headerButton>{props.children}<CaretDownOutlined /> </Button>
			</span>
		</Dropdown>
	)
}

export default UserDropDown as React.FunctionComponent
