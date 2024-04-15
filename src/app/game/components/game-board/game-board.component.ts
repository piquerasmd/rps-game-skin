import { Component } from '@angular/core';
import { Choice, ChoiceEmoji, Result } from '../../models/game.enums';
import { GameService } from '../../services/game.service';
import { GameResultComponent } from '../game-result/game-result.component';
import { PlayerOptionsComponent } from '../player-options/player-options.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [GameResultComponent, PlayerOptionsComponent, CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {
  userChoice = ChoiceEmoji[Choice.Rock]
  computerChoice = ChoiceEmoji[Choice.Rock];
  result: Result;
  isSpinning = false;
  slotOptions = [ChoiceEmoji.ROCK, ChoiceEmoji.PAPER, ChoiceEmoji.SCISSORS];

  constructor(public gameService: GameService) { }

  playGame(userChoice: Choice) {
    this.isSpinning = true;
    this.userChoice = ChoiceEmoji[userChoice];
    
    setTimeout(() => {
      const computerChoice = this.gameService.getComputerChoice();
      this.computerChoice = ChoiceEmoji[computerChoice];
      this.result = this.gameService.computeResult(userChoice, computerChoice);
      this.isSpinning = false;
    }, 1000);
  }
}
