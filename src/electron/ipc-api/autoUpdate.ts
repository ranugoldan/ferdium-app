import { type BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

const debug = require('../../preload-safe-debug')('Ferdium:ipcApi:autoUpdate');

export default (params: { mainWindow: BrowserWindow; settings: any }) => {
  // Hard-disabled to prevent any automatic update checks or downloads
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.autoDownload = false;

  ipcMain.on('autoUpdate', (_event, args) => {
    if (args.action === 'check') {
      debug('Auto-updates disabled in this source build');
      params.mainWindow.webContents.send('autoUpdate', { available: false });
    }
  });
};
