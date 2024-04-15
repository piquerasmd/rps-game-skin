import { Choice, Result } from "./game.enums";

export interface GameDTO {
  username: string;
  userChoice: Choice;
  computerChoice: Choice;
  result: Result;
  playedAt: Date;
}
