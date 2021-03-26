import CkEditorInput from './CkEditorInput';
import ChildApi from 'mblowfish/src/wp/ChildApi';

export default class WpInputEditor extends CkEditorInput {

	constructor(urlParams) {
		super();
		this.value = '';
		this.loaded = false;
		this.params = urlParams;

		ChildApi
			.connect({
				// Expose your model to the Parent. Property values may be functions, promises, or regular values
				setTitle: title => this.setTitle(title),
				setDescription: description => this.setDescription(description),
				setValue: value => this.setValue(value),
				getValue: () => this.getValue(),
				setDerty: derty => this.setDerty(derty),
				isDerty: () => this.isDerty(),
				insertImage: url => this.insertImage(url)
			})
			.then(childApi => {
				// When parent <-> child handshake is complete, events may be emitted to the parent
				this.childApi = childApi;
				this.loaded = true;
			});
	}

	//-----------------------------------------------------------------------------
	// API
	//-----------------------------------------------------------------------------
	getValue() {
		return this.value;
	}

	setValue(value) {
		let old = this.loaded;
		this.loaded = false;
		this.value = value;
		if (this.editor) {
			this.editor.setData(value);
		}
		this.loaded = old;
	}

	setTitle() { }
	setDescription() { }
	setDerty(flag) {
		this.derty = flag;
	}
	isDerty() { }

	insertImage(imageUrl) {
		const editor = this.editor;
		editor.model.change(writer => {
			const imageElement = writer.createElement('image', {
				src: imageUrl
			});
			editor.model.insertContent(imageElement, editor.model.document.selection);
		});
	}







	//-----------------------------------------------------------------------------
	// Internal use
	//-----------------------------------------------------------------------------
	saveCkEditor(editor) {
		if (!this.loaded) {
			return;
		}
		let oldValue = this.value;
		this.value = editor.getData();
		this.fireEvent('change', {
			value: this.value,
			oldValue: oldValue,
		});
	}

	loadCkEditor(editor) {
		this.editor = editor;
		if (this.loaded) {
			this.editor.setData(this.getValue());
		}
		editor.model.document.on('change:data', () => {
			if (!this.derty) {
				this.isDerty = true;
				this.fireEvent('change');
			}
		});
	}

	fireEvent(name, data) {
		if (!this.loaded) {
			return;
		}
		this.childApi.emit(name, data);
	}
}

