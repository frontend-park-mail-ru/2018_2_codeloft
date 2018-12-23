import { stringify } from 'query-string';

export function downloadFile(data: object, name: string = 'NoName') {
  try {
    const link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('href', URL.createObjectURL(new Blob([data], {type: 'application/octet-stream'})));
    link.setAttribute('download', name);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    // TODO: some logs or notifications
  }
}
