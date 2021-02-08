import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {DepartmentService} from '../../services/department.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  get service(): DepartmentService {
    return this._service;
  }

  constructor(
    public dialogbox: MatDialogRef<AddDepartmentComponent>,
    private _service: DepartmentService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.resetForm();
  }

  onClose() {
    this.dialogbox.close();
  }

  onSubmit(form: NgForm) {
    //console.log(form.value);
    this.service.addDepartment(form.value).subscribe(res => {
      this.resetForm(form);
      this.snackBar.open(res.toString(), '', {duration: 3000, verticalPosition: 'top'});
      this.dialogbox.close();
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this._service.formData = {
      DepartmentID: 0,
      DepartmentName: ''
    };
  }
}
