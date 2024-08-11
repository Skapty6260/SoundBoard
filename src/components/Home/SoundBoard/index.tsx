import { motion } from 'framer-motion'
import styles from './soundboard.module.scss'
import { SoundBoardBoard } from './elements/board'
import { useEffect, useState } from 'react'
import { useViewContext } from '@/providers/ViewProvider'
import { SoundBoardControls } from './elements/controls'
import { IoAddCircleOutline } from 'react-icons/io5'
import { MdAddCircle } from 'react-icons/md'
import { IoVolumeMediumOutline, IoVolumeMediumSharp } from 'react-icons/io5'
import { SearchInput } from '@/components/ui/Inputs/Search'

const SoundBoard = () => {
	const [refresh, setRefresh] = useState(false)
	const { soundboardView, toggleSoundboardView, sidebar } = useViewContext()
	const [iconHovered, setIconHovered] = useState<{
		status: boolean
		icon: string
	}>({ status: false, icon: '' })
	const [searchQuery, setSearchQuery] = useState<string>('')

	useEffect(() => {
		window.api.store.getValue('view_soundboard').then((value: any) => {
			toggleSoundboardView(value)
		})
	}, [])

	return (
		<div className='w-full relative h-screen z-[1] flex justify-center items-center'>
			<motion.section
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				transition={{ duration: 1, delay: 0.8 }}
				className={styles.container}
			>
				{!sidebar.status && (
					<SoundBoardControls
						refresh={refresh}
						setRefresh={setRefresh}
						{...{ soundboardView, toggleSoundboardView }}
					/>
				)}
				<div className={styles.board}>
					<motion.header
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
					>
						<h1 className='font-semibold text-[var(--textColor)] text-4xl py-4'>
							SoundBoard
						</h1>

						<div className='flex items-center space-x-2'>
							<SearchInput
								setSearchQuery={setSearchQuery}
								searchQuery={searchQuery}
							/>

							{/* Volume and devices controls */}
							<button
								onMouseOver={() =>
									setIconHovered({ status: true, icon: 'volume' })
								}
								onMouseOut={() =>
									setIconHovered({ status: false, icon: 'volume' })
								}
							>
								<i>
									{iconHovered.status == true &&
									iconHovered.icon == 'volume' ? (
										<IoVolumeMediumSharp />
									) : (
										<IoVolumeMediumOutline />
									)}
								</i>
							</button>

							{/* Add sound or category */}
							<button
								onMouseOver={() =>
									setIconHovered({ status: true, icon: 'add' })
								}
								onMouseOut={() =>
									setIconHovered({ status: false, icon: 'add' })
								}
							>
								<i>
									{iconHovered.status == true && iconHovered.icon == 'add' ? (
										<MdAddCircle />
									) : (
										<IoAddCircleOutline />
									)}
								</i>
							</button>
						</div>
					</motion.header>

					<SoundBoardBoard
						loading={refresh}
						setLoading={setRefresh}
						searchQuery={searchQuery}
						variant={soundboardView}
					/>
				</div>
			</motion.section>
		</div>
	)
}

export default SoundBoard
