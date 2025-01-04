const {
  app,
  BrowserWindow, ipcMain
} = require('electron')
const electron = require('electron')
const path = require('path');

const WWTHID = require('./mainsrc/WWTHID')
const F16ICP = require('./mainsrc/F16_ICP.js');
const http = require('http');
const WebSocket = require('ws');
const JsonRPC = require('simple-jsonrpc-js');
const XPlaneLegacyClient = require('./mainsrc/XPlaneLegacyClient.js');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    minWidth: 400,
    minHeight: 400,
    width: 400,
    height: 400,
    backgroundColor: '#252526',
    icon: path.join(__dirname, 'www/logo', 'SimAppPro.png'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    },
    show: true
  })

  mainWindow.show()

  mainWindow.loadFile('view/index.html')

  var OpenDevicesState = false;

  function InitCallBack () {
    WWTHID.WWTHID_JSAPI.CB_Data(function (agr) {
      mainWindow.webContents.send('WWTHID_CB_Data', agr);
	  console.log('CG_data  ' +  arg);
    });
    WWTHID.WWTHID_JSAPI.CB_InputData(function (agr) {
	  console.log('this sending data');	
      mainWindow.webContents.send('WWTHID_CB_InputData', agr);

    });
    WWTHID.WWTHID_JSAPI.CB_UpdateProgress(function (agr) {
      mainWindow.webContents.send('WWTHID_CB_UpdateProgress', agr);
    });
    WWTHID.WWTHID_JSAPI.CB_Read(function (agr) {
      mainWindow.webContents.send('WWTHID_CB_Read', agr);
    });
  }

  var addCB_PartChange = function () {
    if (OpenDevicesState) {
      WWTHID.WWTHID_JSAPI.CB_PartChange(function (agr) {
      });
    }
  }

  var addCB_DeviceChange = function () {
    if (OpenDevicesState) {
      WWTHID.WWTHID_JSAPI.CB_DeviceChange(function (agr) {
      });
    }
  }

  var OpenDevicesFunc = function (event, arg) {
    var mainPath = path.join(__dirname.replace('app.asar', 'app.asar.unpacked'));
   console.log(mainPath);
   WWTHID.WWTHID_JSAPI.OpenDevices(mainPath);
    InitCallBack();

    OpenDevicesState = true;

    addCB_PartChange();
    addCB_DeviceChange();

    if (event !== undefined) {
      event.returnValue = true;
    }
  };

  var CloseDevicesFunc = function (event, arg) {
    WWTHID.WWTHID_JSAPI.CloseDevices();

    OpenDevicesState = false;
    if (event !== undefined) {
      event.returnValue = true;
    }
  };

  mainWindow.on('closed', function () {
    WWTHID.WWTHID_JSAPI.CB_Data(function (agr) { });
    WWTHID.WWTHID_JSAPI.CB_InputData(function (agr) { });
    WWTHID.WWTHID_JSAPI.CB_UpdateProgress(function (agr) { });
    WWTHID.WWTHID_JSAPI.CB_PartChange(function (agr) { });
    WWTHID.WWTHID_JSAPI.CB_DeviceChange(function (agr) { });
    mainWindow = null;
    app.quit();
  })

  mainWindow.on('minimize', function () {
    mainWindow.hide();
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  OpenDevicesFunc()
  let tData = 20;
  
  console.log(tData);
  F16ICP.init(WWTHID.WWTHID_JSAPI,tData)
  F16ICP.init(WWTHID.WWTHID_JSAPI,tData+5)
  F16ICP.init(WWTHID.WWTHID_JSAPI,tData+15)
  
  ipcMain.on('channel-name', (event, data) => {
  console.log('Received data from renderer:', data);
   F16ICP.init(WWTHID.WWTHID_JSAPI,data);
});
  
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('web-contents-created', function () {
  console.log('web-contents-created');
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

