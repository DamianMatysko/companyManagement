import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Department} from '../models/Department-model';
import {Observable} from 'rxjs';
import {Employee} from '../models/Employee-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {
  }

  readonly APIUrl = 'https://localhost:44339/api';

  formData: Employee;

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.APIUrl + '/Employee');
  }

  addEmployee(emp: Employee) {
    return this.http.post(this.APIUrl + '/Employee', emp);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.APIUrl + '/Employee/' + id);
  }

  updateEmployee(emp: Department) {
    return this.http.put(this.APIUrl + '/Employee', emp);
  }

  getDepDropdownValues(): Observable<any> {
    return this.http.get<Department[]>(this.APIUrl + '/department');
  }
}
