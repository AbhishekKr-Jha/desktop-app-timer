const { app, BrowserWindow, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');


let mainWindow;
let secWindow


function createWindow() {

  let mainWindowState = windowStateKeeper({
    defaultWidth: 250,
    defaultHeight: 80,
    // x:30,
    // y:30
  });



  
  mainWindow = new BrowserWindow({
  'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
    alwaysOnTop: true,
    frame: false, 
    modal:true,
    webPreferences: {
      contextIsolation: false, 
      nodeIntegration: true,
    }
  });

  secWindow = new BrowserWindow({
   width:250,
   height:70,
   parent:mainWindow,
   frame: false, 
   show:false,
    webPreferences: {
        contextIsolation: false, 
        nodeIntegration: true,
      }
    });


  

  mainWindow.loadFile('index.html');
  secWindow.loadFile('setTimer.html');


  ipcMain.on('toggle-modal', (event, data) => {
console.log("the event is",data)
if (data) {
  secWindow.show();   
} else {
  secWindow.hide();   
}  })

 

ipcMain.on('set-timer-data', (event, data) => {
  console.log("the event is",data)
  secWindow.hide();
  mainWindow.webContents.send('timer-data', data);

  // mainWindow.webContents.openDevTools();

})

}

app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');

// When Electron is ready, create the window
app.whenReady().then(() => {
  createWindow();
 


  // Re-create a window when the app is re-activated (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
