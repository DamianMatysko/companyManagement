import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Employee } from '../models/Employee-model';
import { EmployeeService } from '../services/employee.service';
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Company Management';
  DepScreen: boolean;
  EmpScreen: boolean;
  currentUser: Employee;
  users = [];

  constructor(
      private authenticationService: AuthenticationService,
      private router: Router,
      private userService: EmployeeService
  ) {
      //this.currentUser = this.authenticationService.currentUserValue;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  deleteUser(id: number) {
      this.userService.deleteEmployee(id)
          .pipe(first())
          .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
      this.userService.getEmployeeList()
          .pipe(first())
          .subscribe(users => this.users = users);
  }
}
