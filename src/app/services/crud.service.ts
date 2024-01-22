import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { FunctionsService } from './functions.service';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './data.service';
import { ErrorDialogComponent } from '../dialog/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  tasks: any = [];
  lastTask: any = [];
  allMembers: any = [];
  membersSelectForTask: any = [];

  loggedUserId: number = 0;

  colors = this.dataService.colors;


  saveOk: boolean = false;
  progressBar: boolean = false;

  constructor(
    private dialog: MatDialog,
    private dataService: DataService,

    private http: HttpClient,
    // private fuctionsService: FunctionsService
  ) {}

  /**
   * Logs out the user by sending a POST request to the logout endpoint.
   *
   * @returns An observable of the HTTP response for the logout request.
   *
   */
  async renderTasks() {
    try {
      this.progressBar = true;
      this.tasks = await this.loadTasks();
      this.progressBar = false;
    } catch (error) {
      this.serverError(error);
    }
  }

  /**
   * Loads members asynchronously.
   * - Displays a progress bar during the loading process.
   * - Calls the 'loadAllMembers' method to fetch all members.
   * - Updates the 'allMembers' property with the loaded members.
   * - Hides the progress bar when the loading process is complete.
   *
   */
  loadTasks() {
    const url = environment.baseUrl + '/board/';
    return lastValueFrom(this.http.get(url));
  }

  /**
   * Deletes a task with the specified ID.
   *
   * @param taskId - The ID of the task to be deleted.
   * @returns A Promise that resolves after the task is successfully deleted.
   *
   */
  async deleteTask(taskId: number) {
    const url = environment.baseUrl + '/board/' + taskId;
    try {
      this.progressBar = true;
      await lastValueFrom(this.http.delete(url));
      this.renderTasks();
      this.progressBar = false;
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      this.serverError(error);
    }
  }

  /**
   * Updates a task with the specified ID using the provided data.
   *
   * @param taskId - The ID of the task to be updated.
   * @param updateTask - The updated data for the task.
   * @returns A Promise that resolves after the task is successfully updated.
   *
   */
  async updateTask(taskId: number, updateTask: any) {
    const url = environment.baseUrl + '/board/' + taskId;
    try {
      this.progressBar = true;
      const response = await this.http.put(url, updateTask).toPromise();
      console.log('Task erfolgreich aktualisiert:', response);
      this.renderTasks();
      this.progressBar = false;
    } catch (error) {
      console.error('Fehler beim Task-Update:', error);
      this.serverError(error);
    }
  }

  /**
   * Saves a new task with the provided data.
   *
   * @param taskData - The data for the new task.
   * @returns A Promise that resolves with the response containing the newly added task.
   *
   */
  async saveTask(taskData: any) {
    const url = environment.baseUrl + '/board/';
    try {
      this.progressBar = true;
      const response = await this.http.post(url, taskData).toPromise();
      this.lastTask = response;
      console.log('Todo added successfully', response);
      this.saveOk = true;
      this.progressBar = false;
      this.renderTasks();
    } catch (error) {
      console.warn('Save Error = ', error);
      this.serverError(error);
    }
  }

  /**
   * Renders tasks by loading them asynchronously.
   * - Displays a progress bar during the loading process.
   * - Calls the 'loadTasks' method to fetch tasks.
   * - Updates the 'tasks' property with the loaded tasks.
   * - Hides the progress bar when the loading process is complete.
   *
   */
  async loadMembers() {
    try {
      this.progressBar = true;
      let members = await this.loadAllMembers();
      this.allMembers = members;
      this.progressBar = false;
    } catch (error) {
      console.log('fehler beim Laden der User', error);
      this.serverError(error);
    }
  }

  /**
   * Loads tasks asynchronously by sending a GET request to the board endpoint.
   *
   * @returns An observable of the HTTP response containing the loaded tasks.
   *
   */
  loadAllMembers() {
    const url = environment.baseUrl + '/board/api/get_all_members/';
    return lastValueFrom(this.http.get(url));
  }

    /**
   * Loads all members asynchronously by sending a GET request to the get_all_members endpoint.
   *
   * @returns An observable of the HTTP response containing the loaded members.
   *
   */
    loggedUserInitialsColor() {
      const userColor = this.allMembers[this.loggedUserData()]?.color;
      return 'hsl(' + this.colors[userColor]?.color + ', 100%, 50%)';
    }
  
    /**
     * Retrieves the color associated with the logged-in user's initials.
     *
     * @returns A string representing the color in HSL format.
     *
     */
    loggedUserInitials() {
      return this.allMembers[this.loggedUserData()]?.initials;
    }
  
    /**
     * Retrieves the initials associated with the logged-in user.
     *
     * @returns A string representing the user's initials.
     *
     */
    loggedUserName() {
      return this.allMembers[this.loggedUserData()]?.username;
    }
  
    /**
     * Retrieves the index of the logged-in user in the 'allMembers' array based on the user's ID stored in localStorage.
     *
     * @returns A numeric index representing the position of the logged-in user in the 'allMembers' array.
     *
     */
    loggedUserData() {
      const userId: any = localStorage.getItem('user');
      const parseUserId = parseInt(userId);
      const userIdInMembers = this.allMembers.findIndex(
        (member: { user_id: any }) => member.user_id === parseUserId
      );
      return userIdInMembers;
    }
  
    /**
     * Retrieves the initials associated with a collaborator based on the collaborator's index.
     *
     * @param collaboratorIndex - The index of the collaborator in the 'allMembers' array.
     * @returns A string representing the collaborator's initials.
     *
     */
    collaboratorInitials(collaboratorIndex: number) {
      return this.allMembers[this.collaboratorData(collaboratorIndex)]?.initials;
    }
  
    /**
     * Retrieves the color associated with a collaborator's initials based on the collaborator's index.
     *
     * @param collaboratorIndex - The index of the collaborator in the 'allMembers' array.
     * @returns A string representing the color in HSL format.
     *
     */
    collaboratorInitialsColor(collaboratorIndex: number) {
      const userColor =
        this.allMembers[this.collaboratorData(collaboratorIndex)]?.color;
      return 'hsl(' + this.colors[userColor]?.color + ', 100%, 50%)';
    }
  
    /**
     * Retrieves the username associated with a collaborator based on the collaborator's index.
     *
     * @param collaboratorIndex - The index of the collaborator in the 'allMembers' array.
     * @returns A string representing the collaborator's username.
     *
     */
    collaboratorName(collaboratorIndex: number) {
      return this.allMembers[this.collaboratorData(collaboratorIndex)]?.username;
    }
  
    /**
     * Retrieves the index of the collaborator in the 'allMembers' array based on the collaborator's user ID.
     *
     * @param collaboratorIndex - The user ID of the collaborator.
     * @returns A numeric index representing the position of the collaborator in the 'allMembers' array.
     *
     */
    collaboratorData(collaboratorIndex: number) {
      const memberIndex = this.allMembers.findIndex(
        (member: { user_id: number }) => member.user_id === collaboratorIndex
      );
      return memberIndex;
    }
  
    /**
     * Updates the status of a task with the specified ID.
     *
     * @param taskId - The ID of the task to be updated.
     * @param newTaskStatus - The new status to be assigned to the task.
     *
     */
    updateTaskStatus(taskId: number, newTaskStatus: number) {
      const updateTaskIndex = this.tasks.findIndex(
        (task: { id: number }) => task.id === taskId
      );
      const updateTask = this.tasks[updateTaskIndex];
      updateTask.status = newTaskStatus;
      this.updateTask(taskId, updateTask);
    }
  
    /**
     * Handles and displays appropriate error messages based on the server response.
     *
     * @param error - The error object, possibly an instance of HttpErrorResponse.
     *
     */
    serverError(error: any) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          this.returnServerError();
        }
        if (error.status === 400) {
          this.returnTaskError(error);
        }
      }
    }
  
    /**
     * Displays a dialog for a server unreachable error.
     *
     */
    returnServerError() {
      this.dialog.open(ErrorDialogComponent, {
        data: { title: 'Server Error', message: 'Server nicht erreichbar' },
      });
    }
  
    /**
     * Displays a dialog for a 400 Bad Request error related to task titles.
     *
     * @param error - The error object, possibly an instance of HttpErrorResponse.
     *
     */
    returnTaskError(error: any) {
      this.dialog.open(ErrorDialogComponent, {
        data: { title: 'Task Titel', message: error.error.title },
      });
    }
  
}
