import {Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';
import {TasksService} from '../../services/tasks.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  listItems: Array<string> = [];


  get service(): TasksService {
    return this._service;
  }

  constructor(
    public dialogbox: MatDialogRef<AddTaskComponent>,
    private _service: TasksService,
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
    this._service.addTasks(form.value).subscribe(res => {
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
      TaskID: 0,
      Employee: '',
      Task: '',
      DateOfCreation: null,
      Deadline: null,
      Status: ''
    };
  }

  dropdownRefresh() {
    this._service.getDepDropdownValues().subscribe(data => {
      console.log(data);
      data.forEach(element => {
        this.listItems.push(element['EmployeeName']);
      });
    });
  }
}
