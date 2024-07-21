import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
    }
`]
})
export class SigninComponent {
  formSignin!: FormGroup;

  constructor( private databaseService: DatabaseService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formSignin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  signin() {
    if (this.formSignin.valid) {
      const { username, password, email, first_name, last_name } = this.formSignin.value;

      const user = {
        username,
        password,
        email,
        first_name,
        last_name
      }

      this.databaseService.createUser(user).subscribe(
        resData => {
          this.router.navigate(['/login']);
        },
        error => {
          // this.formSignin.setErrors({ invalid: true });
        }
      )
    }
  }
}
