import CkEditorInput from './CkEditorInput';

export default class InterWindowInputEditor extends CkEditorInput {

	constructor(urlParams) {
		super();
		this.value = '';
		this.loading = false;
		this.params = urlParams;
	}


	saveCkEditor(/*editor*/) { }

	loadCkEditor(/*editor*/) { }


}

