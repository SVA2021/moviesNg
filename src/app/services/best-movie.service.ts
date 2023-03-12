import {Injectable} from '@angular/core';
import {movieT} from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class BestMovieService {

  localStorageKey = 'myBestMovie'

  get movie(): movieT | null {
    return this._movie;
  }

  private _movie: movieT | null

  constructor() {
    this._movie = localStorage.getItem(this.localStorageKey)
      ? JSON.parse(localStorage.getItem(this.localStorageKey) ?? '')
      : null;
  }

  setBestMovie(film: movieT | null) {
    this._movie = film;
    if (film) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(film));
    } else {
      localStorage.clear();
    }
  }

}
