import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecomendacionService} from '../../services/recomendacion-service';
import { Recomendacion} from '../../models/recomendacion-model';
import { HeaderComponent} from '../../components/header/header';

@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './recomendaciones.html',
  styleUrls: ['./recomendaciones.css']
})
export class RecomendacionesComponent implements OnInit {

  private recomendacionService = inject(RecomendacionService);

  public recomendaciones: Recomendacion[] = [];
  public isLoading = true;

  ngOnInit(): void {
    this.recomendacionService.getRecomendaciones().subscribe({
      next: (data) => {
        this.recomendaciones = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error cargando recomendaciones:", err);
        this.isLoading = false;
      }
    });
  }
}
