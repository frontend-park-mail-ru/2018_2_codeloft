import * as io from 'socket.io-client';

export default class SocketService {
  private socket;
  
  constructor(path: string = location.origin, namespace: string = '') {
    this.socket = io(`${path}${namespace}`);
  }
  
  public send(event: string, message?: object): void {
    this.socket.emit(event, message);
  }
  
  public onMessage(event: string, callback: (data: object) => void): void {
    this.socket.on(event, callback);
  }
}
