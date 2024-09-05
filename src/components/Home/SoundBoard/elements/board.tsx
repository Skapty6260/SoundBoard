import { ISound } from '@shared/types/SoundTypes'
import { TSoundboardView } from '@shared/types/app'
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

import { FaPlay } from 'react-icons/fa' // , FaPause
import { SoundBoardPlayer } from './player'
import { usePlayer } from '@/hooks/player/usePlayer'

interface IProps {
	loading: boolean
	setLoading: Dispatch<SetStateAction<boolean>>
	searchQuery: string
	variant: TSoundboardView
}

export const SoundBoardBoard = (props: IProps) => {
	const [sounds, setSounds] = useState<ISound[]>([])
	// const [currentSound, setCurrentSound] = useState<string>('')
	// const [soundDuration, setSoundDuration] = useState<number>(0)
	const [error, setError] = useState(false)

	const audioRef = useRef<HTMLAudioElement>(null)
	const { play, currentSound, setCurrentSound } = usePlayer()

	const handlePlay = (sound: ISound) => {
		navigator.mediaDevices.enumerateDevices().then(devices => {
			console.log(devices)

			function fetchAndPlay() {
				window.api.player
					.play_toOutput(sound.name)
					.then(async (path: any) => {
						setCurrentSound(`file://${path}.${sound.ext}`)
					})
					.catch(e => console.error(e))
			}

			fetchAndPlay()
		})
	}

	useEffect(() => {
		console.log(currentSound)

		if (audioRef.current == null) return

		audioRef.current
			?.setSinkId('default')
			.then(() => {
				audioRef.current?.pause()
				audioRef.current?.load()
				audioRef.current?.play()
			})
			.catch((e: any) => console.error(e, 'At set sink ID'))
	}, [currentSound])

	// useEffect(() => {
	// 	if (audioRef.current) {
	// 		const audioContext = new AudioContext()
	// 		fetch(currentSound)
	// 			.then((response: any) => response.arrayBuffer())
	// 			.then((arrayBuffer: any) => audioContext.decodeAudioData(arrayBuffer))
	// 			.then((audioBuffer: any) => {
	// 				setSoundDuration(audioBuffer?.duration)
	// 				const audioBufferSourceNode = audioContext.createBufferSource()
	// 				const mediaStreamAudioDestinationNode =
	// 					audioContext.createMediaStreamDestination()

	// 				audioBufferSourceNode.buffer = audioBuffer
	// 				// Maybe it makes sense to loop the buffer.
	// 				audioBufferSourceNode.loop = true

	// 				audioBufferSourceNode.start()

	// 				audioBufferSourceNode.connect(mediaStreamAudioDestinationNode)

	// 				mediaStreamAudioDestinationNode.stream
	// 					.getAudioTracks()
	// 					.forEach(track => console.log(track))

	// 				console.log(mediaStreamAudioDestinationNode.context)
	// 			})

	// 		// audioRef.current?.pause()
	// 		// audioRef.current?.load()
	// 		// audioRef.current?.play()
	// 	}
	// }, [currentSound])

	useMemo(() => {
		if (props.loading !== true) return

		window.api.songStorage.getAllSongs().then((value: string[]) => {
			console.log('Sound files detected: ', value)

			window.api.store
				.setValue(
					'sounds',
					value.map((item: any) => {
						if (item.name.endsWith('.ogg'))
							return {
								name: item.name.replace('.ogg', ''),
								length: 0,
								ext: 'ogg',
								shortcut: item.shortcut,
								author: item.author,
							}
						// (item.name.endsWith('.mp3'))
						else
							return {
								name: item.name.replace('.mp3', ''),
								length: 0,
								ext: 'mp3',
								shortcut: item.shortcut,
								author: item.author,
							}
					})
				)
				.then((val: [string, ISound[]]) => {
					setSounds(val[1])
				})
				.catch(error => {
					console.error(error)
					setError(true)
				})

			setTimeout(() => {
				props.setLoading(false)
			}, 1000)
		})
	}, [props.loading])

	useEffect(() => {
		if (error == true) return
		if (sounds?.length == 0) {
			window.api.store
				.getValue('sounds')
				.then((value: any) => {
					setSounds(value)
				})
				.catch(_ => {
					setError(true)
				})
		}
	}, [sounds])

	if (error == true) {
		return (
			<div className='w-full h-full text-6xl font-semibold flex items-center justify-center animate-pulse text-[var(--semiTransparent2)]'>
				<h1>
					An Error occurred while loading.
					<br /> Try again.
				</h1>
			</div>
		)
	}
	if (props.loading == true)
		return (
			<div className='w-full h-full text-6xl font-semibold flex items-center justify-center animate-pulse text-[var(--semiTransparent2)]'>
				<h1>Loading...</h1>
			</div>
		)

	return (
		<div className={`relative w-full`}>
			<li className='static-board'>
				<p className='ml-4'># | Title</p>
				<p className='static-board_shortcut'>Shortcut</p>
				<p>Length</p>
			</li>
			<ul className={`h-[100%] mb-4 soundboard-${props.variant}`}>
				{sounds?.map((item: ISound, key: number) => {
					if (props.searchQuery?.length > 0) {
						if (item.name.includes(props.searchQuery)) {
							return (
								<li className='px-6' key={key}>
									<button onClick={() => handlePlay(item)}>
										<p className='soundboard_sound_number'>{key + 1}</p>
										<p className='soundboard_sound_title'>{item.name}</p>

										<p className='soundboard_sound_shortcut'>
											{item.shortcut ? item.shortcut : '+'}
										</p>
										<p className='soundboard_sound_length'>{item.length}</p>

										<i>
											<FaPlay />
										</i>
									</button>
								</li>
							)
						}
					} else
						return (
							<li className='px-6' key={key}>
								<button onClick={() => handlePlay(item)}>
									<p className='soundboard_sound_number'>{key + 1}</p>
									<p className='soundboard_sound_title'>{item.name}</p>

									<p className='soundboard_sound_shortcut'>
										{item.shortcut ? item.shortcut : '+'}
									</p>
									<p className='soundboard_sound_length'>{item.length}</p>

									<i>
										<FaPlay />
									</i>
								</button>
							</li>
						)
				})}
			</ul>
			<div className='sticky bottom-0 w-full soundboard-player'>
				<audio ref={audioRef}>
					<source src={currentSound} type='audio/mpeg' />
				</audio>
				<SoundBoardPlayer audioRef={audioRef} />
			</div>
		</div>
	)
}
