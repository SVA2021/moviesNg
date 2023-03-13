import {Component, OnDestroy, OnInit} from '@angular/core';
import {MoviesListService} from "../../services/movies-list.service";
import {movieT} from "../../types/types";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {

  moviesList: movieT[]
  movieData$: Subscription

  constructor(
    private movies: MoviesListService,
  ) {
    this.moviesList = [];
    this.movieData$ = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.movieData$ = this.movies.list.subscribe(data => this.moviesList = data);
  }

  ngOnDestroy(): void {
    this.movieData$.unsubscribe();
  }
}
