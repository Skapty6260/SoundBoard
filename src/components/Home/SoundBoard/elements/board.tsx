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

interface IProps {
	loading: boolean
	setLoading: Dispatch<SetStateAction<boolean>>
	searchQuery: string
	variant: TSoundboardView
}

export const SoundBoardBoard = (props: IProps) => {
	const [sounds, setSounds] = useState<ISound[]>([])
	const [currentSound, setCurrentSound] = useState<string>('')
	const [error, setError] = useState(false)

	const audioRef = useRef<any>(null)

	const handlePlay = (sound: ISound) => {
		navigator.mediaDevices.enumerateDevices().then(devices => {
			console.log(devices)

			// let context = new window.AudioContext()
			// let audioElement = new Audio()

			// async function playAudio() {
			// 	// const audioDevices = await devices.filter(device => {
			// 	// 	return device.kind === 'audioinput' && device.label === 'GM300 Pro' //output to hear in headphones
			// 	// })
			// 	const audioDevice = devices[0]
			// 	// console.log(audioDevice)
			// 	await audioElement.setSinkId(audioDevice.deviceId)

			// 	let oscillator = context.createOscillator()
			// 	let mediaStreamDestination = context.createMediaStreamDestination()

			// 	oscillator.connect(mediaStreamDestination)
			// 	audioElement.srcObject = mediaStreamDestination.stream

			// 	oscillator.start()
			// 	audioElement.play()
			// 	await new Promise(r => setTimeout(r, 2000))
			// 	oscillator.stop()
			// }

			function fetchAndPlay() {
				window.api.player
					.play_toOutput(sound.name)
					.then(async (path: any) => {
						setCurrentSound(`file://${path}.${sound.ext}`)
						// const data = await fetch(`file://${path}`)
						// const buffer = await data.arrayBuffer()
						// console.log(buffer)

						// context.decodeAudioData(buffer, decoded => playAudio())
					})
					.catch(e => console.error(e))
			}
			fetchAndPlay()
		})
	}

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.load()
			audioRef.current.play()
		}
	}, [currentSound])

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
