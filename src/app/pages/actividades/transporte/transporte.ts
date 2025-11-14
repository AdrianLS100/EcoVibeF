import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';

import { Transporte} from '../../../models/transporte-model';
import { TransporteService} from '../../../services/transporte-service';
import { RegistroStateService} from '../../../services/registro-state';

@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './transporte.html',
  styleUrls: ['./transporte.css']
})
export class TransporteComponent implements OnInit {

  private transporteService = inject(TransporteService);
  private router = inject(Router);
  private registroState = inject(RegistroStateService);

  formData = {
    distance: null as number | null,
    fuel: null as string | null,
    fuelConsumption: null as number | null,
    flightDistance: null as number | null
  };

  // 5. Objeto para los checkboxes (más fácil de enlazar que un Map)
  mediosSeleccionados = {
    auto: false,
    moto: false,
    public: false,
    bike: false,
    walk: false,
    plane: false
  };

  private actividadId: number | null = null;

  ngOnInit(): void {
    this.actividadId = this.registroState.getActividadId();

    if (!this.actividadId) {
      console.error("No hay ID de actividad. Volviendo al inicio.");
      alert("Error: No se ha iniciado un registro. Volviendo al inicio.");
      this.router.navigate(['/actividades/crear-actividad']);
    }
  }


  onSubmit() {
    if (!this.actividadId) {
      console.error("Error crítico: El ID de la actividad desapareció.");
      return;
    }

    console.log('Formulario de Transporte enviado:', this.formData, this.mediosSeleccionados);

    const apiCalls: Observable<Transporte>[] = [];
    const ACTIVIDAD_ID = this.actividadId;

    if (this.mediosSeleccionados.auto) {
      const trans = new Transporte('auto', ACTIVIDAD_ID, this.formData.distance ?? 0, this.formData.fuel ?? undefined, this.formData.fuelConsumption ?? undefined);
      apiCalls.push(this.transporteService.crear(trans));
    }
    if (this.mediosSeleccionados.moto) {
      const trans = new Transporte('moto', ACTIVIDAD_ID, this.formData.distance ?? 0, this.formData.fuel ?? undefined, this.formData.fuelConsumption ?? undefined);
      apiCalls.push(this.transporteService.crear(trans));
    }
    if (this.mediosSeleccionados.plane) {
      const trans = new Transporte('avion', ACTIVIDAD_ID, undefined, undefined, undefined, this.formData.flightDistance ?? 0);
      apiCalls.push(this.transporteService.crear(trans));
    }
    if (this.mediosSeleccionados.public) {
      apiCalls.push(this.transporteService.crear(new Transporte('transporte publico', ACTIVIDAD_ID)));
    }
    if (this.mediosSeleccionados.bike) {
      apiCalls.push(this.transporteService.crear(new Transporte('bicicleta', ACTIVIDAD_ID)));
    }
    if (this.mediosSeleccionados.walk) {
      apiCalls.push(this.transporteService.crear(new Transporte('a pie', ACTIVIDAD_ID)));
    }

    const tieneSeleccion = Object.values(this.mediosSeleccionados).some(v => v === true);
    if (!tieneSeleccion) {
      console.warn('No se seleccionó ningún transporte. Pasando al siguiente paso.');
      this.router.navigate(['/actividades/energia']);
      return;
    }

    forkJoin(apiCalls).subscribe({
      next: (respuestas) => {
        console.log('Registros de transporte guardados:', respuestas);
        this.router.navigate(['/actividades/energia']);
      },
      error: (err) => {
        console.error('Error al guardar registros de transporte:', err);
        alert('Hubo un error al guardar, por favor revisa la consola.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/actividades/crear-actividad']);
  }
}
