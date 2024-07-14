import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AmdDomesticBuxaiteService } from '../../amd-domestic-buxaite.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmdDomesticBuxaite } from '../../amd-domestic-buxaite.model';
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
  amddomesticbuxaite: AmdDomesticBuxaite;
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
  amddomesticbuxaiteForm: FormGroup;
  amddomesticbuxaite: AmdDomesticBuxaite;
  options: string[] = ['PO321', 'PO234', 'PO543'];
  receibedStoreData:any;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public amddomesticbuxaiteService: AmdDomesticBuxaiteService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Received form";
      this.amddomesticbuxaite = data.amddomesticbuxaite;
    } else {
      this.dialogTitle = 'New AmdDomesticBuxaite';
      const blankObject = {} as AmdDomesticBuxaite;
      this.amddomesticbuxaite = new AmdDomesticBuxaite(blankObject);
    }
    this.amddomesticbuxaiteForm = this.createContactForm();
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
      id: [this.amddomesticbuxaite.id],
      SampleId: [this.amddomesticbuxaite.SampleId],
      AnalyzedBy: [this.amddomesticbuxaite.AnalyzedBy],
     
      Tha: [this.amddomesticbuxaite.Tha],
      Mha: [this.amddomesticbuxaite.Mha],
      Rs: [this.amddomesticbuxaite.Rs],
      Moisture: [this.amddomesticbuxaite.Moisture],
      GhRatio: [this.amddomesticbuxaite.GhRatio],
      SizeLess150: [this.amddomesticbuxaite.SizeLess150],
      Size125: [this.amddomesticbuxaite.Size125],
      Size100:[this.amddomesticbuxaite.Size100],
      
      Action:[this.amddomesticbuxaite.Action],
      
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.amddomesticbuxaiteService.addAmdDomesticBuxaite(this.amddomesticbuxaiteForm.getRawValue());
  }
 
  ngOnInit() {
    setTimeout(() => {
      //this.loadData()
    }, 1500);
    
  }

  getPO(value:any){
    
    if(value === "PO321"){
      this.amddomesticbuxaiteForm.controls['rawMaterialType'].setValue("sample mat1");
      this.amddomesticbuxaiteForm.controls['SourceOfOrigin'].setValue("sample Source 1");
      this.amddomesticbuxaiteForm.controls['Quantity'].setValue("sample quentity 1");
      this.amddomesticbuxaiteForm.controls['RakeVechile'].setValue("sample RakeVechile");
      this.amddomesticbuxaiteForm.controls['RakeID'].setValue("RK112");
      this.amddomesticbuxaiteForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
   else if(value === "PO324"){
      this.amddomesticbuxaiteForm.controls['rawMaterialType'].setValue("sample mat2");
      this.amddomesticbuxaiteForm.controls['SourceOfOrigin'].setValue("sample Source 2");
      this.amddomesticbuxaiteForm.controls['Quantity'].setValue("sample quentity 2");
      this.amddomesticbuxaiteForm.controls['RakeVechile'].setValue("sample RakeVechile 2");
      this.amddomesticbuxaiteForm.controls['RakeID'].setValue("RK11232");
      this.amddomesticbuxaiteForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
    else{
      this.amddomesticbuxaiteForm.controls['rawMaterialType'].setValue("sample mat3");
      this.amddomesticbuxaiteForm.controls['SourceOfOrigin'].setValue("sample Source 3");
      this.amddomesticbuxaiteForm.controls['Quantity'].setValue("sample quentity 3");
      this.amddomesticbuxaiteForm.controls['RakeVechile'].setValue("sample RakeVechile 3");
      this.amddomesticbuxaiteForm.controls['RakeID'].setValue("RK1234");
      this.amddomesticbuxaiteForm.controls['ReceivedTD'].setValue("2022-02-12T14:22:18Z");
    }
    
  }
}
