import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
})
export class DialogAddTaskComponent {
  constructor(public colorService:ColorService){}
}
