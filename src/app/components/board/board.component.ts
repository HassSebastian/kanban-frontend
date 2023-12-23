import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from 'src/app/dialog/dialog-add-task/dialog-add-task.component';
import { DialogTaskDetailComponent } from 'src/app/dialog/dialog-task-detail/dialog-task-detail.component';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/services/data.service';
import { LoadTaskService } from 'src/app/services/load-task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    public loadTaskService: LoadTaskService
  ) {}

  async ngOnInit() {
    await this.loadTaskService.renderSite();
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
}
