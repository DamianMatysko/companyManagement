import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Department} from '../../models/Department-model';
import {DepartmentService} from '../../services/department.service';
import {MatSort} from '@angular/material/sort';
import {ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogConfig} from '@angular/material/dialog';
import {AddDepartmentComponent} from '../add-department/add-department.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EditDepartmentComponent} from '../edit-department/edit-department.component';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit {

  constructor(private service: DepartmentService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options', 'DepartmentID', 'DepartmentName'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    // @ts-ignore
    this.refreshDepartmentList();
  }

  refreshDepartmentList() {
//    var data = [{DepartmentID: 1, DepartmentName: 'IT'}, {DepartmentID: 2, DepartmentName: 'Finance'}];
//    this.listData = new MatTableDataSource(data);
    this.service.getDepartmentList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

  onEdit(dep: Department) {
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(EditDepartmentComponent, dialogConfig);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete??')) {
      this.service.deleteDepartment(id).subscribe(res => {
        this.refreshDepartmentList();
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
    this.dialog.open(AddDepartmentComponent, dialogConfig);
  }
}
