import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { DataService } from 'src/app/services/data.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { DialogTaskDetailComponent } from '../dialog-task-detail/dialog-task-detail.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
})
export class DialogAddTaskComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { status: string },
    public dataService: DataService,
    private dialogRef: DialogRef,
    public crudService: CrudService,
    private dialog: MatDialog
  ) {}

  colors = this.dataService.colors;
  allMembers = this.crudService.allMembers;
  membersSelectForTask = this.crudService.membersSelectForTask;

  description: string = '';
  showSelectColorList: boolean = false;
  showDescription: boolean = false;
  selectedColorIndex: number = 0;
  taskTitle: string = '';
  saveAndMore: boolean = false;

  ngOnInit() {
    this.allMembers.forEach((member: any) => {
      member.checked = false;
    });
  }

  openCloseSelectColor() {
    this.showSelectColorList = !this.showSelectColorList;
  }

  openCloseDescription() {
    this.showDescription = !this.showDescription;
  }

  selectedColor(index: number) {
    this.selectedColorIndex = index;
    this.openCloseSelectColor();
  }

  // saveAnd(option: string) {
  //   // try {
  //     this.saveAndMethod(option);
  //   // } catch (error) {
  //     // this.saveAndError(error);
  //   // }
  // }

  async saveAnd(option: string) {
    if (option === 'more' && !this.saveAndMore) {
      await this.crudService.saveTask(this.createTaskData());
      this.saveAndMore = true;
    }
    if (this.saveAndMore) {
      const taskId = this.crudService.lastTask.id;
      await this.crudService.updateTask(taskId, this.createTaskData());
    } else {
      await this.crudService.saveTask(this.createTaskData());
    }
    if (option === 'close') {
      this.dialogRef.close();
    }
    if (option === 'detail') {
      this.dialogRef.close();
      const lastTask = this.crudService.lastTask;
      this.dialog.open(DialogTaskDetailComponent, { data: lastTask });
    }
  }

  // saveAndError(error: any) {
  //   console.warn('Save Error = ', error);
  //   if (error instanceof HttpErrorResponse) {
  //     if (error.status === 0) {
  //       this.dialog.open(ErrorDialogComponent, {
  //         data: { title: '', message: 'Server nicht erreichbar' },
  //       });
  //     }
  //     if (error.status === 400) {
  //       this.dialog.open(ErrorDialogComponent, {
  //         data: { title: 'Task Titel', message: error.error.title },
  //       });
  //     }
  //   }
  // }

  createTaskData() {
    const color = this.selectedColorIndex;
    const title = this.taskTitle;
    const status = this.data.status;
    const description = this.description;
    const collaborator = this.membersSelectForTask;
    const taskData = {
      title: title,
      status: status,
      color: color,
      description: description,
      collaborator: collaborator,
    };
    return taskData;
  }
}
