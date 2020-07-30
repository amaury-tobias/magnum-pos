import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { PosPrinter, PosPrintData } from 'electron-pos-printer'

// import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== 'production'

let win: BrowserWindow | null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 700,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    titleBarStyle: 'hiddenInset',
    // kiosk: true,
    webPreferences: {
      experimentalFeatures: true,
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools({ mode: 'undocked' })
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension({
  //       id: "ljjemllljcmogpfapbkkighbhhppjdbg",
  //       electron: ">=1.2.1",
  //     });
  //     // await installExtension(VUEJS_DEVTOOLS);
  //   } catch (e) {
  //     console.error("Vue Devtools failed to install:", e.toString());
  //   }
  // }
  createWindow()
})

ipcMain.on('print', (_, printerName: string, textToPrint: string) => {
  const data: PosPrintData[] = [
    {
      type: 'text', // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: textToPrint,
      position: 'center',
      fontsize: 24,
      // Fix: await fix in `electron-pos-printer` typings https://github.com/Hubertformin/electron-pos-printer/issues/9
      tableHeader: [''],
      tableBody: [''],
      tableFooter: [''],
    },
  ]
  PosPrinter.print(data, {
    printerName: 'POS-80-Series',
    silent: true,
    width: '260px',
  })
    .then(() => console.log('printed'))
    .catch((err) => console.error(err))
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
