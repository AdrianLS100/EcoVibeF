import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
import { RankingService} from '../../services/ranking-service';
import { Ranking} from '../../models/ranking-model';
import {HeaderComponent} from '../../components/header/header'; // (Para el header)

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './ranking.html',
  styleUrls: ['./ranking.css']
})
export class RankingComponent implements OnInit {

  private rankingService = inject(RankingService);

  public rankingList: Ranking[] = [];
  public top3: Ranking[] = [];
  public restoDelRanking: Ranking[] = [];
  public isLoading = true;

  public podioImagenes: { [key: string]: string } = {
    'Juan Torres': 'assets/img/juan.jpeg',
    'Fernando Ortiz': 'assets/img/fernando.jpeg',
    'Jeyson Orellano': 'assets/img/jeyson.jpg',
    'default': 'assets/img/profile-placeholder.png'
  };

  ngOnInit(): void {
    this.rankingService.getRanking(0, 10).subscribe({
      next: (data) => {
        this.rankingList = data;

        this.top3 = data.slice(0, 3);
        this.restoDelRanking = data.slice(3);

        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar el ranking:", err);
        this.isLoading = false;
        alert("No se pudo cargar el ranking. (Asegúrate de estar logueado)");
      }
    });
  }

  getPodioImagen(username: string): string {
    return this.podioImagenes[username] || this.podioImagenes['default'];
  }
}
