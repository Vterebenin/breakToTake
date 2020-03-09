import React from 'react'
import { useRouter, NextRouter } from 'next/router'
import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import {IState, User} from 'types'

const checkAuth = async (token: string | undefined, router: NextRouter): Promise<void> => {
	if (!token) {
		await router.push('/')
	}
}

const Index: NextPage = () => {
	const router: NextRouter = useRouter()
	const token: string | undefined = useSelector((state: IState) => state.authReducer.accessToken)
	const user: User | undefined = useSelector((state: IState) => state.authReducer.user)
	checkAuth(token, router)

	return <div>there will be settings {user?.username}</div>
}

export default Index as React.FunctionComponent

