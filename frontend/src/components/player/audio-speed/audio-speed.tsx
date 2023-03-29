import { FC } from 'react'
import './audio-speed.scss'

type TProps = {
	currentSpeed: number
	setSpeed: (speed: number) => void
}

const AudioSpeed: FC<TProps> = ({ currentSpeed, setSpeed }) => {
	const speedList = [1, 1.25, 1.5, 2, 3]

	return (
		<div className={'AudioSpeedWrapper'}>
			{speedList.map((speed, index) => (
				<button
					key={speed}
					aria-label={`Установить скорость тефлокомментариев ${speed}`}
					tabIndex={3 + index}
					onClick={() => setSpeed(speed)}
					className={`Title5Regular AudioSpeedButton ${
						currentSpeed === speed && 'active'
					}`}
				>
					x{speed}
				</button>
			))}
		</div>
	)
}

export default AudioSpeed
