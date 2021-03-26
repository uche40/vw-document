import Command from '@ckeditor/ckeditor5-core/src/command';


export default class SaveContentCommand extends Command {

	constructor(editor) {
		super(editor);
	}

	execute() {
		const editor = this.editor;
		editor.inputEditor.fireEvent('save', editor.getData());
	}
}