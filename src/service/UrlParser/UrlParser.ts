export function parseByName(name: string, url: string = window.location.href): string {
  name = name.replace(/[\[\]]/g, '\\$&');

  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) {
    return '';
  }

  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function parseAll(url: string): object {
  const result: object = {};
  if (url.indexOf('?') === -1) {
    return result;
  }

  const params: string[] = url.slice(url.indexOf('?') + 1).split('&');
  params.forEach((part: string) => {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item.length > 2 ? `${item.slice(1).join('=')}` : item[1]);
  });

  return result;
}
