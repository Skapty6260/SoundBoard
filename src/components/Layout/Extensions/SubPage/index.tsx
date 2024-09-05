import { TabListComponent } from '@/components/ui'
import { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Extension_ForDevelopersPage } from '@/pages/Extensions/for-developers'

interface IProps {
	variant?: 'section-content' | 'section-header'
	styles: any
	headerData: {
		title: string
		tabs: { name: string }[]
	}
	Children: React.JSXElementConstructor<{ activeTab: string; styles: any }>
}

export const ExtensionsSubPage: React.FC<IProps> = ({
	variant = 'section-header',
	styles,
	headerData,
	Children,
}) => {
	const [activeTab, setActiveTab] = useState<string>(headerData.tabs[0].name)

	if (variant == 'section-header')
		return (
			<section className={styles.container}>
				<header className='font-bold text-3xl'>
					<h1>{headerData.title}</h1>
					<div className={styles.search}>
						<i>
							<BiSearchAlt />
						</i>
						<input
							type='text'
							placeholder={`search for ${headerData.title.toLowerCase()}...`}
						/>
					</div>
				</header>

				{/* tabs */}
				<TabListComponent
					Fields={headerData.tabs}
					variant='tertiary'
					ActiveField={activeTab}
					ListItem={({ item }) => (
						<button
							className='w-full h-full flex justify-center items-center hover:bg-[var(--semiTransparent2)] py-2 px-3 bg-[#00000092] duration-300'
							onClick={() => setActiveTab(item.name)}
						>
							{item.name}
						</button>
					)}
				/>

				{/* content */}
				<Children activeTab={activeTab} styles={styles} />
			</section>
		)
	else if (variant == 'section-content') return <Extension_ForDevelopersPage />
}
