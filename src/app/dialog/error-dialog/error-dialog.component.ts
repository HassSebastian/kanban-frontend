import { Component, Inject } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent {
  constructor(
    private crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
  errorTitle = this.data.title;
  errorMessage = this.data.message;
}
