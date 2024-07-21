import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  formUser: FormGroup = new FormGroup({});
  username: string = '';

  constructor(private databaseService: DatabaseService, private fb: FormBuilder, private router: Router) {
    this.formUser = fb.group({
      username: [{ value: '', disabled: true }],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.databaseService.getUser()?.subscribe(
      (resData: any) => {
        this.formUser.setValue({
          username: resData.username,
          email: resData.email,
          first_name: resData.first_name,
          last_name: resData.last_name
        });

        this.username = resData.username;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateUser() {
    if (this.formUser.valid) {
      console.log(this.formUser.value);
      this.databaseService.updateUser(this.formUser.value)?.pipe(first()).subscribe(
        resData => {
          console.log(resData);
        },
        error => {
          console.log(error);
        }
      );
    }

    this.router.navigate(['/perfil']);
  }

  deleteUser() {
    this.databaseService.deleteUser()?.pipe(first()).subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
