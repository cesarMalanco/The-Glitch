import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getPokemonSpecies(id: number) {
  return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  }

  getRandomPokemon(): Observable<any> {
    const id = Math.floor(Math.random() * 151) + 1;
    return this.getPokemonById(id);
  }
}