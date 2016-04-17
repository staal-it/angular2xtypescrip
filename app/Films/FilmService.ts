import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';

export interface Film {
  title: string;
    episode_id: number;
    director: string;
    opening_crawl: string;
}

@Injectable()
export class FilmService {
  constructor(private _http: Http) { }

  getFilms() {
    return this._http.get('http://swapi.co/api/films/')
      .map((response: Response) => <Film[]>response.json().results);
  }

  getFilm(id: number) {
    return this._http.get('http://swapi.co/api/films/' + id)
      .do((response: Response) => console.log(response))
      .map((response: Response) => <Film>response.json());
  }
}

