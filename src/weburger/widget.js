
export default class WeburgerWidget {

	/**
	Create new instance of the widget.
	
	 */
	constructor(data) {
		data = data || {};
		// init the widget
		this.style = data.style || {};
		this.on = data.on || {};
		this.dataset = data.dataset || {};

		Object.assign(this, data);

		if (Array.isArray(data.children)) {
			this.children = data.children
				.map(item => new WeburgerWidget(item));
		} else {
			this.children = [];
		}
		if (this.dataset.wbIsLeaf === undefined) {
			this.dataset.wbIsLeaf = this.html !== undefined || this.text !== undefined;
		}
	}

	isLeaf() {
		return this.dataset.wbIsLeaf;
	}

	setLeaf(flag) {
		this.dataset.wbIsLeaf = flag;
	}

	get version() {
		return this.dataset.wb;
	}

	set version(version) {
		this.dataset.wb = version;
	}
}