import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BagCreationList } from './jobs-list.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class BagCreationListService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/jobs-list.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<BagCreationList[]> = new BehaviorSubject<BagCreationList[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: BagCreationList;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): BagCreationList[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllJobsLists(): void {
    this.subs.sink = this.httpClient.get<BagCreationList[]>(this.API_URL).subscribe({
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
  addJobsList(jobsList: BagCreationList): void {
    this.dialogData = jobsList;

    // this.httpClient.post(this.API_URL, jobsList)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = jobsList;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateJobsList(jobsList: BagCreationList): void {
    this.dialogData = jobsList;

    // this.httpClient.put(this.API_URL + jobsList.id, jobsList)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = jobsList;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteJobsList(id: number): void {
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
