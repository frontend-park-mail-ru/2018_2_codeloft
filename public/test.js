const incr = window.document.getElementById('incr');
const item = window.document.getElementById('test');
const decr = window.document.getElementById('decr');
//const history = window.history;

//console.log("item " + item);
url = window.location.toString();
//console.log("url =" +url);

item.innerText = url.substring(url.lastIndexOf('-')+1, url.length);

decr.onclick = function() {	
	item.innerText = +item.innerText - 1;
	history.pushState({id: item.innerText}, '', 'test-' + item.innerText);
}

incr.onclick = function() {
	item.innerText = +item.innerText + 1;	
	history.pushState({id: item.innerText}, '', 'test-' + item.innerText);
}

// decr.addEventListener('click', fuction(e) {
// 	//e.preventDefault();
// 	item.innerText = item.innerText - 1;	
// }, false);

