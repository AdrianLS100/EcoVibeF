export class Energia {
  id?: number;
  tipo: string;
  consumo: number;
  unidad: string;
  actividadId: number;

  constructor(tipo: string, consumo: number, unidad: string, actividadId: number) {
    this.tipo = tipo;
    this.consumo = consumo;
    this.unidad = unidad;
    this.actividadId = actividadId;
  }
}
