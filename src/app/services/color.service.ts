import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  colors = [
    {name:'Yellow', color: '#FFFF00'},
    {name:'Blue', color: '#0000FF'},
    {name:'Green', color: '#00FF00'},
    {name:'Orange', color: '#FF8C00'},
    {name:'Cyan', color: '#00FFFF'},
    {name:'Purple', color: '#A020F0'},
    {name:'Magenta', color: '#FF00FF'},
  ]

  constructor() { }
}
