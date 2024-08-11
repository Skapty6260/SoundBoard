import styles from './style.module.scss'

import { SiReadthedocs, SiDevrant, SiDevdotto } from 'react-icons/si'
import { BsLayoutSidebarInset } from 'react-icons/bs'
import { GrDeploy } from 'react-icons/gr'
import { MdConnectWithoutContact } from 'react-icons/md'
import { TbLicense } from 'react-icons/tb'
import { GoCodeReview } from 'react-icons/go'
import { useState } from 'react'
import { Extension_ForDevelopersSidebarGuide } from './sidebar-guide'

export const Extension_ForDevelopersPage = () => {
	const [guide, setGuide] = useState<boolean>(false)

	const handleSidebarGuide = () => {
		setGuide(true)
	}

	return (
		<>
			<section className={styles.container}>
				<h1>Developers Info</h1>

				<ul className={styles.infoContainer}>
					<li>
						<i>
							<SiReadthedocs />
						</i>
						<p>Docs</p>
					</li>

					<li>
						<button onClick={handleSidebarGuide}>
							<i>
								<BsLayoutSidebarInset />
							</i>
							<p>Sidebar Guide</p>
						</button>
					</li>

					<li>
						<i>
							<GrDeploy />
						</i>
						<p>Deploy Extension</p>
					</li>

					<li>
						<i>
							<SiDevdotto />
						</i>
						<p>Dev Profile guide</p>
					</li>

					{/* 2 Row */}
					<li>
						<i>
							<SiDevrant />
						</i>
						<p>Availability Error</p>
					</li>

					<li>
						<i>
							<MdConnectWithoutContact />
						</i>
						<p>Contact App Dev</p>
					</li>

					<li>
						<i>
							<TbLicense />
						</i>
						<p>License</p>
					</li>

					<li>
						<i>
							<GoCodeReview />
						</i>
						<p>Deploy Review</p>
					</li>

					{/* 3 Row */}
					<li>
						<i>
							<GoCodeReview />
						</i>
						<p>Create Theme</p>
					</li>

					<li>
						<i>
							<GoCodeReview />
						</i>
						<p>Create Addon</p>
					</li>

					<li>
						<i>
							<GoCodeReview />
						</i>
						<p>Fork and Remixes</p>
					</li>
				</ul>
			</section>
			{guide && <Extension_ForDevelopersSidebarGuide setGuide={setGuide} />}
		</>
	)
}
