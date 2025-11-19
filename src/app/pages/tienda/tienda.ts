import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { GamificacionService } from '../../services/gamificacion-service';
import { Recompensa } from '../../models/recompensa-model';
import { EstadoGamificacion } from '../../models/estadogamificacion-model';
import { CanjearRequest } from '../../models/canjearrequest-model';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import {HeaderComponent} from '../../components/header/header';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './tienda.html',
  styleUrls: ['./tienda.css']
})
export class TiendaComponent implements OnInit {

  private gamificacionService = inject(GamificacionService);
  private loginService = inject(LoginService);
  private router = inject(Router);

  public estadoUsuario: EstadoGamificacion | null = null;
  public recompensas: Recompensa[] = [];
  public isLoading = true;

  ngOnInit(): void {
    this.cargarDatos();
  }

  private getUsuarioId(): number | null {
    const usuarioIdString = this.loginService.getUsuarioId();

    if (!usuarioIdString) {
      alert("Error de autenticación. Por favor, inicia sesión de nuevo.");
      this.loginService.logout();
      this.router.navigate(['/login']);
      return null; // Detiene la ejecución
    }

    return Number(usuarioIdString);
  }

  cargarDatos() {
    this.isLoading = true;

    const USUARIO_ID = this.getUsuarioId();
    if (!USUARIO_ID) return; // Si el ID es nulo, nos detenemos

    forkJoin({
      estado: this.gamificacionService.getEstadoUsuario(USUARIO_ID),
      recompensas: this.gamificacionService.getRecompensas()
    }).subscribe({
      next: (data) => {
        this.estadoUsuario = data.estado;
        this.recompensas = data.recompensas;
        this.isLoading = false;
        console.log('Datos cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar datos de la tienda:', err);
        this.isLoading = false;
        alert('No se pudo cargar la tienda.');
      }
    });
  }

  onCanjear(recompensa: Recompensa) {
    const USUARIO_ID = this.getUsuarioId();
    if (!USUARIO_ID) return; // Si el ID es nulo, nos detenemos

    const confirmar = confirm(
      `¿Estás seguro de que quieres canjear "${recompensa.nombre}" por ${recompensa.costoPuntos} puntos?`
    );

    if (!confirmar) {
      return;
    }

    if (this.estadoUsuario && this.estadoUsuario.puntosTotales < recompensa.costoPuntos) {
      alert('¡Ups! No tienes puntos suficientes.');
      return;
    }

    const request: CanjearRequest = {
      usuarioId: USUARIO_ID, 
      recompensaId: recompensa.id
    };

    this.gamificacionService.canjear(request).subscribe({
      next: (nuevoEstado) => {
        alert('¡Canje exitoso! Tus nuevos puntos son: ' + nuevoEstado.puntosTotales);
        this.estadoUsuario = nuevoEstado;
      },
      error: (err) => {
        console.error('Error al canjear:', err);
        alert('Error al canjear. Es posible que no tengas puntos suficientes.');
      }
    });
  }
}
