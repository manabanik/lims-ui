import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AmdDomesticBuxaite } from './amd-domestic-buxaite.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class AmdDomesticBuxaiteService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/domestic-buxaite.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<AmdDomesticBuxaite[]> = new BehaviorSubject<AmdDomesticBuxaite[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: AmdDomesticBuxaite;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AmdDomesticBuxaite[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAmdDomesticBuxaite(): void {
    this.subs.sink = this.httpClient.get<AmdDomesticBuxaite[]>(this.API_URL).subscribe({
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
  addAmdDomesticBuxaite(amddomesticbuxaite: AmdDomesticBuxaite): void {
    this.dialogData = amddomesticbuxaite;

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
  updateAmdDomesticBuxaite(amddomesticbuxaite: AmdDomesticBuxaite): void {
    this.dialogData = amddomesticbuxaite;

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
  deleteAmdDomesticBuxaite(id: number): void {
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
