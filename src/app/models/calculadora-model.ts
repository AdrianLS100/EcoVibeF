export class CalculadoraPersonal {
  usuarioId?: number;

  horasBusSemana: number = 0;
  horasTrenSemana: number = 0;
  horasMetropolitanoSemana: number = 0;
  horasAutoSemana: number = 0;
  kwhMes: number = 0;
  balonesGlp10kgMes: number = 0;
  diasCarnePorSemana: number = 0;
  bolsas5L: number = 0;
  bolsas10L: number = 0;
  bolsas20L: number = 0;
  tiposReciclaje: string[] = [];

  totalTransporteTon?: number;
  totalEnergiaTon?: number;
  totalAlimentacionTon?: number;
  totalResiduosTon?: number;

  totalKgCO2e?: number;
}
