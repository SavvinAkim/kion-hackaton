// @ts-ignore
import { useSynthesize } from 'react-say'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import './styles/player.scss'
import './styles/player-toolbar.scss'
import HotkeyProvider from './hotkey-provider'
import {
	IconChevronLeft,
	IconChevronRight,
	IconMinus,
	IconPlus
} from '@tabler/icons-react'
import ProgressBar from './progress-bar/progress-bar'
import Button from './button/button'
import Soundbar from './soundbar/soundbar'
// @ts-ignore
import videoUrl from './video.mp4'
import { OnProgressProps } from 'react-player/base'
import { inRange } from '../../utils/in-range'
import { pronounce } from '../../lib/pronouncer'
import { fetchSubtitles, IData } from '../../lib/fetch-subtitles'

type TDataIndex = IData & {
	index: number
}

const Player: FC = () => {
	const [data, setData] = useState([] as TDataIndex[])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [subtitles, setSubtitles] = useState('')
	const [playing, setPlaying] = useState(false)
	const [volume, setVolume] = useState(1)
	const [progress, setProgress] = useState({
		percent: 0,
		playedSeconds: 0,
		secondsLeft: 0
	})

	useEffect(() => {}, [])

	const playerRef = useRef<ReactPlayer>(null)

	useEffect(() => {
		const getData = async () => {
			const fetchedData = await fetchSubtitles()

			setData(
				fetchedData.map((data, index) => ({
					...data,
					index
				}))
			)
		}

		getData()
	}, [])

	useEffect(() => {
		console.log(data)
	}, [data])

	const onProgress = (progress: OnProgressProps) => {
		setProgress({
			percent: progress.played,
			playedSeconds: progress.playedSeconds,
			secondsLeft: Math.round(progress.loadedSeconds - progress.playedSeconds)
		})

		const currentComment = data.filter(comment =>
			inRange(
				[Number(comment.timestamp), Number(comment.timestamp) + 1],
				progress.playedSeconds
			)
		)[0]

		if (!currentComment) return
		if (currentComment.index < currentIndex) return

		const commentText = currentComment.text

		setCurrentIndex(index => index + 1)
		setSubtitles(commentText)

		pronounceMemo(commentText)
	}

	const pronounceMemo = useCallback(
		(commentText: string) => {
			pronounce(
				commentText,
				() => setPlaying(false),
				() => setPlaying(true),
				volume
			)
		},
		[volume]
	)

	const volumeUp = useCallback(() => {
		setVolume(currentVolume => {
			const newVolume = currentVolume + 0.1

			if (newVolume > 1) return 1

			return newVolume
		})
	}, [])

	const setPart = (part: TDataIndex) => {
		setSubtitles(part.text)
		playerRef.current?.seekTo(Number(part.timestamp))
		setCurrentIndex(part.index + 1)
		pronounceMemo(part.text)
	}

	// Перемотка вперед
	const rewindNext = useCallback(() => {
		setCurrentIndex(index => index + 1)
		const currentPart = data.filter(part => part.index === currentIndex)[0]
		setPart(currentPart)
	}, [data, currentIndex])

	// Перемотка назад
	const rewindBack = useCallback(() => {
		const currentPart =
			data.filter(part => part.index === currentIndex - 2)[0] || data[0]
		setCurrentIndex(currentPart.index + 1)
		setPart(currentPart)
	}, [data, currentIndex])

	const volumeDown = useCallback(() => {
		setVolume(currentVolume => {
			const newVolume = currentVolume - 0.1

			if (newVolume < 0) return 0

			return newVolume
		})
	}, [])

	return (
		<HotkeyProvider
			togglePlaying={() => setPlaying(playing => !playing)}
			volumeUp={volumeUp}
			volumeDown={volumeDown}
			rewindNext={rewindNext}
			rewindBack={rewindBack}
		>
			<div className={'VideoWrapper'}>
				<div className={'VideoControls'}>
					<div className={'VideoControlsHeader'}>
						<h6 className={'PlayerVideoName Title3'}>Бриллиантовая рука</h6>
						<button className={'ControlsHeaderButton Title5Regular'}>
							<span className={'gray-400'}>Ctrl W</span>
							<IconPlus size={32} className={'white'} />
						</button>
					</div>

					<div className={'ControlsToolbar'}>
						<div className={'ToolbarControls ToolbarControlsSound'}>
							<div className={'ToolbarControlsText'}>
								<div className={'white Title4Medium'}>Звук</div>
								<div
									className={'ToolbarControlsHotkeys gray-500 Title5Semibold'}
								>
									↓ / ↑
								</div>
							</div>
							<div className={'ToolbarControlsButtons'}>
								<Button onClick={() => volumeDown()}>
									<IconMinus />
								</Button>
								<Button onClick={() => volumeUp()}>
									<IconPlus />
								</Button>
							</div>
							<Soundbar currentVolume={volume} maxVolume={1} />
							<div className={'ToolbarControlsSoundPlayer'}>
								{[...Array(10)].map((_, index) => (
									<div
										key={index}
										className={'ToolbarControlsSoundPlayerPoint active'}
									/>
								))}
							</div>
						</div>

						<div className={'ToolbarChapters Text500Italic white'}>
							<p>{subtitles}</p>
							<ProgressBar
								percentPlayed={progress.percent * 100}
								secondsLeft={progress.secondsLeft}
								handleChange={newProgress =>
									playerRef.current?.seekTo(newProgress)
								}
							/>
						</div>

						<div className={'ToolbarControls ToolbarControlsParts'}>
							<div className={'ToolbarControlsText'}>
								<div className={'white Title4Medium'}>Разделы</div>
								<div
									className={'ToolbarControlsHotkeys gray-500 Title5Semibold'}
								>
									← / →
								</div>
							</div>
							<div className={'ToolbarControlsButtons'}>
								<Button onClick={() => rewindBack()}>
									<IconChevronLeft />
								</Button>
								<Button onClick={() => rewindNext()}>
									<IconChevronRight />
								</Button>
							</div>
						</div>
					</div>
				</div>
				<ReactPlayer
					className={'Video'}
					controls={false}
					url={videoUrl}
					width={1400}
					height={800}
					playing={playing}
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
