import { FC, MouseEventHandler } from 'react'
import './play-button.scss'
import {
	IconPlayerPauseFilled,
	IconPlayerPlayFilled
} from '@tabler/icons-react'

type TProps = {
	onClick?: MouseEventHandler<HTMLButtonElement>
	isPlaying: boolean
}

const PlayButton: FC<TProps> = ({ onClick, isPlaying }) => {
	return (
		<button
			tabIndex={1}
			aria-label={
				isPlaying ? 'Поставить на паузу' : 'Продолжить воспроизведение'
			}
			className={'ToolsPlayButton'}
			onClick={onClick}
			accessKey={'k'}
		>
			{isPlaying ? (
				<IconPlayerPauseFilled size={48} />
			) : (
				<IconPlayerPlayFilled size={48} />
			)}
		</button>
	)
}

export default PlayButton
