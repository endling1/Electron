const remote = require('electron').remote;
const dialog = remote.dialog;

dialog.showMessageBox({
	message: 'Error',
	buttons: ['OK', 'Cancel'],
}, (indexOfButton) => {
	if(indexOfButton){
		console.log('Cancel');
	} else {
		console.log('OK');
	}
});