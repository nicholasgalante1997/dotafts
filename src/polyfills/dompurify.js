let domPurifyInWindow = ("DOMPurify" in window);

if (!domPurifyInWindow) {
    console.warn('DOMPurify vendor src code not found.');
    console.log('Polyfilling DOMPurify module...');
    Object.defineProperty(
        window,
        "DOMPurify",
        { sanitize: cleanHTML }
    );
}

function cleanHTML(htmlString) {
    const domParser = new window.DOMParser();
    const doc = domParser.parseFromString(htmlString);
    removeScripts(doc);
    clean(doc);
    return doc.body;
}

/** 
 * @param {Document} doc
 */
function removeScripts(doc) {
    const scripts = doc.querySelectorAll('script');
    for (let script of scripts) {
        script.remove();
    }
}

/**
 * @param {Node} html 
 */
function clean (html) {
	let nodes = html?.children || [];
	for (let node of nodes) {
		removeAttributes(node);
		clean(node);
	}
}

function removeAttributes (elem) {
	let atts = elem.attributes;
	for (let {name, value} of atts) {
		if (!isPossiblyDangerous(name, value)) continue;
		elem.removeAttribute(name);
	}
}

function isPossiblyDangerous (name, value) {
	let val = value.replace(/\s+/g, '').toLowerCase();
	if (['src', 'href', 'xlink:href'].includes(name)) {
		if (val.includes('javascript:') || val.includes('data:text/html')) return true;
	}
	if (name.startsWith('on')) return true;
    return false;
}

/**
 * @see https://gomakethings.com/how-to-sanitize-html-strings-with-vanilla-js-to-reduce-your-risk-of-xss-attacks/
 * @see https://remysharp.com/2010/10/08/what-is-a-polyfill/
 */