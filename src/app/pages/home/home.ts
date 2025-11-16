import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  public loginService: LoginService = inject(LoginService);
  private router: Router = inject(Router);

  constructor() {
    console.log("Componente Home cargado. ¿Está logueado? ", this.loginService.isLoggedIn());
  }

  logout() {
    console.log("Cerrando sesión...");
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
