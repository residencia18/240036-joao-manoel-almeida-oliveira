import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor( private authService: AuthService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.formLogin.valid) {
      const { username, password } = this.formLogin.value;

      this.authService.loginUser(username, password).subscribe(
        resData => {
          this.router.navigate(['/perfil']);
        },
        error => {
          // this.formLogin.setErrors({ invalid: true });
        }
      )
    }
  }
}
