import { IUserSettings } from '@/config/types'
import { MouseEvent, useCallback } from 'react'

const UserSettingsButton = ({
	item,
	styles,
}: {
	item: IUserSettings
	styles: { buttonContainer: any; icon: any; title: any }
}) => {
	const handleButton = useCallback(
		(e: MouseEvent<HTMLButtonElement>) =>
			item.handler ? item.handler(e) : null,
		[]
	)

	return (
		<button
			onClick={function (e: MouseEvent<HTMLButtonElement>) {
				handleButton(e)
			}}
			className={styles.buttonContainer}
		>
			<span className={styles.icon}>{item.icon}</span>
			<span className={styles.title}>{item.title}</span>
		</button>
	)
}

export default UserSettingsButton
