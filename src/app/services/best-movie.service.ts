import {Injectable} from '@angular/core';
import {movieT} from "../types/types";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BestMovieService {

  private localStorageKey = 'myBestMovie'
  bestMovie$: Subject<movieT | null>
  activeBestMovie: movieT | null

  constructor() {
    this.activeBestMovie = null;
    this.bestMovie$ = new Subject<movieT | null>();
    this.bestMovie$.next(
      localStorage.getItem(this.localStorageKey)
        ? JSON.parse(localStorage.getItem(this.localStorageKey) ?? '')
        : null
    )
    this.bestMovie$.subscribe(movie => this.activeBestMovie = movie);
  }

  setBestMovie(film: movieT) {
    if (film.id !== this.activeBestMovie?.id || !this.activeBestMovie) {
      this.bestMovie$.next(film);
      localStorage.setItem(this.localStorageKey, JSON.stringify(film));
    } else {
      this.bestMovie$.next(null);
      localStorage.clear();
    }
  }

}
