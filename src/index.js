const item = window.document.getElementById('test');
//console.log("item " + item);
url = window.location.toString();
//console.log("url =" +url);

item.innerText = url.substring(url.lastIndexOf('-')+1, url.length);

