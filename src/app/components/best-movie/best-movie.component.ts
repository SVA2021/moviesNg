import {Component, OnDestroy, OnInit} from '@angular/core';
import {BestMovieService} from "../../services/best-movie.service";
import {movieT} from "../../types/types";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-best-movie',
  templateUrl: './best-movie.component.html',
  styleUrls: ['./best-movie.component.scss']
})
export class BestMovieComponent implements OnInit, OnDestroy {

  movie: movieT | null
  myBestMovie$: Subscription

  constructor(
    private best: BestMovieService,
  ) {
    this.movie = null;
    this.myBestMovie$ = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.myBestMovie$ = this.best.bestMovie$.subscribe(movie => this.movie = movie);
  }

  ngOnDestroy(): void {
    this.myBestMovie$.unsubscribe();
  }

}
