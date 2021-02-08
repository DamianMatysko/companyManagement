import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';
import {EmployeeService} from '../../services/employee.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  listItems: Array<string> = [];

  get service(): EmployeeService {
    return this._service;
  }

  constructor(
    public dialogbox: MatDialogRef<AddEmployeeComponent>,
    private _service: EmployeeService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.resetForm();
    this.dropdownRefresh();
  }

  onClose() {
    this.dialogbox.close();

  }

  onSubmit(form: NgForm) {
    this.service.addEmployee(form.value).subscribe(res => {
      this.resetForm(form);
      this.snackBar.open(res.toString(), '', {duration: 3000, verticalPosition: 'top'});
    });
    this.dialogbox.close();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this._service.formData = {
      EmployeeID: 0,
      EmployeeName: '',
      Department: '',
      MailID: '',
      DOJ: null,
      Password: '',
      token: ''
    };
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
