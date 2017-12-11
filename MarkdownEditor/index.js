const marked = require('marked');
const editor = document.querySelector('.editor textarea');
const preview = document.querySelector('.preview');

const remote = require('electron').remote;
const dialog = remote.dialog;
const openFileLink = document.querySelector('a.open-file');
const fs = require('fs');
const container = document.querySelector('.container');

const saveFileLink = document.querySelector('a.save-file');
let currentFile = null;
const header = document.querySelector('.header');

const shell = require('electron').shell;
const showFileInFolder = document.querySelector('a.show-file');

openFileLink.onclick = (evt) => {
	dialog.showOpenDialog({
		title: 'Select file to edit',
		filters : [
			{
				name: 'Markdown documents',
				extensions: ['md', 'markdown']
			}
		]
	}, (filenames) => {
		if(!filenames) return;
		if(filenames.length > 0 ){
			currentFile = filenames[0];
			openFile(filenames[0]);
		}
	});
}

function openFile(filename){
	const content = fs.readFileSync(filename);
	editor.value = content;
	container.classList.remove('hidden');
	header.classList.add('hidden');
	generatePreview();
}

saveFileLink.onclick = (evt) => {
	dialog.showSaveDialog({
		title: currentFile,
		defaultPath: '.',
		filters : [
			{
				name: 'Markdown documents',
				extensions: ['md', 'markdown']
			}
		]
	}, (filename) => {
		fs.writeFileSync(filename, editor.value);
	});
}

showFileInFolder.onclick = (evt) => {
	shell.showItemInFolder(currentFile);
}

marked.setOptions({
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});

editor.onkeyup = generatePreview;

function generatePreview(){
	const content = editor.value;
	const html = marked(content);
	preview.innerHTML = html;
}