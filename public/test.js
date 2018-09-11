'use strict';

const incr = window.document.getElementsByClassName('incr')[0];
const item = window.document.getElementsByClassName('test')[0];
const decr = window.document.getElementsByClassName('decr')[0];
const warning = window.document.getElementsByClassName('warning')[0];

const url = window.location.toString();

item.innerText = url.substring(url.lastIndexOf('-') + 1, url.length);

decr.addEventListener('click', event => {
    event.preventDefault();
    if (+item.innerText === 0) {
        warning.innerHTML = '<p>Can`t make less than 0</p>';
        return;
    }
    item.innerText = item.innerText - 1;
    history.pushState({id: item.innerText}, '', `test-${item.innerText}`);
});

incr.addEventListener('click', event => {
    event.preventDefault();
    item.innerText = +item.innerText + 1;
    history.pushState({id: item.innerText}, '', `test-${item.innerText}`);
    warning.innerHTML = '';
});

