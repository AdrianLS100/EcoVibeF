export class FactoresEmision {
  id: number;
  categoria: string;
  subcategoria: string;
  unidadBase: string;
  factorKgco2ePerUnidad: number;
  fuente?: string; // Sigue siendo opcional, lo cual está bien
  vigente: boolean;
}
