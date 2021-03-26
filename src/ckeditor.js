/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
//import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';


import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
//import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'; // clipboard, Enter, select all, ShiftEnter, typing and undo 
//import ExportToPDF from '@ckeditor/ckeditor5-export-pdf/src/exportpdf';
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
import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
import ImageResizeButtons from '@ckeditor/ckeditor5-image/src/imageresize/imageresizebuttons';



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
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';

export default class ClassicEditor extends ClassicEditorBase { }

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Alignment,
	Autoformat,
	//	Autosave,
	BlockQuote,
	Bold,
	Code,
	CodeBlock,
	//			Comments,
	Essentials,
	//	ExportToPDF,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	Highlight,
	HorizontalLine,
	//	//> Image
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	ImageResizeEditing,
	ImageResizeButtons,

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
	TodoList,
	WordCount,
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'saveConent',
			'deleteContent',
			'undo',
			'redo',
			// pring
			'exportPdf',
			// paint format
			'|',
			'heading',
			'|',
			// zome
			// '|',
			// >> font
			'fontFamily',
			'fontSize',
			'bold',
			'italic',
			'fontColor',
			'highlight',
			'fontBackgroundColor',

			'|',
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
			'alignment',
			//			'comment',
			//				'MathType',
			'removeFormat',
			//			'restrictedEditing',
			'superscript',
			'subscript',
			'strikethrough',
			'todoList',
		]
	},
	image: {
		// Configure the available styles.
		styles: [
			'alignLeft', 'alignCenter', 'alignRight', 'full', 'side'
		],
		resizeOptions: [
			{
				name: 'imageResize:original',
				value: null,
				label: 'Original'
			},
			{
				name: 'imageResize:25',
				value: '25',
				label: '25%'
			},
			{
				name: 'imageResize:50',
				value: '50',
				label: '50%'
			},
			{
				name: 'imageResize:75',
				value: '75',
				label: '75%'
			}
		],
		toolbar: [
			'imageTextAlternative',
			'|',
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight',
			'|',
			'imageResize',
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
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' }
		]
	}
};