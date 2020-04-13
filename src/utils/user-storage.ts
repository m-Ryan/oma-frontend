import { LOGIN_ADDRESS } from '@/constants';
const sessionKey = 'session-key';
const tokenKey = 'token-key';
export class UserStorage {

  static getToken() {
    const token = window.localStorage.getItem(tokenKey) || window.sessionStorage.getItem(sessionKey) || '';
    return token;
  }

  static setToken(token: string, saved: boolean) {
    if (saved) {
      window.localStorage.setItem(tokenKey, token);
    }
    window.sessionStorage.setItem(tokenKey, token);
  }

  static logout() {
    window.localStorage.setItem(tokenKey, '');
    window.sessionStorage.setItem(sessionKey, '');
    window.location.assign(LOGIN_ADDRESS);
  }
}
