import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {MoviesListService} from "../../services/movies-list.service";
import {genresT, movieT} from "../../types/types";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy, AfterContentChecked {

  genresArr = Object.values(genresT)
    .filter((v) => (typeof v === 'number'))
    .map((w) => ({value: w, viewValue: genresT[Number(w)]}));
  moviesList: movieT[]
  movieData$: Subscription
  genreFilter: genresT | undefined
  genreFilteredMovieList: movieT[]

  constructor(
    private movies: MoviesListService,
  ) {
    this.moviesList = [];
    this.movieData$ = Subscription.EMPTY;
    this.genreFilter = undefined;
    this.genreFilteredMovieList = [];
  }

  ngOnInit(): void {
    this.movieData$ = this.movies.list.subscribe(data => {
      this.moviesList = data;
      this.genreFilteredMovieList = this.genreFilter
        ? this.moviesList.filter((v) => v.genre.includes(this.genreFilter!))
        : this.moviesList;
    });
  }

  ngOnDestroy(): void {
    this.movieData$.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.genreFilteredMovieList = this.genreFilter
      ? this.moviesList.filter((v) => v.genre.includes(this.genreFilter!))
      : this.moviesList;
  }

}
