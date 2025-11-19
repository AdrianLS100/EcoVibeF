export class Ranking {
  rank: number;
  username: string;
  huellaKgCO2e: number;

  huellaTransporte: number;
  huellaEnergia: number;
  huellaAlimentacion: number;
  huellaResiduos: number;
}

export class RankingFamiliar {
  rank: number;
  nombreFamilia: string;
  cantidadMiembros: number;
  huellaTotalFamilia: number;
}
