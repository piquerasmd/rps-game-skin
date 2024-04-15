import { Component, Input } from '@angular/core';
import { Result } from '../../models/game.enums';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss'
})
export class GameResultComponent {
  @Input() result: Result;
  @Input() userScore: number | null;
  @Input() computerScore: number | null;

  Result = Result; // Expose enum to template
}
