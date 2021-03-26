import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
//import Command from '@ckeditor/ckeditor5-core/src/command';


import InsertImageCommand from './InsertImageCommand';
import SaveContentCommand from './SaveContentCommand';
import DeleteContentCommand from './DeleteContentCommand';

import CmsUploadAdapter from './CmsUploadAdapter';


export default class UrlPlugin extends Plugin {
	init() {
		const editor = this.editor;

		editor.commands.add('insertImage', new InsertImageCommand(editor));
		editor.commands.add('saveContent', new SaveContentCommand(editor));
		editor.commands.add('deleteContent', new DeleteContentCommand(editor));


		// hack uploader
		editor.plugins.get('FileRepository').createUploadAdapter = loader => new CmsUploadAdapter(loader);
	}

}