import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
//import Command from '@ckeditor/ckeditor5-core/src/command';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';


//class InsertImageCommand extends Command {
//
//	execute() {
//		const imageUrl = prompt('Image URL');
//
//		this.editor.model.change(writer => {
//			const imageElement = writer.createElement('image', {
//				src: imageUrl
//			});
//
//			// Insert the image in the current selection location.
//			editor.model.insertContent(imageElement, editor.model.document.selection);
//		});
//	}
//}

export default class InsertImage extends Plugin {
	init() {
		const editor = this.editor;
//		editor.commands.add( 'insertImage', new InsertImageCommand(editor));

		editor.ui.componentFactory.add('insertImage', locale => {
			const view = new ButtonView(locale);

			view.set({
				label: 'Insert image',
				icon: imageIcon,
				tooltip: true
			});

			// Callback executed once the image is clicked.
			view.on('execute', () => {

			});

			return view;
		});
	}
}