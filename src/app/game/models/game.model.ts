import { Choice, Result } from "./game.enums";

export interface GameResult {
  playerChoice: Choice;
  computerChoice: Choice;
  result: Result;
}
