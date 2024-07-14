import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BagCreationListService } from '../../bag-creation-list.service';
import { UntypedFormControl, Validators, UntypedFormGroup,FormBuilder,FormGroup,FormControl, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BagCreationList } from '../../jobs-list.model';
import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

export interface DialogData {
  id: number;
  action: string;
  jobsList: BagCreationList;
}

@Component({
    selector: 'app-form-dialog:not(f)',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        MatDialogClose,
        MatAutocompleteModule
    ],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  jobsListForm: FormGroup;
  jobsList: BagCreationList;
  options: string[] = ['PO321', 'PO234', 'PO543'];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public jobsListService: BagCreationListService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.jobsList.POnumber;
      this.jobsList = data.jobsList;
    } else {
      this.dialogTitle = 'Add New Sample';
      const blankObject = {} as BagCreationList;
      this.jobsList = new BagCreationList(blankObject);
    }
    this.jobsListForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required,
    // Validators.status,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('status')
      ? 'Not a valid status'
      : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.jobsList.id],
      POnumber: [this.jobsList.POnumber],
      rawMaterialType: [this.jobsList.rawMaterialType],
      SampleCollentionDT: [
        formatDate(this.jobsList.SampleCollentionDT, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      SourceOfOrigin: [this.jobsList.SourceOfOrigin],
      Quantity: [this.jobsList.Quantity],
      RakeVechile: [this.jobsList.RakeVechile],
      SampleCollectorName: [this.jobsList.SampleCollectorName],
      bagId: [this.jobsList.bagId],
      RakeID: [this.jobsList.RakeID],
      ReceivedTD: [this.jobsList.ReceivedTD],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.jobsListService.addJobsList(this.jobsListForm.getRawValue());
  }
  getPO(value:any){
    
    if(value === "PO321"){
      this.jobsListForm.controls['rawMaterialType'].setValue("sample mat1");
      this.jobsListForm.controls['SourceOfOrigin'].setValue("sample Source 1");
      this.jobsListForm.controls['Quantity'].setValue("sample quentity 1");
      this.jobsListForm.controls['RakeVechile'].setValue("sample RakeVechile");
      this.jobsListForm.controls['RakeID'].setValue("RK112");
      this.jobsListForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
   else if(value === "PO324"){
      this.jobsListForm.controls['rawMaterialType'].setValue("sample mat2");
      this.jobsListForm.controls['SourceOfOrigin'].setValue("sample Source 2");
      this.jobsListForm.controls['Quantity'].setValue("sample quentity 2");
      this.jobsListForm.controls['RakeVechile'].setValue("sample RakeVechile 2");
      this.jobsListForm.controls['RakeID'].setValue("RK11232");
      this.jobsListForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
    else{
      this.jobsListForm.controls['rawMaterialType'].setValue("sample mat3");
      this.jobsListForm.controls['SourceOfOrigin'].setValue("sample Source 3");
      this.jobsListForm.controls['Quantity'].setValue("sample quentity 3");
      this.jobsListForm.controls['RakeVechile'].setValue("sample RakeVechile 3");
      this.jobsListForm.controls['RakeID'].setValue("RK1234");
      this.jobsListForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
    
  }
}
