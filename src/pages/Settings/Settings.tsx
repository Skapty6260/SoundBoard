import styles from './settings.module.scss'
import { motion } from 'framer-motion'

import { RootLayout } from '../layout'
import { useState } from 'react'

interface ISettingsField {
	fieldName: string
	fieldOptions: string[]
}

const Settings = () => {
	const [activeField, setActiveField] = useState<string | null>(null)

	const Fields: ISettingsField[] = [
		{
			fieldName: 'View',
			fieldOptions: ['Soundboard', 'Soundboard', 'Soundboard'],
		},
		{
			fieldName: 'Application',
			fieldOptions: ['Soundboard', 'Soundboard', 'Soundboard'],
		},
		{
			fieldName: 'Accounts',
			fieldOptions: ['Soundboard', 'Soundboard', 'Soundboard'],
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

					<div className={styles.settingsFilter}>
						<ul className={styles.filterList}>
							{Fields.map((field, index) => {
								return (
									<li
										className={
											activeField == field.fieldName ? styles.active : ''
										}
										key={index}
									>
										<button
											onClick={() => setActiveField(field.fieldName)}
											className='w-full h-full px-5 py-2'
										>
											{field.fieldName}
										</button>
									</li>
								)
							})}
						</ul>

						<ul className={styles.optionsList}>
							{activeField == null ? (
								<div className='w-full h-full text-5xl text-[#ffffff2e] font-bold flex justify-center text-center items-center'>
									Select Field to see options
								</div>
							) : (
								Fields.map(field => {
									if (field.fieldName === activeField) {
										return field.fieldOptions.map((subfield, index) => {
											return (
												<li key={index} className={styles.option}>
													{subfield}
												</li>
											)
										})
									}
								})
							)}
						</ul>
					</div>
				</motion.section>
				<div className={styles.gradient} />
			</main>
		</RootLayout>
	)
}

export default Settings
