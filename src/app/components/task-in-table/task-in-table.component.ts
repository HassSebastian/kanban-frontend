import { Component, Input } from '@angular/core';
import { DialogTaskDetailComponent } from 'src/app/dialog/dialog-task-detail/dialog-task-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-task-in-table',
  templateUrl: './task-in-table.component.html',
  styleUrls: ['./task-in-table.component.scss'],
})
export class TaskInTableComponent {
  @Input() task!: any;

  selectPropertie: number = 0;
  openDescription: boolean = false;
  openDueDate: boolean = false;
  colors = this.dataService.colors;
  allMembers = this.crudService.allMembers;

  constructor(
    private dialog: MatDialog,
    public dataService: DataService,
    public crudService: CrudService
  ) {}

  ngOnInit() {}

  openTaskDetail() {
    const task = this.task;
    this.dialog.open(DialogTaskDetailComponent, { data: task });
    // console.log('Task = ', task);
  }

  button(index: 1 | 2 | 3, event: Event) {
    event.stopPropagation();
    const actions = {
      1: () => (this.openDescription = !this.openDescription),
      2: () => (this.openDueDate = !this.openDueDate),
      3: () => this.openTaskDetail(),
    };
    actions[index]?.();
  }


}
