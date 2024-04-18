import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListComponent } from './games-list.component';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../../auth/services/auth.service';
import { GameDTO } from '../../models/game-dto.model';
import { of } from 'rxjs';
import { Choice, Result } from '../../models/game.enums';

describe('GamesListComponent', () => {
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj('GameService', ['getGames']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsername']);
    await TestBed.configureTestingModule({
      imports: [GamesListComponent],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load games using the username from AuthService', () => {
    const expectedUsername = 'testUser';
    const expectedGames: GameDTO[] = [
      {
        username: expectedUsername,
        userChoice: Choice.Paper,
        computerChoice: Choice.Rock,
        result: Result.Win,
        playedAt: new Date(),
      },
    ];
    authServiceSpy.getUsername.and.returnValue(expectedUsername);
    gameServiceSpy.getGames.and.returnValue(of(expectedGames));

    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(authServiceSpy.getUsername).toHaveBeenCalled();
    expect(gameServiceSpy.getGames).toHaveBeenCalledWith(expectedUsername);
    component.games$.subscribe((games) => {
      expect(games).toEqual(expectedGames);
    });
  });
});
