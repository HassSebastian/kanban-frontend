import { Component, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dialog-task-detail',
  templateUrl: './dialog-task-detail.component.html',
  styleUrls: ['./dialog-task-detail.component.scss'],
})
export class DialogTaskDetailComponent {
  updateColorIndex: number = -1;
  updateStatusIndex: number = -1;

  showTitleInput: boolean = false;
  showDescriptionInput: boolean = false;

  updateTaskArray = this.task;
  newTitle: string = this.updateTaskArray.title;
  newDescription: string = this.updateTaskArray.description;
  task_status = this.dataService.task_status[this.task.status]?.name;
  task_status_menu = this.dataService.task_status;
  colors = this.dataService.colors;
  allMembers = this.crudService.allMembers;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: any,
    public dataService: DataService,
    private dialogRef: DialogRef,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    this.allMembers = this.allMembers.map((member: any) => {
      member.checked = this.task.collaborator?.includes(member.user_id);
    });
  }

  cancelInput() {
    this.showTitleInput = false;
    this.showDescriptionInput = false;
  }

  updateTitleAndDescription() {
    this.updateTaskArray.title = this.newTitle;
    this.updateTaskArray.description = this.newDescription;
    this.updateTask();
    this.cancelInput();
  }

  updateColor(index: number) {
    this.updateColorIndex = index;
    this.updateTaskArray.color =
      this.updateColorIndex != -1 ? index : this.updateColorIndex;
    this.updateTask();
  }

  updateStatus(index: number) {
    this.updateStatusIndex = index;
    this.updateTaskArray.status =
      this.updateTaskArray[this.updateStatusIndex]?.status !=
      this.updateStatusIndex
        ? index
        : this.updateStatusIndex;
    this.updateTask();
  }

  updateTask() {
    const taskId = this.updateTaskArray.id;
    const updateTask = this.updateTaskArray;
    this.crudService.updateTask(taskId, updateTask);
  }

  deleteTask(taskId: number) {
    try {
      this.crudService.deleteTask(taskId);
      this.dialogRef.close();
    } catch (error) {
      throw error;
    }
  }

  memberCheckboxFromTask() {
    this.task.collaborator.forEach((element: any) => {
      this.allMembers.forEach((member: any) => {
        member.checked = false;
        member.user_id === element
          ? (member.checked = true)
          : (member.checked = false);
      });
    });
  }
}
