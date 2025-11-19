import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RankingService} from '../../../services/ranking-service';
import { RankingFamiliar} from '../../../models/ranking-model';
import { HeaderComponent} from '../../../components/header/header';

@Component({
  selector: 'app-ranking-familiar',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './ranking-familiar.html',
  styleUrls: ['../ranking.css']
})
export class RankingFamiliarComponent implements OnInit {

  private rankingService = inject(RankingService);
  public rankingList: RankingFamiliar[] = [];
  public isLoading = true;

  ngOnInit(): void {
    this.rankingService.getRankingFamiliar().subscribe({
      next: (data) => {
        this.rankingList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error cargando ranking familiar", err);
        this.isLoading = false;
      }
    });
  }
}
