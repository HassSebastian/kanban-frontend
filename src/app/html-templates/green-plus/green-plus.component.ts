import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from 'src/app/dialog/dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-green-plus',
  templateUrl: './green-plus.component.html',
  styleUrls: ['./green-plus.component.scss'],
})
export class GreenPlusComponent {
  @Input() status!: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  /**
   * Opens the dialog for adding a new task.
   *
   * - Calls the 'open' method of 'dialog' to open the 'DialogAddTaskComponent'.
   * - Passes additional data to the dialog, including the 'status' property.
   *
   */
  openAddTask() {
    this.dialog.open(DialogAddTaskComponent, { data: { status: this.status } });
  }
}
