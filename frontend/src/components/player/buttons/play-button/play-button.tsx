import React, { FC, MouseEventHandler } from 'react'
import './play-button.scss'
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react'

type TProps = {
	onClick?: MouseEventHandler<HTMLButtonElement>
	isPlaying: boolean
}

const PlayButton: FC<TProps> = ({ onClick, isPlaying }) => {
	return (
		<button
			tabIndex={1}
			aria-label={'Паузу или продолжить воспроизведение'}
			className={'ToolsPlayButton'}
			onClick={onClick}
			accessKey={'k'}
		>
			{isPlaying ? <IconPlayerPause size={24} /> : <IconPlayerPlay size={24} />}
		</button>
	)
}

export default PlayButton
