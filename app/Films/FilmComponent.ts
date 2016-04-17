import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { FilmListComponent } from './FilmListComponent';
import { FilmDetailsComponent } from './FilmDetailsComponent';
import { FilmService } from './FilmService';


@Component({
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers: [FilmService]
})
@RouteConfig([
  { path: '/', name: 'Film', component: FilmListComponent, useAsDefault: true },
  { path: '/:id', name: 'FilmDetail', component: FilmDetailsComponent }
])
export class FilmComponent { }
