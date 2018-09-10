'use strict';

const incr = window.document.getElementById('incr');
const item = window.document.getElementById('test');
const decr = window.document.getElementById('decr');
const warning = window.document.getElementById('warning');

let url = window.location.toString();

item.innerText = url.substring(url.lastIndexOf('-') + 1, url.length);

decr.onclick = function() {
	if (+item.innerText === 0) {
        warning.innerHTML = '<p>Can`t make less than 0</p>';
		return;
	} 
	item.innerText = item.innerText - 1;
	window.history.pushState({id: item.innerText}, '', `test-${item.innerText}`);
}

incr.onclick = function() {
	item.innerText = +item.innerText + 1;	
	window.history.pushState({id: item.innerText}, '', `test-${item.innerText}`);
    warning.innerHTML = '';
}

