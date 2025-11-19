import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProfileService} from '../../services/profile-service';
import { Profile} from '../../models/profile-model';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent} from '../../components/header/header';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, HeaderComponent,
    MatTabsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  private profileService = inject(ProfileService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public isLoading = true;
  public profile: Profile | null = null;
  public passwordForm: FormGroup;

  public successMessage: string | null = null;
  public errorMessage: string | null = null;

  constructor() {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar el perfil:", err);
        this.isLoading = false;
        alert("No se pudo cargar tu perfil. ¿Has iniciado sesión?");
        this.router.navigate(['/login']);
      }
    });
  }

  onChangePassword() {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.profileService.changePassword(this.passwordForm.value).subscribe({
      next: (response: any) => {
        this.successMessage = response.message || "¡Contraseña actualizada!";
        this.passwordForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "No se pudo cambiar la contraseña.";
      }
    });
  }
}
