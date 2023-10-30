import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from 'src/app/dialog/dialog-add-task/dialog-add-task.component';
import { DialogTaskDetailComponent } from 'src/app/dialog/dialog-task-detail/dialog-task-detail.component';
import { ColorService } from 'src/app/services/color.service';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  tasks: any = [];
  error: string = '';

  constructor(
    private dialog: MatDialog,
    private colorService: ColorService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    try {
      this.tasks = await this.loadTasks();
      console.log(this.tasks);
    } catch (e) {
      this.error = 'Fehler beim laden';
    }
  }

  loadTasks() {
    const url = environment.baseUrl + '/board/';
    return lastValueFrom(this.http.get(url));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
