import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { DashboardFamiliarComponent} from '../dashboard-familiar/dashboard-familiar';
import {Ranking} from '../../models/ranking-model';
import {RankingService} from '../../services/ranking-service';
import {DashboardInstitucionComponent} from '../dashboard-institucion/dashboard-institucion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DashboardFamiliarComponent,
    DashboardInstitucionComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  public loginService: LoginService = inject(LoginService);
  private rankingService = inject(RankingService);
  private router: Router = inject(Router);

  public userRole: string | null = null;

  public topRanking: Ranking[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.userRole = this.loginService.getRole();
    } else {
      this.userRole = 'ROLE_USER';
    }

    this.cargarRanking();
  }

  cargarRanking() {
    this.rankingService.getRanking(0, 3).subscribe({
      next: (data) => {
        this.topRanking = data;
        console.log("Top 3 Ranking cargado:", this.topRanking);
      },
      error: (err) => {
        console.error("No se pudo cargar el ranking en el home:", err);
      }
    });
  }

  getAvatar(username: string): string {
    // Si el usuario es uno de los ejemplos, usamos su foto
    if (username === 'Juan Torres') return 'assets/img/juan.jpeg';
    if (username === 'Fernando Ortiz') return 'assets/img/fernando.jpeg';
    if (username === 'Jeyson Orellano') return 'assets/img/jeyson.jpg';

    return 'assets/imagenes/user.jpg';
  }

  logout() {
    console.log("Cerrando sesión...");
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
