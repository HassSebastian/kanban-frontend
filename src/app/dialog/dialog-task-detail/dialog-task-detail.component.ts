import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-dialog-task-detail',
  templateUrl: './dialog-task-detail.component.html',
  styleUrls: ['./dialog-task-detail.component.scss'],
})
export class DialogTaskDetailComponent {
  colors = this.dataService.colors;
  constructor(public dataService: DataService) {}
  
  getColors() {
    return this.dataService.colors;
  }
}
