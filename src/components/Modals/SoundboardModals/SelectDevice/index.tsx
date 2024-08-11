import Modal from '@/components/ui/Modal'

interface IProps {
	setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const SelectDeviceModal: React.FC<IProps> = ({ setModal }) => {
	navigator.mediaDevices.enumerateDevices().then((devices: any) => {
		console.log(devices)

		// Filter
	})

	return (
		<Modal header='Select Device' close={() => setModal(false)}>
			{/* List of output */}
			<ul></ul>
			{/* List of input */}
			<ul></ul>

			{/* [Select] */}
			<button></button>
		</Modal>
	)
}
