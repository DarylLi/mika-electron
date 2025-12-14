const { app,ipcMain, BrowserWindow, screen, nativeImage, Menu, Tray,powerSaveBlocker, powerMonitor } = require('electron')
const { systemPreferences } = require('electron');
const path = require("node:path");

let tray = null
function createTray () {
  const icon = path.join(__dirname, 'icon/mika.ico') // required.
  const trayicon = nativeImage.createFromPath(icon)
  tray = new Tray(trayicon.resize({ width: 16 }))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        createWindow()
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.quit() // actually quit the app.
      }
    },
  ])

  tray.setContextMenu(contextMenu)
}

const createWindow = () => {
	let display = screen.getPrimaryDisplay();
	let width = display.bounds.width;
	let height = display.bounds.height;
  const win = new BrowserWindow({
    width: 750,
    height: 500,
	frame: false,
	transparent: true,
	hasShadow: false,
	title: "Mika Webcam",
	icon: path.join(__dirname, 'icon/mika.ico'),
	webPreferences: {
	  //preload: path.join(__dirname, "preload.js"),
	  partition: String(+new Date()),
	  nodeIntegration: true,
	  enableRemoteModule: true,
	  contextIsolation: false
	},
  });
  win.setIcon(path.join(__dirname, 'icon/mika.ico'));
  win.loadFile('./build/index.html')
  // win.loadURL("https://franxxdaryl.site/dist/mmd-engine/mmd.html")
  win.setPosition(width - 750, height - 500);
  createTray();
}

app.whenReady().then(() => {
    createWindow();
	powerMonitor.on("lock-screen", () => {
	  powerSaveBlocker.start("prevent-display-sleep");
	});
	powerMonitor.on("suspend", () => {
	  powerSaveBlocker.start("prevent-app-suspension");
	});
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
ipcMain.on('close-window',()=>app.quit())
// Modules to control application life and create native browser window
// const { app, BrowserWindow, screen } = require("electron");
// const path = require("node:path");

// function createWindow() {
//   // Create the browser window.
//   let display = screen.getPrimaryDisplay();
//   let width = display.bounds.width;
//   let height = display.bounds.height;
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     x: width - 600,
//     y: height,
//     frame: false,
//     transparent: true,
//     hasShadow: false,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       partition: String(+new Date()),
//     },
//   });

//   // and load the index.html of the app.
//   // mainWindow.loadFile("index.html");
//   mainWindow.loadURL("https://franxxdaryl.site/dist/mmd-engine/mmd.html");
//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow();

//   app.on("activate", function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on("window-all-closed", function () {
//   if (process.platform !== "darwin") app.quit();
// });

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.
