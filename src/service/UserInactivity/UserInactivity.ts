export default class UserInactivity {
  private static timerID: number = 0;
  
  public static checkInactivity(callback: () => void, waitTime: number = 800) {
    this.stop();
    UserInactivity.timerID = window.setTimeout(callback, waitTime);
  }
  
  public static stop() {
    clearTimeout(UserInactivity.timerID);
  }
}
