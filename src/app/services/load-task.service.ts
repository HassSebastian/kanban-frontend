import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadTaskService {
  tasks: any = [];
  error: string = '';

  constructor(private http: HttpClient) {}


async renderSite(){
  try {
    this.tasks = await this.loadTasks();
  } catch (e) {
    this.error = 'Fehler beim laden';
  }

}


  loadTasks() {
    const url = environment.baseUrl + '/board/';
    return lastValueFrom(this.http.get(url));
  }
}
