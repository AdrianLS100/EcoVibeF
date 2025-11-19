import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import Chart, {registerables} from 'chart.js/auto';
import { CalculadoraPersonal } from '../../../models/calculadora-model';
import { CalculadoraService } from '../../../services/calculadora-service';
import { LoginService} from '../../../services/login-service';
import {HeaderComponent} from '../../../components/header/header';

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

  public currentStep = 0;
  public formData = new CalculadoraPersonal();
  public reciclajeTipos = { vidrio:false, plastico:false, aluminio:false, organicos:false, papel:false, ninguno:false };
  public isLoading = false;
  public resultados: CalculadoraPersonal | null = null;

  @ViewChild('myChart') myChartCanvas?: ElementRef<HTMLCanvasElement>;
  private myChart: Chart | null = null;

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
    // Preparar tipos de reciclaje
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
        this.resultados = resultadosCalculados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al calcular la huella:", err);
        alert("Hubo un error al calcular: " + err.message);
        this.isLoading = false;
      }
    });
  }

  volverAlInicio() {
    const rol = this.loginService.getRole();

    if (rol === 'ROLE_FAMILIAR') {
      alert("¡Cálculo guardado! Tu huella se ha sumado al total de tu familia.");
      this.router.navigate(['/home']); // Va al Dashboard Familiar
    } else {
      // Si es ROLE_USER
      this.router.navigate(['/home']); // Va al Home Personal
    }

    this.formData = new CalculadoraPersonal();
    this.resultados = null;
    this.currentStep = 0;
  }

  private dibujarGrafica(){
    if (!this.resultados || !this.myChartCanvas) return;

    const data = [
      Number(this.resultados.totalTransporteTon ?? 0),
      Number(this.resultados.totalEnergiaTon ?? 0),
      Number(this.resultados.totalAlimentacionTon ?? 0),
      Number(this.resultados.totalResiduosTon ?? 0)
    ];

    if (this.myChart) this.myChart.destroy();

    this.myChart = new Chart(this.myChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Transporte', 'Energía', 'Alimentación', 'Residuos'],
        datasets: [{ data, backgroundColor: ['#CCEAEF','#FFE6C8','#DFFFC2','#F0E6FF'] }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
}
