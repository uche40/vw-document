'use strict';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';


import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
//import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import ExportToPDF from '@ckeditor/ckeditor5-export-pdf/src/exportpdf';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';

//>> Image
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageTextAlternative from '@ckeditor/ckeditor5-image/src/imagetextalternative';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';


import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

//>> Links
import Link from '@ckeditor/ckeditor5-link/src/link';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';

import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
//import RestrictedEditingMode from '@ckeditor/ckeditor5-restricted-editing/src/restrictededitingmode';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import SpecialCharactersLatin from '@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin';
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical';
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Title from '@ckeditor/ckeditor5-heading/src/title';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';

/*
Local applications
*/
import InsertImage from './ckeditor5-viraweb123/InsertImage';
import CmsFileUploaderAdapter from './ckeditor5-viraweb123/cmsFileUploaderAdapter';

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
		plugins: [
			Alignment,
			Autoformat,
			Autosave,
			BlockQuote,
			Bold,
			Code,
			CodeBlock,
			//			Comments,
			Essentials,
			ExportToPDF,
			FontBackgroundColor,
			FontColor,
			FontFamily,
			FontSize,
			Heading,
			Highlight,
			HorizontalLine,
			//> Image
			Image,
			ImageCaption,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,

			Indent,
			IndentBlock,
			Italic,

			//>> Link
			Link,
			LinkImage,

			List,
			MediaEmbed,
			MediaEmbedToolbar,
			Mention,
			PageBreak,
			Paragraph,
			PasteFromOffice,
			RemoveFormat,
			//			RestrictedEditingMode,
			SpecialCharacters,
			SpecialCharactersArrows,
			SpecialCharactersCurrency,
			SpecialCharactersEssentials,
			SpecialCharactersLatin,
			SpecialCharactersMathematical,
			SpecialCharactersText,
			Strikethrough,
			Subscript,
			Superscript,
			Table,
			TableCellProperties,
			TableProperties,
			TableToolbar,
			TextTransformation,
			Title,
			TodoList,
			WordCount,

			//>> local plugins
			InsertImage,
		],
		extraPlugins: [
			CmsFileUploaderAdapter,
		],
		language: 'en',
		autosave: {
			waitingTime: 5000, // in ms
			save: editor => saveDocument(editor)
		},
		toolbar: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'indent',
			'outdent',

			//>> Insert media
			'|',
			'insertImage',
			//			'imageUpload',
			'blockQuote',
			'insertTable',
			//			'mediaEmbed',
			'code',
			'codeBlock',
			'horizontalLine',
			//			'ChemType',
			'pageBreak',
			'specialCharacters',

			//>> Editor
			'|',
			'undo',
			'redo',
			'fontColor',
			'alignment',
			//			'comment',
			'fontSize',
			'fontBackgroundColor',
			'exportPdf',
			'fontFamily',
			'highlight',
			//				'MathType',
			'removeFormat',
			//			'restrictedEditing',
			'superscript',
			'subscript',
			'strikethrough',
			'todoList',
		],
		image: {
			toolbar: [
				'imageTextAlternative',
				'imageStyle:full',
				'imageStyle:side'
			]
		},
		mediaEmbed: {
			toolbar: [
				'imageStyle:side'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells',
				'tableCellProperties',
				'tableProperties'
			]
		},
		sidebar: {
			container: document.querySelector('.sidebar')
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