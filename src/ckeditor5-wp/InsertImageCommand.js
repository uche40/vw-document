import Command from '@ckeditor/ckeditor5-core/src/command';


export default class InsertImageCommand extends Command {

	constructor(editor) {
		super(editor);
	}

	execute() {
		const editor = this.editor;
		editor.inputEditor.fireEvent('resource', {
			type: 'image-url',
			call: 'insertImage'
		});
	}
}