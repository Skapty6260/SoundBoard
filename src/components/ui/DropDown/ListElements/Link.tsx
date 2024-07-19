import { IUserSettings } from '@/config/types'
import { Link } from 'react-router-dom'

const UserSettingsLink = ({ item }: { item: IUserSettings }) => {
	return (
		<Link
			to={item?.path ? item?.path : '/'}
			className='group flex space-x-4 text-center items-center justify-center text-xl w-full p-3 before:absolute before:w-[145px] before:h-[2px] py-5 before:bg-[var(--textColor)] before:opacity-15 before:top-0'
		>
			<span className='text-3xl group-hover:scale-75 duration-300 group-hover:rotate-180'>
				{item.icon}
			</span>
			<span className='font-semibold group-hover:text-[var(--activeColor)]'>
				{item.title}
			</span>
		</Link>
	)
}

export default UserSettingsLink
