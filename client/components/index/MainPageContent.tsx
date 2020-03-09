import React from 'react'
import Button from 'components/ui/button'
import { NextPage } from 'next'
import { sendNotification } from 'mixins'


const MainPageContent: NextPage = () => {
	return (
		<>
			<div>
				Let your eyes
			</div>
			<Button inverse onClick={(): Promise<void> => sendNotification()}>Send test notification</Button>
		</>
	)
}


export default MainPageContent as React.FunctionComponent

