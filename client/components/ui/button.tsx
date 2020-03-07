import React from 'react'
import styled from 'styled-components'
import {
	ACCENT_BG_COLOR,
	ACCENT_HOVER,
	SPECIAL_TEXT_COLOR_BOLD,
} from 'global/variables'

interface MainButtonProps {
	children?: string | object;
	href?: string;
	onClick?: any;
}

const Button: React.FunctionComponent<MainButtonProps> = (props: MainButtonProps) => {
	const { href, onClick, children } = props
	const handleClick: () => Promise<void> | undefined = onClick
	return <MainButton href={href} onClick={handleClick}>{children}</MainButton>
}

const MainButton = styled.a`
	z-index: 1;
  position: relative;
  display: inline-flex;
  font-size: inherit;
  font-family: inherit;
  color: ${SPECIAL_TEXT_COLOR_BOLD};
  border-radius: 30px;
  font-weight: bold;
  padding: 10px 20px;
  outline: none;
  border: none;
  background-color: ${ACCENT_BG_COLOR};
  overflow: hidden;
  transition: color 0.4s ease-in-out;
  &::before {
  	content: '';
		z-index: -1;
		position: absolute;
		top: 100%;
		right: 100%;
		width: 1em;
		height: 1em;
		border-radius: 50%;
		background-color: ${ACCENT_HOVER};
		transform-origin: center;
		transform: translate3d(50%, -50%, 0) scale3d(0, 0, 0);
		transition: transform 0.45s ease-in-out;
  }
  &:hover {
  	cursor: pointer;
  	color: ${ACCENT_BG_COLOR};
  }
  &:hover::before {
  	transform: translate3d(50%, -50%, 0) scale3d(30, 30, 30);
  }
`

export default Button
