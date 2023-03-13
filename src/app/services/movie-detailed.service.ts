import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {movieT} from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class MovieDetailedService {

  private detailedMovie$: Subject<movieT | null>

  constructor() {
    this.detailedMovie$ = new Subject<movieT | null>();
    this.detailedMovie$.next(null);
  }

}
