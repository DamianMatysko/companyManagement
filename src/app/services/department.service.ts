import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/Department-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  readonly APIUrl = 'https://localhost:44381/api';

  formData: Department;

  getDepartmentList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.APIUrl + '/Department');
  }

  addDepartment(dep: Department) {
    return this.http.post(this.APIUrl + '/Department', dep);
  }

  deleteDepartment(id: number) {
    return this.http.delete(this.APIUrl + '/Department/' + id);
  }

  updateDepartment(dep: Department) {
    return this.http.put(this.APIUrl + '/Department', dep);
  }
}
