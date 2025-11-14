export class Residuo {
  id?: number;
  tipo: string;
  pesoKg: number;
  reciclaje: boolean;
  actividadId: number;

  constructor(tipo: string, pesoKg: number, reciclaje: boolean, actividadId: number) {
    this.tipo = tipo;
    this.pesoKg = pesoKg;
    this.reciclaje = reciclaje;
    this.actividadId = actividadId;
  }
}
