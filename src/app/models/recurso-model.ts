export class Recurso {
  id: number;
  titulo: string;
  tipo: 'ARTICULO' | 'VIDEO' | 'PODCAST'; // Coincide con el Enum del backend
  url: string;
  tema: string;
  fuente: string;
}
