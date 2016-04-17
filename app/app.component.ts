import {Component} from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import 'rxjs/Rx'; // load the full rxjs

import {AboutComponent} from './About/AboutComponent';
import {HomeComponent} from './Home/HomeComponent';
import {FilmComponent} from './Films/FilmComponent';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path:'/home', name: 'Home', component: HomeComponent, useAsDefault: true},
    {path:'/about', name: 'About', component: AboutComponent},
    {path:'/film/...', name: 'Film', component: FilmComponent}
])
export class AppComponent { }
