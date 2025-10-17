import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IconRegistryService } from '../Utils/services/icon-registry.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../Utils/services/alert';
import { Authentication } from '../Utils/services/authentication';
import { environment } from '../Utils/enviroments/environment';

@Component({
    selector: 'app-login',
    imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatIcon],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 private base = environment.baseApiUrl;
private baseUrl: string = `${this.base}/authentication/login`;

  loginForm: FormGroup;

  constructor(private iconRegistry: IconRegistryService, private route:Router, private cookie:CookieService, private http:HttpClient, private alert: AlertService, private auth:Authentication) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }
 ngOnInit(): void {
    const idleTime = 1 * 60 * 1000;

    setTimeout(() => {
      this.route.navigate(['/landing']);
    }, idleTime);
  }

onSubmit() {
  if (this.loginForm.valid) {
    const body = this.loginForm.value;
    this.auth.removeToken();

    this.http.post<{ token: string }>(this.baseUrl, body, {
      withCredentials: true
    }).subscribe({
      next: (res) => {
        const token = res.token;  // 👈 Hii ndio muhimu sasa

        console.log('Login success, token:', token);

        this.cookie.set('jwt_token', token, undefined, '/');
        this.route.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  } else {
    this.loginForm.markAllAsTouched();
  }
}


  
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }


 
}
