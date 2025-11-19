import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {
  title = 'ecovibef';

  private loginService = inject(LoginService);

  ngOnInit(): void {
    console.log("App cargada. Forzando cierre de sesión para un inicio limpio.");
    this.loginService.logout();
  }
}
