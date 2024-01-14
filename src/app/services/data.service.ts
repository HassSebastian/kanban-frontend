import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}


  colors = [
    { name: 'Yellow', color: '60', index: 0 },
    { name: 'Blue', color: '240', index: 1 },
    { name: 'Green', color: '120', index: 2 },
    { name: 'Orange', color: '30', index: 3 },
    { name: 'Red', color: '0', index: 4 },
    { name: 'Cyan', color: '180', index: 5 },
    { name: 'Purple', color: '300', index: 6 },
  ];

  task_status = [
    { name: 'To-do' },
    { name: 'Do-today' },
    { name: 'In-progress' },
    { name: 'Done' },
  ];
}
