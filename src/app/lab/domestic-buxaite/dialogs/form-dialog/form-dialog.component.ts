import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe, NgClass } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { DomesticBuxaite } from '../../domestic-buxaite.model';
import * as XLSX from 'xlsx';

export interface DialogData {
  sampleId: string;
  sampleDatetime: string;
  shift: string;
  SiO2?: string;
  Fe2O3?: string;
  TiO2?: string;
  V2O5?: string;
  P2O5?: string;
  Na2O?: string;
  CaO?: string;
  ZnO?: string;
  AlphaAlumina?: string;
  remarks: string;
  isManual: string;
  isConfirm: string;
  analysisBy: string;
  analysisDate: string;
  modifiedBy: string;
  modifiedDate: string;
  isEditing?: boolean;
  headerValue?: string;
  row?: DomesticBuxaite;
  path?: string;
}
const SAMPLE_DATA: DialogData[] = [
  {
    sampleId: "12345",
    sampleDatetime: "2023-07-07T10:00:00Z",
    shift: "Morning",
    SiO2: "25.67",
    Fe2O3: "5.43",
    TiO2: "1.23",
    V2O5: "0.56",
    P2O5: "0.78",
    Na2O: "3.21",
    CaO: "7.89",
    ZnO: "0.65",
    remarks: "Sample collected from north section",
    isManual: "true",
    isConfirm: "false",
    analysisBy: "Dr. Smith",
    analysisDate: "2023-07-07T14:00:00Z",
    modifiedBy: "John Doe",
    modifiedDate: "2023-07-08T09:00:00Z",
    AlphaAlumina: "101"
  },
  {
    sampleId: "12346",
    sampleDatetime: "2023-07-08T10:00:00Z",
    shift: "Afternoon",
    SiO2: "22.34",
    Fe2O3: "4.56",
    TiO2: "1.34",
    V2O5: "0.67",
    P2O5: "0.89",
    Na2O: "3.12",
    CaO: "7.45",
    ZnO: "0.75",
    remarks: "Sample collected from south section",
    isManual: "false",
    isConfirm: "true",
    analysisBy: "Dr. Doe",
    analysisDate: "2023-07-08T14:00:00Z",
    modifiedBy: "Jane Doe",
    modifiedDate: "2023-07-08T09:00:00Z",
    AlphaAlumina: "101"
  },
  {
    sampleId: "12345",
    sampleDatetime: "2023-07-07T10:00:00Z",
    shift: "Morning",
    SiO2: "25.67",
    Fe2O3: "5.43",
    TiO2: "1.23",
    V2O5: "0.56",
    P2O5: "0.78",
    Na2O: "3.21",
    CaO: "7.89",
    ZnO: "0.65",
    remarks: "Sample collected from north section",
    isManual: "true",
    isConfirm: "false",
    analysisBy: "Dr. Smith",
    analysisDate: "2023-07-07T14:00:00Z",
    modifiedBy: "John Doe",
    modifiedDate: "2023-07-08T09:00:00Z",
    AlphaAlumina: "101"
  },
  {
    sampleId: "12346",
    sampleDatetime: "2023-07-08T10:00:00Z",
    shift: "Afternoon",
    SiO2: "22.34",
    Fe2O3: "4.56",
    TiO2: "1.34",
    V2O5: "0.67",
    P2O5: "0.89",
    Na2O: "3.12",
    CaO: "7.45",
    ZnO: "0.75",
    remarks: "Sample collected from south section",
    isManual: "false",
    isConfirm: "true",
    analysisBy: "Dr. Doe",
    analysisDate: "2023-07-08T14:00:00Z",
    modifiedBy: "Jane Doe",
    modifiedDate: "2023-07-08T09:00:00Z",
    AlphaAlumina: "101"
  },
  {
    sampleId: "12345",
    sampleDatetime: "2023-07-07T10:00:00Z",
    shift: "Morning",
    SiO2: "25.67",
    Fe2O3: "5.43",
    TiO2: "1.23",
    V2O5: "0.56",
    P2O5: "0.78",
    Na2O: "3.21",
    CaO: "7.89",
    ZnO: "0.65",
    remarks: "Sample collected from north section",
    isManual: "true",
    isConfirm: "false",
    analysisBy: "Dr. Smith",
    analysisDate: "2023-07-07T14:00:00Z",
    modifiedBy: "John Doe",
    modifiedDate: "2023-07-08T09:00:00Z",
    AlphaAlumina: "101"
  },
  {
    sampleId: "12346",
    sampleDatetime: "2023-07-08T10:00:00Z",
    shift: "Afternoon",
    SiO2: "22.34",
    Fe2O3: "4.56",
    TiO2: "1.34",
    V2O5: "0.67",
    P2O5: "0.89",
    Na2O: "3.12",
    CaO: "7.45",
    ZnO: "0.75",
    remarks: "Sample collected from south section",
    isManual: "false",
    isConfirm: "true",
    analysisBy: "Dr. Doe",
    analysisDate: "2023-07-08T14:00:00Z",
    modifiedBy: "Jane Doe",
    modifiedDate: "2023-07-08T09:00:00Z",
    AlphaAlumina: "101"
  },
  {
    sampleId: "12345",
    sampleDatetime: "2023-07-07T10:00:00Z",
    shift: "Morning",
    SiO2: "25.67",
    Fe2O3: "5.43",
    TiO2: "1.23",
    V2O5: "0.56",
    P2O5: "0.78",
    Na2O: "3.21",
    CaO: "7.89",
    ZnO: "0.65",
    remarks: "Sample collected from north section",
    isManual: "true",
    isConfirm: "false",
    analysisBy: "Dr. Smith",
    analysisDate: "2023-07-07T14:00:00Z",
    modifiedBy: "John Doe",
    modifiedDate: "2023-07-08T09:00:00Z",
    AlphaAlumina: "101"
  },
  {
    sampleId: "12346",
    sampleDatetime: "2023-07-08T10:00:00Z",
    shift: "Afternoon",
    SiO2: "22.34",
    Fe2O3: "4.56",
    TiO2: "1.34",
    V2O5: "0.67",
    P2O5: "0.89",
    Na2O: "3.12",
    CaO: "7.45",
    ZnO: "0.75",
    remarks: "Sample collected from south section",
    isManual: "false",
    isConfirm: "true",
    analysisBy: "Dr. Doe",
    analysisDate: "2023-07-08T14:00:00Z",
    modifiedBy: "Jane Doe",
    modifiedDate: "2023-07-08T09:00:00Z",
    AlphaAlumina: "101"
  },
  {
    sampleId: "12345",
    sampleDatetime: "2023-07-07T10:00:00Z",
    shift: "Morning",
    SiO2: "25.67",
    Fe2O3: "5.43",
    TiO2: "1.23",
    V2O5: "0.56",
    P2O5: "0.78",
    Na2O: "3.21",
    CaO: "7.89",
    ZnO: "0.65",
    remarks: "Sample collected from north section",
    isManual: "true",
    isConfirm: "false",
    analysisBy: "Dr. Smith",
    analysisDate: "2023-07-07T14:00:00Z",
    modifiedBy: "John Doe",
    modifiedDate: "2023-07-08T09:00:00Z",
    AlphaAlumina: "101"
  },
  {
    sampleId: "12346",
    sampleDatetime: "2023-07-08T10:00:00Z",
    shift: "Afternoon",
    SiO2: "22.34",
    Fe2O3: "4.56",
    TiO2: "1.34",
    V2O5: "0.67",
    P2O5: "0.89",
    Na2O: "3.12",
    CaO: "7.45",
    ZnO: "0.75",
    remarks: "Sample collected from south section",
    isManual: "false",
    isConfirm: "true",
    analysisBy: "Dr. Doe",
    analysisDate: "2023-07-08T14:00:00Z",
    modifiedBy: "Jane Doe",
    modifiedDate: "2023-07-08T09:00:00Z",
    AlphaAlumina: "101"
  }
];

@Component({
  selector: 'app-form-dialog:not(g)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatSortModule,
    NgClass,
    MatCheckboxModule,
    FeatherIconsComponent,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatPaginatorModule,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class FormDialogComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns: string[] = [];

  path: string | undefined;

  selection = new SelectionModel<DialogData>(true, []);
  dataSource = new MatTableDataSource<DialogData>(SAMPLE_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    super();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  setDisplayedColumns() {
    if (this.data.headerValue === 'XRF') {
      this.displayedColumns = [
        'select', 'sampleId', 'sampleDatetime', 'shift', 'SiO2', 'Fe2O3', 'TiO2', 'V2O5', 'P2O5', 'Na2O', 'CaO', 'ZnO', 'remarks',
        'isManual', 'isConfirm', 'analysisBy', 'analysisDate', 'modifiedBy', 'modifiedDate'
      ];
    } else if (this.data.headerValue === 'XRD') {
      this.displayedColumns = [
        'select', 'sampleId', 'sampleDatetime', 'shift', 'AlphaAlumina', 'remarks',
        'isManual', 'isConfirm', 'analysisBy', 'analysisDate', 'modifiedBy', 'modifiedDate'
      ];
    } else {
      this.displayedColumns = ['select', 'sampleId', 'sampleDatetime', 'shift', 'remarks', 'isManual', 'isConfirm', 'analysisBy', 'analysisDate', 'modifiedBy', 'modifiedDate'];
    }
    if(this.data.path === 'buxaite') {
      this.displayedColumns = [...this.displayedColumns, 'edit'];
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DialogData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.sampleId + 1}`;
  }

  anySelected(): boolean {
    return this.selection.selected.length > 0;
  }

  editSelectedRecords() {
    this.selection.selected.forEach(element => {
      element.isEditing = true;
    });
  }

  saveEditedRecords() {
    this.saveChanges();
    this.selection.clear();
  }

  onClose() {
    this.dataSource.data.forEach(element => {
      element.isEditing = false;
    });
    this.selection.clear();
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data.headerValue +" "+ this.data.path);
    this.path = this.data.path;
    this.setDisplayedColumns();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element: DialogData): void {
    element.isEditing = !element.isEditing;
  }

  onSave(element: DialogData): void {
    element.isEditing = false;
    this.selection.deselect(element);
    // save logic here 
  }

  saveChanges() {
    this.selection.selected.forEach(element => {
      // save logic here 
      element.isEditing = false;
      this.selection.deselect(element);
    });
  }

  downloadTable() {
    // Extract data from the dataSource
    const data = this.dataSource.data.map(row => ({
      sampleId: row.sampleId,
      sampleDatetime: row.sampleDatetime,
      shift: row.shift,
      SiO2: row.SiO2,
      Fe2O3: row.Fe2O3,
      TiO2: row.TiO2,
      V2O5: row.V2O5,
      P2O5: row.P2O5,
      Na2O: row.Na2O,
      CaO: row.CaO,
      ZnO: row.ZnO,
      AlphaAlumina: row.AlphaAlumina,
      remarks: row.remarks,
      isManual: row.isManual,
      isConfirm: row.isConfirm,
      analysisBy: row.analysisBy,
      analysisDate: row.analysisDate,
      modifiedBy: row.modifiedBy,
      modifiedDate: row.modifiedDate
    }));
  
    // Convert the data to a JSON sheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  
    // Create a new workbook and append the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

  // Create the filename with the current timestamp
  const filename = this.data.headerValue+`_${timestamp}.xlsx`;
    // Export the workbook to a file
    XLSX.writeFile(wb, filename);
  }
  
}

