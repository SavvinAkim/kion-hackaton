// @ts-ignore
import videoUrl from './film.mp4'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import './styles/player.scss'
import './styles/player-toolbar.scss'
import HotkeyProvider from './hotkey-provider'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import ColumnButton from './buttons/column-button/column-button'
import Soundbar from './soundbar/soundbar'
import { OnProgressProps } from 'react-player/base'
import { isInRange } from '../../utils/is-in-range'
import { pronounce } from '../../lib/pronouncer'
import { fetchSubtitles, IData } from '../../store/fetch-subtitles'
import PlayButton from './buttons/play-button/play-button'
import Switcher from './switcher/switcher'
import AudioSpeed from './audio-speed/audio-speed'

const Player: FC = () => {
	const [data, setData] = useState<IData[]>([])
	const [isPlaying, setIsPlaying] = useState(false)
	const [volume, setVolume] = useState(1)
	const [isPronounceActive, setIsPronounceActive] = useState(true)
	const [speed, setSpeed] = useState(1)

	const playerRef = useRef<ReactPlayer>(null)

	useEffect(() => {
		fetchSubtitles().then(fetchedData => setData(fetchedData))
	}, [])

	const onProgress = (progress: OnProgressProps) => {
		const currentComment = data.filter(comment =>
			isInRange(
				[Number(comment.timestamp), Number(comment.timestamp) + 1],
				progress.playedSeconds
			)
		)[0]

		if (!currentComment) return

		const commentText = currentComment.text

		pronounceMemo(commentText)
	}

	const pronounceMemo = useCallback(
		(commentText: string) => {
			if (!isPronounceActive) return
			pronounce(commentText, volume, speed)
		},
		[volume, speed, isPronounceActive]
	)

	const toggleComments = useCallback(() => {
		setIsPronounceActive(isPronounceActive => !isPronounceActive)

		// Check if pronounce is stopped
		if (isPronounceActive) {
			speechSynthesis.cancel()
		}
	}, [isPronounceActive])

	const togglePlaying = useCallback(() => {
		setIsPlaying(isPlaying => !isPlaying)

		// Check if video is stopped
		if (isPlaying) {
			speechSynthesis.pause()
		} else {
			speechSynthesis.resume()
		}
	}, [isPlaying])

	const volumeUp = useCallback(() => {
		setVolume(currentVolume => {
			const newVolume = currentVolume + 0.1

			if (newVolume > 1) return 1

			return newVolume
		})
	}, [])

	// Перемотка вперед
	const rewindNext = useCallback(() => {
		const currentTime = playerRef.current?.getCurrentTime() || 0
		const newTiming = currentTime + 5
		playerRef.current?.seekTo(newTiming)
	}, [])

	// Перемотка назад
	const rewindBack = useCallback(() => {
		const currentTime = playerRef.current?.getCurrentTime() || 0
		const newTiming = currentTime < 5 ? 0 : currentTime - 5
		playerRef.current?.seekTo(newTiming)
	}, [])

	const volumeDown = useCallback(() => {
		setVolume(currentVolume => {
			const newVolume = currentVolume - 0.1

			if (newVolume < 0) return 0

			return newVolume
		})
	}, [])

	return (
		<HotkeyProvider
			togglePlaying={togglePlaying}
			volumeUp={volumeUp}
			volumeDown={volumeDown}
			rewindNext={rewindNext}
			rewindBack={rewindBack}
		>
			<div className={'VideoWrapper'}>
				<div className={'VideoControls'}>
					<div className={'VideoControlsHeader'}>
						<h1
							role={'banner'}
							aria-label={'Название фильма'}
							className={'PlayerVideoName Title3'}
						>
							Бриллиантовая рука
						</h1>
						<div className={'ControlsHeaderButton Title5Regular'}>
							<span className={'gray-400'}>Ctrl W</span>
							<IconPlus size={32} className={'white'} />
						</div>
					</div>

					<div className={'ControlsToolbar'}>
						<PlayButton onClick={togglePlaying} isPlaying={isPlaying} />

						<div className={'ToolbarControls'}>
							<div className={'ToolbarAudioToggle'}>
								<h6 className={'Title4Semibold white'}>
									Аудио-сопровождение{' '}
									<span className={'gray-500'}>Tab + пробел</span>
								</h6>
								<Switcher
									isActive={isPronounceActive}
									onChange={toggleComments}
								/>
							</div>
							<AudioSpeed
								currentSpeed={speed}
								setSpeed={speed => setSpeed(speed)}
							/>
							<div className={'ToolbarControlsColumn'}>
								<div className={'ToolbarControlsButtons'}>
									<ColumnButton
										accessKey={'a'}
										onClick={() => volumeDown()}
										ariaLabel={'Уменьшить громкость'}
										tabIndex={8}
									>
										<IconMinus />
									</ColumnButton>
									<ColumnButton
										accessKey={'q'}
										onClick={() => volumeUp()}
										ariaLabel={'Увеличить громкость'}
										tabIndex={9}
									>
										<IconPlus />
									</ColumnButton>
								</div>
								<Soundbar currentVolume={volume} maxVolume={1} />
							</div>
						</div>
					</div>
				</div>
				<ReactPlayer
					className={'Video'}
					controls={false}
					url={videoUrl}
					width={'100%'}
					height={'100%'}
					playing={isPlaying}
					volume={volume}
					onProgress={onProgress}
					ref={playerRef}
					progressInterval={1000}
				/>
			</div>
		</HotkeyProvider>
	)
}

export default Player
