import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LoadService } from 'src/app/services/load.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
})
export class DialogAddTaskComponent {
  constructor(
    public dataService: DataService,
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: { status: string },
    public loadService: LoadService,
    private http: HttpClient
  ) {
    this.addMemberArray = this.members.map((member: any) => ({
      ...member,
      checked: false,
    }));
    console.log('array ', this.addMemberArray);
  }

  colors = this.dataService.colors;
  addMemberArray = this.loadService.addMemberArray;
  members = this.loadService.members;
  description: string = '';

  showSelectColorList: boolean = false;
  showDescription: boolean = false;
  selectedColorIndex: number = 0;
  taskTitle: string = '';

  async ngOnInit() {}

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

  async saveAndClose() {
    const color = this.selectedColorIndex;
    const title = this.taskTitle;
    const status = this.data.status;
    const description = this.description;

    const url = environment.baseUrl + '/board/';
    const taskData = {
      title: title,
      status: status,
      color: color,
      description: description,
    };

    console.log('TaskData = ', taskData);

    try {
      const response = await this.http.post(url, taskData).toPromise();
      console.log('Todo added successfully', response);
      this.loadService.renderSite();
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding todo', error);
    }
  }
  getAddMemberArray() {
    return this.loadService.getAddMemberArray();
  }
}
