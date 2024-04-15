import { Injectable } from '@angular/core';
import { Choice, Result } from '../models/game.enums';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private userScoreSubject = new BehaviorSubject<number>(0);
  private computerScoreSubject = new BehaviorSubject<number>(0);
  userScore$ = this.userScoreSubject.asObservable();
  computerScore$ = this.computerScoreSubject.asObservable();

  constructor() {}

  computeResult(userChoice: Choice, computerChoice: Choice): Result {
    let result: Result;
    if (userChoice === computerChoice) {
      result = Result.Draw;
    } else if (
      (userChoice === Choice.Rock && computerChoice === Choice.Scissors) ||
      (userChoice === Choice.Paper && computerChoice === Choice.Rock) ||
      (userChoice === Choice.Scissors && computerChoice === Choice.Paper)
    ) {
      result = Result.Win;
      this.userScoreSubject.next(this.userScoreSubject.value + 1);
    } else {
      result = Result.Lose;
      this.computerScoreSubject.next(this.computerScoreSubject.value + 1);
    }
    return result;
  }

  getComputerChoice(): Choice {
    return Object.values(Choice)[Math.floor(Math.random() * Object.values(Choice).length)];
  }
}
