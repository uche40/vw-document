
import WeburgerConverter from "./converter";

/**
Manages basics of the WB Module.

- list of all loaded widgets

 */
export default class Weburger {

	/**
	Generate a converter
	 */
	converter(mimetype) {
		return WeburgerConverter.getInstance(mimetype);
	}

}