const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = require('electron').ipcMain;

let mainWindow = null;

function createMainWindow(){
		mainWindow = new BrowserWindow({
		width: 800, 
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			preload: __dirname + '/preLoad.js'
		} 
	});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
}

function setupIpc(){
	ipcMain.on('ping', (event, arg) => {
		console.log('Main!');
		if(arg === 'hello'){
			event.sender.send('pong', 'Hello electron!');
		}
	});
}

function reportCrash(err){
	console.log(err);
}

function crashApp(){
	setTimeout(() => {
		nonExistentFunction();
	}, 2000);
}

app.on('will-finish-launching', () => {
	console.log('will-finish-launching');
});

app.on('ready', () => {
	console.log('ready');
	createMainWindow();
	setupIpc();
	//crashApp();
});

app.on('window-all-closed', () => {
	console.log('window-all-closed');
	if(process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('activate', () => {
	console.log('activate');
	if(mainWindow === null){
		createMainWindow();
	}
});

app.on('before-quit', (evt) => {
	console.log('before-quit');
});

app.on('quit', (evt, exitCode) => {
	console.log('quit');
});

process.on('uncaughtException', (err) => {
	reportCrash(err);
	app.quit();
});

// window.ipcRenderer.on('pong', (event, arg) => {
// 		document.write('<h1>' + arg + '</h1>');
// 	});
// window.ipcRenderer.send('ping', 'hello');