import { Component } from '@angular/core';
import { DialogTaskDetailComponent } from '../dialog/dialog-task-detail/dialog-task-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-in-table',
  templateUrl: './task-in-table.component.html',
  styleUrls: ['./task-in-table.component.scss'],
})
export class TaskInTableComponent {
  selectPropertie: number = 0;
  openDescription: boolean = false;
  openDueDate: boolean = false;

  constructor(private dialog: MatDialog) {}

  openTaskDetail() {
    this.dialog.open(DialogTaskDetailComponent);
  }

  button(index: 1|2|3, event: Event) {
    event.stopPropagation();
  
    const actions = {
      1: () => this.openDescription = !this.openDescription,
      2: () => this.openDueDate = !this.openDueDate,
      3: () => this.dialog.open(DialogTaskDetailComponent)
    };
  
    actions[index]?.();
  }
  }
