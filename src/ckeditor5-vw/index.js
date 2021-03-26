import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';


import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import saveIcon from './theme/icons/save-24px.svg';
import deleteIcon from './theme/icons/delete-24px.svg';

function createImageView(editor, locale) {
	const view = new ButtonView(locale);

	view.set({
		label: 'Insert image',
		icon: imageIcon,
		tooltip: true
	});

	// Callback executed once the image is clicked.
	view.on('execute', () => {
		editor.execute('insertImage');
	});

	return view;
}


function createSaveContentView(editor, locale) {
	const view = new ButtonView(locale);

	view.set({
		label: 'Save',
		icon: saveIcon,
		tooltip: true
	});

	// Callback executed once the image is clicked.
	view.on('execute', () => {
		editor.execute('saveContent');
	});

	return view;
}

function createDeleteContentView(editor, locale) {
	const view = new ButtonView(locale);

	view.set({
		label: 'Delete',
		icon: deleteIcon,
		tooltip: true
	});

	// Callback executed once the image is clicked.
	view.on('execute', () => {
		editor.execute('deleteContent');
	});

	return view;
}

export default class CmsFileUploaderAdapter extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add('insertImage', locale => createImageView(editor, locale));
		editor.ui.componentFactory.add('saveConent', locale => createSaveContentView(editor, locale));
		editor.ui.componentFactory.add('deleteContent', locale => createDeleteContentView(editor, locale));
	}
}