import Command from '@ckeditor/ckeditor5-core/src/command';


export default class DeleteContentCommand extends Command {

	constructor(editor) {
		super(editor);
	}

	execute() {
		alert('Is not supported');
	}
}