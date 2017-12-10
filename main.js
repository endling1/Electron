const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = require('electron').ipcMain;

let mainWindow = null;

ipcMain.on('ping', (event, arg) => {
	console.log('Main!');
	if(arg === 'hello'){
		event.sender.send('pong', 'Hello electron!');
	}
});

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 800, 
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			preload: __dirname + '/preLoad.js'
		} 
	});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
});

// window.ipcRenderer.on('pong', (event, arg) => {
// 		document.write('<h1>' + arg + '</h1>');
// 	});
// window.ipcRenderer.send('ping', 'hello');