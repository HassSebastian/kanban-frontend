import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
})
export class CloseButtonComponent {
  constructor(private dialogRef: DialogRef) {}

  /**
   * Closes the dialog for adding a new task.
   *
   * - Calls the 'close' method of 'dialogRef' to close the current dialog.
   *
   */
  closeAddTask() {
    this.dialogRef.close();
  }
}
