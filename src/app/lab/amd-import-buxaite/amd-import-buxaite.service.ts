import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AmdImportBuxaite } from './amd-import-buxaite.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class AmdImportBuxaiteService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/import-buxaite.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<AmdImportBuxaite[]> = new BehaviorSubject<AmdImportBuxaite[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: AmdImportBuxaite;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AmdImportBuxaite[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAmdImportBuxaite(): void {
    this.subs.sink = this.httpClient.get<AmdImportBuxaite[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  addAmdImportBuxaite(amdimportbuxaite: AmdImportBuxaite): void {
    this.dialogData = amdimportbuxaite;

    // this.httpClient.post(this.API_URL, resumes)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = resumes;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateAmdImportBuxaite(amdimportbuxaite: AmdImportBuxaite): void {
    this.dialogData = amdimportbuxaite;

    // this.httpClient.put(this.API_URL + resumes.id, resumes)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = resumes;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteAmdImportBuxaite(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
