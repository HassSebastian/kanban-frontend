import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/services/data.service';
import { CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  constructor(
    private dataService: DataService,
    public crudService: CrudService
  ) {}
  
  colors = this.dataService.colors;

  async ngOnInit() {
    await this.crudService.renderTasks();
    await this.crudService.loadMembers();
    this.crudService.loggedUserData();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  loggedUserInitials() {
    return this.crudService.loggedUserInitials();
  }

  loggedUserInitialsColor() {
    return this.crudService.loggedUserInitialsColor();
  }
}
