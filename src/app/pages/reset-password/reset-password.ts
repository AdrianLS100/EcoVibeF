import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatFormField, MatLabel, MatInput, MatButton, MatIcon, MatError
  ],
  templateUrl: './reset-password.html',

  styleUrls: ['./reset-password.css']
})
export class ResetPasswordComponent implements OnInit {

  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private fb: FormBuilder = inject(FormBuilder);
  private loginService: LoginService = inject(LoginService);

  resetForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  token: string | null = null;

  constructor() {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.errorMessage = "Token de reseteo no encontrado. Por favor, solicita el enlace de nuevo.";
    }
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    if (!this.token) {
      this.errorMessage = "Token inválido.";
      return;
    }

    const newPassword = this.resetForm.value.newPassword;

    this.loginService.resetPassword(this.token, newPassword).subscribe({
      next: (response: any) => {
        this.successMessage = response.message || "¡Contraseña cambiada con éxito!";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Token inválido o expirado. Por favor, solicita uno nuevo.";
      }
    });
  }
}
