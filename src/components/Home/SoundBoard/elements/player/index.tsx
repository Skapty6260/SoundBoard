import { useState } from 'react'
import styles from './style.module.scss'
import { SelectDeviceModal } from '../../../../Modals/SoundboardModals/SelectDevice'

interface IProps {
	audioRef: React.MutableRefObject<HTMLAudioElement | null>
}

export const SoundBoardPlayer: React.FC<IProps> = ({ audioRef }) => {
	const [modal, setModal] = useState<boolean>(false)

	return (
		<>
			<div className={styles.playerContainer}>
				<input
					type='range'
					min='0'
					max='100'
					className={styles.soundTimeControls}
				/>

				<div className='flex w-full mt-2'>
					<button onClick={() => audioRef.current?.play()}>Play</button>
					<button onClick={() => audioRef.current?.pause()}>Pause</button>
					<button>Vol-</button>
					<button>Output</button>
					<button>Input</button>
					<button onClick={() => setModal(true)}>Select Device</button>
				</div>
			</div>

			{modal && <SelectDeviceModal setModal={setModal} />}
		</>
	)
}
