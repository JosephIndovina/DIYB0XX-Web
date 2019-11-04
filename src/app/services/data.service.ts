import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBoard } from '../models/board';
import { IButton } from '../models/button';
import { ISOCDProfile } from '../models/SOCDProfile';
import { IGame } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  public getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('app/utils/boards.json');
  }

  public getButtons(): Observable<IButton[]> {
    return this.http.get<IButton[]>('app/utils/buttons.json');
  }

  public getSOCDProfiles(): Observable<ISOCDProfile[]> {
    return this.http.get<ISOCDProfile[]>('app/utils/SOCDProfiles.json');
  }

  public getGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>('app/utils/games.json');
  }
}
