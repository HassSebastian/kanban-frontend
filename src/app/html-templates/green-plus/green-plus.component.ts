import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from 'src/app/dialog/dialog-add-task/dialog-add-task.component';


@Component({
  selector: 'app-green-plus',
  templateUrl: './green-plus.component.html',
  styleUrls: ['./green-plus.component.scss']
})
export class GreenPlusComponent {
  @Input() status!:number;

  constructor(private dialog: MatDialog) {}


  ngOnInit() {
  }

  openAddTask() {
    this.dialog.open(DialogAddTaskComponent, {data: {status:this.status}});
  }

}
