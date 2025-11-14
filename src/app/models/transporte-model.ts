export class Transporte {
  id?: number;
  medio: string;
  distanciaKm?: number;
  tipoCombustible?: string;
  consumoLitros100km?: number;
  kilometrosVolados?: number;
  actividadId: number;

  constructor(
    medio: string,
    actividadId: number,
    distanciaKm?: number,
    tipoCombustible?: string,
    consumoLitros100km?: number,
    kilometrosVolados?: number
  ) {
    this.medio = medio;
    this.actividadId = actividadId;
    this.distanciaKm = distanciaKm;
    this.tipoCombustible = tipoCombustible;
    this.consumoLitros100km = consumoLitros100km;
    this.kilometrosVolados = kilometrosVolados;
  }
}
