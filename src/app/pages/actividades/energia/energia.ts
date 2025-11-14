import { Component, OnInit, inject } from '@angular/core'; // 1. Importar OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';

import { Energia} from '../../../models/energia-model';
import { EnergiaService} from '../../../services/energia-service';
import { RegistroStateService} from '../../../services/registro-state';

@Component({
  selector: 'app-energia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './energia.html',
  styleUrls: ['./energia.css']
})
export class EnergiaComponent implements OnInit {

  private energiaService = inject(EnergiaService);
  private router = inject(Router);
  private registroState = inject(RegistroStateService);

  formData = {
    electricity: null as number | null,
    heating: 'no' as string,
    heatingTime: null as number | null,
    electronics: null as string | null
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

  goBack() {
    this.router.navigate(['/actividades/transporte']);
  }

  onSubmit() {
    if (!this.actividadId) {
      console.error("Error crítico: El ID de la actividad desapareció.");
      return;
    }

    console.log('Formulario de Energía enviado:', this.formData);

    const apiCalls: Observable<Energia>[] = [];
    const ACTIVIDAD_ID = this.actividadId;

    if (this.formData.electricity) {
      const energiaElec = new Energia('electricidad', this.formData.electricity, 'kWh', ACTIVIDAD_ID);
      apiCalls.push(this.energiaService.crear(energiaElec));
    }

    if (this.formData.heating === 'yes' && this.formData.heatingTime) {
      const energiaCalef = new Energia('calefaccion', this.formData.heatingTime, 'horas', ACTIVIDAD_ID);
      apiCalls.push(this.energiaService.crear(energiaCalef));
    }

    if (this.formData.electronics) {
      const energiaDisp = new Energia('dispositivos', 1, this.formData.electronics, ACTIVIDAD_ID);
      apiCalls.push(this.energiaService.crear(energiaDisp));
    }

    if (apiCalls.length === 0) {
      console.warn('No se ingresaron datos de energía. Pasando al siguiente paso.');
      this.router.navigate(['/actividades/residuo']);
      return;
    }

    forkJoin(apiCalls).subscribe({
      next: (respuestas) => {
        console.log('Registros de energía guardados:', respuestas);
        this.router.navigate(['/actividades/residuo']);
      },
      error: (err) => {
        console.error('Error al guardar registros de energía:', err);
        alert('Hubo un error al guardar energía, por favor revisa la consola.');
      }
    });
  }
}
