import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login-service';
// (Importa tus componentes de Material)
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatFormField, MatLabel, MatInput, MatButton, MatIcon, MatError
  ],
  templateUrl: './forgot-password.html',

  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {

  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  private loginService: LoginService = inject(LoginService);

  forgotForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.loginService.forgotPassword(this.forgotForm.value.email).subscribe({
      next: (response: any) => {
        this.successMessage = response.message || "Si existe una cuenta, se ha enviado un correo.";
      },
      error: (err) => {
        this.errorMessage = "Ocurrió un error en el servidor. Intente más tarde.";
      }
    });
  }
}
