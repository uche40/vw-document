import WeburgerEncoder from './encoder';
import WeburgerWidget from './../widget';

function cssNameToJsName(name) {
	let split = name.split('-');
	let output = '';
	for (let i = 0; i < split.length; i++) {
		if (i > 0 && split[i].length > 0 && !(i === 1 && split[i] === 'ms')) {
			split[i] = split[i].substr(0, 1).toUpperCase() + split[i].substr(1);
		}
		output += split[i];
	}
	return output;
}

function toDome(element) {
	// dom element
	if (element instanceof Element) {
		return element;
	}
	// html text
	let t = document.createElement('template');
	t.innerHTML = element;
	return t.content
		.cloneNode(true)
		.childNodes[0];
}

function encodeStyle(element, widget) {
	// set styles
	let style = widget.style || {};
	for (const [key, value] of Object.entries(style)) {
		element.style[key] = value;
	}
}

function decodeSetIsLeaf(element, widget) {
	let isLeaf;
	if ('wbIsLeaf' in element.dataset) {
		isLeaf = true;
	} else {
		isLeaf = element.children.length !== element.childNodes.length;
	}
	widget.setLeaf(isLeaf);
}

function decodeElementInnerText(element, widget) {
	// html
	if (widget.type === 'pre') {
		widget.text = element.innerText;
	} else {
		widget.html = element.innerHTML;
	}
}

function decodeStyle(element, widget) {
	//>> style
	for (let i = 0; i < element.style.length; i++) {
		let sname = element.style.item(i);
		widget.style[cssNameToJsName(sname)] = element.style.getPropertyValue(sname);
	}
}

function decodeAttributs(element, widget) {
	// copy attributes
	Array.from(element.attributes)
		.forEach(attr => {
			if (attr.name === 'style' || attr.name.startsWith('data-')) {
				return;
			}
			if (attr.name === 'type') {
				widget[widget.type + 'Type'] = attr.value;
				return;
			}
			widget[attr.name] = attr.value;
		});

	// Copy data set
	Object.keys(element.dataset)
		.forEach(key => widget.dataset[key] = element.dataset[key]);

	// copy html
	if (widget.isLeaf()) {
		if (widget.type === 'pre') {
			widget.text = element.innerText;
		} else {
			widget.html = element.innerHTML;
		}
	}
}

function encodeAttributes(element, widget) {
	Object.keys(widget)
		.forEach(key => {
			switch (key) {
				case 'html':
				case 'text':
				case 'innerHtml':
				case 'innerText':
				case 'style':
				case 'on':
				case 'children':
				case 'dataset':
				case 'version':
					break;
				default:
					element.setAttribute(key, widget[key]);
					break;
			}
		});

	Object.keys(widget.dataset)
		.forEach(key => element.dataset[key] = widget.dataset[key]);
}

function encodeInnereText(element, widget) {
	if (widget.html) {
		element.innerHTML = widget.html;
	}
	if (widget.text) {
		element.innerText = widget.text;
	}
}

/**
HTML/ Weburger converter

 */
export default class WeburgerHtmlDomConverter extends WeburgerEncoder {

	constructor() {
		super(['text/html', 'html']);
	}
	/**
	Encode a weburger object into HTML Dome
	 */
	decode(element) {
		element = toDome(element);
		let widget = new WeburgerWidget({
			type: element.tagName.toLowerCase()
		});

		//>> attributes
		decodeSetIsLeaf(element, widget);
		decodeAttributs(element, widget);
		decodeStyle(element, widget);
		if (widget.isLeaf()) {
			decodeElementInnerText(element, widget);
		} else {
			widget.children = Array.from(element.children)
				.map(childelement => this.decode(childelement));
		}
		return widget;
	}

	/**
	Convert a DOM element into a weburger object
	 */
	encode(widget) {
		if (!(widget instanceof WeburgerWidget)) {
			widget = new WeburgerWidget(widget);
		}
		// TODO: check version
		// TODO: model validation
		let element = document.createElement(widget.type);
		// TODO: support on (events)
		encodeStyle(element, widget);
		encodeAttributes(element, widget);
		if (widget.isLeaf()) {
			encodeInnereText(element, widget);
		} else {
			Array.from(widget.children)
				.forEach(childWidget => {
					element.appendChild(this.encode(childWidget));
				});
		}
		return element;
	}
}