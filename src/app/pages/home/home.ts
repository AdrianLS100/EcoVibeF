import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { DashboardFamiliarComponent} from '../dashboard-familiar/dashboard-familiar';
import {RankingService} from '../../services/ranking-service';
import {DashboardInstitucionComponent} from '../dashboard-institucion/dashboard-institucion';
import {Notificacion} from '../../models/notificacion-model';
import {NotificacionService} from '../../services/notificacion-service';

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
  private notificacionService = inject(NotificacionService);
  private router: Router = inject(Router);

  public showNotifications: boolean = false;

  public unreadCount: number = 0;
  public notificaciones: Notificacion[] = [];
  public isLoadingNotificaciones = false;

  public userRole: string | null = null;

  public topRanking: any[] = [];
  constructor() {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.userRole = this.loginService.getRole();
    } else {
      this.userRole = 'ROLE_USER';
    }
  }

  getRankingRoute(): string {
    if (this.userRole === 'ROLE_FAMILIAR') return '/ranking-familiar';
    if (this.userRole === 'ROLE_INSTITUCION') return '/ranking-institucional';
    return '/ranking';
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

  toggleNotifications(event: Event) {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;

    if (this.showNotifications) {
      this.abrirNotificaciones();
    }
  }

  abrirNotificaciones() {
    const usuarioId = Number(this.loginService.getUsuarioId());
    if (!usuarioId) return;

    this.isLoadingNotificaciones = true;

    this.notificacionService.getNotificaciones(usuarioId, 0, 5).subscribe({
      next: (pagina) => {
        this.notificaciones = pagina.content;
        this.isLoadingNotificaciones = false;
        // (Opcional: marcar como leídas aquí si quieres)
      },
      error: (err) => {
        console.error(err);
        this.isLoadingNotificaciones = false;
      }
    });
  }

  marcarComoLeidas(usuarioId: number, ids: number[]) {
    this.notificacionService.marcarLeidas(usuarioId, ids).subscribe({
      next: () => {
        this.unreadCount = 0;
        this.notificaciones.forEach(n => {
          if (ids.includes(n.id)) n.leido = true;
        });
      },
      error: (err) => console.error(err)
    });
  }

  getAvatar(username: string): string {
    if (username === 'Juan Torres') return 'assets/img/juan.jpeg';
    if (username === 'Fernando Ortiz') return 'assets/img/fernando.jpeg';
    if (username === 'Jeyson Orellano') return 'assets/img/jeyson.jpg';

    return 'assets/imagenes/user.jpg';
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
