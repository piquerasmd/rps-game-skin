export enum Choice {
  Rock = 'ROCK',
  Paper = 'PAPER',
  Scissors = 'SCISSORS',
}

export interface GameResult {
  playerChoice: Choice;
  computerChoice: Choice;
  result: 'WIN' | 'LOSE' | 'DRAW';
}
