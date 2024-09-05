import { motion } from 'framer-motion'
import { useState } from 'react'

import gifThemes from '@/assets/backgrounds/themes.gif'
import gifAddons from '@/assets/backgrounds/addons.gif'
import gifForDevelopers from '@/assets/backgrounds/for-developers.gif'

import {
	ExtensionsSubPage,
	RootExtensionsPageLayout,
} from '@/components/Layout/Extensions'
import { ExtensionsSubPage_Content } from '@/components/Layout/Extensions/SubPage/content'

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

const Extensions = () => {
	const [activeField, setActiveField] = useState<string>('Addons')

	return (
		<RootExtensionsPageLayout
			BackgroundComponent={({}) => <BGComponent activeField={activeField} />}
			activeField={activeField}
			NavbarFields={[
				{ name: 'Addons' },
				{ name: 'Themes' },
				{ name: 'For Developers' },
			]}
			setActiveField={setActiveField}
			Children={({ styles }) => (
				<ExtensionsSubPage
					variant={
						activeField !== 'For Developers'
							? 'section-header'
							: 'section-content'
					}
					headerData={{
						title: activeField,
						tabs: [
							{ name: 'Browse' },
							{ name: 'Installed' },
							{ name: `Your ${activeField}` },
						],
					}}
					styles={styles}
					Children={({ activeTab }) => {
						return (
							<ExtensionsSubPage_Content
								field={activeField as 'Addons' | 'Themes'}
								activeTab={activeTab}
								styles={styles}
							/>
						)
					}}
				/>
			)}
		/>
	)
}

export default Extensions
