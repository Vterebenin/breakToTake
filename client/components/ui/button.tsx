import React from 'react'
import styled from 'styled-components'

interface Props {
	children?: string | object;
}
const Button: React.FunctionComponent<Props> = (props: Props) => {
	return <MainButton>{props.children}</MainButton>
}

const MainButton = styled.button`
  margin: 0 10px;
  color: red;
`

export default Button
