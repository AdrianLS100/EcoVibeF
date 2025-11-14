export class CalculadoraPersonal {
  horasBusSemana?: number;
  horasTrenSemana?: number;
  horasMetropolitanoSemana?: number;
  horasAutoSemana?: number;

  kwhMes?: number;
  balonesGlp10kgMes?: number;

  diasCarnePorSemana?: number;

  bolsas5L?: number;
  bolsas10L?: number;
  bolsas20L?: number;
  tiposReciclaje?: string[];

  // Salidas (Resultados)
  totalTransporteTon?: number;
  totalEnergiaTon?: number;
  totalAlimentacionTon?: number;
  totalResiduosTon?: number;
  totalKgCO2e?: number;
}
