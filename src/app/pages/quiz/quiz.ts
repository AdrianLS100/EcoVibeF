import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService} from '../../services/quiz-service';
import { Pregunta} from '../../models/pregunta-model';
import { HeaderComponent} from '../../components/header/header';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css']
})
export class QuizComponent implements OnInit {

  private quizService = inject(QuizService);
  private router = inject(Router);

  public isLoading = true;
  public gameStarted = false;
  public gameFinished = false;

  public preguntas: Pregunta[] = [];
  public currentQuestionIndex = 0;
  public score = 0;
  public totalPuntosPosibles = 0;

  public seleccionActual: string | null = null;
  public respuestaCorrecta: boolean | null = null;

  ngOnInit(): void {
    this.cargarQuiz();
  }

  cargarQuiz() {
    this.isLoading = true;
    this.quizService.obtenerQuiz().subscribe({
      next: (data) => {
        this.preguntas = data;
        this.isLoading = false;
        this.totalPuntosPosibles = data.reduce((acc, p) => acc + p.puntosOtorgados, 0);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  iniciarJuego() {
    this.gameStarted = true;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.seleccionActual = null;
    this.respuestaCorrecta = null;
  }

  seleccionarOpcion(opcion: string) {
    if (this.seleccionActual) return;

    this.seleccionActual = opcion;
    const preguntaActual = this.preguntas[this.currentQuestionIndex];

    if (opcion === preguntaActual.respuestaCorrecta) {
      this.respuestaCorrecta = true;
      this.score += preguntaActual.puntosOtorgados;
    } else {
      this.respuestaCorrecta = false;
    }
  }

  siguientePregunta() {
    if (this.currentQuestionIndex < this.preguntas.length - 1) {
      this.currentQuestionIndex++;
      this.seleccionActual = null;
      this.respuestaCorrecta = null;
    } else {
      this.finalizarJuego();
    }
  }

  finalizarJuego() {
    this.gameFinished = true;
    if (this.score > 0) {
      this.quizService.reclamarPuntos(this.score).subscribe({
        next: () => console.log("Puntos guardados"),
        error: (err) => console.error("Error guardando puntos", err)
      });
    }
  }

  irTienda() {
    this.router.navigate(['/tienda']);
  }
}
