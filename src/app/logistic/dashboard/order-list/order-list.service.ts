import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderList } from './order-list.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class OrderListService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/jobs-list.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<OrderList[]> = new BehaviorSubject<OrderList[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: OrderList;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): OrderList[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllJobsLists(): void {
    this.subs.sink = this.httpClient.get<OrderList[]>(this.API_URL).subscribe({
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
  addJobsList(jobsList: OrderList): void {
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
  updateJobsList(jobsList: OrderList): void {
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
