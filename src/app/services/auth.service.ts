

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // public baseUrl = 'http://localhost:8000';
  public baseUrl = 'https://db.katiekisiel.com';

  public token: string = '';
  public token_expires: Date = new Date();

  public username: string = '';
  public errors: any = [];
 
  constructor(private http: HttpClient, private router: Router) {}
 
  login(username: string, password: string) {
    this.http.post(`${this.baseUrl}/api/login/`, {
      username, password
    })
    .subscribe(res => {
      this.setToken(res)
    });
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  setToken(token: any) {
    const date = new Date();
    date.setMinutes(date.getHours() + 1);
    const data = {
      access: token.access,
      refresh: token.refresh,
      expiry: date
    }
    localStorage.setItem('token', JSON.stringify(data));
  }

  getToken(): any | null {
    const token = localStorage.getItem('token');
    if (token) {
      const now = new Date();
      const data = JSON.parse(token);
      if (data.expiry < now) {
        this.logout();
      }
      else
        return data;
    }
    return null;
  }

  refreshToken() {
    const token = this.getToken();
    if (!token)
      this.logout();
    else {
      this.http.post(`${this.baseUrl}/api/token/refresh/`, token)
      .subscribe({
          next: (t: any) => {
            t.refresh = token.refresh;
            this.setToken(t);
          },
          error: (e) => {
          }
      });
    }
  }
}