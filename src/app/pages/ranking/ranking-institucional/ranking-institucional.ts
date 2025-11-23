import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RankingService } from '../../../services/ranking-service';
import { RankingInstitucional } from '../../../models/ranking-model';
import { HeaderComponent} from '../../../components/header/header';

@Component({
  selector: 'app-ranking-institucional',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './ranking-institucional.html',
  styleUrls: ['./ranking-institucional.css']
})
export class RankingInstitucionalComponent implements OnInit {

  private rankingService = inject(RankingService);
  public rankingList: RankingInstitucional[] = [];
  public isLoading = true;

  ngOnInit(): void {
    this.rankingService.getRankingInstitucional().subscribe({
      next: (data) => {
        this.rankingList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error cargando ranking institucional", err);
        this.isLoading = false;
      }
    });
  }
}
