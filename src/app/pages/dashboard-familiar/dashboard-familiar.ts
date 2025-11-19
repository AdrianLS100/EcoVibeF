import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamiliaService} from '../../services/familia-service';
import { FamiliaDashboard} from '../../models/familia-dashboard-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-familiar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard-familiar.html',
  styleUrls: ['./dashboard-familiar.css']
})
export class DashboardFamiliarComponent implements OnInit {

  private familiaService = inject(FamiliaService);

  public isLoading = true;
  public dashboardData: FamiliaDashboard | null = null;
  public errorMessage: string | null = null;

  ngOnInit(): void {
    this.familiaService.getMiDashboard().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar dashboard familiar:", err);
        this.isLoading = false;
        this.errorMessage = err.error?.message || "No se pudo cargar el dashboard.";
      }
    });
  }
}
