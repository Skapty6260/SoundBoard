import { ISound } from '@shared/types/SoundTypes'
import { TSoundboardView } from '@shared/types/app'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import { FaPlay } from 'react-icons/fa' // , FaPause

interface IProps {
	loading: boolean
	setLoading: Dispatch<SetStateAction<boolean>>
	variant: TSoundboardView
}

export const SoundBoardBoard = (props: IProps) => {
	const [currentSound, setCurrentSound] = useState<{
		playing: boolean
		audio: HTMLAudioElement | null
	}>({ playing: false, audio: null }) // Path
	const [sounds, setSounds] = useState<ISound[]>([])
	const [error, setError] = useState(false)

	const handlePlay = (sound: ISound) => {
		window.api.player.play_toOutput(sound.name).then((res: any) => {
			console.log(res)
			setCurrentSound({
				audio: new Audio(res),
				playing: true,
			})
		})
	}

	useEffect(() => {
		if (currentSound.playing == false) {
			currentSound.audio?.play()
		} else {
			currentSound.audio?.pause()
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
						return {
							name: item.name.replace('.mp3', ''),
							length: 0,
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
		<ul className={`px-8 py-6 soundboard-${props.variant}`}>
			{/* <audio ref={audioRef} src={currentSound.path} controls={false} /> */}
			<li className='static-board'>
				<p>Number</p>
				<p>Title</p>
				<p className='static-board_shortcut'>Shortcut</p>
				<p>Length</p>
			</li>

			{sounds?.map((item: ISound, key: number) => {
				return (
					<li key={key}>
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
	)
}
