import CkEditorInput from './CkEditorInput';
import WeburgerConverter from '../weburger/converter';

const MIMETYPE_WEBURGER = 'application/weburger+json';
const MIMETYPE_HTML = 'text/html';




export default class UrlResourceInputEditor extends CkEditorInput {

	/**
	Teh original value of the document.
	
	It may pass or loaded from the URL. It will be changed if the editor is saved successfully.
	 */
	//	value = '';

	/**
	The URL of the document.
	
	By passing the URL, you can edit the content directly. we assume the POST is used to
	save and the GET is used to download the content.
	 */
	//	url;

	/**
	User may send the mimetype of the document. The default mime type is HTML and is fully
	supported by the editor.
	
	For example if your refrence document is a WEBURGER document you may send the mime type
	and the editor try to keep the content valid.
	 */
	//	documentMimetype;
	//	documentLoading = false;


	/**
	Creates the new instance of the editor resource
	
	 */
	constructor(urlParams) {
		super();
		this.value = '';
		this.url = urlParams.get('url');
		this.mimeTpe = urlParams.get('mime_type') || MIMETYPE_HTML;
		this.loading = false;
	}


	saveCkEditor(editor) {
		if (this.loading) {
			return this.loading;
		}
		let newValue = this.encodeEditorData('<section data-wb="4">' + editor.getData() + '</section>');
		return this.loading = fetch(this.url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': this.mimeTpe
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: newValue // body data type must match "Content-Type" header
		}).then(() =>
			// document is saved successfully
			this.value = newValue
		).finally(() =>
			// job is cumplete
			this.loading = false
		);
	}

	loadCkEditor(editor) {
		if (this.loading || !this.url) {
			return;
		}
		this.loading = true;

		// Fetch data
		fetch(this.url)
			.then(response => response.text())
			.then(textResponse => {
				this.value = textResponse;
				editor.setData(this.decodeDocumentValue(this.value));
			})
			.finally(() => this.loading = false);
	}

	encodeEditorData(htmlText) {
		switch (this.mimeTpe) {
			case MIMETYPE_HTML: {
				return htmlText;
			}
			case MIMETYPE_WEBURGER: {
				let widget = WeburgerConverter.getInstance(MIMETYPE_HTML)
					.decode(htmlText);
				return JSON.stringify(widget);
			}
			default:
				throw {
					messag: 'unsupporte mime type to encode'
				};
		}
	}

	decodeDocumentValue(documentText) {
		switch (this.mimeTpe) {
			case MIMETYPE_HTML: {
				return documentText;
			}
			case MIMETYPE_WEBURGER: {
				let widget = JSON.parse(documentText);
				let element = WeburgerConverter.getInstance(MIMETYPE_HTML)
					.encode(widget);
				return element.outerHTML;
			}
			default:
				throw {
					messag: 'unsupporte mime type to decode'
				};
		}
	}
}


