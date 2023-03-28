import { FC } from 'react'
import './switcher.scss'

type TProps = {
	isActive: boolean
	onChange?: (newState: boolean) => void
}

const Switcher: FC<TProps> = ({ isActive, onChange }) => {
	const onClick = () => {
		onChange && onChange(!isActive)
	}

	return (
		<button
			tabIndex={2}
			role={'switch'}
			aria-label={'Включить выключить тефло-комментарии'}
			onClick={onClick}
			className={`Switcher ${isActive && 'active'}`}
		>
			<div className={`SwitcherIndicator`} />
		</button>
	)
}

export default Switcher
