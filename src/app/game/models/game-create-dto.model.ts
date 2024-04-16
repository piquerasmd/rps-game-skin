import { Choice, Result } from "./game.enums";

export interface GameCreateDTO {
  username: string;
  userChoice: Choice;
  computerChoice: Choice;
  result: Result;
}
