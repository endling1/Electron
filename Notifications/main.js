const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

function createWindow(){
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
}

app.on('ready', () => {
	createWindow();
});