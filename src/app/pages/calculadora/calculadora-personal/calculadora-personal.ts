import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import Chart from 'chart.js/auto';
import { CalculadoraPersonal } from '../../../models/calculadora-model';
import { CalculadoraService } from '../../../services/calculadora-service';
import {LoginService} from '../../../services/login-service';
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

  empezar() {
    const userId = this.loginService.getUsuarioId();
    if (!userId) {
      alert("Error de sesión. Por favor, inicia sesión de nuevo.");
      this.router.navigate(['/login']);
      return;
    }
    this.formData.usuarioId = Number(userId);
    // ---

    this.currentStep = 1;
  }
  siguiente(i:number){ this.currentStep = i + 1; window.scrollTo(0,0); }
  atras(i:number){ this.currentStep = i - 1; window.scrollTo(0,0); }

  finalizar() {
    const tipos: string[] = [];
    Object.entries(this.reciclajeTipos).forEach(([k, v]) => { if (v) tipos.push(k); });
    this.formData.tiposReciclaje = tipos;

    this.currentStep = 6;
    this.isLoading = true;

    this.calculadoraService.calcular(this.formData).subscribe({
      next: (r) => {
        this.resultados = r;
        this.isLoading = false;

        // Espera a que Angular pinte el canvas y dibuja
        setTimeout(() => this.dibujarGrafica(), 0);
      },
      error: (e) => { console.error(e); this.isLoading = false; alert('Error al calcular'); }
    });
  }

  volverAlInicio(){
    this.formData = new CalculadoraPersonal();
    this.resultados = null;
    if (this.myChart) { this.myChart.destroy(); this.myChart = null; }
    this.currentStep = 0;
  }

  private dibujarGrafica(){
    if (!this.resultados || !this.myChartCanvas) return;

    // Asegura números (por si llegan como string)
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
