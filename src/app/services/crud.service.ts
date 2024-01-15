import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private dialog: MatDialog
  ) {}

  async renderTasks() {
    try {
      this.tasks = await this.loadTasks();
    } catch (error) {
      this.serverError(error)
      // this.dialog.open(ErrorDialogComponent, {
      //   data: { title: 'Task Error', message: 'Fehler beim laden der Tasks' },
      // });
      // console.log((error = 'Fehler beim laden der Tasks'));
    }
  }

  async loadMembers() {
    try {
      let members = await this.loadAllMembers();
      this.allMembers = members;
    } catch (error) {
      console.log('fehler beim Laden der User', error);
      this.serverError(error)
      // if (error instanceof HttpErrorResponse) {
      //   if (error.status === 0) {
      //     this.dialog.open(ErrorDialogComponent, {
      //       data: { title: 'Server Error', message: 'Server nicht erreichbar' },
      //     });
      //   }
      // }
    }
  }

  loadTasks() {
    const url = environment.baseUrl + '/board/';
    return lastValueFrom(this.http.get(url));
  }

  loadAllMembers() {
    const url = environment.baseUrl + '/board/api/get_all_members/';
    return lastValueFrom(this.http.get(url));
  }

  loggedUserInitialsColor() {
    const userColor = this.allMembers[this.loggedUserData()]?.color;
    return 'hsl(' + this.colors[userColor]?.color + ', 100%, 50%)';
  }

  loggedUserInitials() {
    return this.allMembers[this.loggedUserData()]?.initials;
  }

  loggedUserData() {
    const userId: any = localStorage.getItem('user');
    const parseUserId = parseInt(userId);
    const userIdInMembers = this.allMembers.findIndex(
      (member: { user_id: any }) => member.user_id === parseUserId
    );
    return userIdInMembers;
  }

  collaboratorInitials(collaboratorIndex: number) {
    return this.allMembers[this.collaboratorData(collaboratorIndex)]?.initials;
  }

  collaboratorInitialsColor(collaboratorIndex: number) {
    const userColor =
      this.allMembers[this.collaboratorData(collaboratorIndex)]?.color;
    return 'hsl(' + this.colors[userColor]?.color + ', 100%, 50%)';
  }

  collaboratorName(collaboratorIndex: number) {
    return this.allMembers[this.collaboratorData(collaboratorIndex)]?.username;
  }

  collaboratorData(collaboratorIndex: number) {
    const memberIndex = this.allMembers.findIndex(
      (member: { user_id: number }) => member.user_id === collaboratorIndex
    );
    return memberIndex;
  }

  async deleteTask(taskId: number) {
    const url = environment.baseUrl + '/board/' + taskId;
    try {
      await lastValueFrom(this.http.delete(url));
      this.renderTasks();
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      this.serverError(error)
      // if (error instanceof HttpErrorResponse) {
      //   if (error.status === 0) {
      //     this.dialog.open(ErrorDialogComponent, {
      //       data: { title: 'Server Error', message: 'Server nicht erreichbar' },
      //     });
      //   }
      // }
    }
  }

  async updateTask(taskId: number, updateTask: any) {
    const url = environment.baseUrl + '/board/' + taskId;
    try {
      const response = await this.http.put(url, updateTask).toPromise();
      console.log('Task erfolgreich aktualisiert:', response);
      this.renderTasks();
    } catch (error) {
      console.error('Fehler beim Task-Update:', error);
      this.serverError(error)
      // if (error instanceof HttpErrorResponse) {
      //   if (error.status === 0) {
      //     this.dialog.open(ErrorDialogComponent, {
      //       data: { title: 'Server Error', message: 'Server nicht erreichbar' },
      //     });
      //   }
      // }
    }
  }

  async saveTask(taskData: any) {
    const url = environment.baseUrl + '/board/';
    try {
      const response = await this.http.post(url, taskData).toPromise();
      this.lastTask = response;
      console.log('Todo added successfully', response);
      this.renderTasks();
    } catch (error) {
      // throw error;
      console.warn('Save Error = ', error);
      this.serverError(error)
      // if (error instanceof HttpErrorResponse) {
      //   if (error.status === 0) {
      //     this.dialog.open(ErrorDialogComponent, {
      //       data: { title: 'Server Error', message: 'Server nicht erreichbar' },
      //     });
      //   }
      //   if (error.status === 400) {
      //     this.dialog.open(ErrorDialogComponent, {
      //       data: { title: 'Task Titel', message: error.error.title },
      //     });
      //   }
      // }
    }
  }

  serverError(error:any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.dialog.open(ErrorDialogComponent, {
          data: { title: 'Server Error', message: 'Server nicht erreichbar' },
        });
      }
      if (error.status === 400) {
        this.dialog.open(ErrorDialogComponent, {
          data: { title: 'Task Titel', message: error.error.title },
        });
      }
    }
  }
}
