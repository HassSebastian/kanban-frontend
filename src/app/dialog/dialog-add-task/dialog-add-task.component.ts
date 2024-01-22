import { Component, Inject, SimpleChange } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { DataService } from 'src/app/services/data.service';
import { DialogTaskDetailComponent } from '../dialog-task-detail/dialog-task-detail.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
})
export class DialogAddTaskComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { status: string },
    public dataService: DataService,
    private dialogRef: DialogRef,
    public crudService: CrudService,
    private dialog: MatDialog
  ) {}

  colors = this.dataService.colors;
  allMembers = this.crudService.allMembers;
  membersSelectForTask = this.crudService.membersSelectForTask;

  taskTitle: string = '';
  description: string = '';

  selectedColorIndex: number = 0;

  openDp: boolean = false;
  saveAndMore: boolean = false;
  showDescription: boolean = false;
  showSelectColorList: boolean = false;

  /**
   * Private property to store the selected date.
   *
   * - The actual value of the selected date is stored in the private property `_selectedData`.
   * - Access to the selected date is provided through the public getter `selectedData`.
   *
   */
  private _selectedData!: Date;

  /**
   * Public getter to access the selected date.
   *
   * @returns The selected date stored in the private property `_selectedData`.
   *
   */
  get selectedData(): Date {
    return this._selectedData;
  }

  /**
   * Lifecycle hook method called after Angular initializes the component.
   *
   * - Iterates through all members in the `allMembers` array.
   * - Sets the 'checked' property of each member to `false`.
   *
   */
  ngOnInit() {
    this.allMembers.forEach((member: any) => {
      member.checked = false;
    });
  }

  /**
   * Setter method to update the selected date and adjust for the timezone offset.
   *
   * @param value The new date value to set as the selected date.
   * - Adjusts the selected date by subtracting the timezone offset to ensure consistency.
   * - Updates the private property `_selectedData` with the adjusted date.
   * - Logs the adjusted selected date to the console for debugging purposes.
   *
   */
  set selectedData(value: Date) {
    value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
    this._selectedData = value;
    console.log(this._selectedData);
  }

  /**
   * Formats the selected date for display in HTML.
   *
   * @returns A formatted date string in German locale with the year, month, and day.
   * - Uses the `toLocaleDateString` method with the 'de-DE' locale to format the selected date.
   *
   */
  formattedDateForHTML() {
    const formattedDate = this._selectedData.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  }

  /**
   * Formats the selected date for use in Django backend requests.
   *
   * @returns A formatted date string in ISO format (YYYY-MM-DD).
   * - Uses the `toISOString` method to obtain the ISO-formatted date string.
   *
   */
  formattedDateForDjango() {
    const formattedDate = this._selectedData?.toISOString().split('T')[0];
    return formattedDate;
  }

  /**
   * Toggles the visibility of the color selection list.
   *
   * - Inverts the value of the `showSelectColorList` property to show/hide the color selection list.
   *
   */
  openCloseSelectColor() {
    this.showSelectColorList = !this.showSelectColorList;
  }

  /**
   * Toggles the visibility of the task description.
   *
   * - Inverts the value of the `showDescription` property to show/hide the task description.
   *
   */
  openCloseDescription() {
    this.showDescription = !this.showDescription;
  }

  /**
   * Toggles the visibility of the date picker.
   *
   * - Inverts the value of the `openDp` property to show/hide the date picker.
   *
   */
  openDataPicker() {
    this.openDp = !this.openDp;
  }

  /**
   * Handles the selection of a color from the color selection list.
   *
   * @param index The index representing the selected color.
   * - Sets the 'selectedColorIndex' property to the provided index.
   * - Invokes the 'openCloseSelectColor' method to close the color selection list.
   *
   */
  selectedColor(index: number) {
    this.selectedColorIndex = index;
    this.openCloseSelectColor();
  }

  /**
   * Saves the task based on the specified option ('more', 'close', or 'detail').
   *
   * @param option The option specifying the action to be taken after saving the task.
   * - 'more': Saves the task and allows for saving more tasks without closing the dialog.
   * - 'close': Saves the task and closes the dialog if the save operation is successful.
   * - 'detail': Saves the task, closes the dialog, and opens a detailed view of the last saved task.
   *
   */
  async saveAnd(option: string) {
    if (option === 'more' && !this.saveAndMore) {
      await this.crudService.saveTask(this.createTaskData());
      this.saveAndMore = true;
    }
    if (this.saveAndMore) {
      const taskId = this.crudService.lastTask.id;
      await this.crudService.updateTask(taskId, this.createTaskData());
    } else {
      await this.crudService.saveTask(this.createTaskData());
    }
    if (option === 'close' && this.crudService.saveOk) {
      this.dialogRef.close();
    }
    if (option === 'detail') {
      this.dialogRef.close();
      const lastTask = this.crudService.lastTask;
      this.dialog.open(DialogTaskDetailComponent, { data: lastTask });
    }
  }

  /**
   * Creates a data object representing the task based on component properties.
   *
   * @returns An object containing task data with properties such as title, status, color, description, due date, and collaborators.
   *
   */
  createTaskData() {
    const color = this.selectedColorIndex;
    const title = this.taskTitle;
    const status = this.data.status;
    const description = this.description;
    const collaborator = this.membersSelectForTask;
    const due_date = this.formattedDateForDjango();
    const taskData = {
      title: title,
      status: status,
      color: color,
      description: description,
      due_date: due_date,
      collaborator: collaborator,
    };
    return taskData;
  }
}
