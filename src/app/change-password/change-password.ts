
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
import { DataDTO } from '../login/data';
import { LoginService } from '../login/login-service';
import { environment } from '../Utils/enviroments/environment';

@Component({
  selector: 'app-change-password',
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatIcon],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword implements OnInit {
private url = environment.baseApiUrl
private baseUrl: string = `${this.url}/authentication`;

  loginForm: FormGroup;

  constructor(private iconRegistry: IconRegistryService, private route:Router, private cookie:CookieService, private http:HttpClient, 
private alert: AlertService, private auth:Authentication, private loginService:LoginService) {
    this.loginForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
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
    const dataDTO: DataDTO = {
      oldPassword: this.loginForm.value.oldPassword,
      newPassword: this.loginForm.value.newPassword,
      confirmPassword: this.loginForm.value.confirmPassword
    };

    console.log('Prepared DTO:', dataDTO);
    this.loginService.changePassword(dataDTO).subscribe({
      next:(res)=>{
      if(res.data){
        console.log('Password Changed', res.data);
        this.alert.show('success', 'success')
        this.route.navigate(['/login']);
        this.auth.removeToken()
      }
    }  ,
    error:(err)=>{console.error('Error Occurred', err)}
  })

  } else {
    this.loginForm.markAllAsTouched();
  }
}

  get oldPassword() { return this.loginForm.get('oldPassword'); }
  get newPassword() { return this.loginForm.get('newPassword'); }
  get confirmPassword() { return this.loginForm.get('confirmPassword'); }

 
}

