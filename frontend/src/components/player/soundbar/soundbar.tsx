import React, { FC } from 'react'
import './soundbar.scss'

type TProps = {
	currentVolume: number
	maxVolume: number
}

const Soundbar: FC<TProps> = ({ currentVolume, maxVolume }) => {
	const currentPercent = currentVolume / (maxVolume / 100)
	const currentPoint = currentPercent / 10

	return (
		<div
			tabIndex={10}
			aria-label={`Текущая громкость ${currentVolume * 100} процентов`}
			className={'VideoPlayerSoundBar'}
		>
			{[...Array(10)].map((_, index) => (
				<div
					key={index}
					className={`VideoPlayerSoundBarPoint ${
						currentPoint >= index + 1 && 'active'
					}`}
				/>
			))}
		</div>
	)
}

export default Soundbar
