import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { ActividadesDiariasService} from '../../../services/actividadesdiarias-service';
import { RegistroStateService} from '../../../services/registro-state';

@Component({
  selector: 'app-crear-actividad',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './crear-actividad.html',
  styleUrls: ['./crear-actividad.css']
})
export class CrearActividadComponent {

  private router = inject(Router);
  private actividadesService = inject(ActividadesDiariasService);
  private registroState = inject(RegistroStateService);

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
    const USUARIO_ID = 1; // ID de prueba

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
        console.error('Error al crear la hoja de actividad:', err);
        alert('No se pudo iniciar el registro, actividad ya registrada en esta fecha.');
      }
    });
  }
}
