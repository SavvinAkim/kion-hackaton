import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import './button.scss'

type TProps = {
	onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: FC<PropsWithChildren<TProps>> = ({ onClick, children }) => {
	return (
		<button className={'PlayerButton'} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
