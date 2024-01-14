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
  // memberCheckbox: boolean = true;

  constructor(public crudService: CrudService) {}

  ngOnInit() {
    if (this.property === 'edit_member') {
      this.membersSelectForTask = this.task.collaborator;
    }
  }

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
