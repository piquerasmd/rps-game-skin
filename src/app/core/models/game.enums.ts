export enum Choice {
  Rock = 'ROCK',
  Paper = 'PAPER',
  Scissors = 'SCISSORS',
}

export const ChoiceEmoji = {
  [Choice.Rock]: '✊',
  [Choice.Paper]: '✋',
  [Choice.Scissors]: '✌️',
}

export enum Result {
  Win = 'WIN',
  Lose = 'LOSE',
  Draw = 'DRAW',
}
