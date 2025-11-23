import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { RegistroStateService} from '../../../services/registro-state';
import { ReporteService} from '../../../services/reporte-service';
import { GamificacionService } from '../../../services/gamificacion-service';
import { LoginService } from '../../../services/login-service';

import { Reporte } from '../../../models/reporte-model';
import { Chart, registerables } from 'chart.js/auto';
import {HeaderComponent} from '../../../components/header/header';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './resultado.html',
  styleUrls: ['./resultado.css']
})
export class ResultadoComponent implements OnInit {

  private router = inject(Router);
  private registroState = inject(RegistroStateService);
  private reporteService = inject(ReporteService);
  private gamificacionService = inject(GamificacionService);
  private loginService = inject(LoginService);

  public reporte: Reporte | null = null;
  public isLoading = true;
  public puntosGanados: number = 0;

  private actividadId: number | null = null;
  private myChart: Chart | null = null;
  private chartCanvasRef: ElementRef<HTMLCanvasElement> | null = null;

  @ViewChild('myChartCanvas')
  set myChartCanvas(canvasRef: ElementRef<HTMLCanvasElement>) {
    if (canvasRef) {
      this.chartCanvasRef = canvasRef;
      this.intentarCrearGrafica();
    }
  }

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.actividadId = this.registroState.getActividadId();

    if (!this.actividadId) {
      console.error("No hay ID de actividad. Volviendo al inicio.");
      this.router.navigate(['/actividades/crear-actividad']);
      return;
    }

    this.reporteService.obtenerReporte(this.actividadId).subscribe({
      next: (datosDelReporte) => {
        console.log("Reporte recibido:", datosDelReporte);
        this.reporte = datosDelReporte;
        this.isLoading = false;

        this.otorgarPuntosPorActividad();

        this.intentarCrearGrafica();

        this.registroState.limpiar();
      },
      error: (err) => {
        console.error("Error al obtener el reporte:", err);
        this.isLoading = false;
        this.registroState.limpiar();
        alert("Hubo un error al calcular tu resultado.");
      }
    });
  }

  otorgarPuntosPorActividad() {
    const userIdString = this.loginService.getUsuarioId();

    if (!userIdString || !this.actividadId) {
      console.error("No se pudo otorgar puntos: Falta Usuario ID o Actividad ID");
      return;
    }

    const USUARIO_ID = Number(userIdString);

    this.gamificacionService.otorgarPuntosPorActividad(this.actividadId, USUARIO_ID).subscribe({
      next: (estado) => {
        console.log(`Puntos otorgados: ${estado.puntosGanados}. Nuevo total: ${estado.puntosTotales}`);
        this.puntosGanados = estado.puntosGanados;
      },
      error: (err) => {
        console.error("Error al otorgar puntos:", err);
      }
    });
  }

  intentarCrearGrafica() {
    if (this.reporte && this.chartCanvasRef) {
      this.crearGrafica(this.chartCanvasRef.nativeElement);
    }
  }

  crearGrafica(ctx: HTMLCanvasElement) {
    if (!this.reporte) return;
    if (this.myChart) this.myChart.destroy();

    this.myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Transporte', 'Energía', 'Consumo'],
        datasets: [{
          data: [
            this.reporte.transporteKgCO2e,
            this.reporte.energiaKgCO2e,
            this.reporte.residuosKgCO2e
          ],
          backgroundColor: ['#CCEAEF', '#FFE6C8', '#DFFFC2'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
