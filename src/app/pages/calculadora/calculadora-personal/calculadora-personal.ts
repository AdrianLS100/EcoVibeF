import { Component, inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js/auto';
import { CalculadoraPersonal } from '../../../models/calculadora-model';
import { CalculadoraService } from '../../../services/calculadora-service';
import { LoginService } from '../../../services/login-service';
import { HeaderComponent } from '../../../components/header/header';

@Component({
  selector: 'app-calculadora-personal',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './calculadora-personal.html',
  styleUrls: ['./calculadora-personal.css']
})
export class CalculadoraPersonalComponent {

  private router = inject(Router);
  private calculadoraService = inject(CalculadoraService);
  private loginService = inject(LoginService);
  private cdr = inject(ChangeDetectorRef);

  public currentStep = 0;
  public formData = new CalculadoraPersonal();
  public reciclajeTipos = { vidrio:false, plastico:false, aluminio:false, organicos:false, papel:false, ninguno:false };
  public isLoading = false;
  public resultados: CalculadoraPersonal | null = null;

  private myChart: any = null;

  @ViewChild('myChart')
  set myChartCanvas(canvasRef: ElementRef<HTMLCanvasElement>) {
    if (canvasRef && this.resultados) {
      setTimeout(() => this.dibujarGrafica(canvasRef.nativeElement), 0);
    }
  }

  constructor() {
    Chart.register(...registerables);
  }

  empezar() {
    const userId = this.loginService.getUsuarioId();
    if (!userId) {
      alert("Error de sesión. Por favor, inicia sesión de nuevo.");
      this.router.navigate(['/login']);
      return;
    }
    this.formData.usuarioId = Number(userId);
    this.currentStep = 1;
  }

  siguiente(pasoActual: number) {
    this.currentStep = pasoActual + 1;
    window.scrollTo(0, 0);
  }

  atras(pasoActual: number) {
    this.currentStep = pasoActual - 1;
    window.scrollTo(0, 0);
  }

  finalizar() {
    const tipos: string[] = [];
    if (this.reciclajeTipos.vidrio) tipos.push('vidrio');
    if (this.reciclajeTipos.plastico) tipos.push('plastico');
    if (this.reciclajeTipos.aluminio) tipos.push('aluminio');
    if (this.reciclajeTipos.organicos) tipos.push('organicos');
    if (this.reciclajeTipos.papel) tipos.push('papel');
    if (this.reciclajeTipos.ninguno) tipos.push('ninguno');
    this.formData.tiposReciclaje = tipos;

    this.currentStep = 6;
    this.isLoading = true;
    window.scrollTo(0, 0);

    this.calculadoraService.calcular(this.formData).subscribe({
      next: (resultadosCalculados) => {
        console.log("Respuesta del Backend:", resultadosCalculados);

        this.resultados = resultadosCalculados;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error al calcular:", err);
        alert("Hubo un error al calcular.");
        this.isLoading = false;
      }
    });
  }

  volverAlInicio() {
    const rol = localStorage.getItem('rol');
    if (rol === 'ROLE_FAMILIAR') {
      alert("¡Excelente! Tu huella individual se ha sumado al total de tu familia.");
    } else if (rol === 'ROLE_INSTITUCION') {
      alert("¡Gracias! Tu aporte se ha sumado a la huella de tu institución.");
    } else {
      console.log("Huella personal guardada.");
    }

    this.router.navigate(['/home']);
    this.formData = new CalculadoraPersonal();
    this.resultados = null;
    if (this.myChart) {
      this.myChart.destroy();
      this.myChart = null;
    }
    this.currentStep = 0;
  }

  private dibujarGrafica(ctx: HTMLCanvasElement) {
    if (!this.resultados) return;

    if (this.myChart) this.myChart.destroy();

    this.myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Transporte', 'Energía', 'Alimentación', 'Residuos'],
        datasets: [{
          data: [
            this.resultados.totalTransporteTon,
            this.resultados.totalEnergiaTon,
            this.resultados.totalAlimentacionTon,
            this.resultados.totalResiduosTon
          ],
          backgroundColor: ['#CCEAEF', '#FFE6C8', '#DFFFC2', '#F0E6FF'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
