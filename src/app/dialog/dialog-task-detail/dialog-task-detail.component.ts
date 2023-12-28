import { Component, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DialogRef } from '@angular/cdk/dialog';
import { LoadService } from 'src/app/services/load.service';
@Component({
  selector: 'app-dialog-task-detail',
  templateUrl: './dialog-task-detail.component.html',
  styleUrls: ['./dialog-task-detail.component.scss'],
})
export class DialogTaskDetailComponent {
  colors = this.dataService.colors;
  updateColorIndex: number = -1;
  task_status = this.dataService.task_status[this.task.status].name;

  showTitleInput: boolean = false;
  showDescriptionInput: boolean = false;
  updateTaskArray = this.task;
  newTitle: string = this.updateTaskArray.title;
  newDescription: string = this.updateTaskArray.description;

  constructor(
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public task: any,
    private http: HttpClient,
    private dialogRef: DialogRef,
    private loadService: LoadService
  ) {}

  cancelInput() {
    this.showTitleInput = false;
    this.showDescriptionInput = false;
  }

  updateTitle() {
    this.updateTaskArray.title = this.newTitle;
    this.updateTask();
    this.cancelInput();
  }

  updateColor(index: number) {
    this.updateColorIndex = index;
    this.updateTaskArray.color =
      this.updateColorIndex != -1 ? index : this.updateColorIndex;
    this.updateTask();
  }

  updateDescription() {
    this.updateTaskArray.description = this.newDescription;
    this.updateTask();
    this.cancelInput();

  }

  async deleteTask(taskId: number) {
    const url = environment.baseUrl + '/board/' + taskId;
    try {
      await lastValueFrom(this.http.delete(url));
      this.loadService.renderSite();
      this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
    }
  }

  async updateTask() {
    const taskId = this.updateTaskArray.id;
    const url = environment.baseUrl + '/board/' + taskId;
    const updateTask = this.updateTaskArray;

    try {
      const response = await this.http.put(url, updateTask).toPromise();
      console.log('Todo erfolgreich aktualisiert:', response);
      this.loadService.renderSite();
      // this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim Update:', error);
    }
  }
}
