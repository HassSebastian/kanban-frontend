import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/services/data.service';
import { CrudService } from 'src/app/services/crud.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  constructor(
    private dataService: DataService,
    public crudService: CrudService,
    private authService: AuthService,
    private router: Router
  ) {}

  colors = this.dataService.colors;

  /**
   * Lifecycle hook method called after Angular initializes the component.
   * Used to perform initial setup and fetch necessary data.
   *
   * - Calls the `renderTasks` method of the `CrudService` to render tasks.
   * - Calls the `loadMembers` method of the `CrudService` to load member data.
   * - Calls the `loggedUserData` method of the `CrudService` to retrieve information about the logged-in user.
   */
  async ngOnInit() {
    await this.crudService.renderTasks();
    await this.crudService.loadMembers();
    // this.crudService.loggedUserData();
  }

  drop(event: CdkDragDrop<string[]>): void {
    /**
     * Handles the drop event when a task is moved between task status containers.
     *
     * @param event The event object containing information about the drag and drop operation.
     * - Checks if the task is moved to a different container.
     * - Retrieves the necessary information from the event and updates the task status accordingly.
     */
    if (event.previousContainer != event.container) {
      const taskElement = event.item.element.nativeElement;
      const newStatuString = event.container.id;
      const taskIdAsString = taskElement.getAttribute('data-task-id');
      if (taskIdAsString !== null) {
        const taskId = parseInt(taskIdAsString, 10);
        const newStatusAsString = newStatuString.charAt(
          newStatuString.length - 1
        );
        const newStatus = parseInt(newStatusAsString, 10);
        this.updateTaskStatus(taskId, newStatus);
      }
    }
  }

  /**
   * Updates the status of a task with the specified ID to a new status.
   *
   * @param taskId The ID of the task to be updated.
   * @param newStatus The new status to set for the task.
   * - Calls the `updateTaskStatus` method of the `CrudService` to perform the task status update.
   */
  private updateTaskStatus(taskId: number, newStatus: number): void {
    this.crudService.updateTaskStatus(taskId, newStatus);
  }

  /**
   * Retrieves the initials of the logged-in user.
   *
   * @returns A string containing the initials of the logged-in user.
   * - Calls the `loggedUserInitials` method of the `CrudService` to fetch the user's initials.
   */
  loggedUserInitials() {
    return this.crudService.loggedUserInitials();
  }

  /**
   * Retrieves the color associated with the initials of the logged-in user.
   *
   * @returns A string containing the color associated with the logged-in user's initials.
   * - Calls the `loggedUserInitialsColor` method of the `CrudService` to fetch the user's initials color.
   */
  loggedUserInitialsColor() {
    return this.crudService.loggedUserInitialsColor();
  }

  /**
   * Retrieves the name of the logged-in user.
   *
   * @returns A string containing the name of the logged-in user.
   * - Calls the `loggedUserName` method of the `CrudService` to fetch the user's name.
   */
  loggedUserName() {
    return this.crudService.loggedUserName();
  }

  /**
   * Asynchronous method to handle user logout.
   *
   * - Calls the `logout` method of the `AuthService` to log the user out.
   * - Removes the authentication token and user ID from the local storage.
   * - Navigates the user to the 'login' route after successful logout.
   * - Logs any errors to the console in case of failure.
   */
  async logout() {
    try {
      const response = await this.authService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigateByUrl('login');
    } catch (error) {
      console.log('logout', error);
    }
  }
}
