import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {

  private dataSrc = './assets/data.json'
  public list: Observable<any>

  constructor(
    private http: HttpClient,
  ) {
    this.list = this.getJSON();
  }

  private getJSON(): Observable<any> {
    return this.http.get(this.dataSrc);
  }
}
