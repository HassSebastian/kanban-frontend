import { Component, Input } from '@angular/core';
import { LoadService } from 'src/app/services/load.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
  @Input() property!: string;

  addMemberArray:any;

  constructor(public loadService: LoadService) {
  }

  async ngOnInit() {
    this.addMemberArray = await this.loadService.getAddMemberArray();
    console.log(this.addMemberArray);
    
  }

  selectedMember(index: number) {
    this.addMemberArray[index].checked = true;
    console.log('copy + index', this.addMemberArray);
  }
}
