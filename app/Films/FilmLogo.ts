import { Component, Input } from 'angular2/core';

@Component({
  selector: 'film-logo',
  templateUrl: './app/Films/filmLogo.html'
})
export class FilmLogo {
    @Input()
    height: number;
    @Input()
    width:number;
    
    
  constructor() { }
}
