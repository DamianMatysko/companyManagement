import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EmployeeComponent} from './employee/employee.component';
import {DepartmentComponent} from './department/department.component';
import {TasksComponent} from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DepartmentService } from './services/department.service';
import { EmployeeService } from './services/employee.service';
import { ShowDepartmentComponent } from './department/show-department/show-department.component';
import { ShowEmployeeComponent } from './employee/show-employee/show-employee.component';

/*
const routes: Routes = [
  {path: 'employee', component: EmployeeComponent},
  {path: 'department', component: DepartmentComponent},
  {path: 'tasks', component: TasksComponent}
];
*/

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'employee', component: EmployeeComponent }, 
  { path: 'tasks', component: TasksComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
