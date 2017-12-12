const electron = require('electron');
const crashReporter = electron.crashReporter;
const app = electron.app;

app.on('ready', () => {
	crashReporter.start({
		productName: 'crasher',
		companyName: 'electron',
		submitURL: 'http://localhost:3000/crashes',
		autoSubmit: true,
		extra: {
			'name': 'Crasher'
		}
	});
	process.crash();
});