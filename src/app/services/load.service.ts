import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  tasks: any = [];
  error: string = '';
  members: any = [];
  addMemberArray: any = [];

  constructor(private http: HttpClient) {}

  async renderSite() {
    try {
      this.tasks = await this.loadTasks();
    } catch (e) {
      this.error = 'Fehler beim laden der Seite';
    }
  }
  async renderUsers() {
    // try {
    //   this.members = await this.loadAllUsers();
    //   console.log('Members = ', this.members);
    // } catch (e) {
    //   console.log('fehler beim Laden der User', e);
    // }
  }

  loadTasks() {
    const url = environment.baseUrl + '/board/';
    return lastValueFrom(this.http.get(url));
  }

  loadAllUsers() {
    const url = environment.baseUrl + '/api/get_all_users/';
    return this.http.get(url);
  }

  getAddMemberArray() {
    return this.addMemberArray;
  }
}
