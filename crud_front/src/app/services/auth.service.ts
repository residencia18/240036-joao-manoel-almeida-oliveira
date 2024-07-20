import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from '../models/user';

interface AuthResponseData {
  token: string;
  user_id: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = new BehaviorSubject<User>(new User('', '', ''));

  constructor(private http: HttpClient) { }

  signupUser(email: string, password: string) {
   const url = `http://127.0.0.1:8000/api/signin`;

   return this.http.post<AuthResponseData>(url, 
   {
      email: email,
      password: password,
      returnSecureToken: true
   }).pipe(
      tap(resData => {
        const usuario = new User(
          resData.email,
          resData.user_id,
          resData.token,
        );

        this.usuario.next(usuario);
        localStorage.setItem('userData', JSON.stringify(usuario));
      })
   );
  }

  loginUser(user: string, password: string) {
    const url = `http://127.0.0.1:8000/api/login/`;

    return this.http.post<AuthResponseData>(url,
    {
      username: user,
      password: password
   }).pipe(
    tap(resData => {
      const usuario = new User(
        resData.email,
        resData.user_id,
        resData.token,
      );
      this.usuario.next(usuario);
      localStorage.setItem('userData', JSON.stringify(usuario));
    }),
   );
  }

  autoLogin() {
    const userData :{
      username: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    
    } = JSON.parse(localStorage.getItem('userData') as string);

    if(!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.id,
      userData._token
    );

    if(loadedUser.token) {
      this.usuario.next(loadedUser);
    }
  }

  logout() {
    this.usuario.next(new User('', '', ''));
  }

  isLoggedIn() {
    return this.usuario.value.token != null;
  }

  getToken() {
    return this.usuario.value.token;
  }
}