import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NbLayoutModule } from '@nebular/theme';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NbLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  // providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Login success:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tasks']);
      },
      (error) => {
        console.log('Login error:', error);
      }
    );
  }
}
