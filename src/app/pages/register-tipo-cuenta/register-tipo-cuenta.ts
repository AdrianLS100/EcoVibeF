import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-tipo-cuenta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './register-tipo-cuenta.html',
  styleUrls: ['./register-tipo-cuenta.css']
})
export class RegisterTipoCuentaComponent {
}
