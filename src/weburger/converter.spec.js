import WeburgerConverter from "./converter";

describe("Weburger Converter ", () => {
	it("should be exist", () => {
		expect(WeburgerConverter).not.toBe(undefined)
	});

	it("should support html dom", () => {
		let converter = WeburgerConverter.getInstance('html');
		expect(converter).not.toBe(undefined)
	});

	it("should convert a DIV to Weburger", () => {
		let div = document.createElement("div");
		let wdiv = WeburgerConverter
			.getInstance('html')
			.decode(div);

		expect(wdiv).not.toBe(undefined);
	});
});