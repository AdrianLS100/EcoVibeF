export class ActividadesDiarias {
  id?: number; // Es opcional, el backend lo asignará
  fecha: string;
  usuarioId: number;
  descripcion: string;

  constructor(fecha: string, usuarioId: number, descripcion: string) {
    this.fecha = fecha;
    this.usuarioId = usuarioId;
    this.descripcion = descripcion;
  }
}
