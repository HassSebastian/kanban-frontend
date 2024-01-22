import { Component, Input } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss'],
})
export class CollaboratorsComponent {
  @Input() task!: any;

  colors = this.dataService.colors;

  constructor(
    public dataService: DataService,
    private crudService: CrudService
  ) {}

  /**
   * Retrieves the initials of a collaborator based on the collaborator index using the 'crudService'.
   *
   * @param collaboratorIndex The index of the collaborator for which initials are requested.
   * @returns The initials of the collaborator.
   * - Calls the 'collaboratorInitials' method of 'crudService' with the provided collaborator index.
   *
   */
  collaboratorInitials(collaboratorIndex: number) {
    return this.crudService.collaboratorInitials(collaboratorIndex);
  }

  /**
   * Retrieves the name of a collaborator based on the collaborator index using the 'crudService'.
   *
   * @param collaboratorIndex The index of the collaborator for which the name is requested.
   * @returns The name of the collaborator.
   * - Calls the 'collaboratorName' method of 'crudService' with the provided collaborator index.
   *
   */
  collaboratorName(collaboratorIndex: number) {
    return this.crudService.collaboratorName(collaboratorIndex);
  }

  /**
   * Retrieves the color of the initials for a collaborator based on the collaborator index using the 'crudService'.
   *
   * @param collaboratorIndex The index of the collaborator for which the initials color is requested.
   * @returns The color of the initials for the collaborator.
   * - Calls the 'collaboratorInitialsColor' method of 'crudService' with the provided collaborator index.
   *
   */
  collaboratorInitialsColor(collaboratorIndex: number) {
    return this.crudService.collaboratorInitialsColor(collaboratorIndex);
  }
}
