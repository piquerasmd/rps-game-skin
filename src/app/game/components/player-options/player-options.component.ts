import { Component, EventEmitter, Output } from '@angular/core';
import { Choice } from '../../models/game.enums';

@Component({
  selector: 'app-player-options',
  standalone: true,
  imports: [],
  templateUrl: './player-options.component.html',
  styleUrl: './player-options.component.scss'
})
export class PlayerOptionsComponent {
  @Output() choiceSelected = new EventEmitter<Choice>();
  Choice = Choice; // Expose enum to template

  constructor() { }

  selectChoice(choice: Choice) {
    this.choiceSelected.emit(choice);
  }
}
