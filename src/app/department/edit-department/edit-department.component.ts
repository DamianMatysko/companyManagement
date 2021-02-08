import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DepartmentService} from '../../services/department.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  get service(): DepartmentService {
    return this._service;
  }

  constructor(
    public dialogbox: MatDialogRef<EditDepartmentComponent>,
    private _service: DepartmentService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this._service.updateDepartment(form.value).subscribe(res => {
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
}
