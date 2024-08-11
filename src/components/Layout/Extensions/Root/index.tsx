import styles from './extensions.module.scss'
import { ExtensionsSidebar } from '../Sidebar'
import { motion } from 'framer-motion'
import { TabListComponent } from '@/components/ui'

export const RootExtensionsLayout: React.FC<{
	Children: React.JSXElementConstructor<{ styles: any }>
	activeField: string
	setActiveField: React.Dispatch<React.SetStateAction<string>>
	NavbarFields: { name: string }[]
	BackgroundComponent?: React.JSXElementConstructor<{}>
}> = ({
	Children,
	BackgroundComponent,
	activeField,
	setActiveField,
	NavbarFields,
}) => (
	<main className='h-screen w-full Poppins'>
		{BackgroundComponent && <BackgroundComponent />}

		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, delay: 0.6 }}
			className={styles.topSection}
		>
			<ExtensionsSidebar styles={styles} />

			{/* Navbar */}
			<div className='flex flex-col w-full h-full justify-center items-center'>
				<TabListComponent
					Fields={NavbarFields}
					variant='secondary'
					ActiveField={activeField}
					ListItem={({ item }) => (
						<button
							className='w-full h-full px-5 py-4 text-xl duration-200 transition-all'
							onClick={() => setActiveField(item.name)}
						>
							{item.name}
						</button>
					)}
				/>

				<Children styles={styles} />
			</div>
		</motion.section>
	</main>
)
