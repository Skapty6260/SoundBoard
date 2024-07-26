import { ISound } from '@shared/types/SoundTypes'
import { TSoundboardView } from '@shared/types/app'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import { FaPlay } from 'react-icons/fa' // , FaPause
// import { Howl } from 'howler'

interface IProps {
	loading: boolean
	setLoading: Dispatch<SetStateAction<boolean>>
	variant: TSoundboardView
}

export const SoundBoardBoard = (props: IProps) => {
	const [sounds, setSounds] = useState<ISound[]>([])
	const [error, setError] = useState(false)

	const handlePlay = (soundName: string) => {
		console.log(soundName)
	}

	useMemo(() => {
		if (props.loading !== true) return

		window.api.songStorage.getAllSongs().then((value: string[]) => {
			console.log('Sound files detected: ', value)

			window.api.store
				.setValue(
					'sounds',
					value.map((item: string) => {
						return { name: item.replace('.mp3', ''), length: 0 }
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
			window.api.store.getValue('sounds').then((value: any) => {
				setSounds(value)
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
			<li className='static-board'>
				<p>Number</p>
				<p>Title</p>
				<p>Length</p>
			</li>

			{sounds?.map((item: ISound, key: number) => {
				return (
					<li key={key}>
						<button onClick={() => handlePlay(item.name)}>
							<p className='soundboard_sound_number'>{key + 1}</p>
							<p className='soundboard_sound_title'>{item.name}</p>

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
