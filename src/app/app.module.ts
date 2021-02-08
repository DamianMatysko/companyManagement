import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {EmployeeComponent} from './employee/employee.component';
import {ShowEmployeeComponent} from './employee/show-employee/show-employee.component';
import {EditEmployeeComponent} from './employee/edit-employee/edit-employee.component';
import {AddEmployeeComponent} from './employee/add-employee/add-employee.component';
import {DepartmentComponent} from './department/department.component';
import {ShowDepartmentComponent} from './department/show-department/show-department.component';
import {EditDepartmentComponent} from './department/edit-department/edit-department.component';
import {AddDepartmentComponent} from './department/add-department/add-department.component';
import {DepartmentService} from './services/department.service';
import {EmployeeService} from './services/employee.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {TasksService} from './services/tasks.service';
import { TasksComponent } from './tasks/tasks.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { ShowTaskComponent } from './tasks/show-task/show-task.component';
import { ShowDetailsTaskComponent } from './tasks/show-details-task/show-details-task.component';
import {AlertComponent} from './components/alert.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login';
import {HomeComponent} from './home';
import {RegisterComponent} from './register';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ShowEmployeeComponent,
    EditEmployeeComponent,
    AddEmployeeComponent,
    DepartmentComponent,
    ShowDepartmentComponent,
    EditDepartmentComponent,
    AddDepartmentComponent,
    ShowEmployeeComponent,
    TasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    ShowTaskComponent,
    ShowDetailsTaskComponent,
    AlertComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSortModule,
    OverlayModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    DepartmentService,
    EmployeeService,
    TasksService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddDepartmentComponent]
})
export class AppModule {
}
