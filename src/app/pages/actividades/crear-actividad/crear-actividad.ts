import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { ActividadesDiariasService} from '../../../services/actividadesdiarias-service';
import { RegistroStateService} from '../../../services/registro-state';
import { LoginService } from '../../../services/login-service';
import {HeaderComponent} from '../../../components/header/header';

@Component({
  selector: 'app-crear-actividad',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './crear-actividad.html',
  styleUrls: ['./crear-actividad.css']
})
export class CrearActividadComponent {

  private router = inject(Router);
  private actividadesService = inject(ActividadesDiariasService);
  private registroState = inject(RegistroStateService);
  private loginService = inject(LoginService);

  formData = {
    descripcion: '',
    fecha: ''
  };

  minDate: string;

  constructor() {
    const today = new Date().toISOString().split('T')[0];
    this.formData.fecha = today;
    this.minDate = today;
  }

  onSubmit() {
    const usuarioIdString = this.loginService.getUsuarioId();

    if (!usuarioIdString) {
      alert("Error: No se encontró ID de usuario. Por favor, inicia sesión de nuevo.");
      this.router.navigate(['/login']);
      return;
    }

    const USUARIO_ID = Number(usuarioIdString);

    if (!this.formData.fecha || !this.formData.descripcion) {
      alert('Por favor, completa la descripción y la fecha.');
      return;
    }

    console.log(`Iniciando registro para usuario ${USUARIO_ID} en fecha ${this.formData.fecha} con desc: ${this.formData.descripcion}`);

    this.actividadesService.crearActividad(USUARIO_ID, this.formData.fecha, this.formData.descripcion).subscribe({
      next: (actividadCreada) => {
        this.registroState.setActividadId(actividadCreada.id!);
        this.router.navigate(['/actividades/transporte']);
      },
      error: (err) => {
        if (err.status === 409) {
          alert('¡Error! Ya has registrado una actividad para esta fecha. Por favor, elige otro día.');
        } else {
          console.error('Error al crear la hoja de actividad:', err);
          alert('No se pudo iniciar el registro.');
        }
      }
    });
  }
}
