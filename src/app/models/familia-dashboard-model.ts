export class ActividadReciente {
  username: string;
  descripcion: string;
  fecha: string; // (Será un string de fecha)
}

export class FamiliaDashboard {
  nombreFamilia: string;
  codigoInvitacion: string;
  adminUsername: string;
  miembrosUsernames: string[];
  huellaTotalFamiliaKg: number;
  feedActividades: ActividadReciente[];
}
