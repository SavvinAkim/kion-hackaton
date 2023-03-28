import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import './column-button.scss'

type TProps = {
	onClick?: MouseEventHandler<HTMLButtonElement>
	tabIndex?: number
	ariaLabel?: string
	accessKey?: string
}

const ColumnButton: FC<PropsWithChildren<TProps>> = ({
	onClick,
	tabIndex,
	children,
	ariaLabel,
	accessKey
}) => {
	return (
		<button
			className={'PlayerButton'}
			tabIndex={tabIndex}
			onClick={onClick}
			aria-label={ariaLabel}
			accessKey={accessKey}
		>
			{children}
		</button>
	)
}

export default ColumnButton
