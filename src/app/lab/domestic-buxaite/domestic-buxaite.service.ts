import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomesticBuxaite } from './domestic-buxaite.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class DomesticBuxaiteService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/domestic-buxaite-list.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<DomesticBuxaite[]> = new BehaviorSubject<DomesticBuxaite[]>([]);
  dialogData!: DomesticBuxaite;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): DomesticBuxaite[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllDomesticBuxaites(): void {
    this.subs.sink = this.httpClient.get<DomesticBuxaite[]>(this.API_URL).subscribe({
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
}
