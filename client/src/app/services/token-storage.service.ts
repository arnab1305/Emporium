import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';
  private cnfEmail = new BehaviorSubject('');
  currentCnfEmail = this.cnfEmail.asObservable();

  constructor() {}

  updateCnfEmail(email:string){

    this.cnfEmail.next(email)

  }

  public getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem(this.USER_KEY));
  }

  setUser(user): void {
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clearStorage(): void {
    sessionStorage.clear();
  }
}
