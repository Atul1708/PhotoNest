import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../components/interface/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private route: Router) {}

  saveUserToLocalStorage(data: user) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUserFromLocalStorage() {
    const userInfo = localStorage.getItem('user');

    if (userInfo) {
      return JSON.parse(userInfo);
    } else {
      return null;
    }
  }
  saveUserToSessionStorage(data: user) {
    sessionStorage.setItem('user', JSON.stringify(data));
  }

  getUserFromSessionStorage() {
    const userInfo = sessionStorage.getItem('user');

    if (userInfo) {
      return JSON.parse(userInfo);
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    this.isLoggedIn = false;
    this.route.navigate(['/login']);
  }

  authenticateUser(data: user): boolean {
    if (data.username === 'atul' && data.password === 'shiva1909') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }
}
