import Modal from '@/components/ui/Modal'
import { useAppSelector } from '@/hooks/redux'

import styles from './modal.module.scss'
import type { IAccount } from '@/providers/store/auth/auth.slice'

export const AccountsModal = ({ close }: { close: () => void }) => {
	const authReducer = useAppSelector((state: any) => state.authReducer)

	return (
		<Modal close={close} header='Select Account'>
			<ul className={styles.list}>
				{authReducer.accounts.map((account: IAccount, index: any) => {
					return (
						<li key={index}>
							<button>
								<img src={account.avatarurl} />
								<span>{account.name}</span>
							</button>
						</li>
					)
				})}
			</ul>
		</Modal>
	)
}
