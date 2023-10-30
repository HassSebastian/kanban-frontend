import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-dialog-task-detail',
  templateUrl: './dialog-task-detail.component.html',
  styleUrls: ['./dialog-task-detail.component.scss'],
})
export class DialogTaskDetailComponent {
  colors = this.colorService.colors;
  constructor(public colorService: ColorService) {}
  
  getColors() {
    return this.colorService.colors;
  }
}
