import { TestBed } from '@angular/core/testing';

import { GameApiService } from './game-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiConfigService } from '../../core/services/api-config.service';
import { GameCreateDTO } from '../models/game-create-dto.model';
import { GameDTO } from '../models/game-dto.model';
import { Choice, Result } from '../models/game.enums';

describe('GameApiService', () => {
  let service: GameApiService;
  let apiConfigServiceSpy: jasmine.SpyObj<ApiConfigService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    apiConfigServiceSpy = jasmine.createSpyObj('ApiConfigService', ['getApiUrl']);
    apiConfigServiceSpy.getApiUrl.and.returnValue('http://fakeapi.com');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ApiConfigService, useValue: apiConfigServiceSpy }],
    });
    service = TestBed.inject(GameApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a game', () => {
    const newGame: GameCreateDTO = {
      username: 'Alice',
      userChoice: Choice.Paper,
      computerChoice: Choice.Rock,
      result: Result.Win,
    };
    const createdGame: GameDTO = {
      username: 'Alice',
      userChoice: Choice.Paper,
      computerChoice: Choice.Rock,
      result: Result.Win,
      playedAt: new Date(),
    };

    service.createGame(newGame).subscribe((game) => {
      expect(game).toEqual(createdGame);
    });

    const req = httpTestingController.expectOne('http://fakeapi.com/api/games');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newGame);
    req.flush(createdGame); // Respond with the mock created game
  });

  it('should send a GET request to retrieve games by username', () => {
    const username = 'Alice';
    const games: GameDTO[] = [{
      username: 'Alice',
      userChoice: Choice.Paper,
      computerChoice: Choice.Rock,
      result: Result.Win,
      playedAt: new Date(),
    }];

    service.getGames(username).subscribe((allGames) => {
      expect(allGames).toEqual(games);
    });

    const req = httpTestingController.expectOne(
      `http://fakeapi.com/api/games/username/${username}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(games); // Respond with the mock games
  });
});
