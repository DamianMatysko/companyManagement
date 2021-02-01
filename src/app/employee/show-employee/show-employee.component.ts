import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Employee} from '../../models/Employee-model';
import {EmployeeService} from '../../services/employee.service';
import {MatSort} from '@angular/material/sort';
import {ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogConfig} from '@angular/material/dialog';
import {AddEmployeeComponent} from '../add-employee/add-employee.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EditEmployeeComponent} from '../edit-employee/edit-employee.component';
import {dateInputsHaveChanged} from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  constructor(private service: EmployeeService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options', 'EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    // @ts-ignore
    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this.service.getEmployeeList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      console.log(data);
    });
  }

  onEdit(dep: Employee) {
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(EditEmployeeComponent, dialogConfig);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete??')) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.refreshEmployeeList();
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
    this.dialog.open(AddEmployeeComponent, dialogConfig);
  }
}
