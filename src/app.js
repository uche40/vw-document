'use strict';

import ClassicEditor from './ckeditor';
import UrlResourceInputEditor from './ui/UrlResourceInputEditor';
import InterWindowInputEditor from './ui/InterWindowInputEditor';

/*
Load editor input
 */
let inputEditor = null;
const urlParams = new URLSearchParams(window.location.search);
switch (urlParams.get('api') || 'url') {
	case 'iwe':
		inputEditor = new InterWindowInputEditor();
		break;
	default:
		inputEditor = new UrlResourceInputEditor(urlParams);
		break;
}




ClassicEditor
	.create(document.querySelector('#editor'), {
		language: urlParams.get('language') || 'en',
		autosave: {
			waitingTime: 5000, // in ms
			save: editor => inputEditor.saveCkEditor(editor)
		},
	})
	.then(editor => {
		inputEditor.loadCkEditor(editor);
	});


