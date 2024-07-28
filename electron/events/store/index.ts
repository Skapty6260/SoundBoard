//   _____ ______   ___   ____     ___         __   ___   ____   _____  ____   ____
//  / ___/|      | /   \ |    \   /  _]       /  ] /   \ |    \ |     ||    | /    |
// (   \_ |      ||     ||  D  ) /  [_       /  / |     ||  _  ||   __| |  | |   __|
//  \__  ||_|  |_||  O  ||    / |    _]     /  /  |  O  ||  |  ||  |_   |  | |  |  |
//  /  \ |  |  |  |     ||    \ |   [_     /   \_ |     ||  |  ||   _]  |  | |  |_ |
//  \    |  |  |  |     ||  .  \|     |    \     ||     ||  |  ||  |    |  | |     |
//   \___|  |__|   \___/ |__|\_||_____|     \____| \___/ |__|__||__|   |____||___,_|
import { IStorageSchema, storeSchema } from '../../config/store'
import Store from 'electron-store'

export type STORE_KEYS = keyof IStorageSchema

let store: Store

export async function initStore() {
	// @ts-ignore
	store = await new Store<IStorageSchema>({ storeSchema })
	return store
}

//  Methods
//                ('-.   .-') _
//              _(  OO) (  OO) )
//   ,----.    (,------./     '._
//  '  .-./-')  |  .---'|'--...__)
//  |  |_( O- ) |  |    '--.  .--'
//  |  | .--, \(|  '--.    |  |
// (|  | '. (_/ |  .--'    |  |    (Store.get handler)
//  |  '--'  |  |  `---.   |  |
//   `------'   `------'   `--'
export async function getValue(key: STORE_KEYS): Promise<any> {
	try {
		const value = await store.get(key)
		if (value) {
			return value
		} else return null
	} catch (e) {
		console.error(e)
		return null
	}
}

//   .-')      ('-.   .-') _
//  ( OO ).  _(  OO) (  OO) )
// (_)---\_)(,------./     '._
// /    _ |  |  .---'|'--...__)
// \  :` `.  |  |    '--.  .--'
//  '..`''.)(|  '--.    |  |	(Store.set handler)
// .-._)   \ |  .--'    |  |
// \       / |  `---.   |  |
//  `-----'  `------'   `--'
export async function setValue(key: STORE_KEYS, value: any) {
	try {
		await store.set(key, value)
		return [key, value]
	} catch (e) {
		console.error(e)
		return null
	}
}
