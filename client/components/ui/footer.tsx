import React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout

interface Props {
	children?: string | object;
}
const MainFooter: React.FunctionComponent<Props> = (props: Props) => {
	return <Footer style={{ textAlign: 'center' }}>{props.children}</Footer>
}

export default MainFooter
