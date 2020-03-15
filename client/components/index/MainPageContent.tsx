import React, { useState } from 'react'
import Button from 'components/ui/button'
import { Select } from 'antd'
import { NextPage } from 'next'
import styled from 'styled-components'
import { sendNotification } from 'mixins'
import {TEXT_COLOR} from 'global/variables'

const { Option } = Select

const MainPageContent: NextPage = () => {
	const [frequency, setFrequency] = useState(30)

	return (
		<MainSection>
			<MainTitle>
				Give your eyes a break from your work!
			</MainTitle>
			<SubTitle>
				<span>
					Remind me to have a break every
				</span>
				<Select
					defaultValue={frequency}
					dropdownClassName={'SSelectDD'}
					bordered={false}
					placeholder="30"
					onChange={(event): void => setFrequency(event)}>
					<Option value={30}>30</Option>
					<Option value={45}>45</Option>
					<Option value={60}>60</Option>
				</Select>
				<span>
					minutes
				</span>
			</SubTitle>
			<SubTitle>
				With this application you can send yourself notifications with a short period, reminding you to take a break.
			</SubTitle>
			<OlTitle>
				To do this:
			</OlTitle>
			<OlWrap>
				<LiWrap>Choose the frequency with which we should notify you</LiWrap>
				<LiWrap>Optional: register in our application through google account for more fine-tuning notifications and more! </LiWrap>
			</OlWrap>
			<Button inverse onClick={(): Promise<void> => sendNotification()}>Send test notification</Button>
			<Doubt>Still in doubt? Let us tell you about the <a href="/">motivation</a> behind this application.</Doubt>
		</MainSection>
	)
}

const MainTitle = styled.div`
	margin: 40px 0;
	font-size: 34px;
	font-weight: bold;
	color: ${TEXT_COLOR};
`
const SubTitle = styled.div`
	color: ${TEXT_COLOR};
	font-size: 20px;
	margin-bottom: 10px;
`
const OlTitle = styled.div`
	font-size: 18px;
	text-align: left;
	font-weight: bold;
	color: ${TEXT_COLOR};
	margin-bottom: 5px;
`
const OlWrap = styled.ol`
	text-align: left;
	padding-left: 18px;
`
const LiWrap = styled.li`
	text-align: left;
	font-size: 16px;
	margin-bottom: 5px;
`
const Doubt = styled.div`
	margin-top: 40px;
	font-size: 12px;
	text-align: left;
`
const MainSection = styled.section`
	max-width: 700px;
	width: 100%;
	text-align: center;
	margin: 100px auto 100px;
`



export default MainPageContent as React.FunctionComponent

