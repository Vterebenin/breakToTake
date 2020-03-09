import React from 'react'
import styled from 'styled-components'
import {
	BG_COLOR,
	ACCENT_HOVER,
	PRIMARY_COLOR,
	BG_DARK_THEME,
	TEXT_COLOR_DARK_THEME,
	TEXT_COLOR
} from 'global/variables'

interface MainButtonProps {
	children?: string | object;
	href?: string;
	inverse?: boolean;
	headerButton?: boolean;
	onClick?: Function;
}

const Button: React.FunctionComponent<MainButtonProps> = ({
	href,
	onClick,
	children,
	inverse,
	headerButton
}: MainButtonProps) => {

	return <MainButton
		inverse={inverse}
		headerButton={headerButton}
		href={href}
		onClick={(): Promise<void> | undefined => onClick && onClick()}>{children}</MainButton>
}

const MainButton = styled.a`
		z-index: 1;
		position: relative;
		display: inline-flex;
		font-size: inherit;
		font-family: inherit;
		color: ${({ inverse }): string => inverse ? TEXT_COLOR_DARK_THEME : TEXT_COLOR};
		border-radius: 30px;
		font-weight: bold;
		padding: 10px 20px;
		outline: none;
		border: none;
		background-color: ${(props: MainButtonProps): string => props.inverse ? BG_DARK_THEME : BG_COLOR};
		overflow: hidden;
		transition: color 0.4s ease-in-out;
		align-items: center;
		${(props: MainButtonProps): string => props.headerButton ? `
			margin: -22px 0;
			padding: 21px 0 21px 30px;
			border-radius: 0 0 0 40px;
			font-size: 14px;
			width: 180px;
			text-transform: capitalize;
			position: absolute;
			top: 22px;
			right: 0;
			color: ${TEXT_COLOR_DARK_THEME};
			background: #574b90;
		` : ''}
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
			transition: transform 0.4s ease-in-out;
		}
		.anticon {
			margin-left: 5px;
		}
		&:hover {
			cursor: pointer;
			color: ${PRIMARY_COLOR};
		}
		&:hover::before,
		&:active::before {
			transform: translate3d(50%, -50%, 0) scale3d(30, 30, 30);
		}
`


export default Button
