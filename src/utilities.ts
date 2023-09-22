import _ from "lodash";


/**
 * Return direct children elements.
 * @see http://stackoverflow.com/a/27102446/368691
 * @param element 
 */
export function elementChildren(element:HTMLElement){
	return _.filter(element.childNodes, {
		nodeType: 1,
	});
}

/**
 * @see http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
 * @returns 
 */
export function isTouchDevice():boolean{
	return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}