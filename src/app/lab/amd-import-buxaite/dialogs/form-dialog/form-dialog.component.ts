import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AmdImportBuxaiteService } from '../../amd-import-buxaite.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmdImportBuxaite } from '../../amd-import-buxaite.model';
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
  amdimportbuxaite: AmdImportBuxaite;
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
  amdimportbuxaiteForm: FormGroup;
  amdimportbuxaite: AmdImportBuxaite;
  options: string[] = ['PO321', 'PO234', 'PO543'];
  receibedStoreData:any;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public amdimportbuxaiteService: AmdImportBuxaiteService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Received form";
      this.amdimportbuxaite = data.amdimportbuxaite;
    } else {
      this.dialogTitle = 'New AmdImportBuxaite';
      const blankObject = {} as AmdImportBuxaite;
      this.amdimportbuxaite = new AmdImportBuxaite(blankObject);
    }
    this.amdimportbuxaiteForm = this.createContactForm();
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
      id: [this.amdimportbuxaite.id],
      SampleId: [this.amdimportbuxaite.SampleId],
      AnalyzedBy: [this.amdimportbuxaite.AnalyzedBy],
     
      Tha: [this.amdimportbuxaite.Tha],
      Mha: [this.amdimportbuxaite.Mha],
      Rs: [this.amdimportbuxaite.Rs],
      Moisture: [this.amdimportbuxaite.Moisture],
      GhRatio: [this.amdimportbuxaite.GhRatio],
      SizeLess150: [this.amdimportbuxaite.SizeLess150],
      Size125: [this.amdimportbuxaite.Size125],
      Size100:[this.amdimportbuxaite.Size100],
      
      Action:[this.amdimportbuxaite.Action],
      
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.amdimportbuxaiteService.addAmdImportBuxaite(this.amdimportbuxaiteForm.getRawValue());
  }
 
  ngOnInit() {
    setTimeout(() => {
      //this.loadData()
    }, 1500);
    
  }

  getPO(value:any){
    
    if(value === "PO321"){
      this.amdimportbuxaiteForm.controls['rawMaterialType'].setValue("sample mat1");
      this.amdimportbuxaiteForm.controls['SourceOfOrigin'].setValue("sample Source 1");
      this.amdimportbuxaiteForm.controls['Quantity'].setValue("sample quentity 1");
      this.amdimportbuxaiteForm.controls['RakeVechile'].setValue("sample RakeVechile");
      this.amdimportbuxaiteForm.controls['RakeID'].setValue("RK112");
      this.amdimportbuxaiteForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
   else if(value === "PO324"){
      this.amdimportbuxaiteForm.controls['rawMaterialType'].setValue("sample mat2");
      this.amdimportbuxaiteForm.controls['SourceOfOrigin'].setValue("sample Source 2");
      this.amdimportbuxaiteForm.controls['Quantity'].setValue("sample quentity 2");
      this.amdimportbuxaiteForm.controls['RakeVechile'].setValue("sample RakeVechile 2");
      this.amdimportbuxaiteForm.controls['RakeID'].setValue("RK11232");
      this.amdimportbuxaiteForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
    else{
      this.amdimportbuxaiteForm.controls['rawMaterialType'].setValue("sample mat3");
      this.amdimportbuxaiteForm.controls['SourceOfOrigin'].setValue("sample Source 3");
      this.amdimportbuxaiteForm.controls['Quantity'].setValue("sample quentity 3");
      this.amdimportbuxaiteForm.controls['RakeVechile'].setValue("sample RakeVechile 3");
      this.amdimportbuxaiteForm.controls['RakeID'].setValue("RK1234");
      this.amdimportbuxaiteForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
    
  }
}
