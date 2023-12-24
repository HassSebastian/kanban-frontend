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
  showTitleInput: boolean = false;
  showDescriptionInput: boolean = false;

  constructor(
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public task: any,
    private http: HttpClient,
    private dialogRef:DialogRef,
    private loadService:LoadService,
  ) {}

  cancelInput() {
    this.showTitleInput = false;
    this.showDescriptionInput = false;
  }

  updateTitle() {}

  updateDescription() {}

  async deleteTask(taskId:number) {
    
    const url = environment.baseUrl + '/board/' + taskId;
    try {
      await lastValueFrom(this.http.delete(url));
      this.loadService.renderSite();
      this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
    }
  }
}
