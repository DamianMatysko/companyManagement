import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/Department-model';
import { Observable } from 'rxjs';
//import { Employee } from '../models/Employee-model';


import { Employee } from '../models/Employee-model';

//import { catchError, map } from 'rxjs/operators';
//import { Auth } from '../entities/auth';


//import { Employee } from '../entities/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private token: string = null;
  
  constructor(private http: HttpClient) {
  }

  readonly APIUrl = 'https://localhost:44381/api';

  formData: Employee;

/*
  login(auth:Auth): Observable<boolean> {
    return this.http.post(this.APIUrl + "login", auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        return true;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401 ) {
          return of(false);
        }
        return throwError(error);
      })
    );
  }
*/
/*
  getUsersSynchronne():Employee[] {
    return this.users;
  }
*/

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

  register(user: Employee) {
      return this.http.post(this.APIUrl + '/Employee/register', user);
  }
}
