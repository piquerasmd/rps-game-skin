import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { GameDTO } from '../../../game/models/game-dto.model';
import { AuthService } from '../../../auth/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ChoiceEmoji } from '../../../game/models/game.enums';
import { GameService } from '../../../game/services/game.service';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, MatIconModule, MatListModule, CommonModule],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss',
})
export class GamesListComponent {
  games$: Observable<GameDTO[]>;
  ChoiceEmoji = ChoiceEmoji;

  constructor(private gameService: GameService, private authService: AuthService) {
    this.games$ = this.gameService.getGames(this.authService.getUsername());
  }
}
