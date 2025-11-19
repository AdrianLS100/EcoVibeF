import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoginService } from '../../services/login-service';
import { InstitucionService} from '../../services/institucion-service';
import { RegisterRequestDto } from '../../models/authrequest-model';
import { InstitucionCrearRequest} from '../../models/institucion-model';
import  {InstitucionUnirseRequest} from '../../models/institucion-model';

import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register-institucion',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput,
    MatButton, MatIcon, MatTabsModule, MatSelectModule
  ],
  templateUrl: './register-institucion.html',
  styleUrls: ['./register-institucion.css']
})
export class RegisterInstitucionComponent {

  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  private loginService: LoginService = inject(LoginService);
  private institucionService: InstitucionService = inject(InstitucionService);

  createForm: FormGroup;
  joinForm: FormGroup;

  errorMessage: string | null = null;
  joinErrorMessage: string | null = null;

  constructor() {
    this.createForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombreInst: ['', [Validators.required, Validators.minLength(3)]],
      tipoInst: ['', Validators.required]
    });

    this.joinForm = this.fb.group({
      usernameJoin: ['', [Validators.required, Validators.minLength(4)]],
      emailJoin: ['', [Validators.required, Validators.email]],
      passwordJoin: ['', [Validators.required, Validators.minLength(6)]],
      codigoInvitacion: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onCreate() {
    this.errorMessage = null;
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const regRequest: RegisterRequestDto = {
      username: this.createForm.value.username,
      email: this.createForm.value.email,
      password: this.createForm.value.password
    };

    this.loginService.register(regRequest).subscribe({
      next: () => {
        this.loginService.login({
          username: regRequest.username,
          password: regRequest.password
        }).subscribe({
          next: () => {
            const instRequest: InstitucionCrearRequest = {
              nombre: this.createForm.value.nombreInst,
              tipo: this.createForm.value.tipoInst
            };

            this.institucionService.crear(instRequest).subscribe({
              next: (inst) => {
                localStorage.setItem('rol', 'ROLE_INSTITUCION');
                alert(`¡Institución "${inst.nombre}" creada!\nCódigo de invitación: ${inst.codigoInvitacion}`);
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

  onJoin() {
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
      next: () => {
        this.loginService.login({
          username: regRequest.username,
          password: regRequest.password
        }).subscribe({
          next: () => {
            const joinRequest: InstitucionUnirseRequest = {
              codigoInvitacion: this.joinForm.value.codigoInvitacion
            };

            this.institucionService.unirse(joinRequest).subscribe({
              next: (inst) => {
                localStorage.setItem('rol', 'ROLE_INSTITUCION');
                alert(`¡Te has unido a "${inst.nombre}" exitosamente!`);
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

  private handleError(err: any, type: 'create' | 'join') {
    console.error(`Error en flujo institución (${type}):`, err);
    let msg = "Ocurrió un error inesperado.";
    if (typeof err.error === 'string') msg = err.error;
    else if (err.error?.message) msg = err.error.message;

    if (type === 'create') this.errorMessage = msg;
    else this.joinErrorMessage = msg;
  }
}
