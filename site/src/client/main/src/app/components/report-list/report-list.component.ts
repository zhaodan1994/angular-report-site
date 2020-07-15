import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/api/api.service';
import {ReportListModel} from '../../models/report-list.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  reportData = {
    'canvas':[],
    'svg':[]
  };
  currentRender = 'svg';
  displayedColumns: string[] = ['start', 'testResult', 'end', 'duration'];
  dataSource: MatTableDataSource<ReportListModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('dialogTemplate') customDialog: TemplateRef<any>;

  dialogData = 'Delete Successfully !';
  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.loadReportList();
    
  }

  loadReportList() {
    this.apiService.reportList()
    .subscribe((data) => {
      this.reportData.svg = data.svg.reverse();
      this.reportData.canvas = data.canvas.reverse();
      if (this.currentRender === 'svg') {
        this.dataSource = new MatTableDataSource<ReportListModel>(this.reportData.svg);
      } else {
        this.dataSource = new MatTableDataSource<ReportListModel>(this.reportData.canvas);
      }
      
      //this.dataSource.paginator = this.paginator;
    });
  }

  changeTab(index: number) {
    if (index === 0 ) {
      this.currentRender = 'svg';
      this.dataSource = new MatTableDataSource<ReportListModel>(this.reportData.svg);
    } else {
      this.currentRender = 'canvas';
      this.dataSource = new MatTableDataSource<ReportListModel>(this.reportData.canvas);
    }

  }

  deleteReport() {
    this.apiService.deleteReport().subscribe(data => {
      if (data.data !== 'ok') {
        this.dialogData = 'Delete Failed !' + data.data;
      } 
      this.loadReportList();
      const dialogConfig = new MatDialogConfig();      
      dialogConfig.width = '250px';
      dialogConfig.position = {
         top: '150px' ,
         left: '350px'
      }

      this.dialog.open(this.customDialog, dialogConfig);
    })
  }

}




