import Command from '@ckeditor/ckeditor5-core/src/command';


export default class InsertImageCommand extends Command {

	constructor(editor) {
		super(editor);
	}

	execute() {
		const editor = this.editor;
		const imageUrl = prompt('Image URL');

		editor.model.change(writer => {
			const imageElement = writer.createElement('image', {
				src: imageUrl
			});

			// Insert the image in the current selection location.
			editor.model.insertContent(imageElement, editor.model.document.selection);
		});
	}
}