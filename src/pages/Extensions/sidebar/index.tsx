import styles from '../extensions.module.scss'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { VscTools } from 'react-icons/vsc'
import { AiOutlineMessage } from 'react-icons/ai'
import { SiReadthedocs } from 'react-icons/si'
import { TbGridDots } from 'react-icons/tb'
import { GrView } from 'react-icons/gr'
import { FaGithubAlt } from 'react-icons/fa'

export const ExtensionsSidebar = () => {
	return (
		<nav className={styles.sidebar}>
			<ul>
				{/* Back to homepage */}
				<li>
					<Link to='/'>
						<MdOutlineKeyboardBackspace />
					</Link>
				</li>

				{/* Separator and extend-sidebar */}
				<li className={styles.separator}>
					<button className='rotate-90'>
						<TbGridDots />
					</button>
				</li>

				{/* Developer Profile */}
				<li>
					<Link to='/developer-profile'>
						<VscTools />
					</Link>
				</li>

				{/* Theming preview */}
				<li>
					<Link to='/theme-customization-preview'>
						<GrView />
					</Link>
				</li>

				{/* Files */}
				<li>
					<Link to='/github-repos'>
						<FaGithubAlt />
					</Link>
				</li>

				{/* Contact Main Developer */}
				<li>
					<Link to='/ask-a-question'>
						<AiOutlineMessage />
					</Link>
				</li>

				{/* Documentation */}
				<li>
					<Link to='/documentation'>
						<SiReadthedocs />
					</Link>
				</li>
			</ul>
		</nav>
	)
}
