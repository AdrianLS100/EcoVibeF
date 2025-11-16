import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroStateService {

  private actividadActualId: number | null = null;

  constructor() { }

  setActividadId(id: number) {
    this.actividadActualId = id;
    console.log(`ID de actividad guardado: ${id}`);
  }

  getActividadId(): number | null {
    return this.actividadActualId;
  }

  limpiar() {
    this.actividadActualId = null;
  }
}
