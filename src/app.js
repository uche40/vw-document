'use strict';
import ClassicEditor from './ckeditor';
import UrlResourceInputEditor from './ui/UrlResourceInputEditor';
import WpInputEditor from './ui/WpInputEditor';
/*
Local applications
*/
import WpPlugin from './ckeditor5-wp';
import UrlPlugin from './ckeditor5-url'
import VwPlugin from './ckeditor5-vw';
/*
Load editor input
 */
let inputEditor = null;
const urlParams = new URLSearchParams(window.location.search);
let plugins = [];
switch (urlParams.get('api') || 'url') {
	case 'wp':
		inputEditor = new WpInputEditor();
		plugins = [
			VwPlugin,
			WpPlugin
		];
		break;
	default:
		inputEditor = new UrlResourceInputEditor(urlParams);
		plugins = [
			VwPlugin,
			UrlPlugin,
		]
		break;
}


ClassicEditor
	.create(document.querySelector('#editor'), {
		language: urlParams.get('language') || 'en',
		extraPlugins: plugins,
		//		autosave: {
		//			waitingTime: 5000, // in ms
		//			save: editor => inputEditor.saveCkEditor(editor)
		//		},
	})
	.then(editor => {
		editor.inputEditor = inputEditor;
		inputEditor.loadCkEditor(editor);
	});


