import { app, net, protocol } from 'electron'

export const registerFileProtocol = (name: string, path: string) => {
	protocol.handle(name, () => {
		return net.fetch(`file://${app.getPath('appData')}/soundboard/${path}`)
	})
}
