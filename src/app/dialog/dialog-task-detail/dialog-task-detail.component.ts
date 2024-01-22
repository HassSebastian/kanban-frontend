import { Component, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dialog-task-detail',
  templateUrl: './dialog-task-detail.component.html',
  styleUrls: ['./dialog-task-detail.component.scss'],
})
export class DialogTaskDetailComponent {
  dayDifferenz!: number;
  updateColorIndex: number = -1;
  updateStatusIndex: number = -1;

  showTitleInput: boolean = false;
  showEditDueDate: boolean = false;
  showDescriptionInput: boolean = false;

  updateTaskArray = this.task;
  newTitle: string = this.updateTaskArray.title;
  newDescription: string = this.updateTaskArray.description;
  task_status = this.dataService.task_status[this.task.status]?.name;
  task_status_menu = this.dataService.task_status;
  colors = this.dataService.colors;
  allMembers = this.crudService.allMembers;

  private _editSelectedData!: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: any,
    public dataService: DataService,
    private dialogRef: DialogRef,
    private crudService: CrudService
  ) {}

  /**
   * Lifecycle hook method called after Angular initializes the component.
   *
   * - Maps the 'checked' property of each member in 'allMembers' based on task collaborators.
   * - If a member's 'user_id' is included in the task collaborators, set 'checked' to true.
   * - Logs the task information to the console for debugging purposes.
   *
   */
  ngOnInit() {
    this.allMembers = this.allMembers.map((member: any) => {
      member.checked = this.task.collaborator?.includes(member.user_id);
    });
    console.log(this.task);
  }

  /**
   * Public getter to access the selected date for editing.
   *
   * @returns The selected date stored in the private property '_editSelectedData'.
   *
   */
  get editSelectedData(): Date {
    return this._editSelectedData;
  }

  /**
   * Setter method to update the selected date for editing and format it for Django backend requests.
   *
   * @param value The new date value to set as the edited selected date.
   * - Adjusts the selected date by subtracting the timezone offset to ensure consistency.
   * - Updates the private property '_editSelectedData' with the adjusted date.
   * - Updates the 'due_date' property in the 'updateTaskArray' with the formatted date for Django.
   *
   */
  set editSelectedData(value: Date) {
    value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
    this._editSelectedData = value;
    this.updateTaskArray.due_date = this.formattedDateForDjango();
  }

  /**
   * Toggles the visibility of the edit due date section.
   *
   * - Inverts the value of the 'showEditDueDate' property to show/hide the edit due date section.
   *
   */
  openEditDueDate() {
    this.showEditDueDate = !this.showEditDueDate;
  }

  /**
   * Cancels the input mode for title and description.
   *
   * - Sets 'showTitleInput' and 'showDescriptionInput' properties to false to exit the input mode.
   *
   */
  cancelInput() {
    this.showTitleInput = false;
    this.showDescriptionInput = false;
  }

  /**
   * Updates the task title and description with new values and cancels the input mode.
   *
   * - Sets 'title' and 'description' properties in 'updateTaskArray' with new values.
   * - Calls the 'updateTask' method to update the task with the new title and description.
   * - Cancels the input mode for title and description.
   *
   */
  updateTitleAndDescription() {
    this.updateTaskArray.title = this.newTitle;
    this.updateTaskArray.description = this.newDescription;
    this.updateTask();
    this.cancelInput();
  }

  /**
   * Updates the task color with a new index and triggers the task update.
   *
   * @param index The index representing the selected color.
   * - Sets the 'updateColorIndex' property to the provided index.
   * - If the 'updateColorIndex' is not -1, updates the 'color' property in 'updateTaskArray' with the new index.
   * - Calls the 'updateTask' method to apply the color update to the task.
   *
   */
  updateColor(index: number) {
    this.updateColorIndex = index;
    this.updateTaskArray.color =
      this.updateColorIndex != -1 ? index : this.updateColorIndex;
    this.updateTask();
  }

  /**
   * Updates the task status with a new index and triggers the task update.
   *
   * @param index The index representing the selected status.
   * - Sets the 'updateStatusIndex' property to the provided index.
   * - If the 'status' property in 'updateTaskArray' does not match the provided index, updates it with the new index.
   * - Calls the 'updateTask' method to apply the status update to the task.
   *
   */
  updateStatus(index: number) {
    this.updateStatusIndex = index;
    this.updateTaskArray.status =
      this.updateTaskArray[this.updateStatusIndex]?.status !=
      this.updateStatusIndex
        ? index
        : this.updateStatusIndex;
    this.updateTask();
  }

  /**
   * Updates the task using the 'crudService' by sending the updated task data to the backend.
   *
   * - Retrieves the task ID from the 'updateTaskArray'.
   * - Retrieves the updated task data from the 'updateTaskArray'.
   * - Calls the 'updateTask' method of 'crudService' to send the updated task data to the backend.
   *
   */
  updateTask() {
    const taskId = this.updateTaskArray.id;
    const updateTask = this.updateTaskArray;
    this.crudService.updateTask(taskId, updateTask);
  }

  /**
   * Deletes the task with the specified ID using the 'crudService' and closes the dialog.
   *
   * @param taskId The ID of the task to be deleted.
   * - Calls the 'deleteTask' method of 'crudService' to delete the task with the specified ID.
   * - Closes the current dialog using 'dialogRef'.
   *
   */
  async deleteTask(taskId: number) {
    await this.crudService.deleteTask(taskId);
    this.dialogRef.close();
  }

  /**
   * Sets the 'checked' property for members based on the task's collaborators.
   *
   * - Iterates over each collaborator in the task.
   * - Iterates over each member in 'allMembers'.
   * - Sets the 'checked' property to true if the member's 'user_id' matches the current collaborator; otherwise, sets it to false.
   *
   */
  memberCheckboxFromTask() {
    this.task.collaborator.forEach((element: any) => {
      this.allMembers.forEach((member: any) => {
        member.checked = false;
        member.user_id === element
          ? (member.checked = true)
          : (member.checked = false);
      });
    });
  }

  /**
   * Formats the task's due date for display in HTML using the German locale.
   *
   * @returns A formatted date string in the format 'Month Day, Year'.
   * - Retrieves the 'due_date' property from the task.
   * - Creates a new Date object from the 'due_date'.
   * - Formats the date using the 'toLocaleDateString' method with the German locale.
   *
   */
  formattedDateForHTML() {
    const formatDueDate = new Date(this.task.due_date);
    const formattedDate = formatDueDate.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  }

  /**
   * Formats the selected date for Django backend requests.
   *
   * @returns A formatted date string in the format 'YYYY-MM-DD'.
   * - Retrieves the '_editSelectedData' property from the component.
   * - Uses the 'toISOString' method to get the date string in ISO format.
   * - Extracts the date part (YYYY-MM-DD) by splitting at the 'T'.
   *
   */
  formattedDateForDjango() {
    const formattedDate = this._editSelectedData?.toISOString().split('T')[0];
    return formattedDate;
  }

  /**
   * Calculates and returns the remaining days until the task's due date for display in HTML.
   *
   * @returns The number of remaining days until the due date.
   * - Retrieves the current date and time using the 'Date' object.
   * - Retrieves the 'due_date' property from the task and creates a 'Date' object from it.
   * - Calculates the time difference between the due date and the current date in milliseconds.
   * - Converts the time difference to days and rounds up to the nearest whole number.
   *
   */
  restOfTimeForHTML() {
    const today: any = new Date();
    const dueDate: any = new Date(this.task.due_date);
    const timeDifferenz = dueDate - today;
    this.dayDifferenz = Math.ceil(timeDifferenz / (24 * 60 * 60 * 1000));
    return this.dayDifferenz;
  }
}
