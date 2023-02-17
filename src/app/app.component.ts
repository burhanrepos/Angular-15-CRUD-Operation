import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DataService } from './services/data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-crud-with-material';
  displayedColumns: string[] = ['productName',  'freshness','date','comment','category','price','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,private oDataService:DataService) {}
  ngOnInit(): void {
    this.AppComponent_GetProduct()
  }
  AppComponent_AddProduct()
  {
    this.dialog.open(DialogComponent,{
      width:'40%'
    }).afterClosed().subscribe(value=>{
      if(value==='save')
      {
        this.AppComponent_GetProduct()
      }
    });

  }

  AppComponent_GetProduct()
  {
    this.oDataService.DataService_GetProduct().subscribe({
        next:(result)=>{
          this.dataSource=new MatTableDataSource(result);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;
        },
        error:(error)=>{
          

        }
      })
    }
    AppComponent_ApplyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    AppComponent_EditRecod(row: any)
    {
      this.dialog.open(DialogComponent,{
        width:'40%',
        data:row
      }).afterClosed().subscribe(value=>{
        if(value==='update')
        {
          this.AppComponent_GetProduct()
        }
      });
    }
    AppComponent_DeleteRecod(row:any)
    {
      this.oDataService.DataService_DeleteProduct(row.id).subscribe({
        next:(result)=>{
          this.AppComponent_GetProduct()
        },
        error:(error)=>{
          

        }
      })
    }
  
  
}
