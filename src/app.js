'use strict';

import ClassicEditor from './ckeditor';

/*
Application:
 */
//import './app.css';
//import './app.html';

const EDITOR_SELECTOR = '#editor';


let documentValue = '';
let documentUrl;
let documentLoading = false;

loadParameters();
loadEditor();

function loadEditorData() {
	if (documentLoading) {
		return;
	}
	documentLoading = true;
	if (!documentUrl) {
		return;
	}

	// Fetch data
	fetch(documentUrl)
		.then(response => response.text())
		.then(textResponse => {
			let editor = window.editor;
			documentValue = textResponse;
			editor.setData(documentValue);
			documentLoading = false;
		});
}

function loadParameters() {
	// Fetch url
	const urlParams = new URLSearchParams(window.location.search);
	documentUrl = urlParams.get('url');
}

function saveDocument(editor) {
	if (documentLoading) {
		return documentLoading;
	}
	documentValue = editor.getData();
	return documentLoading = fetch(documentUrl, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'text/html'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: editor.getData() // body data type must match "Content-Type" header
	}).then(() => documentLoading = false);
}

function loadEditor() {
	ClassicEditor.create(document.querySelector(EDITOR_SELECTOR), {
		language: 'en',
		autosave: {
			waitingTime: 5000, // in ms
			save: editor => saveDocument(editor)
		},
	})
		.then(editor => {
			window.editor = editor;
			loadEditorData();
		})
		.catch(error => {
			throw error;
		});
}