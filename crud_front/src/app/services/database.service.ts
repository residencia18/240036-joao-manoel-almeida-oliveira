import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private authService: AuthService, private http: HttpClient) { }

  getUser() {
    const url = `http://127.0.0.1:8000/api/user/`;

    const token = this.authService.getToken();

    if (!token) {
      return;
    }

    return this.http.get(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    }).pipe(tap(resData => {
      // console.log(resData);
    }));
  }

  updateUser(user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }) {
    const url = `http://127.0.0.1:8000/api/user/`;

    const token = this.authService.getToken();

    if (!token) {
      return;
    }

    return this.http.put(url, user, {
      headers: {
        Authorization: `Token ${token}`
      }
    }).pipe(tap(resData => {
      // console.log(resData);
    }));
  }

  deleteUser() {
    const url = `http://127.0.0.1:8000/api/user/`;

    const token = this.authService.getToken();

    if (!token) {
      return;
    }

    return this.http.delete(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    }).pipe(tap(resData => {
      // console.log(resData);
    }));
  }

  createUser(user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }) {
    const url = `http://127.0.0.1:8000/api/signin/`;

    return this.http.post(url, user).pipe(tap(resData => {
      // console.log(resData);
    }));
  }
}
