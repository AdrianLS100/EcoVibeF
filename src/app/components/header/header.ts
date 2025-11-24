import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { NotificacionService } from '../../services/notificacion-service';
import { Notificacion } from '../../models/notificacion-model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  public loginService: LoginService = inject(LoginService);
  private router: Router = inject(Router);
  private notificacionService = inject(NotificacionService);

  public unreadCount: number = 0;
  public notificaciones: Notificacion[] = [];
  public isLoadingNotificaciones = false;
  public userRole: string | null = null;

  public showNotifications: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.cargarResumen();
      this.userRole = this.loginService.getRole();
    }
  }

  getRankingRoute(): string {
    if (this.userRole === 'ROLE_FAMILIAR') return '/ranking-familiar';
    if (this.userRole === 'ROLE_INSTITUCION') return '/ranking-institucional';
    return '/ranking';
  }

  cargarResumen() {
    const usuarioId = Number(this.loginService.getUsuarioId());
    if (!usuarioId) return;
    this.notificacionService.getResumen(usuarioId).subscribe({
      next: (res) => this.unreadCount = res.unreadCount,
      error: (err) => console.error(err)
    });
  }

  toggleNotifications(event: Event) {
    event.stopPropagation(); // Evita cierre inmediato
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

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
