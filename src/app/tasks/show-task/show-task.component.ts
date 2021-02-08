import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Employee} from '../../models/Employee-model';
import {TasksService} from '../../services/tasks.service';
import {Tasks} from '../../models/Tasks-model';
import {EditTaskComponent} from '../edit-task/edit-task.component';
import {AddTaskComponent} from '../add-task/add-task.component';


@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {

  constructor(private service: TasksService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options', 'TaskID', 'Employee', 'Task', 'DateOfCreation', 'Deadline', 'Status'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    // @ts-ignore
    this.refreshTasksList();
  }

  refreshTasksList() {
    this.service.getTasksList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
    console.log(this.listData);
  }

  onEdit(dep: Tasks) {
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(EditTaskComponent, dialogConfig);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete??')) {
      this.service.deleteTask(id).subscribe(res => {
        this.refreshTasksList();
        this.snackBar.open(res.toString(), '', {duration: 5000, verticalPosition: 'top'});
      });

    }
  }

  applyFilter(filtervalue: string) {
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(AddTaskComponent, dialogConfig);
  }
}
