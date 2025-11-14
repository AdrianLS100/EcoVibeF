import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroStateService {

  // Aquí guardaremos el ID de la actividad actual
  private actividadActualId: number | null = null;

  constructor() { }

  setActividadId(id: number) {
    this.actividadActualId = id;
    console.log(`ID de actividad guardado: ${id}`);
  }

  getActividadId(): number | null {
    return this.actividadActualId;
  }

  // Limpiamos el ID cuando el usuario termina
  limpiar() {
    this.actividadActualId = null;
  }
}
