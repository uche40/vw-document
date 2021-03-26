import WeburgerHtmlDomConverter from "./WeburgerHtmlDomConverter";
import WeburgerEncoder from "./encoder";

describe("WeburgerHtmlDomConverter ", () => {
	it("should support a default constractor", () => {
		let converter = new WeburgerHtmlDomConverter();
		expect(converter).not.toBe(undefined)
	});


	it("should be instance of encoder", () => {
		let converter = new WeburgerHtmlDomConverter();
		expect(converter instanceof WeburgerEncoder).toBe(true)
	});

	//----------------------------------------------------------------
	// Checking types
	let types = [
		'div',
		'a',
		'p',
		'script',
	];
	types.forEach(itemType => {
		it('should convert a webureger widget' + itemType + ' to dom', () => {
			let model = {
				type: itemType
			};
			let converter = new WeburgerHtmlDomConverter();
			let dom = converter.encode(model);
			expect(dom.nodeName.toLowerCase()).toBe(model.type);
		});
	});

	it('should convert a dive element to object', () => {
		let dom = document.createElement('div');

		let converter = new WeburgerHtmlDomConverter();
		let model = converter.decode(dom);
		expect(model.type).toBe(dom.nodeName.toLowerCase());
	});



	it('should supports style', () => {
		let str = '<div style="margin-top: 123px;"></div>';
		let converter = new WeburgerHtmlDomConverter();

		// to wb
		let model = converter.decode(str);
		expect(model.type).toBe('div');
		expect(model.style.marginTop).toBe('123px');

		// from wb
		let dom = converter.encode(model);
		expect(dom.style.marginTop).toBe('123px');
	});


	it('should supports children', () => {
		let str = '<div style="margin-top: 123px;"><div></div><img /></div>';
		let converter = new WeburgerHtmlDomConverter();

		// to wb
		let model = converter.decode(str);
		expect(model.type).toBe('div');
		expect(model.children.length).toBe(2);
		expect(model.children[0].type).toBe('div');
		expect(model.children[1].type).toBe('img');
	});
});