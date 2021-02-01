import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  listItems: Array<string> = [];

  get service(): TasksService {
    return this._service;
  }

  constructor(
    public dialogbox: MatDialogRef<EditTaskComponent>,
    private _service: TasksService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.dropdownRefresh();
  }

  onSubmit(form: NgForm) {
    this._service.updateTasks(form.value).subscribe(res => {
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
    this._service.getDepDropdownValues().subscribe(data => {
      console.log(data);
      data.forEach(element => {
        this.listItems.push(element['EmployeeName']);
      });
    });
  }
}
