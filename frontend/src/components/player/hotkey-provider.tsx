import { FC, PropsWithChildren, useCallback, useEffect } from 'react'

type TProps = {
	togglePlaying: () => void
	volumeUp: () => void
	volumeDown: () => void
	rewindNext: () => void
	rewindBack: () => void
}

const HotkeyProvider: FC<PropsWithChildren<TProps>> = ({
	children,
	togglePlaying,
	volumeUp,
	volumeDown,
	rewindNext,
	rewindBack
}) => {
	const playingListener = useCallback(
		(event: KeyboardEvent) => {
			if (event.key !== ' ') return
			event.preventDefault()
			togglePlaying()
		},
		[togglePlaying]
	)

	const volumeUpListener = useCallback(
		(event: KeyboardEvent) => {
			if (event.key !== 'ArrowUp') return
			event.preventDefault()
			volumeUp()
		},
		[volumeUp]
	)

	const volumeDownListener = useCallback(
		(event: KeyboardEvent) => {
			if (event.key !== 'ArrowDown') return
			event.preventDefault()
			volumeDown()
		},
		[volumeDown]
	)

	const rewindNextListener = useCallback(
		(event: KeyboardEvent) => {
			if (event.key !== 'ArrowRight') return
			event.preventDefault()
			rewindNext()
		},
		[rewindNext]
	)

	const rewindBackListener = useCallback(
		(event: KeyboardEvent) => {
			if (event.key !== 'ArrowLeft') return
			event.preventDefault()
			rewindBack()
		},
		[rewindBack]
	)

	useEffect(() => {
		// document.addEventListener('keydown', playingListener, false)
		// document.addEventListener('keydown', volumeUpListener, false)
		// document.addEventListener('keydown', volumeDownListener, false)
		// document.addEventListener('keydown', rewindNextListener, false)
		// document.addEventListener('keydown', rewindBackListener, false)

		return () => {
			document.removeEventListener('keydown', playingListener, false)
			document.removeEventListener('keydown', volumeUpListener, false)
			document.removeEventListener('keydown', volumeDownListener, false)
			document.removeEventListener('keydown', rewindNextListener, false)
			document.removeEventListener('keydown', rewindBackListener, false)
		}
	}, [
		playingListener,
		volumeUpListener,
		volumeDownListener,
		rewindNextListener,
		rewindBackListener
	])

	return <>{children}</>
}

export default HotkeyProvider
