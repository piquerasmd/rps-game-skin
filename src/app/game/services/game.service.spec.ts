import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { GameApiService } from './game-api.service';
import { AuthService } from '../../auth/services/auth.service';
import { Choice, Result } from '../models/game.enums';
import { GameDTO } from '../models/game-dto.model';
import { of } from 'rxjs';

describe('GameService', () => {
  let service: GameService;
  let gameApiServiceSpy: jasmine.SpyObj<GameApiService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    gameApiServiceSpy = jasmine.createSpyObj('GameApiService', ['createGame', 'getGames']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'getUsername']);
    TestBed.configureTestingModule({
      providers: [
        { provide: GameApiService, useValue: gameApiServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('computeResult', () => {
    it('should compute Draw when choices are the same', () => {
      expect(service.computeResult(Choice.Rock, Choice.Rock)).toEqual(Result.Draw);
    });

    it('should compute Win for Rock against Scissors and increase user score', () => {
      const initialScore = service['userScoreSubject'].value;
      expect(service.computeResult(Choice.Rock, Choice.Scissors)).toEqual(Result.Win);
      expect(service['userScoreSubject'].value).toBe(initialScore + 1);
    });

    it('should compute Lose for Rock against Paper and increase computer score', () => {
      const initialScore = service['computerScoreSubject'].value;
      expect(service.computeResult(Choice.Rock, Choice.Paper)).toEqual(Result.Lose);
      expect(service['computerScoreSubject'].value).toBe(initialScore + 1);
    });

    it('should call saveGame if the user is authenticated', () => {
      authServiceSpy.isAuthenticated.and.returnValue(true);
      authServiceSpy.getUsername.and.returnValue('Alice');
      spyOn(service, 'saveGame');

      service.computeResult(Choice.Rock, Choice.Scissors);

      expect(service.saveGame).toHaveBeenCalledWith(Choice.Rock, Choice.Scissors, Result.Win);
    });
  });

  describe('getComputerChoice', () => {
    it('should return a valid choice', () => {
      const choice = service.getComputerChoice();
      expect(Object.values(Choice)).toContain(choice);
    });
  });

  describe('saveGame', () => {
    it('should save the game result via API', () => {
      gameApiServiceSpy.createGame.and.returnValue(of());
      authServiceSpy.getUsername.and.returnValue('Alice');

      service.saveGame(Choice.Rock, Choice.Scissors, Result.Win);

      expect(gameApiServiceSpy.createGame).toHaveBeenCalledWith({
        username: 'Alice',
        userChoice: Choice.Rock,
        computerChoice: Choice.Scissors,
        result: Result.Win
      });
    });
  });

  describe('getGames', () => {
    it('should fetch games for a given username', () => {
      const mockGames: GameDTO[] = [];
      gameApiServiceSpy.getGames.and.returnValue(of(mockGames));
      service.getGames('Alice').subscribe(games => {
        expect(games).toBe(mockGames);
      });
      expect(gameApiServiceSpy.getGames).toHaveBeenCalledWith('Alice');
    });

    it('should return an empty observable if no username is provided', (done) => {
      service.getGames('').subscribe(games => {
        expect(games).toEqual([]);
        done();
      });
    });
  });
});
