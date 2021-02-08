import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../models/Employee-model';
import {Observable} from 'rxjs';
import {Department} from '../models/Department-model';
import {Tasks} from '../models/Tasks-model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {
  }

  readonly APIUrl = 'https://localhost:44381/api';

  formData: Tasks;

  getTasksList(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.APIUrl + '/Tasks');
  }

  addTasks(tas: Tasks) {
    return this.http.post(this.APIUrl + '/Tasks', tas);
  }

  deleteTask(id: number) {
    return this.http.delete(this.APIUrl + '/Tasks/' + id);
  }

  updateTasks(tas: Tasks) {
    return this.http.put(this.APIUrl + '/Tasks', tas);
  }

  getDepDropdownValues(): Observable<any> {
    return this.http.get<Employee[]>(this.APIUrl + '/employee');
  }
}
