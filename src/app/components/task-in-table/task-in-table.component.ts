import { Component, Input } from '@angular/core';
import { DialogTaskDetailComponent } from 'src/app/dialog/dialog-task-detail/dialog-task-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-task-in-table',
  templateUrl: './task-in-table.component.html',
  styleUrls: ['./task-in-table.component.scss'],
})
export class TaskInTableComponent {
  @Input() task!: any;

  openDueDate: boolean = false;
  openDescription: boolean = false;

  selectPropertie: number = 0;

  colors = this.dataService.colors;
  allMembers = this.crudService.allMembers;

  constructor(
    private dialog: MatDialog,
    public dataService: DataService,
    public crudService: CrudService
  ) {}

  ngOnInit() {}

  /**
   * Opens a dialog to display detailed information about a task.
   *
   * - Retrieves the task information from the component's task property.
   * - Opens a dialog of type `DialogTaskDetailComponent` with the task data.
   */
  openTaskDetail() {
    const task = this.task;
    this.dialog.open(DialogTaskDetailComponent, { data: task });
  }

  /**
   * Handles button clicks based on the provided index.
   *
   * @param index The index representing the button action to be performed.
   * @param event The click event associated with the button click.
   * - Stops the event propagation to prevent undesired side effects.
   * - Defines actions corresponding to specific button indices and executes them.
   *   - Index 1: Toggles the visibility of the task description.
   *   - Index 2: Toggles the visibility of the task due date.
   *   - Index 3: Opens a dialog to display detailed information about the task.
   */
  button(index: 1 | 2 | 3, event: Event) {
    event.stopPropagation();
    const actions = {
      1: () => (this.openDescription = !this.openDescription),
      2: () => (this.openDueDate = !this.openDueDate),
      3: () => this.openTaskDetail(),
    };
    actions[index]?.();
  }

  /**
   * Formats the due date of the task for display in HTML.
   *
   * @returns A formatted date string in German locale with the year, month, and day.
   * - Converts the task's due date to a Date object.
   * - Uses the `toLocaleDateString` method with the 'de-DE' locale to format the date.
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
}
