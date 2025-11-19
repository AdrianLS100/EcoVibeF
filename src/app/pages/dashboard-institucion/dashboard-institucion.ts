import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InstitucionService} from '../../services/institucion-service';
// Nota: Aunque usamos el servicio de institución, mapearemos los datos
// a un objeto genérico 'dashboardData' para que tu HTML funcione sin cambios.

@Component({
  selector: 'app-dashboard-institucion',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './dashboard-institucion.html',
  styleUrls: ['./dashboard-institucion.css']
})
export class DashboardInstitucionComponent implements OnInit {

  private instService = inject(InstitucionService);

  public isLoading = true;
  public errorMessage: string | null = null;

  // Este objeto coincidirá con lo que tu HTML espera:
  // {{ dashboardData.nombreFamilia }}, {{ dashboardData.huellaTotalFamiliaKg }}, etc.
  // Aunque sea una institución, usaremos estos nombres de propiedad para reutilizar tu HTML.
  public dashboardData: any = null;

  ngOnInit(): void {
    this.instService.getDashboard().subscribe({
      next: (res) => {
        // Mapeamos la respuesta del backend (InstitucionDashboard)
        // al formato que tu HTML familiar espera.
        this.dashboardData = {
          nombreFamilia: res.nombre, // En el HTML dice "Familia {{nombreFamilia}}"
          huellaTotalFamiliaKg: res.huellaTotalInstitucion,
          codigoInvitacion: res.codigoInvitacion,
          adminUsername: res.adminUsername,
          // Tu HTML espera una lista de usuarios, pero Institución devuelve un número total.
          // Para que no se rompa, creamos una lista ficticia o vacía.
          miembrosUsernames: [],

          // Dato extra que podrías usar:
          totalMiembros: res.totalMiembros
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = err.error?.message || "No se pudo cargar el dashboard.";
      }
    });
  }
}
