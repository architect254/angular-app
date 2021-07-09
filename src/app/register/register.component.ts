import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { passwordValidator } from '../_helpers/password.validator';

import { AuthService } from '../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  buildForm() {
    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
            Validators.minLength(6),
            Validators.maxLength(25),
            Validators.required,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: passwordValidator }
    );
  }

  register() {
    this.submitted = true;
    const name = this.userForm.value['name'];
    const email = this.userForm.value['email'];
    const password = this.userForm.value['password'];
    this.loading = true;

    this.authService
      .register(name, email, password)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
