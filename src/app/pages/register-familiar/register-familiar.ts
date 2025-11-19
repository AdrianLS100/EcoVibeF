import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { FamiliaService} from '../../services/familia-service';
import { RegisterRequestDto } from '../../models/authrequest-model';

import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-register-familiar',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
     MatFormField, MatLabel, MatInput,
    MatButton, MatIcon, MatError, MatTabsModule
  ],
  templateUrl: './register-familiar.html',
  styleUrls: ['../login/login.css']
})
export class RegisterFamiliarComponent {

  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  private loginService: LoginService = inject(LoginService);
  private familiaService: FamiliaService = inject(FamiliaService);

  registerForm: FormGroup;
  joinForm: FormGroup;

  errorMessage: string | null = null;
  joinErrorMessage: string | null = null;

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombreFamilia: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.joinForm = this.fb.group({
      usernameJoin: ['', [Validators.required, Validators.minLength(4)]],
      emailJoin: ['', [Validators.required, Validators.email]],
      passwordJoin: ['', [Validators.required, Validators.minLength(6)]],
      codigoInvitacion: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onRegisterAndCreate() {
    this.errorMessage = null;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const regRequest: RegisterRequestDto = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.loginService.register(regRequest).subscribe({
      next: (regResponse) => {
        this.loginService.login({
          username: regRequest.username,
          password: regRequest.password
        }).subscribe({
          next: (loginResponse) => {
            this.familiaService.crear({ nombreFamilia: this.registerForm.value.nombreFamilia }).subscribe({
              next: (familia) => {

                localStorage.setItem('rol', 'ROLE_FAMILIAR');
                // ---

                alert(`¡Familia "${familia.nombre}" creada con éxito! Tu código es: ${familia.codigoInvitacion}\n\nSerás redirigido al Home.`);
                this.router.navigate(['/home']);
              },
              error: (err) => this.handleError(err, 'create')
            });
          },
          error: (err) => this.handleError(err, 'create')
        });
      },
      error: (err) => this.handleError(err, 'create')
    });
  }

  onRegisterAndJoin() {
    this.joinErrorMessage = null;
    if (this.joinForm.invalid) {
      this.joinForm.markAllAsTouched();
      return;
    }

    const regRequest: RegisterRequestDto = {
      username: this.joinForm.value.usernameJoin,
      email: this.joinForm.value.emailJoin,
      password: this.joinForm.value.passwordJoin
    };

    this.loginService.register(regRequest).subscribe({
      next: (regResponse) => {
        this.loginService.login({
          username: regRequest.username,
          password: regRequest.password
        }).subscribe({
          next: (loginResponse) => {
            this.familiaService.unirse({ codigoInvitacion: this.joinForm.value.codigoInvitacion }).subscribe({
              next: (familia) => {

                localStorage.setItem('rol', 'ROLE_FAMILIAR');

                alert(`¡Te has unido a la familia "${familia.nombre}" con éxito!\n\nSerás redirigido al Home.`);
                this.router.navigate(['/home']);
              },
              error: (err) => this.handleError(err, 'join')
            });
          },
          error: (err) => this.handleError(err, 'join')
        });
      },
      error: (err) => this.handleError(err, 'join')
    });
  }

  // Helper para manejar errores
  private handleError(err: any, type: 'create' | 'join') {
    console.error(`Error en el flujo familiar (${type}):`, err);
    let message = "Ocurrió un error inesperado.";
    if (typeof err.error === 'string') {
      message = err.error;
    } else if (err.error && err.error.message) {
      message = err.error.message;
    }

    if (type === 'create') this.errorMessage = message;
    else this.joinErrorMessage = message;
  }
}
