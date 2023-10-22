import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from 'src/app/dialog/dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-green-plus',
  templateUrl: './green-plus.component.html',
  styleUrls: ['./green-plus.component.scss']
})
export class GreenPlusComponent {
  constructor(private dialog: MatDialog) {}

  openAddTask() {

    this.dialog.open(DialogAddTaskComponent);

  }

}
