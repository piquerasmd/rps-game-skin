import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  constructor() { }

  /**
   * Obtiene la url de redireccion
   */
  public getApiUrl(): string {
    return environment.apiUrl;
  }
}
