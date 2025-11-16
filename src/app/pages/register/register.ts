import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LoginService } from '../../services/login-service';
import { RegisterRequestDto } from '../../models/authrequest-model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCard, MatCardTitle, MatCardContent,
    MatFormField, MatLabel, MatInput, MatButton, MatIcon, MatError
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  private loginService: LoginService = inject(LoginService);

  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.errorMessage = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const request: RegisterRequestDto = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.loginService.register(request).subscribe({
      next: (response) => {
        console.log("Registro exitoso:", response);
        alert("¡Registro exitoso! Por favor, inicia sesión.");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Error en el registro:", err);

        if (typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = "No se pudo completar el registro. Intente más tarde.";
        }
      }
    });
  }
}
