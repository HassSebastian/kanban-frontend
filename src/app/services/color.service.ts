import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  colors = [
    { name: 'Yellow', color: '60' },
    { name: 'Blue', color: '240' },
    { name: 'Green', color: '120' },
    { name: 'Orange', color: '30' },
    { name: 'Red', color: '0' },
    { name: 'Cyan', color: '180' },
    { name: 'Purple', color: '300' },
  ];
}
