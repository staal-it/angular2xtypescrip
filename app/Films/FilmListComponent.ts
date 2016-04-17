import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Film, FilmService } from './FilmService';
import {SearchBox} from '../Shared/SearchBox'
import {SearchPipe} from '../Shared/SearchPipe'
import {FilmLogo} from './FilmLogo';

@Component({
  templateUrl: './app/Films/filmList.html',
  styles: [`
    .films {list-style-type: none;}
    *.films li {padding: 4px;cursor: pointer;}
  `],
  directives: [ROUTER_DIRECTIVES, SearchBox, FilmLogo],
  pipes: [SearchPipe]
})
export class FilmListComponent implements OnInit {
  films: Film[];

  constructor(private _filmService: FilmService) { }

  ngOnInit() {
    this.films = [];
    this._filmService.getFilms()
      .subscribe(films => this.films = films);
  }
}
