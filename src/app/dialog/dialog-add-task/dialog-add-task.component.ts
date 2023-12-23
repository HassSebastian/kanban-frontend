import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
})
export class DialogAddTaskComponent {
  constructor(
    public dataService: DataService,
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: { status: string }
  ) {}
  colors = this.dataService.colors;
  showSelectColorList: boolean = false;
  selectedColorIndex: number = 0;
  taskTitle: string = '';

  openCloseSelectColor() {
    this.showSelectColorList = !this.showSelectColorList;
  }
  selectedColor(index: number) {
    this.selectedColorIndex = index;
    this.openCloseSelectColor();
  }

  saveAndClose() {
    const color = this.selectedColorIndex;
    const title = this.taskTitle;
    const status = this.data.status;
    console.log('Color = ', color + '\nTitle = ', title + '\nStatus = ', status);

    this.dialogRef.close();
  }
}
