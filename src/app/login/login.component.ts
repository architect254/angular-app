import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { AuthService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    if (this.authService.currentTokenValue) {
      this.router.navigate(['/app']);
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

  buildForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required]],
      password: [
        '',
        [
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25),
        ],
      ],
    });

    this.forgotPasswordForm = this.fb.group({
      logins: ['', [Validators.required]],
    });
  }

  login() {
    this.submitted = true;
    const email = this.userForm.value['email'];
    const password = this.userForm.value['password'];

    this.authService
      .login(email, password)
      .pipe(first())
      .subscribe((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        this.router.navigate(['../app'], { relativeTo: this.route });
      });
  }
}
