import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from '../models/user';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = new BehaviorSubject<User>(new User('', '', '', new Date()));

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
        const expiracaoData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const usuario = new User(
          resData.email,
          resData.localId,
          resData.idToken,
          expiracaoData
        );

        this.usuario.next(usuario);
        localStorage.setItem('userData', JSON.stringify(usuario));
      })
   );
  }

  loginUser(email: string, password: string) {
    const url = `http://127.0.0.1:8000/api/login`;

    return this.http.post<AuthResponseData>(url,
    {
      email: email,
      password: password,
      returnSecureToken: true
   }).pipe(
    tap(resData => {
      const expiracaoData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const usuario = new User(
          resData.email,
          resData.localId,
          resData.idToken,
          expiracaoData
        );
        this.usuario.next(usuario);
        localStorage.setItem('userData', JSON.stringify(usuario));
    }),
   );
  }

  autoLogin() {
    const userData :{
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    
    } = JSON.parse(localStorage.getItem('userData') as string);

    if(!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.token) {
      this.usuario.next(loadedUser);
    }
  }

  logout() {
    this.usuario.next(new User('', '', '', new Date()));
  }

  isLoggedIn() {
    return this.usuario.value.token != null;
  }
}