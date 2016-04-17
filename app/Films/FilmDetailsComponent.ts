import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';

import { Film, FilmService } from './FilmService';
import {FilmLogo} from './FilmLogo';


@Component({
  templateUrl: './app/Films/filmDetails.html',
  directives: [ROUTER_DIRECTIVES, FilmLogo]
})
export class FilmDetailsComponent implements OnInit {
  @Input() film: Film;

  constructor(
    private _routeParams: RouteParams,
    private _router: Router,
    private _filmService: FilmService) { }

  ngOnInit() {
    if (!this.film) {
      let id = +this._routeParams.get('id');
      this._filmService.getFilm(id)
        .subscribe((film: Film) => this._setSelectedFilm(film));
    }
  }

  private _gotoFilms() {
    let route = ['Films', { id: this.film ? this.film.episode_id : null }]
    this._router.navigate(route);
  }

  private _setSelectedFilm(film: Film) {
    if (film) {
      this.film = film;
    } else {
      this._gotoFilms();
    }
  }
}
