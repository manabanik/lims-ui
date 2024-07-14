import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ResumesService } from '../../resumes.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Resumes } from '../../resumes.model';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

export interface DialogData {
  id: number;
  action: string;
  resumes: Resumes;
}

@Component({
    selector: 'app-form-dialog:not(g)',
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
        MatDialogClose,
        MatDatepickerModule,
        MatAutocompleteModule
    ],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  resumesForm: FormGroup;
  resumes: Resumes;
  options: string[] = ['PO321', 'PO234', 'PO543'];
  receibedStoreData:any;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public resumesService: ResumesService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Received form";
      this.resumes = data.resumes;
    } else {
      this.dialogTitle = 'New Resumes';
      const blankObject = {} as Resumes;
      this.resumes = new Resumes(blankObject);
    }
    this.resumesForm = this.createContactForm();
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
      id: [this.resumes.id],
      POnumber: [this.resumes.POnumber],
      rawMaterialType: [this.resumes.rawMaterialType],
      SampleCollentionDT: [
        formatDate(this.resumes.SampleCollentionDT, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      SourceOfOrigin: [this.resumes.SourceOfOrigin],
      Quantity: [this.resumes.Quantity],
      RakeVechile: [this.resumes.RakeVechile],
      SampleCollectorName: [this.resumes.SampleCollectorName],
      bagId: [this.resumes.bagId],
      RakeID: [this.resumes.RakeID],
      ReceivedTD: [this.resumes.ReceivedTD],
      sampleLabRecevingDT:[this.resumes.ReceivedTD],
      chemistName:[""],
      analysisCompletionDT:[this.resumes.ReceivedTD],
      InstrumentUsed:[""]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.resumesService.addResumes(this.resumesForm.getRawValue());
  }
 
  ngOnInit() {
    
  }

  getPO(value:any){
    
    if(value === "PO321"){
      this.resumesForm.controls['rawMaterialType'].setValue("sample mat1");
      this.resumesForm.controls['SourceOfOrigin'].setValue("sample Source 1");
      this.resumesForm.controls['Quantity'].setValue("sample quentity 1");
      this.resumesForm.controls['RakeVechile'].setValue("sample RakeVechile");
      this.resumesForm.controls['RakeID'].setValue("RK112");
      this.resumesForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
   else if(value === "PO324"){
      this.resumesForm.controls['rawMaterialType'].setValue("sample mat2");
      this.resumesForm.controls['SourceOfOrigin'].setValue("sample Source 2");
      this.resumesForm.controls['Quantity'].setValue("sample quentity 2");
      this.resumesForm.controls['RakeVechile'].setValue("sample RakeVechile 2");
      this.resumesForm.controls['RakeID'].setValue("RK11232");
      this.resumesForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
    else{
      this.resumesForm.controls['rawMaterialType'].setValue("sample mat3");
      this.resumesForm.controls['SourceOfOrigin'].setValue("sample Source 3");
      this.resumesForm.controls['Quantity'].setValue("sample quentity 3");
      this.resumesForm.controls['RakeVechile'].setValue("sample RakeVechile 3");
      this.resumesForm.controls['RakeID'].setValue("RK1234");
      this.resumesForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
    
  }
}
