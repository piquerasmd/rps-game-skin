import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../core/services/api-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameDTO } from '../models/game-dto.model';
import { GameCreateDTO } from '../models/game-create-dto.model';

@Injectable({
  providedIn: 'root',
})
export class GameApiService {
  constructor(private http: HttpClient, private apiConfigService: ApiConfigService) {}

  createGame(game: GameCreateDTO): Observable<GameDTO> {
    return this.http.post<GameDTO>(`${this.apiConfigService.getApiUrl()}/api/games`, game);
  }

  getGames(username: string): Observable<GameDTO[]> {
    return this.http.get<GameDTO[]>(`${this.apiConfigService.getApiUrl()}/api/games/username/${username}`);
  }
}
