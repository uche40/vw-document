'use strict';

import ClassicEditor from './ckeditor';
import WeburgerConverter from './weburger/converter';
//import { del } from 'selenium-webdriver/http';

/*
Application:
 */
//import './app.css';
//import './app.html';

const EDITOR_SELECTOR = '#editor';

const MIMETYPE_WEBURGER = 'application/weburger+json';
const MIMETYPE_HTML = 'text/html';

/**
Teh original value of the document.

It may pass or loaded from the URL. It will be changed if the editor is saved successfully.
 */
let documentValue = '';

/**
The URL of the document.

By passing the URL, you can edit the content directly. we assume the POST is used to
save and the GET is used to download the content.
 */
let documentUrl;

/**
User may send the mimetype of the document. The default mime type is HTML and is fully
supported by the editor.

For example if your refrence document is a WEBURGER document you may send the mime type
and the editor try to keep the content valid.
 */
let documentMimetype;
let documentLoading = false;

/**
Which language user are interested in

 */
let userLanague;

loadParameters();
loadEditor();

function encodeEditorData(htmlText) {
	switch (documentMimetype) {
		case MIMETYPE_HTML: {
			return htmlText;
		}
		case MIMETYPE_WEBURGER: {
			let widget = WeburgerConverter.getInstance(MIMETYPE_HTML)
				.decode(htmlText);
			return JSON.stringify(widget);
		}
		default:
			throw {
				messag: 'unsupporte mime type to encode'
			};
	}
}

function decodeDocumentValue(documentText) {
	switch (documentMimetype) {
		case MIMETYPE_HTML: {
			return documentText;
		}
		case MIMETYPE_WEBURGER: {
			let widget = JSON.parse(documentText);
			let element = WeburgerConverter.getInstance(MIMETYPE_HTML)
				.encode(widget);
			return element.outerHTML;
		}
		default:
			throw {
				messag: 'unsupporte mime type to decode'
			};
	}
}

function loadEditorData() {
	if (documentLoading) {
		return;
	}
	if (!documentUrl) {
		return;
	}
	documentLoading = true;

	// Fetch data
	fetch(documentUrl)
		.then(response => response.text())
		.then(textResponse => {
			let editor = window.editor;
			documentValue = textResponse;
			editor.setData(decodeDocumentValue(documentValue));
		})
		.finally(() => {
			documentLoading = false;
		});
}

function loadParameters() {
	// Fetch url
	const urlParams = new URLSearchParams(window.location.search);
	documentUrl = urlParams.get('url');
	documentMimetype = urlParams.get('mime_type') || MIMETYPE_HTML;
	userLanague = urlParams.get('language') || 'en';
}

function saveDocument(editor) {
	if (documentLoading) {
		return documentLoading;
	}
	let newValue = encodeEditorData('<section data-wb="4">' + editor.getData() + '</section>');
	return documentLoading = fetch(documentUrl, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': documentMimetype
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: newValue // body data type must match "Content-Type" header
	})
		.then(() =>
			// document is saved successfully
			documentValue = newValue
		)
		.finally(() =>
			// job is cumplete
			documentLoading = false
		);
}

function loadEditor() {
	ClassicEditor.create(document.querySelector(EDITOR_SELECTOR), {
		language: userLanague,
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