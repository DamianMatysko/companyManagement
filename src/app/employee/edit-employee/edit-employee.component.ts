import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DepartmentService} from '../../services/department.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';
import {EmployeeService} from '../../services/employee.service';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  listItems: Array<string> = [];

  get service(): EmployeeService {
    return this._service;
  }

  constructor(
    public dialogbox: MatDialogRef<EditEmployeeComponent>,
    private _service: EmployeeService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.dropdownRefresh();
  }

  onSubmit(form: NgForm) {
    this._service.updateEmployee(form.value).subscribe(res => {
      this.snackBar.open(res.toString(), '', {
        duration: 5000,
        verticalPosition: 'top',
      });
      this.dialogbox.close();
    });
  }

  onClose() {
    this.dialogbox.close();
  }

  dropdownRefresh() {
    this.service.getDepDropdownValues().subscribe(data => {
      console.log(data);
      data.forEach(element => {
        this.listItems.push(element['DepartmentName']);
      });
    });
  }
}
