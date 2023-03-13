import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {genresT, movieT} from "../../types/types";
import {Subscription} from "rxjs";
import {BestMovieService} from "../../services/best-movie.service";

@Component({
  selector: 'app-detailed-movie',
  templateUrl: './detailed-movie.component.html',
  styleUrls: ['./detailed-movie.component.scss']
})
export class DetailedMovieComponent implements OnInit, OnDestroy {

  imgSrc: string
  genreDescription: string
  isFavorite: boolean
  myBestMovie$: Subscription
  movie: movieT

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: movieT,
    private best: BestMovieService,
  ) {
    this.myBestMovie$ = Subscription.EMPTY;
    this.imgSrc = '';
    this.genreDescription = '';
    this.isFavorite = this.best.activeBestMovie?.id === data.id;
    this.movie = data;
  }

  ngOnInit(): void {
    this.genreDescription = this.movie.genre.map((v) => genresT[v]).join(', ');
    this.imgSrc = `./assets/images/${this.movie.id}.jpeg`;
    this.myBestMovie$ = this.best.bestMovie$.subscribe(bestMovie =>
      this.isFavorite = bestMovie?.id === this.movie?.id
    )
  }

  setBestMovie() {
    this.best.setBestMovie(this.movie);
  }

  ngOnDestroy(): void {
    this.myBestMovie$.unsubscribe();
  }

}
