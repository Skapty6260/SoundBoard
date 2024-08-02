import { electronModals, TModalNames } from '../../config/modals'
import { registerEvent } from '../registerEvent'
import { WindowManager } from '../../services'

const OpenModalWindow = async (
	_Event: Electron.IpcMainInvokeEvent,
	modal: TModalNames
) => {
	WindowManager.openModalWindow(electronModals[modal])
	return electronModals
}

registerEvent('window/openModal', OpenModalWindow)
