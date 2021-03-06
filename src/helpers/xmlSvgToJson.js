import convertToReactProps from './convertToReactProps'

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( let i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return 'svr_id_' + text;
}

function inlineStyleToCssObject(inlineCSS) {
	let regex = /([\w-]*)\s*:\s*([^;]*)/g;
	let match, properties={};

	while(match=regex.exec(inlineCSS)) properties[convertToReactProps(match[1])] = match[2].trim();

	return properties;
}

function xmlToJson(xml) {

	// Create the return object
	let obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@props"] = {};
			for (let j = 0; j < xml.attributes.length; j++) {
				let attribute = xml.attributes.item(j);

				if(attribute.nodeName === "style") { // convert inline styles to object
					let cssObj = inlineStyleToCssObject(attribute.nodeValue);
					obj["@props"]["style"] = cssObj;
				} else {
					obj["@props"][convertToReactProps(attribute.nodeName)] = attribute.nodeValue;
				}
			}
			if (!obj['@props']['id']) obj['@props']['id'] = makeid();
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

			if(nodeName === '#text') {
				console.log('item.textContent', item.textContent);
				obj.children.push({tag: nodeName, textContent: item.textContent, '@props': { id: makeid() } });
				continue;
			}

			obj.children.push({...child, tag: nodeName});

		}
	}
	return obj;
}

export default xmlToJson;
