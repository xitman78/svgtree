
function xmlToJson(xml) {

	// Create the return object
	let obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@props"] = {};
			for (let j = 0; j < xml.attributes.length; j++) {
				let attribute = xml.attributes.item(j);
				obj["@props"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = typeof(xml.nodeValue) === "string" ? xml.nodeValue.trim() : xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		obj.children = [];
		for(let i = 0; i < xml.childNodes.length; i++) {
			let item = xml.childNodes.item(i);
			let nodeName = item.nodeName;

			if(nodeName === '#comment') { //ignore comments
				continue;
			}

			if(nodeName === "style" || nodeName === "script") {
				// console.log("item", item.textContent);
				obj.children.push({tag: nodeName, textContent: item.textContent});
				continue;
			}

			let child = xmlToJson(item);

			if(child.children && child.children.length === 0) delete child.children;   // remove empty children prop

			if(nodeName === '#text' && typeof(child) === "string" && child.trim() === '') {
				continue;
			}

			obj.children.push({...child, tag: nodeName});

		}
	}
	return obj;
}

export default xmlToJson;
