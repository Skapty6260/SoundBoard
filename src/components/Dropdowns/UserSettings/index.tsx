import { motion } from 'framer-motion'

import { CiLogout, CiFolderOn } from 'react-icons/ci'
import { PiUserSwitch } from 'react-icons/pi'

import { memo, useState } from 'react'
import { AccountsModal } from '@/components/Modals/AccountModal'
import { DropDown, DropdownData } from '@/components/ui/DropDown'

const Settings: React.FC = memo(() => {
	const [modal, setModal] = useState<{
		modal: React.ReactNode
		opened: boolean
	}>({
		modal: '',
		opened: false,
	})

	const SettingsData: DropdownData[] = [
		// // Select Theme
		// {
		// 	title: currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1),
		// 	icon: currentTheme === 'light' ? <CiLight /> : <CiDark />,
		// 	type: 'button',
		// 	handler: () => setTheme(theme === 'light' ? 'dark' : 'light'),
		// },

		// Switch Account
		{
			title: 'Accounts',
			icon: <PiUserSwitch />,
			type: 'button',
			handler: () => {
				setModal({
					modal: (
						<AccountsModal
							close={() => setModal({ modal: '', opened: false })}
						/>
					),
					opened: true,
				})
			},
		},

		// Data folder
		{
			title: 'Songs Dir',
			icon: <CiFolderOn />,
			type: 'button',
			handler: () => {
				window.api.songStorage.openSongFolder()
			},
		},

		// Log Out
		{
			title: 'Log Out',
			icon: <CiLogout />,
			type: 'button',
		},
	]

	const styles = {
		ul: 'flex z-[100] flex-col space-y-1 relative overflow-hidden text-[var(--textColor)]',
		li: 'w-full overflow-hidden relative',

		motionLi: {
			animate: { scale: 1 },
			initial: { scale: 0 },
			transition: { duration: 0.4 },
			exit: { scale: 0 },
		},
	}

	return (
		<>
			<DropDown
				data={SettingsData}
				style={{ ulContainer: styles.ul, liElement: styles.li }}
				staticElements={
					<li className='flex w-full justify-center text-center'>
						<p className='text-[var(--neutralColor2)] font-bold text-2xl pt-3 pb-5'>
							SoundBoard
						</p>
					</li>
				}
				motionStyles={{
					ul: null,
					li: styles.motionLi,
				}}
			/>

			{modal.opened == true ? modal.modal : null}
		</>
	)
})

const UserSettings = () => {
	return (
		<motion.div
			animate={{ top: 95 }}
			transition={{ duration: 0.3 }}
			exit={{ top: -400 }}
			className='absolute z-[40] -top-[500px] rounded-2xl pt-6 shadow-lg shadow-black right-5 bg-[var(--neutralColor)] w-[200px] h-[auto] min-h-[300px] max-h-[550px]'
		>
			<Settings />
		</motion.div>
	)
}

export const UserDropdown = memo(UserSettings)
