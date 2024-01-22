import { Component, Input } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
  @Input() property!: string;
  @Input() task!: any;

  allMembers = this.crudService.allMembers;
  membersSelectForTask = this.crudService.membersSelectForTask;

  constructor(public crudService: CrudService) {}

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   *
   * - Checks if the component property 'property' is set to 'edit_member'.
   * - If true, assigns the collaborators from the 'task' to the 'membersSelectForTask' property.
   *
   */
  ngOnInit() {
    if (this.property === 'edit_member') {
      this.membersSelectForTask = this.task.collaborator;
    }
  }

  /**
   * Handles the selection or deselection of a member.
   *
   * @param member The member object to be selected or deselected.
   * - Toggles the 'checked' property of the member.
   * - Updates the 'membersSelectForTask' array based on the member's selection status.
   * - If the component property 'property' is set to 'edit_member':
   *   - Updates the 'collaborator' property of the 'task' with the updated 'membersSelectForTask'.
   *   - Calls the 'updateTask' method of 'crudService' to update the task.
   *
   */
  selectedMember(member: any) {
    member.checked = !member.checked;
    if (member.checked) {
      this.membersSelectForTask.push(member.user_id);
    } else {
      const index = this.membersSelectForTask.indexOf(member.user_id);
      this.membersSelectForTask.splice(index, 1);
    }
    if (this.property === 'edit_member') {
      this.task.collaborator = this.membersSelectForTask;
      this.crudService.updateTask(this.task.id, this.task);
    }
  }
}
