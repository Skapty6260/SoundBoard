import { IUserSettings } from '@/config/types'
import { MouseEvent, useCallback } from 'react'

const UserSettingsButton = ({ item }: { item: IUserSettings }) => {
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
			className='group flex space-x-4 text-left items-start justify-start text-xl w-full p-3 before:absolute before:w-[85%] before:h-[2px] py-5 before:bg-[var(--textColor)] before:rounded-xl before:opacity-15 before:top-0 before:left-1/2 before:-translate-x-1/2'
		>
			<span className='absolute left-4 text-3xl group-hover:scale-[85%] duration-300 group-hover:-rotate-[20deg] group-active:rotate-0'>
				{item.icon}
			</span>
			<span className='font-semibold pl-7 group-hover:text-[var(--activeColor)]'>
				{item.title}
			</span>
		</button>
	)
}

export default UserSettingsButton
