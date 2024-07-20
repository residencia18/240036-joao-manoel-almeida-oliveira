import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
    }
`]
})
export class LoginComponent {
  user!: string;
  password!: string;

  constructor( private authService: AuthService, private router: Router) {

  }

  login() {
    if (!this.user || !this.password) {
      return;
    }
    
    this.authService.loginUser(this.user, this.password).subscribe(
      resData => {
        this.router.navigate(['/perfil']);
      },
      error => {
        console.log(error);
      }
    )
  }
}
