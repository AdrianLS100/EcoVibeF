import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ActividadesDiariasService} from '../../../services/actividadesdiarias-service';
import { RegistroStateService} from '../../../services/registro-state';
import { LoginService } from '../../../services/login-service';
import {HeaderComponent} from '../../../components/header/header';

@Component({
  selector: 'app-crear-actividad',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent],
  templateUrl: './crear-actividad.html',
  styleUrls: ['./crear-actividad.css']
})
export class CrearActividadComponent implements OnInit {

  private router = inject(Router);
  private actividadesService = inject(ActividadesDiariasService);
  private registroState = inject(RegistroStateService);
  private loginService = inject(LoginService);

  formData = {
    descripcion: '',
    fecha: ''
  };

  minDate: string;

  public titulo: string = "Registro de Actividad Personal";
  public subtitulo: string = "Mide tu impacto diario individual.";
  public icono: string = "fa-user";

  constructor() {
    const today = new Date().toISOString().split('T')[0];
    this.formData.fecha = today;
    this.minDate = today;
  }

  ngOnInit(): void {
    const rol = this.loginService.getRole();

    if (rol === 'ROLE_FAMILIAR') {
      this.titulo = "Registro de Actividad Familiar";
      this.subtitulo = "Tu aporte se sumará a la huella de tu hogar.";
      this.icono = "fa-home";
    } else if (rol === 'ROLE_INSTITUCION') {
      this.titulo = "Aporte a la Institución";
      this.subtitulo = "Registra tu actividad para la meta colectiva.";
      this.icono = "fa-building";
    }
  }

  onSubmit() {
    const userIdString = this.loginService.getUsuarioId();

    if (!userIdString) {
      alert("Error: No se encontró ID de usuario. Por favor, inicia sesión de nuevo.");
      this.router.navigate(['/login']);
      return;
    }

    const USUARIO_ID = Number(userIdString);

    if (!this.formData.fecha || !this.formData.descripcion) {
      alert('Por favor, completa la descripción y la fecha.');
      return;
    }

    console.log(`Registrando para usuario ${USUARIO_ID} (${this.titulo})`);

    this.actividadesService.crearActividad(USUARIO_ID, this.formData.fecha, this.formData.descripcion).subscribe({
      next: (actividadCreada) => {
        this.registroState.setActividadId(actividadCreada.id!);
        this.router.navigate(['/actividades/transporte']);
      },
      error: (err) => {
        if (err.status === 409) {
          alert('¡Atención! Ya has registrado una actividad para esta fecha. Intenta con otro día.');
        } else {
          console.error('Error al crear la hoja de actividad:', err);
          alert('No se pudo iniciar el registro. Intente nuevamente.');
        }
      }
    });
  }
}
