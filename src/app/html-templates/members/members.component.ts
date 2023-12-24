import { Component, Input } from '@angular/core';
import { LoadService } from 'src/app/services/load.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {
  @Input() property!: string
  members = this.loadService.members;

  constructor(public loadService:LoadService){console.log(this.members);
  }

}
