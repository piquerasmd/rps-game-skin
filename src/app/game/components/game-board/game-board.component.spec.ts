import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { GameService } from '../../services/game.service';
import { Choice, ChoiceEmoji, Result } from '../../models/game.enums';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj('GameService', ['getComputerChoice', 'computeResult']);
    await TestBed.configureTestingModule({
      imports: [GameBoardComponent],
      providers: [
        { provide: GameService, useValue: gameServiceSpy }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default choices as ROCK', () => {
    expect(component.userChoice).toEqual(ChoiceEmoji[Choice.Rock]);
    expect(component.computerChoice).toEqual(ChoiceEmoji[Choice.Rock]);
  });

  describe('#playGame', () => {
    it('should set isSpinning true and update userChoice initially', fakeAsync(() => {
      component.playGame(Choice.Paper);
      expect(component.isSpinning).toBeTrue();
      expect(component.userChoice).toEqual(ChoiceEmoji[Choice.Paper]);

      // Simulate delay
      tick(1000);

      expect(component.isSpinning).toBeFalse();
    }));

    it('should call GameService methods and set results', fakeAsync(() => {
      gameServiceSpy.getComputerChoice.and.returnValue(Choice.Scissors);
      gameServiceSpy.computeResult.and.returnValue(Result.Win);

      component.playGame(Choice.Paper);
      tick(1000); // Advance the timeout inside playGame

      expect(gameServiceSpy.getComputerChoice).toHaveBeenCalled();
      expect(gameServiceSpy.computeResult).toHaveBeenCalledWith(Choice.Paper, Choice.Scissors);
      expect(component.result).toEqual(Result.Win);
      expect(component.computerChoice).toEqual(ChoiceEmoji[Choice.Scissors]);
    }));
  });
});
