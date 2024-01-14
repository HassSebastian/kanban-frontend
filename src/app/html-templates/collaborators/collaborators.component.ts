import { Component, Input } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent {
  @Input() task!: any;

  colors = this.dataService.colors;

  constructor(public dataService:DataService, private crudService:CrudService){}

  collaboratorInitials(collaboratorIndex: number) {
    return this.crudService.collaboratorInitials(collaboratorIndex);
  }

  collaboratorName(collaboratorIndex: number) {
    return this.crudService.collaboratorName(collaboratorIndex);
  }

  collaboratorInitialsColor(collaboratorIndex: number) {
    return this.crudService.collaboratorInitialsColor(collaboratorIndex);
  }

}
