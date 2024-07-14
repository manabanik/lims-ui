import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AmdDomesticBuxaiteService } from './amd-domestic-buxaite.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {  AmdDomesticBuxaite } from './amd-domestic-buxaite.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil, TableElement } from '@shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe, NgClass } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-amd-domestic-buxaite',
  templateUrl: './amd-domestic-buxaite.component.html',
  styleUrls: ['./amd-domestic-buxaite.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatCheckboxModule,
    FeatherIconsComponent,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatPaginatorModule,
    DatePipe
  ],
})
export class AmdDomesticBuxaiteComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  // displayedColumns = [
  //   'select',
  //   'img',
  //   'name',
  //   'title',
  //   'department',
  //   'jobType',
  //   'role',
  //   'status',
  //   'download',
  //   'actions',
  // ];

  displayedColumns = [
    'select',
    'Sample Id',
    'Analyzed By',
    'Tha',
    'Mha',
    'Rs',
    'Moisture',
    'GhRatio',
    'SizeLess150',
    'Size125',
    'Size100',
    'Action',
    'XRF'
  ];
  exampleDatabase?: AmdDomesticBuxaiteService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<AmdDomesticBuxaite>(true, []);
  index?: number;
  id?: number;
  amddomesticbuxaite?: AmdDomesticBuxaite;
  receivedFlag : boolean = false;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public amddomesticbuxaiteService: AmdDomesticBuxaiteService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        amddomesticbuxaite: this.amddomesticbuxaite,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase?.dataChange.value.unshift(
          this.amddomesticbuxaiteService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  editCall(row: AmdDomesticBuxaite) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        amddomesticbuxaite: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.amddomesticbuxaiteService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
          this.showNotification(
            'black',
            'Received Successfully...!!!',
            'bottom',
            'center'
          );
          this.receivedFlag = true;
        }
      }
    });
    this.receivedFlag = true;
  }
  // deleteItem(i: number, row: amdimportbuxaite) {
  //   this.index = i;
  //   this.id = row.id;
  //   let tempDirection: Direction;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     height: '280px',
  //     width: '380px',
  //     data: row,
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 1) {
  //       const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
  //         (x) => x.id === this.id
  //       );
  //       // for delete we use splice in order to remove single object from DataService
  //       if (foundIndex != null && this.exampleDatabase) {
  //         this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
  //         this.refreshTable();
  //         this.showNotification(
  //           'snackbar-danger',
  //           'Delete Record Successfully...!!!',
  //           'bottom',
  //           'center'
  //         );
  //       }
  //     }
  //   });
  // }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource?.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index = this.dataSource?.renderedData.findIndex((d) => d === item);
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase?.dataChange.value.splice(index, 1);

      this.refreshTable();
      this.selection = new SelectionModel<AmdDomesticBuxaite>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new AmdDomesticBuxaiteService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

  // export table data in excel file
  // exportExcel() {
  //   // key name with space add in brackets
  //   const exportData: Partial<TableElement>[] =
  //     this.dataSource.filteredData.map((x) => ({
  //       Name: x.name,
  //       'Job Title': x.title,
  //       Department: x.department,
  //       'Job Type': x.jobType,
  //       Role: x.role,
  //       Status: x.status,
  //     }));

  //   TableExportUtil.exportToExcel(exportData, 'excel');
  // }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: AmdDomesticBuxaite) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}
export class ExampleDataSource extends DataSource<AmdDomesticBuxaite> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AmdDomesticBuxaite[] = [];
  renderedData: AmdDomesticBuxaite[] = [];
  constructor(
    public exampleDatabase: AmdDomesticBuxaiteService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AmdDomesticBuxaite[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllAmdDomesticBuxaite();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((amddomesticbuxaite: AmdDomesticBuxaite) => {
            const searchStr = (
              amddomesticbuxaite.SampleId +
              amddomesticbuxaite.AnalyzedBy +
              amddomesticbuxaite.Tha +
              amddomesticbuxaite.Mha +
              amddomesticbuxaite.Rs +
              amddomesticbuxaite.Moisture +
              amddomesticbuxaite.GhRatio +
              amddomesticbuxaite.SizeLess150 +
              amddomesticbuxaite.Size125 +
              amddomesticbuxaite.Size100 +
              amddomesticbuxaite.Action 
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {
    //disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: AmdDomesticBuxaite[]): AmdDomesticBuxaite[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'Sample Id':
          [propertyA, propertyB] = [a.SampleId, b.SampleId];
          break;
        case 'Analyzed By':
          [propertyA, propertyB] = [a.AnalyzedBy, b.AnalyzedBy];
          break;
        case 'Tha':
          [propertyA, propertyB] = [a.Tha, b.Tha];
          break;
        case 'Mha':
          [propertyA, propertyB] = [a.Mha, b.Mha];
          break;
        case 'Rs':
          [propertyA, propertyB] = [a.Rs, b.Rs];
          break;
        case 'Moisture':
          [propertyA, propertyB] = [a.Moisture, b.Moisture];
          break;
        case 'GhRatio':
          [propertyA, propertyB] = [a.GhRatio, b.GhRatio];
          break;
        case 'Size Less 150':
          [propertyA, propertyB] = [a.SizeLess150, b.SizeLess150];
          break;
        case 'Size 125':
          [propertyA, propertyB] = [a.Size125, b.Size125];
          break;  
          case 'Size 100':
            [propertyA, propertyB] = [a.Size100, b.Size100];
            break;  
            case 'Action':
              [propertyA, propertyB] = [a.Action, b.Action];
              break;  
            
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
  
}
