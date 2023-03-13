import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {genresT, movieT} from "../../types/types";
import {BestMovieService} from "../../services/best-movie.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() movie!: movieT
  imgSrc: string
  genreDescription: string
  isFavorite: boolean
  myBestMovie$: Subscription

  constructor(
    private best: BestMovieService,
  ) {
    this.myBestMovie$ = Subscription.EMPTY;
    this.imgSrc = '';
    this.genreDescription = '';
    this.isFavorite = this.best.activeBestMovie?.id === this.movie?.id;
  }


  ngOnInit(): void {
    this.imgSrc = `./assets/images/${this.movie.id}.jpeg`;
    this.genreDescription = this.movie.genre.map((v) => genresT[v]).join(', ');
    this.myBestMovie$ = this.best.bestMovie$.subscribe(bestMovie =>
      this.isFavorite = bestMovie?.id === this.movie?.id
    )
  }

  setBestMovie(event: Event) {
    event.stopPropagation();
    this.best.setBestMovie(this.movie);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.imgSrc = `./assets/images/${this.movie?.id}.jpeg`;
    this.genreDescription = this.movie.genre.map((v) => genresT[v]).join(', ');
    this.isFavorite = this.best.activeBestMovie?.id === this.movie?.id;
  }

  ngOnDestroy() {
    this.myBestMovie$.unsubscribe();
  }
}
