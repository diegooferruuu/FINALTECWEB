import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(  private http: HttpClient) { }

  private url = 'https://players-app-4ibl.onrender.com/player'

  obtenerPlayers(): Observable<any>{
    return this.http.get("https://players-app-4ibl.onrender.com/player")
  }

  deletePlayerByID(id: string): Observable<Player>{
    return this.http.delete<Player>(this.url +"/"+ id);
  }

  updatePlayerByID(id: string, updates: Partial<any>): Observable<any> {
    return this.http.patch<Player>(this.url +"/"+ id, updates);
  }

  createPlayer(player: Partial<Player>): Observable<Player> {
    return this.http.post<Player>('https://players-app-4ibl.onrender.com/player', player);
  }


  getPlayerById(player: Partial<Player>): Observable<Player> {
    return this.http.post<Player>('https://players-app-4ibl.onrender.com/player', player);
  }


  // getPlayerByName(name: string): Observable<Player> {
  //   const params = new HttpParams().set('name', name); // Configuramos el parámetro 'name'
  //   return this.http.get<Player>(`${this.url}/search`, { params });
  // }
  
  
  
  
}
