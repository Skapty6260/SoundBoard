import { useEffect, useState } from 'react'
import styles from '../soundboard.module.scss'

export const SoundBoardBoard = () => {
	const [sounds, setSounds] = useState<string[]>([])

	useEffect(() => {
		window.api.songStorage.getAllSongs().then((value: any) => {
			setSounds(value)
		})
	}, [])

	return (
		<ul className={styles.BoardGrid}>
			{sounds.map((item, key) => {
				return <li key={key}>{item}</li>
			})}
		</ul>
	)
}
