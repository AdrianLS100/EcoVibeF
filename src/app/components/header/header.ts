import { Component, inject, OnInit } from '@angular/core'; // <-- 1. Añade OnInit
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { NotificacionService} from '../../services/notificacion-service';
import { Notificacion} from '../../models/notificacion-model';

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

  // --- 4. AÑADE SERVICIO Y VARIABLES ---
  private notificacionService = inject(NotificacionService);
  public unreadCount: number = 0;
  public notificaciones: Notificacion[] = [];
  public isLoadingNotificaciones = false;

  constructor() {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.cargarResumen();
    }
  }

  cargarResumen() {
    const usuarioId = Number(this.loginService.getUsuarioId());
    if (!usuarioId) return;

    this.notificacionService.getResumen(usuarioId).subscribe({
      next: (resumen) => {
        this.unreadCount = resumen.unreadCount;
      },
      error: (err) => {
        console.error("Error al cargar resumen de notificaciones:", err);
      }
    });
  }

  abrirNotificaciones() {
    const usuarioId = Number(this.loginService.getUsuarioId());
    if (!usuarioId) return;

    this.isLoadingNotificaciones = true;

    this.notificacionService.getNotificaciones(usuarioId, 0, 5).subscribe({
      next: (pagina) => {
        this.notificaciones = pagina.content;
        this.isLoadingNotificaciones = false;

        const idsNoLeidos = this.notificaciones
          .filter(n => !n.leido)
          .map(n => n.id);

        if (idsNoLeidos.length > 0) {
          this.marcarComoLeidas(usuarioId, idsNoLeidos);
        } else {
          this.unreadCount = 0;
        }
      },
      error: (err) => {
        console.error("Error al cargar notificaciones:", err);
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
      error: (err) => {
        console.error("Error al marcar como leídas:", err);
      }
    });
  }

  logout() {
    console.log("Cerrando sesión...");
    this.loginService.logout();
    this.router.navigate(['/login']); // Redirige al login
  }
}
