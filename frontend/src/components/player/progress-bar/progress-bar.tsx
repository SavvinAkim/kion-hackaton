import { ChangeEvent, FC } from 'react'
import './progress-bar.scss'

type TProps = {
	percentPlayed: number
	secondsLeft: number
	handleChange: (currentProgress: number) => void
}

const ProgressBar: FC<TProps> = ({
	percentPlayed,
	secondsLeft,
	handleChange
}) => {
	const onRewind = (event: ChangeEvent<HTMLInputElement>) => {
		handleChange(Number(event.target.value))
	}

	return (
		<div className={'ProgressBarWrapper'}>
			<div className={'ProgressBar'}>
				<div
					className={'ProgressBarProgress'}
					style={{
						width: `${percentPlayed}%`
					}}
				/>
			</div>
			<span className={'Title5Regular'}>{secondsLeft}</span>
		</div>
	)
}

export default ProgressBar
