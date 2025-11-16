import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { NotificacionService} from '../../services/notificacion-service';
import {Page} from '../../services/recursoeducativo-service';
import { LoginService } from '../../services/login-service';
import { Notificacion} from '../../models/notificacion-model';

import { HeaderComponent} from '../../components/header/header';

@Component({
  selector: 'app-notificaciones-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    DatePipe
  ],
  templateUrl: './notificaciones.html',
  styleUrls: ['./notificaciones.css']
})
export class NotificacionesPageComponent implements OnInit {

  private notificacionService = inject(NotificacionService);
  private loginService = inject(LoginService);
  private router = inject(Router);

  public isLoading = true;
  public notificaciones: Notificacion[] = [];
  public pageInfo: Page<any> | null = null;
  private usuarioId: number | null = null;

  ngOnInit(): void {
    const idString = this.loginService.getUsuarioId();
    if (!idString) {
      alert("Error de sesión. Por favor, inicia sesión.");
      this.router.navigate(['/login']);
      return;
    }
    this.usuarioId = Number(idString);

    this.cargarNotificaciones(0);
  }

  cargarNotificaciones(page: number) {
    if (!this.usuarioId) return;

    this.isLoading = true;
    this.notificacionService.getNotificaciones(this.usuarioId, page, 10).subscribe({
      next: (pagina) => {
        this.notificaciones = pagina.content;
        this.pageInfo = pagina;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar notificaciones:", err);
        this.isLoading = false;
      }
    });
  }

  onNotificationClick(notif: Notificacion) {
    // 1. Si no está leída, la marcamos
    if (!notif.leido) {
      if (!this.usuarioId) return;

      this.notificacionService.marcarLeidas(this.usuarioId, [notif.id]).subscribe({
        next: () => {
          notif.leido = true; // La marcamos en la UI
          // (Opcional: recargar el contador del header)
        },
        error: (err) => console.error("Error al marcar como leída:", err)
      });
    }

    if (notif.linkRuta) {
      this.router.navigate([notif.linkRuta]);
    }
  }

  irAPagina(page: number) {
    if (this.pageInfo && page >= 0 && page < this.pageInfo.totalPages) {
      this.cargarNotificaciones(page);
    }
  }
}
