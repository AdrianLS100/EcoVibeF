export class Familia {
  id: number;
  nombre: string;
  codigoInvitacion: string;
  adminUsername: string;
  miembrosUsernames: string[];
}

export class FamiliaCrearRequest {
  nombreFamilia: string;
}

export class FamiliaUnirseRequest {
  codigoInvitacion: string;
}
