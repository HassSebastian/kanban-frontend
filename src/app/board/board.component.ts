import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog/dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor(private dialog:MatDialog,){}


  ngOnInit() {
    // this.dialog.open(DialogAddTaskComponent)
  }

  openAddTask(){
    this.dialog.open(DialogAddTaskComponent)
  }

}
