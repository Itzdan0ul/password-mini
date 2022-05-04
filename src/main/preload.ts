import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
	invoke: (channel: string, data: any): void => {
		const channels: string[] = ['main:password-builder'];

		if (channels.includes(channel)) {
			ipcRenderer.invoke(channel, data);
		}
	},
	once: (channel: string, func: Function): void => {
		const channels: string[] = ['renderer:password-builder'];
		
		if (channels.includes(channel)) {
			ipcRenderer.once(channel, (event: Electron.IpcRendererEvent, ...args: any) => func(...args));
		}
	},
	on: (channel: string, func: Function): void => {
		let channels: string[] = ['renderer:password-builder'];
		
		if (channels.includes(channel)) {
			ipcRenderer.on(channel, (event: Electron.IpcRendererEvent, ...args: any) => func(...args));
		}
	}
});