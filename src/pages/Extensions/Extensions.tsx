import { motion } from 'framer-motion'
import { useState } from 'react'
import { Extension_ThemesPage } from './themes'

import gifThemes from '@/assets/backgrounds/themes.gif'
import gifAddons from '@/assets/backgrounds/addons.gif'
import gifForDevelopers from '@/assets/backgrounds/for-developers.gif'

import { Extension_AddonsPage } from './addons'
import { Extension_ForDevelopersPage } from './for-developers'
import { RootExtensionsLayout } from '@/components/Layout/Extensions/Root'

const BGComponent: React.FC<{ activeField: string }> = ({ activeField }) => (
	<motion.img
		animate={
			activeField == 'Themes'
				? { background: '#200170d7' }
				: activeField == 'For Developers'
				? { background: '#16082b' }
				: { background: '#000' }
		}
		initial={{ background: '#000' }}
		transition={{ duration: 0.2 }}
		className='w-full h-screen object-cover'
		src={
			activeField == 'Themes'
				? gifThemes
				: activeField == 'Addons'
				? gifAddons
				: activeField == 'For Developers'
				? gifForDevelopers
				: ''
		}
	/>
)

const Content: React.FC<{ activeField: string; styles: any }> = ({
	activeField,
	styles,
}) => {
	if (activeField == 'Addons') return <Extension_AddonsPage styles={styles} />
	else if (activeField == 'Themes')
		return <Extension_ThemesPage styles={styles} />
	else if (activeField == 'For Developers')
		return <Extension_ForDevelopersPage />
}

const Extensions = () => {
	const [activeField, setActiveField] = useState<string>('Addons')

	return (
		<RootExtensionsLayout
			BackgroundComponent={({}) => <BGComponent activeField={activeField} />}
			activeField={activeField}
			NavbarFields={[
				{ name: 'Addons' },
				{ name: 'Themes' },
				{ name: 'For Developers' },
			]}
			setActiveField={setActiveField}
			Children={({ styles }) => (
				<Content styles={styles} activeField={activeField} />
			)}
		/>
	)
}

export default Extensions
