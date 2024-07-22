import Modal from '@/components/ui/Modal'

import styles from './modal.module.scss'
// import type { IAccount } from '@shared/types/Auth'

export const AccountsModal = ({ close }: { close: () => void }) => {
	// const authReducer = useAppSelector((state: any) => state.auth)
	const accounts = [
		{
			name: 'Vasya',
			avatarurl: 'https://i.pravatar.cc/300',
		},
	]

	return (
		<Modal close={close} header='Select Account'>
			<ul className={styles.list}>
				{accounts.map((account: any, index: any) => {
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
