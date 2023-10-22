import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from './dialog/dialog-add-task/dialog-add-task.component';
import { DialogTaskDetailComponent } from './dialog/dialog-task-detail/dialog-task-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kanban-frontend';

constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // this.dialog.open(DialogTaskDetailComponent)
  }

}
