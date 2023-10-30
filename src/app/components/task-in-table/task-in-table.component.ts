import { Component, Input } from '@angular/core';
import { DialogTaskDetailComponent } from 'src/app/dialog/dialog-task-detail/dialog-task-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-task-in-table',
  templateUrl: './task-in-table.component.html',
  styleUrls: ['./task-in-table.component.scss'],
})
export class TaskInTableComponent {
  @Input() taskAuthor!: string;
  @Input() taskColor!: number;
  @Input() taskCreated_at!: number;
  @Input() taskDescription!: string;
  @Input() taskId!: number;
  @Input() taskTitle!: string;
  @Input() taskStatus!: number;

  selectPropertie: number = 0;
  openDescription: boolean = false;
  openDueDate: boolean = false;
  // taskBorderColor: string;

  constructor(private dialog: MatDialog, public colorService: ColorService) {
  }

  ngOnInit() {
    
  }
  getTaskColor(){
    return this.colorService.colors[this.taskColor].color;
  }

  openTaskDetail() {
    this.dialog.open(DialogTaskDetailComponent);
  }

  button(index: 1 | 2 | 3, event: Event) {
    event.stopPropagation();

    const actions = {
      1: () => (this.openDescription = !this.openDescription),
      2: () => (this.openDueDate = !this.openDueDate),
      3: () => this.dialog.open(DialogTaskDetailComponent),
    };

    actions[index]?.();
  }
}
