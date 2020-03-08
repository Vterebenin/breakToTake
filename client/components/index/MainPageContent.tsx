import React from 'react'
import Button from 'components/ui/button'
import { NextPage } from 'next'
import { sendNotification } from 'mixins'


const MainPageContent: NextPage = () => {
	return (
		<Button onClick={(): any => sendNotification()}>Send test notification</Button>
	)
}


export default MainPageContent as React.FunctionComponent

