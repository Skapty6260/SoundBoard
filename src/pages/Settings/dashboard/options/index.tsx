import { ISettingsField, IFieldOptionSettings } from '../../Settings'
import styles from '../../settings.module.scss'

export const SettingsOptionsList: React.FC<{
	activeField: string | null
	Fields: ISettingsField[]
}> = ({ activeField, Fields }) => {
	if (activeField == null)
		return (
			<ul className={`${styles.optionsList} ${styles.settingsBlock}`}>
				<div className='w-full h-full text-5xl text-[#ffffff2e] font-bold flex justify-center text-center items-center'>
					Select Field to see options
				</div>
			</ul>
		)

	return (
		<ul className={`${styles.optionsList} ${styles.settingsBlock}`}>
			{Fields.map((field: ISettingsField) => {
				if (field.name === activeField)
					return field.fieldOptions.map((subfield, i) => {
						return (
							<li key={i} className={styles.subfield}>
								<p className='text-[var(--invTextColor)] font-bold text-2xl'>
									{subfield.optionName}
								</p>
								<div className={styles.subfieldOptionsSelector}>
									<SubfieldAppearance subfield={subfield.optionSettings} />
								</div>
							</li>
						)
					})
			})}
		</ul>
	)
}

import { CiBoxList } from 'react-icons/ci'

const SubfieldAppearance: React.FC<{ subfield: IFieldOptionSettings }> = ({
	subfield,
}) => {
	const initial = subfield.optionInitialValue
	const values = subfield.optionValues

	switch (subfield.optionValueType) {
		case 'choice':
			return (
				<ul className='flex space-x-4 items-center overflow-x-hidden overflow-y-scroll text-[var(--invTextColor)]'>
					{values.map((value, index) => {
						return (
							<li key={index}>
								<button
									className={
										value == initial
											? 'bg-[var(--activeColor)] py-1 px-3 rounded-[15px] cursor-default transition-all duration-300'
											: 'cursor-pointer opacity-50 transition-all duration-300'
									}
								>
									{value}
								</button>
							</li>
						)
					})}
				</ul>
			)

		case 'select':
			return (
				<button className='bg-[var(--neutralColor)] flex flex-wrap items-center space-x-1 py-1 px-3 rounded-[15px] text-[var(--textColor)]'>
					<i className='border-r-2 border-r-[var(--textColor)] pr-2 opacity-60'>
						<CiBoxList />
					</i>
					{initial.map((value: string, index: number) => (
						<div key={index} className='flex-[1 0 50%]'>
							{value + ','}
						</div>
					))}
				</button>
			)

		case 'switch':
			return (
				<div className='flex space-x-4 items-center'>
					<input className={styles.switchCheckbox} type='checkbox' />
				</div>
			)

		case 'selectOne':
			return (
				<button className='bg-[var(--neutralColor)] flex flex-wrap items-center space-x-1 py-1 px-3 rounded-[15px] text-[var(--textColor)] hover:opacity-85 duration-300'>
					<i className='pr-2 opacity-60'>
						<CiBoxList />
					</i>

					<p className='flex-[1 0 50%]'>{initial}</p>
				</button>
			)
	}
}
