import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import InsertImageCommand from './InsertImageCommand';
import SaveContentCommand from './SaveContentCommand';
import DeleteContentCommand from './DeleteContentCommand';

export default class WpPlugin extends Plugin {
	init() {
		const editor = this.editor;

		editor.commands.add('insertImage', new InsertImageCommand(editor));
		editor.commands.add('saveContent', new SaveContentCommand(editor));
		editor.commands.add('deleteContent', new DeleteContentCommand(editor));
	}

}