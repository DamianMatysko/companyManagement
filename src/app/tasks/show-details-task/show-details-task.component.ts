import {Component, OnInit, ViewChild} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-show-details-task',
  templateUrl: './show-details-task.component.html',
  styleUrls: ['./show-details-task.component.css']
})
export class ShowDetailsTaskComponent implements OnInit {
  constructor(public service: TasksService,
              public dialogbox: MatDialogRef<ShowDetailsTaskComponent>,
  ) {
  }

  listData: MatTableDataSource<any>;


  ngOnInit(): void {
    // @ts-ignore
    this.refreshTasksList();
  }

  refreshTasksList() {
    this.service.getTasksList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
    });
    console.log(this.listData);
  }

  onClose() {
    this.dialogbox.close();
  }
}
