import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog/dialog-add-task/dialog-add-task.component';
import { DialogTaskDetailComponent } from '../dialog/dialog-task-detail/dialog-task-detail.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor(private dialog:MatDialog,){}


  ngOnInit() {
    // this.dialog.open(DialogTaskDetailComponent)
  }

  openAddTask(){
    this.dialog.open(DialogAddTaskComponent)
  }

}
