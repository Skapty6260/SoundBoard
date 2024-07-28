import styles from './settings.module.scss'
import { motion } from 'framer-motion'

import { RootLayout } from '../layout'
import { useState } from 'react'
import { SettingsOptionsList } from './dashboard/options'
import { TabListComponent } from '@/components/ui'

export interface ISettingsField {
	name: string
	fieldOptions: IFieldOptions[]
}

export interface IFieldOptions {
	optionName: string

	optionSettings: IFieldOptionSettings
}

export interface IFieldOptionSettings {
	optionValueType: 'select' | 'switch' | 'input' | 'choice'
	optionInitialValue: any
	optionValues: Array<any>
}

const Settings = () => {
	const [activeField, setActiveField] = useState<string | null>(null)

	const Fields: ISettingsField[] = [
		{
			name: 'View',
			fieldOptions: [
				{
					optionName: 'Columns',
					optionSettings: {
						optionValues: ['true', 'false'],
						optionInitialValue: 'Cols',
						optionValueType: 'switch',
					},
				},
			],
		},
		{
			name: 'Application',
			fieldOptions: [
				{
					optionName: 'Columns',
					optionSettings: {
						optionValues: ['true', 'false'],
						optionInitialValue: false,
						optionValueType: 'switch',
					},
				},
			],
		},
		{
			name: 'Accounts',
			fieldOptions: [
				{
					optionName: 'Columns',
					optionSettings: {
						optionValues: ['true', 'false'],
						optionInitialValue: 'false',
						optionValueType: 'switch',
					},
				},
			],
		},

		// SoundBoard
		{
			name: 'Board',
			fieldOptions: [
				{
					optionName: 'Board Overflow',
					optionSettings: {
						optionValues: ['Scroll', 'Pagination'],
						optionInitialValue: 'Scroll',
						optionValueType: 'choice',
					},
				},

				{
					optionName: 'Board Enabled Views',
					optionSettings: {
						optionInitialValue: ['Cols', 'Rows', 'Cells', 'List'],
						optionValues: ['Cols', 'Rows', 'Cells', 'List'],
						optionValueType: 'select',
					},
				},
			],
		},
	]

	return (
		<RootLayout customNavBar={{ settingsActive: true }}>
			<main className={`${styles.app} Poppins`}>
				{/* Dashboard */}
				<motion.section
					initial={{ paddingTop: 0, opacity: 0 }}
					animate={{ opacity: 1, paddingTop: '150px' }}
					transition={{ duration: 0.3, delay: 0.6 }}
					className={styles.dashboard}
				>
					<h1>SETTINGS</h1>

					<div className={styles.settings}>
						<TabListComponent
							Fields={Fields}
							ActiveField={activeField}
							ListItem={({ item, index }) => (
								<li
									className={activeField == item.name ? styles.active : ''}
									key={index}
								>
									<button
										onClick={() => setActiveField(item.name)}
										className='w-full h-full px-5 py-2'
									>
										{item.name}
									</button>
								</li>
							)}
						/>

						<SettingsOptionsList Fields={Fields} activeField={activeField} />
					</div>
				</motion.section>
				<div className={styles.gradient} />
			</main>
		</RootLayout>
	)
}

export default Settings
