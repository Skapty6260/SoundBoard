import styles from './settings.module.scss'
import { motion } from 'framer-motion'

import { RootLayout } from '../layout'
import { useEffect, useState } from 'react'
import { SettingsOptionsList } from './dashboard/options'
import { TabListComponent } from '@/components/ui'
import { IFieldOptions, ISettingsField, useSettings } from '@/hooks/useSettings'
import { HashTable } from '@shared/types'

const Settings = () => {
	const [activeField, setActiveField] = useState<string | null>(null)
	const [Fields, setFields] = useState<HashTable<ISettingsField>>({})

	const { setField, getAllFields, initialSettings } = useSettings()

	useEffect(() => {
		getAllFields().then(async (res: any) => {
			let storeKeysArray: string[] = []

			await Object.keys(res).filter((key: string) => {
				if (key.includes('settings')) {
					storeKeysArray.push(key.split('_', 3)[1])
				} else console.log('not setting field', key)
			})

			await Object.keys(initialSettings).map(async (key: string) => {
				if (!storeKeysArray.includes(key)) {
					initialSettings[key].fieldOptions.map(
						async (field: IFieldOptions) => {
							await setField(
								// @ts-ignore
								`settings_${key}_${field.optionData}`,
								field.optionSettings.optionInitialValue
							)
						}
					)
				}
			})

			const initialKeys = Object.keys(initialSettings)
			initialKeys.map((key: string) => {
				initialSettings[key].fieldOptions.map((field: any, index) => {
					return (initialSettings[key].fieldOptions[index] = {
						optionName: `${field.optionName}`,
						optionData: `${field.optionData}`,
						optionSettings: {
							optionInitialValue: res[`settings_${key}_${field.optionData}`],
							optionValues: field.optionSettings.optionValues,
							optionValueType: field.optionSettings.optionValueType,
						},
					})
				})
			})

			setFields(initialSettings)
		})
	}, [])

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
							variant='primary-hashmap'
							ActiveField={activeField}
							ListItem={({ item, index }) => (
								<li
									className={`${activeField == item.name ? styles.active : ''}`}
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
