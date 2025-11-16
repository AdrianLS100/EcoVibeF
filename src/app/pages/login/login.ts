import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RequestDto } from '../../models/authrequest-model';
import { ResponseDto } from '../../models/authresponse-model';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatFormField, MatLabel, MatInput, MatButton, MatIcon, MatError
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {

  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);

  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      localStorage.clear();
      console.log("Token y items eliminados. El usuario debe volver a loguearse.");
    }
  }

  onSubmit() {
    this.errorMessage = null;

    if (this.loginForm.valid) {
      const requestDto: RequestDto = new RequestDto();
      requestDto.username = this.loginForm.value.username;
      requestDto.password = this.loginForm.value.password;

      this.loginService.login(requestDto).subscribe({
        next: (response: ResponseDto | null) => {
          console.log("Login OK. Respuesta:", response);

          alert("Login ok!");
          this.router.navigate(['/home']); // Navegamos DESPUÉS del login
        },
        error: (error: any) => {
          console.error("Error en login:", error);
          this.errorMessage = "Usuario o contraseña incorrectos.";
        }
      });

    } else {
      this.loginForm.markAllAsTouched();
      this.errorMessage = "Formulario no válido. Por favor, complete ambos campos.";
    }
  }
}
