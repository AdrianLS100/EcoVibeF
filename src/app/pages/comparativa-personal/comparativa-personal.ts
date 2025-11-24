import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComparativaService} from '../../services/comparativa-service';
import { HeaderComponent} from '../../components/header/header';
import { Chart, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-comparativa-personal',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './comparativa-personal.html',
  styleUrls: ['./comparativa-personal.css']
})
export class ComparativaPersonalComponent implements OnInit {

  private compService = inject(ComparativaService);
  public isLoading = true;
  private chart: Chart | null = null;

  @ViewChild('barCanvas')
  set canvasRef(ref: ElementRef<HTMLCanvasElement>) {
    if (ref) this.crearGrafica(ref.nativeElement);
  }

  protected datos: any = null;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.compService.getComparativaPersonal().subscribe({
      next: (res) => {
        this.datos = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  crearGrafica(ctx: HTMLCanvasElement) {
    if (!this.datos) return;
    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tu Huella', 'Promedio Comunidad', 'Meta (El Mejor)'],
        datasets: [{
          label: 'kg CO2e / año',
          data: [this.datos.tuHuella, this.datos.promedioComunidad, this.datos.mejorHuella],
          backgroundColor: [
            '#0d6efd',
            '#6c757d',
            '#198754'
          ],
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}
