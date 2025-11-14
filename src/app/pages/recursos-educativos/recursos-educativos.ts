import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { RecursoService, Page} from '../../services/recursoeducativo-service';
import { Recurso} from '../../models/recurso-model';

@Component({
  selector: 'app-recursos-educativos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './recursos-educativos.html',
  styleUrls: ['./recursos-educativos.css']
})
export class RecursosEducativosComponent implements OnInit {

  private recursoService = inject(RecursoService);

  public recursos: Recurso[] = [];
  public isLoading = true;
  public pageInfo: Page<any> | null = null;

  // Para los filtros
  public filtroTipo: string = '';
  public filtroBusqueda: string = '';

  ngOnInit(): void {
    this.cargarRecursos();
  }

  cargarRecursos(page: number = 0) {
    this.isLoading = true;
    const tipo = this.filtroTipo === '' ? undefined : this.filtroTipo;
    const q = this.filtroBusqueda === '' ? undefined : this.filtroBusqueda;

    this.recursoService.getRecursos(tipo, q, page).subscribe({
      next: (pagina) => {
        this.recursos = pagina.content;
        this.pageInfo = pagina;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar recursos:", err);
        this.isLoading = false;
        alert("No se pudieron cargar los recursos.");
      }
    });
  }


  filtrarPorTipo(tipo: string) {
    this.filtroTipo = tipo;
    this.cargarRecursos(0);
  }

  buscar() {
    this.cargarRecursos(0);
  }


  irAPagina(page: number) {
    if (this.pageInfo && page >= 0 && page < this.pageInfo.totalPages) {
      this.cargarRecursos(page);
    }
  }
}
