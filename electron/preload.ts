// Preload scripts
import { contextBridge } from 'electron'
import { API } from './lib/preload/bridge'

contextBridge.exposeInMainWorld('api', API)
