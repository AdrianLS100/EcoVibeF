export class Institucion {
  id: number;
  nombre: string;
  tipo: string;
  codigoInvitacion: string;
}

export class InstitucionDashboard {
  nombre: string;
  tipo: string;
  codigoInvitacion: string;
  adminUsername: string;
  totalMiembros: number;
  huellaTotalInstitucion: number;
  feedActividades: any[];
}

export class InstitucionCrearRequest {
  nombre: string;
  tipo: string;
}

export class InstitucionUnirseRequest {
  codigoInvitacion: string;
}
