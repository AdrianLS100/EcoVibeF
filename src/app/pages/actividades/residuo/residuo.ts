import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import { Residuo} from '../../../models/residuo-model';
import { ResiduoService} from '../../../services/residuo-service';
import { RegistroStateService} from '../../../services/registro-state';

@Component({
  selector: 'app-residuo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './residuo.html',
  styleUrls: ['./residuo.css']
})
export class ResiduoComponent implements OnInit {

  private residuoService = inject(ResiduoService);
  private router = inject(Router);
  private registroState = inject(RegistroStateService);

  formData = {
    recycled: null as string | null,
    wasteAmount: null as number | null
  };

  private actividadId: number | null = null;

  ngOnInit(): void {
    this.actividadId = this.registroState.getActividadId();

    if (!this.actividadId) {
      console.error("No hay ID de actividad. Volviendo al inicio.");
      alert("Error: No se ha iniciado un registro. Volviendo al inicio.");

      // CORRECCIÓN DE TYPO: 'actividades' (plural)
      this.router.navigate(['/actividades/crear-actividad']);
    }
  }

  goBack() {
    // CORRECCIÓN DE TYPO: 'actividades' (plural)
    this.router.navigate(['/actividades/energia']);
  }

  onSubmit() {
    if (!this.actividadId) {
      console.error("Error crítico: El ID de la actividad desapareció.");
      return;
    }

    console.log('Formulario de Residuos enviado:', this.formData);

    const nuevoResiduo = new Residuo(
      'general',
      this.formData.wasteAmount ?? 0,
      this.formData.recycled === 'yes',
      this.actividadId
    );

    this.residuoService.crear(nuevoResiduo).subscribe({
      next: (respuesta) => {
        console.log('Registro de residuo guardado:', respuesta);
        alert('¡Registro de actividades finalizado con éxito!');

        this.router.navigate(['/actividades/resultado']);
      },
      error: (err) => {
        console.error('Error al guardar registro de residuo:', err);
        alert('Hubo un error al guardar, por favor revisa la consola.');
      }
    });
  }
}
