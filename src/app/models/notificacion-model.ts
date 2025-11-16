export class Notificacion {
  id: number;
  mensaje: string;
  leido: boolean;
  fechaCreacion: string;
  linkRuta: string;
}

export interface NotificacionResumen {
  unreadCount: number;
}
