const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

let mainWindow = null;

function createMainWindow(){
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
}

app.on('ready', () => {
	createMainWindow();
});